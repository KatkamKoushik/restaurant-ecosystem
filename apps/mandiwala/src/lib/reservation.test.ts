import { describe, it, expect } from "vitest";
import { validateReservationPayload } from "./reservation";

describe("Reservation Schema & Integrity Suite (P0-C)", () => {
  const validPayload = {
    name: "Koushik Katkam",
    phone: "+919876543210",
    date: "2026-11-15",
    time: "07:30 PM",
    size: "Family Majlis (6 Guests)",
    notes: "Window booth preferred",
    status: "pending",
  };

  it("accepts a fully compliant customer reservation payload", () => {
    const res = validateReservationPayload(validPayload);
    expect(res.isValid).toBe(true);
    expect(res.error).toBeUndefined();
  });

  it("rejects payloads with missing required fields", () => {
    const required = ["name", "phone", "date", "time", "size"];
    for (const field of required) {
      const copy = { ...validPayload };
      delete (copy as any)[field];
      const res = validateReservationPayload(copy);
      expect(res.isValid).toBe(false);
      expect(res.error).toContain(`Required field '${field}'`);
    }
  });

  it("rejects invalid date formats (enforces YYYY-MM-DD)", () => {
    const invalidDates = ["15/11/2026", "Nov 15, 2026", "2026-1-1", "today"];
    for (const date of invalidDates) {
      const res = validateReservationPayload({ ...validPayload, date });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("YYYY-MM-DD");
    }
  });

  it("rejects invalid phone numbers", () => {
    const invalidPhones = ["123", "phone_number", "+91-abc-1234"];
    for (const phone of invalidPhones) {
      const res = validateReservationPayload({ ...validPayload, phone });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("between 10 and 20 digits");
    }
  });

  it("rejects attempts by public visitors to self-confirm or decline bookings", () => {
    const resConfirmed = validateReservationPayload({
      ...validPayload,
      status: "confirmed",
    });
    expect(resConfirmed.isValid).toBe(false);
    expect(resConfirmed.error).toContain("pending");

    const resDeclined = validateReservationPayload({
      ...validPayload,
      status: "declined",
    });
    expect(resDeclined.isValid).toBe(false);
  });

  it("rejects unexpected extra fields to prevent injection", () => {
    const res = validateReservationPayload({
      ...validPayload,
      role: "admin",
      isAdmin: true,
      extraMaliciousField: "injection",
    });
    expect(res.isValid).toBe(false);
    expect(res.error).toContain("Unexpected field");
  });

  it("rejects overly long string fields", () => {
    const longName = "A".repeat(101);
    const resName = validateReservationPayload({ ...validPayload, name: longName });
    expect(resName.isValid).toBe(false);

    const longNotes = "N".repeat(501);
    const resNotes = validateReservationPayload({ ...validPayload, notes: longNotes });
    expect(resNotes.isValid).toBe(false);
  });
});
