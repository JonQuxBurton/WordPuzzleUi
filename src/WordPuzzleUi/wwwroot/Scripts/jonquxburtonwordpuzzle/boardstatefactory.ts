namespace JonQuxBurton.WordPuzzle {

    export class BoardStateFactory {

        public build(puzzle: Puzzle): BoardState {

            var rack = Array<Tile>();
            var boardLines = Array<Array<Tile>>();

            var letters = puzzle.letters;
            var id = 1;

            for (var i = 0; i < letters.length; i++) {
                rack.push(new JonQuxBurton.WordPuzzle.Tile(id++, i, new JonQuxBurton.WordPuzzle.Letter(letters[i]), false, 0, 0, false, false));
            }

            _(puzzle.lines).forEach(function (line) {

                var tiles = Array<Tile>();;

                for (var i = 0; i < line.length; i++) {

                    var dX = 0;
                    var dY = 0;

                    if (line.direction === JonQuxBurton.WordPuzzle.Direction.Vertical)
                        dY = i;
                    else
                        dX = i;

                    var x = line.origin.x + dX;
                    var y = line.origin.y + dY;
                    
                    var newTile;
                    var doubleTile = _.find(boardLines[0], (tile) => { return tile.x == x && tile.y == y; });

                    if (_.isUndefined(doubleTile)) {
                        newTile = new JonQuxBurton.WordPuzzle.Tile(id++, i, new JonQuxBurton.WordPuzzle.Letter(""), false, x, y, false, true);
                    } else {
                        newTile = doubleTile;
                    }
                    
                    tiles.push(newTile);
                }

                boardLines.push(tiles);
            });

            return new JonQuxBurton.WordPuzzle.BoardState(rack, boardLines);
        }
    }
}