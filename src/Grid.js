import React from 'react'

const Grid = ({dw}) => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width={dw} height={dw} patternUnits="userSpaceOnUse">
        <rect width={dw} height={dw} fill="url(#smallGrid)"/>
        <path d={`M ${dw} 0 L 0 0 0 ${dw}`} fill="none" stroke="gray" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export default Grid
