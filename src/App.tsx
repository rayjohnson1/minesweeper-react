import React, { Component } from 'react';
import GameManager from './GameManager/GameManager';
import Timer from './Timer/Timer';

interface IState {
  gameInProgress: boolean;
  boardSize: number;
  numMines: number;
  playerWon: boolean;
  playerLost: boolean;
  canInteract: boolean;
  timer: number;
  reset: boolean;
}

class App extends Component<{}, IState> {

  private timer: any;

  constructor(props: {}){
    super(props);

    this.state = {
      gameInProgress: false,
      boardSize: 9,
      numMines: 10,
      playerLost: false,
      playerWon: false,
      timer: 0,
      canInteract: false,
      reset: false,
    }

  }

  handleStartGameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({ gameInProgress: true, reset: true });
    this.startTimer();
  }

  handleChangeRowsAndColumns = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      boardSize: parseInt(e.currentTarget.value)
    })
  }

  handleChangeNumMines = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    this.setState({
      numMines: parseInt(e.currentTarget.value)
    })
  }

  resetGame = (e: React.MouseEvent) => {
    this.setState({
      gameInProgress: false,
      boardSize: 9,
      numMines: 10,
      playerLost: false,
      playerWon: false,
      timer: 0,
      canInteract: false,
      reset: false,
    })
  }

  playerWon = () => {
    this.setState({
      playerWon: true,
      canInteract: false,
    });
    this.stopTimer();
  }

  playerLost = () => {
    this.setState({
      playerLost: true,
      canInteract: false,
      
    });
    this.stopTimer()
  }

  playEasy = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({
      numMines: 10,
      boardSize: 9,
      gameInProgress: true,
      reset: true,
    });
    this.startTimer();
  }

  playExpert = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({
      numMines: 99,
      boardSize: 30,
      gameInProgress: true,
      reset: true,
    })
    this.startTimer();
  }

  playIntermediate = (e: React.MouseEvent) => {
    e.preventDefault();
    this.setState({
      numMines: 40,
      boardSize: 16,
      gameInProgress: true,
      reset: true,
    })
    this.startTimer();
  }

  startTimer = () => {

    if(this.state.canInteract)
      return;

    this.setState({ canInteract: true })
    this.timer = setInterval(() => {

      this.setState((state) => ({
        timer: state.timer + 1
      }))

    }, 1000);

  }

  stopTimer = () => {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className={`grid page-grid`}>
        <div className={`row`}>
        { this.state.playerWon && <h1 style={{color: 'green'}}>You won in {this.state.timer} seconds!</h1> }
        { this.state.playerLost && <h1 style={{color: 'red'}}>You Lost! Your time: {this.state.timer} seconds.</h1> }
        { this.state.playerLost && <button onClick={this.resetGame}>Play Again!</button> }
        { this.state.playerWon && <button onClick={this.resetGame}>Play Again!</button> }
        </div>
        <div className={`row`}>
          <div className={`grid__col`} style={{display: 'grid', gridAutoRows: 'min-content', gridGap: '10px' }}>
          
          <div className={`card`}>
              <div className={`card__item`}>
                <h3>Standard Boards</h3>
              </div>
              <div className={`card__item`}>
                <button onClick={this.playEasy}>Easy</button>
                <ul>
                  <li>Board Size: 9 x 9</li>
                  <li>Number of Mines: 10</li>
                </ul>
              </div>
              <div className={`card__item`}>
                <button onClick={this.playIntermediate}>Intermediate</button>
                <ul>
                  <li>Board Size: 16 x 16</li>
                  <li>Number of Mines: 40</li>
                </ul>
              </div>
              <div className={`card__item`}>
                <button onClick={this.playExpert}>Expert</button>
                <ul>
                  <li>Board Size: 30 x 30</li>
                  <li>Number of Mines: 99</li>
                </ul>
              </div>
            </div>


            <div className={`card`}>
            <div className={`card__item`}>
                <h3>Custom Board</h3>
              </div>
              <div className={`card__item`}>
                <input placeholder={`Rows / Columns`} type={`number`} min={9} max={30} value={this.state.boardSize} onChange={this.handleChangeRowsAndColumns} />
                <input placeholder={`Number of Mines`} type={`number`} min={1} max={400} value={this.state.numMines} onChange={this.handleChangeNumMines} />
              </div>
              <div className={`card__item`}>
                <button onClick={this.handleStartGameClick}>Start Game</button>
              </div>
              <div className={`card__item`}>
                <Timer time={this.state.timer}  />
              </div>
            </div>
            
            
          </div>
          <div className={`grid__col`}>
              { 
                this.state.gameInProgress
                  ? <GameManager gameState={{
                    inProgress: this.state.gameInProgress,
                    playerWon: this.playerWon,
                    playerLost: this.playerLost,
                    didWin: this.state.playerWon,
                    didLoose: this.state.playerLost,
                    canInteract: this.state.canInteract,
                  }} boardSize={this.state.boardSize} numMines={this.state.numMines} />
                  : <div className={`start-game-poster`}><h1>Start a Game!</h1></div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default App;