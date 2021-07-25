import axios from "axios"

const accessToken = "82ab59bbbd5fa375f0944ae28d9e5892d07e6ccd"

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
