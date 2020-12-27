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

		<view class="mineInfoBox" @click="toHide();toInformation()">
			<image src="../../static/unLogin.png" class="left" mode="aspectFill" v-if="myMes.avatar == null"></image>
			<image :src="convert(myMes.avatar)" class="left" mode="aspectFill" v-if="myMes.avatar != null"></image>
			<view class="center">
				<view class="name">{{myMes.nickname != null ? myMes.nickname :'用户名'}}
				<span v-if="myMes.roles[0].name === '医生'" class="color-doctor">{{myMes.roles[0].name}}</span>
				<span v-if="myMes.roles[0].name === '普通用户'" class="color-user">{{myMes.roles[0].name}}</span>
				</view>
				<view class="company">{{myMes.province != null ? myMes.province+myMes.city+myMes.area :'请前往填写地址信息'}}</view>
				<view class="phone">{{noPassByMobile(myMes.phone||'请绑定手机')}}</view>
			</view>
			<image src="../../static/arrow.png" class="right"></image>
		</view>

		<view @click="toHide()" class="topNavbarBox">
			<view class="navbarBox">
				<view class="navbarItem" v-for="(item,index) in myModeList" :key="index">
					<view class="text">
						<view class="label" @click="selectIndex(index)">
							<span :class="modeType == index ?'selectItem':''">{{item.name}}</span>
							<view class="line" v-if="modeType == index"></view>
						</view>
					</view>
				</view>
				<view class="navbarItem" v-if="myMes.roles[0].name === '普通用户'">
					<view class="text color-red">
						<view class="label" @click.stop="toDoctor">
							<span>成为医生</span>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="garyBox" v-show="modeType == 0">

			<xfl-select :list.sync="certList" :clearable="false" :showItemNum="7" :listShow="false" :isCanInput="false"
			 :style_Container="listBoxStyle" :placeholder="'认证状态'" :selectHideType="'hideAll'" @change="changeCert" ref="selectCert">
			</xfl-select>

			<xfl-select :list.sync="list" :clearable="false" :showItemNum="7" :listShow="false" :isCanInput="false"
			 :style_Container="listBoxStyle2" :placeholder="'审核状态'" :selectHideType="'hideAll'" @change="change" ref="selects">
			</xfl-select>

			<view style="flex: 1;height: 100%;" @click="toHide()">

			</view>
		</view> -->

		<view style="width:100%;" class="navbarListBox" @click="toHide()" v-if="modeType == 0">
			<view class="navbarBox">
				<view class="navbarItem" v-for="(item,index) in postTypeList" :key="index">
					<view class="text">
						<view class="label" @click="selectType = index">
							<span :class="selectType == index ?'selectItem':''">{{item.name}}</span>
							<view class="line" v-if="selectType == index"></view>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view v-if="modeType == 0">
			<view v-for="(item,index) in PostList" :key="index">
				<view class="hotPostListBox" @click="toHide();toDetail(item.id)">
					<!-- <view style="display: flex;align-items: center;">
						<view class="postStatus">
							{{item.isExamine != null ? (item.isExamine == false ? '审核未通过' : '审核通过' ) : '审核中' }}
						</view>
						<view class="center">·</view>
						<view class="postStatus" :class="item.isExamine == true ? 'blueText':''">
							{{item.isAuthentication != null ? (item.isAuthentication == false ? '认证未通过' : '已认证' ) : '认证中' }}
						</view>
					</view> -->
					<view class="postTypeBox color-unAudit" v-if="item.isExamine==1&&item.isAuthentication == false">未认证</view>
					<view class="postTypeBox color-pass" v-if="item.isExamine==1&&item.isAuthentication">已认证</view>
					<view class="postTypeBox color-cancel" v-if="item.isExamine===0">未审核</view>
					<view class="postTypeBox color-unpass" v-if="item.isExamine===-1">被驳回</view>
					<view class="postTypeBox">
						<view class="type" v-if="item.pulish_type === 0">求医 · {{item.tpName}}</view>
						<view class="type" v-if="item.pulish_type === 1">医疗供应 · {{item.tpName}}</view>
						<view class="type" v-if="item.pulish_type === 2">成功案例 · {{item.tpName}}</view>
						<view class="number">编号：{{item.code}}</view>
					</view>
					<view class="postTitleBox">
						{{item.title}}
					</view>
					<view class="imgBox" v-if="item.imageList != '[]'">
						<image class="imgItem" :src="convert(items)" mode="aspectFill" v-for="(items,indexs) in getImage(item.imageList)"
						 :key="indexs" :class="indexs == 1 ? 'center':''"></image>
					</view>

					<view class="detailBox">
						<view class="left">
							<image src="../../static/icon/post_location.png" class="icon"></image>
							<view class="text">{{item.province + item.city}}</view>
						</view>
						<view class="right">
							<view class="viewNum">
								<image src="../../static/icon/post_view.png" class="icon"></image>
								<view class="text">{{item.hot}}</view>
							</view>
							<view class="time">
								<image src="../../static/icon/post_date.png" class="icon"></image>
								<view class="text">{{$formatDate(item.createTime,false)}}</view>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom"></view>
			</view>
		</view>

		<view v-if="modeType == 1" class="hotLineClass">
			<image :src="convert(wxQRCode)" class="img" @longpress="saveImg(wxQRCode)"></image>
			<view class="text">客服微信二维码</view>
			<image :src="convert(qqQRCode)" class="img" @longpress="saveImg(qqQRCode)"></image>
			<view class="text">客服QQ二维码</view>
			<pre>{{hotLine}}</pre>
		</view>

		<view v-if="modeType == 2" class="messageBox">
			<view class="leaveBox">
				<view class="buttonBox" @click="toAddMail()">
					<image src="../../static/icon/message.png" class="img"></image>
					<view class="text">给平台留言</view>
				</view>
			</view>

			<view class="messageListBox" v-for="(item,index) in messageList" :key="index" @click="toMailDetail(item.id)">
				<view class="replyText">
					<image src="../../static/icon/my_mail_new.png" class="newIcon" v-if="ifNew(item.createTime)"></image>
					<label>平台回复：</label>
				</view>
				<view class="replyContent">
					{{item.replyText}}
				</view>
				<view class="time">
					{{$formatDate(item.createTime)}}
				</view>
			</view>
		</view>
		<l-load-more ref="loadMore" :isImg="true" v-show="modeType != 1"></l-load-more>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				title: '医生论坛',
				myMes: {},
				myModeList: [{
						name: '我的发布',
						value: '我的发布'
					},
					{
						name: '联系平台',
						value: '联系平台'
					},
					{
						name: '站内信',
						value: '站内信'
					}
				],
				selectType: 0,
				listBoxStyle: `width: 200upx;white-space: nowrap;height: 100%;font-size: 26upx;color:#505050;border-radius: 32upx;`,
				listBoxStyle2: `width: 200upx;white-space: nowrap;height: 100%;font-size: 26upx;color:#505050;border-radius: 32upx;margin-right: 16upx`,
				list: [{
					name: '全部',
					val: 0
				}, {
					name: '审核中',
					val: 1
				}, {
					name: '审核通过',
					val: 2
				}, {
					name: '审核未通过',
					val: 3
				}],
				certList: [{
					name: '全部',
					val: 0
				}, {
					name: '认证中',
					val: 1
				}, {
					name: '已认证',
					val: 2
				}, {
					name: '认证未通过',
					val: 3
				}],
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
				modeType: 0,

				PostList: [],
				page: 1,
				size: 6,
				bePage: 0,
				hotLine: '',
				wxQRCode: '',
				qqQRCode: '',
				messageList: [],

				mailPage: 1,
				mailSize: 6,
				mailBePage: 0,

				//审核
				isExamine: '',
				isExamineNotNull: '',
				//认证
				isAuthentication: '',
				isAuthenticationNotNull: '',
				// 已发帖总条数
				totalElements:0,
				// 站内信条数
				mailTotalElements:0
			}
		},
		onLoad() {

			this.getInfo()
			this.getType()

		},
		onShow() {
			this.getUserInfo()
			this.getMail()
			this.getPost()
			if (this.ifLink == true) {
				this.modeType = 1
				this.$vuex('ifLink', false)
			}
		},
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
				this.getPost()

			},
			modeType() {
				uni.startPullDownRefresh()

				if (this.modeType == 2) {
					this.mailPage = 1
					this.mailBePage = 0

					this.getMail()
					this.$refs.loadMore.$loading()
				} else if (this.modeType == 0) {
					this.page = 1
					this.bePage = 0

					this.getPost()
					this.$refs.loadMore.$loading()
				}

			}
		},
		methods: {
			getUserInfo() {
				let _this = this
				this.$http_normal({
					url: '/api/user/getUser',
					method: 'get'
				}).then(res => {
					this.myMes = res.data
				})
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
			noPassByMobile(str) {
				if (null != str && str != undefined) {
					var pat = /(\d{3})\d*(\d{4})/;
					return str.replace(pat, '$1 **** $2');
				} else {
					return "";
				}
			},
			ifNew(time) {
				let diff = this.$dateDiff(new Date(), time)

				if (diff.weeks == 0) {
					return true
				} else {
					return false
				}
			},
			toSearch() {
				uni.navigateTo({
					url: '/pages/search/index'
				})
			},
			toInformation() {
				uni.navigateTo({
					url: '/pages/information/index'
				})
			},
			toAddMail() {
				uni.navigateTo({
					url: '/pages/addMail/index'
				})
			},
			toMailDetail(id) {
				uni.navigateTo({
					url: '/pages/mailDetail/index?id=' + id
				})
			},
			toDetail(id) {
				uni.navigateTo({
					url: '/pages/detail/index?id=' + id
				})
			},
			selectIndex(index) {
				this.modeType = index
			},
			getMail() {
				let _this = this

				if (_this.mailPage < _this.mailBePage) {
					_this.$refs.loadMore.$loadError();
					return
				}

				this.$http_normal({
					url: `/api/infoFeedBack/my/page?sort=createdAt,desc`,
					method: 'get',
					params: {
						page: this.mailPage - 1,
						size: this.mailSize,
						uid:this.myMes.id
					}
				}).then(res => {
					this.mailTotalElements = res.data.totalElements
					if (_this.mailPage == 1) {
						this.messageList = []
					}
					_this.$refs.loadMore.$loading()
					_this.mailBePage = _this.mailPage - 1
					let list = res.data.content
					if (res.data.content.length < _this.mailSize) {
						_this.$refs.loadMore.$loadOver();
						uni.stopPullDownRefresh();
					}
					for (let i = 0; i < list.length; i++) {
						_this.messageList.push(list[i])
					}

				}).catch(e => {
					_this.$refs.loadMore.$loadError();
				});

			},
			getInfo() {
				this.$http_normal({
					url: `api/platformInformation/get`,
					method: 'get'
				}).then(res => {
					this.wxQRCode = res.data.wxQRCode;
					this.qqQRCode = res.data.qqQRCode;
					this.hotLine = res.data.hotLine;

				});
			},
			toHide() {
				// this.$refs.selects.switchMgr.close(100)
				// this.$refs.selectCert.switchMgr.close(100)
			},
			changeCert({
				newVal,
				oldVal,
				index,
				orignItem
			}) {
				if (orignItem.val == 0) {
					this.isAuthentication = ''
					this.isAuthenticationNotNull = ''
				} else if (orignItem.val == 1) {
					this.isAuthentication = ''
					this.isAuthenticationNotNull = false
				} else if (orignItem.val == 2) {
					this.isAuthentication = true
					this.isAuthenticationNotNull = true
				} else if (orignItem.val == 3) {
					this.isAuthentication = false
					this.isAuthenticationNotNull = true
				}
				this.page = 1
				this.bePage = 0
				this.getPost()
				this.$refs.loadMore.$loading()
			},
			change({
				newVal,
				oldVal,
				index,
				orignItem
			}) {
				if (orignItem.val == 0) {
					this.isExamine = ''
					this.isExamineNotNull = ''
				} else if (orignItem.val == 1) {
					this.isExamine = ''
					this.isExamineNotNull = false
				} else if (orignItem.val == 2) {
					this.isExamine = true
					this.isExamineNotNull = true
				} else if (orignItem.val == 3) {
					this.isExamine = false
					this.isExamineNotNull = true
				}
				this.page = 1
				this.bePage = 0
				this.getPost()
				this.$refs.loadMore.$loading()
			},
			onReachBottom() {
				if (this.modeType == 0) {
					if(this.page*this.size<=this.totalElements){
						this.page = this.page + 1
						this.getPost()
					}else{
						return
					}
					
				} else if (this.modeType == 2) {
					if(this.mailPage*this.mailSize<=this.mailTotalElements){
						this.mailPage = this.mailPage + 1
						this.getMail()
					}else{
						return
					}
					
				}
			},
			getType() {
				this.$http_normal({
					url: `/api/postType/list/father`
				}).then(res => {
					this.bigType = res.data.filter(arr => arr.parentId === null);
					console.log(this.bigType)
				});
			},
			getPost() {
				let _this = this
				if (_this.page < _this.bePage) {
					_this.$refs.loadMore.$loadError();
					return
				}

				this.$http_normal({
					url: '/api/post/web/my/page?sort=createdAt,desc',
					params: {
						publishType: _this.postTypeList[Number(_this.selectType)].value,
						page: _this.page - 1,
						size: _this.size
					},
					method: 'get'
				}).then(res => {
					this.totalElements  = res.data.totalElements;
					if (_this.page == 1) {
						_this.PostList = []
					}
					_this.$refs.loadMore.$loading()
					_this.bePage = _this.page - 1
					let list = res.data.content
					if (list.length < _this.size) {
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
			toDoctor() {
				uni.navigateTo({
					url: '/pages/doctor/index?id='+this.myMes.id
				})
			}

		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">

</style>
