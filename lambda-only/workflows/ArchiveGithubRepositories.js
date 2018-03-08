async function ArchiveGithubRepositories({
  input: {queryString},
  actions: {task},
}) {
  let githubRepositories = await task({
    name: 'findGithubRepositories',
    args: [queryString],
  })

  const archives = await Promise.all(
    githubRepositories.map(async repo => {
      try {
        const url = await task({
          name: 'storeGithubRepositoryToS3',
          args: [repo],
        })
        return {name: repo, url}
      } catch (error) {
        return {name: repo, url: `error: ${error.message}`}
      }
    })
  )

  return archives
}

ArchiveGithubRepositories.config = {
  startToCloseTimeout: 120,
}
module.exports = ArchiveGithubRepositories
