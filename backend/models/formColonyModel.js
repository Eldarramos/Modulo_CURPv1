import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const ColonyModel = db.define('colonies',{
    idcolony: {type: DataTypes.NUMBER},
    colony: {type: DataTypes.STRING},
    postal_code: {type: DataTypes.STRING},
    idcity: {type: DataTypes.NUMBER},
})

export default ColonyModel