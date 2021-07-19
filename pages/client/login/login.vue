<template>
	<view style="padding-top: 150rpx;">
		<view class="login">
			<view :class="pattern==1? 'patternstyle' :''" @click="codedlock(1)" style="margin-right: 80rpx;">
				<view class="">
					密码登录
				</view>
				<view class="" style="height: 10rpx;border-radius: 10rpx;background: #F27F31;width: 100rpx;text-align: center;margin: 14rpx auto  0 auto;" v-if="pattern==1"></view>
			</view>
			<view :class="pattern==2? 'patternstyle' :''" class="" @click="codedlock(2)">
				<view class="">
					验证码登录
				</view>
				<view class="" style="height: 10rpx;border-radius: 10rpx;background: #F27F31;width: 100rpx;text-align: center;margin: 14rpx auto  0 auto;" v-if="pattern==2"></view>
			</view>
		</view>
		<!-- 密码登录 -->
		<view class="" v-if="pattern==1">
			<input class="phone" type="number" v-model="mobile" placeholder="请输入手机号" />
			<view class="passwrd" style="display: flex;">
				<input style="flex: 1;" type="password" v-model="password"  placeholder="请输入密码" />
			</view>
		</view>
		<!-- 验证码登录 -->
		<view class="" v-if="pattern==2">
			<input class="phone" type="number" value="" v-model="mobileyan" placeholder="请输入手机号"/>
			<view class="passwrd" style="display: flex;">
				<input style="flex: 1;" type="" v-model="validateCode" placeholder="请输入验证码"/>
				<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'"  size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
			</view>
		</view>
		<view class="login-box">
			还没有账号？去
			<text class="register" @tap="registerbtn">注册</text>
			<text class="forgetmm" @tap="forgetmmbtn">忘记密码?</text>
		</view>
		<view class=""><button @tap="loginsd" class="comlogin">登录</button></view>
		<view class="" style="display: flex;padding: 40rpx 35rpx;height: 50rpx;">
			<view class="read" style="display: flex;">
				<view class="" @click="consentbtn" style="margin-top: 6rpx;margin-right: 10rpx;">
					<image v-if="consent" src="../../../static/image/72.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
					<image v-if="consent==false" src="../../../static/image/73.png" mode="" style="width: 30rpx;height: 30rpx;"></image>
				</view>
				同意 <text class="stxts" @tap="usrebtnxy">《用户协议》</text>和<text class="stxts" @tap="agreebtn">《隐私政策》</text>
			</view>
		</view>
		<view  v-if="description==1" style="margin: 0 auto;width: 250rpx;display: flex;justify-content: space-around;">
			<image  @click="WechatLogin" src="../../../static/image/weixin11.png" mode="" style="height: 97rpx;width: 97rpx;"></image>
		</view>
	</view>
</template>

