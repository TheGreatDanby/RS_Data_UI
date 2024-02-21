import React, { useState } from "react";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default function LineItemsTable({ lineItems }) {
  function LineBreakText({ text }) {
    return <div style={{ whiteSpace: "pre-line" }}>{text}</div>;
  }

  const handleLineItemChange = (index, field) => (e) => {
    const updatedItems = lineItems.map((item, idx) => {
      if (idx === index) {
        return { ...item, [field]: e.target.value };
      }
      return item;
    });
    setLineItems(updatedItems);
  };

  return (
    <div className="flex-row-reverse md:col-span-2 lg:col-span-3">
      <Card>
        <CardHeader>
          <CardTitle>Line Items</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Total Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lineItems.map((item, index) => {
                // Calculate total price
                const unitPrice = parseFloat(item.price);
                const quantity = parseFloat(item.quantity);
                const totalPrice = (unitPrice * quantity).toFixed(2);

                return (
                  <TableRow
                    className="odd:bg-gray-100 even:bg-white"
                    key={index}
                  >
                    <TableCell>{item.item}</TableCell>
                    <TableCell>
                      <Input
                        id={`name-${index}`}
                        value={item.name}
                        onChange={handleLineItemChange(index, "name")}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        className="max-w-20	"
                        type="number"
                        id={`quantity-${index}`}
                        value={item.quantity}
                        onChange={handleLineItemChange(index, "quantity")}
                        step="1"
                      />
                    </TableCell>
                    <TableCell className="flex items-center">
                      <span className="mr-2">$</span>
                      <Input
                        type="number"
                        id={`price-${index}`}
                        value={item.price}
                        onChange={handleLineItemChange(index, "price")}
                        className="max-w-20"
                      />
                    </TableCell>

                    <TableCell>${totalPrice}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
