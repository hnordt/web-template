import httpClient from "utils/httpClient"

export default function authenticate() {
  return httpClient.post("/authenticate").then((response) => response.data)
}
