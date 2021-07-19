<template>
	<view class="bakcinvite">
		<view style="display: flex;justify-content: space-between;">
			<view style="margin-left: 30rpx;margin-top: 30rpx;color: #FFFFFF;font-size: 45rpx;letter-spacing: 7rpx;font-weight: bold;">名思教育</view>
			<view @click="huoregular" style="margin-right: 30rpx;margin-top: 30rpx;background: #FA693A;opacity:0.6;border-radius: 15rpx;color: #FFFFFF;padding: 10rpx;">
				活动规则
			</view>
		</view>
		<view class="" style="text-align: center;margin-left: 100rpx;letter-spacing:20rpx;margin-top: 100rpx;">
			<text style="font-size: 85rpx;color: #FFFFFF;font-weight: bold;">送佣金</text>
			<view style="font-size: 70rpx;color: #FFFFFF;font-weight: bold;">邀请好友拿好礼</view>
		</view>
		<view class="newuser">
			邀请新用户,积分兑换好礼
		</view>
		<view class="content">
			邀请好友,把课程介绍给好友,佣金一起拿,大家好才是真的好
		</view>
		<view class="inbites">
			<view class="" style="text-align: center;padding-top: 30rpx;">
				<image src="../../../static/image/d44d347adf6848b3897f3b776bccc17.png" mode="" style="width: 400rpx;height:40rpx;"></image>
			</view>
			<view class="" style="text-align: center;font-size: 70rpx;color:rgba(135,94,81,1);">
				{{Invitecode}}
			</view>
			<!-- 二维码 -->
			<view class="num" style="text-align: center;margin: 0 auto;">
				<view class="qrcode" style="text-align: center;margin: 0 195rpx;">
					<canvas canvas-id="qrcode" :style="{width: `${qrcodeSize}px`, height: `${qrcodeSize}px`}" />
				</view>
			</view>
			<view class="" style="text-align: center;font-size: 34rpx;color: rgb(223,96,80);font-weight: 600;margin-top: 10rpx;">
				二维码
			</view>
			<view class="" style="display: flex;justify-content:space-between;padding: 20rpx 40rpx;">
				<view class="savema" @click="savema">
					保存二维码
				</view>
				<view class="rightaway" @click="rightaway">
					分享邀请码
				</view>
			</view>
		</view>
		<tui-modal :show="modal8" @cancel="hide8" :custom="true">
			<view class="tui-modal-custom-text">规则说明</view>
			<scroll-view scroll-y="true" class="scroll-Y">
				<view class="" v-html="huodata" style="margin: 30rpx;"></view>
			</scroll-view>
		</tui-modal>
		<uni-popup ref="sharings" type="bottom">
			<view class="" style="background: #FFFFFF; display: flex;padding: 20rpx 200rpx;justify-content: space-between;">
				<view class="" style="width: 100rpx;text-align: center;" @click="sharexin(1)">
					<image src="../../../static/image/weixin11.png" mode="" style="width: 60rpx;height: 60rpx;"></image>
					<view class="" style="color: #46BB36;font-size: 30rpx;">微信</view>
				</view>
				<view class="" style="width: 100rpx;text-align: center;" @click="sharexin(2)">
					<image src="../../../static/image/pengyou22.png" mode="" style="width: 55rpx;height: 55rpx;"></image>
					<view class="" style="color: #46BB36;font-size: 30rpx;">朋友圈</view>
				</view>
			</view>
		</uni-popup>
	</view> 
</template>

