import Numeric from '../node_modules/numeric/numeric-1.2.6.js'
import { create, all } from 'mathjs'
const config = { }
const math = create(all, config)

const polygeom = (x,y) => {

  // temporarily shift data to mean of vertices for improved accuracy
  const xm = math.mean(x);
  const ym = math.mean(y);
  x = x.map(e=> e-xm);
  y = y.map(e=> e-ym);

  //summations for CCW boundary
  const xp = x.map((_,i) => (i === x.length -1) ? x[0] : x[i+1])
  const yp = y.map((_,i) => (i === y.length -1) ? y[0] : y[i+1])
  const a  = x.map((_,i) => x[i]*yp[i]-y[i]*xp[i] )

  const _A =  math.sum( a ) /2
  const A = _A < 0 ? -_A : _A
  const xc = math.sum(x.map((_,i) => ( x[i]+xp[i] ) * a[i] )) /6/A;
  const yc = math.sum(y.map((_,i) => (y[i]+yp[i])*a[i] )) /6/A;

  const _Ixx = math.sum(x.map((_,i) => (y[i]**2 + y[i]*yp[i] + yp[i]**2)*a[i])) / 12
    let Ixx = _Ixx < 0 ? -_Ixx: _Ixx
  const _Iyy = math.sum(y.map((_,i) => (x[i]**2 + x[i]*xp[i] + xp[i]**2)*a[i])) / 12
    let Iyy = _Iyy < 0 ? -_Iyy : _Iyy
  const _Ixy = math.sum(y.map((_,i) => (x[i]*yp[i] +2*x[i]*y[i] +2*xp[i]*yp[i] +xp[i]*y[i])*a[i] )) /24
    let Ixy = _Ixy < 0 ? -_Ixy : _Ixy

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

  const { lambda:{ x:[I1,I2] }, E:{x:vec} } = Numeric.eig(I)

  const _ang1 = (Math.atan2( vec[1][0], vec[0][0] )/Math.PI*180).toFixed(5)
  const ang1 = _ang1 < 0 ? _ang1+180 : _ang1
  const ang2 = ang1<90?  ang1+90 : ang1-90

  return {
    centriod:{x_cen, y_cen},
    ILocx:{I:I1.toFixed(3), ang_horz:ang1}, 
    ILocy:{I:I2.toFixed(3), ang_horz:ang2}, 
    Iuu, Ivv, J
  }

}

export default polygeom

