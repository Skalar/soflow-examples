#!/usr/bin/env node

const {SWF} = require('soflow')

async function setup() {
  await SWF.Orchestration.setup({
    progressIndicator: true,
    createBucket: true,
    files: ['node_modules/node-fetch/**', 'workflows/**', 'tasks/**'],
  })
  await SWF.Orchestration.Lambda.shutdownDeciders()
  await SWF.Orchestration.Lambda.enableDecider()
  await SWF.Orchestration.Lambda.invokeDecider()
}

setup().catch(error => {
  console.error('error during setup', error)
  process.exit(1)
})
