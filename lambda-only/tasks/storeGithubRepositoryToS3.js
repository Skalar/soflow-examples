const fetch = require('node-fetch')

async function storeGithubRepositoryToS3(name) {
  const AWS = require('aws-sdk')
  const s3 = new AWS.S3()

  const response = await fetch(
    `https://github.com/${name}/archive/master.tar.gz`
  )

  const Bucket = process.env.S3_BUCKET
  const Key = `${name.replace('/', '-')}.tgz`

  await s3
    .upload({
      Bucket,
      Key,
      Body: response.body,
      ACL: 'public-read',
    })
    .promise()

  const url = `https://${Bucket}.s3.eu-west-1.amazonaws.com/${Key}`

  return url
}

storeGithubRepositoryToS3.config = {
  type: 'faas',
  startToCloseTimeout: 120,
  rolePolicyStatements: [
    {
      Effect: 'Allow',
      Action: ['s3:PutObject', 's3:GetObject', 's3:PutObjectAcl'],
      Resource: `arn:aws:s3:::${process.env.SOFLOW_NAMESPACE}/*`,
    },
  ],
  environment: {
    S3_BUCKET: process.env.SOFLOW_NAMESPACE,
  },
}

module.exports = storeGithubRepositoryToS3
