import React from "react";
import TicketView from "./components/TicketView";
import TicketTable from "./components/TicketTable";

function Tickets() {
  return (
    <div className="bg-gray-200">
      <TicketTable />
    </div>
  );
}

export default Tickets;
