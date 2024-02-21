import { API_URL } from "./api";

// export const fetchLineItemsByInvoiceID = async (invoiceId) => {
//   try {
//     const response = await fetch(`${API_URL}/line_item/${invoiceId}`);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data.lineItems;
//   } catch (error) {
//     console.error(
//       `Error fetching line item for invoice with ID ${invoiceId}:`,
//       error
//     );
//     throw error;
//   }
// };

// The API now accepts a documentType and documentId
export const fetchLineItemsByDocumentId = async (documentType, documentId) => {
  console.log("🚀 ~ fetchLineItemsByDocumentId ~ documentId:", documentId);
  try {
    const response = await fetch(
      `${API_URL}/line_items/${documentType}/${documentId}`
    );

    // const response = await fetch(); `${API_URL}/line_items/${documentType.documentId}`
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.lineItems;
  } catch (error) {
    console.error(
      console.log(
        "🚀 ~ fetchLineItemsByDocumentId ~ response:",
        response
      )`Error fetching line items for document ID ${documentId}:`,
      error
    );
    throw error;
  }
};
