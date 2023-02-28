const { v4: uuid } = require("uuid");
const Brand = require("../database/brand");
const { brandModel } = require('../models/brands.js');
const { modelBrandModel } = require('../models/models.js');

const getAllBrands = () => {
  try {
    const allBrands = Brand.getAllBrands();
    return allBrands;
  } catch (error) {
    throw error;
  }
};

const getModelsByBrand = (id) => {
  try {
    const models = Brand.getModelsByBrand(id);
    return models;
  } catch (error) {
    throw error;
  }
};

const createNewBrand = (newBrand) => {
  const brandToInsert = {
    ...newBrand,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdBrand = Brand.createNewBrand(brandToInsert);
    return new brandModel(createdBrand).getInfoBrand();
  } catch (error) {
    throw error;
  }
};

const createNewModelByBrand = (newBrandModel) => {
  const existBrand = getBrandById(newBrandModel.brand_id);

  if (!Object.keys(existBrand).length) {
    throw {
      status: 500,
      message: `Can't find brand with the id '${id}'`,
    };
  }

  const brandModelToInsert = {
    ...newBrandModel,
    id: uuid(),
    createdAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
  };
  try {
    const createdBrandModel = Brand.createNewModelByBrand(brandModelToInsert);
    return new modelBrandModel(createdBrandModel).getInfoModel();
  } catch (error) {
    throw error;
  }
};

const getBrandById = (id) => {
  try {
    const brand = Brand.getBrandById(id);
    return new brandModel(brand).getInfoBrand();
  } catch (error) {
    throw error;
  }
};

module.exports = {
  createNewBrand,
  getAllBrands,
  getModelsByBrand,
  createNewModelByBrand,
  getBrandById,
};
