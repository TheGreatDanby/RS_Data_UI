import React from "react";
import InvoiceTable from "./components/InvoiceTable";

function Invoices() {
  return (
    <div className="h-full min-h-screen min-w-40 bg-gray-200 p-5">
      {/* <h1 className="text-2xl">Invoices</h1> */}

      <InvoiceTable />
    </div>
  );
}

export default Invoices;
