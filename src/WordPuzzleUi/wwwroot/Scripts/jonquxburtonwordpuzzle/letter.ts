
namespace JonQuxBurton.WordPuzzle {

    export class Letter {
        constructor(public value: string) {
        }

        public isBlank() {
            return this.value == "";
        }
    }
}