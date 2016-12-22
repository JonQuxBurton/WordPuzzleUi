var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var BoardStateFactory = (function () {
            function BoardStateFactory() {
            }
            BoardStateFactory.prototype.build = function (puzzle) {
                var rack = [];
                var boardLines = [];
                var letters = puzzle.letters;
                var id = 1;
                for (var i = 0; i < letters.length; i++) {
                    rack.push(new JonQuxBurton.WordPuzzle.Tile(id++, i, new JonQuxBurton.WordPuzzle.Letter(letters[i]), false, 0, 0, false, false));
                }
                _(puzzle.lines).forEach(function (line) {
                    var tiles = [];
                    for (var i = 0; i < line.length; i++) {
                        var dX = 0;
                        var dY = 0;
                        if (line.direction === JonQuxBurton.WordPuzzle.Direction.Vertical)
                            dY = i;
                        else
                            dX = i;
                        var x = line.origin.x + dX;
                        var y = line.origin.y + dY;
                        var newTile = new JonQuxBurton.WordPuzzle.Tile(id++, i, new JonQuxBurton.WordPuzzle.Letter(""), false, x, y, false, true);
                        tiles.push(newTile);
                    }
                    boardLines.push(tiles);
                });
                return new JonQuxBurton.WordPuzzle.BoardState(rack, boardLines);
            };
            return BoardStateFactory;
        }());
        WordPuzzle.BoardStateFactory = BoardStateFactory;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
