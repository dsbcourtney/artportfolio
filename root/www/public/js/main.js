$(document).ready(function() {
  $('#aLogin').click(function(){
    $('#loginform').show();
    return(false);
  });
  $('#aLoginClose').click(function(){
    $('#loginform').hide();
    return(false);
  });
  $('#aRegister').click(function(){
    $('#registerform').show();
    return(false);
  });
  $('#aRegisterClose').click(function(){
    $('#registerform').hide();
    return(false);
  });
});