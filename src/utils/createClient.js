import { buildCreateClient } from "@hnordt/toolkit"
import axios from "axios"

let createClient = buildCreateClient({
  sendRequest: (params) =>
    axios({
      method: params.method,
      baseURL: "https://jsonplaceholder.typicode.com",
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
