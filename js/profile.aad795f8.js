(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["profile"],{c66d:function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("title-bar",{attrs:{"title-stack":t.titleStack}}),e("hero-bar",[e("router-link",{staticClass:"button",attrs:{slot:"right",to:"/"},slot:"right"},[t._v(" Dashboard ")])],1),e("section",{staticClass:"section is-main-section"},[e("tiles",[e("profile-update-form",{staticClass:"tile is-child"}),e("card-component",{staticClass:"tile is-child",attrs:{title:"Perfil",icon:"account"}},[e("user-avatar",{staticClass:"image has-max-width is-aligned-center"}),e("hr"),e("b-field",{attrs:{label:"Nombre"}},[e("b-input",{attrs:{value:t.userName,"custom-class":"is-static",readonly:""}})],1),e("hr"),e("b-field",{attrs:{label:"Correo"}},[e("b-input",{attrs:{value:t.userEmail,"custom-class":"is-static",readonly:""}})],1),e("hr"),e("b-field",{attrs:{label:"Hospital"}},[e("b-input",{attrs:{value:t.userCompany,"custom-class":"is-static",readonly:""}})],1)],1)],1),e("password-update-form")],1)],1)},r=[],o=e("5530"),i=e("2f62"),n=e("6df7"),l=e("1e1d"),u=e("503b"),c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("card-component",{attrs:{title:"Editar Perfil",icon:"account-circle"}},[e("form",{on:{submit:function(a){return a.preventDefault(),t.submit(a)}}},[e("b-field",{attrs:{horizontal:"",label:"Avatar"}},[e("file-picker")],1),e("hr"),e("b-field",{attrs:{horizontal:"",label:"Nombre",message:"Campo Requerido"}},[e("b-input",{attrs:{name:"name",required:""},model:{value:t.form.name,callback:function(a){t.$set(t.form,"name",a)},expression:"form.name"}})],1),e("b-field",{attrs:{horizontal:"",label:"Correo",message:"Campo Requerido"}},[e("b-input",{attrs:{name:"email",type:"email",required:""},model:{value:t.form.email,callback:function(a){t.$set(t.form,"email",a)},expression:"form.email"}})],1),e("hr"),e("b-field",{attrs:{horizontal:""}},[e("div",{staticClass:"control footer-menu-profile"},[e("button",{staticClass:"button is-success",class:{"is-loading":t.isLoading},attrs:{type:"submit"}},[t._v(" Guardar ")]),e("router-link",{staticClass:"button is-danger",attrs:{slot:"right",to:"/"},slot:"right"},[t._v(" Cancelar ")])],1)])],1)])},m=[],d=(e("b0c0"),e("3b73")),p={name:"ProfileUpdateForm",components:{CardComponent:n["a"],FilePicker:d["a"]},data:function(){return{isFileUploaded:!1,isLoading:!1,form:{name:null,email:null}}},computed:Object(o["a"])({},Object(i["b"])(["userName","userEmail"])),watch:{userName:function(t){this.form.name=t},userEmail:function(t){this.form.email=t}},mounted:function(){this.form.name=this.userName,this.form.email=this.userEmail},methods:{submit:function(){var t=this;this.isLoading=!0,this.$store.dispatch("updateUser",{username:this.form.name,email:this.form.email}).then((function(){setTimeout((function(){t.isLoading=!1,t.$store.commit("user",t.form),t.$buefy.snackbar.open({message:"Updated",queue:!1})}),500)})).catch((function(){t.isLoading=!1}))}}},f=p,b=e("2877"),h=Object(b["a"])(f,c,m,!1,null,null,null),w=h.exports,C=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("card-component",{attrs:{title:"Actualizar Contraseña",icon:"lock"}},[e("form",{on:{submit:function(a){return a.preventDefault(),t.submit(a)}}},[e("b-field",{attrs:{horizontal:"",label:"Contraseña Actual",message:"Campo Requerido"}},[e("b-input",{attrs:{name:"password_current",type:"password",required:"",autcomplete:"current-password"},model:{value:t.form.password_current,callback:function(a){t.$set(t.form,"password_current",a)},expression:"form.password_current"}})],1),e("hr"),e("b-field",{attrs:{horizontal:"",label:"Nueva Contraseña",message:"Campo Requerido"}},[e("b-input",{attrs:{name:"password",type:"password",required:"",autocomplete:"new-password"},model:{value:t.form.password,callback:function(a){t.$set(t.form,"password",a)},expression:"form.password"}})],1),e("b-field",{attrs:{horizontal:"",label:"Confirmar Nueva Contraseña",message:"Campo Requerido"}},[e("b-input",{attrs:{name:"password_confirmation",type:"password",required:"",autocomplete:"new-password"},model:{value:t.form.password_confirmation,callback:function(a){t.$set(t.form,"password_confirmation",a)},expression:"form.password_confirmation"}})],1),e("hr"),e("b-field",{attrs:{horizontal:""}},[e("div",{staticClass:"control footer-menu-profile"},[e("button",{staticClass:"button is-success",class:{"is-loading":t.isLoading},attrs:{disabled:t.samePassword,type:"submit"}},[t._v(" Guardar ")]),e("router-link",{staticClass:"button is-danger",attrs:{slot:"right",to:"/"},slot:"right"},[t._v(" Cancelar ")])],1)])],1)])},g=[],v=e("bc3a"),_=e.n(v),k={name:"PasswordUpdateForm",components:{CardComponent:n["a"]},data:function(){return{isLoading:!1,form:{password_current:null,password:null,password_confirmation:null}}},computed:{samePassword:function(){return null===this.form.password||(null===this.form.password_current||this.form.password!==this.form.password_confirmation)}},methods:{submit:function(){var t=this;this.isLoading=!0,_()({method:"PUT",url:"https://patas-app.herokuapp.com/api/doctor/update/password/".concat(this.$store.state.userId),headers:{"x-access-token":localStorage.getItem("jwt")},data:{password:this.form.password_current,newPassword:this.form.password}}).then((function(){setTimeout((function(){t.isLoading=!1,t.$buefy.snackbar.open({message:"Updated",queue:!1},500)}))})).catch((function(){t.$buefy.snackbar.open({message:"Error",queue:!1},500),t.isLoading=!1}))}}},y=k,$=Object(b["a"])(y,C,g,!1,null,null,null),q=$.exports,P=e("9e7c"),x=e("808f"),E={name:"Profile",components:{UserAvatar:x["a"],Tiles:P["a"],PasswordUpdateForm:q,ProfileUpdateForm:w,HeroBar:u["a"],TitleBar:l["a"],CardComponent:n["a"]},computed:Object(o["a"])({titleStack:function(){return["Perfil"]}},Object(i["b"])(["userName","userEmail","userCompany"]))},L=E,U=Object(b["a"])(L,s,r,!1,null,null,null);a["default"]=U.exports}}]);
//# sourceMappingURL=profile.aad795f8.js.map