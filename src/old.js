const cords = [[2,0],[6,0],[6,1],[4.5,1],[4.5,7],[8,7],[8,8],[0,8],[0,7],[3.5,7],[3.5,1],[2,1]]
const slope = (p1,p2) => {
  const dx = p2[0]-p1[0]
  const dy = p2[1]-p1[1]
  const ret = (dy/dx)
  // console.log(dy +'/' + dx +' = ' + ret )
  return ret

}

const drawlines = (cords) => {
  // [m, b, x0, xf, y0, yf]
  let lines = []
  cords.forEach((p,i)=>{
    let m 
    let xs
    let ys
    if (i === 0){
       xs = [cords.slice(-1)[0][0], p[0]].sort( (a, b) => a - b ) 
       ys = [cords.slice(-1)[0][1], p[1]].sort( (a, b) => a - b ) 
       m = slope(cords.slice(-1)[0], p )

    } else {
       xs = [ cords[i-1][0], p[0] ].sort( (a, b) => a - b ) 
       ys= [ cords[i-1][1], p[1] ].sort( (a, b) => a - b ) 
       m = slope(p, cords[i-1])
    }
    const b = p[1] - m*p[0] // intecept
    const line =[ m, b, ...xs, ...ys]
    lines.push(line)
  })

  return lines
}

const printline = (ar) => {
  // y=1.5x\ \left\{0<x<2\right\}
  let line 
  if (ar[0] === Infinity || ar[0] === -Infinity) {
    line = `x=${ar[3]} \\left\\{ ${ar[4]} <y< ${ar[5]} \\right\\}`
  }else {
    line = 'y='+ ar[0] + 'x+' + ar[1] +' \\left\\{' + ar[2] + '<x<'+ ar[3] + '\\right\\}'
  }
  console.log(line)
}

const lines = drawlines(cords)
lines.forEach(e=>printline(e))
console.log(lines)

const takeSlice = (y,lines) => {
  let xvals
  
  lines.forEach(e=>{
    if(e[0] == Infinity || e[0] == -Infinity){
      if(e[])
      xvals.push(e[2])
    } else if {

    }
  })
}
