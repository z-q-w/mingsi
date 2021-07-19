<template>
	<view style="padding-top: 160rpx ;">
		<view class="login">
			注册账号
		</view>
		<input class="phone" type="number" value="" v-model="mobile" placeholder="请输入手机号"/>
		<view class="passwrd">
			<input style="flex: 1;" type="" v-model="validateCode" placeholder="请输入验证码"/>
			<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'"  size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
		</view>
		<view class="passwrd" style="display: flex;">
			<input style="flex: 1;" type="password" v-model="password" placeholder="请输入密码"/>
		</view>
		<view class="passwrd" style="display: flex;">
			<input style="flex: 1;" type="password" v-model="confirmPassword" placeholder="确认密码"/>
		</view>
		<view class="login-box">
			还没有账号？去
			<text class="register" @tap="reloginbtn">登录</text>
		</view>
		<view class="">
			<button @tap="regiisterbtn" class="comlogin">注册</button>
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
				agree:false,
				type: "primary",
				disabled: false,
				validateCode:'',
				mobile:'',
				password:'',
				confirmPassword:'',//确认密码
				inviteeCode:'',
				btnText: "获取验证码",
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
				// let code = this.getRandom(6);
				// this.tui.toast('您本次的验证码是：' + code, 5000);
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
						type:'1' //1 用户端app注册
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
			regiisterbtn(){
				if(!util.isMobile(this.mobile)){
					this.tui.toast('请输入正确的手机号码');
					return
				}
				let params = {
					mobile: this.mobile,
					password:this.password,
					inviteeCode: this.inviteeCode,
					validateCode:this.validateCode,//验证码
					confirmPassword:this.confirmPassword,
				}
				this.api.register(params).then((res)=>{
					this.tui.toast("注册成功")
					uni.setStorageSync('windowPops',true);
					setTimeout(() => {
						uni.navigateBack({
						    delta: 1
						});
					}, 700)
				}).catch((err) => {
					this.tui.toast(err.message)
				})
			},
			reloginbtn(){
				// uni.navigateTo({
				//     url: '/pages/client/login/login'
				// });
				uni.navigateBack({
				    delta: 1
				});
			},
			forgetmmbtn(){
				console.log('忘记')
				uni.navigateTo({
				    url: '/pages/client/login/forgetpassword/forgetpassword'
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
		color:#F27F31;
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
		color:#F27F31;
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
		margin-top: 100rpx;
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
