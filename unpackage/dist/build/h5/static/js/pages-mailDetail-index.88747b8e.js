(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mailDetail-index"],{"250a":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.topTitleBox[data-v-1e4b8a71]{width:100%;top:0;z-index:99;background-color:#fff;position:fixed;box-shadow:rgba(0,0,0,.2) 0 1px 5px 0;padding:0 %?12?% %?18?%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.topTitleBox .arrow[data-v-1e4b8a71]{width:%?60?%;height:%?60?%;position:absolute;left:0}.topTitleBox .title[data-v-1e4b8a71]{font-size:%?32?%;color:#000;font-weight:700}.headPlaceBox[data-v-1e4b8a71]{width:100%;box-sizing:border-box;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.headPlaceBox .arrow[data-v-1e4b8a71]{width:%?60?%;height:%?60?%;position:absolute;left:0}.headPlaceBox .title[data-v-1e4b8a71]{font-size:%?32?%;color:#000;font-weight:700}.messageBox[data-v-1e4b8a71]{width:100%;padding:%?48?% %?40?% 0;box-sizing:border-box}.messageBox .titleBox[data-v-1e4b8a71]{width:100%;margin-bottom:%?136?%}.messageBox .titleBox .title[data-v-1e4b8a71]{color:#505050;font-size:%?32?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.messageBox .titleBox .title .line[data-v-1e4b8a71]{margin-right:%?10?%;height:%?32?%;width:%?12?%;background-color:#2a82e4}.messageBox .titleBox .title .line2[data-v-1e4b8a71]{margin-right:%?10?%;height:%?32?%;width:%?12?%;background-color:#ff5733}.messageBox .titleBox .title .text[data-v-1e4b8a71]{color:#505050;font-size:%?32?%;line-height:%?48?%}.messageBox .titleBox .mailContent[data-v-1e4b8a71]{color:#000;font-size:%?28?%;line-height:%?42?%;margin-top:%?26?%;margin-left:%?22?%;word-wrap:break-word}.messageBox .margin[data-v-1e4b8a71]{margin-bottom:%?136?%}',""]),t.exports=e},"2c2d":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={components:{},data:function(){return{id:"",message:{}}},onLoad:function(t){this.id=t.id,this.getDetail()},methods:{getDetail:function(){var t=this;this.$http_normal({url:"/api/infoFeedBack/get/".concat(this.id),method:"get"}).then((function(e){t.message=e.data}))}}};e.default=a},"6c6d":function(t,e,i){"use strict";var a=i("dcda"),n=i.n(a);n.a},"758e":function(t,e,i){"use strict";i.r(e);var a=i("b5a5"),n=i("f082");for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("6c6d");var s,r=i("f0c5"),l=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"1e4b8a71",null,!1,a["a"],s);e["default"]=l.exports},b5a5:function(t,e,i){"use strict";var a,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",{staticClass:"content"},[a("v-uni-view",[a("v-uni-view",{ref:"topTitleBox",staticClass:"topTitleBox",style:{"padding-top":"calc("+(t.topHeight-5)+"px  + 22upx)"}},[a("v-uni-image",{staticClass:"arrow",attrs:{src:i("d2b2")},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.back()}}}),a("v-uni-view",{staticClass:"title"},[t._v("站内信详情")])],1),a("v-uni-view",{ref:"headPlaceBox",staticClass:"headPlaceBox",style:{"margin-top":"calc("+(t.topHeight-5)+"px)"}},[a("v-uni-view",{staticClass:"title"},[t._v(t._s(" "))])],1)],1),a("v-uni-view",{staticClass:"messageBox"},[a("v-uni-view",{staticClass:"titleBox"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-view",{staticClass:"line"}),a("v-uni-view",{staticClass:"text"},[t._v("我的留言")])],1),a("v-uni-view",{staticClass:"mailContent"},[t._v(t._s(t.message.feedbackText))])],1),a("v-uni-view",{staticClass:"titleBox margin"},[a("v-uni-view",{staticClass:"title"},[a("v-uni-view",{staticClass:"line2"}),a("v-uni-view",{staticClass:"text"},[t._v("平台回复")])],1),a("v-uni-view",{staticClass:"mailContent"},[t._v(t._s(t.message.replyText||"暂无回复"))])],1)],1)],1)},o=[];i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}))},d2b2:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEABAMAAACuXLVVAAAAMFBMVEUAAACAgICHh4eAgICDg4OCgoKCgoKAgICAgICAgICAgICAgICAgICAgICAgID///9UzFQ5AAAADnRSTlMADhEgIzM5uL7GzOLu8aHOZxAAAAABYktHRA8YugDZAAABD0lEQVR42u3bsU3EQBBA0U0gvhKuBEqgEHJIKIYWqIE6KIEckLYGZFmWfUgkCPST9xvY0dtJZwxJkiRJkiRJkiRJkqQ/6+Hcvn/99twO8Dg/zi3AnM8twEwJFoCUYAEoCVaAkGAF6Ag2gIxgA6gIdoCIYAdoCI4ACcERoCC4BJifNy3AfKkBbgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9bVazzAuIu/AAECBAgQIECAAAECBAgQIECAAAECBAgQIEDwU/mBwzeC91O8BU9jpAQBwCVBAXAkSACOBA3AThAB7AQVwEaQAWwEHcBKEAKsBCXAQpACLAQtwBj3pyFJkiRJkiRJkiRJkvSLvgDB3zlirBhlZQAAAABJRU5ErkJggg=="},dcda:function(t,e,i){var a=i("250a");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("4f3821e6",a,!0,{sourceMap:!1,shadowMode:!1})},f082:function(t,e,i){"use strict";i.r(e);var a=i("2c2d"),n=i.n(a);for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a}}]);