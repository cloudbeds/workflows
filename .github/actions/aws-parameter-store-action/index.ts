import fs from 'fs';
import { EOL } from 'os';
import path from 'path';
import { SSMClient, Parameter, GetParameterCommandInput, GetParameterCommand } from '@aws-sdk/client-ssm';
import * as core from '@actions/core';

const DEFAULT_DOTENV_FILENAME = '.env';

interface FileParameter extends Parameter {
  Name: string;
  Value: string;
}

const FORMATTERS = new Map([
  ['dotenv', (parameters: FileParameter[]) => {
    const filename = core.getInput('filename') || DEFAULT_DOTENV_FILENAME;
    const content = parameters.map(param => `${path.basename(param.Name)}=${param.Value}`).join(EOL);
    fs.writeFileSync(filename, content);
  }],
  ['as-is', (parameters: FileParameter[]) => {
    const { Name, Value } = parameters[0];
    const filename = core.getInput('filename') || path.basename(Name);
    fs.writeFileSync(filename, Value);
  }],
]);

async function main() {
  const region = core.getInput('aws-region');
  const paramPath = core.getInput('path');
  const client = new SSMClient({ region });
  const input: GetParameterCommandInput = {
    Name: paramPath,
    WithDecryption: core.getBooleanInput('with-decryption'),
  };
  const command = new GetParameterCommand(input);
  const result = await client.send(command);

  if (core.isDebug()) {
    core.debug(`Response: ${JSON.stringify(result, null, 2)}`);
  }

  let parameters: FileParameter[] = [];
  try {
    // Check if value is JSON
    const parsedJson = JSON.parse(result.Parameter?.Value || '');
    // Add each property to parameters
    Object.keys(parsedJson).forEach(key => parameters.push({ Name: key, Value: parsedJson[key] }));
  } catch (e) {
    parameters = [{ Name: path.basename(paramPath), Value: result.Parameter?.Value || '' }];
  }

  parameters.forEach(parameter => {
    core.setOutput(path.basename(parameter.Name), parameter.Value);
  });
  FORMATTERS.get(core.getInput('format'))?.call(null, parameters);
}
main().catch(e => core.setFailed(e.message));

export default main;
