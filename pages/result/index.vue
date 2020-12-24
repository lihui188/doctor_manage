<template>
	<view class="content">
		<view class="topFixedBox">
			<view class="topTitleBox" :style="{'margin-top': (topHeight - 5) +'px'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>

				<view class="borderBox">
					<image src="../../static/icon/search_search.png" class="search_icon"></image>
					<input class="inputBox" confirm-type="search" placeholder="请输入关键字" placeholder-class="place" v-model="keyword"
					 @confirm="refreshPost()" />

					<view class="cancel" @click="refreshPost()">搜索</view>
				</view>
			</view>

			<view class="navbarListBox">

				<view class="navbarBox">
					<view class="navbarItem" v-for="(item,index) in postTypeList" :key="index">
						<view class="text">
							<view class="label" @click="selectType = index">
								<span :class="selectType == index ?'selectItem':''">{{item.name}}</span>
								<view class="line" v-if="selectType == index"></view>
							</view>
						</view>
					</view>
					<view class="filterBox" @click="showDrawer('showRight')">
						<image src="../../static/icon/serch_filter.png" class="icon"></image>
						<view class="text">筛选</view>
					</view>
				</view>

			</view>

		</view>

		<view class="headPlaceBox" :style="{'margin-top': (topHeight - 5) +'px'}">

			<view class="borderBox">
				<view class="inputBox" confirm-type="search" placeholder="请输入关键字" placeholder-class="place"></view>
			</view>
			<view class="navbar">
			</view>

		</view>


		<view v-for="(item,index) in PostList" :key="index" @click="toDetail(item.id)">
			<view class="hotPostListBox">
				<view class="postTypeBox">
					<view class="type" v-if="item.pulish_type==0">求医 · {{item.tpName}}</view>
					<view class="type" v-if="item.pulish_type==1">医疗供应 · {{item.tpName}}</view>
					<view class="type" v-if="item.pulish_type==2">成功案例 · {{item.tpName}}</view>
					<!-- <view class="type" v-if="item.pulish_type==2">成功案例 · {{bigType[item.childType.parentId - 1].name}} · {{item.childType.name}} </view> -->
					<view class="number">编号：{{item.code}}</view>
				</view>
				<view class="postTitleBox">
					<image src="../../static/icon/isTop.png" class="isTopBox" v-if="item.isTop"></image>
					{{item.title}}
				</view>
				<view class="imgBox" v-if="item.imageList != '[]'">
					<image class="imgItem" :src="convert(items)" mode="aspectFill" v-for="(items,indexs) in getImage(item.imageList)"
					 :key="indexs" :class="indexs == 1 ? 'center':''"></image>
				</view>

				<view class="detailBox">
					<view class="left">
						<image src="../../static/icon/post_location.png" class="icon"></image>
						<view class="text">{{item.province}} {{item.city}}</view>
					</view>
					<view class="right">
						<view class="viewNum">
							<image src="../../static/icon/post_view.png" class="icon"></image>
							<view class="text">{{item.hot}}</view>
						</view>
						<view class="time">
							<image src="../../static/icon/post_date.png" class="icon"></image>
							<view class="text">{{$formatDate(item.updateTime,false)}}</view>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom"></view>
		</view>

		<l-load-more ref="loadMore" :isImg="true"></l-load-more>

		<uni-drawer ref="showRight" :width="638" mode="right" :mask="true" :mask-click="true" @change="change($event,'showRight')">
			<view class="scroll-view">
				<scroll-view class="scroll-view-box" scroll-y="true">
					<view class="item">

						<view class="titleBox marginBox">
							<view class="itemName">地区</view>
							<image src="../../static/arrow.png" class="arrow" @click="provinceShow = !provinceShow" :class="provinceShow?'rotate':''"></image>
						</view>
						<view class="flexBox">
							<view class="items" v-for="(item,index) in options" :class="[index%3 == 1 ? 'itemCenter' : '',provinceSelect == item.name ? 'itemSelect':'']"
							 :key="index" v-show="provinceShow || index < 3" @click="selectProvince(item.name)">
								{{item.name}}
								<image src="../../static/icon/serach_filter_cancel.png" class="img" v-if="provinceSelect == item.label"></image>
							</view>
						</view>

						<view class="titleBox marginBox" v-if="screenOne.length!==0">
							<view class="itemName">求医</view>
							<!-- <image src="../../static/arrow.png" class="arrow" @click="bigTypeList = !bigTypeList" :class="bigTypeList?'rotate':''"></image> -->
							<image src="../../static/arrow.png" class="arrow rotate"></image>
						</view>
						<view class="flexBox" :class="bigTypeList ? 'showAll':''" v-if="screenOne.length!==0">
							<view class="items" v-for="(item,index) in screenOne" :class="[index%3 == 1 ? 'itemCenter' : '',bigTypeSelect == item.id ? 'itemSelect':'']"
							 :key="index" v-show="bigTypeList || index < 3" @click="selectBigType(item)">
								{{item.name}}
								<image src="../../static/icon/serach_filter_cancel.png" class="img" v-if="bigTypeSelect == item.id"></image>
							</view>
						</view>
						<view class="titleBox marginBox" v-if="screenTwo.length!==0">
							<view class="itemName">医疗供应</view>
							<image src="../../static/arrow.png" class="arrow rotate"></image>
						</view>
						<view class="flexBox" :class="bigTypeList ? 'showAll':''" v-if="screenTwo.length!==0">
							<view class="items" v-for="(item,index) in screenTwo" :class="[index%3 == 1 ? 'itemCenter' : '',smallTypeSelect == item.id ? 'itemSelect':'']"
							 :key="index" v-show="bigTypeList || index < 3" @click="selectSmallType(item)">
								{{item.name}}
								<image src="../../static/icon/serach_filter_cancel.png" class="img" v-if="smallTypeSelect == item.id"></image>
							</view>
						</view>
						<view class="titleBox marginBox" v-if="screenThree.length !== 0">
							<view class="itemName">成功案例</view>
							<!-- <image src="../../static/arrow.png" class="arrow" @click="bigTypeList = !bigTypeList" :class="bigTypeList?'rotate':''"></image> -->
							<image src="../../static/arrow.png" class="arrow rotate"></image>
						</view>
						<view v-if="screenThree.length !== 0" class="flexBox" :class="bigTypeList ? 'showAll':''">
							<view class="items" v-for="(item,index) in screenThree" :class="[index%3 == 1 ? 'itemCenter' : '',sortType == item.id ? 'itemSelect':'']"
							 :key="index" v-show="bigTypeList || index < 3" @click="selectSortType(item)">
								{{item.name}}
								<image src="../../static/icon/serach_filter_cancel.png" class="img" v-if="sortType == item.id"></image>
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="buttonBox">
					<view class="button">
						<view class="left" @click="reset()">重置</view>
						<view class="right" @click="refreshPost();closeDrawer('showRight')">确认</view>
					</view>
				</view>
			</view>
		</uni-drawer>

	</view>
