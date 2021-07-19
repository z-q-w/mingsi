<template>
	<view>
		<view class="details-box">
			<view class="cusee">
				兑换成功
			</view>
			<image class="cusee-img" src="../../../static/image/6314d1bf1d1110bf997f145902ceb2d.png" style=""></image>
		</view>
		<view class="boxditails" style="" @tap="jumpxqs">
			<view class="ditails-list" style="display: flex;">
				<image class="ditails-list-img" :src="detegralist.thumbnails" mode=""></image>
				<view class="" style="flex: 1;">
					<view class="detatest">
						{{detegralist.name}}
					</view>
					<view class="detalshu">
						x{{detegralist.num}}
					</view>
				</view>
			</view>
			<view class="ditailsjifen">
				<view class="" style="flex: 1;">
					兑换积分
				</view>
				<view class="" style="color:rgba(51,51,51,1);">
					{{detegralist.totalIntegral}}积分
				</view>
			</view>
			<view class="ditailsjifen">
				<view class="" style="flex: 1;">
					兑换时间
				</view>
				<view class="" style="color:rgba(51,51,51,1);">
					{{detegralist.createTime}}
				</view>
			</view>
		</view>
		<view class="courier">
			<view class="" style="color:rgba(153,153,153,1);font-size:29rpx;flex: 1;">
				快递单号
			</view>
			<view class="" style="color:rgba(51,51,51,1);font-size:29rpx; ">
				{{detegralist.courierId}}
			</view>
		</view>
		<view class="courier">
			<view class="" style="color:rgba(153,153,153,1);font-size:29rpx;flex: 1;">
				快递公司
			</view>
			<view class="" style="color:rgba(51,51,51,1);font-size:29rpx; ">
				{{detegralist.logistics}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detegralist:{},
				videoSrc:''
			}
		},
		onLoad: function (option) {
			console.log(option)
			this.orderGsId=option.integralid
			this.getjifenId()
		},
		methods: {
			jumpxqs(v){
				console.log(v)
				uni.navigateTo({
				   url: `/pages/client/user/personaldata/jfgoodsdetails/jfgoodsdetails?videoSrc=${this.videoSrc}`
				});
			},
			getjifenId(){
				this.api.orderGoodsdetail(
					this.orderGsId
				).then(res=>{
					console.log(res)
					this.detegralist=res.data
					this.videoSrc=res.id
				})
			}
		}
	}
</script>

<style>
	.details-box{
		box-sizing:boder-box;
		height:112rpx;
		background:linear-gradient(180deg,rgba(242,148,34,1) 0%,rgba(242,111,61,1) 100%);
		opacity:1;
		margin-top: -1rpx;
		display: flex;
		justify-content: space-between;
		padding: 50rpx 80rpx 50rpx 50rpx;
	}
	.cusee{
		margin-left: 100rpx;
		font-size:36rpx;
		margin-top:40rpx;
		color: #FFFFFF;
	}
	.cusee-img{
		width:116rpx;
		height:121rpx;
		margin-left:234rpx;
		margin-top: 10rpx;
	}
	.ditails-list-img{
		width:220rpx;
		height:169rpx;
		border-radius:6rpx;
		margin-right: 25rpx;
	}
	.boxditails{
		padding: 30rpx 30rpx 0rpx 30rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
	}
	.detatest{
		height: 70rpx;
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(51,51,51,1);
		line-height:36rpx;
		margin-bottom: 45rpx;
		margin-top: 15rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}
	.detalshu{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:21rpx;
	}
	.ditailsjifen{
		font-size:25rpx;
		font-family:PingFang SC;
		font-weight:500;
		color:rgba(153,153,153,1);
		line-height:80rpx;
		display: flex;
	}
	.courier{
		display: flex;
		padding: 30rpx;
		background: #FFFFFF;
		margin-top: 30rpx;
	}
</style>
