# GitHub Workflows

This directory contains reusable GitHub Workflows for common CI/CD patterns.

## Available Workflows

### NPM Build & Test Workflows

#### `npm-build-test.yml`
Standard workflow for lint, test and build operations.
```yaml
uses: cloudbeds/workflows/.github/workflows/npm-build-test.yml@main
with:
  runner: ubuntu-latest
  artifactName: build-artifact
  artifactPath: dist
secrets: inherit
```

#### `npm-sequential-build-test.yml`
Similar to npm-build-test but runs operations sequentially. Useful when testing depends on build artifacts.
```yaml
uses: cloudbeds/workflows/.github/workflows/npm-sequential-build-test.yml@main
with:
  runner: ubuntu-latest
  artifactName: build-artifact
  testCoverageAnnotations: coverage
secrets: inherit
```

### NPM Publishing Workflows

#### `npm-build-publish.yml`
Builds and publishes an npm package.
```yaml
uses: cloudbeds/workflows/.github/workflows/npm-build-publish.yml@main
secrets: inherit
```

#### `npm-semantic-release.yml`
Handles semantic versioning and publishing.
```yaml
uses: cloudbeds/workflows/.github/workflows/npm-semantic-release.yml@main
with:
  artifactName: build-artifact
  artifactPath: dist
secrets: inherit
```

### Maintenance Workflows

#### `create-semantic-release-maintenance-branch.yml`
Creates maintenance branches for semantic versioning.
```yaml
uses: cloudbeds/workflows/.github/workflows/create-semantic-release-maintenance-branch.yml@main
with:
  target_version: "1.2" # Optional
```

## Common Workflow Patterns

### Basic Build & Test
```yaml
name: CI
on: [push, pull_request]

jobs:
  build-test:
    uses: cloudbeds/workflows/.github/workflows/npm-build-test.yml@main
    secrets: inherit
```

### Build, Test & Publish
```yaml
name: CI/CD
on:
  push:
    branches: [main]

jobs:
  build-test:
    uses: cloudbeds/workflows/.github/workflows/npm-build-test.yml@main
    secrets: inherit

  publish:
    needs: build-test
    uses: cloudbeds/workflows/.github/workflows/npm-semantic-release.yml@main
    secrets: inherit
```

## Workflow Outputs

Several workflows provide outputs that can be used in subsequent jobs:

### npm-semantic-release.yml
- `isReleased`: Whether a new release was published
- `releasedVersion`: Version of the new release
- `previousVersion`: Previous version
- `releasedSHA`: SHA of the release commit

### npm-build-test.yml
- `appVersion`: Version from package.json

## Key Features

- **Caching**: NPM dependencies are cached for faster builds
- **Test Coverage**: Automatic test coverage reporting
- **Artifacts**: Build artifacts are preserved between jobs
- **Semantic Versioning**: Automated version management
- **Retry Logic**: Built-in retries for AWS operations

## Best Practices

1. Always specify required secrets in your workflow
2. Use semantic commit messages for automatic versioning
3. Consider using sequential workflows when tests depend on build artifacts
4. Leverage workflow outputs for complex deployment scenarios
5. Use maintenance branches for legacy version support
