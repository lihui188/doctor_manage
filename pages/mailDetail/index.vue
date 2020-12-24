<template>
	<view class="content">
		
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">站内信详情</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>
		
		<view class="messageBox">
			<view class="titleBox">
				<view class="title">
					<view class="line"></view>
					<view class="text">我的留言</view>
				</view>
				<view class="mailContent">
					{{message.feedbackText}}
				</view>
			</view>
			<view class="titleBox margin">
				<view class="title">
					<view class="line2"></view>
					<view class="text">平台回复</view>
				</view>
				<view class="mailContent">
					{{message.replyText||'暂无回复'}}
				</view>
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
				id: '',
				message: {}
			}
		},
		
		onLoad(options) {
			this.id = options.id
			this.getDetail()
		},
		methods: {
			 getDetail(){
				this.$http_normal({
					url: `/api/infoFeedBack/get/${this.id}`,
					method:'get'
				}).then(res => {
				   this.message = res.data
				})
			},
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
