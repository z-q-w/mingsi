<template>
	<view style="min-height: 100%;background: #FFFFFF;">
		<view class="" v-for="item in classdata" style="padding: 30rpx;">
			<view class="buclasd">
				{{item.name}}
			</view>
			<view class="contsgh">
				<view :class="contsimgid==conts.id?'contsghitem':'uncontsghitem'" v-for="(conts,index) in item.gradeResVOS" @click="contsimg(conts)">
					{{conts.name}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				contsimgid:36,
				classdata:[]
			}
		},
		onLoad() {
			this.findListBySubjectIdGroupByGrade()
		},
		methods: {
			contsimg(v){
				console.log(v)
				this.contsimgid=v.id
				setTimeout(()=>{
					uni.navigateBack({
					    delta: 1
					});
				},200)
				
				uni.$emit('electnian',{msg:v})
			},
			findListBySubjectIdGroupByGrade(){
				this.api.findListBySubjectIdGroupByGrade().then(res=>{
					this.classdata=res.data
				})
			},
		}
	}
</script>

<style>
	.contsgh{
		display: flex;
		flex-wrap:wrap
	}
	.contsghitem{
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
	.uncontsghitem{
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
	.buclasd{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:42rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin-bottom: 30rpx;
	}
</style>
