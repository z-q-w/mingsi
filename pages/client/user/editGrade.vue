<template>
	<view style="min-height: 100%;background: #FFFFFF;padding-top: 40rpx;">
		<view class="discipline">
			<text :class="grade==item.name ? 'discipline-color' : 'discipline-tabmei'" v-for="(item, index) in tabdata2" :key="index" @click="tabclick2(item, index)">
				{{ item.name }}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				grade:this.cacheHelper.appUser().grade,
				tabdata2:[
					{
						name:"一年级"
					},
					{
						name:"二年级"
					},
					{
						name:"三年级"
					},
					{
						name:"四年级"
					},
					{
						name:"五年级"
					},
					{
						name:"六年级"
					},
					{
						name:"初一"
					},
					{
						name:"初二"
					},
					{
						name:"初三"
					},
					{
						name:"高一"
					},
					{
						name:"高二"
					},
					{
						name:"高三"
					},
				],
			}
		},
		onNavigationBarButtonTap(){
			this.edituser()
		},
		methods: {
			tabclick2(item, index) {//控制2
				this.gradeindex=index
				this.grade=item.name
			},
			edituser(){
				this.api.customeredit({
					grade:this.grade
				}).then(res=>{
					this.tui.toast('修改成功')
					setTimeout(()=>{
						this.cacheHelper.updateUserInfo()
						uni.navigateBack({
							delta:1
						})
					},300)
					console.log(res)
				})
			}
			
		}
	}
</script>

<style>
	.discipline{
		height: 65rpx;
		display: flex;
		flex-wrap: wrap;
		box-sizing: border-box;
		padding-left: 30rpx;
		width: 720rpx;
	}
	.scroll-view_H {
		white-space: nowrap;
		width:88%;
		box-sizing: border-box;
		.scroll-view-item_H {
			display: inline-block;
			margin-right: 30rpx;
			.slideimg {
			   width: 236rpx;
			   height: 186rpx;
			   border-radius: 12px;
			}
		}
	}
	.discipline-color{
		width: 120rpx;
		height: 43rpx;
		background:linear-gradient(180deg,rgba(242,148,34,1) 0%,rgba(242,111,61,1) 100%);
		border-radius: 22px;
		color: #FFFFFF;
		font-size: 29rpx;
		line-height: 43rpx;
		text-align: center;
		display: inline-block;
		margin: 20rpx 20rpx 20rpx 0;
	}
	.discipline-tabmei{
		width: 120rpx;
		height: 43rpx;
		background: rgba(245, 245, 245, 1);
		border-radius: 22px;
		color: #cccccc;
		font-size: 29rpx;
		line-height: 43rpx;
		text-align: center;
		display: inline-block;
		margin: 20rpx 20rpx 20rpx 0;
	}
</style>
