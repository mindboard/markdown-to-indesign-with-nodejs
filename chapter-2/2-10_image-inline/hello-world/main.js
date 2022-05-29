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

// 画像の用意.
const currentDir = File($.fileName).parent;
const imageFile0 =
    File(`${currentDir.fullName}/dummy-image-90x30mm.eps`);
const imageFile1 =
    File(`${currentDir.fullName}/dummy-image-4x8mm.eps`);

// 90x30mm 画像を配置.
const inlineGf0 =
    story.getInsertionPoint(textFrame).textFrames.add();
inlineGf0.contentType = ContentType.graphicType;
inlineGf0.place(imageFile0);
inlineGf0.fit(FitOptions.FRAME_TO_CONTENT);

// Hello, を配置.
const ip0 = story.getInsertionPoint(textFrame);
ip0.applyParagraphStyle(style.getArialParagraphStyle(doc, 13));
ip0.contents = 'Hello, ';

// 4x8mm 画像を配置.
const inlineGf1 =
    story.getInsertionPoint(textFrame).textFrames.add();
inlineGf1.contentType = ContentType.graphicType;
inlineGf1.place(imageFile1);
inlineGf1.fit(FitOptions.FRAME_TO_CONTENT);

// ! を配置.
const ip1 = story.getInsertionPoint(textFrame);
ip1.applyParagraphStyle(style.getArialParagraphStyle(doc, 13));
ip1.contents = ' !';
