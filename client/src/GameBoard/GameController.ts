export interface Tile {
    id: number,
    isMine: boolean,
    isUncovered: boolean,
    neighboringBombs: number,
    neighbors: TileHash
    matrixCoordinate: {
        x: number,
        y: number
    }
}

export interface TileHash {
    [tileId: number]: Tile 
}

export type GameBoardMatrix = Tile[][];

export default class GameController {

    private _gameBoardMatrix: GameBoardMatrix;
    private _gameBoardList: TileHash;

    public get gameBoardMatrix(): GameBoardMatrix {
        return this._gameBoardMatrix;
    }

    public get gameBoardList(): TileHash {
        return this._gameBoardList;
    }

    constructor(boardSize: number, numBombs: number){

        this._gameBoardMatrix = [];
        this._gameBoardList = {};

        this.initBoard(boardSize, numBombs);

    }

    initBoard(boardSize: number, numBombs: number){

        const numTiles = boardSize*boardSize;
        let tilesLeftToAdd = numTiles;
        let minesAdded = 0;
        let tileId = 1;

        for(let i = 0; i < boardSize; i++){

            this._gameBoardMatrix[i] = [];

            for(let j = 0; j < boardSize; j++){

                const bombsToAdd = numBombs - minesAdded;

                const percentageToBeBomb = bombsToAdd / tilesLeftToAdd;

                const isMine = Math.random() < percentageToBeBomb;
                if(isMine)
                    minesAdded++;


                const tile: Tile = {
                    id: tileId,
                    isMine,
                    isUncovered: false,
                    neighboringBombs: 0,
                    neighbors: {},
                    matrixCoordinate: {
                        x: i,
                        y: j
                    }
                }

                this._gameBoardMatrix[i][j] = tile;
                this._gameBoardList[tileId] = tile;

                tilesLeftToAdd--;
                tileId++;

            }

        }

        this.initNeighbors();

    }

    initNeighbors(){

        for(let tileId in this._gameBoardList){
            const tile = this._gameBoardList[tileId];

            if(tile.matrixCoordinate.x + 1 >= 0 && tile.matrixCoordinate.x + 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x + 1][tile.matrixCoordinate.y];
                tile.neighbors[neighbor.id] = neighbor;
                
            }

            if(tile.matrixCoordinate.x - 1 >= 0 && tile.matrixCoordinate.x - 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x - 1][tile.matrixCoordinate.y];
                tile.neighbors[neighbor.id] = neighbor;
            }




            if(tile.matrixCoordinate.y + 1 >= 0 && tile.matrixCoordinate.y + 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x][tile.matrixCoordinate.y + 1];
                tile.neighbors[neighbor.id] = neighbor;
            }

            if(tile.matrixCoordinate.y - 1 >= 0 && tile.matrixCoordinate.y - 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x][tile.matrixCoordinate.y - 1];
                tile.neighbors[neighbor.id] = neighbor;
            }




            if(tile.matrixCoordinate.y + 1 >= 0 && tile.matrixCoordinate.y + 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x + 1 > 0 && tile.matrixCoordinate.x + 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x + 1][tile.matrixCoordinate.y + 1];
                tile.neighbors[neighbor.id] = neighbor;
            }

            if(tile.matrixCoordinate.y - 1 >= 0 && tile.matrixCoordinate.y - 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x - 1 > 0 && tile.matrixCoordinate.x - 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x - 1][tile.matrixCoordinate.y - 1];
                tile.neighbors[neighbor.id] = neighbor;
            }




            if(tile.matrixCoordinate.y - 1 > 0 && tile.matrixCoordinate.y - 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x + 1 > 0 && tile.matrixCoordinate.x + 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x + 1][tile.matrixCoordinate.y - 1];
                tile.neighbors[neighbor.id] = neighbor;
            }

            if(tile.matrixCoordinate.y + 1 > 0 && tile.matrixCoordinate.y + 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x - 1 > 0 && tile.matrixCoordinate.x - 1 < this._gameBoardMatrix.length){
                const neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x - 1][tile.matrixCoordinate.y + 1];
                tile.neighbors[neighbor.id] = neighbor;
            }



            for(let neighborId in tile.neighbors){
                const neighbor = tile.neighbors[neighborId];
                if(neighbor.isMine)
                    tile.neighboringBombs++;
            }
            
        }


    }



    logTiles(){
        console.log(this._gameBoardMatrix)
    }

    logHash(){
        console.log(this._gameBoardList);
    }

}