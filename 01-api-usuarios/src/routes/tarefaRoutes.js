import express from 'express'

import {
    editarTarefa,
    deletarTarefa
} from '../controllers/tarefaController.js'
import { autenticar } from '../middlewares/autenticar.js'


const router = express.Router()

router.put('/:id', autenticar, editarTarefa)
router.delete('/:id', autenticar, deletarTarefa)

export default router