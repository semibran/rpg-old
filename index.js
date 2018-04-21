"use strict";var _slicedToArray=function(t,a){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,a){var e=[],r=!0,o=!1,i=void 0;try{for(var n,s=t[Symbol.iterator]();!(r=(n=s.next()).done)&&(e.push(n.value),!a||e.length!==a);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&s.return&&s.return()}finally{if(o)throw i}}return e}(t,a);throw new TypeError("Invalid attempt to destructure non-iterable instance")};!function(){var i={squares:{move:[0,0,16,16],attack:[16,0,16,16]},pieces:{player:{sword:[0,0,16,18],axe:[16,0,16,18],shield:[32,0,16,18],bow:[48,0,16,18]},enemy:{sword:[0,18,16,18],axe:[16,18,16,18],shield:[32,18,16,18],bow:[48,18,16,18]},ally:{sword:[0,36,16,18],axe:[16,36,16,18],shield:[32,36,16,18],bow:[48,36,16,18]}}},R={soldier:"sword",warrior:"axe",knight:"shield",archer:"bow"};Promise.all(["./sprites/grass.png","./sprites/wall.png","./sprites/pieces.png","./sprites/shadow.png","./sprites/squares.png"].map(function(t){return r=t,new Promise(function(t,a){var e=new Image;e.src=r,e.onload=function(){t(e)},e.onerror=function(){a(new Error("Failed to load image `"+r+"`"))}});var r})).then(function(t){t={floor:t[0],wall:t[1],shadow:t[3],squares:u(t[4],i.squares),pieces:u(t[2],i.pieces)};var s=n.map,l=n.cursor,f=(a=16*s.size[0],e=16*s.size[1],r=t,o=document.createElement("canvas"),o.width=a,o.height=e,{context:o.getContext("2d"),sprites:r,animation:null,squares:null});var a,e,r,o;document.body.appendChild(f.context.canvas),c(f,n),requestAnimationFrame(function t(){c(f,n);requestAnimationFrame(t)}),window.addEventListener("mousemove",function(t){var a,e,r,o,i,n=f.context.canvas;t.target===n&&(l.position=(a=t.offsetX,e=t.offsetY,r=f.context.canvas,o=r.width,i=r.height,[Math.floor(a/o*16),Math.floor(e/i*16)]))}),window.addEventListener("mousedown",function(t){var a=f.context.canvas;if(t.target===a)for(var e=_slicedToArray(l.position,2),r=e[0],o=e[1],i=0;i<s.units.length;i++){var n=s.units[i];if(n.position[0]===r&&n.position[1]===o){l.selection=i;break}}}),window.addEventListener("mouseup",function(t){null!==l.selection&&(l.selection=null)})});var n={map:{size:[16,16],layout:[1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,0,0,0,0,1,0,0,0,1,1,0,0,0,1,1,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,1,1],units:[{class:"soldier",faction:"player",position:[6,7]},{class:"knight",faction:"player",position:[7,9]},{class:"warrior",faction:"enemy",position:[8,6]},{class:"archer",faction:"ally",position:[9,8]}]},cursor:{position:null,selection:null}};function U(t,a){a=a||1;for(var e=t,r=[e],o=[e];o.length;){var i=o.shift(),n=Math.abs(i[0]-e[0])+Math.abs(i[1]-e[1]),s=[[i[0]-1,i[1]],[i[0]+1,i[1]],[i[0],i[1]-1],[i[0],i[1]+1]],l=!0,f=!1,c=void 0;try{for(var u,d=s[Symbol.iterator]();!(l=(u=d.next()).done);l=!0){var v=u.value,p=!0,m=!0,h=!1,y=void 0;try{for(var w,g=r[Symbol.iterator]();!(m=(w=g.next()).done);m=!0){var b=w.value;if(b[0]===v[0]&&b[1]===v[1]){p=!1;break}}}catch(t){h=!0,y=t}finally{try{!m&&g.return&&g.return()}finally{if(h)throw y}}p&&(r.push(v),n+1<a&&o.push(v))}}catch(t){f=!0,c=t}finally{try{!l&&d.return&&d.return()}finally{if(f)throw c}}}return r}function c(t,a){for(var e=t.context,r=t.sprites,o=t.animation,i=t.squares,n=a.map,s=a.cursor,l=0;l<n.size[0];l++)for(var f=0;f<n.size[1];f++){var c=l*n.size[0]+f;0===n.layout[c]&&e.drawImage(r.floor,16*f,16*l)}if(o&&o.time++,null!==s.selection)if(o){if("lift"===o.type&&8<=o.time&&(o=t.animation={type:"float",time:0,data:{target:s.selection,offset:0}},!i)){var u=n.units[s.selection],d="soldier"===u.class?4:3,v="archer"===u.class?2:1;i=t.squares={move:U(u.position,d),attack:U(u.position,d+v)};for(var p=0;p<i.move.length;p++)for(var m=i.move[p],h=0;h<n.units.length;h++){var y=n.units[h];if(m[0]===y.position[0]&&m[1]===y.position[1]){i.move.splice(p,1);break}}for(var w=0;w<i.attack.length;w++){var g=i.attack[w];if(g[0]===u.position[0]&&g[1]===u.position[1]){i.attack.splice(w,1);break}}}}else o=t.animation={type:"lift",time:0,data:{target:s.selection,offset:0}};else i=t.squares=null,o&&"drop"!==o.type&&(o=t.animation={type:"drop",time:0,data:{target:o.data.target,offset:o.data.offset}});if(i){var b=!0,x=!1,k=void 0;try{for(var q,A=i.attack[Symbol.iterator]();!(b=(q=A.next()).done);b=!0){var M=q.value,I=_slicedToArray(M,2),z=I[0],E=I[1];e.drawImage(r.squares.attack,16*z,16*E)}}catch(t){x=!0,k=t}finally{try{!b&&A.return&&A.return()}finally{if(x)throw k}}var S=!0,T=!1,_=void 0;try{for(var C,F=i.move[Symbol.iterator]();!(S=(C=F.next()).done);S=!0){var L=C.value,P=_slicedToArray(L,2),j=P[0],O=P[1];e.drawImage(r.squares.move,16*j,16*O)}}catch(t){T=!0,_=t}finally{try{!S&&F.return&&F.return()}finally{if(T)throw _}}}for(var X=0;X<n.units.length;X++){var Y=n.units[X],B=16*Y.position[0],D=16*Y.position[1],G=D,H=r.pieces[Y.faction][R[Y.class]];if(o&&X===o.data.target){if("lift"===o.type)o.data.offset=Math.min(8,o.time);else if("float"===o.type){var J=o.time%180/180;o.data.offset=8+2*Math.sin(2*Math.PI*J)}else"drop"===o.type&&--o.data.offset<0&&(o.data.offset=0,t.animation=null);G-=o.data.offset}(!o||o&&o.data.target!==X||o&&o.data.target===X&&o.time%2)&&e.drawImage(r.shadow,Math.round(B),Math.round(D+2)),e.drawImage(H,Math.round(B),Math.round(G-2))}for(var K=0;K<n.size[0];K++)for(var N=0;N<n.size[1];N++){var Q=K*n.size[0]+N;1===n.layout[Q]&&e.drawImage(r.wall,16*N,16*K-8)}}function u(t,a,e){for(var r in e=e||{},a)if(Array.isArray(a[r])){var o=_slicedToArray(a[r],4),i=o[0],n=o[1],s=o[2],l=o[3],f=document.createElement("canvas");f.width=s,f.height=l,f.getContext("2d").drawImage(t,-i,-n),e[r]=f}else e[r]=u(t,a[r]);return e}}();