/**
 * scatterplot states for article one
 * - article storyboard: https://docs.google.com/document/d/1adz0CwXI8WKok8ePVQEcSmlRQwRIjKaKvd8Am6OFfhY/edit
 */

// Placeholders for segregation series operations
const segHighlightSize = 30;
let baseData = [];
let highlightLeast = {};
let highlightMost = {};
let highlightMostArr = [];
let bwLeastSeg = [];
let bwMostSeg = [];

/**
 * Build object to pass into plots highlighting least segregated.
 */
function buildLeastSeg() {
  console.log('buildLeastSeg()');
  var i = 0;
  while (Object.keys(highlightLeast).length < segHighlightSize) {
    $el = bwLeastSeg[i];
    var index = baseData.findIndex(row => row[0] === $el[0]);
    var row = baseData[index];
    if (index >= 0) {
      highlightLeast[$el[0]] = row[1];
    } else {
      console.log('Entry not found.');
    }
    i++;
  }
  console.log('Logging highlightLeast.');
  console.log(highlightLeast);
}

/**
 * Build object to pass into plots highlighting most segregated.
 */
function buildMostSeg(stateSeries) {
  console.log('buildMostSeg()');
  // console.log(stateSeries);
  var i = 0;
  // while (Object.keys(highlightMost).length < segHighlightSize) {
  while (highlightMostArr.length < segHighlightSize) {
    $el = bwMostSeg[i];
    // console.log($el);
    var index = stateSeries.findIndex(row => row[3] === $el[0]);
    var row = stateSeries[index];
    if (index >= 0) {
      // highlightMost[$el[0]] = row[1];
      highlightMostArr.push(row);
    } else {
      console.log('Entry not found.');
    }
    i++;
  }
  console.log('Logging highlightMost.');
  console.log(highlightMostArr);
  return highlightMostArr;
}

//
// Fetch base data to fetch district names and assemble highlight objects
const baseCSV = "https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/districts-base.csv";
var baseReq = new XMLHttpRequest();
baseReq.open("GET", baseCSV, true);
baseReq.onload = function (e) {
  if (baseReq.readyState === 4) {
    if (baseReq.status === 200) {
      console.log('Base data request successful.');
      var csvResponse = this.responseText;
      var json = Papa.parse(csvResponse);
      baseData = json.data;
      // console.log('Logging baseData.');
      // console.log(baseData);
    } else {
      console.error(baseReq.statusText);
    }
  }
};
baseReq.onerror = function (e) {
  console.error('Failed to fetch segregation data.\n' + xhr.statusText);
};
baseReq.send(null);

//
// Fetch the additional segregation data for state 9.
//
const segCSV = 'https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/districts-wb_seg.csv';
var xhr = new XMLHttpRequest();
xhr.open("GET", segCSV, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // console.log(xhr.responseText);
      console.log('Seg data request finished.');
      // console.log(this.responseText);
      var csvResponse = this.responseText;
      var json = Papa.parse(csvResponse);
      var data = json.data;
      // console.log(data);
      // Trim off column headings and any blank rows
      data = data.filter(function(e) { return e[0] !== 'id' });
      data = data.filter(function(e) { return e[0] !== '' });
      // console.log(data);
      var sortAsc = data.sort(function(a, b) {
        if ( a[1] < b[1] )
            return -1;
        if ( a[1] > b[1] )
            return 1;
        return 0;
      });;
      // Size of the completed most and least.
      var size = 50;
      bwLeastSeg = sortAsc.slice(0, size);
      // console.log(bwLeastSeg);
      bwMostSeg = sortAsc.slice((sortAsc.length - 1) - size, sortAsc.length - 1);
      // console.log(bw_most_seg);
      // If the base data has loaded, build the series.
      function checkBaseDataLoad() {
        if (baseData.length >= 1) {
          buildLeastSeg();
          // buildMostSeg();
          clearInterval(checkBaseInt);
        } else {
          console.log('Nothing in baseData');
        }
      }
      var checkBaseInt = setInterval(checkBaseDataLoad, 1000);
    } else {
      console.error(xhr.statusText);
    }
  }
};
xhr.onerror = function (e) {
  console.error(xhr.statusText);
};
xhr.send(null);

