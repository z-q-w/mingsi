<template>
	<view style="background: #FFFFFF;min-height: 100%;">
		<view class="" style="padding: 30rpx 35rpx 35rpx 30rpx;display: flex;justify-content: space-between;">
			<text class="record">历史记录</text>
			<image @tap="emptyls" src="../../../static/image/icon_address_del@3x.png" mode="" style="width:36rpx;height:36rpx;"></image>
		</view>
		<view class="" style="display: flex;flex-wrap: wrap;">
			<text class="holder" v-for="item in historical" :key="item.index" @click="historybtn(item)">
				{{item}}
			</text>
		</view>
		<tui-modal :show="displayer" @cancel="cancelsd" :custom="true">
			<view class="tui-modal-custom">
				<view class="tui-modal-custom-text" style="margin: 50rpx 0;">确认删除全部历史记录?</view>
				<view class="btn" style="display: flex;">
					<button class="white cancelBtn" style="width: 50%;" @tap="displayer=false">取消</button>
					<button class="white affirmBtn" style="width: 50%;" @tap="confirm">确认</button>
				</view>
			</view>
		</tui-modal>
		<view class="" style="padding: 30rpx 35rpx 35rpx 30rpx;display: flex;justify-content: space-between;">
			<text class="record">热门搜索</text>
		</view>
		<view class="" style="display: flex;flex-wrap: wrap;">
			<text class="holder" v-for="item in hotlist" :key="item.index" @click="historybtn(item)">
				{{item}}
			</text>
		</view>
		<mescroll-body ref="mescrollRef" class="discuss" @init="mescrollInit" :up="upOption" :down="downOption" @down="downCallback" @up="upCallback">
			<view class="fankas" v-for="item in corserbottemlist" :key='item.index' @click="referrerBtn(item)">
				<view class="" style="display: flex;">
					<view class="fankas-type">{{item.subjectName}}</view>
					<view class="fankas-name" style="flex: 1;">{{item.name}}</view>
					<view class="allowed">名额紧张</view>
				</view>
				<view class="timedata" v-if="item.type !=3">
					<image src="../../../static/image/7.png" mode="" style="width: 25rpx;height: 25rpx;margin-right: 18rpx;"></image>
					<text>{{item.rangeDate}}</text>
				</view>
				<view class="typelistbox">
					<view class="typelist" v-for="item in item.tagsList">
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
	</view>
</template>

<script>
	import tuiModal from '@/components/modal/modal';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				historical:[],//历史记录
				text:'',
				displayer:false,
				hotlist:[],//热门搜索
				deptId:'',//机构id
				corserbottemlist:[],
				downOption: {
					auto: false //是否在初始化后,自动执行downCallback; 默认true
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
		onNavigationBarSearchInputChanged(e) {
			this.text = e.text;
			console.log(e)
		},
		onNavigationBarButtonTap(e) {
			uni.hideKeyboard()
			console.log(this.text)
			this.historyrecord()
			this.downCallback()
		},
		onLoad(page){
			this.historical=uni.getStorageSync('qwhistorical')
			this.deptId=page.deptId
			this.hotKeywords()
		},
		onNavigationBarSearchInputConfirmed(){
			uni.hideKeyboard()
			this.historyrecord()
			this.downCallback()
		},
		methods: {
			historybtn(v){//点击历史记录
				console.log(v)
				this.text=v
				// #ifdef APP-PLUS
				const currentWebview = this.$scope.$getAppWebview();
				currentWebview.setTitleNViewSearchInputText(v);
				// #endif
				this.downCallback()
			},
			cancelsd(){//取消弹窗
				this.displayer=false
			},
			hotKeywords(){//热门搜索
				this.api.hotKeywords().then(res=>{
					this.hotlist=res.data
				})
			},
			historyrecord(){ //历史记录数据
				if(this.historical.length>0){
					if(this.historical.indexOf(this.text) !== -1) { // 有相同的，先删除 再添加
						this.historical.splice(this.historical.indexOf(this.text), 1)
						if(this.text != ''){
							this.historical.unshift(this.text)
						}
					} else { // 没有相同的 添加
						if(this.text != ''){
							this.historical.unshift(this.text)
						}
					}
					console.log(this.historical)
				}else{ // 没有数据 添加
					this.historical=[]
					console.log(this.historical instanceof Array)
					if(this.text != ''){
						this.historical.unshift(this.text)
					}
				}
				if(this.historical.length > 6) { // 保留六个值
					this.historical.pop()
				}
				uni.setStorageSync('qwhistorical',this.historical)
			},
			emptyls(){//删除按钮弹窗
				this.displayer=true
			},
			confirm(){//删除历史记录确定按钮
				this.displayer=false
				this.historical = []
				// this.historical=[]
				uni.removeStorageSync('qwhistorical');
			},
			referrerBtn(v){//推荐课程详情
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
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			upCallback(page) {
				let params = {
					name: this.text,
					deptId:this.deptId, //机构id
					current: page.num,
					size: page.size
				}
				this.api.homesearch(params)
					.then((res) => {
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
					}).catch((err) => {
						console.log("ssss")
						this.mescroll.endErr()
					})
			}
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			// upCallback(page) {// 所有的加载列表接口只允许写在此处
			// 	let params = {
			// 		name: this.text,
			// 		deptId:this.deptId, //机构id
			// 		current: page.num,
			// 		size: page.size
			// 	}
			// 	this.api.homesearch(params)
			// 		.then((res) => {
			// 			console.log(res)
			// 			// 接口返回的当前页数据列表 (数组)
			// 			let curPageData = res.records;
			// 			// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
			// 			let curPageLen = curPageData.length;
			// 			// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
			// 			let totalPage = res.total;
			// 			//设置列表数据
			// 			setTimeout(() => { // 模拟效果
			// 				if (page.num == 1) this.corserbottemlist = []; //如果是第一页需手动置空列表
			// 				this.corserbottemlist = this.corserbottemlist.concat(curPageData); //追加新数据
			// 				// 请求成功,隐藏加载状态
			// 				//方法一(推荐): 后台接口有返回列表的总页数 totalPage
			// 				this.mescroll.endByPage(curPageLen, totalPage);
			// 			}, 500)
			// 		})
			// 		.catch((err) => {
			// 			this.mescroll.endErr()
			// 		})
			// }
		}
	}
</script>

<style>
	.record{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
	}
	.holder{
		height:59rpx;
		background:rgba(242,244,248,1);
		border-radius:12rpx;
		text-align: center;
		line-height: 59rpx;
		font-size:28rpx;
		font-family:PingFang SC;
		color:rgba(102,102,102,1);
		margin: 20rpx 25rpx;
		padding: 0 40rpx;
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
		background:#FDE5D5;
		border-radius:4rpx;
		padding: 5rpx 10rpx;
		margin-right: 15rpx;
		font-size: 25rpx;
		line-height: 41rpx;
	}
	.unmbuy{
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 30rpx;
		color: #999999;
		opacity: 1;
		text-align: right;
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
</style>