(this.webpackJsonpprojet_tut=this.webpackJsonpprojet_tut||[]).push([[0],{102:function(e,n,t){},103:function(e,n,t){},108:function(e,n,t){},109:function(e,n,t){},110:function(e,n,t){},113:function(e,n,t){"use strict";t.r(n);var c=t(2),i=t(0),a=t.n(i),o=t(10),r=t.n(o),l=(t(102),t(62)),s=t(90),j=t(23),d=t(11),u=t(33),m=t(89),b=t(160),x=t(27),O=t(153),f=t(78),h=t.n(f),g=t(76),p=t.n(g),v=t(77),y=t.n(v),C=t(161),N=t(63),F=t(152),M=t(164),k=t(154),w=t(155),T=t(75),z=t.n(T),S=t(65),A=t.n(S),B=t(74),I=t.n(B);t(103);function D(e){return Object(c.jsxs)("div",{className:"container",children:[e.item.modif?Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(C.a,{className:"center fieldFormule",multiline:!0,label:"Nom formule",variant:"outlined",size:"small",value:e.item.nomFormule,onChange:function(n){return e.onChange(n,void 0)}}),Object(c.jsx)(A.a,{className:"center"}),Object(c.jsx)(C.a,{className:"center",multiline:!0,label:"formule",variant:"outlined",size:"small",value:e.item.formule,onChange:function(n){return e.onChange(void 0,n)}}),Object(c.jsx)(F.a,{className:"buttonItem center ButtonEnregistrer",variant:"contained",onClick:function(n){return e.changeModif()},children:"Enregistrer"})]}):Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(N.a,{className:"typoFormule",children:e.item.nomFormule}),Object(c.jsx)(A.a,{className:"center"}),Object(c.jsx)(N.a,{className:"typoFormule",children:e.item.formule}),Object(c.jsx)(F.a,{className:"buttonItem center",variant:"contained",onClick:function(n){return e.changeModif()},children:"Modifier"})]}),Object(c.jsx)(O.a,{className:"center",size:"small",color:"secondary","aria-label":"add",onClick:function(n){return e.removeTodo()},children:Object(c.jsx)(I.a,{className:"center"})})]},e.item.index)}t(108);function L(){var e=Object(i.useState)([{nomFormule:"",formule:"",modif:!0,index:0}]),n=Object(j.a)(e,2),t=n[0],a=n[1];return Object(c.jsxs)("div",{children:[t.map((function(e){return Object(c.jsx)(D,{item:e,removeTodo:function(n){return function(e){if(t.length>1){var n=Object(x.a)(t),c=t.indexOf(e);n.splice(c,1),a(n)}}(e)},onChange:function(n,c){return function(e,n,c){var i=Object(x.a)(t),o=t.indexOf(e);i[o]={nomFormule:"undefined"!==typeof n?n.target.value:i[o].nomFormule,formule:"undefined"!==typeof c?c.target.value:i[o].formule,modif:i[o].modif,index:i[o].index},a(i)}(e,n,c)},changeModif:function(n){return function(e){var n=Object(x.a)(t),c=t.indexOf(e);n[c]={nomFormule:n[c].nomFormule,formule:n[c].formule,modif:!n[c].modif,index:t[c].index},a(n)}(e)}})})),Object(c.jsx)(F.a,{className:"buttonAjouterFormule",variant:"outlined",color:"primary",onClick:function(e){e.preventDefault(),0!==t.length&&(t[t.length-1]={nomFormule:t[t.length-1].nomFormule,formule:t[t.length-1].formule,modif:!1,index:t[t.length-1].index}),a([].concat(Object(x.a)(t),[{nomFormule:"",formule:"",modif:!0,index:0===t.length?0:t[t.length-1].index+1}]))},children:"Ajouter des formules"})]})}function q(){var e=Object(i.useState)(!0),n=Object(j.a)(e,2),t=n[0],a=n[1];return Object(c.jsxs)(M.a,{style:{marginTop:15},square:!0,expanded:t,onChange:function(e){return a(!t)},children:[Object(c.jsx)(k.a,{expandIcon:Object(c.jsx)(z.a,{})}),Object(c.jsx)(w.a,{style:{display:"flex",flexDirection:"column"},children:Object(c.jsx)(L,{})})]})}t(109);function E(e){return Object(c.jsxs)("div",{className:"divItemAccordeon",children:[Object(c.jsxs)("div",{className:"enteteItemAccordeon",children:[e.item.modif?Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(C.a,{className:"fieldNomCategorie",multiline:!0,label:"Nom cat\xe9gorie",variant:"outlined",size:"small",value:e.item.nom,onChange:function(n){return e.onChange(n)}}),Object(c.jsx)(O.a,{size:"small",color:"primary","aria-label":"add",onClick:function(n){return e.changeModif()},children:Object(c.jsx)(p.a,{})})]}):Object(c.jsxs)(c.Fragment,{children:[Object(c.jsx)(N.a,{className:"textNomCategorie",children:e.item.nom}),Object(c.jsx)(O.a,{size:"small",color:"secondary","aria-label":"add",onClick:function(n){return e.changeModif()},children:Object(c.jsx)(y.a,{})})]}),Object(c.jsx)(F.a,{variant:"contained",color:"secondary",onClick:function(n){return e.removeTodo()},children:"Supprimer la cat\xe9gorie"})]}),Object(c.jsx)(q,{nom:e.item.nom,onChange:function(n){return e.onChange(n)}})]},e.item.index)}function G(){var e=Object(i.useState)([{nom:"",modif:!0,index:0}]),n=Object(j.a)(e,2),t=n[0],a=n[1];return Object(c.jsxs)("div",{children:[Object(c.jsx)(O.a,{style:{marginLeft:"5%"},size:"small",color:"primary","aria-label":"add",onClick:function(e){return e.preventDefault(),void a([].concat(Object(x.a)(t),[{nom:"",modif:!0,index:0===t.length?0:t[t.length-1].index+1}]))},children:Object(c.jsx)(h.a,{})}),t.map((function(e){return Object(c.jsx)(E,{item:e,removeTodo:function(n){return function(e){if(t.length>1){var n=Object(x.a)(t),c=t.indexOf(e);n.splice(c,1),a(n)}}(e)},onChange:function(n){return function(e,n){var c=Object(x.a)(t),i=t.indexOf(e);c[i]={nom:n.target.value,modif:c[i].modif,index:c[i].index},a(c)}(e,n)},changeModif:function(n){return function(e){var n=Object(x.a)(t),c=t.indexOf(e);n[c]={nom:n[c].nom,modif:!n[c].modif,index:n[c].index},a(n)}(e)}})}))]})}var J=t(151),P=t(156),R=t(157),_=t(158),H=t(159),K=t(114),Q=t(162),U=t(79),V=t.n(U),W=t(80),X=t.n(W),Y=t(81),Z=t.n(Y),$=t(82),ee=t.n($),ne=t(83),te=t.n(ne);t(110);function ce(){var e=Object(i.useState)(!1),n=Object(j.a)(e,2),t=n[0],a=n[1];return Object(c.jsxs)("div",{style:{marginBottom:100},children:[Object(c.jsx)(K.a,{id:"burger",onClick:function(e){return a(!0)},children:Object(c.jsx)(te.a,{fontSize:"large"})}),Object(c.jsx)(Q.a,{open:t,onClose:function(e){return a(!1)},children:Object(c.jsxs)("nav",{id:"divNavBar",children:[Object(c.jsx)(J.a,{children:Object(c.jsx)(u.b,{className:"lienNavBar",to:"/",children:Object(c.jsxs)(P.a,{button:!0,children:[Object(c.jsx)(R.a,{children:Object(c.jsx)(V.a,{})}),Object(c.jsx)(_.a,{children:"Accueil"})]})})}),Object(c.jsx)(H.a,{}),Object(c.jsxs)(J.a,{children:[Object(c.jsx)(u.b,{className:"lienNavBar",to:"/creation-sujets",children:Object(c.jsxs)(P.a,{button:!0,children:[Object(c.jsx)(R.a,{children:Object(c.jsx)(X.a,{})}),Object(c.jsx)(_.a,{children:"Cr\xe9ation des sujets"})]})}),Object(c.jsx)(u.b,{className:"lienNavBar",to:"/gestion-sujets",children:Object(c.jsxs)(P.a,{button:!0,children:[Object(c.jsx)(R.a,{children:Object(c.jsx)(Z.a,{})}),Object(c.jsx)(_.a,{children:"Gestion des sujets"})]})})]}),Object(c.jsx)(H.a,{}),Object(c.jsx)(J.a,{children:Object(c.jsx)(u.b,{className:"lienNavBar",to:"/gestion-correction",children:Object(c.jsxs)(P.a,{button:!0,children:[Object(c.jsx)(R.a,{children:Object(c.jsx)(ee.a,{})}),Object(c.jsx)(_.a,{children:"Gestion de la correction"})]})})})]})})]})}var ie=t(84),ae=t.n(ie),oe=t(85),re=t.n(oe),le=t(86),se=t.n(le),je=t(87),de=t.n(je);function ue(e){var n=Object(i.useState)({login:"",mdp:"",showMdp:!1}),t=Object(j.a)(n,2),a=t[0],o=t[1];return Object(c.jsxs)("div",{style:{marginTop:50,display:"flex",flexDirection:"column"},children:[Object(c.jsxs)("div",{style:{display:"flex",flexDirection:"column",height:"120px",margin:"auto"},children:[Object(c.jsxs)("div",{style:{display:"flex"},children:[Object(c.jsx)(ae.a,{style:{marginRight:25,marginTop:6}}),Object(c.jsx)(C.a,{size:"small",required:!0,multiline:!0,value:a.login,onChange:function(e){return function(e){o({login:e.target.value,mdp:a.mdp,showMdp:a.showMdp})}(e)},label:"Login",variant:"outlined"})]}),Object(c.jsxs)("div",{style:{display:"flex",marginTop:20},children:[Object(c.jsx)(re.a,{style:{marginRight:25,marginTop:6}}),Object(c.jsxs)("div",{children:[Object(c.jsx)(C.a,{label:"Mot de passe",size:"small",type:a.showMdp?"text":"password",variant:"outlined",value:a.mdp,onChange:function(e){return function(e){o({login:a.login,mdp:e.target.value,showMdp:a.showMdp})}(e)},required:!0}),Object(c.jsx)(K.a,{onClick:function(e){return o({login:a.login,mdp:a.mdp,showMdp:!a.showMdp}),void console.log(a.showMdp)},children:a.showMdp?Object(c.jsx)(se.a,{}):Object(c.jsx)(de.a,{})})]})]})]}),Object(c.jsx)(F.a,{style:{margin:"50px auto"},variant:"outlined",color:"primary",onClick:function(n){""!==a.mdp&&""!==a.login&&e.changeAuthentif()},children:"Connexion"})]})}var me=t(88),be=t.n(me);function xe(e){return Object(c.jsx)("div",{style:{position:"absolute",right:30,top:30},children:Object(c.jsx)(F.a,{variant:"contained",color:"secondary",startIcon:Object(c.jsx)(be.a,{}),onClick:function(n){return e.changeAuthentif()},children:"D\xe9connexion"})})}var Oe=Object(m.a)({palette:{primary:{main:"#075b72"},secondary:{main:"#c51150"},error:{main:"#c51150"}}});var fe=function(){var e=Object(i.useState)(!1),n=Object(j.a)(e,2),t=n[0],a=n[1],o=function(){a(!t)},r=function(e){var n=e.component,i=Object(s.a)(e,["component"]);return Object(c.jsx)(d.b,Object(l.a)(Object(l.a)({},i),{},{render:function(e){return!0===t?Object(c.jsx)(n,Object(l.a)({},e)):Object(c.jsx)(d.a,{to:"/login"})}}))},m=function(){var e=Object(d.f)();return t?"/login"===e.pathname?Object(c.jsx)(d.a,{to:"/"}):Object(c.jsx)(c.Fragment,{}):null};return Object(c.jsx)(b.a,{theme:Oe,children:Object(c.jsxs)(u.a,{children:[Object(c.jsx)(m,{}),Object(c.jsx)(d.b,{exact:!0,path:"/login",children:Object(c.jsx)(ue,{changeAuthentif:function(e){return o()}})}),Object(c.jsx)(r,{path:"/",component:ce}),Object(c.jsx)(r,{exact:!0,path:"/",children:Object(c.jsx)(xe,{changeAuthentif:function(e){return o()}})}),Object(c.jsx)(r,{exact:!0,path:"/creation-sujets",component:G})]})})},he=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,166)).then((function(n){var t=n.getCLS,c=n.getFID,i=n.getFCP,a=n.getLCP,o=n.getTTFB;t(e),c(e),i(e),a(e),o(e)}))};r.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(fe,{})}),document.getElementById("root")),he()}},[[113,1,2]]]);
//# sourceMappingURL=main.3f5961e2.chunk.js.map