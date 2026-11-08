const API_URL = import.meta.env.VITE_API_URL

export const lerToken = () => localStorage.getItem('token')
export const salvarToken = (token) => localStorage.setItem('token', token)
export const apagarToken = () => localStorage.removeItem('token')

export async function api(caminho, { metodo = 'GET', corpo } = {}) {

    const token = lerToken()


    // 1. montar um objeto de cabeçalhos
    const cabecalhos = {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...(corpo && { 'Content-Type': 'application/json', })
    }

    // 2. metodo fetch 
    const resposta = await fetch(`${API_URL}${caminho}`, {
        method: metodo,
        headers: cabecalhos,
        body: corpo ? JSON.stringify(corpo) : undefined
    })

    if (resposta.status === 401 && token) {
        apagarToken()
        window.dispatchEvent(new Event('sessao-expirada'))
    }

    return resposta

}