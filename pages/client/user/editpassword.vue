<template>
	<view>
		<view class="" style="padding: 0 32rpx;background: #FFFFFF;">
			<view class="mobile" >
				<input type="number" v-model="mobile" value="" placeholder="请输入手机号"/>
			</view>
			<view class="mobile verification">
				<input v-model="inviteeCode" style="flex: 1;" type="text" value=""  placeholder="请输入验证码"/>
				<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'" size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
			</view>
			<view class="mobile verification">
				<input  style="flex: 1;"  type="number" v-model="password" :password="eye"  placeholder="请输入新密码"/>
				<view class="" @tap="eyebtn">
					<image v-if="eye" src="../../../static/image/84.png" mode="" style="width:32rpx;height:15rpx;margin-top: 14rpx;"></image>
					<image v-else src="../../../static/image/85.png" mode=""  style="width:32rpx;height:20rpx;margin-top: 14rpx;"></image>
				</view>
			</view>
			<view class="mobile verification">
				<input  style="flex: 1;"  type="number" v-model="newPassword" :password="neweye"  placeholder="确认新密码"/>
				<view class="" @tap="neweyebtn">
					<image v-if="neweye" src="../../../static/image/84.png" mode="" style="width:32rpx;height:15rpx;margin-top: 14rpx;"></image>
					<image v-else src="../../../static/image/85.png" mode=""  style="width:32rpx;height:20rpx;margin-top: 14rpx;"></image>
				</view>
			</view>
		</view>
		<view class="tui-address-new">
			<button @tap="preserve" class="newadd">保存</button>
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
				user:this.cacheHelper.appUser(),
				isFirst:false,//是否第一次设置密码true不显示旧密码
				eye:true,
				neweye:true,
				againeye:true,
				disabled: false,
				btnText: "获取验证码",
				mobile:'',//手机号
				type:'5',
				inviteeCode:'',//验证码
				newPassword:'',//确认新密码
				password:'',//新密码
				oldPassword:'',//旧密码
			}
		},
		onLoad(){//
			console.log(this.user)
			this.getUserInfo()
			if(this.user.payPassword==null||this.user.payPassword.length==0){//
			console.log(this.user.payPassword.length)
				this.isFirst=true;//第一次设置
			}
		},
		methods: {
			preserve(){
				if(this.password.length==6){
					this.api.updatePassword({
						mobile:this.mobile,
						code:this.inviteeCode,
						password:this.password,//新密码
						confirmPassword:this.newPassword,//确认新密码
					}).then(res=>{
						this.tui.toast(res)
						this.cacheHelper.updateUserInfo()
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 700)
					}).catch((err) => {
						this.tui.toast(err.message)
					})
				}else{
					this.tui.toast('密码为6位数')
				}
			},
				 
				
			// },
			getUserInfo(){//获取用户信息
				this.api.getUserInfo().then(res=>{
					console.log(res)
					this.user=res;
				})
			},
			eyebtn(){//请输入新密码
				this.eye=!this.eye //控制眼睛
			},
			neweyebtn(){//请输入旧密码
				this.neweye=!this.neweye //控制眼睛
			},
			againeyebtn(){//请输入旧密码
				this.againeye=!this.againeye //控制眼睛
			},
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
			btnSend: function() {//获取验证码
				if (util.isNullOrEmpty(this.mobile)) {
					this.tui.toast('请输入手机号码');
					return
				} else if (!util.isMobile(this.mobile)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.sendSmsRegister({
						mobile:this.mobile,
						type:3
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
		}
	}
</script>

<style lang="less">
	.mobile{
		padding: 32rpx 0;
		border-bottom: 1px solid rgba(238,238,238,1);
	}
	.verification-btn{
		width:170rpx;
		height:48rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 5rpx 0rpx rgba(204,204,204,1);
		border-radius:6rpx;
		color:rgba(51,51,51,1);
		text-align: center;
		line-height: 48rpx;
		display: inline-block;
		/* padding: :;rpx; */
	}
	.verification{
		display: flex;
	}
	.tui-address-new {
		margin-top: 200rpx;
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}
	.newadd{
		height: 80rpx;
		background:#F27F31;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
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
		border-radius: 8rpx;
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
