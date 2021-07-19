<template>
	<view class="tui-addr-box">
		<form :report-submit="true" style="font-family:PingFang SC;">
				<view class="tui-line-cell" @click="showMulLinkageThreePicker">
					<view class="tui-title"><text class="tui-title-city-text">所在城市</text></view>
					<input placeholder-class="tui-phcolor" v-model="area" class="tui-input" disabled name="city" placeholder="请选择城市" maxlength="50" type="text" />
					<image src="../../../static/image/24.png" mode="" style="width:14rpx;height:25rpx;"></image>
				</view>
				<view class="tui-line-cell">
					<view class="tui-title">详细地址</view>
					<input placeholder-class="tui-phcolor" v-model="addseedata.address" class="tui-input" name="address" placeholder="请输入详细的收货地址" maxlength="50" type="text" />
				</view>
				<view class="tui-line-cell">
					<view class="tui-title">收货人</view>
					<input placeholder-class="tui-phcolor" v-model="addseedata.consigneeUsername" class="tui-input" name="name" placeholder="请输入收货人姓名" maxlength="15" type="text" />
				</view> 
				<view class="tui-line-cell">
					<view class="tui-title">手机号码</view>
					<input placeholder-class="tui-phcolor" v-model="addseedata.consigneeMobile" class="tui-input" name="mobile" placeholder="请输入收货人手机号码" maxlength="11"
					 type="text" />
				</view>
			<!-- 默认地址 -->
				<view class="tui-swipe-cell">
					<view style="margin-top: 10rpx;">设为默认地址</view>
					<switch style="height: 60rpx;" :checked="defaults" color="#F27F31" class="tui-switch-small" @change='moaddess'/>
				</view>
			<!-- 保存地址 -->
			<view class="tui-addr-save">
				<button @tap="address" v-if="this.addseedata.id==''" class="tui-delbtn" height="88rpx">保存</button>
				<button @tap="editaddress" v-else class="tui-delbtn" height="88rpx">保存</button>
			</view>
			<mpvue-city-picker :themeColor="themeColor" ref="mpvueCityPicker" :pickerValueDefault="cityPickerValueDefault"
									 @onCancel="onCancel" @onConfirm="onConfirm"></mpvue-city-picker>
		</form>
	</view>
</template>

