import { fetchCustomers } from "@/api/customerAPI.js";
import React, { useState, useEffect } from "react";
import { ProgressBar } from "../ProgressBar";
import CustomerCard from "./CustomerCard";

function CustomerCards() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 5; // You can make this dynamic or configurable
  const [sortField, setSortField] = useState(null); // The field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: 'asc' or 'desc'
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading

      try {
        const response = await fetchCustomers(
          currentPage,
          limit,
          sortField,
          sortOrder
        );
        setCustomers(response.customers);
        setTotalCount(response.totalCount); // Set the total count
        setTotalPages(Math.ceil(response.totalCount / limit));
      } catch (error) {
        console.error(error); // Log or handle the error as needed
      }

      setIsLoading(false); // Data loaded or failed, stop loading
    };

    fetchData();
  }, [currentPage, sortField, sortOrder]);

  return (
    <div>
      <span>CustomerCard.jsx</span>
      {isLoading ? (
        <ProgressBar loading={isLoading} />
      ) : (
        <CustomerCard
          data={customers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          sortField={sortField}
          setSortField={setSortField}
          toggleSortOrder={toggleSortOrder}
        />
      )}
      <h2 className="font-bold	">Total Customers: {totalCount}</h2>
    </div>
  );
}

export default CustomerCards;
