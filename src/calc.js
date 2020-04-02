import Numeric from '../node_modules/numeric/numeric-1.2.6.js'
import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

const polygeom = (x,y) => {

  // temporarily shift data to mean of vertices for improved accuracy
  const xm = math.mean(x);
  const ym = math.mean(y);
  x = x.map(e=> e - xm);
  y = y.map(e=> e - ym);

  //summations for CCW boundary
  const xp = x.map((_,i) => (i === x.length -1) ? x[0] : x[i+1])
  const yp = y.map((_,i) => (i === y.length -1) ? y[0] : y[i+1])
  const a  = x.map((_,i) => x[i]*yp[i]-y[i]*xp[i] )

  let A =  math.sum( a ) /2
  const xc = math.sum(x.map((_,i) => ( x[i]+xp[i] ) * a[i] )) /6/A;
  const yc = math.sum(y.map((_,i) => (y[i]+yp[i])*a[i] )) /6/A;
  let Ixx = math.sum(x.map((_,i) => (y[i]**2 + y[i]*yp[i] + yp[i]**2)*a[i])) / 12
  let Iyy = math.sum(y.map((_,i) => (x[i]**2 + x[i]*xp[i] + xp[i]**2)*a[i])) / 12
  let Ixy = math.sum(y.map((_,i) => (x[i]*yp[i] +2*x[i]*y[i] +2*xp[i]*yp[i] +xp[i]*y[i])*a[i] )) /24

  if (A < 0) {
    A = -A;
    Ixx = -Ixx;
    Iyy = -Iyy;
    Ixy = -Ixy;
  }


  const Iuu = Ixx - A*yc*yc;
  const Ivv = Iyy - A*xc*xc;
  const Iuv = Ixy - A*xc*yc;
  const J = Iuu + Ivv;
    
  const x_cen = xc + xm;
  const y_cen = yc + ym;
  Ixx = Iuu + A*y_cen*y_cen;
  Iyy = Ivv + A*x_cen*x_cen;
  Ixy = Iuv + A*x_cen*y_cen;
    

  const I = [ 
    [Iuu, -Iuv],
    [-Iuv, Ivv] 
  ];
  const eig = Numeric.eig(I)
  console.log(eig)
  const { lambda:{ x:[I1,I2] }, E:{x:vec} } = eig

  const _ang1 = (Math.atan2( vec[1][0], vec[0][0] )/Math.PI*180)
  const ang1 = _ang1 < 0 ? _ang1+180 : _ang1
  console.log(_ang1,ang1)
  const _ang2 = _ang1+90
  const ang2 = ang1<90?  ang1+90.0 : ang1-90

  return {
    centriod:{x_cen:parseFloat(x_cen.toFixed(3)), y_cen:parseFloat(y_cen.toFixed(3)), A:parseFloat(A.toFixed(3))},
    ILocx:{I:I1.toFixed(3), ang_horz:ang1, raw_ang: _ang1 }, 
    ILocy:{I:I2.toFixed(3), ang_horz:ang2, raw_ang: _ang2 }, 
    Iuu:parseFloat(Iuu.toFixed(3)), Ivv:parseFloat(Ivv.toFixed(3)), J:parseFloat(J.toFixed(3))
  }

}

export default polygeom

