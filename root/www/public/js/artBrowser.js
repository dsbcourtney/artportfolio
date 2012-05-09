function configureArtBrowser() {
  
  //pseudo constants
  var BROWSER = 1,
          BIOGRAPHY = 2,
          INDEX = 3;
  
  //locals
  var $artBrowser = $('.art-browser'),
          $artActions = $('.art-actions'),
          $container = $artBrowser.parent().parent(),
          $nextLink = $('.next', $artBrowser),
          $prevLink = $('.previous', $artBrowser),
          $items = $('li', $artBrowser),
          $artistBio = $('.artist-bio'),
          $artIndex = $('.art-index'),
          numItems = $items.length,
          position = 0,
          itemsLoaded = 0,
          mode = BROWSER;

  // initialise the page
  $container.hide();
  $artistBio.hide();
  $artIndex.hide();

  //bind event handlers
  $container.on('click', '.artist-bio-button', showBioHandler);
  $container.on('click', '.art-browser-button', showBrowserHandler);
  $container.on('click', '.art-index-button', showIndexHandler);
  
  $('.artwork-lightbox').on('click', function(e){
  
    $(this).fadeOut(150);

  });

  //TODO - not sure we need this preloader script at all!
  // image preloader  
  $($items).find('img').on('load', function () {
    itemsLoaded++;

    if (itemsLoaded >= numItems) {

      $artBrowser.on('click', '.previous', previousClickHandler);

      $artBrowser.on('click', '.next', nextClickHandler);

      $('.container').on('click', '.artwork-link', openLightboxHandler);

      showFormatsForItem(position);
    }
    
  });
  
  //TODO - when to do this ?
  $container.fadeIn(150);

  /* ---- ---- ---- ---- ---- ---- ---- ---- ---- 
  * art browser functionality
  * 
  * */

  function move(inc) {
    var width = -1,
            leftPos,
            newPos = (position + inc);

    if (newPos >= 0 && newPos < numItems) {

//      width = $($items[position + inc]).width();
      width = 510;
      leftPos = $artBrowser.find('ul').css('left').replace('px', '');

      $('ul', $artBrowser).animate({left:(parseInt(leftPos, 10) - (width * inc)) + 'px'});

//      
      position += inc;
      showFormatsForItem(position);
    }
  }

  function showFormatsForItem(pos) {
    $('.art-actions ul li').hide();
    $($('.art-actions ul li')[pos]).show();
  }

  function nextClickHandler(e) {

    move(1);
  }

  function previousClickHandler(e) {

    move(-1);
  }

  /* ---- ---- ---- ---- ---- ---- ---- ---- ---- 
  * 
  * hide / show functionality
  * 
  * */
  function openLightboxHandler(e) {
    var src, title;
    var img = new Image();

    e.preventDefault();

    src = $(this).attr('href');
    title = $(this).attr('title');

    $(img).on('load', function () {
      $('.artwork-lightbox h2').text(title);
      $('.artwork-lightbox img').attr('src', src).parent().fadeIn(150);
      
    });

    img.src = src;

  }

  function hideBio(next){
    $artistBio.fadeOut(150, next);
  }
  
  function hideBrowser(next){
    $artActions.fadeOut(150, function(){
      $artBrowser.fadeOut(150, next);
    });

  }
  
  function hideIndex(next){
    $artIndex.fadeOut(150, next);
  }
  
  function showBio(next){
    mode = BIOGRAPHY;
    $artistBio.fadeIn(150, next);
  }
  
  function showBrowser(next){
    mode = BROWSER;
    $artActions.fadeIn(150, next);
    $artBrowser.fadeIn(150, next);
  }
  
  function showIndex(next){
    mode = INDEX;
    $artIndex.fadeIn(150, next);
  }  

  /* ---- ---- ---- ---- ---- ---- ---- ---- ----
   * event handlers
   * 
   */
  
  function showBioHandler(e){
    e.preventDefault();
    
    if(mode == BROWSER){
      hideBrowser(showBio);
    }
      
    
    if(mode == INDEX){
      hideIndex(showBio);
    }
      
  }
  
  function showBrowserHandler(e){
    e.preventDefault();
    
    if(mode === BIOGRAPHY)
      hideBio(showBrowser);
    
    if(mode === INDEX)
      hideIndex(showBrowser);
  }
  
  function showIndexHandler(e){
    e.preventDefault();
    
    if(mode === BIOGRAPHY)
      hideBio(showIndex);
    
    if(mode === BROWSER)
      hideBrowser(showIndex);
  }

}

$(document).ready(function () {
  configureArtBrowser();
});