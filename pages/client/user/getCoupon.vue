<template>
	<view>
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="juan-box" v-for="item in coupondata">
				<view class="juan-left">
					<view class="" style="margin-top: 20rpx;">
						<text class="tubiao">¥</text>
						<text class="juan-pirse">{{item.favorablePrice}}</text>
						<view class="juan-full">
							满{{item.price}}元可用
						</view>
					</view>
				</view>
				<view class="" style="padding: 0 30rpx;flex: 1;">
					<view class="juan-name">
						{{item.name}}
					</view>
					<view class="juan-type">
						{{item.type=='1'?'全场通用':''}}
					</view>
					<view class="juan-type">
						有效期:{{item.endTime.slice(0,10)}}
					</view>
				</view>
				<view class="juan-get" @click="drawdown(item)">
					立即领取
				</view>
			</view>
		</mescroll-body>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				coupondata:[],//优惠劵列表
				couponId:"",//优惠劵id
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
						// btnText: '刷新',
						// 列表第一页无任何数据时,显示的空布局
						// use : 是否启用
						// icon : 空布局的图标路径 (支持网络路径)
						// tip : 提示文本
						// btnText : 按钮文本
						// fixed : 是否使用定位,默认false; 配置fixed为true,以下的top和zIndex才生效 (transform会使fixed失效,所以最终还是会降级为absolute)
						// top : fixed定位的top值 (完整的单位值,如"100rpx", "10%";)
						// zIndex : fixed定位z-index值
					},
					textNoMore: "我也是有底线的" //没有更多数据的提示文本
				},
			}
		},
		methods: {
			// 领取优惠券
			couponconvert(){
				this.api.couponconvert({
					couponId:this.couponId
				}).then(res=>{
					this.tui.toast('领取成功')
					this.downCallback()
				})
			},
			//领取优惠劵按钮
			drawdown(v){
				this.couponId=v.id
				this.couponconvert()
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					current: page.num,
					size: page.size
				}
				this.api.couponfindPage(params).then((res) => {
					console.log(res)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages;
					//设置列表数据
					setTimeout(() => { // 模拟效果
						if (page.num == 1) this.coupondata = []; //如果是第一页需手动置空列表
						this.coupondata = this.coupondata.concat(curPageData); //追加新数据
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
	.juan-box{
		display: flex;
		width:690rpx;
		height:181rpx;
		background:rgba(255,255,255,1);
		opacity:1;
		border-radius:7rpx;
		margin: 30rpx auto 0 auto;
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
		width:126rpx;
		height:53rpx;
		background:linear-gradient(180deg,rgba(242,148,34,1) 0%,rgba(242,111,61,1) 100%);
		box-shadow:0px 2rpx 4rpx rgba(255,198,197,1);
		opacity:1;
		border-radius:12rpx;
		text-align: center;
		line-height: 53rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		color:rgba(255,255,255,1);
		margin:auto 20rpx auto auto;
	}
</style>
