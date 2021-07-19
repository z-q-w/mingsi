<template>
	<view>
		<view class="infofar">
			<view class="info" @click="detail(1)">
				<view class="infoleft">
					<image src="../../../static/image/65.png" mode="" style="width: 80rpx;height: 80rpx;margin-right: 28rpx;"></image>
					<view style="display: inline-block;position: absolute">
						<view style="font-size:32rpx;font-weight:bold;">
							系统消息
						</view>
						<view class="loggingms">
							{{matchNewsList.content}}
						</view>					
					</view>
				</view>
				<view class="new" v-if="matchNewsList.count>0">
					{{matchNewsList.count}}				
				</view>
				<view class="inforight">				
					<image src="../../../static/image/24.png" mode="" style="width: 20rpx;height: 36rpx;"></image>
				</view>
			</view>
			<view class="info"  @click="detail(2)">
				<view class="infoleft">
					<image src="../../../static/image/66.png" mode="" style="width: 80rpx;height: 80rpx;margin-right: 28rpx;"></image>
					<view style="display: inline-block;position: absolute">
						<view style="font-size:32rpx;font-weight:bold;">
							订单消息
						</view>
						<view class="loggingms">
							{{sysUserNewsList.content}}
						</view>					
					</view>
				</view>
				<view class="new" v-if="sysUserNewsList.count>0">
					{{sysUserNewsList.count}}
				</view>
				<view class="inforight">
					<image src="../../../static/image/24.png" mode="" style="width: 20rpx;height: 36rpx;"></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseNewsList:[],//课程消息
				matchNewsList:[],//订单消息
				sysUserNewsList:[],//系统消息
				unreadNumber:0,//总消息数量
				
				user: this.cacheHelper.appUser()?this.cacheHelper.appUser():null,
			}
		},
		onShow() {
			this.getNews()
		},
		methods: {
			getNews(){//获取消息列表
				this.api.homemessage().then(res=>{
					console.log(res)
					this.sysUserNewsList=res.data.orderMessage   //系统
					this.matchNewsList=res.data.sysMessage    //订单
				})
			},
			detail(v){//跳转消息详情 1系统2课程3订单
				uni.navigateTo({
					url:'/pages/client/home/messageList?type=' + v
				})
			}
		}
	}
</script>

<style>
	.new{
		position: absolute;
		width: 36rpx;
		height: 36rpx;
		background-color: red;
		color: #fff;
		border-radius: 50%;
		right: 60rpx;
		top: 49rpx;
		font-size: 23rpx;
		text-align: center;
	}
	.infofar{
		margin-top: 20rpx;
		margin-left: 28rpx;
		
	}
    .info{
		position: relative;
	  width: 631rpx;
	  height: 140rpx;
	  background-color: #fff;
	  display: flex;
	  justify-content: space-between;
	  align-items:center;
	  padding: 0 30rpx;
	  border-radius:12px;
	  margin-bottom: 19rpx;
  }
  .loggingms{
	    font-size:24rpx;
	    font-weight:400;
	    color: #999999;
	    margin-top: 8rpx;
	    white-space: nowrap;
	    text-overflow: ellipsis;
	    overflow: hidden;
		width: 450rpx;
  }
</style>