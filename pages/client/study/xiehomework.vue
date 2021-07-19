<template>
	<view>
		<!-- 题目 -->
		<view class="heads-wen" v-if="datalist[i].title !=''">
			<scroll-view  scroll-y="true" class="scroll-Yjy" @click="request">
				<text>{{i+1}}、</text>
				<text class="heads-content">{{ datalist[i]!=null?datalist[i].title:'' }}</text>
			</scroll-view>
			<view class="" style="margin-top: 15rpx;">
				<view class="" v-for="(item,j) in datalist[i].pictureList" :key="item.index" @tap.stop="previewImage(j,datalist[i].pictureList)">
					<image :src="item" mode="widthFix" style="width:620rpx;border-radius:12rpx;margin-right: 10rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 图片 -->
		
		<view class="heads-wen" v-if="datalist[i].title ==''">
			<view style="margin-bottom: 20rpx;" >{{i+1}}、</view>
			<view class="" style="padding-right: 0;" v-if="datalist[i].pictureList.length!=0">
				<view style="position:relative;" v-for="(imgitem,index) in datalist[i].pictureList" @click="previewImage(index,datalist[i].pictureList)">
					<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 15rpx;right: 15rpx;z-index: 999;"></image>
					<image :src="imgitem" mode="widthFix" style="width:620rpx;border-radius: 8rpx;margin-right: 15rpx;"></image>
				</view>
			</view>
		</view>
		<!-- 选项 -->
		<view class="heads-wen" v-if="datalist[i].type == 1">
			<view :class="item.optId==optId?'elect':''" style="margin-top: 10rpx;" v-for="item in datalist[i].optionList" @click="electbtn(item,datalist[i].id)">
				<text style="margin-right: 10rpx;">{{item.opt}}.</text>
				<text>{{item.content}}</text>
				<view class="" v-if="item.picture.length !=0 ">
					<view class="" v-for="(itemimg,index) in item.picture.split(',')" style="position:relative;">
						<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 8rpx;right: 8rpx;z-index: 999;"></image>
						<image :src="itemimg" mode="widthFix" style="width: 620rpx;margin-right: 10rpx;margin-top: 10rpx;" @tap.stop="previewImage(index,item.picture.split(','))"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 填空题 -->
		<view v-if="datalist[i].type == 2 && navigationindex==2" class="heads-wen"><textarea :disabled="viditem.isComplete==3" @blur="blursd(ansdata,datalist[i].id)" v-model="ansdata" placeholder="请输入答案" rows="20" cols="20" /></view>
		<!-- 老师是否批改 -->
		<view class="" v-if="navigationindex==1">
			<view class="" v-if="datalist[i].isRight!=1" style="margin-left: 30rpx;margin-top: 50rpx;">
				<view class="laopi">【老师已批改】</view>
			</view>
		</view>
		<!-- 我的答案 -->
		<view class="heads-wen" v-if="navigationindex==1 && datalist[i].type==1">
			<text :class="datalist[i].correctAnswer==datalist[i].myAnswer?'correctrr':'wrongrr'">{{datalist[i].correctAnswer==datalist[i].myAnswer?'正确':'错误'}}</text>
			<text :class="datalist[i].correctAnswer==datalist[i].myAnswer?'correctas':'wrongsd'">我的答案:</text>
			<view class="" style="text-indent: 2em">
				{{datalist[i].myAnswer}}
			</view>
		</view>
		<!-- 我的答案 -->
		<view class="heads-wen" v-if="navigationindex==1 && datalist[i].type==2">
			<view>我的答案:</view>
			<view class="" style="text-indent: 2em">
				{{datalist[i].myAnswer}}
			</view>
		</view>
		<!-- 正确答案 -->
		<view class="" v-if="navigationindex==1">
			<view class="heads-wen" v-if="datalist[i].correctAnswer !=datalist[i].myAnswer">
				<view>正确答案:</view>
				<view class="" style="text-indent: 2em;box-sizing: border-box;">
					{{datalist[i].correctAnswer}}
				</view>
			</view>
		</view>
		<!-- 解析 -->
		<view class="heads-wen" v-if="navigationindex==1">
			<view class="" style="padding-right: 30rpx;">
				<text style="color:#F27F31 ;">解析:</text>
				<view class="" style="text-indent: 2em">
					{{datalist[i].analysis}}
				</view>
			</view>
			<view class="" style="">
				<view class="" style="">
					<view style="position:relative;" v-if="datalist[i].analysisPicture!=''" v-for="(item,index) in datalist[i].analysisPicture">
						<image src="../../../static/image/fangda.png" mode="" style="width: 40rpx;height: 40rpx;position: absolute;bottom: 8rpx;right: 8rpx;z-index: 999;"></image>
						<image :src="item" mode="widthFix" @tap.stop="previewImage(index,datalist[i].analysisPicture)" style="width:620rpx;border-radius:12rpx;margin-right: 10rpx;"></image>
					</view>
				</view>
			</view>
		</view>
		<!-- 老师评语 -->
		<view class="heads-wen" v-if="navigationindex==1 && datalist[i].comments!='' ">
			<view class="" v-if="datalist[i].isRight!=1" style="margin-left: 0rpx;">
				<text style="color:#F27F31 ;">老师评语:</text>
				<view class="" style="text-indent: 2em">
					{{datalist[i].comments}}
				</view>
			</view>
		</view>
		<!-- 已完成 -->
		<view class="" style="height: 140rpx;">
			<view class="tui-addrk" v-if="navigationindex==1">
				<button v-if="start !=1" class="new-top" @tap="topquestion">上一题</button>
				<button v-if="start == datalist.length" class="bottomsd" @tap="goback">返回</button>
				<button v-else class="bottomsd" @tap="nextstep">下一题</button>
			</view>
			<!-- 未完成 -->
			<view class="" v-if="navigationindex==2">
				<view class="tui-addrk">
					<button v-if="start == datalist.length" class="new-bottom" @tap="submitbtn">提交作业</button>
					<button v-else class="new-bottom" @tap="nextquestion">下一题</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			start: 1,
			i: 0 ,
			answerlist:[],
			contentsd:{
				content:'',
				taskId:''
			},
			viditem:{},
			datalist:[{
				optionList:[]
			}],//题目数据
			isComplete:0,//作业状态 1未完成 2已完成 3 已批改 4 暂无作业
			type:"",//1是班组课  2点播课
			optId:'',//选项的id
			ansdata:'',
			istype:'',//1 班组课 2 点播课
			submit:{
				"id":'', //班组课的作业试卷Id
				"type": 1, //1 班组课 2 点播课
				"homeworkList": []
			},
			navigationindex:'',  //1已完成  2未完成
		};
	},
	onLoad(option) {
		this.myjobid=option.myjobid //课程id
		this.courseCatalogId=option.courseCatalogId //点播课表Id
		this.type=option.type //type 1 线上 2线下 3点播
		this.istype=option.istype //1 班组课 2 点播课
		this.submit.type=option.istype
		this.navigationindex=option.navigationindex
		this.findMyHomeworkVoList()
	},
	methods: {
		goback() {
			uni.navigateBack({
				delta: 1
			});
		},
		request(){//点击题目跳转页面
			if(this.datalist[this.i].title.length>150){//只有题目超过多少字符才会跳转
				uni.navigateTo({
					url:'/pages/client/study/titimuyulan?courseCatalogId=' + this.courseCatalogId + '&type=' + this.type + '&i=' + this.i
				})
			}
		},
		previewImage: function(index,imageList) {//预览图片
			if (!imageList.length) return;
			uni.previewImage({
				current: imageList[index],
				loop: true,
				urls: imageList
			})
			console.log(index,imageList)
		},
		electbtn(v,id){//点击每一个选项
			console.log(v)
			this.optId=v.optId
			let sb={
				"id": this.datalist[this.i].id,
				"type":this.datalist[this.i].type, // "1:选择题，2:非选择题"
				"answer": v.opt,
				"picture": null
			}
			console.log(this.submit.homeworkList.length,this.i)
			if(this.submit.homeworkList.length==this.i){
				this.submit.homeworkList.push(sb)
			}else if(this.submit.homeworkList[this.i].id==id){
				console.log('sss')
				this.submit.homeworkList[this.i].optionId=v.opt
			}
			console.log(id)
			console.log(this.submit)
		},
		blursd(v,id){
			let sb={
				"id": this.datalist[this.i].id,
				"type":this.datalist[this.i].type, // "1:选择题，2:非选择题"
				"answer":v,
				"picture": null
			}
			if(this.submit.homeworkList.length==this.i){
				this.submit.homeworkList.push(sb)
			}else if(this.submit.homeworkList[this.i].id==id){
				this.submit.homeworkList[this.i].answer=v
			}
			console.log(v,id,sb)
			console.log(this.submit)
			
		},
		nextquestion() {
			console.log(this.submit.homeworkList[this.i])
			if(this.submit.homeworkList[this.i]=='' || this.submit.homeworkList[this.i]==undefined){
				this.tui.toast('请填写您的答案')
			}else{
				this.start++;
				this.i++;
				this.ansdata=''
			}
		},
		submitbtn() {
			if(this.submit.homeworkList[this.i]=='' || this.submit.homeworkList[this.i]==undefined){
				this.tui.toast('请填写您的答案')
			}else{
				this.api.homeworksubmit(
					this.submit
				).then(res=>{
					console.log(res)
					this.tui.toast('提交成功')
					uni.navigateBack({
					    delta: 1
					});
					uni.$emit('homework',{msg:'页面更新'})
				})
			}
		},
		findMyHomeworkVoList(){//获取题目
			let params = {
				courseCatalogId:this.courseCatalogId,
				type:this.type
			}
			this.api.homeworkdetail(params).then(res=>{
				this.datalist = res.data.topicList;
				this.datalist.forEach(item=>{
					item.analysisPicture=item.analysisPicture.split(',')
				})
				this.submit.id=res.data.id //这套作业的最大的id
			})
		},
		topquestion() {
			if (this.start > 1) {
				this.start--;
				this.i--;
			}
		},
		nextstep(){
			this.start++;
			this.i++;
		}
		
	}
};
</script>

