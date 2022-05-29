const story = require('./story.js');

const image = {};

image.place = (textFrame, imageFile)=>{
    const inlineGf =
        story.getInsertionPoint(textFrame).textFrames.add();
    inlineGf.contentType = ContentType.graphicType;
    inlineGf.place(imageFile);
    inlineGf.fit(FitOptions.FRAME_TO_CONTENT);
};

module.exports = image;