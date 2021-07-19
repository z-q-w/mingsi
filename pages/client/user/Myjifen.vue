<template>
	<view class="integralIndex" style="min-height: 100%;background: #FFFFFF;">
		<view class="amount">
			<view class="amountBg">
				<view class="amountTitle">
					<view style="font-size: 32rpx;">我的积分</view>
					<view style="font-size: 32rpx;" @click="jiregular">
						<image src="../../../static/image/33.png" mode="" style="width: 30rpx;height: 30rpx;vertical-align:-10%"></image>
						<text style="margin:0 30rpx 0 15rpx;">规则</text>
					</view>
				</view>
				<view class="amountTotal">{{integral}}</view>
			</view>
		</view>
		<view class="transactionDetail">
			<text>历史记录</text>
		</view>
		<view v-if="detailList.length==0" class="nonetxt">暂无明细</view>
		<view v-else class="transactionDetailList">
			<view class="box">
				<view class="" v-for="item in detailList" style="display: flex;padding: 30rpx;justify-content: space-between;border-bottom: 1rpx solid rgba(242,244,248,1);">
					<view class="">
						<view class="walletlist-name">
							{{item.name}}
						</view>
						<view class="walletlist-time">
							{{item.createTime}}
						</view>
					</view>
					<view style="font-size:31rpx;">
						{{item.price}}
					</view>
				</view>
			</view>
		</view>
		<tui-modal :show="modal8" @cancel="hide8" :custom="true">
			<view class="tui-modal-custom-text">积分规则</view>
			<scroll-view scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view class="" v-html="jidata" style="margin: 30rpx;"></view>
			</scroll-view>
		</tui-modal>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				scrollTop:'',
				integral: this.cacheHelper.appUser().integral, //用户信息
				detailList:[],
				modal8:false,
				type:'3',
				jidata:'',
			}
		},
		onLoad() {
			this.integralDetail()
			console.log(this.cacheHelper.appUser())
			this.agreement()
		},
		onShow() {
			this.api.customerinfo().then((res) => {
				var user =res.data;
				this.integral=res.data.integral
			})
		},
		methods: {
			integralDetail(){
				this.api.integralDetail({
					size:200,					current:1
				}).then(res=>{
					this.detailList=res.data.records
				})
			},
			agreement(){//规则
				this.api.agreement(
					this.type
				).then(res=>{
					this.jidata=res.data
				})
			},
			upper: function(e) {
				console.log(e);
			},
			lower: function(e) {
				console.log(e);
			},
			scroll: function(e) {
				console.log(e);
			},
			hide8(){
				this.modal8=false
			},
			jiregular(){
				this.modal8=true
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/.uni-page-body {
		background-color: #FEFBFF !important;
	}
	.walletlist-time{
		font-size:29rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:30rpx;
		color:rgba(204,204,204,1);
		opacity:1;
		margin-top: 8rpx;
	}
	.walletlist-name{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:40rpx;
		color:rgba(51,51,51,1);
		opacity:1;
	}
	.integralIndex {
		.amount {
			width: 100%;
			height: 220rpx;
			background-color: #fff;
			padding-top: 30rpx;
			box-sizing: border-box;

			.amountBg {
				color: #fff;
				width: 690rpx;
				height: 287rpx;
				margin: 0 auto;
				background-image: url(../../../static/image/89.png);
				background-repeat: no-repeat;
				background-size: 100%;
				padding-top: 24rpx;
				padding-left: 39rpx;
				box-sizing: border-box;

				.amountTitle {
					display: flex;
					justify-content: space-between;
					font-size: 34rpx;
					color: #fff;

					.amountBtn {
						width: 148rpx;
						height: 66rpx;
						line-height: 66rpx;
						background-color: #fff;
						color: #F5262D;
						font-size: 36rpx;
						border-radius: 33px;
						margin-right: 66rpx;
					}
				}

				.amountTotal {
					font-size: 42rpx;
					margin-top: 20rpx;
				}
			}
		}

		.transactionDetail {
			margin-top: 20rpx;
			padding-left: 30rpx;
			font-weight:bolder;
			box-sizing: border-box;
			width: 100%;
			height: 96rpx;
			line-height: 96rpx;
			.detailIcon {
				margin-right: 20rpx;
				width: 20rpx;
				height: 20rpx;
			}
		}

		.nonetxt {
			width: 100%;
			height: 108rpx;
			font-size: 32rpx;
			text-align: center;
			color: #999
		}

		.transactionDetailList {
			width: 100%;
			.box {
				width: 100%;
				background-color: #fff;
				padding-bottom: 8rpx;
			}

			.transactionDetailItem {
				width: 710rpx;
				height: 140rpx;
				padding: 25rpx 20rpx;
				box-sizing: border-box;
				background-color: #fff;
				margin: 0 auto 20rpx;
				border-radius: 30rpx;
				border-bottom: 1rpx solid rgb(245,245,245);

				.transactionType {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.earningIcons {
						width: 5px;
						height: 5px;
						margin-right: 14rpx;
						vertical-align: middle;
					}

					.txt {
						font-size: 28rpx;
						color: #62BE5B;
					}

					.transactionPrice {
						font-size: 28rpx;
					}
				}

				.transactionExplain {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 22rpx;
					color: #999;
					margin-top: 25rpx;
				}
			}
		}
	}
	.scroll-Y {
		height: 400rpx;
	}
	.tui-modal-custom-text {
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		margin-top: 20rpx;
	}
</style>
