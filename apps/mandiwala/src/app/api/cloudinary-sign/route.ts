import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth-server";

// Strictly permitted parameters for Cloudinary signed upload widget
const ALLOWED_SIGNING_KEYS = new Set([
  "timestamp",
  "folder",
  "upload_preset",
  "public_id",
  "source",
  "tags",
  "context",
]);

// Approved upload folder prefixes for Mandiwala assets
const APPROVED_FOLDER_PREFIX = "mandiwala";
const APPROVED_FOLDERS = new Set([
  "mandiwala",
  "mandiwala/menu",
  "mandiwala/ambience",
  "mandiwala/brand",
]);

// Maximum permitted timestamp skew: 5 minutes (300 seconds)
const MAX_TIMESTAMP_SKEW_SECONDS = 300;

export async function POST(request: Request) {
  // 1. Enforce strict fail-closed authentication & admin authorization
  const authCheck = await verifyAdminAuth();
  if (!authCheck.isAuthorized) {
    return authCheck.errorResponse!;
  }

  // 2. Validate Cloudinary server configuration
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!apiSecret) {
    return NextResponse.json(
      { error: "Cloudinary API secret is not configured" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { paramsToSign } = body;

    if (!paramsToSign || typeof paramsToSign !== "object" || Array.isArray(paramsToSign)) {
      return NextResponse.json(
        { error: "Invalid parameters payload" },
        { status: 400 }
      );
    }

    // 3. Validate timestamp freshness to prevent replay attacks
    const timestamp = Number(paramsToSign.timestamp);
    if (!timestamp || isNaN(timestamp) || !Number.isInteger(timestamp)) {
      return NextResponse.json(
        { error: "Missing or invalid timestamp parameter" },
        { status: 400 }
      );
    }

    const currentEpoch = Math.floor(Date.now() / 1000);
    if (Math.abs(currentEpoch - timestamp) > MAX_TIMESTAMP_SKEW_SECONDS) {
      return NextResponse.json(
        { error: "Timestamp expired or out of allowed window" },
        { status: 400 }
      );
    }

    // 4. Enforce strict directory restrictions on folder parameter
    if (paramsToSign.folder !== undefined && paramsToSign.folder !== null) {
      const folder = String(paramsToSign.folder).trim();
      // Block directory traversal, absolute paths, or protocol schemes
      if (
        folder.includes("..") ||
        folder.startsWith("/") ||
        folder.includes("\\") ||
        folder.includes("://")
      ) {
        return NextResponse.json(
          { error: "Path traversal or malformed folder name is forbidden" },
          { status: 400 }
        );
      }

      // Restrict uploads strictly to approved application folders
      const isApproved =
        APPROVED_FOLDERS.has(folder) || folder.startsWith(`${APPROVED_FOLDER_PREFIX}/`);
      if (!isApproved) {
        return NextResponse.json(
          {
            error: `Folder '${folder}' is not approved for asset uploads. Must be under '${APPROVED_FOLDER_PREFIX}/'`,
          },
          { status: 400 }
        );
      }
    }

    // 5. Validate upload_preset if configured in server environment
    const configuredPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
    if (
      configuredPreset &&
      paramsToSign.upload_preset &&
      paramsToSign.upload_preset !== configuredPreset
    ) {
      return NextResponse.json(
        { error: "Disallowed upload preset" },
        { status: 400 }
      );
    }

    // 6. Construct sanitized parameter object using strict allowlist & scalar types
    const sanitizedParams: Record<string, string | number> = {};
    for (const [key, value] of Object.entries(paramsToSign)) {
      if (ALLOWED_SIGNING_KEYS.has(key) && value !== undefined && value !== null) {
        if (typeof value === "string" || typeof value === "number") {
          sanitizedParams[key] = value;
        } else {
          return NextResponse.json(
            { error: `Invalid parameter type for '${key}': scalar expected` },
            { status: 400 }
          );
        }
      }
    }

    // 7. Generate cryptographic SHA-1 signature
    const signature = cloudinary.utils.api_sign_request(
      sanitizedParams,
      apiSecret
    );

    return NextResponse.json({ signature });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message || "Failed to generate signature" },
      { status: 500 }
    );
  }
}
