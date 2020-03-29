x = [ 2.000  0.500  4.830  6.330 ]';
y = [ 4.000  6.598  9.098  6.500 ]';


if ~isequal( size(x), size(y) ),
  error( 'X and Y must be the same size');
end
 
% temporarily shift data to mean of vertices for improved accuracy
xm = mean(x);
ym = mean(y);
x = x - xm;
y = y - ym;
  
% summations for CCW boundary
xp = x( [2:end 1] );
yp = y( [2:end 1] );
a = x.*yp - xp.*y;
 
A = sum( a ) /2;
xc = sum( (x+xp).*a  ) /6/A;
yc = sum( (y+yp).*a  ) /6/A;
Ixx = sum( (y.*y +y.*yp + yp.*yp).*a  ) /12;
Iyy = sum( (x.*x +x.*xp + xp.*xp).*a  ) /12;
Ixy = sum( (x.*yp +2*x.*y +2*xp.*yp + xp.*y).*a  ) /24;
 
dx = xp - x;
dy = yp - y;
P = sum( sqrt( dx.*dx +dy.*dy ) );
 
% check for CCW versus CW boundary
if A < 0,
  A = -A;
  Ixx = -Ixx;
  Iyy = -Iyy;
  Ixy = -Ixy;
end
 


% centroidal moments
Iuu = Ixx - A*yc*yc;
Ivv = Iyy - A*xc*xc;
Iuv = Ixy - A*xc*yc;
J = Iuu + Ivv;
 
% replace mean of vertices
x_cen = xc + xm;
y_cen = yc + ym;
Ixx = Iuu + A*y_cen*y_cen;
Iyy = Ivv + A*x_cen*x_cen;
Ixy = Iuv + A*x_cen*y_cen;
 
% principal moments and orientation
I = [ Iuu  -Iuv ;
     -Iuv   Ivv ];
[ eig_vec, eig_val ] = eig(I);
I1 = eig_val(1,1);
I2 = eig_val(2,2);
d2r = pi / 180
ang1 = atan2( eig_vec(2,1), eig_vec(1,1) )/d2r
ang2 = atan2( eig_vec(2,2), eig_vec(1,2) )/d2r
 
% return values
geom = [ A  x_cen  y_cen  P ];
iner = [ Ixx  Iyy  Ixy  Iuu  Ivv  Iuv ];
cpmo = [ I1  ang1  I2  ang2  J ];
