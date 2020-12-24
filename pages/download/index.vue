<template>
	<view class="content">
		<view class="modal" v-if="isShow" @click="toHide()">
			<image src="../../static/loc.png" class="img"></image>
		</view>
		<view class="imgBox" @click="toHide()">
			<image src="../../static/logo.png" class="img"></image>

		</view>
		<view class="text">医生论坛APP</view>

		<view class="buttonBox">
			<button type="primary" class="button" @click="downloadAn()">安卓下载</button>

		</view>
		<view class="buttonBox2">

			<button type="primary" class="button" @click="downloadIOS()">IOS下载</button>
		</view>

	</view>
</template>

<script>
	export default {
		components: {

		},
		onShow() {
			this.is_weixn()
		},
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			downloadAn() {
				if (this.isShow) {
					return
				}
				switch (uni.getSystemInfoSync().platform) {
					case 'ios':
					window.location.href = 'https://server.gongcheng360.com/upload/apk/gongchen360.apk'
						break;
					default:
						uni.navigateTo({
							url: `/pages/webview/index?url=https://server.gongcheng360.com/upload/apk/gongchen360.apk`
						})
						break;
				}

			},
			downloadIOS() {
				if (this.isShow) {
					return
				}
				window.location.href =
					'https://apps.apple.com/mo/app/%E5%8D%97%E9%98%B3%E5%B7%A5%E7%A8%8B%E4%BF%A1%E6%81%AF/id1519178806'
			},
			toHide() {
				this.isShow = false
			},
			is_weixn() {
				var ua = navigator.userAgent.toLowerCase();
				if (ua.match(/MicroMessenger/i) == "micromessenger") {
					this.isShow = true
					return true;
				} else {
					this.isShow = false
					return false;
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	.imgBox {
		width: 100%;
		display: flex;
		padding-top: 200rpx;
		justify-content: center;

		.img {
			width: 200rpx;
			height: 200rpx;
		}
	}

	.text {
		width: 100%;
		margin-top: 50rpx;
		text-align: center;
		font-size: 36rpx;
		font-weight: bold;
	}

	.buttonBox {
		width: 100%;
		display: flex;
		margin-top: 130rpx;
		justify-content: center;
	}

	.buttonBox2 {
		width: 100%;
		display: flex;
		padding-bottom: 400rpx;
		margin-top: 70rpx;
		justify-content: center;

	}

	.button {
		width: 60%;
		height: 90rpx;
		font-size: 36rpx;
		line-height: 54rpx;
		font-weight: bold;
		display: flex;
		letter-spacing: 2rpx;
		align-items: center;
		justify-content: center;
		background-color: #007aff;
	}

	.modal {
		position: fixed;
		background: rgba(0, 0, 0, 0.8);
		width: 100vw;
		/*宽度设置为100%，这样才能使隐藏背景层覆盖原页面*/
		height: 100%;

		top: 0;
		z-Index: 999;

		.img {
			position: absolute;
			right: 0;
			width: 680rpx;
			height: 200rpx;
			top: 30rpx;

		}
	}
</style>
