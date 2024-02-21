import {
  getAllEstimatesFromDB,
  getEstimatesByIDFromDB,
} from "../model/estimateModel.js";

export const getAllEstimates = async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const search = req.query.search; // Assuming you'll use this for filtering
    const sortField = req.query.sortField || "created_at";
    const sortOrder = req.query.sortOrder || "desc";

    const { estimates, totalCount } = await getAllEstimatesFromDB(
      page,
      limit,
      search,
      sortField,
      sortOrder
    );

    res.json({ estimates, totalCount });
  } catch (err) {
    console.error(`Error in getAllEstimates: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};

export const getEstimateById = async (req, res) => {
  const estimateId = parseInt(req.params.id, 10);
  console.log("🚀 Controller ~ getEstimateById ~ estimateId:", estimateId);

  if (isNaN(estimateId)) {
    return res.status(400).json({ error: "Invalid Estimate ID" });
  }

  try {
    const estimate = await getEstimatesByIDFromDB(estimateId);
    if (!estimate) {
      return res
        .status(404)
        .json({ message: `Estimate with ID:${estimateId} not found.` });
    }

    res.json({ estimate });
  } catch (err) {
    console.error(`Error in getEstimateById: ${err}`);
    res.status(500).json({ error: "An error occurred" });
  }
};
