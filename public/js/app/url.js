//var getdata = "../../";//服务器接口
var getdata = "../../getdata/";//本地接口
// 在node里面配置 ajax请求的封装的地址配置,要修改devUrl地址,然后在url.js里面进行配置,在你要引用的js里面配置.
module.exports = {
	'getAllArea':getdata+'/dev/kidsmilk/getAllArea',							//GET  
	'groupTaskList':getdata+'/Service/getPicContentList',
	'ajaxRegister':getdata+'/dev/kidsmilk/ajaxRegister',    //新会员提交注册
	'isJoin':getdata+'/dev/kidsmilk/isJoin',    //是否参与过申领儿童奶
	'putLogisticsData':getdata+'/dev/kidsmilk/putLogisticsData',    //老会员提交物流信息
	'ajaxSendSmsCode':getdata+'/dev/user_center/ajaxSendSmsCode',    //手机验证码


}