import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchTicketById } from "@/api/ticketAPI";

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import TextEditor from "./TextEditor";
import CustomerDetailsCard from "./CustomerDetailsCard";
import Cart from "./Cart";
import DeviceDetails from "./DeviceDetailsCard";
import TextEditorTinyMC from "./TextEditorTinyMC";
import TextEditorQuill from "./TextEditorQuill";
import JobDetailsCard from "./JobDetailsCard";

export default function TicketView() {
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");

  function LineBreakText({ text }) {
    return <div style={{ whiteSpace: "pre-line" }}>{text}</div>;
  }

  useEffect(() => {
    setIsLoading(true);
    fetchTicketById(ticketId)
      .then((data) => {
        setTicket(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ticket:", err);
        setError(err);
        setIsLoading(false);
      });
  }, [ticketId]);

  if (isLoading) {
    return <div>Loading...</div>; // Or use a loading spinner component
  }

  if (error) {
    return <div>Error loading ticket: {error.message}</div>;
  }

  if (!ticket) {
    return <div>No ticket data available.</div>;
  }

  const statusColorClasses = {
    new: "border-red-500",
    "in progress": "border-blue-500",
    "In Progress - Daniel": "border-blue-500",
    waiting: "border-yellow-500",
    "ready for collection": "border-green-500",
    resolved: "border-gray-500",
  };

  return (
    <div className="flex flex-col w-full min-h-screen p-6 bg-gray-200">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold">Job #{ticket.number}</h1>
          <span>TicketView.jsx</span>
          <div className="mt-2">
            <Card>
              <CardHeader>
                <CardTitle>{ticket.subject}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="font-medium">{ticket.problem_type}</div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Cart />
          <Button size="icon" variant="outline">
            <FileEditIcon className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button size="icon" variant="outline">
            <TrashIcon className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </div>
      {/* <div className="flex flex-col md:flex-row gap-6 mt-6"> */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {/* <Card className="bg-red-200	">
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 grid-cols-1 min-w-40">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Date Created
                  </div>
                  <div className="font-medium">
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <FileTextIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Invoice
                  </div>
                  <div className="font-medium">INV-12345</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileTextIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Estimate
                  </div>
                  <div className="font-medium">EST-12345</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TagIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Ticket Type
                  </div>
                  <div className="font-medium">{ticket.problem_type}</div>
                </div>
              </div>
              <div
                className={`flex items-center gap-2 border-solid border-2 rounded-md

                ${
                  statusColorClasses[ticket.status.toLowerCase()] ||
                  "text-black"
                }`}
              >
                <CheckCircleIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Status
                  </div>
                  <div className="font-medium">{ticket.status}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
        <JobDetailsCard ticket={ticket} />

        {/* <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <UserIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Name
                  </div>
                  <div className="font-medium">
                    {ticket.customer_business_then_name}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MailIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Email
                  </div>
                  <div className="font-medium">johndoe@example.com</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Phone
                  </div>
                  <div className="font-medium">+1 234 567 890</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <HomeIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Address
                  </div>
                  <div className="font-medium">123 Main St</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPinIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    City
                  </div>
                  <div className="font-medium">New York</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    State
                  </div>
                  <div className="font-medium">NY</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
        <CustomerDetailsCard customerId={ticket.customer_id} />
        {/* <Card className="bg-red-200	">
          <CardHeader>
            <div className="flex justify-between">
              <CardTitle>Device Details </CardTitle>
              <Button size="icon" variant="outline">
                <FileEditIcon className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <ComputerIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Make
                  </div>
                  <div className="font-medium">{ticket.properties.Make}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ComputerIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Model
                  </div>
                  <div className="font-medium">
                    {ticket.properties["Model/Type"]}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ComputerIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Product ID
                  </div>
                  <div className="font-medium">
                    {ticket.properties["Product ID"]}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquareIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Warranty
                  </div>
                  <div className="font-medium">Yes</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <CheckSquareIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Insurance
                  </div>
                  <div className="font-medium">No</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card> */}
        <DeviceDetails ticket={ticket} />
      </div>
      <div className="flex flex-col  gap-6 mt-6">
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Add Comment</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {/* <textarea
                className="p-2 border rounded-md"
                placeholder="Enter your comment here..."
              /> */}
              <TextEditor />
              {/* <TextEditorTinyMC /> */}
              {/* <TextEditorQuill value={content} onChange={setContent} /> */}
              <Button
                variant="solid"
                className="text-white bg-green-500 hover:bg-green-700"
              >
                Post Comment
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* <Card className="md:w-1/2">
          <CardHeader>
            <CardTitle>Previous Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>John Doe</CardTitle>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Jan 25, 2024
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="font-medium">This is a comment.</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card> */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Previous Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {ticket.comments.map((comment, index) => (
                <Card
                  className={
                    comment.hidden
                      ? "bg-orange-200	 border-double border-2 border-orange-500"
                      : "bg-white"
                  }
                  key={index}
                >
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <CardTitle>{comment.tech}</CardTitle>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(comment.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="font-medium">
                      <LineBreakText text={comment.body} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CalendarIcon(props) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}

function CheckCircleIcon(props) {
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
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function CheckSquareIcon(props) {
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
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  );
}

function ComputerIcon(props) {
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
      <rect width="14" height="8" x="5" y="2" rx="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M6 18h2" />
      <path d="M12 18h6" />
    </svg>
  );
}

function FileEditIcon(props) {
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
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function FileTextIcon(props) {
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
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  );
}

function HomeIcon(props) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function MailIcon(props) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MapIcon(props) {
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
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  );
}

function MapPinIcon(props) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(props) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function TagIcon(props) {
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
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  );
}

function TrashIcon(props) {
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
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
