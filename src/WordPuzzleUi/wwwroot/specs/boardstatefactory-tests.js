/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
describe("When build()", function () {
    it("creates Rack", function () {
        var lines = [{ origin: { x: 0, y: 1 }, length: 7, direction: JonQuxBurton.WordPuzzle.Direction.Horizontal }];
        var puzzle = new JonQuxBurton.WordPuzzle.Puzzle("MALLADR", lines);
        var boardStateFactory = new JonQuxBurton.WordPuzzle.BoardStateFactory();
        var actualBoardState = boardStateFactory.build(puzzle);
        expect(actualBoardState.rack.length).toBe(puzzle.letters.length);
    });
    it("creates a Line", function () {
        var lines = [{ origin: { x: 0, y: 1 }, length: 7, direction: JonQuxBurton.WordPuzzle.Direction.Horizontal }];
        var puzzle = new JonQuxBurton.WordPuzzle.Puzzle("MALLADR", lines);
        var boardStateFactory = new JonQuxBurton.WordPuzzle.BoardStateFactory();
        var actualBoardState = boardStateFactory.build(puzzle);
        expect(actualBoardState.lines.length).toBe(1);
        expect(actualBoardState.lines[0].length).toBe(puzzle.letters.length);
    });
    it("creates a Line with a Double Tile", function () {
        var lines = [{ origin: { x: 0, y: 2 }, length: 4, direction: JonQuxBurton.WordPuzzle.Direction.Horizontal },
            { origin: { x: 2, y: 1 }, length: 4, direction: JonQuxBurton.WordPuzzle.Direction.Vertical }];
        var puzzle = new JonQuxBurton.WordPuzzle.Puzzle("SWANHWK", lines);
        var boardStateFactory = new JonQuxBurton.WordPuzzle.BoardStateFactory();
        var actualBoardState = boardStateFactory.build(puzzle);
        expect(actualBoardState.lines.length).toBe(2);
        expect(actualBoardState.lines[0].length).toBe(4);
        expect(actualBoardState.lines[0].length).toBe(4);
        expect(actualBoardState.lines[0][2]).toBe(actualBoardState.lines[1][1]);
    });
});
