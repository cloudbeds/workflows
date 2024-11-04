# GitHub Actions & Workflows

This repository contains a collection of reusable GitHub Actions and Workflows for CI/CD automation.

## Documentation

- [GitHub Actions Documentation](./.github/actions/README.md)
- [GitHub Workflows Documentation](./.github/workflows/README.md)

## Overview

This repository provides standardized CI/CD components that can be reused across projects. The components are split into two main categories:

### Actions
Individual, reusable tasks that perform specific functions like:
- Building applications
- Running tests
- Deploying to AWS
- Publishing NPM packages
- Managing releases

### Workflows
Complete CI/CD pipelines that combine multiple actions for common scenarios like:
- Build and test pipelines
- Release automation
- Maintenance operations
- NPM package publishing

## Quick Start

### Using an Action
```yaml
steps:
  - uses: cloudbeds/workflows/.github/actions/npm-install@main
  - uses: cloudbeds/workflows/.github/actions/build@main
    with:
      artifactName: 'my-build'
```

### Using a Workflow
```yaml
jobs:
  build-test:
    uses: cloudbeds/workflows/.github/workflows/npm-build-test.yml@main
    secrets: inherit
```

## Features

- 🔄 Reusable components
- 📦 NPM package management
- 🚀 AWS deployment support
- 🧪 Testing automation
- 🏷️ Semantic versioning
- 🔒 Security best practices

## Requirements

- GitHub Actions enabled in your repository
- Required secrets configured (NPM_TOKEN, AWS credentials, etc.)
- Node.js projects (for NPM-related actions)

## Support

For issues and feature requests, please use the #frontend_engineering Slack channel.
