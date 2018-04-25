"use strict";var _slicedToArray=function(t,e){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return function(t,e){var a=[],r=!0,o=!1,i=void 0;try{for(var n,l=t[Symbol.iterator]();!(r=(n=l.next()).done)&&(a.push(n.value),!e||a.length!==e);r=!0);}catch(t){o=!0,i=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw i}}return a}(t,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")};!function(){var ge={units:{thief:{move:5,range:1},knight:{move:3,range:1},warrior:{move:4,range:1},mage:{move:4,range:2}},equipment:{soldier:"sword",lancer:"lance",warrior:"axe",archer:"bow",thief:"dagger",knight:"shield",mage:"hat"}},t=ge.units,e=ge.equipment,a=Object.freeze({default:ge,__moduleExports:ge,units:t,equipment:e}),r=function(t,e){return t.faction===e.faction||"player"===t.faction&&"ally"===e.faction||"ally"===t.faction&&"player"===e.faction},o=Object.freeze({default:r,__moduleExports:r}),w=a&&ge||a,b=o&&r||o,h=function(t,e){for(var a={move:[],attack:[]},r=w.units[e.class].move,o=w.units[e.class].range,i=[{cell:e.position,path:[e.position]}];i.length;)for(var n=[[(p=i.shift()).cell[0]-1,p.cell[1]],[p.cell[0]+1,p.cell[1]],[p.cell[0],p.cell[1]-1],[p.cell[0],p.cell[1]+1]],l=0;l<n.length;l++){var s=(v=n[l])[0],f=(h=v[1])*t.layout.size[0]+s;if(1!==t.layout.data[f]){for(var u=0;u<a.move.length;u++){if(x(v,(g=a.move[u]).cell))break}if(!(u<a.move.length)){for(u=0;u<t.units.length;u++){if(x(v,(g=t.units[u]).position))break}if(!(u<t.units.length)||b(e,g)){var c=p.path.slice();c.push(v);var v={cell:v,path:c};u===t.units.length&&a.move.push(v),c.length-1<r&&i.push(v)}}}}var d=function(t){var e=[0,0],a=[],r=[e];for(;r.length;)for(var o=r.shift(),i=[[o[0]-1,o[1]],[o[0]+1,o[1]],[o[0],o[1]-1],[o[0],o[1]+1]],n=0;n<i.length;n++){var l=i[n],s=l[0],f=l[1],u=Math.abs(s-e[0])+Math.abs(f-e[1]);if(u){for(var c=0;c<a.length;c++){var o=a[c];if(o[0]===s&&o[1]===f)break}c<a.length||(a.push(l),u<t&&r.push(l))}}return a}(o);for(l=0;l<a.move.length;l++){var p=a.move[l];for(u=0;u<d.length;u++){var h,m=d[u];s=p.cell[0]+m[0],f=(h=p.cell[1]+m[1])*t.layout.size[0]+s;if(1!==t.layout.data[f]&&(s!==e.position[0]||h!==e.position[1])){for(var y=0;y<a.attack.length;y++){if((g=a.attack[y])[0]===s&&g[1]===h)break}if(!(y<a.attack.length)){for(y=0;y<t.units.length;y++){var g;if((g=t.units[y]).position[0]===s&&g.position[1]===h&&b(e,g))break}y<t.units.length||a.attack.push([s,h])}}}}return a};function x(t,e){return t[0]===e[0]&&t[1]===e[1]}var A={squares:[0,64,32,16],palette:[0,80,3,3],shadow:[48,64,16,16],arrows:[0,0,64,64],floor:[64,32,16,16],grass:[64,48,16,16],wall:[64,0,16,32],piece:[32,64,16,16],"symbols/shield":[78,72,6,6],"symbols/bow":[72,64,8,8],"symbols/dagger":[78,78,6,6],"symbols/sword":[64,64,8,8],"symbols/axe":[72,72,6,6],"symbols/hat":[72,78,6,6],"symbols/lance":[64,72,8,8]};function I(t,e,a,r,o){var i=document.createElement("canvas"),n=i.getContext("2d");return i.width=r,i.height=o,n.drawImage(t,-e,-a),i}var q={get:function(t,e,a){var r=4*(a*t.width+e),o=t.data[r],i=t.data[r+1],n=t.data[r+2],l=t.data[r+3];return[o,i,n,l]},replace:function(t,e,a){for(var r=0;r<t.data.length;r+=4){for(var o=0;o<4&&t.data[r+o]===e[o];o++);if(4===o)for(var o=0;o<4;o++)t.data[r+o]=a[o]}}};function z(t,e){var a=document.createElement("canvas");return a.width=t,a.height=e,a.getContext("2d")}var i,n={tiles:[{name:"grass",solid:!1},{name:"wall",solid:!0},{name:"floor",solid:!1}],layout:{size:[16,16],data:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]},units:[{class:"knight",faction:"enemy",position:[7,8]},{class:"knight",faction:"enemy",position:[8,8]},{class:"mage",faction:"enemy",position:[5,4]},{class:"warrior",faction:"enemy",position:[10,7]},{class:"warrior",faction:"player",position:[6,11]},{class:"thief",faction:"player",position:[11,12]},{class:"mage",faction:"ally",position:[8,13]}]},l=n.tiles,s=n.layout,f=n.units,u=Object.freeze({default:n,__moduleExports:n,tiles:l,layout:s,units:f}),c={test:u&&n||u};function m(t,e,a){return{context:z(t,e),sprites:a,animation:null}}function we(t,e){return Math.abs(e[0]-t[0])+Math.abs(e[1]-t[1])}m.render=function(t,e){for(var a=t.context,r=t.sprites,o=t.animation,i=e.map,n=e.ranges,l=e.cursor,s=[],f=[],u=[],c=0;c<i.layout.size[1];c++)for(var v=0;v<i.layout.size[0];v++){var d=c*i.layout.size[0]+v,p=i.layout.data[d];i.tiles[p].solid?u.push({id:p,cell:[v,c]}):f.push({id:p,cell:[v,c]})}var h=!0,m=!1,y=void 0;try{for(var g,w=f[Symbol.iterator]();!(h=(g=w.next()).done);h=!0){var b=g.value,x=i.tiles[b.id],k=_slicedToArray(b.cell,2),S=k[0],_=k[1];a.drawImage(r[x.name],16*S,16*_)}}catch(t){m=!0,y=t}finally{try{!h&&w.return&&w.return()}finally{if(m)throw y}}if(o&&o.time++,null!==l.selection){var A=i.units[l.selection];if(o){if("lift"===o.type)o.time<4?o.data.offset=2*o.time:o=t.animation={type:"float",time:0,data:{target:l.selection,offset:0,range:0}};else if("float"===o.type){var I=0,q=n[l.selection],z=!0,T=!1,M=void 0;try{for(var E,L=q.attack[Symbol.iterator]();!(z=(E=L.next()).done);z=!0){for(var D=E.value,C=_slicedToArray(D,2),j=C[0],O=C[1],R=!0,F=0;F<q.move.length;F++){var P=q.move[F].cell;P[0]===j&&P[1]===O&&(R=!1)}R&&(J=we(D,A.position))<=o.time&&s.push({sprite:r.squares.attack,position:[16*j,16*O+1,-1]})}}catch(t){T=!0,M=t}finally{try{!z&&L.return&&L.return()}finally{if(T)throw M}}var X=!0,Y=!1,B=void 0;try{for(var G,H=q.move[Symbol.iterator]();!(X=(G=H.next()).done);X=!0){var J,K=G.value,N=_slicedToArray(K.cell,2),Q=N[0],U=N[1];(J=we(K.cell,A.position))<=o.time&&s.push({sprite:r.squares.move,position:[16*Q,16*U-2,2]}),I<J&&(I=J)}}catch(t){Y=!0,B=t}finally{try{!X&&H.return&&H.return()}finally{if(Y)throw B}}o.data.range=I;var V=null,W=!0,Z=!1,$=void 0;try{for(var tt,et=q.move[Symbol.iterator]();!(W=(tt=et.next()).done);W=!0){var at=tt.value;if(at.cell[0]===l.position[0]&&at.cell[1]===l.position[1]){V=at.path;break}}}catch(t){Z=!0,$=t}finally{try{!W&&et.return&&et.return()}finally{if(Z)throw $}}if(V)for(var rt=0;rt<V.length;rt++){var ot=_slicedToArray(V[rt],2),it=ot[0],nt=ot[1],lt=!1,st=!1,ft=!1,ut=!1,ct=V[rt-1];if(ct){var vt=it-ct[0],dt=nt-ct[1];1===vt?lt=!0:-1===vt&&(st=!0),1===dt?ft=!0:-1===dt&&(ut=!0)}var pt=V[rt+1];if(pt){var ht=pt[0]-it,mt=pt[1]-nt;-1===ht?lt=!0:1===ht&&(st=!0),-1===mt?ft=!0:1===mt&&(ut=!0)}if(lt||st||ft||ut){var yt=null;if(lt&&st?yt="horiz":ft&&ut?yt="vert":ft&&lt?yt="upLeft":ft&&st?yt="upRight":ut&&lt?yt="downLeft":ut&&st?yt="downRight":lt&&!rt?yt="leftStub":st&&!rt?yt="rightStub":ft&&!rt?yt="upStub":ut&&!rt?yt="downStub":lt?yt="left":st?yt="right":ft?yt="up":ut&&(yt="down"),yt){var gt=r.arrows[yt];s.push({sprite:gt,position:[16*it,16*nt+1,-1]})}}}var wt=o.time%180/180;o.data.offset=8+2*Math.sin(2*Math.PI*wt)}}else o=t.animation={type:"lift",time:0,data:{target:l.selection,offset:0}}}else if(o){var bt=i.units[o.data.target];if("move"===o.type)o.time>=4*o.data.path.length-4&&(o=t.animation={type:"drop",time:0,data:{target:o.data.target,offset:8,range:0}});else if("drop"!==o.type)o=t.animation={type:"drop",time:0,data:{target:o.data.target,offset:o.data.offset,range:o.data.range}};else{var xt=n[o.data.target];if(xt){var kt=!0,St=!1,_t=void 0;try{for(var At,It=xt.attack[Symbol.iterator]();!(kt=(At=It.next()).done);kt=!0){for(var qt=At.value,zt=_slicedToArray(qt,2),Tt=zt[0],Mt=zt[1],Et=!0,Lt=0;Lt<xt.move.length;Lt++){var Dt=xt.move[Lt].cell;Dt[0]===Tt&&Dt[1]===Mt&&(Et=!1)}Et&&we(qt,bt.position)<=o.data.range-o.time&&s.push({sprite:r.squares.attack,position:[16*Tt,16*Mt+1,-1]})}}catch(t){St=!0,_t=t}finally{try{!kt&&It.return&&It.return()}finally{if(St)throw _t}}var Ct=!0,jt=!1,Ot=void 0;try{for(var Rt,Ft=xt.move[Symbol.iterator]();!(Ct=(Rt=Ft.next()).done);Ct=!0){var Pt=Rt.value,Xt=_slicedToArray(Pt.cell,2),Yt=Xt[0],Bt=Xt[1];we(Pt.cell,bt.position)<=o.data.range-o.time&&s.push({sprite:r.squares.move,position:[16*Yt,16*Bt-2,2]})}}catch(t){jt=!0,Ot=t}finally{try{!Ct&&Ft.return&&Ft.return()}finally{if(jt)throw Ot}}}o.data.offset-=2,o.data.offset<0&&(o.data.offset=0,t.animation=null)}}var Gt=!0,Ht=!1,Jt=void 0;try{for(var Kt,Nt=u[Symbol.iterator]();!(Gt=(Kt=Nt.next()).done);Gt=!0){var Qt=Kt.value,Ut=_slicedToArray(Qt.cell,2),Vt=Ut[0],Wt=Ut[1];s.push({sprite:r.wall,position:[16*Vt,16*Wt,-8]})}}catch(t){Ht=!0,Jt=t}finally{try{!Gt&&Nt.return&&Nt.return()}finally{if(Ht)throw Jt}}for(var Zt=0;Zt<i.units.length;Zt++){var $t=i.units[Zt],te=16*$t.position[0],ee=16*$t.position[1],ae=0,re=r.pieces[$t.faction][ge.equipment[$t.class]];if(o&&Zt===o.data.target)if(["lift","float","drop"].includes(o.type))ee+=2,ae=-o.data.offset-2;else if("move"===o.type){var oe=Math.floor(o.time/4),ie=o.time%4*.25,ne=o.data.path[oe],le=o.data.path[oe+1];te=16*ne[0],ee=16*ne[1],ae=-8,le&&(te+=(16*le[0]-te)*ie,ee+=(16*le[1]-ee)*ie)}(!o||o&&o.data.target!==Zt||o&&o.data.target===Zt&&o.time%2)&&s.push({sprite:r.shadow,position:[te,ee-2,5]}),s.push({sprite:re,position:[te,ee,ae]})}s.sort(function(t,e){return t.position[1]-e.position[1]});var se=!0,fe=!1,ue=void 0;try{for(var ce,ve=s[Symbol.iterator]();!(se=(ce=ve.next()).done);se=!0){var de=ce.value,pe=_slicedToArray(de.position,3),he=pe[0],me=pe[1],ye=pe[2];a.drawImage(de.sprite,Math.round(he),Math.round(me+ye))}}catch(t){fe=!0,ue=t}finally{try{!se&&ve.return&&ve.return()}finally{if(fe)throw ue}}},(i="sprites.png",new Promise(function(t,e){var a=new Image;a.src=i,a.onload=function(){t(a)},a.onerror=function(){e(new Error("Failed to load image `"+i+"`"))}})).then(function(t){var c=y.map,v=y.ranges,d=y.cursor,e=function(t){var e={};for(var a in A){var r=_slicedToArray(A[a],4),o=r[0],i=r[1],n=r[2],l=r[3];e[a]=I(t,o,i,n,l)}e.squares={attack:I(e.squares,16,0,16,16),move:I(e.squares,0,0,16,16)},e.arrows={left:I(e.arrows,0,0,16,16),right:I(e.arrows,16,0,16,16),up:I(e.arrows,32,0,16,16),down:I(e.arrows,48,0,16,16),leftStub:I(e.arrows,0,16,16,16),rightStub:I(e.arrows,16,16,16,16),upStub:I(e.arrows,32,16,16,16),downStub:I(e.arrows,48,16,16,16),upLeft:I(e.arrows,0,32,16,16),upRight:I(e.arrows,16,32,16,16),downLeft:I(e.arrows,32,32,16,16),downRight:I(e.arrows,48,32,16,16),horiz:I(e.arrows,0,48,16,16),vert:I(e.arrows,16,48,16,16)},e.pieces={player:{},enemy:{},ally:{}};var s=e.palette.getContext("2d").getImageData(0,0,3,3),f={white:[255,255,255,255],cyan:q.get(s,0,0),blue:q.get(s,1,0),navy:q.get(s,2,0),pink:q.get(s,0,1),red:q.get(s,1,1),purple:q.get(s,2,1),lime:q.get(s,0,2),green:q.get(s,1,2),teal:q.get(s,2,2)},u={player:[f.cyan,f.blue,f.navy],enemy:[f.pink,f.red,f.purple],ally:[f.lime,f.green,f.teal]},c=["sword","lance","axe","bow","dagger","shield","hat"];for(var v in u){var d=u[v],p=!0,h=!1,m=void 0;try{for(var y,g=c[Symbol.iterator]();!(p=(y=g.next()).done);p=!0){var w=y.value,b=e["symbols/"+w],x=z(16,16),k=e.piece.getContext("2d").getImageData(0,0,16,16);q.replace(k,f.cyan,d[0]),q.replace(k,f.blue,d[1]),q.replace(k,f.navy,d[2]),x.putImageData(k,0,0);var S=z(b.width,b.height);S.drawImage(b,0,0);var _=S.getImageData(0,0,b.width,b.height);q.replace(_,f.white,d[0]),S.putImageData(_,0,0),x.drawImage(S.canvas,5,5),q.replace(_,d[0],d[2]),S.putImageData(_,0,0),x.drawImage(S.canvas,5,4),e.pieces[v][w]=x.canvas}}catch(t){h=!0,m=t}finally{try{!p&&g.return&&g.return()}finally{if(h)throw m}}}return e}(t),p=m(16*c.layout.size[0],16*c.layout.size[1],e);document.body.appendChild(p.context.canvas);for(var a=0;a<c.units.length;a++){var r=c.units[a];v[a]=h(c,r)}function l(t,e){var a=p.context.canvas,r=a.width,o=a.height;return[Math.floor(t/r*16),Math.floor(e/o*16)]}m.render(p,y),requestAnimationFrame(function t(){m.render(p,y);requestAnimationFrame(t)}),window.addEventListener("mousemove",function(t){var e=p.context.canvas;t.target===e&&(d.position=l(t.offsetX,t.offsetY))}),window.addEventListener("mousedown",function(t){var e=p.context.canvas;if(t.target===e){if(d.position||(d.position=l(t.offsetX,t.offsetY)),p.animation)return;for(var a=_slicedToArray(d.position,2),r=a[0],o=a[1],i=0;i<c.units.length;i++){var n=c.units[i];if(n.position[0]===r&&n.position[1]===o){d.selection=i;break}}}}),window.addEventListener("mouseup",function(t){if(null!==d.selection){var e=c.units[d.selection],a=v[d.selection],r=!0,o=!1,i=void 0;try{for(var n,l=a.move[Symbol.iterator]();!(r=(n=l.next()).done);r=!0){var s=n.value;if(s.cell[0]===d.position[0]&&s.cell[1]===d.position[1]){e.position=d.position,p.animation={type:"move",time:0,data:{target:d.selection,path:s.path}};for(var f=0;f<c.units.length;f++){var u=c.units[f];v[f]=h(c,u)}break}}}catch(t){o=!0,i=t}finally{try{!r&&l.return&&l.return()}finally{if(o)throw i}}d.selection=null}})});var y={map:c.test,ranges:[],cursor:{position:null,selection:null}}}();