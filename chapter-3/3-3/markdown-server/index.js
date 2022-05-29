const markdown = require('./modules/markdown.js');

const markdownText = 'Hello, World!';

const result = markdown.parse(markdownText);
console.log(JSON.stringify(result, null, '  '));