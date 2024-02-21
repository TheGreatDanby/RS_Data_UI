import { fetchCustomers } from "@/api/customerAPI.js";
import React, { useState, useEffect } from "react";
import { TableDemo } from "./TableDemo";
import Table2 from "./Table2";
import { ProgressBar } from "./ProgressBar";

function CustomerTable() {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const limit = 10; // You can make this dynamic or configurable
  const [sortField, setSortField] = useState(null); // The field to sort by
  const [sortOrder, setSortOrder] = useState("asc"); // Sort order: 'asc' or 'desc'
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // const handleSort = (field) => {
  //   if (sortField === field) {
  //     // Toggle sort order if the same field is clicked again
  //     setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  //   } else {
  //     // Change the field to sort by
  //     setSortField(field);
  //     setSortOrder("asc");
  //   }
  // };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // useEffect(() => {
  //   setIsLoading(true); // Start loading

  //   fetchCustomers(currentPage, limit, sortField, sortOrder)
  //     .then((response) => {
  //       setCustomers(response.customers);
  //       setTotalCount(response.totalCount); // Set the total count
  //       setTotalPages(Math.ceil(response.totalCount / limit));
  //       setIsLoading(false); // Data loaded, stop loading
  //     })
  //     .catch(console.error);
  // }, [currentPage, sortField, sortOrder]);
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
      {isLoading ? (
        <ProgressBar loading={isLoading} />
      ) : (
        <Table2
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

export default CustomerTable;
