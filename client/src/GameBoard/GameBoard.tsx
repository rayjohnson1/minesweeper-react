import React from 'react';
import { IGameBoardTileActions, Row } from '../GameManager/GameManager';
import { GameBoardMatrix } from '../GameManager/GameController';

interface IGameBoardProps {
    boardSize: number;
    gameBoardMatrix: GameBoardMatrix;
    tileActions: IGameBoardTileActions
}

export default function GameBoard(props: IGameBoardProps) {
    return (
        <div className={`game-board`} style={{gridTemplateRows: `repeat(${props.boardSize}, 50px)`}}>
            {
                props.gameBoardMatrix.map((row, i) => <Row key={i} tiles={row} tileActions={{...props.tileActions}} />)
            }
        </div>
    )
}
