<template>
	<view style="min-height: 100%;background: #F2F4F8;padding: 30rpx;">
		<view class="fankas" >
			<view class="" style="display: flex;">
				<view class="fankas-type">{{corserbottemlist.subjectName}}</view>
				<view class="fankas-name" style="flex: 1;">{{corserbottemlist.name}}</view>
				<view class="allowed">¥{{corserbottemlist.price}}</view>
			</view>
			<!-- istype 1是班组课  2是点播课  只有班组课才有时间-->
			<view class="timedata" v-if="istype==1">
				<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
				<text>{{corserbottemlist.rangeDate}}</text>
			</view>
			<view class="typelistbox">
				<view class="typelist" v-for="item in corserbottemlist.tagsList">
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
		<view class="" style="width: 630rpx;margin:0 auto;background: #FFFFFF;padding:0 30rpx;border-radius: 15rpx;margin-top: 30rpx;">
			<view class="orderform">订单信息</view>
			<view class="classPrse">
				<text>{{ifgroup==1?'课程价格':'拼团价格'}}</text>
				<text>¥{{ifgroup==1? corserbottemlist.price :corserbottemlist.groupPrice}} </text>
			</view>
			<block v-if="showpricedata==2">
				<view v-if="ifgroup==1" class="classPrse" @click="xzcouponopen">
					<text>优惠劵</text>
					<text v-if="reducedprice!=''">－¥{{reducedprice}}</text>
					<text v-else>{{coupondata.length==0?'您暂无优惠劵':'请选择优惠劵'}}</text>
				</view>
			</block>
		</view>
		<view class="" style="background: #FFFFFF;position: fixed;bottom: 0;left: 0;right: 0;display: flex;justify-content: space-between;padding:10rpx 30rpx;">
			<view class="total">
				<text>合计 :</text>
				<text style="color: #F93A3A;">¥{{priceticket}}</text>
			</view>
			<view class="submit" @click="submitbtn">
				提交订单
			</view>
		</view>
		<uni-popup ref="xzcoupon" type="bottom">
			<view class="" style="background: #FFFFFF;width: 750rpx;border-top-left-radius: 12rpx;border-top-right-radius: 12rpx;">
				<view class="group">
					<text>选择优惠劵</text>
				</view>
				<scroll-view scroll-y="true" class="group-Y">
					<view class="juan-box" v-for="item in coupondata" @click="couponbtn(item)">
						<view class="juan-left">
							<view class="" style="margin-top: 20rpx;">
								<text class="tubiao">¥</text>
								<text class="juan-pirse">{{item.favorablePrice}}</text>
								<view class="juan-full">
									满{{item.price}}元可用
								</view>
							</view>
						</view>
						<view class="" style="padding: 0 30rpx;">
							<view class="juan-name">
								{{item.name}}
							</view>
							<view class="juan-type">
								{{item.type=='1'?'通用劵':''}}
							</view>
							<view class="juan-type">
								有效期:{{item.endTime.slice(0,10)}}
							</view>
						</view>
						<view class="juan-get">
							<view class="" v-if="couponindex==item.id">
								<image src="../../../static/image/72.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view class="" v-else>
								<image src="../../../static/image/73.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showpricedata:'',//用来苹果上架的 苹果上架审核的时候不显示优惠劵
				courseid:'',//课程id
				ifgroup:'',//ifgroup 等于1是购买   等于2是拼团
				istype:'', //1  是班组课  2是点播课
				schoolId:'',//学校id
				corserbottemlist:{},
				reducedprice:'',//优惠券价格
				couponindex:'',//优惠劵id
				coupondata:[],//存放优惠劵数据
				datatype:'',//是用来支付成功跳转的
				sd:23,
				fe:52,
			}
		},
		onLoad(option) {
			this.courseid=option.courseid  //课程id
			this.ifgroup=option.ifgroup  //ifgroup 等于1是购买   等于2是拼团
			this.istype=option.type  //1  是班组课  2是点播课
			this.schoolId=option.schoolId  //学校id
			this.groupId=option.groupId  //拼团id
			this.datatype=option.datatype
			this.getById()//订单结算
			this.findPageByCourse()//获取可用的优惠劵
			this.showprice()
		},
		computed:{
			footing(){
				if(this.ifgroup==1){
					return this.corserbottemlist.price - this.reducedprice
				}else{
					return this.corserbottemlist.groupPrice
				}
			},
			priceticket(){
				return this.footing.toFixed(2)
			}
		},
		methods: {
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			xzcouponopen(){
				if(this.coupondata.length==0){
					this.tui.toast('您暂无优惠券')
				}else{
					this.$refs.xzcoupon.open()
				}
			},
			getById(){//订单结算
				this.api.ordersettlement({
					"id":this.courseid,//课程id
					"type":this.istype,//1 班组课 2 点播课
					"isGroup":this.ifgroup,//1 普通订单 2 拼团订单
					"couponId":this.couponindex//优惠券id
				}).then(res=>{
					this.corserbottemlist=res.data
					console.log(res)
				})
			},
			findPageByCourse(){  //获取可用的优惠劵
				this.api.findPageByCourse({
					"current":1,
					"size":100,
					"type":this.istype,//1 班组课 2 点播课
					"courseId":this.courseid//课程id
				}).then(res=>{
					this.coupondata=res.data.records
					console.log(res)
				})
			},
			submitbtn(){//提交订单  
				this.api.ordercreateOrder({
					"id":this.courseid,//课程id
					"type":this.istype,//1 班组课 2 点播课
					"isGroup":this.ifgroup,//1 普通订单 2 拼团订单
					"couponId":this.couponindex,//优惠券id
					"schoolId":this.schoolId,//校区id
					"groupId":this.groupId//拼团id
				}).then(res=>{
					uni.$emit('readmessage',{msg:'提交订单刷新消息数量'})
					console.log(res)
					uni.navigateTo({ //orderNo 订单id   priceticket 小计  istype 是1非点播课 2点播课    datatype 1是线上 2是线下  3是点播课
						url:'/pages/client/user/payPage?orderNo=' + res.data + "&actualpay=" + this.priceticket + '&istype=' + 1 + '&datatype=' + this.datatype + '&isGroup=' + this.ifgroup
					})
				})
			},
			couponbtn(v){
				this.couponindex=v.id
				this.$refs.xzcoupon.close()
				this.reducedprice=v.favorablePrice
				// if(this.couponindex==''){
				// 	this.couponindex=v.id
				// }else if(this.couponindex!=v.id){
				// 	this.couponindex=v.id
				// }else if(this.couponindex==v.id){
				// 	this.couponindex=''
				// }
			}
		}
	}
