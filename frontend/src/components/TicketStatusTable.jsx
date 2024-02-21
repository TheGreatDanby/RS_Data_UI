import { fetchTicketsByStatus } from "@/api/ticketAPI";
import React, { useEffect, useState } from "react";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function TicketStatusTable({ status }) {
  const [tickets, setTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const getTickets = async () => {
      setIsLoading(true);
      try {
        const fetchedTickets = await fetchTicketsByStatus(status); // Assuming you're fetching 'New' tickets
        if (fetchedTickets && fetchedTickets[status]) {
          setTickets(fetchedTickets[status]);
          setTotalCount(fetchedTickets[status].length); // If totalCount is needed
        } else {
          setTickets([]);
          setTotalCount(0);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (status) {
      getTickets();
    }
  }, [status]); // Add dependencies if needed

  return (
    <div className="bg-white rounded-md">
      <div className="flex flex-row bg-black text-white px-4 py-1 rounded-t-md justify-between">
        <h2 className="">{status}</h2>
        <span>Total Tickets: {totalCount}</span>
      </div>
      <Table>
        <TableHeader className="transform-none">
          <TableRow>
            <TableHead className="text-lg font-bold">Job #</TableHead>
            <TableHead className="text-lg font-bold">Subject</TableHead>
            <TableHead className="text-lg font-bold">Customer</TableHead>
            <TableHead className="text-lg font-bold">Ticket Type</TableHead>
            <TableHead className="text-lg font-bold">Status</TableHead>
            <TableHead className="text-lg font-bold">Created</TableHead>
            <TableHead className="text-lg font-bold"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tickets.map((ticket, index) => (
            <TableRow className="odd:bg-gray-100 even:bg-white" key={index}>
              <TableCell
                className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                onClick={() => navigate(`/tickets/${ticket.id}`)}
              >
                {ticket.number}
              </TableCell>
              <TableCell>{ticket.subject}</TableCell>
              <TableCell
                className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                onClick={() => navigate(`/customers/${ticket.customer_id}`)}
              >
                {ticket.customer_business_then_name}
              </TableCell>
              <TableCell>{ticket.problem_type}</TableCell>

              <TableCell>{ticket.status}</TableCell>
              <TableCell>
                {" "}
                {new Date(ticket.created_at).toLocaleDateString()}
              </TableCell>

              <TableCell>
                <Button
                  className="bg-amber-600	"
                  onClick={(event) => editTicket(event, ticket.id)}
                >
                  {" "}
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <h2 className="font-bold pl-4">Total Tickets: {totalCount}</h2> */}
    </div>
  );
}
