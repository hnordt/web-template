import { useHistory } from "react-router-dom"
import { UseQueryResult } from "react-query"
import toast from "react-hot-toast"

export type HandleEventConfig =
  | {
      /** Shows a toast */
      toast?: ["success", string]
      /** Refetches the query */
      refetch?: UseQueryResult
      /** Pushes new entry to browser history */
      push?: string | { search?: string }
    }
  | ((...args: any) => void)

export default function useHandleEvent() {
  const history = useHistory()

  return (config: HandleEventConfig) =>
    (...args) => {
      if (typeof config === "function") {
        // TODO: inject utils?
        return config(...args)
      }

      if (config.toast) {
        toast[config.toast[0]](config.toast[1])
      }

      if (config.refetch) {
        config.refetch.refetch()
      }

      if (config.push) {
        history.push(config.push)
      }
    }
}
