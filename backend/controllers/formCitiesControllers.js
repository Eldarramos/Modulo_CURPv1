import CitiesModel from "../models/formCitiesModel.js";

export const getAllCities = async (req, res) => {
    const { idstate } = req.params;

    try {
        const cities = await CitiesModel.findAll({ where: { idstate } });
        res.json(cities)
    } catch (error) {
        res.json( {message: error.message})
    }
}