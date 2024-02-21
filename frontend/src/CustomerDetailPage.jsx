import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchCustomerById } from "./api/customerAPI.js";
import CustomerDetailView from "./CustomerDetailView.jsx";
import { Button } from "./components/ui/button.jsx";
import { CustomerView } from "./components/CustomerView.jsx";

function CustomerDetailPage({}) {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchCustomerById(customerId)
      .then((data) => {
        setCustomer(data.customer);
        setLoading(false);
      })
      .catch((err) => {
        console.error(`Error fetching customer with ID ${customerId}:`, err);
        setError(err);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) {
    return <div>Loading...</div>; // Or use a loading spinner
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  if (!customer) {
    return <div>No customer data available.</div>;
  }

  const handleClick = (customerId) => {
    navigate(`/customers/edit/${customerId}`);
  };
  return (
    <div>
      <h2>CustomerDetailPage.jsx</h2>
      {/* <Button onClick={() => handleClick(customer.id)}> Edit user</Button> */}
      {/* <CustomerDetailView customerData={customer} /> */}
      <CustomerView customerData={customer} />
    </div>
  );
}

export default CustomerDetailPage;
