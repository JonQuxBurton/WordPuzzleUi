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
});
