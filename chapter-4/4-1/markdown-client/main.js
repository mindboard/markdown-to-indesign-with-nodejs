const JSON2 = require('JSON2');
const markdownclient = require('./modules/markdownclient.js');

//const markdownText = 'Hello, World!';
const markdownText = 'Hello, **World**!';
const documentNode = markdownclient.parse(markdownText);
$.writeln(JSON2.stringify(documentNode, null, '  '));
