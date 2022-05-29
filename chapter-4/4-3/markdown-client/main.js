const _ = require('./node_modules/underscore/underscore-umd.js');
const ind = require('./modules/ind.js');
const story = require('./modules/story.js');
const style = require('./modules/style.js');
const image = require('./modules/image.js');
const markdownclient = require('./modules/markdownclient.js');

const resolveHeadingParagraphStyle = (level, styleParams)=>{
    if(level==1){
        return styleParams.arialPs24;
    }
    else if(level==2){
        return styleParams.arialPs16;
    }
    else {
        return styleParams.arialPs16;
    }
};

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
    else if(node.type=='heading'){
        // 適用する段落スタイルを解決する.
        const headingPs = resolveHeadingParagraphStyle(
            node.level, styleParams);

        // 見出しの段落スタイルを適用.
        story.getInsertionPoint(textFrame).applyParagraphStyle(
            headingPs);

        _.each(node.children, (childNode)=> {
            parseNode(childNode, textFrame, styleParams);
        });

        // 段落の終了処理(改行を挿入).
        story.addBr(textFrame);
    }
    else if(node.type=='emph'){
        // イタリックの文字スタイルを適用.
        story.getInsertionPoint(textFrame).applyCharacterStyle(
            styleParams.italicCs);

        _.each(node.children, (childNode)=>{
            parseNode(childNode, textFrame, styleParams);
        });

        // 文字スタイルを解除(文字スタイル [なし] を適用).
        story.getInsertionPoint(textFrame).applyCharacterStyle(
            styleParams.defaultCs);
    }
    else if(node.type=='strong'){
        // ボールドの文字スタイルを適用.
        story.getInsertionPoint(textFrame).applyCharacterStyle(
            styleParams.boldCs);

        _.each(node.children, (childNode)=>{
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
    else if(node.type=='image'){
        // 画像の配置.
        const currentDir = File($.fileName).parent;
        const imageFile = File(`${currentDir.fullName}/${node.filepath}`);
        image.place(textFrame, imageFile);
    }
    else if(node.type=='list'){
        _.each(node.children, (itemNode)=> {
            _.each(itemNode.children, (paragraphNode)=>{
                // 箇条書きの段落スタイルを適用.
                story.getInsertionPoint(textFrame).applyParagraphStyle(
                    styleParams.listItemPs);

                _.each(paragraphNode.children, (childNode)=>{
                    parseNode(childNode, textFrame, styleParams);
                });

                // 段落の終了処理(改行を挿入).
                story.addBr(textFrame);
            });
        });
    }
};

const readFile = (file)=>{
    file.encoding = 'UTF-8';
    if( file.open('r') ){
        const text = file.read();
        file.close();

        return text;
    }
    return 'error';
};

// InDesign オブジェクトの準備.
const params = {
    pageWidth: 100,
    pageHeight: 100,
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

const currentDir = File($.fileName).parent;
const markdownFile =
    new File(`${currentDir.fullName}/alice.md`);
const markdownText = readFile(markdownFile);

// マークダウンテキストをマークダウンサーバ経由で変換してそのモデルを取得.
const documentNode = markdownclient.parse(markdownText);

// スタイルパラメータを用意.
const styleParams = {
    arialPs24 : style.getArialParagraphStyle(doc, 24),
    arialPs16 : style.getArialParagraphStyle(doc, 16),
    arialPs13 : style.getArialParagraphStyle(doc, 13),
    listItemPs: style.getListItemParagraphStyle(
        doc, style.getArialParagraphStyle(doc, 13)),
    defaultCs : style.getDefaultCharacterStyle(doc),
    boldCs    : style.getBoldCharacterStyle(doc),
    italicCs  : style.getItalicCharacterStyle(doc)
};

// InDesign 文書を生成.
parseNode(documentNode, textFrame, styleParams);


/*
// オーバーセットテキストの解消.
const page = docObject.page;

if( textFrame.overflows ){
    // ページを追加して属性をコピー.
    const newPage = doc.pages.add();
    newPage.marginPreferences.properties =
        page.marginPreferences.properties;

    // テキストフレームの追加.
    const textFrameParams = {
        geometricBounds : textFrame.geometricBounds
    };
    const newTextFrame =
        newPage.textFrames.add(textFrameParams);

    // テキストフレームを連結.
    textFrame.nextTextFrame = newTextFrame;
}
*/

// さらなるオーバーセットテキストの解消.
const resolveOversetText = (doc, page, targetTextFrame)=>{
    if( targetTextFrame.overflows ){
        // ページを追加して属性をコピー.
        const newPage = doc.pages.add();
        newPage.marginPreferences.properties =
            page.marginPreferences.properties;

        // テキストフレームの追加.
        const textFrameParams = {
            geometricBounds : textFrame.geometricBounds
        };
        const newTextFrame =
            newPage.textFrames.add(textFrameParams);

        // テキストフレームを連結.
        targetTextFrame.nextTextFrame = newTextFrame;

        // 再帰する.
        resolveOversetText(doc, newPage, newTextFrame);
    }
};

const page = docObject.page;
resolveOversetText(doc, page, textFrame);

