const http = require('http');

// Adjust these if your emulator uses different host/port
const HOST = process.env.FUNCTIONS_EMULATOR_HOST || 'localhost';
const PORT = process.env.FUNCTIONS_EMULATOR_PORT || 7001;

// Determine the project id: try env, FIREBASE_CONFIG, or use a fallback
function getProjectId() {
  if (process.env.GCLOUD_PROJECT) return process.env.GCLOUD_PROJECT;
  if (process.env.GOOGLE_CLOUD_PROJECT) return process.env.GOOGLE_CLOUD_PROJECT;
  if (process.env.FIREBASE_CONFIG) {
    try {
      const cfg = JSON.parse(process.env.FIREBASE_CONFIG);
      if (cfg && cfg.projectId) return cfg.projectId;
    } catch (e) {
      // ignore
    }
  }
  if (process.env.PROJECT_ID) return process.env.PROJECT_ID;
  // Try to read service account JSON in repo root for project_id
  try {
    const fs = require('fs');
    const p = './fourth-outpost-470409-u3-a70945cd7a5b.json';
    if (fs.existsSync(p)) {
      const txt = fs.readFileSync(p, 'utf8');
      const obj = JSON.parse(txt);
      if (obj && obj.project_id) return obj.project_id;
    }
  } catch (e) {
    // ignore
  }
  return 'demo-project';
}

const PROJECT = getProjectId();
const PATH = `/${PROJECT}/us-central1/gemini25FlashProxy`;

const data = JSON.stringify({
  model: 'gemini-2.5-flash',
  messages: [
    { role: 'user', content: 'hello' }
  ]
});

const options = {
  hostname: HOST,
  port: PORT,
  path: PATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Headers:', res.headers);
    console.log('Body:', body);
  });
});

req.on('error', (e) => {
  console.error('Request error:', e);
});

req.write(data);
req.end();
