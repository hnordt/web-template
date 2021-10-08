import axios from "axios"

const httpClient = axios.create({
  baseURL: "/api",
})

httpClient.interceptors.request.use((config) => {
  const accessToken = null

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

httpClient.interceptors.response.use(undefined, (error) => {
  const data = error.response?.data

  if (!data) {
    return Promise.reject(error)
  }

  if (data.message) {
    return Promise.reject(new Error(data.message))
  }

  if (data.detail) {
    return Promise.reject(new Error(data.detail))
  }

  if (Array.isArray(data.non_field_errors)) {
    return Promise.reject(new Error(data.non_field_errors[0]))
  }

  // TODO: "Crash" report

  return Promise.reject(new Error("Unknown error"))
})

export default httpClient
