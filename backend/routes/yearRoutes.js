const express = require("express");
const router = express.Router();

const {
  addYear,
  getAllYears,
  deleteYear,
} = require("../controllers/yearController");

router.post("/add", addYear);

router.get("/", getAllYears);

router.delete("/:id", deleteYear);

module.exports = router;