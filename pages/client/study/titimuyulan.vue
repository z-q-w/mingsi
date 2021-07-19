<template>
	<view style="background: #fff;margin: 30rpx;border-radius: 12rpx;padding: 20rpx;">
		<text class="heads-content">{{ datalist[i]!=null?datalist[i].title:'' }}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				courseCatalogId:'',
				type:'',
				i:'',
				datalist:''
			}
		},
		onLoad(optin) {
			this.courseCatalogId=optin.courseCatalogId
			this.type=optin.type
			this.i=optin.i
			this.findMyHomeworkVoList()
		},
		methods: {
			findMyHomeworkVoList(){//获取题目
				let params = {
					courseCatalogId:this.courseCatalogId,
					type:this.type
				}
				this.api.homeworkdetail(params).then(res=>{
					this.datalist = res.data.topicList;
				})
			},
		}
	}
</script>

<style>

</style>
