<template>
	<view>
		<view class="" style="background: #FFFFFF;margin-top: 20rpx;">
			<view style="display: flex;margin:0 30rpx;padding: 30rpx 0;border-bottom: 1rpx solid #FAFAFA;" @tap="boybtn">
				<view class="">
					<image src="../../../static/image/70.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="" style="font-size:30rpx;font-family:PingFang SC;font-weight:500;flex: 1;margin-left: 20rpx;">
					男
				</view>
				<view class="">
					<image v-if="sex=='M'" src="../../../static/image/72.png" mode="" style="width: 35rpx;height: 35rpx;"></image>
					<image v-else src="../../../static/image/73.png" mode="" style="width: 35rpx;height: 35rpx;"></image>
				</view>
			</view>
			<view style="display: flex;margin:0 30rpx;padding: 30rpx 0;border-bottom: 1rpx solid #FAFAFA;" @click="womanbtn">
				<view class="">
					<image src="../../../static/image/71.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
				</view>
				<view class="" style="font-size:30rpx;font-family:PingFang SC;font-weight:500;flex: 1;margin-left: 20rpx;">
					女
				</view>
				<view class="">
					<image v-if="sex=='F'" src="../../../static/image/72.png" mode="" style="width: 35rpx;height: 35rpx;"></image>
					<image v-else src="../../../static/image/73.png" mode="" style="width: 35rpx;height: 35rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				sex:this.cacheHelper.appUser().sex,//S:未知，F: 女 M: 男
				usersxz:'男'
			}
		},
		onNavigationBarButtonTap(){
			this.edituser()
		},
		methods: {
			boybtn(){
				this.sex='M'
				this.usersxz="男"
			},
			womanbtn(){
				this.sex='F'
				this.usersxz="女"
			},
			edituser(){
				this.api.customeredit({
					sex:this.sex
				}).then(res=>{
					this.tui.toast("修改成功")
					setTimeout(()=>{
						this.cacheHelper.updateUserInfo()
						uni.navigateBack({
							delta:1
						})
					},500)
					console.log(res)
				})
			}
		}
	}
</script>

<style>

</style>
