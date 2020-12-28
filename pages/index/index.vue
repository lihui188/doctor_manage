<template>
	<view class="content">
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="followBox">
				<image :src="convert(wxQRCode)" class="img" mode="aspectFill" @longpress="saveImg(wxQRCode)">
					<view class="text">
						客服微信二维码
					</view>
					<view class="text2">
						长按保存到手机，微信扫码添加
					</view>
					<view class="buttonBox" @click="hide()">
						确认
					</view>
			</view>
		</uni-popup>

		<view class="backTopBox" @click="open()">
			<view class="backTop">
				<image src="../../static/icon/wechat.png" class="img"></image>
				<view class="text">客服微信</view>
			</view>
		</view>

		<view class="linkBox" @click="toPhone()">
			<view class="link">
				<image src="../../static/icon/post_service.png" class="img"></image>
				<view class="text">一键致电</view>
			</view>
		</view>

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
			<view class="right_city" @click="toChooseProvince">
				{{province === ''?'全国':province}}
			</view>
		</view>

		<view class="headNullBox" :style="{'padding-top': topHeight +'px'}">
			<view class="left"></view>
			<view class="right"></view>
		</view>

		<swiper class="swiper_img" :indicator-active-color="activeColor" :indicator-color="indicatorColor" :circular="circular"
		 :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,i) in swiperList" :key="i">
				<image :src="convert(item.image)" class="img" mode="scaleToFill" @click="toUrl(item.link)"></image>
			</swiper-item>
		</swiper>

		<!-- <view class="sortBox">
			<view class="titleBox">
				<view class="leftBox" @click="toResultParent(bigType[0].id)">
					<label>{{bigType[0].name}}</label>
					<image src="../../static/icon/right.png" class="rightImg"></image>
				</view>
				<view class="rightBox" @click="toPublish()">
					<image src="../../static/icon/index_publish.png" class="img"></image>
					<label>发布</label>
				</view>
			</view>
			<view class="bottomBox"> 
				<view class="itemBox" v-for="(item,index) in oneItemSort" :key="index" v-if="index < 8" :class="index < 3 ? 'blueColor':''" @click="toResult(item.parentId,item.id)">{{item.name}}</view>
			</view>
		</view> -->

		<view class="aboutBox">
			<view class="left" @click="toMine()">
				<image src="../../static/icon/phone.png" class="img"></image>
				<view class="text">联系我们</view>
			</view>
			<view class="right" @click="toAbout()">
				<image src="../../static/icon/peoples.png" class="img"></image>
				<view class="text">关于我们</view>
			</view>
		</view>
		<!-- <view class="newImgBox">
			<image src="../../static/lunbo/lunbo5.png" class="img"></image>
		</view> -->
		<swiper v-if="swiperList2.length!==0" class="swiper_img" :indicator-active-color="activeColor" :indicator-color="indicatorColor" :circular="circular"
		 :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
			<swiper-item v-for="(item,i) in swiperList2" :key="i">
				<image :src="convert(item.image)" class="img" mode="scaleToFill" @click="toUrl(item.link)"></image>
			</swiper-item>
		</swiper>

		<view class="sortBox">
			<view class="titleBox">
				<view class="leftBox" @click="toResultParent(indexType.id)">
					<label>{{indexType['name']}}</label>
					<!-- <label>成功案例</label> -->
					<image src="../../static/icon/right.png" class="rightImg"></image>
				</view>
				<view class="rightBox" @click="toPublish()">
					<image src="../../static/icon/index_publish.png" class="img"></image>
					<label>发布</label>
				</view>
			</view>
			<view class="bottomBox">
				<view class="itemBox" v-for="(item,index) in oneItemSort" :key="index" v-if="index < 8" :class="index < 3 ? 'blueColor':''"
				 @click="toResult(item.parentId,item.id)">{{item.name}}</view>
			</view>
		</view>

		<!-- <view class="hotClickTitle">
			<view class="line"></view>
			<view class="text">热门点击</view>
			<view class="line"></view>
		</view> -->

		<!-- <view class="navbarBox">
			<view class="navbarItem" v-for="(item,index) in postTypeList" :key="index">
				<view class="text">
					<view class="label" @click="selectType = index">
						<span :class="selectType == index ?'selectItem':''">{{item.name}}</span>
						<view class="line" v-if="selectType == index"></view>
					</view>
				</view>
			</view>
		</view> -->

		<view v-for="(item,index) in hotPostList" :key="index">
			<view class="hotPostListBox" @click="toDetail(item.id)">
				<view class="postTypeBox">
					<view class="type" v-if="item.pulish_type==0">求医 · {{item.tpName}}</view>
					<view class="type" v-if="item.pulish_type==1">医疗供应 · {{item.tpName}}</view>
					<view class="type" v-if="item.pulish_type==2">成功案例 · {{item.tpName}}</view>
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

	</view>
</template>

