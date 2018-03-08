const fetch = require('node-fetch')

async function findGithubRepositories(queryString) {
  const response = await fetch(
    `https://api.github.com/search/repositories?q=${queryString} size:<1000`
  )
  const json = await response.json()
  const repos = json.items.map(item => item.full_name)

  return repos
}

findGithubRepositories.config = {
  type: 'faas',
  startToCloseTimeout: 10,
}

module.exports = findGithubRepositories
