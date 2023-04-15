import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const CitiesModel = db.define('cities',{
    idcity: {type: DataTypes.NUMBER},
    city: {type: DataTypes.STRING},
    idstate: {type: DataTypes.NUMBER},
})


export default CitiesModel