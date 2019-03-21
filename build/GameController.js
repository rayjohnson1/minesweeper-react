"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GameController =
/*#__PURE__*/
function () {
  _createClass(GameController, [{
    key: "gameBoardMatrix",
    get: function get() {
      return this._gameBoardMatrix;
    }
  }]);

  function GameController(boardSize, numBombs) {
    _classCallCheck(this, GameController);

    this._gameBoardMatrix = [];
    this._gameBoardList = {};
    this.initBoard(boardSize, numBombs);
  }

  _createClass(GameController, [{
    key: "initBoard",
    value: function initBoard(boardSize, numBombs) {
      var numTiles = boardSize * boardSize;
      var tilesLeftToAdd = numTiles;
      var bombsAdded = 0;
      var tileId = 1;

      for (var i = 0; i < boardSize; i++) {
        this._gameBoardMatrix[i] = [];

        for (var j = 0; j < boardSize; j++) {
          var bombsToAdd = numBombs - bombsAdded;
          var percentageToBeBomb = bombsToAdd / tilesLeftToAdd;
          var isBomb = Math.random() < percentageToBeBomb;
          if (isBomb) bombsAdded++;
          var tile = {
            id: tileId,
            isBomb: isBomb,
            isMined: false,
            neighboringBombs: 0,
            neighbors: {},
            matrixCoordinate: {
              x: i,
              y: j
            }
          };
          this._gameBoardMatrix[i][j] = tile;
          this._gameBoardList[tileId] = tile;
          tilesLeftToAdd--;
          tileId++;
        }
      }

      this.initNeighbors();
    }
  }, {
    key: "initNeighbors",
    value: function initNeighbors() {
      for (var _tileId in this._gameBoardList) {
        var tile = this._gameBoardList[_tileId];

        if (tile.matrixCoordinate.x + 1 > 0 && tile.matrixCoordinate.x + 1 < this._gameBoardMatrix.length) {
          var neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x + 1][tile.matrixCoordinate.y];
          tile.neighbors[neighbor.id] = neighbor;
        }

        if (tile.matrixCoordinate.x - 1 > 0 && tile.matrixCoordinate.x - 1 < this._gameBoardMatrix.length) {
          var _neighbor = this._gameBoardMatrix[tile.matrixCoordinate.x - 1][tile.matrixCoordinate.y];
          tile.neighbors[_neighbor.id] = _neighbor;
        }

        if (tile.matrixCoordinate.y + 1 > 0 && tile.matrixCoordinate.y + 1 < this._gameBoardMatrix.length) {
          var _neighbor2 = this._gameBoardMatrix[tile.matrixCoordinate.x][tile.matrixCoordinate.y + 1];
          tile.neighbors[_neighbor2.id] = _neighbor2;
        }

        if (tile.matrixCoordinate.y - 1 > 0 && tile.matrixCoordinate.y - 1 < this._gameBoardMatrix.length) {
          var _neighbor3 = this._gameBoardMatrix[tile.matrixCoordinate.x][tile.matrixCoordinate.y - 1];
          tile.neighbors[_neighbor3.id] = _neighbor3;
        }

        if (tile.matrixCoordinate.y + 1 > 0 && tile.matrixCoordinate.y + 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x + 1 > 0 && tile.matrixCoordinate.x + 1 < this._gameBoardMatrix.length) {
          var _neighbor4 = this._gameBoardMatrix[tile.matrixCoordinate.x + 1][tile.matrixCoordinate.y + 1];
          tile.neighbors[_neighbor4.id] = _neighbor4;
        }

        if (tile.matrixCoordinate.y - 1 > 0 && tile.matrixCoordinate.y - 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x - 1 > 0 && tile.matrixCoordinate.x - 1 < this._gameBoardMatrix.length) {
          var _neighbor5 = this._gameBoardMatrix[tile.matrixCoordinate.x - 1][tile.matrixCoordinate.y - 1];
          tile.neighbors[_neighbor5.id] = _neighbor5;
        }

        if (tile.matrixCoordinate.y - 1 > 0 && tile.matrixCoordinate.y - 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x + 1 > 0 && tile.matrixCoordinate.x + 1 < this._gameBoardMatrix.length) {
          var _neighbor6 = this._gameBoardMatrix[tile.matrixCoordinate.x + 1][tile.matrixCoordinate.y - 1];
          tile.neighbors[_neighbor6.id] = _neighbor6;
        }

        if (tile.matrixCoordinate.y + 1 > 0 && tile.matrixCoordinate.y + 1 < this._gameBoardMatrix.length && tile.matrixCoordinate.x - 1 > 0 && tile.matrixCoordinate.x - 1 < this._gameBoardMatrix.length) {
          var _neighbor7 = this._gameBoardMatrix[tile.matrixCoordinate.x - 1][tile.matrixCoordinate.y + 1];
          tile.neighbors[_neighbor7.id] = _neighbor7;
        }

        for (var neighborId in tile.neighbors) {
          var _neighbor8 = tile.neighbors[neighborId];
          if (_neighbor8.isBomb) tile.neighboringBombs++;
        }
      }
    }
  }, {
    key: "logTiles",
    value: function logTiles() {
      console.log(this._gameBoardMatrix);
    }
  }, {
    key: "logHash",
    value: function logHash() {
      console.log(this._gameBoardList);
    }
  }]);

  return GameController;
}();

exports.default = GameController;