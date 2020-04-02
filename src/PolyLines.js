import React from 'react'

const PolyLines = ({points,height}) => {
  points = Object.values(points).map(e=> [ 40*(e[0])  ,40*((height-e[1])) ] )
  const p = points
  const pp = p.map((_,i) => (i === p.length - 1) ? p[0] : p[i+1])

  const line = () => {
    return (
      p.map( (_,i)=> { return (
          <line 
            key={i}
            x1={p[i][0]} 
            y1={p[i][1]} 
            x2={pp[i][0]} 
            y2={pp[i][1]}
            style={{
              stroke:(i === p.length-1)? 'rgb(15, 143, 255)' : "rgb(176, 200, 221)",
              strokeWidth:2 
            }}
          />
      )})
    )
  }

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {points.length > 1 ? line() : ""}
    </svg>
  );
}

export default PolyLines
