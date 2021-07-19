<template>
	<view style="background: #FFFFFF;">
		<view class="study-top">
			<view class="status_bar"></view>
			<view class="study-text">个人中心</view>
			<view class="my-infso" @click="jumpmaseg">
				<image :src="isLogin && userdata.avatar != '' ? userdata.avatar : '../../../static/image/touxiang.png' " mode="" style="width: 130rpx;height: 130rpx;border-radius: 50%;margin-right: 35rpx;"></image>
				<view class="" style="flex: 1;">
					<view class="" v-if='isLogin'>
						<view class="my-name">{{userdata.nickname=='' ? userdata.account : userdata.nickname}}</view>
						<view class="my-class">{{userdata.grade=='' ? '未设置':userdata.grade}}</view>
					</view>
					<view class="" v-else style="font-size: 36rpx;margin-top:45rpx;color: #FFFFFF;">
						登录注册
					</view>
				</view>
				<view class="function" @click.stop="getspecial" v-if="showpricedata==2">
					<image src="../../../static/image/33.png" mode="" style="width:31rpx;height:26rpx;margin-right: 10rpx;margin-top: 20rpx;margin-left: 15rpx;"></image>
					<view>领取优惠券</view>
				</view>
			</view>
			<view class="signature">
				{{isLogin && userdata.signature !=''? userdata.signature : '您还未设置签名快去设置吧!'}}
			</view>
		</view>
		<view class="my-order" style="">
			<view class="" style="display: flex;justify-content: space-between;" @click="orderall">
				<text style="font-size:36rpx;font-weight: bold;">我的订单</text>
				<text style="font-size:29rpx;">查看全部</text>
			</view>
			<view class="" style="display: flex;justify-content: space-between;margin-top: 50rpx;">
				<view @click="payment(1)" style="width: 150rpx;text-align: center;">
					<image src="../../../static/image/34.png" mode="" style="height: 75rpx;width: 75rpx;"></image>
					<view style="font-size: 30rpx;">待支付</view>
				</view>
				<view @click="payment(2)" style="width: 150rpx;text-align: center;">
					<image src="../../../static/image/35.png" mode="" style="height: 75rpx;width: 75rpx;"></image>
					<view style="font-size: 30rpx;">待评价</view>
				</view>
				<view @click="payment(3)" style="width: 150rpx;text-align: center;">
					<image src="../../../static/image/36.png" mode="" style="height: 75rpx;width: 75rpx;"></image>
					<view style="font-size: 30rpx;">已完成</view>
				</view>
			</view>
		</view>
		<view @click="invitebtn" style="margin: 0 auto;text-align: center;">
			<image src="../../../static/image/fa5df6e038a6d1add56bc9e0cfc2b17.png" mode="" style="width:690rpx;height:178rpx;"></image>
		</view>
		<view class="" style="padding-bottom: 40rpx;">
			<view class="" style="font-size:36rpx;font-weight: bold;;padding: 30rpx;">我的资产</view>
			<view class="" style="display: flex;justify-content: space-between;padding:0 30rpx;">
				<image @click="walletbtn" src="../../../static/image/9fb4e78ccc1751a0915939cafc12ba1.png" mode="" style="width:325rpx;height:116rpx;"></image>
				<block v-if="platform=='android'">
					<image @click="couponbtn" src="../../../static/image/dfd2cc4eb67232c674eb4d1629ff8c2.png" mode="" style="width:325rpx;height:116rpx;"></image>
				</block>
				<block v-if="platform=='ios'">
					<image v-if="showpricedata==2" @click="couponbtn" src="../../../static/image/dfd2cc4eb67232c674eb4d1629ff8c2.png" mode="" style="width:325rpx;height:116rpx;"></image>
				</block>
				
			</view>
		</view>
		<view class="" style="padding: 0rpx 30rpx 0 30rpx;border-top: 20rpx solid rgb(245,245,245);">
			<view class="userlist" @click="usrejfbtn">
				<image src="../../../static/image/42.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					积分商城
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="myjifen">
				<image src="../../../static/image/43.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					我的积分
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="teacher">
				<image src="../../../static/image/98065dad0c01e7ebde26dde31cc5976.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					老师合作
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="service">
				<image src="../../../static/image/44.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					客服中心
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="myxubao">
				<image src="../../../static/image/45.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					我的续报
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="jumpmaseg">
				<image src="../../../static/image/46.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					我的信息
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="helpbtn">
				<image src="../../../static/image/47.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					帮助与反馈
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view @click="setingbtn" style="display: flex;justify-content: space-between;padding: 35rpx 0;">
				<image src="../../../static/image/48.png" mode="" style="width: 50rpx;height: 50rpx;margin: 5rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					设置
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
		</view>
		<view class="" style="height: 150rpx;background:rgba(238,238,238,1);">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform:uni.getSystemInfoSync().platform,
				showpricedata:'',//用来苹果上架的 苹果上架审核的时候不显示优惠劵
				timetable:[
					{
						image:'../../../static/image/75.png',
						name:'2020高一语文第九次补课',
						week:'周四',
						timedata:'20.30'
					},
					{
						image:'../../../static/image/75.png',
						name:'2020高一语文第九次补课',
						week:'周四',
						timedata:'20.30'
					},
				],
				checkResult:'',//审核结果
				userdata:this.cacheHelper.appUser(),
				isLogin:'',
				curr_version:'',//版本号
			}
		},
		onLoad() {
			uni.$on(this.constant.EventKey.UPDATE_USER_INFO,(data)=> {
			   this.userdata = this.cacheHelper.appUser()
			   this.isLogin=this.cacheHelper.isLogin() //true 代表已登录
			})
			uni.$on('loginup',(data)=> {
			   this.userdata = this.cacheHelper.appUser()
			   this.isLogin=this.cacheHelper.isLogin() //true 代表已登录
			})
			uni.$on('quitempyt',(data)=>{  //这里退出登录清空用户信息
				this.isLogin=this.cacheHelper.isLogin()
			})
			this.isLogin=this.cacheHelper.isLogin()
			uni.startPullDownRefresh({
				success:(res)=>{
					if(this.cacheHelper.isLogin()){
						this.api.customerinfo().then((res) => {//个人信息
						})
					}
				}
			})
			this.showprice()
		},
		onPullDownRefresh() {
			setTimeout(function () {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			jumpmaseg(){//跳转到个人信息
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
					    url: './myMessage'
					});
				}
			},
			getspecial(){//领取优惠劵
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
					    url: './getCoupon'
					});
				}
			},
			orderall(){//全部订单
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './myOrder?type=' + 4
					});
				}
			},
			invitebtn(){//推荐好友分享
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './invitehy'
					})
				}
			},
			walletbtn(){//我的钱包
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './myWallet'
					})
				}
			},
			teacher(){//老师合作
				 // 1审核中 2 审核成功 3 审核失败"
				 if(this.cacheHelper.isLoginOnclick()){
					 this.api.teachermessage().then(res=>{
					 	console.log(res.data.status)//1审核中 2 审核成功 3 审核失败"
					 	this.checkResult=res.data.status
						if(this.checkResult==1 || this.checkResult==2 || this.checkResult==3){
							uni.navigateTo({
								url: '/pages/client/home/teacherlook'
							})
						}else{
							uni.navigateTo({
								url: '/pages/client/home/teacherjoin'
							})
						}
					 })
				 }
			},
			usrejfbtn(){//积分商城
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './integralShop'
					})
				}
			},
			couponbtn(){//优惠劵
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './myCoupon'
					})
				}
			},
			myxubao(){//续报
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './myContinuexb'
					})
				}
			},
			service(){//客服
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './servicekf'
					})
				}
			},
			helpbtn(){//帮助反馈
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './feedback'
					})
				}
			},
			setingbtn(){//设置
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './setting'
					})
				}
			},
			myjifen(){//我的积分
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url: './Myjifen'
					})
				}
			},
			payment(v){
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
					    url: './myOrder?type=' + v
					});
				}
			}
		},
	}
