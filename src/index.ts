import GameController from "../client/src/GameBoard/GameController";

const game = new GameController(10, 20);
game.logHash();

const board = document.getElementById("board");

for(let i = 0; i < game.gameBoardMatrix.length; i++){

    const row = document.createElement('div');
    row.classList.add('row');

    board.appendChild(row);
    
    for(let j = 0; j < game.gameBoardMatrix[i].length; j++){

        const tile = document.createElement('div');
        tile.classList.add('tile');

        row.appendChild(tile);
    }
}