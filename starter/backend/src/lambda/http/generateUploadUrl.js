import { generateUploadUrl }
from '../../businessLogic/todos.mjs'

import { parseUserId }
from '../../auth/utils.mjs'

export async function handler(event) {
  const todoId =
    event.pathParameters.todoId

  const authHeader =
    event.headers.Authorization ||
    event.headers.authorization

  const userId =
    parseUserId(authHeader)

  const uploadUrl =
    await generateUploadUrl(
      todoId
    )

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      uploadUrl
    })
  }
}