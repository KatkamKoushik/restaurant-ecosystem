export interface ReservationPayload {
  name: string;
  phone: string;
  date: string;
  time: string;
  size: string;
  notes?: string;
  status?: string;
  createdAt?: any;
  [key: string]: any;
}

const REQUIRED_FIELDS = ["name", "phone", "date", "time", "size"] as const;
const ALLOWED_FIELDS = new Set([
  "name",
  "phone",
  "date",
  "time",
  "size",
  "notes",
  "status",
  "createdAt",
]);

/**
 * Validates a reservation payload matching Mandiwala's Firestore security rule specifications.
 */
export function validateReservationPayload(data: Record<string, any>): {
  isValid: boolean;
  error?: string;
} {
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { isValid: false, error: "Payload must be an object" };
  }

  // Extra field check (injection guard)
  for (const key of Object.keys(data)) {
    if (!ALLOWED_FIELDS.has(key)) {
      return { isValid: false, error: `Unexpected field '${key}' is not allowed` };
    }
  }

  // Required field checks
  for (const field of REQUIRED_FIELDS) {
    if (typeof data[field] !== "string" || data[field].trim().length === 0) {
      return { isValid: false, error: `Required field '${field}' is missing or empty` };
    }
  }

  // Name length
  if (data.name.length > 100) {
    return { isValid: false, error: "Name must be 100 characters or fewer" };
  }

  // Phone regex format
  if (!/^\+?[0-9 -]{10,20}$/.test(data.phone.trim())) {
    return { isValid: false, error: "Phone number must be between 10 and 20 digits" };
  }

  // Date format: YYYY-MM-DD
  if (!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(data.date.trim())) {
    return { isValid: false, error: "Date must be in YYYY-MM-DD format" };
  }

  // Time length
  if (data.time.length > 20) {
    return { isValid: false, error: "Time string is too long" };
  }

  // Party size length
  if (data.size.length > 50) {
    return { isValid: false, error: "Party size description is too long" };
  }

  // Notes length
  if (data.notes !== undefined && (typeof data.notes !== "string" || data.notes.length > 500)) {
    return { isValid: false, error: "Notes must be 500 characters or fewer" };
  }

  // Status guard: Public cannot self-confirm or decline
  if (data.status !== undefined && data.status !== "pending") {
    return { isValid: false, error: "New reservations can only be created with 'pending' status" };
  }

  return { isValid: true };
}
