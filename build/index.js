"use strict";

var _GameController = _interopRequireDefault(require("./GameController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var game = new _GameController.default(10, 20);
game.logHash();
var board = document.getElementById("board");

for (var i = 0; i < game.gameBoardMatrix.length; i++) {
  var row = document.createElement('div');
  row.classList.add('row');
  board.appendChild(row);

  for (var j = 0; j < game.gameBoardMatrix[i].length; j++) {
    var tile = document.createElement('div');
    tile.classList.add('tile');
    row.appendChild(tile);
  }
}