/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
describe("When moveLetter()", function () {
    var boardState;
    var boardStateManipulator;
    beforeEach(function () {
        var rack = new Array();
        rack.push(new JonQuxBurton.WordPuzzle.Tile(0, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        rack.push(new JonQuxBurton.WordPuzzle.Tile(1, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        rack.push(new JonQuxBurton.WordPuzzle.Tile(2, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        var line = new Array();
        line.push(new JonQuxBurton.WordPuzzle.Tile(3, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(4, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(5, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        var lines = new Array();
        lines.push(line);
        boardState = new JonQuxBurton.WordPuzzle.BoardState(rack, lines);
        boardStateManipulator = new JonQuxBurton.WordPuzzle.BoardStateManipulator(boardState);
    });
    describe("from a Rack Tile to a another Rack Tile", function () {
        it("given the destination Rack Tile is Blank, the Letter is moved to the destination Rack Tile", function () {
            boardState.rack[0].letter.value = "C";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(0, 1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 1 })));
            expect(boardStateManipulator.shuntRackToRight).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntRackToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Rack Tile is not Blank, the Letters are shunted to the right", function () {
            boardState.rack[0].letter.value = "C";
            boardState.rack[1].letter.value = "T";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(0, 1);
            expect(boardStateManipulator.shuntRackToRight).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntRackToRight).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 1 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 1 })));
            expect(boardStateManipulator.shuntRackToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Rack Tile is not Blank, the Letters are shunted to the left", function () {
            boardState.rack[0].letter.value = "C";
            boardState.rack[2].letter.value = "A";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(0, 2);
            expect(boardStateManipulator.shuntRackToLeft).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntRackToLeft).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 2 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 2 })));
            expect(boardStateManipulator.shuntRackToRight).not.toHaveBeenCalled();
        });
    });
    describe("from a Rack Tile to a Board Tile", function () {
        it("given the destination Tile is Blank, the Letter is moved to the destination Tile", function () {
            boardState.rack[0].letter.value = "C";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(0, 3);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 3 })));
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Tile is not Blank, the Letters are shunted to the right", function () {
            boardState.lines[0][0].letter.value = "A";
            boardState.lines[0][1].letter.value = "T";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 4);
            expect(boardStateManipulator.shuntToRight).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntToRight).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 4 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "A" }), jasmine.objectContaining(({ id: 4 })));
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Tile is not Blank, the Letters are shunted to the left", function () {
            boardState.lines[0][0].letter.value = "T";
            boardState.lines[0][2].letter.value = "A";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 5);
            expect(boardStateManipulator.shuntToLeft).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntToLeft).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 5 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "T" }), jasmine.objectContaining(({ id: 5 })));
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
        });
    });
    describe("from a Board Tile to a Rack Tile", function () {
        it("given the destination Tile is Blank, the Letter is moved to the destination Tile", function () {
            boardState.lines[0][0].letter.value = "C";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 0);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 0 })));
            expect(boardStateManipulator.shuntRackToRight).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntRackToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Tile is not Blank, the Letters are shunted to the right", function () {
            boardState.rack[0].letter.value = "A";
            boardState.lines[0][0].letter.value = "C";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 0);
            expect(boardStateManipulator.shuntRackToRight).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntRackToRight).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 0 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 0 })));
            expect(boardStateManipulator.shuntRackToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Tile is not Blank, the Letters are shunted to the left", function () {
            boardState.rack[2].letter.value = "A";
            boardState.lines[0][0].letter.value = "T";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntRackToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 2);
            expect(boardStateManipulator.shuntRackToLeft).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntRackToLeft).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 2 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "T" }), jasmine.objectContaining(({ id: 2 })));
            expect(boardStateManipulator.shuntRackToRight).not.toHaveBeenCalled();
        });
    });
    describe("from a Board Tile to another Board Tile", function () {
        it("given the destination Tile is Blank, the Letter is moved to the destination Tile", function () {
            boardState.lines[0][0].letter.value = "A";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 4);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "A" }), jasmine.objectContaining(({ id: 4 })));
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Tile is not Blank, the Letters are shunted to the right", function () {
            boardState.lines[0][0].letter.value = "C";
            boardState.lines[0][1].letter.value = "T";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 4);
            expect(boardStateManipulator.shuntToRight).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntToRight).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 4 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "C" }), jasmine.objectContaining(({ id: 4 })));
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
        });
        it("given the destination Tile is not Blank, the Letters are shunted to the left", function () {
            boardState.lines[0][0].letter.value = "T";
            boardState.lines[0][2].letter.value = "A";
            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);
            boardController.moveLetter(3, 5);
            expect(boardStateManipulator.shuntToLeft).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntToLeft).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 5 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "T" }), jasmine.objectContaining(({ id: 5 })));
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
        });
    });
});
