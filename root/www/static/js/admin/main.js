$(document).ready(function(){
  var formatsCount = $('#formats .format').length -1;
  
  function showHideHandler(){
    console.log($(this).parent().next());
    $(this).parent().next().toggle(); 
  }
  
  $('#newFormat').click(function(){
    var formatsHtml = $('#formats div.format:eq(0)').html();
    formatsCount++;
    formatsHtml = formatsHtml.replace(/\[0\]/gi,'['+formatsCount+']');
    
    $('#formats')
      .append('<div class="controls"><input class="showHideFormat" type="button" value="Show / Hide"/></div><div>'+formatsHtml+'</div>')
        .find('.showHideFormat')
        .on('click', showHideHandler);
    
    console.log(formatsHtml);
  });
  
  $('.showHideFormat').on('click', showHideHandler)
});