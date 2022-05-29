const _ = require('./node_modules/underscore/underscore-umd.js');
const ind = require('./modules/ind.js');
const story = require('./modules/story.js');
const style = require('./modules/style.js');
const markdownclient = require('./modules/markdownclient.js');

const parseNode = (node, textFrame, styleParams)=> {
    if(node.type=='document'){
        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });
    }
    else if(node.type=='paragraph'){
        // 段落の開始処理(段落スタイルを適用).
        story.getInsertionPoint(textFrame).applyParagraphStyle(
            styleParams.arialPs13);

        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });

        // 段落の終了処理(改行を挿入).
        story.addBr(textFrame);
    }
    else if(node.type=='strong'){
        // ボールドの文字スタイルを適用.
        story.getInsertionPoint(textFrame).applyCharacterStyle(
            styleParams.boldCs);

        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });

        // 文字スタイルを解除(文字スタイル [なし] を適用).
        story.getInsertionPoint(textFrame).applyCharacterStyle(
            styleParams.defaultCs);
    }
    else if(node.type=='text'){
        //InDesign のテキストフレームにテキストを追加.
        story.getInsertionPoint(textFrame).contents = node.contents;
    }
};

// 用紙設定と InDesign オブジェクトの準備.
const params = {
    pageWidth: 50,
    pageHeight: 50,
    margin: {
        top: 5,
        left: 5,
        bottom: 5,
        right: 5
    }
};
const docObject = ind.createDocObject(params);
const doc       = docObject.doc;
const textFrame = docObject.textFrame;

// Markdown テキストを markdown-server 経由で変換、そのモデルの取得.
//const markdownText = 'Hello, World!';
const markdownText = 'Hello, **World**!';
const documentNode = markdownclient.parse(markdownText);

// スタイルパラメータを用意して documentNode をたどりながら InDesign 文書を生成.
const styleParams = {
    arialPs13 : style.getArialParagraphStyle(doc, 13),
    defaultCs : style.getDefaultCharacterStyle(doc),
    boldCs    : style.getBoldCharacterStyle(doc)
};
parseNode(documentNode, textFrame, styleParams);
