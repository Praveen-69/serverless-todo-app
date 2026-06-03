import middy from '@middy/core'
import cors from '@middy/http-cors'
import httpErrorHandler from '@middy/http-error-handler'

import { getUserId } from '../../auth/utils.mjs'

import {
  generateUploadUrl
} from '../../businessLogic/todos.mjs'

export const handler = middy()
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )
  .handler(async (event) => {
    const todoId = event.pathParameters.todoId

    const userId = getUserId(event)

    console.log('Generating upload URL', {
      todoId,
      userId
    })
    console.log('User ID: ', userId)

    const uploadUrl =
      await generateUploadUrl(todoId)

    return {
      statusCode: 200,

      body: JSON.stringify({
        uploadUrl
      })
    }
    console.log('Upload URL generated successfully')
  })