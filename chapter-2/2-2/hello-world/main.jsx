// ドキュメントの設定値.
var docParams = {
    documentPreferences : {
        pageWidth   : '50mm',
        pageHeight  : '50mm',
        facingPages : false
    },
    cjkGridPreferences : {
        showAllLayoutGrids : false
    }    
};

// ドキュメントを生成.
var doc = app.documents.add(docParams);

// ページの取得.
var page = doc.pages[0];

// ページ設定の更新.
page.marginPreferences.properties = {
    top    : '0mm',
    left   : '0mm',
    bottom : '0mm',
    right  : '0mm'};

// テキストフレームの設定値.
var textFrameParams = {
    geometricBounds : ['0mm', '0mm', '50mm', '50mm']
};

// テキストフレームを生成.
var textFrame = page.textFrames.add(textFrameParams);

// テキストフレームに文字列をセット.
textFrame.contents = 'Hello, World!';
