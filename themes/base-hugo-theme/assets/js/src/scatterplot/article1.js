/**
 * scatterplot states for article one,
 * Patterns of Racial/Ethnic Opportunity Gaps
 * - article storyboard: https://docs.google.com/document/d/1adz0CwXI8WKok8ePVQEcSmlRQwRIjKaKvd8Am6OFfhY/edit
 */

const jQ = jQuery;

// Placeholders for segregation series operations
let segData = [];
let Title = {};
Title['text'] = '';
Title['subtext'] = '';
Title['setTitle'] = function() {
  // Set title and subtitle
  jQ('.column-plot .title').html(Title.text);
  jQ('.column-plot .subtitle').html(Title.subtext);
}

const axisBlue = '#547892';
let activeHighlight = {};
const highlightedLabel = (highlight) => {
  // console.log('highlightedLabel');
  activeHighlight = highlight;
  return {
    show: true,
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // '#FFFCCF',
    borderColor: '#7D38BB',
    borderWidth: 0,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'SharpGrotesk-Medium20', // 'MaisonNeue-Medium',
    lineHeight: 12,
    padding: [5, 5],
    borderRadius: 3,
    opacity: 1,
    color: 'rgba(25, 25, 25, 0.91)', // '#052965',
    formatter: function(item) {
      // console.log(item);
      // console.log(activeHighlight);
      return activeHighlight[item.value[3]]
    },
  };
}
// Orange bubbles
const highlightedItemStyle =  {
  borderWidth: 0.4,
  borderColor: '#BABABA', // '#FFC02D',
  color: 'rgba(255, 178, 0, 0.77)', // '#FFFCDD',
  opacity: 1,
  shadowBlur: 2,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffsetX: 0,
  shadowOffsetY: 1
};
// Blue bubbles
const selectedItemStyle = {
  borderWidth: 0.4,
  borderColor: 'rgba(89, 151, 203, 0.8)', // '#7D38BB',
  color: '#48CB95', // '#BC72FF',
  color: 'rgba(177, 222, 238, 0.8)',
  opacity: 1,
};
const initialMarkline = {
  type:'scatter',
  markLine: {
    animation: false,
    silent: true,
    label: {
      show: true,
      position: 'middle',
      fontFamily: 'SharpGrotesk-Medium20',
      fontWeight: '500',
      fontSize: 11.52,
      padding: 4,
      color: 'rgba(5, 41, 101, 100%)',
      formatter: function(value) {
        return value.name
      }
    },
    data: [
      [
        {
          name: '', // Y axis
          coord: [0, -3],
          symbol: 'none',
          lineStyle: {
            color: '#547892',
            type: 'solid',
            width: 0.5,
          }
        },
        {
          coord: [ 0,  3],
          symbol: 'none',
        },
      ],
      [
        {
          name: '', // x axis
          coord: [-3, 0],
          symbol: 'none',
          lineStyle: {
            color: '#547892',
            type: 'solid',
            width: 0.5,
          }
        },
        {
          coord: [3, 0],
          symbol: 'none'
        },
      ],
    [
      {
        name: 'white scores = black scores',
        coord: [-2.5, -2.5],
        symbol: 'none',
        lineStyle: {
          color: 'rgba(5, 41, 101, 100%)',
          type: 'solid',
          width: 1,
        }
      },
      { coord: [ 3,  3], symbol: 'none' },
    ],
  ]
  }
};
const baseGrid = {
  top: 10,
  bottom: 26,
  left: 10,
  right: 26,
  zlevel: 100,
  height: 'auto',// 280,
  width: 'auto', // 'auto',
  containLabel: true
};
const baseYAxis = {
  position: 'right',
  splitLine: {
    show: false,
  },
  nameGap: 26,
  nameTextStyle: {
    fontFamily: 'SharpGrotesk-Medium20',
    color: axisBlue,
    fontWeight: 'normal',
    fontSize: 11
  },
  zlevel: 101,
};
const baseXAxis = {
  nameGap: 26,
  nameTextStyle: {
    fontFamily: 'SharpGrotesk-Medium20',
    color: axisBlue,
    fontSize: 11,
    fontWeight: 'normal',
    verticalAlign: 'bottom'
  },
  zlevel: 102,
};
const noRacialDisparityMarkline = {
  animation: false,
  silent: true,
  label: {
    show: true,
    position: 'middle',
    fontFamily: 'SharpGrotesk-Medium20',
    fontWeight: '500',
    fontSize: 11.52,
    padding: 4,
    formatter: function(value) {
      return value.name
    }
  },
  data: [
    [
      {
        name: 'no racial inequality',
        coord:  [0, -1], // [0, -6],
        symbol: 'none',
        lineStyle: {
          color: '#052965',
          type: 'solid',
          width: 1,
        },
        label: {
          padding: 4,
          position: 'middle',
          color: '#052965',
        }
      },
      {
        coord:  [0, 6], // [ 0, 0],
        symbol: 'none'
      },
    ]
  ]
};
const noGapMarkline = {
  animation: false,
  silent: true,
  label: {
    show: true,
    position: 'middle',
    fontFamily: 'SharpGrotesk-Medium20',
    fontWeight: '500',
    fontSize: 11.52,
    padding: 2,
    formatter: function(value) {
      return value.name
    }
  },
  data: [
    [
      {
        name: 'no achievement gap',
        coord:  [-1, 0],
        symbol: 'none',
        lineStyle: {
          color: '#052965',
          type: 'solid',
          width: 1,
        },
        label: {
          padding: [0, 0, 2, 300],
          position: 'middle',
          color: '#052965',
        }
      },
      {
        coord:  [6, 0], // [ 0, 0],
        symbol: 'none'
      },
    ]
  ]
};
const segNoGapMarkline = {
  animation: false,
  silent: true,
  label: {
    show: true,
    position: 'middle',
    fontFamily: 'SharpGrotesk-Medium20',
    fontWeight: '500',
    fontSize: 11.52,
    padding: 2,
    formatter: function(value) {
      return value.name
    }
  },
  data: [
    [
      {
        name: 'no achievement gap',
        coord:  [-0.3, 0],
        symbol: 'none',
        lineStyle: {
          color: '#052965',
          type: 'solid',
          width: 1,
        },
        label: {
          padding: [0, 0, 2, 300],
          position: 'middle',
          color: '#052965',
        }
      },
      {
        coord:  [0.7, 0], // [ 0, 0],
        symbol: 'none'
      },
    ]
  ]
};
const zeroSegGapMarkline = {
  type:'scatter',
  markLine: {
    animation: false,
    silent: true,
    data: [
      [
        {
          name: 'no segregation',
          coord: [0, -1],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 1,
          },
          label: {
            padding: [0, 0, 2, 80],
            fontFamily: 'SharpGrotesk-Medium20',
            fontWeight: '500',
            position: 'middle',
            color: '#052965',
          }
        },
        {
          coord: [0, 6],
          symbol: 'none'
        },
      ]
    ]
  }
};

