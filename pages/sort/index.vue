<template>
	<view class="content">
		
		<view class="headSearchBox" :style="{'padding-top': topHeight +'px'}">
			<view class="left">
				<image src="../../static/icon/nygc.png" class="image"></image>
			{{title}}
			</view>
			<view class="right" @click="toSearch()">
				<view class="rightFlex">
					<image src="../../static/icon/topbar_search.png" class="search-icon"></image>
					<view class="text">搜索</view>
				</view>
				</view>
			
		</view>
		
		<view class="headNullBox" :style="{'padding-top': topHeight +'px'}">
			<view class="left"></view>
			<view class="right"></view>
		</view>
		
		<view class="searchBox">
			<scroll-view :scroll-y="true" :scroll-x="false" class="scorll-left" :style="{height: (screenHeight - 56 - navbarHeight) + 'px'}">
				<view v-for="(item,index) in bigType" :key="index" class="left_item" :class="selectLeft == item.id ? 'selectLeft':''" @click="selectLeft = item.id">
					<view class="line" v-if="selectLeft == item.id"></view>
					<view class="text">{{item.name}}</view>
				</view>
			</scroll-view>
			
			<scroll-view :scroll-y="true" :scroll-x="false" :scroll-with-animation="true" :scroll-anchoring="true" :scroll-top="topNum" :scroll-into-view="viewId" @scroll="isScorll" class="scorll-right" :style="{height: (screenHeight - 56 - navbarHeight) + 'px'}">
				<view v-for="(item,index) in smallType" :key="index" :id="item.tag != '#' ? 'Tag_' + item.tag : 'Tag_other'">
					<view class="right_item" v-for="(items,indexs) in item.textArray" :key="indexs" @click="toResult(items.id)">
						{{items.name}}
					</view>
				</view>
			</scroll-view>
				
			<scroll-view class="wxaSortPickerTemTags" :scroll-y="true" :scroll-x="false" :style="{height: (screenHeight - 56 - navbarHeight - 2) + 'px'}">
				<block v-for="(item,idx) in charsABC" :key="idx">
					<view :data-tag="item" class="wxaSortPickerTemTag" :class="judgeScroll(item)" @click="toScroll(item)">{{item}}</view>
				</block>
			</scroll-view>	
			
		</view>
		
	</view>
</template>

<script>
	import word_sort from '@/api/sort.js'
	export default {
		components: {
			
		},
		mixins: [word_sort],
		data() {
			return {
				title: '医生论坛',
				screenHeight: uni.getSystemInfoSync().screenHeight,
				charsABC: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
					'V', 'W', 'X', 'Y', 'Z', '#'
				],
				navbarHeight: 0,
			    selectLeft: 1,
				bigType: [],
				topNum: 0,
				old_topNum: 0,
				smallType: [],
				viewId: '',
				showTag: '',
				timer: true,
				scorllHeight: [],
				views: ''
			}
		},
		created() {
			this.getType()
		},
		mounted() {
			let _this = this
			const query = uni.createSelectorQuery().in(this);
			query.select('.headNullBox').boundingClientRect(data => {
			    _this.navbarHeight = data.height
			}).exec();
			
		},
		watch: {
			selectLeft(){
				this.topNum = this.old_topNum
				this.viewId = ''
				this.showTag = ''
				this.$nextTick(() => {
					this.topNum = 0
				});
				this.getSmallType()
				
			}
		},
		methods: {
			toSearch(){
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			toResult(id){
				uni.navigateTo({
					url: '/pages/result/index?parentId=' + this.selectLeft + '&childId=' + id
				})
			},
			judgeScroll(item){
				
				if(item != '#'){
					if(this.showTag == '#Tag_' + item){
						return 'sortSelect'
					}
				}else{
					if(this.showTag == '#Tag_other'){
						return 'sortSelect'
					}
				}
				
			},
			
			toScroll(item){
				let _this = this
				let old = this.old_topNum
				
				if(item != '#'){
					this.viewId = 'Tag_' + item
					this.timer = false
					this.showTag = '#Tag_' + item

				}else{
					this.viewId = 'Tag_other'
					this.timer = false
					this.showTag = '#Tag_other'
				}
				
			},
			isScorll(e){
				this.old_topNum = e.detail.scrollTop
					
					
				let scrollList = this.scrollHeight.filter(arr => arr.height > e.detail.scrollTop && arr.num != 0)
				
				if(e.detail.scrollTop < e.detail.scrollHeight - this.scorllHeight && e.detail.scrollTop > 0){
					if(this.timer && scrollList.length != 0){
		
						this.showTag = scrollList[0].name
					}else{
						this.timer = true
					}
					
				}
			
			
			},
			getType(){
				let _this = this
				this.$http_normal({
					url: `/api/postType/list/father`,
					method:'get'
				}).then(res => {
					_this.bigType = res.data.filter(arr => arr.parentId === null);
					this.selectLeft = this.bigType[0].id
					_this.getSmallType()
					
					const queryItem = uni.createSelectorQuery().in(this);
					queryItem.select('.scorll-right').boundingClientRect(data => {
						this.scorllHeight = data.height
					}).exec()
					
				});
			},
			getSmallType(){
				let _this = this
				this.$http_normal({
				    url: `/api/postType/list/father/${_this.selectLeft}`,
				    method:'get'
				}).then(res => {
				    this.smallType = this.initalSort(res.data,'name')
					_this.scrollHeight = []
					setTimeout(() => {
						this.$nextTick(() => {
							let scrollHeight = new Array(27)
							const queryItem = uni.createSelectorQuery().in(this);
							
							for(let i = 0;i < _this.charsABC.length;i++){
								
								if(this.charsABC[i] != '#'){
									queryItem.select('#Tag_' + _this.charsABC[i]).boundingClientRect(data => {
										scrollHeight[i] = {name: '#Tag_' + _this.charsABC[i],height: data.top + data.height - _this.navbarHeight,num: _this.smallType[i].textArray.length}
									}).exec()
									
								}else{
									queryItem.select('#Tag_other').boundingClientRect(data => {
										scrollHeight[i] = {name: '#Tag_other',height: data.top + data.height - _this.navbarHeight,num: _this.smallType[i].textArray.length}
									}).exec();
									
								}
							}
						
							
							_this.scrollHeight = scrollHeight
							
						})
					},200)
					
					
						
				})
			}
			
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
