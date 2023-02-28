const express = require("express");
const modelController = require("../../controllers/modelController");

const router = express.Router();

router
  .put("/:id", modelController.updateModelById)
  .get("/", modelController.getAllModels)

module.exports = router;