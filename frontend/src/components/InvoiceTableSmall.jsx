import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { fetchCustomerData } from "@/api/customerAPI";

function InvoiceTableSmall({ customerId }) {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetchCustomerData(customerId, "invoices")
      .then((data) => {
        setInvoices(data); // Assuming the API returns an array directly
      })
      .catch((error) => console.error(error));
  }, [customerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoices</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>INV #</TableHead>
              <TableHead>Paid</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice, index) => (
              <TableRow
                className="odd:bg-gray-100 even:bg-white"
                key={index}
                onClick={() => navigate(`/invoices/${invoice.id}`)}
              >
                <TableCell>{invoice.number}</TableCell>
                <TableCell>
                  {invoice.is_paid ? (
                    <span style={{ color: "green" }}>✅</span> // Green tick (checkmark)
                  ) : (
                    <span style={{ color: "red" }}>❌</span> // Red cross (X)
                  )}
                </TableCell>
                <TableCell>
                  {new Date(invoice.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{invoice.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default InvoiceTableSmall;
