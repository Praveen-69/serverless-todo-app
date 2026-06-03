import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpJsonBodyParser from '@middy/http-json-body-parser'

import { getUserId } from '../../auth/utils.mjs'

import {
  updateTodo
} from '../../businessLogic/todos.mjs'

async function updateTodoHandler(event) {
  const todoId = event.pathParameters.todoId

  const updatedTodo = event.body

  const userId = getUserId(event)

  console.log('Updating item', todoId)

  await updateTodo(
    userId,
    todoId,
    updatedTodo
  )

  console.log('User ID: ', userId)
  console.log('result: ', items)
  console.log('todo updated successfully')

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Todo updated'
    })
  }
}

export const handler = middy(updateTodoHandler)
  .use(httpJsonBodyParser())
  .use(httpCors())