import React from "react"
import Head from "next/head"
import { QueryClientProvider, QueryClient } from "react-query"
import { Toaster } from "react-hot-toast"
import dayjs from "dayjs"
import "styles/index.css"
import "focus-visible"

const queryClient = new QueryClient()

dayjs.extend(require("dayjs/plugin/utc"))
dayjs.extend(require("dayjs/plugin/localizedFormat"))

export default function App(props) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Head>
        <title></title>
        <meta name="description" content="" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <props.Component {...props.pageProps} />
      </QueryClientProvider>
      <Toaster
        toastOptions={{
          className: "text-sm whitespace-nowrap",
        }}
        position="bottom-right"
        reverseOrder
      />
    </>
  )
}