<script>
import tuiModal from '@/components/modal/modal';
export default {
	components: {
		tuiModal
	},
	data() {
		return {
			scrollTop: 0,
			mobile: '',
			consent:false,
			password: '',
			old: {
				scrollTop: 0
			},
			moimag:'../../../static/image/icon-1024',
			agree: false,
			disabled: false,
			typexy:'',
			openidsd:'',
			invitationCode:'',
			pattern:'1',//1密码登录  2 验证码登录
			btnText: "获取验证码",
			type: "primary",
			validateCode:'',
			mobileyan:'',
			description:'',
		};
	},
	onLoad(){
		this.findByCode()
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
			if (!this.utils.isMobile(this.mobileyan)) {
				this.tui.toast('请输入正确的手机号码');
				return
			}else{
				this.api.sendSmsRegister({
					mobile:this.mobileyan,
					type:'2' //1 用户端app注册
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
		findByCode(){  //IS_LOGIN 1可以  2不可以
			this.api.findByCode(
				JSON.stringify('IS_LOGIN')
			).then(res=>{
				this.description=res.data.description
			})
		},
		codedlock(v){
			this.pattern=v
		},
		consentbtn(){
			this.consent = !this.consent
		},
		loginsd(){  //账号密码登录
			if(this.consent==false){
				this.tui.toast('请勾选下面的协议')
				return
			}
			// #ifdef APP-PLUS
			var info = plus.push.getClientInfo(); // 获取推送客户端信息，传给后台
			console.log(info)
			// #endif
			if(this.pattern==1){//密码登录
				if(!this.utils.isMobile(this.mobile)){
					this.tui.toast('手机号码不正确')
				}else{
					this.api.loginauth({
						account: this.mobile,//手机号
						password: this.password,//密码
						clientId:info.clientid,
					}).then(res => {
						this.cacheHelper.setToken(res.data.token);
						this.tui.toast('登录成功')
						setTimeout(() => {
							uni.switchTab({
								url:'/pages/client/home/home'
							})
							uni.$emit('islogindf',{msg:'页面更新学习页面的我的课程两条数据'})
							uni.$emit('readmessage',{msg:'登录就刷新系统消息'})
						}, 500);
					})
				}
			}else{//验证码登录
				if(!this.utils.isMobile(this.mobileyan)){
					this.tui.toast('手机号码不正确')
				}else{
					this.api.mobileLogin({
						mobile: this.mobileyan,//手机号
						validateCode: this.validateCode,//验证码
						clientId:info.clientid,
					}).then(res => {
						this.cacheHelper.setToken(res.data);
						this.tui.toast('登录成功')
						setTimeout(() => {
							uni.switchTab({
								url:'/pages/client/home/home'
							})
							uni.$emit('islogindf',{msg:'页面更新学习页面的我的课程两条数据'})
							uni.$emit('readmessage',{msg:'登录就刷新系统消息'})
						}, 500);
					})
				}
			}
		},
		WechatLogin(){//微信登录
			if(this.consent==false){
				this.tui.toast('请勾选下面的协议')
				return
			}
		    var info = plus.push.getClientInfo(); // 获取推送客户端信息，传给后台
			console.log(info)
		    let that=this
				uni.login({
					provider: 'weixin',
					success: function (loginRes) {
						let res0=loginRes.authResult
						that.openidsd=loginRes.authResult
						console.log(loginRes)//成功后返回openid
						// 获取用户信息
						uni.getUserInfo({
						  provider: 'weixin',
						  success: function (infoRes) {
							   that.api.wxLogin({
									'openid':res0.openid,
									'clientId':info.clientid
							   }).then(res=>{
									console.log(res)
									uni.$emit('readmessage',{msg:'登录就刷新系统消息'})
									uni.$emit('islogindf',{msg:'页面更新学习页面的我的课程两条数据'})
									that.cacheHelper.setToken(res.data.token);
									setTimeout(() => {
										uni.navigateBack({delta:2});
									}, 300);
							   })	
						  }
						});                				
					}
				});
		},
		//显示协议事件
		agreebtn() {
			uni.navigateTo({
				url:'/pages/client/user/privacyxieyi'
			})
		},
		usrebtnxy(){
			uni.navigateTo({
				url:'/pages/client/user/protocols'
			})
		},
		scroll: function(e) {
			console.log(e);
			this.old.scrollTop = e.detail.scrollTop;
		},
		upper: function(e) {
			console.log(e);
		},
		lower: function(e) {
			console.log(e);
		},
		registerbtn() {//注册
			uni.navigateTo({
				url: './register/register'
			});
		},
		forgetmmbtn() {//忘记密码
			console.log('忘记');
			uni.navigateTo({
				url: './forgetpassword/forgetpassword'
			});
		},
		longtui() {
			uni.navigateBack({
				delta: 1
			});
		},
	}
};
</script>

<style>
.text{
	font-size: 30rpx;
}
.tanbtn {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 999;
	box-sizing: border-box;
	background: #ffffff;
	display: flex;
	justify-content: space-between;
	padding: 25rpx 0;
	border-radius: 12rpx;
}
.determine {
	width: 255rpx;
	height: 100rpx;
	background: rgba(101, 182, 76, 1);
	border-radius: 12rpx;
	text-align: center;
	line-height: 100rpx;
	color: #ffffff;
	font-size: 33rpx;
}
.xycancel {
	width: 255rpx;
	height: 100rpx;
	background: rgba(245, 245, 245, 1);
	border-radius: 12rpx;
	text-align: center;
	line-height: 100rpx;
	font-size: 33rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(153, 153, 153, 1);
}
.scroll-Y {
	height: 840rpx;
}
.login {
	font-size: 43rpx;
	font-family: PingFang SC;
	font-weight: 600;
	color:rgb(153,153,153);
	padding-left: 30rpx;
	display: flex;
	margin-top: 200rpx;
}
.phone {
	margin: 60rpx 30rpx 0 30rpx;
	padding: 30rpx 0;
	border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.passwrd {
	padding: 30rpx 0;
	margin: 0 30rpx;
	border-bottom: 1px solid rgba(238, 238, 238, 1);
}
.register {
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #F27F31;
	line-height: 21rpx;
}
.login-box {
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(51, 51, 51, 1);
	margin: 30rpx;
}
.forgetmm {
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: #F27F31;
	line-height: 21rpx;
	float: right;
}
.comlogin {
	width: 678rpx;
	height: 85rpx;
	background: #F27F31;
	border-radius: 42rpx;
	text-align: center;
	line-height: 85rpx;
	font-size: 35rpx;
	color: #ffffff;
	margin-top: 100rpx;
}
.read {
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 500;
/* 	color: rgba(101, 182, 76, 1); */
	line-height: 40rpx;
	letter-spacing: 2rpx;
	width: 650rpx;
}
.stxts{
	color: #F27F31;
}
.circle {
	width: 25rpx;
	height: 25rpx;
	border: 1px solid #cccccc;
	border-radius: 50%;
	margin-top: 6rpx;
}
.tui-modal-custom {
	/* width:600rpx; */
	height: 831rpx;
	background: rgba(255, 255, 255, 1);
	border-radius: 12rpx;
}
.tui-swiper-item {
	display: flex;
	align-items: center;
}
.tui-swiper {
	font-size: 28upx;
	height: 50upx;
	flex: 1;
}
.tui-modal-custom-text {
	font-size: 29rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
	text-align: center;
}
.patternstyle{
	color: #F27F31;
}
.buggetyaz{
		padding:5rpx 15rpx;
		font-size:22rpx;
		line-height:30rpx;
		border-radius: 40rpx;
		border: 1px solid #F27F31 !important;
		color: #F27F31 !important;
	}
	.getyaz{
		padding:5rpx 15rpx;
		font-size:22rpx;
		line-height:30rpx;
		border-radius: 40rpx;
		color: #CCCCCC !important;
		border: 1px solid #CCCCCC;
	}
</style>
