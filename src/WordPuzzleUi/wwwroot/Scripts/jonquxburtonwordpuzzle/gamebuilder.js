var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var GameBuilder = (function () {
            function GameBuilder($, gameDiv, answerResultDiv, config, model) {
                var _this = this;
                this.getLetterFromTileId = function (sourceTileId) {
                    return _this.$("div[data-tileid=" + sourceTileId + "]").children().first();
                };
                this.$ = $;
                this.gameDiv = gameDiv;
                this.answerResultDiv = answerResultDiv;
                this.config = config;
                this.model = model;
            }
            GameBuilder.prototype.build = function () {
                var tileSize = this.config.tileSize;
                var self = this;
                _(this.model.rackTiles).forEach(function (tile) {
                    var newTile = self.appendTile(self.gameDiv, tile.id, (tile.id - 1) * tileSize, "0", "");
                    self.appendLetter(newTile, tile.letter.value);
                });
                var numberOfLetters = this.model.rackTiles.length;
                _(this.model.boardTiles).forEach(function (tile) {
                    self.appendTile(self.gameDiv, tile.id, ((tile.id - 1) - numberOfLetters) * tileSize, tileSize + "rem", "tile-board");
                });
                this.answerResultDiv.css({ left: ((numberOfLetters) * tileSize) + "rem", top: tileSize + "rem" });
                this.gameDiv.append(this.answerResultDiv);
                this.enableDragAndDrop();
            };
            GameBuilder.prototype.appendLetter = function (tileDiv, letterValue) {
                var span = this.$("<span/>", { text: letterValue });
                var div = this.$("<div/>", { class: "draggable letter", style: "left: 0" });
                span.appendTo(div);
                div.appendTo(tileDiv);
            };
            GameBuilder.prototype.appendTile = function (gameDiv, tileId, left, top, className) {
                var div = this.$("<div/>", { class: "droppable tile " + className, "data-tileid": tileId, style: "left:" + left + "rem; top: " + top });
                div.appendTo(gameDiv);
                return div;
            };
            GameBuilder.prototype.enableDragAndDrop = function () {
                var sourceDiv;
                var droppedOnTile = false;
                var startPosition;
                var self = this;
                this.$(".draggable").draggable({
                    start: function (event, ui) {
                        sourceDiv = $(this);
                        sourceDiv.css('z-index', 11);
                        startPosition = sourceDiv.position();
                    },
                    stop: function (event, ui) {
                        if (!droppedOnTile) {
                            ui.helper.animate({ left: startPosition.left, top: startPosition.top }, self.config.letterReboundDuration);
                        }
                        sourceDiv.css('z-index', 10);
                        droppedOnTile = false;
                        sourceDiv = null;
                    }
                });
                this.$(".droppable").droppable({
                    drop: function (event, ui) {
                        droppedOnTile = true;
                        var destinationTileId = $(this).data("tileid");
                        var sourceTileId = self.getTileIdFromLetterDiv(sourceDiv);
                        sourceDiv.appendTo($(this));
                        sourceDiv.css({ top: 0, left: 0 });
                        self.model.moveToTile(sourceTileId, destinationTileId);
                    }
                });
            };
            GameBuilder.prototype.getTileIdFromLetterDiv = function (jElement) {
                return jElement.parent().data("tileid");
            };
            return GameBuilder;
        }());
        WordPuzzle.GameBuilder = GameBuilder;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
