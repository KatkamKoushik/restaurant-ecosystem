import { CartItem } from "@/store/cart";

export interface CustomerDetails {
  fullName: string;
  mobile: string;
  flatNo: string;
  street: string;
  landmark: string;
  pincode: string;
  instructions: string;
  orderType: 'delivery' | 'pickup';
}

export const generateWhatsAppLink = (items: CartItem[], total: number, customer: CustomerDetails) => {
  const phoneNumber = "916303563242";
  
  let message = `Hello, I would like to place an order.\n\n*Order Type*: ${customer.orderType === 'delivery' ? 'Home Delivery' : 'Self Pickup'}\n\n*Customer Details*\nName: ${customer.fullName}\nMobile: ${customer.mobile}`;

  if (customer.orderType === 'delivery') {
    message += `\n\n*Delivery Address*\nFlat / House No.: ${customer.flatNo}\nStreet / Area: ${customer.street}`;
    if (customer.landmark) {
      message += `\nLandmark: ${customer.landmark}`;
    }
    if (customer.pincode) {
      message += `\nPincode: ${customer.pincode}`;
    }
  }
  
  if (customer.instructions) {
    message += `\n\n*Special Instructions*\n${customer.instructions}`;
  }
  
  message += `\n\n*Order Details*\n`;
  
  items.forEach((item) => {
    message += `${item.quantity}x ${item.name} (₹${item.price})\n`;
  });
  
  message += `\n*Total: ₹${total}*\nPlease confirm.`;
  
  const encodedMessage = encodeURIComponent(message);
  
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};
