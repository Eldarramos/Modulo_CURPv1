import StateModel from "../models/formStateModel.js";

export const getAllState = async (req, res) => {
    try {
        const states = await StateModel.findAll();
        res.json(states)
    } catch (error) {
        res.json( {message: error.message})
    }
}