/** State 1: Show white scores on x axis and black scores on y axis */
var state1 = function(scatterplot) {
  // this state is created from the base
  const base = scatterplot.getState('base');
  const baseOverrides = {
    title: {
      text: 'White and Black Students\' Average Performance',
      subtext: 'U.S. School Districts 2009-2016'
    },
    yAxis: {
      min:-4,
      max:3,
      name: 'Black Average Performance',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Average Performance',
    },
    series: [{
      type:'scatter',
      markLine: {
        animation: false,
        silent: true,
        label: {
          position: 'middle',
          fontFamily: 'MaisonNeue-Medium',
          fontWeight: '600',
          formatter: function(value) {
            return value.name
          }
        },
        data: [
          [
            {
              name: 'white student scores = black student scores',
              coord: [-3, -3],
              symbol: 'none',
              lineStyle: {
                color: '#dc69aa', // '#95706d'// '#8d98b3' // '#999'
                type: 'solid',
                width: 2
              }
            },
            { coord: [ 3,  3], symbol: 'none' },
          ],
          [
            {
              name: '', // Y axis
              coord: [0, -4],
              symbol: 'none',
              lineStyle: {
                color: '#adadad' // 'rgba(0,0,0,0.6)'
              }
            },
            {
              coord: [ 0,  3],
              symbol: 'none'
            },
          ],
          [
            {
              name: '', // x axis
              coord: [-3, 0],
              symbol: 'none',
              lineStyle: {
                color: '#adadad' // 'rgba(0,0,0,0.2)'
              }
            },
            {
              coord: [4, 0],
              symbol: 'none'
            },
          ]
        ]
      }
    }]
  }
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'sz',
    highlighted: [],
    options: deepmerge.all([base.options, baseOverrides ])
  }
}

/** State 2: Highlight largest 25 districts  */
var state2 = function(scatterplot) {
  // state 2 is based on state 1
  var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.2 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  // console.log(top100);
  return {
    highlighted: [],
    options: deepmerge(base.options, {
      title: {
        subtext: '100 Largest U.S. School Districts 2009-2016'
      },
      yAxis: {
        min:-4,
        max:3,
        name: 'Black Average Performance',
        textStyle: {
          fontFamily: 'SharpGrotesk-Medium20',
          color: '#FF003E',
        }
      },
      xAxis: {
        min: -3,
        max: 4,
        name: 'White Average Performance',
      },
      series: [
        dataSeries,
        {
          type: 'scatter',
          data: top100,
          symbolSize: dataSeries.symbolSize,
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,1)',
            color: '#b6a2de' // 'rgba(255,0,0,0.25)'
          }
        }
      ]
    })
  }
};

/** State 3: Highlight locations (Detroit, Gwinet, Washington) */
var state3 = function(scatterplot) {
  var highlight = {
    '0641580': 'Washington, D.C.',
    '2612000': 'Detroit, MI',
    '1302550': 'Gwinnet County, GA'
  }
  var base = scatterplot.getState('state2');
  var dataSeries = scatterplot.getDataSeries();
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'sz',
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      yAxis: {
        min:-4,
        max:3,
        name: 'Black Average Performance',
        textStyle: {
          fontFamily: 'SharpGrotesk-Medium20',
          color: '#FF003E',
        }
      },
      xAxis: {
        min: -3,
        max: 4,
        name: 'White Average Performance',
      },
      series: [
        // base.series[0],
        // base.series[1],
        dataSeries,
        {
          id: 'highlighted',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#042965', // 'rgba(0,0,0,1)',
            color: 'rgba(255,255,0,0.5)'
          },
          label: {
            show: true,
            position: 'right',
            backgroundColor: 'rgba(255,255,0,0.97)',
            borderColor: '#042965',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'MaisonNeue-Medium',
            lineHeight: 28,
            padding: [6, 8],
            borderRadius: 3,
            color: '#042965',
            formatter: function(item) {
              return highlight[item.value[3]]
            }
          }
        }
      ]
    })
  }
};

