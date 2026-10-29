import { NextResponse } from "next/server";
import { verifyAdminAuth } from "@/lib/auth-server";
import { getFirebaseAdmin } from "@/lib/firebase-admin";

export async function GET() {
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
    const snapshot = await admin.db
      .collection("reservations")
      .orderBy("createdAt", "desc")
      .get();

    const reservations = snapshot.docs.map((docSnap: any) => ({
      id: docSnap.id,
      ...docSnap.data(),
    }));

    return NextResponse.json({ reservations });
  } catch (error: any) {
    console.error("Error fetching admin reservations:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to fetch reservations" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: Request) {
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
    const { id, status } = body;

    if (!id || typeof id !== "string") {
      return NextResponse.json(
        { error: "Reservation ID is required" },
        { status: 400 }
      );
    }

    if (status !== "confirmed" && status !== "declined" && status !== "pending") {
      return NextResponse.json(
        { error: "Invalid reservation status. Allowed: pending, confirmed, declined" },
        { status: 400 }
      );
    }

    await admin.db.collection("reservations").doc(id).update({ status });
    return NextResponse.json({ success: true, id, status });
  } catch (error: any) {
    console.error("Error updating reservation status:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to update reservation" },
      { status: 500 }
    );
  }
}
