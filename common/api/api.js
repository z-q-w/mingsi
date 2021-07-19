import fetch from './request.js'

const api = {}



/////////////////////////////////////////////////////////////////////////////////////

//获取课程类型-无其他
api.getDictVoList = params => fetch.request("app/dict/getDictVoList", params, "GET", true,true)

//首页的轮播图
api.bannerhome = params => fetch.request("api/banner/home", params, "POST", true,true)

//积分商城的轮播图
api.bannergoods = params => fetch.request("api/banner/goods", params, "POST", true,true)

//积分商城列表
api.goodsfindPage = params => fetch.request("api/goods/findPage", params, "POST", false,true)

//积分商城详情
api.goodsdetail = params => fetch.request("api/goods/detail", params, "POST", true,true)

//手机号登陆验证码
api.mobileLogin = params => fetch.request("api/login/mobileLogin", params, "POST", true,true)

//获取验证码
api.sendSmsRegister = params => fetch.request("api/message/send/msg", params, "POST", false,false)

//修改密码
api.updatePassword = params => fetch.request("api/customer/updatePassword", params, "POST", false,false)

//注册获取验证码
api.register = params => fetch.request("api/login/register", params, "POST", false,true)

//用户登录
api.loginauth = params => fetch.request("api/login/auth", params, "POST", false,false)

//用户登录
api.feedbackinsert = params => fetch.request("api/feedback/add", params, "POST", false,false)

//用户信息
api.customerinfo = params => fetch.request("api/customer/info", params, "POST", false,true)

//忘记密码
api.forgetPassword = params => fetch.request("api/customer/forgetPassword", params, "POST", false,true)

//收货地址列表
api.addressfindPage = params => fetch.request("api/address/findPage", params, "POST", false,true)

//添加收货地址
api.addressinsert = params => fetch.request("api/address/insert", params, "POST", false,true)

//删除地址
api.addressdelete = params => fetch.request("api/address/delete", params, "POST", true,true)

//编辑收货地址
api.addressupdate = params => fetch.request("api/address/update", params, "POST", false,true)

//查询默认地址
api.addressdefault = params => fetch.request("api/address/default", params, "POST", false,true)

//查询默认地址
api.orderGoodsorder = params => fetch.request("api/orderGoods/order", params, "POST", true,true)

//科目查询
api.subjectfindList = params => fetch.request("api/subject/findList", params, "POST", true,true)

//根据科目查年级
api.findListBySubjectId = params => fetch.request("api/grade/findListBySubjectId", params, "POST", true,true)

//年级列表
api.gradefindList = params => fetch.request("api/grade/findList", params, "POST", true,true)

//根据年级查科目
api.findListByGradeId = params => fetch.request("api/subject/findListByGradeId", params, "POST", true,true)

//修改个人信息
api.customeredit = params => fetch.request("api/customer/edit", params, "POST", false,true)

//领取优惠劵列表
api.couponfindPage = params => fetch.request("api/coupon/findPage", params, "POST", false,true)

//领取优惠劵
api.couponconvert = params => fetch.request("api/user/coupon/convert", params, "POST", true,true)

//我的优惠劵列表
api.mycouponfindPage = params => fetch.request("api/user/coupon/findPage", params, "POST", false,true)

//首页的定位
api.position = params => fetch.request("api/home/position", params, "POST", false,true)

//首页的搜索
api.homesearch = params => fetch.request("api/home/search", params, "POST", false,true)

//热门搜索
api.hotKeywords = params => fetch.request("api/home/hotKeywords", params, "POST", false,true)

//消息列表大列表(展示三个消息的最新一条)
api.homemessage = params => fetch.request("api/home/message", params, "POST", false,true)

//消息列表小列表(分类型)
api.messagepage = params => fetch.request("api/home/message/page", params, "POST", false,true)

//系统消息详情
api.systemDetail = params => fetch.request("api/home/systemDetail", params, "POST", false,true)

//测评
api.matchPaper = params => fetch.request("api/assess/matchPaper", params, "POST", false,true)

//提交测评
api.assesssubmit = params => fetch.request("api/assess/submit", params, "POST", false,false)

//点播列表
api.demandCoursepage = params => fetch.request("api/demandCourse/page", params, "POST", false,true)

