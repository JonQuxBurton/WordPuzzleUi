namespace JonQuxBurton.WordPuzzle {

    export class BoardStateManipulator {

        private boardState: BoardState;

        constructor(boardState: BoardState) {
            this.boardState = boardState;
        }

        public moveLetterToEmptyTile(letter: Letter, destinationTile: Tile) {

            destinationTile.letter = letter;

            if (this.boardState.answerChanged) {
                this.boardState.answerChanged(this.boardState.getAnswer()[0]);
            }
        }

        public shuntToRight(targetTile: Tile) {
            var tileLinePosition = _.findIndex(this.boardState.lines[0], (x) => { return x.id == targetTile.id });
            var firstBlankIndexRightOfTile = _.findIndex(this.boardState.lines[0].slice(tileLinePosition), (x) => { return x.letter.isBlank() }) + tileLinePosition;

            var currentTileIndex = firstBlankIndexRightOfTile;
            var previousTileIndex = currentTileIndex - 1;

            while (currentTileIndex > tileLinePosition) {
                this.boardState.lines[0][currentTileIndex].letter = this.boardState.lines[0][previousTileIndex].letter;

                if (this.boardState.lettersShunted) {
                    this.boardState.lettersShunted(this.boardState.lines[0][previousTileIndex].id, this.boardState.lines[0][currentTileIndex].id);
                }
                
                currentTileIndex--;
                previousTileIndex = currentTileIndex - 1;
            }
            
            targetTile.letter = new Letter("");

            if (this.boardState.answerChanged) {
                this.boardState.answerChanged(this.boardState.getAnswer()[0]);
            }
        }

        public shuntToLeft(targetTile: Tile) {
            var tileLinePosition = _.findIndex(this.boardState.lines[0], (x) => { return x.id == targetTile.id });
            var firstBlankIndexLeftOfTile = this.boardState.getFirstBlankToLeftOfTile(targetTile);

            var currentTileIndex = 0;
            var nextTileIndex = currentTileIndex + 1;

            while (currentTileIndex < (this.boardState.lines[0].length - 1)) {
                if (firstBlankIndexLeftOfTile < nextTileIndex && tileLinePosition >= nextTileIndex) {
                    this.boardState.lines[0][currentTileIndex].letter = this.boardState.lines[0][nextTileIndex].letter;

                    if (this.boardState.lettersShunted) {
                        this.boardState.lettersShunted(this.boardState.lines[0][nextTileIndex].id, this.boardState.lines[0][currentTileIndex].id);
                    }

                }
                currentTileIndex++;
                nextTileIndex = currentTileIndex + 1;
            }

            targetTile.letter = new Letter("");

            if (this.boardState.answerChanged) {
                this.boardState.answerChanged(this.boardState.getAnswer()[0]);
            }
        }

        public shuntRackToRight(targetTile: Tile) {
            var tileLinePosition = _.findIndex(this.boardState.rack, (x) => { return x.id == targetTile.id });
            var firstBlankIndexRightOfTile = _.findIndex(this.boardState.rack.slice(tileLinePosition), (x) => { return x.letter.isBlank() }) + tileLinePosition;

            var currentTileIndex = firstBlankIndexRightOfTile;
            var previousTileIndex = currentTileIndex - 1;

            while (currentTileIndex > tileLinePosition) {
                this.boardState.rack[currentTileIndex].letter = this.boardState.rack[previousTileIndex].letter;

                if (this.boardState.lettersShunted) {
                    this.boardState.lettersShunted(this.boardState.rack[previousTileIndex].id, this.boardState.rack[currentTileIndex].id);
                }

                if (this.boardState.answerChanged) {
                    this.boardState.answerChanged(this.boardState.getAnswer()[0]);
                }

                currentTileIndex--;
                previousTileIndex = currentTileIndex - 1;
            }

            targetTile.letter = new Letter("");
        }

        public shuntRackToLeft(targetTile: Tile) {
            var tileLinePosition = _.findIndex(this.boardState.rack, (x) => { return x.id == targetTile.id });
            var firstBlankIndexLeftOfTile = this.boardState.getFirstBlankToLeftOfTileOnRack(targetTile);

            var currentTileIndex = 0;
            var nextTileIndex = currentTileIndex + 1;

            while (currentTileIndex < (this.boardState.rack.length - 1)) {
                if (firstBlankIndexLeftOfTile < nextTileIndex && tileLinePosition >= nextTileIndex) {
                    this.boardState.rack[currentTileIndex].letter = this.boardState.rack[nextTileIndex].letter;

                    if (this.boardState.lettersShunted) {
                        this.boardState.lettersShunted(this.boardState.rack[nextTileIndex].id, this.boardState.rack[currentTileIndex].id);
                    }
                }
                currentTileIndex++;
                nextTileIndex = currentTileIndex + 1;
            }

            targetTile.letter = new Letter("");
        }

        public shuntToRack(originTile: Tile, destinationTile: Tile) {

            originTile.letter = destinationTile.letter;

            if (this.boardState.lettersShunted) {
                this.boardState.lettersShunted(destinationTile.id, originTile.id);
            }

            if (this.boardState.answerChanged) {
                this.boardState.answerChanged(this.boardState.getAnswer()[0]);
            }
        }
    }
}