<template>
	<view style="background: #FFFFFF;min-height: 100%;">
			<view class="" style="display: flex;flex-wrap: wrap;">
				<view class="typeimg" v-for="item in institutiondata" @click="institutionbtn(item)">
					<image :src="item.logo" mode="" style="width:85rpx;height:85rpx;"></image>
					<view class="" style="font-size:28rpx;margin-top: 10rpx;">
						{{item.subjectName}}
					</view>
				</view>
			</view>
		<view class="" style="font-size: 36rpx;font-weight: bold;padding: 30rpx;">
			课程列表
		</view>
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="fankas"  v-for="item in corserbottemlist" :key='item.index' @click="referrerBtn(item)">
				<view class="" style=" position: absolute;right: 0rpx;width: 100rpx;background: #EF586B;text-align: center;border-radius:0rpx 18rpx 0rpx 18rpx;top: -10rpx;color: #FFFFFF;font-size: 29rpx;">
					{{item.subjectName}}
				</view>
				<view class="" style="display: flex;margin-top: 30rpx;">
					<view class="fankas-type">荐</view>
					<view class="fankas-name" style="flex: 1;">{{item.name}}</view>
				</view>
				<view class="timedata">
					<view class="">
						<image src="../../../static/image/7.png" mode="" style="width: 22rpx;height: 22rpx;margin-right: 25rpx;"></image>
						<text>{{item.rangeDate}}</text>
					</view>
					<view class="" style="margin-top: -20rpx;">
						<view class="timedata-price">¥{{item.price}}</view>
						<view class="" style="font-size: 24rpx;">{{item.buyNumber}}已报名</view>
					</view>
				</view>
				<view class="typelistbox">
					<view class="typelist" v-for="item in item.typelist">
						<text style="color:#F27F31;">{{item}}</text>
					</view>
				</view>
				<view class="" style="display: flex;margin-top: 25rpx;">
					<image :src="item.avatar" mode="aspectFill" style="width: 54rpx;height: 54rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
					<view class="home-techer">
						{{item.teacherName}}
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
				institutiondata:[],
				corserbottemlist:[],
			}
		},
		onLoad() {
			this.artClassList()
		},
		methods: {
			institutionbtn(v){
				console.log(v)
				this.api.artDeptDetail({
					subjectId:v.id,
					deptId:uni.getStorageSync('deptId')
				}).then(res=>{
					if(res.code==200){
						uni.navigateTo({
							url:"/pages/client/find/institutionDetails?subjectId=" + v.id + '&subjectName=' + v.subjectName
						})
					}
				})
			},
			referrerBtn(v){//推荐课程详情
				if(v.type ==3){  //type 1推荐课线上  2推荐课线下  3点播课
					uni.navigateTo({
						url:"/pages/client/home/classDetails?Lessonid=" + v.id
					})
				}else{
					uni.navigateTo({
						url:"/pages/client/home/referrerDetail?courseid=" + v.id
					})
				}
			},
			artClassList(){//艺术课类型列表
				this.api.artClassList(
					uni.getStorageSync('deptIddata')
				).then(res=>{
					this.institutiondata=res.data
					console.log(res)
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					size:page.size,					current:page.num,					deptId:uni.getStorageSync('deptId')
				}
				this.api.recommendPage(params)
					.then((res) => {
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
					.catch((err) => {
						this.mescroll.endErr()
					})
			}
		}
	}
</script>

<style>
	.fankas{
		position: relative;
		border-top: 12rpx solid #EF586B;
		margin: 30rpx;
		padding: 0rpx 30rpx 30rpx 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 2rpx rgba(0,0,0,0.16);
		opacity:1;
		border-radius:12rpx;
	}
	.fankas-type{
		width:39rpx;
		height:39rpx;
		background:#1CA3FF;
		opacity:1;
		text-align: center;
		line-height: 39rpx;
		color: #FFFFFF;
		margin-right: 30rpx;
		font-size: 26rpx;
		border-radius: 8rpx;
	}
	.fankas-name{
		width:330rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		overflow: hidden;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
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
		display: flex;
		justify-content: space-between;
	}
	.home-techer{
		height:36rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		flex: 1;
		margin-top: 10rpx;
	}
	.timedata-price{
		font-size:42rpx;
		font-family:DIN;
		font-weight:500;
		line-height:53rpx;
		color:rgba(252,155,59,1);
		opacity:1;
	}
	.typeimg{
		width: 187rpx;
		text-align: center;
		padding: 40rpx 0 0rpx 0;
	}
</style>
