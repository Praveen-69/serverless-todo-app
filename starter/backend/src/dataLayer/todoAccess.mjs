import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import {
    DeleteCommand,
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
    UpdateCommand
} from '@aws-sdk/lib-dynamodb'

const client = DynamoDBDocumentClient.from(new DynamoDBClient({}))

const todosTable = process.env.TODOS_TABLE

export async function getTodosForUser(userId) {
    console.log('Querying todos for user', userId)
    const result = await client.send(
        new QueryCommand({
            TableName: todosTable,
            KeyConditionExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': userId
            }
        })
    )

    console.log('Retrieved todos for user', userId)
    return result.Items
}

export async function createTodo(todo) {
    console.log('Creating todo', todo)
    await client.send(
        new PutCommand({
            TableName: todosTable,
            Item: todo
        })
    )
}

export async function updateTodo(userId, todoId, updatedTodo) {
    console.log('Updating todo', { userId, todoId, updatedTodo })
    await client.send(
        new UpdateCommand({
            TableName: todosTable,
            Key: {
                userId,
                todoId
            },
            UpdateExpression:
                'set #name = :name, dueDate = :dueDate, done = :done',
            ExpressionAttributeNames: {
                '#name': 'name'
            },
            ExpressionAttributeValues: {
                ':name': updatedTodo.name,
                ':dueDate': updatedTodo.dueDate,
                ':done': updatedTodo.done
            }
        })
    )
}

export async function deleteTodo(userId, todoId) {
    console.log('Deleting todo', { userId, todoId })
    await client.send(
        new DeleteCommand({
            TableName: todosTable,
            Key: {
                userId,
                todoId
            }
        })
    )
}