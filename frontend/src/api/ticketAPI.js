import { API_URL } from "./api";

export const fetchTicketsByCustomerId = async (customerId) => {
  try {
    const response = await fetch(`${API_URL}/tickets/customer/${customerId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching tickets for customer with ID ${customerId}:`,
      error
    );
    throw error;
  }
};

export const fetchTicketById = async (ticketId) => {
  try {
    const response = await fetch(`${API_URL}/tickets/${ticketId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.ticket;
  } catch (error) {
    console.error(`Error fetching ticket with ID ${ticketId}:`, error);
    throw error;
  }
};

export const fetchTickets = async (page, limit, sortField, sortOrder) => {
  try {
    const url = `${API_URL}/tickets?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching tickets:", error);
    throw error;
  }
};

export const fetchTicketsByStatus = async (ticketStatus) => {
  try {
    let url = `${API_URL}/tickets/status`;
    if (ticketStatus) {
      url += `?status=${encodeURIComponent(ticketStatus)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data; // Assuming the response structure matches your needs
  } catch (error) {
    console.error(`Error fetching tickets by status:`, error);
    throw error;
  }
};

export const fetchTicketDocuments = async (ticketId, dataType) => {
  try {
    const response = await fetch(
      `${API_URL}/ticketDocuments/${ticketId}/${dataType}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error(
      `Error fetching ${dataType} for ticket with ID ${ticketId}:`,
      error
    );
    throw error;
  }
};
