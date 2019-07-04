/**
 * scatterplot states for article one
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

const axisBlue = '#547892';
const highlightedLabel = (highlight) => {
  return {
    show: true,
    position: 'top',
    backgroundColor: '#FFFCCF',
    borderColor: '#7D38BB',
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'SharpGrotesk-Medium20', // 'MaisonNeue-Medium',
    lineHeight: 12,
    padding: [8, 8],
    borderRadius: 3,
    color: '#052965',
    formatter: function(item) {
      return highlight[item.value[3]]
    },
  };
}
const highlightedItemStyle =  {
  borderWidth: 0.5,
  borderColor: '#FFC02D',
  color: '#FFFCDD',
  opacity: 0.9,
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
const selectedItemStyle = {
  borderWidth: 0.7,
  borderColor: '#7D38BB',
  color: '#BC72FF',
  opacity: 0.7,
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
          color: '#052965',
          type: 'solid',
          width: 1,
        },
        label: {
          padding: 8,
          position: 'middle',
          color: '#052965',
        }
      },
      {
        coord: [ 0, -1],
        symbol: 'none'
      },
    ]
  ]
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
        zlevel: 500
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

/** State 2: Highlight largest 25 districts  */
var state2 = function(scatterplot) {
  // state 2 is based on state 1
  var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    console.log(highlight);
  }
  // Plot title and subtitle
  Title['text'] = 'White and Black Students\' Average Performance';
  Title['subtext'] = '100 Largest U.S. School Districts 2009-2016';
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  return {
    selected: [],
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, baseOverrides)
  }
};

