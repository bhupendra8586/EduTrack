const YEAR = require("../models/year");

// ================= ADD YEAR =================
const addYear = async (req, res) => {
  try {
    const { name, department, academicYear } = req.body;

    const existingYear = await YEAR.findOne({
      name,
      department,
      academicYear,
    });

    if (existingYear) {
      return res.status(400).json({
        message: "Year already exists",
      });
    }

    const year = await YEAR.create({
      name,
      department,
      academicYear,
    });

    res.status(201).json({
      success: true,
      message: "Year added successfully",
      year,
    });
  } catch (error) {
    console.log("ERROR(addYear):", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET ALL YEARS =================
const getAllYears = async (req, res) => {
  try {
    const years = await YEAR.find().sort({
      department: 1,
      name: 1,
    });

    res.status(200).json({
      success: true,
      years,
    });
  } catch (error) {
    console.log("ERROR(getAllYears):", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= DELETE YEAR =================
const deleteYear = async (req, res) => {
  try {
    await YEAR.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Year deleted successfully",
    });
  } catch (error) {
    console.log("ERROR(deleteYear):", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addYear,
  getAllYears,
  deleteYear,
};