// import Link from "next/link";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchTickets } from "@/api/ticketAPI";
import TicketStatusTable from "./TicketStatusTable";

import { ProgressBar } from "./ProgressBar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TicketTable() {
  const [tickets, setTickets] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10; // You can make this dynamic or configurable
  const [sortField, setSortField] = useState(null); // The field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: 'asc' or 'desc'
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [open, setOpen] = useState(false);

  const [selectedStatuses, setSelectedStatuses] = React.useState(
    new Set(["New"])
  );

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading

      try {
        const response = await fetchTickets(
          currentPage,
          limit,
          sortField,
          sortOrder
        );
        setTickets(response.tickets);
        setTotalCount(response.totalCount); // Set the total count
        setTotalPages(Math.ceil(response.totalCount / limit));
      } catch (error) {
        console.error(error); // Log or handle the error as needed
      }

      setIsLoading(false); // Data loaded or failed, stop loading
    };

    fetchData();
  }, [currentPage, sortField, sortOrder]);

  const maxPageItems = 3; // Max number of pagination items to display

  // Function to render pagination items
  const renderPaginationItems = () => {
    let items = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxPageItems / 2));
    let endPage = Math.min(totalPages, startPage + maxPageItems - 1);

    if (startPage > 1) {
      items.push(
        <PaginationItem key="start">
          <PaginationLink onClick={() => setCurrentPage(1)}>1</PaginationLink>
        </PaginationItem>
      );
      if (startPage > 2) {
        items.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        items.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      items.push(
        <PaginationItem key="end">
          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return items;
  };

  const handleSortSelection = (selectedField) => {
    if (sortField === selectedField) {
      toggleSortOrder(); // If the same field is selected, toggle the sort order
    } else {
      setSortField(selectedField); // Set the new sort field
    }
  };
  const navigate = useNavigate();

  const editTicket = (event, customerId) => {
    event.stopPropagation();
    navigate(`/tickets/edit/${customerId}`);
  };
  const newTicket = (event) => {
    event.stopPropagation();
    navigate(`/tickets/new/`);
  };

  // const viewCustomer = (customerId) => {
  //   navigate(`/customers/${customerId}`);
  // };

  const statusOptions = [
    // "Abandoned - Resolved",
    // "Canceled - Resolved",
    "In Progress",
    "In Progress - Daniel",
    "Invoiced",
    "New",
    "Ready for Collection",
    // "Resolved",
    "Waiting for Parts",
    "Waiting on Customer",
  ];

  const toggleStatus = (status) => {
    setSelectedStatuses((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(status)) {
        newSelected.delete(status);
      } else {
        newSelected.add(status);
      }
      return newSelected;
    });
  };

  function handleStatusChange(e) {
    const selectedOptions = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setSelectedStatuses(selectedOptions);
  }

  // function handleClick() {
  //   console.log("Applying roof...");
  //   setOpen(false);
  // }

  return (
    <div className="h-full min-h-screen min-w-40  p-5">
      <h1 className="font-semibold text-lg md:text-2xl">Tickets</h1>
      <div>
        {isLoading ? (
          <ProgressBar loading={isLoading} />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <form className="w-full">
                {/* <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                placeholder="Search customers"
                type="search"
              />
            </div> */}
              </form>
              <Button
                className="bg-green-600	"
                onClick={(event) => newTicket(event)}
              >
                New Ticket
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sortField}>
                    <DropdownMenuRadioItem
                      onClick={() => handleSortSelection("fullname")}
                    >
                      Name
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      onClick={() => handleSortSelection("email")}
                    >
                      Email
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      onClick={() => handleSortSelection("phone")}
                    >
                      Phone
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem
                      onClick={() => handleSortSelection("created_at")}
                    >
                      Created At
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem>New</SelectItem>
              </SelectContent>
            </Select> */}
            <div>
              <DropdownMenu
              // open={open} onOpenChange={setOpen}
              >
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Select Status</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Choose Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {statusOptions.map((status, index) => (
                    <DropdownMenuCheckboxItem
                      key={index}
                      checked={selectedStatuses.has(status)}
                      onSelect={(e) => e.preventDefault()}
                      onCheckedChange={() => {
                        toggleStatus(status);
                      }}
                    >
                      {status}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            {/* <select
              multiple
              value={selectedStatuses}
              onChange={handleStatusChange}
            >
              {statusOptions.map((status, index) => (
                <option key={index} value={status}>
                  {status}
                </option>
              ))}
            </select> */}

            {/* <Tabs defaultValue="new" className="">
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger
                  className="data-[state=active]:text-sky-500 font-semibold"
                  value="all"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:text-sky-500 font-semibold"
                  value="new"
                >
                  New
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:text-sky-500 font-semibold"
                  value="progress"
                >
                  In Progress
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:text-sky-500 font-semibold"
                  value="waiting"
                >
                  Waiting
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:text-sky-500 font-semibold"
                  value="invoiced"
                >
                  Invoiced
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:text-sky-500 font-semibold"
                  value="resolved"
                >
                  Resolved
                </TabsTrigger>
              </TabsList>
              <TabsContent value="all"></TabsContent>
              <TabsContent value="new">
                <TicketStatusTable status="New" />
              </TabsContent>
              <TabsContent value="progress">
                <TicketStatusTable status="In Progress" />
              </TabsContent>
              <TabsContent value="waiting">
                <TicketStatusTable status="Waiting for Parts" />
              </TabsContent>
              <TabsContent value="invoiced">
                <TicketStatusTable status="Invoiced" />
              </TabsContent>
              <TabsContent value="resolved">
                <TicketStatusTable status="Resolved" />
              </TabsContent>
            </Tabs> */}

            <div className="flex flex-col gap-6">
              {[...selectedStatuses].map((status) => (
                <TicketStatusTable key={status} status={status} />
              ))}
            </div>

            {/* <TicketStatusTable status="New" />

                  <TicketStatusTable status="In Progress" />

                  <TicketStatusTable status="Waiting for Parts" /> */}
            {/* <TicketStatusTable status="New" /> */}

            {/* 
  'Abandoned - Resolved',
  'Canceled - Resolved',
  'In Progress',
  'In Progress - Daniel',
  'Invoiced',
  'New',
  'Ready for Collection',
  'Resolved',
  'Waiting for Parts',
  'Waiting on Customer' 
  */}

            {/* <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg font-bold">Job #</TableHead>
                  <TableHead className="text-lg font-bold">Subject</TableHead>
                  <TableHead className="text-lg font-bold">Created</TableHead>
                  <TableHead className="text-lg font-bold">Customer</TableHead>
                  <TableHead className="text-lg font-bold">
                    Ticket Type
                  </TableHead>
                  <TableHead className="text-lg font-bold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                      onClick={() => navigate(`/tickets/${ticket.id}`)}
                    >
                      {ticket.number}
                    </TableCell>
                    <TableCell>{ticket.subject}</TableCell>
                    <TableCell>
                      {" "}
                      {new Date(ticket.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                      onClick={() =>
                        navigate(`/customers/${ticket.customer_id}`)
                      }
                    >
                      {ticket.customer_business_then_name}
                    </TableCell>
                    <TableCell>{ticket.problem_type}</TableCell>

                    <TableCell>{ticket.status}</TableCell>

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
            </Table> */}

            <Pagination>
              <PaginationContent>
                <PaginationPrevious
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                />
                {renderPaginationItems()}
                <PaginationNext
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                />
              </PaginationContent>
            </Pagination>
          </div>
        )}{" "}
        <h2 className="font-bold	">Total Tickets: {totalCount}</h2>
      </div>
    </div>
  );
}

function ArrowUpDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}
