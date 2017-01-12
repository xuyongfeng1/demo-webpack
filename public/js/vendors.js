/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/ 		if(moreModules[0]) {
/******/ 			installedModules[0] = 0;
/******/ 			return __webpack_require__(0);
/******/ 		}
/******/ 	};

/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		1:0
/******/ 	};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}

/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);

/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;

/******/ 			script.src = __webpack_require__.p + "" + chunkId + "." + ({"0":"app"}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};

/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(8);


/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(9);

	function Main() {
	  _this = this;
	  this.main = function () {
	    this.event(this, 'touchstart', "ts-btn");
	    this.init();
	  };
	  //事件封装
	  this.event = function (_this, type, name) {
	    $(document).on(type, '[' + name + ']', function (e) {
	      var event = $($(this)[0]).attr(name);
	      var Fun = event.split(',');
	      _this[Fun[0]]($($(this)[0]), Fun[1], e);
	    });
	  };
	  //公共get方法
	  this.get = function (url, Fun) {
	    var openid = localStorage.getItem("openid");
	    var data = {};
	    if (openid) {
	      data = { "openid": openid };
	    }
	    //url.indexOf('?') == -1?openid = '?'+openid:openid = '&'+openid;
	    $.get(url, data, function (ret) {
	      Fun(ret);
	    }, 'json');
	  };
	  //公共post方法
	  this.post = function (url, data, Fun) {
	    if (!data) {
	      data = {};
	    }
	    var openid = localStorage.getItem("openid");
	    if (openid) {
	      data.openid = openid;
	    };
	    console.log(data);
	    $.post(url, data, function (ret) {
	      Fun(ret);
	    }, 'json');
	  };
	  //区分全半角判断文字长度
	  this.getByteLen = function (val) {
	    if (!val) {
	      val = 0;
	    }
	    var len = 0;
	    for (var i = 0; i < val.length; i++) {
	      if (val.charAt(i).match(/[^\x00-\xff]/ig) != null) //全角
	        len += 2; //如果是全角，占用两个字节
	      else len += 1; //半角占用一个字节
	    }
	    return len / 2;
	  };
	  //获取url属性值
	  this.GetQueryString = function (name) {
	    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	    var url = decodeURI(window.location.search);
	    var r = url.substr(1).match(reg);
	    if (r != null) return unescape(r[2]);return null;
	  };
	  //提示弹出框
	  this.alert = function (options) {
	    var data = {
	      "Ttype": "dialog",
	      "yon": options.yon,
	      "title": options.title || "标题",
	      "details": options.details || "副标题",
	      "closeFun": options.loseFun || 'ts-btn="dialogClose"',
	      "content": options.content || "内容",
	      "footer": options.footer
	    };
	    console.log(data);
	    var alert = tplArr['modal'](data);
	    $('body').append(alert);
	  };
	  this.min_dialog = function (options) {
	    var data = {
	      "Ttype": options.Ttype
	    };
	    var alert = tplArr['modal'](data);
	    $('body').append(alert);
	  };
	  //关闭提示弹出层
	  this.ContactClose = function () {
	    $('.dialog_alert').remove();
	  };
	  this.right = function (options) {
	    var data = {
	      "Ttype": "alert",
	      "yon": options.yon,
	      "title": options.title || "标题",
	      "details": options.details || "副标题",
	      "closeFun": options.loseFun || 'ts-btn="dialogClose"',
	      "name": options.name,
	      "tel": options.tel,
	      "address": options.address,
	      "footer": options.footer
	    };
	    var alert = tplArr['modal'](data);
	    $('body').append(alert);
	  };
	  //提示弹出框
	  this.showAlert = function (options) {
	    var data = {
	      "Ttype": "showAlert",
	      "title": options.title || "标题",
	      "closeFun": options.loseFun || 'ts-btn="dialogClose"',
	      "content": options.content || "内容"
	    };
	    console.log(data);
	    var alert = tplArr['modal'](data);
	    $('body').append(alert);
	  };

	  //关闭提示弹出层
	  this.dialogClose = function () {
	    $('#dialog2').remove();
	  };
	  //关闭分享页
	  this.close_window = function () {
	    $("#shareH5").hide();
	  };
	  this.init = function () {
	    orientLayer();
	    //$(function() {
	    //attachFastClick.attach(document.body);
	    //});
	  };
	  return this.main();
	};

	//横屏提示
	function orientLayer() {
	  var isOchange = false;
	  window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function () {
	    if (window.orientation === 180 || window.orientation === 0) {
	      isOchange = false;
	    }
	    if (window.orientation === 90 || window.orientation === -90) {
	      isOchange = true;
	    }
	  }, false);
	  $(window).resize(function () {
	    setTimeout(function () {
	      wFun();
	    }, 0);
	  });
	  function wFun() {
	    //var Win = $(window);
	    var orientLayer = $('#orientLayer');
	    // var w = Win.width();
	    // var h = Win.height();
	    if (isOchange) {
	      orientLayer.show();
	    } else {
	      orientLayer.hide();
	    }
	  }
	  var style = '<style type="text/css">@-webkit-keyframes rotation{10%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}50%,60%{transform:rotate(0deg);-webkit-transform:rotate(0deg)}90%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}100%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}}@keyframes rotation{10%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}50%,60%{transform:rotate(0deg);-webkit-transform:rotate(0deg)}90%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}100%{transform:rotate(90deg);-webkit-transform:rotate(90deg)}}#orientLayer{display:none}@media screen and(min-aspect-ratio:13/8){#orientLayer{display:block}}.mod-orient-layer{display:none;position:fixed;height:100%;width:100%;left:0;top:0;right:0;bottom:0;background:#333;z-index:9997}.mod-orient-layer__content{position:absolute;width:100%;top:45%;margin-top:-75px;text-align:center}.mod-orient-layer__icon-orient{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIYAAADaCAMAAABU68ovAAAAXVBMVEUAAAD29vb////x8fH////////x8fH5+fn29vby8vL////5+fn39/f6+vr////x8fH////////+/v7////09PT////x8fH39/f////////////////////x8fH///+WLTLGAAAAHXRSTlMAIpML+gb4ZhHWn1c2gvHBvq1uKJcC6k8b187lQ9yhhboAAAQYSURBVHja7d3blpowFIDhTUIAOchZDkre/zE7ycySrbUUpsRN2/1fzO18KzEqxEVgTiZNfgmmtxRc8iaR8HNe8x4BtjQePKayYCIoyBSgvNNE1AkNSHqZyLqk97EgUCCHBzZ5mkg7ScvIJuIyOyXBRFxgpqWZyGsAZLB1KjsJi8nutHU4JCRbFRH8tmirI9k8Jx2sqNs8K/m0LQkrktO2crgcgXGB4AiTEsB0hJfo9MGgX7CGcYiYwQxmMOOvZwRhBG8tCoMXjBDeXvWCEcHbi14wgCBmMIMZzGAGM5jxETNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxA8cMHDNwzMAxY6E2rUQxnH2tz9cirlJFwFBJedaPnUv0M7++egPDE8iAJcIDmxwH5wwv9vUviw2kLbVO3TJU5uul/EyB0FoLp4x60PdGUd3qPurrWyjGGTc05u+1dcgI7/+tCCPARWGhH7o5Y7RCf+bH9ctXLp6v2BVDxfqz0oPXeSVaNtINo/1SXDv4dck8IIkbhtC2ol+iouEonTBCbYvVMnXOjxww6s/RFrBUpXHh/gw1rHj5d/qhYn9Gpk2FWh6xRBRX5Oj3Znh2Sq49/L6+y8pB26q9GbE2dbA2mVbx6I+7MfBglLCttm73ZQi7AD3iL4HqjFYJHSPRppqaUaJ3ATpGa+ckpGak2hRRMyqjGMkvl+xyFeSMwjAqcsZgGDdyhl0oNTnDN4yenJGZFGxNChP5/Y3efh6SM2rDOJMzboYxkDMqwyjIGcIw6F+io2FU1IxIm1JqRmgXSkvNKNCXeTpGrU0JNSO2c6LIGPgCS8AuDHz9ta0SXWDtxoDRH+MqlbC2Dt2G2JFRadtQZt2qq/orGowdGb2euxYiqWEpVWhTBnszoNAPdStuQwxqf0aocdWKW4Z+DfszIh8pxJqbuCE4YAC+4bm0evtipjpgJHeFnyyt1Ku2xa0bhjxr27p75rECNwyI9ZwvXkHq+7aTaMEV44YYy/spfgjgjNHaWW+GeUhGEX7tLlVinIFDDSgnOwhi1V6bU0b6tVS9eAERe863g4dRrtiHdc6o+nn5vtyVVgR79Cqt4uL6gfHPQyGqtP2vf7HADGbcYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JiBYwaOGThm4JjhtOM+J/AgT008yDMkN/dPP9hzS8zAMQN3OEYeekp5YU7KOKXwVXqiY+QS7smcinGKABWdiBgpPJTSMHJ4KidhhPBUSMLw4CmPhKHgKUXCkHsygum71ftNSgCX6bsl8FQyfbcL5EdYsDk0R3j7aiA5wpt5AjKg/2gLJEBD/0Hf2OOf/vRrj6z/7GtP4B3nMKyjHA12kIPSjnJs3FEO0TvKkYJHOWCR+rjJH0Vn6fI5PjNbAAAAAElFTkSuQmCC");display:inline-block;width:67px;height:109px;transform:rotate(90deg);-webkit-transform:rotate(90deg);-webkit-animation:rotation infinite 1.5s ease-in-out;animation:rotation infinite 1.5s ease-in-out;-webkit-background-size:67px;background-size:67px}.mod-orient-layer__desc{margin-top:20px;font-size:15px;color:#fff}.qr-box{display:none}@media only screen and(min-width:1023px){html{width:414px;margin:0 auto;background-color:#333!important;position:absolute;left:50%;margin-left:-207px;max-height:672px}.qr-box{position:absolute;left:50%;margin-left:-75px;border-radius:4px;z-index:9999;background-color:#fff;top:50%;margin-top:-100px;display:block}.qr-box__thumb{position:absolute;right:59px;width:25px;height:25px;display:block;top:59px;z-index:9999;padding:2px;-webkit-background-size:25px;background-size:25px;background-repeat:no-repeat;background-position:2px 2px;border:none}.qr-box__thumb_default{background-color:#fff}.qr-box__text{width:100%;text-align:center;font-size:14px;line-height:18px;padding-bottom:10px}.qr-box__img{width:150px;height:150px;border:none;border-radius:10px 10px 0 0;background-size:140px;-webkit-background-size:140px;background-repeat:no-repeat;background-position:5px}.qr-box__img img{padding:5px;width:140px;height:140px}.screen__inner{-webkit-transform:scale(1.29375)!important;transform:scale(1.29375)!important}.mod-orient-layer__content{display:none}}</style>';
	  var con = '<div id="orientLayer" class="mod-orient-layer"><div class="mod-orient-layer__content"><i class="icon mod-orient-layer__icon-orient"></i><div class="mod-orient-layer__desc">为了更好的体验，请使用竖屏浏览</div></div></div>';
	  $('body').append(style + con);
	  wFun();
	}

	var main = new Main();
	module.exports = main;

/***/ },

/***/ 9:
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }

/******/ });