
$(document).ready(function(){

  var formatsCount = $('#formats .format').length -1;
  
  function showHideFormatHandler(){
    $(this).parent().next().toggle(); 
  }
  
  $('#newFormat').click(function(){
    var formatsHtml = $('#formats div.format:eq(0)').html();
    formatsCount++;
    formatsHtml = formatsHtml.replace(/\[0\]/gi,'['+formatsCount+']');
    
    $('#formats')
      .append('<div class="controls"><input class="showHideFormat" type="button" value="Show / Hide"/></div><div>'+formatsHtml+'</div>')
        .find('.showHideFormat')
        .on('click', showHideFormatHandler);
    
    console.log(formatsHtml);
  });
  
  $('.showHideFormat').on('click', showHideFormatHandler)
  
});