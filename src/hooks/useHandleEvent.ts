import { useRouter } from "next/router"
import {
  UseQueryResult,
  UseMutationResult,
  UseMutationOptions,
} from "react-query"
import toast from "react-hot-toast"

export type HandleEventConfig =
  | {
      confirm?: string
      /** Triggers the mutation */
      mutate?:
        | UseMutationResult
        | [
            mutation: UseMutationResult,
            variables: any,
            options?: UseMutationOptions
          ]
      /** Triggers the mutation */
      mutateAsync?: [
        mutation: UseMutationResult,
        variables: any,
        config?: {
          options?: UseMutationOptions
          then?: HandleEventConfig
          catch?: HandleEventConfig
        }
      ]
      /** Shows a toast */
      toast?: ["success" | "error", string]
      /** Refetches the query */
      refetch?: UseQueryResult
      /** Pushes new entry to the browser history */
      push?: string
      /** Replaces current entry in the browser history */
      replace?: string
    }
  | ((...args: any) => HandleEventConfig | void)

export default function useHandleEvent() {
  const router = useRouter()

  function handleEvent(config: HandleEventConfig) {
    return (...args) => {
      if (typeof config === "function") {
        const result = config(...args)

        if (typeof result === "object") {
          // TODO: do we need to return?
          return handleEvent(result)(...args)
        }

        // TODO: do we need to return?
        return result
      }

      // TODO: window.confirm causes a refetch due to window refocus
      if (config.confirm && !window.confirm(config.confirm)) {
        return
      }

      if (config.mutate) {
        if (Array.isArray(config.mutate)) {
          config.mutate[0].mutate(config.mutate[1], config.mutate[2])
        } else {
          config.mutate.mutate(undefined)
        }
      }

      if (config.mutateAsync) {
        config.mutateAsync[0]
          .mutateAsync(config.mutateAsync[1], config.mutateAsync[2]?.options)
          .then((data) => {
            if (config.mutateAsync[2]?.then) {
              handleEvent(config.mutateAsync[2].then)(data)
            }
          })
          .catch((error) => {
            if (config.mutateAsync[2]?.catch) {
              handleEvent(config.mutateAsync[2].catch)(error)
            } else {
              throw error
            }
          })
      }

      if (config.toast) {
        toast[config.toast[0]](config.toast[1])
      }

      if (config.refetch) {
        config.refetch.refetch({
          cancelRefetch: true,
        })
      }

      if (config.push) {
        router.push(config.push)
      }

      if (config.replace) {
        router.replace(config.replace)
      }
    }
  }

  return handleEvent
}