/** State 4: Load new variables to show White/Black SES Gap and Achievement Gap */
var state4 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  const baseOverrides = {
    title: {
      text: 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: 'US School Districts 2009-2016',
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      }
    },
    grid: {
      right: 42,
    },
    yAxis: {
      min: -5,
      max: 0,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -1,
      max: 6,
      name: 'White-Black Socioeconomic Disparity',
    },
    series: [{
      type:'scatter',
      markLine: {
        animation: false,
        silent: true,
        label: {
          position: 'middle',
          fontFamily: 'MaisonNeue-Medium',
          fontWeight: '600',
          fontSize: 12,
          textBorderColor: '#042965',
          textBorderWidth: 1,
          textShadowColor: '#042965',
          formatter: function(value) {
            return value.name
          }
        },
        data: [
          [
            {
              name: 'no racial disparity',
              coord: [0, -5],
              symbol: 'none',
              lineStyle: {
                color:  '#dc69aa',
                type: 'solid',
                width: 2
              },
              label: {
                // verticalAlign: 'bottom'
                // position: 'left',
                // rotate: -90
              }
            },
            {
              coord: [ 0, 0],
              symbol: 'none'
            },
          ]
        ]
      }
    }]
  }
  return {
    highlighted: [],
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 5: Highlight largest districts */
var state5 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var dataSeries = scatterplot.getDataSeries();
  var base = scatterplot.getState('state4');
  var highlight = {
    '0641580': 'Washington, D.C.',
    '2612000': 'Detroit, MI',
    '1300120': 'Atlanta, GA'
  }
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, {
      series: [
        dataSeries,
        {
          id: 'highlighted',
          itemStyle: {
            borderColor: '#042965', // 'rgba(0,0,0,1)',
            color: 'rgba(255,255,0,0.97)', // 'rgba(255,255,0,0.5)',
            borderWidth: 2,
            // borderColor: '#042965',
            // color: 'rgba(255,255,0,0.5)'
          },
          label: {
            show: true,
            position: 'right',
            backgroundColor: 'rgba(255,255,0,0.97)',
            borderColor: '#042965',
            fontSize: 12,
            fontWeight: 600,
            fontFamily: 'MaisonNeue-Medium',
            padding: [6, 8],
            borderRadius: 3,
            color: '#042965',
            formatter: function(item) {
              return highlight[item.value[3]]
            }
          }
        }
      ]}
    ])
  }
}

/** State 6: Gwinnett, DC, and Detroit school districts */
var state6 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state5');
  // return options;
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.2 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  return {
    highlighted: state5.highlighted,
    options: deepmerge(base.options, {
      title: {
        subtext: '100 Largest U.S. School Districts 2009-2016'
      },
      series: [
        dataSeries,
        {
          type: 'scatter',
          data: top100,
          symbolSize: dataSeries.symbolSize,
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,1)',
            color: '#b6a2de' // 'rgba(255,0,0,0.25)'
          }
        }
      ]
    })
  }
}

/** State 7: Highlight districts around x=0 */
var state7 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state4');
  // return options;
  var dataSeries = scatterplot.getDataSeries();
  // dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.2 })
  // var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var range = {
    min: -.15,
    max: .15
  };
  var nearZero = scatterplot.getSeriesDataInRange(dataSeries.data, 'x', range);
  return {
    highlighted: [],
    options: deepmerge(base.options, {
      title: {
        subtext: 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016'
      },
      series: [
        dataSeries,
        {
          type: 'scatter',
          data: nearZero,
          symbolSize: dataSeries.symbolSize,
          itemStyle: {
            borderWidth: 1,
            borderColor: 'rgba(0,0,0,1)',
            color: '#ffb87f' // '#b6a2de' // 'rgba(255,0,0,0.25)'
          }
        }
      ]
    })
  }
}

