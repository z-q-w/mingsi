<template>
		<view class="rx-cp">
			<view class="questionbag">
				<view class="status_bar"></view>
				<view class="" style="padding: 30rpx;display: flex;justify-content: space-between;">
					<image @tap='fanback' src="../../../static/image/a8a2cabe09b2ad058b3d2cca4acc9fa.png" mode="" style="width: 17rpx;height: 30rpx;"></image>
					<view class="">
						{{startti}}/{{topicdata.length}}
					</view>
				</view>
			</view>
			<view class="" style="background: #FFFFFF;width: 690rpx;min-height:810rpx;margin: 190rpx auto 0 auto;border-radius: 18px;position: relative;">
				<view class="circle">
					{{startti}}
				</view>
				<view class="" style="padding: 100rpx 30rpx 30rpx 30rpx;font-family: PingFang SC;">
					<scroll-view  scroll-y="true" class="scroll-Yjy" @click="request(topicdata[startti-1].title)">
						<text>{{topicdata[startti-1].title}}</text>
					</scroll-view>
					<view v-if="topicdata[startti-1].picture!=''" class="enterimg">
						<view class="" v-for="item in topicdata[startti-1].picture.split(',')" style="position:relative;">
							<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 15rpx;right: 15rpx;z-index: 999;"></image>
							<image :src="item" mode="" style="width: 620rpx;margin-right: 10rpx;border-radius: 8rpx;" @click="enterimgbtn(item,topicdata[startti-1].picture.split(','))"></image>
						</view>
					</view>
					<view class="" style="margin-top: 60rpx;">
						<view :class="jobid==item.optId ? 'optionscss':''" style="line-height: 50rpx;" v-for="item in topicdata[startti-1].optionList" @click="options(item,topicdata[startti-1].id)">
							<text>{{item.opt}}.</text>
							<text>{{item.content}}</text>
							<view class="" v-if="item.picture != ''">
								<view class="" v-for="items in item.picture" style="position:relative;">
									<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 15rpx;right: 15rpx;z-index: 999;"></image>
									<image :src="items" mode="widthFix" style="width: 620rpx;margin-right: 10rpx;border-radius: 8rpx;" @click="enterimgbtn(items,item.picture)"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 判断是否正确 -->
			<view class="" style="width: 630rpx;margin: 30rpx auto 0 auto;border-radius: 18rpx;background: #FFFFFF;padding: 30rpx;">
				<text class="correctrate" v-if="topicdata[startti-1].correctAnswer==topicdata[startti-1].myAnswer">【正确】:{{topicdata[startti-1].myAnswer}}</text>
				<text class="errorrate" v-else>【错误】:{{topicdata[startti-1].myAnswer}}</text>
			</view>
			<!-- 正确答案 如果答案正确就不显示正确答案-->
			<view v-if="topicdata[startti-1].correctAnswer !=topicdata[startti-1].myAnswer" style="width: 630rpx;margin: 30rpx auto 0 auto;border-radius: 18rpx;background: #FFFFFF;padding: 30rpx;">
				【正确答案】:{{topicdata[startti-1].correctAnswer}}
			</view>
			<view class="" style="width: 630rpx;margin: 30rpx auto 0 auto;border-radius: 18rpx;background: #FFFFFF;padding: 30rpx;">
				<text>【解析】:{{topicdata[startti-1].analysis==''? '暂无解析':topicdata[startti-1].analysis}}</text>
				<view v-if="topicdata[startti-1].analysisPicture != ''">
					<view  v-for="item in topicdata[startti-1].analysisPicture.split(',')" style="margin-top: 20rpx;position:relative;">
						<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 15rpx;right: 15rpx;z-index: 999;"></image>
						<image :src="item" mode="widthFix" style="width: 620rpx;margin-right: 10rpx;border-radius: 8rpx;" @click="enterimgbtn(item,topicdata[startti-1].analysisPicture.split(','))"></image>
					</view>
				</view>
			</view>
			<view class="" style="display: flex;width: 750rpx;">
				<view class="nextti" @click="lastbtn" v-if="startti != 1">
					上一题
				</view>
				<view v-if="startti==topicdata.length" class="nextti" @click="fanback">
					返回
				</view>
				<view v-else class="nextti" @click="nexttibtn">
					下一题
				</view>
			</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				deptId:'',
				gradeId:'',
				subjectId:'',
				gradeid:'',//年级id
				subjectid:'',//科目id
				selectdata:[],//选择题的答案
				startti:1,
				endti:5,
				optionsid:'',//选项的id
				optionlist:[],
				topicdata:[
					{
						analysis: "",
						correctAnswer: "",
						myAnswer: "",
						optionList: [],
						picture: "",
						title: "",
						titleNumber: 1,
					}
				],//题库
				paperid:'',//试卷id
				arr:[],
				jobid:'',
			}
		},
		onLoad(option) {
			this.deptId=option.deptId,
			this.gradeId=option.gradeId,
			this.subjectId=option.subjectId,
			this.assessresult()
		},
		methods: {
			fanback(){
				uni.navigateBack({
					delta: 1
				})
			},
			enterimgbtn(img,imgList){// 预览图片
				uni.previewImage({
					current: img,
					urls: imgList,
					indicator: "default",
				});
			},
			request(v){//点击题目跳转页面
				uni.setStorageSync('cepingtail',v)
				if(this.topicdata[this.startti-1].title.length>150){//只有题目超过多少字符才会跳转
					uni.navigateTo({
						url:'/pages/client/home/cepingtail/cepingtail'
					})
				}
			},
			nexttibtn(){
				if(this.startti>=this.topicdata.length) return
				this.startti++
			},
			lastbtn(){
				this.startti--
			},
			assessresult(){
				this.api.assessresult({
					deptId:this.deptId,
					gradeId:this.gradeId,
					subjectId:this.subjectId
				}).then(res=>{
					console.log(res)
					this.topicdata=res.data.topicList
					this.topicdata.forEach(item=>{
						item.optionList.forEach(value=>{
							console.log(value,'ffffffffffffffffffff')
							value.picture=value.picture.split(',')
						})
					})
				})
			}
		}
	}
</script>

<style>
	.rx-cp{
		background-image: url(../../../static/image/51.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		box-sizing: border-box;
		min-height: 100%;
	}
	.circle{
		width: 144rpx;
		height: 144rpx;
		border: 12rpx solid #FFFFFF;
		background: radial-gradient(circle, #F4A163 0%, #F26247 100%);
		border-radius: 50%;
		opacity: 1;
		border: 20rpx solid #FFFFFF;
		position: absolute;
		top: -100rpx;
		right: 240rpx;
		text-align: center;
		line-height: 144rpx;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 85rpx;
		font-family: PingFang SC;
	}
	.nextti{
		background-image:url(../../../static/image/52.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		width: 328rpx;
		height: 110rpx;
		margin: 10rpx auto 0rpx auto;
		text-align: center;
		line-height: 100rpx;
		font-size: 37rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}
	.enterimg{
		margin-top: 30rpx;
	}
	.optionscss{
		color: #008000;
	}
	.questionbag{
	    position: -webkit-sticky;
	    position: sticky;
	    z-index: 99;
	    background: #FFFFFF;
    }
	.correctrate{
		color: #009a00;
	}
	.errorrate{
		color: red;
	}
	.scroll-Yjy{
		max-height: 300rpx;
	}
</style>