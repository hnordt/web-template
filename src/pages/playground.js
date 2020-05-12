import React from "react"
import Screen from "components/Screen"
import Layout from "components/Layout"
import Container from "components/Container"
import Link from "components/Link"
import Toolbar from "components/Toolbar"
import Button from "components/Button"

export default function Playground(props) {
  return (
    <Screen title="Playground">
      <Layout>
        <Container>
          <Toolbar gap="xs" inline>
            <Button variant="secondary">A</Button>
            <Button variant="danger">B</Button>
            <Button variant="secondary" loading>
              C
            </Button>
            <Link href="/">Back</Link>
          </Toolbar>
        </Container>
      </Layout>
    </Screen>
  )
}