const segMarkline = {
  type:'scatter',
  markLine: {
    animation: false,
    silent: true,
    data: [
      [
        {
          name: '',
          coord: [6, 2.5],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 1,
          },
        },
        {
          coord: [-1, 2.25],
          symbol: 'none'
        },
      ]
    ]
  }
};

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
 * Pulls the largest IDs from an object containing id: value pairs
 * @param {object} objData id: value pairs, (eg. { "010001": 4.5, "010002", 10, ...})
 * @param {number} num number of ids to return (e.g. 1)
 * @returns {array} array of ids with the largest values (e.g. [ "010002" ])
 */
function getLargestIds(objData, num) {
  return Object.keys(objData).sort(function(a, b) {
    return objData[b] - objData[a];
  }).slice(0, num);
}

function setSearchHighlight(highlight, hit) {
  // console.log('setSearchHighlight()');
  highlight[hit.id] = hit.name + ', ' + hit.state_name;
  // console.log(highlight);
  return highlight;
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
  const returnArr = data.sort(function(a, b) {
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
      // console.log('Seg data request finished.');
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
  var base = scatterplot.getState('base');
  var dataSeries = [];
  var highlight = {};
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  Title['text'] = 'White and Black Student Scores';
  //Title['subtext'] = 'U.S. School Districts 2009-2016';
  Title['subtext'] = '';
  Title.setTitle();

  const baseOverrides = {
    title: {
      text: Title.text, // 'White and Black Students\' Average Performance',
      subtext: Title.subtext, // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min:-3,
      max:3,
      name: 'Black Student Scores',
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Student Scores',
    },
    tooltip: {
      trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [
      initialMarkline,
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500,
      }
    ]
  }
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ]) //  baseOverrides
  }
}

