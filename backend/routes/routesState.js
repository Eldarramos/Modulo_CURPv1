import express from 'express'
//11 abril
import { getAllState } from '../controllers/formStateController.js'

const routerStates = express.Router()


//11 abril
routerStates.get('/', getAllState)

export default routerStates