import { buildCreateClient } from "@hnordt/toolkit"
import axios from "axios"

let httpClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
})

let createClient = buildCreateClient({
  sendRequest: (params) =>
    httpClient({
      method: params.method,
      url: params.path,
      [params.method === "get" ? "params" : "data"]: params.payload,
    })
      .then((response) => ({
        data: params.transformData?.(response.data) ?? response.data,
        meta: {},
      }))
      .catch((error) => {
        throw new Error(error.response?.data ?? error.message)
      }),
})

export default createClient
