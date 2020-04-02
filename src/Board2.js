import React from 'react';
import "./Board.css"


const Point = ({x, y}) => {
  return (
    <circle 
      id={`${x} ${y}`}
      key={`${x} ${y}`}
      cx={x}
      cy={y} 
      r="4" 
      fill= '#ffffff' 
    />
  );
}

const Board2 = ({points, setPoints}) => {

  const getCord = e => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; //x position within the element.
    const y = e.clientY - rect.top;  //y position within the element.
    console.log( [x,y] )
    return {x,y}
  }

  const addPoint = e => {
    const p = getCord(e)
    setPoints( {...points, [ `${p.x} ${p.y}` ]:{ x:p.x ,y:p.y} } )
  }

  const renderPoints = () => { return (
    Object.values(points).map(e=>{
      return (
        <Point 
          x={e.x}
          y={e. y}
        />
      )
    })
  )}
  

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"
      onClick = { addPoint.bind(this) }
    >
      {renderPoints()}
    </svg>
  );
}

export default Board2;
