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

function TicketTableSmall({
  // ticketData,
  customerId,
}) {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);

  const [isLoading, setIsLoading] = useState(false); // Loading state

  useEffect(() => {
    fetchCustomerData(customerId, "tickets")
      .then((data) => {
        setTickets(data); // Assuming the API returns an array directly
      })
      .catch((error) => console.error(error));
  }, [customerId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Jobs</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>JOB #</TableHead>
              <TableHead>SUBJECT</TableHead>
              <TableHead>CREATED</TableHead>
              <TableHead>STATUS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tickets.map((ticket, index) => (
              <TableRow
                className="odd:bg-gray-100 even:bg-white"
                key={index}
                onClick={() => navigate(`/tickets/${ticket.id}`)}
              >
                <TableCell>{ticket.number}</TableCell>
                <TableCell>{ticket.subject}</TableCell>
                <TableCell>
                  {new Date(ticket.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell>{ticket.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

export default TicketTableSmall;
