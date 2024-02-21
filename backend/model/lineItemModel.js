import { mongoDB } from "./mongoDB.js";

// export const getLineItemsByInvoiceIDFromDB = async (invoiceId) => {
//   const db = mongoDB();
//   const collection = db.collection("line_items");
//   const lineItems = await collection.find({ invoice_id: invoiceId }).toArray();
//   return lineItems;
// };

export const getLineItemsByDocumentIdFromDB = async (
  documentType,
  documentId
) => {
  console.log("🚀 ~ documentId:", documentId);
  console.log("🚀 ~ documentType:", documentType);
  const db = mongoDB();
  const collection = db.collection("line_items");

  const queryField = documentType === "invoice" ? "invoice_id" : "estimate_id";
  console.log("🚀 ~ queryField:", queryField);
  const query = { [queryField]: parseInt(documentId, 10) };
  console.log("🚀 ~ query:", query);

  const lineItems = await collection.find(query).toArray();
  return lineItems;
};
