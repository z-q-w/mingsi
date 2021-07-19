<template>
	<view style="background: #FFFFFF;min-height: 100%;">
		<view class="uni-margin-wrap" style="padding: 0 30rpx;">
			<swiper circular 
			:indicator-dots="indicatorDots" 
			:autoplay="autoplay" 
			:interval="5000"
			:duration="500" 
			:indicator-active-color="indicatorcolor">
				<swiper-item class="swiper" v-for="item in bannaer" :key="item.index">
					<image :src="item.picture" mode="" style="width: 100%;height: 100%;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="integralhx">
			——— 积分兑换 ———
		</view>
		<view class="" style="padding: 0 30rpx;">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="exchange-box">
					<view class="exchange" v-for="item in shopping" :key="item.index" @tap="jfshopp(item)">
						<image :src="item.thumbnails" style="width: 330rpx;height:290rpx;"  mode=""></image>
						<view class="exchange-content">
							{{item.name}}
						</view>
						<view class="exchange-integral">
							{{item.integral}}积分
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
				indicatorDots: true,//是否显示指示点
				autoplay: true,//是否自动播放
				indicatorcolor:'rgba(247,99,52,1)',//圆点的颜色
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				shopping:[],
				upOption: {
					auto: false, // 不自动加载
					// page: {
					// 	num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
					// 	size: 10 // 每页数据的数量
					// },
					noMoreSize: 4, //如果列表已无数据,可设置列表的总数量要大于半页才显示无更多数据;避免列表数据过少(比如只有一条数据),显示无更多数据会不好看; 默认5
					empty: {
						tip: '~ 暂无积分商品 ~', // 提示
						btnText: '刷新',
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
				bannaer:[],//轮播图
			}
		},
		onNavigationBarButtonTap(){
			uni.navigateTo({
				url:"/pages/client/user/Integralorder"
			})
		},
		onLoad() {
			this.bannergoods()
		},
		methods: {
			jfshopp(v){//跳详情
				uni.navigateTo({
					url:"./jfgoodsdetais?jfdetaisid=" +v.id
				})
			},
			bannergoods(){//轮播图
				this.api.bannergoods().then(res=>{
					this.bannaer=res.data
					console.log(res)
				})
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let params = {
					current: page.num,
					size: page.size,
				}
				this.api.goodsfindPage(params).then((res)=>{
					console.log(res)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages;
					//设置列表数据
					setTimeout(() => { // 模拟效果
						if (page.num == 1) this.shopping = []; //如果是第一页需手动置空列表
						this.shopping = this.shopping.concat(curPageData); //追加新数据
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
					}, 500)
					console.log(res)
				}).catch((err) => {
					this.mescroll.endErr()
				})
			}
		}
	}
</script>

<style>
	.swiper{
		width:690rpx;
	}
	.integralhx{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(255,57,6,1);
		opacity:1;
		text-align: center;
		line-height: 100rpx;
	}
	.exchange-box{
		display: flex;
		flex-wrap:wrap;
		justify-content: space-between;
	}
	.exchange{
		margin-top: 25rpx;
		width:330rpx;
		box-shadow:0px 4rpx 8rpx 0px rgba(6,0,1,0.08);
		border-radius:8rpx
	}
	.exchange-content{
		height: 68rpx;
		padding: 0 15rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:36rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.exchange-integral{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(255,98,96,1);
		padding: 20rpx 20rpx 15rpx 20rpx ;
	}
</style>
