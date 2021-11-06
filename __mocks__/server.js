import { rest } from "msw"
import { setupServer } from "msw/node"

const handlers = [
  rest.post("/greeting", (_, res, ctx) =>
    res(
      ctx.json({
        greeting: "Hello!",
      })
    )
  ),
]

const server = setupServer(...handlers)

export default server
