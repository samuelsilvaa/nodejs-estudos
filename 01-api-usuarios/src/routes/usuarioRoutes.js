import express from 'express';

// importando as funções que criei no Controllers
import {
    criarUsuario,
    listarUsuarios, 
    deletarUsuario, 
    atualizarUsuarioTotal, 
    atualizarUsuarioParcial 
} from '../controllers/usuarioController.js'
import { listarTarefa, criarTarefa } from '../controllers/tarefaController.js';
import { autenticar } from '../middlewares/autenticar.js';

const router = express.Router()


// mapeando os caminhos apontando para cada função do Controller 
router.post('/usuarios', criarUsuario)
router.get('/usuarios', autenticar, listarUsuarios)
router.delete('/usuarios/:id', autenticar, deletarUsuario)
router.put('/usuarios/:id', autenticar, atualizarUsuarioTotal)
router.patch('/usuarios/:id', autenticar, atualizarUsuarioParcial)
// caminho das tarefas
router.get('/usuarios/:id/tarefas', autenticar, listarTarefa)
router.post('/usuarios/:id/tarefas', autenticar, criarTarefa)

// Exportando o roteador para que o arquivo server.js consiga ler
export default router