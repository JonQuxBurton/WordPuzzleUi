
namespace JonQuxBurton.WordPuzzle {

    export class Model {

        private letters: string;

        public rackTiles: Array<Tile>;
        public boardTiles: Array<Tile>;
        public lettersShunted: (sourceTileId: number, destinationTileId: number) => void;
        public answerChanged: (newAnswer: string) => void;

        constructor(letters: string) {

            this.letters = letters;
            this.rackTiles = new Array<Tile>();
            this.boardTiles = new Array<Tile>();

            var id = 1;

            for (var i = 0; i < letters.length; i++) {
                this.rackTiles.push(new Tile(id++, new Letter(letters[i]), false, 0, 0, false, false));
            }

            for (var i = 0; i < letters.length; i++) {
                this.boardTiles.push(new Tile(id++, new Letter(""), false, 0, 0, false, true));
            }
        }

        public moveToTile(sourceTileId: number, destinationTileId: number) {

            if (sourceTileId == destinationTileId)
                return;

            var sourceTile = this.getTile(sourceTileId);
            var destinationTile = this.getTile(destinationTileId);

            var sourceLetter = sourceTile.letter;
            var destinationLetter = destinationTile.letter;

            sourceTile.letter = new Letter("");

            if (!destinationLetter.isBlank()) {

                this.shuntLetters(destinationTile);
            }

            destinationTile.letter = sourceLetter;

            if (this.answerChanged != null)
                this.answerChanged(this.getAnswer());
        }

        public getAnswer(): string {

            var letters = _.map(this.boardTiles, (x) => {
                if (x.letter.isBlank())
                    return " ";
                else
                    return x.letter.value;
            });

            return _.join(letters, "");
        }

        private shuntLetters(startTile: Tile) {

            var tilesToShunt = this.getTilesToShunt(startTile);

            _.forEach(tilesToShunt, (tile, index) => {

                if (index < tilesToShunt.length - 1) {
                    var nextTile = tilesToShunt[index + 1];

                    var startTileLetter = tile.letter;
                    tile.letter = nextTile.letter;
                    nextTile.letter = startTileLetter;

                    if (this.lettersShunted != null)
                        this.lettersShunted(nextTile.id, tile.id);
                }
            });
        }

        private getTilesToShunt(startTile: Tile): Tile[] {

            var tiles: Tile[];

            if (startTile.isBoardTile)
                tiles = this.boardTiles;
            else
                tiles = this.rackTiles;

            var rightTile = _.find(tiles, (x) => { return x.id > startTile.id && x.letter.isBlank() });

            if (rightTile) {
                return _.filter(tiles, (x) => { return x.id >= startTile.id && x.id <= rightTile.id }).reverse();
            }

            var leftTile = _.findLast(tiles, (x) => { return x.id < startTile.id && x.letter.isBlank() });

            return _.filter(tiles, (x) => { return x.id <= startTile.id && x.id >= leftTile.id });
        }

        private getTile(tileId: number) {

            var tile = _.find(this.rackTiles, (x) => { return x.id == tileId });

            if (tile)
                return tile;

            var tile = _.find(this.boardTiles, (x) => { return x.id == tileId });

            return tile;
        }
    }
}