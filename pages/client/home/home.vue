<template>
	<view style="background: #FFFFFF;min-height: 100%;">
		<view class="ttop">
			<view class="status_bar"></view>
			<view class="zindex">
				<view class="location" style="" @click="locationDone">
					<image src="../../../static/image/1.png" mode="" style="width:30rpx;height:40rpx;"></image>
					<view class="civic">{{citydata}}</view>
				</view>
				<view class="topsearch" @click="topsearchBtn">
					<image src="../../../static/image/2.png" mode="" style="width:33rpx;height:33rpx;"></image>
					<text style="margin-left: 10rpx;font-size: 29rpx;">搜索课程名称</text>
				</view>
				<view class="" @tap="searchs" style="display: flex;justify-content: flex-end;width:10%;padding-bottom: 4rpx;">
					<image src="../../../static/image/3.png" mode="" style="width:46rpx;height:42rpx;color: #FFFFFF;margin-top: 15rpx;"></image>
					<text class="xiaoxi" v-if="numberMessages!=0 && cacheHelper.isLogin()">{{numberMessages}}</text>
				</view>
			</view>
		</view>
		<view class="banner" style="">
			<swiper class="swiper" circular :autoplay="true" :interval="5000" :duration="500" :circular="true" :current="swiperCurrent" @change="changeSwiper">
				<swiper-item v-for="item in swiperImg" :key="item.id" @tap="bannersd(item)">
					 <jy-image :src="item.picture" placeholder="../../../static/image/zwt.jpeg" class="swiper-item" :lazy-load="true"></jy-image>
				</swiper-item>
			</swiper>
			<!-- 轮播指示点样式修改 -->
			<view class="dots">
				<block v-for="(item,index) in swiperImg.length" :key="item">
					<view class="dot" :class="index==swiperCurrent ? ' active' : ''"></view>
				</block>
			</view>
		</view>
		<view class="" style="margin: 30rpx;justify-content: space-between;display: flex;">
			<image @click="dibblebtn" src="../../../static/image/424c016dfeba4ea856d58b52fb903ea.png" mode="" class="tesreport"></image>
			<image @click="appraisal" src="../../../static/image/f36c23ca144a89fea63bfdf2011b59b.png" mode="" class="tesreport"></image>
		</view>
		<view class="recommend" style="">
			推荐课程
		</view>
		<view class="discipline"> 
			<view class="moldtype">科目</view>
			<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" show-scrollbar="false">
				<text :class="tabdataindex==item.name ? 'discipline-color' : 'discipline-tabmei'" v-for="(item, index) in tabdata" :key="index" @click="tabclick(item, index)">
				   {{ item.name }}
				</text>
			</scroll-view>
		</view>
		<view class="discipline">
			<view class="moldtype">年级</view>
			 <scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" show-scrollbar="false">
				  <text :class="gradeindex==item.name ? 'discipline-color' : 'discipline-tabmei'" v-for="(item, index) in tabdata2" :key="index" @click="tabclick2(item, index)">
				   {{ item.name }}
				  </text>
			 </scroll-view>
		</view>
		<view class="typeline">
			<text class="moldtype">类型</text>
			<view class="scroll-view_H">
				<text :class="typeindex==index ? 'discipline-color' : 'discipline-tabmei'" v-for="(item, index) in tabdata3" :key="index" @click="tabclick3(item, index)">
					{{ item.name }}
				</text>
			</view>
		</view>
		<mescroll-body ref="mescrollRef" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="fankas" v-for="item in corserbottemlist" :key='item.index' @click="referrerBtn(item)">
				<view class="" style="display: flex;">
					<view class="fankas-type">{{item.subjectName}}</view>
					<view class="fankas-name" style="flex: 1;">{{item.name}}</view>
					<view class="allowed">{{item.tags}}</view>
				</view>
				<view class="timedata">
					<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
					<text>{{item.rangeDate}}</text>
				</view>
				<view class="typelistbox">
					<view class="typelist" v-for="item in item.typelist">
						<text style="color:#F27F31;">{{item}}</text>
					</view>
				</view>
				<view class="unmbuy">
					{{item.buyNumber}}人购买
				</view>
				<view class="" style="display: flex;">
					<image :src="item.avatar" mode="aspectFill" style="width: 54rpx;height: 54rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
					<view class="home-techer">
						{{item.teacherName}}
					</view>
					<view class="home-baobtn">
						立即购买
					</view>
				</view>
			</view>
		</mescroll-body>
		<tui-modal :show="show" :custom="true" width="90%" radius="20rpx" class="team" padding="0 0">
			<view class="" style="">
				<view class="teams">
					<view class="" style="margin-top: 24rpx;">填写资料</view>
					<text class="cancel" @click="cancel">取消</text>
				</view>
				<view class="" style="padding: 30rpx 40rpx;border-bottom: 1rpx solid #f9f9f9;">
					<input type="text" v-model="springname" placeholder="请输入姓名" />
				</view>
				<view class="" style="padding: 30rpx 40rpx;border-bottom: 1rpx solid #f9f9f9;">
					<input type="text" v-model="springschool" placeholder="请输入所在学校" />
				</view>
				<view class="" @click="classbtn" style="padding: 30rpx 40rpx;border-bottom: 1rpx solid #f9f9f9;display: flex;justify-content: space-between;">
					<input type="text" disabled=true value="" v-model="springgrade" placeholder="请选择年级" />
				</view>
				<scroll-view  style="padding: 10rpx 40rpx 30rpx 40rpx;white-space: nowrap;width:88%;" scroll-x="true" @scroll="scroll" show-scrollbar="false">
					<text :class="springgrade==item.name ? 'discipline-color' : 'discipline-tabmei'" v-for="(item, index) in springdata" :key="index" @click="Selectgrade(item)">
					   {{ item.name }}
					</text>
				</scroll-view>
				<view class="" style="padding: 10rpx 40rpx;color:#CC3333;">
					{{remindertan}}
				</view>
				<view class="" @click="springsubmit" style="width: 90%;height: 80rpx;border-radius: 12rpx;line-height: 80rpx;text-align: center;background:rgba(242,127,49,1);color: #FFFFFF;margin: 30rpx auto;">
					提交
				</view>
			</view>
		</tui-modal>
		<!-- 下载进度 -->
		<view class="load" >
			<vus-sphere-progress :percent="percent" v-show="download"></vus-sphere-progress>
		</view>
		<!-- ios弹窗 -->
		<view class="iosload" v-if="showLoad == true">
			<view class="iosload_cont">
				<view class="load_pic">
					<image class="load_img" src="../../../static/image/zuiloglo.png" mode=""></image>
				</view>
				<view class="load_txt">名思教育温馨提示您：有新的版本可供下载，请到App Store进行更新～</view>
				<view class="load_btn" @tap="cliclkLoad">知道了</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vusSphereProgress from '@/components/vus-sphere-progress/vus-sphere-progress.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		components: {
			vusSphereProgress
		}, 
		data() {
			return {
				corserbottemlist:[],
				springgrade:'',//弹 年级
				springschool:"",//弹 学校
				springname:"",//弹 姓名
				remindertan:"",
				showLoad: false,
				curr_version: '',//版本号
				server_version:'',//后台获取的版本号
				downloadApkUrl:'',//下载地址
				platformType:'' ,// 手机型号
				download:false,//控制是否显示
				percent: 0,
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
				},
				classshow:false,
				findsubject:1,
				upOption: {
					auto: false, // 不自动加载
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
				swiperCurrent: 0,//控制轮播图的圆点
				tabdataindex:'全部',//控制上
				gradeindex:'全部',//控制下
				typeindex:0,//控制类型线上线下
				tabdata:'',//保存科目的数据
				subjectId:'',//科目的id
				show:false,
				springdata:'',//弹窗填写真实信息(姓名 学校 年级) 的数据
				gradeId:'',//年级id
				citydata:'',//当前城市,选择城市
				deptId:'',//机构id
				numberMessages:'',//消息数量
				tabdata2:[],
				tabdata3:[
					{
						name:'全部',
						type:''
					},
					{
						name:'线上',
						type:'2'
					},
					{
						name:'线下',
						type:'1'
					},
				],
				swiperImg:[],
				online:'',//线上线下type
			}
		},
		onLoad() {
			this.position()   
			this.bannerhome() //获取轮播图数据
			this.subjectfindList() //查询科目全部科目
			this.orientation() //获取当前位置
			this.gradefindList()//查询年级
			// #ifdef APP-PLUS
			this.getVersion()
			// #endif
			
			uni.$on('upaddress',(data)=>{
				this.citydata=data.mag
				this.position()
			})
			uni.$on('quitempyt',(data)=>{  //这里退出登录清空消息数量
				this.numberMessages=''
			})
			if(this.cacheHelper.isLogin()){
				this.getNews()
			}
			uni.$on('readmessage',(data)=>{
				this.getNews() 
			})
		},
		onShow() {
			let jigou=JSON.stringify(this.deptId)
			if(jigou==''){
				this.position()
			}
			if(this.cacheHelper.isLogin()){
				this.windowPops()
			}
			console.log(uni.getStorageSync('windowPops'))
		},
		methods: {
			orientation(){ //获取当前位置
				uni.getLocation({
					geocode:true,
				    success:(res)=> {
						this.citydata=res.address.city.slice(0,-1)
						console.log(this.citydata,'当前的市fffff')
						this.position()
						this.downCallback()
				    } 
				});
			},
			windowPops(){
				this.show=uni.getStorageSync('windowPops')==undefined || uni.getStorageSync('windowPops')=='' ? false : uni.getStorageSync('windowPops');
				if(this.show){
					this.api.gradefindList().then(res=>{
						this.springdata=res.data
					})
				}
			},
			springsubmit(){ //弹窗提交按钮
				if(this.springname==''){
					this.remindertan='请输入名字'
				}else if(this.springschool==''){
					this.remindertan='请输入学校'
				}else if(this.springgrade==''){
					this.remindertan='请选择年级'
				}else{
					this.remindertan=''
					this.api.fillInTrueInfo({
						"name":this.springname,
						"school":this.springschool,
						"grade":this.springgrade
					}).then(res=>{
						this.show = false
						uni.setStorageSync('windowPops',false)
						this.cacheHelper.updateUserInfo()
						setTimeout(()=>{
							this.tui.toast('设置成功')
						},500)
					})
				}
			},
			cancel() {
				this.show = false
				uni.setStorageSync('windowPops',false)
			},
			classbtn(){
				this.classshow=true
			},
			Selectgrade(v){
				this.classshow=false
				this.springgrade=v.name
			},
			position(){//传城市获取机构的
				this.api.position(
					JSON.stringify(this.citydata)
				).then(res=>{
					this.deptId=res.data.deptId
					this.citydata=res.data.cityName
					const deptIddata=JSON.stringify(this.deptId)
					console.log(this.deptId,'传城市名称获取机构的id')
					uni.setStorageSync('deptId', this.deptId);
					uni.setStorageSync('deptIddata', deptIddata);
					this.downCallback()
				})
			},
			tabclick(item, index) {//控制1 科目
				this.tabdataindex=item.name
				this.subjectId=item.id
				console.log(index)
				if(index==0){
					this.gradefindList()
				}else{
					this.findListBySubjectId()
				}
				this.downCallback()
			},
			tabclick2(item, index) {//控制2
				this.gradeindex=item.name
				this.gradeId=item.id
				if(item.name=='全部'){
					this.subjectfindList() //查询科目全部科目
				}else{
					this.findListByGradeId() //根据年级查科目
				}
				this.downCallback()
			},
			tabclick3(item, index){//控制3
				this.typeindex=index
				this.online=item.type
				this.downCallback()
			},
			getNews(){//获取消息数量
				this.api.homemessage().then(res=>{
					let num1 = JSON.stringify(res.data.sysMessage) == "{}" ? 0 : res.data.sysMessage.count
					let num2 = JSON.stringify(res.data.orderMessage) == "{}" ? 0 : res.data.orderMessage.count
					let value = num1+ num2
					this.numberMessages= value>99 ? '99+' : value
					console.log(res,'消息数量')
				})
			},
			// 查询科目
			subjectfindList(){
				this.api.subjectfindList({
					type:this.findsubject
				}).then(res=>{
					this.tabdata=res.data
					this.tabdata.unshift({
						name:'全部',
						id:''
					})
				})
			},
			//根据科目查年级
			findListBySubjectId(){
				this.api.findListBySubjectId({
					subjectId:this.subjectId
				}).then(res=>{
					console.log(res)
					this.tabdata2=res.data
					this.tabdata2.unshift({
						name:'全部',
						id:''
					})
				})
			},
			//年级列表
			gradefindList(){
				this.api.gradefindList().then(res=>{
					this.tabdata2=res.data
					this.tabdata2.unshift({
						name:'全部',
						id:''
					})
					// this.findListByGradeId()
				})
			},
			//根据年级查科目
			findListByGradeId(){
				this.api.findListByGradeId({
					gradeId:this.gradeId
				}).then(res=>{
					this.tabdata=res.data
					this.tabdata.unshift({
						name:'全部',
						id:''
					})
					console.log(res)
				})
			},
			changeSwiper(e) {//控制轮播图圆点
				this.swiperCurrent = e.detail.current;
			},
			bannerhome(){//首页的轮播图
				this.api.bannerhome().then(res=>{
					console.log(res)
					this.swiperImg=res.data
					console.log(this.swiperImg)
				})
			},
			cliclkLoad:function(){
				this.showLoad = false
			},
			getVersion: function() {//  版本版本///////////////////////////////版本版本版本版本
				let that = this;
				//  获取当前版本号
				that.curr_version = plus.runtime.version
				console.log(that.curr_version, "获取版本号")
				uni.getSystemInfo({ //获取手机型号
					success: function(res) {
						that.platformType = res.platform;
					}
				})
				that.api.isUpgrade().then(res=>{
					console.log(res,"版本号")
					this.server_version = res.data.version
					console.log(this.server_version,'后台获取的版本号')
					this.downloadApkUrl=res.data.url //这个是下载地址
					that.checkVersionToLoadUpdate()
				})
			},
			/**
			 * 进行版本型号的比对 以及下载更新请求
			 * @param {Object} server_version 服务器最新 应用版本号
			 * @param {Object} curr_version 当前应用版本号
			 */
			checkVersionToLoadUpdate: function() {
				let that = this;
				console.log(that.platformType, "测试版本号")
				console.log(that.server_version > that.curr_version, "判断")
				if (that.server_version > that.curr_version) {//如果当前版本小于后台返回的版本就更新
					if (that.platformType == 'android') {
						//TODO 此处判断是否为 WIFI连接状态
						if (plus.networkinfo.getCurrentType() != 3) {
							uni.showToast({
								title: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新',
								mask: true,
								duration: 5000,
								icon: "none"
							});
							return;
						} else {
							uni.showModal({
								title: "版本更新",
								content: '有新的版本发布，检测到您当前为Wifi连接，是否立即进行新版本下载？',
								confirmText: '立即更新',
								cancelText: '稍后进行',
								success: function(res) {
									if (res.confirm) {
										console.log(res.confirm, "点击了confirm")
										uni.showToast({
											icon: "none",
											mask: true,
											title: '有新的版本发布，检测到您目前为Wifi连接，程序已启动自动更新。新版本下载完成后将自动弹出安装程序',
											duration: 5000,
										});
										//设置 最新版本apk的下载链接
										var dtask = plus.downloader.createDownload(that.downloadApkUrl, {}, function(d, status) {
											console.log(d)
											// 下载完成  
											if (status == 200) {
												plus.runtime.install(plus.io.convertLocalFileSystemURL(d.filename), {}, {}, function(error) {
													uni.showToast({
														title: '安装失败',
														icon: "none",
														duration: 1500
													});
												})
											} else {
												uni.showToast({
													title: '更新失败',
													duration: 1500
												});
											}
										});
										dtask.addEventListener("statechanged", (task) => {
											console.log(task.state)
											switch (task.state) {
												case 1:
													console.log('开始下载');
													that.download = true
													console.log(that.download,this.download)
													break;
												case 2:
													console.log('链接到服务器...');
													that.download = true
													console.log(that.download,this.download)
													break;
												case 3:
													let progressVal = 0; //写成局部变量试试
													progressVal = (task.downloadedSize / task.totalSize) * 100;
													that.percent = parseInt(progressVal)
													console.log(percent)
													break;
												case 4:
													cnosole.log('监听下载完成');
													that.download = false
													break;
											}
										}, false);
										dtask.start();
									} else if (res.cancel) {
										console.log('稍后更新');
									}
								}
							});
						}
					} else if (that.platformType == 'ios') {
						that.showLoad = true
					}
				} 
			},
			appraisal(){//入学测评
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./appraisal'
					})
				}
			},
			searchs(){
				if(this.cacheHelper.isLoginOnclick()){
					uni.navigateTo({
						url:'./information'
					})
				}
			},
			scroll(){},
			dibblebtn(){//点播课堂
				uni.navigateTo({
					url:"./dibbleSeeding"
				})
			},
			locationDone(){//头部的地理位置
				uni.navigateTo({
					url:"./location"
				})
			},
			topsearchBtn(){//头部的搜索
				uni.navigateTo({
					url:"./search?deptId=" + this.deptId
				})
			},
			referrerBtn(v){//推荐课程详情
				uni.navigateTo({
					url:"./referrerDetail?courseid=" + v.id
				})
			},
			bannersd(v){//轮播图点击事件
				console.log(v)
				uni.navigateTo({
					url:"./bannerdtals?bannerid=" + v.id
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					deptId:uni.getStorageSync('deptId'),//机构id
					current: page.num,
					size: page.size,
					gradeId:this.gradeId,//年级id
					subjectId:this.subjectId,//科目id
					type:this.online,//1:线上，2:线下
				}
				this.api.recommend(params)
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

<style lang="scss">
	.banner {
		height: 340rpx;
		width: 690rpx;
		margin: 0 auto;
		padding-top: 120rpx;
		position: relative;
		.tui-rolling-search {
			width: 612rpx;
			height: 58rpx;
			border-radius: 35rpx;
			padding: 0 40rpx 0 30rpx;
			box-sizing: border-box;
			background: #fff;
			display: flex;
			align-items: center;
			flex-wrap: nowrap;
			color: #999;
			position: absolute;
			left: 30rpx;
			top: 107rpx;
			z-index: 99;
		}
	
		.swiper {
			margin-top: 40rpx;
			width: 100%;
			height: 100%;
			// border-radius: 16rpx;
			overflow: hidden;
			// position: relative;
			.swiper-item {
				width: 100%;
				height: 300rpx;
			}
	
		}
		.dots {
			position: absolute;
			bottom: 20rpx;
			left: 50%;
			transform: translate(-50%, 0);
			-webkit-transform: translate(-50%, 0);
			z-index: 99;
			display: flex;
			flex-direction: row;
			justify-content: center;
			.dot {
				width: 24rpx;
				height: 8rpx;
				transition: all .6s;
				background: rgba(238, 238, 238, 1);
				margin-right: 10rpx;
			}
			.active {
				width: 24rpx;
				height: 8rpx;
				background: #4EA135;
			}
		}
	}
	.tesreport{
		width:332rpx;
		height:161rpx;
	}
	.recommend{
		height:40rpx;
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding: 0 30rpx;
		margin-bottom: 15rpx;
	}
	.moldtype{
		font-size: 29rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 36rpx;
		color: #333333;
		opacity: 1;
		margin-top: 20rpx;
		width: 85rpx;
	}
	.tabqi {
		 height: 56rpx;
		 padding-left: 30rpx;
		 display: flex;
		 justify-content: space-between;
		 box-sizing: border-box;
		width: 720rpx;
	}
	.discipline{
		height: 65rpx;
		display: flex;
		justify-content: space-between;
		box-sizing: border-box;
		padding-left: 30rpx;
		width: 720rpx;
	}
	.typeline{
		height: 65rpx;
		display: flex;
		box-sizing: border-box;
		padding-left: 30rpx;
		width: 720rpx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width:88%;
		box-sizing: border-box;
		.scroll-view-item_H {
			display: inline-block;
			margin-right: 30rpx;
			.slideimg {
			   width: 236rpx;
			   height: 186rpx;
			   border-radius: 12px;
			}
		}
	}
	.tabqi-color {
		 height: 43rpx;
		 color:rgba(242,127,49,1);
		 font-family:PingFang SC;
		 font-weight:bold;
		 font-size: 29rpx;
		 text-align: center;
		 display: inline-block;
		 margin: 20rpx 50rpx 20rpx 0;
	}
	.discipline-color{
		width: 112rpx;
		height: 43rpx;
		background:linear-gradient(180deg,rgba(242,148,34,1) 0%,rgba(242,111,61,1) 100%);
		border-radius: 22px;
		color: #FFFFFF;
		font-size: 29rpx;
		line-height: 43rpx;
		text-align: center;
		display: inline-block;
		margin: 20rpx 20rpx 20rpx 0;
	}
	.tabqi-tabmei {
		height: 43rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		font-size: 29rpx;
		text-align: center;
		display: inline-block;
		margin: 20rpx 50rpx 20rpx 0;
	}
	.discipline-tabmei{
		width: 112rpx;
		height: 43rpx;
		background: rgba(245, 245, 245, 1);
		border-radius: 22px;
		color: #cccccc;
		font-size: 29rpx;
		line-height: 43rpx;
		text-align: center;
		display: inline-block;
		margin: 20rpx 20rpx 20rpx 0;
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
	.allowed{
		width:101rpx;
		height:36rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:36rpx;
		color:rgba(249,153,69,1);
		opacity:1;
		margin-left: 10rpx;
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
		background:#FDE5D5;
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
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:36rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		flex: 1;
		margin-top: 10rpx;
	}
	.home-baobtn{
		width:135rpx;
		height:46rpx;
		background:rgba(242,127,49,1);
		border-radius:23rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		line-height:36rpx;
		color:rgba(255,255,255,1);
		opacity:1;
		text-align: center;
		line-height: 46rpx;
		margin-top: 10rpx;
	}
	.zindex {
		box-sizing: border-box;
		padding: 0 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 88rpx;
	}
	.location {
		display: flex;
		align-items: center;
		font-size: 28rpx;
	}
	.ttop {
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 9999;
		background: #FFFFFF;
	}
	.topsearch{
		display: flex;
		align-items: center;
		justify-content: center;
		flex: 1;
		background:rgba(242,244,248,1);
		padding: 8rpx 0;
		border-radius: 30rpx;
		color: #CCCCCC;
	}
	.unmbuy{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 30rpx;
		margin-top: -20rpx;
		color: #999999;
		opacity: 1;
		text-align: right;
	}
	.civic{
		width: 100rpx;
		text-align: center;
		font-size: 32rpx;
		font-weight: bold;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
	}
	.xiaoxi{
		position: absolute;
		background: #FF0000;
		border-radius: 50%;
		font-size: 18rpx;
		color: #FFFFFF;
		width: 30rpx;
		height: 30rpx;
		text-align: center;
		line-height: 30rpx;
		opacity: 0.7
	}
	.teams {
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.teams .cancel {
		position: absolute;
		top: 26rpx;
		right: 33rpx;
		font-size: 30rpx;
		color: #999999;
		font-weight: 500;
		line-height: 42rpx;
	}
	.load {
			position: fixed;
			right: 15rpx;
			bottom: 15rpx;
			z-index: 100;
		}
</style>
