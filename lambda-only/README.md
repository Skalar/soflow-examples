# lambda-only

This example shows how to run a workflow entirely in lambda.

## Running demo

> Configure AWS credentials

```bash
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
```

> Install dependencies

```bash
yarn
```

> Deploy

```bash
yarn deploy
```

> Run workflow to archive some GitHub repos

```bash
yarn archiveRepositories react
```

> Clean up

```bash
yarn teardown
```
