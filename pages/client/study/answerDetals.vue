<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="contentlist">
				<view class="content-titel">
					{{contentlist.question}}
				</view>
				<view class="content-contentL">
					{{contentlist.describle}}
				</view>
				<view class="costst" v-if="contentlist.pics!=''">
					<image v-for="cost in contentlist.pics" @click="previewImage(cost,contentlist.pics)" :src="cost" mode="" style="width:217rpx;height:163rpx;margin-right: 30rpx;border-radius: 12rpx;"></image>
				</view>
				<view class="content-hd">
					<text style="color:#F27F31;margin-right: 20rpx;">{{contentlist.userName}}</text>
					<text>{{contentlist.answerNum}}回答</text>
				</view>
			</view>
			<view class="" v-for="item in comment" style="display: flex;padding:20rpx;">
				<image :src="item.avatar" mode="" style="width:55px;height:55px;border-radius: 50%;margin-right: 20rpx;"></image>
				<view class="" style="width: 580rpx;">
					<view class="comment-name">
						{{item.userName}}
					</view>
					<view class="comment-time">
						{{item.createTime}}
					</view>
					<view class="comment-content" >
						{{item.content}}
					</view>
					<view class="" style="display: flex;flex-wrap: wrap;">
						<view class="" v-if="item.pics!=''" v-for="items in item.pics">
							<image :src="items" @click="previewImage(items,item.pics)" mode="" style="width:170rpx;height:170rpx;border-radius: 8rpx;margin-top: 15rpx;margin-right: 15rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
		<view class="tui-address-new" @click="writeda">
			<button class="newadd">写答案</button>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				questionsid:'',//每个问题的id
				contentlist:{},
				comment:[],
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
						tip: '~ 暂无数据 ~', // 提示
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
			this.questionsid=option.questionsid
			this.interactiondetail()
			uni.$on('answer',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.downCallback()
			})
		},
		methods: {
			writeda(){ //写答案按钮
				uni.navigateTo({
					url:'./writeDan?id='+ this.contentlist.id
				})
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			previewImage(img,imgList){
				uni.previewImage({
					urls:imgList,
					current:img,
					indicator: "default",
				});
			},
			interactiondetail(){ //答疑详情
				this.api.interactiondetail(
					this.questionsid
				).then(res=>{
					console.log(res)
					this.contentlist=res.data
					this.contentlist.pics=res.data.pics.split(",")
				})
			},
			upCallback(page) {
				let params = {
					current: page.num,
					size: page.size,
					id:this.questionsid
				}
				this.api.answerPage(params).then((res)=>{
					console.log(res)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages;
					//设置列表数据
					setTimeout(() => { // 模拟效果
						if (page.num == 1) this.comment = []; //如果是第一页需手动置空列表
						this.comment = this.comment.concat(curPageData); //追加新数据
						this.comment.forEach(teim=>{
							teim.pics=teim.pics.split(",")
						})
						
						// console.log(this.comment.pics,'sfsjdlfjaflajflkkajflkasdjflaskdjflaskdfkoldfhj')
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
	.contentlist{
		padding: 30rpx 10rpx 30rpx 30rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
		border-bottom: 20rpx solid rgba(242,244,248,1);
	}
	.content-titel{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		opacity:1;
		margin-bottom: 15rpx;
	}
	.content-contentL{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(102,102,102,1);
		opacity:1;
		margin-right: 15rpx;
	}
	.costst{
		display: flex;
		justify-content: start;
		flex-wrap:nowrap;
		margin: 22rpx 0;
	}
	.content-hd{
		font-size:25rpx;
		margin-top: 15rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:30rpx;
		opacity:1;
	}
	.comment-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin-top: 20rpx;
	}
	.comment-time{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:30rpx;
		color:rgba(153,153,153,1);
		opacity:1;
		margin-top: 20rpx;
	}
	.comment-content{
		margin-top: 20rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.tui-address-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.newadd{
		height: 80rpx;
		background:rgba(242,127,49,1) ;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 80rpx;
	}
</style>
