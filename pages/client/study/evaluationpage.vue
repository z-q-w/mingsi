<template>
	<view class="bugbox">
		<view class="" style="height: 1350rpx;box-sizing: border-box;">
			<view class="" style="padding-top: 100rpx;">
				<view class="reporttop">
				</view>
			</view>
			<view class="" style="display: flex;justify-content: space-between;padding: 20rpx;">
				<view class="top2left">
					<view style="font-size: 42rpx;color: #FFFFFF;text-align: center;margin-top: 48rpx;">{{reportdata.score}}</view>
					<view class="cename" style="margin-top: 5rpx;">测评分数</view>
				</view>
				<view class="top2mind" style="text-align: center;">
					<image src="../../../static/image/ceping/xingxing.png" mode="" style="width: 60rpx;height: 60rpx;margin-top: 50rpx;"></image>
					<view class="cename" style="margin-top: 0rpx;">{{reportdata.comments}}</view>
				</view>
				<view class="top2ritgt">
					<view style="font-size: 26rpx;text-align: center;color: #FFFFFF;margin:auto;width: 130rpx;min-height: 40rpx;padding-top:70rpx;">{{reportdata.classType}}</view>
					<view class="cename" style="margin-top: 8rpx;">推荐班型</view>
				</view>
			</view>
			<view class="sendword" style="box-sizing: border-box;padding-left: 68rpx;margin: 0 auto;">
				<view class="" style="font-size: 29rpx;font-weight: 500;color: rgb(235,99,51);padding-top: 144rpx;width: 520rpx;">
					亲爱的{{reportdata.username}}小朋友本次测评结果为:{{reportdata.assessLevel}}
				</view>
				<scroll-view  scroll-y="true" class="scroll-Yjy" style="margin-top: 5rpx;">
					<view class="" style="color: rgb(235,99,51);font-size: 26rpx;width: 510rpx;line-height: 40rpx;">
						<view class="">
							<text v-if="cpgenju!=''">根据对{{cpgenju}}领域的考察,</text>
							<text v-if="cpbijiao!=''">您在{{cpbijiao}}能力方面表现较强</text>
						</view>
						<view class="" v-for="item in knowledges">
							在{{item}}知识点的运用上表现很好，值得鼓励
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<view class="" style="background:rgb(255,194,84);">
			<!-- 学生报告单 -->
			<view class="baogao" style="padding-top: 140rpx;box-sizing: border-box;" v-if="reportdata.wrongQuestionList.length!=0">
				<view class="" style="width: 600rpx;margin:0 auto;border-bottom:1rpx solid rgb(235,99,51);padding-bottom: 14rpx;">
					<view class="" style="display: flex;text-align: center;font-size: 30rpx;font-weight: 600;color: rgb(235,99,51);">
						<view style="width: 33%;">失分题号</view>
						<view style="width: 33%;">领域</view>
						<view  style="width: 33%;">知识点</view>
					</view>
				</view>
				<scroll-view  scroll-y="true" class="scroll-Yss">
					<view class="" v-for="item in reportdata.wrongQuestionList" style="">
						<view class="" style="width: 600rpx;margin:0 auto;border-bottom:1rpx solid rgb(235,99,51)">
							<view class="" style="display: flex;padding: 20rpx 0;font-size: 26rpx;color:rgb(235,99,51) ;">
								<view style="width: 33%;text-align: center;margin: auto;">{{item.titleNumber}}</view>
								<view style="width: 33%;margin: auto 0;text-align: center">{{item.domain}}</view>
								<view  style="width: 33%;">{{item.knowledge}}</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
			<view class="" style="padding: 20rpx 0;margin: 0 auto;">
				<!-- 错题雷达图 -->
				<view class="tongji">
					<view class="" style="padding-top: 90rpx;">
						<view class="qiun-charts" >
							<canvas canvas-id="canvasRadar" id="canvasRadar" class="charts"></canvas>
						</view>
					</view>
					<view class="" style="width: 200rpx;height: 40rpx;margin: -70rpx auto 0 auto;text-align: center;background:rgb(253,246,224);position: relative;"></view>
				</view>
				<view class="capacity">
					<view class="" style="height: 150rpx;"></view>
					<view class="" style="background:rgb(253,246,224);padding-bottom: 50rpx;">
						<!-- 能力雷达图 -->
						<view class="" style="">
							<view class="qiun-charts" >
								<canvas canvas-id="powers" id="powers" class="charts"></canvas>
							</view>
						</view>
						<view class="" v-for="item in reportdata.ablityPro">
							<view class="adhibitionsd">
								<view class="" style="background:rgb(255,225,170);border-top-left-radius:20rpx;border-top-right-radius:20rpx;line-height: 60rpx;padding: 0 30rpx;">
									{{item.content}}
								</view>
								<view class="" style="display: flex;text-align: center;">
									<view class="" style="width: 33%;margin-top: 30rpx;">
										<view class="" style="font-size: 30rpx;">满分</view>
										<view class="" style="margin-top: 20rpx;font-size: 42rpx;color: rgb(235,99,51);">
											{{item.totalScore}}
										</view>
									</view>
									<view class="" style="width: 33%;margin-top: 30rpx;border-right: 1rpx solid rgb(235,99,51);border-left: 1rpx solid rgb(235,99,51)">
										<view class="" style="font-size: 30rpx;">个人得分</view>
										<view class="" style="margin-top: 20rpx;font-size: 42rpx;color: rgb(235,99,51);">
											{{item.myScore}}
										</view>
									</view>
									<view class="" style="width: 33%;margin-top: 30rpx;">
										<view class="" style="font-size: 30rpx;">个人得分率</view>
										<view class="" style="margin-top: 20rpx;font-size: 42rpx;color:rgb(235,99,51) ;">
											{{item.dis.toFixed(2)}}% 
											<!-- .toFixed(n) -->
										</view>
									</view>
								</view>
							</view>
							<view class="" style="margin-left: 30rpx;font-size: 25rpx;color:rgb(235,99,51);margin-top: 10rpx;padding: 10rpx 0rpx 30rpx 0rpx;">
								关联题目:{{item.library}}
							</view>
						</view>
					</view>
				</view>
				<!-- 学习建议 -->
				<view class="jianyi" style="box-sizing: border-box;padding-left: 68rpx;" v-if="reportdata.teacherAdvice !=''">
					<view class="" style="font-size: 30rpx;font-weight: 500;color: rgb(255,163,44);padding-top: 144rpx;width: 510rpx;">
						亲爱的{{reportdata.username}}小朋友
					</view>
					<scroll-view  scroll-y="true" class="scroll-Y">
						<view style="color: rgb(255,163,44);font-size: 26rpx;width: 510rpx;line-height: 40rpx;">
							{{reportdata.teacherAdvice}}
						</view>
					</scroll-view>
				</view>
				<!-- 测试答案 -->
				<view class="daan" style="">
					<view @click="lookce" class="" style="text-align: center;width: 200rpx;height: 60rpx;padding-top:430rpx;margin: 0 auto;">
						<view style=""></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uCharts from '@/js_sdk/u-charts/u-charts/u-charts.js'
	// import uCharaffwe from '@/js_sdk/u-charts/u-charts/u-charts.js'
	var _self;
	var canvaRadar=null;
	var ability=null
	export default {
		data() {
			return {
				cWidth:'',
				deptId:'',
				gradeId:'',
				subjectId:'',
				cHeight:'',
				pixelRatio:1,
				chartData: {
					categories: [],
					series: [{
						name: '统计',
						data: []
					}]
				},
				powersdata:{
					categories: [],
					series: [{
						name: '统计',
						data: []
					}]
				},
				reportdata:'',
				reasonsdf:[],
				reasonceso:[],
				knowledges:[]
			}
		},
		onLoad(option) {
			console.log(option)
			this.deptId=option.deptId,
			this.gradeId=option.gradeId,
			this.subjectId=option.subjectId,
			this.cWidth=uni.upx2px(720);
			this.cHeight=uni.upx2px(700);
			this.showRadar()
			this.nengRader()
			this.resultDetail()
		},
		computed:{
			cpgenju(){
				return this.reasonsdf.join("、")
			},
			cpbijiao(){
				return this.reasonceso.join('、')
			}
		},
		methods: {
			resultDetail(){
				this.api.resultDetail({
					deptId:this.deptId,
					gradeId:this.gradeId,
					subjectId:this.subjectId
				}).then(res=>{
					this.reportdata=res.data
					console.log(this.reportdata.wrongTotalList)
					this.reportdata.wrongTotalList.forEach((item)=>{
						this.chartData.categories.push('题目'+item.titleNumber)
						this.chartData.series[0].data.push(item.percentage)
						console.log(this.chartData.series[0].data)
					})
					this.reportdata.ablityPro.forEach((item)=>{
						this.powersdata.categories.push(item.content)
						this.powersdata.series[0].data.push(item.dis)
						item.dis=item.dis*100
					})
					this.reportdata.assessList.forEach((item)=>{
						this.reasonsdf.push(item.domain)
						this.reasonsdf=Array.from(new Set(this.reasonsdf))
						this.knowledges.push(item.knowledge)
						this.knowledges=Array.from(new Set(this.knowledges))
						this.reasonceso.push(item.content)
						this.reasonceso=Array.from(new Set(this.reasonceso))
					})
					console.log('根据',this.reasonsdf)
				})
			},
			lookce(){
				uni.navigateTo({
					url:'/pages/client/study/evaluationanswer?deptId='+ this.deptId + '&gradeId=' + this.gradeId + '&subjectId=' + this.subjectId
				})
			},
			showRadar(){//错题统计报告
				canvaRadar=new uCharts({
					$this:this,
					canvasId: 'canvasRadar',
					type: 'radar',
					fontSize:11,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:1,
					color:'#fff',
					animation: true,
					dataLabel: true,
					categories: this.chartData.categories,
					series: this.chartData.series,
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						radar: {
							max:1//雷达数值的最大值
						}
					}
				});
			},
			nengRader(){//学习能力
				ability=new uCharts({
					$this:this,
					canvasId: 'powers',
					type: 'radar',
					fontSize:10,
					legend:{show:true},
					background:'#FFFFFF',
					pixelRatio:1,
					color:'#fff',
					animation: true,
					dataLabel: true,
					categories: this.powersdata.categories,
					series: this.powersdata.series,
					width: this.cWidth,
					height: this.cHeight,
					extra: {
						radar: {
							max:1//雷达数值的最大值
						}
					}
				});
			}
		}
	}
