import middy from '@middy/core'
import httpCors from '@middy/http-cors'
import httpJsonBodyParser from '@middy/http-json-body-parser'

import { getUserId } from '../../auth/utils.mjs'
import { createTodo } from '../../businessLogic/todos.mjs'

async function createTodoHandler(event) {
  const newTodo = event.body

  const userId = getUserId(event)

  console.log('Creating a new todo with the following values: ', newTodo)
  console.log('User ID: ', userId)

  const item = await createTodo(
    newTodo,
    userId
  )

  return {
    statusCode: 201,
    body: JSON.stringify({
      item
    })
  }
}

export const handler = middy(createTodoHandler)
  .use(httpJsonBodyParser())
  .use(httpCors())