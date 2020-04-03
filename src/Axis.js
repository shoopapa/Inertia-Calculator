import React from 'react'

const MAxis = ({m,x0,y0,h,color}) => { return (
  <line 
    x1={ 0             } 
    y1={ (y0-m*x0)     } 
    x2={ h             } 
    y2={ (m*(h-x0)+y0) }
    style={{
      stroke:color,
      strokeWidth:1
    }}
  />
)}

const PXAxis = ({x0, h, color}) => { return (
  <line 
    x1={ x0  } 
    y1={ 0   } 
    x2={ x0  } 
    y2={  h  }
    style={{
      stroke: color? color : "white",
      strokeWidth:1
    }}
  />
)}

const PYAxis = ({y0, h, color}) => { return (
  <line 
    x1={  0   } 
    y1={  y0  } 
    x2={  h   } 
    y2={  y0  }
    style={{
      stroke: color? color : "white" ,
      strokeWidth:1
    }}
  />
)}

const Axis = ({height, I}) => {
  let {x_cen:x0, y_cen:y0} = I.centriod
  const slope1 = Math.tan(Math.PI/180 * I.ILocx.raw_ang)
  const slope2 = Math.tan(Math.PI/180 * I.ILocy.raw_ang)


  const renderPrincple = () => { return (
    <g>
      <MAxis 
        m={slope1}
        h={height}
        x0={x0}
        y0={y0}
        color="red"
      />
      <MAxis 
        m={slope2}
        h={height}
        x0={x0}
        y0={y0}
        color="green"
      />
    </g>
  )}

  const renderParallel = () => { return (
    <g>
      <PYAxis 
        h={height}
        x0={x0}
        y0={y0}
        color="white"
      />
      <PXAxis 
        h={height}
        x0={x0}
        y0={y0}
        color="white"
      />
    </g>
  )}

  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      {( slope1 === 0 || slope2 === 0)? "" : renderPrincple()}
      {renderParallel()}
  
    </svg>
  );
}

export default Axis
