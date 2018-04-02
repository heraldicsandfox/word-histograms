function computeWordData(rawText, stoplist, tokenizer) {
    // Data structures to count instances of each token
    var vocabCounts = {};
    var tokenList = tokenizer.words()(rawText.toLowerCase());
    
    // Count tokens
    tokenList.forEach(function (rawToken) {
        var token = rawToken.value;
        if (!(stoplist.has(token))) {
            if (vocabCounts.hasOwnProperty(token)) {
                vocabCounts[token]++;
            } else {
                vocabCounts[token] = 1;
            }
        }
    });

    // Turn the count dictionary into a sorted list of entities by decreasing count
    var wordData = []
    for (var type in vocabCounts) {
        wordData.push({ 'word': type, 'count': vocabCounts[type] });
    }
    wordData.sort(function(d1, d2) {
        return d2.count - d1.count;
    });
    for (var i = 0; i < wordData.length; ++i) {
        wordData[i]['idx'] = i;
    }

    // Set the word data
    return wordData; 
}

export { computeWordData };