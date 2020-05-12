import React from "react"
import Screen from "components/Screen"
import Layout from "components/Layout"
import Container from "components/Container"
import Link from "components/Link"

export default function Home() {
  return (
    <Screen title="Home">
      <Layout>
        <Container>
          <Link href="/playground">Playground</Link>
        </Container>
      </Layout>
    </Screen>
  )
}