<style>
.heads {
	display: flex;
	padding: 25rpx 30rpx;
	background: #ffffff;
}
.workheads {
	flex: 1;
	text-align: center;
	font-size: 33rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(51, 51, 51, 1);
}
.heads-wen {
	margin: 20rpx 30rpx 0 30rpx;
	padding: 30rpx 0rpx 15rpx 30rpx;
	background: #ffffff;
	border-radius: 12rpx;
	font-size: 32rpx;
}
.heads-content {
	font-size: 32rpx;
	font-family: PingFang SC;
	color: rgba(51, 51, 51, 1);
	line-height: 36rpx;
}
.tui-address-new {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 999;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	background: #ffffff;
}
.newadd {
	height: 80rpx;
	background: #F27F31;
	color: #ffffff;
	text-align: center;
	line-height: 80rpx;
	font-weight: bold;
	font-family: PingFang SC;
	border-radius: 80rpx;
}
.tui-addrk {
	width: 100%;
	position: fixed;
	left: 0;
	bottom: 0;
	padding: 20rpx 30rpx;
	box-sizing: border-box;
	background: #ffffff;
	display: flex;
}
.new-top {
	width: 50%;
	height: 79rpx;
	box-shadow: 0rpx -1rpx 6rpx 0rpx rgba(4, 0, 0, 0.1);
	border-radius: 79rpx;
	line-height: 79rpx;
	text-align: center;
	font-family: PingFang SC;
	font-weight: bold;
	color: #FFFFFF;
	background: #FFBE5A;
}
.new-bottom {
	width: 100%;
	height: 79rpx;
	background: #F27F31;
	box-shadow: 0rpx -1rpx 6rpx 0rpx rgba(4, 0, 0, 0.1);
	border-radius: 12rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(255, 255, 255, 1);
	line-height: 79rpx;
	border-radius: 79rpx;
}
.laopi{
	font-size:29rpx;
	font-family:PingFang SC;
	font-weight:bold;
	color:rgba(71,164,251,1);
	line-height:36rpx;
	margin-bottom: 10rpx;
}
.elect{
	color: #F27F31;
}
.correctas{
	color: #008000;
}
.wrongsd{
	color: red;
}
.correctrr{
	background:#008000;
	color: #FFFFFF;
	border-radius: 8rpx;
	font-size: 25rpx;
	display: inline-block;
	width: 60rpx;
	line-height: 40rpx;
	text-align: center;
	margin-right: 20rpx;
}
.wrongrr{
	background:red;
	color: #FFFFFF;
	border-radius: 8rpx;
	font-size: 25rpx;
	display: inline-block;
	width: 60rpx;
	line-height: 40rpx;
	text-align: center;
	margin-right: 20rpx;
}
.bottomsd{
	/* width: 100%; */
	flex: 1;
	height: 79rpx;
	background: #F27F31;
	box-shadow: 0rpx -1rpx 6rpx 0rpx rgba(4, 0, 0, 0.1);
	border-radius: 12rpx;
	font-family: PingFang SC;
	font-weight: bold;
	color: rgba(255, 255, 255, 1);
	line-height: 79rpx;
	border-radius: 79rpx;
}
.scroll-Yjy{
	max-height: 300rpx;
}
</style>
