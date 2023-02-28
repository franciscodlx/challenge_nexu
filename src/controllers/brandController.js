const brandService = require("../services/brandService");
const { modelBrandModel } = require('../models/models.js');
const { brandModel } = require('../models/brands.js');

const getAllBrands = (req, res) => {
  try {
    const allBrands = brandService.getAllBrands();
    res.send({ status: "OK", data: allBrands });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getModelsByBrand = (req, res) => {
  const {
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
    return;
  }

  try {
    const models = brandService.getModelsByBrand(id);
    res.send({ status: "OK", data: models });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const createNewBrand = (req, res) => {
  const { body } = req;

  if (
    !body.name
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name'",
      },
    });
  }

  const newBrand = new brandModel(body);

  try {
    const createdBrand = brandService.createNewBrand(newBrand);
    res.status(201).send({ status: "OK", data: createdBrand });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

const createNewModelByBrand = (req, res) => {
  const { 
    body,
    params: { id }
  } = req;

  if (
    !body.name ||
    !body.average_price
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'name', 'average_price'",
      },
    });
  }

  const newBrandModel = new modelBrandModel(body);
  newBrandModel.setBrandID(id);

  try {
    const createdBrand = brandService.createNewModelByBrand(newBrandModel);
    res.status(201).send({ status: "OK", data: createdBrand });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILDED", data: { error: error?.message || error } });
  }
};

module.exports = {
  createNewBrand,
  getAllBrands,
  getModelsByBrand,
  createNewModelByBrand,
};
