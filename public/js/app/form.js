//日期方法
//    form.setcolor($('#year')[0]);
function setcolor(ths, n) {
  if (!n) {
    n = false
  }
  // 
  var ths = $(ths);
  var oid = ths.attr('id');
  var vals = ths.val();
  if (vals == '') {
    vals = 1
  }
  var m = [0, 0];
  var nY = new Date();
  var sY = new Date().getFullYear() - 7;
  var eY = new Date().getFullYear() + 1;
  var _y = $('#year').val();
  var _m = $('#month').val();
  var _d = $('#day').val();
  if (oid == "year") {
    m = [sY, eY];
    setcolor($('#month')[0], true);
  } else if (oid == "month") {
    if (_y == sY || _y == eY) {
      m = [1, nY.getMonth() + 1];
      // 
    } else {
      m = [1, 12];
    }
    setcolor($('#day')[0], true);
  } else if (oid == "day") {
    if (_y == sY || _y == eY) {
      if (_m == nY.getMonth() + 1) {
        m = [1, nY.getDate()];
      } else {
        m = [1, new Date(_y, (_m), 0).getDate()];
      }
    } else {
      m = [1, new Date(_y, (_m), 0).getDate()];
    }
  }
  Create_option(oid, m, vals, n);
}

function Create_option(types, m, vals, n) {
  if (!m) {
    m = [0, 0]
  }
  var option = '<option selected="selected" value="">—</option>';
  var selected = '';
  if (types == "year") {
    option = '<option selected="selected" value="">请选择</option>';
  } else if (types == "month") {

  } else if (types == "day") {

  }
  for (var i = m[0]; i <= m[1]; i++) {
    // console.log(i+'<<>>'+vals);
    if (!n) {
      if (i == vals) {
        selected = 'selected="selected"'
      } else {
        selected = ''
      }
    }
    option += '<option ' + selected + ' value="' + i + '">' + i + '</option>';
  };

  $('#' + types).html(option);
}
//日期方法  --end



//ajaxSubmit 表单数据整理
function ajaxSubmit(obj) {
  // ---------通过遍历的方式将内容放到data当中.---------------
  var url = $(obj).attr("action");
  var callback_name = $(obj).attr("callback");
  var callback = null;
  // eval("callback = " + callback_name + "");
  var data = {};
  $.map($(obj).serializeArray(), function(item) {
    var name = data[item.name];

    var isArray = /\[\]$/;
    if (isArray.test(item.name)) {
      if (!data[item.name]) {
        name = []
      }
      data[item.name].push(item.value);
    } else {
      data[item.name] = item.value;
    }
  });
  console.log(data);
  if (!yzForm(data)) {
    return false;
  }

  $.ajax({
    url: url,
    type: "POST",
    data: data,
    dataType: "json",
    success: function(ret) {
      console.log(ret)
      if (ret.errCode == "0") {
        jsAlert('提示', "提交成功", "closeWindow")
      } else{
        jsAlert(ret.errMsg);
      }

    },
    error: function(ret) {}
  });
}
//方法验证
function yzForm(data) {
  var Ctrue = true;
  for (ipt in data) {
    console.log(data[ipt]);
    switch (ipt) {
      case 'name':
        if (data[ipt] == "") {
          isCtrue('请输入用户名');
          return false;
        }
        //if (/^([\u4e00-\u9fa5]|[\w]){2,30}$/.test(data[ipt]) == false) {isCtrue('用户名格式有误格式有误');return false;}
        break;

      case 'mobile':
        if (data[ipt] == "") {
          isCtrue('请输入手机号码');
          return false;
        }
        if (/^1[3|4|5|7|8]\d{9}$/.test(data[ipt]) == false) {
          isCtrue('手机号格式有误');
          return false;
        }
        break;

      case 'code':
        if (data[ipt] == "") {
          isCtrue('请输入验证码');
          return false;
        }
        break;

      case 'year':
        if (data[ipt] == "") {
          isCtrue('请选择年');
          return false;
        }
        break;

      case 'month':
        if (data[ipt] == "") {
          isCtrue('请选择月');
          return false;
        }
        break;

      case 'day':
        if (data[ipt] == "") {
          isCtrue('请选择日');
          return false;
        }
        break;

      case 'province':
        if (data[ipt] == "") {
          isCtrue('请选择省份');
          return false;
        }
        break;

      case 'city':
        if (data[ipt] == "") {
          isCtrue('请选择城市');
          return false;
        }
        break;

      case 'district':
        if (data[ipt] == "") {
          isCtrue('请选择地区');
          return false;
        }
        break;

      case 'address':
        if (data[ipt] == "") {
          isCtrue('请输入收货地址');
          return false;
        }
        break;

    }
  }
  if(page=="new"){
    if($("input[name='mk_check2']:checked").length==0){isCtrue('请确认以上条款');return false;}
  }

  function isCtrue(text) {
    Ctrue = false;
    jsAlert(text);
  };
  return Ctrue;
}

function jsAlert(title, content, callback) {
  //注册成功！
  //恭喜！您已注册成功。
  // alFun();
  if (!title) {
    title = '提示'
  }
  if (!content) {
    content = ''
  }
  if (!callback) {
    callback = 'alFun'
  }
  var con = '<div class="weui_mask"></div>' +
    '<div class="weui_dialog">' +
    '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div>' +
    '<div class="weui_dialog_bd">' + content + '</div>' +
    '<div class="weui_dialog_ft">' +
    '<a href="javascript:;" i-click='+callback+' class="weui_btn_dialog primary">确定</a>' +
    '</div>' +
    '</div>';
  $('body').append(con);
}

function jsConfirm(title, content, callback) {
  //注册成功！
  //恭喜！您已注册成功。
  if (!title) {
    title = ''
  }
  if (!content) {
    content = ''
  }
  if (!callback) {
    callback = 'alFun'
  }
  var con = '<div class="weui_mask"></div>' +
    '<div class="weui_dialog">' +
    '<div class="weui_dialog_hd"><strong class="weui_dialog_title">' + title + '</strong></div>' +
    '<div class="weui_dialog_bd">' + content + '</div>' +
    '<div class="weui_dialog_ft">' +
    '<a href="javascript:;" i-click="alFun" class="weui_btn_dialog default">取消</a>' +
    '</div>' +
    '</div>';
  $('body').append(con);
}
//获取地址栏信息的封装函数
function GetQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}


exports.setcolor = setcolor;
exports.Create_option = Create_option;
// exports.orientLayer = orientLayer;
exports.ajaxSubmit = ajaxSubmit;
exports.yzForm = yzForm;
exports.jsAlert = jsAlert;
exports.jsConfirm = jsConfirm;
exports.GetQueryString = GetQueryString;
// exports.setarea = setarea;