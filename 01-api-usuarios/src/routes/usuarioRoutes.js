import express from 'express';

// importando as funções que criei no Controllers
import {
    criarUsuario, 
    listarUsuarios, 
    deletarUsuario, 
    atualizarUsuarioTotal, 
    atualizarUsuarioParcial 
} from '../controllers/usuarioController.js'


const router = express.Router()


// mapeando os caminhos apontando para cada função do Controller 
router.post('/usuarios', criarUsuario)
router.get('/usuarios', listarUsuarios)
router.delete('/usuarios/:id', deletarUsuario)
router.put('/usuarios/:id', atualizarUsuarioTotal)
router.patch('/usuarios/:id', atualizarUsuarioParcial)

// Exportando o roteador para que o arquivo server.js consiga ler
export default router