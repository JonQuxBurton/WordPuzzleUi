var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var Tile = (function () {
            function Tile(id, letter, isDone, x, y, isBonusTile, isBoardTile) {
                this.id = id;
                this.letter = letter;
                this.isDone = isDone;
                this.x = x;
                this.y = y;
                this.isBonusTile = isBonusTile;
                this.isBoardTile = isBoardTile;
            }
            return Tile;
        }());
        WordPuzzle.Tile = Tile;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
