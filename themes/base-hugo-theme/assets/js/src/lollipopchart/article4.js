document.getElementById('scatterplot').style="height: 100%"
document.getElementById('rectangle').style="height: 100%"
document.getElementById('plot-parent').style="min-height: 440px; height: 100%; max-height: calc(100vh - 150px); margin-bottom: 0px"

const jQ = jQuery;

jQ('.column-scatterplot .title').html('Places with Higher White-Black Socioeconomic Inequality Also Had Faster-Growing Academic Gaps (2009-2018)');
jQ('.column-scatterplot .directions').html('</br>Tap in the chart below to see district names and more data.')
jQ('.column-scatterplot').removeClass('d-sm-none');
jQ('.column-scatterplot').addClass('offset-sm-0');
jQ('.column-scatterplot').removeClass('col-10');
jQ('.column-scatterplot').addClass('col-12');
jQ('.column-scatterplot').removeClass('col-xl-6');
jQ('.column-scatterplot').addClass('col-xl-7');

var myChart = echarts.init(document.getElementById('scatterplot'));

var colorPalette = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
];

const mockData = [{"id":1,"district":"Hawaii Dept of Ed","ses":0.46,"tenYrGapChg":-0.34,"percentGapChg":-23.1,"yrGapClose":2052,"yrGapDbl":""},{"id":2,"district":"Prince William County","ses":1.05,"tenYrGapChg":0,"percentGapChg":-0.2,"yrGapClose":7273,"yrGapDbl":""},{"id":3,"district":"Prince George's County","ses":1.07,"tenYrGapChg":-0.33,"percentGapChg":-14.5,"yrGapClose":2078,"yrGapDbl":""},{"id":4,"district":"Northside ISD","ses":1.11,"tenYrGapChg":0.45,"percentGapChg":30.4,"yrGapClose":"","yrGapDbl":2042},{"id":5,"district":"Alpine","ses":1.15,"tenYrGapChg":0.04,"percentGapChg":1.7,"yrGapClose":"","yrGapDbl":2598},{"id":6,"district":"Baltimore County","ses":1.36,"tenYrGapChg":0.46,"percentGapChg":23.2,"yrGapClose":"","yrGapDbl":2052},{"id":7,"district":"Gwinnett County","ses":1.4,"tenYrGapChg":0,"percentGapChg":0,"yrGapClose":48437,"yrGapDbl":""},{"id":8,"district":"Cypress-Fairbanks","ses":1.49,"tenYrGapChg":0.25,"percentGapChg":11.8,"yrGapClose":"","yrGapDbl":2094},{"id":9,"district":"Cobb County","ses":1.61,"tenYrGapChg":0.34,"percentGapChg":13.9,"yrGapClose":"","yrGapDbl":2081},{"id":10,"district":"Fairfax County","ses":1.63,"tenYrGapChg":0.31,"percentGapChg":14.5,"yrGapClose":"","yrGapDbl":2078},{"id":11,"district":"Albuquerque","ses":1.75,"tenYrGapChg":0.36,"percentGapChg":16.2,"yrGapClose":"","yrGapDbl":2071},{"id":12,"district":"Montgomery County","ses":1.9,"tenYrGapChg":-0.29,"percentGapChg":-9,"yrGapClose":2120,"yrGapDbl":""},{"id":13,"district":"Broward County","ses":1.95,"tenYrGapChg":-0.05,"percentGapChg":-1.9,"yrGapClose":2542,"yrGapDbl":""},{"id":14,"district":"Jefferson County, CO","ses":1.96,"tenYrGapChg":-0.36,"percentGapChg":-13.5,"yrGapClose":2083,"yrGapDbl":""},{"id":15,"district":"Clark County","ses":2.03,"tenYrGapChg":0.96,"percentGapChg":41.2,"yrGapClose":"","yrGapDbl":2033},{"id":16,"district":"Polk","ses":2.14,"tenYrGapChg":0.15,"percentGapChg":8.7,"yrGapClose":"","yrGapDbl":2124},{"id":17,"district":"Orange County","ses":2.21,"tenYrGapChg":-0.14,"percentGapChg":-5.2,"yrGapClose":2200,"yrGapDbl":""},{"id":18,"district":"Lee","ses":2.31,"tenYrGapChg":-0.03,"percentGapChg":-1.2,"yrGapClose":2835,"yrGapDbl":""},{"id":19,"district":"Duval County","ses":2.32,"tenYrGapChg":-0.08,"percentGapChg":-3.5,"yrGapClose":2292,"yrGapDbl":""},{"id":20,"district":"Wake County","ses":2.41,"tenYrGapChg":-0.17,"percentGapChg":-4.8,"yrGapClose":2216,"yrGapDbl":""},{"id":21,"district":"San Diego Unified","ses":2.44,"tenYrGapChg":1.13,"percentGapChg":42.9,"yrGapClose":"","yrGapDbl":2032},{"id":22,"district":"Pinellas","ses":2.45,"tenYrGapChg":-0.28,"percentGapChg":-9.4,"yrGapClose":2116,"yrGapDbl":""},{"id":23,"district":"Palm Beach","ses":2.45,"tenYrGapChg":-0.12,"percentGapChg":-4.2,"yrGapClose":2248,"yrGapDbl":""},{"id":24,"district":"Hillsborough","ses":2.46,"tenYrGapChg":-0.19,"percentGapChg":-7.2,"yrGapClose":2148,"yrGapDbl":""},{"id":25,"district":"Fulton County","ses":2.52,"tenYrGapChg":0.61,"percentGapChg":18.2,"yrGapClose":"","yrGapDbl":2064},{"id":26,"district":"Charlotte-Mecklenberg","ses":2.54,"tenYrGapChg":-0.04,"percentGapChg":-1.2,"yrGapClose":2819,"yrGapDbl":""},{"id":27,"district":"Long Beach Unified","ses":2.55,"tenYrGapChg":0.57,"percentGapChg":20.7,"yrGapClose":"","yrGapDbl":2057},{"id":28,"district":"Los Angeles Unified","ses":2.55,"tenYrGapChg":0.19,"percentGapChg":6,"yrGapClose":"","yrGapDbl":2176},{"id":29,"district":"Davidson County","ses":2.57,"tenYrGapChg":0.41,"percentGapChg":20.3,"yrGapClose":"","yrGapDbl":2058},{"id":30,"district":"New York City","ses":2.69,"tenYrGapChg":0.52,"percentGapChg":22.5,"yrGapClose":"","yrGapDbl":2053},{"id":31,"district":"Dekalb County","ses":2.7,"tenYrGapChg":0.43,"percentGapChg":10.9,"yrGapClose":"","yrGapDbl":2100},{"id":32,"district":"Denver","ses":2.8,"tenYrGapChg":0.16,"percentGapChg":4,"yrGapClose":"","yrGapDbl":2260},{"id":33,"district":"Jefferson County, KY","ses":2.93,"tenYrGapChg":0.91,"percentGapChg":46.5,"yrGapClose":"","yrGapDbl":2031},{"id":34,"district":"Fort Worth","ses":2.98,"tenYrGapChg":0.57,"percentGapChg":21.1,"yrGapClose":"","yrGapDbl":2056},{"id":35,"district":"Philadelphia","ses":3,"tenYrGapChg":0.86,"percentGapChg":46.8,"yrGapClose":"","yrGapDbl":2030},{"id":36,"district":"Austin ISD","ses":3.08,"tenYrGapChg":0.68,"percentGapChg":20.5,"yrGapClose":"","yrGapDbl":2058},{"id":37,"district":"Baltimore City","ses":3.11,"tenYrGapChg":1.22,"percentGapChg":70.4,"yrGapClose":"","yrGapDbl":2023},{"id":38,"district":"Dade County","ses":3.12,"tenYrGapChg":0.07,"percentGapChg":2.5,"yrGapClose":"","yrGapDbl":2410},{"id":39,"district":"Houston ISD","ses":3.49,"tenYrGapChg":1.09,"percentGapChg":36.8,"yrGapClose":"","yrGapDbl":2036},{"id":40,"district":"City of Chicago","ses":4.12,"tenYrGapChg":0.59,"percentGapChg":19.3,"yrGapClose":"","yrGapDbl":2061}]

