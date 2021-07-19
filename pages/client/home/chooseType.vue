<template>
	<view class="choosetype" style="min-height: 100%;width: 750rpx;">
		<view class="kaoshi">
			选择考试类型
		</view>
		<view class="choosenian">
			———
			<text style="margin: 0 30rpx;">选择年级</text>
			———
		</view>
		<view class="" v-for="item in classdata" style="padding: 30rpx;">
			<view class="buclasd">
				{{item.name}}
			</view>
			<view class="contsgh">
				<view :class="gradeid==conts.id?'contsghitem':'uncontsghitem'" v-for="(conts,index) in item.gradeResVOS" @click="contsimg(conts)">
					{{conts.name}}
				</view>
			</view>
		</view>
		<view class="choosenian">
			———
			<text style="margin: 0 30rpx;">选择科目</text>
			———
		</view>
		<view class="" style="display: flex;flex-wrap:wrap;padding: 30rpx 0rpx 30rpx 30rpx;">
			<view :class="kemulistindex==index?'kemu':'unkemu'" v-for="(item,index) in kemulist" @click="kemulistbtn(index,item)">{{item.name}}</view>
		</view>
		<view @click="startdt" style="text-align: center;margin-top: 70rpx;">
			<image src="../../../static/image/50.png" mode="" style="width:300rpx;height: 100rpx"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				kemulistindex:0,
				gradeid:'',//年级id
				subjectid:'',//科目id
				kemulist:[],//科目
				classdata:[],//年级
				
			}
		},
		onLoad() {
			this.findListBySubjectIdGroupByGrade()
		},
		methods: {
			//查询年级
			findListBySubjectIdGroupByGrade(){
				this.api.findListBySubjectIdGroupByGrade().then(res=>{
					this.classdata=res.data
					this.contsimg(this.classdata[0].gradeResVOS[0])
				})
			},
			//根据年级查科目
			findListByGradeId(){
				this.api.findListByGradeId({
					gradeId:this.gradeid
				}).then(res=>{
					this.kemulist=res.data
					this.kemulistbtn(0,this.kemulist[0])
					console.log(res)
					
				})
			},
			// 点击年级事件
			contsimg(v){
				console.log(v)
				this.gradeid=v.id
				console.log(this.gradeid,'年级id')
				this.findListByGradeId()
			},
			//点击科目事件
			kemulistbtn(index,item){
				this.kemulistindex=index
				this.subjectid=item.id
				console.log(this.subjectid,'科目id')
			},
			//开始答题
			startdt(){
				if(this.gradeid==''){
					this.tui.toast('请选择年级')
				}else if(this.subjectid==''){
					this.tui.toast('请选择科目')
				}else{
					this.api.matchPaper({
						deptId:uni.getStorageSync('deptId'),//机构id
						gradeId:this.gradeid,//年级id
						subjectId:this.subjectid //科目id
					}).then(res=>{
						var codesd=res.code //试卷id
						if(codesd==200){
							if(res.data.topicList.length==0){
								this.tui.toast('未匹配到试卷')
							}else{
								uni.navigateTo({
									url:'./enterAppraisal?gradeid=' + this.gradeid + '&subjectid=' +this.subjectid
								})
							}
						}else{
							this.tui.toast(res.message)
						}
						
					})
				}
			},
		}
	}
</script>

<style>
	.choosetype{
		background-image: url(../../../static/image/51.png);
		background-size: 100%;
		background-repeat: no-repeat;
		background-size:cover;
		padding: 100rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}
	.kaoshi{
		font-size: 45rpx;
		font-family: PingFang SC;
		font-weight: bold;
		line-height: 42rpx;
		color: #FFFFFF;
		opacity: 1;
	}
	.choosenian{
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: 400;
		line-height: 42rpx;
		color: #FFFFFF;
		opacity: 1;
		text-align: center;
		margin: 40rpx 0;
	}
	.buclasd{
		font-size:32rpx;
		font-family:PingFang SC;
		font-weight:400;
		line-height:42rpx;
		color:rgba(51,51,51,1);
		opacity:1;
		margin-bottom: 30rpx;
		color: #FFFFFF;
	}
	.contsgh{
		display: flex;
		flex-wrap:wrap
	}
	.contsghitem{
		height:58rpx;
		background:#FFD170;
		opacity:1;
		padding: 0 42rpx;
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
		padding: 0 42rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: rgba(153,153,153,1);
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
	.kemu{
		height:58rpx;
		background:#FFD170;
		opacity:1;
		padding: 0 32rpx;
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
		padding: 0 32rpx;
		border-radius:43rpx;
		text-align: center;
		line-height: 58rpx;
		color: rgba(153,153,153,1);
		margin-right: 30rpx;
		margin-bottom: 30rpx;
	}
</style>
