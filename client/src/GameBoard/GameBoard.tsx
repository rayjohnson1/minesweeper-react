import React, { Component } from 'react'
import GameController, { TileHash, GameBoardMatrix, Tile } from './GameController';

interface IProps {
    boardSize: number;
    numMines: number;
}

interface IState {
    gameBoardMatrix: GameBoardMatrix;
    gameBoardList: TileHash;
}

export default class GameBoard extends Component<IProps, IState> {

    private _gameController: GameController;

    constructor(props: IProps){
        super(props);

        this._gameController = new GameController(this.props.boardSize, this.props.numMines);

        this.state = {
            gameBoardMatrix: this._gameController.gameBoardMatrix,
            gameBoardList: this._gameController.gameBoardList
        }

        

    }

    componentDidMount(){

        
    }

    handleUncoverTileClick = (e: React.MouseEvent) => {

        e.preventDefault();
        let tileId = e.currentTarget.getAttribute('data-tile-id') as unknown as number;
        this.uncoverTile(tileId);

    }

    uncoverTile = (tileId: number) => {

        const tile = this.state.gameBoardList[tileId];
        

        const newState = this.state.gameBoardList;
        newState[tileId].isUncovered = true;

        this.setState({ gameBoardList: newState });


        if(tile.neighboringBombs === 0){
            this.zeroLoop(tile);
        }

        


    }

    zeroLoop(tile: Tile){

        if(!tile.isUncovered)
            this.uncoverTile(tile.id);

        for(let tileId in tile.neighbors){
            const curTile = tile.neighbors[tileId];

            if(curTile.isUncovered)
                continue;
            else if(curTile.neighboringBombs === 0)
                this.zeroLoop(curTile);
            else if(!curTile.isMine)
                this.uncoverTile(curTile.id);
                
        }

    }

    render() {


        return (
            <div className={`game-board`} style={{gridTemplateRows: `repeat(${this.props.boardSize}, 50px)`}}>
                {
                    this.state.gameBoardMatrix.map((row, i) => <Row key={i} tiles={row} tileActions={{ uncoverTile: this.handleUncoverTileClick }} />)
                }
            </div>
        )
    }
}

interface IBoardTileActions {

    uncoverTile: (e: React.MouseEvent) => void;

}

interface IRowProps { 
    tiles: Tile[];
    tileActions: IBoardTileActions;
}

const Row = (props: IRowProps) => {
    return (
        <div className={`row`} style={{ gridTemplateColumns: `repeat(${props.tiles.length}, 50px)` }}>{
            props.tiles.map(tile => <BoardTile key={tile.id} {...tile} actions={props.tileActions} />)
        }</div>
    )
}


interface IBoardTileProps extends Tile {
    actions: IBoardTileActions;
}

const BoardTile = (props: IBoardTileProps) => {

    let tileValue: string | number;

    if(props.isMine)
        tileValue = "MINE";
    else if(props.neighboringBombs === 0)
        tileValue = "";
    else
        tileValue = props.neighboringBombs;

    return (
    
        <div 
            className={`tile ${props.isUncovered ? 'tile--uncovered' : ''}`}
            data-tile-id={props.id}
            onClick={props.actions.uncoverTile}>{tileValue}</div>
    );
}