</script>

<style>
	.fankas{
		padding: 30rpx;
		background:rgba(255,255,255,1);
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
		font-size:33rpx;
		font-family:DIN;
		font-weight:500;
		line-height:39rpx;
		color:rgba(249,58,58,1);
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
	.classPrse{
		display: flex;
		justify-content: space-between;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(51,51,51,1);
		opacity:1;
		line-height:90rpx;
		border-bottom: 1rpx solid #F2F4F8;
	}
	.orderform{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:90rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		border-bottom: 1rpx solid #F2F4F8;
	}
	.total{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:70rpx;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.submit{
		width:226rpx;
		height:72rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 72rpx;
		font-size: 32rpx;
		color: #FFFFFF;
	}
	.group{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:80rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		text-align: center;
		border-bottom: 1rpx solid rgb(234,234,234);
	}
	.group-Y{
		height: 800rpx;
		box-sizing: border-box;
	}
	.juan-box{
		display: flex;
		width:690rpx;
		height:181rpx;
		background:rgba(255,255,255,1);
		opacity:1;
		border-radius:7rpx;
		margin: 30rpx auto 0 auto;
		box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.16);
	}
	.juan-left{
		width:226rpx;
		height:181rpx;
		background:rgba(255,220,219,1);
		opacity:1;
		text-align: center;
		border-radius: 7rpx;
	}
	.tubiao{
		font-size:29rpx;
		font-family:Impact;
		font-weight:400;
		line-height:35rpx;
		color:rgba(255,68,64,1);
		opacity:1;
	}
	.juan-pirse{
		font-size:82rpx;
		font-family:Impact;
		font-weight:400;
		line-height:99rpx;
		color:rgba(255,68,64,1);
		opacity:1;
	}
	.juan-full{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:34rpx;
		color:rgba(255,68,64,1);
		opacity:1;
	}
	.juan-name{
		padding: 25rpx 0;
		font-size:33rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:45rpx;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.juan-type{
		font-size:24rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:34rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.juan-get{
		margin:auto;
	}
</style>
