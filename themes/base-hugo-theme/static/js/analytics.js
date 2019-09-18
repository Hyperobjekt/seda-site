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

    // Event: CTAClick
    $('.gta-event-CTAClick').on('click touchstart', (e) => {
      console.log('.gta-event-CTAClick');
      e.preventDefault();
      // console.log(e.currentTarget);
      $target = $(e.currentTarget).attr('href');
      // console.log($target);
      const _obj = {
        'event' : 'CTAClick',
        'CTADestination': encodeURI($target),
        'eventCallback' : () => {
            window.location.href = $target;
        }
      }
      analytics.push(_obj);
    });

    // Event: bioExpanded
    $('.gta-event-bioExpanded').on('click touchstart', (e) => {
      console.log('.gta-event-bioExpanded');
      $target = $(e.currentTarget);
      // console.log($target);
      // $bioName = $target.closest('.launch-people-bio').find('.name').text();
      // console.log($bioName);
      const _obj = {
        'event' : 'bioExpanded'
      }
      analytics.push(_obj);
    });

    // Event: eMailSignup
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

    // Event: postSelected
    $('.gta-event-postSelected').on('click touchstart', (e) => {
      console.log('.gta-event-postSelected');
      e.preventDefault();
      $target = $(e.currentTarget).attr('href');
      const _obj = {
        'event' : 'postSelected',
        'discoverySelection': encodeURI($target),
        'eventCallback' : () => {
            window.location.href = $target;
        }
      }
      analytics.push(_obj);
    });

    // Event: showAbstractandVersion
    // Reports: paperCategory, paperName
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

    // Event: categorySelected
    // Reports: paperCategory
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
    // Event: paperDownloadbyVersion
    // Reports: paperVersion, paperName
    $('.gta-event-paperDownloadbyVersion').on('click touchstart', (e) => {
      console.log('.gta-event-paperDownloadbyVersion');
      // e.preventDefault();
      $target = $(e.currentTarget);
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
    $('.gta-event-paperDownloadLatest').on('click touchstart', (e) => {
      console.log('.gta-event-paperDownloadLatest');
      $target = $(e.currentTarget);
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
    $('.gta-event-articleSelected').on('click touchstart', (e) => {
      console.log('.gta-event-articleSelected');
      e.preventDefault();
      $target = $(e.currentTarget).attr('href');
      $titleNode = $(e.currentTarget).closest('.row.news-item').find('h4 a');
      $newsArticleName = $titleNode.text();
      // console.log($newsArticleName);
      $newsArticlePublication = $titleNode.attr('data-outlet');
      // console.log($newsArticlePublication);
      const _obj = {
        'event': 'articleSelected',
        'newsArticleName': $newsArticleName,
        'newsArticlePublication': $newsArticlePublication,
        'eventCallback' : () => {
            window.location.href = $target;
        }
      }
      analytics.push(_obj);
    });
    // Event: faqTopicExpanded
    // Reports: faqTopicExpansion
    $('.gta-event-faqTopicExpanded').on('click touchstart', (e) => {
      console.log('.gta-event-faqTopicExpanded');
      $target = $(e.currentTarget);
      const $topic = $(e.currentTarget).find('h5').text();
      const _obj = {
        'event' : 'faqTopicExpanded',
        'faqTopicExpansion': $topic
      }
      analytics.push(_obj);
    });
    // error page
    if ($('body.type-404').length >= 1) {
      const _obj = {
        'event' : 'error',
        'errorMessage': '404'
      }
      analytics.push(_obj);
    }
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
