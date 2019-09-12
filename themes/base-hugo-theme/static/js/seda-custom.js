

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
            $('.subnav').removeClass('sticky-top');
        } else if (y > (heroHeight - 64)) {
            // $('body').removeClass('scroll-top');
            $('nav').addClass('sticky-top');
            $('.subnav').addClass('sticky-top');
        }
    }

    if (supportsSVGTransforms()) {
      // use svg animation
      $('.svg-animated').removeClass('d-md-none');
      $('.svg-static').addClass('d-md-none');
      //$('.svg-animated').addClass('d-none');
      //$('.svg-static').removeClass('d-none');
      console.log('Browser supports SVG transforms');
    } else {
      // static fallback
      $('.svg-static').removeClass('d-md-none');
      $('.svg-static').addClass('opaque');
      $('.svg-animated').addClass('d-md-none');
      console.log('Browser does not support SVG transforms');
    }

    function toggleAbstract(e) {
        // console.log('toggleAbstract()');
        e.preventDefault();
        $target = $(e.target);
        $target.parents('.research-paper').toggleClass('abstract-visible');
    }

    anime.set(['#mainland', '.plotpoints', 'body.home .hero-child h2.hero-animate',
    'body.home .hero-child p.hero-animate', 'body.home .hero-child button.hero-animate'], {
      opacity: [0]
    });
    /* anime.set(['g#grades text', 'g#ses-metric text', '#grades path#axis-line-2', '#hp-x-line path#map-x'], {
      opacity: [0]
    }); */
    anime({
      targets: ['g#ses-metric', 'g#grades', 'g#hp-x-line'],
      opacity: [0, .3],
      duration: 1,
      delay: 1
    });
    anime({ // Scatterplot points
      targets: ['.plotpoints'],
      opacity: [0, .25],
      easing: 'easeOutCubic',
      delay: anime.stagger(24, {start: 300}) // increase delay for each element.
    });
    anime({ // Map
      targets: ['#mainland'],
      keyframes: [
        {opacity: 0.8, delay: 1400, duration: 1000},
        {opacity: 0.6, delay: 2400, duration: 800},
      ],
      easing: 'easeInSine',
    });
    anime({ // Y Axis
      targets: ['#grades path#axis-line-2'],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1400,
    });
    anime({ // X Axis
      targets: ['#hp-x-line path#map-x'],
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: 'easeInOutSine',
      duration: 1400,

    });
    anime({ // Grades
      targets: 'g#grades text',
      transform: ['translate(0 400)', 'translate(0 0 )'], // have to do it in this format to get it to work on webkit
      easing: 'easeInOutSine',
      duration: 1400,

    });
    anime({ // Numbers
      targets: 'g#ses-metric text',
      transform: ['translate(-500 0)', 'translate(0 0 )'], // have to do it in this format to get it to work on webkit
      easing: 'easeInOutSine',
      duration: 1400,
    });

    anime({ // Headline text
      targets: 'body.home .hero-child h2.hero-animate',
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 1000,
      delay: 3000,
    });

    anime({ // Body text
      targets: 'body.home .hero-child p.hero-animate',
      opacity: [0, 1],
      easing: 'easeInOutSine',
      duration: 800,
      delay: 4000,
    });

    anime({ // Button
      targets: 'body.home .hero-child button.hero-animate',
      opacity: [0, 1],
      transform: ['translate(100 0)', 'translate(0 0 )'],
      easing: 'easeInOutSine',
      duration: 800,
      delay: 5200,
    });

    // Variables for anime

    var initGrowth = null;
    var growthYAxis = null;
    var growthYAxisCap = null;
    var growthXAxis = null;
    var growthXAxisCap = null;

    var dkbluepath = null;
    var medbluepath = null;
    var greenpath = null;
    var schoolstart = null;
    var initTrend = null;
    var trendStep = null;
    var trendStep1 = null;
    var trendStep2 = null;
    var trendStep3 = null;
    var trendStep4 = null;
    var trendStep5 = null;
    var trendStep6 = null;
    var trendStep7 = null;
    var trendStep8 = null;
    var trendStep9 = null;
    var trendStep10 = null;
    var trendStep11 = null;

    var avgGraphic = null;
    var growthGraphic = null;
    var trendGraphic = null;
    var windowHeight = null;
    var avgGraphicAnimated = false;
    var growthGraphicAnimated = false;
    var trendGraphicAnimated = false;

    /**
     * Sets up all the animation targets and chars
     */
   function setupAnime() {
      // console.log('setupAnime');

      initGrowth = anime({
        targets: ['#growth-graphic svg'],
        opacity: 1,
        duration: 250,
        autoplay: false,
        easing: 'easeInOutQuad',
        direction: 'linear',
      });


      // Growth Y Axis line
      growthYAxis = anime({
        targets: ['#y-axis-growth #growth-y-axisline'],
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuad',
        duration: 1000,
        direction: 'linear',
        autoplay: false,
      });
      // Growth Y Axis Cap
        growthYAxisCap = anime({
        targets: ['#y-axis-growth #growth-y-axis-cap path'],
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuad',
        duration: 250,
        delay: 1000,
        direction: 'linear',
        autoplay: false,
      });
      //Growth X Axis Line
        growthXAxis = anime({
        targets: ['#x-axis-growth #growth-x-axis-line'],
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuad',
        duration: 1000,
        direction: 'linear',
        autoplay: false,
    });
    //Growth X Axis Cap
        growthXAxisCap = anime({
        targets: ['#x-axis-growth #growth-x-axis-cap path'],
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: 'easeInOutQuad',
        duration: 250,
        delay: 1000,
        direction: 'linear',
        autoplay: false,
    });
    }


    function setupAnime2() {
      dkbluepath = anime.path('#dkblueline');
      medbluepath = anime.path('#medblueline');
      greenpath = anime.path('#greenline');
      schoolstart = 1200;

      initTrend = anime({
          targets: ['#trendgraphic svg'],
          opacity: 1,
          duration: 250,
          autoplay: false,
          easing: 'easeInOutQuad',
          direction: 'linear',
      });
      trendStep = anime({
        // Opacity of schools
          targets: ['#grnschool', '#medblueschool', '#dkblueschool'],
          opacity: 1,
          duration: 250,
          delay: schoolstart,
          easing: 'easeInOutQuad',
          direction: 'linear',
          autoplay: false,
      });
      trendStep1 = anime({
        //Dark Blue School Animation
        targets: ['#dkblueschool .schoolshape'],
        translateX: dkbluepath('x'),
        translateY: dkbluepath('y'),
        direction: 'linear',
        easing: 'easeInOutQuad',
        duration: 1500,
        delay: schoolstart,
        autoplay: false,
      });
      trendStep2 = anime({
        //Medium Blue School Animation
        targets: ['#medblueschool .mbschoolshape'],
        translateX: medbluepath('x'),
          translateY: medbluepath('y'),
          direction: 'linear',
          easing: 'easeInOutQuad',
          duration: 1500,
          delay: schoolstart,
          autoplay: false,
      });
      trendStep3 = anime({
      //Green School Animation
        targets: ['#grnschool .grnschoolshape'],
          translateX: greenpath('x'),
          translateY: greenpath('y'),
          direction: 'linear',
          easing: 'easeInOutQuad',
          duration: 1500,
          delay: schoolstart,
          autoplay: false,
      });
      //Y Axis Line
      trendStep4 = anime({
          targets: ['#y-axis-trend #y-axisline'],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuad',
          duration: 1000,
          direction: 'linear',
          autoplay: false,
      });
      //Y Axis Cap
      trendStep5 = anime({
          targets: ['#y-axis-trend #y-axis-cap path'],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuad',
          duration: 250,
          delay: 1000,
          direction: 'linear',
          autoplay: false,
      });
      //X Axis Line
      trendStep6 = anime({
          targets: ['#x-axis-trend-2 #x-axis-line'],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuad',
          duration: 1000,
          direction: 'linear',
          autoplay: false,
      });
      //X Axis Cap
      trendStep7 = anime({
          targets: ['#x-axis-trend-2 #x-axis-cap path'],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuad',
          duration: 250,
          delay: 1000,
          direction: 'linear',
          autoplay: false,
      });
      //Trend Lines
      trendStep8 = anime({
          targets: ['#trendlines path'],
          strokeDashoffset: [anime.setDashoffset, 0],
          easing: 'easeInOutQuad',
          duration: 1500,
          direction: 'linear',
          delay: schoolstart,
          autoplay: false,
      });
      //Scores Text
      trendStep9 = anime({
          targets: ['text#Scores'],
          opacity: 1,
          easing: 'linear',
          duration: 250,
          direction: 'linear',
          delay: 375,
          autoplay: false,
      });
      //2009 Text
      trendStep10 = anime({
          targets: ['text#t2009'],
          opacity: 1,
          easing: 'linear',
          duration: 250,
          direction: 'linear',
          delay: 250,
          autoplay: false,
      });
      //2016 Text
      trendStep11 = anime({
          targets: ['text#t2016'],
          opacity: 1,
          easing: 'linear',
          duration: 250,
          direction: 'linear',
          delay: 500,
          autoplay: false,
      });
    }

    function animateGrowthGraphic() {
      // console.log('animateGrowthGraphic()');
      initGrowth.play();
      growthYAxis.play();
      growthYAxisCap.play();
      growthXAxis.play();
      growthXAxisCap.play();
    }

    function animateTrendGraphic() {
      // console.log('animateTrendGraphic()');
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
      trendStep9.play();
      trendStep10.play();
      trendStep11.play();
    }


    function setElPositions() {
      // console.log('setElPositions()');
      avgGraphic = $('#avg-graphic').offset().top;
      growthGraphic = $('#growth-graphic').offset().top;
      trendGraphic = $('#trendgraphic').offset().top;
      windowHeight = $( window ).height();
      // console.log('avgGraphic offset = ' + avgGraphic);
      // console.log('growthGraphic offset = ' + growthGraphic);
      // console.log('trendGraphic offset = ' + trendGraphic);
      // console.log('windowHeight = ' + windowHeight);
    }

    function checkHomepageAnimations() {
      var Scroll = $(window).scrollTop() + windowHeight - 300;
      // console.log('scroll = ' + Scroll);

      if (Scroll >= avgGraphic && !avgGraphicAnimated) {
        // console.log('trigger avgGraphic');
        $("#avg-graphic").addClass("move");
        avgGraphicAnimated = true;
      }

      if (Scroll >= growthGraphic && !growthGraphicAnimated) {
        // console.log('trigger growthGraphic');
        // console.log('growthGraphicAnimated = ' + growthGraphicAnimated);
        $("#growth-graphic").addClass("move");
        animateGrowthGraphic();
        growthGraphicAnimated = true;
      }

      if (Scroll >= trendGraphic && !trendGraphicAnimated) {
        // console.log('trigger trendGraphic');
        animateTrendGraphic();
        trendGraphicAnimated = true;
      }
    }

    /**
     * Checks if SVG Transforms are supported in the browser
     * @returns {bool} true if supported, false if not
     */
    function supportsSVGTransforms() {
      // create svg element
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 8 8');
      Object.assign(svg.style, {
        position: 'absolute', top: 0, left: 0, width: '8px', height: '8px', zIndex: 99999
      });
      // add a rectangle with a transform to the SVG
      svg.innerHTML =
        '<rect width="4" height="4" fill="#fff" style="transform: translate(4px, 4px)"/>';
      document.body.appendChild(svg);
      // check if the rectangle has been transformed
      var result = document.elementFromPoint(6, 6) !== svg;
      svg.parentNode.removeChild(svg);
      return result;
    }
  

    var updateModal = {
        activeBio: null,
        allBios: null,
        update: function() {
            // console.log('updateModal.update()');
            // console.log('activeBio = ');
            // console.log(updateModal.activeBio);
            var $button = $(this.allBios[this.activeBio]).find('button');

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
            var bigimage = $button.parent().siblings('.bigimage').html();

            // Set contents
            $('#modalImg').attr('style', image);
            $('img#bigimage').attr('src', bigimage);
            $('#modalName').text(name);
            $('#modalTitle').html(title);
            $('#modalBio').html(bio);
            $('#peopleBioModal').modal('show');

            // Check first and last position, disable buttons
            if (this.activeBio <= 0) {
                // console.log('first item');
                $('#prevBio').prop( "disabled", true);
                $('#nextBio').prop( "disabled", false);
            } else if (this.activeBio >= ((this.allBios).length - 1)) {
                // console.log('last item');
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
    if ($('.launch-people-bio').length >= 1) {
      // Store the complete collection of bios
      // so we can switch between them all.
      updateModal.allBios = $('.column-people');
      $('.launch-people-bio').on('click', function(e) {
        e.preventDefault();
        var $button = $(e.target);
        // Store active bio index so navigation between them works.
        updateModal.activeBio = (updateModal.allBios).index($button.closest('.column-people'));
        // console.log(updateModal.activeBio);
        updateModal.update();

        $('#prevBio').on('click', function() {
            if (updateModal.activeBio >= 1) {
                updateModal.activeBio = updateModal.activeBio - 1;
                updateModal.update();
            }
        });
        $('#nextBio').on('click', function() {
            if (updateModal.activeBio < (updateModal.allBios).length - 1) {
                updateModal.activeBio = updateModal.activeBio + 1;
                updateModal.update();
            }
        });
        $('#peopleBioModal button.close').on('click', function() {
          // console.log('closing, active bio = ');
          // console.log(updateModal.activeBio);
          updateModal.activeBio = 0;
          $('#prevBio').unbind('click');
          $('#nextBio').unbind('click');
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

    // Add href to URL for FAQ items
    
/**
 * Smooth Scroll
 * ---
 * 
 */
// Get smooth scroll offset depending on window width
function getWindowOffset() {
  var BREAK_MOBILE = 767;
  var BREAK_TABLET = 1023;
  var BREAK_DESKTOP = 1440;

  var OFFSET_MOBILE = 56;
  var OFFSET_TABLET = 56;
  var OFFSET_DESKTOP = 56;

  if (window.innerWidth < BREAK_MOBILE) {
    return OFFSET_MOBILE;
  } else if (window.innerWidthwidth < BREAK_TABLET) {
    return OFFSET_TABLET;
  } else {
    return OFFSET_DESKTOP;
  }
}

// Add an additional page offset where needed by checking the URL
function getPageOffset(url) {
  if (url.indexOf('help-faq') !== -1) {
    return 80;
  }
  if (url.indexOf('methods') !== -1) {
    return 80;
  }
  if (url.indexOf('about') !== -1) {
    return 80;
  }
  if (url.indexOf('why-eviction-matters') !== -1) {
    return 80;
  }
  return 0;
}

    function smoothScroll(path, cb) {
      if (
        location.pathname.replace(/^\//, '') == path.pathname.replace(/^\//, '') &&
        location.hostname == path.hostname &&
        path.hash.length
      ) {
        // check for accordion link
        var target = $('[href="' + path.hash + '"].collapsed');
        // if no accordion link look for an element with the ID
        if (target.length === 0) { target = $(path.hash); }
        // if no ID element look for an element with the name
        if (target.length === 0) { target = $('[name="' + path.hash.slice(1) + '"]'); }
        // scroll to the target
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top - (getWindowOffset() + getPageOffset(location.pathname)) + 'px'
          }, 1000); // The number here represents the speed of the scroll in milliseconds
          if (cb) cb(target);
          return false;
        }
      }
    }
    $(function () {
      // Run smoothscroll on page load
      smoothScroll(window.location, function (target) {
        // If link is an accordion, toggle it
        if (target.hasClass('collapsed')) {
          target.collapse('toggle');
          $(target.attr('href')).collapse('toggle');
        }
      });
    
      $('.smoothScroll').click(function () {
        smoothScroll(this);
        // Close dropdown if dropdown link
        if ($(this).hasClass('dropdown-item')) {
          $(this).closest('div.dropdown').find('.dropdown-toggle').dropdown('toggle');
        }
      });
    });
    
    /**
     * Update URL on accordion expand
     */
    $(function() {
      $('.accordion-section .collapsed').click(function() {
        if (history.pushState) {
          history.replaceState(null, null, $(this).attr('href'));
        }
        else {
          location.hash = $(this).attr('href');
        }
      });
    });

    // 

    $(document).ready(function() {

      $(".toggle-accordion").on("click", function() {
        var accordionId = $(this).attr("accordion-id"),
          numPanelOpen = $(accordionId + ' .collapse.in').length;
        
        $(this).toggleClass("active");
    
        if (numPanelOpen == 0) {
          openAllPanels(accordionId);
        } else {
          closeAllPanels(accordionId);
        }
      })
    
      openAllPanels = function(aId) {
        console.log("setAllPanelOpen");
        $(aId + ' .panel-collapse:not(".in")').collapse('show');
      }
      closeAllPanels = function(aId) {
        console.log("setAllPanelclose");
        $(aId + ' .panel-collapse.in').collapse('hide');
      }
         
    });

    if ($('body.home').length >= 1) {
      console.log('setting up home page animations');
      setElPositions();
        $(window).resize(function() {
        setElPositions();
      })
      setElPositions();
      // Set up svg animations (one-time)
      setupAnime();
      setupAnime2();
      // Scroll listener vars and interval
      var userScrolled = false;
      var svgScrollEvt = $(window).scroll(function() {
        userScrolled = true;
      });
      var svgScrollInt = setInterval(function() {
        if (avgGraphicAnimated && growthGraphicAnimated && trendGraphicAnimated) {
          // Remove listener and interval
          // console.log('removing listener and interval');
          $(window).off("scroll", svgScrollEvt);
          clearInterval(svgScrollInt);
        } else {
          if (userScrolled) {
            checkHomepageAnimations();
            userScrolled = false;
          }
        }
      }, 50);
    }
  });
})(jQuery);