<script>
	import bus from '@/utils/bus.js'
	export default {
		components: {

		},
		data() {
			return {
				title: '医生论坛',
				indicatorDots: true, //指示点
				autoplay: true, //自动播放
				circular: true, //循环播放
				interval: 15000, //自动播放间隔时长(ms)
				duration: 500, //幻灯片切换时长(ms)
				activeColor: '#333333', //指示点选中颜色
				indicatorColor: '#bbbbbb', //指示点未选中颜色

				bigType: [{
					name: ''
				}],
				swiperList: [],
				swiperList2: [],
				oneItemSort: [],
				twoItemSort: [],

				postTypeList: [{
						name: '全部',
						value: ''
					},
					{
						name: '供应',
						value: '供应'
					},
					{
						name: '需求',
						value: '需求'
					},
					{
						name: '其他',
						value: '其他'
					}
				],
				selectType: '0',

				hotPostList: [],
				page: 1,
				size: 6,
				bePage: 0,
				wxQRCode: '',
				qqQRCode: '',
				hotLine: '',
				popup: false,
				callPhone: '',
				province: '',
				totalElements: 0,
				indexType: {
					name: '暂无'
				}
			}
		},
		onLoad() {
			this.getInfo()
			this.getSwiper()
			this.getSwiper2()
			this.getType()
			this.getOneItem()
			// this.getTwoItem()
			this.getHotPost()
		},

		onShow() {
			let _this = this
			bus.$off('getProvince')
			bus.$on('getProvince', res => {
				console.log(1111)
				this.province = res
				if (_this.province !== '') {
					_this.page = 1;
					_this.bePage = 0;
					_this.hotPostList = []
					_this.getHotPost()
				}
			})
			if (this.province === '') {
				this.getHotPost()
			}
		},
		// onHide () {
		//  bus.$off('getProvince')
		// },
		computed: {
			getImage() {
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
			selectType() {
				this.page = 1
				this.bePage = 0
				this.$refs.loadMore.$loading()
				this.getHotPost()
			}
		},
		onPullDownRefresh() {
			this.getInfo()
			this.getSwiper()
			this.getSwiper2()
			this.getType()
			this.getOneItem()
			// this.getTwoItem()
			this.page = 1
			this.size = 10
			this.getHotPost()
		},
		methods: {
			hide() {
				this.$refs.popup.close()
			},
			open() {
				this.$refs.popup.open()
			},
			saveImg(url) {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.convert(url),
					success: function() {
						plus.nativeUI.toast("保存图片成功");
					}
				});
				// #endif
			},
			toPhone() {
				if (this.callPhone == null || this.callPhone == '') {
					uni.showToast({
						title: '暂无客服电话',
						icon: 'none'
					})
					return
				}
				uni.makePhoneCall({
					phoneNumber: this.callPhone
				})
			},
			toChooseProvince() {
				uni.navigateTo({
					url: '/pages/district/index'
				})
			},
			toAbout() {
				uni.navigateTo({
					url: '/pages/about/index'
				})
			},
			toMine() {
				this.$vuex('ifLink', true)
				uni.switchTab({
					url: '/pages/mine/index'
				})
			},
			toPublish() {
				uni.switchTab({
					url: '/pages/publish/index'
				})
			},
			toUrl(url) {
				uni.navigateTo({
					url: `/pages/webview/index?url=` + url
				})
			},
			toResultParent(id) {
				uni.navigateTo({
					url: '/pages/result/index?parentId=' + id
				})
			},
			toResult(parentId, id) {
				uni.navigateTo({
					url: '/pages/result/index?parentId=' + parentId + '&childId=' + id
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/index?id=' + id
				})
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},

			getInfo() {
				this.$http_normal({
					url: `/api/platformInformation/get`,
					method: 'get'
				}).then(res => {
					this.wxQRCode = res.data.wxQRCode;
					this.qqQRCode = res.data.qqQRCode;
					this.hotLine = res.data.hotLine;
					this.callPhone = res.data.consumerHotline;
				});
			},
			onReachBottom() {
				if (this.page * this.size <= this.totalElements) {
					this.page = this.page + 1
					this.getHotPost()
				} else {
					return
				}
			},
			getHotPost() {
				let _this = this
				if (_this.page < _this.bePage) {
					_this.$refs.loadMore.$loadError();
					return
				}
				this.$http_normal({
					url: `/api/post/web/page?isAuthentication=true${this.province?`&province=${this.province}`:''}`,
					params: {
						// type: _this.postTypeList[Number(_this.selectType)].value,
						page: _this.page - 1,
						size: _this.size
					}
				}).then(res => {
					this.totalElements = res.data.totalElements;
					if (_this.page == 1) {
						_this.hotPostList = []
					}
					// if(_this.province !== ''){

					// }
					_this.$refs.loadMore.$loading()
					_this.bePage = _this.page - 1
					let list = res.data.content
					if (res.data.content.length < _this.size) {
						_this.$refs.loadMore.$loadOver();
						uni.stopPullDownRefresh();
					}
					for (let i = 0; i < list.length; i++) {
						_this.hotPostList.push(list[i])
					}
				}).catch(e => {
					_this.$refs.loadMore.$loadError();
				});

			},
			getSwiper() {
				let _this = this
				this.$http_normal({
					url: `api/carousel/xcx/list`,
					method: 'get',
					params: {
						type: 0,
					}
				}).then(res => {
					_this.swiperList = res.data;
				});
			},
			getSwiper2() {
				let _this = this
				this.$http_normal({
					url: `api/carousel/xcx/list`,
					params: {
						type: 1
					}
				}).then(res => {
					_this.swiperList2 = res.data;
				});
			},
			getType() {
				this.$http_normal({
					url: `/api/postType/list/father`,
					method: 'get'
				}).then(res => {
					this.bigType = res.data
					this.indexType = res.data[0];
					console.log(this.bigType)
				});
			},
			getOneItem() {
				let _this = this
				this.$http_normal({
					url: `/api/postType/list/son`,
					method: 'get',
				}).then(res => {
					if (res.status === 200) {
						_this.oneItemSort = res.data
					}

				})
			},
			// getTwoItem() {
			// 	let _this = this
			// 	this.$http_normal({
			// 		url: `/api/postType/page`,
			// 		params: {
			// 			parentId: 2
			// 		}
			// 	}).then(res => {
			// 		_this.twoItemSort = res.data.content

			// 	})
			// },

		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">

</style>
