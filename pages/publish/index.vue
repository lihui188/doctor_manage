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

		<view class="publishBox" v-show="step == 1">
			<view class="textBox">

				<view class="text">
					网站为患者提供免费发帖
				</view>
				<view class="text2">
					如确认合作请联系网站客服进行医疗流程监控
					流程收费：网站收费（动态浮动不等，约500-1000，根据具体病例决定收费方式，涵盖但不限于 平台服务费+医师+病情评估+联系医师+医疗保险+医疗意外保险等）
				</view>
				<view class="text3">
					<span>具体请看：</span><span class="agreement" @click="open">找医第三方协议</span>
				</view>
			</view>
			<view class="title">
				<view class="line"></view>
				<view class="text">基本信息</view>
			</view>
			<view class="itemBox">
				<label class="label">*</label>
				<label class="text">请选择发布类型</label>
			</view>
			<view class="radioFlex">
				<view class="radioBox" @click="roundChange(0)" v-if="mymes.roles[0].name === '普通用户'||mymes.roles[0].name === '医生'">
					<view class="roundRadio">
						<view class="selected" v-if="roundChecked == 0"></view>
					</view>
					求医

				</view>
				<view class="radioBox" @click="roundChange(1)" v-if="mymes.roles[0].name !== '普通用户'||mymes.roles[0].name === '医院'||mymes.roles[0].name === '平台'">
					<view class="roundRadio">
						<view class="selected" v-if="roundChecked == 1"></view>
					</view>
					医疗供应
				</view>
				<view class="radioBox" @click="roundChange(2)" v-if="mymes.roles[0].name !== '普通用户'||mymes.roles[0].name === '医院'||mymes.roles[0].name === '平台'">
					<view class="roundRadio">
						<view class="selected" v-if="roundChecked == 2"></view>
					</view>
					成功案例
				</view>
			</view>
			<view class="itemBox">
				<label class="label">*</label>
				<label class="text">请选择医保类型</label>
			</view>
			<view class="radioFlex">
				<view class="radioBox" @click="healthChange(0)">
					<view class="roundRadio">
						<view class="selected" v-if="healthType == 0"></view>
					</view>无医保

				</view>
				<view class="radioBox" @click="healthChange(1)">
					<view class="roundRadio">
						<view class="selected" v-if="healthType == 1"></view>
					</view>
					农合医保

				</view>
				<view class="radioBox" @click="healthChange(2)">
					<view class="roundRadio">
						<view class="selected" v-if="healthType == 2"></view>
					</view>
					职工医保
				</view>
				<view class="radioBox" @click="healthChange(3)">
					<view class="roundRadio">
						<view class="selected" v-if="healthType == 3"></view>
					</view>
					其他医保
				</view>
			</view>
			<view class="itemBox">
				<label class="label">*</label>
				<label class="text">可用资金</label>
			</view>
			<view class="selectSort">
				<input class="avaliable" type="number" maxlength="8" v-model="available" placeholder="请输入可用资金数" @input="check" />
			</view>

			<view class="itemBox">
				<label class="label">*</label>
				<label class="text">请选择发布分类</label>
			</view>
			<view class="selectSort" @click="toSelectType()">
				<view class="select gary" v-if="smallTypeObj == ''">请选择</view>
				<view class="select" v-if="smallTypeObj != ''">{{getBigName(smallTypeObj.parentId) + ' ' + smallTypeObj.name}}</view>
				<image src="../../static/arrow.png" class="icon"></image>
			</view>
			<view class="itemBox">
				<label class="label">*</label>
				<label class="text">请选择发布到哪个地区</label>
			</view>
			<pick-regions :defaultRegion="defaultRegion" @getRegion="handleGetRegion">
				<view class="selectSort">
					<view class="select gary" v-if="postProvince == ''">请选择</view>
					<view class="select" v-if="postProvince != ''">{{postProvince + ' ' + postCity + ' ' + postArea}}</view>
					<image src="../../static/arrow.png" class="icon"></image>
				</view>
			</pick-regions>
			<view class="buttonBox">
				<view class="leftButton" @click="backIndex()">
					取消
				</view>
				<view class="rightButton" @click="nextTwo()">
					下一步
				</view>
			</view>

		</view>

		<view class="publishBox" v-show="step == 2">
			<view class="title">
				<view class="line"></view>
				<view class="text">个人信息</view>
			</view>
			<view class="tipBox">
				小提示：选填项填写越完整信用指数越高哦！
			</view>
			<view class="itemBox2">
				<label class="label">*</label>
				<label class="text">联系人</label>
			</view>
			<view class="selectSort2">
				<input type="text" class="input" maxlength="8" placeholder="请填写" placeholder-class="place" v-model="contactName" />
			</view>

			<view class="itemBox2">
				<label class="label">*</label>
				<label class="text">联系人电话</label>
			</view>
			<view class="selectSort2">
				<input type="number" class="input" maxlength="16" placeholder="请填写" placeholder-class="place" v-model="phone" />

			</view>

			<view class="itemBox2">
				<label class="label">*</label>
				<label class="text">联系地址</label>
			</view>
			<pick-regions :defaultRegion="selectedOptions" @getRegion="handleGetRegion2">
				<view class="selectSort2">
					<view class="select gary" v-if="form.province == ''">请选择</view>
					<view class="select" v-if="form.province != ''">{{form.province + ' ' + form.city + ' ' + form.area}}</view>
					<image src="../../static/arrow.png" class="icon"></image>
				</view>
			</pick-regions>
			<view class="selectSort2">
				<input type="text" class="input" maxlength="20" placeholder="请填写详细地址" placeholder-class="place" v-model="detailAddress" />
			</view>

			<view class="itemBox2">
				<label class="text">微信号</label>
			</view>
			<view class="selectSort2">
				<input type="text" maxlength="20" class="input" placeholder="请填写" placeholder-class="place" v-model="wxNumber" />
			</view>

			<view class="buttonBox">
				<view class="leftButton" @click="backIndex()">
					上一步
				</view>
				<view class="rightButton" @click="nextThird()">
					下一步
				</view>
			</view>

		</view>

		<view class="publishBox" v-show="step == 3">
			<view class="title">
				<view class="line"></view>
				<view class="text">帖子信息</view>
			</view>
			<view class="itemBox2">
				<label class="label">*</label>
				<label class="text">请输入标题</label>
			</view>
			<view class="selectSort2">
				<input type="text" maxlength="50" class="input" placeholder="请填写" placeholder-class="place" v-model="title" />
			</view>
			<view class="itemBox2">
				<label class="label">*</label>
				<label class="text">请输入发布内容</label>
			</view>
			<view class="selectSort2">
				<textarea class="textarea" maxlength="800" placeholder="最多输入800字" placeholder-class="place" v-model="content" />
				</view>
			<view class="itemBox">
				<label class="text">上传图片</label>
			</view>
			<view class="addImgBox">
				<view class="imgBox" v-for="(item, index) in imageList" :key="item.id" :class="index%3 == 1 ? 'margin':''">
					<image class="image" @click="imgInfo(index)" :src="convert(item)" mode="aspectFill"></image>
					<image class="fork" @click="delImg(index)" src="../../static/delete.png"></image>
				</view>
				<view class="imgBox" @click="openCamera" :class="imageList.length%3 == 1 ? 'margin':''" v-if="imageList.length<9">
					<image class="image" src="../../static/upload.png"></image>
				</view>
			</view>
			
			<view class="itemBox">
				<label class="text">上传视频</label>
			</view>
			
			<view class="addImgBox">
				<view class="imgBox" v-for="(item, index) in videoList" :key="index" :class="index%3 == 1 ? 'margin':''">
					<video class="image" :src="convert(item)" :controls="false" :autoplay="true" v-if="index == showVideo" @ended="endVideo()">
					<!-- <cover-image class="fork" @click="delVideo(index)" src="../../static/delete.png"></cover-image> -->
					</video>
					<image class="image" src="../../static/icon/video.jpg" v-if="index != showVideo" @click="showVideo = index"></image>
					<image class="fork" @click="delVideo(index)" src="../../static/delete.png" v-if="index != showVideo"></image>
				</view>
				<view class="imgBox" @click="openVideo" :class="videoList.length%3 == 1 ? 'margin':''" v-if="videoList.length<3">
					<image class="image" src="../../static/upload.png"></image>
				</view>
			</view>
			<view class="textBox">
				<view class="text">如需置顶，请联系客服</view>
				</view>
			<view class="buttonBox">
				<view class="leftButton" @click="backIndex()">
					上一步
				</view>
				<view class="rightButton" @click="publish()">
					确认发布
				</view>
			</view>
			
		</view>
		
		<uni-popup ref="popup" type="center" :maskClick="false">
			<view class="followBox" style="width:70vw;">
		
					<view class="text">
						找医第三方协议
					</view>
		
					<view class="text2">
						如确认合作请联系网站客服进行医疗流程监控
						流程收费：网站收费（动态浮动不等，约500-1000，根据具体病例决定收费方式，涵盖但不限于 平台服务费+医师+病情评估+联系医师+医疗保险+医疗意外保险等）
					</view>
					<view class="buttonBox" @click="hide()">
						确认
					</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	import bus from '@/utils/bus.js'
	import { baseUrl } from '@/global/js/baseUrl.js'
	import rotateImg from '@/api/rotate_image.js'
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				mymes:{
					roles:[{}]
				},
				popup: false,
				step: 1,
				imgCount: 9,
				baseUrl: baseUrl,
				roundChecked: 0,
				healthType:0,
				// 可用资金
				available:'',
				wxNumber: '',
				defaultRegion:['广东省','广州市','天河区'],
				postProvince: '',
				postArea: '',
				postCity: '',
				smallTypeObj: {},
				bigType: [],
				
				corporateName: '',
				contactName: '',
				detailAddress: '',
				phone: '',
				selectedOptions: ['广东省','广州市','天河区'],
				form: {
					province: '',
					city: '',
					area: ''
				},
				
				title: '',
				content: '',
				imageList: [],
				videoList: [],
				loop: '',
				showVideo: -1,
				// 父类id
				parentId:'',
				parentName:'',
				// 子类
				
				
				// 选择图片大小
				imgSize:4,
				imgLength:1
				
			}
		},
		onLoad() {
			this.getType()
			this.getMyMes()
			this.$setMemoryPmt('selectType')
		},
		onShow() {
			let _this = this
			this.smallTypeObj = this.$getMemoryPmt('selectType')
			this.getMyMes()
		},
		methods: {
			check() {
				this.available = this.available.replace(/^0*/g, "").replace(/[^0-9]/g, "");
			},
			endVideo(){
				this.showVideo = -1
			},
			start(){
			      clearTimeout(this.loop); //再次清空定时器，防止重复注册定时器
			      this.loop = setTimeout(() => {
						this.delVideo()
			      }, 2000);
			    },
			 end(){
			      clearTimeout(this.loop); //清空定时器，防止重复注册定时器
			    },
			top() { //回到顶部
					uni.pageScrollTo({
						scrollTop: 0,
						duration: 100
					});
			},
			publish(){
				if(this.title == ''){
					uni.showToast({
						title: '请填写帖子标题',
						icon: 'none',
						mask: true
					})
					return
				}
				if(this.content == ''){
					uni.showToast({
						title: '请填写发布内容',
						icon: 'none',
						mask: true
					})
					return
				}
				uni.showModal({
					title: '提示',
					content: '是否发布该帖子？',
					success: (res) => {
						if (res.confirm) {
							let sketch = this.content
							
							let msg = `<p>${this.content}</p>`
							
							for(let i=0;i<this.imageList.length;i++){
								msg =  msg + `<img src="` + this.baseUrl + this.imageList[i] + `" />`
							}
							
							// for(let j=0;j<this.videoList.length;j++){
							// 	msg = msg + `<video controls="controls"><source src="` + this.baseUrl + this.videoList[j] + `"/></video>`
							// }
							
							
							this.$http_json({
								url: `/api/post/add`,
								method: 'post',
								data: {
									nickname:this.mymes.nickname,
									publishType: this.roundChecked,
									pledgeType:this.healthType,
									purchaseValue:this.available,
									
									childTypeId:this.parentId,
									type:this.parentName,
									childTypeSon:this.smallTypeObj.id,
									typeSon:this.smallTypeObj.name,
									
									postProvince: this.postProvince,
									postCity: this.postCity,
									postArea: this.postArea,
									
									contactName: this.contactName,
									phone: this.phone,
									province:this.form.province,
									city:this.form.city,
									area:this.form.area,
									detailAddress: this.detailAddress,
									wxNumber: this.wxNumber,
									title: this.title,
									content: msg,
									
									imageList: JSON.stringify(this.imageList),
									videoList: JSON.stringify(this.videoList),
									sketch: sketch,
								}
							}).then(res =>{
								uni.showToast({
									title: '发布帖子成功',
									icon: 'success',
									mask: true
								})
								this.$setMemoryPmt('selectType')
								setTimeout(()=> {
									uni.reLaunch({
										url: '/pages/publish/success?id=' + res.data.id
									})
								},1500)
								
							})
						} else if (res.cancel) {
							return
						}
					}
				});
				
		
			},
			hide() {
				this.$refs.popup.close()
			},
			open() {
				this.$refs.popup.open()
			},
			imgInfo(i) {
				let tempList = [];
				tempList.push(this.baseUrl + this.imageList[i])
				//显示图片
				uni.previewImage({
					current: i,
					loop: false,
					urls: tempList,
					indicator: 'default'
				});
			},
			delImg(i) {
				uni.showModal({
					content: '确定删除这张图片吗?',
					success: res => {
						if (res.confirm) {
							this.imageList.splice(i, 1);
						}
					}
				});
			},
			openCamera() {
				      this.$getImgFile(4,1)
				        .then((res) => {
							
				          this.$http_file({
				            url: "/api/localStorage/upload",
				            method: "post",
				            data: {
				              file: res[0].raw,
				            },
				          }).then((result) => {
				            this.imageList.push(result.data.url)
				          })
				        })
				        .catch((e) => {
				          uni.showToast({
				          	title:e,
				          	icon:'none'
				          })
				        })
			},
			delVideo(i) {
				uni.showModal({
					content: '确定删除这个视频吗?',
					success: res => {
						if (res.confirm) {
							this.videoList.splice(i, 1);
							
						} else if (res.cancel) {
							
						}
					}
				});
			},
			openVideo() {
				/* this
					.$getFile(20, 1) // 限制上传文件总数量为20M，数量为10个
					.then(result => { 
						console.log(result)
					}) */
				this.$getFile(50,1, 'video/*')
				  .then((res) => {
				    this.$http_file({
				      url: "/api/localStorage/upload",
				      method: "post",
				      data: {
				        file: res[0],
				      },
				    }).then((result) => {
				     this.videoList.push(result.data.url)
					 // console.log(this.videoList)
				    })
				  })
				  .catch((e) => {
				    uni.showToast({
				    	title:e,
				    	icon:'none'
				    })
				  })
				/* let _this = this
				uni.chooseVideo({
					count: 1,
					success: e => {
					uni.showLoading({
						title: '上传中，请稍后',
						mask: true
					})
					const tempFilePaths = e.tempFilePath;
						uni.uploadFile({
							url: _this.baseUrl + "/api/localStorage/upload", 
							filePath: tempFilePaths,
							name: 'file',
							header: {
								"Authorization": `Bearer `+ _this.vuex_token
							},
							success: e => {
								let data = JSON.parse(e.data);
								
								_this.videoList.push(
									data.data.url
								)
							},
							fail: es => {
								uni.showToast({
									title: '上传失败，请重试',
									icon: 'none',
									mask: true
								})
							},
							complete: res => {
								uni.hideLoading()
							}
							
						});
				
					}
				}); */
			},
			getMyMes(){
				this.$http_normal({
					url: `/api/user/getUser`,
					method:'get'
				}).then(res => {
					let data = res.data
					this.mymes = data;
					if(this.mymes.roles[0].name === '普通用户'){
						this.roundChecked = 0
					}else{
						this.roundChecked = 0;
					}
					if(data.province != '' && data.province != null){
						this.selectedOptions = [data.province,data.city,data.area]
						this.form = {
							province: res.data.province,
							city: res.data.city,
							area: res.data.area 
						}
					}
					
					if(data.corporateName != null){
						this.corporateName = data.corporateName
					}
					
					if(data.trueName != null){
						this.contactName = data.trueName
					}
					
					if(data.detailAddress != null){
						this.detailAddress = data.detailAddress
					}
					
					if(data.province != null){
						this.province = data.province
						this.city = data.city
						this.area = data.area
					}
					
					if(data.wechatId != null){
						this.wxNumber = data.wechatId
					}
					if(data.cellPhone != null){
						this.phone = data.cellPhone
					}
				})
			 },
			nextTwo(){
				if(this.smallTypeObj != '' && this.postProvince != '' && this.roundChecked !== '' && this.healthType !== '' && this.available != ''){
					var one = this.available.split('')[0];
					this.step = 2
					this.top()
				}else{
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none',
						mask: true
					})
				}
			},
			nextThird(){
				if(this.contactName != '' && this.detailAddress != '' && this.phone != '' && this.form.province != ''){
					if(this.wxNumber === ''){
						this.step = 3
						this.top()
						return
					}
					var wxreg=/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
					if(this.wxNumber !== ''&&!wxreg.test(this.wxNumber)){
						uni.showToast({
							title: '微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头',
							icon: 'none',
							mask: true
						})
					}else{
						this.step = 3
						this.top()
					}
				}else{
					uni.showToast({
						title: '请填写完整信息',
						icon: 'none',
						mask: true
					})
				}
			},
			toSelectType(){
				let _this = this
				if(_this.smallTypeObj != ''){
					uni.navigateTo({
						url: '/pages/selectType/index?type=' + JSON.stringify(_this.smallTypeObj)
					})
				}else{
					uni.navigateTo({
						url: '/pages/selectType/index'
					})
				}
			},
			getBigName(id){
				let arr = this.bigType.find(array => array.id == id)
				this.parentId = arr.id
				console.log(this.parentId)
				this.parentName = arr.name
				return arr.name
			},
			getType(){
				let _this = this
			
				this.$http_normal({
					url: `/api/postType/list/father`
				}).then(res => {
					_this.bigType = res.data.filter(arr => arr.parentId === null);
					
				});
			},
			backIndex(){
				if(this.step == 1){
					uni.switchTab({
						url: '/pages/index/index'
					})
				}else{
					this.step = this.step - 1
					this.top()
				}
				
			},
			roundChange(index){
				this.roundChecked = index
			},
			healthChange(index){
				this.healthType = index
			},
			// 获取选择的地区
			handleGetRegion(region){
				this.postProvince = region[0].name
				this.postCity = region[1].name
				this.postArea = region[2].name
			},
			// 获取联系人的地区
			handleGetRegion2(region){
				this.form = {
					province: region[0].name,
					city: region[1].name,
					area: region[2].name
				}
			},
		}
	}
</script>

<style scoped lang="scss" src="./scss/index.scss">
	
</style>
