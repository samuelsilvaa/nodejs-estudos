import Tarefas from './Tarefas.jsx'
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function App() {

  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [idEditando, setIdEditando] = useState(null) // NOVO: null = modo criar, número = editando esse id

  const [idSelecionado, setIdSelecionado] = useState(null)

  const [erro, setErro] = useState('') // mostrar o erro na tela para o usuario vizualizar

  const usuarioSelecionado = usuarios.find((u) => u.id === idSelecionado)

  // funcao para buscar usuarios
  async function buscarUsuarios() {
    const resposta = await fetch(`${API_URL}/usuarios`)
    const dados = await resposta.json()
    setUsuarios(dados)
  }

  // buscando assim que a pagina é carregada
  useEffect(() => {
    buscarUsuarios()
  }, [])


  // NOVO: entra no modo editar, preenchendo o formulario com o usuario clicado
  function iniciarEdicao(usuario) {
    setIdEditando(usuario.id)
    setNome(usuario.nome)
    setEmail(usuario.email)
    setErro('')
  }

  // NOVO: sai do modo editar e limpa o formulario
  function cancelarEdicao() {
    setIdEditando(null)
    setNome('')
    setEmail('')
  }


  // ALTERADO: era criarUsuario, agora serve para criar (POST) e editar (PUT)
  async function salvarUsuario(evento) {
    evento.preventDefault()
    setErro('')

    // o que muda entre criar e editar é só a URL e o método
    const editando = idEditando !== null
    const url = editando
      ? `${API_URL}/usuarios/${idEditando}`
      : `${API_URL}/usuarios`
    const metodo = editando ? 'PUT' : 'POST'

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      })

      // NOVO: erro de validação do Zod (mensagem vem da API)
      if (resposta.status === 400) {
        const dados = await resposta.json()
        setErro(dados.erros?.[0]?.mensagem ?? 'Confira os campos.')
        return
      }

      if (resposta.status === 409) {
        setErro('Esse email já está cadastrado.')
        return
      }

      // NOVO: o usuario foi apagado enquanto estava sendo editado
      if (resposta.status === 404) {
        setErro('Esse usuário não existe mais.')
        cancelarEdicao()
        buscarUsuarios()
        return
      }

      if (!resposta.ok) {
        setErro('Não foi possível salvar o usuário.')
        return
      }

      cancelarEdicao() // ALTERADO: limpa os campos e volta ao modo criar
      buscarUsuarios()
    } catch {
      setErro('Não foi possível falar com a API. Ela está rodando?')
    }
  }


  // FUNCAO DE EXCLUIR USUARIO (DELETE)
  async function excluirUsuario(id) {
    if (!window.confirm('Tem certeza que deseja excluir este usuário?')) {
      return
    }

    if (id === idSelecionado) {
      setIdSelecionado(null)
    }

    setErro('')

    try {
      const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      })

      if (!resposta.ok) {
        setErro("Não foi possível excluir o usuario")
        return
      }

      // NOVO: se excluiu quem estava sendo editado, sai do modo editar
      if (id === idEditando) {
        cancelarEdicao()
      }

      buscarUsuarios()
    } catch {
      setErro("Não foi possível falar com a API. Ela está rodando?")
    }

  }

  return (
    <>
      <div className='app-container'>
        <div className='card'>

          <h1 className='titulo'>usuarios</h1>

          <form onSubmit={salvarUsuario}> {/* ALTERADO: criarUsuario -> salvarUsuario */}
            <input type="text"
              className='input-campo'
              placeholder='Nome'
              value={nome}
              onChange={(e) => setNome(e.target.value)} />

            <input type="email"
              className='input-campo'
              placeholder='Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)} />

            {/* ALTERADO: o texto do botão muda conforme o modo */}
            <button type='submit' className='btn-criar'>
              {idEditando !== null ? 'Salvar' : 'Criar'}
            </button>

            {/* NOVO: Cancelar só aparece no modo editar */}
            {idEditando !== null && (
              <button type='button' className='btn-cancelar' onClick={cancelarEdicao}>
                Cancelar
              </button>
            )}
          </form>


          <ul className='lista-usuarios'>
            {usuarios.map((u) => (
              <li key={u.id} className='item-usuario'><span className="dados-usuario">
                <strong>Nome:</strong> {u.nome} <br />
                <small><strong>Email:</strong> {u.email}</small>
              </span>
                {/* ALTERADO: os dois botões agora ficam juntos numa div */}
                <div className='acoes-usuario'>
                  <button className='btn-tarefas' onClick={() => setIdSelecionado(u.id)}>Tarefas</button>
                  <button className='btn-editar' onClick={() => iniciarEdicao(u)}>Editar</button>
                  <button className='btn-excluir' onClick={() => excluirUsuario(u.id)}>Excluir</button>
                </div>
              </li>
            ))}
          </ul>

          {usuarioSelecionado && (
            <Tarefas key={usuarioSelecionado.id} usuario={usuarioSelecionado} />
          )}

          {erro && <p className='msg-erro'>{erro}</p>}

        </div>
      </div>
    </>
  )
}

export default App
