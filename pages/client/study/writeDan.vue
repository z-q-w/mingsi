<template>
	<view style="min-height: 95%;background: #FFFFFF;padding:30rpx;">
		<textarea style="width: 690rpx;" v-model="content" placeholder="请输入答案"/>
		<view style="padding: 30rpx;display: flex;">
			<view class="" v-for="(item,index) in imgList" style="position: relative;">
				<image @click="removeimg(index)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:20rpx;"></image>
				<image :src="item" mode="" style="width:157rpx;height:157rpx;bormargin-top: 20rpx;border-radius: 12rpx;margin-right: 20rpx;"></image>
			</view>
			<view class="addimg" @click="uploadImage" v-if="imgList.length<3">
				<image src="../../../static/image/69.png" mode="aspectFill" style="width: 60rpx;height: 60rpx;margin-top: 20rpx;"></image>
				<view style="color:rgba(204,204,204,1);font-size: 30rpx;">添加图片</view>
			</view>
		</view>
		<view class="tui-address-new">
			<button @click="issueask" class="newadd">提交</button>
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../../common/api/config.js'
	export default {
		data() {
			return {
				replyid:'',//存放id
				imgList:[],
				content:'',
			}
		},
		onLoad(option) {
			this.replyid=option.id
		},
		methods: {
			removeimg(index){
				this.imgList.splice(index, 1)
			},
			issueask(){//提交
				this.api.answerQuestion({
					id:this.replyid,
					content:this.content,
					pics:this.imgList.toString()
				}).then(res=>{
					this.tui.toast('发布成功')
					setTimeout(()=>{
						uni.navigateBack({
						    delta: 1
						});
					},300)
					uni.$emit('answer',{msg:'页面更新'})
				})
			},
			uploadImage(){//上传图片
				if(this.imgList.length>=3){
					this.tui.toast('最多上传3张图片')
					return
				}
			    var that = this
			    const accessToken = that.cacheHelper.getToken();
			    uni.chooseImage({
					count:3-this.imgList.length,
					sizeType: ['original', 'compressed'],
					sourceType: ['album'],
					success (res) {
						console.log(res)
						var tempFilePaths = res.tempFilePaths;
						for (var i = 0; i < tempFilePaths.length; i++) {
							uni.uploadFile({
								 url: urlConfig+ 'api/upload/uploads',//请求地址
								 filePath: tempFilePaths[i],
								 name: 'file',
								 header: {// 设置请求的 header
									'accessToken': accessToken
								}, 
								success: function success(res) {
									console.log(res)
									var newImg = JSON.parse(res.data);
									console.log(newImg.data.msg)
									if(res.statusCode == 200){
										that.imgList.push(newImg.data.msg)
										console.log(that.imgList)
									}
									console.log(res)
								},
								fail: function fail(err) {
									console.log(err);
								}
							});
						}
						console.log(res)
					}
			    });
			},
		}
	}
</script>

<style>
	.addimg{
		width:157rpx;
		height:157rpx;
		background:#EEEEEE;
		border-radius:12rpx;
		text-align: center;
	}
	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.newadd{
		height: 80rpx;
		background:rgba(242,127,49,1) ;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 80rpx;
	}
</style>
