import CustomerDetailPage from "./CustomerDetailPage.jsx";
import Customers from "./Customers.jsx";
import Estimates from "./Estimates.jsx";
import Home from "./Home.jsx";
import Invoices from "./Invoices.jsx";
import Tickets from "./Tickets.jsx";
import EstimateView from "./components/EstimateView.jsx";
import InvoiceView from "./components/InvoiceView.jsx";
import Menu from "./components/Menu.jsx";
import SideMenu from "./components/SideMenu.jsx";
import TicketView from "./components/TicketView.jsx";
import { CustomerEditPage } from "./components/CustomerEditPage.jsx";
import Navbar from "./components/navbar.jsx";

import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <BrowserRouter
      // basename="/"
      future={{ v7_startTransition: true }}
    >
      <div className="App min-h-screen flex">
        <SideMenu />

        <div className="flex-1 flex flex-col">
          <Navbar />

          <div className="p-5 overflow-auto">
            <Routes>
              <Route path="*" /> {/* 👈 Renders at /app/ */}
              <Route path="/customers" element={<Customers />} />
              <Route path="/customers/new" element={<CustomerEditPage />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetailPage />}
              />
              <Route
                path="/customers/edit/:customerId"
                element={<CustomerEditPage />}
              />
              {/* <Route path="/customers/:customerId" element={<CustomerFile />} /> */}
              <Route path="/tickets/:ticketId" element={<TicketView />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/invoices/:invoiceId" element={<InvoiceView />} />
              <Route path="/estimates" element={<Estimates />} />
              <Route path="/estimates/:estimateId" element={<EstimateView />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
