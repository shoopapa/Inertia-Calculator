import React, {useState} from 'react';
import "./Board.css"


const Point = ({x, y, remove, size, l, setHoverPoint }) => {
  size = size? size : 4
  const [r, setr] = useState(size)
  return (
    <circle 
      onMouseEnter={() => {setr(size + .3*size); setHoverPoint({x,y})}}
      onMouseLeave={() => {setr(size); setHoverPoint({x,y})}}
      onClick={ () => { remove(l); setr(size) } }
      cx={x}
      cy={y} 
      r={r}
      fill= '#ffffff' 
    />
  );
}

const roundToSnap = (x,y,snap, dw) => {
    let dx = x%dw
    dx = dx <= snap? dx : dx - dw
    let dy = y%dw
    dy = dy <= snap? dy : dy - dw

    if ( (Math.abs(dx) <= snap ) && (Math.abs(dy)) <= snap ) {
      x = x - dx
      y = y - dy
    } 

    return [x,y]
}

const Board2 = ({points, setPoints, dw, snap, calcI, setHoverPoint}) => {

  const getCord = e => {
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.
    const r = roundToSnap(x,y,snap,dw)

    return {x:r[0],y:r[1]}
  }

  const addPoint = e => {
    const rect = e.target.getBoundingClientRect();
    if(!(rect.width < 20)) {
      const p = getCord(e)
      // console.log(p.x,p.y)
      const newPoints = {...points, [ `${p.x} ${p.y}` ]:{ x:p.x ,y:p.y} }
      calcI(newPoints)
      setPoints( newPoints )
    }
  }

  const removePoint = (l) => {
    console.log(l)
    const {[l]:bye, ...keep} = points
    calcI( keep )
    setPoints( keep )
  }

  const renderPoints = () => { return (
    Object.values(points).map(e=>{
      const l = `${e.x} ${e.y}`
      return (
        <Point
          l={l} 
          key={l}
          setHoverPoint={setHoverPoint}
          remove={removePoint}
          x={e.x}
          y={e.y}
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
