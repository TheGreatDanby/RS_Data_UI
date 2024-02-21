import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuTrigger,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
  DropdownMenuContent,
  DropdownMenu,
} from "@/components/ui/dropdown-menu";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  PaginationPrevious,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
  PaginationContent,
  Pagination,
} from "@/components/ui/pagination";

import { useNavigate } from "react-router-dom";

export default function Table2({
  data,
  currentPage,
  setCurrentPage,
  totalPages,
  sortField,
  setSortField,
  toggleSortOrder,
}) {
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

  const editCustomer = (event, customerId) => {
    event.stopPropagation();
    navigate(`/customers/edit/${customerId}`);
  };
  const newCustomer = (event) => {
    event.stopPropagation();
    navigate(`/customers/new/`);
  };

  // const viewCustomer = (customerId) => {
  //   navigate(`/customers/${customerId}`);
  // };

  return (
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
          className="bg-green-600	hover:bg-green-800"
          onClick={(event) => newCustomer(event)}
        >
          New Customer
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-lg font-bold">Name</TableHead>
            {/* <TableHead>Business Name</TableHead> */}
            <TableHead className="text-lg font-bold">Email</TableHead>
            <TableHead className="text-lg font-bold">Phone</TableHead>
            <TableHead className="text-lg font-bold">Created At</TableHead>
            <TableHead className="text-lg font-bold">Edit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((customer, index) => (
            <TableRow
              className="odd:bg-gray-100 even:bg-white"
              key={index}
              // onClick={() => viewCustomer(customer.id)}
            >
              <TableCell
                className="font-semibold text-sky-500 hover:text-sky-700 cursor-pointer"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                {/* {customer.fullname} */}
                {customer.business_name ? (
                  <>
                    <div>{customer.business_name}</div>{" "}
                    <div className="font-light">{customer.fullname}</div>
                  </>
                ) : (
                  customer.fullname
                )}
              </TableCell>
              {/* <TableCell>{customer.business_name || ""}</TableCell> */}
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.mobile}</TableCell>
              <TableCell>
                {new Date(customer.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button
                  className="bg-amber-600 hover:bg-amber-800	"
                  onClick={(event) => editCustomer(event, customer.id)}
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

function SearchIcon(props) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