const districts = mockData.map(x => x.district);
const ses = mockData.map(x => x.ses);
const tenYrGap = mockData.map(x => x.tenYrGapChg);
const tenYrGapNeg = mockData.map(x => x.tenYrGapChg < 0 ? x.tenYrGapChg : 0);
const tenYrGapPos = mockData.map(x => x.tenYrGapChg >= 0 ? x.tenYrGapChg : 0);

var baseOption = {
    title: {
        textStyle: {
          fontWeight: 'normal',
          color: '#fff',
          fontFamily: 'SharpGrotesk-Medium20',
          textAlign: 'center'
        },
        subtextStyle: {
          fontWeight: 'normal',
          color: '#fff',
          fontFamily: 'MaisonNeue-Medium',
          textAlign: 'center'
        },
        textAlign: 'center'
    },
    aria: {
        show: true,
        description: 'Scatterplot of student test scores'
    },
    tooltip: {
        formatter: (params) => 
        `${mockData[params[0].dataIndex].district}<br />
        SES Inequality: ${mockData[params[0].dataIndex].ses}<br />
        Change in Gap (2009-2019): ${mockData[params[0].dataIndex].tenYrGapChg}<br />
        ${mockData[params[0].dataIndex].yrGapClose ? `Year 2009 Gap Will Close, at Current Trend: ${mockData[params[0].dataIndex].yrGapClose}` : `Year 2009 Gap Will Double, at Current Trend: ${mockData[params[0].dataIndex].yrGapDbl}`}`,
        backgroundColor: '#031232', // 'rgba(3, 18, 50, 80%)',
        confine: true,
        extraCssText: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5)',
        padding: [6, 10],
        textStyle: {
            color: '#fff', // '#dc69aa',
            fontWeight: '500',
            fontFamily: 'SharpGrotesk-Medium20',
            rich: {
                span: {
                    fontFamily: 'SharpGrotesk-Medium20',
                },
                small: {
                    fontFamily: 'MaisonNeue-Medium',
                    fontSize: 6
                },
            }
        },
        trigger: 'axis',
        axisPointer: {
            type: 'shadow',
            lineStyle: {
                color: '#008acd'
            },
            crossStyle: {
                color: '#008acd'
            },
            shadowStyle: {
                color: 'rgba(200,200,200,0.2)'
            }
        }
    },
    grid: {
        top: 10,
        bottom: 32,
        left: 35,
        right: 32,
        containLabel: true
    },
    xAxis: {
        axisLine: {show: false},
        splitLine: {show: false},
        axisTick: {show: false, alignWithLabel: true},
        type: 'value',
        position: 'bottom',
        name: '10-Year Change in White-Black Achievement Gap\nin Grade-Level Units (2009-2018)',
        nameTextStyle: {
            fontFamily: 'MaisonNeue-Medium',
            fontSize: 12,
        },
        nameLocation: 'middle',
        nameGap: 30,
        axisLabel: {
            inside: false,
            textVerticalAlign: 'middle',
            fontFamily: 'MaisonNeue-Medium',
            fontSize: 12,
        },
        // rich: {
        //     a: {
        //         fontFamily: 'MaisonNeue-Medium',
        //         fontSize: 10,
        //         width: '60%'
        //     },
        // }
    },
    yAxis: {
        type: 'category',
        axisLine: {show: false, onZero: false},
        axisTick: {show: false, alignWithLabel: true},
        splitLine: {show: false},
        splitNumber: 40,
        inverse: true,
        offset: 35,
        name: '◀ HIGHER               Socioeconomic Inequality               LOWER ▶',
        nameLocation: 'middle',
        nameRotate: 90,
        nameGap: -10,
        nameTextStyle: {
            fontFamily: 'MaisonNeue-Medium',
        },
        axisLabel: {
            show: true,
            interval: 0, 
            fontSize: 9,
            inside: false,
            textVerticalAlign: 'middle',
            fontFamily: 'MaisonNeue-Medium',
        },
        zlevel: 101,
        data: districts
    },
    series: [
        {
            name: 'Test1',
            type: 'bar',
            stack: 'Test2',
            barWidth: 1,
            color: 'blue',
            data: tenYrGapNeg,
            cursor: 'default'
        },
        {
            name: 'Test1',
            type: 'bar',
            stack: 'Test2',
            barWidth: 1,
            data: tenYrGapPos,
            cursor: 'default'
        },
        {
            type: 'scatter',
            itemStyle:{
                opacity: 1,
                color: 'black'
            },
            data: tenYrGap,
            symbolSize: 6,
            zlevel: 102,
            silent: true
        },
        {
            type: 'scatter',
            itemStyle:{
                opacity: 1,
                color: 'gray'
            },
            symbolSize: 6,
            data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
            zlevel: 101,
            silent: true
        }
    ]
};

