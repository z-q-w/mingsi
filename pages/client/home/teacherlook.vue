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
				<text class="tatale">老师学历</text>
				<input type="text" v-model="education" value="" placeholder="请输入老师学历"/>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">身份证号</text>
				<input type="text" v-model="idCardNo" value="" placeholder="请输入身份证号"/>
			</view>
			<view class="" style="display: flex;padding: 30rpx 0;border-bottom: 1rpx solid #f8f8f8;">
				<text class="tatale">个人简介</text>
				<view class="">
					<textarea style="height: 120rpx;" v-model="intro" placeholder="请输入个人简介"/>
					<!-- <view class="numbers">({{intro.length}}/50)</view> -->
				</view>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding:30rpx;">
			<text class="identitycard">上传身份证</text>
			<view class="" style="display: flex;justify-content: space-between;margin-top: 20rpx;">
				<view class="">
					<view class="">
						<image :src="imageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
					</view>
					<view style="text-align: center;color: #999999;font-size: 28rpx;margin-top: 15rpx;">
						身份证正面
					</view>
				</view>
				<view class="">
					<view class="">
						<image :src="this.GSPimageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
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
			<view class="">
				<image :src="this.BranchimageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding: 30rpx;">
			<text class="identitycard">毕业证</text>
			<view class="">
				<image :src="this.medicalimageList" mode="" style="width: 330rpx;height: 210rpx;"></image>
			</view>
		</view>
		<view class="" style="height: 20rpx;background: #F2F4F8;;"></view>
		<view class="" style="padding: 30rpx;" >
			<text class="identitycard">教师资格证</text>
			<view class="">
				<image :src="this.certification" mode="" style="width: 330rpx;height: 210rpx;"></image>
			</view>
		</view>
		<view class="submit" @click="submitbtn">
			查看结果
		</view>
	</view>
</template>

<script>
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
				refuseReason:'',//审核失败原因
				checkResult:'',//审核结果
			}
		},
		onLoad() {
			this.teachermessage()
		},
		methods: {
			submitbtn(){
				uni.navigateTo({
					url:"./teacherpass?refuseReason=" + this.refuseReason + '&checkResult=' + this.checkResult
				})
			},
			teachermessage(){
				this.api.teachermessage().then(res=>{
					console.log(res)
					this.imageList = res.data.idCardFront//身份证的正面
					this.GSPimageList=res.data.idCardBack//身份证的反面
					this.certification=res.data.certificate//教师资格证 
					this.BranchimageList=res.data.photo//本人照片
					this.medicalimageList=res.data.diploma//毕业证
					this.name=res.data.name//老师姓名
					this.mobile=res.data.mobile//联系电话
					this.education=res.data.education//老师学历
					this.idCardNo=res.data.idCard//身份证号
					this.intro=res.data.introduction//个人简介
					this.refuseReason=res.data.reason//审核失败原因
					this.checkResult=res.data.status//审核结果
				})
			}
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
