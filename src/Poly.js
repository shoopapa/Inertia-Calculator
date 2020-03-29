import React from 'react';
import Board from "./Board.js";
import Grid from './Grid.js';
import './App.css';
import Lines from './Lines.js'



const Poly = ({ boardState, setBoardState, points, setPoints, axis, gridSize, size, calcI}) => {


  const squareOff = (l) => {
    console.log(l)
    setBoardState({ 
      ...boardState, 
      [l]: {...boardState[l], selected: false}
    })
    const {[l]:bye, ...keep} = points
    setPoints(keep)
    calcI(keep)
  }

  const squareOn = (loc) => {
    console.log(loc)
    setBoardState({ 
      ...boardState, 
      [loc]: {...boardState[loc], selected: true}
    })
    const newPoints = {...points, [loc]:[ boardState[loc].x, boardState[loc].y ]}
    setPoints(newPoints)
    calcI(newPoints)
  }

  return (
    <div 
      style={{
        width:gridSize() + 40, 
        height:gridSize() + 40,
        display: "flex",
        position:'relative',
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }} 
    >
      <div  
        style={{
          width:gridSize(), 
          height:gridSize(),
          position:'absolute',
        }} 
      >
        < Grid />
      </div>
      <div  
        style={{
          width:gridSize(), 
          height:gridSize(),
          position:'absolute',
        }} 
      >
        <Lines points={points} height={size} axis={axis}/>
      </div>
      <div 
        style={{
          width:gridSize() + 40, 
          height:gridSize() + 40,
          position:'absolute',
        }} 
      >
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


// const getCentroid = () => {
//   const ys = []
//   const xs = []
//   Object.values(boardState).forEach(e=>{
//      if (e.selected) {
//        ys.push(e.y)
//        xs.push(e.x)
//       }
//   })
//   console.log(ys)
//   return [(xs.reduce((a, b) => a + b, 0))/xs.length, (ys.reduce((a, b) => a + b, 0))/ys.length]
// }