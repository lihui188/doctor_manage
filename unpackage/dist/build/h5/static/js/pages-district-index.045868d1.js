(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-district-index"],{"06aa":function(e,t,i){"use strict";var n=i("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("e143")),o=new a.default,c=o;t.default=c},"58e3":function(e,t,i){"use strict";var n=i("fa0f"),a=i.n(n);a.a},6338:function(e,t,i){"use strict";var n,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"content"},[n("v-uni-view",[n("v-uni-view",{ref:"topTitleBox",staticClass:"topTitleBox",style:{"padding-top":"calc("+(e.topHeight-5)+"px  + 22upx)"}},[n("v-uni-image",{staticClass:"arrow",attrs:{src:i("d2b2")},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back()}}}),n("v-uni-view",{staticClass:"title"},[e._v("选择地区")])],1),n("v-uni-view",{ref:"headPlaceBox",staticClass:"headPlaceBox",style:{"margin-top":"calc("+(e.topHeight-5)+"px)"}},[n("v-uni-view",{staticClass:"title"},[e._v("确认")])],1)],1),n("v-uni-view",{staticClass:"textBox"},e._l(e.provinceList,(function(t,i){return n("v-uni-view",{staticClass:"selectProvince",on:{click:function(n){arguments[0]=n=e.$handleEvent(n),e.selectProvince(t.value,i)}}},[n("v-uni-view",[e._v(e._s(t.name))])],1)})),1),e.flag?n("v-uni-view",{staticClass:"backTopBox",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.top()}}},[n("v-uni-view",{staticClass:"backTop"},[n("v-uni-image",{staticClass:"img",attrs:{src:i("fec6")}}),n("v-uni-view",{staticClass:"text"},[e._v("回到顶点")])],1)],1):e._e()],1)},o=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}))},6795:function(e,t,i){"use strict";i.r(t);var n=i("e75b"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},"89ce":function(e,t,i){"use strict";i.r(t);var n=i("6338"),a=i("6795");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("58e3");var c,s=i("f0c5"),r=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"371e152a",null,!1,n["a"],c);t["default"]=r.exports},e75b:function(e,t,i){"use strict";var n=i("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("eaad")),o=n(i("06aa")),c={components:{},data:function(){return{flag:!1,provinceList:a.default,selectIndex:"",province:""}},onLoad:function(){},methods:{selectProvince:function(e,t){this.selectIndex=t,this.province=e,o.default.$emit("getProvince",this.province),uni.navigateBack()},onPageScroll:function(e){e.scrollTop>300?this.flag=!0:this.flag=!1},top:function(){uni.pageScrollTo({scrollTop:0,duration:300})},cancel:function(){this.province="",uni.navigateBack()},confirm:function(){""!==this.province||uni.showToast({title:"请选择一个省份",icon:"none"})}}};t.default=c},f894:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.topTitleBox[data-v-371e152a]{width:100%;top:0;z-index:99;background-color:#fff;position:fixed;box-shadow:rgba(0,0,0,.2) 0 1px 5px 0;padding:0 %?12?% %?18?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.topTitleBox .arrow[data-v-371e152a]{width:%?60?%;height:%?60?%;position:absolute;left:0}.topTitleBox .title[data-v-371e152a]{height:%?50?%;font-size:%?32?%;color:#000;font-weight:700}.headPlaceBox[data-v-371e152a]{width:100%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.headPlaceBox .arrow[data-v-371e152a]{width:%?60?%;height:%?60?%;position:absolute;left:0}.headPlaceBox .title[data-v-371e152a]{font-size:%?32?%;color:#000;font-weight:700}.fixedImg[data-v-371e152a]{width:100%;height:%?506?%;position:fixed;bottom:0;z-index:-1}.textBox[data-v-371e152a]{width:100%;padding:0 %?34?%;box-sizing:border-box;color:#505050;font-size:%?28?%;line-height:%?70?%;z-index:999}.textBox .text[data-v-371e152a]{text-indent:%?56?%}.chooseProvince[data-v-371e152a]{height:%?100?%;margin:0 %?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?28?%}.selectProvince[data-v-371e152a]{border-bottom:1px solid #ddd;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.backTopBox[data-v-371e152a]{width:%?120?%;height:%?120?%;background-color:#2a82e4;box-shadow:0 4px 4px 0 rgba(0,0,0,.24);border-radius:50%;position:fixed;right:%?22?%;bottom:%?272?%;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.backTopBox .img[data-v-371e152a]{width:%?50?%;height:%?50?%;vertical-align:top}.backTopBox .text[data-v-371e152a]{color:#fff;font-size:%?20?%;-webkit-transform:scale(.8);transform:scale(.8);line-height:%?30?%}',""]),e.exports=t},fa0f:function(e,t,i){var n=i("f894");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("4595c392",n,!0,{sourceMap:!1,shadowMode:!1})},fec6:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAHlBMVEUAAAD///////////////////////////////////8kfJuVAAAACXRSTlMADhEcK1Wqx8xbFyooAAAAAWJLR0QJ8dml7AAAAWRJREFUeNrt2jFKQ1EURdEExNrutk7C3jmIiJ2TsLC9cxB8s7UQicYkxuK9A7J2myKbXf1/7t9sAAAAAAAADvE4JvBKgAABAgQIECBAgMAfBG7uJ3DnYR8AAABT2F6FBarDAV7errMBxuhsgDGiCWqMaILtyxjRBPXx1tnZAMEE9fni3dkAsQS12x46GyCUoL7OL50NEElQ3xeozgYIJKj9Ea6zAZYnqJ87ZGcDLE5Qh6bYzgZYmqAOr9GdDbAwQR0b5DsbYFmCOn6T6GyARQnq1FmmswGWJKjTl6nOBliQoH47znU2wPQE9ft9srMBJieoc060nQ0wNUGdd6XubICJCercQ31nA0xLcLH3PcDD7h+f9366XfJgcrkTeIosJAQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAQFwAAAAAAAP+Ed3H9Hz56AYlRAAAAAElFTkSuQmCC"}}]);