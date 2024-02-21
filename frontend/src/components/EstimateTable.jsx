// import Link from "next/link";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { fetchEstimates } from "@/api/estimateAPI";
// import InvoiceStatusTable from "./InvoiceStatusTable";

import { ProgressBar } from "./ProgressBar";
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

export default function EstimateTable() {
  const navigate = useNavigate();
  const [estimates, setEstimates] = useState([]);
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
        const response = await fetchEstimates(
          currentPage,
          limit,
          sortField,
          sortOrder
        );
        setEstimates(response.estimates);
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

  const editEstimate = (event, customerId) => {
    event.stopPropagation();
    navigate(`/estimates/edit/${customerId}`);
  };
  const newEstimate = (event) => {
    event.stopPropagation();
    navigate(`/estimates/new/`);
  };

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

  return (
    <div className="h-full min-h-screen min-w-40  p-5">
      <h1 className="font-semibold text-lg md:text-2xl">Estimates</h1>
      <div>
        {isLoading ? (
          <ProgressBar loading={isLoading} />
        ) : (
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <form className="w-full"></form>
              <Button
                className="bg-green-600	"
                onClick={(event) => newEstimate(event)}
              >
                New Estimate
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

            <div>
              <DropdownMenu>
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

            {/* <div className="flex flex-col gap-6">
              {[...selectedStatuses].map((status) => (
                <InvoiceStatusTable key={status} status={status} />
              ))}
            </div> */}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-lg font-bold">EST #</TableHead>
                  <TableHead className="text-lg font-bold">Created</TableHead>
                  <TableHead className="text-lg font-bold">Customer</TableHead>
                  <TableHead className="text-lg font-bold">Ticket</TableHead>
                  <TableHead className="text-lg font-bold">Total</TableHead>
                  <TableHead className="text-lg font-bold">Due</TableHead>
                  <TableHead className="text-lg font-bold">Approved</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {estimates.map((estimate, index) => (
                  <TableRow
                    className="odd:bg-gray-100 even:bg-white"
                    key={index}
                  >
                    <TableCell
                      className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                      onClick={() => navigate(`/estimates/${estimate.id}`)}
                    >
                      {estimate.number}
                    </TableCell>
                    <TableCell>
                      {" "}
                      {new Date(estimate.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell
                      className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                      onClick={() =>
                        navigate(`/customers/${estimate.customer_id}`)
                      }
                    >
                      {estimate.customer_business_then_name}
                    </TableCell>
                    <TableCell
                      className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                      onClick={() => navigate(`/tickets/${estimate.ticket_id}`)}
                    >
                      {estimate.ticket_id ? "Ticket" : ""}
                    </TableCell>
                    <TableCell>$ {estimate.total}0</TableCell>

                    <TableCell>
                      {new Date(estimate.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{estimate.status}</TableCell>

                    <TableCell>
                      <Button
                        className="bg-amber-600	"
                        onClick={(event) => editTicket(event, estimate.id)}
                      >
                        {" "}
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

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
        <h2 className="font-bold	">Total Estimates: {totalCount}</h2>
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
