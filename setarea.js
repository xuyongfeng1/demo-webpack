function Create_option_area(types, m, vals, n) {
  if (!m) {
    m = [0, 0]
  }
  var option = '<option selected="selected" value="">—</option>';
  var selected = '';
  if (types == "province") {
    option = '<option selected="selected" value="">请选择</option>';
  } else if (types == "city") {

  } else if (types == "area") {
    
  }
  for (var i = m[0]; i <= m[1]; i++) {
    //console.log(i+'<<>>'+vals);
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