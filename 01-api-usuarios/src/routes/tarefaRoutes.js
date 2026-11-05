import express from 'express'

import {
    editarTarefa,
    deletarTarefa,
    listarTarefa,
    criarTarefa
} from '../controllers/tarefaController.js'
import { autenticar } from '../middlewares/autenticar.js'


const router = express.Router()

router.get('/', autenticar, listarTarefa)
router.post('/', autenticar, criarTarefa)
router.put('/:id', autenticar, editarTarefa)
router.delete('/:id', autenticar, deletarTarefa)

export default router