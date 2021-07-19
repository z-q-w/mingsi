<template>
	<view class="rx-cp">
		<view class="status_bar"></view>
		<view class="" style="color: #FFFFFF;padding: 30rpx;display: flex;justify-content: space-between;">
			<image @tap='fanback' src="../../../static/image/a8a2cabe09b2ad058b3d2cca4acc9fa.png" mode="" style="width: 17rpx;height: 30rpx;"></image>
			<view class="">
				{{startti}}/{{topicdata.length}}
			</view>
		</view>
		<view class="" style="background: #FFFFFF;width: 690rpx;min-height:810rpx;margin: 150rpx auto 0 auto;border-radius: 18px;position: relative;">
			<view class="circle">
				{{startti}}
			</view>
			<view class="" style="padding: 100rpx 30rpx 30rpx 30rpx;font-family: PingFang SC;">
				<scroll-view  scroll-y="true" class="scroll-Yjy" @click="request(topicdata[startti-1].title)">
					<text>{{topicdata[startti-1].title}}</text>
				</scroll-view>
				<view v-if="topicdata[startti-1].picture!=''" class="enterimg">
					<view class="" v-for="item in topicdata[startti-1].picture.split(',')" style="position:relative;">
						<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 15rpx;right: 15rpx;z-index: 999;"></image>
						<image :src="item" mode="widthFix" style="width: 600rpx;margin-right: 10rpx;border-radius: 8rpx;" @click="enterimgbtn(item,topicdata[startti-1].picture.split(','))"></image>
					</view>
				</view>
				<view class="" style="margin-top: 60rpx;">
					<view :class="jobid==item.optId ? 'optionscss':''" style="line-height: 60rpx;" v-for="item in topicdata[startti-1].optionList" @click="options(item,topicdata[startti-1].id)">
						<text>{{item.opt}}.</text>
						<text>{{item.content}}</text>
						<view class="" v-if="item.picture != ''">
							<view class="" v-for="items in item.picture" style="position:relative;">
								<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 15rpx;right: 15rpx;z-index: 9;"></image>
								<image :src="items" mode="widthFix" style="width: 600rpx;margin-right: 10rpx;border-radius: 8rpx;" @click="enterimgbtn(items,item.picture)"></image>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="display: flex;">
			<view v-if="startti==topicdata.length" class="nextti" @click="submit">
				提交
			</view>
			<view v-else class="nextti" @click="nexttibtn">
				下一题
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gradeid:'',//年级id
				subjectid:'',//科目id
				selectdata:[],//选择题的答案
				startti:1,
				endti:5,
				optionsid:'',//选项的id
				optionlist:[],
				topicdata:[],//题库
				paperid:'',//试卷id
				arr:[],
				jobid:'',
			}
		},
		onLoad(option) {
			this.gradeid=option.gradeid  //年级id
			this.subjectid=option.subjectid  //科目id
			this.matchPaper()
		},
		methods: {
			nexttibtn(){
				console.log(this.selectdata[this.startti-1])
				if(this.selectdata[this.startti-1]=='' || this.selectdata[this.startti-1]==undefined){
					this.tui.toast('请选择答案')
				}else{
					if(this.startti>=this.topicdata.length) return
					this.startti++
					console.log(this.startti)
				}
			},
			request(v){//点击题目跳转页面
				uni.setStorageSync('cepingtail',v)
				if(this.topicdata[this.startti-1].title.length>150){//只有题目超过多少字符才会跳转
					uni.navigateTo({
						url:'/pages/client/home/cepingtail/cepingtail'
					})
					
				}
			},
			enterimgbtn(img,imgList){// 预览图片
				uni.previewImage({
					current: img,
					urls: imgList,
					indicator: "default",
				});
			},
			submit(){
				if(this.selectdata.length != this.topicdata.length){
					uni.showModal({
					    title: '提示',
					    content: '您有题目没做完哦,确认提交吗',
					    success:(res)=>{
					        if (res.confirm) {
					           this.api.assesssubmit({
					           	id:this.paperid,//试卷id
					           	deptId:uni.getStorageSync('deptId'),
					           	topicList:this.selectdata
					           }).then(res=>{
					           	console.log(res)
					           })
					        } else if (res.cancel) {
					            console.log('用户点击取消');
					        }
					    }
					});
				}else{
					this.api.assesssubmit({
						id:this.paperid,//试卷id
						deptId:uni.getStorageSync('deptId'),
						topicList:this.selectdata
					}).then(res=>{
						this.tui.toast('提交成功')
						setTimeout(()=>{
							uni.switchTab({
							    url: '/pages/client/home/home'
							});
						},500)
					})
				}
			},
			fanback(){
				uni.navigateBack({
					delta: 1
				})
			},
			matchPaper(){
				this.api.matchPaper({
					deptId:uni.getStorageSync('deptId'),//机构id
					gradeId:this.gradeid,//年级id
					subjectId:this.subjectid //科目id
				}).then(res=>{
					this.paperid=res.data.id //试卷id
					this.topicdata=res.data.topicList
					this.topicdata.forEach(item=>{
						item.optionList.forEach(value=>{
							console.log(value,'ffffffffffffffffffff')
							value.picture=value.picture.split(',')
						})
					})
				})
			},
			options(v,id){  //id是每道题目的id
				console.log(v)
				var every={}
				every.id=id
				every.optionId=v.optId
				if(this.selectdata.length==this.startti-1){
					this.selectdata.push(every)
					this.arr.push(v.optId)
					this.jobid=v.optId
				}
				if(this.selectdata[this.startti-1].id==id){
					this.selectdata[this.startti-1].optionId=v.optId
					this.arr[this.startti-1]=v.optId
					this.jobid=v.optId
				}else{
					this.selectdata.push(every)
					this.arr.push(v.optId)
					this.jobid=v.optId
				}
				console.log(this.selectdata,'数组')
				console.log(this.arr.includes(v.optId),this.arr)
			}
		}
	}
</script>

<style>
	.rx-cp{
		background-image: url(../../../static/image/51.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		box-sizing: border-box;
		min-height: 100%;
	}
	.circle{
		width: 144rpx;
		height: 144rpx;
		border: 12rpx solid #FFFFFF;
		background: radial-gradient(circle, #F4A163 0%, #F26247 100%);
		border-radius: 50%;
		opacity: 1;
		border: 20rpx solid #FFFFFF;
		position: absolute;
		top: -100rpx;
		right: 240rpx;
		text-align: center;
		line-height: 144rpx;
		color: #FFFFFF;
		font-weight: bold;
		font-size: 85rpx;
		font-family: PingFang SC;
	}
	.nextti{
		background-image:url(../../../static/image/52.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		width: 328rpx;
		height: 122rpx;
		margin: 120rpx auto 0rpx auto;
		text-align: center;
		line-height: 100rpx;
		font-size: 37rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
	}
	.enterimg{
		display: flex;
		margin-top: 30rpx;
		flex-wrap: wrap;
	}
	.optionscss{
		color: #008000;
	}
	.scroll-Yjy{
		max-height: 300rpx;
	}
</style>
