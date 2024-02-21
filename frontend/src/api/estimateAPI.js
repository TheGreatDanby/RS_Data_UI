import { API_URL } from "./api";

export const fetchEstimates = async (page, limit, sortField, sortOrder) => {
  try {
    const url = `${API_URL}/estimates?page=${page}&limit=${limit}&sortField=${sortField}&sortOrder=${sortOrder}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching estimate:", error);
    throw error;
  }
};

export const fetchEstimateById = async (estimateId) => {
  console.log("🚀 ~ fetchEstimateById ~ estimateId:", estimateId);
  try {
    const response = await fetch(`${API_URL}/estimates/${estimateId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data.estimate;
  } catch (error) {
    console.error(`Error fetching estimate with ID ${estimateId}:`, error);
    throw error;
  }
};
