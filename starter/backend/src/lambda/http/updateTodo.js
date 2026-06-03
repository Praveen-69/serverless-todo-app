import { updateTodo }
from '../../businessLogic/todos.mjs'

import { parseUserId }
from '../../auth/utils.mjs'

export async function handler(event) {
  const todoId =
    event.pathParameters.todoId

  const updatedTodo =
    JSON.parse(event.body)

  const authHeader =
    event.headers.Authorization ||
    event.headers.authorization

  const userId =
    parseUserId(authHeader)

  await updateTodo(
    userId,
    todoId,
    updatedTodo
  )

  return {
    statusCode: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: ''
  }
}