/** State 2: Show white scores on x axis and black scores on y axis */
var state2 = function(scatterplot) {
  // this state is created from the base

  var base = scatterplot.getState('base');
  var dataSeries = [];
  var highlight = {};
  highlight['1201980'] = 'Walton County School District';
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  Title['text'] = 'White and Black Student Scores';
  //Title['subtext'] = 'U.S. School Districts 2009-2016';
  Title.setTitle();

  const baseOverrides = {
    title: {
      text: Title.text, // 'White and Black Students\' Average Performance',
      subtext: Title.subtext, // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min:-3,
      max:3,
      name: 'Black Student Scores',
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Student Scores',
    },
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [
      initialMarkline,
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500,
      }
    ]
  }
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ]) //  baseOverrides
  }
}

let state3top100 = {};
let state3series = {};
/** State 2: Highlight largest 25 districts  */
var state3 = function(scatterplot) {
  // state 2 is based on state 1
  var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  state3series = dataSeries;
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 1 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  state3top100 = top100;
  var highlight = {};
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'White and Black Student Scores';
  Title['subtext'] = '100 Largest Districts';
  Title.setTitle();
  const baseOverrides = {
    title: {
      subtext: Title.subtext, // '100 Largest U.S. School Districts 2009-2016'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min:-3,
      max:3,
      name: 'Black Student Scores',
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Student Scores',
    },
    series: [
      // dataSeries,
      { id: 'base' },
      {
        type: 'scatter',
        data: top100,
        symbolSize: dataSeries.symbolSize,
        itemStyle: selectedItemStyle
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      }
    ]
  };
  // console.log(top100);
  return {
    selected: [],
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
    // deepmerge(base.options, baseOverrides)
  }
};

/** State 4: Highlight locations (Detroit, Gwinet, Washington) */
let state4top100 = {};
let state4counter = 0;
var state4 = function(scatterplot) {
  var highlight = {};
  //highlight['1302220'] = 'Forsyth County';
  highlight['1301230'] = 'Clayton County School District';
  highlight['1302550'] = 'Gwinnet County School District';
  highlight['1300120'] = 'Atlanta City School District';
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  var base = scatterplot.getState('base');
  // var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100)
  if (state4counter === 0) {
    state4top100 = top100;
  }
  state4counter ++;
  // Plot title and subtitle
  Title['text'] = 'White and Black Student Scores';
  Title['subtext'] = '';
  Title.setTitle();
  const baseOverrides = {
    title: {
      text: Title.text, // 'White and Black Students\' Average Performance',
      subtext: Title.subtext, // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
      show: false
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    grid: baseGrid,
    yAxis: deepmerge(baseYAxis, {
      min:-3,
      max:3,
      name: 'Black Student Scores',
    }),
    xAxis: deepmerge(baseXAxis,{
      min: -3,
      max: 4,
      name: 'White Student Scores',
    }),
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: selectedItemStyle,
        z: 2,
        // tooltip: tooltip,
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500,
      },
      {
        type:'scatter',
        markLine: {
          animation: false,
          silent: true,
          label: {
            show: true,
            position: 'middle',
            fontFamily: 'SharpGrotesk-Medium20',
            fontWeight: '500',
            fontSize: 11.52,
            padding: 4,
            color: 'rgba(5, 41, 101, 100%)',
            formatter: function(value) {
              return value.name
            }
          },
          data: [
            [
              {
                name: '', // Y axis
                coord: [0, -3],
                symbol: 'none',
                lineStyle: {
                  color: '#547892',
                  type: 'solid',
                  width: 0.5,
                }
              },
              {
                coord: [ 0,  3],
                symbol: 'none',
              },
            ],
            [
              {
                name: '', // x axis
                coord: [-3, 0],
                symbol: 'none',
                lineStyle: {
                  color: '#547892',
                  type: 'solid',
                  width: 0.5,
                }
              },
              {
                coord: [3, 0],
                symbol: 'none'
              },
            ],
          [
            {
              name: '',
              coord: [-2.5, -2.5],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(5, 41, 101, 100%)',
                type: 'solid',
                width: 1,
              }
            },
            { coord: [ 3,  3], symbol: 'none' },
          ],
        ]
        }
      }
    ]
  };
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: state4top100,
    options: deepmerge.all([ base.options, baseOverrides ])
    // deepmerge(base.options, baseOverrides)
  }
};


