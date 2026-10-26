import express from 'express'

import {
    editarTarefa,
    deletarTarefa
} from '../controllers/tarefaController.js'


const router = express.Router()

router.put('/:id', editarTarefa)
router.delete('/:id', deletarTarefa)

export default router