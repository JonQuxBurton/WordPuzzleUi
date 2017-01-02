
namespace JonQuxBurton.WordPuzzle {

    export class GameBuilder {

        private $;
        private gameDiv: JQuery;
        private answerResultDiv: JQuery;
        private config;
        private boardState;
        private boardController;

        constructor($: JQueryStatic, gameDiv: JQuery, answerResultDiv: JQuery, config: Config, boardController: WordPuzzle.BoardController, boardState: WordPuzzle.BoardState) {
            this.$ = $;
            this.gameDiv = gameDiv;
            this.answerResultDiv = answerResultDiv;
            this.config = config;
            this.boardController = boardController;
            this.boardState = boardState;
        }

        public build() {

            var tileSize = this.config.tileSize;
            var self = this;

            _(this.boardState.rack).forEach(function (tile) {
                var newTile = self.appendTile(self.gameDiv, tile.id, (tile.id - 1) * tileSize, "0", "");
                self.appendLetter(newTile, tile.letter.value);
            });

            var numberOfLetters = this.boardState.rack.length;

            _.forEach(this.boardState.getBoardTiles(), (tile) => {
                self.appendTile(self.gameDiv, tile.id, (tile.x * tileSize), (tile.y * tileSize) + "rem", "tile-board");
            });
            
            this.answerResultDiv.css({ left: ((numberOfLetters) * tileSize) + "rem", top: tileSize + "rem" });

            this.gameDiv.append(this.answerResultDiv);

            this.enableDragAndDrop();
        }

        private appendLetter(tileDiv: JQuery, letterValue: string) {

            var span = this.$("<span/>", { text: letterValue });
            var div = this.$("<div/>", { class: "draggable letter", style: "left: 0" });

            span.appendTo(div);
            div.appendTo(tileDiv);
        }

        private appendTile(gameDiv: JQuery, tileId: number, left: number, top: string, className: string): JQuery {

            var div = this.$("<div/>", { class: "droppable tile " + className, "data-tileid": tileId, style: "left:" + left + "rem; top: " + top });
            div.appendTo(gameDiv);

            return div;
        }

        private enableDragAndDrop() {

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

                    var destinationTileId: number = $(this).data("tileid");
                    var sourceTileId = self.getTileIdFromLetterDiv(sourceDiv);

                    sourceDiv.appendTo($(this));
                    sourceDiv.css({ top: 0, left: 0 });

                    self.boardController.moveLetter(sourceTileId, destinationTileId);
                }
            });
        }

        private getTileIdFromLetterDiv(jElement): number {
            return jElement.parent().data("tileid");
        }

        private getLetterFromTileId = (sourceTileId: number): JQuery => {
            return this.$("div[data-tileid=" + sourceTileId + "]").children().first();
        }
    }
}