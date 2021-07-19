<template>
	<view style="padding: 30rpx;min-height:97%;background: #FFFFFF;">
		<view class="" v-html="data">
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				type:'2',
				data:''
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
					this.data=res.data
				})
			}
		}
	}
</script>

<style>

</style>