</script>

<style>
	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 728rpx;
		height: 700rpx;
	}
	.charts {
		width: 728rpx;
		height: 700rpx;
	}
	.bugbox{
		background-image: url(../../../static/image/ceping/bugbox.png);
		background-size: 100%;
		background-repeat:no-repeat;
		
	}
	.reporttop{
		background-image: url(../../../static/image/ceping/reporttop.png);
		background-size: 100%;
		width: 750rpx;
		height: 550rpx;
		background-repeat:no-repeat
	}
	.top2left{
		background-image: url(../../../static/image/ceping/left.png);
		background-size: 100%;
		width: 220rpx;
		height: 220rpx;
		background-repeat:no-repeat
	}
	.top2mind{
		background-image: url(../../../static/image/ceping/mind.png);
		background-size: 100%;
		width: 220rpx;
		height: 220rpx;
		background-repeat:no-repeat
	}
	.top2ritgt{
		background-image: url(../../../static/image/ceping/left.png);
		background-size: 100%;
		width: 220rpx;
		height: 220rpx;
		background-repeat:no-repeat
	}
	.sendword{
		margin-top: 50rpx;
		box-sizing: border-box;
		background-image: url(../../../static/image/ceping/jiyu.png);
		background-size: 100%;
		width: 710rpx;
		height: 440rpx;
		background-repeat:no-repeat
	}
	.baogao{
		margin-top: 50rpx;
		background-image: url(../../../static/image/ceping/a2197449ba0894770d31d3de6ee0dcb.png);
		background-size: 100%;
		width: 740rpx;
		height: 730rpx;
		background-repeat:no-repeat
	}
	.tongji{
		margin: 0rpx auto 0 auto;
		background-image: url(../../../static/image/ceping/baogao.png);
		background-size: 100%;
		width: 710rpx;
		background-repeat:no-repeat;
		height: 800rpx;
	}
	.cuoti{
		margin-top: 50rpx;
		background-image: url(../../../static/image/ceping/baogao.png);
		background-size: 100%;
		width: 710rpx;
		height: 800rpx;
		background-repeat:no-repeat
	}
	.jianyi{
		margin: 50rpx auto 0 auto;
		background-image: url(../../../static/image/ceping/jianyi.png);
		background-size: 100%;
		width: 710rpx;
		height: 440rpx;
		background-repeat:no-repeat
	}
	.daan{
		margin: 50rpx auto 0 auto;
		background-image: url(../../../static/image/ceping/3ea7295045a8c7651bbf3d214072eab.png);
		background-size: 100%;
		width: 710rpx;
		height: 570rpx;
		background-repeat:no-repeat
	}
	.capacity{
		margin: 50rpx auto 0 auto;
		background-image: url(../../../static/image/ceping/d2fe87890dbb8b318fa68f42effa534.png);
		background-size: 100%;
		width: 700rpx;
		background-repeat:no-repeat
	}
	.adhibition{
		margin: 60rpx auto 0 auto;
		width: 650rpx;
		height: 250rpx;
		z-index: 999999999 !important;
		background: #FFFFFF;
		position: relative;
		border-radius: 20rpx;
		border: 1rpx solid rgb(255,194,84);
	}
	.adhibitionsd{
		margin: 0rpx auto 0 auto;
		width: 650rpx;
		height: 250rpx;
		background: #FFFFFF;
		position: relative;
		border-radius: 20rpx;
		border: 1rpx solid rgb(255,194,84);
	}
	.cename{
		color: #FFFFFF;
		font-size: 25rpx;
		text-align: center;
		
	}
	.scroll-Y {
		height: 200rpx;
		margin-top: 20rpx;
	}
	.scroll-Yjy{
		height: 180rpx;
		margin-top: 20rpx;
	}
	.scroll-Yss{
		height: 430rpx;
	}
</style>