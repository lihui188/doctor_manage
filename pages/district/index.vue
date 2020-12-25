<template>
	<view class="content">
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">选择地区</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">确认</view>
			</view>
		</view>
		<!-- <view class="chooseProvince">
			<view @click="cancel">取消</view>
			<view>选择地区</view>
			<view @click="confirm">确认</view>
		</view> -->
		<view class="textBox">
			<view class="selectProvince" v-for="(item,index) in provinceList" @click="selectProvince(item.value,index)">
			<view>{{item.name}}</view>
			<!-- <image v-if="selectIndex===index" style="width: 50upx;height:50upx;" src="../../static/icon/check.png"></image> -->
			</view>
			
		</view>
		<view class="backTopBox" v-if="flag" @click="top()">
			<view class="backTop">
				<image src="../../static/icon/index_backtotop.png" class="img"></image>
				<view class="text">回到顶点</view>
			</view>
		</view>
	</view>
</template>

<script>
	import countryData from '../../utils/country-data.js'
	import bus from '@/utils/bus.js'
	export default {
		components: {

		},
		data() {
			return {
				flag: false,
				provinceList: countryData,
				selectIndex:'',
				province:''
			}
		},
		// created(){
		// 	bus.$off('getProvince')
		// },
		onLoad() {
			// this.provinceList = countryData
		},
		methods: {
			selectProvince(value,index) {
				this.selectIndex = index;
				this.province = value;
				bus.$emit('getProvince',this.province)
				uni.navigateBack()
			},
			onPageScroll(e){
					if(e.scrollTop>300){ 
							this.flag = true
					}else{ 
							this.flag = false
					}
			},
			top() { //回到顶部
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 300
					});
			},
			cancel(){
				this.province = ''
				uni.navigateBack()
			},
			confirm(){
				if(this.province === ''){
					uni.showToast({
						title:'请选择一个省份',
						icon:'none'
					})
					return
				}
				// console.log(this.province)
				
			}
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">

</style>
