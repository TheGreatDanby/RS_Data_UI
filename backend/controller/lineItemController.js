import { getLineItemsByDocumentIdFromDB } from "../model/lineItemModel.js";

// export const getLineItemsByInvoiceID = async (req, res) => {
//   const invoiceId = parseInt(req.params.id, 10);

//   if (isNaN(invoiceId)) {
//     return res.status(400).json({ error: "Invalid Invoice ID (Line Item)" });
//   }

//   try {
//     const lineItems = await getLineItemsByInvoiceIDFromDB(invoiceId);
//     if (!lineItems || lineItems.length === 0) {
//       // Check if the lineItems array is empty
//       return res.status(404).json({
//         message: `Line Item for Invoice with ID:${invoiceId} not found.`,
//       });
//     }

//     res.json({ lineItems }); // Send the array of line items, not 'invoice'
//   } catch (err) {
//     console.error(`Error in getLineItemsByInvoiceID: ${err}`);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

// The controller now accepts a documentType path parameter
export const getLineItemsByDocumentId = async (req, res) => {
  // const documentId = parseInt(req.params.id, 10);
  const { documentType, documentId } = req.params;

  console.log("Invoice ID from params:", req.params);
  if (isNaN(documentId)) {
    console.error("Invalid document ID:", req.params.id);
  }

  // const documentType = req.params.documentType; // 'invoices' or 'estimates'
  console.log("🚀 ~ getLineItemsByDocumentId ~ documentType:", documentType);

  // if (isNaN(documentId)) {
  //   return res.status(400).json({ error: "Invalid Document ID" });
  // }

  try {
    const lineItems = await getLineItemsByDocumentIdFromDB(
      documentType,
      documentId
    );
    if (!lineItems) {
      return res
        .status(404)
        .json({ message: `${documentType} with ID:${documentId} not found.` });
    }

    res.json({ lineItems });
  } catch (err) {
    console.error(`Error in getLineItemsByDocumentId: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
  console.log("🚀 ~ getLineItemsByDocumentId ~ documentId:", documentId);
};
