import { ObjectId } from "mongodb";
import { getNextId, mongoDB } from "../model/mongoDB.js";

export const getAllCustomersFromDB = async (
  page,
  limit,
  searchQuery,
  sortField = "created_at",
  sortOrder = "desc"
) => {
  const db = mongoDB();
  const collection = db.collection("customers");
  const query = buildSearchQuery(searchQuery); // Assuming you have this function defined

  let sortOptions = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

  const totalCount = await collection.countDocuments(query);
  const customers = await collection
    .find(query)
    // .sort({ created_at: -1 })
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { customers, totalCount };
};

export const getCustomerByIdFromDb = async (customerId) => {
  const db = mongoDB();
  const collection = db.collection("customers");
  const customer = await collection.findOne({ id: customerId });
  return customer;
};

export const getCustomerDataFromDb = async (customerId, dataType) => {
  const db = mongoDB();
  const collection = db.collection(dataType);
  const query = { customer_id: customerId };
  const data = await collection.find(query).toArray();
  return data;
};

export const updateCustomerByIdInDb = async (customerId, updatedData) => {
  const db = mongoDB();
  const collection = db.collection("customers");

  const numericCustomerId = Number(customerId);
  delete updatedData._id; // Good practice to remove _id from updatedData

  const result = await collection.updateOne(
    { id: numericCustomerId }, // Use the custom id field for querying
    { $set: updatedData }
  );
  return result;
};

export const createCustomerInDb = async (customerData) => {
  const db = mongoDB(); // Function to get your DB instance
  const collection = db.collection("customers");

  if (!customerData || Object.keys(customerData).length === 0) {
    throw new Error("Invalid customer data provided");
  }

  const nextId = await getNextId(collection);
  customerData.id = nextId; // Assuming 'id' is the field you want to auto-increment

  const result = await collection.insertOne(customerData);
  if (!result.acknowledged || !result.insertedId) {
    throw new Error("Failed to create customer");
  }

  // return result.ops[0]; // Return the created customer document
  return { ...customerData, _id: result.insertedId };
};

const buildSearchQuery = (search) => {
  // Implement your search query logic here
  // ...
};
