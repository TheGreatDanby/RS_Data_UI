import { mongoDB } from "../model/mongoDB.js";
import {
  getAllTicketsFromDB,
  getTicketRelatedDocumentsFromDB,
  getTicketsGroupedByStatusFromDB,
} from "../model/ticketModel.js";

export const getAllTickets = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const search = req.query.search; // Assuming you'll use this for filtering
    const sortField = req.query.sortField || "created_at";
    const sortOrder = req.query.sortOrder || "desc";

    const { tickets, totalCount } = await getAllTicketsFromDB(
      page,
      limit,
      search,
      sortField,
      sortOrder
    );

    res.json({ tickets, totalCount });
  } catch (err) {
    console.error(`Error in getAllTickets: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getTicketById = async (req, res) => {
  const ticketId = parseInt(req.params.id, 10); // Specify radix 10 for decimal

  if (isNaN(ticketId)) {
    return res.status(400).json({ error: "Invalid Ticket ID" });
  }

  try {
    const db = mongoDB(); // Reuse the existing DB connection
    const collection = db.collection("tickets");

    const ticket = await collection.findOne({ id: ticketId });
    if (!ticket) {
      return res
        .status(404)
        .json({ message: `Ticket with ID:${ticketId} not found.` });
    }

    res.json({ ticket });
  } catch (err) {
    console.error(`Error in getTicketsById: ${err}`);

    res.status(500).json({ error: "An error occurred" });
  }
};

export const getTicketsByCustomerId = async (req, res) => {
  const customerId = parseInt(req.params.customerId, 10); // Assuming customerId is passed as a URL parameter

  if (isNaN(customerId)) {
    return res.status(400).json({ error: "Invalid Customer ID" });
  }

  try {
    const db = mongoDB(); // Reuse the existing DB connection
    const collection = db.collection("tickets");

    const tickets = await collection
      .find({ customer_id: customerId })
      .toArray();
    if (tickets.length === 0) {
      return res
        .status(404)
        .json({ message: `No tickets found for customer ID: ${customerId}` });
    }

    res.json({ tickets });
  } catch (err) {
    console.error(`Error in getTicketsByCustomerId: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const searchTickets = async (req, res) => {
  try {
    const db = mongoDB();
    const collection = db.collection("tickets");

    // Extract search criteria from query parameters
    const { name, email, phone } = req.query;
    let query = {};

    // if (name) {
    //     query.name = { $regex: name, $options: 'i' };
    // }

    // if (email) {
    //     query.email = { $regex: email, $options: 'i' };
    // }

    // if (phone) {
    //     query.phone = { $regex: phone, $options: 'i' };
    // }

    // Execute the search query
    const tickets = await collection.find(query).toArray();

    res.json(tickets);
  } catch (error) {
    console.error(`Ticket search error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred during the ticket search" });
  }
};

// export const getTicketsByStatus = async (req, res) => {
//   const status = req.query.status; // Get status filter from query parameters

//   try {
//     const groupedTickets = await getTicketsGroupedByStatusFromDB(status);
//     res.json(groupedTickets);
//   } catch (err) {
//     console.error(`Error in getTicketsByStatus: ${err}`);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };
// ticketController.js
export const getTicketsByStatus = async (req, res) => {
  try {
    const ticketStatus = req.query.status; // Get the status filter from the query parameters
    const groupedTickets = await getTicketsGroupedByStatusFromDB(ticketStatus);
    res.json(groupedTickets);
  } catch (err) {
    console.error(`Error in getTicketsByStatus: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getTicketRelatedDocuments = async (req, res) => {
  const { ticketId, dataType } = req.params;
  const numericTicketId = parseInt(ticketId, 10);
  console.log(
    "Fetching documents for ticketId:",
    ticketId,
    "dataType:",
    dataType
  );

  if (isNaN(numericTicketId)) {
    return res.status(400).json({ error: "Invalid Ticket ID" });
  }

  try {
    const data = await getTicketRelatedDocumentsFromDB(
      numericTicketId,
      dataType
    );
    console.log("Found documents:", data);

    res.json(data);
  } catch (err) {
    console.error("Error fetching ticket related documents:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
