import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const formModel = db.define('forms',{
   nombre: {type: DataTypes.STRING},
    apellidoP: {type: DataTypes.STRING},
    apellidoM: {type: DataTypes.STRING},
    genero: {type: DataTypes.STRING},
    telefono: {type: DataTypes.NUMBER},
    celular: {type: DataTypes.NUMBER},
    escuela: {type: DataTypes.STRING},
    trabajo: {type: DataTypes.STRING},
    pais: {type: DataTypes.STRING},
    estado: {type: DataTypes.STRING},
    ciudad: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING},
    curp: {type: DataTypes.STRING}
})

export default formModel