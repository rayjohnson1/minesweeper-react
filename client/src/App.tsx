import React, { Component } from 'react';
import GameManager from './GameManager/GameManager';

class App extends Component {
  render() {
    return (
      <GameManager boardSize={9} numMines={10} />
    );
  }
}

export default App;