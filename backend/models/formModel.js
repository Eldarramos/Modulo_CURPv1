import db from '../database/db.js'
import { DataTypes } from 'sequelize'
//se cambio de forms a Inscripciones
const formModel = db.define('Inscripciones',{
    //23-may Se incluyo el correo del colaborador en la DB
    correoColab: {type: DataTypes.STRING},
    nombre: {type: DataTypes.STRING},
    apellidoP: {type: DataTypes.STRING},
    apellidoM: {type: DataTypes.STRING},
    genero: {type: DataTypes.STRING},
    fecha: {type:DataTypes.DATE},
    telefono: {type: DataTypes.STRING},//se cambio a STRING
    celular: {type: DataTypes.STRING},// se cambio a STRING
    escuela: {type: DataTypes.STRING},
    trabajo: {type: DataTypes.STRING},
    pais: {type: DataTypes.STRING},
    estado: {type: DataTypes.STRING},
    ciudad: {type: DataTypes.STRING},
    correo: {type: DataTypes.STRING},
    curp: {type: DataTypes.STRING},
    //12 de abril
    idstate: {type: DataTypes.NUMBER},
    idcity: {type: DataTypes.NUMBER},
    idcolony: {type: DataTypes.NUMBER},
    calle: {type: DataTypes.STRING},
    numero: {type: DataTypes.STRING},
    postal_code: {type: DataTypes.STRING}
    
   
})

export default formModel