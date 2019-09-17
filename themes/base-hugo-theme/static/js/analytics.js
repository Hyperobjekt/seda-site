/**
 * Analytics listeners
 */
(function($) {
  console.log('Loading Analytics listeners');
  const analytics = {};
  analytics.push = (data, callback) => {
    console.log('analytics.push');
    dataLayer.push(data);
  }
  analytics.init = () => {
    console.log('analytics.init');

    // Listens for call to action clicks
    $('.gta-event-CTAClick').on('click touchstart', (e) => {
      console.log('.gta-event-CTAClick');
      e.preventDefault();
      // console.log(e.currentTarget);
      $target = $(e.currentTarget).attr('href');
      // console.log($target);
      const _obj = {
        'event' : 'CTAClick',
        'CTASource': window.location.href ? window.location.href : 'Unavailable',
        'CTADestination': encodeURI($target),
        'eventCallback' : () => {
            window.open($target);
        }
      }
      analytics.push(_obj);
    });

    // bioExpanded
    $('.gta-event-bioExpanded').on('click touchstart', (e) => {
      console.log('.gta-event-bioExpanded');
      $target = $(e.currentTarget);
      // console.log($target);
      $bioName = $target.closest('.launch-people-bio').find('.name').text();
      // console.log($bioName);
      const _obj = {
        'event' : 'bioExpanded',
        'bio': $bioName ? $bioName : 'Unavailable'
      }
      analytics.push(_obj);
    });

    // eMailSignup
    $('.gta-event-eMailSignup').on('click touchstart', (e) => {
      console.log('.gta-event-eMailSignup');
      e.preventDefault();
      // console.log(e.currentTarget);
      $target = $(e.currentTarget);
      $form = $target.closest('form');
      // console.log($target);
      const _obj = {
        'event' : 'eMailSignup',
        'eventCallback' : () => {
            $form.submit();
        }
      }
      analytics.push(_obj);
    });

    // postSelected
    $('.gta-event-postSelected').on('click touchstart', (e) => {
      console.log('.gta-event-postSelected');
      e.preventDefault();
      $target = $(e.currentTarget).attr('href');
      const _obj = {
        'event' : 'postSelected',
        'discoverySelection': encodeURI($target),
        'eventCallback' : () => {
            window.open($target);
        }
      }
      analytics.push(_obj);
    });

    // showAbstractandVersion , paperCategory, paperName
    $('.gta-event-showAbstractandVersion').on('click touchstart', (e) => {
      console.log('.gta-event-showAbstractandVersion');
      $target = $(e.currentTarget);
      $paperCategory = null;
      if ($('.row.subnav.small-tab-nav').is(':visible')) {
        // console.log('Mobile view');
        $paperCategory = $('.row.subnav.small-tab-nav').find('ul.anchor-links li a.active').text();
      } else {
        $paperCategory = $('.row.subnav.large-tab-nav').find('#researchTabs li a.active').text();
      }
      // console.log('$paperCategory: ' + $paperCategory);
      $paperName = null;
      $paperName = $(e.currentTarget).closest('.research-paper').find('.info h5').text();
      // console.log($paperName);
      const _obj = {
        'event' : 'showAbstractandVersion',
        'paperCategory': $paperCategory ? $paperCategory : 'Unavailable',
        'paperName': $paperName ? $paperName : 'Unavailable'
      }
      analytics.push(_obj);
    });

    // categorySelected
    $('.gta-event-categorySelected').on('click touchstart', (e) => {
      console.log('.gta-event-categorySelected');
      $target = $(e.currentTarget);
      $paperCategory = $target.text();
      // console.log($paperCategory);
      const _obj = {
        'event' : 'categorySelected',
        'paperCategory': $paperCategory ? $paperCategory : 'Unavailable'
      }
      analytics.push(_obj);
    });
    // paperDownloadbyVersion   paperVersion, paperName
    $('.gta-event-paperDownloadbyVersion').on('click touchstart', (e) => {
      console.log('.gta-event-paperDownloadbyVersion');
      // e.preventDefault();
      $target = $(e.currentTarget);
      $paperName = null;
      $paperName = $(e.currentTarget).closest('.research-paper').find('.info h5').text();
      $file = $target.attr('href');
      const _obj = {
        'event' : 'postSelected',
        'discoverySelection': encodeURI($target),
        'eventCallback' : () => {
            window.open($target);
        }
      }
      analytics.push(_obj);
    });
    // paperDownloadLatest      paperVersion, paperName
    $('.gta-event-paperDownloadLatest').on('click touchstart', (e) => {
      console.log('.gta-event-paperDownloadLatest');
      // e.preventDefault();
      $target = $(e.currentTarget);
      let $paperName = null;
      $paperName = $(e.currentTarget).closest('.research-paper').find('.info h5').text();
      // console.log($paperName);
      let $file = $target.attr('href');
      $file = $file.replace('.pdf', '');
      const $paperVersion = $file.slice($file.indexOf('v', $file) + 1, $file.length + 1);
      // console.log($paperVersion);
      const _obj = {
        'event' : 'paperDownloadLatest',
        'paperVersion': $paperVersion,
        'paperName': $paperName
      }
      analytics.push(_obj);
    });
    // articleSelected          newsArticleName, newsArticlePublication
    // faqTopicExpanded         faqTopicExpansion
    // districtHighlighted      highlightedDistrict
  }
  if (!!dataLayer) {
    const timeout = setTimeout(function() {
      if (dataLayer.length >= 3) {
        analytics.init();
      } else {
        console.log('The GTM dataLayer cannot be found... Skipping analytics listeners.');
      }
    }, 600);
    //
  } else {
    console.log('Error! The GTM dataLayer cannot be found... Skipping analytics listeners.');
  }
})(jQuery);
