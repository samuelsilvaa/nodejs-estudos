
import { useState } from 'react'
import { api, salvarToken } from './api.js'

function Auth({ aoLogar }) {
    const [modo, setModo] = useState('login')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [erro, setErro] = useState('')
    const [aviso, setAviso] = useState('')

    async function enviar(evento) {
        evento.preventDefault()
        setErro('')
        setAviso('')

        try {
            if (modo === 'login') {
                const resposta = await api('/auth/login', {
                    metodo: 'POST',
                    corpo: { email, senha }
                })

                const dados = await resposta.json()

                if (!resposta.ok) {
                    if (resposta.status === 400) {
                        setErro(dados.erros?.[0]?.mensagem)
                    }

                    if (resposta.status === 401 || resposta.status === 429) {
                        setErro(dados.erro)
                    }

                    return
                }

                salvarToken(dados.token)
                aoLogar(dados.usuario)

            } else {
                const resposta = await api('/usuarios', {
                    metodo: 'POST',
                    corpo: { nome, email, senha }
                })

                const dados = await resposta.json()

                if (!resposta.ok) {
                    if (resposta.status === 400) {
                        setErro(dados.erros?.[0]?.mensagem)
                    }

                    if (resposta.status === 409) {
                        setErro('Esse email já está cadastrado.')
                    }

                    if (resposta.status === 429) {
                        setErro(dados.erro)
                    }

                    return
                }

                setModo('login')
                setSenha('')
                setAviso('Conta criada! Entre com seus dados.')
            }

        } catch {
            setErro('Não foi possível falar com a API. Ela está rodando?')
        }
    }

    return (
        <>
            <div className="app-container">
                <div className="card">
                    <form onSubmit={enviar}>
                        <h1 className="titulo">
                            {modo === 'login' ? 'Login' : 'Cadastro'}
                        </h1>

                        {modo === 'cadastro' && (
                            <input
                                className="input-campo"
                                type="text"
                                placeholder="Seu nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        )}

                        <input
                            className="input-campo"
                            type="email"
                            value={email}
                            placeholder="example@email.com"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <input
                            className="input-campo"
                            type="password"
                            value={senha}
                            placeholder="Sua senha"
                            onChange={(e) => setSenha(e.target.value)}
                        />

                        <button type="submit" className="btn-criar">
                            {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                        </button>

                        {erro && <p>{erro}</p>}
                        {aviso && <p>{aviso}</p>}

                        <button
                            type="button"
                            onClick={() =>
                                setModo(
                                    modo === 'login' ? 'cadastro' : 'login'
                                )
                            }
                        >
                            {modo === 'login'
                                ? 'Criar conta'
                                : 'Já tenho uma conta'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Auth
