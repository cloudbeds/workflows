# AWS SSM Parameter Store Action

Retrieves a parameter from the AWS SSM Parameter Store and writes its value to output and to a file.

If you have the following parameter in AWS:

`/my/own/parameter`

with value:

```json
{
    "EXAMPLE_VAR": "true",
    "MY_VAR2": "another var"
}
```

then you can run the action like so:

```yml
    - name: Create dotenv file
      uses: cloudbeds/workflows/.github/actions/aws-ssm-parameter-store-action@main
      with:
        aws-region: ${{ vars.AWS_DEFAULT_REGION }}
        path: /my/own/parameter
        format: dotenv
        filename: .env
```

and it will generate a `.env` file with the following content:

```
EXAMPLE_VAR=true
MY_VAR2=another var
```

## Input

### aws-region

**Required**. `secrets.AWS_REGION`

### path

**Required**. Path to the parameter to retrieve

### with-decription

Whether to decrypt

### filename

Filename to save the parameters

### format

Format to save as. *dotenv* format. *as-is* is also available. Even if you omit, you can still access the content through `outputs`.

## Output

If the parameter's value has a valid *JSON*, then key and value of the properties are mapped to the output and can be accessed like so: `${{steps.step-id.outputs.fookey}}`.

If the parameter's value is not JSON, there is a single item in the `outputs` and its value is the full content of the parameter.

## Development

Run `npm install` to install all the dependencies.

Before pushing to the repository, make sure to build the final `index.js` file by running:

```
npm run build
```

## Author

This GitHub Action was originally created by GY Noh <nohmad@gmail.com>

It has been adapted to support the `configure-aws` action to authenticate with AWS and to have a JSON input.

# LICENSE

MIT License
