var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var GameUpdater = (function () {
            function GameUpdater($, gameDiv, answerResultDiv, config) {
                var _this = this;
                this.lettersShunted = function (sourceTileId, destinationTileId) {
                    var sourceTile = _this.getTileFromId(sourceTileId);
                    var letterHandle = _this.getLetterFromTileId(sourceTileId);
                    var destinationTile = _this.getTileFromId(destinationTileId);
                    var destinationPosition = destinationTile.position();
                    var sourcePosition = sourceTile.position();
                    letterHandle.appendTo(_this.gameDiv);
                    letterHandle.css({ left: sourcePosition.left, top: sourcePosition.top });
                    letterHandle.animate({ left: destinationPosition.left, top: destinationPosition.top }, _this.config.letterReboundDuration).promise().done(function () {
                        letterHandle.appendTo(destinationTile);
                        letterHandle.css({ left: 0, top: 0 });
                    });
                };
                this.getLetterFromTileId = function (sourceTileId) {
                    return _this.$("div[data-tileid=" + sourceTileId + "]").children().first();
                };
                this.getTileFromId = function (tileId) {
                    return _this.$("div[data-tileid=" + tileId + "]");
                };
                this.$ = $;
                this.gameDiv = gameDiv;
                this.answerResultDiv = answerResultDiv;
                this.config = config;
            }
            GameUpdater.prototype.getTileIdFromLetterDiv = function (jElement) {
                return jElement.parent().data("tileid");
            };
            return GameUpdater;
        }());
        WordPuzzle.GameUpdater = GameUpdater;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
