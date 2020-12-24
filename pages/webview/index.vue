<template>
	<view class="content">
		<web-view :src="url"></web-view>
	</view>
</template>

<script>
	export default {
		components: {
			
		},
		data() {
			return {
				  url: ''
			}
		},
		onLoad(e) {
			 // 获取传递过来的链接
			this.url = e.url
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	
</style>
