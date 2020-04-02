import React from 'react'

const PolyLines = ({points,height}) => {
  const p = Object.values(points)
  const pp = p.map((_,i) => (i === p.length - 1) ? p[0] : p[i+1])
  console.log(p)
  const line = () => {
    return (
      p.map( (_,i)=> { 

        console.log(p[i])
        return (
          <line 
            key={i}
            x1={p[i].x} 
            y1={p[i].y} 
            x2={pp[i].x} 
            y2={pp[i].y}
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
      {line() }
    </svg>
  );
}

export default PolyLines
