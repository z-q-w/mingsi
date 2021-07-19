<template>
	<view style="min-height: 100%;width: 750rpx;position: relative;">
		<image src="../../../static/image/49.png" mode="" style="position:fixed;width:100%;height:100%"></image>
		<view @click="startdt" style="position: absolute;bottom: 200rpx;">
			<image src="../../../static/image/50.png" mode="" style="width:300rpx;height: 100rpx;left: 75%;"></image>
		</view>
		<view @click="ruregular" class="" style="position: absolute;bottom: 120rpx;color: rgb(244, 122, 81);left: 42%">
			<view class="" style="text-decoration:underline;line-height: 60rpx;" >
				规则说明
			</view>
		</view>
		<tui-modal :show="modal8" @cancel="hide8" :custom="true">
			<view class="tui-modal-custom-text">规则说明</view>
			<scroll-view :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" @scrolltoupper="upper" @scrolltolower="lower" @scroll="scroll">
				<view class="" v-html="rudata" style="margin: 30rpx;"></view>
			</scroll-view>
		</tui-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				modal8:false,
				type:'4',
				rudata:''
			}
		},
		onLoad() {
			this.agreement()
		},
		methods: {
			startdt(){
				uni.navigateTo({
					url:'./chooseType'
				})
			},
			ruregular(){
				this.modal8=true
			},
			hide8(){
				this.modal8=false
			},
			agreement(){//规则
				this.api.agreement(
					this.type
				).then(res=>{
					this.rudata=res.data
				})
			},
		}
	}
</script>

<style>
	.tui-modal-custom-text {
		font-size: 34rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: rgba(51, 51, 51, 1);
		text-align: center;
		margin-top: 20rpx;
	}
	.scroll-Y {
		height: 400rpx;
	}
</style>
