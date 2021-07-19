<template>
	<view>
		<view class="" style="background: #FFFFFF;margin-top: 20rpx;padding: 30rpx;display: flex;border-bottom: 1px solid rgba(238,238,238,1)">
			<input v-model="sjnumber" style="flex: 1;" type="number" value="" placeholder="输入手机号"/>
			<image v-if="show" @tap="deletbtn" src="../../../static/image/68.png" mode="" style="width: 33rpx;height: 33rpx;margin-top: 10rpx;"></image>
		</view>
		<view class="passwrd">
			<input style="flex: 1;" type="" v-model="inviteeCode" placeholder="请输入验证码"/>
			<!-- <tui-button class="getyaz" size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</tui-button> -->
			<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'" size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
		</view>
	</view>
</template>

<script>
	import tuiButton from "@/components/button/button"
	const util = require('../../../utils/util.js')
	export default {
		components: {
			tuiButton
		},
		data() {
			return {
				sjnumber:'',
				show:true,
				inviteeCode:'',
				type: "primary",
				disabled: false,
				btnText: "获取验证码",
			}
		},
		onNavigationBarButtonTap(){
			if (!util.isMobile(this.sjnumber)) {
				this.tui.toast('请输入正确的手机号码');
				return
			}else{
				this.api.customeredit({
					mobile:this.sjnumber,
					code:this.inviteeCode
				}).then(res=>{
					console.log(res)
					this.cacheHelper.updateUserInfo()
					// this.cacheHelper.appUser()
					this.tui.toast('修改成功')
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},300)
				})
			}
		},
		methods: {
			doLoop: function(seconds) {
				seconds = seconds ? seconds : 60;
				this.btnText = seconds + "s后获取";
				let countdown = setInterval(() => {
					if (seconds > 0) {
						this.btnText = seconds + "s后获取"
							--seconds;
					} else {
						this.btnText = "获取验证码";
						this.disabled = false;
						this.type = "primary";
						clearInterval(countdown);
					}
				}, 1000);
			},
			btnSend: function() {
				if (util.isNullOrEmpty(this.sjnumber)) {
					this.tui.toast('请输入手机号码');
					return
				} else if (!util.isMobile(this.sjnumber)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.sendSmsRegister({
						mobile:this.sjnumber,
						type:5
					}).then(res=>{
						this.disabled = true;
						this.btnText = "请稍候...";
						this.type = "gray"
						console.log(res)
						setTimeout(() => {
							this.doLoop(60)
						}, 500)
					})
				}
			},
			deletbtn(){
				if(this.sjnumber==''){
					
				}else{
					this.sjnumber=''
				}
			},
		}
	}
</script>

<style>
	.passwrd{
		background: #FFFFFF;
		padding: 30rpx;
		/* margin: 0 30rpx ; */
		border-bottom: 1px solid rgba(238,238,238,1);
		display: flex;
		justify-content: space-between;
	}
	.getyaz{
		padding:5rpx 15rpx;
		font-size:22rpx;
		line-height:30rpx;
		border-radius: 40rpx;
		color: #CCCCCC !important;
		border: 1px solid #CCCCCC;
	}
	.buggetyaz{
		padding:5rpx 15rpx;
		font-size:22rpx;
		line-height:30rpx;
		border-radius: 40rpx;
		border: 1px solid #F27F31 !important;
		color: #F27F31 !important;
	}
	.circle{
		width: 25rpx;
		height: 25rpx;
		border: 1px solid #CCCCCC;
		border-radius: 50%;
		margin-top: 6rpx;
	}
	/deep/.tui-primary-outline{
		border: 1rpx solid #CCC !important;
		color: #CCCCCC!important;
		border-radius: 16rpx!important;
		font-size: 22rpx !important;
		height:48rpx !important;
		line-height: 48rpx !important;
	}
	/deep/.tui-outline-fillet{
		border-radius: 0rpx!important;
		border-radius: 48rpx!important;
		box-shadow:0px 0px 5px 0px rgba(204,204,204,1);
		border-radius:6px;
		font-size: 22rpx !important;
		height:48rpx !important;
		line-height: 48rpx !important;
	}
</style>
