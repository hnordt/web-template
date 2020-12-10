import { useQuery as useBaseQuery } from "react-query"

export default function useQuery(...args) {
  const query = useBaseQuery(...args)

  return {
    status: query.status,
    data: query.data?.data ?? null,
    meta: query.data?.meta ?? {},
  }
}