/** State 3: Highlight locations (Detroit, Gwinet, Washington) */
var state3 = function(scatterplot) {
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
  console.log(highlight);
  var base = scatterplot.getState('state2');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100)
  // Plot title and subtitle
  Title['text'] = 'White and Black Students\' Average Performance';
  Title['subtext'] = 'U.S. School Districts 2009-2016';
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  const options = {
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
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: selectedItemStyle,
        z: 2
      },
      {
        id: 'highlighted',
        itemStyle: highlightedItemStyle,
        label: highlightedLabel(highlight),
        zlevel: 500
      },
      initialMarkline
    ]
  };
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: top100,
    options: options // deepmerge(base.options, baseOverrides)
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
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
        min: -6,
        max: 0,
        name: 'White-Black Achievement Gap\nby Grade Levels',
        nameGap: 28,
        lineHeight: 48,
      }),
      xAxis: deepmerge(baseXAxis, {
        min: -3,
        max: 7,
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
        zlevel: 500
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
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
        min: -6,
        max: 0,
        name: 'White-Black Achievement Gap\nby Grade Levels',
        nameGap: 28
      }),
      xAxis: deepmerge(baseXAxis, {
        min: -3,
        max: 7,
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
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
          itemStyle: {
            borderWidth: 0.5,
            borderColor: '#C56A12',
            color: '#FD7D02',
          },
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

var state8 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
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
      right: 52,
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
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14,
        fontWeight: 'normal'
      },
    },
    series: [
      {
      type:'scatter',
      id: 'no-racial-disparity',
      markPoint: { // Use markpoint instead of label for more control in positioning.
        itemStyle: {
          color: 'transparent',
        },
        data: [
          {
            value: 'no racial disparity',
            xAxis: -0.5,
            yAxis: -3.5,
            symbol: 'rect',
            symbolSize: [100, 50],
            label: {
              show: true,
              position: 'inside',
              verticalAlign: 'middle',
              color: '#042965',
              fontWeight: 600,
              fontFamily: 'MaisonNeue-Medium',
              rotate: 90,
              padding: [6, 8],
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 3,
            },
          }
        ],
      },
      markLine: {
        animation: false,
        silent: true,
        label: {
          show: false,
          position: 'middle',
          fontFamily: 'MaisonNeue-Medium',
          fontWeight: '600',
          fontSize: 14,
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
                color:  '#fff', // '#dc69aa',
                type: 'solid',
                width: 1,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
                shadowBlur: 3,
                shadowColor: 'transparent' // '#042965'
              },
              label: {
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderRadius: 2,
                padding: 5,
                color: '#052965',
                shadowColor: 'transparent',
                textShadowColor: 'transparent',
                textBorderColor: 'transparent'
              }
            },
            {
              coord: [ 0, -1],
              symbol: 'none'
            },
          ]
        ]
      },
    },
    {
      id: 'highlighted',
      itemStyle: {
        borderColor: '#042965',
        color: 'rgba(255,255,0,0.97)',
        borderWidth: 0.7,
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
var state9 = function(scatterplot) {
  console.log('loading state9');
  // this state is created from the base
  // const base = scatterplot.getState('state8');
  const base = scatterplot.getState('base');
  // Build series most seg to highlight
  var dataSeries = scatterplot.getDataSeries();
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  // var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100);
  // var newTop100 = scatterplot.getSeriesDataForIds(dataSeries.data, top100);
  // var top100 = scatterplot.getSeriesDataBySize(scatterplot.data['districts']['all_sz'], 100);
  // console.log(newTop100);
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  const baseOverrides = {
    title: {
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
        color: '#fff',
        fontFamily: 'MaisonNeue-Medium',
        fontWeight: '600',
        fontSize: 12
      },
      backgroundColor: '#042965',
      borderColor: '#fff', // '#dc69aa',
      borderWidth: 1,
      borderRadius: 3,
      padding: 14,
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
      right: 52,
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
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14,
        fontWeight: 'normal'
      },
    },
    series: [
      // dataSeries,
      { id: 'base'},
      {
        type: 'scatter',
        data: leastSegregatedSeries,
        name: "Least Segregated",
        symbolSize: 12, // dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 0.7,
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
          borderWidth: 0.7,
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
                color: '#fff', // '#dc69aa',
                type: 'solid',
                width: 1,
                shadowOffsetY: 0,
                shadowOffsetX: 0,
                shadowBlur: 3,
                shadowColor: 'transparent' // '#042965'
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
    },
    {
      id: 'highlighted',
      itemStyle: {
        borderColor: '#042965',
        color: 'rgba(255,255,0,0.97)',
        borderWidth: 0.7,
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
  // var dataSeries = scatterplot.getDataSeries();
  // var options = scatterplot.component.getOption();
  // var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  // var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100)
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.5 })
  // var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100)
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
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  const baseOverrides = {
    title: {
      text: Title.text, // 'White-Black Achievement Gaps by\nDifferences in White-Black Exposure to Poverty',
      subtext: Title.subtext, // '100 Largest US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    grid: {
      right: 52,
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
      min: -0.25,
      max: 0.75,
      name: 'Black-White Difference in Average School Poverty Rates',
      interval: .25,
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14,
        fontWeight: 'normal'
      },
    },
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
        markPoint: { // Use markpoint instead of label for more control in positioning.
          itemStyle: {
            color: 'transparent',
          },
          data: [
            {
              value: 'equal exposure to poverty',
              xAxis: -0.05,
              yAxis: -3,
              symbol: 'rect',
              symbolSize: [100, 50],
              label: {
                show: true,
                position: 'inside',
                verticalAlign: 'middle',
                color: '#042965',
                fontWeight: 600,
                fontFamily: 'MaisonNeue-Medium',
                rotate: 90,
                padding: [6, 8],
                backgroundColor: 'rgba(255, 255, 255, 0.75)',
                borderRadius: 3,
              },
            }
          ],
        },
        markLine: {
          animation: false,
          silent: true,
          label: {
            show: false,
            position: 'middle',
            fontFamily: 'MaisonNeue-Medium',
            fontWeight: '600',
            fontSize: 12,
            textBorderColor: 'transparent', // '#042965',
            textBorderWidth: 1,
            textShadowColor: 'transparent', // '#042965',
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
                  color:  '#fff', // '#dc69aa',
                  type: 'solid',
                  width: 1,
                  shadowOffsetY: 0,
                  shadowOffsetX: 0,
                  shadowBlur: 3,
                  shadowColor: 'transparent' // '#042965'
                },
                label: {
                  // position: 'end',
                  backgroundColor: 'rgba(255, 255, 255, 0.75)',
                  borderRadius: 2,
                  padding: 5,
                  color: '#052965',
                  shadowColor: 'transparent',
                  textShadowColor: 'transparent',
                  textBorderColor: 'transparent',
                  emphasis: {
                    position: 'end'
                  }
                  // verticalAlign: 'bottom'
                  // position: 'left',
                  // rotate: -90
                }
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
          borderWidth: 0.7,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.9)'
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
