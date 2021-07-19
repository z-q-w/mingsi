<template>
	<view>
		<view class="xieyi" v-html="agreeme">
			{{agreement}}
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			    agreeme:'',//协议
				type:'6',
			}
		},
		onLoad() {
			this.agreement()
		},
		methods: {
			agreement(){
				this.api.agreement(
					this.type
				).then(res=>{
					this.agreeme=res.data
				})
			}
		}
	}
</script>

<style>
	.xieyi{
		background: #FFFFFF;
		padding: 50rpx 30rpx;
	}
</style>
