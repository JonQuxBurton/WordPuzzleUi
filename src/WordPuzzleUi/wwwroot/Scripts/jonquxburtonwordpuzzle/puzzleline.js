var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var PuzzleLine = (function () {
            function PuzzleLine(origin, length, direction) {
                this.origin = origin;
                this.length = length;
                this.direction = direction;
            }
            return PuzzleLine;
        }());
        WordPuzzle.PuzzleLine = PuzzleLine;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
