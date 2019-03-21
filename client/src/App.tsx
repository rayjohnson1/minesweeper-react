import React, { Component } from 'react';
import GameBoard from './GameBoard/GameBoard';

class App extends Component {
  render() {
    return (
      <GameBoard numMines={10} boardSize={9} />
    );
  }
}

export default App;
