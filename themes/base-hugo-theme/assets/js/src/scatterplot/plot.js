/* use strict */

const _plot = {};
_plot.searchItemIDs = [];

(function($) {

    const plot = {
        scatterplot: null,
        wrappers: [],
        top: null,
        height: null,
        bottom: null,
        isTransitional: false,
        activeState: 'state1',
        // searchItemIDs: [],
        searchEl: null,
        searchProps: { // Props passed in to init the search input(s)
          algoliaId: 'QPJ12WSVR4',
          algoliaKey: 'bae9e4604dbd263cc47c48bfb30dd5dc',
          onSuggestionSelected: function(hit) {
            // console.log('hit');
            // console.log(hit);
            if (_plot && _plot.searchItemIDs) {
              _plot.searchItemIDs[0] = hit;
            }
            // console.log(_plot.searchItemIDs);
            scatterplot.loadState(plot.activeState);
            // GA Event submission
            const $highlightedDistrict = '';
            if (!!dataLayer && (dataLayer.length >= 3)) {
              dataLayer.push({
                'event': 'districtHighlighted',
                'highlightedDistrict': hit['name']
              });
            } else {
              console.log('dataLayer not available. Skipping analytics reporting for highlighted item select.');
            }
          },
          onSelectedClear: function(e) {
            // console.log(e);
            // Clear search item array
            searchItemIDs = [];
            // Reload state
            scatterplot.loadState(plot.activeState);
          },
          indices: ['districts'],
          inputProps: {
            placeholder: 'Highlight a district...',
            'aria-label': 'Enter a district name to search'
          }
        },
        renderSearch: function() {
          // $elements = $('.search-component');
          // $elements.each(function(el) {
          //   (plot.searchEl).push(new plot.searchInit(plot.searchProps, el));
          // });
          var rootEl = document.getElementById('searchComponent');
          plot.searchEl = new plot.searchInit(plot.searchProps, rootEl);
        },
        searchInit: function(props, container) {
          var _self = this;

          // add reference to the component to props
          var refProps = Object.assign(props, {
            ref: function(ref) { _self.component = ref; }
          });

          this.render = function(props) {
            ReactDOM.render(
              React.createElement(SedaSearch, props, null),
              container
            );
          }
          this.render(refProps);
        },
        update: function() {
            // console.log('update');
            var activeWrappers = $.grep(plot.wrappers, function(el) {
                // Get top and bottom y coords of wrapper
                plot.top = (plot.scatterplot).offset().top + 120; // + 462;
                var wrapperTop = $(el).offset().top; // $(el).offset().top - $(window).scrollTop();
                // var wrapperHeight = $(el).height();
                var wrapperHeight = $(el).outerHeight();
                var wrapperBottom = Number(wrapperTop) + Number(wrapperHeight);
                // If plot top or bottom are within
                // add to activeWrappers.
                // console.log('plot.top = ' + plot.top);
                // console.log('offset().top = ' + $(el).offset().top);
                // console.log('scrolltop = ' + $(window).scrollTop());
                // console.log('wrapperTop = ' + wrapperTop);
                // console.log('wrapperBottom = ' + wrapperBottom);
                if ((plot.top >= wrapperTop && plot.top <= wrapperBottom)) {
                    // console.log('It\'s within a wrapper.');
                    return $(el);
                }
            });
            // console.log(activeWrappers);
            if (activeWrappers.length == 1) {
                // console.log('One item in activeWrappers.');
                (plot.scatterplot).removeClass('transitional');
                plot.isTransitional = false;
                // Set state to the first one.
                // console.log(activeWrappers[0]);
                var state = $(activeWrappers[0]).attr('data-plot-state');
                var notmerge =
                    $(activeWrappers[0]).attr('data-plot-notmerge') ?
                    $(activeWrappers[0]).attr('data-plot-notmerge') :
                    false;
                // console.log(
                //     'State = ' + state +
                //     '. Active state = ' + plot.activeState +
                //     '. NotMerge = ' + String(notmerge) + '.' );
                if (state !== plot.activeState) {
                    console.log('loading new state ' + state);
                    if (notmerge) {
                        scatterplot.loadState(state, {notMerge: true});
                    } else {
                        scatterplot.loadState(state);
                    }
                    plot.activeState = state;
                }
            } else if (activeWrappers.length === 0 || activeWrappers.length >= 1) {
                (plot.scatterplot).addClass('transitional');
                plot.isTransitional = true;
                // console.log('In transition. State = ' + state);
            }
        },
        getCoords: function() {
          plot.top = (plot.scatterplot).offset().top;
          plot.height = (plot.scatterplot).find('> div').height();
          plot.bottom = Number(plot.top) + Number(plot.height);
        }
    };

    // Get top and bottom y coords of the scatterplot
    plot.scatterplot = $('#scatterplot');
    plot.wrappers = $('.state-desc-wrapper');
    plot.getCoords();

    // Reset them if the screen is resized
    $( window ).resize(function() {
        // plot.top = (plot.scatterplot).offset().top;
        // plot.height = (plot.scatterplot).find('> div').height();
        // plot.bottom = Number(plot.top) + Number(plot.height);
        plot.getCoords();
    });

    // Only trigger scroll ever 50ms so less resources
    scatterplot.on('ready', function(scatterplot) {
        var userScrolled = false;
        $(window).scroll(function() {
          userScrolled = true;
        });
        setInterval(function() {
          if (userScrolled) {
            plot.update(); // @lane, disabled default scroll event init here.
            userScrolled = false;
          }
        }, 50);

        if ($('.search-component').length >= 1) {
          plot.renderSearch();
        }
    });
    scatterplot.loadState('state1');
})(jQuery);