//点播详情
api.demandCoursedetail = params => fetch.request("api/demandCourse/detail", params, "POST", false,false)

//点播课课表
api.demandCourseCatalog = params => fetch.request("api/demandCourseCatalog/page", params, "POST", false,true)

//点播课评论
api.evaluation = params => fetch.request("api/evaluation/page", params, "POST", false,true)

//拼团列表
api.grouppage = params => fetch.request("api/group/page", params, "POST", false,true)

//首页推荐课
api.recommend = params => fetch.request("api/course/page", params, "POST", false,true)

//首页推荐课详情
api.coursedetail = params => fetch.request("api/course/detail", params, "POST", false,false)

//首页推荐课课表  只有分完班才会有课表
api.courseCatalog = params => fetch.request("api/courseCatalog/page", params, "POST", false,true)

//学习我的课表
api.mycourse = params => fetch.request("api/my/course/page", params, "POST", false,true)

//我的作业
api.homeworkcoursePage = params => fetch.request("api/homework/coursePage", params, "POST", false,true)

//我的作业课表
api.courseCatalogPage = params => fetch.request("api/homework/courseCatalogPage", params, "POST", false,false)

//我的作业详情
api.homeworkdetail = params => fetch.request("api/homework/detail", params, "POST", false,true)

//我的作业提交
api.homeworksubmit = params => fetch.request("api/homework/submit", params, "POST", false,true)

//艺术课类型列表
api.artClassList = params => fetch.request("api/subject/artClassList", params, "POST", false,true)

//艺术课课程列表
api.recommendPage = params => fetch.request("api/subject/recommendPage", params, "POST", false,true)

//艺术课机构id
api.artDeptDetail = params => fetch.request("api/subject/artDeptDetail", params, "POST", false,true)

//艺术课点播课列表
api.demandCoursesd = params => fetch.request("api/demandCourse/artPage", params, "POST", false,true)

//艺术课班组课列表
api.artPagecourse = params => fetch.request("api/course/artPage", params, "POST", false,true)

//我的点播课列表
api.myDemandCourse = params => fetch.request("api/myDemandCourse/page", params, "POST", false,true)

//错题本-错题列表
api.wrongPage = params => fetch.request("api/homework/wrongPage", params, "POST", false,true)

//错题本-错题详情
api.wrongDetail = params => fetch.request("api/homework/wrongDetail", params, "POST", false,true)

//互动答疑-提问
api.interactionadd = params => fetch.request("api/interaction/add", params, "POST", false,true)

//互动答疑-根据年级科目查询
api.selByGradeSub = params => fetch.request("api/interaction/selByGradeSub", params, "POST", false,true)

//互动答疑-根据搜索词查询  
api.secrchByWord = params => fetch.request("api/interaction/searchByWord", params, "POST", false,true)

//答疑详情
api.interactiondetail = params => fetch.request("api/interaction/detail", params, "POST", false,true)

//答疑详情  回答列表
api.answerPage = params => fetch.request("api/interaction/answerPage", params, "POST", false,true)

//互动答疑-回答问题
api.answerQuestion = params => fetch.request("api/interaction/answerQuestion", params, "POST", false,true)

//我的评价
api.myEvaluate = params => fetch.request("api/evaluation/myEvaluate", params, "POST", false,true)

//我的余额列表
api.balanceDetail = params => fetch.request("api/balanceDetail/page", params, "POST", false,true)

//我的钱包-充值
api.balancerecharge = params => fetch.request("api/balanceDetail/recharge", params, "POST", false,true)

//积分明细
api.integralDetail = params => fetch.request("api/integralDetail/page", params, "POST", false,true)

//老师入驻
api.settlement = params => fetch.request("api/teacher/settlement", params, "POST", false,true)

//入驻信息
api.teachermessage = params => fetch.request("api/teacher/message", params, "POST", false,true)

//我的续报
api.resubmitpage = params => fetch.request("api/resubmit/page", params, "POST", false,true)

// //去支付
// api.payOrder = params => fetch.request("api/pay/payOrder", params, "POST", false,true)

//查询 年级 初中 高中
api.findListBySubjectIdGroupByGrade = params => fetch.request("api/grade/findListBySubjectIdGroupByGrade", params, "POST", true,true)