function modifyOption(option) {
    var newOption = deepmerge.all([ {}, option]);
    // remove plot labels if on mobile
    if ( window.innerWidth <= 768) {
        newOption.yAxis.axisLabel.show = false;
        newOption.yAxis.nameGap = -20
        newOption.tooltip.textStyle.fontSize = 10
    }
    return newOption
}

function modifyOptionAndRender (option) {
    var renderOption = modifyOption(baseOption)
    myChart.setOption(renderOption)
}

// use configuration item and data specified to show chart
modifyOptionAndRender(baseOption)

window.onresize = function() {
    var renderOption = modifyOption(baseOption)
    this.myChart.setOption(renderOption)
    this.myChart.resize()
}

// add search bar
// var rootEl = document.getElementById('searchComponent');
// const searchProps = { // Props passed in to init the search input(s)
//     algoliaId: 'QPJ12WSVR4',
//     algoliaKey: 'bae9e4604dbd263cc47c48bfb30dd5dc',
//     onSuggestionSelected: function(hit) {
//       // console.log('hit');
//       // console.log(hit);
//       if (_plot && _plot.searchItemIDs) {
//         _plot.searchItemIDs[0] = hit;
//       }
//       // console.log(_plot.searchItemIDs);
//       scatterplot.loadState(plot.activeState);
//       // GA Event submission
//       const $highlightedDistrict = '';
//       if (!!dataLayer && (dataLayer.length >= 3)) {
//         dataLayer.push({
//           'event': 'districtHighlighted',
//           'highlightedDistrict': hit['name']
//         });
//       } else {
//         console.log('dataLayer not available. Skipping analytics reporting for highlighted item select.');
//       }
//     },
//     onSelectedClear: function(e) {
//       // console.log(e);
//       // Clear search item array
//       searchItemIDs = [];
//       // Reload state
//       scatterplot.loadState(plot.activeState);
//     },
//     indices: ['districts'],
//     inputProps: {
//       placeholder: 'Highlight a district...',
//       'aria-label': 'Enter a district name to search'
//     }
//   }

// var searchInit = function(props, container) {
//     var _self = this;

//     // add reference to the component to props
//     var refProps = Object.assign(props, {
//         ref: function(ref) { _self.component = ref; }
//     });

//     var render = function(props) {
//         ReactDOM.render(
//         React.createElement(SedaSearch, props, null),
//         container
//         );
//     }
//     render(refProps);
// }
// var searchBar = searchInit(searchProps, rootEl);