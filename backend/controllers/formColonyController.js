import ColonyModel from "../models/formColonyModel.js";

export const getAllColony = async (req, res) => {
    const { idcity } = req.params;

    try {
        const colonies = await ColonyModel.findAll({ where: { idcity } });
        res.json(colonies)
    } catch (error) {
        res.json( {message: error.message})
    }
}

export const getAllZip = async (req, res) => {
    const { idcolony } = req.params;

  try {
    const codigospostales = await ColonyModel.findAll({ where: { idcolony } });
    res.json(codigospostales)
  } catch (error) {
    res.json( {message: error.message})
  }
}