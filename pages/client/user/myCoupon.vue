<template>
	<view>
		<view class="" style="display: flex;padding: 20rpx 100rpx 0rpx 100rpx;background: #FFFFFF;justify-content: space-between;">
			<view :class="navigationindex==item.index?'checked':'unchecked'" v-for="(item,index) in navigation" @click="navigationBtn(item)">
				<view class="navigationame">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="" style="padding: 0 30rpx;">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback" @emptyclick="emptyClick">
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
					<view :class="navigationindex != 1 ?'unjuan-get':'juan-get'" @click="goshiyong">
						{{navigationindex==3?'已过期':navigationindex==2 ? '已使用':'去使用'}}
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
				navigationindex:"1",
				navigation:[
					{
						name:'未使用',
						index:'1'
					},
					{
						name:'已使用',
						index:'2'
					},
					{
						name:'已过期',
						index:'3'
					}
				],
				coupondata:[],
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
						tip: '~ 暂无优惠券 ~', // 提示
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
			navigationBtn(v){
				console.log(v)
				this.coupondata=[]
				this.navigationindex=v.index
				this.downCallback()
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			goshiyong(){
				if(this.navigationindex==1){
					uni.switchTab({
					    url: '/pages/client/home/home'
					});
				}
			},
			upCallback(page) {
				let params = {
					current: page.num,
					size: page.size,
					isUsed:this.navigationindex
				}
				this.api.mycouponfindPage(params).then((res)=>{
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
					console.log(res)
				}).catch((err) => {
					this.mescroll.endErr()
				})
			}
		}
	}
</script>

<style>
	.navigationame{
		/* width: 200rpx; */
		text-align: center;
		height: 56rpx;
	}
	.checked{
		color: #F27F31;
		border-bottom: 5rpx solid #F27F31;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		opacity:1;
	}
	.unchecked{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
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
		margin:auto;
	}
	.unjuan-get{
		width:126rpx;
		height:53rpx;
		background: #999999;
		opacity:1;
		border-radius:12rpx;
		text-align: center;
		line-height: 53rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		color:rgba(255,255,255,1);
		margin:auto;
	}
</style>
