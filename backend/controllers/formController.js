import formModel from "../models/formModel.js";

//forms
export const getAllForm = async (req, res) => {
    try {
        const Inscripciones = await formModel.findAll();
        res.json(Inscripciones)
    } catch (error) {
        res.json( {message: error.message})
    }
}
//form
export const getForm = async (req, res) => {
    try {
        const inscripcion = await formModel.findAll({
            where:{ 
                id: req.params.id
            }
        })
        res.json(inscripcion[0])
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