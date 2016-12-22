var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var BoardState = (function () {
            function BoardState(rack, lines) {
                this.rack = rack;
                this.lines = lines;
            }
            BoardState.prototype.getAnswer = function () {
                var lineStrings = [];
                _.forEach(this.lines, function (line) {
                    var lineString = "";
                    _.forEach(line, function (tile) {
                        lineString += tile.letter.getValueOrSpace();
                    });
                    lineStrings.push(lineString);
                });
                return lineStrings;
            };
            BoardState.prototype.getFirstBlankToLeftOfTile = function (targetTile) {
                var tileLinePosition = _.findIndex(this.lines[0], function (x) { return x.id == targetTile.id; });
                return _.findLastIndex(this.lines[0].slice(0, tileLinePosition), function (x) { return x.letter.isBlank(); });
            };
            BoardState.prototype.getFirstBlankToLeftOfTileOnRack = function (targetTile) {
                var tileLinePosition = _.findIndex(this.rack, function (x) { return x.id == targetTile.id; });
                return _.findLastIndex(this.rack.slice(0, tileLinePosition), function (x) { return x.letter.isBlank(); });
            };
            BoardState.prototype.canShuntRight = function (targetTile) {
                var tileLinePosition = _.findIndex(this.lines[0], function (x) { return x.id == targetTile.id; });
                if (tileLinePosition == (this.lines[0].length) - 1)
                    return false;
                if (targetTile.letter.isBlank())
                    return true;
                var firstBlankRightOfTileIndex = _.findIndex(this.lines[0].slice(tileLinePosition), function (x) { return x.letter.isBlank(); });
                if (firstBlankRightOfTileIndex == -1)
                    return false;
                return true;
            };
            BoardState.prototype.canShuntLeft = function (targetTile) {
                var tileLinePosition = _.findIndex(this.lines[0], function (x) { return x.id == targetTile.id; });
                if (tileLinePosition == 0)
                    return false;
                if (targetTile.letter.isBlank())
                    return true;
                var firstBlank = this.getFirstBlankToLeftOfTile(targetTile);
                if (firstBlank == -1)
                    return false;
                return true;
            };
            BoardState.prototype.canShuntRackRight = function (targetTile) {
                var tileLinePosition = _.findIndex(this.rack, function (x) { return x.id == targetTile.id; });
                if (tileLinePosition == (this.rack.length) - 1)
                    return false;
                if (targetTile.letter.isBlank())
                    return true;
                var firstBlankRightOfTileIndex = _.findIndex(this.rack.slice(tileLinePosition), function (x) { return x.letter.isBlank(); });
                if (firstBlankRightOfTileIndex == -1)
                    return false;
                return true;
            };
            BoardState.prototype.canShuntRackLeft = function (targetTile) {
                var tileLinePosition = _.findIndex(this.rack, function (x) { return x.id == targetTile.id; });
                if (tileLinePosition == 0)
                    return false;
                if (targetTile.letter.isBlank())
                    return true;
                var firstBlank = this.getFirstBlankToLeftOfTileOnRack(targetTile);
                if (firstBlank == -1)
                    return false;
                return true;
            };
            BoardState.prototype.isRackTile = function (tileId) {
                var rackTile = _.find(this.rack, function (x) { return x.id == tileId; });
                if (rackTile == null)
                    return false;
                return true;
            };
            BoardState.prototype.getTile = function (tileId) {
                var rackTile = _.find(this.rack, function (x) { return x.id == tileId; });
                if (rackTile != null)
                    return rackTile;
                var boardTile = null;
                _.forEach(this.lines, function (line) {
                    boardTile = _.find(line, function (x) { return x.id == tileId; });
                    if (boardTile != null)
                        return false;
                });
                return boardTile;
            };
            BoardState.prototype.getBoardTiles = function () {
                var allTiles = new Array();
                _.forEach(this.lines, function (line) {
                    _.forEach(line, function (tile) {
                        var existing = _.find(allTiles, function (x) { return x.id == tile.id; });
                        if (existing == null)
                            allTiles.push(tile);
                    });
                });
                return allTiles;
            };
            return BoardState;
        }());
        WordPuzzle.BoardState = BoardState;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
