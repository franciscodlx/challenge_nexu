const express = require("express");
const brandController = require("../../controllers/brandController");

const router = express.Router();

router
  .get("/", brandController.getAllBrands)
  .get("/:id/models", brandController.getModelsByBrand)
  .post("/", brandController.createNewBrand)
  .post("/:id/models", brandController.createNewModelByBrand)

module.exports = router;
