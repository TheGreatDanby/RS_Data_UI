import { mongoDB } from "../model/mongoDB.js";
import { buildSearchQuery } from "./customerSearch.js";

export const getAllTicketsFromDB = async (
  page,
  limit,
  searchQuery,
  sortField = "created_at",
  sortOrder = "desc"
) => {
  const db = mongoDB(); // Assuming mongoDB() is a function to get your DB instance
  const collection = db.collection("tickets");
  const query = buildSearchQuery(searchQuery); // Assuming you have this function defined

  let sortOptions = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

  const totalCount = await collection.countDocuments(query);
  const tickets = await collection
    .find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { tickets, totalCount };
};

// export const getTicketsGroupedByStatusFromDB = async (status) => {
//   const db = mongoDB(); // Assuming mongoDB() is a function to get your DB instance
//   const collection = db.collection("tickets");

//   const tickets = await collection.find({}).toArray();
//   const groupedTickets = tickets.reduce((acc, ticket) => {
//     const status = ticket.status || "Unknown"; // Default to 'Unknown' if status is not set
//     if (!acc[status]) {
//       acc[status] = [];
//     }
//     acc[status].push(ticket);
//     return acc;
//   }, {});

//   return groupedTickets;
// };
// ticketModel.js
export const getTicketsGroupedByStatusFromDB = async (ticketStatus) => {
  const db = mongoDB();
  const collection = db.collection("tickets");

  let query = {};
  if (ticketStatus) {
    query.status = ticketStatus; // Filter tickets by the provided status
  }

  const tickets = await collection.find(query).toArray();
  const groupedTickets = tickets.reduce((acc, ticket) => {
    const status = ticket.status || "Unknown";
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(ticket);
    return acc;
  }, {});

  return groupedTickets;
};

export const getTicketRelatedDocumentsFromDB = async (ticketId, dataType) => {
  const db = mongoDB();
  const collection = db.collection(dataType);
  const query = { ticket_id: ticketId };
  const data = await collection.find(query).toArray();
  return data;
};
