<template>
	<view>
		<view class="toubu" style="">
			<view :class="coursedata=='科目' && gradedata=='年级' ? 'undbheaditem':'dbheaditem'" @click="anheadbtn(3)">
				<text>默认排序</text>
			</view>
			<view :class="gradedata=='年级' ? 'dbheaditem' : 'undbheaditem' " @click="anheadbtn(1)">
				<text>{{gradedata}}</text>
				<image src="../../../static/image/56.png" mode="" style="width: 20rpx;height: 16rpx;margin: 4rpx 0 0 8rpx;"></image>
			</view>
			<view :class="coursedata=='科目'? 'dbheaditem' : 'undbheaditem'" @click="anheadbtn(2)">
				<text>{{coursedata}}</text>
				<image src="../../../static/image/56.png" mode="" style="width: 20rpx;height: 16rpx;margin: 4rpx 0 0 8rpx;"></image>
			</view>
		</view>
		<view class="">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="contentlist" v-for="item in contentlist" @click="contentdtals(item)">
					<view class="content-titel">
						{{item.question}}
					</view>
					<view class="content-contentL">
						{{item.describle}}
					</view>
					<view class="costst" v-if="item.pics !=''">
						<view class="" v-for="cost in item.pics" style="">
							<image :src="cost" mode="aspectFill" style="width:217rpx;height:163rpx;margin-right: 30rpx;"></image>
						</view>				
					</view>
					<view class="content-hd">
						<text style="color:#F27F31;margin-right: 20rpx;">{{item.userName}}</text>
						<text>{{item.answerNum}}回答</text>
					</view>
				</view>
			</mescroll-body>
		</view>
		<view class="quizzer" @click="quizzerbtn">
			提问
		</view>
		<!-- 年级 -->
		<tui-top-dropdown :show="dropShow" :paddingbtm="300" :translatey="78" @close="btnCloseDrop" style="background: #FFFFFF;">
			<scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
				<view class="" v-for="item in classdata" style="padding: 30rpx;">
					<view class="buclasd">
						{{item.name}}
					</view>
					<view class="contsgh">
						<view :class="contsimgid==conts.id?'contsghitem':'uncontsghitem'" v-for="(conts,index) in item.gradeResVOS" @click="contsimg(conts)">
							{{conts.name}}
						</view>
					</view>
				</view>
			</scroll-view>
		</tui-top-dropdown>
		<!-- 学科 -->
		<tui-top-dropdown :show="xueke" :paddingbtm="300" :translatey="78" :height='300' @close="xuekeDrop" style="background: #FFFFFF;">
			<scroll-view class="tui-scroll-box-xueke" scroll-y scroll-with-animation :scroll-top="scrollTop">
				<view class="" style="display: flex;flex-wrap:wrap;padding: 30rpx;">
					<view :class="kemulistindex===index?'kemu':'unkemu'" v-for="(item,index) in kemulist" @click="kemulistbtn(item,index)">{{item.name}}</view>
				</view>
			</scroll-view>
		</tui-top-dropdown>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				keyWord:'',//搜索
				scrollTop: 0,
				gradeid:'',//年级id
				gradedata:'年级',
				coursedata:'科目',
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
						tip: '~ 暂无数据 ~', // 提示
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
				findsubject:'1',
				kemulistindex:'',
				contsimgid:36,
				kemulist:[],
				classdata:[],
				dropShow: false,
				xueke:false,
				subjectId:'',
				contentlist:[],
				command:'',//控制是调用搜索词搜索,还是年级科目查询
			}
		},
		onNavigationBarSearchInputConfirmed(v){
			this.keyWord=v.text
			this.downCallback()
			this.command=false
		},
		onLoad() {
			this.findListBySubjectIdGroupByGrade()
			uni.$on('answer',(data)=>{
				console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.downCallback()
			})
			this.subjectfindList()
		},
		methods: {
			quizzerbtn(){//提问按钮
				uni.navigateTo({
					url:'./quizzerTw'
				})
			},
			//查询年级
			findListBySubjectIdGroupByGrade(){
				this.api.findListBySubjectIdGroupByGrade({
					subjectId:this.subjectId
				}).then(res=>{
					this.classdata=res.data
				})
			},
			// 查询所有科目
			subjectfindList(){
				this.api.subjectfindList({
					type:this.findsubject
				}).then(res=>{
					this.kemulist=res.data
				})
			},
			//根据年级查科目
			findListByGradeId(){
				this.api.findListByGradeId({
					gradeId:this.gradeid
				}).then(res=>{
					this.kemulist=res.data
					console.log(res)
				})
			},
			// 点击年级事件
			contsimg(v){
				console.log(v)
				this.gradeid=v.id
				this.gradedata=v.name
				this.contsimgid=v.id
				this.dropShow=false
				this.findListByGradeId()
				this.downCallback()
				
			},
			anheadbtn(v){
				this.keyWord=''
				// #ifdef APP-PLUS
				//清除原生导航栏的值
				// var pages = getCurrentPages();
				const currentWebview = this.$scope.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText('');
				// #endif
				
				if(v==2){
					this.command=true
					this.xueke=true
					this.dropShow = false;
				}
				if(v==1){
					this.command=true
					this.dropShow = true;
					this.xueke=false
				}
				if(v==3){
					this.command=false
					this.dropShow = false
					this.xueke=false
					this.gradedata='年级',
					this.kemulistindex='',
					this.coursedata='科目',
					this.contsimgid=''
					this.subjectId=''//科目Id
					this.gradeid=''//年级Id
					this.findListBySubjectIdGroupByGrade()
					this.subjectfindList()
					this.downCallback()
				}
			},
			
			kemulistbtn(v,inex){
				this.kemulistindex=inex
				this.subjectId=v.id
				this.coursedata=v.name
				this.xueke=false
				this.downCallback()
				this.findListBySubjectIdGroupByGrade()
			},
			contentdtals(v){//详情
				uni.navigateTo({
					url:'./answerDetals?questionsid=' + v.id
				})
			},
			btnCloseDrop() {
				this.dropShow = false;
			},
			xuekeDrop(){
				this.xueke=false
			},
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				if(this.command){
					this.selByGradeSub(page) //课程 年级搜索
				}else if(this.keyWord !=''){ //不等于空的时候才搜索
					this.secrchByWord(page) //关键字搜索
				}else{  //第一次进来默认加载是  //课程 年级搜索
					this.selByGradeSub(page) //课程 年级搜索
				}
			},
			selByGradeSub(page){
				let params = {
					subjectId:this.subjectId,//科目Id					gradeId:this.gradeid,//年级Id					size: page.size,					current: page.num
				}
				this.api.selByGradeSub(params).then((res)=>{
					console.log(res)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages;
					//设置列表数据
					setTimeout(() => { // 模拟效果
						if (page.num == 1) this.contentlist = []; //如果是第一页需手动置空列表
						this.contentlist = this.contentlist.concat(curPageData); //追加新数据
						this.contentlist.forEach(item=>{
							item.pics=item.pics.split(',')
						})
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
					}, 500)
					console.log(res)
				}).catch((err) => {
					this.mescroll.endErr()
				})
			},
			secrchByWord(page){
				this.api.secrchByWord({
					keyWord:this.keyWord,					size: page.size,
					current: page.num
				}).then(res=>{
					console.log(res)
					// 接口返回的当前页数据列表 (数组)
					let curPageData = res.data.records;
					// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
					let curPageLen = curPageData.length;
					// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
					let totalPage = res.pages;
					//设置列表数据
					setTimeout(() => { // 模拟效果
						if (page.num == 1) this.contentlist = []; //如果是第一页需手动置空列表
						this.contentlist = this.contentlist.concat(curPageData); //追加新数据
						this.contentlist.forEach(item=>{
							item.pics=item.pics.split(',')
						})
						// 请求成功,隐藏加载状态
						//方法一(推荐): 后台接口有返回列表的总页数 totalPage
						this.mescroll.endByPage(curPageLen, totalPage);
					}, 500)
					console.log(res)
				})
			}
		}
	}
