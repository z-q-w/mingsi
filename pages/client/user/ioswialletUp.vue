<template>
	<view class="" style="position: relative;background: #FFFFFF;width: 750rpx;min-height: 100%;">
		<view class="sd" style="display: flex;padding: 40rpx;flex-wrap: wrap;">
			<view :class="iosboxindex==index ? 'iosbox' : 'uniosbox'" v-for="(item,index) in iosdata" @click="iosboxbtn(item,index)">
				<view class="" style="margin-top: 22rpx;">{{item.price}}学习币</view>
				<view class="" style="font-size: 26rpx;margin-top: 8rpx;">￥{{item.price}}</view>
			</view>
		</view>
		<button type="default" class="iosbutton" :disabled="balanceId==''" @click="affirm">确认</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balanceId:'',
				iosboxindex:'p',
				iosdata:[],
				productIds:'',//苹果配置的id唯一标识
			}
		},
		onLoad() {
			this.rechargeDictList()
		},
		methods: {
			iosboxbtn(v,index){
				this.iosboxindex=index
				this.balanceId=v.id
				this.productIds=v.id.split(",")
				console.log(this.productIds)
				this.iospay()
			},
			rechargeDictList(){
				this.api.rechargeDictList().then(res=>{
					this.iosdata=res.data
				})
			},
			iospay(){
				//uni-app中将此function里的代码放入vue页面的onLoad生命周期中  // 获取支付通道
				plus.payment.getChannels((channels) => {
					for (var i in channels) {
						var channel = channels[i];
						if (channel.id === 'appleiap') {
							uni.showLoading({
							    title: '加载中',
								mask:true
							});
							console.log('苹果支付22',channel,this.balanceId)
							console.log(this.productIds,'苹果id')
							this.iapChannel = channel;
							this.iapChannel.requestOrder(this.productIds, (orderList) => { //必须调用此方法才能进行 iap 支付
								console.log('苹果支付66',orderList)
								uni.hideLoading();
							}, (e) => {
								console.log('fddddd苹果',e)
								uni.hideLoading();
								this.errorMsg()
							});
						}
					}
					if(!this.iapChannel){
						this.errorMsg()
					}
				}, (error) => {
					this.errorMsg()
				});
			}, 
			affirm(){
				uni.showLoading({
				    title: '加载中',
					mask:true
				});
				setTimeout(function () {
				    uni.hideLoading();
				}, 2000);
				console.log('苹果这里',this.balanceId)
				this.loading = true;
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid:this.balanceId
					},
					success: (e) => {
						console.log(e,'哈哈哈')
						this.api.appleAliRecharge(JSON.stringify(e)).then(res=>{
							console.log(res,'余额支付成功')
							this.tui.toast(res)
						})
					},
					fail: (e) => {
						console.log(e,'支付失败')
					},
				})
			}
		}
		
	}
</script>

<style>
	.iosbox{
		width: 200rpx;
		height: 128rpx;
		background: rgba(252, 231, 181, 1.0);
		border: 1rpx solid rgba(252,155,59,1);
		color:rgba(252,155,59,1);
		opacity: 1;
		border-radius: 11rpx;
		text-align: center;
		margin-right: 28rpx;
		margin-top: 20rpx;
	}
	.uniosbox{
		width: 200rpx;
		height: 128rpx;
		background: #EEEEEE;
		border: 1rpx solid #EEEEEE;
		color:#999999;
		opacity: 1;
		border-radius: 11rpx;
		text-align: center;
		margin-right: 28rpx;
		margin-top: 20rpx;
	}
	.sd :nth-child(3n){
		margin-right: 0rpx;
	}
	.iosbutton{
		width: 690rpx;
		height: 88rpx;
		background: #F27F31 !important;
		opacity: 1;
		border-radius: 44rpx;
		text-align: center;
		line-height: 88rpx;
		margin: 400rpx auto 0 auto;
		font-size: 32rpx;
		color: #FFFFFF !important;
		opacity: 1;

	}
</style>
