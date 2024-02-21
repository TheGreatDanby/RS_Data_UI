import {
  getAllInvoicesFromDB,
  getInvoiceByTicketIDFromDB,
  getInvoicesByIDFromDB,
} from "../model/invoiceModel.js";

export const getAllInvoices = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const search = req.query.search; // Assuming you'll use this for filtering
    const sortField = req.query.sortField || "created_at";
    const sortOrder = req.query.sortOrder || "desc";

    const { invoices, totalCount } = await getAllInvoicesFromDB(
      page,
      limit,
      search,
      sortField,
      sortOrder
    );

    res.json({ invoices, totalCount });
  } catch (err) {
    console.error(`Error in getAllInvoices: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getInvoiceById = async (req, res) => {
  const invoiceId = parseInt(req.params.id, 10);

  if (isNaN(invoiceId)) {
    return res.status(400).json({ error: "Invalid Invoice ID" });
  }

  try {
    const invoice = await getInvoicesByIDFromDB(invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .json({ message: `Invoice with ID:${invoiceId} not found.` });
    }

    res.json({ invoice });
  } catch (err) {
    console.error(`Error in getInvoiceById: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getInvoiceByTicketId = async (req, res) => {
  const ticketId = parseInt(req.params.id, 10);

  if (isNaN(ticketId)) {
    return res.status(400).json({ error: "Invalid Ticket ID" });
  }

  try {
    const invoice = await getInvoiceByTicketIDFromDB(ticketId);
    if (!invoice) {
      return res
        .status(404)
        .json({ message: `Invoice for Ticket ID:${ticketId} not found.` });
    }

    res.json({ invoice });
  } catch (err) {
    console.error(`Error in getInvoiceByTicketId: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};
