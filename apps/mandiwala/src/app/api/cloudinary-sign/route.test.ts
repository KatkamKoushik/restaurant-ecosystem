import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { POST } from "./route";

// Mock Clerk auth helper
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

import { auth } from "@clerk/nextjs/server";

describe("POST /api/cloudinary-sign - Security & Parameter Validation (P0-D)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = {
      ...originalEnv,
      CLOUDINARY_API_SECRET: "mock_test_secret_key_12345",
      NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET: "mandiwala_dishes_preset",
    };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("rejects unauthenticated requests with 401", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: null,
      sessionClaims: null,
    } as any);

    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign: { timestamp: Math.floor(Date.now() / 1000) } }),
    });

    const res = await POST(req);
    expect(res.status).toBe(401);
  });

  it("rejects non-admin authenticated users with 403 (fail-closed)", async () => {
    delete process.env.ADMIN_EMAILS;

    vi.mocked(auth).mockResolvedValue({
      userId: "user_regular_123",
      sessionClaims: { email: "regular@user.com" },
    } as any);

    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign: { timestamp: Math.floor(Date.now() / 1000) } }),
    });

    const res = await POST(req);
    expect(res.status).toBe(403);
  });

  it("rejects request when timestamp is missing or not an integer", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin",
      sessionClaims: { metadata: { role: "admin" } },
    } as any);

    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign: { timestamp: "not-a-number" } }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("timestamp");
  });

  it("rejects request when timestamp is expired beyond 300s window", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin",
      sessionClaims: { metadata: { role: "admin" } },
    } as any);

    const expiredTimestamp = Math.floor(Date.now() / 1000) - 600; // 10 minutes ago
    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paramsToSign: { timestamp: expiredTimestamp } }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Timestamp expired");
  });

  it("rejects path traversal in folder parameter (.. / leading slash)", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin",
      sessionClaims: { metadata: { role: "admin" } },
    } as any);

    const traversalPaths = [
      "../etc/passwd",
      "/root/secret",
      "mandiwala/../../escape",
      "mandiwala\\sub",
      "http://attacker.com/evil",
    ];

    for (const folder of traversalPaths) {
      const req = new Request("http://localhost/api/cloudinary-sign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paramsToSign: {
            timestamp: Math.floor(Date.now() / 1000),
            folder,
          },
        }),
      });

      const res = await POST(req);
      expect(res.status).toBe(400);
    }
  });

  it("rejects unapproved folder paths outside mandiwala scope", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin",
      sessionClaims: { metadata: { role: "admin" } },
    } as any);

    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paramsToSign: {
          timestamp: Math.floor(Date.now() / 1000),
          folder: "arbitrary_unapproved_folder",
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("not approved");
  });

  it("rejects object or array values for signing parameters", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin",
      sessionClaims: { metadata: { role: "admin" } },
    } as any);

    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paramsToSign: {
          timestamp: Math.floor(Date.now() / 1000),
          tags: ["array", "not", "allowed"],
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("scalar expected");
  });

  it("generates a cryptographic signature without exposing the API secret", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin",
      sessionClaims: { metadata: { role: "admin" } },
    } as any);

    const now = Math.floor(Date.now() / 1000);
    const req = new Request("http://localhost/api/cloudinary-sign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        paramsToSign: {
          timestamp: now,
          folder: "mandiwala/menu",
          upload_preset: "mandiwala_dishes_preset",
        },
      }),
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.signature).toBeDefined();
    expect(typeof body.signature).toBe("string");
    expect(body.signature.length).toBeGreaterThan(10);
    // Crucial check: Secret is never exposed
    expect(body).not.toHaveProperty("apiSecret");
    expect(body).not.toHaveProperty("CLOUDINARY_API_SECRET");
    expect(JSON.stringify(body)).not.toContain("mock_test_secret_key_12345");
  });
});

