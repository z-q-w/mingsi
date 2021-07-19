<template>
	<view>
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="heads">
			<view class="" style="width: 100rpx;text-align: left;" @tap="goback">
				<image src="../../../static/image/a8a2cabe09b2ad058b3d2cca4acc9fa.png" mode="" style="height: 36rpx;width: 19rpx;"></image>
			</view>
			<view class="workheads" style="">我的错题</view>
			<view class="" style="width: 100rpx;text-align: right;">
				<text style="color: #4E9A36;">{{ start }}</text>
				/{{wroklist.length}}
			</view>
		</view>
		<view class="" style="padding: 25rpx;font-size: 32rpx;font-family:PingFang SC;">
			<!-- 图片 -->
			<view class="heads-wen" style="padding-right: 0;display: flex;flex-wrap: wrap;">
				<scroll-view  scroll-y="true" class="scroll-Yjy" @click="request(wroklist[i].title)">
					<text style="margin-right: 15rpx;">{{start}} .</text>
					<text>{{wroklist[i].title}}</text>
				</scroll-view>
				<view class="">
					<view v-if="wroklist[i].pictureList.length!=0" style="position:relative;" v-for="(imgitem,index) in wroklist[i].pictureList" @click="previewImage(index,wroklist[i].pictureList)">
						<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 10rpx;right: 16rpx;z-index: 999;"></image>
						<image :src="imgitem" mode="widthFix" style="width: 620rpx;border-radius: 8rpx;margin-right: 15rpx;"></image>
					</view>
				</view>
			</view>
			<!-- 选项 -->
			<view class="heads-wen" v-if="wroklist[i].type == 1">
				<view  style="margin-top: 10rpx;" v-for="item in wroklist[i].optionList">
					<text style="margin-right: 10rpx;">{{item.opt}}.</text>
					<text>{{item.content}}</text>
					<view class="" v-if="item.picture.length !=0 ">
						<view style="position:relative;" v-for="(itemimg,index) in item.picture.split(',')">
							<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 10rpx;right: 10rpx;z-index: 999;"></image>
							<image  @tap.stop="previewImage(index,item.picture.split(','))" mode="widthFix" style="620rpx;margin-right: 10rpx;margin-top: 10rpx;" :src="itemimg"></image>
						</view>
					</view>
				</view>
			</view>
			<view class="" style="background: #FFFFFF;padding: 20rpx;margin-top: 20rpx;border-radius: 12rpx;">
				【我的答案】{{wroklist[i].myAnswer}}
			</view>
			<view class="" v-if="wroklist[i].correctAnswer != ''" style="background: #FFFFFF;padding: 20rpx;margin-top: 20rpx;border-radius: 12rpx;;color: #0DAA8F;">
				【正确答案】{{wroklist[i].correctAnswer}}
			</view>
			<view class="" style="background: #FFFFFF;padding: 20rpx;margin-top: 20rpx;border-radius: 12rpx;" v-if="wroklist[i].analysis != ''">
				<view class="" style="margin-left: 10rpx;margin-top: 10rpx;">
					分析:{{wroklist[i].analysis}}
						<view class="" v-if="wroklist[i].analysisPicture !=0 ">
							<view style="position:relative;" v-for="(itemimg,index) in wroklist[i].analysisPicture.split(',')">
								<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 10rpx;right: 10rpx;z-index: 999;"></image>
								<image  @tap.stop="previewImage(index,wroklist[i].analysisPicture.split(','))" style="width: 620rpx;margin-right: 10rpx;margin-top: 10rpx;" :src="itemimg" mode="widthFix"></image>
							</view>
						</view>
				</view>
			</view>
		</view>
		<view class="" style="height: 100rpx;"></view>
		<view class="" style="height: 80rpx;display: flex;justify-content: center;background: #FFFFFF;position: fixed;bottom: 0;padding: 10rpx 30rpx;">
			<view v-if="wroklist.length==1" class="nextds" @tap="goback">返回</view>
			<view class="nextds" @click="nextdsbtn" v-if="start==1 && wroklist.length!=1">下一题</view>
			<view  v-if="start!=1" class="" style="display: flex;justify-content: space-between;width: 690rpx;">
				<view class="uptopic" @click="unsdbtn">上一题</view>
				<view v-if="start==wroklist.length" class="nexttopic" @tap="goback">返回</view>
				<view v-else class="nexttopic" @click="nextdsbtn">下一题</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				i:0,
				start: 1,
				paperId:'',//试卷id
				wroklist:[
					{
						title:'',
						select:'',
						pictureList:'',
						optionList:'',
						myAnswer:'',
						correctAnswer:'',
						analysis:''
						
					}
				],
			}
		},
		onLoad(option) {
			this.paperId=option.paperId //试卷id
			this.type=option.type //1 班组课 2 点播课
			this.wrongDetail()
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			previewImage: function(index,imageList) {//预览图片
				if (!imageList.length) return;
				uni.previewImage({
					current: imageList[index],
					loop: true,
					urls: imageList
				})
				console.log(index,imageList)
			},
			request(v){//点击题目跳转页面
				uni.setStorageSync('cepingtail',v)
				if(this.wroklist[this.i].title.length>150){//只有题目超过多少字符才会跳转
					uni.navigateTo({
						url:'/pages/client/home/cepingtail/cepingtail'
					})
					
				}
			},
			wrongDetail(){//详情
				this.api.wrongDetail({
					paperId:this.paperId,
					type:this.type
				}).then(res=>{
					console.log(res)
					this.wroklist=res.data.topicList
				})
			},
			nextdsbtn(){//下一题
				this.start==this.start++
				this.i=this.i+1
			},
			unsdbtn(){
				this.start==this.start--
				this.i=this.i-1
			}
		}
	}
</script>

<style>
	.heads {
		display: flex;
		padding: 25rpx 30rpx;
		background: #ffffff;
	}
	.workheads {
		flex: 1;
		text-align: center;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
	.nextds{
		width:690rpx;
		height:72rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 72rpx;
		color: #FFFFFF;
		margin: 0 auto;
	}
	.uptopic{
		width:336rpx;
		height:72rpx;
		background:rgba(255,190,90,1);
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 72rpx;
		color: #FFFFFF;
	}
	.nexttopic{
		width:336rpx;
		height:72rpx;
		background:#F27F31;
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 72rpx;
		color: #FFFFFF;
	}
	.heads-wen {
		margin-top: 20rpx;
		padding: 30rpx 30rpx 15rpx 30rpx;
		background: #ffffff;
		border-radius: 12rpx;
		font-size: 32rpx;
	}
	.scroll-Yjy{
		max-height: 300rpx;
	}
</style>
