import middy from '@middy/core'
import httpCors from '@middy/http-cors'

import { getUserId } from '../../auth/utils.mjs'

import {
  deleteTodo
} from '../../businessLogic/todos.mjs'

async function deleteTodoHandler(event) {
  const todoId = event.pathParameters.todoId

  const userId = getUserId(event)

  console.log('Deleting TODO item', todoId)
  console.log('User ID: ', userId)

  await deleteTodo(userId, todoId)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'TODO deleted successfully'
    })
  }
  console.log('TODO deleted successfully')
}

export const handler = middy(deleteTodoHandler)
  .use(httpCors())