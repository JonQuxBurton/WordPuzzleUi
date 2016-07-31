
namespace JonQuxBurton.WordPuzzle {

    export class Tile {

        constructor(public id: number, public letter: Letter, public isDone: boolean, public x: number, public y: number,
                    public isBonusTile: boolean, public isBoardTile: boolean) {
        }
    }
}