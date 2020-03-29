import React from 'react'

const Grid = () => {
  return (
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <rect width="40" height="40" fill="url(#smallGrid)"/>
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="gray" strokeWidth="1"/>
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
    </svg>
  );
}

export default Grid
