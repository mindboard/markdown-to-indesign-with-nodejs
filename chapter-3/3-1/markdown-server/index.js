/*
const commonmark = require('./node_modules/commonmark/dist/commonmark.js');
const _ = require('underscore');

// デバッグ出力用インデントの生成.
const indent = (v)=>{
    return _.foldl(_.range(v), (acc, i)=>{ return acc+=' '; }, '');
};

const markdownText = 'Hello, World!';

const reader = new commonmark.Parser();
const documentNode  = reader.parse(markdownText);
const paragraphNode = documentNode._firstChild;
const textNode0     = paragraphNode._firstChild;
const textNode1     = textNode0._next;

console.log(`${indent(0)}${documentNode._type}`);
console.log(`${indent(1)}${paragraphNode._type}`);
console.log(`${indent(2)}${textNode0._type} (${textNode0._literal})`);
console.log(`${indent(2)}${textNode1._type} (${textNode1._literal})`);
*/

// -----------------------------------------------------------------------------

/*
const commonmark = require('./node_modules/commonmark/dist/commonmark.js');
const _ = require('underscore');

// デバッグ出力用インデントの生成.
const indent = (v)=>{
    return _.foldl(_.range(v), (acc, i)=>{ return acc+=' '; }, '');
};

const markdownText = ['Hello, World!', 'Hello, Again!'].join('\r\r');

const reader = new commonmark.Parser();
const documentNode  = reader.parse(markdownText);

const paragraphNode0 = documentNode._firstChild;
const textNode0      = paragraphNode0._firstChild;
const textNode1      = textNode0._next;

const paragraphNode1 = documentNode._firstChild._next;
const textNode2      = paragraphNode1._firstChild;
const textNode3      = textNode2._next;

console.log(`${indent(0)}${documentNode._type}`);

console.log(`${indent(1)}${paragraphNode0._type}`);
console.log(`${indent(2)}${textNode0._type} (${textNode0._literal})`);
console.log(`${indent(2)}${textNode1._type} (${textNode1._literal})`);

console.log(`${indent(1)}${paragraphNode1._type}`);
console.log(`${indent(2)}${textNode2._type} (${textNode2._literal})`);
console.log(`${indent(2)}${textNode3._type} (${textNode3._literal})`);
*/

// -----------------------------------------------------------------------------

/*
const commonmark = require('./node_modules/commonmark/dist/commonmark.js');
const _ = require('underscore');

const indent = (v)=>{
    return _.foldl(_.range(v), (acc, i)=>{ return acc+=' '; }, '');
};

const children = (childNode, acc)=>{
    acc.push(childNode);
    if( childNode._next==null ){
        return acc;
    }
    else {
        return children(childNode._next, acc);
    }
};

const markdownText = [
    'Hello, World!',
    'Hello, Again!'].join('\r\r');

const reader = new commonmark.Parser();
const documentNode = reader.parse(markdownText);

console.log(`${indent(0)}${documentNode._type}`);

const paragraphNodes = children(documentNode._firstChild, []);
_.each(paragraphNodes, (paragraphNode)=>{
    console.log(`${indent(1)}${paragraphNode._type}`);

    const textNodes = children(paragraphNode._firstChild, []);
    _.each(textNodes, (textNode)=>{
        console.log(`${indent(2)}${textNode._type} (${textNode._literal})`);
    });
});
*/


// -----------------------------------------------------------------------------

const commonmark = require('./node_modules/commonmark/dist/commonmark.js');
const _ = require('underscore');

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
        acc0.push(`${node._type} (${node._literal})`);
        return acc0;
    }
    else {
        acc0.push(node._type);

        const childNodes = children(node._firstChild, []);
        const f = (acc1, childNode)=> acc1.concat(parseNode(childNode, []));
        return acc0.concat( _.foldl( childNodes, f, []) );
    }
};

/*
const markdownText = [
    'Hello, World!',
    'Hello, Again!'].join('\r\r');
*/

const markdownText = [
    '# DOWN THE RABBIT-HOLE',
    '**Down, down, down!** Would the fall never come to an end?'].join('\r\r');

const reader = new commonmark.Parser();
const node = reader.parse(markdownText);

const documentNode = parseNode(node, []);
console.log(documentNode);


