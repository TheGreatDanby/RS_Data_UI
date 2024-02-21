import { mongoDB } from "./mongoDB.js";
import { buildSearchQuery } from "./customerSearch.js";

export const getAllInvoicesFromDB = async (
  page,
  limit,
  searchQuery,
  sortField = "created_at",
  sortOrder = "desc"
) => {
  const db = mongoDB(); // Assuming mongoDB() is a function to get your DB instance
  const collection = db.collection("invoices");
  const query = buildSearchQuery(searchQuery); // Assuming you have this function defined

  let sortOptions = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

  const totalCount = await collection.countDocuments(query);
  const invoices = await collection
    .find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { invoices, totalCount };
};

export const getInvoicesByIDFromDB = async (invoiceId) => {
  console.log("🚀 ~ getInvoicesByIDFromDB ~ invoiceId:", invoiceId);
  const db = mongoDB();
  const collection = db.collection("invoices");
  const invoice = await collection.findOne({ id: invoiceId });
  return invoice;
};

export const getInvoiceByTicketIDFromDB = async (ticketId) => {
  const db = mongoDB();
  const collection = db.collection("invoices");
  const invoice = await collection.findOne({ ticket_id: ticketId });
  return invoice;
};
