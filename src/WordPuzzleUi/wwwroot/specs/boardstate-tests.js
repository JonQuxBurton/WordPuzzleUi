/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
describe("When Constructing", function () {
    it("one Line is stored", function () {
        var line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(0, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(1, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(2, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        var lines = new Array();
        lines.push(line);
        var boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
        expect(boardState.lines.length).toBe(1);
    });
    it("two Lines are stored", function () {
        var lines = new Array();
        var line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(0, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(1, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(2, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 1, false, false));
        lines.push(line);
        line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(3, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 0, false, false));
        line.push(lines[0][1]);
        line.push(new JonQuxBurton.WordPuzzle.Tile(4, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 3, false, false));
        lines.push(line);
        var boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
        expect(boardState.lines.length).toBe(2);
    });
});
describe("When getFirstBlankToLeftOfTile()", function () {
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
        boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
    });
    testCases([
        ['    ', 3, 2],
        ['    ', 2, 1],
        ['    ', 1, 0],
        ['   N', 3, 2],
        ['  AN', 3, 1],
        [' WAN', 3, 0],
        ['S AN', 3, 1],
        [' WAN', 2, 0]
    ], function (letters, targetTileIndex, expectedTileIndex) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " it returns TileIndex " + expectedTileIndex, function () {
            buildLine(boardState, letters);
            var actualTileIndex = boardState.getFirstBlankToLeftOfTile(boardState.lines[0][targetTileIndex]);
            expect(actualTileIndex).toBe(expectedTileIndex);
        });
    });
});
describe("When canShuntRight()", function () {
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
        boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
    });
    testCases([
        ['    ', 0, true],
        ['    ', 3, false],
        ['   N', 2, true],
        ['   N', 1, true],
        ['   N', 0, true],
        ['  AN', 2, false],
        ['  AN', 1, true],
        ['SWA ', 0, true],
        ['SWA ', 1, true],
        ['SWA ', 2, true],
        ['S A ', 0, true]
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " it returns " + expected, function () {
            buildLine(boardState, letters);
            var actual = boardState.canShuntRight(boardState.lines[0][targetTileIndex]);
            expect(actual).toBe(expected);
        });
    });
});
describe("When canShuntLeft()", function () {
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
        boardState = new JonQuxBurton.WordPuzzle.BoardState([], lines);
    });
    testCases([
        ['    ', 3, true],
        ['    ', 2, true],
        ['    ', 1, true],
        ['    ', 0, false],
        ['S   ', 0, false],
        ['S   ', 1, true],
        ['SW  ', 1, false],
        ['SW  ', 2, true],
        ['SWA ', 2, false],
        ['  WN', 2, true],
    ], function (letters, targetTileIndex, expected) {
        it("given the Letters '" + letters + "' and target Tile " + targetTileIndex + " it returns " + expected, function () {
            buildLine(boardState, letters);
            var actual = boardState.canShuntLeft(boardState.lines[0][targetTileIndex]);
            expect(actual).toBe(expected);
        });
    });
});
