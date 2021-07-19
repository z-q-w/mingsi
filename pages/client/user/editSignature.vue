<template>
	<view>
		<view class="sigture">
			<textarea class="sigturearea" @blur="bindTextAreaBlur" v-model="signature" placeholder="请输入个性签名" />
			<view class="" style="text-align: right;">
				{{signature.length}}/45
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				signature:this.cacheHelper.appUser().signature
			}
		},
		onNavigationBarButtonTap(){
			this.edituser()
		},
		methods: {
			bindTextAreaBlur(e){
				console.log(e)
			},
			edituser(){
				if(this.signature.length>45){
					this.tui.toast('不能超过45个字符')
				}else{
					this.api.customeredit({
						signature:this.signature
					}).then(res=>{
						this.tui.toast("修改成功")
						setTimeout(()=>{
							this.cacheHelper.updateUserInfo()
							uni.navigateBack({
								delta:1
							})
						},500)
					})
				}
			}
		}
	}
</script>

<style>
	.sigture{
		background: #FFFFFF;
		margin: 0 auto;
		margin-top: 30rpx;
		width: 640rpx;
		height: 222rpx;
		border-radius: 20rpx;
		padding: 30rpx;
	}
	.sigturearea{
		width: 640rpx;
		margin: 0 auto;
		height: 162rpx;
	}
</style>
