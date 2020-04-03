import React, {useState} from 'react';
import Poly from './Poly.js'
import polygeom from './calc.js'
import './App.css';

const dw = 50

const getGridSize = () => {
  const wH = window.innerHeight
  const wW = window.innerWidth
  const h = wH - .2*wH
  const w = wW - .2*wW
  const d = h < w? h : w
  const f = d - d%dw + 1
  return f
}

const gridSize = getGridSize() 
const dim = (gridSize-1)/dw + 1

const printPoints = (x,y) => {
  let xp = "x = [ "
  x.forEach(e => {
    xp += e.toString() + " "
  });
  xp += "]"
  let yp = "y = [ "
  y.forEach(e => {
    yp += e.toString() + " "
  });
  yp += "]"
  console.log(xp)
  console.log(yp)
}

const App = () => {
  const [points,setPoints]= useState({})
  const [calc, setCalc] = useState({})

  const calcI = (points) => {
    console.log(points)
      if (Object.keys(points).length > 2) {
      const x = Object.values(points).map(e => e.x)
      const y = Object.values(points).map(e => e.y)
      console.log(x,y)
      const data = polygeom(x,y)
      setCalc(data)
      console.log("Raw: ",data)
      printPoints(x,y)
    }
  }

  const renderList = () => {return (
    <ul>
      <li>
         {"Area: " + calc.centriod.A }
      </li>
      <li>
         {`Centriod: (${calc.centriod.x_cen}, ${calc.centriod.x_cen})` }
      </li>
      <li>
         {"Ix " + calc.Iuu }
      </li>
      <li>
         {"Iy " + calc.Ivv }
      </li>
      <li>
         {"J " + calc.J }
      </li>
      <li style ={{color:"red"}}>
        { `${calc.ILocx.I} ∡ ${calc.ILocx.ang_horz}°`}
      </li>
      <li style ={{color:"green"}}>
      { `${calc.ILocy.I} ∡ ${calc.ILocy.ang_horz}°`}
      </li>
      
    </ul>
  )}

  return (
    <div className="App-header">
      <div>
        <Poly 
          calcI={calcI}
          points={points}
          setPoints={setPoints}
          I={Object.keys(points).length > 2? calc : "no"}
          gridSize={gridSize}
          size={dim}
          dw={dw}
          snap={5}
        />
        <p style={{fontSize:"1.5vh"}}>
          {`${gridSize - 1}x${gridSize - 1}`}
        </p>
      </div>
      
      {/* <div className="Search">
        {(Object.keys(points).length > 2)? renderList() : <ul><li></li></ul> }
      </div> */}
    </div>
  );
}

export default App