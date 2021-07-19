<template>
	<view style="background: #FFFFFF;min-height: 100%;padding-top: 20rpx;">
		<view class="wallet-box">
			<view class="wallet-num">学习币</view>
			<view class="wallet-qian">
				{{balance}}
			</view>
			<view v-if="platform=='android'" class="wallet-cz" @click="walletBtn">
				充值
			</view>
			<view v-if="platform=='ios' && showpricedata==1 " class="wallet-cz" @click="walletBtn">
				充值
			</view>
		</view>
		<view style="padding: 30rpx;font-size: 32rpx;font-weight: bold;border-bottom: 1rpx solid rgba(242,244,248,1);">
			余额明细
		</view>
		<view class="" v-for="item in walletlist" style="display: flex;padding: 30rpx;justify-content: space-between;border-bottom: 1rpx solid rgba(242,244,248,1);">
			<view class="">
				<view class="walletlist-name">
					{{item.NAME}}
				</view>
				<view class="walletlist-time">
					{{item.createTime}}
				</view>
			</view>
			<view style="font-size:31rpx;margin-top: 20rpx;">
				{{item.price}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				balance: this.cacheHelper.appUser().balance, //用户信息
				walletlist:[],
				platform:uni.getSystemInfoSync().platform,
				showpricedata:'',//用来苹果上架是否显示价钱
			}
		},
		onLoad() {
			this.balanceDetail()
			this.showprice()
			this.platform=uni.getSystemInfoSync().platform
		},
		onShow() {
			this.api.customerinfo().then((res) => {
				this.balance=res.data.balance
			})
		},
		methods: {
			walletBtn(){
				if (plus.os.name == "Android") { //安卓
					uni.navigateTo({
						url:'./wialletUp'
					})
				}else if (plus.os.name == "iOS") {
					uni.navigateTo({
						url:'./ioswialletUp'
					})
				}
			},
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			balanceDetail(){
				this.api.balanceDetail({
					current:1,
					size:280,
				}).then(res=>{
					this.walletlist=res.data.records
				})
			}
		}
	}
</script>

<style>
	.wallet-box{
		box-sizing: border-box;
		background-image: url(../../../static/image/82.png);
		background-size: 100%;
		background-repeat: no-repeat;
		width: 690rpx;
		height: 270rpx;
		margin: 0rpx auto 0rpx auto;
		padding: 30rpx;
	}
	.wallet-num{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:60rpx;
		color:rgba(255,255,255,1);
		opacity:1;
	}
	.wallet-qian{
		font-size:72rpx;
		font-family:DIN;
		font-weight:bold;
		line-height:100rpx;
		color:rgba(255,255,255,1);
		opacity:1;
	}
	.wallet-cz{
		width:106rpx;
		height:44rpx;
		border:1rpx solid rgba(255,255,255,1);
		opacity:1;
		border-radius:12rpx;
		color: #FFFFFF;
		font-size: 25rpx;
		text-align: center;
		line-height: 44rpx;
		position: absolute;
		right: 60rpx;
	}
	.walletlist-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.walletlist-time{
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:30rpx;
		color:rgba(204,204,204,1);
		opacity:1;
		margin-top: 8rpx;
	}
</style>
