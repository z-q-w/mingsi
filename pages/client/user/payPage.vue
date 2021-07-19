<template>
	<view style="background: #FFFFFF;min-height: 100%;">
		<view class="payqian">
			<view class="" style="font-size:72rpx;font-family:DIN;font-weight:500;color:rgba(249,58,58,1);padding-top: 70rpx;">
				{{zhpayindex==3 ? '':'¥'}}{{actualpay}}
			</view>
			<view class="" style="font-size:33rpx;font-family:PingFang SC;line-height:45px;color:rgba(102,102,102,1);">
				{{zhpayindex==3 ? '学习币':'支付金额'}} 
			</view>
		</view>
		
		<view class="" style="border-top: 20rpx solid rgb(242,244,248);">
			<view style="background:#FFFFFF;margin-top: 30rpx;">
				<view class="tx-money">选择账户</view>
				<view v-if="platform=='android'" class="select-zfb"  v-for="(item,index) in zhpay"  @tap="selectwxbtn(item)" :key="index">
					<image :src="item.logo" mode="" style="width:75rpx;height: 37px;"></image>
					<text style="margin: 20rpx 0 0 35rpx;flex: 1;font-size: 32rpx;">{{item.name}}</text>
					<text v-if="(zhpayindex==index+1)&&index==2" style="margin: 22rpx 60rpx 0 35rpx;color: #999;font-size: 26rpx;">您的学习币:{{balance}}</text>
					<view class="select-sfan">
						<image   :src="zhpayindex==item.val? item.images:item.image" mode="" style="width: 40rpx;height: 40rpx;"></image>
					</view>
				</view>
				<view class="" v-if="platform=='ios'">
					<view v-if="index==2" class="select-zfb"  v-for="(item,index) in zhpay"  @tap="selectwxbtn(item)" :key="index">
						<image :src="item.logo" mode="" style="width:75rpx;height: 37px;"></image>
						<text style="margin: 20rpx 0 0 35rpx;flex: 1;font-size: 32rpx;">{{item.name}}</text>
						<text v-if="(zhpayindex==index+1)&&index==2" style="margin: 22rpx 60rpx 0 35rpx;color: #999;font-size: 26rpx;">您的学习币:{{balance}}</text>
						<view class="select-sfan">
							<image   :src="zhpayindex==item.val? item.images:item.image" mode="" style="width: 40rpx;height: 40rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<button class="payment" type="default" @tap='awaypayment'>立即付款</button>
		</view>
