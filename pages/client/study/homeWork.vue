<template>
	<view>
		<view class="" style="display: flex;padding: 20rpx 100rpx 0rpx 100rpx;background: #FFFFFF;justify-content: space-between;">
			<view :class="navigationindex==item.index?'checked':'unchecked'" v-for="(item,index) in navigation" @click="navigationBtn(item)">
				<view class="navigationame">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="" style="padding: 0 30rpx;background: #FFFFFF;">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="" style="padding: 0 20rpx;">
					<view class="worklist" v-for="(item,index) in schedule" @click="workdetai(item)">
						<view class="" style="color:rgba(51,51,51,1);font-size: 32rpx;">
							<text>{{item.name}}</text>
						</view>
						<text style="font-size: 32rpx;color: #18D0A2;" v-if="navigationindex==1">已完成</text>
						<text style="font-size: 32rpx;color: #F27F31;" v-if="navigationindex==2">去完成</text>
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
				myjobid:'',//我得作业的id
				navigationindex:2,
				navigation:[
					{
						name:'未完成',
						index:'2'
					},
					{
						name:'已完成',
						index:"1"
					}
				],
				schedule:[],
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
						tip: '~ 暂无作业 ~', // 提示
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
				type:'',
			}
		},
		onLoad(option) {
			this.myjobid=option.myjobid //我的作业课程的id
			this.type=option.type ////1 班组课 2 点播课
			 uni.$on('homework',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.downCallback()
			})
		},
		methods: {
			navigationBtn(v){
				this.navigationindex=v.index
				this.schedule=[]
				this.downCallback()
			},
			workdetai(v){
				uni.navigateTo({  //istype 1 班组课 2 点播课  type 1 线上 2线下 3点播
					url:"./xiehomework?myjobid=" + this.myjobid + '&courseCatalogId=' + v.id + '&type=' + v.type + '&istype=' + this.type + '&navigationindex=' + this.navigationindex
				})
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let params = {
					isComplete:this.navigationindex,//1:已完成，2:未完成					courseId:this.myjobid,//课程Id					size:page.size,					current:page.num,
					type:this.type
				}
				this.api.courseCatalogPage(params).then((res)=>{
					console.log(res)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages;
					//设置列表数据
					setTimeout(() => { // 模拟效果
						if (page.num == 1) this.schedule = []; //如果是第一页需手动置空列表
						this.schedule = this.schedule.concat(curPageData); //追加新数据
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
	.worklist{
		padding: 30rpx 0;
		display: flex;
		justify-content: space-between;
		border-bottom: 1rpx solid rgb(245,245,245);
	}
</style>
