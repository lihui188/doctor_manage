<template>
	<view class="l-more">
		
		<!-- 预加载图片  -->
		<view class="l-lay">
			<image class="l-icon-load l-icon-loading" @error="_errImg" src="../../static/l-icon-loadmore.png" mode="aspectFill"></image>
			<image class="l-icon-load" @error="_errImg" src="../../static/l-icon-loaderror.png" mode="aspectFill"></image>
		</view>
		
		<template v-if="isImg">
			<!-- 1 是加载中的图片， 2 是加载失败的图片 如果没有该图片则隐藏 -->
			<image v-if="status === 1 && isExist" class="l-icon-load l-icon-loading" src="../../static/l-icon-loadmore.png" mode="aspectFill"></image>
			<image v-if="status === 3 && isExist" class="l-icon-load" src="../../static/l-icon-loaderror.png" mode="aspectFill"></image>
		</template>
		
		<span class="l-load-txt" :style="'color:'+loadColor+';'">{{moreTxt}}</span>
		
	</view>
</template>

<script>
	export default {
		props:{
			loadTxt:{
				type: String,
				default: "加载中..."
			},
			overTxt:{
				type: String,
				default: "已经没有更多了~"
			},
			errorTxt:{
				type: String,
				default: "加载失败~"
			},
			loadColor:{
				type: String,
				default: "#666666"
			},
			isImg:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				moreTxt:'加载中...',
				status: 1,
				isExist:true
			}
		},
		created() {
			this.status = 1;
			this.moreTxt = this.loadTxt;
		},
		methods:{
			// 加载中
			$loading(){
				this.status = 1;
				this.moreTxt = this.loadTxt;
			},
			// 加载完成
			$loadOver(){
				this.status = 2;
				this.moreTxt = this.overTxt;
			},
			// 加载异常
			$loadError(){
				this.status = 3;
				this.moreTxt = this.errorTxt;
			},
			_errImg(){
				this.isExist = false;
			}
		}
	}
</script>

<style scoped>
	.l-more{
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		color: #666666;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.l-lay{
		position: absolute;
		left: -9999;
		top:0;
		opacity: 0;
		z-index: -999;
	}
	
	.l-load-txt{
		margin-left: 10rpx;
	}
	
	.l-icon-load{
		width: 32rpx;
		height: 32rpx;
	}
	
	.l-icon-loading{
		animation:1s animation infinite linear;
	}
	
	@keyframes animation{
		from{transform: rotate(0deg);}
		to{transform: rotate(360deg);}
	}
</style>
