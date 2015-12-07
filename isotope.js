function initiso() {
  // init Isotope
  var $container = $('.grid').isotope({
    itemSelector: '.item'
  });
  
  $container.imagesLoaded().progress( function() {
  $container.isotope('layout');
  });

  // bind filter button click
  $filters = $('#filters').on( 'click', 'button', function() {
    var $this = $( this );
    var filterValue;
    if ( $this.is('.is-checked') ) {
      // uncheck
      filterValue = '*';
    } else {
      filterValue = $this.attr('data-filter');
      $filters.find('.is-checked').removeClass('is-checked');
    }
    $this.toggleClass('is-checked');

    $container.isotope({ filter: filterValue });
  });
  
}

