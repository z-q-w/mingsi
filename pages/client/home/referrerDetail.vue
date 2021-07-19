<template>
	<view>
		<swiper class="swiper" :autoplay="true" :interval="5000" :duration="500" :circular="true" :current="swiperCurrent" @change="changeSwiper">
			<swiper-item v-for="item in showPicture">
				 <image :src="item" mode="" style="width: 750rpx;height: 400rpx;"></image>
			</swiper-item>
		</swiper>
		<view class="" style="background: #FFFFFF;padding: 30rpx;margin-bottom: 20rpx;">
			<view class="cdmind">
				<text class="on-line">线上课程</text>
				<text class="cdmind-name">{{datalist.name}}</text>
				<text class="cdmind-integral">¥{{datalist.price}}</text>
			</view>
			<view class="" style="display: flex;margin-top: 20rpx">
				<image src="../../../static/image/7.png" mode="" style="width:30rpx;height:30rpx;margin:2rpx 10rpx 0 0"></image>
				<view class="cdmind-starttime">{{datalist.rangeDate}}</view>
				<view class="cdmind-starttime" style="margin-left: 20rpx;">课时:{{datalist.hours}}</view>
			</view>
			<view class="" style="margin-bottom: 20rpx;">
				<text class="cdmind-starttime">班级人数:{{datalist.classUserNumber}}人/班</text>
			</view>
			<!-- 老师 -->
			<view class="" style="display: flex;" @click="teacherbtn(datalist)">
				<image :src="datalist.avatar" mode="" style="width: 95rpx;height: 95rpx;border-radius: 50%;vertical-align: middle;margin-right: 30rpx;"></image>
				<view class="" style="flex: 1;">
					<view class="teacher">
						<text>{{datalist.teacherName}}</text>
						<text class="cdmind-starttime">{{datalist.buyNumber}}人购买</text>
					</view>
					<view class="typelist" v-for="item in datalist.teacherTagsList">
						<text>{{item}}</text>
					</view>
				</view>
			</view>
		</view>
				<!-- "isBuy" 1:已购买2:未购买  "isEncroll"1:报名，2:未报名 -->
		<view class="signup" @click="registration" v-if="datalist.isBuy ==2 && datalist.isEncroll ==2">
			<image src="../../../static/image/c37349dcbb51b652e0c6e8c5c342f09.png" mode="" style="width: 690rpx;height: 150rpx;text-align: center;"></image>
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
			<view v-else class="" v-for="item in grouplist" style="display: flex;justify-content:space-between;padding:30rpx 0;border-top: 1rpx solid rgba(245,245,245,1);">
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
			<view style="margin: 20rpx 30rpx;min-height: 500rpx;" v-if="tablistLindex==0">
				<view class="" v-html="strings"></view>
				<view class="" v-if="strings==''">
					<tui-emptyimg :width='420' :height='230'></tui-emptyimg>
				</view>
			</view>
			<view class="" style="min-height: 100rpx;">
				<mescroll-body v-if="tablistLindex==1" ref="mescrollRef" :height="800" :up="upOption" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
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
			<view class="" style="display: flex;flex: 1;" v-else>
				<view v-if="platform=='android'" class="" style="flex: 1;display: flex;">
					<view @click="gopayBtn(1)" class="kc-gopay">立即购买</view>
					<view v-if="datalist.isGroup==1" @click="gopayBtn(2)" class="kc-gopay" style="background: #F27F31;">拼团:¥{{datalist.groupPrice}}</view>
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
		
		<!-- "isGroup": "是否拼团1:拼团。2:非拼团", -->
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
		<uni-popup ref="campus" type="bottom">
			<view class="" style="background: #FFFFFF;width: 750rpx;border-top-left-radius: 12rpx;border-top-right-radius: 12rpx;">
				<view class="group" style="display: flex;justify-content: space-between;">
					<text style="width: 100rpx;"></text>
					<text>选择校区</text>
					<text @click="determine" style="text-align: center;width: 100rpx;color:#F27F31;font-weight: 500;">确定</text>
				</view>
				<scroll-view scroll-y="true" class="group-Y">
					<view class="campusbox" v-for="item in campusdata" @click="campusbtn(item)">
						<view class="" style="display: flex;justify-content: space-between;">
							<view>
								{{item.NAME}}
							</view>
							<view class="" v-if="campusindex==item.deptId">
								<image src="../../../static/image/72.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
							</view>
							<view class="" v-else>
								<image src="../../../static/image/73.png" mode="" style="width: 40rpx;height: 40rpx;"></image>
							</view>
						</view>
						<view class="" style="display: flex;font-size: 28rpx;color: #666666;margin: 4rpx 0 10rpx 0;">
							<view class="" style="width: 150rpx;">
								{{item.nickname}}校长 
							</view>
							<view class="" style="width: 200rpx;">
								{{item.phone}}
							</view>
						</view>
						<view @click="hereto(item)" style="display: flex;justify-content: space-between;font-size: 24rpx;color: #999999;height: 40rpx;line-height: 40rpx;">
							<view class="" style="width: 590rpx;overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
								{{item.address}}
							</view>
							<!-- <view class="" style="width: 100rpx;text-align: center;color:#FFFFFF;background:#F27F31;border-radius: 6rpx;font-size: 24rpx;">
								到这里
							</view> -->
							<image src="../../../static/image/weizhidd.png" mode="" style="width: 60rpx;height: 60rpx;margin-top: -14rpx;"></image>
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
				showpricedata:'',////用来苹果上架是否显示价钱
				platform:uni.getSystemInfoSync().platform,
				numtype:'',
				swiperCurrent: 0,//控制轮播图的圆点
				courseid:'',//课程id
				datalist:{},
				campusindex:'',//学校id
				ifgroup:'',//判断是否是拼团还是购买
				strings:'',//课程简介
				schedule:[],
				campusdata:[],//校区数据
				entry:'',//控制是报名选择学校  还是购买拼团选择学校   1是报名选择学校   2购买拼团选择学校
				grouplist:[],//拼团数据
				institutionphone:'',//电话
				artdeptId:'',//艺术机构id
				groupId:'',
				evaluatedata:[],
				typelist:['初中语文','高中数学','寒暑假班'],
				tablistL:['课程','评论'],
				tablistLindex:0,
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				showPicture:[],
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
			this.courseid=option.courseid
			this.getById()
			this.showprice()
			this.grouppage()
			this.platform=uni.getSystemInfoSync().platform
			if(this.cacheHelper.isLogin()){  //只有登录的的情况下才需要调用
				this.findSchool()
			}
			uni.$on('zhipagedetal',(data)=>{//购买成功需要刷新一下详情  改变下面的按钮
				console.log(data.msg);
				this.getById()
			})
		},
		methods: {
			findSchool(){//选择校区
				this.api.findSchool(
					this.courseid
				).then(res=>{
					this.campusdata=res.data
				})
			},
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			hereto(v){
				uni.openLocation({
					latitude: v.latitude,
					longitude: v.longitude,
					success: function () {
						console.log('success');
					}
				});
			},
			deptCustomerMobile(){//机构电话
				this.api.deptCustomerMobile(
					JSON.stringify(this.artdeptId)
				).then(res=>{
					this.institutionphone=res.data
				})
			},
			tablistLbtn(index){
				this.tablistLindex=index
				if(this.tablistLindex==1){
					this.downCallback()
				}
			},
			Learning(){//去学习按钮
				uni.navigateTo({
					// url:'/pages/client/study/mystreamingDetals?Lessonid=' + this.datalist.id,
					url:'/pages/client/study/courseDetail?mycourseid=' + this.datalist.id,
				})
			},
			registration(){ //点我报名
				if(this.cacheHelper.isLoginOnclick()){
					this.entry=1  //1是报名选择学校   2购买拼团选择学校
					if(this.datalist.type==1){
						this.$refs.campus.open()
					}else{
						uni.showModal({
						    title: '温馨提示',
						    content: '您确定报名该课程',
						    success:(res)=> {
						        if (res.confirm) {
						            this.enroll()
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}
			},
			enroll(){//点我报名接口
				this.api.enroll({
					"courseId":this.courseid,//课程id
					"type":this.datalist.type,///1 线下 2 线上
					"schoolId":this.campusindex//校区id
				}).then(res=>{
					this.getById()
					this.tui.toast('报名成功')
				})
			},
			campusbtn(v){//选择校区
				this.campusindex=v.deptId
			},
			determine(v){//选择确定校区按钮
				if(this.campusindex==''){
					this.tui.toast('请选择校区')
				}else{
					this.$refs.campus.close()
					if(this.entry==1){ //1是报名选择学校   2购买拼团选择学校
						uni.showModal({
						    title: '温馨提示',
						    content: '您确定报名该课程',
						    success:(res)=> {
						        if (res.confirm) {
						            this.enroll()
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}else if(this.entry==2){ //1是报名选择学校   2购买拼团选择学校
						uni.navigateTo({  //ifgroup 等于1是购买   等于2是拼团     type为1时 是班组课  type为2时 是点播课  datatype 1是线上  2是线下  3是点播  是用来支付成功跳转的
							url:'./confirmOrder?courseid=' + this.courseid + '&ifgroup=' + this.ifgroup + '&type=' + 1 + '&schoolId=' + this.campusindex + '&datatype=' + 2 + '&groupId=' + this.groupId
						})
					}
				}
			},
			callup(){//拨打客服
				uni.makePhoneCall({
				    phoneNumber:this.institutionphone //仅为示例
				});
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
			changeSwiper(e) {//控制轮播图圆点
				this.swiperCurrent = e.detail.current;
			},
			lookmore(){//显示弹窗
				if(this.grouplist==0){
					this.tui.toast('没有更多拼团了,快去拼团吧')
				}else{
					this.$refs.isShowDelDialog.open()
				}
			},
			close() {//取消弹窗
				this.$refs.isShowDelDialog.close()
				this.$refs.isShowDelgojoin.close()
			},
			teacherbtn(v){//跳老师详情
				uni.navigateTo({
					url:'./teacherDetal?teacherid=' + v.teacherId
				})
			},
			gopayBtn(v){//立即购买
				this.groupId=''
				if(this.cacheHelper.isLoginOnclick()){
					this.ifgroup=v
					this.entry=2  //1是报名选择学校   2购买拼团选择学校
					this.api.orderhasBuy( //判断课程是否已下单   true为没下单  false为已下单  如果已经下单去我的订单页面
						this.courseid
					).then(res=>{
						if(res.data){
							if(this.datalist.type==1){
								this.$refs.campus.open()
							}else{
								uni.navigateTo({  //ifgroup 等于1是购买   等于2是拼团     type为1时 是班组课      datatype 1是线上  2是线下  3是点播  是用来支付成功跳转的
									url:'./confirmOrder?courseid=' + this.courseid + '&ifgroup=' + this.ifgroup + '&type=' + 1 + '&schoolId=' + this.campusindex + '&datatype=' + 2
								})
							}
						}else{
							uni.showModal({
							    title: '温馨提示',
							    content: '您已经下过订单了,不可重复下单',
							    success:(res)=> {
							        if (res.confirm) {
							            // uni.navigateTo({
							            // 	url:"/pages/client/user/myOrder?type=" + 4
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
				this.groupId=value.id //拼团id
				if(this.cacheHelper.isLoginOnclick()){
					this.ifgroup=v
					this.entry=2  //1是报名选择学校   2购买拼团选择学校
					this.api.orderhasBuy( //判断课程是否已下单   true为没下单  false为已下单  如果已经下单去我的订单页面
						this.courseid
					).then(res=>{
						if(res.data){
							if(this.datalist.type==1){
								this.$refs.campus.open()
							}else{
								uni.navigateTo({  //ifgroup 等于1是购买   等于2是拼团     type为1时 是班组课      datatype 1是线上  2是线下  3是点播  是用来支付成功跳转的
									url:'./confirmOrder?courseid=' + this.courseid + '&ifgroup=' + this.ifgroup + '&type=' + 1 + '&schoolId=' + this.campusindex + '&datatype=' + 2 + '&groupId=' + value.id
								})
							}
						}else{
							uni.showModal({
							    title: '温馨提示',
							    content: '您已经下过订单了,不可重复下单',
							    success:(res)=> {
							        if (res.confirm) {
							            // uni.navigateTo({
							            // 	url:"/pages/client/user/myOrder?type=" + 4
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
			grouppage(){//拼团列表
				this.api.grouppage({
					demandCourseId: this.courseid, //课程id
					current: 1, //
					size: 4
				}).then(res=>{
					this.grouplist=res.data.records
					console.log(res)
				})
			},
			getById(){//课程详情
				this.api.coursedetail(
					this.courseid
				).then(res=>{
					console.log(res)
					this.datalist=res.data
					this.artdeptId=res.data.deptId
					this.showPicture=this.datalist.showPicture.split(",")
					this.strings = this.datalist.details.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
					this.deptCustomerMobile()
					uni.setStorageSync('goodlist',res)
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
	}
	.cdmind-name{
		font-size:33rpx;
		font-family:PingFang SC;
		font-weight:bold;
		line-height:45rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		flex: 1;
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
	.kc-pin{
		width:296rpx;
		height:72rpx;
		background:#F27F31;
		border-radius:36rpx;
		font-size:29rpx;
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
	.group-Y{
		height: 700rpx;
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
		margin-bottom: 25rpx;
		text-align: center;
	}
	.on-line{
		margin-right: 20rpx;
		width: 123rpx;
		height: 42rpx;
		background: #f2c7a3;
		border-radius: 4rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 36rpx;
		color: #F27F31;
		text-align: center;
		line-height: 42rpx;
	}
	.signup{
		background: #FFFFFF;
		text-align: center;
		margin-bottom: 20rpx;
		padding: 30rpx 0;
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
	.swiper {
		width: 100%;
		height: 400rpx;
	}
	.campusname{
		color: rgba(242,127,49,1);
	}
	.campusbox{
		padding:30rpx;
		border-top: 1rpx solid rgba(245,245,245,1);
	}
</style>
