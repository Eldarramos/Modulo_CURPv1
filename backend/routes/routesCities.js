import express from 'express'
//11 abril
import { getAllCities } from '../controllers/formCitiesControllers.js'

const routerCities = express.Router()


//11 abril
routerCities.get('/:idstate', getAllCities)

export default routerCities