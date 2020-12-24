import Vue from 'vue'
import App from './App'

//引入vuex
import store from '@/store'

//引入
import { baseUrl } from '@/global/js/baseUrl.js'
import convert from '@/utils/convertHttp.js'

//后台接口地址
Vue.prototype.baseUrl = baseUrl

//引入模块
import '@/initial/modules'

Vue.config.productionTip = false
Vue.prototype.convert = convert

App.mpType = 'app'

let mixin = {
    methods: {
    	back(num = 1){
			uni.navigateBack({
				delta: num
			})
		}
    }
}

Vue.mixin(mixin)



Vue.prototype.topHeight = uni.getSystemInfoSync().statusBarHeight + 5

const app = new Vue({
	store,
    ...App
})
app.$mount()
