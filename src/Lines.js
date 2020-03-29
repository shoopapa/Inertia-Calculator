import React from 'react'
import { solveQP } from 'numeric'

const Lines = ({points, height, axis}) => {
  points = Object.values(points).map(e=> [ 40*(e[0])  ,40*((height-e[1])) ] )
  const p = points
  const pp = p.map((_,i) => (i === p.length -1) ? p[0] : p[i+1])

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


  const drawAxis = () => { if ( axis !== "no") {
    const {x_cen:x0, y_cen:y0} = axis.centriod
    const slope1 = Math.tan(Math.PI/180 * axis.ILocx.ang_horz)
    const slope2 = Math.tan(Math.PI/180 * axis.ILocy.ang_horz)


    
      if ( slope1 === 0|| slope2 === 0) { return (
        <g>
          <line 
            x1={ 40*x0     } 
            y1={ 0         } 
            x2={ 40*x0     } 
            y2={ 40*height }
            style={{
              stroke:'green',
              strokeWidth:1
            }}
          />
          <line 
            x1={  0                 } 
            y1={  40*(height - y0)  } 
            x2={  40*height         } 
            y2={  40*(height - y0)  }
            style={{
              stroke:'red',
              strokeWidth:1
            }}
          />
        </g>
      )} else { return (
        <g>
          <line 
            x1={0} 
            y1={ 40*(height - (y0-slope1*x0))} 
            x2={height*40} 
            y2={ 40*(height - (slope1*(height-x0)+y0)) }
            style={{
              stroke:'red',
              strokeWidth:1
            }}
          />
          <line 
            x1={0} 
            y1={ 40*(height - (y0-slope2*x0))} 
            x2={height*40} 
            y2={ 40*(height - (slope2*(height-x0)+y0)) }
            style={{
              stroke:'green',
              strokeWidth:1
            }}
          />
        </g>
      )}
  }}
    

  

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {points.length > 1 ? line() : ""}
      {drawAxis(axis)}
    </svg>
  );
}

export default Lines
