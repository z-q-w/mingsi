<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view class="" style="padding: 0 30rpx;">
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">老师姓名</text>
				<input type="text" v-model="name" value="" placeholder="请输入老师姓名"/>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">联系电话</text>
				<input type="text" v-model="mobile" value="" placeholder="请输入老师联系电话"/>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">验证码</text>
				<input style="flex: 1;" type="text" v-model="inviteeCode" value="" placeholder="请输入验证码"/>
				<button :class="btnText=='获取验证码' ? 'buggetyaz' : 'getyaz'" size="mini" :type="type" shape="circle" :plain="true" :disabled="disabled" @click="btnSend">{{btnText}}</button>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">老师学历</text>
				<input type="text" v-model="education" value="" placeholder="请输入老师学历"/>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">身份证号</text>
				<input type="idcard" :maxlength='20' v-model="idCardNo" style="width:500rpx;"  value="" placeholder="请输入身份证号"/>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;box-sizing: border-box;">
				<view class="">
					<view class="tatale" >个人简介</view>
				</view>
				<view class="" style="box-sizing: border-box;flex: 1;">
					<textarea style="width:100%;" v-model="intro" :maxlength="50" placeholder="请输入个人简介"/>
					<view class="numbers">({{intro.length}}/50)</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding:30rpx;">
			<text class="identitycard">上传身份证</text>
			<view class="" style="display: flex;justify-content: space-between;margin-top: 20rpx;">
				<view class="">
					<view class="">
						<image @click="headimgBtn(1)" v-if="imageList==''" src="../../../static/image/cd509ff079b8e46a836540b965fbb8b.png" mode="" style="width: 330rpx;height: 210rpx;"></image>
						<view class="" v-else style="position: relative;">
							<image @click="removeimg(1)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:10rpx;top:10rpx"></image>
							<image :src="imageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
						</view>
					</view>
					<view style="text-align: center;color: #999999;font-size: 28rpx;margin-top: 15rpx;">
						身份证正面
					</view>
				</view>
				<view class="">
					<view class="">
						<image @click="headimgBtn(2)" v-if="GSPimageList==''" src="../../../static/image/2a0e6452fe5a05bf3052e68bdf88511.png" mode="" style="width: 330rpx;height: 210rpx;"></image>
						<view class="" v-else style="position: relative;">
							<image @click="removeimg(2)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:10rpx;top:10rpx"></image>
							<image :src="GSPimageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
						</view>
					</view>
					<view style="text-align: center;color: #999999;font-size: 28rpx;margin-top: 15rpx;">
						身份证反面
					</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding: 30rpx;">
			<text class="identitycard">本人照片</text>
			<view class="" style="margin-top: 20rpx;">
				<image  @click="headimgBtn(3)" v-if="BranchimageList==''" src="../../../static/image/127942056e30ee6c8b4054c62267e76.png" mode="" style="width: 230rpx;height: 210rpx;"></image>
				<view class="" v-else style="position: relative;width: 330rpx">
					<image @click="removeimg(3)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:10rpx;top:10rpx"></image>
					<image :src="BranchimageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
				</view>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding: 30rpx;">
			<text class="identitycard">毕业证</text>
			<view class="" style="margin-top: 20rpx;" @click="headimgBtn(4)">
				<image @click="headimgBtn(4)" v-if="medicalimageList==''" src="../../../static/image/127942056e30ee6c8b4054c62267e76.png" mode="" style="width: 230rpx;height: 210rpx;"></image>
				<view class="" v-else style="position: relative;width: 330rpx">
					<image @click="removeimg(4)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:10rpx;top:10rpx"></image>
					<image :src="medicalimageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
				</view>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding: 30rpx;" >
			<text class="identitycard">教师资格证</text>
			<view class="" style="margin-top: 20rpx;">
				<image @click="headimgBtn(5)" v-if="certification==''" src="../../../static/image/127942056e30ee6c8b4054c62267e76.png" mode="" style="width: 230rpx;height: 210rpx;"></image>
				<view class="" v-else style="position: relative;width: 330rpx">
					<image @click="removeimg(5)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:10rpx;top:10rpx"></image>
					<image :src="certification" mode="" style="width: 330rpx;height: 210rpx;"></image>
				</view>
			</view>
		</view>
		<view class="submit" @click="submitbtn">
			提交
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../../common/api/config.js'
	export default {
		data() {
			return {
				disabled: false,
				inviteeCode:'',//验证码
				btnText: "获取验证码",
				imageList:'',//身份证的正面
				GSPimageList:'',//身份证的反面
				certification:'',//教师资格证
				BranchimageList:'',//本人照片
				medicalimageList:'',//毕业证
				name:'',//老师姓名
				mobile:'',//联系电话
				education:'',//老师学历
				idCardNo:'',//身份证号
				intro:'',//个人简介
				type: "primary",
			}
		},
		methods: {
			doLoop: function(seconds) {
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
			removeimg(v){
				if(v==1){
					this.imageList=''
				}else if(v==2){
					this.GSPimageList=''
				}else if(v==3){
					this.BranchimageList=''
				}else if(v==4){ 
					this.medicalimageList=''
				}else if(v==5){
					this.certification=''
				}
			},
			btnSend: function() {//获取验证码
				if (!this.utils.isMobile(this.mobile)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.sendSmsRegister({
						mobile:this.mobile,
						type:'4' //1 用户端app注册 2 用户端app登录 3 用户端修改账号密码
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
			submitbtn(){
				this.api.settlement({
					tqcPhoto:this.certification,//教师资格证					diploma:this.medicalimageList,//毕业证					photo:this.BranchimageList,//本人照片					idCardBack:this.GSPimageList,//身份证背面照					idCardFace:this.imageList,//身份证正面照					intro:this.intro,//个人简介					idCardNo:this.idCardNo,//身份证号					education:this.education,//学历					code:this.inviteeCode,//验证码					mobile:this.mobile,//联系电话					name:this.name,//老师姓名
				}).then(res=>{
					this.tui.toast('提交成功')
					uni.navigateTo({
						url:"./teacherpass?checkResult=" + 1
					})
				})
				
			},
			headimgBtn: function(v){//上传图片
			    var that = this
			    const accessToken = that.cacheHelper.getToken();
			    uni.chooseImage({
					count:1,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success (res) {
						uni.showLoading({
						    title: '加载中'
						});
						var tempFilePaths = res.tempFilePaths;
						console.log(res.tempFilePaths)
						uni.uploadFile({
							url: urlConfig+ 'api/upload/uploads', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							header: {
								'accessToken': accessToken
							}, // 设置请求的 header
							success: function success(res) {
								var newImg = JSON.parse(res.data);
								console.log(newImg.data)
								if(v==1){
									that.imageList=newImg.data.msg
								}else if(v==2){
									that.GSPimageList=newImg.data.msg
								}else if(v==3){
									that.BranchimageList=newImg.data.msg
								}else if(v==4){
									that.medicalimageList=newImg.data.msg
								}else if(v==5){
									that.certification=newImg.data.msg
								}
								uni.hideLoading();
							},
						   fail: function fail(err) {
								console.log(err);
						   }
						});
						console.log(res)
					 }
			    });
			},
		}
	} 
</script>

<style>
	.tatale{
		display: inline-block;
		width: 130rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: #333333;
		opacity: 1;
		margin-right: 20rpx;
	}
	.identitycard{
		display: inline-block;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 40rpx;
		color: #333333;
		opacity: 1;
		margin-right: 20rpx;
	}
	.numbers{
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 40px;
		color: #999999;
		opacity: 1;
		text-align: right;
	}
	.mobile{
		padding: 32rpx;
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
	}
	.verification{
		display: flex;
	}
	.getyaz{
		padding:5rpx 15rpx;
		font-size:22rpx;
		line-height:30rpx;
		border-radius: 8rpx;
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
	.submit{
		width: 690rpx;
		height: 91rpx;
		background: #F27F31;
		opacity: 1;
		border-radius: 12rpx;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 45rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
		margin: 40rpx auto ;
		line-height: 91rpx;
	}
</style>
