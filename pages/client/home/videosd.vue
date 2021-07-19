<template>
	<view class="container">
		<view class="questionbag">
			<video style="width: 750rpx;position: fixed;height: 440rpx;" id="tui-video" :src="videoSrc" @onscroll="onscroll" :initial-time="initialtime" controls
				autoplay  @timeupdate="timeupdate" @ended="endedVideo"></video>
		</view>
		<view class="" style="padding: 10rpx 30rpx 0 30rpx;min-height: 500rpx;">
			<view style="padding: 30rpx 0;display: flex;justify-content: space-between;" v-for="(item,index) in schedule" @click="videolook(item,index)">
				<view :class="videolookindex==index ? 'pitchup':'unpitchup' " style="">
					<!-- <text>第{{index+1}}讲:</text> -->
					<text>{{item.name}}</text>
				</view>
				<!-- 已购买 -->
				<view class="" v-if="orderStatus==2 || orderStatus==3">
					<!-- isComplete 1:已完成，2:未完成" -->
					<text v-if="item.isComplete==2" style="font-size: 29rpx;color:#CCCCCC ;">未完成</text>
					<text v-if="item.isComplete==1" style="font-size: 29rpx;color:#18D0A2 ;">已完成</text>
				</view>
				<!-- 未购买 -->
				<view class="" v-else>
					<text style="font-size: 29rpx;color:#CCCCCC;" v-if="index==0">试看</text>
					<text style="font-size: 29rpx;color:#CCCCCC;" v-else>未完成</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			courseId: '', //课程的id
			tetalnameindex:'',//记录多少讲
			payTime: 0, //存放播放中的时间
			schedule:[],//课表
			initialtime: '', //指定视频初始播放位置单位为秒（s）
			tetalname:'',//课程标题
			videolookindex:0,//控制选中
			videoSrc: '' ,//视频的地址
			orderStatus:'',//orderStatus查看是否已购买
			courseCatalogId:'',//视频目录id
			selectVideoid:'',
			selectVideotime:'',
		};
	},
	watch:{
		 selectVideoid(newid, oldid) {
		   console.log(newid,'新的', oldid,'老的')
		   console.log(this.payTime)
		   if(oldid !=''){
			   if(this.cacheHelper.isLogin()){//只有登录了才会调用接口
			   		this.api.changeDemandStatus({
			   			"courseCatalogId":oldid,//，目录id
			   			"isComplete":2,//1 已结束 2 未结束
			   			"second":this.payTime//时间
			   		}).then(res=>{
			   			console.log("退出记录时间")
						this.demandCourseCatalog()
			   		})
			   }
		   }
		 },
	},	
	onLoad: function(option) {
		console.log(option);
		this.videoSrc=uni.getStorageSync('videouil')
		this.courseId=option.courseId//课程id
		this.initialtime=option.second//存放播放中的时间
		this.selectVideotime=option.second
		this.videolookindex=option.indexd//控制选中
		this.courseCatalogId=option.courseCatalogId//视频目录id
		this.selectVideoid=this.courseCatalogId
		this.tetalnameindex=option.indexd++
		this.tetalname=option.name
		this.payTime=this.initialtime//指定视频初始播放位置单位为秒（s）
		this.orderStatus=option.orderStatus //orderStatus查看是否已购买
		this.demandCourseCatalog()//课表
		uni.$on('videouiluo',(data)=>{
			console.log('更换视频地址：' + data.msg);
			this.videoSrc=data.msg
		})
	},
	onUnload() {
		if(this.cacheHelper.isLogin()){//只有登录了才会调用接口
			this.updateCoursePayTime();//退出记录当前播放时间
		}
	},
	methods: {
		onscroll(){
			console.log('被推动了')
		},
		demandCourseCatalog(){//课表
			this.api.demandCourseCatalog({
				demandCourseId:this.courseId,
				current:'1',
				size:'100'
			}).then(res=>{
				this.schedule=res.data.records
				console.log(res.data,'点播课的课表')
			})
		},
		timeupdate(v) {//记录当前播放的时间
			this.payTime = v.detail.currentTime;
			// this.selectVideotime=v.detail.currentTime
		},
		endedVideo(){  //视频结束的时候调用
			this.api.changeDemandStatus({
				"courseCatalogId":this.courseCatalogId,//，目录id
				"isComplete":1,//1 已结束 2 未结束
				"second":this.payTime//时间
			}).then(res=>{
				console.log("播放结束")
				this.demandCourseCatalog()
			})
		},
		updateCoursePayTime(){
			console.log(this.payTime)
			let recordtime = Math.floor(this.payTime);
			this.api.changeDemandStatus({
				"courseCatalogId":this.courseCatalogId,//，目录id
				"isComplete":2,//1 已结束 2 未结束
				"second":this.payTime//时间
			}).then(res=>{
				console.log("退出记录时间")
				 uni.$emit('Videoupdate',{msg:'页面更新'})
			})
		},
		videolook(e, index) {
			console.log(e)
			this.selectVideoid=e.id
			this.initialtime=e.second
			if(this.orderStatus==2 || this.orderStatus==3){ //这个代表是已经购买的
				this.videoSrc=e.url
				this.tetalname=e.name
				this.videolookindex=index
				this.tetalnameindex=index
			}else{//这个代表是没有购买的
				if(index==0){ //这个代表可以试看第一个视频
					this.videoSrc=e.url
					this.tetalname=e.name
					this.videolookindex=index
					this.tetalnameindex=index
				}else{
					this.tui.toast('当前只能试看一个视频')
				}
			}
		}
	}
};
</script>

<style>
	page {
		color: #333;
		background: #fff;
	}

	.container {
		box-sizing: border-box;
		padding-bottom: 110rpx;
	}

	.tui-container {
		padding: 30rpx 0rpx;
	}

	.tui-cmt-title {
		font-size: 30rpx;
		font-weight: bold;
		position: relative;
	}
	.zbx-kes {
		padding: 30rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #797979;
	}
	.zbx-kes1{
			padding: 30rpx;
			font-size:30rpx;
			font-family:PingFang SC;
			font-weight:500;
			color:rgba(78,153,54,1);
		}
		.stocks1 {
		width: 130rpx;
		height: 36rpx;
		background: rgba(78, 153, 54, 0.43);
		border-radius: 18rpx;
		line-height: 36rpx;
		text-align: center;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(78, 153, 54, 1);
		display: inline-block;
		float: right;
	}
	.stocks {
		width: 130rpx;
		height: 36rpx;
		background: rgba(0, 0, 0, 1);
		opacity: 0.43;
		border-radius: 18rpx;
		line-height: 36rpx;
		text-align: center;
		font-size: 25rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #ffffff;
		display: inline-block;
		float: right;
	}
	.tui-cmt-title::after {
		content: '';
		position: absolute;
		left: -18rpx;
		top: 18%;
		width: 6rpx;
		height: 64%;
		background: #5677fc;
	}
	.pitchup{
		color:rgba(249,153,69,1);
		font-size:30rpx;
	}
	.unpitchup{
		color:#797979;
		font-size:30rpx;
	}
	video::-webkit-media-controls-timeline {
		display: none;
	}
	.questionbag{
		height: 440rpx;
	  }
</style>
