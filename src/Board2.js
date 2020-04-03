import React, {useState} from 'react';
import "./Board.css"


const Point = ({x, y, remove, size, dw }) => {
  size = size? size : 4
  const [r, setr] = useState(size)
  const l = `${x} ${y}`

  return (
    <circle 
      onMouseEnter={() => setr(size + .5*size)}
      onMouseLeave={() => setr(size)}
      onClick={ () => { remove(l); setr(size) } }
      key={`${x} ${y}`}
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

const Board2 = ({points, setPoints, dw, snap, calcI}) => {

  const getCord = e => {
    const rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left; //x position within the element.
    let y = e.clientY - rect.top;  //y position within the element.
    const r = roundToSnap(x,y,snap,dw)

    return {x:r[0],y:r[1]}
  }

  const addPoint = (e,r) => {
    const rect = e.target.getBoundingClientRect();
    if(!(rect.width < 20)) {
      const p = getCord(e)
      const newPoints = {...points, [ `${p.x} ${p.y}` ]:{ x:p.x ,y:p.y} }
      calcI(newPoints)
      setPoints( newPoints )
    }
  }

  const removePoint = (l) => {
    const {[l]:bye, ...keep} = points
    calcI( keep )
    setPoints( keep )
  }

  const renderPoints = () => { return (
    Object.values(points).map(e=>{
      return (
        <Point 
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
