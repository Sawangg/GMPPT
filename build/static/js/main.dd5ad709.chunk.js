(this.webpackJsonpprojet_tut=this.webpackJsonpprojet_tut||[]).push([[0],{52:function(e,n,t){},70:function(e,n,t){},75:function(e,n,t){},76:function(e,n,t){"use strict";t.r(n);var i=t(4),o=t(0),r=t.n(o),a=t(9),c=t.n(a),l=(t(70),t(14)),s=t(26),d=t(112),u=t(110),m=t(109),j=t(108),f=t(58),x=t.n(f),b=t(56),O=t.n(b),h=t(57),g=t.n(h),p=t(113),v=t(114),y=t(111),C=t(55),F=t.n(C),k=t(54),w=t.n(k),N=t(46),z=t.n(N);function S(e){return Object(i.jsx)(i.Fragment,{children:e.modif?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(d.a,{className:"center",multiline:!0,label:"Nom formule",variant:"outlined",size:"small",value:e.nomFormule,onChange:function(n){return e.onChange(n,void 0)}}),Object(i.jsx)(z.a,{className:"center"}),Object(i.jsx)(d.a,{className:"center",multiline:!0,label:"formule",variant:"outlined",size:"small",value:e.formule,onChange:function(n){return e.onChange(void 0,n)}}),Object(i.jsx)(j.a,{className:"buttonItem center",variant:"contained",color:"primary",onClick:function(n){return e.changeModif()},children:"Enregistrer"})]}):Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(m.a,{style:{marginTop:8,overflowWrap:"break-word"},children:e.formule}),Object(i.jsx)(z.a,{className:"center"}),Object(i.jsx)(m.a,{style:{marginTop:8,overflowWrap:"break-word"},children:e.nomFormule}),Object(i.jsx)(j.a,{className:"buttonItem center",variant:"contained",onClick:function(n){return e.changeModif()},children:"Modifier"})]})})}t(52);function T(e){var n=Object(o.useState)([{nomFormule:"",formule:"",modif:!0,index:0}]),t=Object(s.a)(n,2),r=t[0],a=t[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)(j.a,{style:{margin:"0px 50px",width:"250px"},variant:"outlined",color:"primary",onClick:function(e){e.preventDefault(),0!==r.length&&(r[r.length-1]={nomFormule:r[r.length-1].nomFormule,formule:r[r.length-1].formule,modif:!1,index:r[r.length-1].index}),a([].concat(Object(l.a)(r),[{nomFormule:"",formule:"",modif:!0,index:0===r.length?0:r[r.length-1].index+1}]))},children:"Ajouter des formules"}),r.map((function(e){return Object(i.jsxs)("div",{className:"container",children:[Object(i.jsx)(S,{nomFormule:e.nomFormule,formule:e.formule,modif:e.modif,onChange:function(n,t){return function(e,n,t){var i=Object(l.a)(r),o=r.indexOf(e);i[o]={nomFormule:"undefined"!==typeof n?n.target.value:i[o].nomFormule,formule:"undefined"!==typeof t?t.target.value:i[o].formule,modif:i[o].modif,index:i[o].index},a(i)}(e,n,t)},changeModif:function(n){return function(e){var n=Object(l.a)(r),t=r.indexOf(e);n[t]={nomFormule:n[t].nomFormule,formule:n[t].formule,modif:!n[t].modif,index:r[t].index},a(n)}(e)}}),Object(i.jsx)(u.a,{className:"center",size:"small",color:"secondary","aria-label":"add",onClick:function(n){return function(e){var n=Object(l.a)(r),t=r.indexOf(e);n.splice(t,1),a(n)}(e)},children:Object(i.jsx)(w.a,{className:"center"})})]},e.index)}))]})}function I(e){var n,t=Object(o.useState)("panel"),r=Object(s.a)(t,2),a=r[0],c=r[1];return Object(i.jsxs)(p.a,{style:{marginTop:15},square:!0,expanded:"panel"===a,onChange:(n="panel",function(e,t){c(!!t&&n)}),children:[Object(i.jsx)(v.a,{expandIcon:Object(i.jsx)(F.a,{})}),Object(i.jsx)(y.a,{style:{display:"flex",flexDirection:"column"},children:Object(i.jsx)(T,{})})]})}function M(){var e=Object(o.useState)([{nom:"",modif:!0,index:0}]),n=Object(s.a)(e,2),t=n[0],r=n[1],a=function(e,n){var i=Object(l.a)(t),o=t.indexOf(e);i[o]={nom:n.target.value,modif:i[o].modif,index:i[o].index},r(i)},c=function(e){var n=Object(l.a)(t),i=t.indexOf(e);n[i]={nom:n[i].nom,modif:!n[i].modif,index:n[i].index},r(n)};return Object(i.jsxs)("div",{style:{width:"100%"},children:[Object(i.jsx)("form",{noValidate:!0,autoComplete:"off",style:{margin:40},children:Object(i.jsx)(u.a,{style:{marginLeft:20},size:"small",color:"primary","aria-label":"add",onClick:function(e){return e.preventDefault(),void r([].concat(Object(l.a)(t),[{nom:"",modif:!0,index:0===t.length?0:t[t.length-1].index+1}]))},children:Object(i.jsx)(x.a,{})})}),t.map((function(e){return Object(i.jsxs)("div",{className:"todoList",children:[Object(i.jsxs)("div",{style:{display:"flex",width:"80%",justifyContent:"space-between"},children:[e.modif?Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(d.a,{style:{width:200},multiline:!0,label:"Nom de la cat\xe9gorie",variant:"outlined",size:"small",value:e.nom,onChange:function(n){return a(e,n)}}),Object(i.jsx)(u.a,{size:"small",color:"primary","aria-label":"add",onClick:function(n){return c(e)},children:Object(i.jsx)(O.a,{})})]}):Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)(m.a,{style:{marginTop:8,width:200},children:e.nom}),Object(i.jsx)(u.a,{size:"small",color:"secondary","aria-label":"add",onClick:function(n){return c(e)},children:Object(i.jsx)(g.a,{})})]}),Object(i.jsx)(j.a,{style:{display:"flex",justifyContent:"space-around"},variant:"contained",color:"secondary",onClick:function(n){return function(e){var n=Object(l.a)(t),i=t.indexOf(e);n.splice(i,1),r(n)}(e)},children:"Supprimer la cat\xe9gorie"})]}),Object(i.jsx)(I,{nom:e.nom,onChange:function(n){return a(e,n)}})]},e.index)}))]})}t(75);var D=function(){return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(M,{})})},L=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,116)).then((function(n){var t=n.getCLS,i=n.getFID,o=n.getFCP,r=n.getLCP,a=n.getTTFB;t(e),i(e),o(e),r(e),a(e)}))};c.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(D,{})}),document.getElementById("root")),L()}},[[76,1,2]]]);
//# sourceMappingURL=main.dd5ad709.chunk.js.map