//订单结算
api.ordersettlement = params => fetch.request("api/order/settlement", params, "POST", false,true)

//生成订单
api.ordercreateOrder = params => fetch.request("api/order/createOrder", params, "POST", false,false)

//学校数据
api.findSchool = params => fetch.request("api/order/findSchool", params, "POST", false,true)

//购买课程查询可用的优惠券
api.findPageByCourse = params => fetch.request("api/user/coupon/findPageByCourse", params, "POST", false,true)

//判断课程是否已下单
api.orderhasBuy = params => fetch.request("api/order/hasBuy", params, "POST", false,false)

//订单支付
api.payOrder = params => fetch.request("api/order/payOrder", params, "POST", false,false)

//我的订单列表
api.orderPage = params => fetch.request("api/order/orderPage", params, "POST", false,false)

//我的订单详情
api.orderdetail = params => fetch.request("api/order/orderDetail", params, "POST", false,true)

//取消订单
api.cancelOrder = params => fetch.request("api/order/cancelOrder", params, "POST", false,true)

//评价前展示订单商品
api.orderGood = params => fetch.request("api/order/orderGood", params, "POST", false,true)

//评价
api.evaluate = params => fetch.request("api/order/evaluate", params, "POST", false,true)

//测评结果
api.resultDetail = params => fetch.request("api/assess/resultDetail", params, "POST", false,false)

//测评列表
api.assessList = params => fetch.request("api/assess/assessList", params, "POST", false,true)

//协议 1:用户协议，2:隐私政策 3 积分规则 4 入学测评规则 5 推荐好友规则
api.agreement = params => fetch.request("api/agreement/detail", params, "POST", false,true)

//点我报名
api.enroll = params => fetch.request("api/enroll/enroll", params, "POST", false,true)

//查看是否已测评
api.hasAssess = params => fetch.request("api/assess/hasAssess", params, "POST", false,true)

//点播课开始或已结束
api.changeDemandStatus = params => fetch.request("api/myDemandCourse/changeDemandStatus", params, "POST", false,true)

//老师详情
api.getById = params => fetch.request("api/teacher/getById", params, "POST", false,true)

//老师在售课程
api.saleCourse = params => fetch.request("api/teacher/saleCourse", params, "POST", false,true)

//老师评价
api.teacherEvaluate = params => fetch.request("api/evaluation/teacherEvaluate", params, "POST", false,true)

//续报列表
api.renewalfindPage = params => fetch.request("api/renewal/findPage", params, "POST", false,true)

//点击选择的城市判断城市是否有机构
api.hasDept = params => fetch.request("api/home/hasDept", params, "POST", false,true)

//积分订单订单列表
api.orderGoodsfindPage = params => fetch.request("api/orderGoods/findPage", params, "POST", false,true)

//积分订单详情
api.orderGoodsdetail = params => fetch.request("api/orderGoods/detail", params, "POST", false,true)

//轮播图详情
api.bannerdetail = params => fetch.request("api/banner/detail", params, "POST", false,true)

//用户邀请信息
api.refereeInfo = params => fetch.request("api/customer/refereeInfo", params, "POST", false,true)

//机构电话
api.deptCustomerMobile = params => fetch.request("api/home/deptCustomerMobile", params, "POST", false,true)

//字典表
api.findByCode = params => fetch.request("api/dict/findByCode", params, "POST", false,true)

//测评答案
api.assessresult = params => fetch.request("api/assess/result", params, "POST", false,false)

//填写真实信息(姓名 学校 年级)
api.fillInTrueInfo = params => fetch.request("api/login/fillInTrueInfo", params, "POST", false,false)

//版本升级
api.isUpgrade = params => fetch.request("api/appVersion/isUpgrade", params, "POST", false,false)

//微信登录
api.wxLogin = params => fetch.request("api/login/wxLogin", params, "POST", true, false)

//绑定微信号
api.bindOpenid = params => fetch.request("api/customer/bindOpenid", params, "POST", false,false)

//ios 获取充值余额列表
api.rechargeDictList = params => fetch.request("api/balanceDetail/rechargeDictList", params, "POST", false,false)

//ios 调起苹果支付后调用这个接口充值余额
api.appleAliRecharge = params => fetch.request("api/balanceDetail/appleAliRecharge", params, "POST", false,false)


export default api
