"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AREAS = ["Bole", "Kazanchis", "Piassa", "Megenagna"];
function deliveryFee(order) {
    if (order.totalSantim >= 50000) {
        return 0;
    }
    return order.area === "Bole" ? 4000 : 6000;
}
function statusMessage(status) {
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
            const unreachable = status;
            return unreachable;
        }
    }
}
function formatEtb(santim) {
    return new Intl.NumberFormat("en-ET", {
        style: "currency",
        currency: "ETB",
    }).format(santim / 100);
}
function receipt(order) {
    return `
==============================
ADDIS EATS - ORDER #${order.id}
==============================
Customer: ${order.customer}
Area:     ${order.area}
Status:   ${statusMessage(order.status)}

Items:
${order.dishes.map((d) => `- ${d.name}: ${formatEtb(d.priceSantim)}`).join("\n")}

Subtotal: ${formatEtb(order.totalSantim)}
Delivery: ${formatEtb(deliveryFee(order))}
Total:    ${formatEtb(order.totalSantim + deliveryFee(order))}
==============================
  `.trim();
}
