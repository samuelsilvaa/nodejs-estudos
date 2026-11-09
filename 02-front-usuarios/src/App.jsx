import { useEffect, useState } from 'react'
import { api, apagarToken, lerToken } from './api.js'
import Auth from './Auth.jsx'
import Tarefas from './Tarefas.jsx'

function App() {
  const [usuario, setUsuario] = useState(null)
  const [carregando, setCarregando] = useState(true)
  const [aviso, setAviso] = useState('')

  useEffect(() => {
    async function verificarSessao() {
      const token = lerToken()

      if (!token) {
        setCarregando(false)
        return
      }

      try {
        const resposta = await api('/usuarios/me')

        if (resposta.ok) {
          const dados = await resposta.json()
          setUsuario(dados)
        }
      } catch {
        // API fora do ar
      } finally {
        setCarregando(false)
      }
    }

    verificarSessao()
  }, [])

  useEffect(() => {
    const tratar = () => {
      setUsuario(null)
      setAviso('Sessão expirada. Entre novamente.')
    }

    window.addEventListener('sessao-expirada', tratar)

    return () => {
      window.removeEventListener('sessao-expirada', tratar)
    }
  }, [])

  function sair() { // quando sair apaga tudo
    apagarToken()
    setUsuario(null)
    setAviso('')
  }

  if (carregando) {
    return <p>Carregando...</p>
  }

  if (!usuario) {
    return (
      <>
        {aviso && <p className="msg-aviso">{aviso}</p>}
        <Auth aoLogar={setUsuario} />
      </>
    )
  }

  return ( //parte principal quando o login é bem sucedido
    <div>
      <Tarefas/>
    </div>
  )
}

export default App