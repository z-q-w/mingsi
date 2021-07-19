<template>
	<view>
		<swiper class="swiper" :autoplay="true" :interval="5000" :duration="500" :circular="true" :current="swiperCurrent" @change="changeSwiper">
			<swiper-item v-for="item in showPicture">
				 <image :src="item" mode="" style="width: 750rpx;height: 400rpx;"></image>
			</swiper-item>
		</swiper>
		<view class="" style="background: #FFFFFF;padding: 30rpx;margin-bottom: 20rpx;">
			<view class="cdmind">
				<text class="cdmind-name">{{datalist.name}}</text>
				<text class="cdmind-integral">¥{{datalist.price}}</text>
			</view>
			<view class="" style="display: flex;margin: 20rpx 0 25rpx 0;flex: 1;">
				<text class="taglistcss" v-for="item in datalist.taglist">
					{{item}}
				</text>
			</view>
			<!-- 老师 -->
			<view class="" style="display: flex;" @click="teacherbtn(datalist)">
				<image :src="datalist.avatar" mode="" style="width: 95rpx;height: 95rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
				<view class="" style="flex: 1;">
					<view class="teacher">
						<text>{{datalist.teacherName}}</text>
						<text style="font-weight: 500;color: #999999;font-size: 26rpx;">{{datalist.buyNumber}}人购买</text>
					</view>
					<view class="typelist" v-for="item in datalist.tagsList">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="background: #FFFFFF;">
			<view class="tablistL">
				<view :class="tablistLindex==index? 'tablistitem':'untablistitem'" v-for="(item,index) in tablistL" @click="tablistLbtn(index)">{{item}}</view>
			</view>
			<!-- 课程 -->
			<view class="" v-if="tablistLindex==0" style="min-height: 800rpx;padding: 30rpx;">
				<view class="" v-html="strings">
					
				</view>
				<view class="" v-if="strings==''">
					<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
				</view>
			</view>
			<!-- 课表 -->
			<view class="" style="padding: 10rpx 30rpx 0 30rpx;min-height: 800rpx;" v-if="tablistLindex==1">
				<view style="padding: 30rpx 0;display: flex;justify-content: space-between;" v-for="(item,index) in schedule" @click="videobtn(item,index)">
					<view class="" style="color:#797979;font-size:30rpx;">
						<!-- <text>第{{index+1}}讲:</text> -->
						<text>{{item.name}}</text>
					</view>
					<text style="font-size: 32rpx;color: #18D0A2;" v-if="item.isComplete==1">已完成</text>
					<text style="font-size: 32rpx;color: #CCCCCC;" v-if="item.isComplete==2">未完成</text>
				</view> 
				<view class="" style="margin-top: 30rpx;">
					<view class="" v-if="schedule==''">
						<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
					</view>
				</view>
			</view>
			<view class="" v-if="tablistLindex==2" style="min-height: 800rpx;">
				<mescroll-body ref="mescrollRef" :height="5" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
					<!-- 评论 -->
					<view  v-for="iten in evaluatedata"  style="padding: 35rpx 0;border-bottom: 1px solid rgba(238,238,238,1);">
						<view class="" style="display: flex;padding: 0 30rpx;">
							<view class="">
								<image :src="iten.avatar" mode="" style="width:85rpx;height:85rpx;border-radius:50%;"></image>
							</view>
							<view class="" style="flex: 1;">
								<view class="" style="display: flex;justify-content: space-between;">
									<view class="" style="margin-left: 25rpx;flex: 1;">
										<view class="pj-taitl">
											{{iten.nickname}}
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
								<view class="" style="display: flex;flex-wrap: wrap;margin-left: 18rpx;">
									<view class="tagitem" v-for="tagitem in iten.tagsList">{{tagitem}}</view>
								</view>
							</view>
						</view>
					</view>
				</mescroll-body>
			</view>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				swiperCurrent: 0,//控制轮播图的圆点
				Lessonid:'',//课程id
				ifgroup:'',
				datalist:{},
				showPicture:[],
				schedule:[],
				grouplist:[
					{
						image:'../../../static/image/58.png',
						name:'全村的希望',
						little:'差1人',
						time:'剩余:21:59:00',
					},
					{
						image:'../../../static/image/58.png',
						name:'全村的希望',
						little:'差1人',
						time:'剩余:21:59:00',
					},
					{
						image:'../../../static/image/58.png',
						name:'全村的希望',
						little:'差1人',
						time:'剩余:21:59:00',
					},
					{
						image:'../../../static/image/58.png',
						name:'全村的希望',
						little:'差1人',
						time:'剩余:21:59:00',
					}
				],
				evaluatedata:[],
				typelist:['初中语文','高中数学','寒暑假班'],
				tablistL:['课程','课表','评论'],
				tablistLindex:0,
				strings:'',//富文本
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
		onLoad(option) {
			this.Lessonid=option.Lessonid //课程id
			console.log(this.Lessonid,'/课程id')
			this.getById()
			uni.$on('Videoupdate',(data)=>{
				console.log('视频更新：' + data.msg);
				this.demandCourseCatalog()
			})
			
		},
		methods: {
			changeSwiper(e) {//控制轮播图圆点
				this.swiperCurrent = e.detail.current;
			},
			tablistLbtn(index){
				this.tablistLindex=index
			},
			teacherbtn(v){//跳老师详情
				uni.navigateTo({
					url:'../home/teacherDetal?teacherid=' + v.teacherId
				})
			},
			grouppage(){
				this.api.grouppage({
					demandCourseId:this.datalist.id,
					current:'1',
					size:'4'
				}).then(res=>{
					console.log(res)
				})
			},
			videobtn(v,index){  //点击每个课程
				if(v.delFlag==2){ //delFlag==1 代表正常  2 已删除  3禁用
					this.tui.toast('该课程已删除')
				}else{
					console.log(v)
					uni.navigateTo({ // name是每个课程名称  index是索引  courseId是课程id  courseCatalogId是目录id  second 记录播放时间
						url:'/pages/client/home/videosd?name=' + v.name + '&indexd=' + index + '&courseId=' + this.datalist.id + '&orderStatus=' + this.datalist.orderStatus + '&courseCatalogId=' + v.id + '&second=' + v.second,
					})
					uni.setStorageSync('videouil',v.url)
					uni.$emit('videouiluo',{msg:v.url})
				}
			},
			demandCourseCatalog(){//点播课的课表
				this.api.demandCourseCatalog({
					demandCourseId:this.datalist.id,
					current:'1',
					size:'100'
				}).then(res=>{
					this.schedule=res.data.records
					console.log(res.data,'点播课的课表')
				})
			},
			getById(){ //课程详情
			const sd=JSON.stringify(this.Lessonid)
				this.api.demandCoursedetail(
						sd
					).then(res=>{
					console.log(res)
					this.datalist=res.data
					this.showPicture=this.datalist.showPicture.split(",")
					this.strings = this.datalist.details.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
					this.grouppage()//获取拼团列表
					this.demandCourseCatalog()//获取点播课的课程
				})
				console.log(this.datalist,'jhijhggh')
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					courseId: this.datalist.id,
					current: page.num,
					size: page.size,
					type:'2'
				}
				this.api.evaluation(params)
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
	.goosdetalis{
		height: 390rpx;
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
		color:rgba(153,153,153,1);
		background:rgba(242,244,248,1);
	}
	.cdmind{
		display: flex;
		justify-content: space-between;
	}
	.cdmind-name{
		font-size:33rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:45rpx;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.cdmind-integral{
		font-size:33rpx;
		font-family:DIN;
		font-weight:500;
		line-height:39rpx;
		color:rgba(249,58,58,1);
		opacity:1;
	}
	.cdmind-starttime{
		font-size:27rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.tablistL{
		display: flex;
		justify-content: space-between;
		padding: 30rpx 80rpx 0rpx 80rpx;
		background: #FFFFFF;
	}
	.tablistitem{
		padding-bottom: 20rpx;
		border-bottom: 5rpx solid #F27F31;
		color: #F27F31;
		font-size:29rpx;
	}
	.untablistitem{
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:40rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.teacher{
		display: flex;
		justify-content: space-between;
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		padding-bottom: 10rpx;
	}
	.group-name{
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		margin: auto 0 auto 20rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		flex: 1;
	}
	.group-little{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(102,102,102,1);
		opacity:1;
	}
	.group-time{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:30rpx;
		color:rgba(153,153,153,1);
		opacity:1;
	}
	.group-btn{
		width:115rpx;
		height:47rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:10rpx;
		text-align: center;
		color: #FFFFFF;
		line-height: 47rpx;
		font-size:25rpx;
		margin:  auto 0 auto 20rpx;
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
	.kc-gopay{
		height:72rpx;
		background:rgba(255,190,90,1);
		border-radius:36rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 72rpx;
		margin-right: 20rpx;
		width: 100%;
	}
	.kc-pin{
		width:296rpx;
		height:72rpx;
		background:#F27F31;
		border-radius:36rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 72rpx;
	}
	.kc-falxe{
		position: fixed;
		bottom: 0;
		background: #FFFFFF;
		width: 750rpx;
		padding: 10rpx 0;
	}
	.scroll-Y{
		height: 600rpx;
		padding: 0rpx 30rpx;
		box-sizing: border-box;
	}
	.group{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:80rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		text-align: center;
		border-bottom: 1rpx solid rgb(234,234,234);
	}
	.addgroup{
		width:595rpx;
		height:91rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		border-radius:12rpx;
		text-align: center;
		line-height: 91rpx;
		color: #FFFFFF;
		font-size: 32rpx;
	}
	.residueTime{
		font-size:28rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(102,102,102,1);
		opacity:1;
		margin-bottom: 32rpx;
		margin-top: 12rpx;
		text-align: center;
	}
	.taglistcss{
		color: #999999;
		font-size: 26rpx;
		display: inline-block;
		text-align: center;
		padding-right: 20rpx;
		border-right: 2rpx solid #999999;
		line-height: 26rpx;
		padding-left: 20rpx;
	}
	.taglistcss:last-child{
		border-right:0rpx;
	}
	.taglistcss:first-child{
		padding-left: 0rpx;
	}
	.swiper {
		width: 100%;
		height: 400rpx;
	}
</style>
