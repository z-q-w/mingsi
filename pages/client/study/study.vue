<template>
	<view style="background: #FFFFFF;">
		<view class="study-top">
			<view class="status_bar"></view>
			<text class="study-text">学习</text>
		</view>
		<view class="study-boxs" @tap="jumpkc">
			<view class="" style="display: flex;justify-content: space-between;">
				<text style="font-size:36rpx;font-weight: bold;">我的课程</text>
				<text style="font-size:29rpx;">查看全部</text>
			</view>
			<view class="" style="text-align: center;margin-top: 30rpx;" v-if="timetable.length==0">
				<image src="../../../static/image/icon_gwc.png" mode="" style="width: 190rpx;height: 150rpx;"></image>
				<view style="color: #666;font-size: 26rpx;">暂无课程</view>
			</view>
			<view style="display: flex;padding: 25rpx 0 25rpx 0;;" v-for="item in timetable">
				<image :src="item.avatar" mode="" style="width: 68rpx;height: 68rpx;border-radius: 50%;margin-right: 25rpx;"></image>
				<view class="" style="flex: 1;">
					<view class="study-name">{{item.name}}</view>
					<view class="study-week">
						<text>{{item.rangeDate}}</text>
					</view>
				</view>
				<view class="golenr" style="">
					去学习
				</view>
			</view>
		</view>
		<view class="" style="display: flex;justify-content: space-between;padding: 40rpx 80rpx;">
			<view class="" style="width: 150rpx;text-align: center;" @click="jobbtn">
				<image src="../../../static/image/17.png" mode="" style="height: 75rpx;width: 75rpx;"></image>
				<view style="font-size: 30rpx;">写作业</view>
			</view>
			<view class="" style="width: 150rpx;text-align: center;" @click="wrongbtn">
				<image src="../../../static/image/18.png" mode="" style="height: 75rpx;width: 75rpx;"></image>
				<view style="font-size: 30rpx;">错题本</view>
			</view>
			<view class="" style="width: 150rpx;text-align: center;" @click="interactbtn">
				<image src="../../../static/image/19.png" mode="" style="height: 75rpx;width: 75rpx;"></image>
				<view style="font-size: 30rpx;">互动答疑</view>
			</view>
		</view>
		<view class="" style="padding: 30rpx 30rpx 0 30rpx;">
			<view class="" style="font-weight: bold;font-size: 36rpx;">
				其他工具
			</view>
			<view @click="mybunch" class="" style="display: flex;justify-content: space-between;padding: 35rpx 0;border-bottom: 1rpx solid rgba(238,238,238,1);">
				<image src="../../../static/image/shiping.png" mode="" style="width: 39rpx;height: 38rpx;margin: 7rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;">
					我的点播
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;"></image>
			</view>
			<view @click="myEvaluate" class="" style="display: flex;justify-content: space-between;padding: 35rpx 0;border-bottom: 1rpx solid rgba(238,238,238,1);">
				<image src="../../../static/image/781f019d435440f1257d5442e692b0c.png" mode="" style="width: 40rpx;height: 36rpx;margin: 7rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;">
					我的评价
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;"></image>
			</view>
			<view @click="evaluation" class="" style="display: flex;justify-content: space-between;padding: 35rpx 0;border-bottom: 1rpx solid rgba(238,238,238,1);">
				<image src="../../../static/image/4a10cddfb01aba0a446fc5cdbed9f11.png" mode="" style="width: 37rpx;height: 32rpx;margin: 7rpx 25rpx 0 0;"></image>
				<view class="" style="font-size:32rpx;flex: 1;">
					评测报告
				</view>
				<image src="../../../static/image/24.png" mode="" style="width: 16rpx;height: 28rpx;"></image>
			</view>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timetable:[]
			}
		},
		onLoad() {
			if(this.cacheHelper.isLogin()){
				console.log('这里')
				this.mycourse()
			}
			uni.$on('islogindf',(data)=>{
				console.log('登录了才执行')
				this.mycourse()
			})
			uni.$on('quitempyt',(data)=>{
				console.log('退出登录让我的学习两条数据清空')
				this.timetable=[]
			})
		},
		methods: {
			jumpkc(){//我的课程
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./Mycourse'
					})
				}
			},
			jobbtn(){//写作业
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./myJob'
					})
				}
			},
			wrongbtn(){//错题本
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./wrongWrok'
					})
				}
			},
			interactbtn(){//互动答疑
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./hdAnswer'
					})
				}
			},
			mybunch(){//我的点播
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./myStreaming'
					})
				}
			},
			myEvaluate(){//我的评价
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./myEvaluate'
					})
				}
			},
			// attention(){//我的关注
			// 	uni.navigateTo({
			// 		url:'./myAttention'
			// 	})
			// },
			evaluation(){//测评报告
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./evaluationlist'
					})
				}
			},
			mycourse(){
				this.api.mycourse({
					size:'2',					current:'1'
				}).then(res=>{
					this.timetable=res.data.records
					console.log('学习页面')
				})
			}
		},
	}
</script>

<style>
	.study-top{
		text-align: center;
		background-image:url(../../../static/image/16.png);
		background-size: 100%;
		width:750rpx;
		height:257rpx;
	}
	.study-text{
		display: inline-block;
		color: #FFFFFF;
		font-size: 40rpx;
		/* padding-top: 40rpx; */
	}
	.study-boxs{
		padding: 30rpx;
		width:630rpx;
		height:280rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 4rpx rgba(0,0,0,0.16);
		opacity:1;
		border-radius:12rpx;
		margin: -120rpx auto 0;
	}
	.golenr{
		margin-top: 20rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(28,163,255,1);
		opacity:1;
	}
	.study-name{
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		opacity:1;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		width: 410rpx;
	}
	.study-week{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
</style>
