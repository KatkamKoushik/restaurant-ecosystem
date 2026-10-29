import { CartItem } from "./store";

export interface OrderCustomerDetails {
  name: string;
  phone: string;
  deliveryType: "Home Delivery" | "Pickup";
  houseNo?: string;
  street?: string;
  landmark?: string;
  pincode?: string;
  instructions?: string;
}

export interface OrderCalculation {
  subtotal: number;
  gst: number;
  grandTotal: number;
}

/**
 * Calculates subtotal, 5% GST, and grand total for a set of cart items.
 */
export function calculateOrderTotals(items: CartItem[]): OrderCalculation {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.05);
  const grandTotal = subtotal + gst;

  return { subtotal, gst, grandTotal };
}

/**
 * Validates customer details for delivery or pickup.
 */
export function validateCustomerDetails(details: OrderCustomerDetails): { isValid: boolean; error?: string } {
  if (!details.name || details.name.trim().length === 0) {
    return { isValid: false, error: "Customer name is required" };
  }
  if (!details.phone || !/^\+?[0-9 -]{10,20}$/.test(details.phone.trim())) {
    return { isValid: false, error: "A valid contact number (10-20 digits) is required" };
  }
  if (details.deliveryType === "Home Delivery") {
    if (!details.houseNo || details.houseNo.trim().length === 0) {
      return { isValid: false, error: "Flat / House No. is required for delivery" };
    }
    if (!details.street || details.street.trim().length === 0) {
      return { isValid: false, error: "Street / Area is required for delivery" };
    }
  }

  return { isValid: true };
}

/**
 * Formats order items and customer information into a standardized WhatsApp dispatch message.
 */
export function formatWhatsAppOrder(
  items: CartItem[],
  details: OrderCustomerDetails,
  whatsappNumber: string = "+918500371100"
): { text: string; encodedUrl: string } {
  const { subtotal, gst, grandTotal } = calculateOrderTotals(items);

  let text = `*New Order - Mandiwala*\n`;
  text += `---------------------------\n`;
  items.forEach((item) => {
    const sizeText = item.size && item.size !== "Fixed" ? ` (${item.size})` : "";
    text += `${item.name}${sizeText} x ${item.quantity} - ₹${item.price * item.quantity}\n`;
  });
  text += `---------------------------\n`;
  text += `Subtotal: ₹${subtotal}\n`;
  text += `GST (5%): ₹${gst}\n`;
  text += `*Grand Total: ₹${grandTotal}*\n`;
  text += `---------------------------\n`;
  text += `Delivery Type: ${details.deliveryType}\n`;
  text += `Name: ${details.name.trim()}\n`;
  text += `Phone: ${details.phone.trim()}\n`;

  if (details.deliveryType === "Home Delivery") {
    text += `Address:\n`;
    text += `${details.houseNo?.trim()}, ${details.street?.trim()}\n`;
    if (details.landmark?.trim()) text += `Landmark: ${details.landmark.trim()}\n`;
    if (details.pincode?.trim()) text += `Pincode: ${details.pincode.trim()}\n`;
  }

  if (details.instructions?.trim()) {
    text += `Special Instructions: ${details.instructions.trim()}\n`;
  }

  const cleanNumber = whatsappNumber.replace(/[^0-9]/g, "");
  const encodedUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(text)}`;

  return { text, encodedUrl };
}
