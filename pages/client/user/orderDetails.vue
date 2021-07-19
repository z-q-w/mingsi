<template>
	<view style="width: 100%;">
		<view class="ordertype">
			<view class="">
				<view v-if="corserbottemlist.orderStatus==1" class="waitpay">待支付</view>
				<view v-if="corserbottemlist.orderStatus==2" class="waitpay">已支付</view>
				<view v-if="corserbottemlist.orderStatus==3" class="waitpay">已完成</view>
				<view v-if="corserbottemlist.orderStatus==4" class="waitpay">已取消</view>
				<view v-if="corserbottemlist.orderStatus==5" class="waitpay">拼团失败</view>
				<view v-if="corserbottemlist.orderStatus==6" class="waitpay">拼团中</view>
				<view v-if="corserbottemlist.orderStatus==1" class="contens">超时未付款会自动取消订单哦~</view>
				<view v-if="corserbottemlist.orderStatus==2" class="contens">课程已支付，快去学习吧~</view>
				<view v-if="corserbottemlist.orderStatus==3" class="contens">订单已完成，快去学习吧~</view>
				<view v-if="corserbottemlist.orderStatus==4" class="contens">您的订单已取消</view>
				<view v-if="corserbottemlist.orderStatus==5" class="contens">拼团失败,退款会原路返回</view>
				<view v-if="corserbottemlist.orderStatus==6" class="contens">拼团中,请稍后......</view>
			</view>
			<view class="">
				<image v-if="corserbottemlist.orderStatus==1" src="../../../static/image/74.png" mode="" style="width: 140rpx;height: 120rpx;"></image>
				<image v-if="corserbottemlist.orderStatus==2" src="../../../static/image/6314d1bf1d1110bf997f145902ceb2d.png" mode="" style="width: 140rpx;height: 120rpx;"></image>
				<image v-if="corserbottemlist.orderStatus==3" src="../../../static/image/79.png" mode="" style="width: 140rpx;height: 120rpx;"></image>
				<image v-if="corserbottemlist.orderStatus==4" src="../../../static/image/79.png" mode="" style="width: 140rpx;height: 120rpx;"></image>
				<image v-if="corserbottemlist.orderStatus==5" src="../../../static/image/79.png" mode="" style="width: 140rpx;height: 120rpx;"></image>
				<image v-if="corserbottemlist.orderStatus==6" src="../../../static/image/79.png" mode="" style="width: 140rpx;height: 120rpx;"></image>
			</view>
		</view>
		<view class="fankas">
			<view class="" style="display: flex;">
				<view class="fankas-type">{{corserbottemlist.subjectName}}</view>
				<view class="fankas-name" style="flex: 1;">{{corserbottemlist.courseName}}</view>
				<view class="allowed">名额紧张</view>
			</view>
			<!-- corserbottemlist.type==3的时候 是点播课点播课没有时间 -->
			<view class="timedata" v-if="corserbottemlist.type!=3">
				<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
				<text>{{corserbottemlist.rangeDate}}</text>
			</view>
			<view class="typelistbox" v-if="corserbottemlist.tagsList[0] !=null ">
				<view class="typelist" v-for="item in corserbottemlist.tagsList">
					<text style="color:#F27F31;">{{item}}d</text>
				</view>
			</view>
			<view class="" style="display: flex;margin-top: 25rpx;">
				<image :src="corserbottemlist.avatar" mode="aspectFill" style="width: 54rpx;height: 54rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
				<view class="home-techer">
					{{corserbottemlist.teacherName}}
				</view>
			</view>
		</view>
		<view class="mindbox">
			<view class="mindbox-kc">
				课程信息
			</view>
			<view class="" style="display: flex;justify-content: space-between;line-height: 90rpx;font-size: 29rpx;padding: 0 20rpx;">
				<text style="color:rgba(153,153,153,1);">年级</text>
				<text>{{corserbottemlist.gradeName}}</text>
			</view>
			<view class="" style="display: flex;justify-content: space-between;line-height: 80rpx;font-size: 29rpx;padding: 0 20rpx;">
				<text style="color:rgba(153,153,153,1);">科目</text>
				<text>{{corserbottemlist.subjectName}}</text>
			</view>
		</view>
		<view class="mindbox">
			<view class="mindbox-kc">
				支付信息
			</view>
			<view class="" style="display: flex;justify-content: space-between;line-height: 90rpx;font-size: 29rpx;padding: 0 20rpx;">
				<text style="color:rgba(153,153,153,1);">课程价格</text>
				<text>¥{{corserbottemlist.price}}</text>
			</view>
			<view v-if="showpricedata==2" class="" style="display: flex;justify-content: space-between;line-height: 80rpx;font-size: 29rpx;padding: 0 20rpx;">
				<text style="color:rgba(153,153,153,1);">优惠劵</text>
				<text>-¥{{corserbottemlist.priceDiscount}}</text>
			</view>
			<view class="" style="text-align: right;padding: 30rpx;font-size: 29rpx;">
				应付款: <text style="color: rgb(249,58,58);"> ¥{{corserbottemlist.pricePay}}</text>
			</view>
		</view>
		<view class="mindbox" style="">
			<view class="mindbox-kc">
				订单信息
			</view>
			<view class="" style="display: flex;justify-content: space-between;line-height: 90rpx;font-size: 29rpx;padding: 0 20rpx;">
				<text style="color:rgba(153,153,153,1);">订单编号</text>
				<text>{{corserbottemlist.orderNo}}</text>
			</view>
			<view class="" style="display: flex;justify-content: space-between;line-height: 80rpx;font-size: 29rpx;padding: 0 20rpx;">
				<text style="color:rgba(153,153,153,1);">下单时间</text>
				<text>{{corserbottemlist.createTime}}</text>
			</view>
		</view>
		<view class="" style="height: 100rpx;"></view>
		<view class="bottoms" style="height: 100rpx;" v-if="corserbottemlist.orderStatus!=4">
			<view class="" style="display: flex;justify-content: flex-end;margin-top: 16rpx;">
				<view v-if="corserbottemlist.orderStatus==1" class="canseldd" type="default" @click="canceldd" >取消订单</view>
				<block v-if="platform=='android'">
					<button v-if="corserbottemlist.orderStatus==1"  @click="paybtn(corserbottemlist)" class="gozif" type="default">去支付</button>
				</block>   
				<block v-if="platform=='ios'">
					<button v-if="corserbottemlist.orderStatus==1 && showpricedata==1"  @click="paybtn(corserbottemlist)" class="gozif" type="default">去支付</button>
				</block>
				<button v-if="corserbottemlist.orderStatus==2"  @click="goestimate" class="goestipj" type="default">去评价</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				platform:uni.getSystemInfoSync().platform,
				showpricedata:'',//用来苹果上架是否显示价钱
				orderid:'',//订单id
				orderStatus:'',
				corserbottemlist:{},
				enter:'1',//1 从其他位置进入订单详情 2 从消息列表进入
			}
		},
		onLoad(page){
			this.orderStatus=page.orderStatus
			this.orderid=page.orderid
			this.enter=page.enter==null  ? '1':page.enter
			console.log(this.orderidjs)
			this.orderdetail()
			this.showprice()
			
		},
		methods: {
			paybtn(v){//去支付 
				uni.navigateTo({ //orderNo 订单id   footing 小计  datatype 是1线上 2线下  3为点播 支付过后跳转各自该去的页面
					url:'/pages/client/user/payPage?orderNo=' + this.corserbottemlist.orderId + "&actualpay=" + this.corserbottemlist.pricePay + '&datatype=' + this.corserbottemlist.type
				})
			},
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			canceldd(){//取消订单
				uni.showModal({
				    title: '取消订单',
				    content: '您确定取消订单吗?',
				    success: (res) =>{
				        if (res.confirm) {
							this.api.cancelOrder(
								this.orderid
							).then(res=>{
								console.log(res)
								this.tui.toast('取消成功')
								uni.$emit('orderupdate',{msg:'页面更新'})
								setTimeout(()=>{
									uni.navigateBack({
									    delta: 1
									});
								},300)
							})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			goestimate(){
				uni.navigateTo({
					url:'./evaluatepj?orderid=' + this.orderid
				})
			},
			orderdetail(){
				this.api.orderdetail({
					"orderId":this.orderid,
					"type":this.enter       //1 从其他位置进入订单详情 2 从消息列表进入
				}).then(res=>{
					this.corserbottemlist=res.data
					console.log(res,'llllllllllllllllllllllllllllll')
					if(this.enter==2){ //等于二的时候代表从从消息列表进入 要读消息
						uni.$emit('readmessage',{msg:'读消息'})
					}
				})
			}
		}
	}
</script>

<style scoped>
	.ordertype{
		box-sizing:boder-box;
		height:112rpx;
		background:linear-gradient(180deg,rgba(242,148,34,1) 0%,rgba(242,111,61,1) 100%);
		opacity:1;
		margin-top: -1rpx;
		display: flex;
		justify-content: space-between;
		padding: 50rpx 80rpx 50rpx 50rpx;
		/* position: sticky;
		top: var(--window-top);
		z-index: 99; */
	}
	.waitpay{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:51rpx;
		color:rgba(255,255,255,1);
		opacity:1;
		height: 70rpx;
	}
	.contens{
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(255,255,255,1);
		opacity:1;
	}
	.fankas{
		margin: 30rpx;
		padding: 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 2px rgba(0,0,0,0.16);
		opacity:1;
		border-radius:12px;
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
	.fankas-name{
		width:330rpx;
		height:40rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		overflow: hidden;
	}
	.allowed{
		width:101rpx;
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(249,153,69,1);
		opacity:1;
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
	.typelistbox{
		margin-top: 25rpx;
		display: flex;
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
	.mindbox{
		width:690rpx;
		background:rgba(255,255,255,1);
		opacity:1;
		border-radius:12rpx;
		margin: 0 auto 20rpx auto;
		
	}
	.mindbox-kc{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:90rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		padding-left: 20rpx;
		border-bottom: 1rpx solid rgba(238,238,238,1);
	}
	.bottoms{
		width:750rpx;
		height:89rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px -2rpx 4rpx rgba(0,0,0,0.09);
		opacity:1;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		padding: 0 20rpx;
		box-sizing: border-box;
	}
	.canseldd{
		width:226rpx;
		height:70rpx;
		background:rgba(255,190,90,1);
		border-radius:36rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		margin: auto 0;
	}
	.goestipj{
		width:226rpx;
		height:70rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF;
		font-size: 30rpx;
		margin: auto 0 auto 480rpx;
	}
	.gozif{
		width:226rpx;
		height:70rpx;
		background:rgba(242,127,49,1) !important;
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 70rpx;
		color: #FFFFFF !important;
		font-size: 30rpx;
		margin: auto 0 auto 25rpx;
	}
</style>
