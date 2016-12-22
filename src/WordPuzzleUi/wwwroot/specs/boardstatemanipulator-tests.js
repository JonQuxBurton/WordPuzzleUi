/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
describe("When moveLetterToEmptyTile()", function () {
    var boardState;
    var boardStateManipulator;
    beforeEach(function () {
        var rack = [];
        rack.push(new JonQuxBurton.WordPuzzle.Tile(0, 0, null, false, 0, 0, false, false));
        var lines = new Array();
        var line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(1, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(2, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(3, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 1, false, false));
        lines.push(line);
        line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(4, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 0, false, false));
        line.push(lines[0][1]);
        line.push(new JonQuxBurton.WordPuzzle.Tile(5, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 3, false, false));
        lines.push(line);
        boardState = new JonQuxBurton.WordPuzzle.BoardState(rack, lines);
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
    });
    it("the Letter 'C' is on the Tile", function () {
        boardState.rack[0].letter = new JonQuxBurton.WordPuzzle.Letter("C");
        boardStateManipulator.moveLetterToEmptyTile(boardState.rack[0].letter, boardState.lines[0][0]);
        var answer = boardState.getAnswer();
        expect(answer[0]).toBe("C  ");
        expect(answer[1]).toBe("   ");
        expect(boardState.rack[0].letter.value).toBe("C");
    });
    it("the Letter 'A' is on a double Tile", function () {
        boardState.rack[0].letter = new JonQuxBurton.WordPuzzle.Letter("A");
        boardStateManipulator.moveLetterToEmptyTile(boardState.rack[0].letter, boardState.lines[0][1]);
        var answer = boardState.getAnswer();
        expect(answer[0]).toBe(" A ");
        expect(answer[1]).toBe(" A ");
        expect(boardState.rack[0].letter.value).toBe("A");
    });
    it("answerChanged event is published", function () {
        boardState.rack[0].letter = new JonQuxBurton.WordPuzzle.Letter("C");
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
        var observer = { callback: function (newAnswer) { } };
        spyOn(observer, "callback").and.callThrough();
        boardState.answerChanged = observer.callback;
        boardStateManipulator.moveLetterToEmptyTile(boardState.rack[0].letter, boardState.lines[0][0]);
        expect(observer.callback).toHaveBeenCalledTimes(1);
        expect(observer.callback).toHaveBeenCalledWith(["C  ", "   "]);
    });
});
describe("When shuntToRight()", function () {
    var boardState;
    var boardStateManipulator;
    beforeEach(function () {
        var lines = new Array();
        var line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(10, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(11, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(12, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(13, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 3, 1, false, false));
        lines.push(line);
        line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(14, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 0, false, false));
        line.push(lines[0][2]);
        line.push(new JonQuxBurton.WordPuzzle.Tile(15, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 2, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(16, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 3, false, false));
        lines.push(line);
        boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
    });
    testCases([
        ["W   ", 0, " W  ", "    "],
        [" A  ", 1, "  A ", " A  "],
        ["  N ", 2, "   N", "    "],
        ["SA  ", 1, "S A ", " A  "],
        ["WA  ", 0, " WA ", " A  "],
        ["W A ", 0, " WA ", " A  "],
        ["S N ", 2, "S  N", "    "],
        ["W  N", 0, " W N", "    "],
        [" AN ", 1, "  AN", " A  "],
        [" WN ", 2, " W N", "    "],
        [" A N", 1, "  AN", " A  "],
        ["WAN ", 0, " WAN", " A  "],
        ["SAN ", 1, "S AN", " A  "],
        ["SWN ", 2, "SW N", "    "],
        ["WA N", 0, " WAN", " A  "],
        ["WA N", 1, "W AN", " A  "],
        ["W AN", 0, " WAN", " A  "],
    ], function (letters, targetTileIndex, expectedAnswer0, expectedAnswer1) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " the Letters are shunted to the right", function () {
            buildLine(boardState, letters);
            boardStateManipulator.shuntToRight(boardState.lines[0][targetTileIndex]);
            var answer = boardState.getAnswer();
            expect(answer[0]).toBe(expectedAnswer0);
            expect(answer[1]).toBe(expectedAnswer1);
        });
    });
});
describe("When shuntToRight() on big boards", function () {
    testCases([
        ["VIAN ", " VIAN", 0]
    ], function (letters, answer0, targetTileIndex) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " the Letters are shunted to the right", function () {
            var boardState = buildBoard(5);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            buildLine(boardState, letters);
            boardStateManipulator.shuntToRight(boardState.lines[0][targetTileIndex]);
            var answer = boardState.getAnswer();
            expect(answer[0]).toBe(answer0);
        });
    });
    it("the Letters are shunted to the right for Line length of 6", function () {
        var boardState = buildBoard(6);
        var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
        buildLine(boardState, "ERRON ");
        boardStateManipulator.shuntToRight(boardState.lines[0][0]);
        var answer = boardState.getAnswer();
        expect(answer[0]).toBe(" ERRON");
    });
});
describe("When shuntToLeft()", function () {
    var boardStateManipulator;
    var boardState;
    var lines;
    beforeEach(function () {
        lines = new Array();
        var line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(0, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(1, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(2, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(3, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 3, 1, false, false));
        lines.push(line);
        line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(4, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 0, false, false));
        line.push(lines[0][2]);
        line.push(new JonQuxBurton.WordPuzzle.Tile(5, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 2, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(6, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 3, false, false));
        lines.push(line);
        boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
    });
    testCases([
        ['   A', 3, "  A ", " A  "],
        ['  W ', 2, " W  ", "    "],
        [' S  ', 1, "S   ", "    "],
        ['  WA', 3, " WA ", " A  "],
        ['  WN', 2, " W N", "    "],
        [' W A', 3, " WA ", " A  "],
        [' S N', 1, "S  N", "    "],
        ['S  A', 3, "S A ", " A  "],
        [' SW ', 2, "SW  ", "    "],
        [' SA ', 1, "S A ", " A  "],
        ['S W ', 2, "SW  ", "    "],
        [' SWA', 3, "SWA ", " A  "],
        [' SWN', 2, "SW N", "    "],
        [' SAN', 1, "S AN", " A  "],
        ['SW A', 3, "SWA ", " A  "],
        ['S WA', 3, "SWA ", " A  "],
        ['S WN', 2, "SW N", "    "],
    ], function (letters, targetTileIndex, expectedLine0, expectedLine1) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " the Letters are shunted to the left", function () {
            buildLine(boardState, letters);
            boardStateManipulator.shuntToLeft(boardState.lines[0][targetTileIndex]);
            var answer = boardState.getAnswer();
            expect(answer[0]).toBe(expectedLine0);
            expect(answer[1]).toBe(expectedLine1);
        });
    });
});
describe("When shuntToLeft() on big boards", function () {
    testCases([
        [' AVIA', "AVIA ", 4]
    ], function (letters, answer0, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " it returns " + expected, function () {
            var boardState = buildBoard(5);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            buildLine(boardState, letters);
            boardStateManipulator.shuntToLeft(boardState.lines[0][targetTileIndex]);
            var answer = boardState.getAnswer();
            expect(answer[0]).toBe(answer0);
        });
    });
    it("the Letters are shunted to the left for Line length of 6", function () {
        var boardState = buildBoard(6);
        var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
        buildLine(boardState, " HERRO");
        boardStateManipulator.shuntToLeft(boardState.lines[0][5]);
        var answer = boardState.getAnswer();
        expect(answer[0]).toBe("HERRO ");
    });
});
describe("When shuntToLeft()", function () {
    testCases([
        ['    N', 4, 4, 3],
        ['   AN', 3, 3, 2],
        ['  IAN', 2, 2, 1],
        [' VIAN', 1, 1, 0],
    ], function (letters, targetTileIndex, originTileIndex, destinationTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " lettersShunted events are published", function () {
            var boardState = buildBoard(5);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            buildLine(boardState, letters);
            var observer = { callback: function (sourceTileId, destinationTileId) { } };
            spyOn(observer, "callback").and.callThrough();
            boardState.lettersShunted = observer.callback;
            boardStateManipulator.shuntToLeft(boardState.lines[0][targetTileIndex]);
            expect(observer.callback).toHaveBeenCalledTimes(1);
            expect(observer.callback).toHaveBeenCalledWith(boardState.lines[0][originTileIndex].id, boardState.lines[0][destinationTileIndex].id);
        });
    });
    it("the Letters are shunted to the left for Line length of 6", function () {
        var boardState = buildBoard(6);
        var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
        buildLine(boardState, " HERRO");
        boardStateManipulator.shuntToLeft(boardState.lines[0][5]);
        var answer = boardState.getAnswer();
        expect(answer[0]).toBe("HERRO ");
    });
    testCases([
        ['    N', 4, ['   N ']],
        ['   AN', 3, ['  A N']],
        ['  IAN', 2, [' I AN']],
        [' VIAN', 1, ['V IAN']],
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " answerChanged events are published", function () {
            var boardState = buildBoard(5);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            buildLine(boardState, letters);
            var observer = { callback: function (newAnswer) { } };
            spyOn(observer, "callback").and.callThrough();
            boardState.answerChanged = observer.callback;
            boardStateManipulator.shuntToLeft(boardState.lines[0][targetTileIndex]);
            expect(observer.callback).toHaveBeenCalledTimes(1);
            expect(observer.callback).toHaveBeenCalledWith(expected);
        });
    });
});
describe("When shuntToRight()", function () {
    testCases([
        ['A    ', 0, 0, 1],
        ['SA   ', 1, 1, 2],
    ], function (letters, targetTileIndex, shuntedTileOrigin, shuntedTileDestination, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " lettersShunted events are published", function () {
            var boardState = buildBoard(5);
            buildLine(boardState, letters);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            var observer = { callback: function (sourceTileId, destinationTileId) { } };
            spyOn(observer, "callback").and.callThrough();
            boardState.lettersShunted = observer.callback;
            boardStateManipulator.shuntToRight(boardState.lines[0][targetTileIndex]);
            expect(observer.callback).toHaveBeenCalledTimes(1);
            expect(observer.callback).toHaveBeenCalledWith(boardState.lines[0][shuntedTileOrigin].id, boardState.lines[0][shuntedTileDestination].id);
        });
    });
});
describe("When shuntToRight()", function () {
    testCases([
        ['A    ', 0, [' A   ']],
        ['SA   ', 1, ['S A  ']],
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " answerChanged events are published", function () {
            var boardState = buildBoard(5);
            buildLine(boardState, letters);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            var observer = { callback: function (newAnswer) { } };
            spyOn(observer, "callback").and.callThrough();
            boardState.answerChanged = observer.callback;
            boardStateManipulator.shuntToRight(boardState.lines[0][targetTileIndex]);
            expect(observer.callback).toHaveBeenCalledTimes(1);
            expect(observer.callback).toHaveBeenCalledWith(expected);
        });
    });
});
describe("When shuntToRack()", function () {
    it("the Letter 'B' is on the Rack", function () {
        var boardState = buildBoard(4);
        buildLine(boardState, "BWAN");
        var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
        boardStateManipulator.shuntToRack(boardState.lines[0][0], boardState.rack[0]);
        var answer = boardState.getAnswer();
        expect(answer[0]).toBe(" WAN");
        //expect(boardState.rack[0].letter.value).toBe("B");
        expect(boardState.rack[0].letter.value).toBe("");
    });
    testCases([
        ['SWAN', 0, 0, 0],
    ], function (letters, targetTileIndex, shuntedTileOrigin, shuntedTileDestination) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " lettersShunted event is published", function () {
            var boardState = buildBoard(4);
            buildLine(boardState, letters);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            var observer = { callback: function (sourceTileId, destinationTileId) { } };
            spyOn(observer, "callback").and.callThrough();
            boardState.lettersShunted = observer.callback;
            boardStateManipulator.shuntToRack(boardState.lines[0][targetTileIndex], boardState.rack[0]);
            expect(observer.callback).toHaveBeenCalledTimes(1);
            expect(observer.callback).toHaveBeenCalledWith(boardState.rack[shuntedTileDestination].id, boardState.lines[0][shuntedTileOrigin].id);
        });
    });
    testCases([
        ['SWAN', 0, [' WAN']],
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " answerChanged event is published", function () {
            var boardState = buildBoard(4);
            buildLine(boardState, letters);
            var boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
            var observer = { callback: function (newAnswer) { } };
            spyOn(observer, "callback").and.callThrough();
            boardState.answerChanged = observer.callback;
            boardStateManipulator.shuntToRack(boardState.lines[0][targetTileIndex], boardState.rack[0]);
            expect(observer.callback).toHaveBeenCalledTimes(1);
            expect(observer.callback).toHaveBeenCalledWith(expected);
        });
    });
});
describe("When shuntRackToLeft()", function () {
    var boardStateManipulator;
    var boardState;
    beforeEach(function () {
        boardState = buildBoard(4);
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
    });
    testCases([
        ['   A', 3, "  A "],
        ['  W ', 2, " W  "],
        [' S  ', 1, "S   "],
        ['  WA', 3, " WA "],
        ['  WN', 2, " W N"],
        [' W A', 3, " WA "],
        [' S N', 1, "S  N"],
        ['S  A', 3, "S A "],
        [' SW ', 2, "SW  "],
        [' SA ', 1, "S A "],
        ['S W ', 2, "SW  "],
        [' SWA', 3, "SWA "],
        [' SWN', 2, "SW N"],
        [' SAN', 1, "S AN"],
        ['SW A', 3, "SWA "],
        ['S WA', 3, "SWA "],
        ['S WN', 2, "SW N"],
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " the Letters are shunted to the left", function () {
            buildRackLine(boardState, letters);
            boardStateManipulator.shuntRackToLeft(boardState.rack[targetTileIndex]);
            var actual = boardState.rack[0].letter.getValueOrSpace() + boardState.rack[1].letter.getValueOrSpace() + boardState.rack[2].letter.getValueOrSpace() + boardState.rack[3].letter.getValueOrSpace();
            expect(actual).toBe(expected);
        });
    });
});
describe("When shuntRackToRight()", function () {
    var boardState;
    var boardStateManipulator;
    beforeEach(function () {
        boardState = buildBoard(4);
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
    });
    testCases([
        ["W   ", 0, " W  "],
        [" A  ", 1, "  A "],
        ["  N ", 2, "   N"],
        ["SA  ", 1, "S A "],
        ["WA  ", 0, " WA "],
        ["W A ", 0, " WA "],
        ["S N ", 2, "S  N"],
        ["W  N", 0, " W N"],
        [" AN ", 1, "  AN"],
        [" WN ", 2, " W N"],
        [" A N", 1, "  AN"],
        ["WAN ", 0, " WAN"],
        ["SAN ", 1, "S AN"],
        ["SWN ", 2, "SW N"],
        ["WA N", 0, " WAN"],
        ["WA N", 1, "W AN"],
        ["W AN", 0, " WAN"],
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " the Letters are shunted to the right", function () {
            buildRackLine(boardState, letters);
            boardStateManipulator.shuntRackToRight(boardState.rack[targetTileIndex]);
            var actual = boardState.rack[0].letter.getValueOrSpace() + boardState.rack[1].letter.getValueOrSpace() + boardState.rack[2].letter.getValueOrSpace() + boardState.rack[3].letter.getValueOrSpace();
            expect(actual).toBe(expected);
        });
    });
});
