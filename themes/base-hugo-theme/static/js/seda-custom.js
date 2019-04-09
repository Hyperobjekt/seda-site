

(function($) {
    var jQuery = $.noConflict(false);
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

    function initHomepageAnimations() {
      $(window).scroll(function() { // Says this function is preformed continuously while scrolling.
          var windowHeight = $( window ).height(),
              Scroll = $(window).scrollTop() + windowHeight - 300, // This variable finds the distance you have scrolled from the top.
              avgGraphic = $('#avg-graphic').offset().top; 
              growthGraphic = $('#growth-graphic').offset().top;
              trendGraphic = $('#trendgraphic').offset().top; 
           if (Scroll >= avgGraphic) { // If you have scrolled past this section do this.
              $("#avg-graphic").addClass("move"); // Adds class of current-menu-item to the menu item with a class of menu-item-1
          }  
          if (Scroll >= growthGraphic) { // If you have scrolled past this section do this.
            $("#growth-graphic").addClass("move"); // Adds class of current-menu-item to the menu item with a class of menu-item-1
        }  
           //if (Scroll >= trendGraphic) { // If you have scrolled past this section do this.
           // $("#trendgraphic").addClass("move");  
        // }
      });
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

        /* Homepage animations */
        if (($('body.home') && $("#trendgraphic").length >= 1)) {
          initHomepageAnimations();
        }


        var dkbluepath = anime.path('#dkblueline');
        var medbluepath = anime.path('#medblueline');
        var greenpath = anime.path('#greenline');
        var schoolstart = 1000;

        var initTrend = anime({
            targets: ['#trendgraphic svg'],
            opacity: 1,
            duration: 250,
            autoplay: false,
            easing: 'easeInOutQuad',
            direction: 'linear',
        });
        var trendStep = anime({
        // Opacity of schools    
            targets: ['#grnschool', '#medblueschool', '#dkblueschool'],
            opacity: 1,
            duration: 250,
            delay: schoolstart,
            easing: 'easeInOutQuad',
            direction: 'linear',
            //loop: true
        });

        var trendStep1 = anime({
        //Dark Blue School Animation
        targets: ['.schoolshape'],
        translateX: dkbluepath('x'),
          translateY: dkbluepath('y'),
          //rotate: path('angle'),
          direction: 'linear',
          easing: 'easeInOutQuad',
          duration: 1500,
          delay: schoolstart,
          autoplay: false,
          //loop: true
        });
        var trendStep2 = anime({
        //Medium Blue School Animation
        targets: ['#medblueschool .mbschoolshape'],
        translateX: medbluepath('x'),
            translateY: medbluepath('y'),
            //rotate: path('angle'),
            direction: 'linear',
            easing: 'easeInOutQuad',
            duration: 1500,
            delay: schoolstart,
            //loop: true
        });
        var trendStep3 = anime({
        //Green School Animation
        targets: ['#grnschool .grnschoolshape'],
        translateX: greenpath('x'),
            translateY: greenpath('y'),
            //rotate: path('angle'),
            direction: 'linear',
            easing: 'easeInOutQuad',
            duration: 1500,
            delay: schoolstart,
            //loop: true
        });
        //Y Axis Line
        var trendStep4 = anime({
            targets: ['#y-axis-trend #y-axisline'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 1000,
            //delay: function(el, i) { return i * 250 },
            direction: 'linear',
            //loop: true
        });
        //Y Axis Cap
        var trendStep5 = anime({
            targets: ['#y-axis-cap path'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 250,
            delay: 1000,
            //delay: function(el, i) { return i * 250 },
            direction: 'linear',
            //loop: true
        });
        //X Axis Line
        var trendStep6 = anime({
            targets: ['#x-axis-trend-2 #x-axis-line'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 1000,
            //delay: function(el, i) { return i * 250 },
            direction: 'linear',
            //loop: true
        });
        //X Axis Cap
        var trendStep7 = anime({
            targets: ['#x-axis-cap path'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 250,
            delay: 1000,
            //delay: function(el, i) { return i * 250 },
            direction: 'linear',
            //loop: true
        });
        //Trend Lines
        var trendStep8 = anime({
            targets: ['#trendlines path'],
            strokeDashoffset: [anime.setDashoffset, 0],
            easing: 'easeInOutQuad',
            duration: 1500,
            //delay: function(el, i) { return i * 250 },
            direction: 'linear',
            loop: false,
            delay: schoolstart,
        });

       // Store these once so you don't repeatedly query the DOM for them.
        var trendGraphic1 = null;
        var windowHeight = null;
        /**
         * Set or reset position and height of elements which effect scroll calculations.
         */
        function setElPositions() {
        var trendGraphic1 = $('#trendgraphic').offset().top;
        var windowHeight = $( window ).height();
        }
        /**
         * Check scroll position and animate target if conditions positive
         */
        var animated = false;
        function checkScrollPosition() {
        Scroll = $(window).scrollTop() + windowHeight - 300;
        if (Scroll >= trendGraphic1 && !animated) { // If you have scrolled past this section do this.
            animated = true; // Turn off the flag so you don't do it over and over.
            initTrend.play();
            trendStep.play();
            trendStep1.play();
            trendStep2.play();
            trendStep3.play();
            trendStep4.play();
            trendStep5.play();
            trendStep6.play();
            trendStep7.play();
            trendStep8.play();
        }
        }
        setElPositions();
        $(window).resize(function() {
        setElPositions();
        })

       
        var userScrolled = false;
        $(window).scroll(function() {
        userScrolled = true;
        });

        setInterval(function() {
        if (userScrolled) {
            checkScrollPosition();
            userScrolled = false;
        }
        }, 50);
      

      

    });

})(jQuery);
