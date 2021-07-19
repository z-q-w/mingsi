<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view class="" style="font-size: 49rpx;color: #999999;text-align: center;margin: 0 auto;" v-if="checkResult==2">
			<view class="" style="padding: 120rpx;">
				恭喜您审核通过
			</view>
			<image src="../../../static/image/73741833c920b2832b7e1b85f641602.png" mode="" style="width: 500rpx;height: 400rpx;"></image>
		</view>
		<view class="" style="font-size: 49rpx;color: #999999;text-align: center;margin: 0 auto;" v-if="checkResult==1 || checkResult==''">
			<view class="" style="padding: 120rpx;">
				审核中
			</view>
			<view class="" style="font-size: 38rpx;padding-bottom: 100rpx;padding-top: 40rpx;">
				请稍后,1~2天会有审核结果
			</view>
			<image src="../../../static/image/46a1f9f560891865847771c2ae0b159.png" mode="" style="width: 500rpx;height: 400rpx;"></image>
		</view>
		<view class="" style="font-size: 49rpx;color: #999999;text-align: center;margin: 0 auto;" v-if="checkResult==3">
			<view class="" style="font-size: 38rpx;padding-bottom: 40rpx;padding-top: 120rpx;">
				您审核失败原因
			</view>
			<view class="" style="padding-top: 20rpx;padding-bottom: 80rpx;">
				{{refuseReason}}
			</view>
			<image src="../../../static/image/ea6ce939f3b3f6c1fc8870b4e1a0d4e.png" mode="" style="width: 500rpx;height: 400rpx;"></image>
			<view class="submit" @click="againup">
				重新上传
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				refuseReason:'',//失败原因
				checkResult:'',//审核结果 1审核中 2 审核成功 3 审核失败"
			}
		},
		onLoad(option) {
			this.refuseReason=option.refuseReason
			this.checkResult=option.checkResult
		},
		methods: {
			againup(){
				uni.redirectTo({
					url: '/pages/client/home/teacherjoin'
				})
			}
		}
	}
</script>

<style>
	.submit{
		width: 690rpx;
		height: 91rpx;
		background: #F27F31;
		opacity: 1;
		border-radius: 12rpx;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 45rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
		margin: 40rpx auto 0rpx auto;
		line-height: 91rpx;
	}
</style>
