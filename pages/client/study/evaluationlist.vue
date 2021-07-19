<template>
	<view>
		<view class="" @click="lookcs(item)" v-for="item in cedatalist" style="display: flex;background: #FFFFFF;margin: 20rpx 30rpx;padding: 30rpx 0;border-radius: 8rpx;">
			<view class="" style="width: 130rpx;margin: auto;border-right: 1rpx solid #e2e2e2;text-align: center;font-size: 40rpx;color: #F27F31;font-weight: 600;">
				{{item.subjectName}}
			</view>
			<view class="" style="flex: 1;margin-left: 60rpx;">
				<view class="" style="color: #333333;">
					{{item.gradeName}}
				</view>
				<view class="" style="color: #999999;font-size: 26rpx;">
					{{item.createTime}}
				</view>
			</view>
			<view class="" style="width: 126rpx;height: 47rpx;margin: auto 30rpx auto auto;background: #F27F31;border-radius: 10rpx;font-size: 25rpx;color: #FFFFFF;text-align: center;line-height: 47rpx;">
				查看详情
			</view>
		</view>
		<view class="" v-if="cedatalist.length==0" style="text-align: center;padding-top: 200rpx;">
			<image src="../../../static/image/mescroll-empty.png" mode="" style="width: 350rpx;height: 350rpx;"></image>
			<view class="" style="margin-top: 20rpx;color: #666666;">
				暂无数据
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cedatalist:[],
			}
		},
		onLoad() {
			this.assessList()
		},
		methods: {
			assessList(){
				this.api.assessList(
					uni.getStorageSync('deptIddata')
				).then(res=>{
					console.log(res.data)
					this.cedatalist=res.data
				})
			},
			lookcs(v){
				this.api.resultDetail({
					deptId:v.deptId,
					gradeId:v.gradeId,
					subjectId:v.subjectId
				}).then(res=>{
					if(res.code==200){
						uni.navigateTo({
							url:'/pages/client/study/evaluationpage?gradeId=' + v.gradeId + '&subjectId=' + v.subjectId + '&deptId=' + v.deptId
						})
					}
				}).catch(err => {
					if(err.code==501){
						uni.showModal({
						    title: '提示',
							confirmText:'拨打',
						    content: err.message,
						    success: function (res) {
						        if (res.confirm) {
									var bocal=err.message.length
						            bocal=err.message.substring(bocal-11,bocal);
									uni.makePhoneCall({
									    phoneNumber: bocal //仅为示例
									});
									console.log(bocal)
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				})
			}
		}
	}
</script>

<style>

</style>
