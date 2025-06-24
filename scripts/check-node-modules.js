#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const dir = process.cwd();
if (!fs.existsSync(path.join(dir, 'node_modules'))) {
  console.warn(`Missing node_modules in ${dir}. Please run ./setup.sh first.`);
  process.exitCode = 1;
}
