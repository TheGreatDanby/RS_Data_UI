import React from "react";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function InvoiceDetails({ invoiceData }) {
  const navigate = useNavigate();

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-2">
        <div className="flex items-center gap-2">
          <div className="font-medium">Invoice:</div>
          <div>#{invoiceData.number}</div>
        </div>
        <div
          className="flex items-center gap-2"
          onClick={() => navigate(`/tickets/${invoiceData.ticket_id}`)}
        >
          <div className="font-medium">Ticket:</div>
          <div className="font-medium text-sky-500 hover:text-sky-700 cursor-pointer">
            #{invoiceData.ticket_id}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium">Date:</div>
          <div>{invoiceData.date}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium">Due Date:</div>
          <div>{invoiceData.due_date}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium">Purchase Order:</div>
          <div>{invoiceData.po_number}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="font-medium">Total Amount:</div>
          <div>${invoiceData.total}</div>
        </div>
      </CardContent>
    </Card>
  );
}
