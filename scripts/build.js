const fs = require('fs-extra');
const snippets = require('../src/snippets/index');

fs.outputJSON('./build/snippets.json', snippets);
