import jwt from 'jsonwebtoken'

export function parseUserId(authHeader) {
  const token = getToken(authHeader)

  const decodedJwt = jwt.decode(token)

  return decodedJwt.sub
}

function getToken(authHeader) {
  if (!authHeader)
    throw new Error(
      'No authentication header'
    )

  if (
    !authHeader
      .toLowerCase()
      .startsWith('bearer ')
  ) {
    throw new Error(
      'Invalid authentication header'
    )
  }

  const split = authHeader.split(' ')
  return split[1]
}