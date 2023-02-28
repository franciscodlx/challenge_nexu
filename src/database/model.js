const DB = require("./db.json");
const { saveToDatabase } = require("./utils");

const { modelBrandModel } = require('../models/models.js');

const updateModelById = (id, changes) => {
  try {
    const indexForUpdate = DB.models.findIndex((model) => model.id == id); // cuando se cambien a UID se debe de cambiar a ====

    if (indexForUpdate === -1) {
      throw {
        status: 400,
        message: `Can't find model with the id '${id}'`,
      };
    }

    const updatedModel = {
      ...DB.models[indexForUpdate],
      ...changes,
      updatedAt: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
    };

    DB.models[indexForUpdate] = updatedModel;
    saveToDatabase(DB);

    return new modelBrandModel(updatedModel);
  } catch (error) {
    throw { status: error?.status || 500, message: error?.message || error };
  }
};

const getAllModels = (filterParams) => {
  try {
    let modelsData = DB.models;
    const {
      greater = null,
      lower = null
    } = filterParams;

    if (greater && lower) {
      return DB.models.filter((model) =>
        model.average_price <= lower && model.average_price >= greater
      ).map(model => new modelBrandModel(model).getInfoModel());
    }

    if (greater) {
      return DB.models.filter((model) => model.average_price >= greater ).map(model => new modelBrandModel(model).getInfoModel());
    }

    if (lower) {
      return DB.models.filter((model) => model.average_price <= lower ).map(model => new modelBrandModel(model).getInfoModel());
    }
    return modelsData.map(model => new modelBrandModel(model).getInfoModel());
  } catch (error) {
    throw { status: 500, message: error };
  }
};

module.exports = {
  updateModelById,
  getAllModels,
};