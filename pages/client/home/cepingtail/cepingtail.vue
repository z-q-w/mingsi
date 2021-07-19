<template>
	<view>
		<view class="" style="background: #FFFFFF;padding: 20rpx;margin: 30rpx;border-radius: 12rpx;">
			{{data}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data:uni.getStorageSync('cepingtail')
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