</template>

<script>
	import options from "@/utils/country-data";
	export default {
		components: {},
		data() {
			return {
				options: options,
				postTypeList: [{
						name: '全部',
						value: ''
					},
					{
						name: '求医',
						value: 0
					},
					{
						name: '医疗供应',
						value: 1
					},
					{
						name: '成功案例',
						value: 2
					}
				],
				bigType: [],
				selectType: 0,
				PostList: [],
				page: 1,
				size: 6,
				bePage: 0,
				showRight: false,

				bigTypeList: false,
				bigTypeSelect: '',

				smallTypeList: false,
				smallTypeSelect: '',
				smallType: [],

				provinceShow: false,
				provinceSelect: '',

				sortType: "",
				keyword: '',
				topSort: true,
				srceen: [],
				screenOne: [],
				screenTwo: [],
				screenThree: [],

				publishType1: '',
				publishType2: '',
				publishType3: '',

				publishTypes: [],
				typeSons: []
			}
		},
		onLoad(options) {
			if (options.hasOwnProperty('keyword')) {
				this.keyword = options.keyword
			}
			if (options.hasOwnProperty('parentId')) {
				this.bigTypeSelect = options.parentId
				console.log(this.bigTypeSelect)
			}
			// if (options.hasOwnProperty('childId')) {
			// 	this.smallTypeSelect = options.childId
			// }
			this.getType()
			this.getPost()
			this.getScreen()
		},
		computed: {
			getImage(item) {
				return (item) => {
					if (item != '[]') {
						return JSON.parse(item).slice(0, 3)
					} else {
						return
					}
				}
			}
		},
		watch: {
			// bigTypeSelect() {
			// 	if (this.bigTypeSelect != '') {
			// 		this.changeSmallType()
			// 	} else {
			// 		this.smallTypeList = false
			// 		this.smallTypeSelect = ''
			// 		this.smallType = []
			// 	}
			// },
			selectType() {
				this.page = 1
				this.bePage = 0
				this.$refs.loadMore.$loading()
				this.getPost()
			}
		},
		methods: {
			getScreen() {
				this.$http_normal({
					url: '/api/post/web/screen',
					method: 'get'
				}).then(res => {
					this.screen = res.data
					this.screenOne = this.screen.filter(v => {
						return v.ptype == 0
					})
					this.screenTwo = this.screen.filter(v => {
						return v.ptype == 1
					})
					this.screenThree = this.screen.filter(v => {
						return v.ptype == 2
					})
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/index?id=' + id
				})
			},
			backIndex() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			reset() {
				this.topSort = true
				this.bigTypeSelect = ''
				this.smallTypeSelect = ''
				this.provinceSelect = ''
				this.bigTypeList = ''
				this.smallTypeList = ''
				this.provinceShow = '',
					this.sortType = ""
				this.publishType1 = ''
				this.publishType2 = ''
				this.publishType3 = ''
				this.refreshPost()
				this.closeDrawer('showRight')
			},
			refreshPost() {
				this.page = 1
				this.bePage = 0
				this.$refs.loadMore.$loading()
				this.getPost()
			},
			// changeSmallType() {
			// 	let _this = this
			// 	this.$http_normal({
			// 		url: `/api/postType/page`
			// 	}).then(res => {
			// 		_this.smallType = res.data.content.filter(arr => arr.parentId == this.bigTypeSelect);
			// 	});
			// },
			selectSmallType(item) {
				if (this.smallTypeSelect != item.id) {
					this.smallTypeSelect = item.id
					this.publishType2 = item.ptype
				} else {
					this.smallTypeSelect = ''
					this.publishType2 = ''
				}
			},
			selectSortType(item) {
				if (this.sortType != item.id) {
					this.sortType = item.id
					this.publishType3 = item.ptype
				} else {
					this.sortType = ''
					this.publishType3 = ''
				}
			},
			selectBigType(item) {
				if (this.bigTypeSelect != item.id) {
					this.bigTypeSelect = item.id
					this.publishType1 = item.ptype
					console.log(this.publishType1)
				} else {
					this.bigTypeSelect = ''
					this.publishType1 = ''
				}
			},
			selectProvince(i) {
				if (this.provinceSelect != i) {
					this.provinceSelect = i
				} else {
					this.provinceSelect = ''
				}
			},
			showDrawer(e) {
				this.publishTypes = []
				this.typeSons = []
				this.$refs[e].open()
			},
			// 关闭窗口
			closeDrawer(e) {
				this.$refs[e].close()
			},
			// 抽屉状态发生变化触发
			change(e, type) {
				this[type] = e
			},
			onReachBottom() {
				this.page = this.page + 1
				this.getPost()
			},
			getType() {
				let _this = this
				this.$http_normal({
					url: `/api/postType/page`
				}).then(res => {
					_this.bigType = res.data.filter(arr => arr.parentId === null);
				});
			},
			getPost() {
				let _this = this
				if (_this.page < _this.bePage) {
					_this.$refs.loadMore.$loadError();
					return
				}
				this.publishTypes = []
				this.typeSons = []
				if (this.publishType1 !== '') {
					this.publishTypes.push(this.publishType1)
				}
				if (this.publishType2 !== '') {
					this.publishTypes.push(this.publishType2)
				}
				console.log(this.publishTypes)
				if (this.publishType3 !== '') {
					this.publishTypes.push(this.publishType3)
				}


				if (this.bigTypeSelect !== '') {
					this.typeSons.push(this.bigTypeSelect)
				}
				if (this.smallTypeSelect !== '') {
					this.typeSons.push(this.smallTypeSelect)
				}
				if (this.sortType !== '') {
					this.typeSons.push(this.sortType)
				}
				this.$http_normal({
					url: `/api/post/web/page?isAuthentication=1${this.publishTypes.length!==0?`&publishTypes=${this.publishTypes.join(",")}`:''}${this.typeSons.length!==0?`&typeSons=${this.typeSons.join(",")}`:''}${this.keyword?`&title=${this.keyword}`:''}${this.postTypeList[Number(_this.selectType)].value!==''?`&publishType=${this.postTypeList[Number(_this.selectType)].value}`:''}${this.provinceSelect?`&province=${this.provinceSelect}`:''}`,
					method: 'get',
					params: {
						// publishType: _this.postTypeList[Number(_this.selectType)].value,
						page: _this.page - 1,
						size: _this.size,
						// title: _this.keyword,
						// publishTypes: this.publishTypes.join(","),
						// typeSons: this.typeSons.join(",")
					}
				}).then(res => {
					if (_this.page == 1) {
						_this.PostList = []
					}
					_this.$refs.loadMore.$loading()
					_this.bePage = _this.page - 1
					let list = res.data.content
					if (res.data.content.length < _this.size) {
						_this.$refs.loadMore.$loadOver();
						uni.stopPullDownRefresh();
					}
					for (let i = 0; i < list.length; i++) {
						_this.PostList.push(list[i])
					}

				}).catch(e => {
					_this.$refs.loadMore.$loadError();
				});
			},
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">

</style>
