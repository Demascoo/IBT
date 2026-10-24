"use client";

import { toCsv, downloadCsv } from "@/lib/csv";

export default function ExportButton({ orders }) {
  const handleExport = () => {
    
    const flatOrders = orders.map((o) => ({
      ID: o.id,
      Name: o.name,
      Phone: o.phone,
      Area: o.area,
      Total: o.total,
      Status: o.status,
      Date: new Date(o.createdAt).toISOString(),
    }));

    const csv = toCsv(flatOrders);
    downloadCsv(csv, "addis-eats-orders.csv");
  };

  return (
    <button
      onClick={handleExport}
      className="btn btn-secondary"
      style={{ marginBottom: "1rem" }}
    >
      Export to CSV
    </button>
  );
}
