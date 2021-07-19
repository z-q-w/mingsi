<template>
	<view>
		<view class="status_bar"><!-- 这里是状态栏 --></view>
		<view class="heads">
			<view class="" style="width: 140rpx;text-align: left;" @tap="goback">
				<image src="../../../static/image/a8a2cabe09b2ad058b3d2cca4acc9fa.png" mode="" style="height: 36rpx;width: 19rpx;"></image>
			</view>
			<view class="workheads" style="">关注老师</view>
			<view @tap="management" class="managembtn" style="width: 140rpx;text-align: right;">
				<text>{{condition.typesd}}</text>
			</view>
		</view>
		<view class="gzteacher">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" :down="downOption" @down="downCallback" @up="upCallback">
				<view class="gzteacherbox" v-for="(item,index) in gzteacherlist" :key="item.index" @tap="attentiondetais(item)">
					<view class="" style="margin-right: 32rpx;">
						<image class="gzteacher-img" :src="item.avatar" mode="aspectFill"></image>
					</view>
					<view class="" style="flex: 1;margin-top: 10rpx;">
						<view class="gzteacher-name">
							{{item.taitl}}
						</view>
						<text class="gzteacher-dada" v-for="lists in item.list" :key="lists.index">
							{{lists}}
						</text>
					</view>
					<view class="gzteacher-imgbox" v-if="showgl" @click.stop="pitchbtn(index,item)">
						<image v-if="item.pitch" src="../../../static/image/73.png" mode="" style="width: 50rpx;height: 50rpx;"></image>
						<image v-else src="../../../static/image/72.png" mode=""  style="width: 50rpx;height: 50rpx;"></image>
					</view>
				</view>
			</mescroll-body>
		</view>
	</view>
</template>

<script>
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import tuiRate from "@/components/rate/rate"
	export default {
		components:{
			tuiRate
		},
		mixins: [MescrollMixin],
		data() {
			return {
				downOption: {
					auto: true //是否在初始化后,自动执行downCallback; 默认true
				},
				pitch:true,
				showgl:false,
				idlist:[],
				startindex: 2,
				condition:{
					type:true,
					typesd:'管理'
				},
				gzteacherlist:[
					{
						avatar:'../../../static/image/72.png',
						taitl:'英语Tina老师 中小学',
						list:['小学语文','十年教龄'],
						pitch:false
					},
					{
						avatar:'../../../static/image/72.png',
						taitl:'英语Tina老师 中小学',
						list:['小学语文','十年教龄'],
						pitch:false
					}
				]
			}
		},
		onShow(){
			this.downCallback()
		},
		methods: {
			goback() {
				uni.navigateBack({
					delta: 1
				});
			},
			attentiondetais(v){
				uni.navigateTo({
					url: `/pages/client/home/teachersAbb/teachersAbb?id=${v.id}`
				})
			},
			/*下拉刷新的回调 */
			downCallback() {
				this.mescroll.resetUpScroll()
			},
			// 列表的事件  /*上拉加载的回调: 其中page.num:当前页 从1开始, page.size:每页数据条数,默认10 */
			upCallback(page) {// 所有的加载列表接口只允许写在此处
				let params = {
					pageNumber: page.num,
					pageSize: page.size
				}
				this.api.getTeacherFocusVo(params)
					.then((res) => {
						// 接口返回的当前页数据列表 (数组)
						let curPageData = res.records;
						// 接口返回的当前页数据长度 (如列表有26个数据,当前页返回8个,则curPageLen=8)
						let curPageLen = curPageData.length;
						// 接口返回的总页数 (如列表有26个数据,每页10条,共3页; 则totalPage=3)
						let totalPage = res.pages;
						//设置列表数据
						setTimeout(() => { // 模拟效果
							if (page.num == 1) this.gzteacherlist = []; //如果是第一页需手动置空列表
							this.gzteacherlist = this.gzteacherlist.concat(curPageData); //追加新数据
							// 请求成功,隐藏加载状态
							//方法一(推荐): 后台接口有返回列表的总页数 totalPage
							this.mescroll.endByPage(curPageLen, totalPage);
						}, 500)
					})
					.catch((err) => {
						this.mescroll.endErr()
					})
			},
			getTeacherFocusVo(){
				this.api.getTeacherFocusVo().then(res=>{
					console.log(res)
				})
			},
			change: function(e) {
				this.index = e.index;
				this.current = e.index
			},
			pitchbtn(index,item){
				console.log('sssddd',item)
	            this.gzteacherlist[index].pitch=!this.gzteacherlist[index].pitch
				if(this.gzteacherlist[index].pitch==true){
					this.idlist.push(item.id)
				}if(this.gzteacherlist[index].pitch==false){
					if(this.idlist.indexOf(item.id) != -1){
						delete this.idlist[this.idlist.indexOf(item.id)]
					}
					console.log(item)
				}
				console.log(this.idlist)
			},
			management(){
				this.showgl=true
				if(this.condition.type){
					this.condition.typesd='取消关注',
					this.condition.type=!this.condition.type
				}else{
					this.condition.typesd='管理',
					this.condition.type=!this.condition.type
					this.showgl=false
					if(this.idlist.length==!0){
						this.api.removeMore({
							ids:this.idlist
						}).then(res=>{
							console.log(this.idlist)
							if(!this.idlist.length==0){
								console.log(res)
								this.tui.toast('取消关注成功')
								this.mescroll.resetUpScroll()
							}
						})
					}
				}
				
			}
		}
	}
</script>

<style>
	.managembtn{
		font-size:32rpx;
		font-family:PingFang SC;
		color:rgba(153,153,153,1);
	}
	.heads {
		display: flex;
		padding: 25rpx 30rpx;
		background: #ffffff;
		position: -webkit-sticky;
		position: sticky;
		top: var(--window-top);
		z-index: 99;
	}
	.workheads {
		flex: 1;
		text-align: center;
		font-size: 33rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
	}
	.gzteacher{
		background: #FFFFFF;
	}
	.gzteacher-img{
		width:100rpx;
		height:100rpx;
		margin-top: 15rpx;
		border-radius:50%;
	}
	.gzteacherbox{
		display: flex;
		padding: 39rpx 30rpx;
		border-bottom: 1px solid rgba(238,238,238,1);
	}
	.gzteacher-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height: 52rpx;
	}
	.gzteacher-list{
		font-size:22rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		margin-bottom: 20rpx;
		display: flex;
	}
	.gzteacher-dada{
		display: inline-block;
		height:30rpx;
		font-size:26rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		text-align: center;
		margin-right: 13rpx;
		padding: 4rpx 15rpx;
		background:rgba(242,244,248,1);
		opacity:1;
		line-height: 30rpx;
		border-radius:4px;
		margin-top: 12rpx;
	}
	.gzteacher-imgbox{
		margin-top: 43rpx;
	}
</style>
