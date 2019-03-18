(function($) {
    var jQuery = $.noConflict(true);
    var $ = jQuery;

    function checkScroll(y) {
        // console.log(checkScroll);
        // If the scroll is at the top, not sticky.
        // Transition comes farther down the page for
        // the the front page.
        var heroHeight = $('#hero') ? $('#hero').height() : 0;
        // console.log(heroHeight);
        if (y <= (heroHeight - 64)) {
            // $('body').addClass('scroll-top');
            $('nav').removeClass('sticky-top');
        } else if (y > (heroHeight - 64)) {
            // $('body').removeClass('scroll-top');
            $('nav').addClass('sticky-top');
        }
    }

    function toggleAbstract(e) {
        // console.log('toggleAbstract()');
        e.preventDefault();
        $target = $(e.target);
        $target.parents('.research-paper').toggleClass('abstract-visible');
    }

    var updateModal = {
        activeBio: null,
        update: function() {
            console.log('updateModal.update()');
            console.log(updateModal.activeBio);
            var $button = $(this.activeBio).find('button');

            // Get name, title, bio, and image
            var parent = $button.parent();
            // console.log(parent);
            var name = $button.parent().siblings('.name').text();
            // console.log('name = ' + name);
            var title = $button.parent().siblings('.title').text();
            // console.log('title = ' + title);
            var bio = $button.parent().siblings('.bio').html();
            /// console.log('bio = ' + bio);
            var image = $button.closest('.column-people').children('.pic').attr('style');

            // Set contents
            $('#modalImg').attr('style', image);
            $('#modalName').text(name);
            $('#modalTitle').html(title);
            $('#modalBio').html(bio);
            $('#peopleBioModal').modal('show');

            // Check first and last position, disable buttons
            if ($(updateModal.activeBio).prev().length <= 0) {
                console.log('first item');
                $('#prevBio').prop( "disabled", true);
                $('#nextBio').prop( "disabled", false);
            } else if ($(updateModal.activeBio).next().length <= 0) {
                console.log('last item');
                $('#prevBio').prop( "disabled", false);
                $('#nextBio').prop( "disabled", true);
            } else {
                $('#prevBio').prop( "disabled", false);
                $('#nextBio').prop( "disabled", false);
            }
        }
    };

    $( document ).ready(function() {
        // Manage navbar appearance by scroll position
        $( window ).scroll(function() {
          var t = $(window).scrollTop();
          checkScroll(t);
        });
        // Check on page load as well.
        var t = $(window).scrollTop();
        checkScroll(t);

        // Smooth scroll down on button click
        $('.scroll-to-section').on('click', function(e) {
            console.log('click');
            e.preventDefault();
            var target_id = $(e.target).attr('data-scroll-target');
            // console.log(target_id);
            $target = $('#' + target_id);
            // console.log($target);
            $('html, body').animate({
                scrollTop: ($target.offset().top) - 63
            }, 500);
            var t = $(window).scrollTop();
            checkScroll(t);
        });

        // Handle bio modals
        if ($('button.launch-people-bio').length >= 1) {
          // console.log('exists');
          $('button.launch-people-bio').click(function(e) {
            e.preventDefault();
            var $button = $(e.target);
            // Store active bio so navigation between then works.
            updateModal.activeBio = $button.closest('.column-people');
            updateModal.update();

            $('#prevBio').on('click', function() {
                if ($(updateModal.activeBio).prev().length >= 1) {
                    updateModal.activeBio = $(updateModal.activeBio).prev();
                    updateModal.update();
                }
            });
            $('#nextBio').on('click', function() {
                if ($(updateModal.activeBio).next().length >= 1) {
                    updateModal.activeBio = $(updateModal.activeBio).next();
                    updateModal.update();
                }
            });
          });
        }

        // Dropdown for article sorting on mobile
        $('body.research .small-tab-nav ul li a').on('click', function(e) {
            // console.log('Small tab nav selection');
            $(this).tab('show');
            // Store target.
            $target = $(e.target);
            // Clear all active and highlight classes.
            $('body.research .small-tab-nav ul li a').removeClass('active highlight');
            // Add proper classes to selected target.
            $target.addClass('active highlight');
        });

        // Display article abstract and versions for entry on research page.
        $('a.show-versions').on('click', function(e) {
            // console.log('a.show-versions');
            toggleAbstract(e);
        });

        $('body.research a[data-toggle="tab"]').on('click touchstart', function (e) {
            // console.log('hide tab event');
            if ($('.research-paper.abstract-visible').length >= 1) {
                $('.research-paper.abstract-visible').removeClass('abstract-visible');
            }
        });

        $('#toggleDrawer').on('click', function() {
            // console.log('#toggleDrawer selected');
            $('#drawer').addClass('show');
        });

        $('#closeDrawer').on('click', function() {
            console.log('#closeDrawer selected');
            $('#drawer').removeClass('show');
        });

        // Add Subnav active selection highlighting

        $(".subnav a").click(function () {
            $(".subnav a").removeClass("highlight");
            $(this).addClass("highlight");
        });



    });
})(jQuery);
