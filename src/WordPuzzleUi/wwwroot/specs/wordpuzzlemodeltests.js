/// <reference path="../scripts/typings/jasmine/jasmine.d.ts" />
describe("When Constructing", function () {
    var model;
    var letters;
    beforeEach(function () {
        letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
    });
    it("it creates Rack tiles", function () {
        expect(model.rackTiles.length).toBe(letters.length);
        expect(model.rackTiles[0].letter.value).toBe(letters[0]);
        expect(model.rackTiles[1].letter.value).toBe(letters[1]);
        expect(model.rackTiles[2].letter.value).toBe(letters[2]);
        expect(model.rackTiles[0].id).toBe(1);
        expect(model.rackTiles[1].id).toBe(2);
        expect(model.rackTiles[2].id).toBe(3);
    });
    it("it creates Board tiles", function () {
        expect(model.boardTiles.length).toBe(letters.length);
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
        expect(model.boardTiles[0].id).toBe(letters.length + 1);
        expect(model.boardTiles[1].id).toBe(letters.length + 2);
        expect(model.boardTiles[2].id).toBe(letters.length + 3);
    });
});
describe("When moveToTile() moves a Letter from Rack tile to Board Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
    });
    it("the Letter is on the Board Tile", function () {
        model.moveToTile(1, 4);
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.boardTiles[0].letter.value).toBe("A");
    });
    it("it Shunts existing Letters to the right", function () {
        model.moveToTile(1, 4);
        model.moveToTile(2, 5);
        model.moveToTile(3, 4);
        expect(model.boardTiles[0].letter.value).toBe("C");
        expect(model.boardTiles[1].letter.value).toBe("A");
        expect(model.boardTiles[2].letter.value).toBe("B");
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("");
        expect(model.rackTiles[2].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the left", function () {
        model.moveToTile(3, 6);
        model.moveToTile(2, 5);
        model.moveToTile(1, 6);
        expect(model.boardTiles[0].letter.value).toBe("B");
        expect(model.boardTiles[1].letter.value).toBe("C");
        expect(model.boardTiles[2].letter.value).toBe("A");
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("");
        expect(model.rackTiles[2].letter.value).toBe("");
    });
    it("it publishes lettersShunted events", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(1, 4);
        model.moveToTile(2, 5);
        model.moveToTile(3, 4);
        expect(observer.callback).toHaveBeenCalledWith(5, 6);
        expect(observer.callback).toHaveBeenCalledWith(4, 5);
    });
    it("it publishes answerChanged event", function () {
        var observer = { callback: function (newAnswer) { } };
        spyOn(observer, "callback");
        model.answerChanged = observer.callback;
        model.moveToTile(1, 4);
        expect(observer.callback).toHaveBeenCalledWith("A  ");
    });
});
describe("When moveToTile() moves a Letter from Board tile to Rack Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
    });
    it("the Letter is on Rack Tile", function () {
        model.moveToTile(1, 4);
        model.moveToTile(2, 5);
        model.moveToTile(4, 2);
        expect(model.rackTiles[1].letter.value).toBe("A");
        expect(model.boardTiles[0].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the right", function () {
        model.moveToTile(3, 4);
        model.moveToTile(4, 1);
        expect(model.rackTiles[0].letter.value).toBe("C");
        expect(model.rackTiles[1].letter.value).toBe("A");
        expect(model.rackTiles[2].letter.value).toBe("B");
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the left", function () {
        model.moveToTile(3, 4);
        model.moveToTile(4, 1);
        expect(model.rackTiles[0].letter.value).toBe("C");
        expect(model.rackTiles[1].letter.value).toBe("A");
        expect(model.rackTiles[2].letter.value).toBe("B");
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it publishes lettersShunted events", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(3, 4);
        model.moveToTile(4, 1);
        expect(observer.callback).toHaveBeenCalledWith(2, 3);
        expect(observer.callback).toHaveBeenCalledWith(1, 2);
    });
    it("it publishes answerChanged event", function () {
        model.moveToTile(3, 4);
        var observer = { callback: function (newAnswer) { } };
        spyOn(observer, "callback");
        model.answerChanged = observer.callback;
        model.moveToTile(4, 1);
        expect(observer.callback).toHaveBeenCalledWith("   ");
    });
});
describe("When moveToTile() moves a Letter from Rack tile to Rack Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
    });
    it("the Letter is on the Rack Tile", function () {
        model.moveToTile(1, 4);
        model.moveToTile(3, 1);
        expect(model.rackTiles[0].letter.value).toBe("C");
        expect(model.rackTiles[1].letter.value).toBe("B");
        expect(model.rackTiles[2].letter.value).toBe("");
        expect(model.boardTiles[0].letter.value).toBe("A");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the right", function () {
        model.moveToTile(3, 1);
        expect(model.rackTiles[0].letter.value).toBe("C");
        expect(model.rackTiles[1].letter.value).toBe("A");
        expect(model.rackTiles[2].letter.value).toBe("B");
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the left", function () {
        model.moveToTile(1, 3);
        expect(model.rackTiles[0].letter.value).toBe("B");
        expect(model.rackTiles[1].letter.value).toBe("C");
        expect(model.rackTiles[2].letter.value).toBe("A");
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it publishes lettersShunted events", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(3, 1);
        expect(observer.callback).toHaveBeenCalledWith(1, 2);
        expect(observer.callback).toHaveBeenCalledWith(2, 3);
    });
});
describe("When moveToTile() moves a Letter from Rack tile to the same Rack Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
    });
    it("the Letter is on the same Rack Tile", function () {
        model.moveToTile(1, 1);
        expect(model.rackTiles[0].letter.value).toBe("A");
        expect(model.rackTiles[1].letter.value).toBe("B");
        expect(model.rackTiles[2].letter.value).toBe("C");
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it does not publish lettersShunted event", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(1, 1);
        expect(observer.callback).not.toHaveBeenCalled();
    });
});
describe("When moveToTile() moves a Letter from Rack tile to an empty Rack Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
        model.moveToTile(2, 4);
    });
    it("the Letter is on the Rack Tile", function () {
        model.moveToTile(1, 2);
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("A");
        expect(model.rackTiles[2].letter.value).toBe("C");
        expect(model.boardTiles[0].letter.value).toBe("B");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it does not publishe lettersShunted event", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(1, 2);
        expect(observer.callback).not.toHaveBeenCalled();
    });
});
describe("When moveToTile() moves a Letter from Board tile to Board Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
        model.moveToTile(1, 4);
        model.moveToTile(2, 5);
        model.moveToTile(3, 6);
    });
    it("the Letter is on the Rack Tile", function () {
        model.moveToTile(4, 1);
        model.moveToTile(6, 4);
        expect(model.boardTiles[0].letter.value).toBe("C");
        expect(model.boardTiles[1].letter.value).toBe("B");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the right", function () {
        model.moveToTile(6, 4);
        expect(model.boardTiles[0].letter.value).toBe("C");
        expect(model.boardTiles[1].letter.value).toBe("A");
        expect(model.boardTiles[2].letter.value).toBe("B");
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("");
        expect(model.rackTiles[2].letter.value).toBe("");
    });
    it("it Shunts existing Letters to the left", function () {
        model.moveToTile(4, 6);
        expect(model.boardTiles[0].letter.value).toBe("B");
        expect(model.boardTiles[1].letter.value).toBe("C");
        expect(model.boardTiles[2].letter.value).toBe("A");
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("");
        expect(model.rackTiles[2].letter.value).toBe("");
    });
    it("it publishes lettersShunted events", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(6, 4);
        expect(observer.callback).toHaveBeenCalledWith(5, 6);
        expect(observer.callback).toHaveBeenCalledWith(4, 5);
    });
    it("it publishes answerChanged event", function () {
        model.moveToTile(6, 3);
        var observer = { callback: function (newAnswer) { } };
        spyOn(observer, "callback");
        model.answerChanged = observer.callback;
        model.moveToTile(4, 6);
        expect(observer.callback).toHaveBeenCalledWith(" BA");
    });
});
describe("When moveToTile() moves a Letter from Board tile to the same Board Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
        model.moveToTile(1, 4);
    });
    it("the Letter is on the same Board Tile", function () {
        model.moveToTile(4, 4);
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("B");
        expect(model.rackTiles[2].letter.value).toBe("C");
        expect(model.boardTiles[0].letter.value).toBe("A");
        expect(model.boardTiles[1].letter.value).toBe("");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it does not publish lettersShunted event", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(4, 4);
        expect(observer.callback).not.toHaveBeenCalled();
    });
    it("it does not publish answerChanged event", function () {
        var observer = { callback: function (newAnswer) { } };
        spyOn(observer, "callback");
        model.answerChanged = observer.callback;
        model.moveToTile(4, 4);
        expect(observer.callback).not.toHaveBeenCalled();
    });
});
describe("When moveToTile() moves a Letter from Board tile to an empty Board Tile", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
        model.moveToTile(1, 4);
    });
    it("the Letter is on the Board Tile", function () {
        model.moveToTile(4, 5);
        expect(model.rackTiles[0].letter.value).toBe("");
        expect(model.rackTiles[1].letter.value).toBe("B");
        expect(model.rackTiles[2].letter.value).toBe("C");
        expect(model.boardTiles[0].letter.value).toBe("");
        expect(model.boardTiles[1].letter.value).toBe("A");
        expect(model.boardTiles[2].letter.value).toBe("");
    });
    it("it does not publish lettersShunted event", function () {
        var observer = { callback: function (sourceTileId, destinationTileId) { } };
        spyOn(observer, "callback").and.callThrough();
        model.lettersShunted = observer.callback;
        model.moveToTile(4, 5);
        expect(observer.callback).not.toHaveBeenCalled();
    });
    it("it publishes answerChanged event", function () {
        var observer = { callback: function (newAnswer) { } };
        spyOn(observer, "callback");
        model.answerChanged = observer.callback;
        model.moveToTile(4, 5);
        expect(observer.callback).toHaveBeenCalledWith(" A ");
    });
});
describe("When getAnswer()", function () {
    var model;
    beforeEach(function () {
        var letters = "ABC";
        model = new JonQuxBurton.WordPuzzle.Model(letters);
        model.moveToTile(1, 4);
        model.moveToTile(2, 5);
        model.moveToTile(3, 6);
    });
    it("the Letters are returned as a string", function () {
        expect(model.getAnswer()).toBe("ABC");
    });
    it("an empty Tiles is returned as an empty string", function () {
        model.moveToTile(5, 1);
        expect(model.getAnswer()).toBe("A C");
    });
});
