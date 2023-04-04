import express from 'express'
import { createForm, deleteForm, getAllForm, getForm, updateForm } from '../controllers/formController.js'

const router = express.Router()

router.get('/', getAllForm)
router.get('/:id', getForm)
router.post('/', createForm)
router.put('/:id', updateForm)
router.delete('/:id', deleteForm)

export default router