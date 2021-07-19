<template>
	<view class="addressIndex">
		<view class="addressList">
			<view class="addressItem" :key="id" v-for="(item, id) in addressList" @click="selectRess(item)">
				<view class="leftContent">
					<view class="linkman">
						<text class="linkman_name" style="margin-right: 20rpx;">{{ item.consigneeUsername }}</text>
						<text class="linkman_tel">{{ item.consigneeMobile}}</text>
						<text v-show="item.isDefault == 1" class="defaultIcon">默认</text>
					</view>
					<view class="addressDetail">
						<text>{{item.provinceName}}</text>
						<text style="margin: 0 10rpx;">{{item.cityName}}</text>
						<text style="margin: 0 10rpx;">{{item.areasName}}</text>
						<text>{{item.address }}</text>
					</view>
				</view>
				<view class="rightIcons">
					<image @click.stop="toEditAddress(item)" class="editIcons editIcon" src="../../../static/image/icon_address_edit@3x.png"
					 mode=""></image>
					<image @click.stop="showDelDialog(item)" class="editIcons delIcon" src="../../../static/image/icon_address_del@3x.png"
					 mode=""></image>
				</view>
			</view>
		</view>
		<view class="" style="height: 108rpx;">

		</view>
		<button class="addNewAddress" type="default" @click="addAddress">+添加新地址</button>
		<uni-popup ref="isShowDelDialog" type="dialog">
			<uni-popup-dialog content="是否确定删除这个地址？" type="message" message="成功消息" :duration="2000" :before-close="true" @close="close"
			 @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopupDialog
		},
		data() {
			return {
				isShowDelDialog: false,
				addressList: [],
				arrid: '',
				resstype: '',
			}
		},
		onLoad(page) {
			this.resstype = page.resstype
			this.getAddressList()
			uni.$on('update', () => {
				this.getAddressList()
			})
		},
		methods: {
			//获取收货地址列表
			getAddressList() {
				this.api.addressfindPage({
					current:1,
					size:40
				}).then(res=>{
					this.addressList=res.data.records
					console.log(this.addressList)
				})
			},
			selectRess(v) {
				if (this.resstype == 1) { //表示从确认订单页面来选择地址
					uni.setStorageSync('ressinfo', v);
					uni.$emit('ressinfo', {
						msg: '地址更新'
					})
					uni.navigateBack({
						delta: 1
					})
					console.log(v)
				}
			},
			addAddress() {
				uni.redirectTo({
					url: '/pages/client/user/editAddress?resstype=' + this.resstype,
				});
			},
			toEditAddress(item) {
				uni.redirectTo({
					url: '/pages/client/user/editAddress?viditem=' + JSON.stringify(item),
				});
			},
			close() {
				this.$refs.isShowDelDialog.close()
			},
			confirm() {
				console.log(this.arrid)
				this.api.addressdelete({
					id: this.arrid
				}).then(res => {
					this.getAddressList()
					this.$refs.isShowDelDialog.close()
					this.tui.toast('删除地址成功！')
				}).catch(err => {
					this.tui.toast('删除收货地址失败，请稍后重试')
				})
			},
			showDelDialog(v) {
				console.log(v)
				this.arrid = v.id
				this.$refs.isShowDelDialog.open()
			}
		}
	}
</script>

<style lang="less" scoped>
	.btn {
		border-top: 1rpx solid #eee;

		.cancelBtn {
			color: #999;
			border-right: 1rpx solid #eee;
		}

		.affirmBtn {
			color: #4795FF;
		}
	}
	.defaultIcon {
		margin-left: 10rpx;
		font-size: 22rpx;
		color: #FF3000;
		border: 1rpx solid #ff3000;
		border-radius: 6rpx;
		display: inline-block;
		width: 60rpx;
		text-align: center;
	}
	.addressIndex {
		width: 100%;
		overflow: hidden;
		.addressList {
			border-top: 1rpx solid #eee;

			.addressItem {
				position: relative;
				background-color: #fff;
				height: 157rpx;
				padding: 33rpx 37rpx 52rpx 32rpx;
				box-sizing: border-box;
				margin-bottom: 18rpx;

				.leftContent {
					width: 450px;

					.linkman {
						font-size: 32rpx;
						color: #333;
					}
					.addressDetail {
						margin-top: 15rpx;
						font-size: 29rpx;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						width: 444rpx;
					}
				}

				.rightIcons {
					width: 150rpx;
					position: absolute;
					right: 37rpx;
					top: 63rpx;
					display: flex;
					justify-content: space-between;

					.editIcons {
						width: 33rpx;
						height: 33rpx;
					}
				}
			}
		}

		.addNewAddress {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 750rpx;
			height: 90rpx;
			line-height: 90rpx;
			background: #F27F31;
			color: #fff;
			font-size: 32rpx;
			border-radius: 0 !important;
		}
	}
</style>
