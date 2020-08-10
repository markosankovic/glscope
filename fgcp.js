const path = require('path');
const fs = require('fs');

const csvPath = path.resolve(__dirname, process.argv[2]);
const yindex = parseInt(process.argv[3]);

const contents = fs.readFileSync(csvPath, { encoding: 'utf8' });

let data = contents.split('\n');
data.shift();
data = data.map(line => line.split(',').map(n => Number(n)));

data = data.reduce((prev, curr) => {
  prev.push(`${parseFloat(curr[0])},${parseFloat(curr[yindex])}`);
  return prev;
}, []);

process.stdout.write(`[${data.join(',')}]\n`);