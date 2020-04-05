import React, {useState} from 'react';
import Poly from './Poly.js'
import polygeom from './calc.js'
import './App.css';

const getGridSize = (dw) => {
  console.log(dw)
  const wH = window.innerHeight
  const wW = window.innerWidth
  const h = wH - .2*wH
  const w = wW - .2*wW
  const d = Math.round(h < w? h : w)
  console.log(d,d%dw)
  const f = d - d%dw + 1

  return f
}


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
  const [dw, setDw] = useState(30)
  const [gridSize, setGridSize] = useState(getGridSize(dw))
  const [points,setPoints]= useState({})
  const [calc, setCalc] = useState({})


  const calcI = (points) => {
    console.log(points)
      if (Object.keys(points).length > 2) {
      const x = Object.values(points).map(e => e.x)
      const y = Object.values(points).map(e => gridSize - e.y)
      const data = polygeom(x,y)

      setCalc(data)
      console.log("Raw: ",data)
      printPoints(x,y)
    }
  }

  const renderList = () => {
    const dw2 = dw**2
    const dw4 = dw**4
    const accuracy = 3
    return (
      <ul>
        <li>
          {"Area: " + (calc.centriod.A/dw2).toFixed(accuracy) }
        </li>
        <li>
          {`Centriod: (${(calc.centriod.x_cen/dw).toFixed(accuracy)}, ${(calc.centriod.y_cen/dw).toFixed(accuracy)})` }
        </li>
        <li>
          {"Ix: " + (calc.Iuu/dw4).toFixed(accuracy) }
        </li>
        <li>
          {"Iy: " + (calc.Ivv/dw4).toFixed(accuracy) }
        </li>
        <li>
          {"J: " + (calc.J/dw4).toFixed(accuracy) }
        </li>
        <li style ={{color:"red"}}>
          { `${(calc.ILocx.I/dw4).toFixed(accuracy)} ∡ ${(calc.ILocx.ang_horz).toFixed(accuracy)}°`}
        </li>
        <li style ={{color:"green"}}>
        { `${(calc.ILocy.I/dw4).toFixed(accuracy)} ∡ ${(calc.ILocy.ang_horz).toFixed(accuracy)}°`}
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
        <Poly 
          calcI={calcI}
          points={points}
          setPoints={setPoints}
          I={Object.keys(points).length > 2? calc : "no"}
          gridSize={gridSize}
          dw={dw}
          snap={5}
        />
        <div className="Grid-size">
        <button onClick={() => changeDw(false)}>-</button>
          <p style={{fontSize:"1.5vh"}}>
            {`${((gridSize - 1)/dw)}x${((gridSize - 1)/dw)}`}
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