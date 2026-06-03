import { getTodos } from '../../businessLogic/todos.mjs'
import { parseUserId } from '../../auth/utils.mjs'

export async function handler(event) {
  try {
    const authHeader =
      event.headers.Authorization ||
      event.headers.authorization

    const userId = parseUserId(authHeader)

    const todos = await getTodos(userId)

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items: todos || []
      })
    }
  } catch (e) {
    console.log('Error getting todos', e)

    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        error: e.message
      })
    }
  }
}