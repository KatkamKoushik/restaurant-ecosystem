import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth-server";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

export async function POST(request: Request) {
  const authCheck = await verifyAdminAuth();
  if (!authCheck.isAuthorized) {
    return authCheck.errorResponse!;
  }

  const admin = getFirebaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Service Unavailable: Firebase Admin credentials not configured" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const item = body.item || body;

    if (!item || !item.name || !item.category) {
      return NextResponse.json(
        { error: "Item name and category are required" },
        { status: 400 }
      );
    }

    const itemId = item.id || `item-${Date.now()}`;
    const sanitizedItem = {
      id: itemId,
      name: String(item.name).trim(),
      category: String(item.category).trim(),
      description: item.description ? String(item.description).trim() : "",
      image: item.image ? String(item.image).trim() : "/brand/logo.jpeg",
      isBestSeller: Boolean(item.isBestSeller),
      prices: typeof item.prices === "object" && item.prices !== null ? item.prices : {},
    };

    await admin.db.collection("menu").doc(itemId).set(sanitizedItem);
    return NextResponse.json({ success: true, item: sanitizedItem });
  } catch (error: any) {
    console.error("Error saving menu item:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to save menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const authCheck = await verifyAdminAuth();
  if (!authCheck.isAuthorized) {
    return authCheck.errorResponse!;
  }

  const admin = getFirebaseAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Service Unavailable: Firebase Admin credentials not configured" },
      { status: 503 }
    );
  }

  try {
    const { searchParams } = new URL(request.url);
    const idFromQuery = searchParams.get("id");

    let id = idFromQuery;
    if (!id) {
      const body = await request.json().catch(() => ({}));
      id = body?.id;
    }

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Menu item ID is required" },
        { status: 400 }
      );
    }

    await admin.db.collection("menu").doc(id).delete();
    return NextResponse.json({ success: true, id });
  } catch (error: any) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
