import db from '../database/db.js'
import { DataTypes } from 'sequelize'

const StateModel = db.define('states',{
    idstate: {type: DataTypes.NUMBER},
    state: {type: DataTypes.STRING},
    idcountry: {type: DataTypes.NUMBER}
})


export default StateModel