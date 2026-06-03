import AWS from 'aws-sdk'
import AWSXRay from 'aws-xray-sdk-core'
const AWSXRayAWS = AWSXRay.captureAWS(AWS)
export class AttachmentUtils {
  constructor() {
    this.s3 = new AWSXRayAWS.S3({
      signatureVersion: 'v4'
    })

    this.bucketName = process.env.ATTACHMENT_S3_BUCKET
    this.urlExpiration = Number(
      process.env.SIGNED_URL_EXPIRATION
    )
  }

  getAttachmentUrl(todoId) {
    console.log('Generating attachment URL for todoId', todoId)
    return `https://${this.bucketName}.s3.amazonaws.com/${todoId}`
  }

  getUploadUrl(todoId) {
    console.log('Generating signed URL for todoId', todoId)
    return this.s3.getSignedUrl('putObject', {
      Bucket: this.bucketName,
      Key: todoId,
      Expires: this.urlExpiration
    })
  }
}