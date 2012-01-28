$(document).ready(function() {

  function showHideFormatHandler() {
    $(this).parent().next().toggle();
  }


  function bindShowHideFormatHandlers() {
    $(document).on('click', '.showHideFormat', showHideFormatHandler);
  }


  function removeFormatHandler() {
    var that = this,
            $container = $(that).parent().parent(),
            formatId = $container.find('input[name="ignore._id"]').val(),
            artworkSlug = $('input[name="artwork[slug]"]').val(),
            doRemove = confirm('Are you sure you want to delete this format?');

    if (doRemove) {
      $.post('/admin/artwork/' + artworkSlug + '/format/' + formatId,
              { '_method' : 'delete'},
              function(data) {
                if (data.result === 'success') {
                  $container.prev().remove();
                  $container.remove();
                }
                else {
                  throw data.error;
                }
              });
    }
  }


  function bindRemoveFormatHandlers() {
    var count = 0;

    if(typeof $btn === 'undefined'){
      
      $(document).on('click', '#formats .removeFormat', removeFormatHandler);
      
      return;
    }
  }


  $('#newFormat').click(function() {
    $.post('/admin/artwork/' + $('input[name="artwork[slug]"]').val() + '/format/new.html',
            function(data) {

              $('#formats').append(data);
            });
  });

  bindShowHideFormatHandlers();
  bindRemoveFormatHandlers();
});