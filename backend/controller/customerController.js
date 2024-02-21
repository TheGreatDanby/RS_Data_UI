import { mongoDB } from "../model/mongoDB.js";
import { buildSearchQuery } from "../model/customerSearch.js";
import {
  createCustomerInDb,
  getAllCustomersFromDB,
  getCustomerByIdFromDb,
  getCustomerDataFromDb,
  updateCustomerByIdInDb,
} from "../model/customerModel.js";

export const getAllCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page || "1", 10);
    const limit = parseInt(req.query.limit || "10", 10);
    const search = req.query.search;
    const sortField = req.query.sortField || "created_at";
    const sortOrder = req.query.sortOrder || "desc";

    const { customers, totalCount } = await getAllCustomersFromDB(
      page,
      limit,
      search,
      sortField,
      sortOrder
    );

    res.json({ customers, totalCount });
  } catch (error) {
    console.error(`Error in getAllCustomers: ${error}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getCustomerById = async (req, res) => {
  const customerId = parseInt(req.params.id, 10); // Specify radix 10 for decimal

  if (isNaN(customerId)) {
    return res.status(400).json({ error: "Invalid customer ID" });
  }

  try {
    const customer = await getCustomerByIdFromDb(customerId);
    if (!customer) {
      return res.status(404).json({ message: "Customer not found." });
    }

    res.json({ customer });
  } catch (err) {
    console.error(`Error in getCustomerById: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getCustomerData = async (req, res) => {
  const { customerId, dataType } = req.params;
  const numericCustomerId = parseInt(customerId, 10);

  if (isNaN(numericCustomerId)) {
    return res.status(400).json({ error: "Invalid Customer ID" });
  }

  try {
    const data = await getCustomerDataFromDb(numericCustomerId, dataType);
    // if (data.length === 0) {
    //   return res.status(404).json({ message: "Data not found." });
    // }
    res.json(data);
  } catch (err) {
    console.error(`Error in getCustomerData: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const updateCustomerById = async (req, res) => {
  const customerId = parseInt(req.params.id, 10);
  const updatedData = req.body;

  if (isNaN(customerId)) {
    return res.status(400).json({ error: "Invalid Customer ID" });
  }

  try {
    const result = await updateCustomerByIdInDb(customerId, updatedData);
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Customer not found." });
    }
    res.status(200).json({ message: "Customer updated successfully.", result });
  } catch (err) {
    console.error(`Error in updateCustomerByIdInDb: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const createCustomer = async (req, res) => {
  try {
    const customerData = req.body;
    const createdCustomer = await createCustomerInDb(customerData);
    res.status(201).json(createdCustomer); // 201 Created
  } catch (error) {
    console.error(`Error in createCustomer: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred while creating the customer" });
  }
};

// const fetchDataFunction = async (customerId, dataType) => {
//   // Implement the logic to fetch the data based on the dataType
//   // This is a placeholder function
// };

// module.exports = {
//   getCustomerData,
// };

export const searchCustomers = async (req, res) => {
  try {
    const db = mongoDB();
    const collection = db.collection("customers");

    // Extract search criteria from query parameters
    const { name, email, phone } = req.query;
    let query = {};

    if (name) {
      query.name = { $regex: name, $options: "i" };
    }

    if (email) {
      query.email = { $regex: email, $options: "i" };
    }

    if (phone) {
      query.phone = { $regex: phone, $options: "i" };
    }

    // Execute the search query
    const customers = await collection.find(query).toArray();

    res.json(customers);
  } catch (error) {
    console.error(`Customer search error: ${error}`);
    res
      .status(500)
      .json({ error: "An error occurred during the customer search" });
  }
};
