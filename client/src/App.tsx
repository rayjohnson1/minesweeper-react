import React, { Component } from 'react';
import GameManager from './GameManager/GameManager';

class App extends Component {
  render() {
    return (
      <GameManager boardSize={15} numMines={40} />
    );
  }
}

export default App;