<template>
	<view style="min-height:100%;background: #FFFFFF;">
		<view class="">
			<view class="" style="display: flex;justify-content: space-between;padding: 30rpx;">
				<text>问题</text>
				<text>{{issue.length}}/50</text>
			</view>
			<view class="" style="height: 125rpx;margin:0 30rpx;border-radius: 12rpx;border-bottom: 1rpx solid rgb(245,245,245);">
				<textarea @blur="bindTextAreaBlur" maxlength="50" v-model="issue" auto-height placeholder="请输入问题" placeholder-style="width: 600rpx;height:130rpx;"/>
			</view>
		</view>
		<view class="" style="margin: 30rpx;height: 300rpx;">
			<textarea @blur="bindTextAreaBlur" style="height: 330rpx;" auto-height v-model="describe" placeholder="对问题的补充说明" placeholder-style="width: 600rpx;height:330rpx"/>
		</view>
		<view class="" style="padding: 30rpx;border-bottom: 20rpx solid rgba(242,244,248,1);display: flex;">
			<view class="" v-for="(item,index) in imgList" style="position: relative;">
				<image @click="removeimg(index)" src="../../../static/image/68.png" mode="" style="width: 30rpx;height: 30rpx;position: absolute;z-index: 999;right:20rpx;"></image>
				<image :src="item" mode="" style="width:157rpx;height:157rpx;bormargin-top: 20rpx;border-radius: 12rpx;margin-right: 20rpx;"></image>
			</view>
			<view class="addimg" @click="uploadImage" v-if="imgList.length<3">
				<image src="../../../static/image/69.png" mode="" style="width: 60rpx;height: 60rpx;margin-top: 20rpx;"></image>
				<view style="color:rgba(204,204,204,1);">添加图片</view>
			</view>
		</view>
		<view class="">
			<view @click="selectnj" class="" style="display: flex;justify-content: space-between;padding: 30rpx;border-bottom: 1rpx solid rgb(245,245,245);">
				<text>年级</text>
				<view class="">
					<text style="margin-right: 20rpx;color:rgba(204,204,204,1);">{{gradeIdname==''?'请选择':gradeIdname}} </text>
					<image src="../../../static/image/24.png" mode="" style="width: 14rpx;height: 24rpx;"></image>
				</view>
			</view>
			<view @click="selectkm" class="" style="display: flex;justify-content: space-between;padding: 30rpx;">
				<text>科目</text>
				<view class="">
					<text style="margin-right: 20rpx;color:rgba(204,204,204,1);">{{subjectIdname==''?'请选择':subjectIdname}}</text>
					<image src="../../../static/image/24.png" mode="" style="width: 14rpx;height: 24rpx;"></image>
				</view>
			</view>
		</view>
		<view class="tui-address-new">
			<button @click="issueask" class="newadd">发布</button>
		</view>
	</view>
</template>

<script>
	import urlConfig from '../../../common/api/config.js'
	export default {
		data() {
			return {
				imgList:[],//图片
				issue:'',//问题
				describe:'',//补充
				gradeId:'',//年级id
				subjectId:'',//科目id
				gradeIdname:'',
				subjectIdname:''
			}
		},
		onLoad(option) {
			this.gradeId=option.gradeId //年级id
			this.subjectId=option.subjectId //科目id
			 uni.$on('electnian',(data)=>{
				console.log(data.msg.id,data.msg.name)
				this.gradeId=data.msg.id
				this.gradeIdname=data.msg.name
			})
			uni.$on('electke',(data)=>{
				this.subjectId=data.msg.id
				this.subjectIdname=data.msg.name
			})
		},
		methods: {
			issueask(){//发布按钮
				console.log(this.subjectId,this.gradeId,this.question)
				if(this.issue=='' || this.issue==undefined){
					this.tui.toast('请填写问题')
				}else if(this.gradeId=='' || this.gradeId==undefined){
					this.tui.toast('请选择年级')
				}else if(this.subjectId=='' || this.subjectId==undefined){
					this.tui.toast('请选择科目')
				}else{
					this.api.interactionadd({
						subjectId:this.subjectId,//科目Id
						gradeId:this.gradeId,//年级Id
						pics:this.imgList.toString(),//图片
						describe:this.describe,//补充
						question:this.issue,//问题
					}).then(res=>{
						console.log(res)
						this.tui.toast('发布成功')
						setTimeout(()=>{
							uni.redirectTo({
							    url: '/pages/client/study/hdAnswer'
							});
						},300)
					})
				}
			},
			removeimg(index){
				this.imgList.splice(index, 1)
			},
			selectnj(){//选择年级
				uni.navigateTo({
					url:'./chooseClass'
				})
			},
			selectkm(){//选择科目
				if(this.gradeIdname==''){
					this.tui.toast('请先选择年级')
				}else{
					uni.navigateTo({
						url:'./chooseKemu?gradeId=' + this.gradeId
					})
				}
			},
			bindTextAreaBlur(){
				console.log('sdf')
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
					sourceType: ['album','camera'],
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
		background:rgba(238,238,238,1);
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
