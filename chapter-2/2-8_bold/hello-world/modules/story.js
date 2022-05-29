const story = {};

story.getInsertionPoint = (textFrame)=>{
    return textFrame.parentStory.insertionPoints[-1];
};

story.addBr = (textFrame)=>{
	story.getInsertionPoint(textFrame).contents = '\r';
};

module.exports = story;