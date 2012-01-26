$(document).ready(function() {

  function bindFunctionToDeleteClick(fn) {

    $('.delete').on('click', fn);
  }

  function deleteClickHandler(e) {
    e.preventDefault();

    var artworkTitle = $(this).data('title');

    var deleteConfirmed = confirm('Are you sure you want to delete ' + artworkTitle);

    if (deleteConfirmed) {
      var slug = $(this).data('slug');

      if (!slug) {
        throw 'couldn\'t get artwork slug when trying to delete';
      }

      //TODO: see if  we can find up the dom rather than down
      deleteArtworkWithSlug(slug, $(this).parent().parent());
    }
  }

  function deleteArtworkWithSlug(slug, $parent) {
    //alert(slug);
    $.post('/admin/artwork/' + slug,
            { '_method' : 'delete'},
            function(data) {
              if (data.result === 'success') {
                $parent.remove()
              }
              else {
                throw data.error;
              }
            });
  }

  bindFunctionToDeleteClick(deleteClickHandler);

});