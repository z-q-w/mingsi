<template>
	<view style="min-height: 100%;background: #FFFFFF;padding:20rpx 30rpx;">
		<view class="" style="font-size: 34rpx;font-weight: 500;">
			{{xiaodata.head}}
		</view>
		<view class="" style="font-size: 30rpx;color: #999999;margin-top: 10rpx;">
			{{xiaodata.message}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				xiaodata:'',
			}
		},
		onLoad(option) {
			this.xiaoid=option.xiaoid
			this.systemDetail()
		},
		methods: {
			systemDetail(){
				this.api.systemDetail(
					this.xiaoid
				).then(res=>{
					console.log(res)
					this.xiaodata=res.data
					uni.$emit('readmessage',{msg:'读消息'})
				})
				
			}
		}
	}
</script>

<style>

</style>
