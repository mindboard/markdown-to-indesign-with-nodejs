const express = require('express');
const markdown = require('./modules/markdown.js');

const app = express();
app.use(express.json());

app.post('/', (req, res)=>{
    const markdownText = req.body.markdownText;
    res.status(200).json( markdown.parse(markdownText) );
});

const port = 8000;
app.listen(port);
console.log(`markdown-server is running. port=${port}`);