﻿/// <reference path="boardstatemanipulator.ts" />
/// <reference path="boardstatemanipulator.ts" />
namespace JonQuxBurton.WordPuzzle {

    export class BoardState {

        public lettersShunted: (sourceTileId: number, destinationTileId: number) => void;
        public answerChanged: (newAnswer: Array<string>) => void;

        constructor(public rack: Array<Tile>, public lines: Array<Array<Tile>>) {
        }

        public getAnswer(): Array<string> {

            var lineStrings = [];

            _.forEach(this.lines, (line) => {
                var lineString = "";

                _.forEach(line, (tile) => {
                    lineString += tile.letter.getValueOrSpace();
                });

                lineStrings.push(lineString);
            });

            return lineStrings;
        }

        public getFirstBlankToLeftOfTile(targetTile: Tile): number {
            var tileLinePosition = _.findIndex(this.lines[0], (x) => { return x.id == targetTile.id });
            return _.findLastIndex(this.lines[0].slice(0, tileLinePosition), (x) => { return x.letter.isBlank() });
        }

        public getFirstBlankAboveTile(targetTile: Tile): number {
            var tileLinePosition = _.findIndex(this.lines[1], (x) => { return x.id == targetTile.id });
            return _.findLastIndex(this.lines[1].slice(0, tileLinePosition), (x) => { return x.letter.isBlank() });
        }

        public getFirstBlankToLeftOfTileOnRack(targetTile: Tile): number {
            var tileLinePosition = _.findIndex(this.rack, (x) => { return x.id == targetTile.id });
            return _.findLastIndex(this.rack.slice(0, tileLinePosition), (x) => { return x.letter.isBlank() });
        }

        public canShuntRight(targetTile: Tile): boolean {
            var tileLinePosition = _.findIndex(this.lines[0], (x) => { return x.id == targetTile.id });

            if (tileLinePosition == -1)
                return false;

            if (tileLinePosition == (this.lines[0].length) - 1)
                return false;

            if (targetTile.letter.isBlank())
                return true;

            var firstBlankRightOfTileIndex = _.findIndex(this.lines[0].slice(tileLinePosition), (x) => { return x.letter.isBlank() });

            if (firstBlankRightOfTileIndex == -1)
                return false;

            return true;
        }

        public canShuntDown(targetTile: Tile): boolean {

            var line = this.lines[1];

            var tileLinePosition = _.findIndex(line, (x) => { return x.id == targetTile.id });

            if (tileLinePosition == -1)
                return false;

            if (tileLinePosition == (line.length) - 1)
                return false;

            if (targetTile.letter.isBlank())
                return true;

            var firstBlankRightOfTileIndex = _.findIndex(line.slice(tileLinePosition), (x) => { return x.letter.isBlank() });

            if (firstBlankRightOfTileIndex == -1)
                return false;

            return true;
        }

        public canShuntLeft(targetTile: Tile): boolean {
            var tileLinePosition = _.findIndex(this.lines[0], (x) => { return x.id == targetTile.id });

            if (tileLinePosition == -1)
                return false;

            if (tileLinePosition == 0)
                return false;

            if (targetTile.letter.isBlank())
                return true;

            var firstBlank = this.getFirstBlankToLeftOfTile(targetTile);

            if (firstBlank == -1)
                return false;

            return true;
        }

        public canShuntUp(targetTile: Tile): boolean {
            var line = this.lines[1];

            var tileLinePosition = _.findIndex(line, (x) => { return x.id == targetTile.id });

            if (tileLinePosition == -1)
                return false;

            if (tileLinePosition == 0)
                return false;

            if (targetTile.letter.isBlank())
                return true;

            var firstBlank = this.getFirstBlankAboveTile(targetTile);

            if (firstBlank == -1)
                return false;

            return true;
        }

        public canShuntRackRight(targetTile: Tile): boolean {
            var tileLinePosition = _.findIndex(this.rack, (x) => { return x.id == targetTile.id });

            if (tileLinePosition == (this.rack.length) - 1)
                return false;

            if (targetTile.letter.isBlank())
                return true;

            var firstBlankRightOfTileIndex = _.findIndex(this.rack.slice(tileLinePosition), (x) => { return x.letter.isBlank() });

            if (firstBlankRightOfTileIndex == -1)
                return false;

            return true;
        }

        public canShuntRackLeft(targetTile: Tile): boolean {
            var tileLinePosition = _.findIndex(this.rack, (x) => { return x.id == targetTile.id });

            if (tileLinePosition == 0)
                return false;

            if (targetTile.letter.isBlank())
                return true;

            var firstBlank = this.getFirstBlankToLeftOfTileOnRack(targetTile);

            if (firstBlank == -1)
                return false;

            return true;
        }

        public isRackTile(tileId: number): boolean {
            var rackTile: Tile = _.find(this.rack, (x) => x.id == tileId);

            if (rackTile == null)
                return false;

            return true;
        }

        public getTile(tileId: number): Tile {

            var rackTile = _.find(this.rack, (x) => x.id == tileId);

            if (rackTile != null)
                return rackTile;

            var boardTile = null;

            _.forEach(this.lines, (line) => {
                boardTile = _.find(line, (x) => x.id == tileId);

                if (boardTile != null)
                    return false;
            });

            return boardTile;
        }

        public getBoardTiles(): Array<Tile> {

            var allTiles = new Array<Tile>();

            _.forEach(this.lines, (line) => {
                _.forEach(line, (tile) => {
                    var existing = _.find(allTiles, (x) => x.id == tile.id);

                    if (existing == null)
                        allTiles.push(tile);
                });
            });

            return allTiles;
        }
    }
}