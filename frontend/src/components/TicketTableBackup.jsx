// import Link from "next/link";

import { Tabs } from "@/components/ui/tabs";

import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

export default function TicketTable() {
  return (
    <div className="flex flex-col h-screen bg-">
      {/* <header className="flex h-14 items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
        <div className="lg:hidden" href="#">
          <Package2Icon className="h-6 w-6" />
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
                src="/placeholder.svg"
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
      </header> */}
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6 bg-white">
        <div className="flex items-center">
          <h1 className="font-semibold text-lg md:text-2xl">Jobs/Tickets</h1>
        </div>
        {/* <div className="flex justify-around border-b-2 mb-4">
          <Button className="py-2 px-4 font-semibold" variant="ghost">
            All
          </Button>
          <Button className="py-2 px-4 font-semibold" variant="ghost">
            Open
          </Button>
          <Button className="py-2 px-4 font-semibold" variant="ghost">
            In Progress
          </Button>
          <Button className="py-2 px-4 font-semibold" variant="ghost">
            Closed
          </Button>
        </div> */}
        <Tabs>
          <div className="flex justify-around border-b-2 mb-4">
            <div className="py-2 px-4 font-semibold">All</div>
            <div className="py-2 px-4 font-semibold">Open</div>
            <div className="py-2 px-4 font-semibold">In Progress</div>
            <div className="py-2 px-4 font-semibold">Closed</div>
          </div>
          <div>
            <div />
            <div />
            <div />
            <div />
          </div>
        </Tabs>
        <div className="border shadow-sm rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Job #</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Linked Customer</TableHead>
                <TableHead>Ticket Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">JOB001</TableCell>
                <TableCell>Job Subject</TableCell>
                <TableCell>2024-01-25</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Open</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
}

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
