import React from 'react';
import Board2 from "./Board2.js";
import Grid from './Grid.js';
import PolyLines from './PolyLines'
import './App.css';
import './Board.css'
import Axis from './Axis.js'

const Poly = ({ points, setPoints, I, gridSize, calcI, dw}) => {

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
      { renderFit(<Grid dw={dw}/>) }

      { ( I !== "no")? renderFit( <Axis points={points} height={gridSize} I={I}/>): ""}

      { renderFit( <PolyLines points={points} height={gridSize} /> ) }

      { renderFit (
        <Board2 
          dw={dw} 
          snap={7} 
          points={points} 
          setPoints={setPoints} 
          calcI={calcI}
        />
      )}
    </div>
  );
  
}

export default Poly;