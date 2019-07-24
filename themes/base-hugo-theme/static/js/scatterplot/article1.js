/**
 * scatterplot states for article one,
 * Patterns of Racial/Ethnic Opportunity Gaps
 * - article storyboard: https://docs.google.com/document/d/1adz0CwXI8WKok8ePVQEcSmlRQwRIjKaKvd8Am6OFfhY/edit
 */

const jQ = jQuery;

// Placeholders for segregation series operations
let segData = [];
let searchItemIDs = [];
let names = [];
let Title = {};
Title['text'] = '';
Title['subtext'] = '';
Title['setTitle'] = function() {
  // Set title and subtitle
  jQ('.column-scatterplot .title').html(Title.text);
  jQ('.column-scatterplot .subtitle').html(Title.subtext);
}

const axisBlue = '#547892';
let activeHighlight = {};
const highlightedLabel = (highlight) => {
  // console.log('highlightedLabel');
  activeHighlight = highlight;
  return {
    show: true,
    position: 'top',
    backgroundColor: '#0090FF', // '#FFFCCF',
    borderColor: '#7D38BB',
    borderWidth: 0,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'SharpGrotesk-Medium20', // 'MaisonNeue-Medium',
    lineHeight: 12,
    padding: [8, 8],
    borderRadius: 3,
    opacity: 1,
    color: '#fff', // '#052965',
    formatter: function(item) {
      // console.log(item);
      // console.log(activeHighlight);
      return activeHighlight[item.value[3]]
    },
  };
}
const highlightedItemStyle =  {
  borderWidth: 0.5,
  borderColor: '#0677CE', // '#FFC02D',
  color: '#32A6FF', // '#FFFCDD',
  opacity: 0.9,
  shadowBlur: 4,
  shadowColor: 'rgba(0, 0, 0, 0.5)',
  shadowOffsetX: 0,
  shadowOffsetY: 2
};
const selectedItemStyle = {
  borderWidth: 0.5,
  borderColor: '#109860', // '#7D38BB',
  color: '#48CB95', // '#BC72FF',
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
        name: 'white student scores = black student scores',
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
        name: 'no racial disparity',
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
  // Set up array of district IDs and names for building search series.
  if (Object.keys(names).length <= 0 &&
    scatterplot &&
    scatterplot.data &&
    scatterplot.data.districts &&
    scatterplot.data.districts.name) {
    names = scatterplot.data.districts.name;
    // console.log(names);
  }

  var base = scatterplot.getState('base');
  var dataSeries = [];
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  Title['text'] = 'White and Black Students\' Average Performance';
  Title['subtext'] = 'U.S. School Districts 2009-2016';
  Title.setTitle();

  const baseOverrides = {
    title: {
      text: Title.text, // 'White and Black Students\' Average Performance',
      subtext: Title.subtext, // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min:-3,
      max:3,
      name: 'Black Average Performance',
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Average Performance',
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

let state2top100 = {};
let state2series = {};
/** State 2: Highlight largest 25 districts  */
var state2 = function(scatterplot) {
  // state 2 is based on state 1
  var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  state2series = dataSeries;
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 1 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  state2top100 = top100;
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White and Black Students\' Average Performance';
  Title['subtext'] = '100 Largest U.S. School Districts 2009-2016';
  Title.setTitle();
  const baseOverrides = {
    title: {
      subtext: Title.subtext, // '100 Largest U.S. School Districts 2009-2016'
    },
    yAxis: {
      min:-3,
      max:3,
      name: 'Black Average Performance',
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Average Performance',
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
    options: deepmerge(base.options, baseOverrides)
  }
};

/** State 3: Highlight locations (Detroit, Gwinet, Washington) */
let state3top100 = {};
let state3counter = 0;
var state3 = function(scatterplot) {
  var highlight = {};
  highlight['0641580'] = 'Washington, D.C.';
  highlight['2612000'] = 'Detroit, MI';
  highlight['1302550'] = 'Gwinnet County, GA';
  // console.log(highlight);
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // console.log(highlight);
  // var base = scatterplot.getState('state2');
  var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100)
  if (state3counter === 0) {
    state3top100 = top100;
  }
  state3counter ++;
  // Plot title and subtitle
  Title['text'] = 'White and Black Students\' Average Performance';
  Title['subtext'] = 'U.S. School Districts 2009-2016';
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
    grid: baseGrid,
    yAxis: deepmerge(baseYAxis, {
      min:-3,
      max:3,
      name: 'Black Average Performance',
    }),
    xAxis: deepmerge(baseXAxis,{
      min: -3,
      max: 4,
      name: 'White Average Performance',
    }),
    // tooltip: tooltip,
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
      initialMarkline
    ]
  };
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: state3top100,
    options: deepmerge(base.options, baseOverrides)
  }
};


/** State 4: Load new variables to show White/Black SES Gap and Achievement Gap */
var state4 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources';
  Title['subtext'] = 'US School Districts 2009-2016';
  Title.setTitle();
  return {
    selected: [],
    highlighted: Object.keys(highlight),
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: {
      title: {
        show: false,
        text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
        subtext: Title.subtext, // 'US School Districts 2009-2016',
        textAlign: 'center',
        left: '50%',
        top: '10px',
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
        name: 'White-Black Achievement Gap\nby Grade Levels',
        nameGap: 24,
        lineHeight: 48,
        // splitNumber: 7
      }),
      xAxis: deepmerge(baseXAxis, {
        min: -1, // -3,
        max: 6, // 7,
        name: 'White-Black Socioeconomic Disparity',
      }),
      series: [
        {
        type:'scatter',
        markLine: noRacialDisparityMarkline,
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500,
      },
    ]}
  }
}

