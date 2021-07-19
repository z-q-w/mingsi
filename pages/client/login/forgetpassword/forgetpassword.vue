<template>
	<view style="padding-top: 160rpx ;">
		<view class="login">
			忘记密码
		</view>
		<input class="phone" type="number" value="" v-model="mobile" placeholder="请输入手机号"/>
		<view class="passwrd">
			<input style="flex: 1;" type="number" v-model="inviteeCode"  placeholder="请输入验证码"/>
			<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'"  size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
		</view>
		<view class="passwrd" style="display: flex;">
			<input style="flex: 1;" type="" v-model="password" :password="hidden" placeholder="请输入新密码"/>
			<view class="" @tap="showy">
				<image v-if="hidden" src="../../../../static/image/84.png" mode="" style="width:32rpx;height:13rpx;"></image>
				<image v-else src="../../../../static/image/85.png" mode="" style="width:32rpx;height:22rpx;"></image>
			</view>
		</view>
		<view class="passwrd" style="display: flex;">
			<input style="flex: 1;" type="" v-model="newpassword" :password="newhidden" placeholder="确认新密码"/>
			<view class="" @tap="newshowy">
				<image v-if="newhidden" src="../../../../static/image/84.png" mode="" style="width:32rpx;height:13rpx;"></image>
				<image v-else src="../../../../static/image/85.png" mode="" style="width:32rpx;height:22rpx;"></image>
			</view>
		</view>
		<view class="" style="margin-top: 110rpx;">
			<button @tap="resetByMobi" class="comlogin">确定</button>
		</view>
	</view>
</template>

<script>
	import tuiButton from "@/components/button/button"
	const util = require('../../../../utils/util.js')
	export default {
		components: {
			tuiButton
		},
		data() {
			return {
				hidden:true,
				newhidden:true,
				agree:false,
				yztime:60,
				disabled: false,
				btnText: "获取验证码",
				mobile:'',
				inviteeCode:'',
				oldPassword:'',
				password:'',
				newpassword:'',//确认密码
				countdown:'',
				type: "primary",
			}
		},
		methods: {
			getRandom: function(u) {
				let rnd = "";
				u = u || 6;
				for (var i = 0; i < u; i++) {
					rnd += Math.floor(Math.random() * 10);
				}
				return Number(rnd);
			},
			doLoop: function(seconds) {
				seconds = seconds ? seconds : 60;
				this.btnText = seconds + "s后获取";
				// this.code = code
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
				if (util.isNullOrEmpty(this.mobile)) {
					this.tui.toast('请输入手机号码');
					return
				} else if (!util.isMobile(this.mobile)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.sendSmsRegister({
						mobile:this.mobile,
						type:'6'  //1 用户端app注册
					}).then(res=>{
						this.disabled = true;
						this.btnText = "请稍候...";
						this.type = "gray"
						setTimeout(() => {
							this.doLoop(60)
						}, 500)
						console.log(res)
					})
				}
				
			
				
			},
			showy(){
				this.hidden=!this.hidden
			},
			newshowy(){
				this.newhidden=!this.newhidden
			},
			resetByMobi(){
				this.api.forgetPassword({
					mobile:this.mobile,  //手机号
					validateCode:this.inviteeCode,  //验证码
					password:this.password,  //密码
					confirmPassword:this.newpassword, //确认密码
				}).then(res=>{
					console.log(res)
					this.tui.toast("修改成功")
					setTimeout(() => {
						uni.navigateBack({
						    delta: 1
						});
					}, 700)
				}).catch((err) => {
					this.tui.toast(err.message)
				})
			},
			zhulogin(){
				uni.navigateBack({
				    delta: 1
				});
			}
		}
	}
</script>

<style lang="less">
	.login{
		font-size:43rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(0,0,0,1);
		border-left: 8rpx solid #F27F31;
		padding-left: 30rpx ;
	}
	.phone{
		margin: 60rpx 30rpx 0 30rpx;
		padding: 30rpx 0;
		border-bottom: 1px solid rgba(238,238,238,1);
	}
	.passwrd{
		padding: 30rpx 0;
		margin: 0 30rpx ;
		border-bottom: 1px solid rgba(238,238,238,1);
		display: flex;
		justify-content: space-between;
	}
	.register{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(101,182,76,1);
		line-height:21rpx;
	}
	.login-box{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		margin: 30rpx ;
	}
	.forgetmm{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(101,182,76,1);
		line-height:21rpx;
		float: right;
	}
	.comlogin{
		width:678rpx;
		height:85rpx;
		background:#F27F31;
		border-radius:42rpx;
		text-align: center;
		line-height: 85rpx;
		font-size:35rpx;
		color: #FFFFFF;
		margin-top: 60rpx;
	}
	.circle{
		width: 25rpx;
		height: 25rpx;
		border: 1px solid #CCCCCC;
		border-radius: 50%;
		margin-top: 6rpx;
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
