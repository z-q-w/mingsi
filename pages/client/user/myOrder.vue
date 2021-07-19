<template>
	<view style="background:rgb(247, 249, 252);opacity:1;min-height: 100%;">
		<view class="tabqi">
			<view style="display: flex;justify-content: space-between;">
				<text  :class="chessindex==item.type ? 'tabqi-color':'tabqi-tabmei'" v-for="(item,index) in chesslist" :key="index" @click="chesstabbtn(item, index)">{{item.name}}</text>
			</view>
		</view>
		<view class="">
			<mescroll-body ref="mescrollRef"  :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="fankas-box" v-for="item in corserbottemlist" :key='item.index' @tap="orderdtal(item)">
					<view class="" style="padding: 30rpx;font-size:29rpx;color:rgba(102,102,102,1)">
						订单编号:{{item.orderNo}}
					</view>
					<view class="fankas">
						<view class="" style="display: flex;">
							<view class="fankas-type">{{item.subjectName}}</view>
							<view class="fankas-name" style="flex: 1;">{{item.courseName}}</view>
							<view class="allowed">¥{{item.price}}</view>
						</view>
						<!-- item.type==3的时候 是点播课点播课没有时间 -->
						<view class="timedata" v-if="item.type!=3">
							<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
							<text>{{item.rangeDate}}</text>
						</view>
						<view class="typelistbox">
							<view class="typelist" v-for="items in item.tagsList">
								<text style="color:#F27F31;">{{items}}</text>
							</view>
						</view>
						<view class="" style="display: flex;margin-top: 25rpx;">
							<image :src="item.avatar" mode="aspectFill" style="width: 54rpx;height: 54rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
							<view class="home-techer">
								{{item.teacherName}}
							</view>
						</view>
					</view>
					<view class="" style="display: flex;justify-content: space-between;padding: 10rpx 25rpx 10rpx 25rpx;">
						<view class="">
							<text style="color:#FF7056;font-size: 29rpx;line-height: 85rpx;" v-if="item.orderStatus==1">待支付</text>
							<text style="color:#FFBE5A;font-size: 29rpx;line-height: 85rpx;" v-if="item.orderStatus==2">已支付</text>
							<text style="color:#FFBE5A;font-size: 29rpx;line-height: 85rpx;" v-if="item.orderStatus==3">已完成</text>
							<text style="color:#FFBE5A;font-size: 29rpx;line-height: 85rpx;" v-if="item.orderStatus==4">已取消</text>
							<text style="color:#FFBE5A;font-size: 29rpx;line-height: 85rpx;" v-if="item.orderStatus==5">拼团失败</text>
							<text style="color:#FFBE5A;font-size: 29rpx;line-height: 85rpx;" v-if="item.orderStatus==6">拼团中</text>
						</view>
						<view class="" style="display: flex;margin: auto 0;">
							<button class="cansel" type="default" v-if="item.orderStatus==1">取消订单</button>
							<button class="gopay" type="default" v-if="item.orderStatus==1">去支付</button>
							<button class="gopay" type="default" v-if="item.orderStatus==2">去评价</button>
						</view>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				chessindex:4,
				chesslist:[
					{name:'全部',type:'4'},
					{name:'待支付',type:'1'},
					{name:'待评价',type:'2'},
					{name:'已完成',type:'3'},
				],
				corserbottemlist:[],
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 空空如也 ~', // 提示
					},
					textNoMore: "我也是有底线的" //没有更多数据的提示文本
				},
			}
		},
		onLoad(page) {
			this.chessindex=page.type
			uni.$on('orderupdate',(data)=>{
				this.downCallback()
				console.log(data)
			})
		},
		methods: {
			chesstabbtn(item, index) {
				this.chessindex = item.type
				this.downCallback()
			},
			orderdtal(v){//跳转到订单详情
				console.log(v,'ff')
				uni.navigateTo({
				    url: './orderDetails?orderStatus='+ v.orderStatus + '&orderid=' + v.orderId
				});
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					current: page.num,
					size: page.size,
					type:this.chessindex
				}
				this.api.orderPage(params)
					.then((res) => {
						console.log(res,'订单列表')
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.pages;
						//设置列表数据
						setTimeout(() => { // 模拟效果
							if (page.num == 1) this.corserbottemlist = []; //如果是第一页需手动置空列表
							this.corserbottemlist = this.corserbottemlist.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 500)
					})
					.catch((err) => {
						this.mescroll.endErr()
					})
				}
		}
	}
</script>

<style>
	.tabqi {
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
		background: #FFFFFF;
	}
	.tabqi-color{
		font-size:32rpx;
		font-family:PingFang SC;
		color:#F27F31;
		line-height:70rpx;
		border-bottom: 4rpx solid #F27F31;
		margin: 0 30rpx;
	}
	.tabqi-tabmei{
		font-size:32rpx;
		font-family:PingFang SC;
		color:#666666;
		line-height:70rpx;
		margin: 0 30rpx;
	}
	.fankas{
		padding: 30rpx;
		background:rgba(245,245,245,1);
		opacity:1;
	}
	.fankas-box{
		width:690rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 2rpx 4rpx rgba(0,0,0,0.16);
		opacity:1;
		border-radius:12rpx;
		margin: 0 auto;
		margin-top: 30rpx;
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
		font-weight: bold;
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
	.cansel{
		margin-right: 25rpx;
		height:56rpx;
		background-color:rgba(255,190,90,1)!important;
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 58rpx !important;
		color: #FFFFFF!important;
		font-size: 29rpx;
		padding: 0 30rpx;
	}
	.gopay{
		width:176rpx;
		height:56rpx;
		background:rgba(242,127,49,1)!important;
		opacity:1;
		border-radius:36rpx;
		text-align: center;
		line-height: 58rpx!important;
		color: #FFFFFF!important;
		font-size: 30rpx;
	}
</style>
