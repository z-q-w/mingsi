<template>
	<view>
		<view class="" style="background: #FFFFFF;">
			<view class="userlist" @click="agreement" style="border-bottom: 1rpx solid rgb(245,245,245)">
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					用户协议
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="privacypolicy" style="border-bottom: 1rpx solid rgb(245,245,245)">
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					隐私政策
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="editpassword" style="border-bottom: 1rpx solid rgb(245,245,245)">
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					修改密码
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="addresstnb">
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					收货地址
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
			<view class="userlist" @click="myxubao" style="border-top: 20rpx solid rgb(245,245,245);">
				<view class="" style="font-size:32rpx;flex: 1;margin-top: 8rpx;">
					关于我们
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;margin-top: 15rpx;"></image>
			</view>
		</view>
		<view @click="showDelDialog" class="" style="width: 750rpx;background: #FFFFFF;text-align: center;line-height: 100rpx;margin: 200rpx auto 0 auto;">
			退出登录
		</view>
		<uni-popup ref="isShowDelDialog" type="dialog">
			<uni-popup-dialog content="确定退出登录？" type="message" message="成功消息" :duration="2000" :before-close="true" @close="close"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				isShowDelDialog: false,
			}
		},
		methods: {
			editpassword(){//修改密码
				uni.navigateTo({
					url:'./editpassword'
				})
			},
			addresstnb(){//收货地址
				uni.navigateTo({
					url:'./newAddress'
				})
			},
			myxubao(){//关于我们
				uni.navigateTo({
					url:'./AboutUs'
				})
			},
			agreement(){  //用户协议
				uni.navigateTo({
					url:'./protocols'
				})
			},
			privacypolicy(){  //隐私政策
				uni.navigateTo({
					url:'./privacyxieyi'
				})
			},
			close() {
				this.$refs.isShowDelDialog.close()
			},
			showDelDialog() {
				this.$refs.isShowDelDialog.open()
			},
			confirm() {
				this.$refs.isShowDelDialog.close()
				uni.redirectTo({
					url:'../login/login'
				})
				this.cacheHelper.setToken('');
				uni.$emit('quitempyt',{msg:'退出账号学习页面的我的课程两条数据清空'})
			},
		}
	}
</script>

<style>
	.userlist{
		display: flex;
		justify-content: space-between;
		padding: 35rpx;
	}
</style>
