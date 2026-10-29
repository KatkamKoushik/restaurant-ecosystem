import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { verifyAdminAuth } from "./auth-server";

// Mock Clerk auth helper
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

import { auth } from "@clerk/nextjs/server";

describe("verifyAdminAuth - Fail-Closed Security Policy (P0-A)", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("denies unauthenticated requests with 401 Unauthorized", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: null,
      sessionClaims: null,
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(false);
    expect(result.userId).toBeNull();
    expect(result.errorResponse?.status).toBe(401);
  });

  it("denies authenticated non-admin when ADMIN_EMAILS is unset (fail-closed)", async () => {
    delete process.env.ADMIN_EMAILS;

    vi.mocked(auth).mockResolvedValue({
      userId: "user_normal_123",
      sessionClaims: {
        email: "customer@example.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(false);
    expect(result.errorResponse?.status).toBe(403);
  });

  it("denies authenticated non-admin when ADMIN_EMAILS is empty string (fail-closed)", async () => {
    process.env.ADMIN_EMAILS = "   ";

    vi.mocked(auth).mockResolvedValue({
      userId: "user_normal_123",
      sessionClaims: {
        email: "customer@example.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(false);
    expect(result.errorResponse?.status).toBe(403);
  });

  it("denies authenticated user when email does not match ADMIN_EMAILS", async () => {
    process.env.ADMIN_EMAILS = "owner@mandiwala.com,manager@mandiwala.com";

    vi.mocked(auth).mockResolvedValue({
      userId: "user_imposter_123",
      sessionClaims: {
        email: "attacker@external.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(false);
    expect(result.errorResponse?.status).toBe(403);
  });

  it("denies user with arbitrary non-admin role claim (e.g. member/guest)", async () => {
    process.env.ADMIN_EMAILS = "owner@mandiwala.com";

    vi.mocked(auth).mockResolvedValue({
      userId: "user_member_123",
      sessionClaims: {
        role: "member",
        email: "member@example.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(false);
    expect(result.errorResponse?.status).toBe(403);
  });

  it("allows user with explicit role: admin in session metadata", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_admin_123",
      sessionClaims: {
        metadata: { role: "admin" },
        email: "staff@mandiwala.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(true);
    expect(result.userId).toBe("user_admin_123");
    expect(result.errorResponse).toBeUndefined();
  });

  it("allows user with explicit role: superadmin in claims", async () => {
    vi.mocked(auth).mockResolvedValue({
      userId: "user_superadmin_123",
      sessionClaims: {
        role: "superadmin",
        email: "super@mandiwala.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(true);
    expect(result.userId).toBe("user_superadmin_123");
  });

  it("allows user whose email is in ADMIN_EMAILS allowlist", async () => {
    process.env.ADMIN_EMAILS = "Admin@mandiwala.com, Owner@Mandiwala.COM ";

    vi.mocked(auth).mockResolvedValue({
      userId: "user_allowlist_123",
      sessionClaims: {
        email: "admin@mandiwala.com",
      },
    } as any);

    const result = await verifyAdminAuth();
    expect(result.isAuthorized).toBe(true);
    expect(result.userId).toBe("user_allowlist_123");
  });
});

