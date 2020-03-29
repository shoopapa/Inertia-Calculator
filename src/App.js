import React, {useState} from 'react';
import Poly from './Poly.js'
import polygeom from './calc.js'
import './App.css';

const gridSize = () => {
  const wH = window.innerHeight
  const wW = window.innerWidth
  const h = wH - .25*wH
  const w = wW - .25*wW
  const d = h<w? h : w
  const f = d - d%40 + 1
  return f
}
let size = (gridSize()-1)/40 

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

const App = () => {
  const [boardState, setBoardState] = useState(genBoard(size))
  const [points,setPoints]= useState({})
  const [calc, setCalc] = useState({})
  
  const calcI = (points) => { if (Object.keys(points).length > 2) {
    const x = Object.values(points).map(e => e[0])
    const y = Object.values(points).map(e => e[1])
    const data = polygeom(x,y)
    setCalc(data)
  }}
  // console.log(calc)

  

  return (
    <div className="App-header">
      <Poly 
        boardState={boardState}
        setBoardState={setBoardState}
        points={points}
        setPoints={setPoints}
        axis={Object.keys(points).length > 2? calc : "no"}
        gridSize={() => gridSize()}
        calcI={calcI}
        size={size}
      />
      <div className="Search">
        <ul>
          <li style ={{color:"red"}}>
            {(Object.keys(points).length > 2)? calc.ILocx.I : ""}
          </li>
          <li style ={{color:"green"}}>
            {(Object.keys(points).length > 2)? calc.ILocy.I : ""}
          </li>

        </ul>
      </div>
    </div>
    
  );
}

export default App