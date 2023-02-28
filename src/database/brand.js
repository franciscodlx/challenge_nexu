const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const { brandModel } = require('../models/brands.js');
const { modelBrandModel } = require('../models/models.js');

const getAllBrands = () => {
  try {
    const brands = DB.brands;
    return brands.map( brand => new brandModel(brand).getInfoBrand());
  } catch (error) {
    throw { status: 500, message: error };
  }
};

const getModelsByBrand = (id) => {
  try {
    const models = DB.models.filter((model) => model.brand_id == id); // despues de actualizar los uuid se cambiara a ===

    if (!models) {
      throw {
        status: 400,
        message: `Can't find brand with the id '${id}'`,
      };
    }

    return models.map( model => new modelBrandModel(model));
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const createNewBrand = (newBrand) => {
  try {
    const isAlreadyAdded =
      DB.brands.findIndex((brand) => brand.name === newBrand.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Brand with the name '${newBrand.name}' already exists`,
      };
    }

    DB.brands.push(newBrand);
    saveToDatabase(DB);

    return new brandModel(newBrand);
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const createNewModelByBrand = (newBrandModel) => {
  try {
    const isAlreadyAdded =
      DB.brands.findIndex((brand) => brand.name === newBrandModel.name) > -1;

    if (isAlreadyAdded) {
      throw {
        status: 400,
        message: `Brand with the name '${newBrandModel.name}' already exists`,
      };
    }

    DB.models.push(newBrandModel);
    saveToDatabase(DB);

    return new modelBrandModel(newBrandModel);
  } catch (error) {
    throw { status: 500, message: error?.message || error };
  }
};

const getBrandById = (id) => {
  try {
    const brand = DB.brands.find((brand) => brand.id == id); // una vez que se vuelvan a UUID se cambiara a ===

    if (!brand) {
      throw {
        status: 400,
        message: `Can't find brand with the id '${id}'`,
      };
    }

    return new brandModel(brand);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

module.exports = {
  createNewBrand,
  getAllBrands,
  getModelsByBrand,
  createNewModelByBrand,
  getBrandById,
};
