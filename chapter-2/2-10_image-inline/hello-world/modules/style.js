const style = {};

style.getDefaultParagraphStyle = (doc)=>{
    return doc.paragraphStyles[0];
};

style.getArialParagraphStyle = (doc, fontSize)=>{
    const name = `Arial${fontSize}Q`;
    const ps = doc.paragraphStyles.itemByName(name);
    if( ps!=null ){
        return ps;
    }
    else {
        const fontName = 'Arial\tRegular';
        const arialFont = app.fonts.itemByName(fontName);
        const arialPsParams = {
            name: name,
            appliedFont: arialFont,
            pointSize: `${fontSize}Q`
        };
        return doc.paragraphStyles.add(arialPsParams);
    }
};

style.getListItemParagraphStyle = (doc, basePs)=>{
    const name = `ListItem${basePs.name}`;
    const ps = doc.paragraphStyles.itemByName(name);
    if( ps!=null ){
        return ps;
    }
    else {
        const listItemPsParams = {
            name: name,
            basedOn: basePs,
            bulletsAlignment: StaticAlignmentOptions.LEFT_ALIGN, 
            bulletChar: {
                characterType: BulletCharacterType.UNICODE_ONLY,
                characterValue: 8226
            },
            bulletsAndNumberingListType: ListType.BULLET_LIST,
            leftIndent: '5mm',
            firstLineIndent: '-5mm'
        };
        return doc.paragraphStyles.add(listItemPsParams);
    }
};

style.getDefaultCharacterStyle = (doc)=>{
    return doc.characterStyles[0];
};

style.getBoldCharacterStyle = (doc)=>{
    const name = 'Bold';
    const cs = doc.characterStyles.itemByName(name);
    if( cs!=null ){
        return cs;
    }
    else {
        const boldCsParams = {
            name: name,
            fontStyle: 'Bold'
        };
        return doc.characterStyles.add(boldCsParams);
    }
};

style.getItalicCharacterStyle = (doc)=>{
    const name = 'Italic';
    const cs = doc.characterStyles.itemByName(name);
    if( cs!=null ){
        return cs;
    }
    else {
        const italicCsParams = {
            name: name,
            fontStyle: 'Italic'
        };
        return doc.characterStyles.add(italicCsParams);
    }
};

module.exports = style;
