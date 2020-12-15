import React from "react"
import Head from "next/head"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ToastContainer, Slide, toast } from "react-toastify"
import dayjs from "dayjs"
import "focus-visible"
import "react-toastify/dist/ReactToastify.css"
import "styles/index.css"

const queryClient = new QueryClient()

dayjs.extend(require("dayjs/plugin/utc"))
dayjs.extend(require("dayjs/plugin/localizedFormat"))

export default function App(props) {
  return (
    <>
      <Head>
        <meta name="description" content="" />
        <title></title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Inter:100,200,300,400,500,600,700,800,900&amp;display=swap"
        />
      </Head>
      <div suppressHydrationWarning>
        {typeof window === "undefined" ? null : (
          <>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <props.Component {...props.pageProps} />
              </QueryClientProvider>
            </BrowserRouter>
            <ToastContainer
              toastClassName="pl-5"
              closeButton={null}
              position={toast.POSITION.TOP_RIGHT}
              transition={Slide}
            />
          </>
        )}
      </div>
    </>
  )
}
