
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
 const [usuarios, setUsuarios] = useState([])

  useEffect(() => {
    async function buscarUsuarios() {
      const resposta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios`)
      const dados = await resposta.json()
      console.log(dados)
      setUsuarios(dados)
    }

    buscarUsuarios()
  }, [])

  return (
    <>
      <h1>usuarios</h1>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>nome: {u.nome} e email: {u.email}</li>
        ))}
      </ul>
    </>
  )
}

export default App
