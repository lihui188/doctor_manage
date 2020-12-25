<template>
	<view class="login">
		<view class="login_box">
			<view class="login_title">精适找医</view>
			<view class="wx_login" @click="wxLogin">微信登录</view>
		</view>
	</view>
</template>

<script>
	import config from '@/global/js/config'
	import urlQuery from '@/utils/url_query.js'
	import {
		appid,
		callbackUrl
	} from '@/global/js/baseUrl'
	export default {
		data() {
			return {};
		},
		created() {
			this.justify()
		},
		methods: {
			justify() {
				if(urlQuery().code) {
					this.wxLogin()
				}
			},
			wxLogin() {
				if (!config.isH5WxLogin) {
					return
				}
				if (this.$getMemoryPmt("token")) {
					return
				}
				// 用于h5重定向
				// if (window.location.pathname !== '/') {
				// 	this.$setMemoryPmt('url', window.location.pathname + window.location.search)
				// }

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
							uni.reLaunch({
								url: '/pages/index/index'
							})
						}, 1500)
					})
				}
			},
			backIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
		}
	};
</script>

<style>
	page {
		width: 100%;
		height: 100%;
		background-image: linear-gradient(to right top, #30cfd0 0%, #330867 100%);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login_box {
		margin-top: -150rpx;
	}

	.login_title {
		font-size: 48rpx;
		font-weight: bold;
		font-family: 'Microsoft YaHei';
		display: flex;
		align-items: center;
		justify-content: center;
		color: rgba(255, 255, 255, 1);
		text-align: center;
	}

	.wx_login {
		width: 430rpx;
		height: 80rpx;
		display: flex;
		letter-spacing: 10rpx;
		align-items: center;
		justify-content: center;
		margin: 50rpx auto 0;
		color: rgba(255, 255, 255, 1);
		background-color: rgba(51, 204, 204, 1);
		border-radius: 15rpx;
		font-size: 28rpx;
		line-height: 150%;
		text-align: center;
	}
</style>
