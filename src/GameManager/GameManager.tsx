import React, { Component } from 'react'
import GameController, { TileHash, GameBoardMatrix, Tile } from './GameController';
import mineImg from '../assets/images/mine.png';
import flagImg from '../assets/images/flag.png';
import GameBoard from '../GameBoard/GameBoard';

interface IProps {
    boardSize: number;
    numMines: number;
    gameState: {
        inProgress: boolean,
        playerWon: () => void;
        playerLost: () => void;
        didWin: boolean,
        didLoose: boolean,
        canInteract: boolean,
    }
}

interface IState {
    gameBoardMatrix: GameBoardMatrix;
    gameBoardList: TileHash;
    numTiles: number;
    numTilesRemaining: number;
}

export default class GameManager extends Component<IProps, IState> {

    private _gameController: GameController;

    constructor(props: IProps){
        super(props);

        this._gameController = new GameController(this.props.boardSize, this.props.numMines);

        const numTiles = this.props.boardSize * this.props.boardSize;

        this.state = {
            gameBoardMatrix: this._gameController.gameBoardMatrix,
            gameBoardList: this._gameController.gameBoardList,
            numTiles,
            numTilesRemaining: numTiles,
        }

    }

    initGame = () => {
        this._gameController = new GameController(this.props.boardSize, this.props.numMines);
    }

    componentDidUpdate(){
        this.checkIfWon();
    }

    handleUncoverTileClick = (e: React.MouseEvent) => {

        e.preventDefault();

        if(this.props.gameState.canInteract === false)
            return;

        let tileId = e.currentTarget.getAttribute('data-tile-id') as unknown as number;
        this.uncoverTile(tileId);

    }

    uncoverTile = async (tileId: number) => {

        const tile = this.state.gameBoardList[tileId];
        if(tile.isFlagged || tile.isUncovered)
            return;

        const newState = this.state.gameBoardList;
        newState[tileId].isUncovered = true;

        if(tile.isMine){

            const newState = this.state.gameBoardList;
            newState[tileId].clickedMine = true;

            this.revealAllTiles();
            this.props.gameState.playerLost();
            return;
        }



        this.setState((state, props) => {
            return {
                gameBoardList: newState,
                numTilesRemaining: state.numTilesRemaining - 1
            }
        });

            
          

        if(tile.neighboringBombs === 0){
            this.zeroLoop(tile);
        }

    }


    revealAllTiles = () => {

        let newGameboardList = this.state.gameBoardList;

        for(let tileId in newGameboardList){
            const tile = newGameboardList[tileId];
            tile.isUncovered = true;
        }

        this.setState({ gameBoardList: newGameboardList });
    }

    zeroLoop(tile: Tile){

        if(!tile.isUncovered)
            this.uncoverTile(tile.id);

        for(let tileId in tile.neighbors){
            const curTile = tile.neighbors[tileId];

            if(curTile.isUncovered || curTile.isFlagged)
                continue;
            else if(curTile.neighboringBombs === 0)
                this.zeroLoop(curTile);
            else if(!curTile.isMine)
                this.uncoverTile(curTile.id);
                
        }

    }

    handleFlagTileClick = (e: React.MouseEvent) => {
        e.preventDefault();

        if(this.props.gameState.canInteract === false)
            return;

        let tileId = e.currentTarget.getAttribute('data-tile-id') as unknown as number;
        if(this.state.gameBoardList[tileId].isUncovered)
            return;

        this.toggleFlag(tileId);

    }

    toggleFlag = (tileId: number) => {
        
        const newState = this.state.gameBoardList;
        newState[tileId].isFlagged = !newState[tileId].isFlagged;

        this.setState({ gameBoardList: newState });

    }

    checkIfWon = () => {

        if(this.props.gameState.didWin === false){
            if(this.state.numTilesRemaining === this.props.numMines){
                this.props.gameState.playerWon();
            }
        }
    }


    render() {

        return (
            <React.Fragment>
                <GameBoard 
                    gameBoardMatrix={this.state.gameBoardMatrix}
                    boardSize={this.props.boardSize}
                    tileActions={{
                        uncoverTile: this.handleUncoverTileClick,
                        toggleFlag: this.handleFlagTileClick
                    }}
                />
            </React.Fragment>
        )
    }
}

export interface IGameBoardTileActions {

    uncoverTile: (e: React.MouseEvent) => void;
    toggleFlag: (e: React.MouseEvent) => void;

}

export interface IRowProps { 
    tiles: Tile[];
    tileActions: IGameBoardTileActions;
}

export const Row = (props: IRowProps) => {
    return (
        <div className={`game-board__row`} style={{ gridTemplateColumns: `repeat(${props.tiles.length}, 50px)` }}>{
            props.tiles.map(tile => {

                return (
                    <BoardTile 
                        key={tile.id}
                        {...tile}
                        actions={props.tileActions}
                        children={() => (
                            <React.Fragment>
                                { tile.isFlagged && <FlaggedTile /> }
                                { !tile.isUncovered && <CoveredTile /> }
                                { tile.isUncovered && tile.isMine ? <MineTile clicked={tile.clickedMine} /> : <NumberTile value={tile.neighboringBombs} /> }
                            </React.Fragment>
                        )} />
                );
                
            })
        }</div>
    )
}



export const CoveredTile = () => {
    return (
        <div className={`tile--covered`}></div>
    )
}

export const FlaggedTile = () => {
    return (
        <div className={`tile--flagged`}>
            <img src={flagImg} />
        </div>
    )
}

export const MineTile = (props: { clicked: boolean }) => {
    return (
        <div className={`tile--mine ${props.clicked ? 'tile--mine--clicked' : '' }`}>
            <img src={mineImg} />
        </div>
    )
}

export const NumberTile = (props: { value: number }) => {
    return (
        <div className={`tile--number`}>
            { props.value === 0 && <p>{''}</p> }
            { props.value === 1 && <p style={{color: 'blue'}}>{ props.value }</p>}
            { props.value === 2 && <p style={{color: 'green'}}>{ props.value }</p>}
            { props.value === 3 && <p style={{color: 'red'}}>{ props.value }</p>}
            { props.value === 4 && <p style={{color: 'purple'}}>{ props.value }</p>}
            { props.value > 4 && <p style={{color: 'orange'}}>{ props.value }</p>}
        </div>
    )
}














interface IBoardTileProps extends Tile {
    actions: IGameBoardTileActions;
    children: () => JSX.Element
}

const BoardTile = (props: IBoardTileProps) => {

    return (
        <div
            className={`tile`}
            data-tile-id={props.id}
            onClick={props.actions.uncoverTile}
            onContextMenu={props.actions.toggleFlag}
        >
            { props.children() }
        </div>
    );

}