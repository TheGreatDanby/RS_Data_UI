import React from "react";
import CustomerTable from "./components/CustomerTable.jsx";
import CustomerCards from "./components/unused/CustomerCards.jsx";

function Customers() {
  return (
    <div>
      <div className="h-full min-h-screen min-w-40 bg-gray-200 p-5">
        <h1 className="font-semibold text-lg md:text-2xl">Customers</h1>

        <CustomerTable />
        {/* <CustomerCards /> */}
      </div>
    </div>
  );
}

export default Customers;
