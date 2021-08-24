import axios from "axios"

const httpClient = axios.create({
  baseURL: "/api",
})

httpClient.interceptors.request.use((config) => ({
  ...config,
  headers: {
    ...config.headers,
    // Authorization: `Bearer ${}`
  },
}))

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
