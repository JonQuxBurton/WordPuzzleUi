var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var BoardController = (function () {
            function BoardController(boardState, boardStateManipulator) {
                this.boardState = boardState;
                this.boardStateManipulator = boardStateManipulator;
            }
            BoardController.prototype.moveLetter = function (originTileId, destinationTileId) {
                var destinationIsRackTile = this.boardState.isRackTile(destinationTileId);
                var originTile = this.boardState.getTile(originTileId);
                var destinationTile = this.boardState.getTile(destinationTileId);
                var transitioningLetter = originTile.letter;
                originTile.letter = new WordPuzzle.Letter("");
                if (destinationTile.letter.isBlank()) {
                    this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                }
                else if (destinationIsRackTile) {
                    if (this.boardState.canShuntRackRight(destinationTile)) {
                        this.boardStateManipulator.shuntRackToRight(destinationTile);
                    }
                    else if (this.boardState.canShuntRackLeft(destinationTile)) {
                        this.boardStateManipulator.shuntRackToLeft(destinationTile);
                    }
                    this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                }
                else {
                    if (this.boardState.canShuntRight(destinationTile)) {
                        this.boardStateManipulator.shuntToRight(destinationTile);
                        this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                    }
                    else if (this.boardState.canShuntLeft(destinationTile)) {
                        this.boardStateManipulator.shuntToLeft(destinationTile);
                        this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                    }
                    else if (this.boardState.canShuntDown(destinationTile)) {
                        this.boardStateManipulator.shuntDown(destinationTile);
                        this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                    }
                    else if (this.boardState.canShuntUp(destinationTile)) {
                        this.boardStateManipulator.shuntUp(destinationTile);
                        this.boardStateManipulator.moveLetterToEmptyTile(transitioningLetter, destinationTile);
                    }
                    else {
                        this.boardStateManipulator.shuntToRack(originTile, destinationTile);
                    }
                }
            };
            return BoardController;
        }());
        WordPuzzle.BoardController = BoardController;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
