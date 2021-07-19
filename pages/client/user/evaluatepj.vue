<template>
	<view style="background: #FFFFFF;min-height: 100%;padding-top: 10rpx;margin-top: 30rpx;">
		<view class="fankas" style="">
			<view class="" style="display: flex;">
				<view class="fankas-type">{{corserbottemlist.subjectName}}</view>
				<view class="fankas-name" style="flex: 1;">{{corserbottemlist.courseName}}</view>
			</view>
			<view class="timedata" v-if="corserbottemlist.type !=3">
				<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
				<text>{{corserbottemlist.rangeDate}}</text>
			</view>
			<view class="typelistbox">
				<view class="typelist" v-for="item in corserbottemlist.courseTagsList">
					<text style="color:#F27F31;">{{item}}</text>
				</view>
			</view>
			<view class="" style="display: flex;margin-top: 25rpx;">
				<image :src="corserbottemlist.avatar" mode="aspectFill" style="width: 54rpx;height: 54rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
				<view class="home-techer">
					{{corserbottemlist.teacherName}}
				</view>
			</view>
		</view>
		<view class="" style="background: #FFFFFF;padding: 30rpx 0;">
			<view class="example-body"> 
				<view class="" style="text-align: center;margin: 0 auto;">
					<tui-rate :current="index" @change="change" :size="50" active="#F2CB51"></tui-rate>
				</view>
			</view>
		</view>
		<view class="" style="display: flex;margin-left: 40rpx;flex-wrap: wrap;">
			<view :class="arr.includes(item.id) ? 'untagsLists':'tagsLists'" v-for="(item,index) in corserbottemlist.tagsList" @click="tagsbtn(item,index)">
				{{item.name}}
			</view>
		</view>
		<view class="" style="background:rgba(245,245,245,1);margin: 30rpx;padding: 30rpx;border-radius: 12rpx;">
			<textarea :maxlength="100"  value=""  style="width: 640rpx;" v-model="contentdata" placeholder="说说您的感受" />
		</view>
		<view class="tui-address-new">
			<button class="newadd" @tap="insert">提交</button>
		</view>
	</view>
</template>

<script>
	import uniRate from '@/components/rate/rate.vue'
	export default {
		components: {
			uniRate
		},
		
		data() {
			return {
				orderdetails:'',//课程详情			
				current: 0,
				index: 0,//星星
				contentdata:'',
				corserbottemlist:{},
				arr:[],
			}
		},
		onLoad(option) {
			this.orderdetails=JSON.stringify(option.orderid)
			this.orderGood()
		},
		methods: {
			change: function(e) {
				this.index = e.index;
				this.current = e.index
			},
			orderGood(){
				this.api.orderGood(
					this.orderdetails
				).then(res=>{
					this.corserbottemlist=res.data
				})
			},
			tagsbtn(v,index){
				if(this.arr.includes(v.id)){  //如果找到这条数据就清除这个数据
					this.arr=this.arr.filter(function (ele){//清空样式
						return ele != v.id;
					});
				}else{
					console.log(this.arr)
					this.arr.push(v.id)
				}
			},
			insert(){
				this.api.evaluate({
					orderId:this.corserbottemlist.orderId,
					star:this.current,
					tags:this.arr.toString()==''? null : this.arr.toString() ,//标签
					content:this.contentdata
				}).then(res=>{
					this.tui.toast("评价成功")
					setTimeout(res=>{
						uni.navigateBack({
						    delta: 2
						});
					},500)
					uni.$emit('orderupdate',{msg:'页面更新'})
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	.dafen{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		text-align: center;
	}
	.example-body {
		text-align: center;
		margin: 0 auto;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		padding: 0;
		font-size: 14px;
		background-color: #ffffff;
		margin-left: 20rpx;
		margin-bottom: 60rpx;
	}
	.tui-address-new {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.newadd{
		height: 80rpx;
		background:#F27F31 ;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
	.fankas{
		margin: 30rpx;
		padding: 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 2px rgba(0,0,0,0.16);
		opacity:1;
		border-radius:12px;
	}
	.timedata{
		margin-top: 25rpx;
		height:36rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.typelistbox{
		margin-top: 25rpx;
		display: flex;
	}
	.typelist{
		display: inline-block;
		height:41rpx;
		background:#f2e2ce;
		border-radius:4rpx;
		padding: 5rpx 10rpx;
		margin-right: 15rpx;
		font-size: 25rpx;
		line-height: 41rpx;
	}
	.home-techer{
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		flex: 1;
		margin-top: 10rpx;
	}
	.fankas-type{
		width:83rpx;
		height:39rpx;
		background:linear-gradient(270deg,rgba(62,223,178,1) 0%,rgba(84,226,198,1) 100%);
		opacity:1;
		border-radius:18rpx 0rpx 18rpx 0px;
		text-align: center;
		line-height: 39rpx;
		color: #FFFFFF;
		margin-right: 30rpx;
	}
	.tagsLists{
		margin-top: 20rpx;
		margin-right: 20rpx;
		color: rgb(158,158,158);
		width: 150rpx;
		text-align: center;
		background:rgb(242,244,248);
		line-height: 60rpx;
		border-radius: 8rpx;
	}
	.untagsLists{
		margin-top: 20rpx;
		margin-right: 20rpx;
		color: #FFFFFF;
		width: 150rpx;
		text-align: center;
		background:#F27F31;
		line-height: 60rpx;
		border-radius: 8rpx;
	}
</style>