<script>
	import mpvueCityPicker from '../../../utils/mpvue-citypicker/mpvueCityPicker.vue'
	import tuiButton from "@/components/extend/button/button"
	import tuiListView from "@/components/list-view/list-view"
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiButton,
			tuiListView,
			tuiListCell,
			mpvueCityPicker
		},
		data() {
			return {
				listsindex:0,
				themeColor: '#888',
				cityPickerValueDefault: [1,1,1],
				area:'',
				defaults:true,
				submitData:{},
				addseedata:{
					consigneeUsername:'', //联系人名称
					consigneeMobile:'', //联系人手机号
					provinceName:'', //省
					cityName:'',  //市
					areasName:'', //区
					address:'', //详细地址
					isDefault:1, //1:是默认0:不是默认
					id:'',
				},
				resstype:'',
				viditem:{}
			}
		},
		onLoad(option) {
			this.resstype=option.resstype  
			this.viditem=JSON.parse(option.viditem);//传递过来的id
			console.log(this.viditem,'5555')
			this.addseedata.consigneeUsername=this.viditem.consigneeUsername
			this.addseedata.consigneeMobile=this.viditem.consigneeMobile
			this.addseedata.provinceName=this.viditem.provinceName
			this.addseedata.cityName=this.viditem.cityName
			this.addseedata.areasName=this.viditem.areasName
			this.addseedata.address=this.viditem.address
			this.addseedata.isDefault=this.viditem.isDefault
			this.defaults=this.viditem.isDefault==1 ? true:false
			console.log(this.addseedata.isDefault)
			this.area=this.addseedata.provinceName+this.addseedata.cityName+this.addseedata.areasName
			this.addseedata.id=this.viditem.id
			
		},
		methods: {
			// 三级联动选择
			showMulLinkageThreePicker() {
				this.$refs.mpvueCityPicker.show()
			},
			onCancel: function(){
				this.$refs.mpvueCityPicker.hide()
			},
			onConfirm(e) {
				console.log(e,'ssssssss')
				var city = e.label;
				var data = city.split('-');
				console.log(data[0]+'-------'+data[1]+'------'+data[2])
				this.addseedata.cityName = data[1];
				this.addseedata.provinceName = data[0]
				this.addseedata.areasName = data[2]
				this.area = this.addseedata.provinceName+this.addseedata.cityName+this.addseedata.areasName
			},
			dizhibtn(index){
				this.listsindex=index
			},
			address(){//添加地址
				if (!this.utils.isMobile(this.addseedata.consigneeMobile)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.addressinsert(this.addseedata).then((res)=>{
						this.tui.toast('添加成功')
						setTimeout(()=>{
							uni.redirectTo({
							    url:'/pages/client/user/newAddress?resstype=' + this.resstype
							});
						},500)
					}).catch((err) => {
						this.tui.toast(err.message)
					})
				}
			},
			editaddress(){//编辑地址
				if (!this.utils.isMobile(this.addseedata.consigneeMobile)) {
					this.tui.toast('请输入正确的手机号码');
					return
				}else{
					this.api.addressupdate(this.addseedata).then((res)=>{
						this.tui.toast('编辑成功')
						setTimeout(()=>{
							uni.redirectTo({
							    url:'/pages/client/user/newAddress?resstype=' + this.resstype
							});
						},500)
					}).catch((err) => {
						this.tui.toast(err.message)
					})
				}
			},
			moaddess(e){
				this.defaults=e.detail.value
				this.addseedata.isDefault=e.detail.value?'1':'0'
				console.log(this.addseedata.isDefault,this.defaults)
			}
		}
	}
</script>

<style>
	.tui-addr-box {
		padding: 20rpx 0;
	}

	.tui-line-cell {
		width: 100%;
		padding: 30rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #FFFFFF;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.tui-title {
		width: 180rpx;
		font-size: 30rpx;
	}

	.tui-title-city-text {
		width: 180rpx;
		height: 40rpx;
		display: block;
		line-height: 46rpx;
	}

	.tui-input {
		width: 500rpx;
	}

	.tui-input-city {
		flex: 1;
		height: 40rpx;
		font-size: 28rpx;
		padding-right: 30rpx;
	}

	.tui-phcolor {
		color: #ccc;
		font-size: 28rpx;
	}
	.tui-cell-title{
		font-size: 28rpx;
	}
	.tui-addr-label {
		margin-left: 70rpx;
	}

	.tui-label-item {
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgb(136, 136, 136);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-label-active{
		background: rgba(78,161,53,1);
		/* border-color:rgba(78,161,53,1); */
		color: #fff;
		width: 76rpx;
		height: 40rpx;
		border: 1rpx solid rgba(78,161,53,1);
		border-radius: 6rpx;
		font-size: 26rpx;
		text-align: center;
		line-height: 40rpx;
		margin-right: 20rpx;
		display: inline-block;
		transform: scale(0.9);
	}
	.tui-swipe-cell {
		display: flex;
		justify-content: space-between;
		background: #fff;
		padding: 24rpx 30rpx;
		border-radius: 6rpx;
		font-size: 30rpx;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #EEEEEE;
	}

	.tui-switch-small {
		/* transform: scale(0.8); */
		/* transform-origin: 100% center; */
	}

	/* #ifndef H5 */
	.tui-switch-small .wx-switch-input {
		margin: 0 !important;
	}

	/* #endif */

	/* #ifdef H5 */
	>>>uni-switch .uni-switch-input {
		margin-right: 0 !important;
	}

	/* #endif */

	.tui-addr-save {
		padding: 24rpx;
		margin-top: 100rpx;
	}

	.tui-del {
		padding: 24rpx;
	}
	.tui-delbtn{
		height: 80rpx;
		background:#F27F31;
		color: #FFFFFF;
		text-align: center;
		line-height: 80rpx;
	}
</style>
