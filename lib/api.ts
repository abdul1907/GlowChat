import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export const fetchTemplates = async () => {
  const response = await api.get('/templates')
  return response.data
}

export const createBot = async (data: { niche: string; nodes: any[]; edges: any[] }) => {
  const response = await api.post('/bots', data)
  return response.data
}

export const createDemoCall = async (data: { niche: string; phoneNumber: string }) => {
  const response = await api.post('/demo-call', data)
  return response.data
}
