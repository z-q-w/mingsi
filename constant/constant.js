// 缓存的名字
const StorageName = {
	APP_LOGIN_TOKEN: 'app_login_token', //token
	APP_USER_INFO: 'app_user_info', // 用户信息
	COURSE_TYPE:'course_type',//课程常量
	PUSH_STREAM:'push_stream'//推流
}

// 通知事件
const EventKey = {
	UPDATE_USER_INFO: 'update_user_info', //  用户信息变化或登录/注销
	UPDATE_QUESTION_LIST:'update_question_list',
	UPDATE_SYSTEM_MESSAGE:'update_system_message'//更新消息数量
}

export default {
	StorageName,
	EventKey
}
