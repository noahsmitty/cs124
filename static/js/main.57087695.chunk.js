(this.webpackJsonplab2=this.webpackJsonplab2||[]).push([[0],{37:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},49:function(e,t,n){},51:function(e,t,n){},54:function(e,t,n){"use strict";n.r(t);var c=n(19),i=n.n(c),o=n(39),s=n.n(o),a=(n(47),n(5)),r=n(40),l=n(15),d=(n(48),n(49),n.p+"static/media/edit_pencil.eea4cb1a.png"),u=n(14);var j=function(e){return Object(u.jsx)("div",{className:"item",children:Object(u.jsxs)("div",{className:"1"===e.priority?"high":"2"===e.priority?"medium":"low",children:[Object(u.jsx)("input",{type:"checkbox",className:"checkbox",id:e.id,checked:e.isCompleted,onChange:function(t){return e.onItemChange(e.id,"isCompleted",t.target.checked)}}),Object(u.jsx)("label",{htmlFor:e.id,className:"label",value:e.description,children:e.description}),Object(u.jsx)("button",{className:"editButton",children:Object(u.jsx)("img",{src:d,height:"25",width:"25",alt:"edit-icon",className:"edit",onClick:function(){e.onButtonClick(),e.onPassID(e.id)}})})]})})};var b=function(e){return Object(u.jsx)("div",{className:"list",children:e.todo.map((function(t){return Object(u.jsx)(j,{id:t.id,description:t.description,isCompleted:t.isCompleted,date:t.creationDate,priority:t.priority,onItemChange:e.onItemChange,onButtonClick:function(){return e.onButtonClick()},onPassID:e.onPassID},t.id)}))})},p=(n(37),n(41));function h(e){var t=Object(c.useState)(""),n=Object(l.a)(t,2),i=n[0],o=n[1],s=Object(c.useState)("1"),a=Object(l.a)(s,2),r=a[0],d=a[1];return Object(u.jsxs)("div",{id:"list",children:[Object(u.jsx)("input",{type:"text",id:"task-description",placeholder:"task description",onChange:function(e){return o(e.currentTarget.value)}}),Object(u.jsxs)("select",{id:"priority",onChange:function(e){return d(e.currentTarget.value)},children:[Object(u.jsx)("option",{value:1,children:"High"}),Object(u.jsx)("option",{value:2,children:"Medium"}),Object(u.jsx)("option",{value:3,children:"Low"})]}),Object(u.jsx)("input",{className:"button",type:"submit",id:"submit-task",value:"add task",onClick:function(){return e.onSubmit(i,r)}})]})}n(51);var O=function(e){var t=Object(c.useState)(""),n=Object(l.a)(t,2),i=n[0],o=n[1],s=Object(c.useState)("1"),a=Object(l.a)(s,2),r=a[0],d=a[1];return Object(u.jsx)("div",{className:"backdrop",children:Object(u.jsxs)("div",{className:"modal",children:["Enter a new name for your item:",Object(u.jsxs)("div",{className:"text",children:[Object(u.jsx)("input",{type:"text",className:"enter_description",placeholder:"Enter New Description",onChange:function(e){return o(e.currentTarget.value)}}),Object(u.jsxs)("select",{className:"select",onChange:function(e){return d(e.currentTarget.value)},children:[Object(u.jsx)("option",{value:1,children:"High"}),Object(u.jsx)("option",{value:2,children:"Medium"}),Object(u.jsx)("option",{value:3,children:"Low"})]})]}),Object(u.jsxs)("div",{className:"alert-buttons",children:[Object(u.jsx)("button",{className:"alert-button",type:"button",onClick:e.onClose,children:"Cancel"}),Object(u.jsx)("button",{className:"alert-button",type:"button",onClick:function(){e.onClose(),e.onOK(i,r)},children:"OK"})]})]})})},m=n(36),x=n(42);m.a.initializeApp({apiKey:"AIzaSyDcjlwvBtxAl8BKu_8evho99ks_6MBiWZo",authDomain:"nskr-124lab4.firebaseapp.com",projectId:"nskr-124lab4",storageBucket:"nskr-124lab4.appspot.com",messagingSenderId:"613050589081",appId:"1:613050589081:web:d234d16f271e4ebe1ffd08",measurementId:"G-6XSHMJM1HG"});var f=m.a.firestore(),v="List";var C=function(e){var t=f.collection(v),n=Object(c.useState)("description"),i=Object(l.a)(n,2),o=i[0],s=i[1],d=Object(x.a)(t.orderBy(o,"asc")),j=Object(l.a)(d,3),m=j[0],C=(j[1],j[2],Object(c.useState)(!0)),g=Object(l.a)(C,2),k=g[0],y=g[1],N=Object(c.useState)(!1),S=Object(l.a)(N,2),I=S[0],D=S[1],B=Object(c.useState)(""),w=Object(l.a)(B,2),T=w[0],P=w[1],F=[];function L(){D(!I)}return m&&(F=m.docs.map((function(e){return Object(r.a)({},e.data())}))),Object(u.jsxs)("div",{className:"todo",children:[Object(u.jsxs)("div",{children:[Object(u.jsx)("h1",{children:"TO-DO LIST"}),Object(u.jsxs)("div",{className:k?"visible":null,children:[F.filter((function(e){return e.isCompleted})).length>0?Object(u.jsx)("button",{className:"button",type:"button",onClick:function(){y(!k)},children:k?"Hide Completed":"Show Completed"}):null,k&&F.filter((function(e){return e.isCompleted})).length>0?Object(u.jsx)("button",{className:"button",type:"button",onClick:function(){F.forEach((function(e){return e.isCompleted&&f.collection(v).doc(e.id).delete()}))},children:"Delete Completed"}):null]}),Object(u.jsxs)("div",{className:"sorting",children:[Object(u.jsx)("label",{id:"sort",htmlFor:"sort-by",children:"Sort By"}),Object(u.jsxs)("select",{id:"sort-by",onChange:function(e){return s(e.currentTarget.value)},children:[Object(u.jsx)("option",{value:"priority",children:"Priority"}),Object(u.jsx)("option",{value:"description",children:"Name"}),Object(u.jsx)("option",{value:"creationDate",children:"Creation Date"})]})]}),Object(u.jsx)(h,{data:F,onSubmit:function(e,n){var c={id:Object(p.a)(),description:e,isCompleted:!1,creationDate:Date.now(),priority:n};t.doc(c.id).set(c)}}),F&&Object(u.jsx)(b,{todo:k?F:F.filter((function(e){return!e.isCompleted})),onItemChange:function(e,t,n){f.collection(v).doc(e).update(Object(a.a)({},t,n))},onButtonClick:L,onPassID:function(e){P(e)}})]}),I&&Object(u.jsx)(O,{onClose:L,onOK:function(e,t){f.collection(v).doc(T).update({description:e,priority:t})}})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,55)).then((function(t){var n=t.getCLS,c=t.getFID,i=t.getFCP,o=t.getLCP,s=t.getTTFB;n(e),c(e),i(e),o(e),s(e)}))};s.a.render(Object(u.jsx)(i.a.StrictMode,{children:Object(u.jsx)(C,{})}),document.getElementById("root")),g()}},[[54,1,2]]]);
//# sourceMappingURL=main.57087695.chunk.js.map