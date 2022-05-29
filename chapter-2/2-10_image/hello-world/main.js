const ind = require('./modules/ind.js');
const story = require('./modules/story.js');
//const style = require('./modules/style.js');

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

//const doc = docObject.doc;
const textFrame = docObject.textFrame;

// 画像の用意.
const currentDir = File($.fileName).parent;
const imageFile =
    File(`${currentDir.fullName}/dummy-image-90x30mm.eps`);

// 画像を配置.
const inlineGf =
    story.getInsertionPoint(textFrame).textFrames.add();
inlineGf.contentType = ContentType.graphicType;
inlineGf.place( imageFile );
inlineGf.fit(FitOptions.FRAME_TO_CONTENT);
