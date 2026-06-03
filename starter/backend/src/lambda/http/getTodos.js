import middy from '@middy/core'
import httpCors from '@middy/http-cors'

import { getUserId } from '../../auth/utils.mjs'
import { getTodos } from '../../businessLogic/todos.mjs'

async function getTodosHandler(event) {
  const userId = getUserId(event)

  const items = await getTodos(userId)


  return {
    statusCode: 200,
    body: JSON.stringify({
      items
    })
  }
  console.log('User ID: ', userId)
  console.log('result: ', items)
  console.log('todos retrieved successfully')
}

export const handler = middy(getTodosHandler)
  .use(httpCors())