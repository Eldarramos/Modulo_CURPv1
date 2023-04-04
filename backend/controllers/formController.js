import formModel from "../models/formModel.js";


export const getAllForm = async (req, res) => {
    try {
        const forms = await formModel.findAll();
        res.json(forms)
    } catch (error) {
        res.json( {message: error.message})
    }
}

export const getForm = async (req, res) => {
    try {
        const form = await formModel.findAll({
            where:{ 
                id: req.params.id
            }
        })
        res.json(form[0])
    } catch (error) {
        res.json( {message: error.message})
    }
}

export const createForm = async (req, res) => {
    try {
        await formModel.create(req.body)
        res.json({
            "message":"Registro creado correctamente"
        })
    } catch (error) {
        res.json( {message: error.message})
        
    }
}

export const updateForm = async (req, res) => {
    try {
       await formModel.update(req.body, {
            where: {id: req.params.id}
        })
        res.json({"message":"Registro Actualizado correctamente"})
    } catch (error) {
        res.json( {message: error.message})
    }
}

export const deleteForm = async (req, res) => {
    try {
      await  formModel.destroy({
            where: {id: req.params.id}
        })
        res.json({"message":"Registro Eliminado correctamente"})
    } catch (error) {
        res.json( {message: error.message})
    }
}