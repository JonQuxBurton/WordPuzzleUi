var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var Model = (function () {
            function Model(letters) {
                this.letters = letters;
                this.rackTiles = new Array();
                this.boardTiles = new Array();
                var id = 1;
                for (var i = 0; i < letters.length; i++) {
                    this.rackTiles.push(new WordPuzzle.Tile(id++, new WordPuzzle.Letter(letters[i]), false, 0, 0, false, false));
                }
                for (var i = 0; i < letters.length; i++) {
                    this.boardTiles.push(new WordPuzzle.Tile(id++, new WordPuzzle.Letter(""), false, 0, 0, false, true));
                }
            }
            Model.prototype.moveToTile = function (sourceTileId, destinationTileId) {
                if (sourceTileId == destinationTileId)
                    return;
                var sourceTile = this.getTile(sourceTileId);
                var destinationTile = this.getTile(destinationTileId);
                var sourceLetter = sourceTile.letter;
                var destinationLetter = destinationTile.letter;
                sourceTile.letter = new WordPuzzle.Letter("");
                if (!destinationLetter.isBlank()) {
                    this.shuntLetters(destinationTile);
                }
                destinationTile.letter = sourceLetter;
                if (this.answerChanged != null)
                    this.answerChanged(this.getAnswer());
            };
            Model.prototype.getAnswer = function () {
                var letters = _.map(this.boardTiles, function (x) {
                    if (x.letter.isBlank())
                        return " ";
                    else
                        return x.letter.value;
                });
                return _.join(letters, "");
            };
            Model.prototype.shuntLetters = function (startTile) {
                var _this = this;
                var tilesToShunt = this.getTilesToShunt(startTile);
                _.forEach(tilesToShunt, function (tile, index) {
                    if (index < tilesToShunt.length - 1) {
                        var nextTile = tilesToShunt[index + 1];
                        var startTileLetter = tile.letter;
                        tile.letter = nextTile.letter;
                        nextTile.letter = startTileLetter;
                        if (_this.lettersShunted != null)
                            _this.lettersShunted(nextTile.id, tile.id);
                    }
                });
            };
            Model.prototype.getTilesToShunt = function (startTile) {
                var tiles;
                if (startTile.isBoardTile)
                    tiles = this.boardTiles;
                else
                    tiles = this.rackTiles;
                var rightTile = _.find(tiles, function (x) { return x.id > startTile.id && x.letter.isBlank(); });
                if (rightTile) {
                    return _.filter(tiles, function (x) { return x.id >= startTile.id && x.id <= rightTile.id; }).reverse();
                }
                var leftTile = _.findLast(tiles, function (x) { return x.id < startTile.id && x.letter.isBlank(); });
                return _.filter(tiles, function (x) { return x.id <= startTile.id && x.id >= leftTile.id; });
            };
            Model.prototype.getTile = function (tileId) {
                var tile = _.find(this.rackTiles, function (x) { return x.id == tileId; });
                if (tile)
                    return tile;
                var tile = _.find(this.boardTiles, function (x) { return x.id == tileId; });
                return tile;
            };
            return Model;
        }());
        WordPuzzle.Model = Model;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
