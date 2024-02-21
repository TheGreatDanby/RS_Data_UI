import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { fetchEstimateById } from "@/api/estimateAPI";
import { fetchLineItemsByDocumentId } from "@/api/lineItemAPI";

import { Button } from "@/components/ui/button";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import LineItemsTable from "./LineItemsTable";
import CustomerDetailsCard from "./CustomerDetailsCard";

export default function EstimateView() {
  const navigate = useNavigate();
  const { estimateId } = useParams();
  const [estimate, setEstimate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lineItems, setLineItems] = useState([]);

  const statusStyles = {
    Fresh: "bg-blue-500 hover:bg-blue-700",
    Approved: "bg-green-500 hover:bg-green-700",
    Declined: "bg-red-500 hover:bg-red-700",
    default: "bg-gray-500 hover:bg-gray-700",
  };

  const getButtonClass = (status) => {
    return statusStyles[status] || statusStyles.default;
  };

  useEffect(() => {
    setIsLoading(true);
    fetchEstimateById(estimateId)
      .then((data) => {
        setEstimate(data);
        return fetchLineItemsByDocumentId("estimate", estimateId);
      })
      .then((lineItemsData) => {
        setLineItems(lineItemsData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching estimate:", err);
        setError(err);
        setIsLoading(false);
      });
  }, [estimateId]);

  if (isLoading) {
    return <div>Loading...</div>; // Or use a loading spinner component
  }

  if (error) {
    return <div>Error loading estimate: {error.message}</div>;
  }

  if (!estimate) {
    return <div>No estimate data available.</div>;
  }

  return (
    <div className="flex flex-col min-h-screen p-4 md:p-6">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">
          Estimate #{estimate.number}{" "}
          <button
            className={`${getButtonClass(
              estimate.status
            )} text-white font-semibold px-2 rounded`}
          >
            {estimate.status}
          </button>
        </h1>

        <div className="flex items-center gap-4">
          <Button variant="outline">Download PDF</Button>
          <Button variant="outline">Print</Button>
          <Button
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-700"
            href="#"
            onClick={() => navigate(`/estimates/`)}
          >
            <ArrowLeftIcon className="h-4 w-4" />
            {/* <span onClick={() => navigate(`/estimates/`)}>
              Back to Estimates
            </span> */}
          </Button>
        </div>
      </header>
      <main className="flex-1 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Estimate Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">Estimate Number:</div>
              <div>{estimate.number}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">Date:</div>
              <div> {new Date(estimate.created_at).toLocaleDateString()}</div>
            </div>
            {/* <div className="flex items-center gap-2">
              <div className="font-medium">Due Date:</div>
              <div>July 23, 2022</div>
            </div> */}
            <div className="flex items-center gap-2">
              <div className="font-medium">Total Amount:</div>
              <div>{estimate.total}</div>
            </div>
          </CardContent>
        </Card>
        {/* <Card>
          <CardHeader>
            <CardTitle>Billing Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              John Doe
              <br />
              1234 Main St.
              <br />
              Anytown, CA 12345
            </div>
          </CardContent>
        </Card> */}{" "}
        <CustomerDetailsCard customerId={estimate.customer_id} />
        <Card className="bg-red-200	">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              Jane Doe
              <br />
              5678 Elm St.
              <br />
              Anytown, CA 12345
            </div>
          </CardContent>
        </Card>
        {/* ------------------- Line Items ------------------- */}
        {/* <Card className="flex-row-reverse md:col-span-2 lg:col-span-3">
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
                  const unitPrice = parseFloat(item.price);
                  const quantity = parseFloat(item.quantity);
                  const totalPrice = (unitPrice * quantity).toFixed(2);

                  return (
                    <TableRow
                      className="odd:bg-gray-100 even:bg-white"
                      key={index}
                    >
                      <TableCell>{item.item}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{quantity}</TableCell>
                      <TableCell>${unitPrice.toFixed(2)}</TableCell>
                      <TableCell>${totalPrice}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card> */}
        <LineItemsTable
          class="rounded-lg border bg-card text-card-foreground shadow-sm md:col-span-2 lg:col-span-3"
          lineItems={lineItems}
        />
        {/* ------------------- Line Items ------------------- */}
        <Card className="md:col-span-1 lg:col-span-1 bg-red-200">
          <CardHeader>
            <CardTitle>Applied Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Applied</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>29-01-2024</TableCell>
                  <TableCell>eftpos</TableCell>
                  <TableCell>$99.00</TableCell>
                  <TableCell>$99.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-1 bg-red-200">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="flex items-center gap-2">
              <div className="font-medium">Subtotal:</div>
              <div>${estimate.subtotal}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">GST:</div>
              <div>${estimate.tax}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">Total:</div>
              <div>${estimate.total}</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">Payments:</div>
              <div>$149.00</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="font-medium">Balance Due:</div>
              <div>$0.00</div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
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
