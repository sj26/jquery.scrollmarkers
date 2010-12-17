(function($, undefined) {
  
  var self = null;
  
  $.fn.scrollmarker = function(o) {
    return this.each(function() {
      new $.scrollmarker(this, o);
    });
  };
  
  $.scrollmarker = function(e, o) {
    this.options = o || {};
    this.marker = null;
    this.place = $(e);
    this.place.data('scrollmarker', this);
    
    this.init();
  };
  
  $.scrollmarker.fn = $.scrollmarker.prototype = {
    scrollmarker: '0.0.1',
  };
  
  $.scrollmarker.fn.extend = $.scrollmarker.extend = $.extend;
  
  $.scrollmarker.fn.extend({
    init: function() {
      var self = this;
      this.marker = $('<div class="scrollmarker"></div>')
        .text(this.place.text())
        .appendTo(this.place.parent('body'))
        .click(function() { self.show(); })
      $(window).resize(function() { self.position(); });
      this.position();
      // TODO: listen to dom changes around .place and ajust marker
    },
    
    position: function() {
      var placeTop = this.place.offset().top,
        markerHeight = this.marker.height(),
        documentHeight = $(document).height(),
        windowHeight = $(window).height();
      this.marker.css({position: 'fixed', top: (placeTop / documentHeight) * windowHeight - (markerHeight / 2), right: 0});
    },
    
    show: function() {
      $(document).scrollTo(this.place.offset().top, 300);
    },
    
    remove: function() {
      this.marker.remove();
      delete this.marker;
      this.place.data('scrollmarker', null);
      delete this.place;
    }
  });
  
})(jQuery);