export interface OrderItemSummary {
  name: string;
  quantity: number;
  price: number;
  size?: string;
}

export interface CustomerOrderDetails {
  fullName: string;
  mobile: string;
  flatNo?: string;
  street?: string;
  landmark?: string;
  pincode?: string;
  instructions?: string;
  orderType?: "delivery" | "pickup";
}

/**
 * Generate a WhatsApp direct order link.
 * Cleans phone number by removing any non-digit characters.
 */
export function generateWhatsAppOrderUrl(
  phoneNumber: string,
  items: OrderItemSummary[],
  total: number,
  customer?: CustomerOrderDetails,
  restaurantName?: string
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, "");

  let message = `Hello${restaurantName ? ` ${restaurantName}` : ""}, I would like to place an order.\n\n`;

  if (customer) {
    if (customer.orderType) {
      message += `*Order Type*: ${customer.orderType === "delivery" ? "Home Delivery" : "Self Pickup"}\n`;
    }
    message += `*Customer Details*\nName: ${customer.fullName}\nMobile: ${customer.mobile}\n`;

    if (customer.orderType === "delivery") {
      message += `\n*Delivery Address*\nFlat / House No.: ${customer.flatNo || "N/A"}\nStreet / Area: ${customer.street || "N/A"}\n`;
      if (customer.landmark) {
        message += `Landmark: ${customer.landmark}\n`;
      }
      if (customer.pincode) {
        message += `Pincode: ${customer.pincode}\n`;
      }
    }

    if (customer.instructions) {
      message += `\n*Special Instructions*\n${customer.instructions}\n`;
    }
  }

  message += `\n*Order Details*\n`;
  items.forEach((item) => {
    const sizeStr = item.size ? ` [${item.size}]` : "";
    message += `${item.quantity}x ${item.name}${sizeStr} (₹${item.price})\n`;
  });

  message += `\n*Total: ₹${total}*\nPlease confirm the order.`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}

/**
 * Build a simple table reservation WhatsApp link.
 */
export function generateWhatsAppReservationUrl(
  phoneNumber: string,
  details: {
    name: string;
    phone: string;
    date: string;
    time: string;
    guests: number | string;
    specialRequests?: string;
    restaurantName?: string;
  }
): string {
  const cleanPhone = phoneNumber.replace(/\D/g, "");
  let message = `🎉 TABLE RESERVATION REQUEST 🎉\n`;
  if (details.restaurantName) {
    message += `*Restaurant:* ${details.restaurantName}\n`;
  }
  message += `*Name:* ${details.name}\n`;
  message += `*Phone:* ${details.phone}\n`;
  message += `*Date:* ${details.date}\n`;
  message += `*Time:* ${details.time}\n`;
  message += `*Guests:* ${details.guests}\n`;

  if (details.specialRequests) {
    message += `*Special Requests:* ${details.specialRequests}\n`;
  }

  message += `\nPlease confirm table availability. Thank you!`;

  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
}
