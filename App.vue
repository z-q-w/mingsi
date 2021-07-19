<script>
	var  piaconten={}
	export default {
		computed: {//vuex 全局会话列表
			getConversationList() {
				return this.$store.state.conversationList
			}
		},
		watch: {//vuex 全局会话列表监听
		
		},
		mounted() {

		   
		},
		methods: {

		},
		onLaunch: function() {
			var info = plus.push.getClientInfo(); // 获取推送客户端信息，传给后台
			console.log(info);
			// #ifdef APP-PLUS
			const _self = this;
			let contentdata = '';
			plus.push.addEventListener('click', function(message) {
				//点击消息的回调
				console.log(message);
				let contentse;
				if (plus.os.name != 'iOS') {
					//安卓
					contentse = JSON.parse(contentdata);
				} else {
					//ios
					if (message.payload) {
						//如透传消息不符合格式，则“payload”属性为string类型
						//这里的示例以json字符串去解析，实际上也可以做字符串匹配
						if (typeof message.payload == 'string') {
							try {
								contentse = JSON.parse(message.payload);
							} catch (error) {
								console.log(error);
							}
						} else if (typeof message.payload == 'object') {
							//iOS应用正处于前台运行时收到推送，也触发receive事件，此时payload为json对象
							contentse = message.payload;
						}
					}
				}
			
				// uni.switchTab({
				//     url: '/pages/client/home/home'
				// });
				console.log(contentse);
				setTimeout(() => {
					//系统消息
					uni.navigateTo({
						url:'/pages/client/home/messageList?type=' + 1
					});
				}, 1000)
			
			});
			plus.push.addEventListener('receive', function(message) {
				// 透传消息，透传消息不显示通知栏
				// plus.nativeUI.toast('push receive');readmessage
				uni.$emit('readmessage', {
					msg: '发送消息'
				});
				console.log(message);
				// contentdata = message.content;
				// let contentse = JSON.parse(contentdata);
				// if (message.type == 'receive') {
				//  plus.push.createMessage(message.title);
				// }
			
				if (plus.os.name != 'iOS') {
					//安卓
					console.log(222);
					contentdata = message.content;
					let contentse = JSON.parse(contentdata);
					plus.push.createMessage(message.title, message.payload);
					return;
				}
				//根据payload传递过来的数据，打开一个详情
				var payload;
				if (message.payload) {
					//如透传消息不符合格式，则“payload”属性为string类型
					//这里的示例以json字符串去解析，实际上也可以做字符串匹配
					if (typeof message.payload == 'string') {
						try {
							payload = JSON.parse(message.payload);
						} catch (error) {
							console.log(error);
						}
					} else if (typeof message.payload == 'object') {
						//iOS应用正处于前台运行时收到推送，也触发receive事件，此时payload为json对象
						plus.push.createMessage(message.title, message.content);
					}
				}
			});
			// #endif
			setTimeout(()=>{
				plus.navigator.closeSplashscreen()
			},3000)
		},
		onShow: function() {
			console.log('App Show')
			this.cacheHelper.showflstRequest()
			
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/app.css";
	::-webkit-scrollbar {  
	    display: none;  
	    width: 0 !important;  
	    height: 0 !important;  
	    -webkit-appearance: none;  
	    background: transparent;  
	}
	.status_bar {
	   height: var(--status-bar-height);
	   width: 100%;
   }
   .questionbag{
		  position: -webkit-sticky;
		  position: sticky;
		  top: var(--window-top);
		  z-index: 99;
    }
	
</style>
