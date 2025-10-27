const fs = require('fs');
const path = './fourth-outpost-470409-u3-a70945cd7a5b.json';
if (!fs.existsSync(path)) {
  console.error('source json not found:', path);
  process.exit(1);
}
const raw = fs.readFileSync(path, 'utf8');
const b = Buffer.from(raw, 'utf8').toString('base64');
fs.writeFileSync('.secret.local', `SERVICE_ACCOUNT_JSON_B64="${b}"`, 'utf8');
console.log('.secret.local written');
