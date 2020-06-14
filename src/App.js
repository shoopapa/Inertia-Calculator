import React, {useState} from 'react';
import Poly from './Poly.js'
import polygeom from './calc.js'
import './App.css';

const getGridSize = (dw) => {
  const wH = window.innerHeight
  const wW = window.innerWidth
  const h = wH - .2*wH
  const w = wW - .2*wW
  const d = Math.round(h < w? h : w)
  const f = d - d%dw

  return f
}


const printPoints = (x,y,dw) => {
  x=x.map(e=> e/dw)
  y=y.map(e=> e/dw)
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
  const [accuracy, setAccuracy] = useState(3)
  const [dw, setDw] = useState(30)
  const [gridSize, setGridSize] = useState(getGridSize(dw))
  const [hoverPoint, setHoverPoint] = useState({x:0,y:gridSize})
  const [points,setPoints]= useState({})
  const [calc, setCalc] = useState({})


  const calcI = (points) => {
    // console.log(gridSize)
      if (Object.keys(points).length > 2) {
      const x = Object.values(points).map(e => e.x)
      const y = Object.values(points).map(e => gridSize - e.y)
      const data = polygeom(x,y)

      setCalc(data)
      // console.log("Raw: ",data)
      printPoints(x,y,dw)
    }
  }

  const renderList = () => {
    const dw2 = dw**2
    const dw4 = dw**4

    return (
      <ul>
        <li>
          {"Area: " + (calc.centriod.A/dw2).toFixed(accuracy) }
        </li>
        <li>
          {`Cen:  (${(calc.centriod.x_cen/dw).toFixed(accuracy)}, ${(calc.centriod.y_cen/dw).toFixed(accuracy)})` }
        </li>
        <li>
          {"Ix:    " + (calc.Iuu/dw4).toFixed(accuracy) }
        </li>
        <li>
          {"Iy:    " + (calc.Ivv/dw4).toFixed(accuracy) }
        </li>
        <li>
          {"J:     " + (calc.J/dw4).toFixed(accuracy) }
        </li>
        <li style ={{color:"red"}}>
          { `I₁:    ${(calc.ILocy.I/dw4).toFixed(accuracy)} ∡ ${(calc.ILocy.ang_horz).toFixed(accuracy)}°`}
        </li>
        <li style ={{color:"green"}}>
          { `I₂:    ${(calc.ILocx.I/dw4).toFixed(accuracy)} ∡ ${(calc.ILocx.ang_horz).toFixed(accuracy)}°`}
        </li>
      </ul>
    )
  }

  const changeDw = (up) => {
    const newDw = up? dw-5: dw+5
    setDw(newDw)
    setGridSize(getGridSize(newDw))
  }

  return (
    <div className="App-header">
      <div>
        <p style={{fontSize:"1.5vh"}}>
          {`(${(hoverPoint.x/dw).toFixed(accuracy)}, ${((gridSize-hoverPoint.y)/dw).toFixed(accuracy)})`}
        </p>
        <Poly 
          setHoverPoint={setHoverPoint}
          calcI={calcI}
          points={points}
          setPoints={setPoints}
          I={Object.keys(points).length > 2? calc : "no"}
          gridSize={gridSize}
          dw={dw}
          snap={dw/4}
        />
        <div className="Grid-size">
        <button onClick={() => changeDw(false)}>-</button>
          <p style={{fontSize:"1.5vh"}}>
            {`${((gridSize )/dw)}x${((gridSize )/dw)}`}
          </p>
          <button onClick={() => changeDw(true)}>+</button>
        </div>
      </div>
      <></>
      
      <div className="Search">
        {(Object.keys(points).length > 2)? renderList() : <ul><li></li></ul> }
      </div>
    </div>
  );
}

export default App