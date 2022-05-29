const ind = require('./modules/ind.js');
const story = require('./modules/story.js');

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

const doc = docObject.doc;
const textFrame = docObject.textFrame;

// 段落スタイル
const fontName = 'Arial\tRegular';
const arialFont = app.fonts.itemByName(fontName);
const arialPsParams = {
    name: 'Arial13Q',
    appliedFont: arialFont,
    pointSize: '13Q'
};

const arialPs =
    doc.paragraphStyles.add(arialPsParams);

// 文字スタイル
const defaultCs = doc.characterStyles[0];

/*
const boldCsParams = {
    name: 'Bold',
    fontStyle: 'Bold'
};

const boldCs =
    doc.characterStyles.add(boldCsParams);

const ip0 = story.getInsertionPoint(textFrame);
ip0.applyParagraphStyle(arialPs);
ip0.applyCharacterStyle(boldCs);
ip0.contents = 'Down, down, down!';
*/

const italicCsParams = {
    name: 'Italic',
    fontStyle: 'Italic'
};

const italicCs =
    doc.characterStyles.add(italicCsParams);

const ip0 = story.getInsertionPoint(textFrame);
ip0.applyParagraphStyle(arialPs);
ip0.applyCharacterStyle(italicCs);
ip0.contents = 'Down, down, down!';

const ip1 = story.getInsertionPoint(textFrame);
ip1.applyCharacterStyle(defaultCs);
ip1.contents = ' Would the fall never come to an end?'; 
