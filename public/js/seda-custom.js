(function($) {
    var jQuery = $.noConflict(true);
    var $ = jQuery;

    function checkScroll(y) {
      if ($('body.home').length >= 1) {
        // If the scroll is at the top, add class.
        // Transition comes farther down the page for
        // the the front page.
        if (y <= 600) {
            $('body').addClass('scroll-top');
        } else if (y >= 601) {
            $('body').removeClass('scroll-top');
        }
      } else {
        if (y <= 0) {
            $('body').addClass('scroll-top');
        } else {
            $('body').removeClass('scroll-top');
        }
      }
    }
    $( document ).ready(function() {
        // console.log( "ready!" );
        // If on the home page, add scrollY tracking class to body tag.
        // if ($('body.home').length >= 1) {
          // When the window is scrolled, check scroll position.
          $( window ).scroll(function() {
              var t = $(window).scrollTop();
              checkScroll(t);
          });
        // }
        // Check on page load as well.
        var t = $(window).scrollTop();
        checkScroll(t);

        // Handle bio modals
        if ($('button').length >= 1) {
          // console.log('exists');
          $('.btn-bio').click(function(e) {
            var $button = $(e.target);
            e.preventDefault();
            console.log('clicked');
            // Get name, title, bio, and image
            var parent = $button.parent();
            console.log(parent);
            var name = $button.parent().siblings('.name').text();
            console.log('name = ' + name);
            var title = $button.parent().siblings('.title').text();
            console.log('title = ' + title);
            var bio = $button.parent().siblings('.bio').html();
            console.log('bio = ' + bio);
            var image = $button.parent().siblings('.pic').html();
            console.log('image = ' + image);
            // Set contents
            $('#modalImg').html(image);
            $('#modalName').text(name);
            $('#modalTitle').html(title);
            $('#modalBio').html(bio);
            $('#peopleBioModal').modal('show');
          });
        }
    });
})(jQuery);
