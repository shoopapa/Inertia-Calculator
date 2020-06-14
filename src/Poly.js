import React from 'react';
import Board2 from "./Board2.js";
import Grid from './Grid.js';
import PolyLines from './PolyLines'
import './App.css';
import './Board.css'
import Axis from './Axis.js'

const Poly = ({ points, setPoints, I, gridSize, calcI, dw, setHoverPoint, snap}) => {

  const renderFit = (comp) => {return (
    <div  
        className='Overlay'
        style={{ width:gridSize + 1 ,  height:gridSize +1 }} 
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
          setHoverPoint={setHoverPoint}
          dw={dw} 
          snap={snap} 
          points={points} 
          setPoints={setPoints} 
          calcI={calcI}
        />
      )}
    </div>
  );
  
}

export default Poly;