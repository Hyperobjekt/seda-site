/**
 * scatterplot states for article one
 * - article storyboard: https://docs.google.com/document/d/1adz0CwXI8WKok8ePVQEcSmlRQwRIjKaKvd8Am6OFfhY/edit
 */

// Placeholders for segregation series operations
let segData = [];
let searchItemIDs = [];
let names = [];

/**
 * Slice array according from beginning according to provided size.
 * @param Array arr
 * @param Number size
 */
function sliceLeast(arr, size) {
  return arr.slice(0, size - 1)
}

/**
 * Slice array from end according to provided size.
 * @param Array arr
 * @param Number size
 */
function sliceMost(arr, size) {
  return arr.slice((arr.length - 1) - (size-1), (arr.length - 1))
}

/**
 * Sort provided array by segregation stats
 * @param Array data
 * @returns Array returnArr
 */
function sortDataBySeg(data) {
  // console.log('sortDataBySeg()');
  // console.log(data);
  // Loop through the data.
  // Locate row using ID.
  // Add seg stat to each row.
  data.forEach(function(el) {
    var index = segData.findIndex(row => row[0] === el[3]);
    // console.log('have an index, it is ' + index);
    el[4] = segData[index][1];
    // console.log(el)
  });
  // Sort by seg stat
  returnArr = data.sort(function(a, b) {
    if ( a[4] < b[4] )
        return -1;
    if ( a[4] > b[4] )
        return 1;
    return 0;
  });
  // console.log('Logging segSortedTop100.');
  // console.log(returnArr);
  return returnArr;
}

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
      segData = json.data;
      // console.log('logging segregation data');
      // console.log(segData);
      // Trim off column headings and any blank rows
      segData = segData.filter(function(e) { return e[0] !== 'id' });
      segData = segData.filter(function(e) { return e[0] !== '' });
      // console.log(data);
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
  // Set up array of district IDs and names for building search series.
  if (names.length <= 0 &&
    scatterplot && 
    scatterplot.data && 
    scatterplot.data.districts &&
    scatterplot.data.districts.name) {
    names = scatterplot.data.districts.name;
    // console.log(names);
  }
  var dataSeries = [];
  var searchSeries = [];
  if (scatterplot && scatterplot.data) {
    dataSeries = scatterplot.getDataSeries();
    searchSeries = scatterplot.getSeriesDataForIds(dataSeries.data, searchItemIDs);
  }
  const baseOverrides = {
    title: {
      text: 'White and Black Students\' Average Performance',
      subtext: 'U.S. School Districts 2009-2016'
    },
    legend: {
      show: true,
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
            textBorderWidth: 3,
            textBorderColor: '#042965',
            textShadowColor: '#042965',
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
                width: 2,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
                shadowBlur: 2,
                shadowColor: '#042965'
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
      },
      {
        type: 'scatter',
        data: searchSeries,
        symbolSize: 15, // dataSeries.symbolSize,
        zlevel: 1000,
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965',
          color: 'rgba(255,255,0,0.97)'
        },
        label: {
          show: true,
          position: 'right',
          width: "25%",
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
            return names[item.value[3]]
          }
        }
      }
    ]
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
  var searchSeries = [];
  if (scatterplot && scatterplot.data) {
    searchSeries = scatterplot.getSeriesDataForIds(dataSeries.data, searchItemIDs);
  }
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
        },
        {
          type: 'scatter',
          data: searchSeries,
          symbolSize: 15, // dataSeries.symbolSize,
          zlevel: 1000,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#042965',
            color: 'rgba(255,255,0,0.97)'
          },
          label: {
            show: true,
            position: 'right',
            width: "25%",
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
              return names[item.value[3]]
            }
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
  var searchSeries = [];
  if (scatterplot && scatterplot.data) {
    searchSeries = scatterplot.getSeriesDataForIds(dataSeries.data, searchItemIDs);
  }
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
        },
        {
          type: 'scatter',
          data: searchSeries,
          symbolSize: 15, // dataSeries.symbolSize,
          zlevel: 1000,
          itemStyle: {
            borderWidth: 2,
            borderColor: '#042965',
            color: 'rgba(255,255,0,0.97)'
          },
          label: {
            show: true,
            position: 'right',
            width: "25%",
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
              return names[item.value[3]]
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
  var dataSeries = scatterplot.getDataSeries();
  var searchSeries = [];
  if (scatterplot && scatterplot.data) {
    searchSeries = scatterplot.getSeriesDataForIds(dataSeries.data, searchItemIDs);
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
      min: -6,
      max: 0,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -3,
      max: 7,
      name: 'White-Black Socioeconomic Disparity',
    },
    series: [
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
          textBorderWidth: 3,
          textShadowColor: '#042965',
          formatter: function(value) {
            return value.name
          }
        },
        data: [
          [
            {
              name: 'no racial disparity',
              coord: [0, -6],
              symbol: 'none',
              lineStyle: {
                color:  '#dc69aa',
                type: 'solid',
                width: 2,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
                shadowBlur: 3,
                shadowColor: '#042965'
              },
              label: {
                // verticalAlign: 'bottom'
                // position: 'left',
                // rotate: -90
              }
            },
            {
              coord: [ 0, -1],
              symbol: 'none'
            },
          ]
        ]
      }
    },
    {
      type: 'scatter',
      data: searchSeries,
      symbolSize: 15, // dataSeries.symbolSize,
      zlevel: 1000,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#042965',
        color: 'rgba(255,255,0,0.97)'
      },
      label: {
        show: true,
        position: 'right',
        width: "25%",
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
          return names[item.value[3]]
        }
      }
    }
  ]
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
      min:-6,
      max:0,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -3,
      max: 7,
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
              coord: [0, -6],
              symbol: 'none',
              lineStyle: {
                color:  '#dc69aa',
                type: 'solid',
                width: 2,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
                shadowBlur: 3,
                shadowColor: '#042965'
              },
              label: {
                // verticalAlign: 'bottom'
                // position: 'left',
                // rotate: -90
              }
            },
            {
              coord: [ 0, -1],
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
  // this state is created from the base
  const base = scatterplot.getState('base');
  // Build series most seg to highlight
  var dataSeries = scatterplot.getDataSeries();
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  // console.log(top100);
  var segSortedTop100 = sortDataBySeg(top100);
  var leastSegregatedSeries = sliceLeast(segSortedTop100, 10);
  var mostSegregatedSeries = sliceMost(segSortedTop100, 10);
  const baseOverrides = {
    title: {
      text: 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: 'Most and Least Segregated Out of\n100 Largest US School Districts 2009-2016',
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      }
    },
    legend: {
      show: true,
      orient: 'vertical',
      textStyle: {
        color: '#fff',
        fontFamily: 'MaisonNeue-Medium',
        fontWeight: '600',
        fontSize: 12
      },
      backgroundColor: '#042965',
      borderColor: '#dc69aa',
      borderWidth: 2,
      borderRadius: 3,
      padding: 6,
      right: 55,
      bottom: 45,
      data: [
        {
          name: 'Least Segregated',
          icon: 'circle',
        },
        {
          name: 'Most Segregated',
          icon: 'circle',
        }
      ]
    },
    grid: {
      right: 42,
    },
    yAxis: {
      min:-6,
      max:0,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -3,
      max: 7,
      name: 'White-Black Socioeconomic Disparity',
    },
    series: [
      dataSeries,
      {
        type: 'scatter',
        data: leastSegregatedSeries,
        name: "Least Segregated",
        symbolSize: 12, // dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.97)'
        }
      },
      {
        type: 'scatter',
        data: mostSegregatedSeries,
        name: "Most Segregated",
        symbolSize: 12, // dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 2,
          borderColor: 'rgba(0,0,0,1)',
          color: '#ef7715'
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
              name: '',
              coord: [6, -2.95],
              symbol: 'none',
              lineStyle: {
                color:  '#dc69aa',
                type: 'solid',
                width: 2,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
                shadowBlur: 3,
                shadowColor: '#042965'
              },
              label: {}
            },
            {
              coord: [ -2, -3.5],
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

/** State 10: Achievement vs. Gap in Exposure to School Poverty */
var state10 = function(scatterplot) {
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  var options = scatterplot.component.getOption();
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var highlight = {
    '1100030': 'District of Columbia',
    '2612000': 'Detroit, MI'
  }
  // return options;
  const baseOverrides = {
    title: {
      text: 'White-Black Achievement Gaps by\nDifferences in White-Black Exposure to Poverty',
      subtext: '100 Largest US School Districts 2009-2016',
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      }
    },
    grid: {
      right: 42,
    },
    yAxis: {
      min:-6,
      max:1,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -3,
      max: 8,
      name: 'Black-White Difference in Average School Poverty Rates',
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
                name: 'equal exposure to poverty',
                coord: [0, -6],
                symbol: 'none',
                lineStyle: {
                  color:  '#dc69aa',
                  type: 'solid',
                  width: 2,
                  shadowOffsetY: 0,
                  shadowOffsetX: 0,
                  shadowBlur: 3,
                  shadowColor: '#042965'
                },
                label: {}
              },
              {
                coord: [ 0, -0.5],
                symbol: 'none'
              },
            ]
          ]
        }
      },
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
  }
  return {
    highlighted: Object.keys(highlight),
    xVar: 'wb_pov',
    yVar: 'wb_avg',
    zVar: 'sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
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
// scatterplot.loadState('state1');

