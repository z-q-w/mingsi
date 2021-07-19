<template>
	<view>
		<view class="uni-margin-wrap" style="padding: 0 0rpx;">
			<swiper circular :autoplay="autoplay"
			:interval="5000" :duration="500"
			:indicator-dots="indicatorDots"
			:indicator-active-color="indicatorcolor"
			style="height: 510rpx;">
				<swiper-item class="swiper" v-for="item in datalist.showFigureList" :current="swiperCurrent" :key="item.index">
					<image :src="item" mode="" style="width: 100%;height: 510rpx;"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="headline">
			<view class="headline-content">{{datalist.name}}</view>
			<view class="headline-point">{{datalist.integral}}积分</view>
		</view>
		<view class="headline-number">
			已选
			<text style="margin-left: 35rpx;font-size:25rpx;font-weight:500;color:rgba(153,153,153,1);">{{number}}件</text>
		</view>
		<view class="shandetails">
			<view class="shandetails-xq">商品详情</view>
			<view class="" style="background:#FFFFFF;padding: 0 30rpx;">
				<rich-text :nodes="strings"></rich-text>
			</view>
		</view>
		<!-- 占位 -->
		<view style="height: 140rpx;background: #FFFFFF;">
			
		</view>
		<view  class="tui-goose-new" @tap="fastexchange">
			<button  class="goosdtail">立即兑换</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist:{},
				gameid:'',
				number:'1',
				strings:'',
				jfdetaisid:'',//积分详情的id
				indicatorDots: true,//是否显示指示点
				autoplay: true,//是否自动播放
				indicatorcolor:'rgba(247,99,52,1)',//圆点的颜色
				swiperCurrent: 1,//控制轮播图的圆点
			}
		},
		onLoad(option) {
			this.jfdetaisid=option.jfdetaisid //积分详情的id
			this.goodsdetail()//调用详情
		},
		methods: {
			fastexchange(){
				uni.navigateTo({
					url:'./sureOrder?jfdetaisid=' + this.jfdetaisid
				})
			},
			goodsdetail(){
				this.api.goodsdetail({
					id:this.jfdetaisid
				}).then(res=>{
					console.log(res)
					this.datalist=res.data
					console.log(this.datalist.showFigureList.length)
					this.strings = this.datalist.details.replace(/\<img/gi, '<img style="width: 100%;height:auto"');
				})
			}
		}
	}
</script>

<style>
	.goosdetalis{
		height: 500rpx;
	}
	.uni-margin-wrap{
		height: 510rpx;
	}
	.swiper{
		width:690rpx;
		height: 510rpx;
	}
	.headline{
		padding: 30rpx;
		background: #FFFFFF;
	}
	.headline-content{
		font-size:33rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		line-height:43rpx;
	}
	.headline-point{
		font-size:42rpx;
		font-family:DIN;
		font-weight:500;
		color:rgba(255,69,69,1);
		margin-top: 10rpx;
	}
	.headline-number{
		margin: 20rpx 0;
		padding: 30rpx;
		background: #FFFFFF;
		font-size: 32rpx;
	}
	.shandetails{
		
	}
	.shandetails-xq{
		padding: 30rpx;
		font-size:32rpx;
		font-family:PingFang SC;
		color:rgba(51,51,51,1);
		line-height:21rpx;
		background: #FFFFFF;
	}
	.tui-goose-new {
		width: 100%;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 999;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		background: #FFFFFF;
	}
	.goosdtail{
		height: 80rpx;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
		border-radius: 80rpx;
		background:rgba(242,127,49,1);
	}
	.dots {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translate(-50%, 0);
		-webkit-transform: translate(-50%, 0);
		z-index: 99999;
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
</style>
