import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import LineItemsTable from "./LineItemsTable";

export default function Cart() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-200" variant="outline">
          <CostIcon className="h-6 w-6" />
          Ticket Charges
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[800px] grid grid-cols-[1fr_2fr] gap-4 bg-red-200"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="field1">Field 1</Label>
            <Input id="field1" placeholder="Enter field 1" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field2">Field 2</Label>
            <Input id="field2" placeholder="Enter field 2" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field3">Field 3</Label>
            <Input id="field3" placeholder="Enter field 3" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field4">Field 4</Label>
            <Input id="field4" placeholder="Enter field 4" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="field5">Field 5</Label>
            <Input id="field5" placeholder="Enter field 5" />
          </div>
          <div className="flex justify-end items-center">
            <Button className="grow" type="submit">
              Add to Cart
            </Button>
          </div>
        </div>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Column 1</TableHead>
                <TableHead>Column 2</TableHead>
                <TableHead>Column 3</TableHead>
                <TableHead>Column 4</TableHead>
                <TableHead>Column 5</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Data 1</TableCell>
                <TableCell>Data 2</TableCell>
                <TableCell>Data 3</TableCell>
                <TableCell>Data 4</TableCell>
                <TableCell>Data 5</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          {/* <LineItemsTable /> */}
        </div>
        {/* <div className="flex justify-end items-center mt-4">
          <Button variant="outline">Save</Button>
        </div> */}
        <DialogFooter className=" flex justify-end items-center mt-4">
          <DialogClose asChild>
            <Button className="grow" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CostIcon(props) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 13H21V19C21 20.1046 20.1046 21 19 21M17 13V19C17 20.1046 17.8954 21 19 21M17 13V5.75707C17 4.85168 17 4.39898 16.8098 4.13646C16.6439 3.90746 16.3888 3.75941 16.1076 3.72897C15.7853 3.69408 15.3923 3.91868 14.6062 4.36788L14.2938 4.54637C14.0045 4.7117 13.8598 4.79438 13.7062 4.82675C13.5702 4.85539 13.4298 4.85539 13.2938 4.82675C13.1402 4.79438 12.9955 4.7117 12.7062 4.54637L10.7938 3.45359C10.5045 3.28826 10.3598 3.20559 10.2062 3.17322C10.0702 3.14457 9.92978 3.14457 9.79383 3.17322C9.64019 3.20559 9.49552 3.28826 9.20618 3.4536L7.29382 4.54637C7.00448 4.71171 6.85981 4.79438 6.70617 4.82675C6.57022 4.85539 6.42978 4.85539 6.29383 4.82675C6.14019 4.79438 5.99552 4.71171 5.70618 4.54637L5.39382 4.36788C4.60772 3.91868 4.21467 3.69408 3.89237 3.72897C3.61123 3.75941 3.35611 3.90746 3.1902 4.13646C3 4.39898 3 4.85168 3 5.75707V16.2C3 17.8801 3 18.7202 3.32698 19.362C3.6146 19.9264 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H19M12 10.5C11.5 10.376 10.6851 10.3714 10 10.376C9.77091 10.3775 9.90941 10.3678 9.6 10.376C8.79258 10.4012 8.00165 10.7368 8 11.6875C7.99825 12.7003 9 13 10 13C11 13 12 13.2312 12 14.3125C12 15.1251 11.1925 15.4812 10.1861 15.5991C9.3861 15.5991 9 15.625 8 15.5M10 16V17M10 8.99998V9.99998" />
    </svg>
  );
}
