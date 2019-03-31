/* use strict */

(function($) {

    const plot = {
        scatterplot: null,
        wrappers: [],
        top: null,
        height: null,
        bottom: null,
        isTransitional: false,
        activeState: 'state1',
        update: function() {
            //  console.log('update');
            var activeWrappers = $.grep(plot.wrappers, function(el) {
                // Get top and bottom y coords of wrapper
                plot.top = (plot.scatterplot).offset().top;
                var wrapperTop = $(el).offset().top; // $(el).offset().top - $(window).scrollTop();
                var wrapperHeight = $(el).height();
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
                console.log('One item in activeWrappers.');
                (plot.scatterplot).removeClass('transitional');
                plot.isTransitional = false;
                // Set state to the first one.
                // console.log(activeWrappers[0]);
                var state = $(activeWrappers[0]).attr('data-plot-state');
                var notmerge =
                    $(activeWrappers[0]).attr('data-plot-notmerge') ?
                    $(activeWrappers[0]).attr('data-plot-notmerge') :
                    false;
                console.log(
                    'State = ' + state +
                    '. Active state = ' + plot.activeState +
                    '. NotMerge = ' + String(notmerge) + '.' );
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
                console.log('In transition. State = ' + state);
            }
        }
    };

    // Get top and bottom y coords of the scatterplot
    plot.scatterplot = $('#scatterplot');
    plot.wrappers = $('.state-desc-wrapper');
    plot.top = (plot.scatterplot).offset().top;
    plot.height = (plot.scatterplot).find('> div').height();
    plot.bottom = Number(plot.top) + Number(plot.height);

    // Reset them if the screen is resized
    $( window ).resize(function() {
        plot.top = (plot.scatterplot).offset().top;
        plot.height = (plot.scatterplot).find('> div').height();
        plot.bottom = Number(plot.top) + Number(plot.height);
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

        // var range = {
        //   min: -1,
        //   max: 1
        // };
        // var dataSeries = scatterplot.getDataSeries();
        // var nearZero = scatterplot.getSeriesDataInRange(dataSeries.data, 'x', range);
        // console.log('====> logging nearZero:');
        // console.log(nearZero);
    });
})(jQuery);
