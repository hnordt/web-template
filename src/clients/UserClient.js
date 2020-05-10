import createClient from "../utils/createClient"

let UserClient = createClient({
  getAll: () => ({
    method: "get",
    path: "/users",
    transformData: (data) => data,
  }),
  get: (id) => ({
    method: "get",
    path: `/users/${id}`,
  }),
  create: (todo) => ({
    method: "post",
    path: "/users",
    payload: todo,
  }),
  update: (todo) => ({
    method: "patch",
    path: `/users/${todo.id}`,
    payload: todo,
  }),
  delete: (id) => ({
    method: "delete",
    path: `/users/${id}`,
  }),
})

export default UserClient
