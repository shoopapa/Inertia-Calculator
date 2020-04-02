import React, {useState} from 'react';
import Board from "./Board.js";
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
  const [boardState, setBoardState] = useState(genBoard(size))

  const squareOff = (l) => {
    setBoardState({ 
      ...boardState, 
      [l]: {...boardState[l], selected: false}
    })
    const {[l]:bye, ...keep} = points
    setPoints(keep)
    calcI(keep)
  }

  const squareOn = (loc) => {
    setBoardState({ 
      ...boardState, 
      [loc]: {...boardState[loc], selected: true}
    })
    const newPoints = {...points, [loc]:[ boardState[loc].x, boardState[loc].y ]}
    calcI(newPoints)
    setPoints(newPoints)
    
  }

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
      style={{ width:gridSize + 40,  height:gridSize + 40 }} 
    >
      { renderFit(<Grid/>) }

      { ( I !== "no")? renderFit( <Axis points={points} height={size} I={I}/>): ""}

      { renderFit( <PolyLines points={points} height={size} /> ) }

      <div className='Overlay' >
        <Board 
          nxn={size} 
          squareOn={squareOn} 
          squareOff={squareOff} 
          boardState={boardState} 
        />
      </div>
    </div>
  );
  
}

export default Poly;


