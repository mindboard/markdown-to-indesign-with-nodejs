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

const fontName = 'Arial\tRegular';
const arialFont = app.fonts.itemByName(fontName);
const arialPsParams = {
    name: 'Arial13Q',
    appliedFont: arialFont,
    pointSize: '13Q'
};

const arialPs =
    doc.paragraphStyles.add(arialPsParams);

const listItemPsParams = {
    name: 'ListItem',
    basedOn: arialPs,
    bulletsAlignment: StaticAlignmentOptions.LEFT_ALIGN,
    bulletChar: {
        characterType: BulletCharacterType.UNICODE_ONLY,
        characterValue: 8226
    },
    bulletsAndNumberingListType: ListType.BULLET_LIST,
    leftIndent: '5mm',
    firstLineIndent: '-5mm'
};

const listItemPs =
    doc.paragraphStyles.add(listItemPsParams);

const ip0 = story.getInsertionPoint(textFrame);
ip0.applyParagraphStyle(listItemPs);
ip0.contents =
    'Down, down, down! Would the fall never come to an end?';

story.addBr(textFrame);

const ip1 = story.getInsertionPoint(textFrame);
ip1.contents =
    'Alice was not a bit hurt, and she jumped up in a moment.';
