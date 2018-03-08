#!/usr/bin/env node

const {SWF} = require('soflow')

async function teardown() {
  try {
    await SWF.Orchestration.Lambda.shutdownDeciders()
  } catch (error) {
    // ignore
  }
  await SWF.Orchestration.teardown({
    progressIndicator: true,
    removeBucket: true,
  })
}

teardown().catch(error => {
  console.error('error during teardown', error)
  process.exit(1)
})
