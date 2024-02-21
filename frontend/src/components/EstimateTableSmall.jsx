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

function EstimateTableSmall({ customerId }) {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState([]);

  useEffect(() => {
    fetchCustomerData(customerId, "estimates")
      .then((data) => {
        setEstimates(data); // Assuming the API returns an array directly
      })
      .catch((error) => console.error(error));
  }, [customerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Estimates</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>EST #</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {estimates.map((estimate, index) => (
              <TableRow
                className="odd:bg-gray-100 even:bg-white"
                key={index}
                onClick={() => navigate(`/estimates/${estimate.id}`)}
              >
                <TableCell>{estimate.number}</TableCell>
                <TableCell>{estimate.status}</TableCell>
                <TableCell>
                  {new Date(estimate.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{estimate.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default EstimateTableSmall;
