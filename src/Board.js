import React from 'react';
import "./Board.css"


const Square = ({squareOn, squareOff, loc, boardState}) => {
  return (
    <svg width="40" height="40" 
      xmlns="http://www.w3.org/2000/svg" 
      onClick ={ ()=> boardState[loc].selected? squareOff(loc) : squareOn(loc) }
      className="Square"
    >
      <circle 
        cx="20" 
        cy="20" 
        r="5" 
        fill={boardState[loc].selected? '#ffffff' : "#ffffff00" }
      />
    </svg>
  );
}

const Board = ({nxn, squareOn, squareOff, boardState}) => {

  const arr = new Array(nxn+1).fill(0);

  const row = (y) => {

    return ( arr.map((_,x)=>{
      const loc = `${x} ${y}`
      // console.log(loc)
      return <Square 
        key = {`${x} ${y}`} 
        loc = {loc}
        squareOn={squareOn} squareOff={squareOff}
        boardState = {boardState}
      />
    })
  )}

  const board = arr.map((_,y) => {

    return <div style={{height:"40px"}}key = {y} >{row(nxn-(y)) }</div>
  })

  return (
    <div>
      <div>{ board }</div>
    </div>
  );
}

export default Board;
