<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view class="head">
			<view class="news-li1">
				<view>
					<image :src="teacherInfo.avatar" mode="aspectFill" class="news-liimg1"></image>
				</view>
				<view class="new-content1">
					<view class="news-litesde1">
						<text>{{teacherInfo.name}}</text>
					</view>
					<view style="display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 2;overflow: hidden;margin-top: 30rpx;">
						<view class="tebqm1" v-for="(item,index) in teacherInfo.tagsList" :key='index'>
							{{item}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="padding: 20rpx 20rpx 20rpx 10rpx;display: flex;border-bottom: 20rpx solid rgb(242,242,248);">
			<view class="" style="margin:0 30rpx 0 60rpx;">
				<view class="pingfen">{{teacherInfo.star}}</view>
				<view class="statr">综合评分</view>
			</view>
			<view class="" style="padding-right: 60rpx;flex: 1;">
				<tui-rate :current="rateint" active="#ff7900" :hollow="true" :disabled="true" :score="ratepoint"></tui-rate>
				<view class="statr">共{{teacherInfo.evaluateNum}}条评价{{this.teacherInfo.star}}</view>
			</view>
			<view class="" style="padding-left: 80rpx;border-left: 1rpx solid rgb(240,240,242);height: 65rpx;padding-right: 30rpx;">
				<view class="statr">5.0</view>
				<view class="statr">满分</view>
			</view>
		</view>
		<view class="tabnawa">
			<text  :class="tabindex1==index? 'theme-color':'tabmei'" v-for="(item,index) in tabdata1" :key='index' @click="tabclick(index)">{{item}}</text>
		</view>
		<!-- 个人简介 -->
		<view class="" v-if="tabindex1==0" style="padding: 30rpx;">
			<view class="" v-html="strings">
				
			</view>
		</view>
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" v-if="tabindex1==1 || tabindex1==2">
			<!-- 在售课程 -->
			<view class="" v-if="tabindex1==1">
				<view class="fankas" v-for="item in corserbottemlist" :key='item.index' @click="classDetailbtn(item)">
					<view class="" style="display: flex;">
						<view class="fankas-type">{{item.subjectName}}</view>
						<view class="fankas-name" style="flex: 1;">{{item.name}}</view>
					</view>
					<view class="timedata" v-if="item.type!=3">
						<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
						<text>{{item.rangeDate}}</text>
					</view>
					<view class="typelistbox">
						<view class="typelist" v-for="item in item.tagsList">
							<text style="color:#F27F31;">{{item}}</text>
						</view>
					</view>
					<view class="" style="display: flex;margin-top: 25rpx;">
						<image :src="item.avatar" mode="aspectFill" style="width: 54rpx;height: 54rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
						<view class="home-techer">
							{{item.teacherName}}
						</view>
						<view class="allowed">名额紧张</view>
					</view>
				</view>
			</view>
			<!-- 用户评论 -->
			<view v-if="tabindex1==2" v-for="iten in evaluatedata"  style="padding: 35rpx 0;border-bottom: 1px solid rgba(238,238,238,1);">
				<view class="" style="display: flex;padding: 0 30rpx;">
					<view class="">
						<image :src="iten.avatar" mode="" style="width:85rpx;height:85rpx;border-radius:50%;"></image>
					</view>
					<view class="" style="flex: 1;">
						<view class="" style="display: flex;justify-content: space-between;">
							<view class="" style="margin-left: 25rpx;flex: 1;">
								<view class="pj-taitl" style="width: 100%;">
									{{iten.userName}}
								</view>
								<view class="pj-time">
									{{iten.createTime}}
								</view>
							</view>
							<view class="" style="margin-top: 20rpx;">
								<tui-rate style="margin-right: 10rpx" :current="iten.star" :disabled="true" active="#FFBD3D" :size="14"></tui-rate>
							</view>
						</view>
						<view class="pj-center">
							{{iten.content}}
						</view>
						<view class="" style="display: flex;flex-wrap: wrap;margin-left: 25rpx;">
							<view class="tagitem" v-for="tagitem in iten.tagsList">{{tagitem}}</view>
						</view>
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
				tabindex1:0,
				teacherid:'',//老师id
				strings:'',//简介
				tabdata1:['个人简介','在售课程','用户评价'],	
				teacherInfo:{},
				corserbottemlist:[],
				evaluatedata:[],
				stars:'3.8',
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
		computed:{
			rateint(){
				if(this.teacherInfo.star !=undefined){
					if(this.teacherInfo.star.length==1){
						return this.teacherInfo.star
					}else{
						let strid=this.teacherInfo.star.toString().slice(0,1)
						return parseInt(strid)+1
					}
				}
			},
			ratepoint(){
				if(this.teacherInfo.star !=undefined){
					let point=this.teacherInfo.star.toString().slice(2,3)
					return '0.' + parseInt(point)
				}
			}
		},
		onLoad(option) {
			this.teacherid=option.teacherid
			this.getById()
		},
		methods: {
			tabclick(index){//点击教师下直播课程评论触发
				this.tabindex1=index
				this.downCallback()
			},
			classDetailbtn(v){
				if(v.type ==3){  //type 1推荐课线上  2推荐课线下  3点播课
					uni.navigateTo({
						url:"./classDetails?Lessonid=" + v.id
					})
				}else{
					uni.navigateTo({
						url:"./referrerDetail?courseid=" + v.id
					})
				}
			},
			getById(){//老师详情
				this.api.getById(
					this.teacherid
				).then(res=>{
					console.log(res)
					this.teacherInfo=res.data
					this.teacherInfo.star=this.teacherInfo.star
					console.log(res.data.star)
					this.strings = res.data.introduction.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				if(this.tabindex1==1){
					this.saleCourse(page)
				}else if(this.tabindex1==2){
					this.teacherEvaluate(page)
				}
			},
			saleCourse(page){
				let params = {
					"userId":this.teacherid,//老师id
					current: page.num,
					size: page.size,
				}
				this.api.saleCourse(params)
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
			},
			teacherEvaluate(page){
				let params = {
					"userId":this.teacherid,//老师id
					current: page.num,
					size: page.size,
				}
				this.api.teacherEvaluate(params)
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
							if (page.num == 1) this.evaluatedata = []; //如果是第一页需手动置空列表
							this.evaluatedata = this.evaluatedata.concat(curPageData); //追加新数据
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
	.head {
		padding-top: 60rpx;
		background: #F27F31;
		border-bottom-right-radius:50%;
	  border-bottom-left-radius:50%;
	}
	.news-li1{
		box-sizing: border-box;
		margin-top: 50rpx;
		min-height:142rpx;
		max-height:192rpx;
		font-size: 32upx;
		display: flex;
		background-color: #fff;
		margin:  0 30rpx;
		padding:20rpx 0 50rpx 0;
		padding-left: 30rpx;
		box-shadow:0px 2px 10px 1px rgba(0, 0, 0, 0.1);
	}
	.news-liimg1{
		width:130rpx;
		height:130rpx;
		border-radius:50%;
		margin-right: 25rpx;
	}
	.new-content1{
		font-size: 28upx;
		margin-top: 5upx;
		margin-left: 20upx;
		color: #666;
		flex: 1;
	}
	.news-litesde1{
		flex: 1;
		font-size:34rpx;
		font-family:PingFang SC;
		font-weight:bold;
		display: flex;
		justify-content: space-between;
		color:rgba(51,51,51,1);
		margin-bottom: 4rpx;
		margin-top: 10rpx;
	}
	.tebqm1{
		  display: inline-block;
		  font-size:24rpx;
		  margin-right: 12rpx;
		  color:#999999;
		  padding: 5rpx 10rpx;
		  background:#EEEEEE;
		  border-radius:8rpx;
		  text-align: center;
	}
	.tabnawa{
		background: #FFFFFF;
		margin-top: 25rpx;
		display: flex;
		padding-top: 10rpx;
		padding-left: 66rpx;
		padding-right: 60rpx;
		justify-content: space-between;
		border-bottom: 1upx solid #eee;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
	}
	.theme-color{
		padding: 0 0 10rpx 0;
		font-size:32rpx;
		font-family:PingFang SC;
		border-bottom: 6rpx solid #F27F31;
		color: #F27F31;
	}
	.tabmei{
		font-size:32rpx;
		font-family:PingFang SC;
		color:#999999;
	}
	.attention{
		display: inline-block;
		width:110rpx;
		height:46rpx;
		background:rgba(242,127,49,1);
		border-radius:25px;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:40rpx;
		color:rgba(255,255,255,1);
		opacity:1;
		text-align: center;
		line-height: 46rpx;
		margin-right: 20rpx;
	}
	.statr{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		line-height:36rpx;
		color:rgba(204,204,204,1);
		opacity:1;
	}
	.pingfen{
		font-size:54rpx;
		font-family:DIN;
		font-weight:500;
		line-height:66rpx;
		color:rgba(242,127,49,1);
		opacity:1;
	}
	.pj-taitl{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin: 10rpx 0;
	}
	.pj-time{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.pj-center{
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin: 25rpx 0 25rpx 25rpx;
	}
	.tagitem{
		padding: 8rpx 15rpx;
		background:rgba(242,244,248,1);
		border-radius:10rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(153,153,153,1);
		opacity:1;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
	}
	.fankas{
		margin: 30rpx;
		padding: 30rpx;
		background:rgba(255,255,255,1);
		box-shadow:0px 0px 2px rgba(0,0,0,0.16);
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
	.allowed{
		width:101rpx;
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(249,153,69,1);
		opacity:1;
	}
</style>
