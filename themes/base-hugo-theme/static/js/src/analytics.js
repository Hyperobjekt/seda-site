/**
 * Analytics listeners
 */
(function($) {
  // console.log('Loading Analytics listeners');
  const analytics = {};
  analytics.push = function (data) {
    // console.log('analytics.push');
    dataLayer.push(data);
  }
  analytics.navigate = (target, blank) => {
    if (blank) {
      window.open(target, '_blank');
    } else {
      window.location.href = target;
    }
  }
  analytics.init = function () {
    // console.log('analytics.init');

    // Event: CTAClick
    $('.gta-event-CTAClick').on('click touchstart', function (e) {
      console.log('.gta-event-CTAClick');
      e.preventDefault();
      // console.log(e.currentTarget);
      const $target = $(e.currentTarget).attr('href');
      const $targetBlank = ($(e.currentTarget).attr('target') === '_blank');
      // console.log($target);
      const _obj = {
        'event' : 'CTAClick',
        'CTADestination': encodeURI($target),
        'eventCallback' : () => {
            analytics.navigate($target, $targetBlank);
        }
      }
      analytics.push(_obj);
    });

    // Event: bioExpanded
    $('.gta-event-bioExpanded').on('click touchstart', function (e) {
      console.log('.gta-event-bioExpanded');
      const $target = $(e.currentTarget);
      // console.log($target);
      const _obj = {
        'event' : 'bioExpanded'
      }
      analytics.push(_obj);
    });

    // Event: eMailSignup
    $('.gta-event-eMailSignupAttempt').on('click touchstart', function (e) {
      console.log('.gta-event-eMailSignupAttempt');
      const _obj = {
        'event' : 'eMailSignupAttempt'
      }
      analytics.push(_obj);
    });

    // Event: postSelected
    $('.gta-event-postSelected').on('click touchstart', function (e) {
      console.log('.gta-event-postSelected');
      e.preventDefault();
      const $target = $(e.currentTarget).attr('href');
      const _obj = {
        'event' : 'postSelected',
        'discoverySelection': encodeURI($target),
        'eventCallback' : function() {
            window.location.href = $target;
        }
      }
      analytics.push(_obj);
    });

    // Event: showAbstractandVersion
    // Reports: paperCategory, paperName
    $('.gta-event-showAbstractandVersion').on('click touchstart', function (e) {
      console.log('.gta-event-showAbstractandVersion');
      const $target = $(e.currentTarget);
      const $paperCategory = null;
      if ($('.row.subnav.small-tab-nav').is(':visible')) {
        // console.log('Mobile view');
        $paperCategory = $('.row.subnav.small-tab-nav').find('ul.anchor-links li a.active').text();
      } else {
        $paperCategory = $('.row.subnav.large-tab-nav').find('#researchTabs li a.active').text();
      }
      // console.log('$paperCategory: ' + $paperCategory);
      let $paperName = null;
      $paperName = $(e.currentTarget).closest('.research-paper').find('.info h5').text();
      // console.log($paperName);
      const _obj = {
        'event' : 'showAbstractandVersion',
        'paperCategory': $paperCategory ? $paperCategory : 'Unavailable',
        'paperName': $paperName ? $paperName : 'Unavailable'
      }
      analytics.push(_obj);
    });

    // Event: categorySelected
    // Reports: paperCategory
    $('.gta-event-categorySelected').on('click touchstart', function (e) {
      console.log('.gta-event-categorySelected');
      const $target = $(e.currentTarget);
      const $paperCategory = $target.text();
      // console.log($paperCategory);
      const _obj = {
        'event' : 'categorySelected',
        'paperCategory': $paperCategory ? $paperCategory : 'Unavailable'
      }
      analytics.push(_obj);
    });

    // Event: paperDownloadbyVersion
    // Reports: paperVersion, paperName
    $('.gta-event-paperDownloadbyVersion').on('click touchstart', function (e) {
      console.log('.gta-event-paperDownloadbyVersion');
      // e.preventDefault();
      const $target = $(e.currentTarget);
      let $paperName = null;
      $paperName = $(e.currentTarget).closest('.research-paper').find('.info h5').text();
      // console.log($paperName);
      const $paperVersion = $target.attr('data-date');
      // console.log($paperVersion);
      const _obj = {
        'event': 'paperDownloadbyVersion',
        'paperVersion': $paperVersion,
        'paperName': $paperName
      }
      analytics.push(_obj);
    });

    // Event: paperDownloadLatest
    // Reports: paperVersion, paperName
    $('.gta-event-paperDownloadLatest').on('click touchstart', function (e) {
      console.log('.gta-event-paperDownloadLatest');
      const $target = $(e.currentTarget);
      const $paperName = $target.closest('.research-paper').find('.info h5').text();
      const $paperVersion = $target.attr('data-date');
      const _obj = {
        'event': 'paperDownloadLatest',
        'paperVersion': $paperVersion,
        'paperName': $paperName
      }
      analytics.push(_obj);
    });

    // Event: articleSelected
    // Reports: newsArticleName, newsArticlePublication
    $('.gta-event-articleSelected').on('click touchstart', function(e) {
      console.log('.gta-event-articleSelected');
      e.preventDefault();
      const $target = $(e.currentTarget).attr('href');
      const $titleNode = $(e.currentTarget).closest('.row.news-item').find('h4 a');
      const $newsArticleName = $titleNode.text();
      // console.log($newsArticleName);
      const $newsArticlePublication = $titleNode.attr('data-outlet');
      const $targetBlank = ($(e.currentTarget).attr('target') === '_blank');
      // console.log($targetBlank);
      // console.log($newsArticlePublication);
      const _obj = {
        'event': 'articleSelected',
        'newsArticleName': $newsArticleName,
        'newsArticlePublication': $newsArticlePublication,
        'eventCallback' : function() {
            analytics.navigate($target, $targetBlank);
        }
      }
      analytics.push(_obj);
    });

    // Event: faqTopicExpanded
    // Reports: faqTopicExpansion
    $('.gta-event-faqTopicExpanded').on('click touchstart', function(e) {
      console.log('.gta-event-faqTopicExpanded');
      const $target = $(e.currentTarget);
      const $topic = $(e.currentTarget).find('h5').text();
      const _obj = {
        'event' : 'faqTopicExpanded',
        'faqTopicExpansion': $topic
      }
      analytics.push(_obj);
    });

    // Event: navClick
    // Reports: navType, navItem
    $('.gta-event-navClick').on('click touchstart', function(e) {
      console.log('.gta-event-navClick');
      e.preventDefault();
      const $target = $(e.currentTarget);
      const $href = $target.attr('href');
      const $targetBlank = ($target.attr('target') === '_blank');
      let $navType = null;
      if ($target.closest('#drawer').length >= 1) {
        $navType = 'main';
      }
      if ($target.closest('footer').length >= 1) {
        $navType = 'footer';
      }
      let $navItem = $target.text().trim();
      if ($navItem.length <= 0) {
        $navItem = $target.attr('href');
      }
      if ($navItem.length <= 0) {
        $navItem = $target.find('span, h1')[0].text().trim();
      }
      // console.log($navType);
      // console.log($navItem);
      const _obj = {
        'event' : 'navClick',
        'navType': $navType,
        'navItem': $navItem,
        'eventCallback' : function() {
          // console.log('request successful');
          analytics.navigate($href, $targetBlank);
        }
      }
      analytics.push(_obj);
    });

    // Basic JS error listener
    window.addEventListener('error', function(error) {
      console.log('window listener for error');
      const _obj = {
        'event' : 'error',
        'errorMessage': 'Error originating from ' + error.filename +
                        ' at line ' + error.lineno + ', column ' + error.colno +
                        ':\n' + error.message
      }
      analytics.push(_obj);
    });
  }
  if (!!dataLayer) {
    // console.log('dataLayer found');
    const waitTime = ($('body.type-posts').length) >= 1 ? 1200 : 600;
    const timeout = setTimeout(function() {
      if (dataLayer.length >= 3) {
        analytics.init();
      } else {
        console.log('The GTM dataLayer cannot be found... Skipping analytics listeners.');
      }
    }, waitTime);
  } else {
    console.log('Error! The GTM dataLayer cannot be found... Skipping analytics listeners.');
  }
})(jQuery);
