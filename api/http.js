/**
 * @author xuanzai
 * @description h5专用axios封装模块
 */
import { baseUrl } from '@/global/js/baseUrl.js'
import store from '@/store/index.js'
import axios from 'axios'

// 给所有axios实例配置请求根路径
axios.defaults.baseURL = baseUrl
// 配置请求时限（15s） 
axios.defaults.timeout = 60000 

// 给所有axios实例配置统一的数据返回格式
axios.defaults.transformResponse = [(data) => {
	try {
		return JSON.parse(data).data
	}catch(e) {
		return data.data
	}
}]

function $vuex(name, value){
	store.commit('$uStore', {
		name,
		value
	})
}

// 请求拦截
function addInterceptors(obj) {
	obj
		.interceptors
		.request
		.use(config => {
			// 统一对中文字符编码
			
			config.url = encodeURI(config.url)
			store.state.vuex_token != null
			&& (config.headers.Authorization = `Bearer ${store.state.vuex_token}`)
			&& (new RegExp(/\/auth\/login/g).test(config.url) || new RegExp(/\/auth\/loginWx/g).test(config.url) || new RegExp(/\/auth\/loginPh/g).test(config.url))
			&& (config.headers.Authorization = "")

			if(config.url != '/api/user/getInfo' && config.url != '/api/slide/query' && config.url.indexOf('/api/post/page') == -1){
				uni.showLoading({
					title: '加载中',
					mask: true
				})	
			}
			
			return config
		}, err => {
			uni.showToast({
				icon: 'none',
				title: '服务器出错，请联系客服进行处理'
			})
		})
		
	obj
		.interceptors
		.response
		.use(response => {
			uni.hideLoading()
			return response
		}, err => {
			
			uni.hideLoading()
			const regexp = new RegExp(/timeout/g)
			typeof err.response === "object"
			? ((err.response.status === 400)
			? uni.showToast({
					icon: "none",
					title: JSON.parse(err.response.request.response).message
					? JSON.parse(err.response.request.response).message.replace(/\{[^\{]*\}/g, '')
					: JSON.parse(err.response.request.response)
				})
			: (err.response.status === 401)
			? (setTimeout(()=> {
				uni.showToast({
					icon: 'none',
					title: '您尚未登录',
					mask: true
				})
			},100),
			  setTimeout(()=>{
				  uni.reLaunch({
				  	url: '/pages/login/index'
				  })
			  },1500),
			  $vuex('vuex_token',''), $vuex('vuex_isLogin',false), $vuex('vuex_user','')
			)
			: (err.response.status === 403)
			? uni.showToast({
				icon: 'none',
				title: '无权限,请联系客服开发权限'
			})
			:	(err.response.status === 404)
			? uni.showToast({
				icon: 'none',
				title: '访问的接口不存在,请访问正确的接口'
			})
			: (err.response.status === 500)
			? uni.showToast({
				icon: 'none',
				title: '服务器出错,请联系客服进行处理'
			})
			: (err.response.status === 502)
			? uni.showToast({
				icon: 'none',
				title: '服务器已停止,请联系运维工程师重启服务器'
			})
			: "")
			: (regexp.test(err)
			? uni.showToast({
				icon: 'none',
				title: '请求超时,请联系客服进行处理'
			})
			: uni.showToast({
				icon: 'none',
				title: '服务器出错,请联系客服进行处理'
			})) 
			return Promise.reject(err)
		})
}

const http_normal = axios.create({
	headers: {
		"Content-Type": "application/x-www-form-urlencoded"
	},
	transformRequest: [(data) => {
		let str = ""
		for(let key in data) {
			str += `${key}=${data[key]}&`
		}
		return str.replace(/&$/, '')
	}]
})

const http_json = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	transformRequest: [(data) => {
		return JSON.stringify(data)
	}]
})

const http_file = axios.create({
	headers: {
		"Content-Type": "multipart/form-data"
	},
	transformRequest: [(data) => {
		const formData = new FormData()
		for(let key in data) {
			formData.append(key, data[key])
		}
		return formData
	}]
})

const http = axios.create({
	headers: {
		"Content-Type": "application/json"
	},
	transformRequest: [(data) => {
		return JSON.stringify(data)
	}]
})

addInterceptors(http_normal)
addInterceptors(http_json)
addInterceptors(http_file)
addInterceptors(http, false)

export default {
	http_normal,
	http_json,
	http_file,
	http
}
