namespace JonQuxBurton.WordPuzzle {

    export class BoardController{

        private boardState: BoardState;
        private boardStateManipulator: BoardStateManipulator;

        constructor(boardState: BoardState, boardStateManipulator: BoardStateManipulator) {
            this.boardState = boardState;
            this.boardStateManipulator = boardStateManipulator;
        }

        public moveLetter(originTileId: number, destinationTileId: number) {

            var destinationIsRackTile = this.boardState.isRackTile(destinationTileId);
            var originTile: Tile = this.boardState.getTile(originTileId);
            var destinationTile: Tile = this.boardState.getTile(destinationTileId);

            var transitioningLetter = originTile.letter;
            originTile.letter = new Letter("");

            if (destinationTile.letter.isBlank()) {
                this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
            } else if (destinationIsRackTile) {

                if (this.boardState.canShuntRackRight(destinationTile)) {
                    this.boardStateManipulator.shuntRackToRight(destinationTile);
                } else if (this.boardState.canShuntRackLeft(destinationTile)) {
                    this.boardStateManipulator.shuntRackToLeft(destinationTile);
                }

                this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);

            } else {

                if (this.boardState.canShuntRight(destinationTile)) {
                    this.boardStateManipulator.shuntToRight(destinationTile);
                    this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                } else if (this.boardState.canShuntLeft(destinationTile)) {
                    this.boardStateManipulator.shuntToLeft(destinationTile);
                    this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                } else if (this.boardState.canShuntDown(destinationTile)) {
                    this.boardStateManipulator.shuntDown(destinationTile);
                    this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                } else if (this.boardState.canShuntUp(destinationTile)) {
                    this.boardStateManipulator.shuntUp(destinationTile);
                    this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                } else {
                    this.boardStateManipulator.shuntToRack(originTile, destinationTile);
                }
            }
        }
    }
}