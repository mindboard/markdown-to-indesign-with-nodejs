const commonmark = require('../node_modules/commonmark/dist/commonmark.js');
const _ = require('underscore');

const markdown = {};

const children = (childNode, acc)=>{
    acc.push(childNode);
    if( childNode._next==null ){
        return acc;
    }
    else {
        return children(childNode._next, acc);
    }
};

const parseNode = (node, acc0)=>{
    if(node._type == 'text'){
        acc0.type = node._type;
        acc0.contents = node._literal;
        return acc0;
    }
    else if(node._type == 'image'){
        acc0.type = node._type;
        acc0.filepath = node._destination;
        return acc0;
    }
    else {
        const childNodes = children(node._firstChild, []);
        const f = (acc1, childNode)=> acc1.concat(parseNode(childNode, {}));

        acc0.type = node._type;
        if(node._type=='heading'){
            acc0.level = node._level;
        }
        acc0.children = _.foldl( childNodes, f, []);
        return acc0;
    }
};

markdown.parse = (markdownText)=>{
    const reader = new commonmark.Parser();
    const node = reader.parse(markdownText);
    return parseNode(node, {});
};

module.exports = markdown;
