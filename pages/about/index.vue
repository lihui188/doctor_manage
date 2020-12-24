<template>
	<view class="content">
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">关于我们</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>
		
		<view class="textBox">
			
			<view class="text">
				医生论坛欢迎你
			</view>
			
		</view>
		
		<image src="../../static/icon/about.png" class="fixedImg"></image>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
