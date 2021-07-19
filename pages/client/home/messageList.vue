<template>
	<view>
		<mescroll-body ref="mescrollRef" class="discuss" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="xt-message" v-for="item in corserbottemlist" :key='item.index' @click="referrerBtn(item)">
				<image src="../../../static/image/14.png" mode="" style="width:80rpx;height: 80rpx;margin-right: 6rpx;"></image>
				<view class="" style="flex: 1;" v-if="types==1">
					<view class="xt-type">{{item.head}}</view>
					<view class="xt-content">{{item.content}}</view>
				</view>
				<view v-if="types==2" class="ding-content">{{item.content}}</view>
				<view class="xt-name" style="">
					<view class="">
						{{item.createTime}}
					</view>
					<view class="" style="width: 18rpx;margin: auto;margin-left: 10rpx;">
						<view style="width: 18rpx;height: 18rpx;border-radius: 50%;background: #FF0000;" v-if="item.isRead==1"></view>
					</view>
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
				types:'',
				corserbottemlist:'',
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				upOption: {
					auto: true, // 不自动加载
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
		onLoad(option) {
			this.types=option.type
			uni.$on('readmessage',(data)=>{
				this.downCallback()
				console.log(data)
			})
		},
		methods: {
			referrerBtn(v){
				if(this.types==1){//1系统
					uni.navigateTo({
					    url: '/pages/client/home/systempage?xiaoid=' + v.id
					});
				}else{
					uni.navigateTo({
					    url: '/pages/client/user/orderDetails?orderid='+ v.orderId + '&enter=' + 2
					});
				}
				uni.$emit('readmessage',{msg:'读消息'})
				console.log(v)
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let params = {
					"type": this.types, //消息类型：1:系统消息，2:订单消息
					current: page.num,
					size: page.size
				}
				this.api.messagepage(params)
					.then((res) => {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.data.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.data.total;
						//设置列表数据
						setTimeout(() => { // 模拟效果
							if (page.num == 1) this.corserbottemlist = []; //如果是第一页需手动置空列表
							this.corserbottemlist = this.corserbottemlist.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 500)
					}).catch((err) => {
						console.log("ssss")
						this.mescroll.endErr()
					})
			}
		}
	}
</script>

<style>
	.xt-message{
		margin: 30rpx 25rpx;
		background: #FFFFFF;
		padding: 20rpx 0rpx 20rpx 20rpx;
		border-radius: 12rpx;
		display: flex;
	}
	.xt-type{
		width: 300rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin: auto 0;
		font-size: 32rpx;
	}
	.xt-name{
		font-size: 24rpx;
		margin: auto;
		display: flex;
	}
	.ding-content{
		width: 310rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin: auto 0;
		font-size: 28rpx;
	},
	.xt-content{
		width: 300rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		margin-top: 6rpx;
		font-size: 28rpx;
		color: #999999;
	}
</style>
