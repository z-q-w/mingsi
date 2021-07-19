<template>
	 <mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="pd-list">
			<view class="pd-li" v-for="pd in corserbottemlist" :key="pd.id" @tap="integraldtal(pd)">
				<image :src="pd.thumbnails"  mode="" style="width: 250rpx;height: 180rpx;margin-right: 20rpx;border-radius: 8rpx;"></image>
				<view class="" style="margin-top: 15rpx;">
					<view class="pd-name">{{pd.name}}</view>
					<view class="pd-number">x{{pd.num}}</view>
					<view class="pd-bottom" style="text-align: right;">
						<text style="margin-right: 25rpx;">共计{{pd.num}}件商品</text>
						<text class="pd-sold">合计{{pd.totalIntegral}}积分</text>
					</view>
				</view>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin], // 使用mixin (在main.js注册全局组件)
		data() {
			return {
				goods: [], // 数据列表
				isGoodsEdit: false  ,// 是否加载编辑后的数据,
				corserbottemlist:[]
			}
		},
		methods: {
			/*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {
				let parms={
					current: page.num,
					size: page.size,
				}
				this.api.orderGoodsfindPage(parms).then(res=>{
					console.log(res)
					
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
				
				
				//联网加载数据
				// apiGoods(page.num, page.size, this.isGoodsEdit).then(curPageData=>{
				// 	//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
				// 	//mescroll会根据传的参数,自动判断列表如果无任何数据,则提示空;列表无下一页数据,则提示无更多数据;

				// 	//方法一(推荐): 后台接口有返回列表的总页数 totalPage
				// 	//this.mescroll.endByPage(curPageData.length, totalPage); //必传参数(当前页的数据个数, 总页数)

				// 	//方法二(推荐): 后台接口有返回列表的总数据量 totalSize
				// 	//this.mescroll.endBySize(curPageData.length, totalSize); //必传参数(当前页的数据个数, 总数据量)

				// 	//方法三(推荐): 您有其他方式知道是否有下一页 hasNext
				// 	//this.mescroll.endSuccess(curPageData.length, hasNext); //必传参数(当前页的数据个数, 是否有下一页true/false)

				// 	//方法四 (不推荐),会存在一个小问题:比如列表共有20条数据,每页加载10条,共2页.如果只根据当前页的数据个数判断,则需翻到第三页才会知道无更多数据
				// 	this.mescroll.endSuccess(curPageData.length);

				// 	//设置列表数据
				// 	if(page.num == 1) this.goods = []; //如果是第一页需手动制空列表
				// 	this.goods=this.goods.concat(curPageData); //追加新数据   注意goods改为list
				// }).catch(()=>{
				// 	//联网失败, 结束加载
				// 	this.mescroll.endErr();
				// })
			},
			integraldtal(v){
				console.log(v)
				uni.navigateTo({
				    url: '/pages/client/user/integralDetails?integralid=' + v.id
				});
			}
		}
	}
</script>

<style>
	/*说明*/
	.notice-warp{
		font-size: 26upx;
		padding: 40upx 0;
		border-bottom: 1upx solid #eee;
		text-align: center;
	}
	.notice-warp .notice{
		color:#555;
	}
	.notice-warp .btn-change{
		display: inline-block;
		margin-top: 28upx;
		padding: 6upx 16upx;
		border: 1upx solid #FF6990;
		border-radius: 40upx;
		color: #FF6990;
	}
	.notice-warp .btn-change:active{
		opacity: .5;
	}
	/*数据列表*/
	
	.pd-number{
		
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-top: 44rpx;
		margin-bottom: 25rpx;
	}
	.pd-li{
		display: flex;
		background: #FFFFFF;
		padding: 30rpx;
		margin-top: 30rpx;
	}
	.pd-img{
		width:180rpx;
		height:180rpx;
		border-radius:6rpx;
		margin-right: 25rpx;
		
	}
	.pd-name{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:36rpx;
		width: 400rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		
	}
	.pd-bottom{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:21rpx;
	}
</style>
