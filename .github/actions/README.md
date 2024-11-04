# GitHub Actions

This directory contains reusable GitHub Actions for common CI/CD tasks.

## Available Actions

### Build & Deploy
- **build** - Builds node projects and uploads artifacts
- **deploy-to-s3** - Uploads code to S3 bucket
- **invalidate-cache** - Invalidates CloudFront cache
- **write-build-info** - Writes build metadata to build-info.json

### Versioning
- **checkout-version-from-package-json** - Extracts version from package.json
- **semantic-release** - Handles semantic versioning and releases

### NPM Operations
- **npm-install** - Installs NPM packages with caching support
- **npm-install-build** - Combines checkout, npm install and build steps
- **npm-install-lint** - Combines checkout, npm install and lint steps
- **npm-install-test** - Runs full test suite with optional coverage
- **npm-publish-dev** - Publishes development versions to NPM registry

### Testing & Quality
- **lint** - Runs ESLint code linter
- **test** - Runs full test suite
- **test-e2e** - Runs end-to-end tests
- **test-unit** - Runs unit tests

### AWS Configuration
- **configure-aws** - Configures AWS credentials with retry logic

## Usage Examples

### Basic Build & Deploy
```yaml
steps:
  - uses: cloudbeds/workflows/.github/actions/build@main
    with:
      artifactName: 'my-build'
      artifactPath: 'dist'

  - uses: cloudbeds/workflows/.github/actions/deploy-to-s3@main
    with:
      artifactName: 'my-build'
      AWS_ARN: ${{ secrets.AWS_ARN }}
      S3_URL: ${{ secrets.S3_URL }}
```

### NPM Install & Test
```yaml
steps:
  - uses: cloudbeds/workflows/.github/actions/npm-install-test@main
    with:
      envVars: 'NODE_ENV=test'
```

### Publishing Dev Version
```yaml
steps:
  - uses: cloudbeds/workflows/.github/actions/npm-publish-dev@main
    with:
      NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
      releaseChannel: 'dev'
```

## Notes
- Most actions are designed to be composable and reusable
- AWS-related actions include retry logic for better reliability
- Test actions support different testing scenarios (unit, e2e, coverage)
- NPM operations support caching for faster builds
