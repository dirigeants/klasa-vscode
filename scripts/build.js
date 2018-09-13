const fs = require('fs-nextra');
const snippets = require('../src/snippets/index');

fs.outputJSON('./build/snippets.json', snippets);
