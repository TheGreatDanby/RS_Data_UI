// import "./navbar.css";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenu,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState("");

  const navigateToPage = (value) => {
    navigate(`/${value}/new`);
  };

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    navigateToPage(value);
  };

  const goBack = () => {
    navigate(-1); // Navigates back to the previous page
  };
  const goForward = () => {
    navigate(+1); // Navigates back to the previous page
  };

  return (
    // <div className="navbar bg-indigo-700 text-white">
    //   <div className="logo">
    //     <img src="logo.png" alt="" className="w-8" />
    //     <span>RS-Backup</span>
    //   </div>
    //   <div className="icons">
    //     <img src="/search.svg" alt="" className="icon" />
    //     <img src="/app.svg" alt="" className="icon" />
    //     <img src="/expand.svg" alt="" className="icon" />
    //     <div className="notification">
    //       <img src="/notifications.svg" alt="" />
    //       <span>1</span>
    //     </div>
    //     <div className="user">
    //       <img src="/profile.png" alt="" />
    //       <span>Daniel</span>
    //     </div>
    //     <img src="settings.svg" alt="" className="icon" />
    //   </div>
    // </div>
    <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
      <div className="lg:hidden" href="#">
        <img src="SearchIcon" className="h-6 w-6" />
        <span className="sr-only">Home</span>
      </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
              placeholder="Search jobs/tickets..."
              type="search"
            />
          </div>
        </form>
      </div>
      <div className="flex gap-4">
        <Select onValueChange={handleSelectChange}>
          <SelectTrigger
            className="text-white bg-green-600 hover:bg-green-800"
            id="actions"
          >
            <SelectValue placeholder="Add New" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="customers">Customer</SelectItem>
            <SelectItem value="tickets">Ticket</SelectItem>
            <SelectItem value="invoices">Invoice</SelectItem>
            <SelectItem value="estimates">Estimate</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button className="bg-blue-500 hover:bg-blue-700" onClick={goBack}>
        <ArrowLeftIcon className="h-4 w-4" />
      </Button>
      <Button className="bg-blue-500 hover:bg-blue-700" onClick={goForward}>
        <ArrowRightIcon className="h-4 w-4" />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="rounded-full border border-gray-200 w-8 h-8 dark:border-gray-800"
            size="icon"
            variant="ghost"
          >
            <img
              alt="Avatar"
              className="rounded-full"
              height="32"
              src="/profile.png"
              style={{
                aspectRatio: "32/32",
                objectFit: "cover",
              }}
              width="32"
            />
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuItem>Support</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
};

export default Navbar;

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
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
function ArrowLeftIcon(props) {
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
      <path d="m12 19-7-7 7-7" />
      <path d="M19 12H5" />
    </svg>
  );
}
function ArrowRightIcon(props) {
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
      <g transform="scale(-1, 1) translate(-24, 0)">
        <path d="m12 19-7-7 7-7" />
        <path d="M19 12H5" />
      </g>
    </svg>
  );
}
