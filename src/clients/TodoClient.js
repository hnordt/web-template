import createClient from "../utils/createClient"

let TodoClient = createClient({
  getAll: () => ({
    method: "get",
    path: "/todos",
    transformData: (data) => data.slice(0, 20),
  }),
  get: (id) => ({
    method: "get",
    path: `/todos/${id}`,
  }),
  create: (todo) => ({
    method: "post",
    path: "/todos",
    payload: todo,
  }),
  update: (todo) => ({
    method: "patch",
    path: `/todos/${todo.id}`,
    payload: todo,
  }),
  delete: (id) => ({
    method: "delete",
    path: `/todos/${id}`,
  }),
})

export default TodoClient
