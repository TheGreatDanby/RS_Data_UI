import React from "react";

function CustomerDetailView({ customerData }) {
  // Function to recursively render customer properties
  const renderCustomerProperty = (data) => {
    if (typeof data === "object" && !Array.isArray(data) && data !== null) {
      return Object.entries(data).map(([key, value]) => (
        <div key={key}>
          <strong>{key}:</strong> {renderCustomerProperty(value)}
        </div>
      ));
    } else if (Array.isArray(data)) {
      return data.map((item, index) => (
        <div key={index}>
          <em>Item {index + 1}:</em> {renderCustomerProperty(item)}
        </div>
      ));
    } else {
      return String(data);
    }
  };

  return (
    <div>
      <h2>CustomerDetailView.jsx</h2>
      {customerData &&
        Object.entries(customerData).map(([key, value]) => {
          // Skip rendering the _id field or any other fields you don't want to display
          if (key === "_id") return null;

          return (
            <div key={key} className="customer-detail-field">
              <strong>{key}:</strong> {renderCustomerProperty(value)}
            </div>
          );
        })}
    </div>
  );
}

export default CustomerDetailView;
