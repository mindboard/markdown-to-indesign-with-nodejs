const ind = require('./modules/ind.js');
const story = require('./modules/story.js');
const style = require('./modules/style.js');

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

const doc = docObject.doc;
const textFrame = docObject.textFrame;

// スタイルを準備.
const arialPs16 = style.getArialParagraphStyle(doc, 16);
const arialPs13 = style.getArialParagraphStyle(doc, 13);
const listItemPs =
    style.getListItemParagraphStyle(doc, arialPs13);
const defaultCs = style.getDefaultCharacterStyle(doc);
const boldCs    = style.getBoldCharacterStyle(doc);

// 内容の構築.
const ip0 = story.getInsertionPoint(textFrame);
ip0.applyParagraphStyle(arialPs16);
ip0.contents = 'DOWN THE RABBIT-HOLE';

story.addBr(textFrame);

const ip1 = story.getInsertionPoint(textFrame);
ip1.applyParagraphStyle(arialPs13);
ip1.contents =
    'Alice was beginning to get very tired of sitting by her sister on the bank, and of having nothing to do.';

story.addBr(textFrame);

const ip2 = story.getInsertionPoint(textFrame);
ip2.applyParagraphStyle(listItemPs);
ip2.applyCharacterStyle(boldCs);
ip2.contents = 'Down, down, down!';

const ip3 = story.getInsertionPoint(textFrame);
ip3.applyCharacterStyle(defaultCs);
ip3.contents = ' Would the fall never come to an end?';

story.addBr(textFrame);

const ip4 = story.getInsertionPoint(textFrame);
ip4.contents = 'Alice was not a bit hurt, and she jumped up in a moment.';
