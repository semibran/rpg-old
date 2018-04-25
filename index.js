"use strict";var _slicedToArray=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var a=[],r=!0,o=!1,i=void 0;try{for(var n,l=t[Symbol.iterator]();!(r=(n=l.next()).done)&&(a.push(n.value),!e||a.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw i}}return a}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};!function(){var Se={units:{thief:{move:5,range:1},knight:{move:3,range:1},warrior:{move:4,range:1},mage:{move:4,range:2}},equipment:{soldier:"sword",lancer:"lance",warrior:"axe",archer:"bow",thief:"dagger",knight:"shield",mage:"hat"}},t=Se.units,e=Se.equipment,a=Object.freeze({default:Se,__moduleExports:Se,units:t,equipment:e}),r=function(t,e){return t.faction===e.faction||"player"===t.faction&&"ally"===e.faction||"ally"===t.faction&&"player"===e.faction},o=Object.freeze({default:r,__moduleExports:r}),b=a&&Se||a,x=o&&r||o,h=function(t,e){for(var a=b.units[e.class].move,r=b.units[e.class].range,o={cell:e.position,path:[e.position]},i={move:[o],attack:[]},n=[o];n.length;)for(var l=[[(h=n.shift()).cell[0]-1,h.cell[1]],[h.cell[0]+1,h.cell[1]],[h.cell[0],h.cell[1]-1],[h.cell[0],h.cell[1]+1]],s=0;s<l.length;s++){var f=(p=l[s])[0],u=(m=p[1])*t.layout.size[0]+f;if(1!==t.layout.data[u]){for(var c=0;c<i.move.length;c++){if(k(p,(w=i.move[c]).cell))break}if(!(c<i.move.length)){for(c=0;c<t.units.length;c++){if(k(p,(w=t.units[c]).position))break}if(!(c<t.units.length)||x(e,w)){var v=h.path.slice();v.push(p);var p={cell:p,path:v};c===t.units.length&&i.move.push(p),v.length-1<a&&n.push(p)}}}}var d=function(t){var e=[0,0],a=[],r=[e];for(;r.length;)for(var o=r.shift(),i=[[o[0]-1,o[1]],[o[0]+1,o[1]],[o[0],o[1]-1],[o[0],o[1]+1]],n=0;n<i.length;n++){var l=i[n],s=l[0],f=l[1],u=Math.abs(s-e[0])+Math.abs(f-e[1]);if(u){for(var c=0;c<a.length;c++){var o=a[c];if(o[0]===s&&o[1]===f)break}c<a.length||(a.push(l),u<t&&r.push(l))}}return a}(r);for(s=0;s<i.move.length;s++){var h=i.move[s];for(c=0;c<d.length;c++){var m,y=d[c];f=h.cell[0]+y[0],u=(m=h.cell[1]+y[1])*t.layout.size[0]+f;if(1!==t.layout.data[u]&&(f!==e.position[0]||m!==e.position[1])){for(var g=0;g<i.attack.length;g++){if((w=i.attack[g])[0]===f&&w[1]===m)break}if(!(g<i.attack.length)){for(g=0;g<t.units.length;g++){var w;if((w=t.units[g]).position[0]===f&&w.position[1]===m&&x(e,w))break}g<t.units.length||i.attack.push([f,m])}}}}return i};function k(t,e){return t[0]===e[0]&&t[1]===e[1]}var A={squares:[0,64,32,16],palette:[0,80,3,3],shadow:[48,64,16,16],arrows:[0,0,64,64],floor:[64,32,16,16],grass:[64,48,16,16],wall:[64,0,16,32],piece:[32,64,16,16],"symbols/shield":[78,72,6,6],"symbols/bow":[72,64,8,8],"symbols/dagger":[78,78,6,6],"symbols/sword":[64,64,8,8],"symbols/axe":[72,72,6,6],"symbols/hat":[72,78,6,6],"symbols/lance":[64,72,8,8]};function q(t,e,a,r,o){var i=document.createElement("canvas"),n=i.getContext("2d");return i.width=r,i.height=o,n.drawImage(t,-e,-a),i}var I={get:function(t,e,a){var r=4*(a*t.width+e),o=t.data[r],i=t.data[r+1],n=t.data[r+2],l=t.data[r+3];return[o,i,n,l]},replace:function(t,e,a){for(var r=0;r<t.data.length;r+=4){for(var o=0;o<4&&t.data[r+o]===e[o];o++);if(4===o)for(var o=0;o<4;o++)t.data[r+o]=a[o]}}};function z(t,e){var a=document.createElement("canvas");return a.width=t,a.height=e,a.getContext("2d")}var i,n={tiles:[{name:"grass",solid:!1},{name:"wall",solid:!0},{name:"floor",solid:!1}],layout:{size:[16,16],data:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},units:[{class:"knight",faction:"enemy",position:[7,8]},{class:"knight",faction:"enemy",position:[8,8]},{class:"mage",faction:"enemy",position:[5,4]},{class:"warrior",faction:"enemy",position:[10,7]},{class:"warrior",faction:"player",position:[6,11]},{class:"thief",faction:"player",position:[11,12]},{class:"mage",faction:"ally",position:[8,13]}]},l=n.tiles,s=n.layout,f=n.units,u=Object.freeze({default:n,__moduleExports:n,tiles:l,layout:s,units:f}),c={test:u&&n||u};function m(t,e,a){return{context:z(t,e),sprites:a,animation:null}}function _e(t,e){return Math.abs(e[0]-t[0])+Math.abs(e[1]-t[1])}function Ae(t,e){return t[0]===e[0]&&t[1]===e[1]}m.render=function(t,e){for(var a=t.context,r=t.sprites,o=t.animation,i=e.map,n=e.ranges,l=e.cursor,s=[],f=[],u=[],c=0;c<i.layout.size[1];c++)for(var v=0;v<i.layout.size[0];v++){var p=c*i.layout.size[0]+v,d=i.layout.data[p];i.tiles[d].solid?u.push({id:d,cell:[v,c]}):f.push({id:d,cell:[v,c]})}var h=!0,m=!1,y=void 0;try{for(var g,w=f[Symbol.iterator]();!(h=(g=w.next()).done);h=!0){var b=g.value,x=i.tiles[b.id],k=_slicedToArray(b.cell,2),S=k[0],_=k[1];a.drawImage(r[x.name],16*S,16*_)}}catch(t){m=!0,y=t}finally{try{!h&&w.return&&w.return()}finally{if(m)throw y}}if(o&&o.time++,null!==l.selection){var A=i.units[l.selection];if(o){if("lift"===o.type)o.time<4?o.data.offset=2*o.time:o=t.animation={type:"float",time:0,data:{target:l.selection,offset:o.data.offset,range:0}};else if("float"===o.type){var q=0,I=n[l.selection],z=!0,T=!1,M=void 0;try{for(var E,L=I.attack[Symbol.iterator]();!(z=(E=L.next()).done);z=!0){for(var D=E.value,C=_slicedToArray(D,2),j=C[0],O=C[1],R=!0,F=0;F<I.move.length;F++){var P=I.move[F].cell;P[0]===j&&P[1]===O&&(R=!1)}R&&(J=_e(D,A.position))<=o.time&&s.push({sprite:r.squares.attack,position:[16*j,16*O+2,-2]})}}catch(t){T=!0,M=t}finally{try{!z&&L.return&&L.return()}finally{if(T)throw M}}var X=!0,Y=!1,B=void 0;try{for(var G,H=I.move[Symbol.iterator]();!(X=(G=H.next()).done);X=!0){var J,K=G.value,N=_slicedToArray(K.cell,2),Q=N[0],U=N[1];(J=_e(K.cell,A.position))&&J<=o.time&&s.push({sprite:r.squares.move,position:[16*Q,16*U,0]}),q<J&&(q=J)}}catch(t){Y=!0,B=t}finally{try{!X&&H.return&&H.return()}finally{if(Y)throw B}}o.data.range=q;var V=o.time%180/180;if(o.data.offset=8+2*Math.sin(2*Math.PI*V),!Ae(l.position,A.position)){var W=null,Z=!0,$=!1,tt=void 0;try{for(var et,at=I.move[Symbol.iterator]();!(Z=(et=at.next()).done);Z=!0){var rt=et.value;if(Ae(rt.cell,l.position)){W=rt.path;break}}}catch(t){$=!0,tt=t}finally{try{!Z&&at.return&&at.return()}finally{if($)throw tt}}if(W){var ot=_slicedToArray(l.position,2),it=ot[0],nt=ot[1],lt=r.pieces[A.faction][Se.equipment[A.class]];o.time%2&&s.push({sprite:lt,position:[16*it,16*nt+3,-3]});for(var st=0;st<W.length;st++){var ft=_slicedToArray(W[st],2),ut=ft[0],ct=ft[1],vt=!1,pt=!1,dt=!1,ht=!1,mt=W[st-1];if(mt){var yt=ut-mt[0],gt=ct-mt[1];1===yt?vt=!0:-1===yt&&(pt=!0),1===gt?dt=!0:-1===gt&&(ht=!0)}var wt=W[st+1];if(wt){var bt=wt[0]-ut,xt=wt[1]-ct;-1===bt?vt=!0:1===bt&&(pt=!0),-1===xt?dt=!0:1===xt&&(ht=!0)}if(vt||pt||dt||ht){var kt=null;if(vt&&pt?kt="horiz":dt&&ht?kt="vert":dt&&vt?kt="upLeft":dt&&pt?kt="upRight":ht&&vt?kt="downLeft":ht&&pt?kt="downRight":vt&&!st?kt="leftStub":pt&&!st?kt="rightStub":dt&&!st?kt="upStub":ht&&!st?kt="downStub":vt?kt="left":pt?kt="right":dt?kt="up":ht&&(kt="down"),kt){var St=r.arrows[kt];s.push({sprite:St,position:[16*ut,16*ct+2,-2]})}}}}}}}else o=t.animation={type:"lift",time:0,data:{target:l.selection,offset:0}}}else if(o){var _t=i.units[o.data.target];if("move"===o.type)o.time>=4*o.data.path.length-4&&(o=t.animation={type:"drop",time:0,data:{target:o.data.target,offset:8,range:0}});else if("drop"!==o.type)o=t.animation={type:"drop",time:0,data:{target:o.data.target,offset:o.data.offset,range:o.data.range}};else{var At=n[o.data.target];if(At){var qt=!0,It=!1,zt=void 0;try{for(var Tt,Mt=At.attack[Symbol.iterator]();!(qt=(Tt=Mt.next()).done);qt=!0){for(var Et=Tt.value,Lt=_slicedToArray(Et,2),Dt=Lt[0],Ct=Lt[1],jt=!0,Ot=0;Ot<At.move.length;Ot++){var Rt=At.move[Ot].cell;Rt[0]===Dt&&Rt[1]===Ct&&(jt=!1)}jt&&_e(Et,_t.position)<=o.data.range-o.time&&s.push({sprite:r.squares.attack,position:[16*Dt,16*Ct+2,-2]})}}catch(t){It=!0,zt=t}finally{try{!qt&&Mt.return&&Mt.return()}finally{if(It)throw zt}}var Ft=!0,Pt=!1,Xt=void 0;try{for(var Yt,Bt=At.move[Symbol.iterator]();!(Ft=(Yt=Bt.next()).done);Ft=!0){var Gt=Yt.value,Ht=_slicedToArray(Gt.cell,2),Jt=Ht[0],Kt=Ht[1],Nt=_e(Gt.cell,_t.position);Nt&&Nt<=o.data.range-o.time&&s.push({sprite:r.squares.move,position:[16*Jt,16*Kt]})}}catch(t){Pt=!0,Xt=t}finally{try{!Ft&&Bt.return&&Bt.return()}finally{if(Pt)throw Xt}}}o.data.offset-=2,o.data.offset<0&&(o.data.offset=0,t.animation=null)}}var Qt=!0,Ut=!1,Vt=void 0;try{for(var Wt,Zt=u[Symbol.iterator]();!(Qt=(Wt=Zt.next()).done);Qt=!0){var $t=Wt.value,te=_slicedToArray($t.cell,2),ee=te[0],ae=te[1];s.push({sprite:r.wall,position:[16*ee,16*ae,-8]})}}catch(t){Ut=!0,Vt=t}finally{try{!Qt&&Zt.return&&Zt.return()}finally{if(Ut)throw Vt}}for(var re=0;re<i.units.length;re++){var oe=i.units[re],ie=16*oe.position[0],ne=16*oe.position[1],le=0,se=r.pieces[oe.faction][Se.equipment[oe.class]];if(o&&re===o.data.target){if(["lift","float","drop"].includes(o.type))le=-o.data.offset;else if("move"===o.type){var fe=Math.floor(o.time/4),ue=o.time%4*.25,ce=o.data.path[fe],ve=o.data.path[fe+1];ie=16*ce[0],ne=16*ce[1],le=-8,ve&&(ie+=(16*ve[0]-ie)*ue,ne+=(16*ve[1]-ne)*ue)}s.push({sprite:se,position:[ie,ne+3,le-3]})}else s.push({sprite:se,position:[ie,ne+1,le-1]});(!o||o&&o.data.target!==re||o&&o.data.target===re&&o.time%2)&&s.push({sprite:r.shadow,position:[ie,ne,3]})}s.sort(function(t,e){return t.position[1]-e.position[1]});var pe=!0,de=!1,he=void 0;try{for(var me,ye=s[Symbol.iterator]();!(pe=(me=ye.next()).done);pe=!0){var ge=me.value,we=_slicedToArray(ge.position,3),be=we[0],xe=we[1],ke=we[2];a.drawImage(ge.sprite,Math.round(be),Math.round(xe+ke))}}catch(t){de=!0,he=t}finally{try{!pe&&ye.return&&ye.return()}finally{if(de)throw he}}},(i="sprites.png",new Promise(function(t,e){var a=new Image;a.src=i,a.onload=function(){t(a)},a.onerror=function(){e(new Error("Failed to load image `"+i+"`"))}})).then(function(t){var c=y.map,v=y.ranges,p=y.cursor,e=function(t){var e={};for(var a in A){var r=_slicedToArray(A[a],4),o=r[0],i=r[1],n=r[2],l=r[3];e[a]=q(t,o,i,n,l)}e.squares={attack:q(e.squares,16,0,16,16),move:q(e.squares,0,0,16,16)},e.arrows={left:q(e.arrows,0,0,16,16),right:q(e.arrows,16,0,16,16),up:q(e.arrows,32,0,16,16),down:q(e.arrows,48,0,16,16),leftStub:q(e.arrows,0,16,16,16),rightStub:q(e.arrows,16,16,16,16),upStub:q(e.arrows,32,16,16,16),downStub:q(e.arrows,48,16,16,16),upLeft:q(e.arrows,0,32,16,16),upRight:q(e.arrows,16,32,16,16),downLeft:q(e.arrows,32,32,16,16),downRight:q(e.arrows,48,32,16,16),horiz:q(e.arrows,0,48,16,16),vert:q(e.arrows,16,48,16,16)},e.pieces={player:{},enemy:{},ally:{}};var s=e.palette.getContext("2d").getImageData(0,0,3,3),f={white:[255,255,255,255],cyan:I.get(s,0,0),blue:I.get(s,1,0),navy:I.get(s,2,0),pink:I.get(s,0,1),red:I.get(s,1,1),purple:I.get(s,2,1),lime:I.get(s,0,2),green:I.get(s,1,2),teal:I.get(s,2,2)},u={player:[f.cyan,f.blue,f.navy],enemy:[f.pink,f.red,f.purple],ally:[f.lime,f.green,f.teal]},c=["sword","lance","axe","bow","dagger","shield","hat"];for(var v in u){var p=u[v],d=!0,h=!1,m=void 0;try{for(var y,g=c[Symbol.iterator]();!(d=(y=g.next()).done);d=!0){var w=y.value,b=e["symbols/"+w],x=z(16,16),k=e.piece.getContext("2d").getImageData(0,0,16,16);I.replace(k,f.cyan,p[0]),I.replace(k,f.blue,p[1]),I.replace(k,f.navy,p[2]),x.putImageData(k,0,0);var S=z(b.width,b.height);S.drawImage(b,0,0);var _=S.getImageData(0,0,b.width,b.height);I.replace(_,f.white,p[0]),S.putImageData(_,0,0),x.drawImage(S.canvas,5,5),I.replace(_,p[0],p[2]),S.putImageData(_,0,0),x.drawImage(S.canvas,5,4),e.pieces[v][w]=x.canvas}}catch(t){h=!0,m=t}finally{try{!d&&g.return&&g.return()}finally{if(h)throw m}}}return e}(t),d=m(16*c.layout.size[0],16*c.layout.size[1],e);document.body.appendChild(d.context.canvas);for(var a=0;a<c.units.length;a++){var r=c.units[a];v[a]=h(c,r)}function l(t,e){var a=d.context.canvas,r=a.width,o=a.height;return[Math.floor(t/r*16),Math.floor(e/o*16)]}m.render(d,y),requestAnimationFrame(function t(){m.render(d,y);requestAnimationFrame(t)}),window.addEventListener("mousemove",function(t){var e=d.context.canvas;t.target===e&&(p.position=l(t.offsetX,t.offsetY))}),window.addEventListener("mousedown",function(t){var e=d.context.canvas;if(t.target===e){if(p.position||(p.position=l(t.offsetX,t.offsetY)),d.animation)return;for(var a=_slicedToArray(p.position,2),r=a[0],o=a[1],i=0;i<c.units.length;i++){var n=c.units[i];if(n.position[0]===r&&n.position[1]===o){p.selection=i;break}}}}),window.addEventListener("mouseup",function(t){if(null!==p.selection){var e=c.units[p.selection];if(p.position[0]===e.position[0]&&p.position[1]===e.position[1])return;var a=v[p.selection],r=!0,o=!1,i=void 0;try{for(var n,l=a.move[Symbol.iterator]();!(r=(n=l.next()).done);r=!0){var s=n.value;if(s.cell[0]===p.position[0]&&s.cell[1]===p.position[1]){e.position=p.position,d.animation={type:"move",time:0,data:{target:p.selection,path:s.path}};for(var f=0;f<c.units.length;f++){var u=c.units[f];v[f]=h(c,u)}break}}}catch(t){o=!0,i=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw i}}p.selection=null}})});var y={map:c.test,ranges:[],cursor:{position:null,selection:null}}}();