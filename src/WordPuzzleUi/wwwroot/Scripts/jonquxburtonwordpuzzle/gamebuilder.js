var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var GameBuilder = (function () {
            function GameBuilder($, gameDiv, answerResultDiv, config, boardController, boardState) {
                var _this = this;
                this.getLetterFromTileId = function (sourceTileId) {
                    return _this.$("div[data-tileid=" + sourceTileId + "]").children().first();
                };
                this.$ = $;
                this.gameDiv = gameDiv;
                this.answerResultDiv = answerResultDiv;
                this.config = config;
                this.boardController = boardController;
                this.boardState = boardState;
            }
            GameBuilder.prototype.build = function () {
                var tileSize = this.config.tileSize;
                var self = this;
                _(this.boardState.rack).forEach(function (tile) {
                    var x = self.config.paddingLeft + ((tile.id - 1) * tileSize);
                    var newTile = self.appendTile(self.gameDiv, tile.id, x, self.config.paddingTop, "");
                    self.appendLetter(newTile, tile.letter.value);
                });
                var numberOfLetters = this.boardState.rack.length;
                _.forEach(this.boardState.getBoardTiles(), function (tile) {
                    var x = self.config.paddingLeft + (tile.x * tileSize);
                    var y = self.config.paddingTop + (tile.y * tileSize);
                    self.appendTile(self.gameDiv, tile.id, x, y, "tile-board");
                });
                this.answerResultDiv.css({ left: (this.config.paddingLeft + (numberOfLetters * tileSize)) + "rem", top: this.config.paddingTop + "rem" });
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
                var div = this.$("<div/>", { class: "droppable tile " + className, "data-tileid": tileId, style: "left:" + left + "rem; top: " + top + "rem" });
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
                        self.boardController.moveLetter(sourceTileId, destinationTileId);
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
