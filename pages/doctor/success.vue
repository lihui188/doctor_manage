<template>
	<view class="content">
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="backIndex()"></image>
				<view class="title">发布</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>
		
		<view class="successBox">
			<image src="../../static/icon/doctor_success.png" class="successImg"></image>
			<view class="text">您的申请已递交给平台，请耐心等待审核。</view>
			<view class="button_style_white">
				<button class="customColor" hover-class="hoverColor" @click="query()">查看帖子</button>
			</view>
			<view class="button_style_custom" style="margin-top: 20upx;">
				<button class="customColor" hover-class="hoverColor" @click="backIndex()">回到首页</button>
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
				id: ''
			}
		},
		onLoad(options) {
			if(options.hasOwnProperty('id')){
				this.id = options.id
			}
		},
		methods: {
			backIndex(){
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			query(){
				
				uni.navigateTo({
					url: '/pages/detail/index?id=' + this.id
				})
			}
		}
	}
</script>

<style scoped lang="scss" src="./scss/success.scss">
	
</style>
