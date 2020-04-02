import React, {useState} from 'react';
import Board from "./Board.js";
import Board2 from "./Board2.js";
import Grid from './Grid.js';
import PolyLines from './PolyLines'
import './App.css';
import './Board.css'
import Axis from './Axis.js'

const genBoard = (size) => {
  const genSquare = (x,y,selected) => {
    return { 
      selected,
      x,
      y,
    }
  }

  let board = {}
  for ( let i = 0; i<(size+1)**2; i++) {
    const x = (i)%(size+1) 
    const y = Math.floor( i/(size+1) ) 
    const loc = `${x} ${y}`
    board[loc] = genSquare(x,y,false)
  }
  return board
}

const Poly = ({ points, setPoints, I, gridSize, size, calcI}) => {

  const renderFit = (comp) => {return (
    <div  
        className='Overlay'
        style={{ width:gridSize ,  height:gridSize  }} 
      >
        {comp}
      </div>
  )}

  return (
    <div className='Grid'
      style={{ width:gridSize,  height:gridSize}} 
    >
      { renderFit(<Grid/>) }

      {/* { ( I !== "no")? renderFit( <Axis points={points} height={size} I={I}/>): ""} */}

      { renderFit( <PolyLines points={points} height={gridSize} /> ) }

      {renderFit (<Board2 points={points} setPoints={setPoints}/>)}

    </div>
  );
  
}

export default Poly;


