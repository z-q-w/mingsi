import Vue from 'vue'
import App from './App'
import store from './store'
import tui from './common/tui.js' // 普通的快速工具类
import cacheHelper from './common/cacheHelper.js' // 缓存工具类
import api from './common/api/api.js' //api 接口
import constant from './constant/constant.js' // 常量
import utils from './utils/util.js'
// import pageHead from './components/page-head.vue'
// import pageFoot from './components/page-foot.vue'
// import uLink from '@/components/uLink.vue'
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue" //下拉刷新
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue" //下拉刷新



Vue.config.productionTip = false

Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
// Vue.component('page-head', pageHead)
// Vue.component('page-foot', pageFoot)
// Vue.component('uLink', uLink)
Vue.prototype.tui = tui
Vue.prototype.api = api
Vue.prototype.cacheHelper = cacheHelper
Vue.prototype.$eventHub = Vue.prototype.$eventHub || new Vue()
Vue.prototype.$store = store
Vue.prototype.constant = constant
Vue.prototype.utils = utils





App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()
