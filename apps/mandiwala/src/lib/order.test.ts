import { describe, it, expect } from "vitest";
import { calculateOrderTotals, validateCustomerDetails, formatWhatsAppOrder } from "./order";
import { CartItem } from "./store";

describe("Order & Cart Calculation Suite", () => {
  const sampleItems: CartItem[] = [
    {
      id: "dish_1_single",
      dishId: "dish_1",
      name: "Special Mutton Mandi",
      size: "Single",
      price: 450,
      quantity: 2,
    },
    {
      id: "dish_2_fixed",
      dishId: "dish_2",
      name: "Kunafeh Dessert",
      size: "Fixed",
      price: 220,
      quantity: 1,
    },
  ];

  it("calculates accurate subtotal, 5% GST, and grand total", () => {
    // 450 * 2 = 900
    // 220 * 1 = 220
    // Subtotal = 1120
    // GST (5%) = 56
    // Grand Total = 1176
    const totals = calculateOrderTotals(sampleItems);
    expect(totals.subtotal).toBe(1120);
    expect(totals.gst).toBe(56);
    expect(totals.grandTotal).toBe(1176);
  });

  it("returns zero totals when cart is empty", () => {
    const totals = calculateOrderTotals([]);
    expect(totals.subtotal).toBe(0);
    expect(totals.gst).toBe(0);
    expect(totals.grandTotal).toBe(0);
  });

  describe("Customer Details Validation", () => {
    it("rejects order with missing customer name", () => {
      const res = validateCustomerDetails({
        name: "",
        phone: "+919876543210",
        deliveryType: "Pickup",
      });
      expect(res.isValid).toBe(false);
      expect(res.error).toContain("Customer name is required");
    });

    it("rejects order with invalid phone numbers", () => {
      const invalidPhones = ["123", "abcdefghij", "+91-abc", ""];
      for (const phone of invalidPhones) {
        const res = validateCustomerDetails({
          name: "Test Customer",
          phone,
          deliveryType: "Pickup",
        });
        expect(res.isValid).toBe(false);
        expect(res.error).toContain("valid contact number");
      }
    });

    it("validates pickup order without address", () => {
      const res = validateCustomerDetails({
        name: "Test Customer",
        phone: "+919876543210",
        deliveryType: "Pickup",
      });
      expect(res.isValid).toBe(true);
    });

    it("requires houseNo and street for Home Delivery", () => {
      const resWithoutAddress = validateCustomerDetails({
        name: "Test Customer",
        phone: "+919876543210",
        deliveryType: "Home Delivery",
        houseNo: "",
        street: "",
      });
      expect(resWithoutAddress.isValid).toBe(false);

      const resWithAddress = validateCustomerDetails({
        name: "Test Customer",
        phone: "+919876543210",
        deliveryType: "Home Delivery",
        houseNo: "Plot 42",
        street: "Subedari Road",
      });
      expect(resWithAddress.isValid).toBe(true);
    });
  });

  describe("formatWhatsAppOrder", () => {
    it("generates an itemized receipt with encoded wa.me URL", () => {
      const { text, encodedUrl } = formatWhatsAppOrder(
        sampleItems,
        {
          name: "Koushik",
          phone: "9876543210",
          deliveryType: "Home Delivery",
          houseNo: "12-34",
          street: "Hanamkonda",
          instructions: "Less spicy please",
        },
        "+918500371100"
      );

      expect(text).toContain("*New Order - Mandiwala*");
      expect(text).toContain("Special Mutton Mandi (Single) x 2 - ₹900");
      expect(text).toContain("Kunafeh Dessert x 1 - ₹220");
      expect(text).toContain("Subtotal: ₹1120");
      expect(text).toContain("GST (5%): ₹56");
      expect(text).toContain("*Grand Total: ₹1176*");
      expect(text).toContain("Delivery Type: Home Delivery");
      expect(text).toContain("12-34, Hanamkonda");
      expect(text).toContain("Special Instructions: Less spicy please");

      expect(encodedUrl).toContain("https://wa.me/918500371100?text=");
      expect(encodedUrl).toContain(encodeURIComponent("Special Mutton Mandi"));
    });
  });
});
