<template>
	<view>
		<!-- 地址 -->
		<view class="increstyle" @tap="increased(typeas)" v-if="loyalty.id==''" style="margin-top: 26rpx;">
			<text style="font-size: 42rpx;color: #F27F31;margin-right: 10rpx;">+</text>请选择地址
		</view>
		<view class="site-dz" v-else>
			<image src="../../../static/image/83.png" mode="" style="width: 35rpx;height: 40rpx;margin-top: 32rpx;margin-right: 15rpx;"></image>
			<view class="" style="width: 620rpx;margin: 20rpx 20rpx 0rpx 5rpx;" @tap="sitebtn(typeas)">
				<view class="site-site">
					<text style="margin-right: 20rpx;font-size: 30rpx;">{{loyalty.provinceName}}{{loyalty.cityName}}{{loyalty.areasName}}{{loyalty.address}}</text>
				</view>
				<view class="site-detailed">
					{{loyalty.username}}
					<text style="color: #6F6F6E;">{{loyalty.consigneeMobile}}</text>
				</view>
			</view>
			<view class="" style="line-height: 120rpx;">
				<image src="../../../static/image/24.png" style="width:14rpx;height:25rpx;" mode=""></image>
			</view>
		</view>
		<!-- 内容 -->
		<view class="content-sd">
			<view class="" style="display: flex;padding: 30rpx 0;">
				<view class="content-img">
					<image :src="chessdata.thumbnails" mode="" class="content-img"></image>
				</view>
				<view class="">
					<view class="content-content">{{chessdata.name}}</view>
					<view class="dadanu">x{{number}}</view>
				</view>
			</view>
			<view class="wayno">
				<text>购买数量</text>
				<view class="">
					<text class="minus" @click="minusbtn">-</text>
					<text style="display: inline-block;width: 40rpx;text-align: center;">{{jfunm}}</text>
					<text class="addjia" @click="addjiabtn">+</text>
				</view>
			</view>
			<view class="wayno">
				<text>积分</text>
				<text>{{chessdata.integral}}</text>
			</view>
		</view>
		<!-- 最下面的定位 -->
		<view class="tui-com-new">
			<view class="comdtail">
				<text style="margin: 0 40rpx;">合计:</text>
				<text class="totals">积分{{total}}</text>
			</view>
			<view class="comdhuan" @tap="conversion">去兑换</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {			
				site:'合肥市包河区和地广场',
				detailed:'合肥市 包河区 中国光大银行合肥出国金融服务中心 16号楼1234室合肥16号楼1234室', 
				number:'1',
				typeas:'596',
				total:'',
				jfunm:'1',
				chessdata:{},
				loyalty:{},
				modal8: false, //是否弹窗
				totaldata:'',
			}
		},
		onShow() {
			this.addressdefault() //获取默认地址
		},
		onLoad(option) {
			console.log(option)
			this.jfdetaisid=option.jfdetaisid
			// this.getDefaultAddress()
			this.goodsdetail()
			uni.$on('ressinfo',(data)=>{
			     console.log('监听到事件来自 update ，携带参数 msg 为：' + data.msg);
				this.loyalty=uni.getStorageSync('ressinfo')
			})
		},
		methods: {
			increased(v){
				this.modal8=false
				uni.navigateTo({
				    url:'/pages/client/user/newAddress?resstype=' + 1
				});
			},
			goodsdetail(){ //详情
				this.api.goodsdetail({
					id:this.jfdetaisid
				}).then(res=>{
					console.log(res)
					this.chessdata=res.data
					this.total=res.data.integral
					this.totaldata=res.data.integral
				})
			},
			addressdefault(){//获取默认地址
				this.api.addressdefault().then(res=>{
					console.log(res)
					this.loyalty=res.data
					console.log(this.loyalty)
				})
			},
			minusbtn(){//减法
				if(this.jfunm>1){
					this.jfunm--
					this.total=this.jfunm*this.totaldata
				}
			},
			addjiabtn(){
				this.jfunm++
				this.total=this.jfunm*this.totaldata
			},
			exchange(){
				this.api.orderGoodsorder({
					id:this.chessdata.id,
					num:this.jfunm,
					addressId:this.loyalty.id,
				}).then(res=>{
					this.tui.toast("兑换成功")
					this.hide8()
					console.log(res)
					setTimeout(()=>{
						uni.navigateTo({
						    url: `/pages/client/user/Integralorder`
						});
					},500)
				}).catch((err) => {
					this.tui.toast(err.message)
					this.hide8()
				})
			},
			conversion(){
				if(this.loyalty.username=='' || this.loyalty.username==undefined){
					this.tui.toast('请选择收货地址')
					return
				}
				uni.showModal({
				    title: '温馨提示',
				    content: '您确定兑换该商品吗',
				    success: (res)=> {
				        if (res.confirm) {
							this.exchange()
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			show8() {
				this.modal8 = true
			},
			//隐藏客服事件
			hide8() {
				this.modal8 = false
			},
			sitebtn(v){
				uni.navigateTo({
				     url:'/pages/client/user/newAddress?resstype=' + 1
				});
			}
		}
	}
</script>

<style>
	.site-dz{
		display: flex;
		justify-content: space-between;
		background: #FFFFFF;
		padding: 0 30rpx;
		margin: 30rpx;
		border-radius: 12rpx;
	}
	.site-site{
		font-size:25rpx;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
	}
	.site-detailed{
		margin-top: 10rpx;
		font-size:29rpx;
		font-family:PingFang SC;
		letter-spacing:2rpx;
		color:rgba(102,102,102,1);
		line-height:50rpx;
	}
	.minus{
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 55rpx;
		background: #CCCCCC;
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 40rpx;
	}
	.addjia{
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
		text-align: center;
		line-height: 55rpx;
		background: #F27F31;
		border-radius: 50%;
		color: #FFFFFF;
		font-size: 40rpx;
	}
	.content-sd{
		padding: 0 30rpx;
		background: #FFFFFF;
		margin: 30rpx;
		border-radius:12rpx;
	}
	.content-img{
		width:150rpx;
		height:150rpx;
		border-radius:6rpx;
		margin-right: 25rpx;
		background: #000000;
	}
	.content-content{
		font-weight:400;
		font-size:32rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
		line-height:36rpx;
	}
	.yue-time{
		padding: 10rpx 30rpx 30rpx 30rpx;
		background: #FFFFFF;
	}
	.yue-tetle{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
	}
	.yue-sd{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:21rpx;
		float: right;
		margin-top: 13rpx;
	}
	.btn-boxbottom{
		display: flex;
	}
	.tui-com-new{
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		background-color: #FFFFFF;
		box-sizing: border-box;
	}
	.comdtail{
		width: 70%;
		height:89rpx;
		background: #FFFFFF;
		display: inline-block;
		line-height: 89rpx;
		font-size:33rpx;
		font-family:PingFang SC;
		font-weight:500;
	}
	.comdhuan{
		width: 190rpx;
		height:60rpx;
		background:#F27F31;
		color: #FFFFFF;
		display: inline-block;
		text-align: center;
		line-height: 60rpx;
		font-size:33rpx;
		font-family:PingFang SC;
		border-radius: 89rpx;
		font-weight:500;
		color:rgba(255,255,255,1);
	}
	.totals{
		color: #FF2323;
	}
	.dadanu{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:21rpx;
		margin-top: 40rpx;
	}
	.increstyle{
		background: #FFFFFF;
		padding: 30rpx;
		margin: 30rpx;
	}
	.wayno{
		border-top: 1rpx solid rgba(238,238,238,1);
		font-size:32rpx;
		font-family:PingFang SC;
		line-height: 100rpx;
		font-weight:400;
		color:rgba(51,51,51,1);
		opacity:1;
		display: flex;
		justify-content: space-between;
	}
</style>
