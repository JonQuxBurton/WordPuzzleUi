
namespace JonQuxBurton.WordPuzzle {

    export class Letter {
        constructor(public value: string) {
        }

        public isBlank() {
            return this.value == "";
        }

        public getValueOrSpace(): string {
            if (this.isBlank())
                return " ";

            return this.value;
        }
    }
}