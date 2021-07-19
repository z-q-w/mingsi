<template>
	<view style="padding: 0rpx 30rpx 30rpx 30rpx;">
		<view class="fantext">
			您好，欢迎您给我们反馈产品的使用感受和建议。
		</view>
		<view class="" style="background: #FFFFFF;padding: 20rpx;border-radius:6px;width: 640rpx;">
			<textarea v-model="content" style="width: 640rpx;" placeholder=" 请填写意见反馈内容"></textarea>
		</view>
		<view class="" style="margin-top: 35rpx;background: #FFFFFF;padding: 20rpx;border-radius:6px;">
			<input v-model="contact" placeholder=" 留下您的联系方式 手机 / QQ" type="number" value="" />
		</view>
		<view class="fantext-bottom" >
			您的联系方式有助于我们沟通解决问题，仅工作人员可见
		</view>
		<view class="tui-address-new">
			<button class="newadd" @tap="editAddr">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				content:'',
				contact:'',
			}
		},
		methods: {
			editAddr(){
				if(this.contact==''){
					this.tui.toast("请输入联系方式")
				}else if(this.content==''){
					this.tui.toast("请输入反馈内容")
				}else{
					this.api.feedbackinsert({
						content:this.content,
						contact:this.contact
					}).then(res=>{
						console.log(res)
						this.tui.toast("感谢您的反馈")
						setTimeout(() => {
							uni.switchTab({
								url:'/pages/client/user/user',
							});
						}, 300);
						this.content='',
						this.contact=''
					})
				}
			}
		}
	}
</script>

<style>
	.fantext{
		margin: 30rpx 0;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
	}
	.fantext-bottom{
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin: 30rpx 0;
	}
	.tui-address-new {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		margin-top: 120rpx;
	}
	.newadd{
		height: 80rpx;
		background:#F27F31;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
