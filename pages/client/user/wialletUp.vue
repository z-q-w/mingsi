<template>
	<view>
		<view class="" style="background: #FFFFFF;padding: 30rpx 30rpx;">
			<text style="font-size: 35rpx;line-height: 70rpx;">输入金额</text>
			<input v-model="money" type="number" value="" class="uoinput"/>
		</view>
		<view class="" style="margin-top: 20rpx;background: #FFFFFF;padding:0 30rpx;height:1000rpx;">
			<text style="font-size: 35rpx;line-height: 100rpx;">选择支付方式</text>
			<view class="" style="display:flex;justify-content: space-between;padding: 30rpx 0;" @click="wxpay(1)">
				<image src="../../../static/image/77.png" mode="" style="width: 45rpx;height: 45rpx;"></image>
				<view class="" style="flex: 1;margin-left: 20rpx;">
					支付宝支付
				</view>
				<view class="">
					<image v-if="payindex==1" src="../../../static/image/72.png" mode="" style="width: 33rpx;height: 33rpx;"></image>
					<image v-else src="../../../static/image/73.png" mode="" style="width: 33rpx;height: 33rpx;"></image>
				</view>
			</view>
			<view class="" style="display:flex;justify-content: space-between;padding: 30rpx 0;" @click="wxpay(2)">
				<image src="../../../static/image/76.png" mode="" style="width: 45rpx;height: 45rpx;"></image>
				<view class="" style="flex: 1;margin-left: 20rpx;">
					微信支付
				</view>
				<view class="">
					<image v-if="payindex==2"  src="../../../static/image/72.png" mode="" style="width: 33rpx;height: 33rpx;"></image>
					<image v-else src="../../../static/image/73.png" mode="" style="width: 33rpx;height: 33rpx;"></image>
					
				</view>
			</view>
			<view class="ljzf" @click="balancerecharge">
				立即支付
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				money:'100',
				payindex:'1'
			}
		},
		methods: {
			wxpay(v){
				console.log(v)
				this.payindex=v
			},
			balancerecharge(){
				this.api.balancerecharge({
					payType:this.payindex,//方式					price:this.money,//金额
				}).then(res=>{
					console.log(res.data)
					if(this.payindex==1){ //支付宝
						var that=this
						uni.requestPayment({
							provider: 'alipay',
							orderInfo: res.data.body, //支付宝订单数据
							success(res) {
								that.cacheHelper.updateUserInfo()
								that.tui.toast('支付成功')
								that.payshow=false
								uni.redirectTo({
									url: '/pages/client/user/personaldata/myWallet/myWallet'
								})
							},fail(err) {
								console.log(err)
							}
						});
					}else if(this.payindex==2){ //微信
						var that=this
						let orderjson = (typeof res.data == 'object' ) ? JSON.stringify(res.data) :  res.data
						console.log(orderjson)
						uni.requestPayment({
							provider: 'wxpay',
							orderInfo: orderjson,
							success(res) {
								that.cacheHelper.updateUserInfo()
								that.payshow=false
								that.tui.toast('支付成功') 
								uni.redirectTo({
									url: '/pages/client/user/personaldata/myWallet/myWallet'
								})
							},fail(err) {
							   console.log(err)
							}
						});
					}
				})
			}
		}
	}
</script>

<style>
	.uoinput{
		padding: 30rpx 0;
		font-size: 70rpx;
		font-family:DIN;
		color:#CCCCCC;
		line-height: 88rpx;
		border-bottom: 1rpx solid rgba(242,244,248,1)
	}
	.ljzf{
		width:690rpx;
		height:91rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:12rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 91rpx;
		font-size: 35rpx;
		margin-top: 50rpx;
	}
</style>
