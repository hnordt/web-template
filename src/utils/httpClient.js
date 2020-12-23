import axios from "axios"

const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 120_000,
})

httpClient.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers.Authorization = `Bearer ${localStorage.token}`
  }

  return config
})

export default httpClient
