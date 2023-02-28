const modelService = require("../services/modelService");
const updateModelById = (req, res) => {
  const {
    body,
    params: { id },
  } = req;

  if (!id) {
    res.status(400).send({
      status: "FAILED",
      data: { error: "Parameter ':id' can not be empty" },
    });
  }

  if (
    !body.average_price
  ) {
    res.status(400).send({
      status: "FAILED",
      data: {
        error:
          "One of the following keys is missing or is empty in request body: 'average_price'",
      },
    });
  }

  try {
    const updatedModel = modelService.updateModelById(id, body);
    res.send({ status: "OK", data: updatedModel });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

const getAllModels = (req, res) => {
  const { 
    greater,
    lower
  } = req.query;
  try {
    const allModels = modelService.getAllModels({ greater, lower });
    res.send({ status: "OK", data: allModels });
  } catch (error) {
    res
      .status(error?.status || 500)
      .send({ status: "FAILED", data: { error: error?.message || error } });
  }
};

module.exports = {
  updateModelById,
  getAllModels,
};