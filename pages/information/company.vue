<template>
	<view class="content">
		<view>
			<view class="topTitleBox" ref="topTitleBox" :style="{'padding-top': 'calc(' + (topHeight - 5) + 'px  + 22upx)'}">
				<image src="../../static/arrow.png" class="arrow" @click="back()"></image>
				<view class="title">地址信息</view>
			</view>
			<view class="headPlaceBox" ref="headPlaceBox" :style="{'margin-top': 'calc(' + (topHeight - 5) + 'px)'}">
				<view class="title">{{' '}}</view>
			</view>
		</view>

		<view class="companyBox">
			<view class="itemBox">
				<view class="text">联系人</view>
				<input type="text" maxlength="8" class="input" placeholder="联系人名称" placeholder-class="place" v-model="trueName"/>
			</view>
			<view class="itemBox">
				<view class="text">联系电话</view>
				<input type="number" maxlength="16" class="input" placeholder="联系电话" placeholder-class="place" v-model="cellPhone"/>
			</view>
			<pick-regions :defaultRegion="defaultRegion" @getRegion="handleGetRegion">
			         <view class="itemBox" style="margin-bottom: 22upx">
			         	<view class="text">联系地址</view>
			         	<view class="picker" >
			         		<label v-if="province != '' && province != null">{{province + ' ' + city + ' ' + area}}</label>
							<label v-if="province == '' || province == null">请选择所在位置</label>
			         		<image src="../../static/arrow.png" class="img"></image>
			         	</view>
			         </view>
			 </pick-regions>
			<view class="itemBox">
				<view class="text"></view>
				<input type="text" maxlength="50" class="input" placeholder="详细地址" placeholder-class="place" v-model="detailAddress"/>
			</view>
			<view class="itemBox">
				<view class="text">微信号</view>
				<input type="text" maxlength="50" class="input" placeholder="微信号" placeholder-class="place" v-model="wechatId"/>
			</view>
		</view>

		<view class="button_style_primary marginBox">
			<button type="primary" class="button" @click="save()">保存</button>
		</view>

		 
	</view>
</template>

<script>
	import options from '@/utils/country-data.js'
	import pickRegions from '@/components/pick-regions/pick-regions.vue'
	
	export default {
		components: {
			pickRegions
		},
		data() {
			return {
				region:[],
				option: options,
				planLocate:'请选择地址',
				defaultRegion:['广东省','广州市','天河区'],
				province: '',
				area: '',
				city: '',
				trueName: '',
				cellPhone: '',
				detailAddress: '',
				wechatId: ''
				
			}
		},
		onLoad() {
			this.getMyMes()
		},
		methods: {
			
			//父组件的获取子组件传递的值
			change(result) {
				  this.planLocate = ''; 
				  result.data.forEach( (item,index) =>{
					  if(index===0){
						   this.planLocate += item.name
					  }else{
						  this.planLocate += '-' +item.name  
					  }
				  }) ;
				  let arr =this.planLocate.split('-');
				  console.log(arr)
			},
			regionName(){
				// 转为字符串
				return this.region.map(item=>item.name).join(' ')
			},
			// 获取选择的地区
			handleGetRegion(region){
				
				this.province = region[0].name
				this.city = region[1].name
				this.area = region[2].name
			},
			getMyMes() {
				
				this.$http_normal({
					url: `api/user/getUser`
				}).then(res => {
					let data = res.data
					if(data.province != '' && data.province != null){
						this.defaultRegion = [data.province,data.city,data.area]
					}
					if(data.trueName != null){
						this.trueName = data.trueName
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
						this.wechatId = data.wechatId
					}
					if(data.cellPhone != null){
						this.cellPhone = data.cellPhone
					}
					
				});
			},
			save(){
				let _this = this
				var wxreg=/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/;
				if(this.wechatId !== ''&&!wxreg.test(this.wechatId)){
					uni.showToast({
						title: '微信账号仅支持6-20个字母、数字、下划线或减号，以字母开头',
						icon: 'none',
						mask: true
					})
					return
				}
				this.$http_json({
					url: `api/user/center`,
					method: 'post',
					data: {
						trueName: this.trueName,
						detailAddress: this.detailAddress,
						province: this.province,
						city: this.city,
						area: this.area,
						wechatId: this.wechatId,
						cellPhone: this.cellPhone
					}
				}).then(res =>{
					uni.showToast({
						title: '修改成功',
						icon: 'success',
						mask: true
					})
					setTimeout(()=>{
						_this.back()
					},1500)

				})
				
			}
		}
	}
</script>

<style lang="scss" src="./scss/index.scss">

</style>
