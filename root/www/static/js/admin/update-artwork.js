$(document).ready(function() {

  var formatsCount = $('#formats .format').length - 1;

  function showHideFormatHandler() {
    $(this).parent().next().toggle();
  }


  function bindShowHideFormatHandlers() {
    $('.showHideFormat').on('click', showHideFormatHandler);
  }


  function bindRemoveFormatHandlers() {
    var count = 0;

    $('#formats .removeFormat').each(function(i) {

      $(this).on('click', removeFormatHandler);
    });
  }


  function removeFormatHandler() {
    var that = this,
            $container = $(that).parent().parent(),
            formatId = $container.find('input[name="ignore._id"]').val(),
            artworkSlug = $('input[name="artwork[slug]"]').val(),
            doRemove = confirm('Are you sure you want to delete this format?');

    //console.log($container.prev())
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


  $('#newFormat').click(function() {
    $.post('/admin/artwork/' + $('input[name="artwork[slug]"]').val() + '/format/new.html',
            function(data) {
              //console.log(data);
              $('#formats').append(data);
              bindShowHideFormatHandlers();
            });
  });

  bindShowHideFormatHandlers();

  bindRemoveFormatHandlers();
});