</script>

<style>
	/deep/.tui-top-dropdown{
		background: #FFFFFF !important;
	} 
	/deep/.tui-dropdown-box{
		background: #FFFFFF !important;
	} 
	/deep/.tui-dropdown-show{
		background: #FFFFFF !important;
	}
	.contentlist{
		padding: 30rpx 10rpx 30rpx 30rpx;
		background: #FFFFFF;
		margin-bottom: 20rpx;
	}
	.content-titel{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.content-contentL{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(102,102,102,1);
		opacity:1;
		margin-right: 15rpx;
		margin-top: 20rpx;
	}
	.content-hd{
		font-size:25rpx;
		margin-top: 15rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:30rpx;
		opacity:1;
	}
	.costst{
		display: flex;
		justify-content: start;
		flex-wrap:nowrap;
		margin: 22rpx 0;
	}
	.quizzer{
		width:91rpx;
		height:66rpx;
		background:linear-gradient(180deg,rgba(242,148,34,1) 0%,rgba(242,111,61,1) 100%);
		opacity:1;
		border-radius:12rpx 12rpx 1rpx 12rpx;
		text-align: center;
		line-height: 66rpx;
		color: #FFFFFF;
		position: fixed;
		z-index: 99999;
		bottom: 100rpx;
		right: 40rpx;
	}
	.toubu{
		position: -webkit-sticky; 
		position: sticky;
		top: var(--window-top);
		z-index: 9999;
		background: #FFFFFF;
		padding: 20rpx 70rpx;
		display: flex;
		justify-content: space-between;
		color: #999999;
		border-bottom: 1rpx solid rgb(245,245,245);
	}
	.tui-scroll-box {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		font-size: 30rpx;
		word-break: break-all;
		height: 500rpx;
		background: #FFFFFF;
	}
	.tui-scroll-box-xueke{
		width: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		font-size: 30rpx;
		word-break: break-all;
		height: 300rpx;
		background: #FFFFFF;
	}
	.buclasd{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:42rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin-bottom: 30rpx;
	}
	.contsgh{
		display: flex;
		flex-wrap:wrap
	}
	.undbheaditem{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(242,127,49,1);
		opacity:1;
		margin-right: 30rpx;
	}
	.dbheaditem{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:40rpx;
		color:rgba(153,153,153,1);
		opacity:1;
		margin-right: 30rpx;
	}
	.contsghitem{
		height:58rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		padding: 0 38rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: #FFFFFF;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
	.uncontsghitem{
		height:58rpx;
		background:rgba(242,244,248,1);
		opacity:1;
		padding: 0 38rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: rgba(153,153,153,1);
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
	.kemu{
		height:58rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		padding: 0 38rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: #FFFFFF;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
	.unkemu{
		height:58rpx;
		background:rgba(242,244,248,1);
		opacity:1;
		padding: 0 38rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: rgba(153,153,153,1);
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
