var express = require('express');
var app = express();

var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');

//系统配置
var devUrl = "http://woaaptecsr.etocrm.com";
var PHPSESSID = '1'; 

app.use('/',express.static(__dirname+'/public/'));

//登陆验证
// request.post({url:devUrl,form:{'username':'user','password':'aaa837c'}},function(err,response,body){
// 	console.log(response);
// 	// PHPSESSID = JSON.parse(body).session_id;
// 	// console.log("PHPSESSID: "+PHPSESSID);
// });

//get请求后台
function getApiData(url,req,res){
	console.log(devUrl+url);
	request({url:devUrl+url},function(err,response,body){
		//console.log(body);
		res.send(body);
	});
}
//post请求后台
function postApiData(url,data,req,res){
	request.post({url:devUrl+url,form:data},function(err,response,body){			
		res.send(body);
	});
}

//get中转
app.get('/getdata/*',function(req,res){
	console.log(url);
	var url = req.url.replace('/getdata','');
	getApiData(url,req,res);
});
//post中转
app.post('/getdata/*',function(req,res){
	var url = req.url.replace('/getdata','');
	var reqData = req.body;
	postApiData(url,reqData,req,res);
});

var server = app.listen(3998,function(){
	console.log('服务地址',server.address().port);
});