</template>
<script>
	export default {
		data() {
			return {
				platform:uni.getSystemInfoSync().platform,
				showpricedata:"",////用来苹果上架是否显示价钱
				zhpayindex:'',
				balance:this.cacheHelper.appUser().balance,
				zhpay:[//支付类型渲染
					{	
						val: 1,
						logo:'../../../static/image/77.png',
						name:'支付宝支付',
						image:"../../../static/image/73.png",
						images:'../../../static/image/72.png'
					},
					{
						val: 2,
						logo:'../../../static/image/76.png',
						name:'微信支付',
						image:"../../../static/image/73.png",
						images:'../../../static/image/72.png'
					},
					{
						val: 3,
						logo:'../../../static/image/75.png',
						name:'学习币支付',
						image:"../../../static/image/73.png",
						images:'../../../static/image/72.png'
					}
				],
				actualpay:'',//金额
				orderNo:'',//订单号
				ontype:'',
				datatype:'',//datatype 1是线上 2是线下  3是点播课
				isGroup:'',//1 普通订单 2 拼团订单
				platform:uni.getSystemInfoSync().platform,
			}
		},
		onLoad(option) {
			this.actualpay=option.actualpay
			this.orderNo=option.orderNo
			this.ontype=option.istype
			this.datatype=option.datatype
			this.isGroup=option.isGroup
			this.showprice()
			this.platform=uni.getSystemInfoSync().platform
		},
		onShow() {
			this.api.customerinfo().then((res) => {
				this.balance=res.data.balance
			})
		},
		methods: {
			selectwxbtn(v){//选择微信支付和支付宝支付单选事件
				this.zhpayindex=v.val
				console.log(v.val)
			},
			showprice(){//用来苹果上架
				this.api.findByCode(
					JSON.stringify('IS_SHOW_COURSE_PRICE')
				).then(res=>{
					this.showpricedata=res.data.description
					console.log(res)
				})
			},
			awaypayment(){
				if(this.zhpayindex==''){
					this.tui.toast('请选择支付方式')
					return
				}
				if(this.zhpayindex==3){//余额
					if(this.balance<this.actualpay){
						uni.showModal({
						    title: '温馨提示',
						    content: '您的余额不足,去充值',
						    success:(res)=>{
						        if (res.confirm) {
									if(this.platform=='android'){
										uni.navigateTo({
											url:'/pages/client/user/wialletUp'
										})
									}else if(this.platform=='ios'){
										uni.navigateTo({
											url:'/pages/client/user/ioswialletUp' 
										})
									}
						        }
						    }
						});
					}else{
						uni.showModal({
						    title: '温馨提示',
						    content: '您确定用余额支付吗',
						    success:(res)=>{
						        if (res.confirm) {
								   this.api.payOrder({
									   payType:this.zhpayindex,
									   orderId:this.orderNo
								   }).then(res=>{
									    this.tui.toast('支付成功')
										uni.$emit('readmessage',{msg:'提交订单刷新消息数量'})
									    setTimeout(()=>{
										   if(this.datatype==1||this.datatype==2){ //datatype为1线上 2为线下 是非点播课跳我的课程    datatype为3是点播课跳我的点播课 
											    if(this.isGroup==2){//1 普通订单 2 拼团订单
													uni.redirectTo({
														url: '/pages/client/user/myOrder?type=4'
													}) 
												}else{
													uni.redirectTo({
														url: '/pages/client/study/Mycourse'
													}) 
												} 
										   }else{
											   if(this.isGroup==2){//1 普通订单 2 拼团订单跳我的订单
													uni.redirectTo({
														url: '/pages/client/user/myOrder?type=4'
													}) 
											   }else{
													uni.redirectTo({
														url: '/pages/client/study/myStreaming'
													}) 
											   }
										   }
										},300)
										uni.$emit('islogindf',{msg:'页面更新学习页面的我的课程两条数据'})
								   })
						        } else if (res.cancel) {
						            console.log('用户点击取消');
						        }
						    }
						});
					}
				}else{
					this.api.payOrder({
						payType:this.zhpayindex,
						orderId:this.orderNo
					}).then(res=>{
						console.log(res)
						if(this.zhpayindex==1){//支付宝
							var that=this
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: res.data.body, //微信、支付宝订单数据
								success(res) {
									this.tui.toast('支付成功')
									uni.$emit('readmessage',{msg:'提交订单刷新消息数量'})
									setTimeout(()=>{
									   if(this.datatype==1||this.datatype==2){ //datatype为1线上 2为线下 是非点播课跳我的课程    datatype为3是点播课跳我的点播课 
										    if(this.isGroup==2){//1 普通订单 2 拼团订单
												uni.redirectTo({
													url: '/pages/client/user/myOrder?type=4'
												}) 
											}else{
												uni.redirectTo({
													url: '/pages/client/study/Mycourse'
												}) 
											}
										    // uni.$emit('zhipagedetal',{msg:'支付成功刷新详情'})
									   }else{
										   if(this.isGroup==2){//1 普通订单 2 拼团订单跳我的订单
												uni.redirectTo({
													url: '/pages/client/user/myOrder?type=4'
												}) 
										   }else{
												uni.redirectTo({
													url: '/pages/client/study/myStreaming'
												}) 
										   }
											// uni.$emit('dianpagedetal',{msg:'支付成功刷新详情'})
									   }
									},300)
									uni.$emit('islogindf',{msg:'页面更新学习页面的我的课程两条数据'})
								},fail(err) {
									console.log(err)
								}
							});
						}else if(this.zhpayindex==2){//微信
							console.log(res)
							var that=this
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: JSON.stringify(res.data),
								success(res) {
									this.tui.toast('支付成功')
									uni.$emit('readmessage',{msg:'提交订单刷新消息数量'})
									setTimeout(()=>{
									   if(this.datatype==1||this.datatype==2){ //datatype为1线上 2为线下 是非点播课跳我的课程    datatype为3是点播课跳我的点播课 
										    if(this.isGroup==2){//1 普通订单 2 拼团订单
												uni.redirectTo({
													url: '/pages/client/user/myOrder?type=4'
												}) 
											}else{
												uni.redirectTo({
													url: '/pages/client/study/Mycourse'
												}) 
											}
										    // uni.$emit('zhipagedetal',{msg:'支付成功刷新详情'})
									   }else{
										   if(this.isGroup==2){//1 普通订单 2 拼团订单跳我的订单
												uni.redirectTo({
													url: '/pages/client/user/myOrder?type=4'
												}) 
										   }else{
												uni.redirectTo({
													url: '/pages/client/study/myStreaming'
												}) 
										   }
											// uni.$emit('dianpagedetal',{msg:'支付成功刷新详情'})
									   }
									},300)
									uni.$emit('islogindf',{msg:'页面更新学习页面的我的课程两条数据'})
								},fail(err) {
								   console.log(err)
								}
							});
						}
					})
				}
			}
		}
	}
</script>

<style>
	.payqian{
		height: 300rpx;
		text-align: center;
		background: #FFFFFF;
	}
	.tx-money{
		font-size:36rpx;
		font-family:PingFang SC;
		font-weight:bold;
		color:rgba(51,51,51,1);
		padding: 30rpx;
	}
	.select-zfb{
		display: flex;
		padding: 20rpx 30rpx;
		border-bottom:1px solid rgba(250,250,250,1);
	}
	.select-sfan{
		/* line-height: 90rpx; */
		margin-top: 20rpx;
	}
	.payment{
		width:690rpx;
		height:91rpx;
		background:rgba(242,127,49,1) !important;
		opacity:1;
		border-radius:12rpx;
		text-align: center;
		margin: 0 auto;
		line-height: 91rpx;
		color: #FFFFFF !important;
		font-size: 34rpx;
		margin-top: 70rpx;
		margin-bottom: 70rpx;
	}
</style>
