const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"] as const;
type Area = (typeof AREAS)[number];

type OrderStatus =
  | "PENDING"
  | "PREPARING"
  | "ON_THE_WAY"
  | "DELIVERED"
  | "CANCELLED";

type Dish = {
  name: string;
  priceSantim: number;
};

type Order = {
  readonly id: number;
  customer: string;
  area: Area;
  status: OrderStatus;
  dishes: Dish[];
  phone?: string;
  totalSantim: number;
};

function deliveryFee(order: Order): number {
  if (order.totalSantim >= 50000) {
    return 0;
  }
  return order.area === "Bole" ? 4000 : 6000;
}

function statusMessage(status: OrderStatus): string {
  switch (status) {
    case "PENDING":
      return "Waiting for the restaurant to accept";
    case "PREPARING":
      return "Your food is being cooked";
    case "ON_THE_WAY":
      return "The rider has left the restaurant";
    case "DELIVERED":
      return "Delivered — enjoy your meal";
    case "CANCELLED":
      return "This order was cancelled";
    default: {
      const unreachable: never = status;
      return unreachable;
    }
  }
}

function formatEtb(santim: number): string {
  return new Intl.NumberFormat("en-ET", {
    style: "currency",
    currency: "ETB",
  }).format(santim / 100);
}

function receipt(order: Order): string {
  return `
ADDIS EATS - ORDER #${order.id}
Customer: ${order.customer}
Area:     ${order.area}
Status:   ${statusMessage(order.status)}

Items:
${order.dishes.map((d) => `- ${d.name}: ${formatEtb(d.priceSantim)}`).join("\n")}

Subtotal: ${formatEtb(order.totalSantim)}
Delivery: ${formatEtb(deliveryFee(order))}
Total:    ${formatEtb(order.totalSantim + deliveryFee(order))}
  `.trim();
}





