import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export interface AdminAuthResult {
  isAuthorized: boolean;
  userId: string | null;
  userEmail?: string;
  errorResponse?: NextResponse;
}

/**
 * Validates Clerk session and enforces strict fail-closed administrator authorization.
 * 
 * Rules:
 * 1. Unauthenticated requests -> 401 Unauthorized
 * 2. Authenticated user without role=admin/superadmin AND not in ADMIN_EMAILS -> 403 Forbidden
 * 3. Empty or missing ADMIN_EMAILS fails closed -> 403 Forbidden for non-admins
 * 4. Only explicit admin role or allowlisted email passes
 */
export async function verifyAdminAuth(): Promise<AdminAuthResult> {
  const authSession = await auth();
  const userId = authSession.userId;
  const sessionClaims = authSession.sessionClaims as Record<string, any> | undefined;

  if (!userId) {
    return {
      isAuthorized: false,
      userId: null,
      errorResponse: NextResponse.json(
        { error: "Unauthorized: Administrator sign-in required" },
        { status: 401 }
      ),
    };
  }

  const role = sessionClaims?.metadata?.role || sessionClaims?.role;
  const adminEmails = (process.env.ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  const userEmail = (
    sessionClaims?.email ||
    sessionClaims?.primaryEmail ||
    ""
  ).toLowerCase();

  const isRoleAdmin = role === "admin" || role === "superadmin";
  const isEmailAdmin = Boolean(
    userEmail && adminEmails.length > 0 && adminEmails.includes(userEmail)
  );

  // Strict Fail-Closed: Access granted ONLY if explicitly an admin role or on admin email list
  const isAuthorized = isRoleAdmin || isEmailAdmin;

  if (!isAuthorized) {
    return {
      isAuthorized: false,
      userId,
      userEmail,
      errorResponse: NextResponse.json(
        { error: "Forbidden: Administrator privileges required" },
        { status: 403 }
      ),
    };
  }

  return {
    isAuthorized: true,
    userId,
    userEmail,
  };
}
