const fs = require('fs-nextra');
const jsSnippets = require('../src/snippets/javascript');
const tsSnippets = require('../src/snippets/typescript');

fs.outputJSON('./build/snippets.json', jsSnippets);
fs.outputJSON('./build/snippets-ts.json', tsSnippets);
