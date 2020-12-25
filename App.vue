<script>
	export default {
		globalData: {
			
		},
		onLaunch: function() {
			
		},
		onShow: function() {
			
		},
		onHide: function() {
			
		}
	}
</script>
<!-- <script>
	import config from '@/global/js/config'
	// #ifdef H5
	import {
		appid,
		callbackUrl
	} from '@/global/js/baseUrl'
	export default {
		// h5微信登录专用
		onLaunch() {
			if (!config.isH5WxLogin) {
				return
			}
			if (this.$getMemoryPmt("token")) {
				return
			}
			// 用于h5重定向
			if (window.location.pathname !== '/') {
				this.$setMemoryPmt('url', window.location.pathname + window.location.search)
			}
			const code = this.$wxLogin({
				appid,
				url: callbackUrl,
				scope: 'snsapi_userinfo'
			})
			if (code) {
				return this.$http_json({
					url: "/api/auth/loginWx",
					method: "post",
					data: {
						appid,
						code
					}
				}).then(result => {
					// this.$setMemoryPmt("token", result.data.token)
					// this.$setMemoryPmt("userInfo", result.data.user)
					this.$vuex('vuex_isLogin', true)
					this.$vuex('vuex_token', result.data.token)
					this.$vuex('vuex_user', result.data.user.username)
					uni.showToast({
						title: '登录成功',
						icon: 'success',
						mask: true
					})

					setTimeout(function() {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}, 1500)
				})
			}
		},
		mounted() {
			// h5适用（软键盘不顶起）
			var hrt = document.body.clientHeight
			window.onload = function() {
				document.body.style.height = `${hrt}px`
			}
			window.onresize = () => {
				document.body.style.height = `${hrt}px`
			}
		}
	}
	// #endif
	// #ifndef H5
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		created() {
			console.log('App created')
		}
	}
	// #endif
</script>
 -->