/** State 5: Highlight largest districts */
var state5 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var dataSeries = scatterplot.getDataSeries();
  var base = scatterplot.getState('state4');
  var highlight = {};
  highlight['0641580'] = 'Washington, D.C.';
  highlight['2612000'] = 'Detroit, MI';
  highlight['1302550'] = 'Gwinnet County, GA';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources';
  Title['subtext'] = 'US School Districts 2009-2016';
  Title.setTitle();
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: {
      title: {
        show: false,
        text: Title.text, // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
        subtext: Title.subtext, // 'US School Districts 2009-2016',
        textAlign: 'center',
        left: '50%',
        top: '10px',
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
        name: 'White-Black Achievement Gap\nby Grade Levels',
        nameGap: 24
      }),
      xAxis: deepmerge(baseXAxis, {
        min: -1, // -3,
        max: 6, // 7,
        name: 'White-Black Socioeconomic Disparity',
      }),
      series: [
        { id: 'base' },
        {
          type:'scatter',
          markLine: noRacialDisparityMarkline
        },
        {
          id: 'highlighted',
          itemStyle: highlightedItemStyle,
          label: highlightedLabel(highlight),
          zlevel: 500
        },
      ]
    },
  }
}

/** State 6: Gwinnett, DC, and Detroit school districts */
var state6 = function(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state5');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources';
  Title['subtext'] = '100 Largest U.S. School Districts 2009-2016';
  Title.setTitle();
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      title: {
        show: false,
        subtext: Title.subtext, // '100 Largest U.S. School Districts 2009-2016'
      },
      series: [
        dataSeries,
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
        },
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
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources';
  Title['subtext'] = 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016';
  Title.setTitle();
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      title: {
        show: false,
        subtext: Title.subtext, // 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016'
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
      ]
    })
  }
}
let state8dataSeries = {};
var state8 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  state8dataSeries = dataSeries;
  var highlight = {};
  highlight['0803360'] = 'Denver, CO';
  highlight['0634170'] = 'San Bernardino, CA';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources';
  Title['subtext'] = 'US School Districts 2009-2016';
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
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameGap: 24
    }),
    xAxis: deepmerge(baseYAxis, {
      min: -1, // -3,
      max: 6, // 7,
      name: 'White-Black Socioeconomic Disparity',
    }),
    series: [
      {
        type:'scatter',
        markLine: noRacialDisparityMarkline
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
    options: baseOverrides, // deepmerge.all([ base.options, baseOverrides ])
  }
}

/* Highlight least and most segregated */
var state9 = function(scatterplot) {
  // console.log('loading state9');
  // this state is created from the base
  // const base = scatterplot.getState('state8');
  const base = scatterplot.getState('base');
  // Build series most seg to highlight
  var dataSeries = state8dataSeries; // scatterplot.getDataSeries();
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var segSortedTop100 = sortDataBySeg(top100);
  var leastSegregatedSeries = sliceLeast(segSortedTop100, 10);
  var mostSegregatedSeries = sliceMost(segSortedTop100, 10);
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources';
  Title['subtext'] = 'Most and Least Segregated Out of\n100 Largest US School Districts 2009-2016';
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
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameGap: 24
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -1, // -3,
      max: 6, // 7,
      name: 'White-Black Socioeconomic Disparity',
    }),
    series: [
      // dataSeries,
      { id: 'base'},
      {
        type: 'scatter',
        data: leastSegregatedSeries,
        name: "Least Segregated",
        symbolSize: 12,
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#0D814E', // 'rgba(255, 192, 45, 100)',
          color: '#1BC67A', // 'rgba(255, 252, 216, 100)',
          opacity: 1
        },
      },
      {
        type: 'scatter',
        data: mostSegregatedSeries,
        name: "Most Segregated",
        symbolSize: 12,
        itemStyle: {
          borderWidth: 0.5,
          borderColor: '#033E82', // '#C56A12',
          color: '#187CF1', // '#FD7D02',
          opacity: 1
        },
      },
      segMarkline,
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
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    onDataLoaded: function() {
      console.log('data loaded');
      console.log(scatterplot.data);
    },
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 10: Achievement vs. Gap in Exposure to School Poverty */
var state10 = function(scatterplot) {
  const options = scatterplot.component.getOption();
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var highlight = {
    '1100030': 'District of Columbia',
    '2612000': 'Detroit, MI'
  }
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White-Black Achievement Gaps by\nDifferences in White-Black Exposure to Poverty';
  Title['subtext'] = '100 Largest US School Districts 2009-2016';
  Title.setTitle();
  const baseOverrides = {
    title: {
      show: false,
      text: Title.text, // 'White-Black Achievement Gaps by\nDifferences in White-Black Exposure to Poverty',
      subtext: Title.subtext, // '100 Largest US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
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
      min: -1,
      max: 7,
      name: 'White-Black Achievement Gap\nby Grade Levels',
      nameGap: 28
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -0.25,
      max: 0.75,
      name: 'Black-White Difference in Average School Poverty Rates',
      interval: .25,
    }),
    series: [
      // dataSeries,
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 0.7,
          borderColor: 'rgba(0,0,0,1)',
          color: '#b6a2de' // 'rgba(255,0,0,0.25)'
        },
        z: 2
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
            color:  '#052965',
            padding: 4,
            formatter: function(value) {
              return value.name
            }
          },
          data: [
            [
              {
                name: 'equal exposure to poverty',
                coord: [0, -1],
                symbol: 'none',
                lineStyle: {
                  color:  '#052965',
                  type: 'solid',
                  width: 1,
                },
              },
              {
                coord: [ 0, 7],
                symbol: 'none'
              },
            ]
          ]
        }
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
    xVar: 'wb_pov',
    yVar: 'wb_avg',
    zVar: 'all_sz',
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
