import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

function Tarefas({ usuario }) {
  const [tarefas, setTarefas] = useState([])
  const [titulo, setTitulo] = useState('')
  const [erro, setErro] = useState('')
  const [carregando, setCarregando] = useState(true)

  // BUSCAR as tarefas deste usuário (GET)
  async function buscarTarefas() {
    try {
      const resposta = await fetch(`${API_URL}/usuarios/${usuario.id}/tarefas`)

      if (!resposta.ok) {
        setErro('Não foi possível carregar as tarefas.')
        return
      }

      const dados = await resposta.json()
      setTarefas(dados)
    } catch {
      setErro('Não foi possível falar com a API. Ela está rodando?')
    } finally {
      setCarregando(false)
    }
  }

  // roda ao abrir e DE NOVO sempre que o usuário muda
  useEffect(() => {
    buscarTarefas()
  }, [usuario.id])

  // transforma o status da resposta em mensagem para a tela
  async function tratarFalha(resposta) {
    if (resposta.status === 400) {
      const dados = await resposta.json()
      setErro(dados.erros?.[0]?.mensagem ?? 'Confira os campos.')
      return
    }

    if (resposta.status === 404) {
      setErro('Esse registro não existe mais.')
      buscarTarefas() // a tela estava desatualizada: recarrega
      return
    }

    setErro('Algo deu errado. Tente de novo.')
  }

  // CRIAR tarefa (POST)
  async function criarTarefa(evento) {
    evento.preventDefault()
    setErro('')

    try {
      const resposta = await fetch(`${API_URL}/usuarios/${usuario.id}/tarefas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ titulo }),
      })

      if (!resposta.ok) {
        await tratarFalha(resposta)
        return
      }

      setTitulo('')
      buscarTarefas()
    } catch {
      setErro('Não foi possível falar com a API. Ela está rodando?')
    }
  }

  // MARCAR / DESMARCAR como concluída (PUT)
  async function alternarConcluida(tarefa) {
    setErro('')

    try {
      const resposta = await fetch(`${API_URL}/tarefas/${tarefa.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        // o PUT exige o título, então ele vai junto
        body: JSON.stringify({ titulo: tarefa.titulo, concluido: !tarefa.concluido }),
      })

      if (!resposta.ok) {
        await tratarFalha(resposta)
        return
      }

      buscarTarefas()
    } catch {
      setErro('Não foi possível falar com a API. Ela está rodando?')
    }
  }

  // EXCLUIR tarefa (DELETE)
  async function excluirTarefa(id) {
    setErro('')

    try {
      const resposta = await fetch(`${API_URL}/tarefas/${id}`, {
        method: 'DELETE',
      })

      if (!resposta.ok) {
        await tratarFalha(resposta)
        return
      }

      buscarTarefas()
    } catch {
      setErro('Não foi possível falar com a API. Ela está rodando?')
    }
  }

  return (
    <div className='painel-tarefas'>
      <h2 className='subtitulo'>Tarefas de {usuario.nome}</h2>

      <form onSubmit={criarTarefa} className='form-tarefa'>
        <input
          type='text'
          className='input-campo'
          placeholder='Nova tarefa'
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
        <button type='submit' className='btn-criar'>Adicionar</button>
      </form>

      {erro && <p className='msg-erro'>{erro}</p>}

      {carregando ? (
        <p className='sem-tarefas'>Carregando...</p>
      ) : tarefas.length === 0 ? (
        <p className='sem-tarefas'>Nenhuma tarefa ainda.</p>
      ) : (
        <ul className='lista-tarefas'>
          {tarefas.map((t) => (
            <li key={t.id} className='item-tarefa'>
              <label className='tarefa-texto'>
                <input
                  type='checkbox'
                  checked={t.concluido}
                  onChange={() => alternarConcluida(t)}
                />
                <span className={t.concluido ? 'concluida' : ''}>{t.titulo}</span>
              </label>
              <button className='btn-excluir' onClick={() => excluirTarefa(t.id)}>
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Tarefas