const jQ = jQuery;

// re-style elements specific to this article

//document.getElementById('lollipop').style="height: 100%"
// document.getElementById('rectangle').style="height: 100%"
// document.getElementById('plot-parent').style="min-height: 440px; height: 100%; max-height: calc(100vh - 150px); margin-bottom: 0px"

jQ('.column-plot .title').html('Places with Higher White-Black Socioeconomic Inequality Also Had Faster-Growing Academic Gaps (2009-2018, 40 Largest U.S. Districts)');
jQ('.column-plot .directions').html('</br>Tap in the chart below to see district names and more data.')
// jQ('.column-lollipop').removeClass('d-sm-none');
// jQ('.column-lollipop').addClass('offset-sm-0');
// jQ('.column-lollipop').removeClass('col-10');
// jQ('.column-lollipop').addClass('col-12');
// jQ('.column-lollipop').removeClass('col-xl-6');
// jQ('.column-lollipop').addClass('col-xl-7');

//init chart

var colorPalette = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
];

function modifyOption(option) {
    var newOption = deepmerge.all([ {}, option]);
    // remove plot labels if on mobile
    if ( window.innerWidth <= 768) {
        newOption.yAxis.axisLabel.show = false;
        newOption.yAxis.nameGap = -20
        newOption.tooltip.textStyle.fontSize = 10
    }
    // reformat xaxis label for different sizes
    if ( document.getElementById('lollipop').clientWidth < 604 ) {
        newOption.xAxis.name = '◀ SHRINKING                 Gaps                 WIDENING ▶\n10-Year Change in White-Black Achievement Gap\nin Grade-Level Units (2009-2018)'
        newOption.xAxis.nameGap = 23;
        newOption.grid.bottom = 43;
    }
    return newOption
}

function modifyOptionAndRender (chart, option) {
    var renderOption = modifyOption(option)
    chart.setOption(renderOption)
}

const getDataAndRender = async () => {
    d3.csv("/data/mockData.csv").then(function(data) {
        const mockData = data.map(el => {
            return {id: el['Id'], district: el['District'], ses:el['SES Inequality (SD Units)'], tenYrGapChg: el['10-year Change in Gap'], percentGapChg: el['Percentage Change in Gap (2009-2018)'], yrGapClose: el['Year Gap Will Close Given Current Trend'], yrGapDbl: el['Year Gap Will Double Given Current Trend'], state: el['State']};
        })
        const districts = mockData.map(x => x.district);
        const tenYrGap = mockData.map(x => x.tenYrGapChg);
        const tenYrGapNeg = mockData.map(x => x.tenYrGapChg < 0 ? x.tenYrGapChg : 0);
        const tenYrGapPos = mockData.map(x => x.tenYrGapChg >= 0 ? x.tenYrGapChg : 0);
        var baseOption = {
            aria: {
                show: true,
                description: 'Lollipop chart of the white-black achievement gap vs socieconomic inequality in the 40 largest school districts'
            },
            tooltip: {
                formatter: (params) => 
                `${mockData[params[0].dataIndex].district}, ${mockData[params[0].dataIndex].state}<br />
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
                interval: .25,
                min: -0.5,
                max: 1.5,
                axisLine: {show: false},
                splitLine: {show: false},
                axisTick: {show: false, alignWithLabel: true},
                type: 'value',
                position: 'bottom',
                name: '◀ GAPS SHRINKING                            GAPS WIDENING ▶\n10-Year Change in White-Black Achievement Gap in Grade-Level Units (2009-2018)',
                nameTextStyle: {
                    fontFamily: 'MaisonNeue-Medium',
                    fontSize: 13,
                },
                nameLocation: 'middle',
                nameGap: 25,
                axisLabel: {
                    inside: false,
                    textVerticalAlign: 'middle',
                    fontFamily: 'MaisonNeue-Medium',
                    fontSize: 12,
                },
            },
            yAxis: {
                type: 'category',
                axisLine: {show: false, onZero: false},
                axisTick: {show: false, alignWithLabel: true},
                splitLine: {show: false},
                splitNumber: 40,
                inverse: true,
                offset: 35,
                name: '◀ HIGHER             Socioeconomic Inequality             LOWER ▶',
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

        var myChart = echarts.init(document.getElementById('lollipop'));

        modifyOptionAndRender(myChart, baseOption)

        window.onresize = function() {
            var renderOption = modifyOption(baseOption)
            myChart.setOption(renderOption)
            myChart.resize()
        }
    })
}

// use configuration item and data specified to show chart
getDataAndRender()

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