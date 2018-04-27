"use strict";var _slicedToArray=function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var a=[],r=!0,n=!1,i=void 0;try{for(var l,o=e[Symbol.iterator]();!(r=(l=o.next()).done)&&(a.push(l.value),!t||a.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{!r&&o.return&&o.return()}finally{if(n)throw i}}return a}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")};!function(){var dt={units:{thief:{move:5,weapon:"knife"},knight:{move:3,weapon:"lance"},warrior:{move:4,weapon:"axe"},mage:{move:4,weapon:"tome"}},weapons:{knife:{range:1},lance:{range:1},axe:{range:1},tome:{range:2}},equipment:{soldier:"sword",lancer:"lance",warrior:"axe",archer:"bow",thief:"dagger",knight:"shield",mage:"hat"}},e=dt.units,t=dt.weapons,a=dt.equipment,r=Object.freeze({default:dt,__moduleExports:dt,units:e,weapons:t,equipment:a}),n=function(e,t){return e.faction===t.faction||"player"===e.faction&&"ally"===t.faction||"ally"===e.faction&&"player"===t.faction},i=Object.freeze({default:n,__moduleExports:n}),k=r&&dt||r,x=i&&n||i,p=function(e,t){for(var a=k.units[t.class].move,r=k.weapons[k.units[t.class].weapon],n={cell:t.cell,path:[t.cell]},i={move:[n],attack:[]},l=[n];l.length;)for(var o=[[(p=l.shift()).cell[0]-1,p.cell[1]],[p.cell[0]+1,p.cell[1]],[p.cell[0],p.cell[1]-1],[p.cell[0],p.cell[1]+1]],s=0;s<o.length;s++){var c=(m=o[s])[0],u=(h=m[1])*e.layout.size[0]+c;if(1!==e.layout.data[u]){for(var f=0;f<i.move.length;f++){if(S(m,(b=i.move[f]).cell))break}if(!(f<i.move.length)){for(f=0;f<e.units.length;f++){if(S(m,(b=e.units[f]).cell))break}if(!(f<e.units.length)||x(t,b)){var v=p.path.slice();v.push(m);var m={cell:m,path:v};f===e.units.length&&i.move.push(m),v.length-1<a&&l.push(m)}}}}var d=function(e){var t=[0,0],a=[],r=[t];for(;r.length;)for(var n=r.shift(),i=[[n[0]-1,n[1]],[n[0]+1,n[1]],[n[0],n[1]-1],[n[0],n[1]+1]],l=0;l<i.length;l++){var o=i[l],s=o[0],c=o[1],u=Math.abs(s-t[0])+Math.abs(c-t[1]);if(u){for(var f=0;f<a.length;f++){var n=a[f];if(n[0]===s&&n[1]===c)break}f<a.length||(a.push(o),u<e&&r.push(o))}}return a}(r.range);for(s=0;s<i.move.length;s++){var p=i.move[s];for(f=0;f<d.length;f++){var h,y=d[f],g=[c=p.cell[0]+y[0],h=p.cell[1]+y[1]];u=h*e.layout.size[0]+c;if(1!==e.layout.data[u]&&!S(g,t.cell)){for(var w=0;w<i.attack.length;w++){if(S((b=i.attack[w]).cell,g))break}if(!(w<i.attack.length)){for(w=0;w<e.units.length;w++){var b;if(S((b=e.units[w]).cell,g)&&x(t,b))break}w<e.units.length||i.attack.push({cell:g,path:p.path})}}}}return i.move.shift(),i};function S(e,t){return e[0]===t[0]&&e[1]===t[1]}var l={piece:{palette:[64,58,3,3],shadow:[64,64,16,16],symbols:{shield:[80,16,6,6],bow:[64,50,8,8],dagger:[48,80,6,6],sword:[64,80,8,8],axe:[16,80,6,6],hat:[80,64,6,6],lance:[80,32,8,8]},base:[0,80,16,16]},tiles:{floor:[32,80,16,16],grass:[80,0,16,16],wall:[64,0,16,32]},ui:{cursor:[32,64,32,16],squares:[0,64,32,16],arrows:[0,0,64,64],swords:[64,32,16,18]}};function u(e,t,a,r,n){var i=document.createElement("canvas"),l=i.getContext("2d");return i.width=r,i.height=n,l.drawImage(e,-t,-a),i}var m={get:function(e,t,a){var r=4*(a*e.width+t),n=e.data[r],i=e.data[r+1],l=e.data[r+2],o=e.data[r+3];return[n,i,l,o]},replace:function(e,t,a){for(var r=0;r<e.data.length;r+=4){for(var n=0;n<4&&e.data[r+n]===t[n];n++);if(4===n)for(var n=0;n<4;n++)e.data[r+n]=a[n]}}};function d(e,t){var a=document.createElement("canvas");return a.width=e,a.height=t,a.getContext("2d")}function o(e){var t,a,r,n=function e(t,a){var r={};for(var n in a)if(Array.isArray(a[n])){var i=_slicedToArray(a[n],4),l=i[0],o=i[1],s=i[2],c=i[3];r[n]=u(t,l,o,s,c)}else r[n]=e(t,a[n]);return r}(e,l);return{tiles:n.tiles,pieces:function(e){var t={player:{},enemy:{},ally:{},shadow:e.shadow},a=e.palette.getContext("2d").getImageData(0,0,3,3),r={white:[255,255,255,255],cyan:m.get(a,0,0),blue:m.get(a,1,0),navy:m.get(a,2,0),pink:m.get(a,0,1),red:m.get(a,1,1),purple:m.get(a,2,1),lime:m.get(a,0,2),green:m.get(a,1,2),teal:m.get(a,2,2)},n={player:[r.cyan,r.blue,r.navy],enemy:[r.pink,r.red,r.purple],ally:[r.lime,r.green,r.teal]};for(var i in n){var l=n[i];for(var o in e.symbols){var s=e.symbols[o],c=d(16,16),u=e.base.getContext("2d").getImageData(0,0,16,16);m.replace(u,r.cyan,l[0]),m.replace(u,r.blue,l[1]),m.replace(u,r.navy,l[2]),c.putImageData(u,0,0);var f=d(s.width,s.height);f.drawImage(s,0,0);var v=f.getImageData(0,0,s.width,s.height);m.replace(v,r.white,l[0]),f.putImageData(v,0,0),c.drawImage(f.canvas,5,5),m.replace(v,l[0],l[2]),f.putImageData(v,0,0),c.drawImage(f.canvas,5,4),t[i][o]=c.canvas}}return t}(n.piece),ui:(t=n.ui,{cursor:function(e){for(var t=e.width/16,a=new Array(t),r=0;r<t;r++)a[r]=u(e,16*r,0,16,16);return a}(t.cursor),squares:(r=t.squares,{move:u(r,0,0,16,16),attack:u(r,16,0,16,16)}),arrows:(a=t.arrows,{left:u(a,0,0,16,16),right:u(a,16,0,16,16),up:u(a,32,0,16,16),down:u(a,48,0,16,16),leftStub:u(a,0,16,16,16),rightStub:u(a,16,16,16,16),upStub:u(a,32,16,16,16),downStub:u(a,48,16,16,16),upLeft:u(a,0,32,16,16),upRight:u(a,16,32,16,16),downLeft:u(a,32,32,16,16),downRight:u(a,48,32,16,16),horiz:u(a,0,48,16,16),vert:u(a,16,48,16,16)}),swords:t.swords})}}var s,c={tiles:[{name:"grass",solid:!1},{name:"wall",solid:!0},{name:"floor",solid:!1}],layout:{size:[16,16],data:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},units:[{class:"knight",faction:"enemy",cell:[7,8]},{class:"knight",faction:"enemy",cell:[8,8]},{class:"mage",faction:"enemy",cell:[5,4]},{class:"warrior",faction:"enemy",cell:[10,7]},{class:"warrior",faction:"player",cell:[6,11]},{class:"thief",faction:"player",cell:[11,12]},{class:"mage",faction:"ally",cell:[8,13]}]},f=c.tiles,v=c.layout,h=c.units,y=Object.freeze({default:c,__moduleExports:c,tiles:f,layout:v,units:h}),g={test:y&&c||y};function w(e,t,a){return{context:d(e,t),sprites:a,cache:{time:0,dest:null,animation:null}}}function pt(e,t){return Math.abs(t[0]-e[0])+Math.abs(t[1]-e[1])}function ht(e,t){return e[0]===t[0]&&e[1]===t[1]}w.render=function(e,t){var a=e.context,r=e.sprites,n=e.cache,i=t.map,l=t.ranges,o=t.cursor,s=[];if(o.cell){var c=_slicedToArray(o.cell,2),u=c[0],f=c[1],v=0,m=f*i.layout.size[0]+u,d=i.layout.data[m];"wall"===i.tiles[d].name&&(v=-8);var p=Math.floor(n.time/30)%r.ui.cursor.length;s.push({sprite:r.ui.cursor[p],position:[16*u,16*f+3,-3+v]})}for(var h=0;h<i.layout.size[1];h++)for(var y=0;y<i.layout.size[0];y++){var g=h*i.layout.size[0]+y,w=i.layout.data[g],b=i.tiles[w],k=r.tiles[b.name];b.solid?s.push({sprite:k,position:[16*y,16*h,-8]}):a.drawImage(k,16*y,16*h)}if(null!==o.selection){var x=i.units[o.selection],S=dt.weapons[dt.units[x.class].weapon];if(n.animation){if("lift"===n.animation.type)n.animation.time<4?n.animation.offset=2*n.animation.time:n.animation={type:"float",time:0,target:n.animation.target,offset:n.animation.offset,range:0};else if("float"===n.animation.type){var A=n.animation.time%180/180,I=2*Math.sin(2*Math.PI*A);n.animation.offset=8+I;var _=0,q=l[o.selection],z=!0,E=!1,M=void 0;try{for(var T,L=q.attack[Symbol.iterator]();!(z=(T=L.next()).done);z=!0){var D=T.value,j=_slicedToArray(D.cell,2),C=j[0],F=j[1],O=!0,R=!0,P=!1,X=void 0;try{for(var Y,K=q.move[Symbol.iterator]();!(R=(Y=K.next()).done);R=!0){var B=Y.value;if(ht(D.cell,B.cell)){O=!1;break}}}catch(e){P=!0,X=e}finally{try{!R&&K.return&&K.return()}finally{if(P)throw X}}O&&(U=pt(D.cell,x.cell))<=n.animation.time&&s.push({sprite:r.ui.squares.attack,position:[16*C,16*F+2,-2]})}}catch(e){E=!0,M=e}finally{try{!z&&L.return&&L.return()}finally{if(E)throw M}}var G=!0,H=!1,J=void 0;try{for(var N,Q=q.move[Symbol.iterator]();!(G=(N=Q.next()).done);G=!0){var U,V=N.value,W=_slicedToArray(V.cell,2),Z=W[0],$=W[1];(U=pt(V.cell,x.cell))<=n.animation.time&&s.push({sprite:r.ui.squares.move,position:[16*Z,16*$,0]}),_<U&&(_=U)}}catch(e){H=!0,J=e}finally{try{!G&&Q.return&&Q.return()}finally{if(H)throw J}}n.animation.range=_;var ee=null;if(ht(x.cell,o.cell))ee={cell:x.cell,path:null};else{var te=!0,ae=!1,re=void 0;try{for(var ne,ie=q.move[Symbol.iterator]();!(te=(ne=ie.next()).done);te=!0){var le=ne.value;if(ht(o.cell,le.cell)){ee=le;break}}}catch(e){ae=!0,re=e}finally{try{!te&&ie.return&&ie.return()}finally{if(ae)throw re}}}ee?n.dest=ee:ee=n.dest;var oe=null,se=!0,ce=!1,ue=void 0;try{for(var fe,ve=q.attack[Symbol.iterator]();!(se=(fe=ve.next()).done);se=!0){var me=fe.value,de=!0,pe=!1,he=void 0;try{for(var ye,ge=i.units[Symbol.iterator]();!(de=(ye=ge.next()).done);de=!0){var we=ye.value;if(ht(o.cell,me.cell)&&ht(me.cell,we.cell)){oe=we;break}}}catch(e){pe=!0,he=e}finally{try{!de&&ge.return&&ge.return()}finally{if(pe)throw he}}}}catch(e){ce=!0,ue=e}finally{try{!se&&ve.return&&ve.return()}finally{if(ce)throw ue}}if(oe){if(pt(ee.cell,oe.cell)>S.range)if(pt(x.cell,oe.cell)<=S.range)ee=n.dest={cell:x.cell,path:null};else{var be=!0,ke=!1,xe=void 0;try{for(var Se,Ae=q.move[Symbol.iterator]();!(be=(Se=Ae.next()).done);be=!0){var Ie=Se.value;if(pt(Ie.cell,oe.cell)<=S.range){ee=Ie,n.dest=ee;break}}}catch(e){ke=!0,xe=e}finally{try{!be&&Ae.return&&Ae.return()}finally{if(ke)throw xe}}}var _e=r.ui.swords;s.push({sprite:_e,position:[16*oe.cell[0]+8-_e.width/2,16*oe.cell[1]+8-_e.height/2+5,-25+I]})}var qe=ee.path;if(qe){var ze=_slicedToArray(ee.cell,2),Ee=ze[0],Me=ze[1],Te=r.pieces[x.faction][dt.equipment[x.class]];n.animation.time%2&&(s.push({sprite:Te,position:[16*Ee,16*Me+4,-12-I]}),s.push({sprite:r.pieces.shadow,position:[16*Ee,16*Me,3]}));for(var Le=0;Le<qe.length;Le++){var De=_slicedToArray(qe[Le],2),je=De[0],Ce=De[1],Fe=!1,Oe=!1,Re=!1,Pe=!1,Xe=qe[Le-1];if(Xe){var Ye=je-Xe[0],Ke=Ce-Xe[1];1===Ye?Fe=!0:-1===Ye&&(Oe=!0),1===Ke?Re=!0:-1===Ke&&(Pe=!0)}var Be=qe[Le+1];if(Be){var Ge=Be[0]-je,He=Be[1]-Ce;-1===Ge?Fe=!0:1===Ge&&(Oe=!0),-1===He?Re=!0:1===He&&(Pe=!0)}if(Fe||Oe||Re||Pe){var Je=null;Fe&&Oe?Je="horiz":Re&&Pe?Je="vert":Re&&Fe?Je="upLeft":Re&&Oe?Je="upRight":Pe&&Fe?Je="downLeft":Pe&&Oe?Je="downRight":Fe&&!Le?Je="leftStub":Oe&&!Le?Je="rightStub":Re&&!Le?Je="upStub":Pe&&!Le?Je="downStub":Fe?Je="left":Oe?Je="right":Re?Je="up":Pe&&(Je="down"),Je&&s.push({sprite:r.ui.arrows[Je],position:[16*je,16*Ce+2,-2]})}}}}}else n.animation={type:"lift",time:0,target:o.selection,offset:0}}else n.animation&&(i.units[n.animation.target],"move"===n.animation.type?n.animation.time>=4*n.dest.path.length-4&&(n.animation={type:"drop",time:0,target:n.animation.target,offset:8,range:0}):"drop"!==n.animation.type?n.animation={type:"drop",time:0,target:n.animation.target,offset:n.animation.offset,range:n.animation.range}:(n.animation.offset-=2,n.animation.offset<0&&(n.animation=null)));for(var Ne=0;Ne<i.units.length;Ne++){var Qe=i.units[Ne],Ue=16*Qe.cell[0],Ve=16*Qe.cell[1],We=0,Ze=r.pieces[Qe.faction][dt.equipment[Qe.class]];if(n.animation&&Ne===n.animation.target){if(["lift","float","drop"].includes(n.animation.type))We=-n.animation.offset;else if("move"===n.animation.type){var $e=Math.floor(n.animation.time/4),et=n.dest.path,tt=n.animation.time%4*.25,at=et[$e],rt=et[$e+1];Ue=16*at[0],Ve=16*at[1],We=-8,rt&&(Ue+=(16*rt[0]-Ue)*tt,Ve+=(16*rt[1]-Ve)*tt)}s.push({sprite:Ze,position:[Ue,Ve+4,We-4]})}else s.push({sprite:Ze,position:[Ue,Ve+1,We-1]});(!n.animation||n.animation&&n.animation.target!==Ne||n.animation&&n.animation.target===Ne&&n.animation.time%2)&&s.push({sprite:r.pieces.shadow,position:[Ue,Ve,3]})}s.sort(function(e,t){return e.position[1]-t.position[1]});var nt=!0,it=!1,lt=void 0;try{for(var ot,st=s[Symbol.iterator]();!(nt=(ot=st.next()).done);nt=!0){var ct=ot.value,ut=_slicedToArray(ct.position,3),ft=ut[0],vt=ut[1],mt=ut[2];a.drawImage(ct.sprite,Math.round(ft),Math.round(vt+mt))}}catch(e){it=!0,lt=e}finally{try{!nt&&st.return&&st.return()}finally{if(it)throw lt}}n.time++,n.animation&&n.animation.time++},(s="sprites.png",new Promise(function(e,t){var a=new Image;a.src=s,a.onload=function(){e(a)},a.onerror=function(){t(new Error("Failed to load image `"+s+"`"))}})).then(function(e){var f=b.map,v=b.ranges,m=b.cursor,t=o(e),d=w(16*f.layout.size[0],16*f.layout.size[1],t);document.body.appendChild(d.context.canvas);for(var a=0;a<f.units.length;a++){var r=f.units[a];v[a]=p(f,r)}function i(e,t){var a=d.context.canvas,r=a.width,n=a.height;return[Math.floor(e/r*16),Math.floor(t/n*16)]}w.render(d,b),requestAnimationFrame(function e(){var t=b.keys;t.held.pause&&!t.prev.pause&&(b.paused=!b.paused);b.paused||w.render(d,b);requestAnimationFrame(e);Object.assign(t.prev,t.held)}),window.addEventListener("mousemove",function(e){var t=d.context.canvas;e.target===t&&(m.cell=i(e.offsetX,e.offsetY))}),window.addEventListener("mousedown",function(e){var t=d.context.canvas;if(e.target===t){if(m.cell||(m.cell=i(e.offsetX,e.offsetY)),null!==m.selection||d.animation)return;for(var a=_slicedToArray(m.cell,2),r=(a[0],a[1],0);r<f.units.length;r++){var n=f.units[r];if(A(n.cell,m.cell)){m.selection=r;break}}}}),window.addEventListener("mouseup",function(e){if(null!==m.selection){var t=f.units[m.selection];if(A(m.cell,t.cell))return m.released?(m.released=!1,void(m.selection=null)):void(m.released=!0);var a=v[m.selection],r=!0,n=!1,i=void 0;try{for(var l,o=a.move[Symbol.iterator]();!(r=(l=o.next()).done);r=!0){var s=l.value;if(A(m.cell,s.cell)){t.cell=m.cell,d.cache.animation={type:"move",time:0,target:m.selection,path:s.path};for(var c=0;c<f.units.length;c++){var u=f.units[c];v[c]=p(f,u)}break}}}catch(e){n=!0,i=e}finally{try{!r&&o.return&&o.return()}finally{if(n)throw i}}m.released=!1,m.selection=null}})});var b={map:g.test,paused:!1,ranges:[],cursor:{cell:null,selection:null,released:!1},keys:{prev:{},held:function(e,r){var n={},i=!1;function t(e){var t=null;if(r)for(var t in r){for(var a=0;a<r[t].length&&r[t][a]!==e.code;a++);if(a<r[t].length)break;t=null}t||(t=e.code),"keydown"===e.type?n[t]||(n[t]=1):"keyup"===e.type&&(n[t]=0),i||(i=!0,requestAnimationFrame(l))}function l(){for(var e in n)n[e]&&n[e]++;requestAnimationFrame(l)}return e.addEventListener("keydown",t),e.addEventListener("keyup",t),n}(window,{pause:["KeyP"]})}};function A(e,t){return e[0]===t[0]&&e[1]===t[1]}}();