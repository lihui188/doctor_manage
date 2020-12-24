<template>
	<view class="content">
		
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">留言</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>
		
		<view class="leaveBox">
			<view class="text">
				<label style="color: #fc3535">*</label>
				<label>请输入300字内的留言</label>
			</view>
			<view class="textareaBox">
				<textarea placeholder-class="textColor" class="textareaStyle" placeholder="请输入"  maxlength="300" v-model="leave"></textarea>
			</view>
			
			<view class="button_style_custom">
				<button class="customColor" hover-class="hoverColor" @click="sure()">确认</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				leave: '',
				myMes:{}
			}
		},
		onLoad() {
			this.getUserInfo();
		},
		methods: {
			sure(){
				if(this.leave == ''){
					uni.showToast({
						title: '留言不能为空',
						icon: 'none'
					})
					return
				}
				this.$http_json({
					url: `/api/infoFeedBack/add`,
					method: 'post',
					data: {
						feedbackText: this.leave,
						uid:this.myMes.id,
						nickname:this.myMes.nickname,
						onRead:false,
						replyText:'',
						feedType:0
					}
				}).then(res => {
					let id = res.data.id
					uni.redirectTo({
						url: '/pages/addMail/success?id=' + id
					})
					
				})
			},
			getUserInfo() {
				let _this = this
				this.$http_normal({
					url: '/api/user/getUser',
					method: 'get'
				}).then(res => {
					this.myMes = res.data
				})
			}
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
