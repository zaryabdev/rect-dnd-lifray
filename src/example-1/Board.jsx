import { useEffect, useState } from "react";
import { BoardSquare } from "./BoardSquare.jsx";
import { Piece } from "./Piece.jsx";
/** Styling properties applied to the board element */
const boardStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
    flexWrap: "wrap",
};
/** Styling properties applied to each square element */
const squareStyle = { width: "16.6%", height: "16.6%" };
/**
 * The chessboard component
 * @param props The react props
 */
export const Board = ({ game }) => {
    const [[knightX, knightY], setKnightPos] = useState(game.knightPosition);
    useEffect(() => game.observe(setKnightPos));
    function renderSquare(i) {
        const x = i % 6;
        const y = Math.floor(i / 6);
        return (
            <div key={i} style={squareStyle}>
                <BoardSquare x={x} y={y} game={game}>
                    <Piece isKnight={x === knightX && y === knightY} />
                </BoardSquare>
            </div>
        );
    }
    const squares = [];
    for (let i = 0; i < 36; i += 1) {
        squares.push(renderSquare(i));
    }
    return <div style={boardStyle}>{squares}</div>;
};