</script>

<style>
	.study-top{
		background-image:url(../../../static/image/168995aacacfb35c188561b6de807f6.png);
		background-repeat: no-repeat;
		background-size: 100%;
		width:750rpx;
		height:450rpx;
	}
	.study-text{
		text-align: center;
		margin: 0 auto;
		color: #FFFFFF;
		font-size: 40rpx;
	}
	.my-infso{
		justify-content: space-between;
		display: flex;
		padding:30rpx 0rpx 10rpx 30rpx;
	}
	.my-name{
		height:51rpx;
		font-size:38rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:51rpx;
		color:rgba(255,255,255,1);
		opacity:1;
		margin-top: 10rpx;
	}
	.my-class{
		height:36rpx;
		background:rgb(245,154,94);
		text-align: center;
		color: #FFFFFF;
		width: 100rpx;
		line-height: 36rpx;
		padding: 5rpx 10rpx;
		border-radius:36rpx;
		margin-top: 15rpx;
	}
	.function{
		display: flex;
		width:230rpx;
		background:rgb(245,154,94);
		height:59rpx;
		line-height: 59rpx;
		text-align: center;
		color: #FFFFFF;
		border-radius:30rpx 0rpx 0rpx 30rpx;
	}
	.signature{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(255,255,255,1);
		opacity:1;
		margin:0 50rpx;
	}
	.my-order{
		padding: 40rpx 32rpx;
		box-shadow:0px 2px 4px rgba(0,0,0,0.16);
		width: 620rpx;
		margin: -60rpx auto 0 auto;
		border-radius: 18rpx;
		background: #FFFFFF;
	}
	.userlist{
		display: flex;
		justify-content: space-between;
		padding: 35rpx 0;
		border-bottom: 1rpx solid rgba(238,238,238,1);
	}
</style>
