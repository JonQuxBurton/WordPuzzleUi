var JonQuxBurton;
(function (JonQuxBurton) {
    var WordPuzzle;
    (function (WordPuzzle) {
        var Letter = (function () {
            function Letter(value) {
                this.value = value;
            }
            Letter.prototype.isBlank = function () {
                return this.value == "";
            };
            return Letter;
        }());
        WordPuzzle.Letter = Letter;
    })(WordPuzzle = JonQuxBurton.WordPuzzle || (JonQuxBurton.WordPuzzle = {}));
})(JonQuxBurton || (JonQuxBurton = {}));
