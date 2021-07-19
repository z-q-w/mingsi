import api from './api/api.js'
import utils from '../utils/util.js'
import constant from '../constant/constant.js'
const cache = {
	setToken: function(token) {
		uni.setStorageSync(constant.StorageName.APP_LOGIN_TOKEN, token)
		if (!utils.isNullOrEmpty(token)) {
			this.updateUserInfo()
		}
	},
	setPushLive:function(live) {
		uni.setStorageSync(constant.StorageName.PUSH_STREAM, live)
	},
	getPushLive() {
		return uni.getStorageSync(constant.StorageName.PUSH_STREAM)
	},
	getToken() {	
		return uni.getStorageSync(constant.StorageName.APP_LOGIN_TOKEN)
	},
	isLogin: function() {
		return !utils.isNullOrEmpty(uni.getStorageSync(constant.StorageName.APP_LOGIN_TOKEN)) ? true : false
	},
	isLoginOnclick: function() {
         if(this.isLogin()){
			 return true
		 }else{
			 uni.navigateTo({
			     url: '/pages/client/login/login'
			 });
			 return false
		 }
	},
	webURL: function() {
		return "https://www.thorui.cn/wx"
	},
	updateUserInfo: function() {
		if (utils.isNullOrEmpty(this.getToken())) {
			return
		}
		api.customerinfo().then((res) => {
				console.log(res.data,'用户信息')
				var user =res.data;
				uni.setStorageSync(constant.StorageName.APP_USER_INFO, user)
				uni.$emit(constant.EventKey.UPDATE_USER_INFO, {
					msg: '用户信息更新'
				})
			})
			.catch((err) => {	
				console.log(err)
			})
	},
	appUser() {
		if (utils.isNullOrEmpty(uni.getStorageSync(constant.StorageName.APP_USER_INFO))) {
            return null
		}
		return uni.getStorageSync(constant.StorageName.APP_USER_INFO)
	},
	showflstRequest(){
		// api.getDictVo({
		// 		dictCode:"course_type"
		// 	}).then((res) => {
		// 		console.log(res)
		// 		uni.setStorageSync(constant.StorageName.COURSE_TYPE, res)
		// 	}).catch((err) => {
		// 		console.log(err)
		// 	})
	},
	getCourseType() {
		if (utils.isNullOrEmpty(uni.getStorageSync(constant.StorageName.COURSE_TYPE))) {
	        this.showflstRequest()
		}
		console.log(uni.getStorageSync(constant.StorageName.COURSE_TYPE))
		return uni.getStorageSync(constant.StorageName.COURSE_TYPE)
	}
}

module.exports = {
	getToken: cache.getToken,
	setToken: cache.setToken,
	isLogin: cache.isLogin,
	webURL: cache.webURL,
	updateUserInfo: cache.updateUserInfo,
	appUser: cache.appUser,
	showflstRequest:cache.showflstRequest,
	getCourseType:cache.getCourseType,
	isLoginOnclick:cache.isLoginOnclick,
	setPushLive:cache.setPushLive,
	getPushLive:cache.getPushLive
}
