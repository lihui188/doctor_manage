<template>
	<view class="content">
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">成为医生</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>
		<view class="proMsg">
			<span>请填写身份信息</span>
			<span style="color:#909399" v-if="subDoctor.isExamine === 0">审核中</span>
			<span style="color:#F56C6C" v-if="subDoctor.isExamine === -1">被驳回</span>
			<span style="color:#67C23A" v-if="subDoctor.isExamine === 1">审核通过</span>
		</view>
		<view>
			<view class="inputBox">
				<span class="fillContent">真实姓名</span>
				<input maxlength="50" v-model="subDoctor.trueName" class="inputFill" type="text" placeholder="请输入" />
			</view>
			<view class="inputBox">
				<span class="fillContent">年龄</span>
				<input v-model="subDoctor.age" class="inputFill" type="number" maxlength="3" placeholder="请输入" />
			</view>
			<view class="inputBox">
				<span class="fillContent">身份证号</span>
				<input maxlength="18" v-model="subDoctor.idCode" class="inputFill" type="text" placeholder="请输入" />
			</view>
		</view>
		<view class="proMsg">
			请填写地址信息
		</view>
		<view>
			<pick-regions :defaultRegion="defaultRegion" @getRegion="handleGetRegion">
				<view class="itemBox">
					<view class="text">联系地址</view>
					<view class="picker">
						<label v-if="subDoctor.province != '' && subDoctor.province != null">{{subDoctor.province + ' ' + subDoctor.city + ' ' + subDoctor.area}}</label>
						<label v-if="subDoctor.province == '' || subDoctor.province == null">请选择所在位置</label>
						<image src="../../static/arrow.png" class="img"></image>
					</view>
				</view>
			</pick-regions>
			<view class="inputBox">
				<span class="fillContent">详细地址</span>
				<input v-model="subDoctor.detailAddress" class="inputFill" type="text" maxlength="20" placeholder="请输入" />
			</view>
			<view class="inputBox">
				<span class="fillContent">证件号码</span>
				<input v-model="subDoctor.certificateCode" class="inputFill" type="text" maxlength="30" placeholder="请输入" />
			</view>
		</view>
		<view class="proMsg">
			请上传你的执照
		</view>
		<view class="addImgBox">
			<view class="addImgBox">
				<view class="imgBox" v-if="subDoctor.certificateImg !== ''">
					<image class="image" @click="imgInfo(index)" :src="convert(subDoctor.certificateImg)" mode="aspectFill"></image>
					<image class="fork" @click="delImg()" src="../../static/delete.png"></image>
				</view>
				<view class="imgBox dashed_line" @click="selectImg" v-if="subDoctor.certificateImg == ''">
					<image style="width: 150upx;height:150upx;" src="../../static/license.png"></image>
					<view class="color-upload">点击上传照片</view>
				</view>
			</view>
		</view>
		<view class="submitAudit" @click="subAudit" v-if="subDoctor.isExamine!==1">提交审核</view>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import {
		isId
	} from '@/utils/validate'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				myMes: {},
				imageList: [],
				userId: '',
				doctorInfo: {},
				defaultRegion: ['广东省', '广州市', '天河区'],
				subDoctor: {
					age: '',
					certificateCode: '',
					certificateImg: '',
					province: '',
					city: '',
					area: '',
					detailAddress: '',
					id: '',
					idCode: '',
					isExamine: '',
					trueName: '',
					userId: '',

				}
			}
		},
		onLoad(option) {
			this.subDoctor.userId = option.id;
			this.getDoctorDetail()
			// this.getUserInfo();
		},
		methods: {
			getUserInfo() {
				let _this = this
				this.$http_normal({
					url: '/api/user/getUser',
					method: 'get'
				}).then(res => {
					this.myMes = res.data
					if (this.myMes['roles'][0].name == '医生') {
						this.getDoctorDetail()
					}
				})
			},
			selectImg() {
				this.$getImgFile(4, 1)
					.then((res) => {
						this.$http_file({
							url: "/api/localStorage/upload",
							method: "post",
							data: {
								file: res[0].raw,
							},
						}).then((result) => {
							this.subDoctor.certificateImg = result.data.url
						})
					})
					.catch((e) => {
						uni.showToast({
							title: e,
							icon: 'none'
						})
					})
			},
			subAudit() {
				if (this.subDoctor.trueName === '') {
					uni.showToast({
						title: '真实姓名不能为空',
						icon: 'none'
					})
					return
				}
				var trueReg = /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/
				if (this.subDoctor.trueName !== '' && !trueReg.test(this.subDoctor.trueName)) {
					uni.showToast({
						title: '姓名只能由汉字或英文组成',
						icon: 'none'
					})
					return
				}
				if (this.subDoctor.age === '') {
					uni.showToast({
						title: '年龄不能为空',
						icon: 'none'
					})
					return
				}
				var patt = /^120$|^[1-9]$|^(1[0-1]|[1-9])\d$/;
				if (this.subDoctor.age !== '' && !patt.test(this.subDoctor.age)) {
					uni.showToast({
						title: '年龄只能输入1-120',
						icon: 'none'
					})
					return
				}
				if (this.subDoctor.idCode === '') {
					uni.showToast({
						title: '身份证号不能为空',
						icon: 'none'
					})
					return
				}

				if (!isId(this.subDoctor.idCode)) {
					uni.showToast({
						title: '身份证号输入错误',
						icon: 'none'
					})
					return
				}
				if (this.subDoctor.province === '') {
					uni.showToast({
						title: '请选择联系地址',
						icon: 'none'
					})
					return
				}
				if (this.subDoctor.detailAddress === '') {
					uni.showToast({
						title: '详细地址不能为空',
						icon: 'none'
					})
					return
				}
				if (this.subDoctor.certificateCode === '') {
					uni.showToast({
						title: '证件号码不能为空',
						icon: 'none'
					})
					return
				}
				if (this.subDoctor.certificateImg === '') {
					uni.showToast({
						title: '请上传执照图片',
						icon: 'none'
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: '是否确认提交',
					success: (res) => {
						if (res.confirm) {
							this.$http_json({
								url: '/api/doctor/add',
								method: 'post',
								data: this.subDoctor
							}).then(res => {
								if (res.status === 200) {
									uni.showToast({
										title: '提交成功',
										icon: 'success'
									});
									setTimeout(() => {
										this.getDoctorDetail()
									}, 2000)
								}
							})
						} else if (res.cancel) {
							this.getDoctorDetail()
						}
					}
				});
			},
			getDoctorDetail() {
				this.$http_normal({
					url: `/api/doctor/get`,
					method: 'get'
				}).then(res => {
					if (res.status === 200) {
						if (res.data) {
							this.subDoctor = res.data
						}
					}
				})
			},
			imgInfo(i) {
				let tempList = [];
				tempList.push(this.baseUrl + this.subDoctor.certificateImg)
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			delImg() {
				uni.showModal({
					content: '确定删除这张图片吗?',
					success: res => {
						if (res.confirm) {
							this.subDoctor.certificateImg = ''
						}
					}
				});
			},
			handleGetRegion(region) {
				this.subDoctor.province = region[0].name,
					this.subDoctor.city = region[1].name,
					this.subDoctor.area = region[2].name
			},
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">

</style>
