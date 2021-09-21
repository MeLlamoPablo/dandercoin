/* eslint-disable no-console */
import {
  mkdir as mkdirCb,
  readFile as readFileCb,
  writeFile as writeFileCb,
} from 'fs';
import { join } from 'path';
import { promisify } from 'util';

/**
 * This scripts extracts the ABI from the "public contracts" (or those contracts
 * the webapp interfaces directly with) and writes it into a separate file.
 *
 * The only piece of information that the front-end needs is the ABI plus the
 * deployed address. The deployed address is set manually via environment
 * variables, and the ABI is generated on the CI.
 */

const mkdir = promisify(mkdirCb);
const readFile = promisify(readFileCb);
const writeFile = promisify(writeFileCb);

const PUBLIC_CONTRACTS = [
  'Dandercoin',
  'Distributor',
  'GovernorBravo',
  'IdentityOracle',
];

async function main() {
  await mkdir(join(process.cwd(), 'out'), { recursive: true });

  async function processContract(contractName) {
    const src = join(process.cwd(), 'build/contracts', `${contractName}.json`);
    const dest = join(process.cwd(), 'out', `${contractName}.abi.json`);

    const contract = JSON.parse(await readFile(src, 'utf-8'));

    await writeFile(dest, JSON.stringify(contract.abi), 'utf-8');
  }

  await Promise.all(PUBLIC_CONTRACTS.map(processContract));
}

main().catch(console.error);
