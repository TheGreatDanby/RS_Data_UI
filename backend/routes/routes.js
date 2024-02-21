import express from "express";
import { globalSearch } from "../controller/globalSearch.js";
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  getCustomerData,
  searchCustomers,
  updateCustomerById,
} from "../controller/customerController.js";
import {
  getAllTickets,
  getTicketsByCustomerId,
  getTicketById,
  searchTickets,
  getTicketsByStatus,
  getTicketRelatedDocuments,
} from "../controller/ticketController.js";
import {
  getAllInvoices,
  getInvoiceById,
} from "../controller/invoiceController.js";
import {
  getAllEstimates,
  getEstimateById,
} from "../controller/estimateController.js";
import { getLineItemsByDocumentId } from "../controller/lineItemController.js";
import { getInvoiceByTicketIDFromDB } from "../model/invoiceModel.js";

const router = express.Router();

router.get("/search", globalSearch);

router.get("/customerData/:customerId/:dataType", getCustomerData);

router.get("/customers", getAllCustomers);
router.get("/customers/:id", getCustomerById);
router.get("/customers/search", searchCustomers);

router.patch("/customers/:id", updateCustomerById);

router.post("/customers", createCustomer);

router.get("/ticketDocuments/:ticketId/:dataType", getTicketRelatedDocuments);

router.get("/tickets/status", getTicketsByStatus);
router.get("/tickets", getAllTickets);
router.get("/tickets/customer/:customerId", getTicketsByCustomerId);
router.get("/tickets/search", searchTickets);
router.get("/tickets/:id", getTicketById);

router.get("/invoices", getAllInvoices);
router.get("/invoices/:id", getInvoiceById);
// TODO: check endpoint, its linked to a model instead of an controller
router.get("/invoices/ticket/:id", getInvoiceByTicketIDFromDB);

// router.get("/line_item/:id", getLineItemsByInvoiceID);
router.get("/line_items/:documentType/:documentId", getLineItemsByDocumentId);

// router.get("/line_items/invoice/:id", getLineItemsByDocumentId);

router.get("/estimates", getAllEstimates);
router.get("/estimates/:id", getEstimateById);

export default router;
