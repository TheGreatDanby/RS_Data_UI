import { mongoDB } from "./mongoDB.js";
import { buildSearchQuery } from "./customerSearch.js";

export const getAllEstimatesFromDB = async (
  page,
  limit,
  searchQuery,
  sortField = "created_at",
  sortOrder = "desc"
) => {
  const db = mongoDB(); // Assuming mongoDB() is a function to get your DB instance
  const collection = db.collection("estimates");
  const query = buildSearchQuery(searchQuery); // Assuming you have this function defined

  let sortOptions = {};
  sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

  const totalCount = await collection.countDocuments(query);
  const estimates = await collection
    .find(query)
    .sort(sortOptions)
    .skip((page - 1) * limit)
    .limit(limit)
    .toArray();

  return { estimates, totalCount };
};

export const getEstimatesByIDFromDB = async (estimateId) => {
  console.log("🚀 ~ getEstimatesByIDFromDB ~ estimateId:", estimateId);
  const db = mongoDB();
  const collection = db.collection("estimates");
  const estimate = await collection.findOne({ id: estimateId });
  return estimate;
};
