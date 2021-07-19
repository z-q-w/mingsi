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
			<view class="" style="display: flex;margin-top: 20rpx">
				<image src="../../../static/image/7.png" mode="" style="width:30rpx;height:30rpx;margin:2rpx 10rpx 0 0"></image>
				<view class="cdmind-starttime">{{datalist.rangeDate}}</view>
				<view class="cdmind-starttime" style="margin-left: 30rpx;">课时:{{datalist.hours}}</view>
			</view>
			<view class="" style="margin-bottom: 20rpx;">
				<text class="cdmind-starttime">班级人数:{{datalist.classUserNumber}}人/班</text>
			</view>
			<!-- 老师 -->
			<view class="" style="display: flex;" @click="teacherbtn(datalist)">
				<image :src="datalist.avatar" mode="" style="width: 95rpx;height: 95rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
				<view class="" style="flex: 1;">
					<view class="teacher">{{datalist.teacherName}}</view>
					<view class="typelist" v-for="item in datalist.tagsList">
						<text>{{item}}</text>
					</view>
				</view> 
				<view class="cdmind-starttime" style="margin: auto 0;">
					{{datalist.buyNumber}}人购买
				</view>
				
			</view>
		</view>
		<view class="" style="background: #FFFFFF;">
			<view class="tablistL">
				<view :class="tablistLindex==index? 'tablistitem':'untablistitem'" v-for="(item,index) in tablistL" @click="tablistLbtn(index)">{{item}}</view>
			</view>
			<!-- 课程 -->
			<view class="" style="padding: 30rpx;min-height: 750rpx;" v-if="tablistLindex==0">
				<view class="" v-html="strings">
					
				</view>
				<view class="" v-if="strings==''">
					<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
				</view>
			</view>
			<!-- 课表 -->
			<view class="" style="padding: 0 30rpx;min-height: 750rpx;" v-if="tablistLindex==1" >
				<view style="padding: 25rpx 0;display: flex;justify-content: space-between;" v-for="(item,index) in schedule" @click="livelook(false,item)" >
					<view style="display: flex;width: 690rpx;">
						<view class="" style="color:rgba(51,51,51,1);font-size: 30rpx;flex: 1;">
							<text style="">{{item.name}}</text>
						</view>
						<view class="" v-if="item.isType==2">
							<text style="font-size: 29rpx;color: #CCCCCC;" v-if="item.isComplete==0">未开始</text>
							<text style="font-size: 29rpx;color: #18D0A2;" v-if="item.isComplete==1">直播中</text>
							<text style="font-size: 29rpx;color: #18D0A2;" v-if="item.isComplete==2">看回放</text>
						</view>
						<view class="" v-if="item.isType==1">
							<text style="font-size: 29rpx;color: #18D0A2;">去机构学习</text> 
						</view>
					</view>
				</view>
				<view class="" style="margin-top: 30rpx;">
					<view class="" v-if="schedule.length==0">
						<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
					</view>
				</view>
			</view>
			<view class="">
				<mescroll-body ref="mescrollRef" :up="upOption" :height="800" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback" v-if="tablistLindex==2">
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
		<uni-popup ref="playback" type="dialog">
			<view class="" style="width: 690rpx;background: #FFFFFF;border-radius: 12rpx;box-sizing: border-box;">
				<view class="" style="text-align: center;padding-top: 30rpx;height: 140rpx;background: #F27F31;border-top-left-radius: 12rpx;border-top-right-radius: 12rpx;">
					<text style="font-weight: bold;color:rgb(147, 107, 26);opacity: 0.4;">——————</text>
					<text style="color: #FFFFFF;font-weight:bold;max-width: 300rpx;display: inline-block;margin: 0 30rpx;font-size: 34rpx;">看回放</text>
					<text style="font-weight: bold;color:rgb(147, 107, 26);opacity: 0.4;">——————</text>
					<view class="" style="margin-top: 16rpx;font-weight: bold;color: #FFFFFF;font-size: 38rpx;">
						{{datalist.name}}
					</view>
				</view>
				<scroll-view class="scroll-view_H" scroll-y="true">
					<view class="" v-for="item in roomVideoList" style="font-size: 30rpx;padding: 30rpx;">
						<a :href="item.playUrl" style="display: flex;">
							<image src="../../../static/image/shiping.png" mode="" style="width: 44rpx;height: 44rpx;vertical-align: -22%;margin-right: 20rpx;"></image>
							<text class="" style="flex: 1;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;">
								{{item.name}}
							</text>
							<text style="color: #999999;">
								{{item.createTime}}
							</text>
						</a>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				swiperCurrent: 0,//控制轮播图的圆点
				mycourseid:'',//课程id
				showPicture:[],
				datalist:{},
				strings:"",
				roomVideoList:'',
				schedule:[
					{
						name:'呼兰河传总结、习题课',
						type:1
					},
					{
						name:'呼兰河传总结、习题课',
						type:2
					},
				],
				evaluatedata:[],
				typelist:['初中语文','高中数学','寒暑假班'],
				tablistL:['课程','课表','评论'],
				tablistLindex:0,
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
			this.mycourseid=option.mycourseid
			this.getById()
			this.courseCatalog()
		},
		methods: {
			changeSwiper(e) {//控制轮播图圆点
				this.swiperCurrent = e.detail.current;
			},
			fastexchange(){
				uni.navigateTo({
					url:'./sureOrder'
				})
			},
			livelook(falsed,v){
				if(v.delFlag==2){ //delFlag==1 代表正常  2 已删除  3禁用
					this.tui.toast('该课程已删除')
				}else{
					if(v.isType==2){ //type==2 线上 代表是直播课
						if(v.isComplete==0){ //0未开始  1直播中  2看回放
							
						}else if(v.isComplete==1){
							this.getAppUrl(falsed,v) 
						}else if(v.isComplete==2){
							this.roomVideoList=v.roomVideoList
							this.roomVideoList.forEach(itme=>{
								itme.createTime=itme.createTime.substring(0,10)
							})
							this.$refs.playback.open()
						}
					}else{ //==1 代表线下
						this.tui.toast('快去机构学习吧!')
					}
				}
			},
			getAppUrl(isLive, query) {
			    var params = {};
			    // 通过参加码进入
			    if (query.code) {
			        params.joinCode = query.code;
			        params.userName = query.userName;
			        params.userType = query.userType;
			        //如果为分组直播，请传入分组号，非分组直播则不用传此参数
			        // params.group_id = query.group_id;
			       // 如果您拥有个性域名，需要传入个性域名，没有则不用传值，不参与签名计算
			        // params.privateDomain = 'xxx';
			        // 教室类型，不传默认大班课，班级类型参考服务端班级类型，不参与签名计算
			       params.classType = query.classType;   
			    }
			    // 通过 sign 进入
			    else {
			        params.roomId = query.roomId;
			        params.userNumber = query.userNumber;
			        params.userName = query.userName;
			        params.userType = query.userType; 
			        params.userAvatar = query.userAvatar;
			        // 签名计算参数参考直播进教室签名计算文档，参数名一般使用下划线格式
			        params.sign = query.sign;
			        //如果为分组直播，请传入分组号，非分组直播则不用传此参数
			        // params.group_id = query.group_id;
			        // 如果您拥有专属域名，需要传入专属域名，没有则不用传值，不参与签名计算
			        // params.privateDomain = 'xxx';
			        // 教室类型，不传默认大班课，班级类型参考服务端班级类型，不参与签名计算
			        params.classType = query.classType;   
			    } 
			    if (isLive) { 
					console.log('lkgjsdlkfjs') 
			        // 云端直播 app
			        return 'bjlivemeeting://room.join?joinCode=' + params.joinCode + '&userName=' + params.userName + '&userType=' +  params.userType + '&classType=' + params.classType;
			    } else {
					if (plus.os.name == "Android") { //安卓
						if (plus.runtime.isApplicationExist({ //查看安卓系统手机有没有下载这款app
								pname: 'com.baijia.live',  //B款app云打包的包名 
							})) { //安装了app  
								plus.runtime.openURL( 'bjhlliveapp://room.join?joinCode=' + params.joinCode + '&userName=' + params.userName + '&userType=' +  params.userType + '&classType=' + params.classType + '&privateDomain=e87766440', function(res) {  
									console.log(res);  
								});  
						}else { //未安装app
							uni.showModal({
								title: '提示',
								content: '您还没有此APP,去下载',
								success: function (res) {
									if (res.confirm) {
										plus.runtime.openURL('https://a.app.qq.com/o/simple.jsp?pkgname=com.baijia.live', function(res) { //打开应用宝 让应用宝下载app
										//进入后台小哥哥给我的appStore下载app链接，，让你们后台给你
										//这链接会判断你手机是ios还是Android，ios进入应用宝下载app
										//跟上面的是一个链接
											console.log(res);
							            });
							        } else if (res.cancel) {
										console.log('用户点击取消');
							        }
							    }
							});
						} 
					} else if (plus.os.name == "iOS") { //苹果
					//因为ios查不到B款app在ios系统手机里面，其实下载了，也是检测不到，所以就不检测了
					//直接打开B款app，B款app没有的话，会进入回调报错，我们在回调去打开下载链接
						plus.runtime.launchApplication({
							action: 'bjhlliveapp://room.join?joinCode=' + params.joinCode + '&userName=' + params.userName + '&userType=' +  params.userType + '&classType=' + params.classType + '&privateDomain=e87766440'
						}, function(e) {
							uni.showModal({
							    title: '提示',
							    content: '您还没有此APP,去下载',
							    success: function (res) {
							        if (res.confirm) {
							            plus.runtime.openURL('https://a.app.qq.com/o/simple.jsp?pkgname=com.baijia.live', function(res) {//打开应用宝 让应用宝下载app
							             //进入后台小哥哥给我的appStore下载app链接，，让你们后台给你
							             //这链接会判断你手机是ios还是Android，ios进入应用宝下载app
							             //跟上面的是一个链接
							            	console.log(res);
							            });
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						});
					}
			    }
			},
			teacherbtn(v){//跳老师详情
				uni.navigateTo({
					url:'../home/teacherDetal?teacherid=' + v.teacherId
				})
			},
			tablistLbtn(index){
				this.tablistLindex=index
				if(index==2){
					this.downCallback()
				}
			},
			getById(){
				this.api.coursedetail(
					this.mycourseid
				).then(res=>{
					console.log(res)
					this.datalist=res.data
					this.showPicture=this.datalist.showPicture.split(",")
					this.strings = this.datalist.details.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
					console.log(this.showPicture)
				})
				console.log(this.datalist,'jhijhggh')
			},
			courseCatalog(){ //非点播课  只有分完班才会有课表
				this.api.courseCatalog({
					courseId:this.mycourseid,
					size:'200',
					current:'1'
				}).then(res=>{
					this.schedule=res.data.records
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					courseId: this.mycourseid,
					current: page.num,
					size: page.size,
					type:'1'
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
		height: 500rpx;
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
	.scroll-view_H{
		max-height: 400rpx;
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
		font-size:30rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		padding-bottom: 10rpx;
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
	.swiper {
		width: 100%;
		height: 400rpx;
	}
	a {
	    text-decoration: none;
	}
	/*正常的未被访问过的链接*/
	a:link {
	    text-decoration: none;
	}
	/*已经访问过的链接*/
	a:visited {
	    text-decoration: none;
	}
	/*鼠标划过(停留)的链接*/
	a:hover {
	    text-decoration: none;
	}
	/* 正在点击的链接*/
	a:active {
	    text-decoration: none;
	}
	a{
		 color: inherit
	}
</style>
