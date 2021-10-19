import React from "react"
import Head from "next/head"
import { QueryClientProvider, QueryClient } from "react-query"
import ReactTooltip from "react-tooltip"
import { Toaster } from "react-hot-toast"
import dayjs from "dayjs"
import "focus-visible"
import "styles/index.css"

const queryClient = new QueryClient()

dayjs.extend(require("dayjs/plugin/utc"))
dayjs.extend(require("dayjs/plugin/timezone"))
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
        <meta name="description" content="" />
        <title></title>
      </Head>
      <QueryClientProvider client={queryClient}>
        <props.Component {...props.pageProps} />
      </QueryClientProvider>
      <ReactTooltip
        className="!tracking-wide !rounded !px-3 !py-1.5 !text-xs"
        effect="solid"
        delayHide={250}
      />
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
