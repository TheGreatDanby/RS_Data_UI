import { API_URL } from "./api";

export const fetchCustomers = async (page, limit, sortField, sortOrder) => {
  try {
    // Construct the URL with pagination parameters
    const url = `${API_URL}/customers?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw error;
  }
};

export const fetchCustomerById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/customers/${id}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching customer with ID ${id}:`, error);
    throw error;
  }
};

export const updateCustomerById = async (id, updatedData) => {
  try {
    const url = `${API_URL}/customers/${id}`;

    const response = await fetch(url, {
      method: "PATCH", // or 'PATCH' if partially updating the customer
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    return await response.json(); // Assuming the server responds with the updated customer object
  } catch (error) {
    console.error(`Error updating customer with ID ${id}:`, error);
    throw error;
  }
};

export const fetchCustomerData = async (customerId, dataType) => {
  try {
    const response = await fetch(
      `${API_URL}/customerData/${customerId}/${dataType}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching ${dataType} for customer with ID ${customerId}:`,
      error
    );
    throw error;
  }
};

export const createCustomer = async (customerData) => {
  try {
    const response = await fetch(`${API_URL}/customers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customerData),
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const createdCustomer = await response.json();
    return createdCustomer;
  } catch (error) {
    console.error(`Error creating customer:`, error);
    throw error;
  }
};
