const {config} = require('dotenv');
const {exec} = require('child_process');

config();

const cmd = `npx squid-substrate-metadata-explorer --chain ${process.env.CHAIN_RPC} --archive ${process.env.ARCHIVE_GQL} --out zeroVersions.json`;
console.log(`> ${cmd}`);
const execCmd = exec(cmd);

execCmd.stdout.pipe(process.stdout);
execCmd.stderr.pipe(process.stderr);
