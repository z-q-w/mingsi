let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    // url_config = 'http://192.168.1.17:8080/'
	// url_config ='http://192.168.1.7:8088/'  //线下+   强哥
	// url_config ='http://192.168.1.166:8088/'  //线下+  刘耀
	// url_config ='https://zxxl.utools.club/'  //穿透
	url_config = 'http://47.99.60.33:8088/' 
}else{
    // 生产环境 
    url_config = 'http://47.99.60.33:8088/'
}
export default url_config
