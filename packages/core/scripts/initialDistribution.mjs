/* eslint-disable no-console */
import parseCb from 'csv-parse';
import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { promisify } from 'util';
import web3 from 'web3';

const parse = promisify(parseCb);

async function main() {
  const path = join(
    dirname(import.meta.url),
    './initialDistribution.csv',
  ).replace('file:', '');
  const file = await readFile(path, 'utf-8');
  const data = (await parse(file)).slice(1);

  const result = data.map(([email, amount]) => [
    web3.utils.toWei(amount),
    web3.utils.keccak256(email),
  ]);

  const totalAmount = data.reduce(
    (acc, [, amount]) => acc.add(new web3.utils.BN(amount)),
    new web3.utils.BN(0),
  );

  console.log(`This is the newGrantees parameter:\n${JSON.stringify(result)}`);
  console.log(
    `\nTotal DANDER: ${totalAmount.toString()} DANDER (${web3.utils.toWei(
      totalAmount.toString(),
    )} DANDERwei)`,
  );
}

main().catch(console.error);
