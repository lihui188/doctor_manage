<template>
	<view class="content">
		
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">帖子详情</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>
		
		<view class="detailBox" v-if="showDetail">
			<view class="postTypeBox">
				<view class="type" v-if="post.publishType == 0">求医 · {{post.type}} · {{post.typeSon}} </view>
				<view class="type" v-if="post.publishType == 1">医疗供应 · {{post.type}} · {{post.typeSon}} </view>
				<view class="type" v-if="post.publishType == 2">成功案例 · {{post.type}} · {{post.typeSon}} </view>
				<view class="number">编号：{{post.code}}</view>
			</view>
			<view class="postDetailBox">
				<view class="leftBox">
					<view class="title">{{post.title}}</view>
					<view class="itemBox">
						<image src="../../static/icon/post_location.png" class="icon"></image>
						<view class="text margin">{{post.province}} {{post.city}}</view>
						<view class="text">浏览：{{post.hot}}</view>
					</view>
					<view class="itemBox">
						<view class="last">最后更新：{{$formatDate(post.updateTime)}}</view>
					</view>
				</view>
				<view class="rightBox">
					<view>
						<image src="../../static/icon/post_review_true.png" class="img" v-if="post.isExamine === 1"></image>
						<image src="../../static/icon/post_review_false.png" class="img" v-if="post.isExamine === 0"></image>
					</view>
					<view>
						<image src="../../static/icon/post_certify_true.png" class="state" v-if="post.isAuthentication"></image>
						<image src="../../static/icon/post_certify_false.png" class="state" v-if="!post.isAuthentication"></image>
					</view>
					<!-- <view v-if="post.isExamine != false">
						<image src="../../static/icon/post_review_true.png" class="img" v-if="post.isExamine === 1"></image>
						<image src="../../static/icon/post_review_false.png" class="img" v-if="post.isExamine === 0"></image>
					</view>
					<view v-if="post.isAuthentication != false">
						<image src="../../static/icon/post_certify_true.png" class="state" v-if="post.isAuthentication"></image>
						<image src="../../static/icon/post_certify_false.png" class="state" v-if="post.isAuthentication == null"></image>
					</view> -->
					
				</view>
			</view>
			<view class="postContent" v-html="toSovle(post.content)">
				
			</view>
		</view>
		
		<view class="backTopBox" v-if="flag" @click="top()">
			<view class="backTop">
				<image src="../../static/icon/index_backtotop.png" class="img"></image>
				<view class="text">回到顶点</view>
			</view>
		</view>
		
		<view class="linkBox" @click="open">
			<view class="link">
				<image src="../../static/icon/post_service.png" class="img"></image>
				<view class="text">联系方式</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="followBox">
				<view class="hotLine">
					联系电话：
					<label class="hotText">{{hotLine}}</label>
				</view>
				<view class="qrCodeBox">
					<view class="text">
						微信二维码：
					</view>
					<image :src="convert(wxQRCode)" class="img" mode="aspectFill" @longpress="saveImg(wxQRCode)">
				</view>
				
				<view class="buttonBox" @click="hide()">
					确认
				</view>
			</view>
		</uni-popup>

			
	</view>
</template>

<script>
	import { baseUrl } from '@/global/js/baseUrl.js'
	export default {
		components: {},
		data() {
			return {
				id: '',
				baseUrl: baseUrl,
				showDetail: false,
				post: {},
				bigType: [{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''},{name: ''}],
				flag: false,
				popup: false,
				visible: false,
				wxQRCode:'',
				hotLine:''
			}
		},
		onLoad(options) {
			this.id = options.id
		},
		created() {
			// this.getType()
			this.getDetail()
			this.getInfo();
		},
		mounted() {
			// this.$refs.headPlaceBox.$el.style.height = this.$refs.topTitleBox.$el.clientHeight
		},
		methods: {
			saveImg(url){
				// #ifndef H5
					uni.saveImageToPhotosAlbum({
						filePath: this.convert(url),
						success: function () {
							plus.nativeUI.toast("保存图片成功");
						}
					});
				// #endif
			},
			hide(){
				this.$refs.popup.close()
			},
			open(){
			    this.$refs.popup.open()
			},
			toSovle(text){
				
				let ToReplace = 'src="' + this.baseUrl + '/upload'
				let content = text.replace(/src="http(\S*)\/upload/g, ToReplace)
				let content1 = content.replace(/pre/g,"p")
				let contents = content1.replace(/<img/g,"<img style='max-width:100%;height:auto;'")
				
				return contents.replace(/<video/g,"<video style='width:100%;height:30vh;'")
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
			getInfo() {
				this.$http_normal({
					url: `api/platformInformation/get`,
					method: 'get'
				}).then(res => {
					this.wxQRCode = res.data.wxQRCode;
					this.hotLine = res.data.hotLine;
			
				});
			},
			getType(){
				let _this = this
				this.$http_normal({
					url: `/api/postType/page`
				}).then(res => {
					_this.bigType = res.data.content.filter(arr => arr.parentId == 0);
				});
			},
			getDetail() {
			      this.$http_normal({
			        url: `/api/post/get/` + this.id,
			        method: "get",
			        params: {
			          id: this.id
			        }
			      }).then(res => {
					  this.post = res.data
					  this.$nextTick(() => {
					  	this.showDetail = true
					  })
			      });
			 },
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
