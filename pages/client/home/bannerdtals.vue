<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view style="padding:20rpx 30rpx;" v-html="bannerdata"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bannerid:'',
				bannerdata:'',
			}
		},
		onLoad(option) {
			this.bannerid=option.bannerid
			this.bannerdetail()
		},
		methods: {
			bannerdetail(){
				this.api.bannerdetail(
					this.bannerid
				).then(res=>{
					this.bannerdata=res.data
					this.bannerdata = this.bannerdata.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
				})
			}
		}
	}
</script>

<style>

</style>
