import {exec} from 'child_process';
import {promisify} from 'util';
const execAsync = promisify(exec);

// @ts-ignore
export function runExample(example: string, args: string) {
  const cmd = `yarn ts-node -P ../tsconfig.json --cwd examples/${example} index.ts ${args}`;
  console.log(`$> ${cmd}`);
  return execAsync(cmd);
}
