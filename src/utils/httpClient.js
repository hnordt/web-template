import axios from "axios"

const httpClient = axios.create({
  baseURL: "https://dev-api.dnsfilter.com/v1",
  timeout: 120_000,
})

httpClient.interceptors.request.use((config) => {
  if (localStorage.token) {
    config.headers.Authorization = `Bearer ${localStorage.token}`
  }

  return config
})

export default httpClient
