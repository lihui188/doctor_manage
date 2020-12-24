<template>
	<view class="content">
		
		<view class="searchBox" :style="{'padding-top': topHeight +'px'}">
			<view class="borderBox">
				<image src="../../static/icon/search_search.png" class="search_icon"></image>
				<input class="inputBox" confirm-type="search" placeholder="请输入关键字" placeholder-class="place" v-model="key" @confirm="toResult()"/>
				<view class="confirm" @click="toResult()">确定</view>
				<view class="cancel" @click="back()">取消</view>
			</view>
		</view>
		
		<!-- <view class="searchFind">
			<view class="title">搜索发现：</view>
			<view class="findItemBox">
				<view class="item" :class="borderColor(index)" v-for="(item,index) in hotList" :key="index" @click="searchKey(item.name)">
					{{item.name}}
					<view class="hotIcon" v-if="index < 3">
						<label class="text">HOT</label>
					</view>
				</view>
			</view>
		</view> -->
		<view class="searchFind">
			<view class="title">搜索发现：</view>
			<view class="findItemBox">
				<view class="item" :class="borderColor(index)" v-for="(item,index) in hotList" :key="index" @click="searchKey(item.name)">
					{{item.name}}
					<view class="hotIcon" v-if="index < 3">
						<label class="text">HOT</label>
					</view>
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
				hotList: [],
				key: ''
			}
		},
		created() {
			this.getHot()
		},
		methods: {
			toResult(){
				let key = this.key
				uni.redirectTo({
					url: '/pages/result/index?keyword=' + key
				})
				
			},
			searchKey(key){
				uni.redirectTo({
					url: '/pages/result/index?keyword=' + key
					
				})
			},
			getHot(){
				this.$http_normal({
					 url: `/api/hotWord/List`
				 }).then(res => {
					this.hotList = res.data
				 })
			},
			borderColor(num){
				if(num%3 == 0){
					return 'redBorder'
				}else if(num%3 == 1){
					return 'blueBorder'
				}else if(num%3 == 2){
					return 'yellowBorder'
				}
			}
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
