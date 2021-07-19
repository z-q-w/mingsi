<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view class="db-head">
			<view :class="coursedata=='科目' && gradedata=='年级' ? 'undbheaditem':'dbheaditem'" @click="headbtn(1)">
				<text>默认排序</text>
			</view>
			<view :class="gradedata=='年级' ? 'dbheaditem' : 'undbheaditem' " @click="headbtn(2)" style="display: inline;width: 130rpx;text-align: center;">
				<text>{{gradedata}}</text>
				<image src="../../../static/image/56.png" mode="" style="width: 15rpx;height: 8rpx;vertical-align: middle;margin: 0 10rpx;"></image>
			</view>
			<view :class="coursedata=='科目'? 'dbheaditem' : 'undbheaditem'" @click="headbtn(3)" style="display: inline;width: 130rpx;text-align: center;">
				<text >{{coursedata}}</text>
				<image src="../../../static/image/56.png" mode="" style="width: 15rpx;height: 8rpx;vertical-align: middle;margin: 0 10rpx;"></image>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="fankas" v-for="item in corserbottemlist" :key='item.index' @click="classDetailbtn(item)">
				<view class="" style="display: flex;">
					<view class="fankas-type">{{item.subjectName}}</view>
					<view class="fankas-name" style="flex: 1;">{{item.name}}</view>
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
					<view class="allowed">{{item.buyNumber}}购买</view>
				</view>
			</view>
		</mescroll-body>
		<tui-top-dropdown :show="dropShow" :paddingbtm="300" :translatey="90" @close="btnCloseDrop">
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
		<tui-top-dropdown :show="xueke" :paddingbtm="300" :translatey="90" @close="xuekeDrop">
			<scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
				<view class="" style="display: flex;flex-wrap:wrap;padding: 30rpx;">
					<view :class="kemulistindex==index?'kemu':'unkemu'" v-for="(item,index) in kemulist" @click="kemulistbtn(index,item)">{{item.name}}</view>
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
				subjectId:'',//学科id
				corserbottemlist:[],//列表数据
				contsimgid:'',//年级id
				kemulistindex:'369',
				kemulist:[],//科目
				classdata:[],//年级
				findsubject:'1',
				headlistindex:1,
				dropShow: false,
				xueke:false,
				gradedata:'年级',
				coursedata:'科目',
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				scrollTop: 0,
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
		onLoad(){
			this.subjectfindList()
			this.findListBySubjectIdGroupByGrade()
		},
		methods: {
			headbtn(v){
				console.log(v)
				if(v==1){
					this.headlistindex=0
					this.contsimgid=''
					this.subjectId=''
					this.gradedata='年级'
					this.coursedata='科目'
					this.kemulistindex=678
					this.dropShow = false
					this.xueke=false
					this.downCallback()
				}
				if(v==3){
					this.xueke=true
					this.dropShow = false;
				}
				if(v==2){
					this.dropShow = true;
					this.xueke=false
				}
			},
			findListBySubjectIdGroupByGrade(){  //查询年级
				// subjectId
				this.api.findListBySubjectIdGroupByGrade({
					subjectId:this.subjectId
				}).then(res=>{
					this.classdata=res.data
				})
			},
			subjectfindList(){ //查询科目下的所有科目
				this.api.subjectfindList({
					type:this.findsubject
				}).then(res=>{
					this.kemulist=res.data
				})
			},
			findListByGradeId(){ //根据年级id查科目
				this.api.findListByGradeId({
					gradeId:this.contsimgid
				}).then(res=>{
					this.kemulist=res.data
					console.log(res)
					
				})
			},
			kemulistbtn(index,v){//点击没一个学科
				this.headlistindex=3
				this.coursedata=v.name
				this.kemulistindex=index
				console.log(v)
				this.subjectId=v.id  //学科id
				this.xueke=false
				this.downCallback()
				this.findListBySubjectIdGroupByGrade()
			},
			contsimg(v){//点击没一个年级
				this.headlistindex=2
				this.gradedata=v.name
				console.log(v)
				this.contsimgid=v.id //年级id
				this.dropShow = false;
				this.downCallback()
				this.findListByGradeId()
			},
			xuekeDrop(){
				this.xueke=false
			},
			btnCloseDrop() {
				this.dropShow = false;
			},
			classDetailbtn(v){//课程详情
				uni.navigateTo({
					url:"./classDetails?Lessonid=" + v.id
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					isDefault: this.headlistindex,//默认排序
					current: page.num,
					size: page.size,
					gradeId:this.contsimgid,//年级id
					subjectId:this.subjectId,//科目id
					deptId:uni.getStorageSync('deptId')//机构id
				}
				this.api.demandCoursepage(params)
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

<style lang="less" scoped>
	/deep/.tui-top-dropdown{
		background: #FFFFFF !important;
	} 
	/deep/.tui-dropdown-box{
		background: #FFFFFF !important;
	} 
	/deep/.tui-dropdown-show{
		background: #FFFFFF !important;
	}
	.db-head{
		display: flex;
		border-bottom: 1rpx solid rgba(238,238,238,1);
		padding:30rpx 30rpx 20rpx 30rpx;
		position: sticky;
	    top: var(--window-top);
		z-index: 9999;
		background: #FFFFFF;
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
		font-size: 28rpx;
	}
	.fankas-name{
		width:330rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
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
	.typelistbox{
		margin-top: 25rpx;
		display: flex;
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
	.allowed{
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:#999999;
		opacity:1;
		text-align: right;
	}
	.tui-scroll-box {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
		font-size: 30rpx;
		word-break: break-all;
		height: 500rpx;
	}
	.contsgh{
		display: flex;
		flex-wrap:wrap
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
	.buclasd{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:42rpx;
		color:rgba(51,51,51,1);
		opacity:1;
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
