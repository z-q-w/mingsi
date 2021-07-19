<template>
	<view>
		<view class="" style="background: #FFFFFF;margin-top: 20rpx;padding: 30rpx;display: flex;">
			<input v-model="nickName" style="flex: 1;" type="text" value="" placeholder="输入昵称"/>
			<image v-if="show" @tap="deletbtn" src="../../../static/image/68.png" mode="" style="width: 33rpx;height: 33rpx;margin-top: 10rpx;"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nickName:this.cacheHelper.appUser().nickname,
				show:true,
			}
		},
		onNavigationBarButtonTap(){
			this.edituser()
		},
		methods: {
			deletbtn(){
				if(this.nickName==''){
					
				}else{
					this.nickName=''
				}
			},
			edituser(){
				if(this.nickName.length>9){
					this.tui.toast('姓名不能超过9个字符')
				}else{
					this.api.customeredit({
						nickname:this.nickName
					}).then(res=>{
						this.tui.toast('修改成功')
						setTimeout(()=>{
							this.cacheHelper.updateUserInfo()
							uni.navigateBack({
								delta:1
							})
						},300)
						console.log(res)
					})
				}
			}
			
		}
	}
</script>

<style>

</style>
