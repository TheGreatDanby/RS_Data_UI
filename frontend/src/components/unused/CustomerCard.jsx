import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CustomerCard({ data }) {
  return (
    <div>
      <span>CustomerCard.jsx</span>
      {data.map((customer, index) => (
        <Card className="w-[350px] my-5">
          <div key={index}>
            <CardHeader>
              <CardTitle>
                {customer.business_name ? (
                  <>
                    <div>{customer.business_name}</div>{" "}
                    <div className="font-light">{customer.fullname}</div>
                  </>
                ) : (
                  customer.fullname
                )}
              </CardTitle>
              {/* <CardDescription>Customer Name</CardDescription> */}
            </CardHeader>
            <CardContent>
              <div>Email: {customer.email}</div>
              <div>Phone: {customer.mobile}</div>
            </CardContent>
            <CardFooter className="flex justify-between">
              Created at: {new Date(customer.created_at).toLocaleDateString()}
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  );
}
