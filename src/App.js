import React, {useState} from 'react';
import Poly from './Poly.js'
import polygeom from './calc.js'
import './App.css';

const getGridSize = () => {
  const wH = window.innerHeight
  const wW = window.innerWidth
  const h = wH - .25*wH
  const w = wW - .25*wW
  const d = h < w? h : w
  const f = d - d%40 + 1
  return f
}

const gridSize = getGridSize() 
const dim = (gridSize-1)/40 + 1

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
      if (Object.keys(points).length > 2) {
      const x = Object.values(points).map(e => e[0])
      const y = Object.values(points).map(e => e[1])
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
        { calc.ILocx.I }
      </li>
      <li style ={{color:"green"}}>
        { calc.ILocy.I }
      </li>
      
    </ul>
  )}

  return (
    <div className="App-header">
      <Poly 
        calcI={calcI}
        points={points}
        setPoints={setPoints}
        I={Object.keys(points).length > 2? calc : "no"}
        gridSize={gridSize+40}
        size={dim}
      />
      <div className="Search">
        {(Object.keys(points).length > 2)? renderList() : "" }
      </div>
    </div>
    
  );
}

export default App