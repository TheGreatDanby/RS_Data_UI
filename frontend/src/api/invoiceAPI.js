import { API_URL } from "./api";

export const fetchInvoices = async (page, limit, sortField, sortOrder) => {
  try {
    const url = `${API_URL}/invoices?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw error;
  }
};

export const fetchInvoiceById = async (invoiceId) => {
  try {
    const response = await fetch(`${API_URL}/invoices/${invoiceId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.invoice;
  } catch (error) {
    console.error(`Error fetching invoice with ID ${invoiceId}:`, error);
    throw error;
  }
};

export const fetchInvoiceByTicketId = async (ticketId) => {
  try {
    const response = await fetch(`${API_URL}/invoices/ticket/${ticketId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.invoice;
  } catch (error) {
    console.error(`Error fetching Invoice for Ticket ID ${ticketId}:`, error);
    throw error;
  }
};
