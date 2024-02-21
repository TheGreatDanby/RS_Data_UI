import { searchCustomers } from './customerController.js';
import { searchTickets } from './ticketController.js';
// import { searchInvoices } from './invoiceSearch';

export const globalSearch = async (req, res) => {
    try {
        const { query } = req.query;

        // Perform searches in parallel
        const [customerResults, ticketResults, invoiceResults] = await Promise.all([
            searchCustomers(query),
            searchTickets(query),
            searchInvoices(query)
        ]);

        // Aggregate results
        const results = {
            customers: customerResults,
            tickets: ticketResults,
            invoices: invoiceResults
        };

        res.json(results);
    } catch (error) {
        console.error(`Global search error: ${error}`);
        res.status(500).json({ error: 'An error occurred during the global search' });
    }
};
