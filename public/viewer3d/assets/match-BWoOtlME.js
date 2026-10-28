import{b as Rf,r as id}from"./convert-DgOl-ZFM.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xl="169",Cs={ROTATE:0,DOLLY:1,PAN:2},Ms={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Cf=0,ah=1,If=2,sd=1,Pf=2,Wn=3,Jn=0,en=1,Qt=2,Mi=0,Is=1,oh=2,ch=3,lh=4,Lf=5,Fi=100,Nf=101,Df=102,Uf=103,Of=104,Ff=200,Bf=201,kf=202,zf=203,mc=204,gc=205,Hf=206,Vf=207,Gf=208,Wf=209,qf=210,Xf=211,Yf=212,jf=213,Kf=214,_c=0,xc=1,vc=2,Os=3,yc=4,Mc=5,Sc=6,Ec=7,rd=0,$f=1,Zf=2,Si=0,Jf=1,Qf=2,ep=3,tp=4,np=5,ip=6,sp=7,hh="attached",rp="detached",ad=300,Fs=301,Bs=302,bc=303,Tc=304,to=306,qi=1e3,mi=1001,ka=1002,Gt=1003,od=1004,_r=1005,cn=1006,wa=1007,Yn=1008,Qn=1009,cd=1010,ld=1011,Rr=1012,vl=1013,Xi=1014,Tn=1015,Or=1016,yl=1017,Ml=1018,ks=1020,hd=35902,ud=1021,dd=1022,fn=1023,fd=1024,pd=1025,Ps=1026,zs=1027,Sl=1028,El=1029,md=1030,bl=1031,Tl=1033,Ra=33776,Ca=33777,Ia=33778,Pa=33779,Ac=35840,wc=35841,Rc=35842,Cc=35843,Ic=36196,Pc=37492,Lc=37496,Nc=37808,Dc=37809,Uc=37810,Oc=37811,Fc=37812,Bc=37813,kc=37814,zc=37815,Hc=37816,Vc=37817,Gc=37818,Wc=37819,qc=37820,Xc=37821,La=36492,Yc=36494,jc=36495,gd=36283,Kc=36284,$c=36285,Zc=36286,Al=2200,ap=2201,op=2202,Cr=2300,Ir=2301,Mo=2302,Ss=2400,Es=2401,za=2402,wl=2500,cp=2501,lp=0,_d=1,Jc=2,hp=3200,up=3201,xd=0,dp=1,fi="",gt="srgb",Ot="srgb-linear",Rl="display-p3",no="display-p3-linear",Ha="linear",ft="srgb",Va="rec709",Ga="p3",Ji=7680,uh=519,fp=512,pp=513,mp=514,vd=515,gp=516,_p=517,xp=518,vp=519,Qc=35044,dh="300 es",jn=2e3,Wa=2001;class Ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const s=this._listeners[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const n=this._listeners[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const Ft=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fh=1234567;const Mr=Math.PI/180,Hs=180/Math.PI;function wn(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ft[i&255]+Ft[i>>8&255]+Ft[i>>16&255]+Ft[i>>24&255]+"-"+Ft[e&255]+Ft[e>>8&255]+"-"+Ft[e>>16&15|64]+Ft[e>>24&255]+"-"+Ft[t&63|128]+Ft[t>>8&255]+"-"+Ft[t>>16&255]+Ft[t>>24&255]+Ft[n&255]+Ft[n>>8&255]+Ft[n>>16&255]+Ft[n>>24&255]).toLowerCase()}function Nt(i,e,t){return Math.max(e,Math.min(t,i))}function Cl(i,e){return(i%e+e)%e}function yp(i,e,t,n,s){return n+(i-e)*(s-n)/(t-e)}function Mp(i,e,t){return i!==e?(t-i)/(e-i):0}function Sr(i,e,t){return(1-t)*i+t*e}function Sp(i,e,t,n){return Sr(i,e,1-Math.exp(-t*n))}function Ep(i,e=1){return e-Math.abs(Cl(i,e*2)-e)}function bp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*(3-2*i))}function Tp(i,e,t){return i<=e?0:i>=t?1:(i=(i-e)/(t-e),i*i*i*(i*(i*6-15)+10))}function Ap(i,e){return i+Math.floor(Math.random()*(e-i+1))}function wp(i,e){return i+Math.random()*(e-i)}function Rp(i){return i*(.5-Math.random())}function Cp(i){i!==void 0&&(fh=i);let e=fh+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ip(i){return i*Mr}function Pp(i){return i*Hs}function Lp(i){return(i&i-1)===0&&i!==0}function Np(i){return Math.pow(2,Math.ceil(Math.log(i)/Math.LN2))}function Dp(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function Up(i,e,t,n,s){const r=Math.cos,a=Math.sin,o=r(t/2),c=a(t/2),l=r((e+n)/2),h=a((e+n)/2),u=r((e-n)/2),d=a((e-n)/2),f=r((n-e)/2),g=a((n-e)/2);switch(s){case"XYX":i.set(o*h,c*u,c*d,o*l);break;case"YZY":i.set(c*d,o*h,c*u,o*l);break;case"ZXZ":i.set(c*u,c*d,o*h,o*l);break;case"XZX":i.set(o*h,c*g,c*f,o*l);break;case"YXY":i.set(c*f,o*h,c*g,o*l);break;case"ZYZ":i.set(c*g,c*f,o*h,o*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function bn(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function ct(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}const nt={DEG2RAD:Mr,RAD2DEG:Hs,generateUUID:wn,clamp:Nt,euclideanModulo:Cl,mapLinear:yp,inverseLerp:Mp,lerp:Sr,damp:Sp,pingpong:Ep,smoothstep:bp,smootherstep:Tp,randInt:Ap,randFloat:wp,randFloatSpread:Rp,seededRandom:Cp,degToRad:Ip,radToDeg:Pp,isPowerOfTwo:Lp,ceilPowerOfTwo:Np,floorPowerOfTwo:Dp,setQuaternionFromProperEuler:Up,normalize:ct,denormalize:bn};class we{constructor(e=0,t=0){we.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Xe{constructor(e,t,n,s,r,a,o,c,l){Xe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l)}set(e,t,n,s,r,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=s,h[2]=o,h[3]=t,h[4]=r,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=s[0],m=s[3],p=s[6],A=s[1],b=s[4],T=s[7],V=s[2],L=s[5],R=s[8];return r[0]=a*_+o*A+c*V,r[3]=a*m+o*b+c*L,r[6]=a*p+o*T+c*R,r[1]=l*_+h*A+u*V,r[4]=l*m+h*b+u*L,r[7]=l*p+h*T+u*R,r[2]=d*_+f*A+g*V,r[5]=d*m+f*b+g*L,r[8]=d*p+f*T+g*R,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*r*h+n*o*c+s*r*l-s*a*c}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=h*a-o*l,d=o*c-h*r,f=l*r-a*c,g=t*u+n*d+s*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return e[0]=u*_,e[1]=(s*l-h*n)*_,e[2]=(o*n-s*a)*_,e[3]=d*_,e[4]=(h*t-s*c)*_,e[5]=(s*r-o*t)*_,e[6]=f*_,e[7]=(n*c-l*t)*_,e[8]=(a*t-n*r)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-s*l,s*c,-s*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(So.makeScale(e,t)),this}rotate(e){return this.premultiply(So.makeRotation(-e)),this}translate(e,t){return this.premultiply(So.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const So=new Xe;function yd(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Pr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Op(){const i=Pr("canvas");return i.style.display="block",i}const ph={};function Na(i){i in ph||(ph[i]=!0,console.warn(i))}function Fp(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}function Bp(i){const e=i.elements;e[2]=.5*e[2]+.5*e[3],e[6]=.5*e[6]+.5*e[7],e[10]=.5*e[10]+.5*e[11],e[14]=.5*e[14]+.5*e[15]}function kp(i){const e=i.elements;e[11]===-1?(e[10]=-e[10]-1,e[14]=-e[14]):(e[10]=-e[10],e[14]=-e[14]+1)}const mh=new Xe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),gh=new Xe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),tr={[Ot]:{transfer:Ha,primaries:Va,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[gt]:{transfer:ft,primaries:Va,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[no]:{transfer:Ha,primaries:Ga,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(gh),fromReference:i=>i.applyMatrix3(mh)},[Rl]:{transfer:ft,primaries:Ga,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(gh),fromReference:i=>i.applyMatrix3(mh).convertLinearToSRGB()}},zp=new Set([Ot,no]),et={enabled:!0,_workingColorSpace:Ot,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!zp.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=tr[e].toReference,s=tr[t].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return tr[i].primaries},getTransfer:function(i){return i===fi?Ha:tr[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(tr[e].luminanceCoefficients)}};function Ls(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Eo(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let Qi;class Hp{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qi===void 0&&(Qi=Pr("canvas")),Qi.width=e.width,Qi.height=e.height;const n=Qi.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qi}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Pr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=Ls(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(Ls(t[n]/255)*255):t[n]=Ls(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Vp=0;class Md{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Vp++}),this.uuid=wn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(bo(s[a].image)):r.push(bo(s[a]))}else r=bo(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function bo(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Hp.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Gp=0;class bt extends Ei{constructor(e=bt.DEFAULT_IMAGE,t=bt.DEFAULT_MAPPING,n=mi,s=mi,r=cn,a=Yn,o=fn,c=Qn,l=bt.DEFAULT_ANISOTROPY,h=fi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Gp++}),this.uuid=wn(),this.name="",this.source=new Md(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new we(0,0),this.repeat=new we(1,1),this.center=new we(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ad)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qi:e.x=e.x-Math.floor(e.x);break;case mi:e.x=e.x<0?0:1;break;case ka:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qi:e.y=e.y-Math.floor(e.y);break;case mi:e.y=e.y<0?0:1;break;case ka:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}bt.DEFAULT_IMAGE=null;bt.DEFAULT_MAPPING=ad;bt.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,s=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const c=e.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const b=(l+1)/2,T=(f+1)/2,V=(p+1)/2,L=(h+d)/4,R=(u+_)/4,W=(g+m)/4;return b>T&&b>V?b<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(b),s=L/n,r=R/n):T>V?T<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(T),n=L/s,r=W/s):V<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(V),n=R/r,s=W/r),this.set(n,s,r,t),this}let A=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(A)<.001&&(A=1),this.x=(m-g)/A,this.y=(u-_)/A,this.z=(d-h)/A,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Wp extends Ei{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const s={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:cn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const r=new bt(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);r.flipY=!1,r.generateMipmaps=n.generateMipmaps,r.internalFormat=n.internalFormat,this.textures=[];const a=n.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,s=e.textures.length;n<s;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Md(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yi extends Wp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Sd extends bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class qp extends bt{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=Gt,this.minFilter=Gt,this.wrapR=mi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qt{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let c=n[s+0],l=n[s+1],h=n[s+2],u=n[s+3];const d=r[a+0],f=r[a+1],g=r[a+2],_=r[a+3];if(o===0){e[t+0]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u;return}if(o===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-o;const p=c*d+l*f+h*g+u*_,A=p>=0?1:-1,b=1-p*p;if(b>Number.EPSILON){const V=Math.sqrt(b),L=Math.atan2(V,p*A);m=Math.sin(m*L)/V,o=Math.sin(o*L)/V}const T=o*A;if(c=c*m+d*T,l=l*m+f*T,h=h*m+g*T,u=u*m+_*T,m===1-o){const V=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=V,l*=V,h*=V,u*=V}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],c=n[s+1],l=n[s+2],h=n[s+3],u=r[a],d=r[a+1],f=r[a+2],g=r[a+3];return e[t]=o*g+h*u+c*f-l*d,e[t+1]=c*g+h*d+l*u-o*f,e[t+2]=l*g+h*f+o*d-c*u,e[t+3]=h*g-o*u-c*d-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(s/2),u=o(r/2),d=c(n/2),f=c(s/2),g=c(r/2);switch(a){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(a-s)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(h-c)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+l)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(r-l)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(a-s)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Nt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+s*l-r*c,this._y=s*h+a*c+r*o-n*l,this._z=r*h+a*l+n*c-s*o,this._w=a*h-n*o-s*c-r*l,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,s=this._y,r=this._z,a=this._w;let o=a*e._w+n*e._x+s*e._y+r*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=s,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const f=1-t;return this._w=f*a+t*this._w,this._x=f*n+t*this._x,this._y=f*s+t*this._y,this._z=f*r+t*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,o),u=Math.sin((1-t)*h)/l,d=Math.sin(t*h)/l;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=s*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(e=0,t=0,n=0){P.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(_h.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(_h.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*s-o*n),h=2*(o*t-r*s),u=2*(r*n-a*t);return this.x=t+c*l+a*u-o*h,this.y=n+c*h+o*l-r*u,this.z=s+c*u+r*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,c=t.z;return this.x=s*c-r*o,this.y=r*a-n*c,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return To.copy(this).projectOnVector(e),this.sub(To)}reflect(e){return this.sub(To.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Nt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const To=new P,_h=new qt;class Ln{constructor(e=new P(1/0,1/0,1/0),t=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(_n.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(_n.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=_n.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,_n):_n.fromBufferAttribute(r,a),_n.applyMatrix4(e.matrixWorld),this.expandByPoint(_n);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Wr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Wr.copy(n.boundingBox)),Wr.applyMatrix4(e.matrixWorld),this.union(Wr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,_n),_n.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(nr),qr.subVectors(this.max,nr),es.subVectors(e.a,nr),ts.subVectors(e.b,nr),ns.subVectors(e.c,nr),ni.subVectors(ts,es),ii.subVectors(ns,ts),Ai.subVectors(es,ns);let t=[0,-ni.z,ni.y,0,-ii.z,ii.y,0,-Ai.z,Ai.y,ni.z,0,-ni.x,ii.z,0,-ii.x,Ai.z,0,-Ai.x,-ni.y,ni.x,0,-ii.y,ii.x,0,-Ai.y,Ai.x,0];return!Ao(t,es,ts,ns,qr)||(t=[1,0,0,0,1,0,0,0,1],!Ao(t,es,ts,ns,qr))?!1:(Xr.crossVectors(ni,ii),t=[Xr.x,Xr.y,Xr.z],Ao(t,es,ts,ns,qr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,_n).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(_n).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Fn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Fn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Fn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Fn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Fn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Fn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Fn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Fn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Fn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const Fn=[new P,new P,new P,new P,new P,new P,new P,new P],_n=new P,Wr=new Ln,es=new P,ts=new P,ns=new P,ni=new P,ii=new P,Ai=new P,nr=new P,qr=new P,Xr=new P,wi=new P;function Ao(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){wi.fromArray(i,r);const o=s.x*Math.abs(wi.x)+s.y*Math.abs(wi.y)+s.z*Math.abs(wi.z),c=e.dot(wi),l=t.dot(wi),h=n.dot(wi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const Xp=new Ln,ir=new P,wo=new P;class Nn{constructor(e=new P,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Xp.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ir.subVectors(e,this.center);const t=ir.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(ir,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(wo.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ir.copy(e.center).add(wo)),this.expandByPoint(ir.copy(e.center).sub(wo))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Bn=new P,Ro=new P,Yr=new P,si=new P,Co=new P,jr=new P,Io=new P;class Fr{constructor(e=new P,t=new P(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Bn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Bn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Bn.copy(this.origin).addScaledVector(this.direction,t),Bn.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){Ro.copy(e).add(t).multiplyScalar(.5),Yr.copy(t).sub(e).normalize(),si.copy(this.origin).sub(Ro);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Yr),o=si.dot(this.direction),c=-si.dot(Yr),l=si.lengthSq(),h=Math.abs(1-a*a);let u,d,f,g;if(h>0)if(u=a*c-o,d=a*o-c,g=r*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+a*d+2*o)+d*(a*u+d+2*c)+l}else d=r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-a*r+o)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(a*r+o)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=a>0?-r:r,u=Math.max(0,-(a*d+o)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),s&&s.copy(Ro).addScaledVector(Yr,d),f}intersectSphere(e,t){Bn.subVectors(e.center,this.origin);const n=Bn.dot(this.direction),s=Bn.dot(Bn)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(e.min.x-d.x)*l,s=(e.max.x-d.x)*l):(n=(e.max.x-d.x)*l,s=(e.min.x-d.x)*l),h>=0?(r=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(r=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),u>=0?(o=(e.min.z-d.z)*u,c=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,c=(e.min.z-d.z)*u),n>c||o>s)||((o>n||n!==n)&&(n=o),(c<s||s!==s)&&(s=c),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,Bn)!==null}intersectTriangle(e,t,n,s,r){Co.subVectors(t,e),jr.subVectors(n,e),Io.crossVectors(Co,jr);let a=this.direction.dot(Io),o;if(a>0){if(s)return null;o=1}else if(a<0)o=-1,a=-a;else return null;si.subVectors(this.origin,e);const c=o*this.direction.dot(jr.crossVectors(si,jr));if(c<0)return null;const l=o*this.direction.dot(Co.cross(si));if(l<0||c+l>a)return null;const h=-o*si.dot(Io);return h<0?null:this.at(h/a,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class We{constructor(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,m){We.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,m)}set(e,t,n,s,r,a,o,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new We().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,s=1/is.setFromMatrixColumn(e,0).length(),r=1/is.setFromMatrixColumn(e,1).length(),a=1/is.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(s),l=Math.sin(s),h=Math.cos(r),u=Math.sin(r);if(e.order==="XYZ"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=-c*u,t[8]=l,t[1]=f+g*l,t[5]=d-_*l,t[9]=-o*c,t[2]=_-d*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d+_*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=_+d*o,t[10]=a*c}else if(e.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;t[0]=d-_*o,t[4]=-a*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=_-d*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const d=a*h,f=a*u,g=o*h,_=o*u;t[0]=c*h,t[4]=g*l-f,t[8]=d*l+_,t[1]=c*u,t[5]=_*l+d,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=_-d*u,t[8]=g*u+f,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*u+g,t[10]=d-_*u}else if(e.order==="XZY"){const d=a*c,f=a*l,g=o*c,_=o*l;t[0]=c*h,t[4]=-u,t[8]=l*h,t[1]=d*u+_,t[5]=a*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*h,t[10]=_*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Yp,e,jp)}lookAt(e,t,n){const s=this.elements;return sn.subVectors(e,t),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),ri.crossVectors(n,sn),ri.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),ri.crossVectors(n,sn)),ri.normalize(),Kr.crossVectors(sn,ri),s[0]=ri.x,s[4]=Kr.x,s[8]=sn.x,s[1]=ri.y,s[5]=Kr.y,s[9]=sn.y,s[2]=ri.z,s[6]=Kr.z,s[10]=sn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],A=n[3],b=n[7],T=n[11],V=n[15],L=s[0],R=s[4],W=s[8],ce=s[12],x=s[1],E=s[5],Z=s[9],v=s[13],k=s[2],G=s[6],U=s[10],J=s[14],y=s[3],N=s[7],B=s[11],X=s[15];return r[0]=a*L+o*x+c*k+l*y,r[4]=a*R+o*E+c*G+l*N,r[8]=a*W+o*Z+c*U+l*B,r[12]=a*ce+o*v+c*J+l*X,r[1]=h*L+u*x+d*k+f*y,r[5]=h*R+u*E+d*G+f*N,r[9]=h*W+u*Z+d*U+f*B,r[13]=h*ce+u*v+d*J+f*X,r[2]=g*L+_*x+m*k+p*y,r[6]=g*R+_*E+m*G+p*N,r[10]=g*W+_*Z+m*U+p*B,r[14]=g*ce+_*v+m*J+p*X,r[3]=A*L+b*x+T*k+V*y,r[7]=A*R+b*E+T*G+V*N,r[11]=A*W+b*Z+T*U+V*B,r[15]=A*ce+b*v+T*J+V*X,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],_=e[7],m=e[11],p=e[15];return g*(+r*c*u-s*l*u-r*o*d+n*l*d+s*o*f-n*c*f)+_*(+t*c*f-t*l*d+r*a*d-s*a*f+s*l*h-r*c*h)+m*(+t*l*u-t*o*f-r*a*u+n*a*f+r*o*h-n*l*h)+p*(-s*o*h-t*c*u+t*o*d+s*a*u-n*a*d+n*c*h)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],_=e[13],m=e[14],p=e[15],A=u*m*l-_*d*l+_*c*f-o*m*f-u*c*p+o*d*p,b=g*d*l-h*m*l-g*c*f+a*m*f+h*c*p-a*d*p,T=h*_*l-g*u*l+g*o*f-a*_*f-h*o*p+a*u*p,V=g*u*c-h*_*c-g*o*d+a*_*d+h*o*m-a*u*m,L=t*A+n*b+s*T+r*V;if(L===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const R=1/L;return e[0]=A*R,e[1]=(_*d*r-u*m*r-_*s*f+n*m*f+u*s*p-n*d*p)*R,e[2]=(o*m*r-_*c*r+_*s*l-n*m*l-o*s*p+n*c*p)*R,e[3]=(u*c*r-o*d*r-u*s*l+n*d*l+o*s*f-n*c*f)*R,e[4]=b*R,e[5]=(h*m*r-g*d*r+g*s*f-t*m*f-h*s*p+t*d*p)*R,e[6]=(g*c*r-a*m*r-g*s*l+t*m*l+a*s*p-t*c*p)*R,e[7]=(a*d*r-h*c*r+h*s*l-t*d*l-a*s*f+t*c*f)*R,e[8]=T*R,e[9]=(g*u*r-h*_*r-g*n*f+t*_*f+h*n*p-t*u*p)*R,e[10]=(a*_*r-g*o*r+g*n*l-t*_*l-a*n*p+t*o*p)*R,e[11]=(h*o*r-a*u*r-h*n*l+t*u*l+a*n*f-t*o*f)*R,e[12]=V*R,e[13]=(h*_*s-g*u*s+g*n*d-t*_*d-h*n*m+t*u*m)*R,e[14]=(g*o*s-a*_*s-g*n*c+t*_*c+a*n*m-t*o*m)*R,e[15]=(a*u*s-h*o*s+h*n*c-t*u*c-a*n*d+t*o*d)*R,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,c=e.z,l=r*a,h=r*o;return this.set(l*a+n,l*o-s*c,l*c+s*o,0,l*o+s*c,h*o+n,h*c-s*a,0,l*c-s*o,h*c+s*a,r*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,c=t._w,l=r+r,h=a+a,u=o+o,d=r*l,f=r*h,g=r*u,_=a*h,m=a*u,p=o*u,A=c*l,b=c*h,T=c*u,V=n.x,L=n.y,R=n.z;return s[0]=(1-(_+p))*V,s[1]=(f+T)*V,s[2]=(g-b)*V,s[3]=0,s[4]=(f-T)*L,s[5]=(1-(d+p))*L,s[6]=(m+A)*L,s[7]=0,s[8]=(g+b)*R,s[9]=(m-A)*R,s[10]=(1-(d+_))*R,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;let r=is.set(s[0],s[1],s[2]).length();const a=is.set(s[4],s[5],s[6]).length(),o=is.set(s[8],s[9],s[10]).length();this.determinant()<0&&(r=-r),e.x=s[12],e.y=s[13],e.z=s[14],xn.copy(this);const l=1/r,h=1/a,u=1/o;return xn.elements[0]*=l,xn.elements[1]*=l,xn.elements[2]*=l,xn.elements[4]*=h,xn.elements[5]*=h,xn.elements[6]*=h,xn.elements[8]*=u,xn.elements[9]*=u,xn.elements[10]*=u,t.setFromRotationMatrix(xn),n.x=r,n.y=a,n.z=o,this}makePerspective(e,t,n,s,r,a,o=jn){const c=this.elements,l=2*r/(t-e),h=2*r/(n-s),u=(t+e)/(t-e),d=(n+s)/(n-s);let f,g;if(o===jn)f=-(a+r)/(a-r),g=-2*a*r/(a-r);else if(o===Wa)f=-a/(a-r),g=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=jn){const c=this.elements,l=1/(t-e),h=1/(n-s),u=1/(a-r),d=(t+e)*l,f=(n+s)*h;let g,_;if(o===jn)g=(a+r)*u,_=-2*u;else if(o===Wa)g=r*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const is=new P,xn=new We,Yp=new P(0,0,0),jp=new P(1,1,1),ri=new P,Kr=new P,sn=new P,xh=new We,vh=new qt;class Pn{constructor(e=0,t=0,n=0,s=Pn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],c=s[1],l=s[5],h=s[9],u=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(Nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Nt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Nt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Nt(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return xh.makeRotationFromQuaternion(e),this.setFromRotationMatrix(xh,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return vh.setFromEuler(this),this.setFromQuaternion(vh,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Pn.DEFAULT_ORDER="XYZ";class Ed{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Kp=0;const yh=new P,ss=new qt,kn=new We,$r=new P,sr=new P,$p=new P,Zp=new qt,Mh=new P(1,0,0),Sh=new P(0,1,0),Eh=new P(0,0,1),bh={type:"added"},Jp={type:"removed"},rs={type:"childadded",child:null},Po={type:"childremoved",child:null};class pt extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Kp++}),this.uuid=wn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=pt.DEFAULT_UP.clone();const e=new P,t=new Pn,n=new qt,s=new P(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new We},normalMatrix:{value:new Xe}}),this.matrix=new We,this.matrixWorld=new We,this.matrixAutoUpdate=pt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ed,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(Mh,e)}rotateY(e){return this.rotateOnAxis(Sh,e)}rotateZ(e){return this.rotateOnAxis(Eh,e)}translateOnAxis(e,t){return yh.copy(e).applyQuaternion(this.quaternion),this.position.add(yh.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Mh,e)}translateY(e){return this.translateOnAxis(Sh,e)}translateZ(e){return this.translateOnAxis(Eh,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(kn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?$r.copy(e):$r.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),sr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?kn.lookAt(sr,$r,this.up):kn.lookAt($r,sr,this.up),this.quaternion.setFromRotationMatrix(kn),s&&(kn.extractRotation(s.matrixWorld),ss.setFromRotationMatrix(kn),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bh),rs.child=e,this.dispatchEvent(rs),rs.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Jp),Po.child=e,this.dispatchEvent(Po),Po.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),kn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),kn.multiply(e.parent.matrixWorld)),e.applyMatrix4(kn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bh),rs.child=e,this.dispatchEvent(rs),rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,e,$p),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(sr,Zp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(e.shapes,u)}else r(e.shapes,c)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(e.materials,this.material[c]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];s.animations.push(r(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=s,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}}pt.DEFAULT_UP=new P(0,1,0);pt.DEFAULT_MATRIX_AUTO_UPDATE=!0;pt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const vn=new P,zn=new P,Lo=new P,Hn=new P,as=new P,os=new P,Th=new P,No=new P,Do=new P,Uo=new P,Oo=new it,Fo=new it,Bo=new it;class dn{constructor(e=new P,t=new P,n=new P){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),vn.subVectors(e,t),s.cross(vn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){vn.subVectors(s,t),zn.subVectors(n,t),Lo.subVectors(e,t);const a=vn.dot(vn),o=vn.dot(zn),c=vn.dot(Lo),l=zn.dot(zn),h=zn.dot(Lo),u=a*l-o*o;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-o*h)*d,g=(a*h-o*c)*d;return r.set(1-f-g,g,f)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,Hn)===null?!1:Hn.x>=0&&Hn.y>=0&&Hn.x+Hn.y<=1}static getInterpolation(e,t,n,s,r,a,o,c){return this.getBarycoord(e,t,n,s,Hn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Hn.x),c.addScaledVector(a,Hn.y),c.addScaledVector(o,Hn.z),c)}static getInterpolatedAttribute(e,t,n,s,r,a){return Oo.setScalar(0),Fo.setScalar(0),Bo.setScalar(0),Oo.fromBufferAttribute(e,t),Fo.fromBufferAttribute(e,n),Bo.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Oo,r.x),a.addScaledVector(Fo,r.y),a.addScaledVector(Bo,r.z),a}static isFrontFacing(e,t,n,s){return vn.subVectors(n,t),zn.subVectors(e,t),vn.cross(zn).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return vn.subVectors(this.c,this.b),zn.subVectors(this.a,this.b),vn.cross(zn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;as.subVectors(s,n),os.subVectors(r,n),No.subVectors(e,n);const c=as.dot(No),l=os.dot(No);if(c<=0&&l<=0)return t.copy(n);Do.subVectors(e,s);const h=as.dot(Do),u=os.dot(Do);if(h>=0&&u<=h)return t.copy(s);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(as,a);Uo.subVectors(e,r);const f=as.dot(Uo),g=os.dot(Uo);if(g>=0&&f<=g)return t.copy(r);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(os,o);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Th.subVectors(r,s),o=(u-h)/(u-h+(f-g)),t.copy(s).addScaledVector(Th,o);const p=1/(m+_+d);return a=_*p,o=d*p,t.copy(n).addScaledVector(as,a).addScaledVector(os,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const bd={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ai={h:0,s:0,l:0},Zr={h:0,s:0,l:0};function ko(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ve{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=gt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,et.toWorkingColorSpace(this,t),this}setRGB(e,t,n,s=et.workingColorSpace){return this.r=e,this.g=t,this.b=n,et.toWorkingColorSpace(this,s),this}setHSL(e,t,n,s=et.workingColorSpace){if(e=Cl(e,1),t=Nt(t,0,1),n=Nt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=ko(a,r,e+1/3),this.g=ko(a,r,e),this.b=ko(a,r,e-1/3)}return et.toWorkingColorSpace(this,s),this}setStyle(e,t=gt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=gt){const n=bd[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}copyLinearToSRGB(e){return this.r=Eo(e.r),this.g=Eo(e.g),this.b=Eo(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=gt){return et.fromWorkingColorSpace(Bt.copy(this),e),Math.round(Nt(Bt.r*255,0,255))*65536+Math.round(Nt(Bt.g*255,0,255))*256+Math.round(Nt(Bt.b*255,0,255))}getHexString(e=gt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=et.workingColorSpace){et.fromWorkingColorSpace(Bt.copy(this),t);const n=Bt.r,s=Bt.g,r=Bt.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const u=a-o;switch(l=h<=.5?u/(a+o):u/(2-a-o),a){case n:c=(s-r)/u+(s<r?6:0);break;case s:c=(r-n)/u+2;break;case r:c=(n-s)/u+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=et.workingColorSpace){return et.fromWorkingColorSpace(Bt.copy(this),t),e.r=Bt.r,e.g=Bt.g,e.b=Bt.b,e}getStyle(e=gt){et.fromWorkingColorSpace(Bt.copy(this),e);const t=Bt.r,n=Bt.g,s=Bt.b;return e!==gt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(ai),this.setHSL(ai.h+e,ai.s+t,ai.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ai),e.getHSL(Zr);const n=Sr(ai.h,Zr.h,t),s=Sr(ai.s,Zr.s,t),r=Sr(ai.l,Zr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Bt=new Ve;Ve.NAMES=bd;let Qp=0;class Rn extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Qp++}),this.uuid=wn(),this.name="",this.type="Material",this.blending=Is,this.side=Jn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=mc,this.blendDst=gc,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ve(0,0,0),this.blendAlpha=0,this.depthFunc=Os,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=uh,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ji,this.stencilZFail=Ji,this.stencilZPass=Ji,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Is&&(n.blending=this.blending),this.side!==Jn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==mc&&(n.blendSrc=this.blendSrc),this.blendDst!==gc&&(n.blendDst=this.blendDst),this.blendEquation!==Fi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Os&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==uh&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ji&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ji&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ji&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class pn extends Rn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ve(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.combine=rd,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const yt=new P,Jr=new we;class Ut{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Qc,this.updateRanges=[],this.gpuType=Tn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Jr.fromBufferAttribute(this,t),Jr.applyMatrix3(e),this.setXY(t,Jr.x,Jr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix3(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyMatrix4(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.applyNormalMatrix(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)yt.fromBufferAttribute(this,t),yt.transformDirection(e),this.setXYZ(t,yt.x,yt.y,yt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=bn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=bn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=bn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=bn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Qc&&(e.usage=this.usage),e}}class Td extends Ut{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Ad extends Ut{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Xt extends Ut{constructor(e,t,n){super(new Float32Array(e),t,n)}}let em=0;const hn=new We,zo=new pt,cs=new P,rn=new Ln,rr=new Ln,wt=new P;class Yt extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:em++}),this.uuid=wn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(yd(e)?Ad:Td)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Xe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return hn.makeRotationFromQuaternion(e),this.applyMatrix4(hn),this}rotateX(e){return hn.makeRotationX(e),this.applyMatrix4(hn),this}rotateY(e){return hn.makeRotationY(e),this.applyMatrix4(hn),this}rotateZ(e){return hn.makeRotationZ(e),this.applyMatrix4(hn),this}translate(e,t,n){return hn.makeTranslation(e,t,n),this.applyMatrix4(hn),this}scale(e,t,n){return hn.makeScale(e,t,n),this.applyMatrix4(hn),this}lookAt(e){return zo.lookAt(e),zo.updateMatrix(),this.applyMatrix4(zo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(cs).negate(),this.translate(cs.x,cs.y,cs.z),this}setFromPoints(e){const t=[];for(let n=0,s=e.length;n<s;n++){const r=e[n];t.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Xt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Ln);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];rn.setFromBufferAttribute(r),this.morphTargetsRelative?(wt.addVectors(this.boundingBox.min,rn.min),this.boundingBox.expandByPoint(wt),wt.addVectors(this.boundingBox.max,rn.max),this.boundingBox.expandByPoint(wt)):(this.boundingBox.expandByPoint(rn.min),this.boundingBox.expandByPoint(rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(e){const n=this.boundingSphere.center;if(rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];rr.setFromBufferAttribute(o),this.morphTargetsRelative?(wt.addVectors(rn.min,rr.min),rn.expandByPoint(wt),wt.addVectors(rn.max,rr.max),rn.expandByPoint(wt)):(rn.expandByPoint(rr.min),rn.expandByPoint(rr.max))}rn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)wt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(wt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)wt.fromBufferAttribute(o,l),c&&(cs.fromBufferAttribute(e,l),wt.add(cs)),s=Math.max(s,n.distanceToSquared(wt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ut(new Float32Array(4*n.count),4));const a=this.getAttribute("tangent"),o=[],c=[];for(let W=0;W<n.count;W++)o[W]=new P,c[W]=new P;const l=new P,h=new P,u=new P,d=new we,f=new we,g=new we,_=new P,m=new P;function p(W,ce,x){l.fromBufferAttribute(n,W),h.fromBufferAttribute(n,ce),u.fromBufferAttribute(n,x),d.fromBufferAttribute(r,W),f.fromBufferAttribute(r,ce),g.fromBufferAttribute(r,x),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const E=1/(f.x*g.y-g.x*f.y);isFinite(E)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(E),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(E),o[W].add(_),o[ce].add(_),o[x].add(_),c[W].add(m),c[ce].add(m),c[x].add(m))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let W=0,ce=A.length;W<ce;++W){const x=A[W],E=x.start,Z=x.count;for(let v=E,k=E+Z;v<k;v+=3)p(e.getX(v+0),e.getX(v+1),e.getX(v+2))}const b=new P,T=new P,V=new P,L=new P;function R(W){V.fromBufferAttribute(s,W),L.copy(V);const ce=o[W];b.copy(ce),b.sub(V.multiplyScalar(V.dot(ce))).normalize(),T.crossVectors(L,ce);const E=T.dot(c[W])<0?-1:1;a.setXYZW(W,b.x,b.y,b.z,E)}for(let W=0,ce=A.length;W<ce;++W){const x=A[W],E=x.start,Z=x.count;for(let v=E,k=E+Z;v<k;v+=3)R(e.getX(v+0)),R(e.getX(v+1)),R(e.getX(v+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ut(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const s=new P,r=new P,a=new P,o=new P,c=new P,l=new P,h=new P,u=new P;if(e)for(let d=0,f=e.count;d<f;d+=3){const g=e.getX(d+0),_=e.getX(d+1),m=e.getX(d+2);s.fromBufferAttribute(t,g),r.fromBufferAttribute(t,_),a.fromBufferAttribute(t,m),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,r),u.subVectors(s,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)wt.fromBufferAttribute(e,t),wt.normalize(),e.setXYZ(t,wt.x,wt.y,wt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,u=o.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?f=c[_]*o.data.stride+o.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new Ut(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Yt,n=this.index.array,s=this.attributes;for(const o in s){const c=s[o],l=e(c,n);t.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=e(d,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const s={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(e.data))}h.length>0&&(s[c]=h,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const s=e.attributes;for(const l in s){const h=s[l];this.setAttribute(l,h.clone(t))}const r=e.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const u=a[l];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ah=new We,Ri=new Fr,Qr=new Nn,wh=new P,ea=new P,ta=new P,na=new P,Ho=new P,ia=new P,Rh=new P,sa=new P;class _t extends pt{constructor(e=new Yt,t=new pn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){ia.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=o[c],u=r[c];h!==0&&(Ho.fromBufferAttribute(u,e),a?ia.addScaledVector(Ho,h):ia.addScaledVector(Ho.sub(t),h))}t.add(ia)}return t}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Qr.copy(n.boundingSphere),Qr.applyMatrix4(r),Ri.copy(e.ray).recast(e.near),!(Qr.containsPoint(Ri.origin)===!1&&(Ri.intersectSphere(Qr,wh)===null||Ri.origin.distanceToSquared(wh)>(e.far-e.near)**2))&&(Ah.copy(r).invert(),Ri.copy(e.ray).applyMatrix4(Ah),!(n.boundingBox!==null&&Ri.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ri)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),b=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let T=A,V=b;T<V;T+=3){const L=o.getX(T),R=o.getX(T+1),W=o.getX(T+2);s=ra(this,p,e,n,l,h,u,L,R,W),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(o.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const A=o.getX(m),b=o.getX(m+1),T=o.getX(m+2);s=ra(this,a,e,n,l,h,u,A,b,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=a[m.materialIndex],A=Math.max(m.start,f.start),b=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let T=A,V=b;T<V;T+=3){const L=T,R=T+1,W=T+2;s=ra(this,p,e,n,l,h,u,L,R,W),s&&(s.faceIndex=Math.floor(T/3),s.face.materialIndex=m.materialIndex,t.push(s))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const A=m,b=m+1,T=m+2;s=ra(this,a,e,n,l,h,u,A,b,T),s&&(s.faceIndex=Math.floor(m/3),t.push(s))}}}}function tm(i,e,t,n,s,r,a,o){let c;if(e.side===en?c=n.intersectTriangle(a,r,s,!0,o):c=n.intersectTriangle(s,r,a,e.side===Jn,o),c===null)return null;sa.copy(o),sa.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(sa);return l<t.near||l>t.far?null:{distance:l,point:sa.clone(),object:i}}function ra(i,e,t,n,s,r,a,o,c,l){i.getVertexPosition(o,ea),i.getVertexPosition(c,ta),i.getVertexPosition(l,na);const h=tm(i,e,t,n,ea,ta,na,Rh);if(h){const u=new P;dn.getBarycoord(Rh,ea,ta,na,u),s&&(h.uv=dn.getInterpolatedAttribute(s,o,c,l,u,new we)),r&&(h.uv1=dn.getInterpolatedAttribute(r,o,c,l,u,new we)),a&&(h.normal=dn.getInterpolatedAttribute(a,o,c,l,u,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a:o,b:c,c:l,normal:new P,materialIndex:0};dn.getNormal(ea,ta,na,d.normal),h.face=d,h.barycoord=u}return h}class $i extends Yt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,t,e,a,r,0),g("z","y","x",1,-1,n,t,-e,a,r,1),g("x","z","y",1,1,e,n,t,s,a,2),g("x","z","y",1,-1,e,n,-t,s,a,3),g("x","y","z",1,-1,e,t,n,s,r,4),g("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(c),this.setAttribute("position",new Xt(l,3)),this.setAttribute("normal",new Xt(h,3)),this.setAttribute("uv",new Xt(u,2));function g(_,m,p,A,b,T,V,L,R,W,ce){const x=T/R,E=V/W,Z=T/2,v=V/2,k=L/2,G=R+1,U=W+1;let J=0,y=0;const N=new P;for(let B=0;B<U;B++){const X=B*E-v;for(let se=0;se<G;se++){const oe=se*x-Z;N[_]=oe*A,N[m]=X*b,N[p]=k,l.push(N.x,N.y,N.z),N[_]=0,N[m]=0,N[p]=L>0?1:-1,h.push(N.x,N.y,N.z),u.push(se/R),u.push(1-B/W),J+=1}}for(let B=0;B<W;B++)for(let X=0;X<R;X++){const se=d+X+G*B,oe=d+X+G*(B+1),I=d+(X+1)+G*(B+1),z=d+(X+1)+G*B;c.push(se,oe,z),c.push(oe,I,z),y+=6}o.addGroup(f,y,ce),f+=y,d+=J}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new $i(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Vs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone():Array.isArray(s)?e[t][n]=s.slice():e[t][n]=s}}return e}function zt(i){const e={};for(let t=0;t<i.length;t++){const n=Vs(i[t]);for(const s in n)e[s]=n[s]}return e}function nm(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function wd(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:et.workingColorSpace}const im={clone:Vs,merge:zt};var sm=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,rm=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends Rn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=sm,this.fragmentShader=rm,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Vs(e.uniforms),this.uniformsGroups=nm(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Rd extends pt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new We,this.projectionMatrix=new We,this.projectionMatrixInverse=new We,this.coordinateSystem=jn}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const oi=new P,Ch=new we,Ih=new we;class Vt extends Rd{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Hs*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Mr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Hs*2*Math.atan(Math.tan(Mr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){oi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(oi.x,oi.y).multiplyScalar(-e/oi.z),oi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(oi.x,oi.y).multiplyScalar(-e/oi.z)}getViewSize(e,t){return this.getViewBounds(e,Ch,Ih),t.subVectors(Ih,Ch)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Mr*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*s/c,t-=a.offsetY*n/l,s*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ls=-90,hs=1;class am extends pt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Vt(ls,hs,e,t);s.layers=this.layers,this.add(s);const r=new Vt(ls,hs,e,t);r.layers=this.layers,this.add(r);const a=new Vt(ls,hs,e,t);a.layers=this.layers,this.add(a);const o=new Vt(ls,hs,e,t);o.layers=this.layers,this.add(o);const c=new Vt(ls,hs,e,t);c.layers=this.layers,this.add(c);const l=new Vt(ls,hs,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,c]=t;for(const l of t)this.remove(l);if(e===jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Wa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,c,l,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,s),e.render(t,r),e.setRenderTarget(n,1,s),e.render(t,a),e.setRenderTarget(n,2,s),e.render(t,o),e.setRenderTarget(n,3,s),e.render(t,c),e.setRenderTarget(n,4,s),e.render(t,l),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,s),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Cd extends bt{constructor(e,t,n,s,r,a,o,c,l,h){e=e!==void 0?e:[],t=t!==void 0?t:Fs,super(e,t,n,s,r,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class om extends Yi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Cd(s,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0?t.generateMipmaps:!1,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:cn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new $i(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:Vs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:en,blending:Mi});r.uniforms.tEquirect.value=t;const a=new _t(s,r),o=t.minFilter;return t.minFilter===Yn&&(t.minFilter=cn),new am(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,s){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const Vo=new P,cm=new P,lm=new Xe;class di{constructor(e=new P(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=Vo.subVectors(n,t).cross(cm.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Vo),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/s;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||lm.getNormalMatrix(e),s=this.coplanarPoint(Vo).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Ci=new Nn,aa=new P;class Il{constructor(e=new di,t=new di,n=new di,s=new di,r=new di,a=new di){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=jn){const n=this.planes,s=e.elements,r=s[0],a=s[1],o=s[2],c=s[3],l=s[4],h=s[5],u=s[6],d=s[7],f=s[8],g=s[9],_=s[10],m=s[11],p=s[12],A=s[13],b=s[14],T=s[15];if(n[0].setComponents(c-r,d-l,m-f,T-p).normalize(),n[1].setComponents(c+r,d+l,m+f,T+p).normalize(),n[2].setComponents(c+a,d+h,m+g,T+A).normalize(),n[3].setComponents(c-a,d-h,m-g,T-A).normalize(),n[4].setComponents(c-o,d-u,m-_,T-b).normalize(),t===jn)n[5].setComponents(c+o,d+u,m+_,T+b).normalize();else if(t===Wa)n[5].setComponents(o,u,_,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ci.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ci.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ci)}intersectsSprite(e){return Ci.center.set(0,0,0),Ci.radius=.7071067811865476,Ci.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ci)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(aa.x=s.normal.x>0?e.max.x:e.min.x,aa.y=s.normal.y>0?e.max.y:e.min.y,aa.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(aa)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Id(){let i=null,e=!1,t=null,n=null;function s(r,a){t(r,a),n=i.requestAnimationFrame(s)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function hm(i){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,u=l.byteLength,d=i.createBuffer();i.bindBuffer(c,d),i.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=i.FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=i.HALF_FLOAT:f=i.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=i.SHORT;else if(l instanceof Uint32Array)f=i.UNSIGNED_INT;else if(l instanceof Int32Array)f=i.INT;else if(l instanceof Int8Array)f=i.BYTE;else if(l instanceof Uint8Array)f=i.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,c,l){const h=c.array,u=c.updateRanges;if(i.bindBuffer(l,o),u.length===0)i.bufferSubData(l,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){const g=u[d],_=u[f];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++d,u[d]=_)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){const _=u[f];i.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}c.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(i.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:s,remove:r,update:a}}class js extends Yt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),c=Math.floor(s),l=o+1,h=c+1,u=e/o,d=t/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const A=p*d-a;for(let b=0;b<l;b++){const T=b*u-r;g.push(T,-A,0),_.push(0,0,1),m.push(b/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let A=0;A<o;A++){const b=A+l*p,T=A+l*(p+1),V=A+1+l*(p+1),L=A+1+l*p;f.push(b,T,L),f.push(T,V,L)}this.setIndex(f),this.setAttribute("position",new Xt(g,3)),this.setAttribute("normal",new Xt(_,3)),this.setAttribute("uv",new Xt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new js(e.width,e.height,e.widthSegments,e.heightSegments)}}var um=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,dm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,fm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,pm=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,gm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,_m=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,xm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,vm=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,ym=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Mm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Sm=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Em=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,bm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Tm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Am=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Rm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Cm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Im=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Pm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Lm=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Nm=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Dm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Um=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Om=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Fm=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Bm=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,km=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,zm=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Hm="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vm=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Gm=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Wm=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,qm=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Xm=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Ym=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,jm=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Km=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,$m=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Zm=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Jm=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Qm=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,eg=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,tg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ng=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,ig=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,sg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,rg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ag=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,og=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,cg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lg=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,hg=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,ug=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,dg=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,fg=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,pg=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,mg=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,gg=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,_g=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,xg=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,vg=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,yg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Sg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Eg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,bg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Tg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ag=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,wg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Rg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Cg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Ig=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Pg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Lg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ng=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Dg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Ug=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Og=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Fg=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Bg=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,kg=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,zg=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Hg=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Vg=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Gg=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Wg=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,qg=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Xg=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Yg=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,jg=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Kg=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,$g=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Zg=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Jg=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Qg=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,e_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,t_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,n_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,i_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,s_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,r_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,a_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,o_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,c_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,l_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const h_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,u_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,f_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,p_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,m_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,g_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,__=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,x_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,v_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,y_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,M_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,S_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,E_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,b_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,T_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,A_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,w_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,R_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,C_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,I_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,P_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,L_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,N_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,D_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,U_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,O_=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,F_=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,B_=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,k_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,z_=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,H_=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,V_=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ye={alphahash_fragment:um,alphahash_pars_fragment:dm,alphamap_fragment:fm,alphamap_pars_fragment:pm,alphatest_fragment:mm,alphatest_pars_fragment:gm,aomap_fragment:_m,aomap_pars_fragment:xm,batching_pars_vertex:vm,batching_vertex:ym,begin_vertex:Mm,beginnormal_vertex:Sm,bsdfs:Em,iridescence_fragment:bm,bumpmap_pars_fragment:Tm,clipping_planes_fragment:Am,clipping_planes_pars_fragment:wm,clipping_planes_pars_vertex:Rm,clipping_planes_vertex:Cm,color_fragment:Im,color_pars_fragment:Pm,color_pars_vertex:Lm,color_vertex:Nm,common:Dm,cube_uv_reflection_fragment:Um,defaultnormal_vertex:Om,displacementmap_pars_vertex:Fm,displacementmap_vertex:Bm,emissivemap_fragment:km,emissivemap_pars_fragment:zm,colorspace_fragment:Hm,colorspace_pars_fragment:Vm,envmap_fragment:Gm,envmap_common_pars_fragment:Wm,envmap_pars_fragment:qm,envmap_pars_vertex:Xm,envmap_physical_pars_fragment:ig,envmap_vertex:Ym,fog_vertex:jm,fog_pars_vertex:Km,fog_fragment:$m,fog_pars_fragment:Zm,gradientmap_pars_fragment:Jm,lightmap_pars_fragment:Qm,lights_lambert_fragment:eg,lights_lambert_pars_fragment:tg,lights_pars_begin:ng,lights_toon_fragment:sg,lights_toon_pars_fragment:rg,lights_phong_fragment:ag,lights_phong_pars_fragment:og,lights_physical_fragment:cg,lights_physical_pars_fragment:lg,lights_fragment_begin:hg,lights_fragment_maps:ug,lights_fragment_end:dg,logdepthbuf_fragment:fg,logdepthbuf_pars_fragment:pg,logdepthbuf_pars_vertex:mg,logdepthbuf_vertex:gg,map_fragment:_g,map_pars_fragment:xg,map_particle_fragment:vg,map_particle_pars_fragment:yg,metalnessmap_fragment:Mg,metalnessmap_pars_fragment:Sg,morphinstance_vertex:Eg,morphcolor_vertex:bg,morphnormal_vertex:Tg,morphtarget_pars_vertex:Ag,morphtarget_vertex:wg,normal_fragment_begin:Rg,normal_fragment_maps:Cg,normal_pars_fragment:Ig,normal_pars_vertex:Pg,normal_vertex:Lg,normalmap_pars_fragment:Ng,clearcoat_normal_fragment_begin:Dg,clearcoat_normal_fragment_maps:Ug,clearcoat_pars_fragment:Og,iridescence_pars_fragment:Fg,opaque_fragment:Bg,packing:kg,premultiplied_alpha_fragment:zg,project_vertex:Hg,dithering_fragment:Vg,dithering_pars_fragment:Gg,roughnessmap_fragment:Wg,roughnessmap_pars_fragment:qg,shadowmap_pars_fragment:Xg,shadowmap_pars_vertex:Yg,shadowmap_vertex:jg,shadowmask_pars_fragment:Kg,skinbase_vertex:$g,skinning_pars_vertex:Zg,skinning_vertex:Jg,skinnormal_vertex:Qg,specularmap_fragment:e_,specularmap_pars_fragment:t_,tonemapping_fragment:n_,tonemapping_pars_fragment:i_,transmission_fragment:s_,transmission_pars_fragment:r_,uv_pars_fragment:a_,uv_pars_vertex:o_,uv_vertex:c_,worldpos_vertex:l_,background_vert:h_,background_frag:u_,backgroundCube_vert:d_,backgroundCube_frag:f_,cube_vert:p_,cube_frag:m_,depth_vert:g_,depth_frag:__,distanceRGBA_vert:x_,distanceRGBA_frag:v_,equirect_vert:y_,equirect_frag:M_,linedashed_vert:S_,linedashed_frag:E_,meshbasic_vert:b_,meshbasic_frag:T_,meshlambert_vert:A_,meshlambert_frag:w_,meshmatcap_vert:R_,meshmatcap_frag:C_,meshnormal_vert:I_,meshnormal_frag:P_,meshphong_vert:L_,meshphong_frag:N_,meshphysical_vert:D_,meshphysical_frag:U_,meshtoon_vert:O_,meshtoon_frag:F_,points_vert:B_,points_frag:k_,shadow_vert:z_,shadow_frag:H_,sprite_vert:V_,sprite_frag:G_},pe={common:{diffuse:{value:new Ve(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new we(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ve(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ve(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Ve(16777215)},opacity:{value:1},center:{value:new we(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},In={basic:{uniforms:zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.fog]),vertexShader:Ye.meshbasic_vert,fragmentShader:Ye.meshbasic_frag},lambert:{uniforms:zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ye.meshlambert_vert,fragmentShader:Ye.meshlambert_frag},phong:{uniforms:zt([pe.common,pe.specularmap,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,pe.lights,{emissive:{value:new Ve(0)},specular:{value:new Ve(1118481)},shininess:{value:30}}]),vertexShader:Ye.meshphong_vert,fragmentShader:Ye.meshphong_frag},standard:{uniforms:zt([pe.common,pe.envmap,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.roughnessmap,pe.metalnessmap,pe.fog,pe.lights,{emissive:{value:new Ve(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag},toon:{uniforms:zt([pe.common,pe.aomap,pe.lightmap,pe.emissivemap,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.gradientmap,pe.fog,pe.lights,{emissive:{value:new Ve(0)}}]),vertexShader:Ye.meshtoon_vert,fragmentShader:Ye.meshtoon_frag},matcap:{uniforms:zt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,pe.fog,{matcap:{value:null}}]),vertexShader:Ye.meshmatcap_vert,fragmentShader:Ye.meshmatcap_frag},points:{uniforms:zt([pe.points,pe.fog]),vertexShader:Ye.points_vert,fragmentShader:Ye.points_frag},dashed:{uniforms:zt([pe.common,pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ye.linedashed_vert,fragmentShader:Ye.linedashed_frag},depth:{uniforms:zt([pe.common,pe.displacementmap]),vertexShader:Ye.depth_vert,fragmentShader:Ye.depth_frag},normal:{uniforms:zt([pe.common,pe.bumpmap,pe.normalmap,pe.displacementmap,{opacity:{value:1}}]),vertexShader:Ye.meshnormal_vert,fragmentShader:Ye.meshnormal_frag},sprite:{uniforms:zt([pe.sprite,pe.fog]),vertexShader:Ye.sprite_vert,fragmentShader:Ye.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ye.background_vert,fragmentShader:Ye.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Ye.backgroundCube_vert,fragmentShader:Ye.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ye.cube_vert,fragmentShader:Ye.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ye.equirect_vert,fragmentShader:Ye.equirect_frag},distanceRGBA:{uniforms:zt([pe.common,pe.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ye.distanceRGBA_vert,fragmentShader:Ye.distanceRGBA_frag},shadow:{uniforms:zt([pe.lights,pe.fog,{color:{value:new Ve(0)},opacity:{value:1}}]),vertexShader:Ye.shadow_vert,fragmentShader:Ye.shadow_frag}};In.physical={uniforms:zt([In.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new we(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Ve(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new we},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Ve(0)},specularColor:{value:new Ve(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new we},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Ye.meshphysical_vert,fragmentShader:Ye.meshphysical_frag};const oa={r:0,b:0,g:0},Ii=new Pn,W_=new We;function q_(i,e,t,n,s,r,a){const o=new Ve(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function g(A){let b=A.isScene===!0?A.background:null;return b&&b.isTexture&&(b=(A.backgroundBlurriness>0?t:e).get(b)),b}function _(A){let b=!1;const T=g(A);T===null?p(o,c):T&&T.isColor&&(p(T,1),b=!0);const V=i.xr.getEnvironmentBlendMode();V==="additive"?n.buffers.color.setClear(0,0,0,1,a):V==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(i.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function m(A,b){const T=g(b);T&&(T.isCubeTexture||T.mapping===to)?(h===void 0&&(h=new _t(new $i(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Vs(In.backgroundCube.uniforms),vertexShader:In.backgroundCube.vertexShader,fragmentShader:In.backgroundCube.fragmentShader,side:en,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(V,L,R){this.matrixWorld.copyPosition(R.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Ii.copy(b.backgroundRotation),Ii.x*=-1,Ii.y*=-1,Ii.z*=-1,T.isCubeTexture&&T.isRenderTargetTexture===!1&&(Ii.y*=-1,Ii.z*=-1),h.material.uniforms.envMap.value=T,h.material.uniforms.flipEnvMap.value=T.isCubeTexture&&T.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(W_.makeRotationFromEuler(Ii)),h.material.toneMapped=et.getTransfer(T.colorSpace)!==ft,(u!==T||d!==T.version||f!==i.toneMapping)&&(h.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),h.layers.enableAll(),A.unshift(h,h.geometry,h.material,0,0,null)):T&&T.isTexture&&(l===void 0&&(l=new _t(new js(2,2),new ei({name:"BackgroundMaterial",uniforms:Vs(In.background.uniforms),vertexShader:In.background.vertexShader,fragmentShader:In.background.fragmentShader,side:Jn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(l)),l.material.uniforms.t2D.value=T,l.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,l.material.toneMapped=et.getTransfer(T.colorSpace)!==ft,T.matrixAutoUpdate===!0&&T.updateMatrix(),l.material.uniforms.uvTransform.value.copy(T.matrix),(u!==T||d!==T.version||f!==i.toneMapping)&&(l.material.needsUpdate=!0,u=T,d=T.version,f=i.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,b){A.getRGB(oa,wd(i)),n.buffers.color.setClear(oa.r,oa.g,oa.b,b,a)}return{getClearColor:function(){return o},setClearColor:function(A,b=1){o.set(A),c=b,p(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(A){c=A,p(o,c)},render:_,addToRenderList:m}}function X_(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(x,E,Z,v,k){let G=!1;const U=u(v,Z,E);r!==U&&(r=U,l(r.object)),G=f(x,v,Z,k),G&&g(x,v,Z,k),k!==null&&e.update(k,i.ELEMENT_ARRAY_BUFFER),(G||a)&&(a=!1,T(x,E,Z,v),k!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function c(){return i.createVertexArray()}function l(x){return i.bindVertexArray(x)}function h(x){return i.deleteVertexArray(x)}function u(x,E,Z){const v=Z.wireframe===!0;let k=n[x.id];k===void 0&&(k={},n[x.id]=k);let G=k[E.id];G===void 0&&(G={},k[E.id]=G);let U=G[v];return U===void 0&&(U=d(c()),G[v]=U),U}function d(x){const E=[],Z=[],v=[];for(let k=0;k<t;k++)E[k]=0,Z[k]=0,v[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:E,enabledAttributes:Z,attributeDivisors:v,object:x,attributes:{},index:null}}function f(x,E,Z,v){const k=r.attributes,G=E.attributes;let U=0;const J=Z.getAttributes();for(const y in J)if(J[y].location>=0){const B=k[y];let X=G[y];if(X===void 0&&(y==="instanceMatrix"&&x.instanceMatrix&&(X=x.instanceMatrix),y==="instanceColor"&&x.instanceColor&&(X=x.instanceColor)),B===void 0||B.attribute!==X||X&&B.data!==X.data)return!0;U++}return r.attributesNum!==U||r.index!==v}function g(x,E,Z,v){const k={},G=E.attributes;let U=0;const J=Z.getAttributes();for(const y in J)if(J[y].location>=0){let B=G[y];B===void 0&&(y==="instanceMatrix"&&x.instanceMatrix&&(B=x.instanceMatrix),y==="instanceColor"&&x.instanceColor&&(B=x.instanceColor));const X={};X.attribute=B,B&&B.data&&(X.data=B.data),k[y]=X,U++}r.attributes=k,r.attributesNum=U,r.index=v}function _(){const x=r.newAttributes;for(let E=0,Z=x.length;E<Z;E++)x[E]=0}function m(x){p(x,0)}function p(x,E){const Z=r.newAttributes,v=r.enabledAttributes,k=r.attributeDivisors;Z[x]=1,v[x]===0&&(i.enableVertexAttribArray(x),v[x]=1),k[x]!==E&&(i.vertexAttribDivisor(x,E),k[x]=E)}function A(){const x=r.newAttributes,E=r.enabledAttributes;for(let Z=0,v=E.length;Z<v;Z++)E[Z]!==x[Z]&&(i.disableVertexAttribArray(Z),E[Z]=0)}function b(x,E,Z,v,k,G,U){U===!0?i.vertexAttribIPointer(x,E,Z,k,G):i.vertexAttribPointer(x,E,Z,v,k,G)}function T(x,E,Z,v){_();const k=v.attributes,G=Z.getAttributes(),U=E.defaultAttributeValues;for(const J in G){const y=G[J];if(y.location>=0){let N=k[J];if(N===void 0&&(J==="instanceMatrix"&&x.instanceMatrix&&(N=x.instanceMatrix),J==="instanceColor"&&x.instanceColor&&(N=x.instanceColor)),N!==void 0){const B=N.normalized,X=N.itemSize,se=e.get(N);if(se===void 0)continue;const oe=se.buffer,I=se.type,z=se.bytesPerElement,$=I===i.INT||I===i.UNSIGNED_INT||N.gpuType===vl;if(N.isInterleavedBufferAttribute){const Q=N.data,me=Q.stride,le=N.offset;if(Q.isInstancedInterleavedBuffer){for(let fe=0;fe<y.locationSize;fe++)p(y.location+fe,Q.meshPerAttribute);x.isInstancedMesh!==!0&&v._maxInstanceCount===void 0&&(v._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let fe=0;fe<y.locationSize;fe++)m(y.location+fe);i.bindBuffer(i.ARRAY_BUFFER,oe);for(let fe=0;fe<y.locationSize;fe++)b(y.location+fe,X/y.locationSize,I,B,me*z,(le+X/y.locationSize*fe)*z,$)}else{if(N.isInstancedBufferAttribute){for(let Q=0;Q<y.locationSize;Q++)p(y.location+Q,N.meshPerAttribute);x.isInstancedMesh!==!0&&v._maxInstanceCount===void 0&&(v._maxInstanceCount=N.meshPerAttribute*N.count)}else for(let Q=0;Q<y.locationSize;Q++)m(y.location+Q);i.bindBuffer(i.ARRAY_BUFFER,oe);for(let Q=0;Q<y.locationSize;Q++)b(y.location+Q,X/y.locationSize,I,B,X*z,X/y.locationSize*Q*z,$)}}else if(U!==void 0){const B=U[J];if(B!==void 0)switch(B.length){case 2:i.vertexAttrib2fv(y.location,B);break;case 3:i.vertexAttrib3fv(y.location,B);break;case 4:i.vertexAttrib4fv(y.location,B);break;default:i.vertexAttrib1fv(y.location,B)}}}}A()}function V(){W();for(const x in n){const E=n[x];for(const Z in E){const v=E[Z];for(const k in v)h(v[k].object),delete v[k];delete E[Z]}delete n[x]}}function L(x){if(n[x.id]===void 0)return;const E=n[x.id];for(const Z in E){const v=E[Z];for(const k in v)h(v[k].object),delete v[k];delete E[Z]}delete n[x.id]}function R(x){for(const E in n){const Z=n[E];if(Z[x.id]===void 0)continue;const v=Z[x.id];for(const k in v)h(v[k].object),delete v[k];delete Z[x.id]}}function W(){ce(),a=!0,r!==s&&(r=s,l(r.object))}function ce(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:W,resetDefaultState:ce,dispose:V,releaseStatesOfGeometry:L,releaseStatesOfProgram:R,initAttributes:_,enableAttribute:m,disableUnusedAttributes:A}}function Y_(i,e,t){let n;function s(l){n=l}function r(l,h){i.drawArrays(n,l,h),t.update(h,n,1)}function a(l,h,u){u!==0&&(i.drawArraysInstanced(n,l,h,u),t.update(h,n,u))}function o(l,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,n,1)}function c(l,h,u,d){if(u===0)return;const f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)a(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)t.update(g,n,d[_])}}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o,this.renderMultiDrawInstances=c}function j_(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const R=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(R){return!(R!==fn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(R){const W=R===Or&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(R!==Qn&&n.convert(R)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Tn&&!W)}function c(R){if(R==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=t.logarithmicDepthBuffer===!0,d=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(d===!0){const R=e.get("EXT_clip_control");R.clipControlEXT(R.LOWER_LEFT_EXT,R.ZERO_TO_ONE_EXT)}const f=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),m=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),A=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),b=i.getParameter(i.MAX_VARYING_VECTORS),T=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),V=g>0,L=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:u,reverseDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:A,maxVaryings:b,maxFragmentUniforms:T,vertexTextures:V,maxSamples:L}}function K_(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new di,o=new Xe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||s;return s=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=i.get(u);if(!s||g===null||g.length===0||r&&!m)r?h(null):l();else{const A=r?0:n,b=A*4;let T=p.clippingState||null;c.value=T,T=h(g,d,b,f);for(let V=0;V!==b;++V)T[V]=t[V];p.clippingState=T,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=A}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(m===null||m.length<p)&&(m=new Float32Array(p));for(let b=0,T=f;b!==_;++b,T+=4)a.copy(u[b]).applyMatrix4(A,o),a.normal.toArray(m,T),m[T+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=_,e.numIntersection=0,m}}function $_(i){let e=new WeakMap;function t(a,o){return o===bc?a.mapping=Fs:o===Tc&&(a.mapping=Bs),a}function n(a){if(a&&a.isTexture){const o=a.mapping;if(o===bc||o===Tc)if(e.has(a)){const c=e.get(a).texture;return t(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new om(c.height);return l.fromEquirectangularTexture(i,a),e.set(a,l),a.addEventListener("dispose",s),t(l.texture,a.mapping)}else return null}}return a}function s(a){const o=a.target;o.removeEventListener("dispose",s);const c=e.get(o);c!==void 0&&(e.delete(o),c.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}class Pl extends Rd{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,c=s-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const bs=4,Ph=[.125,.215,.35,.446,.526,.582],Bi=20,Go=new Pl,Lh=new Ve;let Wo=null,qo=0,Xo=0,Yo=!1;const Oi=(1+Math.sqrt(5))/2,us=1/Oi,Nh=[new P(-Oi,us,0),new P(Oi,us,0),new P(-us,0,Oi),new P(us,0,Oi),new P(0,Oi,-us),new P(0,Oi,us),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Dh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,s=100){Wo=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(e,n,s,r),t>0&&this._blur(r,0,0,t),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Oh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Wo,qo,Xo),this._renderer.xr.enabled=Yo,e.scissorTest=!1,ca(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Fs||e.mapping===Bs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Wo=this._renderer.getRenderTarget(),qo=this._renderer.getActiveCubeFace(),Xo=this._renderer.getActiveMipmapLevel(),Yo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:cn,minFilter:cn,generateMipmaps:!1,type:Or,format:fn,colorSpace:Ot,depthBuffer:!1},s=Uh(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Uh(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Z_(r)),this._blurMaterial=J_(r,e,t)}return s}_compileMaterial(e){const t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,Go)}_sceneToCubeUV(e,t,n,s){const o=new Vt(90,1,t,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Lh),h.toneMapping=Si,h.autoClear=!1;const f=new pn({name:"PMREM.Background",side:en,depthWrite:!1,depthTest:!1}),g=new _t(new $i,f);let _=!1;const m=e.background;m?m.isColor&&(f.color.copy(m),e.background=null,_=!0):(f.color.copy(Lh),_=!0);for(let p=0;p<6;p++){const A=p%3;A===0?(o.up.set(0,c[p],0),o.lookAt(l[p],0,0)):A===1?(o.up.set(0,0,c[p]),o.lookAt(0,l[p],0)):(o.up.set(0,c[p],0),o.lookAt(0,0,l[p]));const b=this._cubeSize;ca(s,A*b,p>2?b:0,b,b),h.setRenderTarget(s),_&&h.render(g,o),h.render(e,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,s=e.mapping===Fs||e.mapping===Bs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Oh());const r=s?this._cubemapMaterial:this._equirectMaterial,a=new _t(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=e;const c=this._cubeSize;ca(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Go)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const s=this._lodPlanes.length;for(let r=1;r<s;r++){const a=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),o=Nh[(s-r-1)%Nh.length];this._blur(e,r-1,r,a,o)}t.autoClear=n}_blur(e,t,n,s,r){const a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,s,"latitudinal",r),this._halfBlur(a,e,n,n,s,"longitudinal",r)}_halfBlur(e,t,n,s,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new _t(this._lodPlanes[s],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*Bi-1),_=r/g,m=isFinite(r)?1+Math.floor(h*_):Bi;m>Bi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Bi}`);const p=[];let A=0;for(let R=0;R<Bi;++R){const W=R/_,ce=Math.exp(-W*W/2);p.push(ce),R===0?A+=ce:R<m&&(A+=2*ce)}for(let R=0;R<p.length;R++)p[R]=p[R]/A;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=a==="latitudinal",o&&(d.poleAxis.value=o);const{_lodMax:b}=this;d.dTheta.value=g,d.mipInt.value=b-n;const T=this._sizeLods[s],V=3*T*(s>b-bs?s-b+bs:0),L=4*(this._cubeSize-T);ca(t,V,L,3*T,2*T),c.setRenderTarget(t),c.render(u,Go)}}function Z_(i){const e=[],t=[],n=[];let s=i;const r=i-bs+1+Ph.length;for(let a=0;a<r;a++){const o=Math.pow(2,s);t.push(o);let c=1/o;a>i-bs?c=Ph[a-i+bs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,A=new Float32Array(_*g*f),b=new Float32Array(m*g*f),T=new Float32Array(p*g*f);for(let L=0;L<f;L++){const R=L%3*2/3-1,W=L>2?0:-1,ce=[R,W,0,R+2/3,W,0,R+2/3,W+1,0,R,W,0,R+2/3,W+1,0,R,W+1,0];A.set(ce,_*g*L),b.set(d,m*g*L);const x=[L,L,L,L,L,L];T.set(x,p*g*L)}const V=new Yt;V.setAttribute("position",new Ut(A,_)),V.setAttribute("uv",new Ut(b,m)),V.setAttribute("faceIndex",new Ut(T,p)),e.push(V),s>bs&&s--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Uh(i,e,t){const n=new Yi(i,e,t);return n.texture.mapping=to,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function ca(i,e,t,n,s){i.viewport.set(e,t,n,s),i.scissor.set(e,t,n,s)}function J_(i,e,t){const n=new Float32Array(Bi),s=new P(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:Bi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Oh(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Fh(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ll(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Mi,depthTest:!1,depthWrite:!1})}function Ll(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Q_(i){let e=new WeakMap,t=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===bc||c===Tc,h=c===Fs||c===Bs;if(l||h){let u=e.get(o);const d=u!==void 0?u.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==d)return t===null&&(t=new Dh(i)),u=l?t.fromEquirectangular(o,u):t.fromCubemap(o,u),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),u.texture;if(u!==void 0)return u.texture;{const f=o.image;return l&&f&&f.height>0||h&&f&&s(f)?(t===null&&(t=new Dh(i)),u=l?t.fromEquirectangular(o):t.fromCubemap(o),u.texture.pmremVersion=o.pmremVersion,e.set(o,u),o.addEventListener("dispose",r),u.texture):null}}}return o}function s(o){let c=0;const l=6;for(let h=0;h<l;h++)o[h]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=e.get(c);l!==void 0&&(e.delete(c),l.dispose())}function a(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:a}}function e0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&Na("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function t0(i,e,t,n){const s={},r=new WeakMap;function a(u){const d=u.target;d.index!==null&&e.remove(d.index);for(const g in d.attributes)e.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)e.remove(_[m])}d.removeEventListener("dispose",a),delete s[d.id];const f=r.get(d);f&&(e.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(u,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)e.update(d[g],i.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)e.update(_[m],i.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const A=f.array;_=f.version;for(let b=0,T=A.length;b<T;b+=3){const V=A[b+0],L=A[b+1],R=A[b+2];d.push(V,L,L,R,R,V)}}else if(g!==void 0){const A=g.array;_=g.version;for(let b=0,T=A.length/3-1;b<T;b+=3){const V=b+0,L=b+1,R=b+2;d.push(V,L,L,R,R,V)}}else return;const m=new(yd(d)?Ad:Td)(d,1);m.version=_;const p=r.get(u);p&&e.remove(p),r.set(u,m)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:o,update:c,getWireframeAttribute:h}}function n0(i,e,t){let n;function s(d){n=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function c(d,f){i.drawElements(n,f,r,d*a),t.update(f,n,1)}function l(d,f,g){g!==0&&(i.drawElementsInstanced(n,f,r,d*a,g),t.update(f,n,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,f,0,r,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,n,1)}function u(d,f,g,_){if(g===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/a,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,r,d,0,_,0,g);let p=0;for(let A=0;A<g;A++)p+=f[A];for(let A=0;A<_.length;A++)t.update(p,n,_[A])}}this.setMode=s,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function i0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function s0(i,e,t){const n=new WeakMap,s=new it;function r(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let ce=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",ce)};d!==void 0&&d.texture.dispose();const f=o.morphAttributes.position!==void 0,g=o.morphAttributes.normal!==void 0,_=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],p=o.morphAttributes.normal||[],A=o.morphAttributes.color||[];let b=0;f===!0&&(b=1),g===!0&&(b=2),_===!0&&(b=3);let T=o.attributes.position.count*b,V=1;T>e.maxTextureSize&&(V=Math.ceil(T/e.maxTextureSize),T=e.maxTextureSize);const L=new Float32Array(T*V*4*u),R=new Sd(L,T,V,u);R.type=Tn,R.needsUpdate=!0;const W=b*4;for(let x=0;x<u;x++){const E=m[x],Z=p[x],v=A[x],k=T*V*4*x;for(let G=0;G<E.count;G++){const U=G*W;f===!0&&(s.fromBufferAttribute(E,G),L[k+U+0]=s.x,L[k+U+1]=s.y,L[k+U+2]=s.z,L[k+U+3]=0),g===!0&&(s.fromBufferAttribute(Z,G),L[k+U+4]=s.x,L[k+U+5]=s.y,L[k+U+6]=s.z,L[k+U+7]=0),_===!0&&(s.fromBufferAttribute(v,G),L[k+U+8]=s.x,L[k+U+9]=s.y,L[k+U+10]=s.z,L[k+U+11]=v.itemSize===4?s.w:1)}}d={count:u,texture:R,size:new we(T,V)},n.set(o,d),o.addEventListener("dispose",ce)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let f=0;for(let _=0;_<l.length;_++)f+=l[_];const g=o.morphTargetsRelative?1:1-f;c.getUniforms().setValue(i,"morphTargetBaseInfluence",g),c.getUniforms().setValue(i,"morphTargetInfluences",l)}c.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),c.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function r0(i,e,t,n){let s=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=e.get(c,h);if(s.get(u)!==l&&(e.update(u),s.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),s.get(c)!==l&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),s.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;s.get(d)!==l&&(d.update(),s.set(d,l))}return u}function a(){s=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:r,dispose:a}}class Pd extends bt{constructor(e,t,n,s,r,a,o,c,l,h=Ps){if(h!==Ps&&h!==zs)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Ps&&(n=Xi),n===void 0&&h===zs&&(n=ks),super(null,s,r,a,o,c,h,n,l),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:Gt,this.minFilter=c!==void 0?c:Gt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const Ld=new bt,Bh=new Pd(1,1),Nd=new Sd,Dd=new qp,Ud=new Cd,kh=[],zh=[],Hh=new Float32Array(16),Vh=new Float32Array(9),Gh=new Float32Array(4);function Ks(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=kh[s];if(r===void 0&&(r=new Float32Array(s),kh[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function Tt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function At(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function io(i,e){let t=zh[e];t===void 0&&(t=new Int32Array(e),zh[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function a0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function o0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2fv(this.addr,e),At(t,e)}}function c0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Tt(t,e))return;i.uniform3fv(this.addr,e),At(t,e)}}function l0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4fv(this.addr,e),At(t,e)}}function h0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Gh.set(n),i.uniformMatrix2fv(this.addr,!1,Gh),At(t,n)}}function u0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Vh.set(n),i.uniformMatrix3fv(this.addr,!1,Vh),At(t,n)}}function d0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Tt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),At(t,e)}else{if(Tt(t,n))return;Hh.set(n),i.uniformMatrix4fv(this.addr,!1,Hh),At(t,n)}}function f0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function p0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2iv(this.addr,e),At(t,e)}}function m0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3iv(this.addr,e),At(t,e)}}function g0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4iv(this.addr,e),At(t,e)}}function _0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function x0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Tt(t,e))return;i.uniform2uiv(this.addr,e),At(t,e)}}function v0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Tt(t,e))return;i.uniform3uiv(this.addr,e),At(t,e)}}function y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Tt(t,e))return;i.uniform4uiv(this.addr,e),At(t,e)}}function M0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?(Bh.compareFunction=vd,r=Bh):r=Ld,t.setTexture2D(e||r,s)}function S0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||Dd,s)}function E0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTextureCube(e||Ud,s)}function b0(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Nd,s)}function T0(i){switch(i){case 5126:return a0;case 35664:return o0;case 35665:return c0;case 35666:return l0;case 35674:return h0;case 35675:return u0;case 35676:return d0;case 5124:case 35670:return f0;case 35667:case 35671:return p0;case 35668:case 35672:return m0;case 35669:case 35673:return g0;case 5125:return _0;case 36294:return x0;case 36295:return v0;case 36296:return y0;case 35678:case 36198:case 36298:case 36306:case 35682:return M0;case 35679:case 36299:case 36307:return S0;case 35680:case 36300:case 36308:case 36293:return E0;case 36289:case 36303:case 36311:case 36292:return b0}}function A0(i,e){i.uniform1fv(this.addr,e)}function w0(i,e){const t=Ks(e,this.size,2);i.uniform2fv(this.addr,t)}function R0(i,e){const t=Ks(e,this.size,3);i.uniform3fv(this.addr,t)}function C0(i,e){const t=Ks(e,this.size,4);i.uniform4fv(this.addr,t)}function I0(i,e){const t=Ks(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function P0(i,e){const t=Ks(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function L0(i,e){const t=Ks(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function N0(i,e){i.uniform1iv(this.addr,e)}function D0(i,e){i.uniform2iv(this.addr,e)}function U0(i,e){i.uniform3iv(this.addr,e)}function O0(i,e){i.uniform4iv(this.addr,e)}function F0(i,e){i.uniform1uiv(this.addr,e)}function B0(i,e){i.uniform2uiv(this.addr,e)}function k0(i,e){i.uniform3uiv(this.addr,e)}function z0(i,e){i.uniform4uiv(this.addr,e)}function H0(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2D(e[a]||Ld,r[a])}function V0(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||Dd,r[a])}function G0(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||Ud,r[a])}function W0(i,e,t){const n=this.cache,s=e.length,r=io(t,s);Tt(n,r)||(i.uniform1iv(this.addr,r),At(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Nd,r[a])}function q0(i){switch(i){case 5126:return A0;case 35664:return w0;case 35665:return R0;case 35666:return C0;case 35674:return I0;case 35675:return P0;case 35676:return L0;case 5124:case 35670:return N0;case 35667:case 35671:return D0;case 35668:case 35672:return U0;case 35669:case 35673:return O0;case 5125:return F0;case 36294:return B0;case 36295:return k0;case 36296:return z0;case 35678:case 36198:case 36298:case 36306:case 35682:return H0;case 35679:case 36299:case 36307:return V0;case 35680:case 36300:case 36308:case 36293:return G0;case 36289:case 36303:case 36311:case 36292:return W0}}class X0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=T0(t.type)}}class Y0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=q0(t.type)}}class j0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const jo=/(\w+)(\])?(\[|\.)?/g;function Wh(i,e){i.seq.push(e),i.map[e.id]=e}function K0(i,e,t){const n=i.name,s=n.length;for(jo.lastIndex=0;;){const r=jo.exec(n),a=jo.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===s){Wh(t,l===void 0?new X0(o,i,e):new Y0(o,i,e));break}else{let u=t.map[o];u===void 0&&(u=new j0(o),Wh(t,u)),t=u}}}class Da{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const r=e.getActiveUniform(t,s),a=e.getUniformLocation(t,r.name);K0(r,a,this)}}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function qh(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const $0=37297;let Z0=0;function J0(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}function Q0(i){const e=et.getPrimaries(et.workingColorSpace),t=et.getPrimaries(i);let n;switch(e===t?n="":e===Ga&&t===Va?n="LinearDisplayP3ToLinearSRGB":e===Va&&t===Ga&&(n="LinearSRGBToLinearDisplayP3"),i){case Ot:case no:return[n,"LinearTransferOETF"];case gt:case Rl:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Xh(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),s=i.getShaderInfoLog(e).trim();if(n&&s==="")return"";const r=/ERROR: 0:(\d+)/.exec(s);if(r){const a=parseInt(r[1]);return t.toUpperCase()+`

`+s+`

`+J0(i.getShaderSource(e),a)}else return s}function ex(i,e){const t=Q0(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function tx(i,e){let t;switch(e){case Jf:t="Linear";break;case Qf:t="Reinhard";break;case ep:t="Cineon";break;case tp:t="ACESFilmic";break;case ip:t="AgX";break;case sp:t="Neutral";break;case np:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const la=new P;function nx(){et.getLuminanceCoefficients(la);const i=la.x.toFixed(4),e=la.y.toFixed(4),t=la.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function ix(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(xr).join(`
`)}function sx(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function rx(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function xr(i){return i!==""}function Yh(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jh(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const ax=/^[ \t]*#include +<([\w\d./]+)>/gm;function el(i){return i.replace(ax,cx)}const ox=new Map;function cx(i,e){let t=Ye[e];if(t===void 0){const n=ox.get(e);if(n!==void 0)t=Ye[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return el(t)}const lx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Kh(i){return i.replace(lx,hx)}function hx(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function $h(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function ux(i){let e="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===sd?e="SHADOWMAP_TYPE_PCF":i.shadowMapType===Pf?e="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===Wn&&(e="SHADOWMAP_TYPE_VSM"),e}function dx(i){let e="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Fs:case Bs:e="ENVMAP_TYPE_CUBE";break;case to:e="ENVMAP_TYPE_CUBE_UV";break}return e}function fx(i){let e="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Bs:e="ENVMAP_MODE_REFRACTION";break}return e}function px(i){let e="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case rd:e="ENVMAP_BLENDING_MULTIPLY";break;case $f:e="ENVMAP_BLENDING_MIX";break;case Zf:e="ENVMAP_BLENDING_ADD";break}return e}function mx(i){const e=i.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function gx(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=ux(t),l=dx(t),h=fx(t),u=px(t),d=mx(t),f=ix(t),g=sx(r),_=s.createProgram();let m,p,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xr).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(xr).join(`
`),p.length>0&&(p+=`
`)):(m=[$h(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(xr).join(`
`),p=[$h(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Si?"#define TONE_MAPPING":"",t.toneMapping!==Si?Ye.tonemapping_pars_fragment:"",t.toneMapping!==Si?tx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ye.colorspace_pars_fragment,ex("linearToOutputTexel",t.outputColorSpace),nx(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(xr).join(`
`)),a=el(a),a=Yh(a,t),a=jh(a,t),o=el(o),o=Yh(o,t),o=jh(o,t),a=Kh(a),o=Kh(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===dh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===dh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const b=A+m+a,T=A+p+o,V=qh(s,s.VERTEX_SHADER,b),L=qh(s,s.FRAGMENT_SHADER,T);s.attachShader(_,V),s.attachShader(_,L),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function R(E){if(i.debug.checkShaderErrors){const Z=s.getProgramInfoLog(_).trim(),v=s.getShaderInfoLog(V).trim(),k=s.getShaderInfoLog(L).trim();let G=!0,U=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(G=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,V,L);else{const J=Xh(s,V,"vertex"),y=Xh(s,L,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+E.name+`
Material Type: `+E.type+`

Program Info Log: `+Z+`
`+J+`
`+y)}else Z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",Z):(v===""||k==="")&&(U=!1);U&&(E.diagnostics={runnable:G,programLog:Z,vertexShader:{log:v,prefix:m},fragmentShader:{log:k,prefix:p}})}s.deleteShader(V),s.deleteShader(L),W=new Da(s,_),ce=rx(s,_)}let W;this.getUniforms=function(){return W===void 0&&R(this),W};let ce;this.getAttributes=function(){return ce===void 0&&R(this),ce};let x=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return x===!1&&(x=s.getProgramParameter(_,$0)),x},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Z0++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=V,this.fragmentShader=L,this}let _x=0;class xx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,s=this._getShaderStage(t),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(s)===!1&&(a.add(s),s.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new vx(e),t.set(e,n)),n}}class vx{constructor(e){this.id=_x++,this.code=e,this.usedTimes=0}}function yx(i,e,t,n,s,r,a){const o=new Ed,c=new xx,l=new Set,h=[],u=s.logarithmicDepthBuffer,d=s.reverseDepthBuffer,f=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function p(x,E,Z,v,k){const G=v.fog,U=k.geometry,J=x.isMeshStandardMaterial?v.environment:null,y=(x.isMeshStandardMaterial?t:e).get(x.envMap||J),N=y&&y.mapping===to?y.image.height:null,B=_[x.type];x.precision!==null&&(g=s.getMaxPrecision(x.precision),g!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",g,"instead."));const X=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,se=X!==void 0?X.length:0;let oe=0;U.morphAttributes.position!==void 0&&(oe=1),U.morphAttributes.normal!==void 0&&(oe=2),U.morphAttributes.color!==void 0&&(oe=3);let I,z,$,Q;if(B){const Kt=In[B];I=Kt.vertexShader,z=Kt.fragmentShader}else I=x.vertexShader,z=x.fragmentShader,c.update(x),$=c.getVertexShaderID(x),Q=c.getFragmentShaderID(x);const me=i.getRenderTarget(),le=k.isInstancedMesh===!0,fe=k.isBatchedMesh===!0,ye=!!x.map,Ie=!!x.matcap,C=!!y,qe=!!x.aoMap,Re=!!x.lightMap,Se=!!x.bumpMap,Ae=!!x.normalMap,Qe=!!x.displacementMap,Oe=!!x.emissiveMap,w=!!x.metalnessMap,M=!!x.roughnessMap,q=x.anisotropy>0,te=x.clearcoat>0,ne=x.dispersion>0,ee=x.iridescence>0,Pe=x.sheen>0,H=x.transmission>0,re=q&&!!x.anisotropyMap,Ne=te&&!!x.clearcoatMap,ie=te&&!!x.clearcoatNormalMap,de=te&&!!x.clearcoatRoughnessMap,Fe=ee&&!!x.iridescenceMap,Ee=ee&&!!x.iridescenceThicknessMap,ue=Pe&&!!x.sheenColorMap,Be=Pe&&!!x.sheenRoughnessMap,be=!!x.specularMap,je=!!x.specularColorMap,D=!!x.specularIntensityMap,ge=H&&!!x.transmissionMap,K=H&&!!x.thicknessMap,ae=!!x.gradientMap,_e=!!x.alphaMap,Me=x.alphaTest>0,Je=!!x.alphaHash,vt=!!x.extensions;let jt=Si;x.toneMapped&&(me===null||me.isXRRenderTarget===!0)&&(jt=i.toneMapping);const tt={shaderID:B,shaderType:x.type,shaderName:x.name,vertexShader:I,fragmentShader:z,defines:x.defines,customVertexShaderID:$,customFragmentShaderID:Q,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:g,batching:fe,batchingColor:fe&&k._colorsTexture!==null,instancing:le,instancingColor:le&&k.instanceColor!==null,instancingMorph:le&&k.morphTexture!==null,supportsVertexTextures:f,outputColorSpace:me===null?i.outputColorSpace:me.isXRRenderTarget===!0?me.texture.colorSpace:Ot,alphaToCoverage:!!x.alphaToCoverage,map:ye,matcap:Ie,envMap:C,envMapMode:C&&y.mapping,envMapCubeUVHeight:N,aoMap:qe,lightMap:Re,bumpMap:Se,normalMap:Ae,displacementMap:f&&Qe,emissiveMap:Oe,normalMapObjectSpace:Ae&&x.normalMapType===dp,normalMapTangentSpace:Ae&&x.normalMapType===xd,metalnessMap:w,roughnessMap:M,anisotropy:q,anisotropyMap:re,clearcoat:te,clearcoatMap:Ne,clearcoatNormalMap:ie,clearcoatRoughnessMap:de,dispersion:ne,iridescence:ee,iridescenceMap:Fe,iridescenceThicknessMap:Ee,sheen:Pe,sheenColorMap:ue,sheenRoughnessMap:Be,specularMap:be,specularColorMap:je,specularIntensityMap:D,transmission:H,transmissionMap:ge,thicknessMap:K,gradientMap:ae,opaque:x.transparent===!1&&x.blending===Is&&x.alphaToCoverage===!1,alphaMap:_e,alphaTest:Me,alphaHash:Je,combine:x.combine,mapUv:ye&&m(x.map.channel),aoMapUv:qe&&m(x.aoMap.channel),lightMapUv:Re&&m(x.lightMap.channel),bumpMapUv:Se&&m(x.bumpMap.channel),normalMapUv:Ae&&m(x.normalMap.channel),displacementMapUv:Qe&&m(x.displacementMap.channel),emissiveMapUv:Oe&&m(x.emissiveMap.channel),metalnessMapUv:w&&m(x.metalnessMap.channel),roughnessMapUv:M&&m(x.roughnessMap.channel),anisotropyMapUv:re&&m(x.anisotropyMap.channel),clearcoatMapUv:Ne&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:ie&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:de&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Ee&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:ue&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Be&&m(x.sheenRoughnessMap.channel),specularMapUv:be&&m(x.specularMap.channel),specularColorMapUv:je&&m(x.specularColorMap.channel),specularIntensityMapUv:D&&m(x.specularIntensityMap.channel),transmissionMapUv:ge&&m(x.transmissionMap.channel),thicknessMapUv:K&&m(x.thicknessMap.channel),alphaMapUv:_e&&m(x.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(Ae||q),vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:k.isPoints===!0&&!!U.attributes.uv&&(ye||_e),fog:!!G,useFog:x.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:d,skinning:k.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:oe,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:i.shadowMap.enabled&&Z.length>0,shadowMapType:i.shadowMap.type,toneMapping:jt,decodeVideoTexture:ye&&x.map.isVideoTexture===!0&&et.getTransfer(x.map.colorSpace)===ft,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Qt,flipSided:x.side===en,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:vt&&x.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(vt&&x.extensions.multiDraw===!0||fe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return tt.vertexUv1s=l.has(1),tt.vertexUv2s=l.has(2),tt.vertexUv3s=l.has(3),l.clear(),tt}function A(x){const E=[];if(x.shaderID?E.push(x.shaderID):(E.push(x.customVertexShaderID),E.push(x.customFragmentShaderID)),x.defines!==void 0)for(const Z in x.defines)E.push(Z),E.push(x.defines[Z]);return x.isRawShaderMaterial===!1&&(b(E,x),T(E,x),E.push(i.outputColorSpace)),E.push(x.customProgramCacheKey),E.join()}function b(x,E){x.push(E.precision),x.push(E.outputColorSpace),x.push(E.envMapMode),x.push(E.envMapCubeUVHeight),x.push(E.mapUv),x.push(E.alphaMapUv),x.push(E.lightMapUv),x.push(E.aoMapUv),x.push(E.bumpMapUv),x.push(E.normalMapUv),x.push(E.displacementMapUv),x.push(E.emissiveMapUv),x.push(E.metalnessMapUv),x.push(E.roughnessMapUv),x.push(E.anisotropyMapUv),x.push(E.clearcoatMapUv),x.push(E.clearcoatNormalMapUv),x.push(E.clearcoatRoughnessMapUv),x.push(E.iridescenceMapUv),x.push(E.iridescenceThicknessMapUv),x.push(E.sheenColorMapUv),x.push(E.sheenRoughnessMapUv),x.push(E.specularMapUv),x.push(E.specularColorMapUv),x.push(E.specularIntensityMapUv),x.push(E.transmissionMapUv),x.push(E.thicknessMapUv),x.push(E.combine),x.push(E.fogExp2),x.push(E.sizeAttenuation),x.push(E.morphTargetsCount),x.push(E.morphAttributeCount),x.push(E.numDirLights),x.push(E.numPointLights),x.push(E.numSpotLights),x.push(E.numSpotLightMaps),x.push(E.numHemiLights),x.push(E.numRectAreaLights),x.push(E.numDirLightShadows),x.push(E.numPointLightShadows),x.push(E.numSpotLightShadows),x.push(E.numSpotLightShadowsWithMaps),x.push(E.numLightProbes),x.push(E.shadowMapType),x.push(E.toneMapping),x.push(E.numClippingPlanes),x.push(E.numClipIntersection),x.push(E.depthPacking)}function T(x,E){o.disableAll(),E.supportsVertexTextures&&o.enable(0),E.instancing&&o.enable(1),E.instancingColor&&o.enable(2),E.instancingMorph&&o.enable(3),E.matcap&&o.enable(4),E.envMap&&o.enable(5),E.normalMapObjectSpace&&o.enable(6),E.normalMapTangentSpace&&o.enable(7),E.clearcoat&&o.enable(8),E.iridescence&&o.enable(9),E.alphaTest&&o.enable(10),E.vertexColors&&o.enable(11),E.vertexAlphas&&o.enable(12),E.vertexUv1s&&o.enable(13),E.vertexUv2s&&o.enable(14),E.vertexUv3s&&o.enable(15),E.vertexTangents&&o.enable(16),E.anisotropy&&o.enable(17),E.alphaHash&&o.enable(18),E.batching&&o.enable(19),E.dispersion&&o.enable(20),E.batchingColor&&o.enable(21),x.push(o.mask),o.disableAll(),E.fog&&o.enable(0),E.useFog&&o.enable(1),E.flatShading&&o.enable(2),E.logarithmicDepthBuffer&&o.enable(3),E.reverseDepthBuffer&&o.enable(4),E.skinning&&o.enable(5),E.morphTargets&&o.enable(6),E.morphNormals&&o.enable(7),E.morphColors&&o.enable(8),E.premultipliedAlpha&&o.enable(9),E.shadowMapEnabled&&o.enable(10),E.doubleSided&&o.enable(11),E.flipSided&&o.enable(12),E.useDepthPacking&&o.enable(13),E.dithering&&o.enable(14),E.transmission&&o.enable(15),E.sheen&&o.enable(16),E.opaque&&o.enable(17),E.pointsUvs&&o.enable(18),E.decodeVideoTexture&&o.enable(19),E.alphaToCoverage&&o.enable(20),x.push(o.mask)}function V(x){const E=_[x.type];let Z;if(E){const v=In[E];Z=im.clone(v.uniforms)}else Z=x.uniforms;return Z}function L(x,E){let Z;for(let v=0,k=h.length;v<k;v++){const G=h[v];if(G.cacheKey===E){Z=G,++Z.usedTimes;break}}return Z===void 0&&(Z=new gx(i,E,x,r),h.push(Z)),Z}function R(x){if(--x.usedTimes===0){const E=h.indexOf(x);h[E]=h[h.length-1],h.pop(),x.destroy()}}function W(x){c.remove(x)}function ce(){c.dispose()}return{getParameters:p,getProgramCacheKey:A,getUniforms:V,acquireProgram:L,releaseProgram:R,releaseShaderCache:W,programs:h,dispose:ce}}function Mx(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,c){i.get(a)[o]=c}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function Sx(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function Zh(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Jh(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(u,d,f,g,_,m){let p=i[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},i[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),e++,p}function o(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?s.push(p):t.push(p)}function c(u,d,f,g,_,m){const p=a(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?s.unshift(p):t.unshift(p)}function l(u,d){t.length>1&&t.sort(u||Sx),n.length>1&&n.sort(d||Zh),s.length>1&&s.sort(d||Zh)}function h(){for(let u=e,d=i.length;u<d;u++){const f=i[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:o,unshift:c,finish:h,sort:l}}function Ex(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Jh,i.set(n,[a])):s>=r.length?(a=new Jh,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function bx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new P,color:new Ve};break;case"SpotLight":t={position:new P,direction:new P,color:new Ve,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new P,color:new Ve,distance:0,decay:0};break;case"HemisphereLight":t={direction:new P,skyColor:new Ve,groundColor:new Ve};break;case"RectAreaLight":t={color:new Ve,position:new P,halfWidth:new P,halfHeight:new P};break}return i[e.id]=t,t}}}function Tx(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new we,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let Ax=0;function wx(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Rx(i){const e=new bx,t=Tx(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const s=new P,r=new We,a=new We;function o(l){let h=0,u=0,d=0;for(let ce=0;ce<9;ce++)n.probe[ce].set(0,0,0);let f=0,g=0,_=0,m=0,p=0,A=0,b=0,T=0,V=0,L=0,R=0;l.sort(wx);for(let ce=0,x=l.length;ce<x;ce++){const E=l[ce],Z=E.color,v=E.intensity,k=E.distance,G=E.shadow&&E.shadow.map?E.shadow.map.texture:null;if(E.isAmbientLight)h+=Z.r*v,u+=Z.g*v,d+=Z.b*v;else if(E.isLightProbe){for(let U=0;U<9;U++)n.probe[U].addScaledVector(E.sh.coefficients[U],v);R++}else if(E.isDirectionalLight){const U=e.get(E);if(U.color.copy(E.color).multiplyScalar(E.intensity),E.castShadow){const J=E.shadow,y=t.get(E);y.shadowIntensity=J.intensity,y.shadowBias=J.bias,y.shadowNormalBias=J.normalBias,y.shadowRadius=J.radius,y.shadowMapSize=J.mapSize,n.directionalShadow[f]=y,n.directionalShadowMap[f]=G,n.directionalShadowMatrix[f]=E.shadow.matrix,A++}n.directional[f]=U,f++}else if(E.isSpotLight){const U=e.get(E);U.position.setFromMatrixPosition(E.matrixWorld),U.color.copy(Z).multiplyScalar(v),U.distance=k,U.coneCos=Math.cos(E.angle),U.penumbraCos=Math.cos(E.angle*(1-E.penumbra)),U.decay=E.decay,n.spot[_]=U;const J=E.shadow;if(E.map&&(n.spotLightMap[V]=E.map,V++,J.updateMatrices(E),E.castShadow&&L++),n.spotLightMatrix[_]=J.matrix,E.castShadow){const y=t.get(E);y.shadowIntensity=J.intensity,y.shadowBias=J.bias,y.shadowNormalBias=J.normalBias,y.shadowRadius=J.radius,y.shadowMapSize=J.mapSize,n.spotShadow[_]=y,n.spotShadowMap[_]=G,T++}_++}else if(E.isRectAreaLight){const U=e.get(E);U.color.copy(Z).multiplyScalar(v),U.halfWidth.set(E.width*.5,0,0),U.halfHeight.set(0,E.height*.5,0),n.rectArea[m]=U,m++}else if(E.isPointLight){const U=e.get(E);if(U.color.copy(E.color).multiplyScalar(E.intensity),U.distance=E.distance,U.decay=E.decay,E.castShadow){const J=E.shadow,y=t.get(E);y.shadowIntensity=J.intensity,y.shadowBias=J.bias,y.shadowNormalBias=J.normalBias,y.shadowRadius=J.radius,y.shadowMapSize=J.mapSize,y.shadowCameraNear=J.camera.near,y.shadowCameraFar=J.camera.far,n.pointShadow[g]=y,n.pointShadowMap[g]=G,n.pointShadowMatrix[g]=E.shadow.matrix,b++}n.point[g]=U,g++}else if(E.isHemisphereLight){const U=e.get(E);U.skyColor.copy(E.color).multiplyScalar(v),U.groundColor.copy(E.groundColor).multiplyScalar(v),n.hemi[p]=U,p++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=pe.LTC_FLOAT_1,n.rectAreaLTC2=pe.LTC_FLOAT_2):(n.rectAreaLTC1=pe.LTC_HALF_1,n.rectAreaLTC2=pe.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=u,n.ambient[2]=d;const W=n.hash;(W.directionalLength!==f||W.pointLength!==g||W.spotLength!==_||W.rectAreaLength!==m||W.hemiLength!==p||W.numDirectionalShadows!==A||W.numPointShadows!==b||W.numSpotShadows!==T||W.numSpotMaps!==V||W.numLightProbes!==R)&&(n.directional.length=f,n.spot.length=_,n.rectArea.length=m,n.point.length=g,n.hemi.length=p,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=b,n.pointShadowMap.length=b,n.spotShadow.length=T,n.spotShadowMap.length=T,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=b,n.spotLightMatrix.length=T+V-L,n.spotLightMap.length=V,n.numSpotLightShadowsWithMaps=L,n.numLightProbes=R,W.directionalLength=f,W.pointLength=g,W.spotLength=_,W.rectAreaLength=m,W.hemiLength=p,W.numDirectionalShadows=A,W.numPointShadows=b,W.numSpotShadows=T,W.numSpotMaps=V,W.numLightProbes=R,n.version=Ax++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,A=l.length;p<A;p++){const b=l[p];if(b.isDirectionalLight){const T=n.directional[u];T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),u++}else if(b.isSpotLight){const T=n.spot[f];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(m),T.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(m),f++}else if(b.isRectAreaLight){const T=n.rectArea[g];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(m),a.identity(),r.copy(b.matrixWorld),r.premultiply(m),a.extractRotation(r),T.halfWidth.set(b.width*.5,0,0),T.halfHeight.set(0,b.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),g++}else if(b.isPointLight){const T=n.point[d];T.position.setFromMatrixPosition(b.matrixWorld),T.position.applyMatrix4(m),d++}else if(b.isHemisphereLight){const T=n.hemi[_];T.direction.setFromMatrixPosition(b.matrixWorld),T.direction.transformDirection(m),_++}}}return{setup:o,setupView:c,state:n}}function Qh(i){const e=new Rx(i),t=[],n=[];function s(h){l.camera=h,t.length=0,n.length=0}function r(h){t.push(h)}function a(h){n.push(h)}function o(){e.setup(t)}function c(h){e.setupView(t,h)}const l={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:s,state:l,setupLights:o,setupLightsView:c,pushLight:r,pushShadow:a}}function Cx(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Qh(i),e.set(s,[o])):r>=a.length?(o=new Qh(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}class Ix extends Rn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=hp,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Px extends Rn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}const Lx=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Nx=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Dx(i,e,t){let n=new Il;const s=new we,r=new we,a=new it,o=new Ix({depthPacking:up}),c=new Px,l={},h=t.maxTextureSize,u={[Jn]:en,[en]:Jn,[Qt]:Qt},d=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new we},radius:{value:4}},vertexShader:Lx,fragmentShader:Nx}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new Yt;g.setAttribute("position",new Ut(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _t(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=sd;let p=this.type;this.render=function(L,R,W){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||L.length===0)return;const ce=i.getRenderTarget(),x=i.getActiveCubeFace(),E=i.getActiveMipmapLevel(),Z=i.state;Z.setBlending(Mi),Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const v=p!==Wn&&this.type===Wn,k=p===Wn&&this.type!==Wn;for(let G=0,U=L.length;G<U;G++){const J=L[G],y=J.shadow;if(y===void 0){console.warn("THREE.WebGLShadowMap:",J,"has no shadow.");continue}if(y.autoUpdate===!1&&y.needsUpdate===!1)continue;s.copy(y.mapSize);const N=y.getFrameExtents();if(s.multiply(N),r.copy(y.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(r.x=Math.floor(h/N.x),s.x=r.x*N.x,y.mapSize.x=r.x),s.y>h&&(r.y=Math.floor(h/N.y),s.y=r.y*N.y,y.mapSize.y=r.y)),y.map===null||v===!0||k===!0){const X=this.type!==Wn?{minFilter:Gt,magFilter:Gt}:{};y.map!==null&&y.map.dispose(),y.map=new Yi(s.x,s.y,X),y.map.texture.name=J.name+".shadowMap",y.camera.updateProjectionMatrix()}i.setRenderTarget(y.map),i.clear();const B=y.getViewportCount();for(let X=0;X<B;X++){const se=y.getViewport(X);a.set(r.x*se.x,r.y*se.y,r.x*se.z,r.y*se.w),Z.viewport(a),y.updateMatrices(J,X),n=y.getFrustum(),T(R,W,y.camera,J,this.type)}y.isPointLightShadow!==!0&&this.type===Wn&&A(y,W),y.needsUpdate=!1}p=this.type,m.needsUpdate=!1,i.setRenderTarget(ce,x,E)};function A(L,R){const W=e.update(_);d.defines.VSM_SAMPLES!==L.blurSamples&&(d.defines.VSM_SAMPLES=L.blurSamples,f.defines.VSM_SAMPLES=L.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),L.mapPass===null&&(L.mapPass=new Yi(s.x,s.y)),d.uniforms.shadow_pass.value=L.map.texture,d.uniforms.resolution.value=L.mapSize,d.uniforms.radius.value=L.radius,i.setRenderTarget(L.mapPass),i.clear(),i.renderBufferDirect(R,null,W,d,_,null),f.uniforms.shadow_pass.value=L.mapPass.texture,f.uniforms.resolution.value=L.mapSize,f.uniforms.radius.value=L.radius,i.setRenderTarget(L.map),i.clear(),i.renderBufferDirect(R,null,W,f,_,null)}function b(L,R,W,ce){let x=null;const E=W.isPointLight===!0?L.customDistanceMaterial:L.customDepthMaterial;if(E!==void 0)x=E;else if(x=W.isPointLight===!0?c:o,i.localClippingEnabled&&R.clipShadows===!0&&Array.isArray(R.clippingPlanes)&&R.clippingPlanes.length!==0||R.displacementMap&&R.displacementScale!==0||R.alphaMap&&R.alphaTest>0||R.map&&R.alphaTest>0){const Z=x.uuid,v=R.uuid;let k=l[Z];k===void 0&&(k={},l[Z]=k);let G=k[v];G===void 0&&(G=x.clone(),k[v]=G,R.addEventListener("dispose",V)),x=G}if(x.visible=R.visible,x.wireframe=R.wireframe,ce===Wn?x.side=R.shadowSide!==null?R.shadowSide:R.side:x.side=R.shadowSide!==null?R.shadowSide:u[R.side],x.alphaMap=R.alphaMap,x.alphaTest=R.alphaTest,x.map=R.map,x.clipShadows=R.clipShadows,x.clippingPlanes=R.clippingPlanes,x.clipIntersection=R.clipIntersection,x.displacementMap=R.displacementMap,x.displacementScale=R.displacementScale,x.displacementBias=R.displacementBias,x.wireframeLinewidth=R.wireframeLinewidth,x.linewidth=R.linewidth,W.isPointLight===!0&&x.isMeshDistanceMaterial===!0){const Z=i.properties.get(x);Z.light=W}return x}function T(L,R,W,ce,x){if(L.visible===!1)return;if(L.layers.test(R.layers)&&(L.isMesh||L.isLine||L.isPoints)&&(L.castShadow||L.receiveShadow&&x===Wn)&&(!L.frustumCulled||n.intersectsObject(L))){L.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,L.matrixWorld);const v=e.update(L),k=L.material;if(Array.isArray(k)){const G=v.groups;for(let U=0,J=G.length;U<J;U++){const y=G[U],N=k[y.materialIndex];if(N&&N.visible){const B=b(L,N,ce,x);L.onBeforeShadow(i,L,R,W,v,B,y),i.renderBufferDirect(W,null,v,B,L,y),L.onAfterShadow(i,L,R,W,v,B,y)}}}else if(k.visible){const G=b(L,k,ce,x);L.onBeforeShadow(i,L,R,W,v,G,null),i.renderBufferDirect(W,null,v,G,L,null),L.onAfterShadow(i,L,R,W,v,G,null)}}const Z=L.children;for(let v=0,k=Z.length;v<k;v++)T(Z[v],R,W,ce,x)}function V(L){L.target.removeEventListener("dispose",V);for(const W in l){const ce=l[W],x=L.target.uuid;x in ce&&(ce[x].dispose(),delete ce[x])}}}const Ux={[_c]:xc,[vc]:Sc,[yc]:Ec,[Os]:Mc,[xc]:_c,[Sc]:vc,[Ec]:yc,[Mc]:Os};function Ox(i){function e(){let D=!1;const ge=new it;let K=null;const ae=new it(0,0,0,0);return{setMask:function(_e){K!==_e&&!D&&(i.colorMask(_e,_e,_e,_e),K=_e)},setLocked:function(_e){D=_e},setClear:function(_e,Me,Je,vt,jt){jt===!0&&(_e*=vt,Me*=vt,Je*=vt),ge.set(_e,Me,Je,vt),ae.equals(ge)===!1&&(i.clearColor(_e,Me,Je,vt),ae.copy(ge))},reset:function(){D=!1,K=null,ae.set(-1,0,0,0)}}}function t(){let D=!1,ge=!1,K=null,ae=null,_e=null;return{setReversed:function(Me){ge=Me},setTest:function(Me){Me?$(i.DEPTH_TEST):Q(i.DEPTH_TEST)},setMask:function(Me){K!==Me&&!D&&(i.depthMask(Me),K=Me)},setFunc:function(Me){if(ge&&(Me=Ux[Me]),ae!==Me){switch(Me){case _c:i.depthFunc(i.NEVER);break;case xc:i.depthFunc(i.ALWAYS);break;case vc:i.depthFunc(i.LESS);break;case Os:i.depthFunc(i.LEQUAL);break;case yc:i.depthFunc(i.EQUAL);break;case Mc:i.depthFunc(i.GEQUAL);break;case Sc:i.depthFunc(i.GREATER);break;case Ec:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ae=Me}},setLocked:function(Me){D=Me},setClear:function(Me){_e!==Me&&(i.clearDepth(Me),_e=Me)},reset:function(){D=!1,K=null,ae=null,_e=null}}}function n(){let D=!1,ge=null,K=null,ae=null,_e=null,Me=null,Je=null,vt=null,jt=null;return{setTest:function(tt){D||(tt?$(i.STENCIL_TEST):Q(i.STENCIL_TEST))},setMask:function(tt){ge!==tt&&!D&&(i.stencilMask(tt),ge=tt)},setFunc:function(tt,Kt,On){(K!==tt||ae!==Kt||_e!==On)&&(i.stencilFunc(tt,Kt,On),K=tt,ae=Kt,_e=On)},setOp:function(tt,Kt,On){(Me!==tt||Je!==Kt||vt!==On)&&(i.stencilOp(tt,Kt,On),Me=tt,Je=Kt,vt=On)},setLocked:function(tt){D=tt},setClear:function(tt){jt!==tt&&(i.clearStencil(tt),jt=tt)},reset:function(){D=!1,ge=null,K=null,ae=null,_e=null,Me=null,Je=null,vt=null,jt=null}}}const s=new e,r=new t,a=new n,o=new WeakMap,c=new WeakMap;let l={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,A=null,b=null,T=null,V=null,L=new Ve(0,0,0),R=0,W=!1,ce=null,x=null,E=null,Z=null,v=null;const k=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,U=0;const J=i.getParameter(i.VERSION);J.indexOf("WebGL")!==-1?(U=parseFloat(/^WebGL (\d)/.exec(J)[1]),G=U>=1):J.indexOf("OpenGL ES")!==-1&&(U=parseFloat(/^OpenGL ES (\d)/.exec(J)[1]),G=U>=2);let y=null,N={};const B=i.getParameter(i.SCISSOR_BOX),X=i.getParameter(i.VIEWPORT),se=new it().fromArray(B),oe=new it().fromArray(X);function I(D,ge,K,ae){const _e=new Uint8Array(4),Me=i.createTexture();i.bindTexture(D,Me),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Je=0;Je<K;Je++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(ge,0,i.RGBA,1,1,ae,0,i.RGBA,i.UNSIGNED_BYTE,_e):i.texImage2D(ge+Je,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,_e);return Me}const z={};z[i.TEXTURE_2D]=I(i.TEXTURE_2D,i.TEXTURE_2D,1),z[i.TEXTURE_CUBE_MAP]=I(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),z[i.TEXTURE_2D_ARRAY]=I(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),z[i.TEXTURE_3D]=I(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),r.setClear(1),a.setClear(0),$(i.DEPTH_TEST),r.setFunc(Os),Re(!1),Se(ah),$(i.CULL_FACE),C(Mi);function $(D){l[D]!==!0&&(i.enable(D),l[D]=!0)}function Q(D){l[D]!==!1&&(i.disable(D),l[D]=!1)}function me(D,ge){return h[D]!==ge?(i.bindFramebuffer(D,ge),h[D]=ge,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=ge),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=ge),!0):!1}function le(D,ge){let K=d,ae=!1;if(D){K=u.get(ge),K===void 0&&(K=[],u.set(ge,K));const _e=D.textures;if(K.length!==_e.length||K[0]!==i.COLOR_ATTACHMENT0){for(let Me=0,Je=_e.length;Me<Je;Me++)K[Me]=i.COLOR_ATTACHMENT0+Me;K.length=_e.length,ae=!0}}else K[0]!==i.BACK&&(K[0]=i.BACK,ae=!0);ae&&i.drawBuffers(K)}function fe(D){return f!==D?(i.useProgram(D),f=D,!0):!1}const ye={[Fi]:i.FUNC_ADD,[Nf]:i.FUNC_SUBTRACT,[Df]:i.FUNC_REVERSE_SUBTRACT};ye[Uf]=i.MIN,ye[Of]=i.MAX;const Ie={[Ff]:i.ZERO,[Bf]:i.ONE,[kf]:i.SRC_COLOR,[mc]:i.SRC_ALPHA,[qf]:i.SRC_ALPHA_SATURATE,[Gf]:i.DST_COLOR,[Hf]:i.DST_ALPHA,[zf]:i.ONE_MINUS_SRC_COLOR,[gc]:i.ONE_MINUS_SRC_ALPHA,[Wf]:i.ONE_MINUS_DST_COLOR,[Vf]:i.ONE_MINUS_DST_ALPHA,[Xf]:i.CONSTANT_COLOR,[Yf]:i.ONE_MINUS_CONSTANT_COLOR,[jf]:i.CONSTANT_ALPHA,[Kf]:i.ONE_MINUS_CONSTANT_ALPHA};function C(D,ge,K,ae,_e,Me,Je,vt,jt,tt){if(D===Mi){g===!0&&(Q(i.BLEND),g=!1);return}if(g===!1&&($(i.BLEND),g=!0),D!==Lf){if(D!==_||tt!==W){if((m!==Fi||b!==Fi)&&(i.blendEquation(i.FUNC_ADD),m=Fi,b=Fi),tt)switch(D){case Is:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oh:i.blendFunc(i.ONE,i.ONE);break;case ch:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lh:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case Is:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oh:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case ch:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case lh:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}p=null,A=null,T=null,V=null,L.set(0,0,0),R=0,_=D,W=tt}return}_e=_e||ge,Me=Me||K,Je=Je||ae,(ge!==m||_e!==b)&&(i.blendEquationSeparate(ye[ge],ye[_e]),m=ge,b=_e),(K!==p||ae!==A||Me!==T||Je!==V)&&(i.blendFuncSeparate(Ie[K],Ie[ae],Ie[Me],Ie[Je]),p=K,A=ae,T=Me,V=Je),(vt.equals(L)===!1||jt!==R)&&(i.blendColor(vt.r,vt.g,vt.b,jt),L.copy(vt),R=jt),_=D,W=!1}function qe(D,ge){D.side===Qt?Q(i.CULL_FACE):$(i.CULL_FACE);let K=D.side===en;ge&&(K=!K),Re(K),D.blending===Is&&D.transparent===!1?C(Mi):C(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),r.setFunc(D.depthFunc),r.setTest(D.depthTest),r.setMask(D.depthWrite),s.setMask(D.colorWrite);const ae=D.stencilWrite;a.setTest(ae),ae&&(a.setMask(D.stencilWriteMask),a.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),a.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),Qe(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?$(i.SAMPLE_ALPHA_TO_COVERAGE):Q(i.SAMPLE_ALPHA_TO_COVERAGE)}function Re(D){ce!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),ce=D)}function Se(D){D!==Cf?($(i.CULL_FACE),D!==x&&(D===ah?i.cullFace(i.BACK):D===If?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Q(i.CULL_FACE),x=D}function Ae(D){D!==E&&(G&&i.lineWidth(D),E=D)}function Qe(D,ge,K){D?($(i.POLYGON_OFFSET_FILL),(Z!==ge||v!==K)&&(i.polygonOffset(ge,K),Z=ge,v=K)):Q(i.POLYGON_OFFSET_FILL)}function Oe(D){D?$(i.SCISSOR_TEST):Q(i.SCISSOR_TEST)}function w(D){D===void 0&&(D=i.TEXTURE0+k-1),y!==D&&(i.activeTexture(D),y=D)}function M(D,ge,K){K===void 0&&(y===null?K=i.TEXTURE0+k-1:K=y);let ae=N[K];ae===void 0&&(ae={type:void 0,texture:void 0},N[K]=ae),(ae.type!==D||ae.texture!==ge)&&(y!==K&&(i.activeTexture(K),y=K),i.bindTexture(D,ge||z[D]),ae.type=D,ae.texture=ge)}function q(){const D=N[y];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function te(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ne(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ee(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pe(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function H(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function re(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ne(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function ie(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function de(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Fe(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Ee(D){se.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),se.copy(D))}function ue(D){oe.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),oe.copy(D))}function Be(D,ge){let K=c.get(ge);K===void 0&&(K=new WeakMap,c.set(ge,K));let ae=K.get(D);ae===void 0&&(ae=i.getUniformBlockIndex(ge,D.name),K.set(D,ae))}function be(D,ge){const ae=c.get(ge).get(D);o.get(ge)!==ae&&(i.uniformBlockBinding(ge,ae,D.__bindingPointIndex),o.set(ge,ae))}function je(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),l={},y=null,N={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,A=null,b=null,T=null,V=null,L=new Ve(0,0,0),R=0,W=!1,ce=null,x=null,E=null,Z=null,v=null,se.set(0,0,i.canvas.width,i.canvas.height),oe.set(0,0,i.canvas.width,i.canvas.height),s.reset(),r.reset(),a.reset()}return{buffers:{color:s,depth:r,stencil:a},enable:$,disable:Q,bindFramebuffer:me,drawBuffers:le,useProgram:fe,setBlending:C,setMaterial:qe,setFlipSided:Re,setCullFace:Se,setLineWidth:Ae,setPolygonOffset:Qe,setScissorTest:Oe,activeTexture:w,bindTexture:M,unbindTexture:q,compressedTexImage2D:te,compressedTexImage3D:ne,texImage2D:de,texImage3D:Fe,updateUBOMapping:Be,uniformBlockBinding:be,texStorage2D:Ne,texStorage3D:ie,texSubImage2D:ee,texSubImage3D:Pe,compressedTexSubImage2D:H,compressedTexSubImage3D:re,scissor:Ee,viewport:ue,reset:je}}function eu(i,e,t,n){const s=Fx(n);switch(t){case ud:return i*e;case fd:return i*e;case pd:return i*e*2;case Sl:return i*e/s.components*s.byteLength;case El:return i*e/s.components*s.byteLength;case md:return i*e*2/s.components*s.byteLength;case bl:return i*e*2/s.components*s.byteLength;case dd:return i*e*3/s.components*s.byteLength;case fn:return i*e*4/s.components*s.byteLength;case Tl:return i*e*4/s.components*s.byteLength;case Ra:case Ca:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ia:case Pa:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case wc:case Cc:return Math.max(i,16)*Math.max(e,8)/4;case Ac:case Rc:return Math.max(i,8)*Math.max(e,8)/2;case Ic:case Pc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Lc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Nc:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Uc:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Oc:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case Fc:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Bc:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case kc:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case zc:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Hc:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Vc:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case Gc:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Wc:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case qc:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Xc:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case La:case Yc:case jc:return Math.ceil(i/4)*Math.ceil(e/4)*16;case gd:case Kc:return Math.ceil(i/4)*Math.ceil(e/4)*8;case $c:case Zc:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Fx(i){switch(i){case Qn:case cd:return{byteLength:1,components:1};case Rr:case ld:case Or:return{byteLength:2,components:1};case yl:case Ml:return{byteLength:2,components:4};case Xi:case vl:case Tn:return{byteLength:4,components:1};case hd:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Bx(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new we,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(w,M){return f?new OffscreenCanvas(w,M):Pr("canvas")}function _(w,M,q){let te=1;const ne=Oe(w);if((ne.width>q||ne.height>q)&&(te=q/Math.max(ne.width,ne.height)),te<1)if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const ee=Math.floor(te*ne.width),Pe=Math.floor(te*ne.height);u===void 0&&(u=g(ee,Pe));const H=M?g(ee,Pe):u;return H.width=ee,H.height=Pe,H.getContext("2d").drawImage(w,0,0,ee,Pe),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ne.width+"x"+ne.height+") to ("+ee+"x"+Pe+")."),H}else return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ne.width+"x"+ne.height+")."),w;return w}function m(w){return w.generateMipmaps&&w.minFilter!==Gt&&w.minFilter!==cn}function p(w){i.generateMipmap(w)}function A(w,M,q,te,ne=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let ee=M;if(M===i.RED&&(q===i.FLOAT&&(ee=i.R32F),q===i.HALF_FLOAT&&(ee=i.R16F),q===i.UNSIGNED_BYTE&&(ee=i.R8)),M===i.RED_INTEGER&&(q===i.UNSIGNED_BYTE&&(ee=i.R8UI),q===i.UNSIGNED_SHORT&&(ee=i.R16UI),q===i.UNSIGNED_INT&&(ee=i.R32UI),q===i.BYTE&&(ee=i.R8I),q===i.SHORT&&(ee=i.R16I),q===i.INT&&(ee=i.R32I)),M===i.RG&&(q===i.FLOAT&&(ee=i.RG32F),q===i.HALF_FLOAT&&(ee=i.RG16F),q===i.UNSIGNED_BYTE&&(ee=i.RG8)),M===i.RG_INTEGER&&(q===i.UNSIGNED_BYTE&&(ee=i.RG8UI),q===i.UNSIGNED_SHORT&&(ee=i.RG16UI),q===i.UNSIGNED_INT&&(ee=i.RG32UI),q===i.BYTE&&(ee=i.RG8I),q===i.SHORT&&(ee=i.RG16I),q===i.INT&&(ee=i.RG32I)),M===i.RGB_INTEGER&&(q===i.UNSIGNED_BYTE&&(ee=i.RGB8UI),q===i.UNSIGNED_SHORT&&(ee=i.RGB16UI),q===i.UNSIGNED_INT&&(ee=i.RGB32UI),q===i.BYTE&&(ee=i.RGB8I),q===i.SHORT&&(ee=i.RGB16I),q===i.INT&&(ee=i.RGB32I)),M===i.RGBA_INTEGER&&(q===i.UNSIGNED_BYTE&&(ee=i.RGBA8UI),q===i.UNSIGNED_SHORT&&(ee=i.RGBA16UI),q===i.UNSIGNED_INT&&(ee=i.RGBA32UI),q===i.BYTE&&(ee=i.RGBA8I),q===i.SHORT&&(ee=i.RGBA16I),q===i.INT&&(ee=i.RGBA32I)),M===i.RGB&&q===i.UNSIGNED_INT_5_9_9_9_REV&&(ee=i.RGB9_E5),M===i.RGBA){const Pe=ne?Ha:et.getTransfer(te);q===i.FLOAT&&(ee=i.RGBA32F),q===i.HALF_FLOAT&&(ee=i.RGBA16F),q===i.UNSIGNED_BYTE&&(ee=Pe===ft?i.SRGB8_ALPHA8:i.RGBA8),q===i.UNSIGNED_SHORT_4_4_4_4&&(ee=i.RGBA4),q===i.UNSIGNED_SHORT_5_5_5_1&&(ee=i.RGB5_A1)}return(ee===i.R16F||ee===i.R32F||ee===i.RG16F||ee===i.RG32F||ee===i.RGBA16F||ee===i.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function b(w,M){let q;return w?M===null||M===Xi||M===ks?q=i.DEPTH24_STENCIL8:M===Tn?q=i.DEPTH32F_STENCIL8:M===Rr&&(q=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===Xi||M===ks?q=i.DEPTH_COMPONENT24:M===Tn?q=i.DEPTH_COMPONENT32F:M===Rr&&(q=i.DEPTH_COMPONENT16),q}function T(w,M){return m(w)===!0||w.isFramebufferTexture&&w.minFilter!==Gt&&w.minFilter!==cn?Math.log2(Math.max(M.width,M.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?M.mipmaps.length:1}function V(w){const M=w.target;M.removeEventListener("dispose",V),R(M),M.isVideoTexture&&h.delete(M)}function L(w){const M=w.target;M.removeEventListener("dispose",L),ce(M)}function R(w){const M=n.get(w);if(M.__webglInit===void 0)return;const q=w.source,te=d.get(q);if(te){const ne=te[M.__cacheKey];ne.usedTimes--,ne.usedTimes===0&&W(w),Object.keys(te).length===0&&d.delete(q)}n.remove(w)}function W(w){const M=n.get(w);i.deleteTexture(M.__webglTexture);const q=w.source,te=d.get(q);delete te[M.__cacheKey],a.memory.textures--}function ce(w){const M=n.get(w);if(w.depthTexture&&w.depthTexture.dispose(),w.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(M.__webglFramebuffer[te]))for(let ne=0;ne<M.__webglFramebuffer[te].length;ne++)i.deleteFramebuffer(M.__webglFramebuffer[te][ne]);else i.deleteFramebuffer(M.__webglFramebuffer[te]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[te])}else{if(Array.isArray(M.__webglFramebuffer))for(let te=0;te<M.__webglFramebuffer.length;te++)i.deleteFramebuffer(M.__webglFramebuffer[te]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let te=0;te<M.__webglColorRenderbuffer.length;te++)M.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[te]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const q=w.textures;for(let te=0,ne=q.length;te<ne;te++){const ee=n.get(q[te]);ee.__webglTexture&&(i.deleteTexture(ee.__webglTexture),a.memory.textures--),n.remove(q[te])}n.remove(w)}let x=0;function E(){x=0}function Z(){const w=x;return w>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+s.maxTextures),x+=1,w}function v(w){const M=[];return M.push(w.wrapS),M.push(w.wrapT),M.push(w.wrapR||0),M.push(w.magFilter),M.push(w.minFilter),M.push(w.anisotropy),M.push(w.internalFormat),M.push(w.format),M.push(w.type),M.push(w.generateMipmaps),M.push(w.premultiplyAlpha),M.push(w.flipY),M.push(w.unpackAlignment),M.push(w.colorSpace),M.join()}function k(w,M){const q=n.get(w);if(w.isVideoTexture&&Ae(w),w.isRenderTargetTexture===!1&&w.version>0&&q.__version!==w.version){const te=w.image;if(te===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(te.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{oe(q,w,M);return}}t.bindTexture(i.TEXTURE_2D,q.__webglTexture,i.TEXTURE0+M)}function G(w,M){const q=n.get(w);if(w.version>0&&q.__version!==w.version){oe(q,w,M);return}t.bindTexture(i.TEXTURE_2D_ARRAY,q.__webglTexture,i.TEXTURE0+M)}function U(w,M){const q=n.get(w);if(w.version>0&&q.__version!==w.version){oe(q,w,M);return}t.bindTexture(i.TEXTURE_3D,q.__webglTexture,i.TEXTURE0+M)}function J(w,M){const q=n.get(w);if(w.version>0&&q.__version!==w.version){I(q,w,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,q.__webglTexture,i.TEXTURE0+M)}const y={[qi]:i.REPEAT,[mi]:i.CLAMP_TO_EDGE,[ka]:i.MIRRORED_REPEAT},N={[Gt]:i.NEAREST,[od]:i.NEAREST_MIPMAP_NEAREST,[_r]:i.NEAREST_MIPMAP_LINEAR,[cn]:i.LINEAR,[wa]:i.LINEAR_MIPMAP_NEAREST,[Yn]:i.LINEAR_MIPMAP_LINEAR},B={[fp]:i.NEVER,[vp]:i.ALWAYS,[pp]:i.LESS,[vd]:i.LEQUAL,[mp]:i.EQUAL,[xp]:i.GEQUAL,[gp]:i.GREATER,[_p]:i.NOTEQUAL};function X(w,M){if(M.type===Tn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===cn||M.magFilter===wa||M.magFilter===_r||M.magFilter===Yn||M.minFilter===cn||M.minFilter===wa||M.minFilter===_r||M.minFilter===Yn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,y[M.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,y[M.wrapT]),(w===i.TEXTURE_3D||w===i.TEXTURE_2D_ARRAY)&&i.texParameteri(w,i.TEXTURE_WRAP_R,y[M.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,N[M.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,N[M.minFilter]),M.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,B[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Gt||M.minFilter!==_r&&M.minFilter!==Yn||M.type===Tn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const q=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,q.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function se(w,M){let q=!1;w.__webglInit===void 0&&(w.__webglInit=!0,M.addEventListener("dispose",V));const te=M.source;let ne=d.get(te);ne===void 0&&(ne={},d.set(te,ne));const ee=v(M);if(ee!==w.__cacheKey){ne[ee]===void 0&&(ne[ee]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,q=!0),ne[ee].usedTimes++;const Pe=ne[w.__cacheKey];Pe!==void 0&&(ne[w.__cacheKey].usedTimes--,Pe.usedTimes===0&&W(M)),w.__cacheKey=ee,w.__webglTexture=ne[ee].texture}return q}function oe(w,M,q){let te=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(te=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(te=i.TEXTURE_3D);const ne=se(w,M),ee=M.source;t.bindTexture(te,w.__webglTexture,i.TEXTURE0+q);const Pe=n.get(ee);if(ee.version!==Pe.__version||ne===!0){t.activeTexture(i.TEXTURE0+q);const H=et.getPrimaries(et.workingColorSpace),re=M.colorSpace===fi?null:et.getPrimaries(M.colorSpace),Ne=M.colorSpace===fi||H===re?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ne);let ie=_(M.image,!1,s.maxTextureSize);ie=Qe(M,ie);const de=r.convert(M.format,M.colorSpace),Fe=r.convert(M.type);let Ee=A(M.internalFormat,de,Fe,M.colorSpace,M.isVideoTexture);X(te,M);let ue;const Be=M.mipmaps,be=M.isVideoTexture!==!0,je=Pe.__version===void 0||ne===!0,D=ee.dataReady,ge=T(M,ie);if(M.isDepthTexture)Ee=b(M.format===zs,M.type),je&&(be?t.texStorage2D(i.TEXTURE_2D,1,Ee,ie.width,ie.height):t.texImage2D(i.TEXTURE_2D,0,Ee,ie.width,ie.height,0,de,Fe,null));else if(M.isDataTexture)if(Be.length>0){be&&je&&t.texStorage2D(i.TEXTURE_2D,ge,Ee,Be[0].width,Be[0].height);for(let K=0,ae=Be.length;K<ae;K++)ue=Be[K],be?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ue.width,ue.height,de,Fe,ue.data):t.texImage2D(i.TEXTURE_2D,K,Ee,ue.width,ue.height,0,de,Fe,ue.data);M.generateMipmaps=!1}else be?(je&&t.texStorage2D(i.TEXTURE_2D,ge,Ee,ie.width,ie.height),D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ie.width,ie.height,de,Fe,ie.data)):t.texImage2D(i.TEXTURE_2D,0,Ee,ie.width,ie.height,0,de,Fe,ie.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){be&&je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Ee,Be[0].width,Be[0].height,ie.depth);for(let K=0,ae=Be.length;K<ae;K++)if(ue=Be[K],M.format!==fn)if(de!==null)if(be){if(D)if(M.layerUpdates.size>0){const _e=eu(ue.width,ue.height,M.format,M.type);for(const Me of M.layerUpdates){const Je=ue.data.subarray(Me*_e/ue.data.BYTES_PER_ELEMENT,(Me+1)*_e/ue.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,Me,ue.width,ue.height,1,de,Je,0,0)}M.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ue.width,ue.height,ie.depth,de,ue.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,K,Ee,ue.width,ue.height,ie.depth,0,ue.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?D&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,K,0,0,0,ue.width,ue.height,ie.depth,de,Fe,ue.data):t.texImage3D(i.TEXTURE_2D_ARRAY,K,Ee,ue.width,ue.height,ie.depth,0,de,Fe,ue.data)}else{be&&je&&t.texStorage2D(i.TEXTURE_2D,ge,Ee,Be[0].width,Be[0].height);for(let K=0,ae=Be.length;K<ae;K++)ue=Be[K],M.format!==fn?de!==null?be?D&&t.compressedTexSubImage2D(i.TEXTURE_2D,K,0,0,ue.width,ue.height,de,ue.data):t.compressedTexImage2D(i.TEXTURE_2D,K,Ee,ue.width,ue.height,0,ue.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,ue.width,ue.height,de,Fe,ue.data):t.texImage2D(i.TEXTURE_2D,K,Ee,ue.width,ue.height,0,de,Fe,ue.data)}else if(M.isDataArrayTexture)if(be){if(je&&t.texStorage3D(i.TEXTURE_2D_ARRAY,ge,Ee,ie.width,ie.height,ie.depth),D)if(M.layerUpdates.size>0){const K=eu(ie.width,ie.height,M.format,M.type);for(const ae of M.layerUpdates){const _e=ie.data.subarray(ae*K/ie.data.BYTES_PER_ELEMENT,(ae+1)*K/ie.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ae,ie.width,ie.height,1,de,Fe,_e)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ie.width,ie.height,ie.depth,de,Fe,ie.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,ie.width,ie.height,ie.depth,0,de,Fe,ie.data);else if(M.isData3DTexture)be?(je&&t.texStorage3D(i.TEXTURE_3D,ge,Ee,ie.width,ie.height,ie.depth),D&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ie.width,ie.height,ie.depth,de,Fe,ie.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,ie.width,ie.height,ie.depth,0,de,Fe,ie.data);else if(M.isFramebufferTexture){if(je)if(be)t.texStorage2D(i.TEXTURE_2D,ge,Ee,ie.width,ie.height);else{let K=ie.width,ae=ie.height;for(let _e=0;_e<ge;_e++)t.texImage2D(i.TEXTURE_2D,_e,Ee,K,ae,0,de,Fe,null),K>>=1,ae>>=1}}else if(Be.length>0){if(be&&je){const K=Oe(Be[0]);t.texStorage2D(i.TEXTURE_2D,ge,Ee,K.width,K.height)}for(let K=0,ae=Be.length;K<ae;K++)ue=Be[K],be?D&&t.texSubImage2D(i.TEXTURE_2D,K,0,0,de,Fe,ue):t.texImage2D(i.TEXTURE_2D,K,Ee,de,Fe,ue);M.generateMipmaps=!1}else if(be){if(je){const K=Oe(ie);t.texStorage2D(i.TEXTURE_2D,ge,Ee,K.width,K.height)}D&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,de,Fe,ie)}else t.texImage2D(i.TEXTURE_2D,0,Ee,de,Fe,ie);m(M)&&p(te),Pe.__version=ee.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function I(w,M,q){if(M.image.length!==6)return;const te=se(w,M),ne=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,w.__webglTexture,i.TEXTURE0+q);const ee=n.get(ne);if(ne.version!==ee.__version||te===!0){t.activeTexture(i.TEXTURE0+q);const Pe=et.getPrimaries(et.workingColorSpace),H=M.colorSpace===fi?null:et.getPrimaries(M.colorSpace),re=M.colorSpace===fi||Pe===H?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,re);const Ne=M.isCompressedTexture||M.image[0].isCompressedTexture,ie=M.image[0]&&M.image[0].isDataTexture,de=[];for(let ae=0;ae<6;ae++)!Ne&&!ie?de[ae]=_(M.image[ae],!0,s.maxCubemapSize):de[ae]=ie?M.image[ae].image:M.image[ae],de[ae]=Qe(M,de[ae]);const Fe=de[0],Ee=r.convert(M.format,M.colorSpace),ue=r.convert(M.type),Be=A(M.internalFormat,Ee,ue,M.colorSpace),be=M.isVideoTexture!==!0,je=ee.__version===void 0||te===!0,D=ne.dataReady;let ge=T(M,Fe);X(i.TEXTURE_CUBE_MAP,M);let K;if(Ne){be&&je&&t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Be,Fe.width,Fe.height);for(let ae=0;ae<6;ae++){K=de[ae].mipmaps;for(let _e=0;_e<K.length;_e++){const Me=K[_e];M.format!==fn?Ee!==null?be?D&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,0,0,Me.width,Me.height,Ee,Me.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,Be,Me.width,Me.height,0,Me.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):be?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,0,0,Me.width,Me.height,Ee,ue,Me.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e,Be,Me.width,Me.height,0,Ee,ue,Me.data)}}}else{if(K=M.mipmaps,be&&je){K.length>0&&ge++;const ae=Oe(de[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,ge,Be,ae.width,ae.height)}for(let ae=0;ae<6;ae++)if(ie){be?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,de[ae].width,de[ae].height,Ee,ue,de[ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Be,de[ae].width,de[ae].height,0,Ee,ue,de[ae].data);for(let _e=0;_e<K.length;_e++){const Je=K[_e].image[ae].image;be?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,0,0,Je.width,Je.height,Ee,ue,Je.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,Be,Je.width,Je.height,0,Ee,ue,Je.data)}}else{be?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,0,0,Ee,ue,de[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0,Be,Ee,ue,de[ae]);for(let _e=0;_e<K.length;_e++){const Me=K[_e];be?D&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,0,0,Ee,ue,Me.image[ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+ae,_e+1,Be,Ee,ue,Me.image[ae])}}}m(M)&&p(i.TEXTURE_CUBE_MAP),ee.__version=ne.version,M.onUpdate&&M.onUpdate(M)}w.__version=M.version}function z(w,M,q,te,ne,ee){const Pe=r.convert(q.format,q.colorSpace),H=r.convert(q.type),re=A(q.internalFormat,Pe,H,q.colorSpace);if(!n.get(M).__hasExternalTextures){const ie=Math.max(1,M.width>>ee),de=Math.max(1,M.height>>ee);ne===i.TEXTURE_3D||ne===i.TEXTURE_2D_ARRAY?t.texImage3D(ne,ee,re,ie,de,M.depth,0,Pe,H,null):t.texImage2D(ne,ee,re,ie,de,0,Pe,H,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),Se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,te,ne,n.get(q).__webglTexture,0,Re(M)):(ne===i.TEXTURE_2D||ne>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&ne<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,te,ne,n.get(q).__webglTexture,ee),t.bindFramebuffer(i.FRAMEBUFFER,null)}function $(w,M,q){if(i.bindRenderbuffer(i.RENDERBUFFER,w),M.depthBuffer){const te=M.depthTexture,ne=te&&te.isDepthTexture?te.type:null,ee=b(M.stencilBuffer,ne),Pe=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=Re(M);Se(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,H,ee,M.width,M.height):q?i.renderbufferStorageMultisample(i.RENDERBUFFER,H,ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ee,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,Pe,i.RENDERBUFFER,w)}else{const te=M.textures;for(let ne=0;ne<te.length;ne++){const ee=te[ne],Pe=r.convert(ee.format,ee.colorSpace),H=r.convert(ee.type),re=A(ee.internalFormat,Pe,H,ee.colorSpace),Ne=Re(M);q&&Se(M)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,Ne,re,M.width,M.height):Se(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Ne,re,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,re,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Q(w,M){if(M&&M.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,w),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(M.depthTexture).__webglTexture||M.depthTexture.image.width!==M.width||M.depthTexture.image.height!==M.height)&&(M.depthTexture.image.width=M.width,M.depthTexture.image.height=M.height,M.depthTexture.needsUpdate=!0),k(M.depthTexture,0);const te=n.get(M.depthTexture).__webglTexture,ne=Re(M);if(M.depthTexture.format===Ps)Se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,te,0);else if(M.depthTexture.format===zs)Se(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0,ne):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function me(w){const M=n.get(w),q=w.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==w.depthTexture){const te=w.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),te){const ne=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,te.removeEventListener("dispose",ne)};te.addEventListener("dispose",ne),M.__depthDisposeCallback=ne}M.__boundDepthTexture=te}if(w.depthTexture&&!M.__autoAllocateDepthBuffer){if(q)throw new Error("target.depthTexture not supported in Cube render targets");Q(M.__webglFramebuffer,w)}else if(q){M.__webglDepthbuffer=[];for(let te=0;te<6;te++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[te]),M.__webglDepthbuffer[te]===void 0)M.__webglDepthbuffer[te]=i.createRenderbuffer(),$(M.__webglDepthbuffer[te],w,!1);else{const ne=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ee=M.__webglDepthbuffer[te];i.bindRenderbuffer(i.RENDERBUFFER,ee),i.framebufferRenderbuffer(i.FRAMEBUFFER,ne,i.RENDERBUFFER,ee)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),$(M.__webglDepthbuffer,w,!1);else{const te=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,ne=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,ne),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,ne)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(w,M,q){const te=n.get(w);M!==void 0&&z(te.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),q!==void 0&&me(w)}function fe(w){const M=w.texture,q=n.get(w),te=n.get(M);w.addEventListener("dispose",L);const ne=w.textures,ee=w.isWebGLCubeRenderTarget===!0,Pe=ne.length>1;if(Pe||(te.__webglTexture===void 0&&(te.__webglTexture=i.createTexture()),te.__version=M.version,a.memory.textures++),ee){q.__webglFramebuffer=[];for(let H=0;H<6;H++)if(M.mipmaps&&M.mipmaps.length>0){q.__webglFramebuffer[H]=[];for(let re=0;re<M.mipmaps.length;re++)q.__webglFramebuffer[H][re]=i.createFramebuffer()}else q.__webglFramebuffer[H]=i.createFramebuffer()}else{if(M.mipmaps&&M.mipmaps.length>0){q.__webglFramebuffer=[];for(let H=0;H<M.mipmaps.length;H++)q.__webglFramebuffer[H]=i.createFramebuffer()}else q.__webglFramebuffer=i.createFramebuffer();if(Pe)for(let H=0,re=ne.length;H<re;H++){const Ne=n.get(ne[H]);Ne.__webglTexture===void 0&&(Ne.__webglTexture=i.createTexture(),a.memory.textures++)}if(w.samples>0&&Se(w)===!1){q.__webglMultisampledFramebuffer=i.createFramebuffer(),q.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,q.__webglMultisampledFramebuffer);for(let H=0;H<ne.length;H++){const re=ne[H];q.__webglColorRenderbuffer[H]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,q.__webglColorRenderbuffer[H]);const Ne=r.convert(re.format,re.colorSpace),ie=r.convert(re.type),de=A(re.internalFormat,Ne,ie,re.colorSpace,w.isXRRenderTarget===!0),Fe=Re(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,Fe,de,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,q.__webglColorRenderbuffer[H])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(q.__webglDepthRenderbuffer=i.createRenderbuffer(),$(q.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(ee){t.bindTexture(i.TEXTURE_CUBE_MAP,te.__webglTexture),X(i.TEXTURE_CUBE_MAP,M);for(let H=0;H<6;H++)if(M.mipmaps&&M.mipmaps.length>0)for(let re=0;re<M.mipmaps.length;re++)z(q.__webglFramebuffer[H][re],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,re);else z(q.__webglFramebuffer[H],w,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);m(M)&&p(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Pe){for(let H=0,re=ne.length;H<re;H++){const Ne=ne[H],ie=n.get(Ne);t.bindTexture(i.TEXTURE_2D,ie.__webglTexture),X(i.TEXTURE_2D,Ne),z(q.__webglFramebuffer,w,Ne,i.COLOR_ATTACHMENT0+H,i.TEXTURE_2D,0),m(Ne)&&p(i.TEXTURE_2D)}t.unbindTexture()}else{let H=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(H=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(H,te.__webglTexture),X(H,M),M.mipmaps&&M.mipmaps.length>0)for(let re=0;re<M.mipmaps.length;re++)z(q.__webglFramebuffer[re],w,M,i.COLOR_ATTACHMENT0,H,re);else z(q.__webglFramebuffer,w,M,i.COLOR_ATTACHMENT0,H,0);m(M)&&p(H),t.unbindTexture()}w.depthBuffer&&me(w)}function ye(w){const M=w.textures;for(let q=0,te=M.length;q<te;q++){const ne=M[q];if(m(ne)){const ee=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,Pe=n.get(ne).__webglTexture;t.bindTexture(ee,Pe),p(ee),t.unbindTexture()}}}const Ie=[],C=[];function qe(w){if(w.samples>0){if(Se(w)===!1){const M=w.textures,q=w.width,te=w.height;let ne=i.COLOR_BUFFER_BIT;const ee=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,Pe=n.get(w),H=M.length>1;if(H)for(let re=0;re<M.length;re++)t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglFramebuffer);for(let re=0;re<M.length;re++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(ne|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(ne|=i.STENCIL_BUFFER_BIT)),H){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[re]);const Ne=n.get(M[re]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,Ne,0)}i.blitFramebuffer(0,0,q,te,0,0,q,te,ne,i.NEAREST),c===!0&&(Ie.length=0,C.length=0,Ie.push(i.COLOR_ATTACHMENT0+re),w.depthBuffer&&w.resolveDepthBuffer===!1&&(Ie.push(ee),C.push(ee),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,C)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Ie))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),H)for(let re=0;re<M.length;re++){t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.RENDERBUFFER,Pe.__webglColorRenderbuffer[re]);const Ne=n.get(M[re]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,Pe.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+re,i.TEXTURE_2D,Ne,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,Pe.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&c){const M=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Re(w){return Math.min(s.maxSamples,w.samples)}function Se(w){const M=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Ae(w){const M=a.render.frame;h.get(w)!==M&&(h.set(w,M),w.update())}function Qe(w,M){const q=w.colorSpace,te=w.format,ne=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||q!==Ot&&q!==fi&&(et.getTransfer(q)===ft?(te!==fn||ne!==Qn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",q)),M}function Oe(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(l.width=w.naturalWidth||w.width,l.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(l.width=w.displayWidth,l.height=w.displayHeight):(l.width=w.width,l.height=w.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=E,this.setTexture2D=k,this.setTexture2DArray=G,this.setTexture3D=U,this.setTextureCube=J,this.rebindTextures=le,this.setupRenderTarget=fe,this.updateRenderTargetMipmap=ye,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=me,this.setupFrameBufferTexture=z,this.useMultisampledRTT=Se}function kx(i,e){function t(n,s=fi){let r;const a=et.getTransfer(s);if(n===Qn)return i.UNSIGNED_BYTE;if(n===yl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===Ml)return i.UNSIGNED_SHORT_5_5_5_1;if(n===hd)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===cd)return i.BYTE;if(n===ld)return i.SHORT;if(n===Rr)return i.UNSIGNED_SHORT;if(n===vl)return i.INT;if(n===Xi)return i.UNSIGNED_INT;if(n===Tn)return i.FLOAT;if(n===Or)return i.HALF_FLOAT;if(n===ud)return i.ALPHA;if(n===dd)return i.RGB;if(n===fn)return i.RGBA;if(n===fd)return i.LUMINANCE;if(n===pd)return i.LUMINANCE_ALPHA;if(n===Ps)return i.DEPTH_COMPONENT;if(n===zs)return i.DEPTH_STENCIL;if(n===Sl)return i.RED;if(n===El)return i.RED_INTEGER;if(n===md)return i.RG;if(n===bl)return i.RG_INTEGER;if(n===Tl)return i.RGBA_INTEGER;if(n===Ra||n===Ca||n===Ia||n===Pa)if(a===ft)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===Ra)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Pa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===Ra)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ca)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ia)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Pa)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Ac||n===wc||n===Rc||n===Cc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===Ac)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===wc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Rc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Cc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ic||n===Pc||n===Lc)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ic||n===Pc)return a===ft?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Lc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Nc||n===Dc||n===Uc||n===Oc||n===Fc||n===Bc||n===kc||n===zc||n===Hc||n===Vc||n===Gc||n===Wc||n===qc||n===Xc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Nc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Dc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Uc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Fc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===kc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Hc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Vc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Gc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Xc)return a===ft?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===La||n===Yc||n===jc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===La)return a===ft?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===jc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===gd||n===Kc||n===$c||n===Zc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===La)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Kc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===$c)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Zc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ks?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}class zx extends Vt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Kn extends pt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hx={type:"move"};class Ko{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Kn,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Kn,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Kn,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const _ of e.hand.values()){const m=t.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Hx)))}return o!==null&&(o.visible=s!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Kn;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Vx=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Gx=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Wx{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const s=new bt,r=e.properties.get(s);r.__webglTexture=t.texture,(t.depthNear!=n.depthNear||t.depthFar!=n.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=s}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ei({vertexShader:Vx,fragmentShader:Gx,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new js(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class qx extends Ei{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=new Wx,m=t.getContextAttributes();let p=null,A=null;const b=[],T=[],V=new we;let L=null;const R=new Vt;R.layers.enable(1),R.viewport=new it;const W=new Vt;W.layers.enable(2),W.viewport=new it;const ce=[R,W],x=new zx;x.layers.enable(1),x.layers.enable(2);let E=null,Z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(I){let z=b[I];return z===void 0&&(z=new Ko,b[I]=z),z.getTargetRaySpace()},this.getControllerGrip=function(I){let z=b[I];return z===void 0&&(z=new Ko,b[I]=z),z.getGripSpace()},this.getHand=function(I){let z=b[I];return z===void 0&&(z=new Ko,b[I]=z),z.getHandSpace()};function v(I){const z=T.indexOf(I.inputSource);if(z===-1)return;const $=b[z];$!==void 0&&($.update(I.inputSource,I.frame,l||a),$.dispatchEvent({type:I.type,data:I.inputSource}))}function k(){s.removeEventListener("select",v),s.removeEventListener("selectstart",v),s.removeEventListener("selectend",v),s.removeEventListener("squeeze",v),s.removeEventListener("squeezestart",v),s.removeEventListener("squeezeend",v),s.removeEventListener("end",k),s.removeEventListener("inputsourceschange",G);for(let I=0;I<b.length;I++){const z=T[I];z!==null&&(T[I]=null,b[I].disconnect(z))}E=null,Z=null,_.reset(),e.setRenderTarget(p),f=null,d=null,u=null,s=null,A=null,oe.stop(),n.isPresenting=!1,e.setPixelRatio(L),e.setSize(V.width,V.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(I){r=I,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(I){o=I,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(I){l=I},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(I){if(s=I,s!==null){if(p=e.getRenderTarget(),s.addEventListener("select",v),s.addEventListener("selectstart",v),s.addEventListener("selectend",v),s.addEventListener("squeeze",v),s.addEventListener("squeezestart",v),s.addEventListener("squeezeend",v),s.addEventListener("end",k),s.addEventListener("inputsourceschange",G),m.xrCompatible!==!0&&await t.makeXRCompatible(),L=e.getPixelRatio(),e.getSize(V),s.renderState.layers===void 0){const z={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,z),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),A=new Yi(f.framebufferWidth,f.framebufferHeight,{format:fn,type:Qn,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let z=null,$=null,Q=null;m.depth&&(Q=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,z=m.stencil?zs:Ps,$=m.stencil?ks:Xi);const me={colorFormat:t.RGBA8,depthFormat:Q,scaleFactor:r};u=new XRWebGLBinding(s,t),d=u.createProjectionLayer(me),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),A=new Yi(d.textureWidth,d.textureHeight,{format:fn,type:Qn,depthTexture:new Pd(d.textureWidth,d.textureHeight,$,void 0,void 0,void 0,void 0,void 0,void 0,z),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}A.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await s.requestReferenceSpace(o),oe.setContext(s),oe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function G(I){for(let z=0;z<I.removed.length;z++){const $=I.removed[z],Q=T.indexOf($);Q>=0&&(T[Q]=null,b[Q].disconnect($))}for(let z=0;z<I.added.length;z++){const $=I.added[z];let Q=T.indexOf($);if(Q===-1){for(let le=0;le<b.length;le++)if(le>=T.length){T.push($),Q=le;break}else if(T[le]===null){T[le]=$,Q=le;break}if(Q===-1)break}const me=b[Q];me&&me.connect($)}}const U=new P,J=new P;function y(I,z,$){U.setFromMatrixPosition(z.matrixWorld),J.setFromMatrixPosition($.matrixWorld);const Q=U.distanceTo(J),me=z.projectionMatrix.elements,le=$.projectionMatrix.elements,fe=me[14]/(me[10]-1),ye=me[14]/(me[10]+1),Ie=(me[9]+1)/me[5],C=(me[9]-1)/me[5],qe=(me[8]-1)/me[0],Re=(le[8]+1)/le[0],Se=fe*qe,Ae=fe*Re,Qe=Q/(-qe+Re),Oe=Qe*-qe;if(z.matrixWorld.decompose(I.position,I.quaternion,I.scale),I.translateX(Oe),I.translateZ(Qe),I.matrixWorld.compose(I.position,I.quaternion,I.scale),I.matrixWorldInverse.copy(I.matrixWorld).invert(),me[10]===-1)I.projectionMatrix.copy(z.projectionMatrix),I.projectionMatrixInverse.copy(z.projectionMatrixInverse);else{const w=fe+Qe,M=ye+Qe,q=Se-Oe,te=Ae+(Q-Oe),ne=Ie*ye/M*w,ee=C*ye/M*w;I.projectionMatrix.makePerspective(q,te,ne,ee,w,M),I.projectionMatrixInverse.copy(I.projectionMatrix).invert()}}function N(I,z){z===null?I.matrixWorld.copy(I.matrix):I.matrixWorld.multiplyMatrices(z.matrixWorld,I.matrix),I.matrixWorldInverse.copy(I.matrixWorld).invert()}this.updateCamera=function(I){if(s===null)return;let z=I.near,$=I.far;_.texture!==null&&(_.depthNear>0&&(z=_.depthNear),_.depthFar>0&&($=_.depthFar)),x.near=W.near=R.near=z,x.far=W.far=R.far=$,(E!==x.near||Z!==x.far)&&(s.updateRenderState({depthNear:x.near,depthFar:x.far}),E=x.near,Z=x.far);const Q=I.parent,me=x.cameras;N(x,Q);for(let le=0;le<me.length;le++)N(me[le],Q);me.length===2?y(x,R,W):x.projectionMatrix.copy(R.projectionMatrix),B(I,x,Q)};function B(I,z,$){$===null?I.matrix.copy(z.matrixWorld):(I.matrix.copy($.matrixWorld),I.matrix.invert(),I.matrix.multiply(z.matrixWorld)),I.matrix.decompose(I.position,I.quaternion,I.scale),I.updateMatrixWorld(!0),I.projectionMatrix.copy(z.projectionMatrix),I.projectionMatrixInverse.copy(z.projectionMatrixInverse),I.isPerspectiveCamera&&(I.fov=Hs*2*Math.atan(1/I.projectionMatrix.elements[5]),I.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(I){c=I,d!==null&&(d.fixedFoveation=I),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=I)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(x)};let X=null;function se(I,z){if(h=z.getViewerPose(l||a),g=z,h!==null){const $=h.views;f!==null&&(e.setRenderTargetFramebuffer(A,f.framebuffer),e.setRenderTarget(A));let Q=!1;$.length!==x.cameras.length&&(x.cameras.length=0,Q=!0);for(let le=0;le<$.length;le++){const fe=$[le];let ye=null;if(f!==null)ye=f.getViewport(fe);else{const C=u.getViewSubImage(d,fe);ye=C.viewport,le===0&&(e.setRenderTargetTextures(A,C.colorTexture,d.ignoreDepthValues?void 0:C.depthStencilTexture),e.setRenderTarget(A))}let Ie=ce[le];Ie===void 0&&(Ie=new Vt,Ie.layers.enable(le),Ie.viewport=new it,ce[le]=Ie),Ie.matrix.fromArray(fe.transform.matrix),Ie.matrix.decompose(Ie.position,Ie.quaternion,Ie.scale),Ie.projectionMatrix.fromArray(fe.projectionMatrix),Ie.projectionMatrixInverse.copy(Ie.projectionMatrix).invert(),Ie.viewport.set(ye.x,ye.y,ye.width,ye.height),le===0&&(x.matrix.copy(Ie.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),Q===!0&&x.cameras.push(Ie)}const me=s.enabledFeatures;if(me&&me.includes("depth-sensing")){const le=u.getDepthInformation($[0]);le&&le.isValid&&le.texture&&_.init(e,le,s.renderState)}}for(let $=0;$<b.length;$++){const Q=T[$],me=b[$];Q!==null&&me!==void 0&&me.update(Q,z,l||a)}X&&X(I,z),z.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:z}),g=null}const oe=new Id;oe.setAnimationLoop(se),this.setAnimationLoop=function(I){X=I},this.dispose=function(){}}}const Pi=new Pn,Xx=new We;function Yx(i,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,wd(i)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function s(m,p,A,b,T){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),u(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,T)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),_(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,A,b):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===en&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===en&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const A=e.get(p),b=A.envMap,T=A.envMapRotation;b&&(m.envMap.value=b,Pi.copy(T),Pi.x*=-1,Pi.y*=-1,Pi.z*=-1,b.isCubeTexture&&b.isRenderTargetTexture===!1&&(Pi.y*=-1,Pi.z*=-1),m.envMapRotation.value.setFromMatrix4(Xx.makeRotationFromEuler(Pi)),m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,A,b){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*A,m.scale.value=b*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,A){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===en&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=A.texture,m.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const A=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(A.matrixWorld),m.nearDistance.value=A.shadow.camera.near,m.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function jx(i,e,t,n){let s={},r={},a=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function c(A,b){const T=b.program;n.uniformBlockBinding(A,T)}function l(A,b){let T=s[A.id];T===void 0&&(g(A),T=h(A),s[A.id]=T,A.addEventListener("dispose",m));const V=b.program;n.updateUBOMapping(A,V);const L=e.render.frame;r[A.id]!==L&&(d(A),r[A.id]=L)}function h(A){const b=u();A.__bindingPointIndex=b;const T=i.createBuffer(),V=A.__size,L=A.usage;return i.bindBuffer(i.UNIFORM_BUFFER,T),i.bufferData(i.UNIFORM_BUFFER,V,L),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,b,T),T}function u(){for(let A=0;A<o;A++)if(a.indexOf(A)===-1)return a.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(A){const b=s[A.id],T=A.uniforms,V=A.__cache;i.bindBuffer(i.UNIFORM_BUFFER,b);for(let L=0,R=T.length;L<R;L++){const W=Array.isArray(T[L])?T[L]:[T[L]];for(let ce=0,x=W.length;ce<x;ce++){const E=W[ce];if(f(E,L,ce,V)===!0){const Z=E.__offset,v=Array.isArray(E.value)?E.value:[E.value];let k=0;for(let G=0;G<v.length;G++){const U=v[G],J=_(U);typeof U=="number"||typeof U=="boolean"?(E.__data[0]=U,i.bufferSubData(i.UNIFORM_BUFFER,Z+k,E.__data)):U.isMatrix3?(E.__data[0]=U.elements[0],E.__data[1]=U.elements[1],E.__data[2]=U.elements[2],E.__data[3]=0,E.__data[4]=U.elements[3],E.__data[5]=U.elements[4],E.__data[6]=U.elements[5],E.__data[7]=0,E.__data[8]=U.elements[6],E.__data[9]=U.elements[7],E.__data[10]=U.elements[8],E.__data[11]=0):(U.toArray(E.__data,k),k+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Z,E.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function f(A,b,T,V){const L=A.value,R=b+"_"+T;if(V[R]===void 0)return typeof L=="number"||typeof L=="boolean"?V[R]=L:V[R]=L.clone(),!0;{const W=V[R];if(typeof L=="number"||typeof L=="boolean"){if(W!==L)return V[R]=L,!0}else if(W.equals(L)===!1)return W.copy(L),!0}return!1}function g(A){const b=A.uniforms;let T=0;const V=16;for(let R=0,W=b.length;R<W;R++){const ce=Array.isArray(b[R])?b[R]:[b[R]];for(let x=0,E=ce.length;x<E;x++){const Z=ce[x],v=Array.isArray(Z.value)?Z.value:[Z.value];for(let k=0,G=v.length;k<G;k++){const U=v[k],J=_(U),y=T%V,N=y%J.boundary,B=y+N;T+=N,B!==0&&V-B<J.storage&&(T+=V-B),Z.__data=new Float32Array(J.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=T,T+=J.storage}}}const L=T%V;return L>0&&(T+=V-L),A.__size=T,A.__cache={},this}function _(A){const b={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(b.boundary=4,b.storage=4):A.isVector2?(b.boundary=8,b.storage=8):A.isVector3||A.isColor?(b.boundary=16,b.storage=12):A.isVector4?(b.boundary=16,b.storage=16):A.isMatrix3?(b.boundary=48,b.storage=48):A.isMatrix4?(b.boundary=64,b.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),b}function m(A){const b=A.target;b.removeEventListener("dispose",m);const T=a.indexOf(b.__bindingPointIndex);a.splice(T,1),i.deleteBuffer(s[b.id]),delete s[b.id],delete r[b.id]}function p(){for(const A in s)i.deleteBuffer(s[A]);a=[],s={},r={}}return{bind:c,update:l,dispose:p}}class Kx{constructor(e={}){const{canvas:t=Op(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=e;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=a;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],A=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=gt,this.toneMapping=Si,this.toneMappingExposure=1;const b=this;let T=!1,V=0,L=0,R=null,W=-1,ce=null;const x=new it,E=new it;let Z=null;const v=new Ve(0);let k=0,G=t.width,U=t.height,J=1,y=null,N=null;const B=new it(0,0,G,U),X=new it(0,0,G,U);let se=!1;const oe=new Il;let I=!1,z=!1;const $=new We,Q=new We,me=new P,le=new it,fe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let ye=!1;function Ie(){return R===null?J:1}let C=n;function qe(S,O){return t.getContext(S,O)}try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xl}`),t.addEventListener("webglcontextlost",ae,!1),t.addEventListener("webglcontextrestored",_e,!1),t.addEventListener("webglcontextcreationerror",Me,!1),C===null){const O="webgl2";if(C=qe(O,S),C===null)throw qe(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}let Re,Se,Ae,Qe,Oe,w,M,q,te,ne,ee,Pe,H,re,Ne,ie,de,Fe,Ee,ue,Be,be,je,D;function ge(){Re=new e0(C),Re.init(),be=new kx(C,Re),Se=new j_(C,Re,e,be),Ae=new Ox(C),Se.reverseDepthBuffer&&Ae.buffers.depth.setReversed(!0),Qe=new i0(C),Oe=new Mx,w=new Bx(C,Re,Ae,Oe,Se,be,Qe),M=new $_(b),q=new Q_(b),te=new hm(C),je=new X_(C,te),ne=new t0(C,te,Qe,je),ee=new r0(C,ne,te,Qe),Ee=new s0(C,Se,w),ie=new K_(Oe),Pe=new yx(b,M,q,Re,Se,je,ie),H=new Yx(b,Oe),re=new Ex,Ne=new Cx(Re),Fe=new q_(b,M,q,Ae,ee,d,c),de=new Dx(b,ee,Se),D=new jx(C,Qe,Se,Ae),ue=new Y_(C,Re,Qe),Be=new n0(C,Re,Qe),Qe.programs=Pe.programs,b.capabilities=Se,b.extensions=Re,b.properties=Oe,b.renderLists=re,b.shadowMap=de,b.state=Ae,b.info=Qe}ge();const K=new qx(b,C);this.xr=K,this.getContext=function(){return C},this.getContextAttributes=function(){return C.getContextAttributes()},this.forceContextLoss=function(){const S=Re.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Re.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return J},this.setPixelRatio=function(S){S!==void 0&&(J=S,this.setSize(G,U,!1))},this.getSize=function(S){return S.set(G,U)},this.setSize=function(S,O,Y=!0){if(K.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}G=S,U=O,t.width=Math.floor(S*J),t.height=Math.floor(O*J),Y===!0&&(t.style.width=S+"px",t.style.height=O+"px"),this.setViewport(0,0,S,O)},this.getDrawingBufferSize=function(S){return S.set(G*J,U*J).floor()},this.setDrawingBufferSize=function(S,O,Y){G=S,U=O,J=Y,t.width=Math.floor(S*Y),t.height=Math.floor(O*Y),this.setViewport(0,0,S,O)},this.getCurrentViewport=function(S){return S.copy(x)},this.getViewport=function(S){return S.copy(B)},this.setViewport=function(S,O,Y,j){S.isVector4?B.set(S.x,S.y,S.z,S.w):B.set(S,O,Y,j),Ae.viewport(x.copy(B).multiplyScalar(J).round())},this.getScissor=function(S){return S.copy(X)},this.setScissor=function(S,O,Y,j){S.isVector4?X.set(S.x,S.y,S.z,S.w):X.set(S,O,Y,j),Ae.scissor(E.copy(X).multiplyScalar(J).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(S){Ae.setScissorTest(se=S)},this.setOpaqueSort=function(S){y=S},this.setTransparentSort=function(S){N=S},this.getClearColor=function(S){return S.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor.apply(Fe,arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha.apply(Fe,arguments)},this.clear=function(S=!0,O=!0,Y=!0){let j=0;if(S){let F=!1;if(R!==null){const he=R.texture.format;F=he===Tl||he===bl||he===El}if(F){const he=R.texture.type,xe=he===Qn||he===Xi||he===Rr||he===ks||he===yl||he===Ml,Te=Fe.getClearColor(),Ce=Fe.getClearAlpha(),ke=Te.r,ze=Te.g,De=Te.b;xe?(f[0]=ke,f[1]=ze,f[2]=De,f[3]=Ce,C.clearBufferuiv(C.COLOR,0,f)):(g[0]=ke,g[1]=ze,g[2]=De,g[3]=Ce,C.clearBufferiv(C.COLOR,0,g))}else j|=C.COLOR_BUFFER_BIT}O&&(j|=C.DEPTH_BUFFER_BIT,C.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),Y&&(j|=C.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),C.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ae,!1),t.removeEventListener("webglcontextrestored",_e,!1),t.removeEventListener("webglcontextcreationerror",Me,!1),re.dispose(),Ne.dispose(),Oe.dispose(),M.dispose(),q.dispose(),ee.dispose(),je.dispose(),D.dispose(),Pe.dispose(),K.dispose(),K.removeEventListener("sessionstart",Jl),K.removeEventListener("sessionend",Ql),Ti.stop()};function ae(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),T=!0}function _e(){console.log("THREE.WebGLRenderer: Context Restored."),T=!1;const S=Qe.autoReset,O=de.enabled,Y=de.autoUpdate,j=de.needsUpdate,F=de.type;ge(),Qe.autoReset=S,de.enabled=O,de.autoUpdate=Y,de.needsUpdate=j,de.type=F}function Me(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Je(S){const O=S.target;O.removeEventListener("dispose",Je),vt(O)}function vt(S){jt(S),Oe.remove(S)}function jt(S){const O=Oe.get(S).programs;O!==void 0&&(O.forEach(function(Y){Pe.releaseProgram(Y)}),S.isShaderMaterial&&Pe.releaseShaderCache(S))}this.renderBufferDirect=function(S,O,Y,j,F,he){O===null&&(O=fe);const xe=F.isMesh&&F.matrixWorld.determinant()<0,Te=bf(S,O,Y,j,F);Ae.setMaterial(j,xe);let Ce=Y.index,ke=1;if(j.wireframe===!0){if(Ce=ne.getWireframeAttribute(Y),Ce===void 0)return;ke=2}const ze=Y.drawRange,De=Y.attributes.position;let ot=ze.start*ke,dt=(ze.start+ze.count)*ke;he!==null&&(ot=Math.max(ot,he.start*ke),dt=Math.min(dt,(he.start+he.count)*ke)),Ce!==null?(ot=Math.max(ot,0),dt=Math.min(dt,Ce.count)):De!=null&&(ot=Math.max(ot,0),dt=Math.min(dt,De.count));const mt=dt-ot;if(mt<0||mt===1/0)return;je.setup(F,j,Te,Y,Ce);let tn,st=ue;if(Ce!==null&&(tn=te.get(Ce),st=Be,st.setIndex(tn)),F.isMesh)j.wireframe===!0?(Ae.setLineWidth(j.wireframeLinewidth*Ie()),st.setMode(C.LINES)):st.setMode(C.TRIANGLES);else if(F.isLine){let Ue=j.linewidth;Ue===void 0&&(Ue=1),Ae.setLineWidth(Ue*Ie()),F.isLineSegments?st.setMode(C.LINES):F.isLineLoop?st.setMode(C.LINE_LOOP):st.setMode(C.LINE_STRIP)}else F.isPoints?st.setMode(C.POINTS):F.isSprite&&st.setMode(C.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)st.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Re.get("WEBGL_multi_draw"))st.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const Ue=F._multiDrawStarts,It=F._multiDrawCounts,rt=F._multiDrawCount,gn=Ce?te.get(Ce).bytesPerElement:1,Zi=Oe.get(j).currentProgram.getUniforms();for(let nn=0;nn<rt;nn++)Zi.setValue(C,"_gl_DrawID",nn),st.render(Ue[nn]/gn,It[nn])}else if(F.isInstancedMesh)st.renderInstances(ot,mt,F.count);else if(Y.isInstancedBufferGeometry){const Ue=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,It=Math.min(Y.instanceCount,Ue);st.renderInstances(ot,mt,It)}else st.render(ot,mt)};function tt(S,O,Y){S.transparent===!0&&S.side===Qt&&S.forceSinglePass===!1?(S.side=en,S.needsUpdate=!0,Gr(S,O,Y),S.side=Jn,S.needsUpdate=!0,Gr(S,O,Y),S.side=Qt):Gr(S,O,Y)}this.compile=function(S,O,Y=null){Y===null&&(Y=S),m=Ne.get(Y),m.init(O),A.push(m),Y.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),S!==Y&&S.traverseVisible(function(F){F.isLight&&F.layers.test(O.layers)&&(m.pushLight(F),F.castShadow&&m.pushShadow(F))}),m.setupLights();const j=new Set;return S.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const he=F.material;if(he)if(Array.isArray(he))for(let xe=0;xe<he.length;xe++){const Te=he[xe];tt(Te,Y,F),j.add(Te)}else tt(he,Y,F),j.add(he)}),A.pop(),m=null,j},this.compileAsync=function(S,O,Y=null){const j=this.compile(S,O,Y);return new Promise(F=>{function he(){if(j.forEach(function(xe){Oe.get(xe).currentProgram.isReady()&&j.delete(xe)}),j.size===0){F(S);return}setTimeout(he,10)}Re.get("KHR_parallel_shader_compile")!==null?he():setTimeout(he,10)})};let Kt=null;function On(S){Kt&&Kt(S)}function Jl(){Ti.stop()}function Ql(){Ti.start()}const Ti=new Id;Ti.setAnimationLoop(On),typeof self<"u"&&Ti.setContext(self),this.setAnimationLoop=function(S){Kt=S,K.setAnimationLoop(S),S===null?Ti.stop():Ti.start()},K.addEventListener("sessionstart",Jl),K.addEventListener("sessionend",Ql),this.render=function(S,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(T===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),K.enabled===!0&&K.isPresenting===!0&&(K.cameraAutoUpdate===!0&&K.updateCamera(O),O=K.getCamera()),S.isScene===!0&&S.onBeforeRender(b,S,O,R),m=Ne.get(S,A.length),m.init(O),A.push(m),Q.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),oe.setFromProjectionMatrix(Q),z=this.localClippingEnabled,I=ie.init(this.clippingPlanes,z),_=re.get(S,p.length),_.init(),p.push(_),K.enabled===!0&&K.isPresenting===!0){const he=b.xr.getDepthSensingMesh();he!==null&&_o(he,O,-1/0,b.sortObjects)}_o(S,O,0,b.sortObjects),_.finish(),b.sortObjects===!0&&_.sort(y,N),ye=K.enabled===!1||K.isPresenting===!1||K.hasDepthSensing()===!1,ye&&Fe.addToRenderList(_,S),this.info.render.frame++,I===!0&&ie.beginShadows();const Y=m.state.shadowsArray;de.render(Y,S,O),I===!0&&ie.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=_.opaque,F=_.transmissive;if(m.setupLights(),O.isArrayCamera){const he=O.cameras;if(F.length>0)for(let xe=0,Te=he.length;xe<Te;xe++){const Ce=he[xe];th(j,F,S,Ce)}ye&&Fe.render(S);for(let xe=0,Te=he.length;xe<Te;xe++){const Ce=he[xe];eh(_,S,Ce,Ce.viewport)}}else F.length>0&&th(j,F,S,O),ye&&Fe.render(S),eh(_,S,O);R!==null&&(w.updateMultisampleRenderTarget(R),w.updateRenderTargetMipmap(R)),S.isScene===!0&&S.onAfterRender(b,S,O),je.resetDefaultState(),W=-1,ce=null,A.pop(),A.length>0?(m=A[A.length-1],I===!0&&ie.setGlobalState(b.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function _o(S,O,Y,j){if(S.visible===!1)return;if(S.layers.test(O.layers)){if(S.isGroup)Y=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(O);else if(S.isLight)m.pushLight(S),S.castShadow&&m.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||oe.intersectsSprite(S)){j&&le.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Q);const xe=ee.update(S),Te=S.material;Te.visible&&_.push(S,xe,Te,Y,le.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||oe.intersectsObject(S))){const xe=ee.update(S),Te=S.material;if(j&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),le.copy(S.boundingSphere.center)):(xe.boundingSphere===null&&xe.computeBoundingSphere(),le.copy(xe.boundingSphere.center)),le.applyMatrix4(S.matrixWorld).applyMatrix4(Q)),Array.isArray(Te)){const Ce=xe.groups;for(let ke=0,ze=Ce.length;ke<ze;ke++){const De=Ce[ke],ot=Te[De.materialIndex];ot&&ot.visible&&_.push(S,xe,ot,Y,le.z,De)}}else Te.visible&&_.push(S,xe,Te,Y,le.z,null)}}const he=S.children;for(let xe=0,Te=he.length;xe<Te;xe++)_o(he[xe],O,Y,j)}function eh(S,O,Y,j){const F=S.opaque,he=S.transmissive,xe=S.transparent;m.setupLightsView(Y),I===!0&&ie.setGlobalState(b.clippingPlanes,Y),j&&Ae.viewport(x.copy(j)),F.length>0&&Vr(F,O,Y),he.length>0&&Vr(he,O,Y),xe.length>0&&Vr(xe,O,Y),Ae.buffers.depth.setTest(!0),Ae.buffers.depth.setMask(!0),Ae.buffers.color.setMask(!0),Ae.setPolygonOffset(!1)}function th(S,O,Y,j){if((Y.isScene===!0?Y.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[j.id]===void 0&&(m.state.transmissionRenderTarget[j.id]=new Yi(1,1,{generateMipmaps:!0,type:Re.has("EXT_color_buffer_half_float")||Re.has("EXT_color_buffer_float")?Or:Qn,minFilter:Yn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:et.workingColorSpace}));const he=m.state.transmissionRenderTarget[j.id],xe=j.viewport||x;he.setSize(xe.z,xe.w);const Te=b.getRenderTarget();b.setRenderTarget(he),b.getClearColor(v),k=b.getClearAlpha(),k<1&&b.setClearColor(16777215,.5),b.clear(),ye&&Fe.render(Y);const Ce=b.toneMapping;b.toneMapping=Si;const ke=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),m.setupLightsView(j),I===!0&&ie.setGlobalState(b.clippingPlanes,j),Vr(S,Y,j),w.updateMultisampleRenderTarget(he),w.updateRenderTargetMipmap(he),Re.has("WEBGL_multisampled_render_to_texture")===!1){let ze=!1;for(let De=0,ot=O.length;De<ot;De++){const dt=O[De],mt=dt.object,tn=dt.geometry,st=dt.material,Ue=dt.group;if(st.side===Qt&&mt.layers.test(j.layers)){const It=st.side;st.side=en,st.needsUpdate=!0,nh(mt,Y,j,tn,st,Ue),st.side=It,st.needsUpdate=!0,ze=!0}}ze===!0&&(w.updateMultisampleRenderTarget(he),w.updateRenderTargetMipmap(he))}b.setRenderTarget(Te),b.setClearColor(v,k),ke!==void 0&&(j.viewport=ke),b.toneMapping=Ce}function Vr(S,O,Y){const j=O.isScene===!0?O.overrideMaterial:null;for(let F=0,he=S.length;F<he;F++){const xe=S[F],Te=xe.object,Ce=xe.geometry,ke=j===null?xe.material:j,ze=xe.group;Te.layers.test(Y.layers)&&nh(Te,O,Y,Ce,ke,ze)}}function nh(S,O,Y,j,F,he){S.onBeforeRender(b,O,Y,j,F,he),S.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),F.onBeforeRender(b,O,Y,j,S,he),F.transparent===!0&&F.side===Qt&&F.forceSinglePass===!1?(F.side=en,F.needsUpdate=!0,b.renderBufferDirect(Y,O,j,F,S,he),F.side=Jn,F.needsUpdate=!0,b.renderBufferDirect(Y,O,j,F,S,he),F.side=Qt):b.renderBufferDirect(Y,O,j,F,S,he),S.onAfterRender(b,O,Y,j,F,he)}function Gr(S,O,Y){O.isScene!==!0&&(O=fe);const j=Oe.get(S),F=m.state.lights,he=m.state.shadowsArray,xe=F.state.version,Te=Pe.getParameters(S,F.state,he,O,Y),Ce=Pe.getProgramCacheKey(Te);let ke=j.programs;j.environment=S.isMeshStandardMaterial?O.environment:null,j.fog=O.fog,j.envMap=(S.isMeshStandardMaterial?q:M).get(S.envMap||j.environment),j.envMapRotation=j.environment!==null&&S.envMap===null?O.environmentRotation:S.envMapRotation,ke===void 0&&(S.addEventListener("dispose",Je),ke=new Map,j.programs=ke);let ze=ke.get(Ce);if(ze!==void 0){if(j.currentProgram===ze&&j.lightsStateVersion===xe)return sh(S,Te),ze}else Te.uniforms=Pe.getUniforms(S),S.onBeforeCompile(Te,b),ze=Pe.acquireProgram(Te,Ce),ke.set(Ce,ze),j.uniforms=Te.uniforms;const De=j.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(De.clippingPlanes=ie.uniform),sh(S,Te),j.needsLights=Af(S),j.lightsStateVersion=xe,j.needsLights&&(De.ambientLightColor.value=F.state.ambient,De.lightProbe.value=F.state.probe,De.directionalLights.value=F.state.directional,De.directionalLightShadows.value=F.state.directionalShadow,De.spotLights.value=F.state.spot,De.spotLightShadows.value=F.state.spotShadow,De.rectAreaLights.value=F.state.rectArea,De.ltc_1.value=F.state.rectAreaLTC1,De.ltc_2.value=F.state.rectAreaLTC2,De.pointLights.value=F.state.point,De.pointLightShadows.value=F.state.pointShadow,De.hemisphereLights.value=F.state.hemi,De.directionalShadowMap.value=F.state.directionalShadowMap,De.directionalShadowMatrix.value=F.state.directionalShadowMatrix,De.spotShadowMap.value=F.state.spotShadowMap,De.spotLightMatrix.value=F.state.spotLightMatrix,De.spotLightMap.value=F.state.spotLightMap,De.pointShadowMap.value=F.state.pointShadowMap,De.pointShadowMatrix.value=F.state.pointShadowMatrix),j.currentProgram=ze,j.uniformsList=null,ze}function ih(S){if(S.uniformsList===null){const O=S.currentProgram.getUniforms();S.uniformsList=Da.seqWithValue(O.seq,S.uniforms)}return S.uniformsList}function sh(S,O){const Y=Oe.get(S);Y.outputColorSpace=O.outputColorSpace,Y.batching=O.batching,Y.batchingColor=O.batchingColor,Y.instancing=O.instancing,Y.instancingColor=O.instancingColor,Y.instancingMorph=O.instancingMorph,Y.skinning=O.skinning,Y.morphTargets=O.morphTargets,Y.morphNormals=O.morphNormals,Y.morphColors=O.morphColors,Y.morphTargetsCount=O.morphTargetsCount,Y.numClippingPlanes=O.numClippingPlanes,Y.numIntersection=O.numClipIntersection,Y.vertexAlphas=O.vertexAlphas,Y.vertexTangents=O.vertexTangents,Y.toneMapping=O.toneMapping}function bf(S,O,Y,j,F){O.isScene!==!0&&(O=fe),w.resetTextureUnits();const he=O.fog,xe=j.isMeshStandardMaterial?O.environment:null,Te=R===null?b.outputColorSpace:R.isXRRenderTarget===!0?R.texture.colorSpace:Ot,Ce=(j.isMeshStandardMaterial?q:M).get(j.envMap||xe),ke=j.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,ze=!!Y.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),De=!!Y.morphAttributes.position,ot=!!Y.morphAttributes.normal,dt=!!Y.morphAttributes.color;let mt=Si;j.toneMapped&&(R===null||R.isXRRenderTarget===!0)&&(mt=b.toneMapping);const tn=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,st=tn!==void 0?tn.length:0,Ue=Oe.get(j),It=m.state.lights;if(I===!0&&(z===!0||S!==ce)){const ln=S===ce&&j.id===W;ie.setState(j,S,ln)}let rt=!1;j.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==It.state.version||Ue.outputColorSpace!==Te||F.isBatchedMesh&&Ue.batching===!1||!F.isBatchedMesh&&Ue.batching===!0||F.isBatchedMesh&&Ue.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&Ue.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&Ue.instancing===!1||!F.isInstancedMesh&&Ue.instancing===!0||F.isSkinnedMesh&&Ue.skinning===!1||!F.isSkinnedMesh&&Ue.skinning===!0||F.isInstancedMesh&&Ue.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&Ue.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&Ue.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&Ue.instancingMorph===!1&&F.morphTexture!==null||Ue.envMap!==Ce||j.fog===!0&&Ue.fog!==he||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==ie.numPlanes||Ue.numIntersection!==ie.numIntersection)||Ue.vertexAlphas!==ke||Ue.vertexTangents!==ze||Ue.morphTargets!==De||Ue.morphNormals!==ot||Ue.morphColors!==dt||Ue.toneMapping!==mt||Ue.morphTargetsCount!==st)&&(rt=!0):(rt=!0,Ue.__version=j.version);let gn=Ue.currentProgram;rt===!0&&(gn=Gr(j,O,F));let Zi=!1,nn=!1,xo=!1;const xt=gn.getUniforms(),ti=Ue.uniforms;if(Ae.useProgram(gn.program)&&(Zi=!0,nn=!0,xo=!0),j.id!==W&&(W=j.id,nn=!0),Zi||ce!==S){Se.reverseDepthBuffer?($.copy(S.projectionMatrix),Bp($),kp($),xt.setValue(C,"projectionMatrix",$)):xt.setValue(C,"projectionMatrix",S.projectionMatrix),xt.setValue(C,"viewMatrix",S.matrixWorldInverse);const ln=xt.map.cameraPosition;ln!==void 0&&ln.setValue(C,me.setFromMatrixPosition(S.matrixWorld)),Se.logarithmicDepthBuffer&&xt.setValue(C,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&xt.setValue(C,"isOrthographic",S.isOrthographicCamera===!0),ce!==S&&(ce=S,nn=!0,xo=!0)}if(F.isSkinnedMesh){xt.setOptional(C,F,"bindMatrix"),xt.setOptional(C,F,"bindMatrixInverse");const ln=F.skeleton;ln&&(ln.boneTexture===null&&ln.computeBoneTexture(),xt.setValue(C,"boneTexture",ln.boneTexture,w))}F.isBatchedMesh&&(xt.setOptional(C,F,"batchingTexture"),xt.setValue(C,"batchingTexture",F._matricesTexture,w),xt.setOptional(C,F,"batchingIdTexture"),xt.setValue(C,"batchingIdTexture",F._indirectTexture,w),xt.setOptional(C,F,"batchingColorTexture"),F._colorsTexture!==null&&xt.setValue(C,"batchingColorTexture",F._colorsTexture,w));const vo=Y.morphAttributes;if((vo.position!==void 0||vo.normal!==void 0||vo.color!==void 0)&&Ee.update(F,Y,gn),(nn||Ue.receiveShadow!==F.receiveShadow)&&(Ue.receiveShadow=F.receiveShadow,xt.setValue(C,"receiveShadow",F.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(ti.envMap.value=Ce,ti.flipEnvMap.value=Ce.isCubeTexture&&Ce.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&O.environment!==null&&(ti.envMapIntensity.value=O.environmentIntensity),nn&&(xt.setValue(C,"toneMappingExposure",b.toneMappingExposure),Ue.needsLights&&Tf(ti,xo),he&&j.fog===!0&&H.refreshFogUniforms(ti,he),H.refreshMaterialUniforms(ti,j,J,U,m.state.transmissionRenderTarget[S.id]),Da.upload(C,ih(Ue),ti,w)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Da.upload(C,ih(Ue),ti,w),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&xt.setValue(C,"center",F.center),xt.setValue(C,"modelViewMatrix",F.modelViewMatrix),xt.setValue(C,"normalMatrix",F.normalMatrix),xt.setValue(C,"modelMatrix",F.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){const ln=j.uniformsGroups;for(let yo=0,wf=ln.length;yo<wf;yo++){const rh=ln[yo];D.update(rh,gn),D.bind(rh,gn)}}return gn}function Tf(S,O){S.ambientLightColor.needsUpdate=O,S.lightProbe.needsUpdate=O,S.directionalLights.needsUpdate=O,S.directionalLightShadows.needsUpdate=O,S.pointLights.needsUpdate=O,S.pointLightShadows.needsUpdate=O,S.spotLights.needsUpdate=O,S.spotLightShadows.needsUpdate=O,S.rectAreaLights.needsUpdate=O,S.hemisphereLights.needsUpdate=O}function Af(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return L},this.getRenderTarget=function(){return R},this.setRenderTargetTextures=function(S,O,Y){Oe.get(S.texture).__webglTexture=O,Oe.get(S.depthTexture).__webglTexture=Y;const j=Oe.get(S);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=Y===void 0,j.__autoAllocateDepthBuffer||Re.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,O){const Y=Oe.get(S);Y.__webglFramebuffer=O,Y.__useDefaultFramebuffer=O===void 0},this.setRenderTarget=function(S,O=0,Y=0){R=S,V=O,L=Y;let j=!0,F=null,he=!1,xe=!1;if(S){const Ce=Oe.get(S);if(Ce.__useDefaultFramebuffer!==void 0)Ae.bindFramebuffer(C.FRAMEBUFFER,null),j=!1;else if(Ce.__webglFramebuffer===void 0)w.setupRenderTarget(S);else if(Ce.__hasExternalTextures)w.rebindTextures(S,Oe.get(S.texture).__webglTexture,Oe.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const De=S.depthTexture;if(Ce.__boundDepthTexture!==De){if(De!==null&&Oe.has(De)&&(S.width!==De.image.width||S.height!==De.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");w.setupDepthRenderbuffer(S)}}const ke=S.texture;(ke.isData3DTexture||ke.isDataArrayTexture||ke.isCompressedArrayTexture)&&(xe=!0);const ze=Oe.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ze[O])?F=ze[O][Y]:F=ze[O],he=!0):S.samples>0&&w.useMultisampledRTT(S)===!1?F=Oe.get(S).__webglMultisampledFramebuffer:Array.isArray(ze)?F=ze[Y]:F=ze,x.copy(S.viewport),E.copy(S.scissor),Z=S.scissorTest}else x.copy(B).multiplyScalar(J).floor(),E.copy(X).multiplyScalar(J).floor(),Z=se;if(Ae.bindFramebuffer(C.FRAMEBUFFER,F)&&j&&Ae.drawBuffers(S,F),Ae.viewport(x),Ae.scissor(E),Ae.setScissorTest(Z),he){const Ce=Oe.get(S.texture);C.framebufferTexture2D(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,C.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ce.__webglTexture,Y)}else if(xe){const Ce=Oe.get(S.texture),ke=O||0;C.framebufferTextureLayer(C.FRAMEBUFFER,C.COLOR_ATTACHMENT0,Ce.__webglTexture,Y||0,ke)}W=-1},this.readRenderTargetPixels=function(S,O,Y,j,F,he,xe){if(!(S&&S.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Te=Oe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Te=Te[xe]),Te){Ae.bindFramebuffer(C.FRAMEBUFFER,Te);try{const Ce=S.texture,ke=Ce.format,ze=Ce.type;if(!Se.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Se.textureTypeReadable(ze)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=S.width-j&&Y>=0&&Y<=S.height-F&&C.readPixels(O,Y,j,F,be.convert(ke),be.convert(ze),he)}finally{const Ce=R!==null?Oe.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(C.FRAMEBUFFER,Ce)}}},this.readRenderTargetPixelsAsync=async function(S,O,Y,j,F,he,xe){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Te=Oe.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&xe!==void 0&&(Te=Te[xe]),Te){const Ce=S.texture,ke=Ce.format,ze=Ce.type;if(!Se.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Se.textureTypeReadable(ze))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(O>=0&&O<=S.width-j&&Y>=0&&Y<=S.height-F){Ae.bindFramebuffer(C.FRAMEBUFFER,Te);const De=C.createBuffer();C.bindBuffer(C.PIXEL_PACK_BUFFER,De),C.bufferData(C.PIXEL_PACK_BUFFER,he.byteLength,C.STREAM_READ),C.readPixels(O,Y,j,F,be.convert(ke),be.convert(ze),0);const ot=R!==null?Oe.get(R).__webglFramebuffer:null;Ae.bindFramebuffer(C.FRAMEBUFFER,ot);const dt=C.fenceSync(C.SYNC_GPU_COMMANDS_COMPLETE,0);return C.flush(),await Fp(C,dt,4),C.bindBuffer(C.PIXEL_PACK_BUFFER,De),C.getBufferSubData(C.PIXEL_PACK_BUFFER,0,he),C.deleteBuffer(De),C.deleteSync(dt),he}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,O=null,Y=0){S.isTexture!==!0&&(Na("WebGLRenderer: copyFramebufferToTexture function signature has changed."),O=arguments[0]||null,S=arguments[1]);const j=Math.pow(2,-Y),F=Math.floor(S.image.width*j),he=Math.floor(S.image.height*j),xe=O!==null?O.x:0,Te=O!==null?O.y:0;w.setTexture2D(S,0),C.copyTexSubImage2D(C.TEXTURE_2D,Y,0,0,xe,Te,F,he),Ae.unbindTexture()},this.copyTextureToTexture=function(S,O,Y=null,j=null,F=0){S.isTexture!==!0&&(Na("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,S=arguments[1],O=arguments[2],F=arguments[3]||0,Y=null);let he,xe,Te,Ce,ke,ze;Y!==null?(he=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,Te=Y.min.x,Ce=Y.min.y):(he=S.image.width,xe=S.image.height,Te=0,Ce=0),j!==null?(ke=j.x,ze=j.y):(ke=0,ze=0);const De=be.convert(O.format),ot=be.convert(O.type);w.setTexture2D(O,0),C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);const dt=C.getParameter(C.UNPACK_ROW_LENGTH),mt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),tn=C.getParameter(C.UNPACK_SKIP_PIXELS),st=C.getParameter(C.UNPACK_SKIP_ROWS),Ue=C.getParameter(C.UNPACK_SKIP_IMAGES),It=S.isCompressedTexture?S.mipmaps[F]:S.image;C.pixelStorei(C.UNPACK_ROW_LENGTH,It.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,It.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Te),C.pixelStorei(C.UNPACK_SKIP_ROWS,Ce),S.isDataTexture?C.texSubImage2D(C.TEXTURE_2D,F,ke,ze,he,xe,De,ot,It.data):S.isCompressedTexture?C.compressedTexSubImage2D(C.TEXTURE_2D,F,ke,ze,It.width,It.height,De,It.data):C.texSubImage2D(C.TEXTURE_2D,F,ke,ze,he,xe,De,ot,It),C.pixelStorei(C.UNPACK_ROW_LENGTH,dt),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,mt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,tn),C.pixelStorei(C.UNPACK_SKIP_ROWS,st),C.pixelStorei(C.UNPACK_SKIP_IMAGES,Ue),F===0&&O.generateMipmaps&&C.generateMipmap(C.TEXTURE_2D),Ae.unbindTexture()},this.copyTextureToTexture3D=function(S,O,Y=null,j=null,F=0){S.isTexture!==!0&&(Na("WebGLRenderer: copyTextureToTexture3D function signature has changed."),Y=arguments[0]||null,j=arguments[1]||null,S=arguments[2],O=arguments[3],F=arguments[4]||0);let he,xe,Te,Ce,ke,ze,De,ot,dt;const mt=S.isCompressedTexture?S.mipmaps[F]:S.image;Y!==null?(he=Y.max.x-Y.min.x,xe=Y.max.y-Y.min.y,Te=Y.max.z-Y.min.z,Ce=Y.min.x,ke=Y.min.y,ze=Y.min.z):(he=mt.width,xe=mt.height,Te=mt.depth,Ce=0,ke=0,ze=0),j!==null?(De=j.x,ot=j.y,dt=j.z):(De=0,ot=0,dt=0);const tn=be.convert(O.format),st=be.convert(O.type);let Ue;if(O.isData3DTexture)w.setTexture3D(O,0),Ue=C.TEXTURE_3D;else if(O.isDataArrayTexture||O.isCompressedArrayTexture)w.setTexture2DArray(O,0),Ue=C.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}C.pixelStorei(C.UNPACK_FLIP_Y_WEBGL,O.flipY),C.pixelStorei(C.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),C.pixelStorei(C.UNPACK_ALIGNMENT,O.unpackAlignment);const It=C.getParameter(C.UNPACK_ROW_LENGTH),rt=C.getParameter(C.UNPACK_IMAGE_HEIGHT),gn=C.getParameter(C.UNPACK_SKIP_PIXELS),Zi=C.getParameter(C.UNPACK_SKIP_ROWS),nn=C.getParameter(C.UNPACK_SKIP_IMAGES);C.pixelStorei(C.UNPACK_ROW_LENGTH,mt.width),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,mt.height),C.pixelStorei(C.UNPACK_SKIP_PIXELS,Ce),C.pixelStorei(C.UNPACK_SKIP_ROWS,ke),C.pixelStorei(C.UNPACK_SKIP_IMAGES,ze),S.isDataTexture||S.isData3DTexture?C.texSubImage3D(Ue,F,De,ot,dt,he,xe,Te,tn,st,mt.data):O.isCompressedArrayTexture?C.compressedTexSubImage3D(Ue,F,De,ot,dt,he,xe,Te,tn,mt.data):C.texSubImage3D(Ue,F,De,ot,dt,he,xe,Te,tn,st,mt),C.pixelStorei(C.UNPACK_ROW_LENGTH,It),C.pixelStorei(C.UNPACK_IMAGE_HEIGHT,rt),C.pixelStorei(C.UNPACK_SKIP_PIXELS,gn),C.pixelStorei(C.UNPACK_SKIP_ROWS,Zi),C.pixelStorei(C.UNPACK_SKIP_IMAGES,nn),F===0&&O.generateMipmaps&&C.generateMipmap(Ue),Ae.unbindTexture()},this.initRenderTarget=function(S){Oe.get(S).__webglFramebuffer===void 0&&w.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?w.setTextureCube(S,0):S.isData3DTexture?w.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?w.setTexture2DArray(S,0):w.setTexture2D(S,0),Ae.unbindTexture()},this.resetState=function(){V=0,L=0,R=null,Ae.reset(),je.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===Rl?"display-p3":"srgb",t.unpackColorSpace=et.workingColorSpace===no?"display-p3":"srgb"}}class $x extends pt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Pn,this.environmentIntensity=1,this.environmentRotation=new Pn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class Od{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Qc,this.updateRanges=[],this.version=0,this.uuid=wn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[n+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=wn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kt=new P;class Lr{constructor(e,t,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=bn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ct(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ct(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=bn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=bn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=bn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=bn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ct(t,this.array),n=ct(n,this.array),s=ct(s,this.array),r=ct(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ut(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Lr(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class so extends Rn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ds;const ar=new P,fs=new P,ps=new P,ms=new we,or=new we,Fd=new We,ha=new P,cr=new P,ua=new P,tu=new we,$o=new we,nu=new we;class Nl extends pt{constructor(e=new so){if(super(),this.isSprite=!0,this.type="Sprite",ds===void 0){ds=new Yt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Od(t,5);ds.setIndex([0,1,2,0,2,3]),ds.setAttribute("position",new Lr(n,3,0,!1)),ds.setAttribute("uv",new Lr(n,2,3,!1))}this.geometry=ds,this.material=e,this.center=new we(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),fs.setFromMatrixScale(this.matrixWorld),Fd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ps.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&fs.multiplyScalar(-ps.z);const n=this.material.rotation;let s,r;n!==0&&(r=Math.cos(n),s=Math.sin(n));const a=this.center;da(ha.set(-.5,-.5,0),ps,a,fs,s,r),da(cr.set(.5,-.5,0),ps,a,fs,s,r),da(ua.set(.5,.5,0),ps,a,fs,s,r),tu.set(0,0),$o.set(1,0),nu.set(1,1);let o=e.ray.intersectTriangle(ha,cr,ua,!1,ar);if(o===null&&(da(cr.set(-.5,.5,0),ps,a,fs,s,r),$o.set(0,1),o=e.ray.intersectTriangle(ha,ua,cr,!1,ar),o===null))return;const c=e.ray.origin.distanceTo(ar);c<e.near||c>e.far||t.push({distance:c,point:ar.clone(),uv:dn.getInterpolation(ar,ha,cr,ua,tu,$o,nu,new we),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function da(i,e,t,n,s,r){ms.subVectors(i,t).addScalar(.5).multiply(n),s!==void 0?(or.x=r*ms.x-s*ms.y,or.y=s*ms.x+r*ms.y):or.copy(ms),i.copy(e),i.x+=or.x,i.y+=or.y,i.applyMatrix4(Fd)}const iu=new P,su=new it,ru=new it,Zx=new P,au=new We,fa=new P,Zo=new Nn,ou=new We,Jo=new Fr;class Bd extends _t{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=hh,this.bindMatrix=new We,this.bindMatrixInverse=new We,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Ln),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fa),this.boundingBox.expandByPoint(fa)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Nn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,fa),this.boundingSphere.expandByPoint(fa)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,s=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zo.copy(this.boundingSphere),Zo.applyMatrix4(s),e.ray.intersectsSphere(Zo)!==!1&&(ou.copy(s).invert(),Jo.copy(e.ray).applyMatrix4(ou),!(this.boundingBox!==null&&Jo.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Jo)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new it,t=this.geometry.attributes.skinWeight;for(let n=0,s=t.count;n<s;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===hh?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===rp?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,s=this.geometry;su.fromBufferAttribute(s.attributes.skinIndex,e),ru.fromBufferAttribute(s.attributes.skinWeight,e),iu.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const a=ru.getComponent(r);if(a!==0){const o=su.getComponent(r);au.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(Zx.copy(iu).applyMatrix4(au),a)}}return t.applyMatrix4(this.bindMatrixInverse)}}class kd extends pt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class zd extends bt{constructor(e=null,t=1,n=1,s,r,a,o,c,l=Gt,h=Gt,u,d){super(null,a,o,c,l,h,s,r,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const cu=new We,Jx=new We;class Dl{constructor(e=[],t=[]){this.uuid=wn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,s=this.bones.length;n<s;n++)this.boneInverses.push(new We)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new We;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,s=this.boneTexture;for(let r=0,a=e.length;r<a;r++){const o=e[r]?e[r].matrixWorld:Jx;cu.multiplyMatrices(o,t[r]),cu.toArray(n,r*16)}s!==null&&(s.needsUpdate=!0)}clone(){return new Dl(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new zd(t,e,e,fn,Tn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const s=this.bones[t];if(s.name===e)return s}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,s=e.bones.length;n<s;n++){const r=e.bones[n];let a=t[r];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),a=new kd),this.bones.push(a),this.boneInverses.push(new We().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let s=0,r=t.length;s<r;s++){const a=t[s];e.bones.push(a.uuid);const o=n[s];e.boneInverses.push(o.toArray())}return e}}class tl extends Ut{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const gs=new We,lu=new We,pa=[],hu=new Ln,Qx=new We,lr=new _t,hr=new Nn;class ev extends _t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new tl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,Qx)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Ln),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gs),hu.copy(e.boundingBox).applyMatrix4(gs),this.boundingBox.union(hu)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Nn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,gs),hr.copy(e.boundingSphere).applyMatrix4(gs),this.boundingSphere.union(hr)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(lr.geometry=this.geometry,lr.material=this.material,lr.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),hr.copy(this.boundingSphere),hr.applyMatrix4(n),e.ray.intersectsSphere(hr)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,gs),lu.multiplyMatrices(n,gs),lr.matrixWorld=lu,lr.raycast(e,pa);for(let a=0,o=pa.length;a<o;a++){const c=pa[a];c.instanceId=r,c.object=this,t.push(c)}pa.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new tl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new zd(new Float32Array(s*this.count),s,this.count,Sl,Tn));const r=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=s*e;r[c]=o,r.set(n,c+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class ro extends Rn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ve(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const qa=new P,Xa=new P,uu=new We,ur=new Fr,ma=new Nn,Qo=new P,du=new P;class Br extends pt{constructor(e=new Yt,t=new ro){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let s=1,r=t.count;s<r;s++)qa.fromBufferAttribute(t,s-1),Xa.fromBufferAttribute(t,s),n[s]=n[s-1],n[s]+=qa.distanceTo(Xa);e.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ma.copy(n.boundingSphere),ma.applyMatrix4(s),ma.radius+=r,e.ray.intersectsSphere(ma)===!1)return;uu.copy(s).invert(),ur.copy(e.ray).applyMatrix4(uu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),A=h.getX(_+1),b=ga(this,e,ur,c,p,A);b&&t.push(b)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=ga(this,e,ur,c,_,m);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(d.count,a.start+a.count);for(let _=f,m=g-1;_<m;_+=l){const p=ga(this,e,ur,c,_,_+1);p&&t.push(p)}if(this.isLineLoop){const _=ga(this,e,ur,c,g-1,f);_&&t.push(_)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ga(i,e,t,n,s,r){const a=i.geometry.attributes.position;if(qa.fromBufferAttribute(a,s),Xa.fromBufferAttribute(a,r),t.distanceSqToSegment(qa,Xa,Qo,du)>n)return;Qo.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(Qo);if(!(c<e.near||c>e.far))return{distance:c,point:du.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}const fu=new P,pu=new P;class tv extends Br{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let s=0,r=t.count;s<r;s+=2)fu.fromBufferAttribute(t,s),pu.fromBufferAttribute(t,s+1),n[s]=s===0?0:n[s-1],n[s+1]=n[s]+fu.distanceTo(pu);e.setAttribute("lineDistance",new Xt(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class nv extends Br{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Hd extends Rn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ve(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const mu=new We,nl=new Fr,_a=new Nn,xa=new P;class iv extends pt{constructor(e=new Yt,t=new Hd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),_a.copy(n.boundingSphere),_a.applyMatrix4(s),_a.radius+=r,e.ray.intersectsSphere(_a)===!1)return;mu.copy(s).invert(),nl.copy(e.ray).applyMatrix4(mu);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,u=n.attributes.position;if(l!==null){const d=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=d,_=f;g<_;g++){const m=l.getX(g);xa.fromBufferAttribute(u,m),gu(xa,m,c,s,e,t,this)}}else{const d=Math.max(0,a.start),f=Math.min(u.count,a.start+a.count);for(let g=d,_=f;g<_;g++)xa.fromBufferAttribute(u,g),gu(xa,g,c,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function gu(i,e,t,n,s,r,a){const o=nl.distanceSqToPoint(i);if(o<t){const c=new P;nl.closestPointToPoint(i,c),c.applyMatrix4(n);const l=s.ray.origin.distanceTo(c);if(l<s.near||l>s.far)return;r.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class $s extends bt{constructor(e,t,n,s,r,a,o,c,l){super(e,t,n,s,r,a,o,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class ao extends Yt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],c=[],l=new P,h=new we;a.push(0,0,0),o.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){const f=n+u/t*s;l.x=e*Math.cos(f),l.y=e*Math.sin(f),a.push(l.x,l.y,l.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,c.push(h.x,h.y)}for(let u=1;u<=t;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Xt(a,3)),this.setAttribute("normal",new Xt(o,3)),this.setAttribute("uv",new Xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ao(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class kr extends Yt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],c=[],l=[],h=[];let u=e;const d=(t-e)/s,f=new P,g=new we;for(let _=0;_<=s;_++){for(let m=0;m<=n;m++){const p=r+m/n*a;f.x=u*Math.cos(p),f.y=u*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}u+=d}for(let _=0;_<s;_++){const m=_*(n+1);for(let p=0;p<n;p++){const A=p+m,b=A,T=A+n+1,V=A+n+2,L=A+1;o.push(b,T,L),o.push(T,V,L)}}this.setIndex(o),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(l,3)),this.setAttribute("uv",new Xt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Zs extends Rn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ve(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ve(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xd,this.normalScale=new we(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Pn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Dn extends Zs{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new we(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Nt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ve(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ve(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ve(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}function va(i,e,t){return!i||!t&&i.constructor===e?i:typeof e.BYTES_PER_ELEMENT=="number"?new e(i):Array.prototype.slice.call(i)}function sv(i){return ArrayBuffer.isView(i)&&!(i instanceof DataView)}function rv(i){function e(s,r){return i[s]-i[r]}const t=i.length,n=new Array(t);for(let s=0;s!==t;++s)n[s]=s;return n.sort(e),n}function _u(i,e,t){const n=i.length,s=new i.constructor(n);for(let r=0,a=0;a!==n;++r){const o=t[r]*e;for(let c=0;c!==e;++c)s[a++]=i[o+c]}return s}function Vd(i,e,t,n){let s=1,r=i[0];for(;r!==void 0&&r[n]===void 0;)r=i[s++];if(r===void 0)return;let a=r[n];if(a!==void 0)if(Array.isArray(a))do a=r[n],a!==void 0&&(e.push(r.time),t.push.apply(t,a)),r=i[s++];while(r!==void 0);else if(a.toArray!==void 0)do a=r[n],a!==void 0&&(e.push(r.time),a.toArray(t,t.length)),r=i[s++];while(r!==void 0);else do a=r[n],a!==void 0&&(e.push(r.time),t.push(a)),r=i[s++];while(r!==void 0)}class zr{constructor(e,t,n,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,s=t[n],r=t[n-1];e:{t:{let a;n:{i:if(!(e<s)){for(let o=n+2;;){if(s===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(r=s,s=t[++n],e<s)break t}a=t.length;break n}if(!(e>=r)){const o=t[1];e<o&&(n=2,r=o);for(let c=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(s=r,r=t[--n-1],e>=r)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(s=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,s)}return this.interpolate_(n,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=n[r+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class av extends zr{constructor(e,t,n,s){super(e,t,n,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Ss,endingEnd:Ss}}intervalChanged_(e,t,n){const s=this.parameterPositions;let r=e-2,a=e+1,o=s[r],c=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Es:r=e,o=2*t-n;break;case za:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case Es:a=e,c=2*n-t;break;case za:a=1,c=n+s[1]-s[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=r*h,this._offsetNext=a*h}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(n-t)/(s-t),_=g*g,m=_*g,p=-d*m+2*d*_-d*g,A=(1+d)*m+(-1.5-2*d)*_+(-.5+d)*g+1,b=(-1-f)*m+(1.5+f)*_+.5*g,T=f*m-f*_;for(let V=0;V!==o;++V)r[V]=p*a[h+V]+A*a[l+V]+b*a[c+V]+T*a[u+V];return r}}class Gd extends zr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(s-t),u=1-h;for(let d=0;d!==o;++d)r[d]=a[l+d]*u+a[c+d]*h;return r}}class ov extends zr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e){return this.copySampleValue_(e-1)}}class Un{constructor(e,t,n,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=va(t,this.TimeBufferType),this.values=va(n,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:va(e.times,Array),values:va(e.values,Array)};const s=e.getInterpolation();s!==e.DefaultInterpolation&&(n.interpolation=s)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new ov(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Gd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new av(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Cr:t=this.InterpolantFactoryMethodDiscrete;break;case Ir:t=this.InterpolantFactoryMethodLinear;break;case Mo:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Cr;case this.InterpolantFactoryMethodLinear:return Ir;case this.InterpolantFactoryMethodSmooth:return Mo}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,s=t.length;n!==s;++n)t[n]*=e}return this}trim(e,t){const n=this.times,s=n.length;let r=0,a=s-1;for(;r!==s&&n[r]<e;)++r;for(;a!==-1&&n[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);const o=this.getValueSize();this.times=n.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,s=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(s!==void 0&&sv(s))for(let o=0,c=s.length;o!==c;++o){const l=s[o];if(isNaN(l)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),s=this.getInterpolation()===Mo,r=e.length-1;let a=1;for(let o=1;o<r;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(s)c=!0;else{const u=o*n,d=u-n,f=u+n;for(let g=0;g!==n;++g){const _=t[u+g];if(_!==t[d+g]||_!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const u=o*n,d=a*n;for(let f=0;f!==n;++f)t[d+f]=t[u+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,s=new n(this.name,e,t);return s.createInterpolant=this.createInterpolant,s}}Un.prototype.TimeBufferType=Float32Array;Un.prototype.ValueBufferType=Float32Array;Un.prototype.DefaultInterpolation=Ir;class Js extends Un{constructor(e,t,n){super(e,t,n)}}Js.prototype.ValueTypeName="bool";Js.prototype.ValueBufferType=Array;Js.prototype.DefaultInterpolation=Cr;Js.prototype.InterpolantFactoryMethodLinear=void 0;Js.prototype.InterpolantFactoryMethodSmooth=void 0;class Wd extends Un{}Wd.prototype.ValueTypeName="color";class Gs extends Un{}Gs.prototype.ValueTypeName="number";class cv extends zr{constructor(e,t,n,s){super(e,t,n,s)}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(s-t);let l=e*o;for(let h=l+o;l!==h;l+=4)qt.slerpFlat(r,0,a,l-o,a,l,c);return r}}class Ws extends Un{InterpolantFactoryMethodLinear(e){return new cv(this.times,this.values,this.getValueSize(),e)}}Ws.prototype.ValueTypeName="quaternion";Ws.prototype.InterpolantFactoryMethodSmooth=void 0;class Qs extends Un{constructor(e,t,n){super(e,t,n)}}Qs.prototype.ValueTypeName="string";Qs.prototype.ValueBufferType=Array;Qs.prototype.DefaultInterpolation=Cr;Qs.prototype.InterpolantFactoryMethodLinear=void 0;Qs.prototype.InterpolantFactoryMethodSmooth=void 0;class qs extends Un{}qs.prototype.ValueTypeName="vector";class Ya{constructor(e="",t=-1,n=[],s=wl){this.name=e,this.tracks=n,this.duration=t,this.blendMode=s,this.uuid=wn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,s=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(hv(n[a]).scale(s));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,s={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,a=n.length;r!==a;++r)t.push(Un.toJSON(n[r]));return s}static CreateFromMorphTargetSequence(e,t,n,s){const r=t.length,a=[];for(let o=0;o<r;o++){let c=[],l=[];c.push((o+r-1)%r,o,(o+1)%r),l.push(0,1,0);const h=rv(c);c=_u(c,1,h),l=_u(l,1,h),!s&&c[0]===0&&(c.push(r),l.push(l[0])),a.push(new Gs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const s=e;n=s.geometry&&s.geometry.animations||s.animations}for(let s=0;s<n.length;s++)if(n[s].name===t)return n[s];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const s={},r=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(r);if(h&&h.length>1){const u=h[1];let d=s[u];d||(s[u]=d=[]),d.push(l)}}const a=[];for(const o in s)a.push(this.CreateFromMorphTargetSequence(o,s[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(u,d,f,g,_){if(f.length!==0){const m=[],p=[];Vd(f,m,p,g),m.length!==0&&_.push(new u(d,m,p))}},s=[],r=e.name||"default",a=e.fps||30,o=e.blendMode;let c=e.length||-1;const l=e.hierarchy||[];for(let u=0;u<l.length;u++){const d=l[u].keys;if(!(!d||d.length===0))if(d[0].morphTargets){const f={};let g;for(g=0;g<d.length;g++)if(d[g].morphTargets)for(let _=0;_<d[g].morphTargets.length;_++)f[d[g].morphTargets[_]]=-1;for(const _ in f){const m=[],p=[];for(let A=0;A!==d[g].morphTargets.length;++A){const b=d[g];m.push(b.time),p.push(b.morphTarget===_?1:0)}s.push(new Gs(".morphTargetInfluence["+_+"]",m,p))}c=f.length*a}else{const f=".bones["+t[u].name+"]";n(qs,f+".position",d,"pos",s),n(Ws,f+".quaternion",d,"rot",s),n(qs,f+".scale",d,"scl",s)}}return s.length===0?null:new this(r,c,s,o)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,s=e.length;n!==s;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function lv(i){switch(i.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Gs;case"vector":case"vector2":case"vector3":case"vector4":return qs;case"color":return Wd;case"quaternion":return Ws;case"bool":case"boolean":return Js;case"string":return Qs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+i)}function hv(i){if(i.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=lv(i.type);if(i.times===void 0){const t=[],n=[];Vd(i.keys,t,n,"value"),i.times=t,i.values=n}return e.parse!==void 0?e.parse(i):new e(i.name,i.times,i.values,i.interpolation)}const gi={enabled:!1,files:{},add:function(i,e){this.enabled!==!1&&(this.files[i]=e)},get:function(i){if(this.enabled!==!1)return this.files[i]},remove:function(i){delete this.files[i]},clear:function(){this.files={}}};class uv{constructor(e,t,n){const s=this;let r=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){o++,r===!1&&s.onStart!==void 0&&s.onStart(h,a,o),r=!0},this.itemEnd=function(h){a++,s.onProgress!==void 0&&s.onProgress(h,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(h){s.onError!==void 0&&s.onError(h)},this.resolveURL=function(h){return c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,u){return l.push(h,u),this},this.removeHandler=function(h){const u=l.indexOf(h);return u!==-1&&l.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=l.length;u<d;u+=2){const f=l[u],g=l[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null}}}const dv=new uv;class er{constructor(e){this.manager=e!==void 0?e:dv,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(s,r){n.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}}er.DEFAULT_MATERIAL_NAME="__DEFAULT";const Vn={};class fv extends Error{constructor(e,t){super(e),this.response=t}}class qd extends er{constructor(e){super(e)}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=gi.get(e);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Vn[e]!==void 0){Vn[e].push({onLoad:t,onProgress:n,onError:s});return}Vn[e]=[],Vn[e].push({onLoad:t,onProgress:n,onError:s});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=Vn[e],u=l.body.getReader(),d=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=d?parseInt(d):0,g=f!==0;let _=0;const m=new ReadableStream({start(p){A();function A(){u.read().then(({done:b,value:T})=>{if(b)p.close();else{_+=T.byteLength;const V=new ProgressEvent("progress",{lengthComputable:g,loaded:_,total:f});for(let L=0,R=h.length;L<R;L++){const W=h[L];W.onProgress&&W.onProgress(V)}p.enqueue(T),A()}},b=>{p.error(b)})}}});return new Response(m)}else throw new fv(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o===void 0)return l.text();{const u=/charset="?([^;"\s]*)"?/i.exec(o),d=u&&u[1]?u[1].toLowerCase():void 0,f=new TextDecoder(d);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{gi.add(e,l);const h=Vn[e];delete Vn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=Vn[e];if(h===void 0)throw this.manager.itemError(e),l;delete Vn[e];for(let u=0,d=h.length;u<d;u++){const f=h[u];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}}class pv extends er{constructor(e){super(e)}load(e,t,n,s){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=gi.get(e);if(a!==void 0)return r.manager.itemStart(e),setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a;const o=Pr("img");function c(){h(),gi.add(e,this),t&&t(this),r.manager.itemEnd(e)}function l(u){h(),s&&s(u),r.manager.itemError(e),r.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),r.manager.itemStart(e),o.src=e,o}}class mv extends er{constructor(e){super(e)}load(e,t,n,s){const r=new bt,a=new pv(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){r.image=o,r.needsUpdate=!0,t!==void 0&&t(r)},n,s),r}}class oo extends pt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ve(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class gv extends oo{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ve(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const ec=new We,xu=new P,vu=new P;class Ul{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new we(512,512),this.map=null,this.mapPass=null,this.matrix=new We,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Il,this._frameExtents=new we(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;xu.setFromMatrixPosition(e.matrixWorld),t.position.copy(xu),vu.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(vu),t.updateMatrixWorld(),ec.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ec),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ec)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class _v extends Ul{constructor(){super(new Vt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){const t=this.camera,n=Hs*2*e.angle*this.focus,s=this.mapSize.width/this.mapSize.height,r=e.distance||t.far;(n!==t.fov||s!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=s,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class xv extends oo{constructor(e,t,n=0,s=Math.PI/3,r=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.distance=n,this.angle=s,this.penumbra=r,this.decay=a,this.map=null,this.shadow=new _v}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const yu=new We,dr=new P,tc=new P;class vv extends Ul{constructor(){super(new Vt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new we(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,s=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),dr.setFromMatrixPosition(e.matrixWorld),n.position.copy(dr),tc.copy(n.position),tc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(tc),n.updateMatrixWorld(),s.makeTranslation(-dr.x,-dr.y,-dr.z),yu.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yu)}}class yv extends oo{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new vv}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Mv extends Ul{constructor(){super(new Pl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ol extends oo{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(pt.DEFAULT_UP),this.updateMatrix(),this.target=new pt,this.shadow=new Mv}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Er{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,s=e.length;n<s;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}class Sv extends er{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,s){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,a=gi.get(e);if(a!==void 0){if(r.manager.itemStart(e),a.then){a.then(l=>{t&&t(l),r.manager.itemEnd(e)}).catch(l=>{s&&s(l)});return}return setTimeout(function(){t&&t(a),r.manager.itemEnd(e)},0),a}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(l){return gi.add(e,l),t&&t(l),r.manager.itemEnd(e),l}).catch(function(l){s&&s(l),gi.remove(e),r.manager.itemError(e),r.manager.itemEnd(e)});gi.add(e,c),r.manager.itemStart(e)}}class Ev{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Mu(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=Mu();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}function Mu(){return performance.now()}class bv{constructor(e,t,n){this.binding=e,this.valueSize=n;let s,r,a;switch(t){case"quaternion":s=this._slerp,r=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":s=this._select,r=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:s=this._lerp,r=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=s,this._mixBufferRegionAdditive=r,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,s=this.valueSize,r=e*s+s;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==s;++o)n[r+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,r,0,o,s)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,s=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,s,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,s=e*t+t,r=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const c=t*this._origIndex;this._mixBufferRegion(n,s,c,1-r,t)}a>0&&this._mixBufferRegionAdditive(n,s,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,s);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,s=n*this._origIndex;e.getValue(t,s);for(let r=n,a=s;r!==a;++r)t[r]=t[s+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,s,r){if(s>=.5)for(let a=0;a!==r;++a)e[t+a]=e[n+a]}_slerp(e,t,n,s){qt.slerpFlat(e,t,e,t,e,n,s)}_slerpAdditive(e,t,n,s,r){const a=this._workIndex*r;qt.multiplyQuaternionsFlat(e,a,e,t,e,n),qt.slerpFlat(e,t,e,t,e,a,s)}_lerp(e,t,n,s,r){const a=1-s;for(let o=0;o!==r;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*s}}_lerpAdditive(e,t,n,s,r){for(let a=0;a!==r;++a){const o=t+a;e[o]=e[o]+e[n+a]*s}}}const Fl="\\[\\]\\.:\\/",Tv=new RegExp("["+Fl+"]","g"),Bl="[^"+Fl+"]",Av="[^"+Fl.replace("\\.","")+"]",wv=/((?:WC+[\/:])*)/.source.replace("WC",Bl),Rv=/(WCOD+)?/.source.replace("WCOD",Av),Cv=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Bl),Iv=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Bl),Pv=new RegExp("^"+wv+Rv+Cv+Iv+"$"),Lv=["material","materials","bones","map"];class Nv{constructor(e,t,n){const s=n||at.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,s=this._bindings[n];s!==void 0&&s.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=n.length;s!==r;++s)n[s].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class at{constructor(e,t,n){this.path=t,this.parsedPath=n||at.parseTrackName(t),this.node=at.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new at.Composite(e,t,n):new at(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Tv,"")}static parseTrackName(e){const t=Pv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=n.nodeName&&n.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){const r=n.nodeName.substring(s+1);Lv.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,s),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let a=0;a<r.length;a++){const o=r[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},s=n(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)e[t++]=n[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let s=0,r=n.length;s!==r;++s)n[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,s=t.propertyName;let r=t.propertyIndex;if(e||(e=at.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[s];if(a===void 0){const l=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+l+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}at.Composite=Nv;at.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};at.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};at.prototype.GetterByBindingType=[at.prototype._getValue_direct,at.prototype._getValue_array,at.prototype._getValue_arrayElement,at.prototype._getValue_toArray];at.prototype.SetterByBindingTypeAndVersioning=[[at.prototype._setValue_direct,at.prototype._setValue_direct_setNeedsUpdate,at.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[at.prototype._setValue_array,at.prototype._setValue_array_setNeedsUpdate,at.prototype._setValue_array_setMatrixWorldNeedsUpdate],[at.prototype._setValue_arrayElement,at.prototype._setValue_arrayElement_setNeedsUpdate,at.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[at.prototype._setValue_fromArray,at.prototype._setValue_fromArray_setNeedsUpdate,at.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Dv{constructor(e,t,n=null,s=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=s;const r=t.tracks,a=r.length,o=new Array(a),c={endingStart:Ss,endingEnd:Ss};for(let l=0;l!==a;++l){const h=r[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=ap,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n){if(e.fadeOut(t),this.fadeIn(t),n){const s=this._clip.duration,r=e._clip.duration,a=r/s,o=s/r;e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const s=this._mixer,r=s.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=s._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=r,c[1]=r+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,s){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const c=(e-r)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case cp:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case wl:default:for(let h=0,u=c.length;h!==u;++h)c[h].evaluate(a),l[h].accumulate(s,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopFading(),s===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const s=n.evaluate(e)[0];t*=s,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let s=this.time+e,r=this._loopCount;const a=n===op;if(e===0)return r===-1?s:a&&(r&1)===1?t-s:s;if(n===Al){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(s>=t)s=t;else if(s<0)s=0;else{this.time=s;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),s>=t||s<0){const o=Math.floor(s/t);s-=t*o,r+=Math.abs(o);const c=this.repetitions-r;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,s=e>0?t:0,this.time=s,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=r,this.time=s,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this.time=s;if(a&&(r&1)===1)return t-s}return s}_setEndings(e,t,n){const s=this._interpolantSettings;n?(s.endingStart=Es,s.endingEnd=Es):(e?s.endingStart=this.zeroSlopeAtStart?Es:Ss:s.endingStart=za,t?s.endingEnd=this.zeroSlopeAtEnd?Es:Ss:s.endingEnd=za)}_scheduleFading(e,t,n){const s=this._mixer,r=s.time;let a=this._weightInterpolant;a===null&&(a=s._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=r,c[0]=t,o[1]=r+e,c[1]=n,this}}const Uv=new Float32Array(1);class Ov extends Ei{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,s=e._clip.tracks,r=s.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let u=0;u!==r;++u){const d=s[u],f=d.name;let g=h[f];if(g!==void 0)++g.referenceCount,a[u]=g;else{if(g=a[u],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const _=t&&t._propertyBindings[u].binding.parsedPath;g=new bv(at.create(n,f,_),d.ValueTypeName,d.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[u]=g}o[u].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,s=e._clip.uuid,r=this._actionsByClip[s];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,s,n)}const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const s=this._actions,r=this._actionsByClip;let a=r[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=s.length,s.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],s=e._cacheIndex;n._cacheIndex=s,t[s]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,a=this._actionsByClip,o=a[r],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const u=o.actionByRoot,d=(e._localRoot||this._root).uuid;delete u[d],c.length===0&&delete a[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,s=t.length;n!==s;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,s=this._nActiveActions++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,s=--this._nActiveActions,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const s=this._bindingsByRootAndName,r=this._bindings;let a=s[t];a===void 0&&(a={},s[t]=a),a[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,s=n.rootNode.uuid,r=n.path,a=this._bindingsByRootAndName,o=a[s],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[r],Object.keys(o).length===0&&delete a[s]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,s=this._nActiveBindings++,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,s=--this._nActiveBindings,r=t[s];e._cacheIndex=s,t[s]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Gd(new Float32Array(2),new Float32Array(2),1,Uv),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,s=--this._nActiveControlInterpolants,r=t[s];e.__cacheIndex=s,t[s]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const s=t||this._root,r=s.uuid;let a=typeof e=="string"?Ya.findByName(s,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=wl),c!==void 0){const u=c.actionByRoot[r];if(u!==void 0&&u.blendMode===n)return u;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const h=new Dv(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,r),h}existingAction(e,t){const n=t||this._root,s=n.uuid,r=typeof e=="string"?Ya.findByName(n,e):e,a=r?r.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[s]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,s=this.time+=e,r=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(s,e,r,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,s=this._actionsByClip,r=s[n];if(r!==void 0){const a=r.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const h=l._cacheIndex,u=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,u._cacheIndex=h,t[h]=u,t.pop(),this._removeInactiveBindingsForAction(l)}delete s[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const s=this._bindingsByRootAndName,r=s[t];if(r!==void 0)for(const a in r){const o=r[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class Su{constructor(e=1,t=0,n=0){return this.radius=e,this.phi=t,this.theta=n,this}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Nt(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class Fv extends Ei{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(){}disconnect(){}dispose(){}update(){}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xl}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xl);function Eu(i,e){if(e===lp)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),i;if(e===Jc||e===_d){let t=i.getIndex();if(t===null){const a=[],o=i.getAttribute("position");if(o!==void 0){for(let c=0;c<o.count;c++)a.push(c);i.setIndex(a),t=i.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),i}const n=t.count-2,s=[];if(e===Jc)for(let a=1;a<=n;a++)s.push(t.getX(0)),s.push(t.getX(a)),s.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(s.push(t.getX(a)),s.push(t.getX(a+1)),s.push(t.getX(a+2))):(s.push(t.getX(a+2)),s.push(t.getX(a+1)),s.push(t.getX(a)));s.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=i.clone();return r.setIndex(s),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),i}class Bv extends er{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Gv(t)}),this.register(function(t){return new Wv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new ey(t)}),this.register(function(t){return new ty(t)}),this.register(function(t){return new Xv(t)}),this.register(function(t){return new Yv(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new Vv(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new qv(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new zv(t)}),this.register(function(t){return new ny(t)}),this.register(function(t){return new iy(t)})}load(e,t,n,s){const r=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Er.extractUrlBase(e);a=Er.resolveURL(l,this.path)}else a=Er.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){s?s(l):console.error(l),r.manager.itemError(e),r.manager.itemEnd(e)},c=new qd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{r.parse(l,a,function(h){t(h),r.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,s){let r;const a={},o={},c=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===Xd){try{a[$e.KHR_BINARY_GLTF]=new sy(e)}catch(u){s&&s(u);return}r=JSON.parse(a[$e.KHR_BINARY_GLTF].content)}else r=JSON.parse(c.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){s&&s(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new _y(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const u=this.pluginCallbacks[h](l);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(r.extensionsUsed)for(let h=0;h<r.extensionsUsed.length;++h){const u=r.extensionsUsed[h],d=r.extensionsRequired||[];switch(u){case $e.KHR_MATERIALS_UNLIT:a[u]=new Hv;break;case $e.KHR_DRACO_MESH_COMPRESSION:a[u]=new ry(r,this.dracoLoader);break;case $e.KHR_TEXTURE_TRANSFORM:a[u]=new ay;break;case $e.KHR_MESH_QUANTIZATION:a[u]=new oy;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,s)}parseAsync(e,t){const n=this;return new Promise(function(s,r){n.parse(e,t,s,r)})}}function kv(){let i={};return{get:function(e){return i[e]},add:function(e,t){i[e]=t},remove:function(e){delete i[e]},removeAll:function(){i={}}}}const $e={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class zv{constructor(e){this.parser=e,this.name=$e.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,s=t.length;n<s;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let s=t.cache.get(n);if(s)return s;const r=t.json,c=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ve(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],Ot);const u=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Ol(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new yv(h),l.distance=u;break;case"spot":l=new xv(h),l.distance=u,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),l.decay=2,qn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),s=Promise.resolve(l),t.cache.add(n,s),s}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],o=(r.extensions&&r.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class Hv{constructor(){this.name=$e.KHR_MATERIALS_UNLIT}getMaterialType(){return pn}extendParams(e,t,n){const s=[];e.color=new Ve(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const a=r.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Ot),e.opacity=a[3]}r.baseColorTexture!==void 0&&s.push(n.assignTexture(e,"map",r.baseColorTexture,gt))}return Promise.all(s)}}class Vv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Gv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){const o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new we(o,o)}return Promise.all(r)}}class Wv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class qv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(r)}}class Xv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new Ve(0,0,0),t.sheenRoughness=0,t.sheen=1;const a=s.extensions[this.name];if(a.sheenColorFactor!==void 0){const o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Ot)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,gt)),a.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(r)}}class Yv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(r)}}class jv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;const o=a.attenuationColor||[1,1,1];return t.attenuationColor=new Ve().setRGB(o[0],o[1],o[2],Ot),Promise.all(r)}}class Kv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const s=this.parser.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=s.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class $v{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));const o=a.specularColorFactor||[1,1,1];return t.specularColor=new Ve().setRGB(o[0],o[1],o[2],Ot),a.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,gt)),Promise.all(r)}}class Zv{constructor(e){this.parser=e,this.name=$e.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(r)}}class Jv{constructor(e){this.parser=e,this.name=$e.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:Dn}extendMaterialParams(e,t){const n=this.parser,s=n.json.materials[e];if(!s.extensions||!s.extensions[this.name])return Promise.resolve();const r=[],a=s.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(r)}}class Qv{constructor(e){this.parser=e,this.name=$e.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,s=n.textures[e];if(!s.extensions||!s.extensions[this.name])return null;const r=s.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,a)}}class ey{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ty{constructor(e){this.parser=e,this.name=$e.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){const t=this.name,n=this.parser,s=n.json,r=s.textures[e];if(!r.extensions||!r.extensions[t])return null;const a=r.extensions[t],o=s.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return this.detectSupport().then(function(l){if(l)return n.loadTextureImage(e,a.source,c);if(s.extensionsRequired&&s.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){const t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}}class ny{constructor(e){this.name=$e.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const s=n.extensions[this.name],r=this.parser.getDependency("buffer",s.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(o){const c=s.byteOffset||0,l=s.byteLength||0,h=s.count,u=s.byteStride,d=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,s.mode,s.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(f),h,u,d,s.mode,s.filter),f})})}else return null}}class iy{constructor(e){this.name=$e.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const s=t.meshes[n.mesh];for(const l of s.primitives)if(l.mode!==un.TRIANGLES&&l.mode!==un.TRIANGLE_STRIP&&l.mode!==un.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),u=h.isGroup?h.children:[h],d=l[0].count,f=[];for(const g of u){const _=new We,m=new P,p=new qt,A=new P(1,1,1),b=new ev(g.geometry,g.material,d);for(let T=0;T<d;T++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,T),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,T),c.SCALE&&A.fromBufferAttribute(c.SCALE,T),b.setMatrixAt(T,_.compose(m,p,A));for(const T in c)if(T==="_COLOR_0"){const V=c[T];b.instanceColor=new tl(V.array,V.itemSize,V.normalized)}else T!=="TRANSLATION"&&T!=="ROTATION"&&T!=="SCALE"&&g.geometry.setAttribute(T,c[T]);pt.prototype.copy.call(b,g),this.parser.assignFinalMaterial(b),f.push(b)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const Xd="glTF",fr=12,bu={JSON:1313821514,BIN:5130562};class sy{constructor(e){this.name=$e.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,fr),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Xd)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const s=this.header.length-fr,r=new DataView(e,fr);let a=0;for(;a<s;){const o=r.getUint32(a,!0);a+=4;const c=r.getUint32(a,!0);if(a+=4,c===bu.JSON){const l=new Uint8Array(e,fr+a,o);this.content=n.decode(l)}else if(c===bu.BIN){const l=fr+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class ry{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=$e.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,s=this.dracoLoader,r=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const u=il[h]||h.toLowerCase();o[u]=a[h]}for(const h in e.attributes){const u=il[h]||h.toLowerCase();if(a[h]!==void 0){const d=n.accessors[e.attributes[h]],f=Ns[d.componentType];l[u]=f.name,c[u]=d.normalized===!0}}return t.getDependency("bufferView",r).then(function(h){return new Promise(function(u,d){s.decodeDracoFile(h,function(f){for(const g in f.attributes){const _=f.attributes[g],m=c[g];m!==void 0&&(_.normalized=m)}u(f)},o,l,Ot,d)})})}}class ay{constructor(){this.name=$e.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class oy{constructor(){this.name=$e.KHR_MESH_QUANTIZATION}}class Yd extends zr{constructor(e,t,n,s){super(e,t,n,s)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,s=this.valueSize,r=e*s*3+s;for(let a=0;a!==s;a++)t[a]=n[r+a];return t}interpolate_(e,t,n,s){const r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=s-t,u=(n-t)/h,d=u*u,f=d*u,g=e*l,_=g-l,m=-2*f+3*d,p=f-d,A=1-m,b=p-d+u;for(let T=0;T!==o;T++){const V=a[_+T+o],L=a[_+T+c]*h,R=a[g+T+o],W=a[g+T]*h;r[T]=A*V+b*L+m*R+p*W}return r}}const cy=new qt;class ly extends Yd{interpolate_(e,t,n,s){const r=super.interpolate_(e,t,n,s);return cy.fromArray(r).normalize().toArray(r),r}}const un={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Ns={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Tu={9728:Gt,9729:cn,9984:od,9985:wa,9986:_r,9987:Yn},Au={33071:mi,33648:ka,10497:qi},nc={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},il={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ci={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},hy={CUBICSPLINE:void 0,LINEAR:Ir,STEP:Cr},ic={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function uy(i){return i.DefaultMaterial===void 0&&(i.DefaultMaterial=new Zs({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Jn})),i.DefaultMaterial}function Li(i,e,t){for(const n in t.extensions)i[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function qn(i,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(i.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function dy(i,e,t){let n=!1,s=!1,r=!1;for(let l=0,h=e.length;l<h;l++){const u=e[l];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(s=!0),u.COLOR_0!==void 0&&(r=!0),n&&s&&r)break}if(!n&&!s&&!r)return Promise.resolve(i);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const u=e[l];if(n){const d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):i.attributes.position;a.push(d)}if(s){const d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):i.attributes.normal;o.push(d)}if(r){const d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):i.attributes.color;c.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],u=l[1],d=l[2];return n&&(i.morphAttributes.position=h),s&&(i.morphAttributes.normal=u),r&&(i.morphAttributes.color=d),i.morphTargetsRelative=!0,i})}function fy(i,e){if(i.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)i.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(i.morphTargetInfluences.length===t.length){i.morphTargetDictionary={};for(let n=0,s=t.length;n<s;n++)i.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function py(i){let e;const t=i.extensions&&i.extensions[$e.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+sc(t.attributes):e=i.indices+":"+sc(i.attributes)+":"+i.mode,i.targets!==void 0)for(let n=0,s=i.targets.length;n<s;n++)e+=":"+sc(i.targets[n]);return e}function sc(i){let e="";const t=Object.keys(i).sort();for(let n=0,s=t.length;n<s;n++)e+=t[n]+":"+i[t[n]]+";";return e}function sl(i){switch(i){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function my(i){return i.search(/\.jpe?g($|\?)/i)>0||i.search(/^data\:image\/jpeg/)===0?"image/jpeg":i.search(/\.webp($|\?)/i)>0||i.search(/^data\:image\/webp/)===0?"image/webp":"image/png"}const gy=new We;class _y{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new kv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,s=-1,r=!1,a=-1;if(typeof navigator<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);s=n&&c?parseInt(c[1],10):-1,r=o.indexOf("Firefox")>-1,a=r?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&s<17||r&&a<98?this.textureLoader=new mv(this.options.manager):this.textureLoader=new Sv(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new qd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,s=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][s.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:s.asset,parser:n,userData:{}};return Li(r,o,s),qn(o,s),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let s=0,r=t.length;s<r;s++){const a=t[s].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let s=0,r=e.length;s<r;s++){const a=e[s];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const s=n.clone(),r=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())r(h,o.children[l])};return r(n,s),s.name+="_instance_"+e.uses[t]++,s}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const s=e(t[n]);if(s)return s}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let s=0;s<t.length;s++){const r=e(t[s]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let s=this.cache.get(n);if(!s){switch(e){case"scene":s=this.loadScene(t);break;case"node":s=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":s=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":s=this.loadAccessor(t);break;case"bufferView":s=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":s=this.loadBuffer(t);break;case"material":s=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":s=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":s=this.loadSkin(t);break;case"animation":s=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":s=this.loadCamera(t);break;default:if(s=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!s)throw new Error("Unknown type: "+e);break}this.cache.add(n,s)}return s}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,s=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(s.map(function(r,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[$e.KHR_BINARY_GLTF].body);const s=this.options;return new Promise(function(r,a){n.load(Er.resolveURL(t.uri,s.path),r,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const s=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+s)})}loadAccessor(e){const t=this,n=this.json,s=this.json.accessors[e];if(s.bufferView===void 0&&s.sparse===void 0){const a=nc[s.type],o=Ns[s.componentType],c=s.normalized===!0,l=new o(s.count*a);return Promise.resolve(new Ut(l,a,c))}const r=[];return s.bufferView!==void 0?r.push(this.getDependency("bufferView",s.bufferView)):r.push(null),s.sparse!==void 0&&(r.push(this.getDependency("bufferView",s.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",s.sparse.values.bufferView))),Promise.all(r).then(function(a){const o=a[0],c=nc[s.type],l=Ns[s.componentType],h=l.BYTES_PER_ELEMENT,u=h*c,d=s.byteOffset||0,f=s.bufferView!==void 0?n.bufferViews[s.bufferView].byteStride:void 0,g=s.normalized===!0;let _,m;if(f&&f!==u){const p=Math.floor(d/f),A="InterleavedBuffer:"+s.bufferView+":"+s.componentType+":"+p+":"+s.count;let b=t.cache.get(A);b||(_=new l(o,p*f,s.count*f/h),b=new Od(_,f/h),t.cache.add(A,b)),m=new Lr(b,c,d%f/h,g)}else o===null?_=new l(s.count*c):_=new l(o,d,s.count*c),m=new Ut(_,c,g);if(s.sparse!==void 0){const p=nc.SCALAR,A=Ns[s.sparse.indices.componentType],b=s.sparse.indices.byteOffset||0,T=s.sparse.values.byteOffset||0,V=new A(a[1],b,s.sparse.count*p),L=new l(a[2],T,s.sparse.count*c);o!==null&&(m=new Ut(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let R=0,W=V.length;R<W;R++){const ce=V[R];if(m.setX(ce,L[R*c]),c>=2&&m.setY(ce,L[R*c+1]),c>=3&&m.setZ(ce,L[R*c+2]),c>=4&&m.setW(ce,L[R*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,a=t.images[r];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,r,o)}loadTextureImage(e,t,n){const s=this,r=this.json,a=r.textures[e],o=r.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const d=(r.samplers||{})[a.sampler]||{};return h.magFilter=Tu[d.magFilter]||cn,h.minFilter=Tu[d.minFilter]||Yn,h.wrapS=Au[d.wrapS]||qi,h.wrapT=Au[d.wrapT]||qi,s.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,s=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());const a=s.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(u){l=!0;const d=new Blob([u],{type:a.mimeType});return c=o.createObjectURL(d),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(u){return new Promise(function(d,f){let g=d;t.isImageBitmapLoader===!0&&(g=function(_){const m=new bt(_);m.needsUpdate=!0,d(m)}),t.load(Er.resolveURL(u,r.path),g,void 0,f)})}).then(function(u){return l===!0&&o.revokeObjectURL(c),qn(u,a),u.userData.mimeType=a.mimeType||my(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,s){const r=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),r.extensions[$e.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[$e.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=r.associations.get(a);a=r.extensions[$e.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),r.associations.set(a,c)}}return s!==void 0&&(a.colorSpace=s),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const s=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Hd,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new ro,Rn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(s||r||a){let o="ClonedMaterial:"+n.uuid+":";s&&(o+="derivative-tangents:"),r&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),r&&(c.vertexColors=!0),a&&(c.flatShading=!0),s&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return Zs}loadMaterial(e){const t=this,n=this.json,s=this.extensions,r=n.materials[e];let a;const o={},c=r.extensions||{},l=[];if(c[$e.KHR_MATERIALS_UNLIT]){const u=s[$e.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),l.push(u.extendParams(o,r,t))}else{const u=r.pbrMetallicRoughness||{};if(o.color=new Ve(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){const d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Ot),o.opacity=d[3]}u.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",u.baseColorTexture,gt)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}r.doubleSided===!0&&(o.side=Qt);const h=r.alphaMode||ic.OPAQUE;if(h===ic.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===ic.MASK&&(o.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&a!==pn&&(l.push(t.assignTexture(o,"normalMap",r.normalTexture)),o.normalScale=new we(1,1),r.normalTexture.scale!==void 0)){const u=r.normalTexture.scale;o.normalScale.set(u,u)}if(r.occlusionTexture!==void 0&&a!==pn&&(l.push(t.assignTexture(o,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&a!==pn){const u=r.emissiveFactor;o.emissive=new Ve().setRGB(u[0],u[1],u[2],Ot)}return r.emissiveTexture!==void 0&&a!==pn&&l.push(t.assignTexture(o,"emissiveMap",r.emissiveTexture,gt)),Promise.all(l).then(function(){const u=new a(o);return r.name&&(u.name=r.name),qn(u,r),t.associations.set(u,{materials:e}),r.extensions&&Li(s,u,r),u})}createUniqueName(e){const t=at.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,s=this.primitiveCache;function r(o){return n[$e.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return wu(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=py(l),u=s[h];if(u)a.push(u.promise);else{let d;l.extensions&&l.extensions[$e.KHR_DRACO_MESH_COMPRESSION]?d=r(l):d=wu(new Yt,l,t),s[h]={primitive:l,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,s=this.extensions,r=n.meshes[e],a=r.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?uy(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],u=[];for(let f=0,g=h.length;f<g;f++){const _=h[f],m=a[f];let p;const A=l[f];if(m.mode===un.TRIANGLES||m.mode===un.TRIANGLE_STRIP||m.mode===un.TRIANGLE_FAN||m.mode===void 0)p=r.isSkinnedMesh===!0?new Bd(_,A):new _t(_,A),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),m.mode===un.TRIANGLE_STRIP?p.geometry=Eu(p.geometry,_d):m.mode===un.TRIANGLE_FAN&&(p.geometry=Eu(p.geometry,Jc));else if(m.mode===un.LINES)p=new tv(_,A);else if(m.mode===un.LINE_STRIP)p=new Br(_,A);else if(m.mode===un.LINE_LOOP)p=new nv(_,A);else if(m.mode===un.POINTS)p=new iv(_,A);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&fy(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),qn(p,r),m.extensions&&Li(s,p,m),t.assignFinalMaterial(p),u.push(p)}for(let f=0,g=u.length;f<g;f++)t.associations.set(u[f],{meshes:e,primitives:f});if(u.length===1)return r.extensions&&Li(s,u[0],r),u[0];const d=new Kn;r.extensions&&Li(s,d,r),t.associations.set(d,{meshes:e});for(let f=0,g=u.length;f<g;f++)d.add(u[f]);return d})}loadCamera(e){let t;const n=this.json.cameras[e],s=n[n.type];if(!s){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Vt(nt.radToDeg(s.yfov),s.aspectRatio||1,s.znear||1,s.zfar||2e6):n.type==="orthographic"&&(t=new Pl(-s.xmag,s.xmag,s.ymag,-s.ymag,s.znear,s.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),qn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let s=0,r=t.joints.length;s<r;s++)n.push(this._loadNodeShallow(t.joints[s]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(s){const r=s.pop(),a=s,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const u=a[l];if(u){o.push(u);const d=new We;r!==null&&d.fromArray(r.array,l*16),c.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Dl(o,c)})}loadAnimation(e){const t=this.json,n=this,s=t.animations[e],r=s.name?s.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let u=0,d=s.channels.length;u<d;u++){const f=s.channels[u],g=s.samplers[f.sampler],_=f.target,m=_.node,p=s.parameters!==void 0?s.parameters[g.input]:g.input,A=s.parameters!==void 0?s.parameters[g.output]:g.output;_.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",A)),l.push(g),h.push(_))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(u){const d=u[0],f=u[1],g=u[2],_=u[3],m=u[4],p=[];for(let A=0,b=d.length;A<b;A++){const T=d[A],V=f[A],L=g[A],R=_[A],W=m[A];if(T===void 0)continue;T.updateMatrix&&T.updateMatrix();const ce=n._createAnimationTracks(T,V,L,R,W);if(ce)for(let x=0;x<ce.length;x++)p.push(ce[x])}return new Ya(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,s=t.nodes[e];return s.mesh===void 0?null:n.getDependency("mesh",s.mesh).then(function(r){const a=n._getNodeRef(n.meshCache,s.mesh,r);return s.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=s.weights.length;c<l;c++)o.morphTargetInfluences[c]=s.weights[c]}),a})}loadNode(e){const t=this.json,n=this,s=t.nodes[e],r=n._loadNodeShallow(e),a=[],o=s.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=s.skin===void 0?Promise.resolve(null):n.getDependency("skin",s.skin);return Promise.all([r,Promise.all(a),c]).then(function(l){const h=l[0],u=l[1],d=l[2];d!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(d,gy)});for(let f=0,g=u.length;f<g;f++)h.add(u[f]);return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,s=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],a=r.name?s.createUniqueName(r.name):"",o=[],c=s._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),r.camera!==void 0&&o.push(s.getDependency("camera",r.camera).then(function(l){return s._getNodeRef(s.cameraCache,r.camera,l)})),s._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(r.isBone===!0?h=new kd:l.length>1?h=new Kn:l.length===1?h=l[0]:h=new pt,h!==l[0])for(let u=0,d=l.length;u<d;u++)h.add(l[u]);if(r.name&&(h.userData.name=r.name,h.name=a),qn(h,r),r.extensions&&Li(n,h,r),r.matrix!==void 0){const u=new We;u.fromArray(r.matrix),h.applyMatrix4(u)}else r.translation!==void 0&&h.position.fromArray(r.translation),r.rotation!==void 0&&h.quaternion.fromArray(r.rotation),r.scale!==void 0&&h.scale.fromArray(r.scale);return s.associations.has(h)||s.associations.set(h,{}),s.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],s=this,r=new Kn;n.name&&(r.name=s.createUniqueName(n.name)),qn(r,n),n.extensions&&Li(t,r,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(s.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,u=c.length;h<u;h++)r.add(c[h]);const l=h=>{const u=new Map;for(const[d,f]of s.associations)(d instanceof Rn||d instanceof bt)&&u.set(d,f);return h.traverse(d=>{const f=s.associations.get(d);f!=null&&u.set(d,f)}),u};return s.associations=l(r),r})}_createAnimationTracks(e,t,n,s,r){const a=[],o=e.name?e.name:e.uuid,c=[];ci[r.path]===ci.weights?e.traverse(function(d){d.morphTargetInfluences&&c.push(d.name?d.name:d.uuid)}):c.push(o);let l;switch(ci[r.path]){case ci.weights:l=Gs;break;case ci.rotation:l=Ws;break;case ci.position:case ci.scale:l=qs;break;default:switch(n.itemSize){case 1:l=Gs;break;case 2:case 3:default:l=qs;break}break}const h=s.interpolation!==void 0?hy[s.interpolation]:Ir,u=this._getArrayFromAccessor(n);for(let d=0,f=c.length;d<f;d++){const g=new l(c[d]+"."+ci[r.path],t.array,u,h);s.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(g),a.push(g)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=sl(t.constructor),s=new Float32Array(t.length);for(let r=0,a=t.length;r<a;r++)s[r]=t[r]*n;t=s}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const s=this instanceof Ws?ly:Yd;return new s(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function xy(i,e,t){const n=e.attributes,s=new Ln;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(s.set(new P(c[0],c[1],c[2]),new P(l[0],l[1],l[2])),o.normalized){const h=sl(Ns[o.componentType]);s.min.multiplyScalar(h),s.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const o=new P,c=new P;for(let l=0,h=r.length;l<h;l++){const u=r[l];if(u.POSITION!==void 0){const d=t.json.accessors[u.POSITION],f=d.min,g=d.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),d.normalized){const _=sl(Ns[d.componentType]);c.multiplyScalar(_)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}s.expandByVector(o)}i.boundingBox=s;const a=new Nn;s.getCenter(a.center),a.radius=s.min.distanceTo(s.max)/2,i.boundingSphere=a}function wu(i,e,t){const n=e.attributes,s=[];function r(a,o){return t.getDependency("accessor",a).then(function(c){i.setAttribute(o,c)})}for(const a in n){const o=il[a]||a.toLowerCase();o in i.attributes||s.push(r(n[a],o))}if(e.indices!==void 0&&!i.index){const a=t.getDependency("accessor",e.indices).then(function(o){i.setIndex(o)});s.push(a)}return et.workingColorSpace!==Ot&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${et.workingColorSpace}" not supported.`),qn(i,e),xy(i,e,t),Promise.all(s).then(function(){return e.targets!==void 0?dy(i,e.targets,t):i})}const Ru={type:"change"},kl={type:"start"},jd={type:"end"},ya=new Fr,Cu=new di,vy=Math.cos(70*nt.DEG2RAD),St=new P,$t=2*Math.PI,lt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rc=1e-6;class yy extends Fv{constructor(e,t=null){super(e,t),this.state=lt.NONE,this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:Cs.ROTATE,MIDDLE:Cs.DOLLY,RIGHT:Cs.PAN},this.touches={ONE:Ms.ROTATE,TWO:Ms.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new P,this._lastQuaternion=new qt,this._lastTargetPosition=new P,this._quat=new qt().setFromUnitVectors(e.up,new P(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Su,this._sphericalDelta=new Su,this._scale=1,this._panOffset=new P,this._rotateStart=new we,this._rotateEnd=new we,this._rotateDelta=new we,this._panStart=new we,this._panEnd=new we,this._panDelta=new we,this._dollyStart=new we,this._dollyEnd=new we,this._dollyDelta=new we,this._dollyDirection=new P,this._mouse=new we,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sy.bind(this),this._onPointerDown=My.bind(this),this._onPointerUp=Ey.bind(this),this._onContextMenu=Iy.bind(this),this._onMouseWheel=Ay.bind(this),this._onKeyDown=wy.bind(this),this._onTouchStart=Ry.bind(this),this._onTouchMove=Cy.bind(this),this._onMouseDown=by.bind(this),this._onMouseMove=Ty.bind(this),this._interceptControlDown=Py.bind(this),this._interceptControlUp=Ly.bind(this),this.domElement!==null&&this.connect(),this.update()}connect(){this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Ru),this.update(),this.state=lt.NONE}update(e=null){const t=this.object.position;St.copy(t).sub(this.target),St.applyQuaternion(this._quat),this._spherical.setFromVector3(St),this.autoRotate&&this.state===lt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,s=this.maxAzimuthAngle;isFinite(n)&&isFinite(s)&&(n<-Math.PI?n+=$t:n>Math.PI&&(n-=$t),s<-Math.PI?s+=$t:s>Math.PI&&(s-=$t),n<=s?this._spherical.theta=Math.max(n,Math.min(s,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+s)/2?Math.max(n,this._spherical.theta):Math.min(s,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const a=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=a!=this._spherical.radius}if(St.setFromSpherical(this._spherical),St.applyQuaternion(this._quatInverse),t.copy(this.target).add(St),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let a=null;if(this.object.isPerspectiveCamera){const o=St.length();a=this._clampDistance(o*this._scale);const c=o-a;this.object.position.addScaledVector(this._dollyDirection,c),this.object.updateMatrixWorld(),r=!!c}else if(this.object.isOrthographicCamera){const o=new P(this._mouse.x,this._mouse.y,0);o.unproject(this.object);const c=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=c!==this.object.zoom;const l=new P(this._mouse.x,this._mouse.y,0);l.unproject(this.object),this.object.position.sub(l).add(o),this.object.updateMatrixWorld(),a=St.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;a!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(a).add(this.object.position):(ya.origin.copy(this.object.position),ya.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ya.direction))<vy?this.object.lookAt(this.target):(Cu.setFromNormalAndCoplanarPoint(this.object.up,this.target),ya.intersectPlane(Cu,this.target))))}else if(this.object.isOrthographicCamera){const a=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),a!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>rc||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rc||this._lastTargetPosition.distanceToSquared(this.target)>rc?(this.dispatchEvent(Ru),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?$t/60*this.autoRotateSpeed*e:$t/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){St.setFromMatrixColumn(t,0),St.multiplyScalar(-e),this._panOffset.add(St)}_panUp(e,t){this.screenSpacePanning===!0?St.setFromMatrixColumn(t,1):(St.setFromMatrixColumn(t,0),St.crossVectors(this.object.up,St)),St.multiplyScalar(e),this._panOffset.add(St)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const s=this.object.position;St.copy(s).sub(this.target);let r=St.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),s=e-n.left,r=t-n.top,a=n.width,o=n.height;this._mouse.x=s/a*2-1,this._mouse.y=-(r/o)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft($t*this._rotateDelta.x/t.clientHeight),this._rotateUp($t*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp($t*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateUp(-$t*this.rotateSpeed/this.domElement.clientHeight):this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft($t*this.rotateSpeed/this.domElement.clientHeight):this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this._rotateLeft(-$t*this.rotateSpeed/this.domElement.clientHeight):this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._rotateStart.set(n,s)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panStart.set(n,s)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),s=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(s,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft($t*this._rotateDelta.x/t.clientHeight),this._rotateUp($t*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),s=.5*(e.pageY+t.y);this._panEnd.set(n,s)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,s=e.pageY-t.y,r=Math.sqrt(n*n+s*s);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const a=(e.pageX+t.x)*.5,o=(e.pageY+t.y)*.5;this._updateZoomParameters(a,o)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new we,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function My(i){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(i.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(i)&&(this._addPointer(i),i.pointerType==="touch"?this._onTouchStart(i):this._onMouseDown(i)))}function Sy(i){this.enabled!==!1&&(i.pointerType==="touch"?this._onTouchMove(i):this._onMouseMove(i))}function Ey(i){switch(this._removePointer(i),this._pointers.length){case 0:this.domElement.releasePointerCapture(i.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(jd),this.state=lt.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function by(i){let e;switch(i.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case Cs.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(i),this.state=lt.DOLLY;break;case Cs.ROTATE:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}break;case Cs.PAN:if(i.ctrlKey||i.metaKey||i.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(i),this.state=lt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(i),this.state=lt.PAN}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(kl)}function Ty(i){switch(this.state){case lt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(i);break;case lt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(i);break;case lt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(i);break}}function Ay(i){this.enabled===!1||this.enableZoom===!1||this.state!==lt.NONE||(i.preventDefault(),this.dispatchEvent(kl),this._handleMouseWheel(this._customWheelEvent(i)),this.dispatchEvent(jd))}function wy(i){this.enabled===!1||this.enablePan===!1||this._handleKeyDown(i)}function Ry(i){switch(this._trackPointer(i),this._pointers.length){case 1:switch(this.touches.ONE){case Ms.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(i),this.state=lt.TOUCH_ROTATE;break;case Ms.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(i),this.state=lt.TOUCH_PAN;break;default:this.state=lt.NONE}break;case 2:switch(this.touches.TWO){case Ms.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(i),this.state=lt.TOUCH_DOLLY_PAN;break;case Ms.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(i),this.state=lt.TOUCH_DOLLY_ROTATE;break;default:this.state=lt.NONE}break;default:this.state=lt.NONE}this.state!==lt.NONE&&this.dispatchEvent(kl)}function Cy(i){switch(this._trackPointer(i),this.state){case lt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(i),this.update();break;case lt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(i),this.update();break;case lt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(i),this.update();break;case lt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(i),this.update();break;default:this.state=lt.NONE}}function Iy(i){this.enabled!==!1&&i.preventDefault()}function Py(i){i.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ly(i){i.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Ny(i){const e=new Map,t=new Map,n=i.clone();return Kd(i,n,function(s,r){e.set(r,s),t.set(s,r)}),n.traverse(function(s){if(!s.isSkinnedMesh)return;const r=s,a=e.get(s),o=a.skeleton.bones;r.skeleton=a.skeleton.clone(),r.bindMatrix.copy(a.bindMatrix),r.skeleton.bones=o.map(function(c){return t.get(c)}),r.bind(r.skeleton,r.bindMatrix)}),n}function Kd(i,e,t){t(i,e);for(let n=0;n<i.children.length;n++)Kd(i.children[n],e.children[n],t)}const Dy=""+new URL("pitch-21dys77-.glb",import.meta.url).href,Uy=""+new URL("goals-DgYyQ0Gd.glb",import.meta.url).href,Oy=""+new URL("ball-DoW3ZhhV.glb",import.meta.url).href,Fy=""+new URL("clips-TX-QghKQ.glb",import.meta.url).href,By=""+new URL("tpose_sculpted--7ziuU1P.glb",import.meta.url).href,$d=Object.freeze({pass:"passes",cross:"crosses",shot:"shots",action:"actions",observation:"observations",chapter:"chapters",attack:"attacks",link:"links",movement:"movements",outcome:"outcomes",attempt:"attempts",run:"runs",card:"cards",substitution:"substitutions",tag:"tags",match:"matches"}),ky=Object.freeze(Object.fromEntries(Object.entries($d).flatMap(([i,e])=>[[i,i],[e,i]])));function zy(i){return i.replace(/(?<![\d./:-])\b(\d+(?:\/\d+)?)\s+((?:(?:recorded|completed|known|missing|valid|camera|detected|observed|receiving|evidence|personal|source|active|threatening|off-ball|on-ball|goal|pass|cross|camera-observed|camera-detected)\s+)*)(passes|pass|crosses|cross|shots?|actions?|observations?|chapters?|attacks?|links?|movements?|outcomes?|attempts?|runs?|cards?|substitutions?|tags?|matches|match)\b/gi,(e,t,n,s)=>{const r=ky[s.toLowerCase()],a=Number(t.split("/").at(-1))===1?r:$d[r];return`${t} ${n}${s[0]===s[0].toUpperCase()?a[0].toUpperCase()+a.slice(1):a}`})}function Iu(i){return zy(String(i??"").replace(/SkillCorner event completion simulates availability; provider available_at and revision handling are not implemented\./gi,"Actions appear after they finish.").replace(/The existing static website still distributes full-match files\. This API does not resolve site-wide GAP-01\./gi,"This is a full-match replay.").replace(/Historical SkillCorner replay, streamed as simulated live\. The static full-match assets remain downloadable\./gi,"This is a match replay; saved stories keep their original evidence.").replace(/(?:No model provider is configured for this service; no model was called for this question\.|No model was called for this question\.|No real cloud inference was verified for this answer\.|No cloud explanation was verified for this answer\.)/gi,"Based on match facts.").replace(/This answer uses (?:deterministic local rules|an injected provider contract result)\./gi,"Based on match facts.").replace(/This answer uses validated model-selected facts and server-rendered values\./gi,"AI insight grounded in match records.").replace(/Finite topic templates and server-rendered quantities; no free-form football reasoning or conversation memory\./gi,"Only supported match details are included.").replace(/Validation checks exact topic facts and topic-compatible representative references; it cannot prove arbitrary semantic relevance or causality\./gi,"The records do not establish intent or causation.").replace(/Rule-based chronology and thematic links; no new model inference is claimed for this story\./gi,"Chapters follow the recorded actions and evidence.").replace(/(?:The cloud endpoint supports|Cloud scope is)[^.]*\./gi,"Only supported match details are included.").replace(/(?:No validated model answer was available for this question; this answer uses rules|This answer uses local demo rules|No model was called|Rule-based default focus)\.?/gi,"").replace(/\bSkillCorner(?:\s+Open Data)?\b|\bOpen\s*Data\b/gi,"match records").replace(/\bopen[- ]data\b/gi,"available").replace(/\bprovider[- ]extrapolated\b/gi,"estimated").replace(/\bprovider[- ]tagged\b|\bprovider event tag\b/gi,"recorded").replace(/\bprovider\b/gi,"record").replace(/\b(?:position-only|position-based) (?:demo |demonstration )?estimate\b/gi,"position-based estimate").replace(/\b(?:demo|demonstration) estimate\b/gi,"estimate").replace(/\brule[- ]based forecast\b/gi,"forecast estimate").replace(/\brule classifier\b/gi,"pattern estimate").replace(/\brule confidence\b/gi,"pattern confidence").replace(/\brule inference\b/gi,"estimate").replace(/\brule[- ](?:based|composed)\b/gi,"recorded").replace(/\b(?:local|server|browser|deterministic) rules\b/gi,"match facts").replace(/\bsimulated[- ]live\b|\bsimulated live\b|\bhistorical replay\b/gi,"match replay").replace(/\bfixtures\b/gi,"matches").replace(/\bbaseline\b/gi,"comparison").replace(/\bextrapolated (?:positions|guesses)\b/gi,"estimated positions").replace(/\bsource events?\b/gi,"recorded actions").replace(/\bsource records?\b/gi,"match records").replace(/\bsource links?\b/gi,"evidence links").replace(/\bfrozen snapshot\b/gi,"fixed story").replace(/\bfrozen story\b/gi,"fixed story").replace(/\bserver[- ]saved\b/gi,"saved").replace(/\blive story\b/gi,"current story").replace(/\bposition model\b/gi,"position estimate").replace(/\b(?:raw|native) camera observations\b/gi,"camera observations").replace(/\b(?:raw|native) camera (?:detections|samples)\b/gi,"camera observations").replace(/\bdemo\b/gi,"").replace(/\bcloud\b/gi,"AI").replace(/\bAPI\b/gi,"service").replace(/\bendpoint\b/gi,"feature").replace(/\b(?:Worker|D1)\b/g,"storage").replace(/\bon the server\b|\bon server\b/gi,"").replace(/\bserver storage\b/gi,"Saving").replace(/\bserver confirmation\b/gi,"Confirmation").replace(/\bserver save\b/gi,"save").replace(/\bthe server\b/gi,"Matchmind").replace(/\bRule match\b/gi,"Pattern estimate").replace(/\bsamples\b/gi,"observations").replace(/[ \t]{2,}/g," ").trim())}function Hy(i){if(!i||typeof MutationObserver>"u")return;const e=n=>{if(n.nodeType===3){if(n.parentElement?.closest("script,style,textarea,svg,canvas,.user-message"))return;const s=Iu(n.nodeValue);s!==n.nodeValue.trim()&&(n.nodeValue=s);return}if(!(n.nodeType!==1||n.matches("script,style,textarea,svg,canvas,.user-message"))){for(const s of["title","aria-label","aria-description","placeholder","alt"]){const r=n.getAttribute(s);if(r!==null){const a=Iu(r);a!==r&&n.setAttribute(s,a)}}for(const s of n.childNodes)e(s)}};e(i);const t=new MutationObserver(n=>{for(const s of n)if(s.type==="childList")for(const r of s.addedNodes)e(r);else e(s.target)});return t.observe(i,{subtree:!0,childList:!0,characterData:!0,attributes:!0,attributeFilter:["title","aria-label","aria-description","placeholder","alt"]}),t}const Zd=new URLSearchParams(location.search).has("debug"),Ht=(...i)=>{Zd&&console.log(...i)},bi=i=>{(Zd||/ERROR|FAILED/.test(i))&&console.log("[boot]",i);const e=document.getElementById("status");e&&(e.textContent=/ERROR|FAILED/.test(i)?"The replay could not load.":"Preparing the replay…")};addEventListener("unhandledrejection",i=>bi("BOOT FAILED: "+(i.reason&&i.reason.message||i.reason)));addEventListener("error",i=>bi("ERROR: "+i.message));Hy(document.body);const ja=new URLSearchParams(location.search),mn=ja.has("embed");document.body.classList.toggle("embed",mn);let zl=null;const An=i=>{if(!i)return null;const e=String(i).trim().replace(/^#?/,"#").toLowerCase();return/^#[0-9a-f]{6}$/.test(e)?e:null},Xs=ja.get("match");if(!/^[0-9]{1,12}$/.test(Xs??""))throw console.warn(`[boot] missing or invalid ?match=${JSON.stringify(Xs)} — back to landing page`),location.replace(new URL("..",location.href).href),new Error("no match id");const Vy=300,Gy=50,ki={idle:{name:"movement/idle/000_idlelevel1",speed:0},jog:{name:"ballcontrol/walk/000",speed:5.04},sprint:{name:"movement/sprint/000_idlelevel1",speed:7},throw:{name:"highpass/idle/special/000_throw",speed:0},hold:{name:"movement_special/idle/special/000_holdball",speed:0},carry:{name:"movement_special/dribble/special/000_holdball",speed:3.5},dribble:{name:"ballcontrol/sprint/000",speed:7}},Wy=new Set(["idle","jog","sprint","throw"]),Pu=.7,qy=.3,Xy=.2,Lt={pass:{name:"pass/idle/000",contact:.6,slow:1},shot:{name:"shot/idle/020",contact:.5,slow:1.2},highpass:{name:"highpass/idle/000_long",contact:.5,slow:1},header:{name:"pass/idle/nonbase/000_header",contact:.5,slow:1},header_jump:{name:"pass/idle/nonbase/000_header_jump_forwards",contact:.5,slow:1},gkthrow:{name:"pass/idle/special/000_throw",contact:.45,slow:1},trap:{name:"trap/idle/000_IB000",contact:.5,slow:1},pass_walk:{name:"pass/walk/000",contact:.54,slow:1,moving:!0,speed:3.76},pass_sprint:{name:"pass/sprint/000",contact:.53,slow:1,moving:!0,speed:5.53},shot_walk:{name:"shot/walk/010_short",contact:.32,slow:1,moving:!0,speed:4.16},shot_sprint:{name:"shot/sprint/030",contact:.33,slow:1,moving:!0,speed:4.79},highpass_walk:{name:"highpass/walk/000",contact:.32,slow:1,moving:!0,speed:4.13},highpass_sprint:{name:"highpass/walk/000",contact:.32,slow:1,moving:!0,speed:4.13},trap_walk:{name:"trap/walk/000_D000_IB090",contact:.62,slow:1,moving:!0,speed:4.19},trap_sprint:{name:"trap/sprint/000_D000_IB090_decel",contact:.62,slow:1,moving:!0,speed:5.83},trap_l:{name:"trap/idle/135_IB000_accel_left_shallowangle",contact:.35,slow:1,travel:.74,exitDeg:143.5},trap_r:{name:"trap/idle/135_IB000_accel_right",contact:.35,slow:1,travel:.73,exitDeg:-148.5},trap_r90:{name:"trap/idle/090_IB000_accel_optional",contact:.35,slow:1,travel:.71,exitDeg:-89.4},bturn_45:{name:"movement/idle/045_accel",contact:.15,slow:1,travel:.1,exitDeg:45},bturn_90:{name:"movement/idle/090_accel",contact:.15,slow:1,travel:.1,exitDeg:90},bturn_135:{name:"movement/idle/135_accel",contact:.15,slow:1,travel:.1,exitDeg:135},bturn_180:{name:"movement/idle/180_accel",contact:.15,slow:1,travel:.05,exitDeg:180},pass_turn180:{name:"pass/dribble/180_turn",contact:.55,slow:1,travel:.3,exitDeg:180},shot_turn180:{name:"shot/walk/180_turn",contact:.55,slow:1,travel:.3,exitDeg:180},highpass_turn180:{name:"highpass/walk/180_turn",contact:.55,slow:1,travel:.3,exitDeg:180},shot_loft:{name:"highpass/idle/000_long",contact:.5,slow:1},shot_loft_walk:{name:"highpass/walk/000",contact:.32,slow:1,moving:!0,speed:4.13},shot_loft_sprint:{name:"highpass/walk/000",contact:.32,slow:1,moving:!0,speed:4.13},chest:{name:"trap/idle/highballs/000_chest",contact:.55,slow:1},gk_ground:{name:"deflect/idle/000_ground_holdball",contact:.6,slow:1},gk_dive_l:{name:"deflect/idle/090_ground_deflect_far",contact:.45,slow:1},gk_dive_r:{name:"deflect/idle/090_midheight_deflect_far",contact:.45,slow:1},gk_knee:{name:"deflect/idle/000_kneeheight_holdball",contact:.6,slow:1},gk_trunk:{name:"deflect/idle/000_trunk_holdball",contact:.6,slow:1},gk_high:{name:"deflect/idle/000_high_holdball",contact:.6,slow:1},tackle_front:{name:"interfere/idle/000_front",contact:.4,slow:1,moving:!0},tackle_side:{name:"interfere/idle/000_side",contact:.4,slow:1,moving:!0},tackle_stretch:{name:"interfere/walk/000_stretch",contact:.4,slow:1,moving:!0},tackle_reach:{name:"interfere/sprint/000_reach",contact:.55,slow:1,moving:!0},tackle_behind:{name:"interfere/walk/000_decel_side_behind",contact:.45,slow:1,moving:!0},trip_hard_run:{name:"trip/trip_t3/sprint/000",contact:.15,slow:1,moving:!0,hold:22},trip_hard_walk:{name:"trip/trip_t3/walk/000_000",contact:.15,slow:1,moving:!0,hold:22},trip_hard_idle:{name:"trip/trip_t2/idle/000_000",contact:.15,slow:1,moving:!0,hold:18},trip_soft_run:{name:"trip/trip_t1/sprint/000_sidebump",contact:.2,slow:1,moving:!0},trip_soft_walk:{name:"trip/trip_t1/walk/000_protectfront",contact:.2,slow:1,moving:!0},trip_soft_idle:{name:"trip/trip_t1/idle/000_protectfront",contact:.2,slow:1,moving:!0},getup:{name:"movement_special/idle/special/000_stand_up_from_front",contact:0,slow:1}},Jd=1.3,Lu=.9,Ts={pass:{reach:.42,y:null},shot:{reach:.45,y:null},highpass:{reach:.42,y:null},trap:{reach:.35,y:null},trap_l:{reach:.35,y:null},trap_r:{reach:.35,y:null},bturn_45:{reach:.35,y:null},bturn_90:{reach:.35,y:null},bturn_135:{reach:.35,y:null},bturn_180:{reach:.35,y:null},pass_turn180:{reach:.42,y:null},trap_r90:{reach:.35,y:null},gk_ground:{reach:.45,y:.25},gk_knee:{reach:.4,y:.55},header:{bone:"neck",lift:.16,bodyR:.16},header_jump:{bone:"neck",lift:.16,bodyR:.16},chest:{bone:"middle",lift:.1,bodyR:.17},gkthrow:{bone:"neck",lift:.1,bodyR:.15},gk_trunk:{bone:"middle",lift:0,bodyR:.17},gk_high:{bone:"neck",lift:.24,bodyR:.13}},rl=i=>i.replace(/_(walk|sprint)$/,"").replace(/_(turn180|loft)$/,"");for(const i in Lt)!Ts[i]&&Ts[rl(i)]&&(Ts[i]=Ts[rl(i)]);bi("instantiating wasm");const{db:Yy,conn:Zt}=await Rf();bi("registering data files");async function co(i){const e=await id(Xs,i);if(!e)throw new Error(`${i} not in cache for match ${Xs}`);await Yy.registerFileBuffer(i,e)}await co("matches.parquet");await co("players.parquet");await co("frames.parquet");await Zt.query("CREATE TABLE orientation (frame_id INTEGER, player_id INTEGER, yaw FLOAT)");const Hl=async i=>(await Zt.query(i)).toArray().map(e=>e.toJSON()),Ke=(await Hl("SELECT * FROM 'matches.parquet'"))[0],_i=await Hl("SELECT * FROM 'players.parquet' ORDER BY team_id, number"),ht=Ke.fps,lo=Ke.n_frames,jy=await Hl(`
  SELECT seq, period, time_s
  FROM 'frames.parquet'
  WHERE player_id = 0
  ORDER BY seq`),br=new Map;for(const i of jy){const e=Number(i.period);br.has(e)||br.set(e,[]),br.get(e).push({seq:Number(i.seq),ms:Number(i.time_s)*1e3})}function Qd(i,e,t=1/0){const n=br.get(Number(i))||br.get(1)||[];if(!n.length)return 0;e=Math.min(e,t);let s=0,r=n.length-1;for(;s<r;){const h=Math.floor((s+r+1)/2);n[h].ms<=e?s=h:r=h-1}const a=n[s],o=n[Math.min(s+1,n.length-1)];if(a.ms>t)return null;if(o.ms>t)return a.seq;const c=o.ms-a.ms;if(c<=0)return a.seq;const l=nt.clamp((e-a.ms)/c,0,1);return a.seq+(o.seq-a.seq)*l}const ut=105/Ke.pitch_length,xi=52.5,al=[],Ky=document.getElementById("teams");let Tr=null;function ef(i,e,t,n,s){const r=(o,c,l,h)=>{const u=document.createElement("span");if(u.className="tm",u.style.background=c,u.style.color=l,u.style.setProperty("--ring",_f(l)),u.textContent=o,s){const d=document.createElement("input");d.type="color",d.value=c,d.title=`recolour the ${h===1?"home":"away"} kit`,d.oninput=()=>s(h,d.value),u.append(d)}return u};Tr=document.createElement("span"),Tr.className="sc";const a=document.createElement("span");a.className="k",a.textContent=" · Match replay",Ky.replaceChildren(r(As(Ke.home_name),i,e,1),Tr,r(As(Ke.away_name),t,n,2),a)}const Nr={};Ke.home_acr&&(Nr[Ke.home_name]=Ke.home_acr);Ke.away_acr&&(Nr[Ke.away_name]=Ke.away_acr);try{const i=await id(Xs,"meta.json");if(i){const e=JSON.parse(new TextDecoder().decode(i));e.homeAcr&&(Nr[e.home]??=e.homeAcr),e.awayAcr&&(Nr[e.away]??=e.awayAcr)}}catch{}const As=i=>Nr[i]||i||"";(!(Ke.schema_version>=2)||!Ke.home_number)&&console.warn("[kits] this match was converted before the parser carried number_color — team colours are being guessed. Re-drop the match's three files (or re-open it from the opendata list) to fix.");ef(An(Ke.home_kit)||"#204080",An(Ke.home_number)||"#ffffff",An(Ke.away_kit)||"#ffffff",An(Ke.away_number)||"#000000");let ol=-1;function Vl(i,e){if(!Tr||i===ol&&!e)return;ol=i;let t=0,n=0;for(const s of al){if(s.seq>i)break;t=s.h,n=s.a}Tr.textContent=`${t}–${n}`}Vl(-1,!0);const En=new Map([[0,0]]);_i.forEach((i,e)=>En.set(i.player_id,e+1));const pi=_i.length+1,zi=new Map,Rt=new Map,Cn=[],Ua=new Map,vr=new Map,ws=new Map,Rs=[];try{await co("events.csv");const e=(await Zt.query(`
    SELECT e.player_id, f.seq
    FROM (
      SELECT frame_start, player_id
      FROM read_csv_auto('events.csv')
      WHERE event_type = 'player_possession'
        AND game_interruption_before LIKE 'throw_in%'
    ) e
    ASOF JOIN (SELECT DISTINCT frame_id, seq FROM 'frames.parquet') f
      ON f.frame_id >= e.frame_start
    ORDER BY f.seq`)).toArray().map(y=>y.toJSON()).map(y=>({seq:Number(y.seq),pid:Number(y.player_id)})).filter(y=>En.get(y.pid)!==void 0),t=new Map(_i.map(y=>[y.player_id,y.team_id])),n=40,s=[...new Set(e.map(y=>y.seq))].map(y=>`seq BETWEEN ${y-n} AND ${y+10}`).join(" OR "),r=await Zt.query(`
    SELECT seq, frame_id, player_id, x, y FROM 'frames.parquet'
    WHERE ${s}`),a=new Map,o=new Map;for(const y of r.toArray().map(N=>N.toJSON())){const N=Number(y.seq),B=Number(y.player_id);if(B===0){o.set(N,{x:y.x,y:y.y,frame:Number(y.frame_id)});continue}a.has(N)||a.set(N,[]),a.get(N).push({pid:B,x:y.x,y:y.y})}const c=Ke.pitch_width/2;for(const y of e){const N=o.get(y.seq);if(!N)continue;const B=Math.sign(N.y)||1,X=t.get(y.pid);let se=null,oe=1/0;for(const le of a.get(y.seq)||[]){if(t.get(le.pid)!==X||Math.sign(le.y)!==B)continue;const fe=Math.abs(B*c-le.y)*2+Math.abs(le.x-N.x)*.3;fe<oe&&(oe=fe,se=le)}if(!se||Math.abs(B*c-se.y)>6)continue;const I=En.get(se.pid);if(I===void 0)continue;let z=y.seq,$=se;for(let le=y.seq-n+1;le<=y.seq;le++){const fe=o.get(le),ye=o.get(le-1),Ie=(a.get(le)||[]).find(qe=>qe.pid===se.pid);if(!fe||!ye||!Ie||fe.frame!==ye.frame+1)continue;if(Math.hypot(fe.x-ye.x,fe.y-ye.y)*ht>4&&Math.hypot(fe.x-Ie.x,fe.y-Ie.y)<4){z=le,$=Ie;break}}zi.has(I)||zi.set(I,[]);const Q={x:$.x*ut,z:-B*(c*ut+.45)};let me=Math.atan2(0,B);for(let le=z+8;le>z;le--){const fe=o.get(le);if(!fe)continue;const ye=fe.x*ut-Q.x,Ie=-fe.y*ut-Q.z;Math.hypot(ye,Ie)>2&&(me=Math.atan2(ye,Ie));break}zi.get(I).push({seq:z,x:Q.x,z:Q.z,yaw:me})}Ht("[events]",[...zi.values()].flat().length,"throw-ins aligned & snapped to the touchline");const l=y=>y===!0||y==="True"||y==="true",h=new Set(_i.filter(y=>y.gk).map(y=>En.get(y.player_id))),u=new Set(["pass_reception","pass_interception","recovery","free_kick_reception","free_kick_interception","throw_in_reception","throw_in_interception","corner_reception","corner_interception","goal_kick_reception","goal_kick_interception"]),d=await Zt.query(`
    WITH fr AS (SELECT DISTINCT frame_id, seq FROM 'frames.parquet'),
         b  AS (SELECT seq, x, y, z FROM 'frames.parquet' WHERE player_id = 0),
         -- flight apex in the 1.5 s after each frame: the feed's high_pass
         -- flag is unreliable (true on 12 m taps, empty on 60 m punts), so
         -- a lofted ball is detected from the tracked height itself
         bapex AS (SELECT seq, max(z) OVER (ORDER BY seq
                     ROWS BETWEEN 1 FOLLOWING AND 15 FOLLOWING) AS apex FROM b),
         -- approach speed at each anchor, for the moving-clip tier. Backward
         -- 3-frame difference, not centred: what decides whether a kick is a
         -- RUNNING kick is the pace the player carried INTO it, and a centred
         -- window smears in the deceleration that follows the touch.
         sp AS (
           SELECT seq, player_id,
                  sqrt(pow((x - LAG(x, 3) OVER w) * ${ht} / 3, 2)
                     + pow((y - LAG(y, 3) OVER w) * ${ht} / 3, 2)) AS s
           FROM 'frames.parquet' WHERE player_id != 0
           WINDOW w AS (PARTITION BY player_id ORDER BY seq)),
         ev AS (
           SELECT player_id, frame_start, frame_end, end_type, start_type,
                  is_header, high_pass, one_touch, hand_pass, carry,
                  minute_start, second_start
           FROM read_csv_auto('events.csv')
           WHERE event_type = 'player_possession')
    SELECT e.player_id, e.end_type, e.start_type, e.is_header, e.high_pass,
           e.one_touch, e.hand_pass, e.carry, e.frame_start, e.frame_end,
           s.frame_id AS fid_start, t.frame_id AS fid_end,
           s.seq AS seq_start, t.seq AS seq_end,
           bs.z AS bz_start, br.z AS bz_end,
           br.x AS rx0, br.y AS ry0, br2.x AS rx1, br2.y AS ry1,
           bi.x AS ix0, bi.y AS iy0, bi2.x AS ix1, bi2.y AS iy1,
           ps.s AS sp_start, pe.s AS sp_end,
           mp.x AS mpx, mp.y AS mpy,
           ba.apex AS apex
    FROM ev e
    ASOF JOIN fr s ON s.frame_id >= e.frame_start
    ASOF JOIN fr t ON t.frame_id >= e.frame_end
    LEFT JOIN (SELECT seq, player_id, x, y FROM 'frames.parquet'
               WHERE player_id != 0) mp
      ON mp.seq = t.seq AND mp.player_id = e.player_id
    LEFT JOIN b bs  ON bs.seq  = s.seq
    LEFT JOIN b br  ON br.seq  = t.seq
    LEFT JOIN b br2 ON br2.seq = t.seq + 3
    LEFT JOIN b bi  ON bi.seq  = s.seq - 3
    LEFT JOIN b bi2 ON bi2.seq = s.seq
    LEFT JOIN bapex ba ON ba.seq = t.seq
    LEFT JOIN sp ps ON ps.seq = s.seq AND ps.player_id = e.player_id
    LEFT JOIN sp pe ON pe.seq = t.seq AND pe.player_id = e.player_id
    ORDER BY s.seq`),f=(y,N)=>{const B=Math.hypot(y,N);return B>.3?{x:y/B,z:-N/B}:null},g={walk:2.5,sprint:5.5},_=(y,N)=>{const B=Number(N);if(!(B>g.walk))return y;const X=B>g.sprint?"sprint":"walk";return Lt[`${y}_${X}`]?`${y}_${X}`:y};let m=0,p=0,A=0;const b=new Map,T=[];for(const y of d.toArray().map(N=>N.toJSON())){const N=En.get(Number(y.player_id));if(N===void 0)continue;const B=Number(y.seq_start),X=Number(y.seq_end);Cn.push({a:B,b:Math.max(B,X),slot:N});const se=b.get(N)??-1e9;if(b.set(N,Math.max(B,X)),y.mpx!=null&&y.rx0!=null){const z=Math.hypot(Number(y.rx0)-Number(y.mpx),Number(y.ry0)-Number(y.mpy));if(z>6){const $=Number(y.rx0)*ut,Q=-Number(y.ry0)*ut,me=Number(y.mpx)*ut,le=-Number(y.mpy)*ut,fe=Math.hypot(me-$,le-Q)||1,ye=Math.round(Math.min(60,Math.max(12,z/6*ht))),Ie=Math.round(Math.min(85,Math.max(15,z/3.5*ht)));ws.has(N)||ws.set(N,[]),ws.get(N).push({a:B,b:Math.max(B,X),pre:ye,post:Ie,mm:`${y.minute_start}:${String(Number(y.second_start)).padStart(2,"0")}`,x:$+(me-$)/fe*.35,z:Q+(le-Q)/fe*.35}),p++}}l(y.carry)&&X>B&&(vr.has(N)||vr.set(N,[]),vr.get(N).push({a:B,b:X}));const oe=z=>{Rt.has(N)||Rt.set(N,[]),Rt.get(N).push(z)};let I=null;if(Number(y.fid_end)-Number(y.frame_end)<=20){let z=null;if(l(y.hand_pass)?z="gkthrow":l(y.is_header)?z=(Number(y.bz_end)||0)>1.9?"header_jump":"header":y.end_type==="shot"?(z=Number(y.apex)>3?"shot_loft":"shot",z==="shot_loft"&&Ht(`[events] lofted shot ${y.minute_start}:${String(Number(y.second_start)).padStart(2,"0")} ${_i[N-1]?.name??""} (apex ${Number(y.apex).toFixed(1)} m)`)):y.end_type==="clearance"||l(y.high_pass)||y.end_type==="pass"&&Number(y.apex)>3?z="highpass":y.end_type==="pass"&&(z="pass"),z){const $=y.rx1!=null&&y.rx0!=null?f(y.rx1-y.rx0,y.ry1-y.ry0):null,Q=_(z,y.sp_end);Q!==z&&m++,I={seq:X,key:Q,release:!0,sp:Number(y.sp_end)||0,fx:$?$.x:0,fz:$?$.z:0},oe(I)}}if(!h.has(N)&&X-B>12&&!(Number(y.sp_start)>2)&&!(Number(y.sp_end)>2)){const z=y.ix0!=null&&y.ix1!=null?f(y.ix0-y.ix1,y.iy0-y.iy1):null,$=y.rx0!=null&&y.rx1!=null?f(y.rx1-y.rx0,y.ry1-y.ry0):null;if(z&&$){const Q=z.x*$.x+z.z*$.z,me=z.x*$.z-z.z*$.x,le=Math.acos(Math.max(-1,Math.min(1,Q)))*180/Math.PI;if(le>40){const fe=le<67.5?45:le<112.5?90:le<157.5?135:180;if(fe===180&&I&&X-B<=18&&Lt[`${I.key}_turn180`])I.key=`${I.key}_turn180`,I.turn=me<0?180:-180,I.fx=z.x,I.fz=z.z;else{const ye=Math.max(B+4,Math.min(B+8,X-6));oe({seq:ye,key:`bturn_${fe}`,release:!1,sp:0,turn:me<0?fe:-fe,fx:z.x,fz:z.z}),I&&X-ye<=12&&Lt[`${I.key}_walk`]&&(I.key=`${I.key}_walk`)}A++}}}if(!l(y.one_touch)&&u.has(y.start_type)&&Number(y.fid_start)-Number(y.frame_start)<=20){if(!h.has(N)&&B-se<8)continue;const z=Number(y.bz_start)||0,$=y.ix0!=null&&y.ix1!=null?f(y.ix0-y.ix1,y.iy0-y.iy1):null;let Q;if(h.has(N))Q=z>1.6?"gk_high":z>.9?"gk_trunk":z>.45?"gk_knee":y.start_type.includes("interception")||y.start_type==="recovery"?"gk_ground":"trap";else if(Q=z>1.2?"chest":"trap",Q==="trap"&&$&&y.rx0!=null&&y.rx1!=null&&X-B<=12){const ye=f(y.rx1-y.rx0,y.ry1-y.ry0);if(ye){const Ie=$.x*ye.x+$.z*ye.z,C=$.x*ye.z-$.z*ye.x,qe=Math.acos(Math.max(-1,Math.min(1,Ie)))*180/Math.PI;qe>115?Q=C<0?"trap_l":"trap_r":qe>60&&C>=0?Q="trap_r90":qe>60&&(Q="trap_l")}}const me=_(Q,y.sp_start);me!==Q&&m++;const le=Lt[me];if(me===Q&&!h.has(N)&&!le.moving&&!le.travel&&Number(y.sp_start)>2||le.moving&&l(y.carry))continue;const fe={seq:B,key:me,release:!1,sp:Number(y.sp_start)||0,fx:$?$.x:0,fz:$?$.z:0};oe(fe),h.has(N)&&Q.startsWith("gk_")&&T.push({slot:N,pid:Number(y.player_id),seqS:B,seqE:X,act:fe})}}if(T.length){const y=[...new Set(T.map(B=>B.pid))],N=T.filter(B=>B.seqE-B.seqS>=18).map(B=>`(seq BETWEEN ${B.seqS} AND ${B.seqE})`).join(" OR ");if(N){const B=(await Zt.query(`
        SELECT t.seq AS seq
        FROM (SELECT frame_end FROM read_csv_auto('events.csv')
              WHERE event_type = 'player_possession' AND end_type = 'shot') e
        ASOF JOIN (SELECT DISTINCT frame_id, seq FROM 'frames.parquet') t
          ON t.frame_id >= e.frame_end`)).toArray().map(I=>Number(I.toJSON().seq)),X=await Zt.query(`
        SELECT seq, player_id, x, y, z FROM 'frames.parquet'
        WHERE player_id IN (0, ${y.join(",")}) AND (${N})
        ORDER BY seq`),se=new Map;for(const I of X.toArray().map(z=>z.toJSON())){const z=Number(I.seq);se.has(z)||se.set(z,{}),se.get(z)[Number(I.player_id)]={x:Number(I.x),y:Number(I.y),z:Number(I.z)}}let oe=0;for(const I of T){if(I.seqE-I.seqS<18)continue;let z=0,$=-1;for(let Re=I.seqS+2;Re<=I.seqE;Re++){const Se=se.get(Re);if(!Se||!Se[0]||!Se[I.pid])continue;const Ae=Math.hypot(Se[0].x-Se[I.pid].x,Se[0].y-Se[I.pid].y);Ae>z&&(z=Ae,$=Re)}if(z<3)continue;let Q=-1;for(let Re=$+1;Re<=I.seqE;Re++){const Se=se.get(Re);if(!Se||!Se[0]||!Se[I.pid])continue;if(Math.hypot(Se[0].x-Se[I.pid].x,Se[0].y-Se[I.pid].y)<.8&&Se[0].z<.7){Q=Re;break}}if(Q<0||(Q=Math.min(Q,I.seqE-10),Q<I.seqS+8))continue;let me=!1;const le=B.some(Re=>I.seqS-Re>=0&&I.seqS-Re<=15),fe=se.get(I.seqS)?se.get(I.seqS)[I.pid]:null,ye=se.get($)?se.get($)[0]:null,Ie=se.get(I.seqS)&&se.get(I.seqS)[0]?se.get(I.seqS)[0].z:9;if(le&&fe&&ye&&(I.act.fx||I.act.fz)){const Re={x:ye.x-fe.x,z:-(ye.y-fe.y)},Se=I.act.fx*Re.z-I.act.fz*Re.x;Math.abs(Se)>1&&(Se<0&&Ie<1?(I.act.key="gk_dive_l",me=!0):Se>0&&Ie<1.6&&(I.act.key="gk_dive_r",me=!0))}me?I.act.postHold=Q-I.seqS-6:I.act.fumble=!0;const C=se.get(Math.max(I.seqS,Q-3)),qe=C&&C[0]&&C[I.pid]?f(C[0].x-C[I.pid].x,C[0].y-C[I.pid].y):null;Rt.get(I.slot).push({seq:Q,key:"gk_ground",release:!1,fx:qe?qe.x:0,fz:qe?qe.z:0}),oe++}oe&&Ht("[events]",oe,"keeper fumble(s): catch cut at contact + scoop at recovery")}}const V=await Zt.query(`
    WITH fr AS (SELECT DISTINCT frame_id, seq FROM 'frames.parquet'),
         sp AS (
           SELECT seq, player_id,
                  sqrt(pow((x - LAG(x, 3) OVER w) * ${ht} / 3, 2)
                     + pow((y - LAG(y, 3) OVER w) * ${ht} / 3, 2)) AS s
           FROM 'frames.parquet' WHERE player_id != 0
           WINDOW w AS (PARTITION BY player_id ORDER BY seq)),
         ev AS (
           SELECT player_id, player_in_possession_id, frame_end, end_type,
                  angle_of_engagement
           FROM read_csv_auto('events.csv')
           WHERE event_type = 'on_ball_engagement'
             AND end_type IN ('direct_regain', 'direct_disruption', 'foul_committed'))
    SELECT e.player_id, e.player_in_possession_id, e.end_type,
           e.angle_of_engagement AS ang, e.frame_end,
           f.frame_id AS fid, f.seq AS seq,
           td.s AS sp_tackler, vi.s AS sp_victim
    FROM ev e
    ASOF JOIN fr f ON f.frame_id >= e.frame_end
    LEFT JOIN sp td ON td.seq = f.seq AND td.player_id = e.player_id
    LEFT JOIN sp vi ON vi.seq = f.seq AND vi.player_id = e.player_in_possession_id
    ORDER BY f.seq`);let L=0,R=0;const W=[];for(const y of V.toArray().map(N=>N.toJSON())){if(Number(y.fid)-Number(y.frame_end)>20)continue;const N=Number(y.seq),B=y.end_type==="foul_committed",X=En.get(Number(y.player_id));if(X!==void 0){const oe=Math.abs(Number(y.ang)||0),I=Number(y.sp_tackler)||0,z=oe>135?"tackle_behind":I>g.sprint?"tackle_reach":I>g.walk?"tackle_stretch":oe>45?"tackle_side":"tackle_front";Rt.has(X)||Rt.set(X,[]),Rt.get(X).push({seq:N,key:z,release:!1,prio:1,sp:I,fx:0,fz:0,vSlot:En.get(Number(y.player_in_possession_id))}),L++}const se=En.get(Number(y.player_in_possession_id));if(se!==void 0){const oe=Number(y.sp_victim)||0,I=oe>g.sprint?"run":oe>g.walk?"walk":"idle",z=`trip_${B?"hard":"soft"}_${I}`;Rt.has(se)||Rt.set(se,[]);const $={seq:N,key:z,release:!1,prio:1,sp:oe,fx:0,fz:0};Rt.get(se).push($),B&&W.push({pid:Number(y.player_in_possession_id),seq:N,act:$}),R++}}if(W.length){const y=W.map((X,se)=>`SELECT ${se} AS k, ${X.pid} AS pid, ${X.seq} AS s0`).join(" UNION ALL "),N=await Zt.query(`
      WITH d AS (${y})
      SELECT d.k AS k, f.seq AS seq, f.x AS x, f.y AS y
      FROM 'frames.parquet' f
      JOIN d ON f.player_id = d.pid AND f.seq BETWEEN d.s0 + 8 AND d.s0 + 158
      ORDER BY k, seq`),B=new Map;for(const X of N.toArray().map(se=>se.toJSON())){const se=Number(X.k);B.has(se)||B.set(se,[]),B.get(se).push({seq:Number(X.seq),x:Number(X.x),y:Number(X.y)})}for(const[X,se]of B){if(!se.length)continue;const oe=se[0],I=se.find(z=>Math.hypot(z.x-oe.x,z.y-oe.y)>1.2);W[X].act.standSeq=I?I.seq:W[X].seq+150}Ht("[events] foul victims stay down (track-measured):",W.map(X=>X.act.standSeq?`${((X.act.standSeq-X.seq)/ht).toFixed(1)}s`:"?").join(" "))}Ht(`[events] ${L} challenges + ${R} victim reactions (sliding/* stays unwired — the feed carries no tackle technique)`);const ce=await Zt.query(`
    WITH fr AS (SELECT DISTINCT frame_id, seq FROM 'frames.parquet'),
         ev AS (
           SELECT frame_start, minute_start, second_start, player_name,
                  team_shortname AS team, end_type,
                  lower(CAST(lead_to_goal AS VARCHAR)) AS ltg,
                  coalesce(game_interruption_before, '') AS gib,
                  x_start,
                  LEAD(x_start)        OVER w AS next_x,
                  LEAD(team_shortname) OVER w AS next_team,
                  LEAD(frame_start)    OVER w AS next_fs
           FROM read_csv_auto('events.csv')
           WHERE event_type = 'player_possession'
           WINDOW w AS (ORDER BY frame_start))
    SELECT e.*, f.seq AS seq FROM ev e
    ASOF JOIN fr f ON f.frame_id >= e.frame_start
    WHERE e.end_type = 'shot' OR e.gib LIKE 'corner%' OR e.gib LIKE 'free_kick%'
    ORDER BY f.seq`),x=document.getElementById("jump"),E={goal:[],shot:[],corner:[],fk:[]};for(const y of ce.toArray().map(N=>N.toJSON())){const N=Number(y.seq),B=`${y.minute_start}:${String(y.second_start).padStart(2,"0")}`,X=y.team??"";y.end_type==="shot"&&E[y.ltg==="true"?"goal":"shot"].push({seq:N,label:`${y.ltg==="true"?"⚽ ":""}${B}  ${As(X)} — ${y.player_name}`});const se=y.gib.endsWith("_against")?X===Ke.home_name?Ke.away_name:Ke.home_name:X;if(y.gib.startsWith("corner"))E.corner.push({seq:N,label:`${B}  ${As(se)}`,pre:50});else if(y.gib.startsWith("free_kick")){const oe=Ke.pitch_length/2-30,I=Q=>Q!=null&&Number(Q)>oe,z=Q=>Q!=null&&Number(Q)<-oe,$=y.gib.endsWith("_against")?z(y.x_start):I(y.x_start)||y.end_type==="shot"||y.next_fs!=null&&Number(y.next_fs)-Number(y.frame_start)<150&&(y.next_team===y.team?I(y.next_x):z(y.next_x));E.fk.push({seq:N,label:`${$?"★ ":""}${B}  ${As(se)}`,pre:50})}}const Z=await Zt.query(`
    WITH fr AS (SELECT DISTINCT frame_id, seq FROM 'frames.parquet'),
         ev AS (
           SELECT frame_start, minute_start, second_start,
                  team_shortname AS team,
                  CAST(team_score AS INT) AS ts, CAST(opponent_team_score AS INT) AS os,
                  coalesce(game_interruption_after, '') AS gia
           FROM read_csv_auto('events.csv')
           WHERE event_type = 'player_possession' AND team_score IS NOT NULL)
    SELECT e.*, f.seq AS seq FROM ev e
    ASOF JOIN fr f ON f.frame_id >= e.frame_start
    ORDER BY f.seq`);{let y=null,N=null;const B=[];for(const X of Z.toArray().map(se=>se.toJSON())){const se=X.team===Ke.home_name,oe=Number(se?X.ts:X.os),I=Number(se?X.os:X.ts),z=Number(X.seq);if((y===null||oe!==y||I!==N)&&al.push({seq:z,h:oe,a:I}),y!==null&&(oe>y||I>N)){const $=oe>y?Ke.home_name:Ke.away_name;E.goal.some(me=>z-me.seq>=-50&&z-me.seq<600)||B.push({seq:z,scorer:$,mm:`${X.minute_start}:${String(X.second_start).padStart(2,"0")}`})}y=oe,N=I}for(const X of al){let se=null;for(const oe of E.goal)oe.seq<=X.seq&&X.seq-oe.seq<900&&(!se||oe.seq>se.seq)&&(se=oe);se&&(X.seq=se.seq)}for(const X of B){const se=(await Zt.query(`
        SELECT seq, time_s FROM 'frames.parquet'
        WHERE player_id = 0 AND seq BETWEEN ${X.seq-3e3} AND ${X.seq}
          AND abs(x) >= ${Ke.pitch_length/2-1}
        ORDER BY seq DESC LIMIT 1`)).toArray().map(z=>z.toJSON())[0];let oe=X.seq,I=X.mm;if(se){oe=Number(se.seq);const z=Number(se.time_s);I=`${Math.floor(z/60)}:${String(Math.floor(z%60)).padStart(2,"0")}`}E.goal.push({seq:oe,label:`⚽ ~${I}  ${As(X.scorer)}`,pre:80})}B.length&&(E.goal.sort((X,se)=>X.seq-se.seq),Ht(`[events] ${B.length} goal(s) recovered from the scoreline — no lead_to_goal chain (penalty, own goal, or unattributed); anchored on the ball's last visit to the goal line`))}for(const[y,N]of[["goal","Goals"],["shot","Shots"],["corner","Corners"],["fk","Free kicks · ★ delivered deep"]]){if(!E[y].length)continue;const B=document.createElement("optgroup");B.label=N;for(const X of E[y]){const se=document.createElement("option");se.value=X.seq,se.textContent=X.label,X.pre&&(se.dataset.pre=X.pre),B.appendChild(se)}x.appendChild(B)}x.hidden=x.children.length<=1,Ht(`[events] moments: ${E.goal.length} goals, ${E.shot.length} shots, ${E.corner.length} corners, ${E.fk.length} free kicks (${E.fk.filter(y=>y.label.startsWith("★")).length} delivered deep)`);const v=await Zt.query(`
    WITH fr AS (SELECT DISTINCT frame_id, seq FROM 'frames.parquet'),
         g AS (SELECT frame_end, x_end, y_end, attacking_side, player_id
               FROM read_csv_auto('events.csv')
               WHERE event_type = 'player_possession' AND end_type = 'shot'
                 AND lower(CAST(lead_to_goal AS VARCHAR)) = 'true'),
         gs AS (SELECT g.x_end AS xe, g.y_end AS ye, g.attacking_side AS aside,
                       g.player_id AS pid, f.seq AS gseq
                FROM g ASOF JOIN fr f ON f.frame_id >= g.frame_end)
    SELECT gs.gseq AS gseq, gs.xe AS xe, gs.ye AS ye, gs.aside AS aside, gs.pid AS pid,
           b.seq AS seq, b.frame_id AS fid, b.x AS x, b.y AS y, b.z AS z,
           CAST(b.detected AS INT) AS det
    FROM gs JOIN (SELECT seq, frame_id, x, y, z, detected FROM 'frames.parquet'
                  WHERE player_id = 0) b
      ON b.seq BETWEEN gs.gseq - 10 AND gs.gseq + 60
    ORDER BY gs.gseq, b.seq`),k=new Map;for(const y of v.toArray().map(N=>N.toJSON())){const N=Number(y.gseq);k.has(N)||k.set(N,{xe:y.xe==null?null:Number(y.xe),ye:y.ye==null?null:Number(y.ye),aside:y.aside,pid:Number(y.pid),rows:[]}),k.get(N).rows.push({seq:Number(y.seq),fid:Number(y.fid),x:Number(y.x),y:Number(y.y),z:Number(y.z),det:Number(y.det)===1})}const G=Ke.pitch_length/2;let U=0;for(const[y,{xe:N,ye:B,aside:X,pid:se,rows:oe}]of k){let I=oe.length;for(let ne=1;ne<oe.length;ne++)if(oe[ne].fid-oe[ne-1].fid>15){I=ne;break}const z=oe.slice(0,I);let $=0,Q=null;const me=[];for(const ne of z){if(Math.abs(ne.y)>12)continue;const ee=Math.abs(ne.x);if(ee>$)$=ee,Q=ne;else if($-ee>2)break;me.push(ne)}if(me.some(ne=>Math.abs(ne.x)>=G+.8&&Math.abs(ne.y)<=3.66))continue;const le=z.some(ne=>ne.det);let fe,ye,Ie,C,qe;if(le&&Q&&Math.abs(Q.x)>=G-6)fe=z.find(ne=>ne.seq>=y+1)??z[0],ye=Math.sign(Q.x)||1,Ie=Math.max(-3.2,Math.min(3.2,Q.y)),C=fe.seq,qe=Math.max(0,C-40);else if(N!=null&&B!=null&&Math.abs(N)<=G&&Math.abs(B)<=Ke.pitch_width/2+2)ye=X==="right_to_left"?-1:1,fe={seq:y,x:ye*N,y:ye*B,z:.2,evAnchored:!0},Ie=Math.max(-3.2,Math.min(3.2,ye*B)),C=y,qe=Math.max(0,y-8),U++;else continue;const Re=fe.x*ut,Se=-fe.y*ut,Ae=ye*xi,Qe=-Ie*ut,Oe=Math.hypot(Ae-Re,Qe-Se)||1,w=(Ae-Re)/Oe,M=(Qe-Se)/Oe,q=Math.min(2.5,.9/Math.max(Math.abs(w),.35)),te=Math.round(nt.clamp((Oe+q)/(8*ut)*ht,3,12));Rs.push({from:qe,kick:C,mid:C+te,to:Math.max(z[z.length-1]?.seq??C+30,C+te+3),evAnchored:!!fe.evAnchored,slot:En.get(se),x0:Re,z0:Se,y0:Math.min(Math.max(fe.z,.11),2),rx:Ae+w*q,rz:Math.max(-3.5,Math.min(3.5,Qe+M*q))})}Rs.sort((y,N)=>y.from-N.from),Rs.length&&Ht(`[events] ${Rs.length} goal(s) flown into the net (track never finished inside the frame`+(U?`; ${U} anchored on the event — no usable ball track at all`:"")+")"),Cn.sort((y,N)=>y.a-N.a);for(let y=Cn.length-1;y>0;y--){const N=Cn[y-1],B=Cn[y];N.slot===B.slot&&B.a-N.b<=5&&(N.b=Math.max(N.b,B.b),Cn.splice(y,1))}for(const y of Cn)Ua.has(y.slot)||Ua.set(y.slot,[]),Ua.get(y.slot).push(y);for(const y of Rt.values())y.sort((N,B)=>N.seq-B.seq);for(const y of vr.values())y.sort((N,B)=>N.a-B.a);const J=[...Rt.values()].reduce((y,N)=>y+N.length,0);if(Ht("[events]",J,"possession actions mapped over",Cn.length,"possessions"),A&&Ht("[events]",A,"standing-carrier turns (ballcontrol/idle, angle from ball-in vs ball-out)"),p){Ht("[events]",p,"ghost touches: the events feed names a player the tracked ball never visited — he runs over, plays it there, runs back (raw shows both feeds verbatim)");for(const[y,N]of ws)for(const B of N)Ht(`[events]   ghost ${B.mm} ${_i[y-1]?.name??"?"} (seq ${B.a}-${B.b}, legs ${B.pre}f/${B.post}f)`)}Ht(`[events] ${m} of them at pace (>${g.walk} m/s) on a walk/sprint clip — these used to play nothing`)}catch(i){console.warn("dynamic events unavailable:",i)}const $y=(i,e)=>`
  WITH v AS (
    SELECT seq, frame_id, time_s, period, player_id, x, y, z,
           CAST(detected AS TINYINT) AS det,
           CAST(has_ball AS TINYINT) AS hb,
           -- broadcast frame corners: on the ball row only, null elsewhere
           cam_tlx, cam_tly, cam_trx, cam_try, cam_brx, cam_bry, cam_blx, cam_bly,
           (x - LAG(x, 2) OVER w) * ${ht} / 2 AS vx,
           (y - LAG(y, 2) OVER w) * ${ht} / 2 AS vy
    FROM 'frames.parquet'
    WHERE seq BETWEEN ${i-4} AND ${e}
    WINDOW w AS (PARTITION BY player_id ORDER BY seq)
  ),
  s AS (
    SELECT seq, frame_id, time_s, period, player_id, x, y, z, det, hb,
           cam_tlx, cam_tly, cam_trx, cam_try, cam_brx, cam_bry, cam_blx, cam_bly,
           AVG(vx) OVER s AS vx, AVG(vy) OVER s AS vy
    FROM v
    WINDOW s AS (PARTITION BY player_id ORDER BY seq ROWS BETWEEN 2 PRECEDING AND 2 FOLLOWING)
  ),
  -- ball position per frame, to face players at it while they are near-still
  ball AS (SELECT seq, x AS bx, y AS by FROM s WHERE player_id = 0),
  -- facing estimate. Blend ball-facing -> velocity-facing over a speed band;
  -- a hard switch snaps stationary players around. Unit vectors first, or a
  -- distant ball outvotes the velocity term.
  f AS (
    SELECT s.*, b.bx, b.by,
           sqrt(s.vx * s.vx + s.vy * s.vy) AS sp,
           sqrt(pow(b.bx - s.x, 2) + pow(b.by - s.y, 2)) AS bl
    FROM s LEFT JOIN ball b USING (seq)
  ),
  d AS (
    SELECT *, least(greatest((sp - 0.4) / 0.8, 0), 1) AS mix FROM f
  )
  SELECT d.seq, d.frame_id, d.time_s, d.period, d.player_id,
         d.x, d.y, d.z, d.det, d.hb, d.vx, d.vy,
         d.cam_tlx, d.cam_tly, d.cam_trx, d.cam_try,
         d.cam_brx, d.cam_bry, d.cam_blx, d.cam_bly,
         -- provider orientation wins when it exists; downstream cannot tell
         -- which it got, which is the point
         COALESCE(o.yaw, CASE
           WHEN d.player_id = 0 OR d.bl IS NULL OR d.bl < 1e-6 THEN NULL
           -- world dir = (px, -py): provider +y maps to world -z
           ELSE atan2(
             (d.bx - d.x) / d.bl * (1 - d.mix)
               + CASE WHEN d.sp < 1e-6 THEN 0 ELSE d.vx / d.sp * d.mix END,
            -((d.by - d.y) / d.bl * (1 - d.mix)
               + CASE WHEN d.sp < 1e-6 THEN 0 ELSE d.vy / d.sp * d.mix END))
         END) AS yaw
  FROM d LEFT JOIN orientation o
    ON o.frame_id = d.frame_id AND o.player_id = d.player_id
  WHERE d.seq >= ${i}
  ORDER BY d.seq`;async function cl(i){const e=Math.min(i+Vy-1,lo-1),t=e-i+1,n=await Zt.query($y(i,e)),s=new Float32Array(t*pi*2).fill(NaN),r=new Float32Array(t*pi*2),a=new Uint8Array(t*pi),o=new Float32Array(t),c=new Float64Array(t),l=new Uint8Array(t),h=new Int32Array(t),u=new Int16Array(t).fill(-1),d=new Float32Array(t*8).fill(NaN),f=n.getChild("frame_id").toArray(),g=n.getChild("seq").toArray(),_=n.getChild("player_id").toArray(),m=n.getChild("x").toArray(),p=n.getChild("y").toArray(),A=n.getChild("z").toArray(),b=n.getChild("det").toArray(),T=n.getChild("vx").toArray(),V=n.getChild("vy").toArray(),L=n.getChild("time_s").toArray(),R=n.getChild("period").toArray(),W=n.getChild("hb")?.toArray(),ce=["cam_tlx","cam_tly","cam_trx","cam_try","cam_brx","cam_bry","cam_blx","cam_bly"].map(x=>n.getChild(x)?.toArray());for(let x=0;x<g.length;x++){const E=g[x]-i;c[E]=L[x],l[E]=R[x],h[E]=f[x];const Z=En.get(_[x]);if(Z===void 0)continue;const v=(E*pi+Z)*2;if(s[v]=m[x],s[v+1]=p[x],r[v]=T[x]||0,r[v+1]=V[x]||0,a[E*pi+Z]=b[x],W&&W[x]&&(u[E]=Z),Z===0){o[E]=A[x];for(let k=0;k<8;k++)ce[k]&&(d[E*8+k]=ce[k][x])}}return{start:i,end:e,pos:s,vel:r,det:a,carrier:u,cam:d,ballZ:o,clockS:c,period:l,frameIds:h}}let Le=null,li=null,_s=!1;const Nu=document.getElementById("status");function Zy(i){const e=Math.floor(i);return Le&&e>=Le.start&&e<=Le.end?(!_s&&!li&&Le.end<lo-1&&e>Le.end-Gy&&(_s=!0,cl(Le.end+1).then(t=>{li=t,_s=!1})),!0):li&&e>=li.start&&e<=li.end?(Le=li,li=null,!0):(_s||(_s=!0,Nu.textContent="⏳",cl(e).then(t=>{Le=t,li=null,_s=!1,Nu.textContent=""})),!1)}const Ct=new $x,Ge=new Vt(45,2,.1,2e3);Ge.position.set(0,32,48);const Wt=new Kx({antialias:!0,powerPreference:"high-performance"});Wt.setPixelRatio(Math.min(globalThis.devicePixelRatio||1,1.5));Wt.outputColorSpace=gt;const ho=Math.min(Wt.capabilities.getMaxAnisotropy(),8);function uo(i,e,{repeat:t=null,color:n=!1}={}){const s=document.createElement("canvas");s.width=s.height=i;const r=s.getContext("2d");e(r,i);const a=new $s(s);return n&&(a.colorSpace=gt),t&&(a.wrapS=a.wrapT=qi,a.repeat.set(t[0],t[1])),a.anisotropy=ho,a}const Jy=uo(256,(i,e)=>{const t=i.createLinearGradient(0,0,0,e);t.addColorStop(0,"#cce0eb"),t.addColorStop(.62,"#e9f1e8"),t.addColorStop(1,"#f4f7ed"),i.fillStyle=t,i.fillRect(0,0,e,e)},{color:!0});Ct.background=Jy;const Qy=uo(64,(i,e)=>{i.fillStyle="#dedede",i.fillRect(0,0,e,e);for(let t=0;t<e;t+=4)i.fillStyle=t%8?"#c9c9c9":"#eeeeee",i.fillRect(t,0,1,e),i.fillRect(0,t,e,1)},{repeat:[10,10]}),eM=uo(64,(i,e)=>{i.fillStyle="#8080ff",i.fillRect(0,0,e,e),i.strokeStyle="#7589f8",i.lineWidth=1;for(let t=-e;t<e*2;t+=5)i.beginPath(),i.moveTo(t,0),i.lineTo(t+e,e),i.stroke();i.strokeStyle="#8978f8";for(let t=0;t<e*2;t+=7)i.beginPath(),i.moveTo(t,0),i.lineTo(t-e,e),i.stroke()},{repeat:[12,12]}),tM=uo(128,(i,e)=>{i.fillStyle="#8080ff",i.fillRect(0,0,e,e);for(let t=0;t<850;t++){const n=t*47%e,s=t*83%e,r=t*13%7-3;i.strokeStyle=t%3?"#7488f4":"#8b79f5",i.globalAlpha=.3+t%5*.08,i.beginPath(),i.moveTo(n,s),i.lineTo(n+r*.35,s-2-t%4),i.stroke()}i.globalAlpha=1},{repeat:[56,36]});document.body.appendChild(Wt.domElement);const Ze=new yy(Ge,Wt.domElement);Ze.maxPolarAngle=Math.PI/2-.04;Ze.minDistance=2;Ze.maxDistance=260;mn&&(Ze.enabled=!1,Ze.enableRotate=!1,Ze.enablePan=!1,Ze.enableZoom=!1,Wt.domElement.style.touchAction="pan-y",Wt.domElement.style.cursor="default");function tf(){const i=Math.max(innerWidth,2),e=Math.max(innerHeight,2);Wt.setSize(i,e),Ge.aspect=i/e,mn?Ge.setViewOffset(i,Math.round(e*1.32),0,Math.round(e*.25),i,e):Ge.clearViewOffset(),Ge.updateProjectionMatrix()}tf();addEventListener("resize",tf);window.__viewer={scene:Ct,camera:Ge,controls:Ze,throwsBySlot:zi,slotByPid:En,actionsBySlot:Rt,possessionSpans:Cn,ghostBySlot:ws};window.__viewer.probe=i=>{const e=window.__viewer,t=e.slotByPid.get(i),n=e.players?.[t-1];if(!n)return{slot:t,error:"players not wired yet"};const s=e.frame?.()??null,r=e.actionsBySlot.get(t)||[],a=s==null?null:r.find(o=>s>=o.seq-o.pre&&s<=o.seq+o.post)||null;return{slot:t,frame:s,clip:n.clipKey,rate:n.action?.timeScale??null,actionTime:n.action?.time??null,ema:+n.ema.toFixed(2),vx:+n.vx.toFixed(2),vz:+n.vz.toFixed(2),oneShot:a?{key:a.key,seq:a.seq,pre:a.pre,post:a.post,release:a.release}:null,ghost:(e.ghostBySlot.get(t)||[]).some(o=>s!=null&&s>=o.a-o.pre&&s<=o.b+o.post)}};const Sn=new Set;addEventListener("keydown",i=>{if(mn)return;const e=i.key.toLowerCase();["arrowup","arrowdown","arrowleft","arrowright","w","a","s","d"].includes(e)&&(Sn.add(e),i.preventDefault(),$a(),ji=!1,Mt.t=1)});addEventListener("keyup",i=>Sn.delete(i.key.toLowerCase()));const Ni=new P,ac=new P;function nM(i){if(!Sn.size)return;Ge.getWorldDirection(Ni),Ni.y=0,Ni.normalize(),ac.set(-Ni.z,0,Ni.x);const e=Math.max(Ge.position.y,5)*.9*i,t=new P;(Sn.has("arrowup")||Sn.has("w"))&&t.add(Ni),(Sn.has("arrowdown")||Sn.has("s"))&&t.sub(Ni),(Sn.has("arrowright")||Sn.has("d"))&&t.add(ac),(Sn.has("arrowleft")||Sn.has("a"))&&t.sub(ac),t.multiplyScalar(e),Ge.position.add(t),Ze.target.add(t)}function Du(){Ze.target.y<.2&&(Ze.target.y=.2),Ge.position.y<.4&&(Ge.position.y=.4)}const Mt={t:1,fromP:new P,toP:new P,fromT:new P,toT:new P};function nf(i,e,t,n,s,r){Mt.fromP.copy(Ge.position),Mt.toP.set(i,e,t),Mt.fromT.copy(Ze.target),Mt.toT.set(n,s,r),Mt.t=0}function iM(i){if(Mt.t>=1)return;Mt.t=Math.min(1,Mt.t+i/.45);const e=Mt.t*Mt.t*(3-2*Mt.t);Ge.position.lerpVectors(Mt.fromP,Mt.toP,e),Ze.target.lerpVectors(Mt.fromT,Mt.toT,e),Za.copy(Ze.target)}Ze.addEventListener("start",()=>{Mt.t=1,$a()});const sM={x:0},Ka=15,Gl=35,ll=Ge.fov;let Ds=!0;const oc=new P(0,.2,0);let Xn=0,Hi=null,cc=!1,hl=0,yr=0;Ge.position.set(sM.x*ut,Ka*ut,63*ut);Ge.fov=Gl;Ge.updateProjectionMatrix();document.querySelector('#views button[data-view="tv"]')?.classList.add("active");function $a(){if(Ds){if(Ds=!1,Hi!==null){const i=n=>Math.tan(n*Math.PI/360),e=Ge.position.clone().sub(Ze.target),t=i(Hi)/i(ll);Ge.position.copy(Ze.target).addScaledVector(e,t),Ge.fov=ll,Ge.updateProjectionMatrix()}Hi=null}}let lc=1;document.querySelectorAll("#views button[data-view]").forEach(i=>i.onclick=()=>{if(document.querySelectorAll("#views button[data-view]").forEach(r=>r.classList.remove("active")),i.classList.add("active"),i.dataset.view==="tv"){$a(),ji=!1,Ds=!0,Xn=ve?.position?.x||0,hl=Xn,yr=0,Mt.t=1,Ge.position.set(Xn,Ka*ut,63*ut),Ge.fov=Gl,Ge.updateProjectionMatrix();return}$a();const e=Ze.target;let t=Math.max(Ge.position.distanceTo(e),25),n=e.x,s=e.z;if(Ge.position.y>.97*t)lc=-lc;else{t=22.5/Math.tan(ll*Math.PI/360);const r=sf(ve.position.x+ys*rf*22.5,ve.position.z,t);n=r.x,s=r.z}nf(n-lc*t*.05,t,s,n,.2,s),ji=!0,Za.copy(Mt.toT)});let ji=!1;const Za=new P,Uu=4;function sf(i,e,t){const n=t*Math.tan(Ge.fov*Math.PI/360),s=n*Ge.aspect,r=Math.max(0,xi+Uu-n),a=Math.max(0,Ke.pitch_width*ut/2+Uu-s);return{x:nt.clamp(i,-r,r),z:nt.clamp(e,-a,a)}}const Ou=.4,Fu=.75,rf=.4;let ys=0;const xs=new P,yn=new P,Mn=new P;function rM(i,e,t,n){if(!ji)return;if(n){const L=n.x-ve.position.x,R=nt.clamp(L/8,-1,1);ys+=(R-ys)*(e?1:Math.min(i*4,1))}else if(t){const L=Jt.find(R=>R.teamId===t.teamId&&R.gk&&R.rig.visible);if(L){const R=-Math.sign(L.rig.position.x)||0;ys+=(R-ys)*(e?1:Math.min(i*1.5,1))}}if(Mt.t<1)return;if(Ze.target.distanceToSquared(Za)>.01){ji=!1;return}Ge.getWorldDirection(yn),xs.set(-yn.z,0,yn.x).normalize(),yn.y=0,yn.lengthSq()<1e-8&&yn.crossVectors(Ge.up,xs),yn.normalize();const s=Ge.position.distanceTo(Ze.target),r=s*Math.tan(Ge.fov*Math.PI/360),a=r*Ge.aspect;Mn.set(ve.position.x+ys*rf*r,0,ve.position.z).sub(Ze.target),Mn.y=0;const o=Mn.dot(xs),c=Mn.dot(yn),l=a*Ou,h=r*Ou;let u=Math.abs(o)>l?o-Math.sign(o)*l:0,d=Math.abs(c)>h?c-Math.sign(c)*h:0;const f=ve.position.x-Ze.target.x,g=ve.position.z-Ze.target.z,_=f*xs.x+g*xs.z,m=f*yn.x+g*yn.z,p=a*Fu,A=r*Fu;let b=!1;if(Math.abs(_)>p&&(u=_-Math.sign(_)*p,b=!0),Math.abs(m)>A&&(d=m-Math.sign(m)*A,b=!0),!u&&!d)return;const T=e?1:Math.min(i*(b?8:4),1);Mn.set(0,0,0).addScaledVector(xs,u*T).addScaledVector(yn,d*T);const V=sf(Ze.target.x+Mn.x,Ze.target.z+Mn.z,s);Mn.x=V.x-Ze.target.x,Mn.z=V.z-Ze.target.z,Ge.position.add(Mn),Ze.target.add(Mn),Za.copy(Ze.target)}document.getElementById("homeBtn").onclick=()=>location.href=new URL("..",location.href).href;const Us=document.getElementById("help");document.getElementById("helpBtn").onclick=()=>Us.classList.add("on");Us.onclick=i=>{i.target===Us&&Us.classList.remove("on")};addEventListener("keydown",i=>{i.key==="Escape"&&Us.classList.remove("on"),i.key==="?"&&Us.classList.toggle("on")});Ct.add(new gv(16777215,7438964,3));const af=new Ol(16777215,1.55);af.position.set(-30,50,25);Ct.add(af);const of=new Ol(15791871,.78);of.position.set(34,22,-28);Ct.add(of);bi("duckdb + metadata ready");const aM=new Bv,[Hr,fo,cf,$n,Ja]=await Promise.all([Dy,Uy,Oy,Fy,By].map(i=>aM.loadAsync(i)));bi("glbs loaded");for(const i of[Hr,fo,cf,$n,Ja])i.scene.traverse(e=>{if(!e.material)return;const t=Array.isArray(e.material)?e.material:[e.material];for(const n of t)for(const s of["map","normalMap","roughnessMap","metalnessMap"])n[s]&&(n[s].anisotropy=ho,n[s].needsUpdate=!0)});Hr.scene.traverse(i=>{if(!i.isMesh||!i.material)return;const e=Array.isArray(i.material)?i.material:[i.material];for(const t of e)t.roughness=.94,t.metalness=0,t.normalMap=tM,t.normalScale=new we(.24,.24),t.needsUpdate=!0});fo.scene.traverse(i=>{if(!i.isMesh||!i.material)return;const e=Array.isArray(i.material)?i.material:[i.material];for(const t of e){const n=t.name==="goalnetting"||i.name.includes("netting");t.metalness=n?0:.28,t.roughness=n?.82:.32,n&&(t.color.set(16251894),t.transparent=!0,t.opacity=.72,t.alphaTest=.06,t.depthWrite=!1,t.side=Qt),t.needsUpdate=!0}});window.__viewer.clipsGlb=$n;window.__viewer.sculptGlb=Ja;{Ja.scene.updateMatrixWorld(!0),$n.scene.updateMatrixWorld(!0);const i={};$n.scene.traverse(r=>{r.isSkinnedMesh&&r.material&&(i[r.material.name]=r)});const e=Object.values(i)[0],t=new Map(e.skeleton.bones.map((r,a)=>[r.name,a])),n=new P;Ja.scene.traverse(r=>{if(!r.isSkinnedMesh||!r.material)return;const a=i[r.material.name],o=r.geometry,c=r.skeleton.bones.findIndex(_=>_.name===e.skeleton.bones[0].name),l=new We().copy(e.skeleton.boneInverses[0]).invert().multiply(r.skeleton.boneInverses[c]),h=new Xe().getNormalMatrix(l),u=o.attributes.position,d=o.attributes.normal;for(let _=0;_<u.count;_++)n.fromBufferAttribute(u,_).applyMatrix4(l),u.setXYZ(_,n.x,n.y,n.z),n.fromBufferAttribute(d,_).applyMatrix3(h).normalize(),d.setXYZ(_,n.x,n.y,n.z);const f=r.skeleton.bones.map(_=>t.get(_.name)??0),g=o.attributes.skinIndex;for(let _=0;_<g.array.length;_++)g.array[_]=f[g.array[_]];if(o.computeBoundingSphere(),a)a.geometry=o;else{const _=new Bd(o,r.material);_.position.copy(e.position),_.quaternion.copy(e.quaternion),_.scale.copy(e.scale),_.frustumCulled=!1,e.parent.add(_),_.bind(e.skeleton,e.bindMatrix)}});const s=[];$n.scene.traverse(r=>{r.isMesh&&!r.isSkinnedMesh&&r.material&&r.material.name==="hair"&&s.push(r)}),s.forEach(r=>r.parent.remove(r))}Hr.scene.scale.z=Ke.pitch_width*ut/68;fo.scene.traverse(i=>{i.isMesh&&(i.position.x+=i.name.startsWith("goal01")?55-xi:xi-55)});Ct.add(Hr.scene,fo.scene);const Ki=document.createElement("canvas");Ki.width=1024;Ki.height=128;const Zn=Ki.getContext("2d"),Wl=Zn.createLinearGradient(0,0,0,Ki.height);Wl.addColorStop(0,"#31433d");Wl.addColorStop(1,"#182821");Zn.fillStyle=Wl;Zn.fillRect(0,0,Ki.width,Ki.height);const Bu=["#d9e2dc","#9cc4ad","#f2b84b","#e36d5b","#6d83c8","#eff3e8"];for(let i=0;i<12;i++)for(let e=0;e<128;e++){const t=(i*17+e*29)%Bu.length,n=e*8+i%2*3,s=7+i*9+e*7%3;Zn.fillStyle=Bu[t],Zn.globalAlpha=.48+(i+e)%4*.1,Zn.fillRect(n,s,3,4)}Zn.globalAlpha=1;Zn.fillStyle="#b7ef45";Zn.fillRect(0,116,1024,5);const ql=new $s(Ki);ql.colorSpace=gt;ql.anisotropy=ho;const po=new Kn,Xl=-Ke.pitch_width*ut/2,oM=new Zs({color:12042682,roughness:.96,metalness:0}),lf=new Zs({color:6254952,roughness:.92,metalness:0});for(let i=0;i<3;i++){const e=new _t(new $i(120,1.7,3.6),i===2?lf:oM);e.position.set(0,.85+i*1.55,Xl-6.8-i*3.25),po.add(e)}const hf=new _t(new js(116,8.2),new Zs({map:ql,roughness:.88,metalness:0}));hf.position.set(0,6.8,Xl-12.4);po.add(hf);const uf=new _t(new $i(122,.45,6.5),lf);uf.position.set(0,11.2,Xl-14.4);po.add(uf);Ct.add(po);const vi=new Ln().setFromObject(Hr.scene),df=new js(Math.max(vi.max.x-vi.min.x,1)*1.02,Math.max(vi.max.z-vi.min.z,1)*1.02);df.rotateX(-Math.PI/2);const ul=new ei({transparent:!0,depthWrite:!1,uniforms:{uPoly:{value:[new we,new we,new we,new we]},uDim:{value:.3},uBlind:{value:0}},vertexShader:`
    varying vec2 vXZ;
    void main() {
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vXZ = wp.xz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }`,fragmentShader:`
    uniform vec2 uPoly[4];
    uniform float uDim;
    uniform float uBlind;
    varying vec2 vXZ;
    void main() {
      if (uBlind > 0.5) { gl_FragColor = vec4(0.0, 0.0, 0.0, uDim); return; }
      // convex test: every edge cross-product shares a sign. Winding of the
      // projected quad flips with the camera side, so accept either.
      float pos = 0.0, neg = 0.0;
      for (int i = 0; i < 4; i++) {
        vec2 a = uPoly[i], b = uPoly[i == 3 ? 0 : i + 1];
        float c = (b.x - a.x) * (vXZ.y - a.y) - (b.y - a.y) * (vXZ.x - a.x);
        if (c > 0.0) pos = 1.0; else if (c < 0.0) neg = 1.0;
      }
      if (pos * neg == 0.0) discard;          // inside: pitch, untouched
      gl_FragColor = vec4(0.0, 0.0, 0.0, uDim);
    }`}),Ys=new _t(df,ul);Ys.position.set((vi.max.x+vi.min.x)/2,.02,(vi.max.z+vi.min.z)/2);Ys.frustumCulled=!1;Ys.visible=!1;Ct.add(Ys);const ve=cf.scene;ve.scale.setScalar(1.6);const Di=.11*1.6;Ct.add(ve);window.__viewer.ball=ve;const Pt=new _t(new ao(.35,24),new pn({color:0,transparent:!0,opacity:.35}));Pt.rotation.x=-Math.PI/2;Pt.position.y=.02;Ct.add(Pt);const Ui=new P,Oa=new Float32Array(51),Yl=new Yt;Yl.setAttribute("position",new Ut(Oa,3));const Ar=new Br(Yl,new ro({color:16766282,transparent:!0,opacity:0}));Ar.frustumCulled=!1;Ct.add(Ar);let ff=0;function ku(i,e){const t=i.distanceTo(e);if(!(t<8)){for(let n=0;n<=16;n++){const s=n/16;Oa[n*3]=i.x+(e.x-i.x)*s,Oa[n*3+1]=i.y+(e.y-i.y)*s+Math.sin(s*Math.PI)*t*.12,Oa[n*3+2]=i.z+(e.z-i.z)*s}Yl.attributes.position.needsUpdate=!0,ff=performance.now()+2400}}const zu={pass:16777215,header:8377599,shot:16732240,highpass:16763210,gkthrow:10485680},Qa=[],cM=new kr(.42,.55,32);for(let i=0;i<6;i++){const e=new _t(cM,new pn({color:16777215,transparent:!0,opacity:0,side:Qt}));e.rotation.x=-Math.PI/2,e.position.y=.03,e.visible=!1,Ct.add(e),Qa.push({mesh:e,t0:0})}let lM=0;function hM(i,e,t){const n=Qa[lM++%Qa.length];n.mesh.material.color.set(t),n.mesh.position.set(i,.03,e),n.mesh.scale.setScalar(1),n.t0=performance.now(),n.mesh.visible=!0}function uM(){const i=performance.now();for(const e of Qa){if(!e.mesh.visible)continue;const t=(i-e.t0)/600;if(t>=1){e.mesh.visible=!1;continue}e.mesh.scale.setScalar(1+t*3.2),e.mesh.material.opacity=.85*(1-t)}}const wr=26,yi=new Float32Array(wr*3),jl=new Yt;jl.setAttribute("position",new Ut(yi,3));const Fa=new ro({color:16732240,transparent:!0,opacity:0}),Kl=new Br(jl,Fa);Kl.frustumCulled=!1;Ct.add(Kl);let Hu=0;function dM(i){for(let e=0;e<wr;e++)yi[e*3]=i.x,yi[e*3+1]=i.y,yi[e*3+2]=i.z}const Vi=new _t(new kr(.55,.7,40),new pn({color:16777215,transparent:!0,opacity:.3,side:Qt}));Vi.rotation.x=-Math.PI/2;Vi.position.y=.025;Vi.visible=!1;Ct.add(Vi);const Gi=new _t(new kr(.78,.9,48),new pn({color:12187198,transparent:!0,opacity:.95,side:Qt}));Gi.rotation.x=-Math.PI/2;Gi.position.y=.032;Gi.visible=!1;Ct.add(Gi);const Vu=new P,Gu=new qt,hc=new P;let Gn=1/0;const hi=new P,Wu=new P,qu=new qt;let ui=null,pr=null;for(const i of $n.animations)for(const e of i.tracks)if(e.name==="player.position")for(let t=0;t<e.values.length;t+=3)e.values[t]=0,e.values[t+1]=0;const pf=i=>i.startsWith("left_")?"right_"+i.slice(5):i.startsWith("right_")?"left_"+i.slice(6):i,dl=(i,e)=>{let t=0,n=0;for(let s=0;s<i.length;s++)t=Math.max(t,Math.abs(i[s]-e[s])),n=Math.max(n,Math.abs(i[s]+e[s]));return Math.min(t,n)},mf=i=>Array.from(i.values.slice(i.values.length-i.getValueSize())),fl=i=>Array.from(i.values.slice(0,i.getValueSize()));function fM(i){const e=new Map(i.tracks.map(s=>[s.name,s]));let t=0,n=0;for(const s of i.tracks){const[r,a]=s.name.split(".");if(a!=="quaternion")continue;const o=mf(s);t=Math.max(t,dl(o,fl(s)));const c=e.get(`${pf(r)}.${a}`);if(!c)return!1;const l=fl(c);l[1]=-l[1],l[2]=-l[2],n=Math.max(n,dl(o,l))}return t>.05&&n<t}function pM(i){const e=i.duration,t=new Map(i.tracks.map(s=>[s.name,s])),n=i.tracks.map(s=>{const[r,a]=s.name.split("."),o=t.get(`${pf(r)}.${a}`)||s,c=s.getValueSize(),l=Array.from(s.times),h=Array.from(s.values),u=l[l.length-1];for(let d=0;d<o.times.length;d++){const f=o.times[d]+e;if(f<=u+1e-6)continue;const g=Array.from(o.values.slice(d*c,d*c+c));a==="quaternion"?(g[1]=-g[1],g[2]=-g[2]):g[0]=-g[0],l.push(f),h.push(...g)}return new s.constructor(s.name,l,h)});return new Ya(`${i.name}#stride`,2*e,n)}const Dt={};for(const i in ki){const e=$n.animations.find(t=>t.name===ki[i].name);if(!e){console.warn("clip missing from clips.glb:",ki[i].name);continue}if(fM(e)){Dt[i]=pM(e);const t=Dt[i].tracks.find(n=>n.name==="left_thigh.quaternion");Ht(`[stride] ${i} (${e.name}) doubled ${e.duration.toFixed(2)}s -> ${Dt[i].duration.toFixed(2)}s, loop seam err `+(t?dl(mf(t),fl(t)).toFixed(4):"n/a"))}else Dt[i]=e}for(const i in Lt){const e=$n.animations.find(t=>t.name===Lt[i].name);e?Dt[i]=e:console.warn("action clip missing from clips.glb:",Lt[i].name)}let pl=1;for(const[i,e]of Rt){const t=[];for(const n of e){if(!Dt[n.key])continue;const s=Lt[n.key];n.dur=Dt[n.key].duration,n.slow=s.speed&&n.sp>.5?nt.clamp(s.speed/n.sp,.7,1.4):s.slow,n.pre=Math.max(1,Math.round(s.contact*n.dur*n.slow*ht)),n.post=Math.round((1-s.contact)*n.dur*n.slow*ht)+2,n.fumble&&(n.post=Math.min(n.post,3)),s.moving&&(n.post=Math.min(n.post,Math.max(1,Math.round(n.dur*n.slow*ht)-n.pre-1))),pl=Math.max(pl,n.pre),n.postHold&&(n.post=Math.max(n.post,Math.min(n.postHold,35))),s.hold&&(n.post=Math.max(n.post,s.hold)),n.standSeq&&Dt.getup&&(n.clipEndF=Math.round(n.dur*n.slow*ht)-n.pre,n.standAt=nt.clamp(n.standSeq,n.seq+n.clipEndF+2,n.seq+150),n.post=n.standAt-n.seq+Math.round(Dt.getup.duration*Jd*ht)+2),t.push(n)}Rt.set(i,t)}const gf=.45,eo=2,vs=Math.round(Dt.throw.duration*gf*eo*ht),Xu=Math.round(Dt.throw.duration*(1-gf)*eo*ht)+6,uc=12,Yu=35,mM=[...zi.entries()].flatMap(([i,e])=>e.map(t=>({...t,slot:i}))).sort((i,e)=>i.seq-e.seq),mr=[...Rt.entries()].flatMap(([i,e])=>e.map(t=>({seq:t.seq,key:t.key,release:t.release,post:t.post,slot:i}))).sort((i,e)=>i.seq-e.seq),dc=new Map;function Dr(i,e){const t=An(i===1?Ke.home_kit:Ke.away_kit),n=An(i===1?Ke.home_number:Ke.away_number);return n&&t&&t===An(e)?n:mo(e)}function _f(i){const e=parseInt(String(i).slice(1),16);return isFinite(e)?`rgba(${e>>16&255},${e>>8&255},${e&255},0.55)`:"transparent"}function mo(i){const e=parseInt(String(i).slice(1),16);return isFinite(e)&&(.2126*(e>>16&255)+.7152*(e>>8&255)+.0722*(e&255))/255>.45?"#101317":"#f5f6f8"}function gM(i,e,t,n,s,r=null){r=r||mo(i);const a=`${i}|${e}|${t}|${n}|${s??""}|${r}`;if(dc.has(a))return dc.get(a);const o=256,c=256,l=document.createElement("canvas");l.width=o,l.height=c;const h=l.getContext("2d");h.fillStyle="#0a0a0a",h.fillRect(0,0,o,c);const u=(f,g,_,m=!0)=>{const p=Math.round(f*c),A=Math.round((g-f)*c)+1;h.fillStyle=_,h.fillRect(0,p,o,A),h.save(),h.beginPath(),h.rect(0,p,o,A),h.clip();const b=h.createLinearGradient(0,p,o,p+A);if(b.addColorStop(0,"rgba(255,255,255,0.03)"),b.addColorStop(.32,"rgba(255,255,255,0.15)"),b.addColorStop(.68,"rgba(0,0,0,0.04)"),b.addColorStop(1,"rgba(0,0,0,0.13)"),h.fillStyle=b,h.fillRect(0,p,o,A),m){h.strokeStyle="rgba(255,255,255,0.055)",h.lineWidth=1;for(let T=-c;T<o+c;T+=6)h.beginPath(),h.moveTo(T,p),h.lineTo(T+A,p+A),h.stroke();h.strokeStyle="rgba(0,0,0,0.035)";for(let T=0;T<o+c;T+=8)h.beginPath(),h.moveTo(T,p),h.lineTo(T-A,p+A),h.stroke()}h.restore()};u(0,.397,i),u(.397,.567,e),u(.567,.76,t),u(.76,.98,n,!1),h.fillStyle="#14171c",h.fillRect(0,Math.round(.98*c),o,c-Math.round(.98*c)),s!=null&&(h.fillStyle=r,h.textAlign="center",h.textBaseline="middle",((g,_,m,p,A)=>{h.font=`900 ${p}px system-ui`;const b=h.measureText(g).width,T=b>A?A/b:1;h.save(),h.translate(_,m),h.scale(T,1),h.fillText(g,0,0),h.restore()})(s,Math.round(.75*o),Math.round(.21*c),Math.round(.135*c),Math.round(.15*o)));const d=new $s(l);return d.anisotropy=ho,d.flipY=!1,d.colorSpace=gt,dc.set(a,d),d}function xf(i){const e=document.createElement("canvas");e.width=e.height=64,i(e.getContext("2d"));const t=new $s(e);return t.colorSpace=gt,t}const _M=xf(i=>{i.fillStyle="#00F5D4",i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=6,i.lineJoin="round",i.beginPath(),i.moveTo(10,14),i.lineTo(54,14),i.lineTo(32,52),i.closePath(),i.stroke(),i.fill()}),xM=xf(i=>{const e=()=>{i.beginPath(),i.moveTo(15,15),i.lineTo(49,49),i.moveTo(49,15),i.lineTo(15,49),i.stroke()};i.lineCap="round",i.strokeStyle="rgba(0,0,0,0.55)",i.lineWidth=22,e(),i.strokeStyle="#FF7043",i.lineWidth=15,e()});let vf=!1;const ju=document.getElementById("names");ju.onchange=()=>{vf=ju.checked};let ml=!1;addEventListener("keydown",i=>{i.key.toLowerCase()==="c"&&!i.metaKey&&!i.ctrlKey&&!i.altKey&&!/INPUT|SELECT|BUTTON/.test(i.target.tagName)&&(ml=!ml)});function vM(){const i=document.createElement("canvas");i.width=512,i.height=80;const e=new $s(i);e.colorSpace=gt;const t=new Nl(new so({map:e,transparent:!0,opacity:.95,depthWrite:!1}));return t.center.set(.5,-4.6),t.position.y=1.9,t.scale.set(1.5,.25,1),t}function yM(i,e){const t=i.material.map.image,n=t.getContext("2d");n.clearRect(0,0,t.width,t.height),n.font="700 44px ui-monospace, Menlo, monospace",n.textAlign="center",n.textBaseline="middle";const s=Math.min(500,n.measureText(e).width+30);n.fillStyle="rgba(10,14,20,0.85)",n.beginPath(),n.roundRect(256-s/2,8,s,64,12),n.fill(),n.fillStyle="#9ef7d0",n.fillText(e,256,40,s-20),i.material.map.needsUpdate=!0}function MM(i){const e=document.createElement("canvas");e.width=512,e.height=128;const t=e.getContext("2d"),n=i.number!=null?`${i.number}  ${i.name??""}`:i.name??"?";t.font="700 54px system-ui",t.textAlign="center",t.textBaseline="middle";const s=i.gk?on[i.teamId].gk:on[i.teamId].shirt,r=i.gk?mo(s):Dr(i.teamId,s),a=Math.min(490,t.measureText(n).width+44),o=256-a/2,c=92,l=64-c/2,h=18;t.beginPath(),t.roundRect(o,l,a,c,h),t.fillStyle=_f(r),t.fill(),t.beginPath(),t.roundRect(o+3,l+3,a-6,c-6,h-3),t.fillStyle=s,t.fill(),t.fillStyle=r,t.fillText(n,256,64,a-30);const u=new $s(e);u.colorSpace=gt;const d=new Nl(new so({map:u,transparent:!0,opacity:0,depthWrite:!1}));return d.center.set(.5,-3),d.position.y=1.9,d.scale.set(1.15,.29,1),d}function Ku(i){const e=new Nl(new so({map:i,transparent:!0,opacity:0,depthWrite:!1}));return e.scale.set(.36,.36,1),e.center.set(.5,-.85),e.position.y=1.9,e.visible=!1,e}function $u(i,e){const t=parseInt(i.slice(1),16),n=parseInt(e.slice(1),16),s=t>>16&255,r=t>>8&255,a=t&255,o=n>>16&255,c=n>>8&255,l=n&255,h=(s+o)/2;return Math.sqrt((2+h/256)*(s-o)**2+4*(r-c)**2+(2+(255-h)/256)*(a-l)**2)}const SM="#3f6f3a",Zu=["#e67e22","#c0392b","#f1c40f","#8e44ad","#16a085","#e91e63","#dfe6ef","#1d2733"];function yf(i,e){$u(i,e)<110&&console.warn(`[kits] home ${i} and away ${e} are close — check the feed's kit records, or set them with the swatches`);const t=[i,e,SM],n=()=>{let s=Zu[0],r=-1;for(const a of Zu){const o=Math.min(...t.map(c=>$u(a,c)));o>r&&(r=o,s=a)}return t.push(s),s};return{1:{shirt:i,gk:n()},2:{shirt:e,gk:n()}}}let on=yf(An(ja.get("home"))||An(Ke.home_kit)||"#204080",An(ja.get("away"))||An(Ke.away_kit)||"#ffffff");function Ma(i,e){const t=new Ve(i);return t.offsetHSL(0,0,e),`#${t.getHexString()}`}function Mf(){for(const i of Jt){i.nameSprite&&(i.rig.remove(i.nameSprite),i.nameSprite.material.map?.dispose(),i.nameSprite.material.dispose(),i.nameSprite=null);const e=on[i.teamId],t=i.gk?e.gk:e.shirt,n=i.gk?Ma(t,-.04):Ma(t,-.075),s=i.gk?Ma(t,.025):Ma(t,.045),r=gM(t,n,s,i.gk?"#e9edf0":"#927265",i.number,i.gk?null:Dr(i.teamId,t));for(const a of i.kitMats)a.map=r,a.needsUpdate=!0}}const EM=new ao(.38,24),Jt=_i.map((i,e)=>{const t=Ny($n.scene),n=[],s=[];t.traverse(d=>{d.material&&(d.material=d.material.clone(),d.material.metalness=0,d.material.name==="kit"?(d.material.roughness=.88,d.material.roughnessMap=Qy,d.material.normalMap=eM,d.material.normalScale=new we(.16,.16)):d.material.name==="skin"||d.material.name==="hands"?d.material.roughness=.6:(d.material.name==="shoe"||d.material.name==="shoe_sole")&&(d.material.roughness=.43),(d.material.name==="kit"||d.material.name==="hands")&&s.push(d.material),n.push(d.material))});const r=new Kn;r.add(t),r.visible=!1;const a=new _t(EM,new pn({color:463629,transparent:!0,opacity:.18,depthWrite:!1}));a.rotation.x=-Math.PI/2,a.position.y=.018,a.scale.set(1.28,.58,1),a.renderOrder=1,r.add(a),Ct.add(r);const o=new Ov(t),c=o.clipAction(Dt.idle);c.play();const l={};t.traverse(d=>{d.isBone&&(d.name==="neck"||d.name==="middle")&&(l[d.name]=d)});const h=Ku(_M),u=Ku(xM);return r.add(h,u),{rig:r,mixer:o,action:c,bones:l,icoTracked:h,icoGuess:u,contactShadow:a,clipKey:"idle",slot:e+1,playerId:Number(i.player_id),yaw:0,ema:0,vx:0,vz:0,ox:0,oz:0,pendingTurn:0,switchedAt:0,gk:i.gk,retreat:!1,turned:!1,mats:n,kitMats:s,teamId:i.team_id,number:i.number,name:i.name,nameSprite:null,wasVisible:!1,appearAt:0,det:1}});Mf();const bM=new Map(Jt.map(i=>[i.playerId,i]));window.__viewer.players=Jt;let fc=()=>{};fc=()=>ef(on[1].shirt,Dr(1,on[1].shirt),on[2].shirt,Dr(2,on[2].shirt),(i,e)=>{on=yf(i===1?e:on[1].shirt,i===2?e:on[2].shirt),Mf(),fc(),Vl(ol,!0)}),fc();{const i=document.getElementById("tip"),e=new P;let t=null,n=null;const s=r=>{let a=null,o=22**2;for(const c of Jt){if(!c.rig.visible||(e.copy(c.rig.position),e.y+=1,e.project(Ge),e.z>1))continue;const l=(e.x*.5+.5)*innerWidth,h=(-e.y*.5+.5)*innerHeight,u=(l-r.clientX)**2+(h-r.clientY)**2;u<o&&(o=u,a=c)}return a};Wt.domElement.addEventListener("pointermove",r=>{const a=s(r);if(n=a,a){const o=a.gk?on[a.teamId].gk:on[a.teamId].shirt;i.style.display="block",i.style.left=r.clientX+14+"px",i.style.top=r.clientY+10+"px",i.style.background=o,i.style.color=a.gk?mo(o):Dr(a.teamId,o),i.textContent=`${a.number!=null?"#"+a.number+" ":""}${a.name??""}`}else i.style.display="none"}),Wt.domElement.addEventListener("pointerdown",r=>{t={x:r.clientX,y:r.clientY}}),Wt.domElement.addEventListener("pointerup",r=>{const a=!t||Math.hypot(r.clientX-t.x,r.clientY-t.y)>6;if(t=null,a)return;const o=s(r)||n;o&&(zl=o.playerId,mn&&parent.postMessage({source:"soccerviewer",type:"player-selected",playerId:o.playerId},location.origin))}),Wt.domElement.addEventListener("pointerleave",()=>{n=null,i.style.display="none"})}function Ju(i,e,t){i.rig.visible=!0,i.wasVisible||(i.wasVisible=!0,i.appearAt=performance.now(),i.det=e?1:0,i.ox=i.oz=0),i.det+=((e?1:0)-i.det)*Math.min(t*5,1);const n=Math.min(1,(performance.now()-i.appearAt)/400);for(const o of i.mats)o.transparent=n<1,o.opacity=n;const s=nt.clamp(i.ema/8,0,1);i.contactShadow.scale.set(1.25+s*.38,.6-s*.1,1),i.contactShadow.material.opacity=n*(.16+s*.035),i.icoTracked.material.opacity=n*Math.max(0,(i.det-.4)/.6)*.85,i.icoGuess.material.opacity=n*Math.max(0,(.6-i.det)/.6)*.9,i.icoTracked.visible=!mn&&i.icoTracked.material.opacity>.03,i.icoGuess.visible=i.icoGuess.material.opacity>.03;const r=Ge.position.distanceTo(i.rig.position),a=(mn?.23:.36)*Math.max(1,r/50);if(i.icoTracked.scale.set(a,a,1),i.icoGuess.scale.set(a,a,1),vf){i.nameSprite||(i.nameSprite=MM(i),i.rig.add(i.nameSprite)),i.nameSprite.visible=!0,i.nameSprite.material.opacity=n*.95;const o=Math.max(1,r/50);i.nameSprite.scale.set(1.15*o,.29*o,1)}else i.nameSprite&&(i.nameSprite.visible=!1);if(ml){let o="";const c=Rt.get(i.slot);if(c)for(const u of c){if(u.seq-u.pre>He)break;He<=u.seq+u.post&&(o+=` ${u.key}·k${u.seq} d${Math.round(He-u.seq)} w-${u.pre}/+${u.post}`)}const l=`${i.clipKey??"—"} ×${(i.action?.timeScale??0).toFixed(2)} v${i.ema.toFixed(1)}${o}`;i.clipSprite||(i.clipSprite=vM(),i.rig.add(i.clipSprite)),l!==i.clipLabel&&(i.clipLabel=l,yM(i.clipSprite,l)),i.clipSprite.visible=!0;const h=Math.max(1,r/50);i.clipSprite.scale.set(1.5*h,.25*h,1)}else i.clipSprite&&(i.clipSprite.visible=!1)}function TM(i){i.rig.visible=!1,i.wasVisible=!1}function Sa(i,e){i.clipKey!==e&&(i.mixer.stopAllAction(),i.action=i.mixer.clipAction(Dt[e]),i.action.setLoop(Al),i.action.clampWhenFinished=!0,i.action.reset().play(),i.clipKey=e)}function Ea(i,e,t,n=.18){if(i.clipKey!==e){const s=i.mixer.clipAction(Dt[e]);e==="throw"&&(s.setLoop(Al),s.clampWhenFinished=!0),s.reset().play(),i.action.crossFadeTo(s,n,!1),i.action=s,i.clipKey=e}i.action.timeScale=t}let an=new URLSearchParams(location.search).has("raw"),Sf=!1;const Qu=document.getElementById("cam");Qu.onchange=()=>{Sf=Qu.checked};const gl=document.getElementById("raw");gl.checked=an;gl.onchange=()=>{an=gl.checked,Ht("[raw]",an?"reconstruction position edits disabled":"reconstruction back on")};let He=0,Wi=!1,$l=1,_l=mn,Et=null,ed=null,td=null;window.__viewer.frame=()=>He;let Ur=!1;const ba=()=>Wi?$l:mn&&_l?1:0;mn&&addEventListener("message",i=>{if(i.origin!==location.origin||i.source!==parent)return;const e=i.data;if(!(!e||e.source!=="matchmind")){if(e.type==="set-time"){const t=Number(e.period)||1,n=e.requestId!=null&&Number.isFinite(e.maxPeriod)&&Number.isFinite(e.maxClockMs),s=n?Number(e.maxPeriod):t,r=n?Math.min(t,s):t,a=n&&r===s?Number(e.maxClockMs):1/0,o=Qd(r,Number(e.clockMs)||0,a);if(Et=n?{requestId:e.requestId,maxPeriod:s,maxClockMs:Number(e.maxClockMs)}:null,o==null){parent.postMessage({source:"soccerviewer",type:"frame-buffering",requestId:e.requestId,reason:"No frame at or before the replay boundary"},location.origin),_l=!1;return}Math.abs(o-He)>ht*.75&&(Ur=!0),He=o,_l=e.playing!==!1,Wi=!1;const c=document.getElementById("scrub");c&&(c.value=Math.floor(He))}e.type==="set-selected-player"&&(zl=Number(e.playerId)||null)}});const Ef=document.getElementById("play"),go=document.getElementById("scrub");go.max=lo-1;const Zl=()=>{Wi=!Wi,Ef.textContent=Wi?"❚❚":"▶"};Ef.onclick=Zl;window.addEventListener("keydown",i=>{i.code==="Space"&&(/INPUT|SELECT|BUTTON/.test(i.target.tagName)||(i.preventDefault(),Zl()))});document.getElementById("speed").onchange=i=>$l=parseFloat(i.target.value);go.oninput=i=>{He=parseInt(i.target.value),Ur=!0};const gr=document.getElementById("jump");let Ba=null;gr.onchange=()=>{const i=parseInt(gr.value);if(!isNaN(i)){const e=parseInt(gr.selectedOptions[0]?.dataset.pre)||25;He=Math.max(0,i-e),go.value=Math.floor(He),Ur=!0,Ba=Math.floor(He),Wi||Zl()}gr.value="",gr.blur()};const Ta=document.getElementById("chip");let Aa=0;const AM=document.getElementById("clock"),wM=document.getElementById("cut");let pc=-1,nd=0;const RM=new Ev;bi("players cloned, fetching window 0");Le=await cl(0);bi("window 0 ready: "+Le.start+".."+Le.end);mn&&parent.postMessage({source:"soccerviewer",type:"ready",matchId:Xs},location.origin);Wt.setAnimationLoop(()=>{const i=Math.min(RM.getDelta(),.1);if(nM(i),iM(i),Wi&&(He=Math.min(He+i*ht*$l,lo-1),go.value=Math.floor(He)),Et){const v=Qd(Et.maxPeriod,Et.maxClockMs,Et.maxClockMs);v!=null&&(He=Math.min(He,v))}if(!Zy(He)){Et&&td!==Et.requestId&&(td=Et.requestId,parent.postMessage({source:"soccerviewer",type:"frame-buffering",requestId:Et.requestId},location.origin)),Ze.update(),Du(),Wt.render(Ct,Ge);return}const e=Math.floor(He),t=e-Le.start;let n=Math.min(t+1,Le.end-Le.start),s=He-e;Et&&(Le.period[n]>Et.maxPeriod||Le.period[n]===Et.maxPeriod&&Le.clockS[n]*1e3>Et.maxClockMs)&&(n=t,s=0),Le.frameIds[n]-Le.frameIds[t]>15&&(n=t,s=0);const r=Le.frameIds[t];let a=!1;const o=Ur;Ur=!1,pc>=0&&Math.abs(r-pc)>15&&(a=!0,o||(nd=performance.now()+1200)),pc=r,wM.style.opacity=performance.now()<nd?1:0,Ar.material.opacity=Math.max(0,(ff-performance.now())/2400)*.85,Ar.visible=Ar.material.opacity>.01;const c=(v,k)=>{const G=(v*pi+k)*2;return{x:Le.pos[G],y:Le.pos[G+1],vx:Le.vel[G],vy:Le.vel[G+1]}},l=(v,k)=>({x:v*ut,z:-k*ut});let h=null;if(!an)for(const v of mM){if(e<v.seq-Yu)break;if(!(e>v.seq)){h=v;break}}const u=c(t,0),d=c(n,0);if(!h&&!isNaN(u.x)){const v=l(u.x,u.y),k=l(isNaN(d.x)?u.x:d.x,isNaN(d.x)?u.y:d.y),G=Math.max(Le.ballZ[t],0),U=Math.max(Le.ballZ[n],0);Ui.set(v.x+(k.x-v.x)*s,Math.max(G+(U-G)*s,Di),v.z+(k.z-v.z)*s),a?(!pr&&!o&&ku(ve.position.clone(),Ui.clone()),ve.position.copy(Ui)):ve.position.lerp(Ui,Math.min(i*10,1)),Pt.position.x=ve.position.x,Pt.position.z=ve.position.z;const J=ve.position.y;Pt.material.opacity=Math.max(.08,.35-J*.03),Pt.scale.setScalar(1+J*.06)}Jt.forEach((v,k)=>{const G=k+1,U=c(t,G),J=c(n,G),y=zi.get(G);let N=null;if(y){for(const H of y)if(e>=H.seq-Yu&&e<=H.seq+Xu){N=H;break}}const B=N&&e>=N.seq-vs;if(isNaN(U.x)||isNaN(J.x)){if(!N){TM(v);return}Ju(v,0,i),v.rig.position.set(N.x,0,N.z),B?(Sa(v,"throw"),v.action.time=nt.clamp((He-(N.seq-vs))/ht/eo,0,Dt.throw.duration-.001),v.mixer.update(0)):(Ea(v,"hold",1),v.mixer.update(i*ba()));let re=N.yaw-v.yaw;for(;re>Math.PI;)re-=2*Math.PI;for(;re<-Math.PI;)re+=2*Math.PI;v.yaw+=re*Math.min(i*8,1),v.rig.rotation.y=v.yaw;return}Ju(v,Le.det[t*pi+G],i);const X=l(U.x,U.y),se=l(J.x,J.y);let oe=X.x+(se.x-X.x)*s,I=X.z+(se.z-X.z)*s;const z=ws.get(G);let $=null,Q=0,me=0,le=0;if(z&&!an){for(const H of z){if(H.a-H.pre>e)break;if(e<=H.b+H.post){$=H;break}}if($){const H=(Ne,ie)=>{const de=Math.min(Math.max(Ne,0),1);return(de<ie?de*de/(2*ie):de<=1-ie?de-ie/2:1-ie-(1-de)*(1-de)/(2*ie))/(1-ie)},re=Ne=>Ne<$.a?H((Ne-($.a-$.pre))/$.pre,Math.min(8,$.pre/4)/$.pre):Ne<=$.b?1:1-H((Ne-$.b)/$.post,Math.min(8,$.post/4)/$.post);if(Q=re(He),Q>0){const Ne=Q-re(He-1);me=($.x-oe)*Ne*ht,le=($.z-I)*Ne*ht,oe+=($.x-oe)*Q,I+=($.z-I)*Q}else $=null}}const fe=Math.hypot(v.ox,v.oz);if(fe>.001){const H=Math.min(fe,2.5*i);v.ox-=v.ox/fe*H,v.oz-=v.oz/fe*H}v.rig.position.set(oe+v.ox,0,I+v.oz);const ye=l(U.vx,U.vy);$&&(ye.x=me,ye.z=le),v.vx+=(ye.x-v.vx)*.15,v.vz+=(ye.z-v.vz)*.15;const Ie=Math.hypot(v.vx,v.vz);if(v.ema+=(Ie-v.ema)*.2,N&&!B&&e>=N.seq-uc){const H=nt.clamp((He-(N.seq-uc))/(uc-vs),0,1),re=H*H*(3-2*H);an||v.rig.position.set(oe*(1-re)+N.x*re,0,I*(1-re)+N.z*re),Ea(v,"hold",1),v.mixer.update(i*ba());let ie=N.yaw-v.yaw;for(;ie>Math.PI;)ie-=2*Math.PI;for(;ie<-Math.PI;)ie+=2*Math.PI;v.yaw+=ie*Math.min(i*6,1),v.rig.rotation.y=v.yaw;return}if(N&&!B){const H=v.ema>.8;Ea(v,H?"carry":"hold",H?nt.clamp(v.ema/ki.carry.speed,.4,1.2):1);const re=Math.hypot(v.vx,v.vz)||1;let ie=(H?Math.atan2(v.vx/re,v.vz/re):N.yaw)-v.yaw;for(;ie>Math.PI;)ie-=2*Math.PI;for(;ie<-Math.PI;)ie+=2*Math.PI;v.yaw+=ie*Math.min(i*8,1),v.rig.rotation.y=v.yaw,v.mixer.update(i*ba());return}if(B){Sa(v,"throw"),v.action.time=nt.clamp((He-(N.seq-vs))/ht/eo,0,Dt.throw.duration-.001),v.mixer.update(0);const H=nt.clamp((He-N.seq)/Xu,0,1),re=N.x*(1-H)+oe*H,Ne=N.z*(1-H)+I*H;an||v.rig.position.set(re,0,Ne);let de=N.yaw-v.yaw;for(;de>Math.PI;)de-=2*Math.PI;for(;de<-Math.PI;)de+=2*Math.PI;v.yaw+=de*Math.min(i*8,1),v.rig.rotation.y=v.yaw;return}const C=Rt.get(G);if(C){let H=null;for(const re of C){if(re.seq-pl>e)break;e<re.seq-re.pre||e>re.seq+re.post||(!H||(re.prio||0)>=(H.prio||0))&&(H=re)}if(H&&!Lt[H.key].moving&&!H.key.startsWith("gk")&&v.ema>2.5&&(H=null),H&&!H.release&&!Lt[H.key].moving&&!Lt[H.key].travel&&!H.key.startsWith("gk")){const re=H.seq-H.pre-Le.start;if(re>=0&&re<=Le.end-Le.start){const Ne=c(re,G);if(!isNaN(Ne.x)){const ie=l(Ne.x,Ne.y);Math.hypot(oe-ie.x,I-ie.z)>1.2&&(H=null)}}}if(v.pendingTurn&&(!H||!Lt[H.key].travel)&&(v.yaw+=v.pendingTurn*Math.PI/180,v.rig.rotation.y=v.yaw,v.pendingTurn=0),H){const re=Lt[H.key];if(!an&&!re.moving){const Ee=H.seq-H.pre-Le.start;let ue=oe,Be=I;if(!$&&Ee>=0&&Ee<=Le.end-Le.start){const be=c(Ee,G);if(!isNaN(be.x)){const je=l(be.x,be.y);ue=je.x,Be=je.z}}if(re.travel){const be=nt.clamp((He-H.seq)/H.post,0,1),je=be*be*(3-2*be);ue+=(oe-ue)*je,Be+=(I-Be)*je,v.pendingTurn=H.turn??re.exitDeg}v.rig.position.set(ue,0,Be),v.ox=ue-oe,v.oz=Be-I}if(H.standAt&&!an&&He>=H.seq+H.clipEndF){const Ee=H.seq+H.clipEndF-Le.start;let ue=oe,Be=I;if(Ee>=0&&Ee<=Le.end-Le.start){const be=c(Ee,G);if(!isNaN(be.x)){const je=l(be.x,be.y);ue=je.x,Be=je.z}}v.rig.position.set(ue,0,Be),v.ox=ue-oe,v.oz=Be-I}H.standAt&&He>=H.standAt?(Sa(v,"getup"),v.action.time=nt.clamp((He-H.standAt)/ht/Jd,0,Dt.getup.duration-.001)):(Sa(v,H.key),v.action.time=nt.clamp((He-(H.seq-H.pre))/ht/H.slow,0,H.dur-.001)),v.mixer.update(0);let Ne=0,ie=0;if(H.vSlot!==void 0&&!an){const Ee=Jt[H.vSlot-1];if(Ee&&Ee.rig.visible){const ue=Ee.rig.position.x-v.rig.position.x,Be=Ee.rig.position.z-v.rig.position.z,be=Math.hypot(ue,Be),je=Math.abs(He-H.seq);be>.001&&be<4&&je<6&&(Ne=ue,ie=Be);const D=1-Math.min(je/4,1),ge=D*D*(3-2*D);if(ge>0&&be>Lu&&be<4){const K=Math.min((be-Lu)*ge,2.5);v.rig.position.x+=ue/be*K,v.rig.position.z+=Be/be*K,v.ox=v.rig.position.x-oe,v.oz=v.rig.position.z-I}}}let de=H.fx,Fe=H.fz;if(re.moving&&!H.release&&Math.hypot(v.vx,v.vz)>.5&&!(H.standAt&&He>=H.seq+H.clipEndF)&&(de=v.vx,Fe=v.vz),(Ne||ie)&&(de=Ne,Fe=ie),de||Fe){let ue=Math.atan2(de,Fe)-v.yaw;for(;ue>Math.PI;)ue-=2*Math.PI;for(;ue<-Math.PI;)ue+=2*Math.PI;v.yaw+=ue*Math.min(i*10,1)}if(v.rig.rotation.y=v.yaw,H.release&&Math.abs(He-H.seq)<=.8&&performance.now()-(H.pulsedAt||0)>900){H.pulsedAt=performance.now();const Ee=rl(H.key);hM(ve.position.x,ve.position.z,zu[Ee]??16777215),(Ee==="shot"||Ee==="highpass")&&(Fa.color.set(zu[Ee]),Hu=performance.now()+1400)}return}}const qe=ve.position.x-oe,Re=ve.position.z-I,Se=Math.hypot(qe,Re)||1,Ae=Math.hypot(v.vx,v.vz)||1,Qe=vr.get(G);let Oe=!1;if(Qe)for(const H of Qe){if(H.a>e)break;if(e<=H.b){Oe=!0;break}}let w=v.clipKey==="dribble"?"sprint":Wy.has(v.clipKey)?v.clipKey:v.ema>6.3?"sprint":v.ema>.9?"jog":"idle",M,q;if(v.gk){const H=(v.vx*(qe/Se)+v.vz*(Re/Se))/Ae;v.retreat=v.ema>=.4&&(v.retreat?H<-.15:H<-.35),v.turned=v.retreat&&(v.turned?v.ema>2.8:v.ema>4.2),v.turned?(M=v.vx/Ae,q=v.vz/Ae,w="sprint"):(M=qe/Se,q=Re/Se,w=v.ema<.4?"idle":v.retreat?"back":v.ema>6.3?"sprint":"jog")}else{w==="idle"?v.ema>Pu&&(w="jog"):w==="jog"?v.ema<qy?w="idle":v.ema>6.3&&(w="sprint"):w==="throw"?w=v.ema>Pu?"jog":"idle":v.ema<5.3&&(w="jog");const H=nt.clamp((v.ema-.25)/.4,0,1);if(M=qe/Se*(1-H)+v.vx/Ae*H,q=Re/Se*(1-H)+v.vz/Ae*H,v.ema<1.5){const re=Ua.get(G);if(re)for(const Ne of re){if(Ne.a>e)break;if(e<=Ne.b+4){M=0,q=0;break}}}}let te=w==="back"?"jog":w;Oe&&!v.gk&&te==="sprint"&&(te="dribble");const ne=performance.now(),ee=te!==v.clipKey&&ne-v.switchedAt<500?v.clipKey:te;ee!==v.clipKey&&(v.switchedAt=ne);const Pe=w==="back"&&ee==="jog"?-nt.clamp(v.ema/ki.jog.speed,.3,.75):ee==="idle"?1:ee==="jog"?nt.clamp(v.ema/ki.jog.speed,Xy,1.25):nt.clamp(v.ema/ki.sprint.speed,.8,1.4);if(Ea(v,ee,Pe,Lt[v.clipKey]?.moving?.1:.18),M||q){let re=Math.atan2(M,q)-v.yaw;for(;re>Math.PI;)re-=2*Math.PI;for(;re<-Math.PI;)re+=2*Math.PI;v.yaw+=re*Math.min(i*8,1)}v.rig.rotation.y=v.yaw,v.mixer.update(i*ba())});let f=null;for(const v of Cn){if(v.a>e)break;e<=v.b&&(f=v)}const g=Le.carrier?Le.carrier[t]:-1,_=f?f.slot:-1,m=g>0,p=m?g:_;let A=!1;if(!h&&!an){let v=null,k=0,G=mr.length;for(;k<G;){const J=k+G>>1;mr[J].seq<He-16?k=J+1:G=J}for(let J=k;J<mr.length&&mr[J].seq<He+4;J++){const y=mr[J],N=Lt[y.key].travel?y.post:4;He-y.seq>N||(!v||Math.abs(y.seq-He)<Math.abs(v.seq-He))&&(v=y)}const U=v?Jt[v.slot-1]:p>0?Jt[p-1]:null;if(U&&U.rig.visible){const J=U.rig.position.x,y=U.rig.position.z,N=ve.position.x-J,B=ve.position.z-y,X=Math.hypot(N,B);if(v&&X<5&&Ts[v.key]){const oe=Ts[v.key],I=He-v.seq,z=I>=0&&v.release?1.2:4,$=1-Math.min(Math.abs(I)/z,1);let Q=$*$*(3-2*$),me=U.yaw;const le=Lt[v.key];if(le.travel&&I>=0){const C=Math.min(I/Math.max(v.post,1),1),qe=C*C*(3-2*C);me=U.yaw+(v.turn??le.exitDeg)*Math.PI/180*qe,Q=1}let fe,ye,Ie;if(oe.bone){const C=U.bones[oe.bone];C.getWorldPosition(hi),C.getWorldQuaternion(qu),Wu.set(0,0,1).applyQuaternion(qu),hi.addScaledVector(Wu,oe.lift);const qe=oe.bodyR+Di;fe=hi.x+Math.sin(U.yaw)*qe,Ie=hi.z+Math.cos(U.yaw)*qe,ye=hi.y}else fe=J+Math.sin(me)*oe.reach,Ie=y+Math.cos(me)*oe.reach,ye=oe.y===null?Di:oe.y;if(ve.position.x+=(fe-ve.position.x)*Q,ve.position.z+=(Ie-ve.position.z)*Q,ve.position.y+=(ye-ve.position.y)*Q,oe.bone){const C=oe.bodyR+Di,qe=ve.position.distanceTo(hi);qe>1e-6&&qe<C&&ve.position.sub(hi).multiplyScalar(C/qe).add(hi)}}else if(!v&&ve.position.y<2.2&&(m||X<4.5&&Math.hypot(Ui.x-U.rig.position.x,Ui.z-U.rig.position.z)<(Gn===1/0?2.2:2.8))){const oe=U.ema>5.3?1.1:U.ema>.9?.55:.38;if(A=!0,Gn=Math.max(oe,Math.min(Gn,X)-(2+(Gn-oe)*3)*i),X>Gn&&(ve.position.x=J+N/X*Gn,ve.position.z=y+B/X*Gn),!U.gk){const I=Math.min((Gn-oe)/1.5,1);ve.position.y=ve.position.y*I+Di*(1-I)}}Pt.position.x=ve.position.x,Pt.position.z=ve.position.z;const se=ve.position.y;Pt.material.opacity=Math.max(.08,.35-se*.03),Pt.scale.setScalar(1+se*.06)}}if(A||(Gn=1/0),ui=null,h){const v=h,k=Jt[v.slot-1];if(k.rig.visible){const G=nt.clamp((He-(v.seq-vs))/vs,0,1),U=G*G*(3-2*G),J=.32*(1-U*.6);ui={x:k.rig.position.x+Math.sin(k.yaw)*J,z:k.rig.position.z+Math.cos(k.yaw)*J,y:1.15+U*.95}}}if(ui&&(ve.position.set(ui.x,ui.y,ui.z),Pt.position.x=ve.position.x,Pt.position.z=ve.position.z),!an&&!ui&&Rs.length){let v=null;const k=!!Le.det[t*pi];for(const G of Rs){if(G.from>e)break;if(e<=G.to||e<=G.to+200&&!k){v=G;break}}if(v){if(pr!==v&&(pr=v,!o&&v.evAnchored&&ku(ve.position.clone(),new P(v.x0,v.y0,v.z0))),v.slot!==void 0&&!an&&He<=v.kick+8){const G=Jt[v.slot-1],U=c(t,v.slot);if(G&&G.rig.visible&&!isNaN(U.x)){const J=l(U.x,U.y),y=v.x0-J.x,N=v.z0-J.z,B=Math.hypot(y,N);if(B>.55&&B<=22){const X=Math.max((v.kick-He)/ht,0),se=Math.min(B,Math.max(X*5.5,.45));G.rig.position.x=v.x0-y/B*se,G.rig.position.z=v.z0-N/B*se,G.ox=G.rig.position.x-J.x,G.oz=G.rig.position.z-J.z,se<B-.05&&He<v.kick&&(G.vx=y/B*5.5,G.vz=N/B*5.5,G.ema=5.5)}}}if(!v.evAnchored&&He<=v.kick+.5)v.liveX=ve.position.x,v.liveY=ve.position.y,v.liveZ=ve.position.z;else{const G=v.liveX??v.x0,U=v.liveY??v.y0,J=v.liveZ??v.z0,y=He<=v.kick?0:nt.clamp((He-v.kick)/Math.max(v.mid-v.kick,1),0,1);ve.position.set(G+(v.rx-G)*y,Math.max(U+(.22-U)*y,Di),J+(v.rz-J)*y),Pt.position.x=ve.position.x,Pt.position.z=ve.position.z,Pt.material.opacity=.35,Pt.scale.setScalar(1)}}else pr&&(pr=null,ve.position.copy(Ui))}if(i>0&&!a&&!ui){const v=(ve.position.x-hc.x)/i,k=(ve.position.z-hc.z)/i,G=Math.hypot(v,k);G>.6&&(Vu.set(k,0,-v).normalize(),Gu.setFromAxisAngle(Vu,G/Di*i),ve.quaternion.premultiply(Gu))}hc.copy(ve.position),a?dM(ve.position):(yi.copyWithin(0,3),yi[(wr-1)*3]=ve.position.x,yi[(wr-1)*3+1]=ve.position.y,yi[(wr-1)*3+2]=ve.position.z),jl.attributes.position.needsUpdate=!0,Fa.opacity=Math.max(0,(Hu-performance.now())/1400)*.8,Kl.visible=Fa.opacity>.02,uM();const b=f&&Jt[f.slot-1];if(b&&b.rig.visible){if(Vi.visible=!0,Vi.position.set(b.rig.position.x,.025,b.rig.position.z),Aa!==f.slot){Aa=f.slot;const v=_i[f.slot-1];Ta.textContent=`${v.number!=null?"#"+v.number+"  ":""}${v.name??""}`,Ta.style.borderLeftColor=on[v.team_id]?.[v.gk?"gk":"shirt"]??"#fff",Ta.classList.add("on")}}else Vi.visible=!1,Aa&&(Aa=0,Ta.classList.remove("on"));const T=bM.get(zl);if(T?.rig.visible?(Gi.visible=!0,Gi.position.set(T.rig.position.x,.032,T.rig.position.z)):Gi.visible=!1,Ba!==null&&e>=Ba)if(Ba=null,Ds)Ge.position.set(Xn,Ka*ut,63*ut),cc=!0;else{const v=Ge.position.clone().sub(Ze.target);nf(ve.position.x+v.x,Ze.target.y+v.y,ve.position.z+v.z,ve.position.x,Ze.target.y,ve.position.z)}const V=Le.period[t],L=[0,0,2700,5400,6300],R=[0,2700,5400,6300,7200];let W=Le.clockS[t];W<(L[V]??0)&&(W+=L[V]);const ce=W-(R[V]??1/0);if(AM.textContent=(ce>=0?`${R[V]/60}+${Math.floor(ce/60)}:${String(Math.floor(ce%60)).padStart(2,"0")}`:`${String(Math.floor(W/60)).padStart(2,"0")}:${String(Math.floor(W%60)).padStart(2,"0")}`)+`  (P${V})`,Vl(e),Sf){const v=!Le.cam||isNaN(Le.cam[t*8]);if(ul.uniforms.uBlind.value=v?1:0,!v){const k=t*8,G=n*8;for(let U=0;U<8;U+=2){const J=Le.cam[k+U],y=Le.cam[k+U+1],N=Le.cam[G+U],B=Le.cam[G+U+1],X=l(J+((isNaN(N)?J:N)-J)*s,y+((isNaN(B)?y:B)-y)*s);ul.uniforms.uPoly.value[U/2].set(X.x,X.z)}}Ys.visible=!0}else Ys.visible=!1;let x=null,E=null;if((Ds||ji)&&Le.cam&&!isNaN(Le.cam[t*8])){const v=t*8,k=n*8;x=[];for(let G=0;G<8;G+=2){const U=Le.cam[v+G],J=Le.cam[v+G+1],y=Le.cam[k+G],N=Le.cam[k+G+1],B=l(U+((isNaN(y)?U:y)-U)*s,J+((isNaN(N)?J:N)-J)*s);x.push(new P(B.x,0,B.z))}E=new P,x.forEach(G=>E.add(G)),E.multiplyScalar(.25)}if(Ds){const v=o||cc,k=Math.max(i,1/120),G=v?0:nt.clamp((ve.position.x-hl)/k,-30,30);hl=ve.position.x,yr+=(G-yr)*Math.min(i*4.5,1);const U=nt.clamp(yr*.48,-6.5,6.5),J=nt.clamp(ve.position.x+U,-xi+12,xi-12),y=J-Xn,N=4.5,B=Math.abs(y)>N?J-Math.sign(y)*N:Xn;Xn+=(B-Xn)*(v?1:1-Math.exp(-i*3.1));const X=new P(nt.clamp(ve.position.x+U*.18,-xi+5,xi-5),.2,nt.clamp(ve.position.z*.34,-9,9));v?oc.copy(X):oc.lerp(X,Math.min(i*3.5,1)),Ge.position.set(Xn,Ka*ut,63*ut);const se=Gl+nt.clamp(Math.abs(yr)*.24,0,7);Hi=v||Hi===null?se:nt.lerp(Hi,se,1-Math.exp(-i*2.2)),cc=!1,Ge.fov=Hi,Ge.updateProjectionMatrix(),Ze.target.copy(oc)}let Z=p>0?Jt[p-1]:null;if(!Z&&ji){let v=16;for(const k of Jt){if(!k.rig.visible)continue;const G=k.rig.position.distanceToSquared(ve.position);G<v&&(v=G,Z=k)}}if(rM(i,o,Z,E),Ze.update(),Du(),Wt.render(Ct,Ge),mn&&Et&&ed!==Et.requestId){ed=Et.requestId;const v=(Le.clockS[t]+(Le.clockS[n]-Le.clockS[t])*s)*1e3,k=Le.period[t]===Et.maxPeriod?Math.min(v,Et.maxClockMs):v;parent.postMessage({source:"soccerviewer",type:"frame-presented",requestId:Et.requestId,period:Number(Le.period[t]),renderedClockMs:k},location.origin)}});