/** State 4: Load new variables to show White/Black SES Gap and Achievement Gap */
var state5 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  var highlight = {};
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '';
  Title.setTitle();
  const baseOverrides = {
    title: {
      show: false,
      text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext, // 'US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    grid: {
      top: 10,
      bottom: 26,
      left: 10,
      right: 28,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: deepmerge(baseYAxis, {
      min: -1, // -6,
      max: 6, // 3, // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24,
      lineHeight: 48,
      // splitNumber: 7
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -1, // -3,
      max: 6, // 7,
      name: 'White-Black Socioeconomic Inequality',
    }),
    tooltip: {
      trigger: 'item',
      transitionDuration: 0.6,
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [
      {
        type:'scatter',
        markLine: noRacialDisparityMarkline,
      },
      {
        type:'scatter',
        markLine: noGapMarkline,
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500,
      },
    ]
  };
  return {
    selected: [],
    highlighted: Object.keys(highlight),
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([ base.options, baseOverrides ])
    // deepmerge(base.options, baseOverrides)
  }
}

/** State 6: Highlight largest districts */
var state6 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var dataSeries = scatterplot.getDataSeries();
  var base = scatterplot.getState('state5');
  var highlight = {};
  highlight['1301230'] = 'Clayton County';
  highlight['1302550'] = 'Gwinnet County';
  highlight['1300120'] = 'Atlanta City';
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '';
  Title.setTitle();
  const baseOverrides = {
    title: {
      show: false,
      text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext, // 'US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    grid: {
      top: 10,
      bottom: 26,
      left: 10,
      right: 28,
      zlevel: 100,
      height: 'auto',
      width: 'auto',
      containLabel: true
    },
    yAxis: deepmerge(baseYAxis, {
      position: 'right',
      min: -1, // -6,
      max: 6, // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -1, // -3,
      max: 6, // 7,
      name: 'White-Black Socioeconomic Inequality',
    }),
    tooltip: {
      // trigger: 'item',
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [
      // { id: 'base' },
      {
        type:'scatter',
        markLine: noRacialDisparityMarkline
      },
      {
        type:'scatter',
        markLine: noGapMarkline,
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
    ]
  };
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([ base.options, baseOverrides ])
    // (base.options, baseOverrides)
  }
}

/** State 7: Gwinnett, DC, and Detroit school districts */
var state7 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state6');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var highlight = {};
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '100 Largest U.S. School Districts 2009-2016';
  Title.setTitle();
  const baseOverrides = {
    title: {
      show: false,
      subtext: Title.subtext, // '100 Largest U.S. School Districts 2009-2016'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    tooltip: {
      // trigger: 'item',
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [
      // dataSeries,
      {
        type: 'scatter',
        data: top100,
        symbolSize: dataSeries.symbolSize,
        itemStyle: selectedItemStyle
      },
      {
        type:'scatter',
        markLine: noGapMarkline,
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
    ]
  };
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 8: Highlight districts around x=0 */
var state8 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state5');
  // return options;
  var dataSeries = scatterplot.getDataSeries();
  // dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.2 })
  // var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var range = {
    min: -.15,
    max: .15
  };
  var nearZero = scatterplot.getSeriesDataInRange(dataSeries.data, 'x', range);
  var highlight = {};
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }
  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016';
  Title.setTitle();
  const baseOverrides = {
    title: {
      show: false,
      subtext: Title.subtext, // 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [
      dataSeries,
      {
        type: 'scatter',
        data: nearZero,
        symbolSize: dataSeries.symbolSize,
        itemStyle: selectedItemStyle,
        // {
        //   borderWidth: 0.5,
        //   borderColor: '#C56A12',
        //   color: '#FD7D02',
        // },
        opacity: 0.8
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
      {
        type:'scatter',
        markLine: noGapMarkline,
      }
    ]
  };
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

let state9dataSeries = {};
var state9 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  state9dataSeries = dataSeries;
  var highlight = {};
  highlight['1303930'] = 'Newton County';
  highlight['1302550'] = 'Gwinnet County School District';
  highlight['1201980'] = 'Walton County';
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '';
  Title.setTitle();
  const baseOverrides = {
    title: {
      show: false,
      text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext, // 'US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
      show: false,
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    grid: {
      top: 10,
      bottom: 26,
      left: 10,
      right: 28,
      zlevel: 100,
      height: 'auto',
      width: 'auto',
      containLabel: true
    },
    yAxis: deepmerge(baseYAxis, {
      min: -1, // -6,
      max: 6, // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24
    }),
    xAxis: deepmerge(baseYAxis, {
      min: -1, // -3,
      max: 6, // 7,
      name: 'White-Black Socioeconomic Inequality',
    }),
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [
      {
        type:'scatter',
        markLine: noRacialDisparityMarkline
      },
      {
        type:'scatter',
        markLine: noGapMarkline,
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
    ]
  }
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/* Highlight least and most segregated */
var state10 = function(scatterplot) {
  // console.log('loading state9');
  // this state is created from the base
  // const base = scatterplot.getState('state8');
  const base = scatterplot.getState('base');
  // Build series most seg to highlight
  var dataSeries = state9dataSeries; // scatterplot.getDataSeries();
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var segSortedTop100 = sortDataBySeg(top100);
  var leastSegregatedSeries = sliceLeast(segSortedTop100, 10);
  var mostSegregatedSeries = sliceMost(segSortedTop100, 10);
  var highlight = {};
  // highlight['1201980'] = 'Walton County School District';
  highlight['1301230'] = 'Clayton County School District';
  highlight['1300120'] = 'Atlanta City School District';
  // highlight['1303930'] = 'Newton County School District';
  highlight['1302550'] = 'Gwinnett County School District';
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Segregation';
  Title['subtext'] = '';
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext, // 'Most and Least Segregated Out of\n100 Largest US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    legend: {
      show: true,
      orient: 'vertical',
      textStyle: {
        color: '#173B75',
        fontFamily: 'MaisonNeue-Book',
        fontWeight: '500',
        fontSize: 11
      },
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: 3,
      padding: 14,
      left: 5,
      top: 5,
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
      top: 10,
      bottom: 26,
      left: 10,
      right: 28,
      zlevel: 100,
      height: 'auto',
      width: 'auto',
      containLabel: true
    },
    yAxis: deepmerge(baseYAxis, {
      min: -1, // -6,
      max: 6, // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -0.3,
      max: 0.7,
      name: 'White-Black Socioeconomic Segregation',
      interval: 0.15,
      scale: false
    }),
    tooltip: {
      trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Segregation', 'White-Black Achievement Gap');
      }
    },
    series: [
      { id: 'base'},
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
      {
        type:'scatter',
        markLine: segNoGapMarkline,
      },
      zeroSegGapMarkline
    ]
  }
  return {
    highlighted: Object.keys(highlight),
    xVar: 'wb_seg',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/* Highlight least and most segregated */
var state11 = function(scatterplot) {
  // console.log('loading state10');
  // this state is created from the base
  // const base = scatterplot.getState('state8');
  const base = scatterplot.getState('base');
  // Build series most seg to highlight
  var dataSeries = null;
  if (!!state9dataSeries) {
    dataSeries = state9dataSeries;
  } else {
    dataSeries = scatterplot.getDataSeries();
  }
  // var dataSeries = state9dataSeries; // scatterplot.getDataSeries();
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var segSortedTop100 = sortDataBySeg(top100);
  var leastSegregatedSeries = sliceLeast(segSortedTop100, 10);
  var mostSegregatedSeries = sliceMost(segSortedTop100, 10);
  var highlight = {};
  highlight['0604740'] = 'Berkeley, CA';
  highlight['1714460'] = 'Evanston, IL';
  if (_plot &&
    _plot.searchItemIDs &&
    _plot.searchItemIDs.length >= 1) {
      highlight = setSearchHighlight(highlight, _plot.searchItemIDs[0]);
  }

  // Plot title and subtitle
  Title['text'] = 'Achievement Gaps and Segregation';
  Title['subtext'] = '';
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext, // 'Most and Least Segregated Out of\n100 Largest US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    legend: {
      show: true,
      orient: 'vertical',
      textStyle: {
        color: '#173B75',
        fontFamily: 'MaisonNeue-Book',
        fontWeight: '500',
        fontSize: 11
      },
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: 3,
      padding: 14,
      left: 5,
      top: 5,
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
      top: 10,
      bottom: 26,
      left: 10,
      right: 28,
      zlevel: 100,
      height: 'auto',
      width: 'auto',
      containLabel: true
    },
    yAxis: deepmerge(baseYAxis, {
      min: -1, // -6,
      max: 6, // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -0.3,
      max: 0.7,
      name: 'White-Black Socioeconomic Segregation',
      interval: 0.15,
      scale: false
    }),
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Segregation', 'White-Black Achievement Gap');
      }
    },
    series: [
      { id: 'base'},
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
      {
        type:'scatter',
        markLine: segNoGapMarkline,
      },
      zeroSegGapMarkline
    ]
  }
  return {
    highlighted: Object.keys(highlight),
    xVar: 'wb_seg',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    onDataLoaded: function() {
      console.log('data loaded');
      console.log(scatterplot.data);
    },
    options: deepmerge.all([ base.options, baseOverrides ])
  }
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
