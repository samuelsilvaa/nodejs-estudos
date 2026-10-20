
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const API_URL = import.meta.env.VITE_API_URL

  const [usuarios, setUsuarios] = useState([])
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')

  const [erro, setErro] = useState('') // mostrar o erro na tela para o usuario vizualizar


  // funcao para buscar usuarios
  async function buscarUsuarios() {
    const resposta = await fetch(`${API_URL}/usuarios`)
    const dados = await resposta.json()
    console.log(dados)
    setUsuarios(dados)
  }

  // buscando assim que a pagina é carregada
  useEffect(() => {
    buscarUsuarios()
  }, [])


  // FUNCAO PARA CRIAR O USUARIO (POST)
  async function criarUsuario(evento) {
    evento.preventDefault()
    setErro('')

    try {
      const resposta = await fetch(`${API_URL}/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, email }),
      })

      if (resposta.status === 409) {
        setErro('Esse email já está cadastrado.')
        return
      }

      if (!resposta.ok) {
        setErro('Não foi possível criar o usuário. Confira os campos.')
        return
      }

      setNome('')
      setEmail('')
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

    setErro('')

    try {
      const resposta = await fetch(`${API_URL}/usuarios/${id}`, {
        method: 'DELETE',
      })

      if (!resposta.ok) {
        setErro("Não foi possível excluir o usuario")
        return
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

          <form onSubmit={criarUsuario}>
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

            <button type='submit' className='btn-criar'>Criar</button>
          </form>


          <ul className='lista-usuarios'>
            {usuarios.map((u) => (
              <li key={u.id} className='item-usuario'><span className="dados-usuario">
                <strong>Nome:</strong> {u.nome} <br />
                <small><strong>Email:</strong> {u.email}</small>
              </span>
                <button className='btn-excluir' onClick={() => excluirUsuario(u.id)}>Excluir</button>
              </li>
            ))}
          </ul>

          {erro && <p className='msg-erro'>{erro}</p>}

        </div>
      </div>
    </>
  )
}

export default App
