#!/usr/bin/env node

const {SWF} = require('soflow')
const ora = require('ora')

async function archiveRepositories(queryString) {
  spinner = ora('executing workflow "ArchiveGithubRepositories"').start()
  spinner.color = 'yellow'

  const execution = await SWF.executeWorkflow({
    type: 'ArchiveGithubRepositories',
    id: queryString,
    input: {queryString},
  })
  spinner.text = 'waiting for workflow to complete..'

  const archives = await execution.promise

  spinner.succeed('workflow completed successfully, result:')

  for (const archive of archives) {
    console.log(`${archive.name} - ${archive.url}`)
  }
}

archiveRepositories(process.argv[2]).catch(error => {
  console.error(`Error: ${error.message}`)
  process.exit(1)
})
