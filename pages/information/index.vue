<template>
	<view class="content">
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">个人信息</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>

		<view class="avatarBox">
			<view class="text">头像</view>
			<view class="rightBox">
				<image src="../../static/unLogin.png" class="img" v-if="myMes.avatar == null" @click="upLoad()"></image>
				<image :src="convert(myMes.avatar)" class="img" v-if="myMes.avatar != null" @click="upLoad()"></image>
				<image src="../../static/arrow.png" class="arrow"></image>
			</view>
		</view>

		<view class="infoBox borderBox" @click="$refs.popupName.open()">
			<view class="text">用户名称</view>
			<view class="content">{{myMes.nickname != null ? myMes.nickname : '用户名'}}</view>
			<image src="../../static/arrow.png" class="arrow"></image>
		</view>

		<view class="infoBox borderBox" @click="toCompany">
			<view class="text">地址信息</view>
			<view class="content">{{myMes.province ? myMes.province + ' ' + myMes.city + ' ' + myMes.area : '请填写地址信息'}}</view>
			<image src="../../static/arrow.png" class="arrow"></image>
		</view>

		<view class="infoBox" @click="$refs.popup.open()">
			<view class="text">手机号</view>
			<view class="content">{{noPassByMobile(myMes.phone || '请填写手机号码')}}</view>
			<image src="../../static/arrow.png" class="arrow"></image>
		</view>

		<view class="unLoginBox" @click="exit()">
			退出登录
		</view>

		<uni-popup style="z-index: 100;" ref="popup" type="bottom" :maskClick="false">

			<view class="selectTypeBoxPop">

				<view class="topBox">
					<view class="close" @click="closed()">取消</view>
					<view class="title">改绑手机</view>
					<view class="itemBox" @click="edit()">确认</view>
				</view>

				<view class="changePhoneBox">
					<view class="changeBox">
						<view class="text">新手机号</view>
						<view class="border">
							<input class="input" type="number" maxlength="11" placeholder="请输入新手机号" v-model="vphone" />
							<view class="block" @click="getVCode()" v-if="code_state == 1">获取验证码</view>
							<view class="block" v-if="code_state == 2">{{secode}}s重新获取</view>
							<view class="block" @click="getVCode()" v-if="code_state == 3">重新获取</view>
						</view>
					</view>
					<view class="changeBox" style="margin-top: 24upx;">
						<view class="text">验证码</view>
						<view class="border">
							<input maxlength="8" class="input" placeholder="请输入验证码" v-model="vcode" />
						</view>
					</view>
				</view>


			</view>

		</uni-popup>

		<uni-popup style="z-index: 100;" ref="popupName" type="bottom" :maskClick="false">

			<view class="selectTypeBoxPop">

				<view class="topBox">
					<view class="close" @click="vname = myMes.nickname;$refs.popupName.close()">取消</view>
					<view class="title">编辑用户名称</view>
					<view class="itemBox" @click.stop="editName">确认</view>
				</view>

				<view class="changeNameBox">
					<view class="changeBox" style="margin-top: 24upx;">
						<view class="text">用户名称</view>
						<view class="border">
							<input class="input" type="text" maxlength="16" placeholder="请输入用户名称" v-model="vname" />
						</view>
					</view>
				</view>
			</view>

		</uni-popup>

	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import {
		baseUrl,
		appid
	} from '@/global/js/baseUrl.js'
	import rotateImg from '@/api/rotate_image.js'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				myMes: {},
				baseUrl: baseUrl,
				appid: appid,
				code_state: 1,
				vcode: '',
				uuid: '',
				secode: 60,
				default: 60,
				vphone: '',
				vname: '',


				selectedOptions: ['河南省', '南阳市', '宛城区'],
				form: {
					province: '',
					city: '',
					area: ''
				},
			}
		},
		onShow() {
			this.getMyMes()
		},
		methods: {
			handleGetRegion2(region) {

				this.form = {
					province: region[0].name,
					city: region[1].name,
					area: region[2].name
				}
			},
			upLoad() {
				this.$getImgFile(this.imgCount)
					.then((res) => {
						this.$http_file({
							url: "api/user/updateAvatar",
							method: "post",
							data: {
								file: res[0].raw,
							},
						}).then((result) => {
							if (result.status == 200) {
								uni.showToast({
									title: '修改成功',
									icon: 'success',
									mask: true
								})
								setTimeout(() => {
									this.getMyMes()
									this.$forceUpdate()
								}, 2000)
							}
						})
					})
					.catch((e) => {
						this.$warnMsg(e)
					})
			},
			closed() {
				this.vphone = ""
				this.vcode = ""
				this.code_state = 1
				this.secode = 60
				this.$refs.popup.close()
			},
			editName() {
				if (this.vname == '') {
					uni.showToast({
						title: '用户名称不能为空',
						icon: 'none',
						mask: true
					})
					return
				}

				this.$http_json({
					url: `/api/user/center`,
					method: 'post',
					data: {
						nickname: this.vname
					}
				}).then(res => {
					uni.showToast({
						title: '修改用户名称成功',
						icon: 'success',
						mask: true
					})
					this.$refs.popupName.close()
					this.getMyMes()
				})

			},
			edit() {

				if (this.vphone == '') {
					uni.showToast({
						title: '手机号不能为空',
						icon: 'none',
						mask: true
					})
					return
				}
				if (this.vcode == '') {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
						mask: true
					})
					return
				}

				this.$http_json({
					url: `/api/auth/updatePhone`,
					method: 'post',
					data: {
						uuid: this.uuid,
						appid: this.appid,
						phone: this.vphone,
						vcode: this.vcode
					}
				}).then(res => {
					if (res.status === 200) {
						uni.showToast({
							title: '改绑成功',
							icon: 'success',
							mask: true
						})

						setTimeout(() => {
							this.$refs.popup.close()
							this.getMyMes()
						}, 1500)
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none',
							mask: true
						})
					}
				}).catch(e => {
					console.log(e);
				})

			},
			exit() {
				uni.showModal({
					title: '提示',
					content: '是否退出登录？',
					success: (res) => {
						if (res.confirm) {
							this.$vuex('vuex_token', '')
							this.$vuex('vuex_isLogin', false)
							this.$vuex('vuex_user', '')

							uni.reLaunch({
								url: "/pages/login/index"
							})
						} else if (res.cancel) {
							return
						}
					}
				});

			},
			getVCode() {
				let _this = this

				if (_this.vphone == '') {
					uni.showToast({
						title: '请输入手机号',
						mask: true,
						icon: 'none'
					})
					return
				}

				//倒计时方法
				function countdown() {
					var secode = _this.secode;
					if (secode == 0) {
						_this.secode = _this.default
						_this.code_state = 3
						return;
					}
					var time = setTimeout(function() {
						_this.secode--;
						countdown()
					}, 1000)
				}


				_this.$http_json({
					url: `/api/auth/sendCode/${_this.vphone}`,
					method: 'get',
				}).then(res => {
					this.uuid = res.data.uuid
					//状态更改
					_this.code_state = 2
					countdown()

				})

			},
			// editAvatar(url) {
			// 	let _this = this
			// 	this.$http_json({
			// 		url: `api/user/updateAvatar`,
			// 		method: 'post',
			// 		data: {
			// 			file: url,
			// 		}
			// 	}).then(res => {

			// 		uni.showToast({
			// 			title: '修改成功',
			// 			icon: 'success',
			// 			mask: true
			// 		})
			// 		this.getMyMes()
			// 	})

			// },
			toCompany() {
				uni.navigateTo({
					url: '/pages/information/company'
				})
			},
			getMyMes() {
				this.$http_normal({
					url: `/api/user/getUser`,
					method: 'get'
				}).then(res => {
					this.myMes = res.data
					this.vname = res.data.nickname
				});
			},
			noPassByMobile(str) {
				if (null != str && str != undefined) {
					var pat = /(\d{3})\d*(\d{4})/;
					return str.replace(pat, '$1 **** $2');
				} else {
					return "";
				}
			}
		}
	}
</script>

<style lang="scss" src="./scss/index.scss">

</style>
