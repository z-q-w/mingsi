<template>
	<view class="rx-cp">
		<view class="finisht">
			<view class="congratulation">
				恭喜你，完成答题
			</view>
			<view class="mindsd">
				答题结果及分析请联系客服
			</view>
			<view class="phone">
				055-4653217
			</view>
		</view>
		<view class="nextti" @click="nexttibtn">
			确定
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.rx-cp{
		background-image: url(../../../static/image/51.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		box-sizing: border-box;
		min-height: 100%;
		padding-top: 200rpx;
	}
	.finisht{
		background-image: url(../../../static/image/54.png);
		background-size: 100%;
		width: 680rpx;
		height: 880rpx;
		background-repeat: no-repeat;
		background-size:cover;
		box-sizing: border-box;
		margin: 0 auto 0 auto;
		text-align: center;
		/* position: relative; */
	}
	.congratulation{
		font-size: 36rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 42rpx;
		color: #F17E51;
		opacity: 1;
		padding-top: 100rpx;
	}
	.mindsd{
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 42rpx;
		color: #333333;
		opacity: 1;
		padding: 30rpx 0 10rpx 0;
	}
	.phone{
		font-size: 29rpx;
		font-family: DIN;
		font-weight: 500;
		line-height: 42rpx;
		color: #333333;
		opacity: 1;
	}
	.nextti{
		background-image:url(../../../static/image/52.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		width: 328rpx;
		height: 122rpx;
		margin: 20rpx auto 0rpx auto;
		text-align: center;
		line-height: 100rpx;
		font-size: 37rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}
</style>
