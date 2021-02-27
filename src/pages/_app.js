import React from "react"
import Head from "next/head"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "react-query"
import { Toaster } from "react-hot-toast"
import dayjs from "dayjs"
import "styles/index.css"
import "react-calendar/dist/Calendar.css"
import "@wojtekmaj/react-daterange-picker/dist/DateRangePicker.css"
import "focus-visible"

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
        {typeof window !== "undefined" && (
          <>
            <BrowserRouter>
              <QueryClientProvider client={queryClient}>
                <props.Component {...props.pageProps} />
              </QueryClientProvider>
            </BrowserRouter>
            <Toaster
              toastOptions={{
                className: "text-sm",
              }}
            />
          </>
        )}
      </div>
    </>
  )
}
