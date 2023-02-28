const Model = require("../database/model");
const { modelBrandModel } = require('../models/models.js');

const updateModelById = (id, changes) => {
  try {
    const updatedModel = Model.updateModelById(id, changes);
    return new modelBrandModel(updatedModel).getInfoModel();
  } catch (error) {
    throw error;
  }
};

const getAllModels = (filterParams) => {
  try {
    const allModels = Model.getAllModels(filterParams);
    return allModels;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  updateModelById,
  getAllModels,
};