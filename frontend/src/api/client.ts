import axios from 'axios'

// En production : utilise l'URL Render
// En développement : utilise le proxy Vite (/api → localhost:5000)
const baseURL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api`
  : '/api'

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401)
      window.dispatchEvent(new Event('unauthorized'))
    return Promise.reject(err)
  }
)
