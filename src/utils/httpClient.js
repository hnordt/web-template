import axios from "axios"

const accessToken = "24275a1db0f9fb6c8361c26f1fca0c94f5d6b790"

const httpClient = axios.create({
  baseURL: "https://new-dev.digichemplus.com/api",
})

httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Token ${accessToken}`

  return config
})

httpClient.interceptors.response.use(undefined, (error) => {
  const data = error.response?.data

  if (data?.detail) {
    return Promise.reject(new Error(data.detail))
  }

  if (Array.isArray(data?.non_field_errors)) {
    return Promise.reject(new Error(data.non_field_errors[0]))
  }

  return Promise.reject(error)
})

export default httpClient
