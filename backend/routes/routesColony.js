import express from 'express'
import { getAllColony, getAllZip } from '../controllers/formcolonyController.js'

const routerColonies = express.Router()


routerColonies.get('/:idcity', getAllColony)
routerColonies.get('/:idcolony/postal_code', getAllZip)

export default routerColonies