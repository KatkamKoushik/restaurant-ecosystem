import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET as getReservations, PATCH as patchReservations } from "./reservations/route";
import { POST as postMenu, DELETE as deleteMenu } from "./menu/route";

// Mock Clerk
vi.mock("@clerk/nextjs/server", () => ({
  auth: vi.fn(),
}));

// Mock Firebase Admin
vi.mock("@/lib/firebase-admin", () => ({
  getFirebaseAdmin: vi.fn(),
}));

import { auth } from "@clerk/nextjs/server";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

describe("Admin API Endpoints - Authorization & 503 Boundaries (P0-B)", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("GET /api/admin/reservations", () => {
    it("denies unauthenticated caller with 401", async () => {
      vi.mocked(auth).mockResolvedValue({ userId: null, sessionClaims: null } as any);

      const res = await getReservations();
      expect(res.status).toBe(401);
    });

    it("denies non-admin caller with 403", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_normal",
        sessionClaims: { email: "customer@gmail.com" },
      } as any);

      const res = await getReservations();
      expect(res.status).toBe(403);
    });

    it("returns 503 when Firebase Admin SDK is not configured", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_admin",
        sessionClaims: { metadata: { role: "admin" } },
      } as any);
      vi.mocked(getFirebaseAdmin).mockReturnValue(null);

      const res = await getReservations();
      expect(res.status).toBe(503);
      const data = await res.json();
      expect(data.error).toContain("Firebase Admin credentials not configured");
    });
  });

  describe("PATCH /api/admin/reservations", () => {
    it("denies unauthenticated caller with 401", async () => {
      vi.mocked(auth).mockResolvedValue({ userId: null, sessionClaims: null } as any);

      const req = new Request("http://localhost/api/admin/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "res_1", status: "confirmed" }),
      });

      const res = await patchReservations(req);
      expect(res.status).toBe(401);
    });

    it("denies non-admin caller with 403", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_attacker",
        sessionClaims: { email: "hacker@test.com" },
      } as any);

      const req = new Request("http://localhost/api/admin/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "res_1", status: "confirmed" }),
      });

      const res = await patchReservations(req);
      expect(res.status).toBe(403);
    });

    it("returns 503 when Firebase Admin SDK is not configured", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_admin",
        sessionClaims: { metadata: { role: "admin" } },
      } as any);
      vi.mocked(getFirebaseAdmin).mockReturnValue(null);

      const req = new Request("http://localhost/api/admin/reservations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: "res_1", status: "confirmed" }),
      });

      const res = await patchReservations(req);
      expect(res.status).toBe(503);
    });
  });

  describe("POST & DELETE /api/admin/menu", () => {
    it("denies unauthenticated POST with 401", async () => {
      vi.mocked(auth).mockResolvedValue({ userId: null, sessionClaims: null } as any);

      const req = new Request("http://localhost/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: { name: "Dish", category: "Chicken" } }),
      });

      const res = await postMenu(req);
      expect(res.status).toBe(401);
    });

    it("denies non-admin POST with 403", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_guest",
        sessionClaims: { email: "guest@test.com" },
      } as any);

      const req = new Request("http://localhost/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: { name: "Dish", category: "Chicken" } }),
      });

      const res = await postMenu(req);
      expect(res.status).toBe(403);
    });

    it("denies non-admin DELETE with 403", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_guest",
        sessionClaims: { email: "guest@test.com" },
      } as any);

      const req = new Request("http://localhost/api/admin/menu?id=dish_1", {
        method: "DELETE",
      });

      const res = await deleteMenu(req);
      expect(res.status).toBe(403);
    });

    it("returns 503 on menu POST when Firebase Admin SDK is not configured", async () => {
      vi.mocked(auth).mockResolvedValue({
        userId: "user_admin",
        sessionClaims: { metadata: { role: "admin" } },
      } as any);
      vi.mocked(getFirebaseAdmin).mockReturnValue(null);

      const req = new Request("http://localhost/api/admin/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: { name: "Dish", category: "Chicken" } }),
      });

      const res = await postMenu(req);
      expect(res.status).toBe(503);
    });
  });
});

