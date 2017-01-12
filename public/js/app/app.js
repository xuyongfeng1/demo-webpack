
var main = require('main');
var form = require('form');
var url = require('url');
// 在node里面配置 ajax请求的封装的地址配置,要修改devUrl地址,然后在url.js里面进行配置,在你要引用的js里面配置.

function Wyeth() {
  console.log("app.js");
  _this = this;
  this.isClick = false;
  this.id = '';
  this.main = function() {
    // 调用main里面封装的 jian  ting 方法. 
      main.event(this,'touchstart','i-click');
      main.event(this,'change','i-change');
      this.init();
     
  }
  
  this.closeWindow = function() {
    wx.closeWindow();
  }
  this.getCode = function(_dom) {
      var _mobile = $('input[name="mobile"]').val();
      var code = $('input[name="code"]').val();
      if (_dom.text() != '获取验证码') {
        return false;
      }
      if (_mobile == "") {
        form.jsAlert('请输入手机号码');
      } else if (/^1[3|4|5|7|8]\d{9}$/.test(_mobile) == false) {
        form.jsAlert('手机号码格式有误');
      } else {
        _dom.text("校验中");


        $.getJSON(url.ajaxSendSmsCode + _mobile, function(json, textStatus) {
          _json = json;
          if (_json.errCode == 0) {

            var tm = 60;
            var tmr = setInterval(function() {
              tm--;
              if (tm > 0) {
                _dom.text(tm + "秒");
              } else {
                _dom.text('获取验证码');
                clearInterval(tmr);
                tm = 60;
                _dom.attr('onclick', 'join.getCode()')
              }
            }, 1000);

            form.jsAlert('验证码已经发送');
          } else if (_json.errCode == '1002') {
            form.jsAlert('该手机号码已被注册');
          } else if (_json.errCode == '1001') {
            form.jsAlert('系统错误');
          }
        });
      }
    }
    
  this.postForm = function(ths) {
    form.ajaxSubmit('.z_form');
  }
  // alFun 
  this.alFun = function(ths) {   
    $('.weui_mask,.weui_dialog').remove();
  }
  // 获取省more than  de 请求
  this.getAllArea = function(name,vals){
    console.log(name)
    var f_code,obj;
    if(name==""){
      f_code=1;
      obj='select[name="province"]';
    }else if(name=="province"){
      f_code=vals;
      obj='select[name="city"]';
    }else{
      f_code=vals;
      obj='select[name="district"]';
    }
    $.get(url.getAllArea,{"f_code":f_code},function(res){
      if(res.errCode==0){
        _this.createOption(obj,res.list,vals);
      }else{
        alert(res.errMsg)
      }
      
    },'json');
  }

  // 创建了一个select下拉.
  this.createOption = function(obj,data,vals) {
    var option = '<option selected="selected" value="">请选择</option>';
    var selected = '';
    for (var i = 0; i < data.length; i++) {
      // console.log(i+'<<>>'+vals);
      // // if (!n) {
      //   if (i == vals) {
      //     selected = 'selected="selected"'
      //   } else {
      //     selected = ''
      //   }
      // // }
      option += '<option ' + selected + ' value="' + data[i].code + '">' + data[i].name + '</option>';
    };
    $(obj).html(option);
  }
  this.changetest = function(ths){
    var vals = ths.val();
    var name = ths.attr('name');
    if(name=="province"){
      $("select[name='district']").html("");
    }
    _this.getAllArea(name,vals)
  }
  //显示规则
  this.showRules=function(){
    $("#masked").css('display','block');
    $(".motai_explain").css('display','block');
  }
  //关闭规则
  this.del_mk=function(){
    $(".motai_explain").css('display','none');
    $("#masked").css('display','none');
  }
  //判断是否参与过申领儿童奶
  this.goPage=function(){
    main.get(url.isJoin,function(ret){
      console.log(ret)
      if (ret.errCode == "0") {
        if(ret.flag==0){
          window.location.href='';
        }else{
          form.jsAlert(ret.msg)
        }
      } else{
        form.jsAlert(ret.errMsg)
      }
    })
  }
  //
  this.postAddForm=function(){
    form.ajaxSubmit('.z_form');
  }
  this.init = function() {
    console.log(page);
    if(page=="new"){
      this.getAllArea("","");
      form.setcolor($('#year')[0]);
      $(".z_form").attr("action",url.ajaxRegister)
    }else if(page=="old"){
      this.getAllArea("","");
      $(".z_form").attr("action",url.putLogisticsData)
    }
  }


  return this.main();
}

var wyeth = new Wyeth();

