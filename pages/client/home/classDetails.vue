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
		<!-- "isGroup": "是否拼团1:拼团。2:非拼团", -->
		<view v-if="datalist.isGroup==1" class="" style="padding: 25rpx;background: #FFFFFF;margin-bottom: 20rpx;">
			<view class="" style="display: flex;justify-content: space-between;font-size: 32rpx;font-family:PingFang SC;font-weight:bold;color:rgba(51,51,51,1);padding-bottom: 25rpx;">
				<text>{{grouplist.length==0 ? '快去拼团吧':grouplist.length+'人正在拼团'}}</text>
				<text @click="lookmore" style="color:rgba(153,153,153,1);font-weight:400;">查看更多</text>
			</view>
			<view class="" style="text-align: center;" v-if="grouplist.length==0">
				<image src="../../../static/image/timg.jpg" mode="" style="width: 220rpx;height: 120rpx;"></image>
				<view style="color: #666;font-size: 26rpx;">暂无拼团</view>
			</view>
			<view class="" v-for="item in grouplist" style="display: flex;justify-content:space-between;padding:30rpx 0;border-top: 1rpx solid rgba(245,245,245,1);">
				<image :src="item.avatar" mode="" style="width:82rpx;height:82rpx;border-radius:50%;"></image>
				<view class="group-name">
					<view class="">
						{{item.nickname}}
					</view>
					<view class="group-time">{{item.endTime}}</view>
				</view>
				<view @click="addgroup(2,item)" class="group-btn">
					参加拼团
				</view>
			</view>
		</view>
		<view class="" style="background: #FFFFFF;">
			<view class="tablistL">
				<view :class="tablistLindex==index? 'tablistitem':'untablistitem'" v-for="(item,index) in tablistL" @click="tablistLbtn(index)">{{item}}</view>
			</view>
			<!-- 课程 -->
			<view class="" v-if="tablistLindex==0" style="min-height: 500rpx;padding: 10rpx 30rpx 0 30rpx">
				<view class="" v-html="strings"></view>
				<view class="" v-if="strings==''">
					<view class="">
						<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
					</view>
				</view>
			</view>
			<!-- 课表 -->
			<view class="" style="padding: 10rpx 30rpx 0 30rpx;min-height: 500rpx;" v-if="tablistLindex==1">
				<view style="padding: 30rpx 0;display: flex;justify-content: space-between;" v-for="(item,index) in schedule" @click="videobtn(item,index)">
					<view class="" style="color:#797979;font-size: 30rpx;">
						<!-- <text>第{{index+1}}讲:</text> -->
						<text>{{item.name}}</text>
					</view>
					<view class="" v-if="datalist.orderStatus==2 || datalist.orderStatus==3">
						<text style="font-size: 29rpx;color:#18D0A2 ;">观看</text>
					</view>
					<view class="" v-else>
						<text style="font-size: 29rpx;color:#CCCCCC;" v-if="index==0">试看</text>
						<text style="font-size: 29rpx;color:#18D0A2;" v-else>观看</text>
					</view>
				</view>
				<view class="" v-if="schedule.length==0">
					<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
				</view>
			</view>
			<view class="" v-if="tablistLindex==2" style="min-height: 500rpx;">
				<mescroll-body ref="mescrollRef" :height="1" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
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
		<view class="" style="height: 90rpx;"></view>
		<view class="kc-falxe" style="display: flex;">
			<view class="" style="width: 120rpx;text-align: center;" @click="callup">
				<image src="../../../static/image/59.png" mode="" style="width: 32rpx;height: 32rpx;"></image>
				<view style="font-size: 25rpx;color: #999999;">客服</view>
			</view>
			<!-- orderStatus 1和6代表是已生成订单不能再次生成  2和3 代表已经购买跳学习页面 -->
			<view class="" style="flex: 1;display: flex;" v-if="datalist.orderStatus==2 || datalist.orderStatus==3">
				<view class="kc-gopay" style="background: #F27F31;" @click="Learning">
					立即学习
				</view> 
			</view>
			<view class="" style="flex: 1;display: flex;" v-else>
				<view class="" v-if="platform=='android'" style="flex: 1;display: flex;">
					<view @click="gopayBtn(1)" class="kc-gopay">立即购买</view>
					<view v-if="datalist.isGroup==1" @click="gopayBtn(2)" class="kc-gopay" style="background: #F27F31;">发起拼团:¥{{datalist.groupPrice}}</view>
				</view>
				<view class="" v-if="platform=='ios'" style="flex: 1;display: flex;">
					<view v-if="showpricedata==2" style="flex: 1;display: flex;">
						<view @click="ioskefu" class="kc-ios-btn">联系客服</view>
					</view>
					<view v-if="showpricedata==1" style="flex: 1;display: flex;">
						<view @click="gopayBtn(1)" class="kc-gopay">立即购买</view>
						<view v-if="datalist.isGroup==1" @click="gopayBtn(2)" class="kc-gopay" style="background: #F27F31;">发起拼团:¥{{datalist.groupPrice}}</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="isShowDelDialog" type="dialog">
			<view class="" style="background: #FFFFFF;width: 650rpx;border-radius: 12rpx;">
				<view class="group">正在拼团</view>
				<scroll-view scroll-y="true" class="scroll-Y">
					<view class="" v-for="item in grouplist" style="display: flex;justify-content:space-between;padding:30rpx 0;border-top: 1rpx solid rgba(245,245,245,1);">
						<image :src="item.avatar" mode="" style="width:82rpx;height:82rpx;border-radius:50%;"></image>
						<view class="group-name">
							<view class="">
								{{item.nickname}}
							</view>
							<view class="group-time">{{item.endTime}}</view>
						</view>
						<view class="group-btn" @click="addgroup(2,item)">
							参加拼团
						</view>
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
				platform:uni.getSystemInfoSync().platform,
				showpricedata:'',//用来苹果上架是否显示价钱
				swiperCurrent: 0,//控制轮播图的圆点
				Lessonid:'',//课程id
				ifgroup:'',
				datalist:{},
				showPicture:[],
				schedule:[],
				grouplist:[],//拼团数据
				institutionphone:'',//电话
				artdeptId:'',//艺术机构id
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
			this.showprice()
			this.platform=uni.getSystemInfoSync().platform
			this.Lessonid=option.Lessonid //课程id
			this.artdeptId=option.artdeptId//接收艺术课的机构id
			console.log(this.Lessonid,'/课程id')
			console.log(this.artdeptId,'接收艺术课的机构id')
			this.deptCustomerMobile()
			this.getById()
			uni.$on('Videoupdate',(data)=>{
				console.log('视频更新：' + data.msg);
				this.demandCourseCatalog()
			})
			uni.$on('dianpagedetal',(data)=>{//购买成功需要刷新一下详情  改变下面的按钮
				console.log(data.msg);
				this.getById()
			})
		},
		methods: {
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			changeSwiper(e) {//控制轮播图圆点
				this.swiperCurrent = e.detail.current;
			},
			deptCustomerMobile(){//机构电话
				this.api.deptCustomerMobile(
					this.artdeptId==undefined ? uni.getStorageSync('deptIddata') : this.artdeptId
				).then(res=>{
					this.institutionphone=res.data
					console.log(this.institutionphone,'机构电话')
				})
			},
			ioskefu(){
				this.api.findByCode(
					JSON.stringify('REMIND_MESSAGE') //提示字
				).then(res=>{
					uni.showModal({
					    title: '温馨提示',
					    content:res.data.description,
					    success:(res)=> {
					        if (res.confirm) {
								uni.makePhoneCall({
								    phoneNumber:this.institutionphone //仅为示例
								});
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				})
			},
			tablistLbtn(index){
				this.tablistLindex=index
			},
			close() {//取消弹窗
				this.$refs.isShowDelDialog.close()
				this.$refs.isShowDelgojoin.close()
			},
			lookmore(){//显示弹窗
				if(this.grouplist==0){
					this.tui.toast('没有更多拼团了,快去拼团吧')
				}else{
					this.$refs.isShowDelDialog.open()
				}
			},
			teacherbtn(v){//跳老师详情
				uni.navigateTo({
					url:'./teacherDetal?teacherid=' + v.teacherId
				})
			},
			Learning(){//去学习按钮
				uni.navigateTo({
					url:'/pages/client/study/mystreamingDetals?Lessonid=' + this.datalist.id
				})
			},
			videobtn(v,index){ //点击每个课程
				if(this.datalist.orderStatus==2 || this.datalist.orderStatus==3){ //这个代表是已经购买的
					uni.navigateTo({ // name是每个课程名称  index是索引  courseId是课程id  orderStatus查看是否已购买
						url:'./videosd?name=' + v.name + '&indexd=' + index + '&courseId=' + this.datalist.id + '&orderStatus=' + this.datalist.orderStatus + '&courseCatalogId=' + v.id + '&second=' + v.second
					})
					uni.setStorageSync('videouil',v.url) //视频地址
				}else{//这个代表是没有购买的
					if(index==0){ //这个代表可以试看第一个视频
						uni.navigateTo({ // name是每个课程名称  index是索引  courseId是课程id
							url:'./videosd?name=' + v.name + '&indexd=' + index + '&courseId=' + this.datalist.id + '&orderStatus=' + this.datalist.orderStatus + '&courseCatalogId=' + v.id
						})
						uni.setStorageSync('videouil',v.url) //视频地址
					}else{
						this.tui.toast('当前只能试看一个视频')
					}
				}
				uni.$emit('videouiluo',{msg:v.url})
			},
			gopayBtn(v){//立即购买
				if(this.cacheHelper.isLoginOnclick()){
					this.ifgroup=v
					this.api.orderhasBuy( //判断课程是否已下单   true为没下单  false为已下单  如果已经下单去我的订单页面
						this.Lessonid
					).then(res=>{
						if(res.data){
							uni.navigateTo({  //ifgroup 等于1是购买   等于2是拼团     type为1时 是班组课  datatype是用来支付成功跳转的
								url:'./confirmOrder?courseid=' + this.Lessonid + '&ifgroup=' + this.ifgroup + '&type=' + 2 + '&datatype=' + 3
							})
						}else{
							uni.showModal({
							    title: '温馨提示',
							    content: '您已经下过订单了,不可重复下单',
							    success:(res)=> {
							        if (res.confirm) {
							            // uni.navigateTo({
							            // 	url:"/pages/client/user/myOrder?type=4"
							            // })
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}
						console.log(res)
					})
				}
			},
			addgroup(v,value){
				if(this.cacheHelper.isLoginOnclick()){
					this.ifgroup=v
					this.api.orderhasBuy( //判断课程是否已下单   true为没下单  false为已下单  如果已经下单去我的订单页面
						this.Lessonid
					).then(res=>{
						if(res.data){
							uni.navigateTo({  //ifgroup 等于1是购买   等于2是拼团     type为1时 是班组课  datatype是用来支付成功跳转的
								url:'./confirmOrder?courseid=' + this.Lessonid + '&ifgroup=' + this.ifgroup + '&type=' + 2 + '&datatype=' + 3 + '&groupId=' + value.id
							})
						}else{
							uni.showModal({
							    title: '温馨提示',
							    content: '您已经下过订单了,不可重复下单',
							    success:(res)=> {
							        if (res.confirm) {
							            // uni.navigateTo({
							            // 	url:"/pages/client/user/myOrder?type=4"
							            // })
							        } else if (res.cancel) {
							            console.log('用户点击取消');
							        }
							    }
							});
						}
						console.log(res)
					})
				}
			},
			grouppage(){
				this.api.grouppage({
					demandCourseId:this.datalist.id,
					current:'1',
					size:'4'
				}).then(res=>{
					console.log(res)
					this.grouplist=res.data.records
				})
			},
			callup(){//拨打客服
				uni.makePhoneCall({
				    phoneNumber:this.institutionphone
				});
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
		margin-top: 10rpx;
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
	.kc-ios-btn{
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
</style>