<script>
	//二维码js 文件
	import uQRCode from '../../../libs/uqrcode.js'
	export default {
		data() {
			return {
				modal8:false,
				Invitecode:'',
				type:'5',
				huodata:'',
				qrcodeText:'http://zhaoxuexilian.com/elm/#/shareregistered',//二维码内容
				picurl:"../../../static/image/zuiloglo.png",
				qrcodeSize: uni.upx2px(300), //本页面二维码大小
			}
		},
		onLoad() {
			this.agreement()
			this.refereeInfo()
		},
		methods: {
			huoregular(){
				this.modal8=true
			},
			hide8(){
				this.modal8=false
			},
			savema(){
				var pages = getCurrentPages();
					var page = pages[pages.length - 1];  
					console.log("当前页"+pages.length-1);
					var bitmap=null;  
					var currentWebview = page.$getAppWebview();
					bitmap = new plus.nativeObj.Bitmap('amway_img');  
					// 将webview内容绘制到Bitmap对象中  
					currentWebview.draw(bitmap,function(){  
						console.log('截屏绘制图片成功');  
						bitmap.save( "_doc/a.jpg"  
						,{}  
						,function(i){  
							console.log('保存图片成功：'+JSON.stringify(i));  
							uni.saveImageToPhotosAlbum({  
								filePath: i.target,  
								success: function () {  
									bitmap.clear(); //销毁Bitmap图片  
									uni.showToast({  
										title: '保存图片成功',  
										mask: false,  
										duration: 1500  
									});  
								}  
							});  
						}  
						,function(e){  
							console.log('保存图片失败：'+JSON.stringify(e));  
						});  
					},function(e){  
						console.log('截屏绘制图片失败：'+JSON.stringify(e));  
					}); 
			},
			refereeInfo(){
				this.api.refereeInfo().then(res=>{
					console.log(res)
					this.Invitecode=res.data
					this.makes()
				})
			},
			sharexin(v){
				this.$refs.sharings.close()
				if(v==1){
					this.share("weixin", "WXSceneSession", 0, this.qrcodeText, this.picurl)
				}else if(v==2){
					this.share("weixin", "WXSenceTimeline", 0, this.qrcodeText, this.picurl)
				}
			},
			share(shareProvider, shareScene, shareType, shareHref, imageUrl) { //分享API
				if (this.cacheHelper.isLoginOnclick()) { //登录则返回true
					uni.share({
						provider: shareProvider,
						scene: shareScene,
						type: shareType,
						href: shareHref,
						title: "朝学夕练app分享",
						summary: "我正在使用朝学夕练app,快跟我一起来学习吧!",
						imageUrl: imageUrl,
						success: function(res) {
							console.log("success:" + JSON.stringify(res));
						},
						fail: function(err) {
							console.log("fail:" + JSON.stringify(err));
						}
					});
				}
			},
			makes() { //生成二维码-手机号，手机验证码，邀请码，密码
				this.qrcodeText='http://zhaoxuexilian.com/elm/#/shareregistered?inviteeCode=' + this.Invitecode
				console.log(this.qrcodeText)
				uni.showLoading({
					title: '二维码生成中',
					mask: true
				})
				uQRCode.make({
					canvasId: 'qrcode',
					text: this.qrcodeText,
					size: this.qrcodeSize,
					margin: 10,
					success: res => {
						console.log(res) //图片路径
						this.qrcodeSrc = res
					},
					complete: () => {
						uni.hideLoading()
					}
				})
			},
			rightaway(){
				this.$refs.sharings.open()
				this.qrcodeText='http://zhaoxuexilian.com/elm/#/shareregistered?inviteeCode=' + this.Invitecode
			},
			agreement(){//规则
				this.api.agreement(
					this.type
				).then(res=>{
					this.huodata=res.data
				})
			},
		}
	}
</script>

<style>
	.bakcinvite{
		background-image: url(../../../static/image/5281bb22adde3d6c3b54b8bfb851ab1.png);
		background-repeat: no-repeat;
		background-size:750rpx  100%;
		min-height: 100%;
	}
	.inbites{
		width: 690rpx;
		margin: 50rpx 30rpx 0 30rpx;
		background: rgb(253,244,229);
		border-radius: 12rpx;
	}
	.newuser{
		background-image: url(../../../static/image/c1a8e0cd8b9ce6b46b1302a9fa18789.png);
		background-repeat: no-repeat;
		background-size:100%;
		width: 500rpx;
		height: 80rpx;
		color: #FFFFFF;
		line-height: 60rpx;
		padding-left: 50rpx;
		margin-top: 60rpx;
		margin-left: 40rpx;
		font-size: 34rpx;
		font-weight: 500;
	}
	.content{
		width: 670rpx;
		font-size: 32rpx;
		color:rgb(255,246,0);
		margin: 20rpx 40rpx 0 40rpx;
		font-size: 32rpx;
		letter-spacing:4rpx
	}
	.rightaway{
		background-color: rgb(65,125,245);
		border-radius: 8rpx;
		width: 220rpx;
		height: 70rpx;
		color: #FFFFFF;
		font-size: 35rpx;
		text-align: center;
		line-height: 65rpx;
	}
	.savema{
		background: rgb(252,42,53) !important;
		border-radius: 8rpx;
		width: 220rpx;
		height: 70rpx;
		color: #FFFFFF;
		font-size: 35rpx;
		text-align: center;
		line-height: 65rpx;
	}
	.tui-modal-custom-text {
		
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		margin-top: 20rpx;
	}
	.scroll-Y {
		height: 400rpx;
	}
</style>
