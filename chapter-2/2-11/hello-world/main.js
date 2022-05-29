const ind = require('./modules/ind.js');
const story = require('./modules/story.js');
const style = require('./modules/style.js');
const image = require('./modules/image.js');

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

const currentDir = File($.fileName).parent;

// 90x30mm 画像を配置.
image.place(
    textFrame,
    File(`${currentDir.fullName}/dummy-image-90x30mm.eps`));
story.addBr(textFrame);

// Hello, を配置.
const ip0 = story.getInsertionPoint(textFrame);
ip0.applyParagraphStyle(style.getArialParagraphStyle(doc, 13));
ip0.contents = 'Hello, ';

// 4x8mm 画像を配置.
image.place(
    textFrame,
    File(`${currentDir.fullName}/dummy-image-4x8mm.eps`));

// ! を配置.
const ip1 = story.getInsertionPoint(textFrame);
ip1.applyParagraphStyle(style.getArialParagraphStyle(doc, 13));
ip1.contents = ' !';
