<template>
	<view>
		<view class="seybox">
			<view style="display: flex;border-bottom: 1rpx solid rgba(238,238,238,1);margin: 0 28rpx;" @tap="headimgBtn">
				<view style="line-height:152rpx;flex: 1;">头像</view>
				<view class=""><image :src="userlist.avatar" mode="" @tap.stop="previewImage(userlist.avatar)" style="width:91rpx;height:91rpx; margin-top:26rpx;border-radius: 10rpx;" mode="aspectFill"></image></view>
				<view class=""><image src="../../../static/image/24.png" mode="" class="seyboxiao-img" style="margin-top: 66rpx;"></image></view>
			</view>
			<view class="seyboxiao" @tap="nicknamebtn">
				<text>姓名</text>
				<view class="">
					<text>{{userlist.nickname=='' ? userlist.account : userlist.nickname }}</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
			<view class="seyboxiao" @tap="genderbtn">
				<text>性别</text>
				<view class="">
					<text v-if="userlist.sex=='S'">未设置</text>
					<text v-if="userlist.sex=='F'">女</text>
					<text v-if="userlist.sex=='M'">男</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
			<view class="seyboxiao" @tap="signature">
				<text>个性签名</text>
				<view class="">
					<text>{{signaturedata}}...</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
			<view class="seyboxiao" @tap="binding">
				<text>绑定微信号</text>
				<view class="">
					<text>{{userlist.openid==''?'去绑定':'绑定成功'}}</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
			<view class="" style="height: 20rpx;background: rgb(245,245,245);"></view>
			<view class="seyboxiao" @tap="Changnumberbtn">
				<text>手机号</text>
				<view class="">
					<text>{{ userlist.account&&userlist.account!=null?userlist.account:'去绑定手机号'}}</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
			<view class="seyboxiao" @tap="editnj">
				<text>年级</text>
				<view class="">
					<text>{{ userlist.grade}}</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
			<view class="seyboxiao" @tap="school">
				<text>学校</text>
				<view class="">
					<text>{{ userlist.school }}</text>
					<image src="../../../static/image/24.png" mode="" class="seyboxiao-img"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import urlConfig from '../../../common/api/config.js'
export default {
	data() {
		return {
			type: 1,
			result: '',
			addseedata:{
				cityName:'',
				provinceName:'',
				areasName:'',
			},
			area:'',
			userlist:this.cacheHelper.appUser(),
		};
	},
	onLoad: function(options){
		var that = this
		uni.$on(that.constant.EventKey.UPDATE_USER_INFO, function(data) {
		   that.userlist = that.cacheHelper.appUser()
		   console.log(that.userlist)
	   })
	},
	computed:{
		signaturedata(){
			return this.userlist.signature.slice(0,6)
		}
	},
	methods: {
		quitout() {
			console.log('你点击了退出按钮');
		},
		binding(){
			if(this.userlist.openid==''){
				uni.showModal({
				    title: '提示',
				    content: '您确定绑定微信?',
				    success:(res)=> {
				        if (res.confirm) {
							uni.login({
								provider: 'weixin',
								success:(loginRes)=> {
									// 获取用户信息
									uni.getUserInfo({
									  provider: 'weixin',
									  success:(infoRes)=> {
											console.log(infoRes.userInfo.openId)
										   this.api.bindOpenid(
												JSON.stringify(infoRes.userInfo.openId)
										   ).then(res=>{
												console.log(res)
												this.tui.toast('绑定成功')
												this.cacheHelper.updateUserInfo()
										   })	
									  }
									});                				
								}
							});
				        }
				    }
				});
			}else{
				this.tui.toast('微信已绑定')
			}
		},
 		previewImage(v){ // 图片预览
			var imgArr = [];
			imgArr.push(v);
			
			uni.previewImage({
				urls: imgArr,
				current: imgArr[0]
			});
		},
		nicknamebtn() {//修改昵称
			uni.navigateTo({
			    url: './editNickname'
			});
		},
		genderbtn() {//修改性别
			uni.navigateTo({
			    url: './editGender'
			});
		},
		Changnumberbtn() {//更改手机号/绑定手机号
			uni.navigateTo({
			    url: './editNumber'
			});
		},
		signature(){//签名
			uni.navigateTo({
			    url: './editSignature'
			});
		},
		school(){//学校
			uni.navigateTo({
			    url: './editSchool'
			});
		},
		editnj(){//修改年级
			uni.navigateTo({
			    url: './editGrade'
			});
		},
		headimgBtn: function(){//上传图片
		    var that = this
		    const accessToken = that.cacheHelper.getToken();
		    uni.chooseImage({
				count:1,
				sizeType: ['original', 'compressed'],
				sourceType: ['album','camera'],
				success (res) {
					console.log(res)
					var tempFilePaths = res.tempFilePaths;
					console.log(res.tempFilePaths)
					// console.log(urlConfig)---上传图片地址
					uni.uploadFile({
						url: urlConfig+ 'api/upload/uploads', //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						header: {
							'accessToken': accessToken
						}, // 设置请求的 header
						success: function success(res) {
							console.log(res)
							var newImg = JSON.parse(res.data);
							console.log(newImg.data.msg)
							if(res.statusCode == 200){
								that.imgList=newImg.data.msg
								console.log(that.imgList)
								that.api.customeredit({
									avatar:that.imgList
								}).then(res=>{
									that.cacheHelper.updateUserInfo()
									that.tui.toast('更换成功')
									console.log(res)
								})
							}
							console.log(res)
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
};
</script>

<style>
.seybox {
	background: #ffffff;
	margin-top: 18rpx;
	font-size: 29rpx;
	font-family: PingFang SC;
	color: rgba(51, 51, 51, 1);
	line-height: 90rpx;
}
.seyboxiao {
	border-bottom: 1rpx solid rgba(238, 238, 238, 1);
	justify-content: space-between;
	display: flex;
	margin: 0 28rpx;
	padding: 20rpx 0rpx;
}
.seyboxiao-img {
	width: 14rpx;
	height: 25rpx;
	margin-left: 22rpx;
}
.account {
	font-size: 25rpx;
	font-family: PingFang SC;
	font-weight: 500;
	color: rgba(153, 153, 153, 1);
	line-height: 43rpx;
	padding: 0 30rpx;
	line-height: 91rpx;
	background: rgba(245, 245, 245, 1);
}
.dongbtn {
	width: 689rpx;
	height: 79rpx;
	border: 1rpx solid rgba(78, 161, 53, 1);
	box-shadow: 0rpx -1rpx 6rpx 0rpx rgba(4, 0, 0, 0.1);
	border-radius: 12rpx;
	font-size: 28rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(78, 154, 54, 1);
	line-height: 79rpx;
}
</style>