var state8 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {
    '0803360': 'Denver, CO',
    '0634170': 'San Bernardino, CA'
  }
  const baseOverrides = {
    title: {
      text: 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: 'US School Districts 2009-2016',
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      }
    },
    grid: {
      right: 42,
    },
    yAxis: {
      min:-5,
      max:0,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -1,
      max: 6,
      name: 'White-Black Socioeconomic Disparity',
    },
    series: [{
      type:'scatter',
      markLine: {
        animation: false,
        silent: true,
        label: {
          position: 'middle',
          fontFamily: 'MaisonNeue-Medium',
          fontWeight: '600',
          fontSize: 12,
          textBorderColor: '#042965',
          textBorderWidth: 1,
          textShadowColor: '#042965',
          formatter: function(value) {
            return value.name
          }
        },
        data: [
          [
            {
              name: 'no racial disparity',
              coord: [0, -5],
              symbol: 'none',
              lineStyle: {
                color:  '#dc69aa',
                type: 'solid',
                width: 2
              },
              label: {
                // verticalAlign: 'bottom'
                // position: 'left',
                // rotate: -90
              }
            },
            {
              coord: [ 0, 0],
              symbol: 'none'
            },
          ]
        ]
      }
    },
    {
      id: 'highlighted',
      itemStyle: {
        borderColor: '#042965', // 'rgba(0,0,0,1)',
        color: 'rgba(255,255,0,0.97)', // 'rgba(255,255,0,0.5)',
        borderWidth: 2,
        // borderColor: '#042965',
        // color: 'rgba(255,255,0,0.5)'
      },
      label: {
        show: true,
        position: 'right',
        backgroundColor: 'rgba(255,255,0,0.97)',
        borderColor: '#042965',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'MaisonNeue-Medium',
        padding: [6, 8],
        borderRadius: 3,
        color: '#042965',
        formatter: function(item) {
          return highlight[item.value[3]]
        }
      }
    }]
  }
  return {
    highlighted: Object.keys(highlight),
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/* Highlight least and most segregated */
var state9 = function(scatterplot) {
  console.log('loading state9');
  // get current echart options
  // const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  // Build series most seg to highlight
  var dataSeries = scatterplot.getDataSeries();
  var mostSegregatedSeries = buildMostSeg(dataSeries.data);
  // console.log(dataSeries.data);
  // dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.2 })
  // var top20 = scatterplot.getSeriesDataBySize(dataSeries.data, 20)
  // var highlight = {
  //   '0803360': 'Denver, CO',
  //   '0634170': 'San Bernardino, CA'
  // }
  // highlightLeast, highlightmost
  const baseOverrides = {
    title: {
      text: 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: 'US School Districts 2009-2016',
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      }
    },
    legend: {
      show: true,
      right: 20,
      bottom: 20,
      data: [
        {
          name: 'Least Segregated',
          // compulsorily set icon as a circle
          icon: 'circle',
          itemStyle: {
            borderColor: '#042965',
            color: 'rgba(255,255,0,0.97)',
            borderWidth: 2,
          },
          textStyle: {
              color: 'yellow'
          }
        },
        {
          name: 'Most Segregated',
          // compulsorily set icon as a circle
          icon: 'circle',
          // set up the text in red
          textStyle: {
              color: 'blue'
          }
        }
      ]
    },
    grid: {
      right: 42,
    },
    yAxis: {
      min:-5,
      max:0,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -1,
      max: 6,
      name: 'White-Black Socioeconomic Disparity',
    },
    series: [
      dataSeries,
      {
        type: 'scatter',
        data: mostSegregatedSeries,
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,1)',
          color: '#ffb87f' // '#b6a2de' // 'rgba(255,0,0,0.25)'
        }
      },
      {
      type:'scatter',
      markLine: {
        animation: false,
        silent: true,
        label: {
          position: 'middle',
          fontFamily: 'MaisonNeue-Medium',
          fontWeight: '600',
          fontSize: 12,
          textBorderColor: '#042965',
          textBorderWidth: 1,
          textShadowColor: '#042965',
          formatter: function(value) {
            return value.name
          }
        },
        data: [
          [
            {
              name: 'no racial disparity',
              coord: [0, -5],
              symbol: 'none',
              lineStyle: {
                color:  '#dc69aa',
                type: 'solid',
                width: 2
              },
              label: {}
            },
            {
              coord: [ 0, 0],
              symbol: 'none'
            },
          ]
        ]
      }
    },
    {
      id: 'highlighted',
      itemStyle: {
        borderColor: '#042965',
        color: 'rgba(255,255,0,0.97)',
        borderWidth: 2,
        // borderColor: '#042965',
        // color: 'rgba(255,255,0,0.5)'
      },
      label: {
        show: false,
        position: 'right',
        backgroundColor: 'rgba(255,255,0,0.97)',
        borderColor: '#042965',
        fontSize: 12,
        fontWeight: 600,
        fontFamily: 'MaisonNeue-Medium',
        padding: [6, 8],
        borderRadius: 3,
        color: '#042965',
        formatter: function(item) {
          return highlightLeast[item.value[3]]
        }
      }
    }]
  }
  return {
    highlighted: Object.keys(highlightLeast),
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 10: Achievement vs. Gap in Exposure to School Poverty */
var state10 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  return options;
}

/** State 11: Achievement vs. Gap in Exposure to School Poverty */
var state11 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  return options;
}

// create the component
var rootEl = document.getElementById('scatterplot');
var scatterplot = new Scatterplot(rootEl);

// set the states
scatterplot.addState('state1', state1);
scatterplot.addState('state2', state2);
scatterplot.addState('state3', state3);
scatterplot.addState('state4', state4);
scatterplot.addState('state5', state5);
scatterplot.addState('state6', state6);
scatterplot.addState('state7', state7);
scatterplot.addState('state8', state8);
scatterplot.addState('state9', state9);
scatterplot.addState('state10', state10);
scatterplot.addState('state11', state11);

// load the first state
scatterplot.loadState('state1');

// when the component is ready, trigger the state change as desired
// scatterplot.on('ready', function(scatterplot) {
  // setTimeout(() => {
  //   scatterplot.loadState('state2');
  // }, 4000)
  // setTimeout(() => {
  //   scatterplot.loadState('state1', { notMerge: true })
  // }, 6000)
  // setTimeout(() => {
  //   scatterplot.loadState('state2')
  // }, 8000)
  // setTimeout(() => {
  //   scatterplot.loadState('state3', { notMerge: true })
  // }, 10000)
  // setTimeout(() => {
  //   scatterplot.loadState('state1', { notMerge: true })
  // }, 12000)
// })
