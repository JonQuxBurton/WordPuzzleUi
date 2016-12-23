function testCases(arrayOfArrays, testCaseFunction) {
    _.each(arrayOfArrays, function (innerArray) {
        testCaseFunction.apply(this, innerArray);
    });
}
function buildLine(boardState, letters, lineIndex) {
    if (lineIndex === void 0) { lineIndex = 0; }
    _.forEach(letters, function (letter, index) {
        if (letter == ' ')
            boardState.lines[lineIndex][index].letter.value = '';
        else
            boardState.lines[lineIndex][index].letter.value = letter;
    });
}
function buildRackLine(boardState, letters) {
    _.forEach(letters, function (letter, index) {
        if (letter == ' ')
            boardState.rack[index].letter.value = '';
        else
            boardState.rack[index].letter.value = letter;
    });
}
function buildBoard(size) {
    var rack = new Array();
    for (var i = 0; i < size; i++) {
        rack.push(new JonQuxBurton.WordPuzzle.Tile(i, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, i, 0, false, false));
    }
    var lines = new Array();
    var line = new Array();
    for (var i = 0; i < size; i++) {
        line.push(new JonQuxBurton.WordPuzzle.Tile(rack.length + i, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, i, 1, false, false));
    }
    lines.push(line);
    return new JonQuxBurton.WordPuzzle.BoardState(rack, lines);
}
