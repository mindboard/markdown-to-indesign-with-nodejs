const ind = require('./modules/ind.js');

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

const defaultPs = doc.paragraphStyles[0];

const fontName = 'Arial\tRegular';
const arialFont = app.fonts.itemByName(fontName);
const arialPsParams = {
    name: 'Arial13Q',
    appliedFont: arialFont,
    pointSize: '13Q'
};

const arialPs =
    doc.paragraphStyles.add(arialPsParams);

const ip0 = textFrame.insertionPoints[-1];
ip0.applyParagraphStyle(arialPs);
ip0.contents = 'Hello, World!';

const ip1 = textFrame.insertionPoints[-1];
ip1.contents = '\r';

const ip2 = textFrame.insertionPoints[-1];
ip2.applyParagraphStyle(defaultPs);
ip2.contents = 'Hello, World!';