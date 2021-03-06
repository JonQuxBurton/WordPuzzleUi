﻿/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />

describe("When moveLetter()", function () {

    var boardState;
    var boardStateManipulator;

    beforeEach(function () {
        var rack = new Array<JonQuxBurton.WordPuzzle.Tile>();
        rack.push(new JonQuxBurton.WordPuzzle.Tile(0, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 0, false, false));
        rack.push(new JonQuxBurton.WordPuzzle.Tile(1, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 0, false, false));
        rack.push(new JonQuxBurton.WordPuzzle.Tile(2, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 0, false, false));

        var lines = new Array<Array<JonQuxBurton.WordPuzzle.Tile>>();
        var line;
        line = new Array<JonQuxBurton.WordPuzzle.Tile>();
        line.push(new JonQuxBurton.WordPuzzle.Tile(3, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 0, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(4, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 1, false, false));
        line.push(new JonQuxBurton.WordPuzzle.Tile(5, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 2, 1, false, false));
        lines.push(line)

        line = new Array<JonQuxBurton.WordPuzzle.Tile>();
        line.push(new JonQuxBurton.WordPuzzle.Tile(6, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 0, false, false));
        line.push(lines[0][1]);
        line.push(new JonQuxBurton.WordPuzzle.Tile(7, 0, new JonQuxBurton.WordPuzzle.Letter(""), false, 1, 2, false, false));

        lines.push(line)

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

            boardState.rack[0].letter.value = "T";
            boardState.lines[0][2].letter.value = "A";

            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();

            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);

            boardController.moveLetter(0, 5);

            expect(boardStateManipulator.shuntToLeft).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntToLeft).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 5 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "T" }), jasmine.objectContaining(({ id: 5 })));
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
        });

        it("given the destination Tile is not Blank, the Letters are shunted down", function () {

            boardState.rack[0].letter.value = "M";
            boardState.lines[1][0].letter.value = "A";

            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            spyOn(boardStateManipulator, "shuntDown").and.callThrough();

            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);

            boardController.moveLetter(0, 6);

            expect(boardStateManipulator.shuntDown).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntDown).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 6 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "M" }), jasmine.objectContaining(({ id: 6 })));
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
        });

        it("given the destination Tile is not Blank, the Letters are shunted up", function () {

            boardState.rack[0].letter.value = "T";
            boardState.lines[1][2].letter.value = "A";

            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            spyOn(boardStateManipulator, "shuntDown").and.callThrough();
            spyOn(boardStateManipulator, "shuntUp").and.callThrough();

            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);

            boardController.moveLetter(0, 7);

            expect(boardStateManipulator.shuntUp).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntUp).toHaveBeenCalledWith(jasmine.objectContaining(({ id: 7 })));
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.moveLetterToEmptyTile).toHaveBeenCalledWith(jasmine.objectContaining({ value: "T" }), jasmine.objectContaining(({ id: 7 })));
            expect(boardStateManipulator.shuntDown).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
        });

        it("given the destination Tile is not Blank, the Letter is shunted to the Rack", function () {

            boardState.rack[0].letter.value = "M";

            boardState.lines[0][0].letter.value = "C";
            boardState.lines[0][1].letter.value = "A";
            boardState.lines[0][2].letter.value = "T";

            spyOn(boardStateManipulator, "moveLetterToEmptyTile").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRight").and.callThrough();
            spyOn(boardStateManipulator, "shuntToLeft").and.callThrough();
            spyOn(boardStateManipulator, "shuntUp").and.callThrough();
            spyOn(boardStateManipulator, "shuntDown").and.callThrough();
            spyOn(boardStateManipulator, "shuntToRack").and.callThrough();

            var boardController = new JonQuxBurton.WordPuzzle.BoardController(boardState, boardStateManipulator);

            boardController.moveLetter(0, 3);

            expect(boardStateManipulator.shuntToRack).toHaveBeenCalledTimes(1);
            expect(boardStateManipulator.shuntToRack).toHaveBeenCalledWith(jasmine.objectContaining({ id: 0 }), jasmine.objectContaining({ id: 3 }), jasmine.objectContaining({ value: "M" }));
            expect(boardStateManipulator.shuntToRight).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntToLeft).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntUp).not.toHaveBeenCalled();
            expect(boardStateManipulator.shuntDown).not.toHaveBeenCalled();
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


