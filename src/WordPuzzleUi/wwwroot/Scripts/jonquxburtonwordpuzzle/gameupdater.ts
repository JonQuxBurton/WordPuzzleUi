
namespace JonQuxBurton.WordPuzzle {

    export class GameUpdater {

        private $: JQueryStatic;
        private gameDiv: JQuery;
        private answerResultDiv: JQuery;
        private config: Config;

        constructor($: JQueryStatic, gameDiv: JQuery, answerResultDiv:JQuery, config: Config) {

            this.$ = $;
            this.gameDiv = gameDiv;
            this.answerResultDiv = answerResultDiv;
            this.config = config;
        }

        public lettersShunted = (sourceTileId: number, destinationTileId: number) => {

            var sourceTile = this.getTileFromId(sourceTileId);
            var letterHandle = this.getLetterFromTileId(sourceTileId);

            var destinationTile = this.getTileFromId(destinationTileId);
            var destinationPosition = destinationTile.position();
            var sourcePosition = sourceTile.position();

            letterHandle.appendTo(this.gameDiv);
            letterHandle.css({ left: sourcePosition.left, top: sourcePosition.top });

            letterHandle.animate(
                { left: destinationPosition.left, top: destinationPosition.top },
                this.config.letterReboundDuration).promise().done(function () {
                    letterHandle.appendTo(destinationTile);
                    letterHandle.css({ left: 0, top: 0 });
                });
        }

        private getTileIdFromLetterDiv(jElement): number {
            return jElement.parent().data("tileid");
        }

        private getLetterFromTileId = (sourceTileId: number): JQuery => {
            return this.$("div[data-tileid=" + sourceTileId + "]").children().first();
        }

        private getTileFromId = (tileId: number): JQuery => {
            return this.$("div[data-tileid=" + tileId + "]");
        }
    }
}