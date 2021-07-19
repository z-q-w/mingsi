<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view class="" style="display: flex;flex-wrap:wrap;padding: 30rpx;">
			<view :class="kemulistindex==index?'kemu':'unkemu'" v-for="(item,index) in kemulist" @click="kemulistbtn(item,index)">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kemulist:[],
				gradeId:'',//年级的id
			}
		},
		onLoad(option) {
			this.gradeId=option.gradeId
			this.findListByGradeId()
		},
		methods: {
			kemulistbtn(v,index){
				this.kemulistindex=index
				uni.$emit('electke',{msg:v})
				uni.navigateBack({
					delta: 1
				})
			},
			findListByGradeId(){
				this.api.findListByGradeId({
					gradeId:this.gradeId
				}).then(res=>{
					this.kemulist=res.data
					console.log(res)
					
				})
			},
		}
	}
</script>

<style>
	.kemu{
		height:58rpx;
		background:rgba(242,127,49,1);
		opacity:1;
		padding: 0 38rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: #FFFFFF;
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
	.unkemu{
		height:58rpx;
		background:rgba(242,244,248,1);
		opacity:1;
		padding: 0 38rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: rgba(153,153,153,1);
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
