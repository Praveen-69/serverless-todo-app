import { v4 as uuidv4 } from 'uuid'

import {
    createTodo as createTodoAccess,
    deleteTodo as deleteTodoAccess,
    getTodosForUser,
    updateTodo as updateTodoAccess
} from '../dataLayer/todosAccess.mjs'

import { AttachmentUtils } from '../fileStorage/attachmentUtils.mjs'

const attachmentUtils = new AttachmentUtils()

export async function getTodos(userId) {
  return await getTodosForUser(userId)
}

export async function createTodo(createTodoRequest, userId) {
  const todoId = uuidv4()

  const createdAt = new Date().toISOString()

  const attachmentUrl =
    attachmentUtils.getAttachmentUrl(todoId)

  const todoItem = {
    userId,
    todoId,
    createdAt,
    name: createTodoRequest.name,
    dueDate: createTodoRequest.dueDate,
    done: false,
    attachmentUrl
  }

  await createTodoAccess(todoItem)

  return todoItem
}

export async function updateTodo(
  userId,
  todoId,
  updateTodoRequest
) {
  await updateTodoAccess(
    userId,
    todoId,
    updateTodoRequest
  )
}

export async function deleteTodo(userId, todoId) {
  await deleteTodoAccess(userId, todoId)
}

export async function generateUploadUrl(todoId) {
  return attachmentUtils.getUploadUrl(todoId)
}