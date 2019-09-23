"use strict";

var _selectedItemStyle;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * scatterplot states for article one,
 * Patterns of Racial/Ethnic Opportunity Gaps
 * - article storyboard: https://docs.google.com/document/d/1adz0CwXI8WKok8ePVQEcSmlRQwRIjKaKvd8Am6OFfhY/edit
 */
var jQ = jQuery; // Placeholders for segregation series operations

var segData = [];
var searchItemIDs = [];
var names = [];
var Title = {};
Title['text'] = '';
Title['subtext'] = '';

Title['setTitle'] = function () {
  // Set title and subtitle
  jQ('.column-scatterplot .title').html(Title.text);
  jQ('.column-scatterplot .subtitle').html(Title.subtext);
};

var axisBlue = '#547892';
var activeHighlight = {};

var highlightedLabel = function highlightedLabel(highlight) {
  // console.log('highlightedLabel');
  activeHighlight = highlight;
  return {
    show: true,
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    // '#FFFCCF',
    borderColor: '#7D38BB',
    borderWidth: 0,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'SharpGrotesk-Medium20',
    // 'MaisonNeue-Medium',
    lineHeight: 12,
    padding: [5, 5],
    borderRadius: 3,
    opacity: 1,
    color: 'rgba(25, 25, 25, 0.91)',
    // '#052965',
    formatter: function formatter(item) {
      // console.log(item);
      // console.log(activeHighlight);
      return activeHighlight[item.value[3]];
    }
  };
}; // const state9HighlightedLabel = (highlight) => {
//   // console.log('highlightedLabel');
//   activeHighlight = highlight;
//   console.log(activeHighlight);
//   return {
//     show: true,
//     position: 'top',
//     backgroundColor: 'transparent', // '#0090FF', // '#FFFCCF',
//     borderColor: 'transparent', // '#7D38BB',
//     borderWidth: 0,
//     fontSize: 12,
//     fontWeight: 500,
//     fontFamily: 'SharpGrotesk-Medium20', // 'MaisonNeue-Medium',
//     lineHeight: 12,
//     padding: [8, 8],
//     borderRadius: 3,
//     opacity: 1,
//     color: '#031232', // '#fff', // '#052965',
//     formatter: function(item) {
//       // console.log(item);
//       // console.log(activeHighlight);
//       return activeHighlight[item.value[3]]
//     },
//   };
// }
// Orange bubbles


var highlightedItemStyle = {
  borderWidth: 0.4,
  borderColor: '#BABABA',
  // '#FFC02D',
  color: 'rgba(255, 178, 0, 0.77)',
  // '#FFFCDD',
  opacity: 1,
  shadowBlur: 2,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffsetX: 0,
  shadowOffsetY: 1
}; // Blue bubbles

var selectedItemStyle = (_selectedItemStyle = {
  borderWidth: 0.4,
  borderColor: 'rgba(89, 151, 203, 0.8)',
  // '#7D38BB',
  color: '#48CB95'
}, _defineProperty(_selectedItemStyle, "color", 'rgba(177, 222, 238, 0.8)'), _defineProperty(_selectedItemStyle, "opacity", 1), _selectedItemStyle);
var initialMarkline = {
  type: 'scatter',
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
      formatter: function formatter(value) {
        return value.name;
      }
    },
    data: [[{
      name: '',
      // Y axis
      coord: [0, -3],
      symbol: 'none',
      lineStyle: {
        color: '#547892',
        type: 'solid',
        width: 0.5
      }
    }, {
      coord: [0, 3],
      symbol: 'none'
    }], [{
      name: '',
      // x axis
      coord: [-3, 0],
      symbol: 'none',
      lineStyle: {
        color: '#547892',
        type: 'solid',
        width: 0.5
      }
    }, {
      coord: [3, 0],
      symbol: 'none'
    }], [{
      name: 'white scores = black scores',
      coord: [-2.5, -2.5],
      symbol: 'none',
      lineStyle: {
        color: 'rgba(5, 41, 101, 100%)',
        type: 'solid',
        width: 1
      }
    }, {
      coord: [3, 3],
      symbol: 'none'
    }]]
  }
};
var baseGrid = {
  top: 10,
  bottom: 26,
  left: 10,
  right: 26,
  zlevel: 100,
  height: 'auto',
  // 280,
  width: 'auto',
  // 'auto',
  containLabel: true
};
var baseYAxis = {
  position: 'right',
  splitLine: {
    show: false
  },
  nameGap: 26,
  nameTextStyle: {
    fontFamily: 'SharpGrotesk-Medium20',
    color: axisBlue,
    fontWeight: 'normal',
    fontSize: 11
  },
  zlevel: 101
};
var baseXAxis = {
  nameGap: 26,
  nameTextStyle: {
    fontFamily: 'SharpGrotesk-Medium20',
    color: axisBlue,
    fontSize: 11,
    fontWeight: 'normal',
    verticalAlign: 'bottom'
  },
  zlevel: 102
};
var noRacialDisparityMarkline = {
  animation: false,
  silent: true,
  label: {
    show: true,
    position: 'middle',
    fontFamily: 'SharpGrotesk-Medium20',
    fontWeight: '500',
    fontSize: 11.52,
    padding: 4,
    formatter: function formatter(value) {
      return value.name;
    }
  },
  data: [[{
    name: 'no racial inequality',
    coord: [0, -1],
    // [0, -6],
    symbol: 'none',
    lineStyle: {
      color: '#052965',
      type: 'solid',
      width: 1
    },
    label: {
      padding: 4,
      position: 'middle',
      color: '#052965'
    }
  }, {
    coord: [0, 6],
    // [ 0, 0],
    symbol: 'none'
  }]]
};
var noGapMarkline = {
  animation: false,
  silent: true,
  label: {
    show: true,
    position: 'middle',
    fontFamily: 'SharpGrotesk-Medium20',
    fontWeight: '500',
    fontSize: 11.52,
    padding: 2,
    formatter: function formatter(value) {
      return value.name;
    }
  },
  data: [[{
    name: 'no achievement gap',
    coord: [-1, 0],
    symbol: 'none',
    lineStyle: {
      color: '#052965',
      type: 'solid',
      width: 1
    },
    label: {
      padding: [0, 0, 2, 300],
      position: 'middle',
      color: '#052965'
    }
  }, {
    coord: [6, 0],
    // [ 0, 0],
    symbol: 'none'
  }]]
};
var segNoGapMarkline = {
  animation: false,
  silent: true,
  label: {
    show: true,
    position: 'middle',
    fontFamily: 'SharpGrotesk-Medium20',
    fontWeight: '500',
    fontSize: 11.52,
    padding: 2,
    formatter: function formatter(value) {
      return value.name;
    }
  },
  data: [[{
    name: 'no achievement gap',
    coord: [-0.3, 0],
    symbol: 'none',
    lineStyle: {
      color: '#052965',
      type: 'solid',
      width: 1
    },
    label: {
      padding: [0, 0, 2, 300],
      position: 'middle',
      color: '#052965'
    }
  }, {
    coord: [0.7, 0],
    // [ 0, 0],
    symbol: 'none'
  }]]
};
var zeroSegGapMarkline = {
  type: 'scatter',
  markLine: {
    animation: false,
    silent: true,
    data: [[{
      name: 'no segregation',
      coord: [0, -1],
      symbol: 'none',
      lineStyle: {
        color: '#052965',
        type: 'solid',
        width: 1
      },
      label: {
        padding: [0, 0, 2, 80],
        fontFamily: 'SharpGrotesk-Medium20',
        fontWeight: '500',
        position: 'middle',
        color: '#052965'
      }
    }, {
      coord: [0, 6],
      symbol: 'none'
    }]]
  }
};
var segMarkline = {
  type: 'scatter',
  markLine: {
    animation: false,
    silent: true,
    data: [[{
      name: '',
      coord: [6, 2.5],
      symbol: 'none',
      lineStyle: {
        color: '#052965',
        type: 'solid',
        width: 1
      }
    }, {
      coord: [-1, 2.25],
      symbol: 'none'
    }]]
  }
};
/**
 * Slice array according from beginning according to provided size.
 * @param Array arr
 * @param Number size
 */

function sliceLeast(arr, size) {
  return arr.slice(0, size - 1);
}
/**
 * Slice array from end according to provided size.
 * @param Array arr
 * @param Number size
 */


function sliceMost(arr, size) {
  return arr.slice(arr.length - 1 - (size - 1), arr.length - 1);
}
/**
 * Pulls the largest IDs from an object containing id: value pairs
 * @param {object} objData id: value pairs, (eg. { "010001": 4.5, "010002", 10, ...})
 * @param {number} num number of ids to return (e.g. 1)
 * @returns {array} array of ids with the largest values (e.g. [ "010002" ])
 */


function getLargestIds(objData, num) {
  return Object.keys(objData).sort(function (a, b) {
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
  data.forEach(function (el) {
    var index = segData.findIndex(function (row) {
      return row[0] === el[3];
    }); // console.log('have an index, it is ' + index);

    el[4] = segData[index][1]; // console.log(el)
  }); // Sort by seg stat

  returnArr = data.sort(function (a, b) {
    if (a[4] < b[4]) return -1;
    if (a[4] > b[4]) return 1;
    return 0;
  }); // console.log('Logging segSortedTop100.');
  // console.log(returnArr);

  return returnArr;
} //
// Fetch the additional segregation data for state 9.
//


var segCSV = 'https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/districts-wb_seg.csv';
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
      segData = json.data; // console.log('logging segregation data');
      // console.log(segData);
      // Trim off column headings and any blank rows

      segData = segData.filter(function (e) {
        return e[0] !== 'id';
      });
      segData = segData.filter(function (e) {
        return e[0] !== '';
      }); // console.log(data);
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

var state1 = function state1(scatterplot) {
  // this state is created from the base
  // Set up array of district IDs and names for building search series.
  if (Object.keys(names).length <= 0 && scatterplot && scatterplot.data && scatterplot.data.districts && scatterplot.data.districts.name) {
    names = scatterplot.data.districts.name; // console.log(names);
  }

  var base = scatterplot.getState('base');
  var dataSeries = [];
  var highlight = {};

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  }

  Title['text'] = 'White and Black Student Scores'; //Title['subtext'] = 'U.S. School Districts 2009-2016';

  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: {
      text: Title.text,
      // 'White and Black Students\' Average Performance',
      subtext: Title.subtext,
      // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -3,
      max: 3,
      name: 'Black Student Scores'
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Student Scores'
    },
    tooltip: {
      trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [initialMarkline, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  }; // Set title and subtitle

  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides]) //  baseOverrides

  };
};
/** State 2: Show white scores on x axis and black scores on y axis */


var state2 = function state2(scatterplot) {
  // this state is created from the base
  // Set up array of district IDs and names for building search series.
  if (Object.keys(names).length <= 0 && scatterplot && scatterplot.data && scatterplot.data.districts && scatterplot.data.districts.name) {
    names = scatterplot.data.districts.name; // console.log(names);
  }

  var base = scatterplot.getState('base');
  var dataSeries = [];
  var highlight = {};
  highlight['1201980'] = 'Walton County School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  }

  Title['text'] = 'White and Black Student Scores'; //Title['subtext'] = 'U.S. School Districts 2009-2016';

  Title.setTitle();
  var baseOverrides = {
    title: {
      text: Title.text,
      // 'White and Black Students\' Average Performance',
      subtext: Title.subtext,
      // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -3,
      max: 3,
      name: 'Black Student Scores'
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Student Scores'
    },
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [initialMarkline, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  }; // Set title and subtitle

  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides]) //  baseOverrides

  };
};

var state3top100 = {};
var state3series = {};
/** State 2: Highlight largest 25 districts  */

var state3 = function state3(scatterplot) {
  // state 2 is based on state 1
  var base = scatterplot.getState('state1');
  var dataSeries = scatterplot.getDataSeries();
  state3series = dataSeries;
  dataSeries['itemStyle'] = _extends(dataSeries['itemStyle'], {
    opacity: 1
  });
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100);
  state3top100 = top100;
  var highlight = {};

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'White and Black Student Scores';
  Title['subtext'] = '100 Largest Districts';
  Title.setTitle();
  var baseOverrides = {
    title: {
      subtext: Title.subtext // '100 Largest U.S. School Districts 2009-2016'

    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -3,
      max: 3,
      name: 'Black Student Scores'
    },
    xAxis: {
      min: -3,
      max: 4,
      name: 'White Student Scores'
    },
    series: [// dataSeries,
    {
      id: 'base'
    }, {
      type: 'scatter',
      data: top100,
      symbolSize: dataSeries.symbolSize,
      itemStyle: selectedItemStyle
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  }; // console.log(top100);

  return {
    selected: [],
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides]) // deepmerge(base.options, baseOverrides)

  };
};
/** State 4: Highlight locations (Detroit, Gwinet, Washington) */


var state4top100 = {};
var state4counter = 0;

var state4 = function state4(scatterplot) {
  var highlight = {}; //highlight['1302220'] = 'Forsyth County';

  highlight['1301230'] = 'Clayton County School District';
  highlight['1302550'] = 'Gwinnet County School District';
  highlight['1300120'] = 'Atlanta City School District'; //highlight['1201980'] = 'Walton County';
  // console.log(highlight);

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // console.log(highlight);


  var base = scatterplot.getState('base'); // var base = scatterplot.getState('state1');

  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = _extends(dataSeries['itemStyle'], {
    opacity: 0.5
  });
  var top100 = getLargestIds(scatterplot.data['districts']['all_sz'], 100);

  if (state4counter === 0) {
    state4top100 = top100;
  }

  state4counter++; // Plot title and subtitle

  Title['text'] = 'White and Black Student Scores';
  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: {
      text: Title.text,
      // 'White and Black Students\' Average Performance',
      subtext: Title.subtext,
      // 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
      show: false
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    grid: baseGrid,
    yAxis: deepmerge(baseYAxis, {
      min: -3,
      max: 3,
      name: 'Black Student Scores'
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -3,
      max: 4,
      name: 'White Student Scores'
    }),
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'selected',
      type: 'scatter',
      symbolSize: dataSeries.symbolSize,
      itemStyle: selectedItemStyle,
      z: 2 // tooltip: tooltip,

    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }, {
      type: 'scatter',
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
          formatter: function formatter(value) {
            return value.name;
          }
        },
        data: [[{
          name: '',
          // Y axis
          coord: [0, -3],
          symbol: 'none',
          lineStyle: {
            color: '#547892',
            type: 'solid',
            width: 0.5
          }
        }, {
          coord: [0, 3],
          symbol: 'none'
        }], [{
          name: '',
          // x axis
          coord: [-3, 0],
          symbol: 'none',
          lineStyle: {
            color: '#547892',
            type: 'solid',
            width: 0.5
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }], [{
          name: '',
          coord: [-2.5, -2.5],
          symbol: 'none',
          lineStyle: {
            color: 'rgba(5, 41, 101, 100%)',
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 3],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'w_avg',
    yVar: 'b_avg',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: state4top100,
    options: deepmerge.all([base.options, baseOverrides]) // deepmerge(base.options, baseOverrides)

  };
};
/** State 4: Load new variables to show White/Black SES Gap and Achievement Gap */


var state5 = function state5(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  var highlight = {};

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext,
      // 'US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    grid: {
      top: 10,
      bottom: 26,
      left: 10,
      right: 28,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: deepmerge(baseYAxis, {
      min: -1,
      // -6,
      max: 6,
      // 3, // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24,
      lineHeight: 48 // splitNumber: 7

    }),
    xAxis: deepmerge(baseXAxis, {
      min: -1,
      // -3,
      max: 6,
      // 7,
      name: 'White-Black Socioeconomic Inequality'
    }),
    tooltip: {
      trigger: 'item',
      transitionDuration: 0.6,
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [{
      type: 'scatter',
      markLine: noRacialDisparityMarkline
    }, {
      type: 'scatter',
      markLine: noGapMarkline
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  };
  return {
    selected: [],
    highlighted: Object.keys(highlight),
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([base.options, baseOverrides]) // deepmerge(base.options, baseOverrides)

  };
};
/** State 6: Highlight largest districts */


var state6 = function state6(scatterplot) {
  var options = scatterplot.component.getOption();
  var dataSeries = scatterplot.getDataSeries();
  var base = scatterplot.getState('state5');
  var highlight = {}; //highlight['1302220'] = 'Forsyth County';

  highlight['1301230'] = 'Clayton County';
  highlight['1302550'] = 'Gwinnet County';
  highlight['1300120'] = 'Atlanta City'; //highlight['1201980'] = 'Walton County';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext,
      // 'US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
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
      min: -1,
      // -6,
      max: 6,
      // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24
    }),
    xAxis: deepmerge(baseXAxis, {
      min: -1,
      // -3,
      max: 6,
      // 7,
      name: 'White-Black Socioeconomic Inequality'
    }),
    tooltip: {
      // trigger: 'item',
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [// { id: 'base' },
    {
      type: 'scatter',
      markLine: noRacialDisparityMarkline
    }, {
      type: 'scatter',
      markLine: noGapMarkline
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  };
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([base.options, baseOverrides]) // (base.options, baseOverrides)

  };
};
/** State 7: Gwinnett, DC, and Detroit school districts */


var state7 = function state7(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state6');
  var dataSeries = scatterplot.getDataSeries();
  dataSeries['itemStyle'] = _extends(dataSeries['itemStyle'], {
    opacity: 0.5
  });
  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100);
  var highlight = {};

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '100 Largest U.S. School Districts 2009-2016';
  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      subtext: Title.subtext // '100 Largest U.S. School Districts 2009-2016'

    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    tooltip: {
      // trigger: 'item',
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [// dataSeries,
    {
      type: 'scatter',
      data: top100,
      symbolSize: dataSeries.symbolSize,
      itemStyle: selectedItemStyle
    }, {
      type: 'scatter',
      markLine: noGapMarkline
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  };
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 8: Highlight districts around x=0 */


var state8 = function state8(scatterplot) {
  var options = scatterplot.component.getOption();
  var base = scatterplot.getState('state5'); // return options;

  var dataSeries = scatterplot.getDataSeries(); // dataSeries['itemStyle'] = Object.assign(dataSeries['itemStyle'], { opacity: 0.2 })
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
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016';
  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      subtext: Title.subtext // 'Districts with Lowest Socioeconomic Racial Disparity 2009-2016'

    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [dataSeries, {
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
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }, {
      type: 'scatter',
      markLine: noGapMarkline
    }]
  };
  return {
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};

var state9dataSeries = {};

var state9 = function state9(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  state9dataSeries = dataSeries;
  var highlight = {};
  highlight['1303930'] = 'Newton County';
  highlight['1302550'] = 'Gwinnet County School District';
  highlight['1201980'] = 'Walton County';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Affluence Gaps';
  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: _defineProperty({
      show: false,
      text: Title.text,
      // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext,
      // 'US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    }, "show", false),
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
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
      // -6,
      max: 6,
      // 0,
      name: 'White-Black Achievement Gap (in Grade Levels)',
      nameGap: 24
    }),
    xAxis: deepmerge(baseYAxis, {
      min: -1,
      // -3,
      max: 6,
      // 7,
      name: 'White-Black Socioeconomic Inequality'
    }),
    tooltip: {
      trigger: 'item',
      // borderColor: '#fff',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Inequality', 'White-Black Achievement Gap');
      }
    },
    series: [{
      type: 'scatter',
      markLine: noRacialDisparityMarkline
    }, {
      type: 'scatter',
      markLine: noGapMarkline
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }]
  };
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'wb_ses',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/* Highlight least and most segregated */


var state10 = function state10(scatterplot) {
  // console.log('loading state9');
  // this state is created from the base
  // const base = scatterplot.getState('state8');
  var base = scatterplot.getState('base'); // Build series most seg to highlight

  var dataSeries = state9dataSeries; // scatterplot.getDataSeries();

  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100);
  var segSortedTop100 = sortDataBySeg(top100);
  var leastSegregatedSeries = sliceLeast(segSortedTop100, 10);
  var mostSegregatedSeries = sliceMost(segSortedTop100, 10);
  var highlight = {}; // highlight['1201980'] = 'Walton County School District';

  highlight['1301230'] = 'Clayton County School District';
  highlight['1300120'] = 'Atlanta City School District'; // highlight['1303930'] = 'Newton County School District';

  highlight['1302550'] = 'Gwinnett County School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Segregation';
  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext,
      // 'Most and Least Segregated Out of\n100 Largest US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
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
      data: [{
        name: 'Least Segregated',
        icon: 'circle'
      }, {
        name: 'Most Segregated',
        icon: 'circle'
      }]
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
      // -6,
      max: 6,
      // 0,
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
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Segregation', 'White-Black Achievement Gap');
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }, {
      type: 'scatter',
      markLine: segNoGapMarkline
    }, zeroSegGapMarkline]
  };
  return {
    highlighted: Object.keys(highlight),
    xVar: 'wb_seg',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/* Highlight least and most segregated */


var state11 = function state11(scatterplot) {
  // console.log('loading state10');
  // this state is created from the base
  // const base = scatterplot.getState('state8');
  var base = scatterplot.getState('base'); // Build series most seg to highlight

  var dataSeries = state9dataSeries; // scatterplot.getDataSeries();

  var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100);
  var segSortedTop100 = sortDataBySeg(top100);
  var leastSegregatedSeries = sliceLeast(segSortedTop100, 10);
  var mostSegregatedSeries = sliceMost(segSortedTop100, 10);
  var highlight = {};
  highlight['0604740'] = 'Berkeley, CA';
  highlight['1714460'] = 'Evanston, IL';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]] && names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Plot title and subtitle


  Title['text'] = 'Achievement Gaps and Segregation';
  Title['subtext'] = '';
  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      // 'White-Black Achievement Gaps by Differences\nin Average Family Socioeconomic Resources',
      subtext: Title.subtext,
      // 'Most and Least Segregated Out of\n100 Largest US School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
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
      data: [{
        name: 'Least Segregated',
        icon: 'circle'
      }, {
        name: 'Most Segregated',
        icon: 'circle'
      }]
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
      // -6,
      max: 6,
      // 0,
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
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White-Black Socioeconomic Segregation', 'White-Black Achievement Gap');
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }, {
      type: 'scatter',
      markLine: segNoGapMarkline
    }, zeroSegGapMarkline]
  };
  return {
    highlighted: Object.keys(highlight),
    xVar: 'wb_seg',
    yVar: 'wb_avg',
    zVar: 'all_sz',
    onDataLoaded: function onDataLoaded() {
      console.log('data loaded');
      console.log(scatterplot.data);
    },
    options: deepmerge.all([base.options, baseOverrides])
  };
}; // create the component


var rootEl = document.getElementById('scatterplot');
var scatterplot = new Scatterplot(rootEl); // set the states

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NjYXR0ZXJwbG90L2FydGljbGUxLmpzIl0sIm5hbWVzIjpbImpRIiwialF1ZXJ5Iiwic2VnRGF0YSIsInNlYXJjaEl0ZW1JRHMiLCJuYW1lcyIsIlRpdGxlIiwiaHRtbCIsInRleHQiLCJzdWJ0ZXh0IiwiYXhpc0JsdWUiLCJhY3RpdmVIaWdobGlnaHQiLCJoaWdobGlnaHRlZExhYmVsIiwiaGlnaGxpZ2h0Iiwic2hvdyIsInBvc2l0aW9uIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJsaW5lSGVpZ2h0IiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsIm9wYWNpdHkiLCJjb2xvciIsImZvcm1hdHRlciIsIml0ZW0iLCJ2YWx1ZSIsImhpZ2hsaWdodGVkSXRlbVN0eWxlIiwic2hhZG93Qmx1ciIsInNoYWRvd0NvbG9yIiwic2hhZG93T2Zmc2V0WCIsInNoYWRvd09mZnNldFkiLCJzZWxlY3RlZEl0ZW1TdHlsZSIsImluaXRpYWxNYXJrbGluZSIsInR5cGUiLCJtYXJrTGluZSIsImFuaW1hdGlvbiIsInNpbGVudCIsImxhYmVsIiwibmFtZSIsImRhdGEiLCJjb29yZCIsInN5bWJvbCIsImxpbmVTdHlsZSIsIndpZHRoIiwiYmFzZUdyaWQiLCJ0b3AiLCJib3R0b20iLCJsZWZ0IiwicmlnaHQiLCJ6bGV2ZWwiLCJoZWlnaHQiLCJjb250YWluTGFiZWwiLCJiYXNlWUF4aXMiLCJzcGxpdExpbmUiLCJuYW1lR2FwIiwibmFtZVRleHRTdHlsZSIsImJhc2VYQXhpcyIsInZlcnRpY2FsQWxpZ24iLCJub1JhY2lhbERpc3Bhcml0eU1hcmtsaW5lIiwibm9HYXBNYXJrbGluZSIsInNlZ05vR2FwTWFya2xpbmUiLCJ6ZXJvU2VnR2FwTWFya2xpbmUiLCJzZWdNYXJrbGluZSIsInNsaWNlTGVhc3QiLCJhcnIiLCJzaXplIiwic2xpY2UiLCJzbGljZU1vc3QiLCJsZW5ndGgiLCJnZXRMYXJnZXN0SWRzIiwib2JqRGF0YSIsIm51bSIsIk9iamVjdCIsImtleXMiLCJzb3J0IiwiYSIsImIiLCJzb3J0RGF0YUJ5U2VnIiwiZm9yRWFjaCIsImVsIiwiaW5kZXgiLCJmaW5kSW5kZXgiLCJyb3ciLCJyZXR1cm5BcnIiLCJzZWdDU1YiLCJ4aHIiLCJYTUxIdHRwUmVxdWVzdCIsIm9wZW4iLCJvbmxvYWQiLCJlIiwicmVhZHlTdGF0ZSIsInN0YXR1cyIsImNzdlJlc3BvbnNlIiwicmVzcG9uc2VUZXh0IiwianNvbiIsIlBhcGEiLCJwYXJzZSIsImZpbHRlciIsImNvbnNvbGUiLCJlcnJvciIsInN0YXR1c1RleHQiLCJvbmVycm9yIiwic2VuZCIsInN0YXRlMSIsInNjYXR0ZXJwbG90IiwiZGlzdHJpY3RzIiwiYmFzZSIsImdldFN0YXRlIiwiZGF0YVNlcmllcyIsInNldFRpdGxlIiwiYmFzZU92ZXJyaWRlcyIsInRpdGxlIiwidGV4dEFsaWduIiwiYXJpYSIsImRlc2NyaXB0aW9uIiwieUF4aXMiLCJtaW4iLCJtYXgiLCJ4QXhpcyIsInRvb2x0aXAiLCJ0cmlnZ2VyIiwiZm9ybWF0VG9vbHRpcCIsInNlcmllcyIsImlkIiwiaXRlbVN0eWxlIiwieFZhciIsInlWYXIiLCJ6VmFyIiwiaGlnaGxpZ2h0ZWQiLCJvcHRpb25zIiwiZGVlcG1lcmdlIiwiYWxsIiwic3RhdGUyIiwic3RhdGUzdG9wMTAwIiwic3RhdGUzc2VyaWVzIiwic3RhdGUzIiwiZ2V0RGF0YVNlcmllcyIsInRvcDEwMCIsImdldFNlcmllc0RhdGFCeVNpemUiLCJzeW1ib2xTaXplIiwic2VsZWN0ZWQiLCJzdGF0ZTR0b3AxMDAiLCJzdGF0ZTRjb3VudGVyIiwic3RhdGU0IiwiZ3JpZCIsInoiLCJzdGF0ZTUiLCJjb21wb25lbnQiLCJnZXRPcHRpb24iLCJ0cmFuc2l0aW9uRHVyYXRpb24iLCJzdGF0ZTYiLCJzdGF0ZTciLCJzdGF0ZTgiLCJyYW5nZSIsIm5lYXJaZXJvIiwiZ2V0U2VyaWVzRGF0YUluUmFuZ2UiLCJzdGF0ZTlkYXRhU2VyaWVzIiwic3RhdGU5Iiwic3RhdGUxMCIsInNlZ1NvcnRlZFRvcDEwMCIsImxlYXN0U2VncmVnYXRlZFNlcmllcyIsIm1vc3RTZWdyZWdhdGVkU2VyaWVzIiwibGVnZW5kIiwib3JpZW50IiwidGV4dFN0eWxlIiwiaWNvbiIsImludGVydmFsIiwic2NhbGUiLCJzdGF0ZTExIiwib25EYXRhTG9hZGVkIiwibG9nIiwicm9vdEVsIiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsIlNjYXR0ZXJwbG90IiwiYWRkU3RhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7O0FBTUEsSUFBTUEsRUFBRSxHQUFHQyxNQUFYLEMsQ0FFQTs7QUFDQSxJQUFJQyxPQUFPLEdBQUcsRUFBZDtBQUNBLElBQUlDLGFBQWEsR0FBRyxFQUFwQjtBQUNBLElBQUlDLEtBQUssR0FBRyxFQUFaO0FBQ0EsSUFBSUMsS0FBSyxHQUFHLEVBQVo7QUFDQUEsS0FBSyxDQUFDLE1BQUQsQ0FBTCxHQUFnQixFQUFoQjtBQUNBQSxLQUFLLENBQUMsU0FBRCxDQUFMLEdBQW1CLEVBQW5COztBQUNBQSxLQUFLLENBQUMsVUFBRCxDQUFMLEdBQW9CLFlBQVc7QUFDN0I7QUFDQUwsRUFBQUEsRUFBRSxDQUFDLDRCQUFELENBQUYsQ0FBaUNNLElBQWpDLENBQXNDRCxLQUFLLENBQUNFLElBQTVDO0FBQ0FQLEVBQUFBLEVBQUUsQ0FBQywrQkFBRCxDQUFGLENBQW9DTSxJQUFwQyxDQUF5Q0QsS0FBSyxDQUFDRyxPQUEvQztBQUNELENBSkQ7O0FBTUEsSUFBTUMsUUFBUSxHQUFHLFNBQWpCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLEVBQXRCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsU0FBRCxFQUFlO0FBQ3RDO0FBQ0FGLEVBQUFBLGVBQWUsR0FBR0UsU0FBbEI7QUFDQSxTQUFPO0FBQ0xDLElBQUFBLElBQUksRUFBRSxJQUREO0FBRUxDLElBQUFBLFFBQVEsRUFB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RUFBZ0NqQixPQUFoQztBQUNBdEQsV0FBVyxDQUFDdUUsUUFBWixDQUFxQixTQUFyQixFQUFnQ1AsT0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIHNjYXR0ZXJwbG90IHN0YXRlcyBmb3IgYXJ0aWNsZSBvbmUsXG4gKiBQYXR0ZXJucyBvZiBSYWNpYWwvRXRobmljIE9wcG9ydHVuaXR5IEdhcHNcbiAqIC0gYXJ0aWNsZSBzdG9yeWJvYXJkOiBodHRwczovL2RvY3MuZ29vZ2xlLmNvbS9kb2N1bWVudC9kLzFhZHowQ3dYSThXS29rOGVQVlFFY1NtbFJRd1JJakthS3ZkOEFtNk9GZmhZL2VkaXRcbiAqL1xuXG5jb25zdCBqUSA9IGpRdWVyeTtcblxuLy8gUGxhY2Vob2xkZXJzIGZvciBzZWdyZWdhdGlvbiBzZXJpZXMgb3BlcmF0aW9uc1xubGV0IHNlZ0RhdGEgPSBbXTtcbmxldCBzZWFyY2hJdGVtSURzID0gW107XG5sZXQgbmFtZXMgPSBbXTtcbmxldCBUaXRsZSA9IHt9O1xuVGl0bGVbJ3RleHQnXSA9ICcnO1xuVGl0bGVbJ3N1YnRleHQnXSA9ICcnO1xuVGl0bGVbJ3NldFRpdGxlJ10gPSBmdW5jdGlvbigpIHtcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBqUSgnLmNvbHVtbi1zY2F0dGVycGxvdCAudGl0bGUnKS5odG1sKFRpdGxlLnRleHQpO1xuICBqUSgnLmNvbHVtbi1zY2F0dGVycGxvdCAuc3VidGl0bGUnKS5odG1sKFRpdGxlLnN1YnRleHQpO1xufVxuXG5jb25zdCBheGlzQmx1ZSA9ICcjNTQ3ODkyJztcbmxldCBhY3RpdmVIaWdobGlnaHQgPSB7fTtcbmNvbnN0IGhpZ2hsaWdodGVkTGFiZWwgPSAoaGlnaGxpZ2h0KSA9PiB7XG4gIC8vIGNvbnNvbGUubG9nKCdoaWdobGlnaHRlZExhYmVsJyk7XG4gIGFjdGl2ZUhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbiAgcmV0dXJuIHtcbiAgICBzaG93OiB0cnVlLFxuICAgIHBvc2l0aW9uOiAndG9wJyxcbiAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCknLCAvLyAnI0ZGRkNDRicsXG4gICAgYm9yZGVyQ29sb3I6ICcjN0QzOEJCJyxcbiAgICBib3JkZXJXaWR0aDogMCxcbiAgICBmb250U2l6ZTogMTIsXG4gICAgZm9udFdlaWdodDogNTAwLFxuICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLCAvLyAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgIGxpbmVIZWlnaHQ6IDEyLFxuICAgIHBhZGRpbmc6IFs1LCA1XSxcbiAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgb3BhY2l0eTogMSxcbiAgICBjb2xvcjogJ3JnYmEoMjUsIDI1LCAyNSwgMC45MSknLCAvLyAnIzA1Mjk2NScsXG4gICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUhpZ2hsaWdodCk7XG4gICAgICByZXR1cm4gYWN0aXZlSGlnaGxpZ2h0W2l0ZW0udmFsdWVbM11dXG4gICAgfSxcbiAgfTtcbn1cbi8vIGNvbnN0IHN0YXRlOUhpZ2hsaWdodGVkTGFiZWwgPSAoaGlnaGxpZ2h0KSA9PiB7XG4vLyAgIC8vIGNvbnNvbGUubG9nKCdoaWdobGlnaHRlZExhYmVsJyk7XG4vLyAgIGFjdGl2ZUhpZ2hsaWdodCA9IGhpZ2hsaWdodDtcbi8vICAgY29uc29sZS5sb2coYWN0aXZlSGlnaGxpZ2h0KTtcbi8vICAgcmV0dXJuIHtcbi8vICAgICBzaG93OiB0cnVlLFxuLy8gICAgIHBvc2l0aW9uOiAndG9wJyxcbi8vICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd0cmFuc3BhcmVudCcsIC8vICcjMDA5MEZGJywgLy8gJyNGRkZDQ0YnLFxuLy8gICAgIGJvcmRlckNvbG9yOiAndHJhbnNwYXJlbnQnLCAvLyAnIzdEMzhCQicsXG4vLyAgICAgYm9yZGVyV2lkdGg6IDAsXG4vLyAgICAgZm9udFNpemU6IDEyLFxuLy8gICAgIGZvbnRXZWlnaHQ6IDUwMCxcbi8vICAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJywgLy8gJ01haXNvbk5ldWUtTWVkaXVtJyxcbi8vICAgICBsaW5lSGVpZ2h0OiAxMixcbi8vICAgICBwYWRkaW5nOiBbOCwgOF0sXG4vLyAgICAgYm9yZGVyUmFkaXVzOiAzLFxuLy8gICAgIG9wYWNpdHk6IDEsXG4vLyAgICAgY29sb3I6ICcjMDMxMjMyJywgLy8gJyNmZmYnLCAvLyAnIzA1Mjk2NScsXG4vLyAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4vLyAgICAgICAvLyBjb25zb2xlLmxvZyhpdGVtKTtcbi8vICAgICAgIC8vIGNvbnNvbGUubG9nKGFjdGl2ZUhpZ2hsaWdodCk7XG4vLyAgICAgICByZXR1cm4gYWN0aXZlSGlnaGxpZ2h0W2l0ZW0udmFsdWVbM11dXG4vLyAgICAgfSxcbi8vICAgfTtcbi8vIH1cbi8vIE9yYW5nZSBidWJibGVzXG5jb25zdCBoaWdobGlnaHRlZEl0ZW1TdHlsZSA9ICB7XG4gIGJvcmRlcldpZHRoOiAwLjQsXG4gIGJvcmRlckNvbG9yOiAnI0JBQkFCQScsIC8vICcjRkZDMDJEJyxcbiAgY29sb3I6ICdyZ2JhKDI1NSwgMTc4LCAwLCAwLjc3KScsIC8vICcjRkZGQ0REJyxcbiAgb3BhY2l0eTogMSxcbiAgc2hhZG93Qmx1cjogMixcbiAgc2hhZG93Q29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuMSknLFxuICBzaGFkb3dPZmZzZXRYOiAwLFxuICBzaGFkb3dPZmZzZXRZOiAxXG59O1xuLy8gQmx1ZSBidWJibGVzXG5jb25zdCBzZWxlY3RlZEl0ZW1TdHlsZSA9IHtcbiAgYm9yZGVyV2lkdGg6IDAuNCxcbiAgYm9yZGVyQ29sb3I6ICdyZ2JhKDg5LCAxNTEsIDIwMywgMC44KScsIC8vICcjN0QzOEJCJyxcbiAgY29sb3I6ICcjNDhDQjk1JywgLy8gJyNCQzcyRkYnLFxuICBjb2xvcjogJ3JnYmEoMTc3LCAyMjIsIDIzOCwgMC44KScsXG4gIG9wYWNpdHk6IDEsXG59O1xuY29uc3QgaW5pdGlhbE1hcmtsaW5lID0ge1xuICB0eXBlOidzY2F0dGVyJyxcbiAgbWFya0xpbmU6IHtcbiAgICBhbmltYXRpb246IGZhbHNlLFxuICAgIHNpbGVudDogdHJ1ZSxcbiAgICBsYWJlbDoge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICBmb250U2l6ZTogMTEuNTIsXG4gICAgICBwYWRkaW5nOiA0LFxuICAgICAgY29sb3I6ICdyZ2JhKDUsIDQxLCAxMDEsIDEwMCUpJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlLm5hbWVcbiAgICAgIH1cbiAgICB9LFxuICAgIGRhdGE6IFtcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICcnLCAvLyBZIGF4aXNcbiAgICAgICAgICBjb29yZDogWzAsIC0zXSxcbiAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgIGNvbG9yOiAnIzU0Nzg5MicsXG4gICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgd2lkdGg6IDAuNSxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjb29yZDogWyAwLCAgM10sXG4gICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgICAgW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJycsIC8vIHggYXhpc1xuICAgICAgICAgIGNvb3JkOiBbLTMsIDBdLFxuICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6ICcjNTQ3ODkyJyxcbiAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICB3aWR0aDogMC41LFxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGNvb3JkOiBbMywgMF0sXG4gICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnd2hpdGUgc2NvcmVzID0gYmxhY2sgc2NvcmVzJyxcbiAgICAgICAgY29vcmQ6IFstMi41LCAtMi41XSxcbiAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgIGNvbG9yOiAncmdiYSg1LCA0MSwgMTAxLCAxMDAlKScsXG4gICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHsgY29vcmQ6IFsgMywgIDNdLCBzeW1ib2w6ICdub25lJyB9LFxuICAgIF0sXG4gIF1cbiAgfVxufTtcbmNvbnN0IGJhc2VHcmlkID0ge1xuICB0b3A6IDEwLFxuICBib3R0b206IDI2LFxuICBsZWZ0OiAxMCxcbiAgcmlnaHQ6IDI2LFxuICB6bGV2ZWw6IDEwMCxcbiAgaGVpZ2h0OiAnYXV0bycsLy8gMjgwLFxuICB3aWR0aDogJ2F1dG8nLCAvLyAnYXV0bycsXG4gIGNvbnRhaW5MYWJlbDogdHJ1ZVxufTtcbmNvbnN0IGJhc2VZQXhpcyA9IHtcbiAgcG9zaXRpb246ICdyaWdodCcsXG4gIHNwbGl0TGluZToge1xuICAgIHNob3c6IGZhbHNlLFxuICB9LFxuICBuYW1lR2FwOiAyNixcbiAgbmFtZVRleHRTdHlsZToge1xuICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgIGNvbG9yOiBheGlzQmx1ZSxcbiAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICBmb250U2l6ZTogMTFcbiAgfSxcbiAgemxldmVsOiAxMDEsXG59O1xuY29uc3QgYmFzZVhBeGlzID0ge1xuICBuYW1lR2FwOiAyNixcbiAgbmFtZVRleHRTdHlsZToge1xuICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgIGNvbG9yOiBheGlzQmx1ZSxcbiAgICBmb250U2l6ZTogMTEsXG4gICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgdmVydGljYWxBbGlnbjogJ2JvdHRvbSdcbiAgfSxcbiAgemxldmVsOiAxMDIsXG59O1xuY29uc3Qgbm9SYWNpYWxEaXNwYXJpdHlNYXJrbGluZSA9IHtcbiAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgc2lsZW50OiB0cnVlLFxuICBsYWJlbDoge1xuICAgIHNob3c6IHRydWUsXG4gICAgcG9zaXRpb246ICdtaWRkbGUnLFxuICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgIGZvbnRTaXplOiAxMS41MixcbiAgICBwYWRkaW5nOiA0LFxuICAgIGZvcm1hdHRlcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHJldHVybiB2YWx1ZS5uYW1lXG4gICAgfVxuICB9LFxuICBkYXRhOiBbXG4gICAgW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnbm8gcmFjaWFsIGluZXF1YWxpdHknLFxuICAgICAgICBjb29yZDogIFswLCAtMV0sIC8vIFswLCAtNl0sXG4gICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgd2lkdGg6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgcGFkZGluZzogNCxcbiAgICAgICAgICBwb3NpdGlvbjogJ21pZGRsZScsXG4gICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6ICBbMCwgNl0sIC8vIFsgMCwgMF0sXG4gICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICB9LFxuICAgIF1cbiAgXVxufTtcbmNvbnN0IG5vR2FwTWFya2xpbmUgPSB7XG4gIGFuaW1hdGlvbjogZmFsc2UsXG4gIHNpbGVudDogdHJ1ZSxcbiAgbGFiZWw6IHtcbiAgICBzaG93OiB0cnVlLFxuICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICBmb250U2l6ZTogMTEuNTIsXG4gICAgcGFkZGluZzogMixcbiAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUubmFtZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogW1xuICAgIFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ25vIGFjaGlldmVtZW50IGdhcCcsXG4gICAgICAgIGNvb3JkOiAgWy0xLCAwXSxcbiAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBwYWRkaW5nOiBbMCwgMCwgMiwgMzAwXSxcbiAgICAgICAgICBwb3NpdGlvbjogJ21pZGRsZScsXG4gICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgY29vcmQ6ICBbNiwgMF0sIC8vIFsgMCwgMF0sXG4gICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICB9LFxuICAgIF1cbiAgXVxufTtcbmNvbnN0IHNlZ05vR2FwTWFya2xpbmUgPSB7XG4gIGFuaW1hdGlvbjogZmFsc2UsXG4gIHNpbGVudDogdHJ1ZSxcbiAgbGFiZWw6IHtcbiAgICBzaG93OiB0cnVlLFxuICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyxcbiAgICBmb250V2VpZ2h0OiAnNTAwJyxcbiAgICBmb250U2l6ZTogMTEuNTIsXG4gICAgcGFkZGluZzogMixcbiAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gdmFsdWUubmFtZVxuICAgIH1cbiAgfSxcbiAgZGF0YTogW1xuICAgIFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ25vIGFjaGlldmVtZW50IGdhcCcsXG4gICAgICAgIGNvb3JkOiAgWy0wLjMsIDBdLFxuICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICB9LFxuICAgICAgICBsYWJlbDoge1xuICAgICAgICAgIHBhZGRpbmc6IFswLCAwLCAyLCAzMDBdLFxuICAgICAgICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBjb29yZDogIFswLjcsIDBdLCAvLyBbIDAsIDBdLFxuICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgfSxcbiAgICBdXG4gIF1cbn07XG5jb25zdCB6ZXJvU2VnR2FwTWFya2xpbmUgPSB7XG4gIHR5cGU6J3NjYXR0ZXInLFxuICBtYXJrTGluZToge1xuICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgc2lsZW50OiB0cnVlLFxuICAgIGRhdGE6IFtcbiAgICAgIFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdubyBzZWdyZWdhdGlvbicsXG4gICAgICAgICAgY29vcmQ6IFswLCAtMV0sXG4gICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgIHdpZHRoOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHBhZGRpbmc6IFswLCAwLCAyLCA4MF0sXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyxcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICAgICAgcG9zaXRpb246ICdtaWRkbGUnLFxuICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBjb29yZDogWzAsIDZdLFxuICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgXVxuICB9XG59O1xuXG5jb25zdCBzZWdNYXJrbGluZSA9IHtcbiAgdHlwZTonc2NhdHRlcicsXG4gIG1hcmtMaW5lOiB7XG4gICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICBzaWxlbnQ6IHRydWUsXG4gICAgZGF0YTogW1xuICAgICAgW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgY29vcmQ6IFs2LCAyLjVdLFxuICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgY29vcmQ6IFstMSwgMi4yNV0sXG4gICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgfSxcbiAgICAgIF1cbiAgICBdXG4gIH1cbn07XG5cbi8qKlxuICogU2xpY2UgYXJyYXkgYWNjb3JkaW5nIGZyb20gYmVnaW5uaW5nIGFjY29yZGluZyB0byBwcm92aWRlZCBzaXplLlxuICogQHBhcmFtIEFycmF5IGFyclxuICogQHBhcmFtIE51bWJlciBzaXplXG4gKi9cbmZ1bmN0aW9uIHNsaWNlTGVhc3QoYXJyLCBzaXplKSB7XG4gIHJldHVybiBhcnIuc2xpY2UoMCwgc2l6ZSAtIDEpXG59XG5cbi8qKlxuICogU2xpY2UgYXJyYXkgZnJvbSBlbmQgYWNjb3JkaW5nIHRvIHByb3ZpZGVkIHNpemUuXG4gKiBAcGFyYW0gQXJyYXkgYXJyXG4gKiBAcGFyYW0gTnVtYmVyIHNpemVcbiAqL1xuZnVuY3Rpb24gc2xpY2VNb3N0KGFyciwgc2l6ZSkge1xuICByZXR1cm4gYXJyLnNsaWNlKChhcnIubGVuZ3RoIC0gMSkgLSAoc2l6ZS0xKSwgKGFyci5sZW5ndGggLSAxKSlcbn1cblxuLyoqXG4gKiBQdWxscyB0aGUgbGFyZ2VzdCBJRHMgZnJvbSBhbiBvYmplY3QgY29udGFpbmluZyBpZDogdmFsdWUgcGFpcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvYmpEYXRhIGlkOiB2YWx1ZSBwYWlycywgKGVnLiB7IFwiMDEwMDAxXCI6IDQuNSwgXCIwMTAwMDJcIiwgMTAsIC4uLn0pXG4gKiBAcGFyYW0ge251bWJlcn0gbnVtIG51bWJlciBvZiBpZHMgdG8gcmV0dXJuIChlLmcuIDEpXG4gKiBAcmV0dXJucyB7YXJyYXl9IGFycmF5IG9mIGlkcyB3aXRoIHRoZSBsYXJnZXN0IHZhbHVlcyAoZS5nLiBbIFwiMDEwMDAyXCIgXSlcbiAqL1xuZnVuY3Rpb24gZ2V0TGFyZ2VzdElkcyhvYmpEYXRhLCBudW0pIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKG9iakRhdGEpLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgIHJldHVybiBvYmpEYXRhW2JdIC0gb2JqRGF0YVthXTtcbiAgfSkuc2xpY2UoMCwgbnVtKTtcbn1cblxuLyoqXG4gKiBTb3J0IHByb3ZpZGVkIGFycmF5IGJ5IHNlZ3JlZ2F0aW9uIHN0YXRzXG4gKiBAcGFyYW0gQXJyYXkgZGF0YVxuICogQHJldHVybnMgQXJyYXkgcmV0dXJuQXJyXG4gKi9cbmZ1bmN0aW9uIHNvcnREYXRhQnlTZWcoZGF0YSkge1xuICAvLyBjb25zb2xlLmxvZygnc29ydERhdGFCeVNlZygpJyk7XG4gIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAvLyBMb29wIHRocm91Z2ggdGhlIGRhdGEuXG4gIC8vIExvY2F0ZSByb3cgdXNpbmcgSUQuXG4gIC8vIEFkZCBzZWcgc3RhdCB0byBlYWNoIHJvdy5cbiAgZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIGluZGV4ID0gc2VnRGF0YS5maW5kSW5kZXgocm93ID0+IHJvd1swXSA9PT0gZWxbM10pO1xuICAgIC8vIGNvbnNvbGUubG9nKCdoYXZlIGFuIGluZGV4LCBpdCBpcyAnICsgaW5kZXgpO1xuICAgIGVsWzRdID0gc2VnRGF0YVtpbmRleF1bMV07XG4gICAgLy8gY29uc29sZS5sb2coZWwpXG4gIH0pO1xuICAvLyBTb3J0IGJ5IHNlZyBzdGF0XG4gIHJldHVybkFyciA9IGRhdGEuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgaWYgKCBhWzRdIDwgYls0XSApXG4gICAgICAgIHJldHVybiAtMTtcbiAgICBpZiAoIGFbNF0gPiBiWzRdIClcbiAgICAgICAgcmV0dXJuIDE7XG4gICAgcmV0dXJuIDA7XG4gIH0pO1xuICAvLyBjb25zb2xlLmxvZygnTG9nZ2luZyBzZWdTb3J0ZWRUb3AxMDAuJyk7XG4gIC8vIGNvbnNvbGUubG9nKHJldHVybkFycik7XG4gIHJldHVybiByZXR1cm5BcnI7XG59XG5cbi8vXG4vLyBGZXRjaCB0aGUgYWRkaXRpb25hbCBzZWdyZWdhdGlvbiBkYXRhIGZvciBzdGF0ZSA5LlxuLy9cbmNvbnN0IHNlZ0NTViA9ICdodHRwczovL2QyZnlwZWI2Zjk3NHIxLmNsb3VkZnJvbnQubmV0L2Rldi9zY2F0dGVycGxvdC9kaXN0cmljdHMtd2Jfc2VnLmNzdic7XG52YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG54aHIub3BlbihcIkdFVFwiLCBzZWdDU1YsIHRydWUpO1xueGhyLm9ubG9hZCA9IGZ1bmN0aW9uIChlKSB7XG4gIGlmICh4aHIucmVhZHlTdGF0ZSA9PT0gNCkge1xuICAgIGlmICh4aHIuc3RhdHVzID09PSAyMDApIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHhoci5yZXNwb25zZVRleHQpO1xuICAgICAgLy8gY29uc29sZS5sb2coJ1NlZyBkYXRhIHJlcXVlc3QgZmluaXNoZWQuJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyh0aGlzLnJlc3BvbnNlVGV4dCk7XG4gICAgICB2YXIgY3N2UmVzcG9uc2UgPSB0aGlzLnJlc3BvbnNlVGV4dDtcbiAgICAgIHZhciBqc29uID0gUGFwYS5wYXJzZShjc3ZSZXNwb25zZSk7XG4gICAgICBzZWdEYXRhID0ganNvbi5kYXRhO1xuICAgICAgLy8gY29uc29sZS5sb2coJ2xvZ2dpbmcgc2VncmVnYXRpb24gZGF0YScpO1xuICAgICAgLy8gY29uc29sZS5sb2coc2VnRGF0YSk7XG4gICAgICAvLyBUcmltIG9mZiBjb2x1bW4gaGVhZGluZ3MgYW5kIGFueSBibGFuayByb3dzXG4gICAgICBzZWdEYXRhID0gc2VnRGF0YS5maWx0ZXIoZnVuY3Rpb24oZSkgeyByZXR1cm4gZVswXSAhPT0gJ2lkJyB9KTtcbiAgICAgIHNlZ0RhdGEgPSBzZWdEYXRhLmZpbHRlcihmdW5jdGlvbihlKSB7IHJldHVybiBlWzBdICE9PSAnJyB9KTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zb2xlLmVycm9yKHhoci5zdGF0dXNUZXh0KTtcbiAgICB9XG4gIH1cbn07XG54aHIub25lcnJvciA9IGZ1bmN0aW9uIChlKSB7XG4gIGNvbnNvbGUuZXJyb3IoeGhyLnN0YXR1c1RleHQpO1xufTtcbnhoci5zZW5kKG51bGwpO1xuXG4vKiogU3RhdGUgMTogU2hvdyB3aGl0ZSBzY29yZXMgb24geCBheGlzIGFuZCBibGFjayBzY29yZXMgb24geSBheGlzICovXG52YXIgc3RhdGUxID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gdGhpcyBzdGF0ZSBpcyBjcmVhdGVkIGZyb20gdGhlIGJhc2VcbiAgLy8gU2V0IHVwIGFycmF5IG9mIGRpc3RyaWN0IElEcyBhbmQgbmFtZXMgZm9yIGJ1aWxkaW5nIHNlYXJjaCBzZXJpZXMuXG4gIGlmIChPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoIDw9IDAgJiZcbiAgICBzY2F0dGVycGxvdCAmJlxuICAgIHNjYXR0ZXJwbG90LmRhdGEgJiZcbiAgICBzY2F0dGVycGxvdC5kYXRhLmRpc3RyaWN0cyAmJlxuICAgIHNjYXR0ZXJwbG90LmRhdGEuZGlzdHJpY3RzLm5hbWUpIHtcbiAgICBuYW1lcyA9IHNjYXR0ZXJwbG90LmRhdGEuZGlzdHJpY3RzLm5hbWU7XG4gICAgLy8gY29uc29sZS5sb2cobmFtZXMpO1xuICB9XG5cbiAgdmFyIGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgZGF0YVNlcmllcyA9IFtdO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuXG4gIFRpdGxlWyd0ZXh0J10gPSAnV2hpdGUgYW5kIEJsYWNrIFN0dWRlbnQgU2NvcmVzJztcbiAgLy9UaXRsZVsnc3VidGV4dCddID0gJ1UuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTYnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7XG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgdGV4dDogVGl0bGUudGV4dCwgLy8gJ1doaXRlIGFuZCBCbGFjayBTdHVkZW50c1xcJyBBdmVyYWdlIFBlcmZvcm1hbmNlJyxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsIC8vICdVLlMuIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOi0zLFxuICAgICAgbWF4OjMsXG4gICAgICBuYW1lOiAnQmxhY2sgU3R1ZGVudCBTY29yZXMnLFxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTMsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnV2hpdGUgU3R1ZGVudCBTY29yZXMnLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdXaGl0ZSBTdHVkZW50IFNjb3JlcycsICdCbGFjayBTdHVkZW50IFNjb3JlcycpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICBpbml0aWFsTWFya2xpbmUsXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgIH1cbiAgICBdXG4gIH1cbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBqUSgnLmNvbHVtbi1zY2F0dGVycGxvdCAudGl0bGUnKS50ZXh0KFRpdGxlLnRleHQpO1xuICBqUSgnLmNvbHVtbi1zY2F0dGVycGxvdCAuc3VidGl0bGUnKS50ZXh0KFRpdGxlLnN1YnRleHQpO1xuICByZXR1cm4ge1xuICAgIHhWYXI6ICd3X2F2ZycsXG4gICAgeVZhcjogJ2JfYXZnJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pIC8vICBiYXNlT3ZlcnJpZGVzXG4gIH1cbn1cblxuLyoqIFN0YXRlIDI6IFNob3cgd2hpdGUgc2NvcmVzIG9uIHggYXhpcyBhbmQgYmxhY2sgc2NvcmVzIG9uIHkgYXhpcyAqL1xudmFyIHN0YXRlMiA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIC8vIFNldCB1cCBhcnJheSBvZiBkaXN0cmljdCBJRHMgYW5kIG5hbWVzIGZvciBidWlsZGluZyBzZWFyY2ggc2VyaWVzLlxuICBpZiAoT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA8PSAwICYmXG4gICAgc2NhdHRlcnBsb3QgJiZcbiAgICBzY2F0dGVycGxvdC5kYXRhICYmXG4gICAgc2NhdHRlcnBsb3QuZGF0YS5kaXN0cmljdHMgJiZcbiAgICBzY2F0dGVycGxvdC5kYXRhLmRpc3RyaWN0cy5uYW1lKSB7XG4gICAgbmFtZXMgPSBzY2F0dGVycGxvdC5kYXRhLmRpc3RyaWN0cy5uYW1lO1xuICAgIC8vIGNvbnNvbGUubG9nKG5hbWVzKTtcbiAgfVxuXG4gIHZhciBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGRhdGFTZXJpZXMgPSBbXTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzEyMDE5ODAnXSA9ICdXYWx0b24gQ291bnR5IFNjaG9vbCBEaXN0cmljdCc7XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuXG4gIFRpdGxlWyd0ZXh0J10gPSAnV2hpdGUgYW5kIEJsYWNrIFN0dWRlbnQgU2NvcmVzJztcbiAgLy9UaXRsZVsnc3VidGV4dCddID0gJ1UuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTYnO1xuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsIC8vICdXaGl0ZSBhbmQgQmxhY2sgU3R1ZGVudHNcXCcgQXZlcmFnZSBQZXJmb3JtYW5jZScsXG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LCAvLyAnVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNicsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjotMyxcbiAgICAgIG1heDozLFxuICAgICAgbmFtZTogJ0JsYWNrIFN0dWRlbnQgU2NvcmVzJyxcbiAgICB9LFxuICAgIHhBeGlzOiB7XG4gICAgICBtaW46IC0zLFxuICAgICAgbWF4OiA0LFxuICAgICAgbmFtZTogJ1doaXRlIFN0dWRlbnQgU2NvcmVzJyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIC8vIGJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1doaXRlIFN0dWRlbnQgU2NvcmVzJywgJ0JsYWNrIFN0dWRlbnQgU2NvcmVzJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIGluaXRpYWxNYXJrbGluZSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfVxuICAgIF1cbiAgfVxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIGpRKCcuY29sdW1uLXNjYXR0ZXJwbG90IC50aXRsZScpLnRleHQoVGl0bGUudGV4dCk7XG4gIGpRKCcuY29sdW1uLXNjYXR0ZXJwbG90IC5zdWJ0aXRsZScpLnRleHQoVGl0bGUuc3VidGV4dCk7XG4gIHJldHVybiB7XG4gICAgeFZhcjogJ3dfYXZnJyxcbiAgICB5VmFyOiAnYl9hdmcnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSkgLy8gIGJhc2VPdmVycmlkZXNcbiAgfVxufVxuXG5sZXQgc3RhdGUzdG9wMTAwID0ge307XG5sZXQgc3RhdGUzc2VyaWVzID0ge307XG4vKiogU3RhdGUgMjogSGlnaGxpZ2h0IGxhcmdlc3QgMjUgZGlzdHJpY3RzICAqL1xudmFyIHN0YXRlMyA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIHN0YXRlIDIgaXMgYmFzZWQgb24gc3RhdGUgMVxuICB2YXIgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdzdGF0ZTEnKTtcbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIHN0YXRlM3NlcmllcyA9IGRhdGFTZXJpZXM7XG4gIGRhdGFTZXJpZXNbJ2l0ZW1TdHlsZSddID0gT2JqZWN0LmFzc2lnbihkYXRhU2VyaWVzWydpdGVtU3R5bGUnXSwgeyBvcGFjaXR5OiAxIH0pXG4gIHZhciB0b3AxMDAgPSBzY2F0dGVycGxvdC5nZXRTZXJpZXNEYXRhQnlTaXplKGRhdGFTZXJpZXMuZGF0YSwgMTAwKVxuICBzdGF0ZTN0b3AxMDAgPSB0b3AxMDA7XG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIFBsb3QgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlWyd0ZXh0J10gPSAnV2hpdGUgYW5kIEJsYWNrIFN0dWRlbnQgU2NvcmVzJztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcxMDAgTGFyZ2VzdCBEaXN0cmljdHMnO1xuICBUaXRsZS5zZXRUaXRsZSgpO1xuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LCAvLyAnMTAwIExhcmdlc3QgVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNidcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjotMyxcbiAgICAgIG1heDozLFxuICAgICAgbmFtZTogJ0JsYWNrIFN0dWRlbnQgU2NvcmVzJyxcbiAgICB9LFxuICAgIHhBeGlzOiB7XG4gICAgICBtaW46IC0zLFxuICAgICAgbWF4OiA0LFxuICAgICAgbmFtZTogJ1doaXRlIFN0dWRlbnQgU2NvcmVzJyxcbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgLy8gZGF0YVNlcmllcyxcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiAnc2NhdHRlcicsXG4gICAgICAgIGRhdGE6IHRvcDEwMCxcbiAgICAgICAgc3ltYm9sU2l6ZTogZGF0YVNlcmllcy5zeW1ib2xTaXplLFxuICAgICAgICBpdGVtU3R5bGU6IHNlbGVjdGVkSXRlbVN0eWxlXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDBcbiAgICAgIH1cbiAgICBdXG4gIH07XG4gIC8vIGNvbnNvbGUubG9nKHRvcDEwMCk7XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWQ6IFtdLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgICAvLyBkZWVwbWVyZ2UoYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzKVxuICB9XG59O1xuXG4vKiogU3RhdGUgNDogSGlnaGxpZ2h0IGxvY2F0aW9ucyAoRGV0cm9pdCwgR3dpbmV0LCBXYXNoaW5ndG9uKSAqL1xubGV0IHN0YXRlNHRvcDEwMCA9IHt9O1xubGV0IHN0YXRlNGNvdW50ZXIgPSAwO1xudmFyIHN0YXRlNCA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgLy9oaWdobGlnaHRbJzEzMDIyMjAnXSA9ICdGb3JzeXRoIENvdW50eSc7XG4gIGhpZ2hsaWdodFsnMTMwMTIzMCddID0gJ0NsYXl0b24gQ291bnR5IFNjaG9vbCBEaXN0cmljdCc7XG4gIGhpZ2hsaWdodFsnMTMwMjU1MCddID0gJ0d3aW5uZXQgQ291bnR5IFNjaG9vbCBEaXN0cmljdCc7XG4gIGhpZ2hsaWdodFsnMTMwMDEyMCddID0gJ0F0bGFudGEgQ2l0eSBTY2hvb2wgRGlzdHJpY3QnO1xuICAvL2hpZ2hsaWdodFsnMTIwMTk4MCddID0gJ1dhbHRvbiBDb3VudHknO1xuICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cbiAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgdmFyIGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICAvLyB2YXIgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdzdGF0ZTEnKTtcbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIGRhdGFTZXJpZXNbJ2l0ZW1TdHlsZSddID0gT2JqZWN0LmFzc2lnbihkYXRhU2VyaWVzWydpdGVtU3R5bGUnXSwgeyBvcGFjaXR5OiAwLjUgfSlcbiAgdmFyIHRvcDEwMCA9IGdldExhcmdlc3RJZHMoc2NhdHRlcnBsb3QuZGF0YVsnZGlzdHJpY3RzJ11bJ2FsbF9zeiddLCAxMDApXG4gIGlmIChzdGF0ZTRjb3VudGVyID09PSAwKSB7XG4gICAgc3RhdGU0dG9wMTAwID0gdG9wMTAwO1xuICB9XG4gIHN0YXRlNGNvdW50ZXIgKys7XG4gIC8vIFBsb3QgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlWyd0ZXh0J10gPSAnV2hpdGUgYW5kIEJsYWNrIFN0dWRlbnQgU2NvcmVzJztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnO1xuICBUaXRsZS5zZXRUaXRsZSgpO1xuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LCAvLyAnV2hpdGUgYW5kIEJsYWNrIFN0dWRlbnRzXFwnIEF2ZXJhZ2UgUGVyZm9ybWFuY2UnLFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCwgLy8gJ1UuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTYnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgICBzaG93OiBmYWxzZVxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICBncmlkOiBiYXNlR3JpZCxcbiAgICB5QXhpczogZGVlcG1lcmdlKGJhc2VZQXhpcywge1xuICAgICAgbWluOi0zLFxuICAgICAgbWF4OjMsXG4gICAgICBuYW1lOiAnQmxhY2sgU3R1ZGVudCBTY29yZXMnLFxuICAgIH0pLFxuICAgIHhBeGlzOiBkZWVwbWVyZ2UoYmFzZVhBeGlzLHtcbiAgICAgIG1pbjogLTMsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnV2hpdGUgU3R1ZGVudCBTY29yZXMnLFxuICAgIH0pLFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIC8vIGJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1doaXRlIFN0dWRlbnQgU2NvcmVzJywgJ0JsYWNrIFN0dWRlbnQgU2NvcmVzJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3NlbGVjdGVkJyxcbiAgICAgICAgdHlwZTogJ3NjYXR0ZXInLFxuICAgICAgICBzeW1ib2xTaXplOiBkYXRhU2VyaWVzLnN5bWJvbFNpemUsXG4gICAgICAgIGl0ZW1TdHlsZTogc2VsZWN0ZWRJdGVtU3R5bGUsXG4gICAgICAgIHo6IDIsXG4gICAgICAgIC8vIHRvb2x0aXA6IHRvb2x0aXAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMTEuNTIsXG4gICAgICAgICAgICBwYWRkaW5nOiA0LFxuICAgICAgICAgICAgY29sb3I6ICdyZ2JhKDUsIDQxLCAxMDEsIDEwMCUpJyxcbiAgICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlLm5hbWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyBZIGF4aXNcbiAgICAgICAgICAgICAgICBjb29yZDogWzAsIC0zXSxcbiAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzU0Nzg5MicsXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IDAuNSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBjb29yZDogWyAwLCAgM10sXG4gICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIHggYXhpc1xuICAgICAgICAgICAgICAgIGNvb3JkOiBbLTMsIDBdLFxuICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgY29sb3I6ICcjNTQ3ODkyJyxcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICB3aWR0aDogMC41LFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvb3JkOiBbMywgMF0sXG4gICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgY29vcmQ6IFstMi41LCAtMi41XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAncmdiYSg1LCA0MSwgMTAxLCAxMDAlKScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHsgY29vcmQ6IFsgMywgIDNdLCBzeW1ib2w6ICdub25lJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIF1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnd19hdmcnLFxuICAgIHlWYXI6ICdiX2F2ZycsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgc2VsZWN0ZWQ6IHN0YXRlNHRvcDEwMCxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gICAgLy8gZGVlcG1lcmdlKGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcylcbiAgfVxufTtcblxuXG4vKiogU3RhdGUgNDogTG9hZCBuZXcgdmFyaWFibGVzIHRvIHNob3cgV2hpdGUvQmxhY2sgU0VTIEdhcCBhbmQgQWNoaWV2ZW1lbnQgR2FwICovXG52YXIgc3RhdGU1ID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgZWNoYXJ0IG9wdGlvbnNcbiAgY29uc3Qgb3B0aW9ucyA9IHNjYXR0ZXJwbG90LmNvbXBvbmVudC5nZXRPcHRpb24oKTtcbiAgLy8gdGhpcyBzdGF0ZSBpcyBjcmVhdGVkIGZyb20gdGhlIGJhc2VcbiAgY29uc3QgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdiYXNlJyk7XG4gIHZhciBkYXRhU2VyaWVzID0gc2NhdHRlcnBsb3QuZ2V0RGF0YVNlcmllcygpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuICAvLyBQbG90IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZVsndGV4dCddID0gJ0FjaGlldmVtZW50IEdhcHMgYW5kIEFmZmx1ZW5jZSBHYXBzJztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnO1xuICBUaXRsZS5zZXRUaXRsZSgpO1xuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsIC8vICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXBzIGJ5IERpZmZlcmVuY2VzXFxuaW4gQXZlcmFnZSBGYW1pbHkgU29jaW9lY29ub21pYyBSZXNvdXJjZXMnLFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCwgLy8gJ1VTIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB0b3A6IDEwLFxuICAgICAgYm90dG9tOiAyNixcbiAgICAgIGxlZnQ6IDEwLFxuICAgICAgcmlnaHQ6IDI4LFxuICAgICAgemxldmVsOiAxMDAsXG4gICAgICBoZWlnaHQ6ICdhdXRvJywvLyAyODAsXG4gICAgICB3aWR0aDogJ2F1dG8nLCAvLyAnYXV0bycsXG4gICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICB9LFxuICAgIHlBeGlzOiBkZWVwbWVyZ2UoYmFzZVlBeGlzLCB7XG4gICAgICBtaW46IC0xLCAvLyAtNixcbiAgICAgIG1heDogNiwgLy8gMywgLy8gMCxcbiAgICAgIG5hbWU6ICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXAgKGluIEdyYWRlIExldmVscyknLFxuICAgICAgbmFtZUdhcDogMjQsXG4gICAgICBsaW5lSGVpZ2h0OiA0OCxcbiAgICAgIC8vIHNwbGl0TnVtYmVyOiA3XG4gICAgfSksXG4gICAgeEF4aXM6IGRlZXBtZXJnZShiYXNlWEF4aXMsIHtcbiAgICAgIG1pbjogLTEsIC8vIC0zLFxuICAgICAgbWF4OiA2LCAvLyA3LFxuICAgICAgbmFtZTogJ1doaXRlLUJsYWNrIFNvY2lvZWNvbm9taWMgSW5lcXVhbGl0eScsXG4gICAgfSksXG4gICAgdG9vbHRpcDoge1xuICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgdHJhbnNpdGlvbkR1cmF0aW9uOiAwLjYsXG4gICAgICAvLyBib3JkZXJDb2xvcjogJyNmZmYnLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdXaGl0ZS1CbGFjayBTb2Npb2Vjb25vbWljIEluZXF1YWxpdHknLCAnV2hpdGUtQmxhY2sgQWNoaWV2ZW1lbnQgR2FwJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiBub1JhY2lhbERpc3Bhcml0eU1hcmtsaW5lLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiBub0dhcE1hcmtsaW5lLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfSxcbiAgICBdXG4gIH07XG4gIHJldHVybiB7XG4gICAgc2VsZWN0ZWQ6IFtdLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIHhWYXI6ICd3Yl9zZXMnLFxuICAgIHlWYXI6ICd3Yl9hdmcnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgICAvLyBkZWVwbWVyZ2UoYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzKVxuICB9XG59XG5cbi8qKiBTdGF0ZSA2OiBIaWdobGlnaHQgbGFyZ2VzdCBkaXN0cmljdHMgKi9cbnZhciBzdGF0ZTYgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICB2YXIgb3B0aW9ucyA9IHNjYXR0ZXJwbG90LmNvbXBvbmVudC5nZXRPcHRpb24oKTtcbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIHZhciBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ3N0YXRlNScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gICAgLy9oaWdobGlnaHRbJzEzMDIyMjAnXSA9ICdGb3JzeXRoIENvdW50eSc7XG4gICAgaGlnaGxpZ2h0WycxMzAxMjMwJ10gPSAnQ2xheXRvbiBDb3VudHknO1xuICAgIGhpZ2hsaWdodFsnMTMwMjU1MCddID0gJ0d3aW5uZXQgQ291bnR5JztcbiAgICBoaWdobGlnaHRbJzEzMDAxMjAnXSA9ICdBdGxhbnRhIENpdHknO1xuICAgIC8vaGlnaGxpZ2h0WycxMjAxOTgwJ10gPSAnV2FsdG9uIENvdW50eSc7XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuICAvLyBQbG90IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZVsndGV4dCddID0gJ0FjaGlldmVtZW50IEdhcHMgYW5kIEFmZmx1ZW5jZSBHYXBzJztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnO1xuICBUaXRsZS5zZXRUaXRsZSgpO1xuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsIC8vICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXBzIGJ5IERpZmZlcmVuY2VzXFxuaW4gQXZlcmFnZSBGYW1pbHkgU29jaW9lY29ub21pYyBSZXNvdXJjZXMnLFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCwgLy8gJ1VTIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB0b3A6IDEwLFxuICAgICAgYm90dG9tOiAyNixcbiAgICAgIGxlZnQ6IDEwLFxuICAgICAgcmlnaHQ6IDI4LFxuICAgICAgemxldmVsOiAxMDAsXG4gICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICB9LFxuICAgIHlBeGlzOiBkZWVwbWVyZ2UoYmFzZVlBeGlzLCB7XG4gICAgICBwb3NpdGlvbjogJ3JpZ2h0JyxcbiAgICAgIG1pbjogLTEsIC8vIC02LFxuICAgICAgbWF4OiA2LCAvLyAwLFxuICAgICAgbmFtZTogJ1doaXRlLUJsYWNrIEFjaGlldmVtZW50IEdhcCAoaW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgICBuYW1lR2FwOiAyNFxuICAgIH0pLFxuICAgIHhBeGlzOiBkZWVwbWVyZ2UoYmFzZVhBeGlzLCB7XG4gICAgICBtaW46IC0xLCAvLyAtMyxcbiAgICAgIG1heDogNiwgLy8gNyxcbiAgICAgIG5hbWU6ICdXaGl0ZS1CbGFjayBTb2Npb2Vjb25vbWljIEluZXF1YWxpdHknLFxuICAgIH0pLFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIC8vIGJvcmRlckNvbG9yOiAnI2ZmZicsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1doaXRlLUJsYWNrIFNvY2lvZWNvbm9taWMgSW5lcXVhbGl0eScsICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXAnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgLy8geyBpZDogJ2Jhc2UnIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICBtYXJrTGluZTogbm9SYWNpYWxEaXNwYXJpdHlNYXJrbGluZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiBub0dhcE1hcmtsaW5lLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwXG4gICAgICB9LFxuICAgIF1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBzZWxlY3RlZDogW10sXG4gICAgeFZhcjogJ3diX3NlcycsXG4gICAgeVZhcjogJ3diX2F2ZycsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICAgIC8vIChiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMpXG4gIH1cbn1cblxuLyoqIFN0YXRlIDc6IEd3aW5uZXR0LCBEQywgYW5kIERldHJvaXQgc2Nob29sIGRpc3RyaWN0cyAqL1xudmFyIHN0YXRlNyA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIHZhciBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICB2YXIgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdzdGF0ZTYnKTtcbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIGRhdGFTZXJpZXNbJ2l0ZW1TdHlsZSddID0gT2JqZWN0LmFzc2lnbihkYXRhU2VyaWVzWydpdGVtU3R5bGUnXSwgeyBvcGFjaXR5OiAwLjUgfSlcbiAgdmFyIHRvcDEwMCA9IHNjYXR0ZXJwbG90LmdldFNlcmllc0RhdGFCeVNpemUoZGF0YVNlcmllcy5kYXRhLCAxMDApXG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0gJiYgbmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIFBsb3QgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlWyd0ZXh0J10gPSAnQWNoaWV2ZW1lbnQgR2FwcyBhbmQgQWZmbHVlbmNlIEdhcHMnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJzEwMCBMYXJnZXN0IFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTYnO1xuICBUaXRsZS5zZXRUaXRsZSgpO1xuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsIC8vICcxMDAgTGFyZ2VzdCBVLlMuIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2J1xuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICAvLyB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICAvLyBib3JkZXJDb2xvcjogJyNmZmYnLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdXaGl0ZS1CbGFjayBTb2Npb2Vjb25vbWljIEluZXF1YWxpdHknLCAnV2hpdGUtQmxhY2sgQWNoaWV2ZW1lbnQgR2FwJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIC8vIGRhdGFTZXJpZXMsXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzY2F0dGVyJyxcbiAgICAgICAgZGF0YTogdG9wMTAwLFxuICAgICAgICBzeW1ib2xTaXplOiBkYXRhU2VyaWVzLnN5bWJvbFNpemUsXG4gICAgICAgIGl0ZW1TdHlsZTogc2VsZWN0ZWRJdGVtU3R5bGVcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICBtYXJrTGluZTogbm9HYXBNYXJrbGluZSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMFxuICAgICAgfSxcbiAgICBdXG4gIH07XG4gIHJldHVybiB7XG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICB9XG59XG5cbi8qKiBTdGF0ZSA4OiBIaWdobGlnaHQgZGlzdHJpY3RzIGFyb3VuZCB4PTAgKi9cbnZhciBzdGF0ZTggPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICB2YXIgb3B0aW9ucyA9IHNjYXR0ZXJwbG90LmNvbXBvbmVudC5nZXRPcHRpb24oKTtcbiAgdmFyIGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnc3RhdGU1Jyk7XG4gIC8vIHJldHVybiBvcHRpb25zO1xuICB2YXIgZGF0YVNlcmllcyA9IHNjYXR0ZXJwbG90LmdldERhdGFTZXJpZXMoKTtcbiAgLy8gZGF0YVNlcmllc1snaXRlbVN0eWxlJ10gPSBPYmplY3QuYXNzaWduKGRhdGFTZXJpZXNbJ2l0ZW1TdHlsZSddLCB7IG9wYWNpdHk6IDAuMiB9KVxuICAvLyB2YXIgdG9wMTAwID0gc2NhdHRlcnBsb3QuZ2V0U2VyaWVzRGF0YUJ5U2l6ZShkYXRhU2VyaWVzLmRhdGEsIDEwMClcbiAgdmFyIHJhbmdlID0ge1xuICAgIG1pbjogLS4xNSxcbiAgICBtYXg6IC4xNVxuICB9O1xuICB2YXIgbmVhclplcm8gPSBzY2F0dGVycGxvdC5nZXRTZXJpZXNEYXRhSW5SYW5nZShkYXRhU2VyaWVzLmRhdGEsICd4JywgcmFuZ2UpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dICYmIG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuICAvLyBQbG90IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZVsndGV4dCddID0gJ0FjaGlldmVtZW50IEdhcHMgYW5kIEFmZmx1ZW5jZSBHYXBzJztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICdEaXN0cmljdHMgd2l0aCBMb3dlc3QgU29jaW9lY29ub21pYyBSYWNpYWwgRGlzcGFyaXR5IDIwMDktMjAxNic7XG4gIFRpdGxlLnNldFRpdGxlKCk7XG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCwgLy8gJ0Rpc3RyaWN0cyB3aXRoIExvd2VzdCBTb2Npb2Vjb25vbWljIFJhY2lhbCBEaXNwYXJpdHkgMjAwOS0yMDE2J1xuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICAvLyBib3JkZXJDb2xvcjogJyNmZmYnLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdXaGl0ZS1CbGFjayBTb2Npb2Vjb25vbWljIEluZXF1YWxpdHknLCAnV2hpdGUtQmxhY2sgQWNoaWV2ZW1lbnQgR2FwJyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIGRhdGFTZXJpZXMsXG4gICAgICB7XG4gICAgICAgIHR5cGU6ICdzY2F0dGVyJyxcbiAgICAgICAgZGF0YTogbmVhclplcm8sXG4gICAgICAgIHN5bWJvbFNpemU6IGRhdGFTZXJpZXMuc3ltYm9sU2l6ZSxcbiAgICAgICAgaXRlbVN0eWxlOiBzZWxlY3RlZEl0ZW1TdHlsZSxcbiAgICAgICAgLy8ge1xuICAgICAgICAvLyAgIGJvcmRlcldpZHRoOiAwLjUsXG4gICAgICAgIC8vICAgYm9yZGVyQ29sb3I6ICcjQzU2QTEyJyxcbiAgICAgICAgLy8gICBjb2xvcjogJyNGRDdEMDInLFxuICAgICAgICAvLyB9LFxuICAgICAgICBvcGFjaXR5OiAwLjhcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiBub0dhcE1hcmtsaW5lLFxuICAgICAgfVxuICAgIF1cbiAgfTtcbiAgcmV0dXJuIHtcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxubGV0IHN0YXRlOWRhdGFTZXJpZXMgPSB7fTtcbnZhciBzdGF0ZTkgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICAvLyBnZXQgY3VycmVudCBlY2hhcnQgb3B0aW9uc1xuICBjb25zdCBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIHN0YXRlOWRhdGFTZXJpZXMgPSBkYXRhU2VyaWVzO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMTMwMzkzMCddID0gJ05ld3RvbiBDb3VudHknO1xuICBoaWdobGlnaHRbJzEzMDI1NTAnXSA9ICdHd2lubmV0IENvdW50eSBTY2hvb2wgRGlzdHJpY3QnO1xuICBoaWdobGlnaHRbJzEyMDE5ODAnXSA9ICdXYWx0b24gQ291bnR5JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0gJiYgbmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIFBsb3QgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlWyd0ZXh0J10gPSAnQWNoaWV2ZW1lbnQgR2FwcyBhbmQgQWZmbHVlbmNlIEdhcHMnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7XG4gIFRpdGxlLnNldFRpdGxlKCk7XG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCwgLy8gJ1doaXRlLUJsYWNrIEFjaGlldmVtZW50IEdhcHMgYnkgRGlmZmVyZW5jZXNcXG5pbiBBdmVyYWdlIEZhbWlseSBTb2Npb2Vjb25vbWljIFJlc291cmNlcycsXG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LCAvLyAnVVMgU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTYnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgICBzaG93OiBmYWxzZSxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgdG9wOiAxMCxcbiAgICAgIGJvdHRvbTogMjYsXG4gICAgICBsZWZ0OiAxMCxcbiAgICAgIHJpZ2h0OiAyOCxcbiAgICAgIHpsZXZlbDogMTAwLFxuICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICB3aWR0aDogJ2F1dG8nLFxuICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgfSxcbiAgICB5QXhpczogZGVlcG1lcmdlKGJhc2VZQXhpcywge1xuICAgICAgbWluOiAtMSwgLy8gLTYsXG4gICAgICBtYXg6IDYsIC8vIDAsXG4gICAgICBuYW1lOiAnV2hpdGUtQmxhY2sgQWNoaWV2ZW1lbnQgR2FwIChpbiBHcmFkZSBMZXZlbHMpJyxcbiAgICAgIG5hbWVHYXA6IDI0XG4gICAgfSksXG4gICAgeEF4aXM6IGRlZXBtZXJnZShiYXNlWUF4aXMsIHtcbiAgICAgIG1pbjogLTEsIC8vIC0zLFxuICAgICAgbWF4OiA2LCAvLyA3LFxuICAgICAgbmFtZTogJ1doaXRlLUJsYWNrIFNvY2lvZWNvbm9taWMgSW5lcXVhbGl0eScsXG4gICAgfSksXG4gICAgdG9vbHRpcDoge1xuICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgLy8gYm9yZGVyQ29sb3I6ICcjZmZmJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnV2hpdGUtQmxhY2sgU29jaW9lY29ub21pYyBJbmVxdWFsaXR5JywgJ1doaXRlLUJsYWNrIEFjaGlldmVtZW50IEdhcCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICBtYXJrTGluZTogbm9SYWNpYWxEaXNwYXJpdHlNYXJrbGluZVxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiBub0dhcE1hcmtsaW5lLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwXG4gICAgICB9LFxuICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIHNlbGVjdGVkOiBbXSxcbiAgICB4VmFyOiAnd2Jfc2VzJyxcbiAgICB5VmFyOiAnd2JfYXZnJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyogSGlnaGxpZ2h0IGxlYXN0IGFuZCBtb3N0IHNlZ3JlZ2F0ZWQgKi9cbnZhciBzdGF0ZTEwID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gY29uc29sZS5sb2coJ2xvYWRpbmcgc3RhdGU5Jyk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIC8vIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnc3RhdGU4Jyk7XG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICAvLyBCdWlsZCBzZXJpZXMgbW9zdCBzZWcgdG8gaGlnaGxpZ2h0XG4gIHZhciBkYXRhU2VyaWVzID0gc3RhdGU5ZGF0YVNlcmllczsgLy8gc2NhdHRlcnBsb3QuZ2V0RGF0YVNlcmllcygpO1xuICB2YXIgdG9wMTAwID0gc2NhdHRlcnBsb3QuZ2V0U2VyaWVzRGF0YUJ5U2l6ZShkYXRhU2VyaWVzLmRhdGEsIDEwMClcbiAgdmFyIHNlZ1NvcnRlZFRvcDEwMCA9IHNvcnREYXRhQnlTZWcodG9wMTAwKTtcbiAgdmFyIGxlYXN0U2VncmVnYXRlZFNlcmllcyA9IHNsaWNlTGVhc3Qoc2VnU29ydGVkVG9wMTAwLCAxMCk7XG4gIHZhciBtb3N0U2VncmVnYXRlZFNlcmllcyA9IHNsaWNlTW9zdChzZWdTb3J0ZWRUb3AxMDAsIDEwKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICAvLyBoaWdobGlnaHRbJzEyMDE5ODAnXSA9ICdXYWx0b24gQ291bnR5IFNjaG9vbCBEaXN0cmljdCc7XG4gIGhpZ2hsaWdodFsnMTMwMTIzMCddID0gJ0NsYXl0b24gQ291bnR5IFNjaG9vbCBEaXN0cmljdCc7XG4gIGhpZ2hsaWdodFsnMTMwMDEyMCddID0gJ0F0bGFudGEgQ2l0eSBTY2hvb2wgRGlzdHJpY3QnO1xuICAvLyBoaWdobGlnaHRbJzEzMDM5MzAnXSA9ICdOZXd0b24gQ291bnR5IFNjaG9vbCBEaXN0cmljdCc7XG4gIGhpZ2hsaWdodFsnMTMwMjU1MCddID0gJ0d3aW5uZXR0IENvdW50eSBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXSAmJiBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cbiAgLy8gUGxvdCB0aXRsZSBhbmQgc3VidGl0bGVcbiAgVGl0bGVbJ3RleHQnXSA9ICdBY2hpZXZlbWVudCBHYXBzIGFuZCBTZWdyZWdhdGlvbic7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJztcbiAgVGl0bGUuc2V0VGl0bGUoKTtcblxuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsIC8vICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXBzIGJ5IERpZmZlcmVuY2VzXFxuaW4gQXZlcmFnZSBGYW1pbHkgU29jaW9lY29ub21pYyBSZXNvdXJjZXMnLFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCwgLy8gJ01vc3QgYW5kIExlYXN0IFNlZ3JlZ2F0ZWQgT3V0IG9mXFxuMTAwIExhcmdlc3QgVVMgU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTYnLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgfSxcbiAgICBhcmlhOiB7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246IFRpdGxlLnRleHQgKyAoVGl0bGVbJ3N1YnRleHQnXS5sZW5ndGggPj0gMSA/ICcsICcgKyBUaXRsZVsnc3VidGV4dCddIDogJycgKSxcbiAgICB9LFxuICAgIGxlZ2VuZDoge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIG9yaWVudDogJ3ZlcnRpY2FsJyxcbiAgICAgIHRleHRTdHlsZToge1xuICAgICAgICBjb2xvcjogJyMxNzNCNzUnLFxuICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1Cb29rJyxcbiAgICAgICAgZm9udFdlaWdodDogJzUwMCcsXG4gICAgICAgIGZvbnRTaXplOiAxMVxuICAgICAgfSxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC44NSknLFxuICAgICAgYm9yZGVyUmFkaXVzOiAzLFxuICAgICAgcGFkZGluZzogMTQsXG4gICAgICBsZWZ0OiA1LFxuICAgICAgdG9wOiA1LFxuICAgICAgZGF0YTogW1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ0xlYXN0IFNlZ3JlZ2F0ZWQnLFxuICAgICAgICAgIGljb246ICdjaXJjbGUnLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ01vc3QgU2VncmVnYXRlZCcsXG4gICAgICAgICAgaWNvbjogJ2NpcmNsZScsXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgIHRvcDogMTAsXG4gICAgICBib3R0b206IDI2LFxuICAgICAgbGVmdDogMTAsXG4gICAgICByaWdodDogMjgsXG4gICAgICB6bGV2ZWw6IDEwMCxcbiAgICAgIGhlaWdodDogJ2F1dG8nLFxuICAgICAgd2lkdGg6ICdhdXRvJyxcbiAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgIH0sXG4gICAgeUF4aXM6IGRlZXBtZXJnZShiYXNlWUF4aXMsIHtcbiAgICAgIG1pbjogLTEsIC8vIC02LFxuICAgICAgbWF4OiA2LCAvLyAwLFxuICAgICAgbmFtZTogJ1doaXRlLUJsYWNrIEFjaGlldmVtZW50IEdhcCAoaW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgICBuYW1lR2FwOiAyNFxuICAgIH0pLFxuICAgIHhBeGlzOiBkZWVwbWVyZ2UoYmFzZVhBeGlzLCB7XG4gICAgICBtaW46IC0wLjMsXG4gICAgICBtYXg6IDAuNyxcbiAgICAgIG5hbWU6ICdXaGl0ZS1CbGFjayBTb2Npb2Vjb25vbWljIFNlZ3JlZ2F0aW9uJyxcbiAgICAgIGludGVydmFsOiAwLjE1LFxuICAgICAgc2NhbGU6IGZhbHNlXG4gICAgfSksXG4gICAgdG9vbHRpcDoge1xuICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdXaGl0ZS1CbGFjayBTb2Npb2Vjb25vbWljIFNlZ3JlZ2F0aW9uJywgJ1doaXRlLUJsYWNrIEFjaGlldmVtZW50IEdhcCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7IGlkOiAnYmFzZSd9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDBcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICBtYXJrTGluZTogc2VnTm9HYXBNYXJrbGluZSxcbiAgICAgIH0sXG4gICAgICB6ZXJvU2VnR2FwTWFya2xpbmVcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICB4VmFyOiAnd2Jfc2VnJyxcbiAgICB5VmFyOiAnd2JfYXZnJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyogSGlnaGxpZ2h0IGxlYXN0IGFuZCBtb3N0IHNlZ3JlZ2F0ZWQgKi9cbnZhciBzdGF0ZTExID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gY29uc29sZS5sb2coJ2xvYWRpbmcgc3RhdGUxMCcpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICAvLyBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ3N0YXRlOCcpO1xuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgLy8gQnVpbGQgc2VyaWVzIG1vc3Qgc2VnIHRvIGhpZ2hsaWdodFxuICB2YXIgZGF0YVNlcmllcyA9IHN0YXRlOWRhdGFTZXJpZXM7IC8vIHNjYXR0ZXJwbG90LmdldERhdGFTZXJpZXMoKTtcbiAgdmFyIHRvcDEwMCA9IHNjYXR0ZXJwbG90LmdldFNlcmllc0RhdGFCeVNpemUoZGF0YVNlcmllcy5kYXRhLCAxMDApXG4gIHZhciBzZWdTb3J0ZWRUb3AxMDAgPSBzb3J0RGF0YUJ5U2VnKHRvcDEwMCk7XG4gIHZhciBsZWFzdFNlZ3JlZ2F0ZWRTZXJpZXMgPSBzbGljZUxlYXN0KHNlZ1NvcnRlZFRvcDEwMCwgMTApO1xuICB2YXIgbW9zdFNlZ3JlZ2F0ZWRTZXJpZXMgPSBzbGljZU1vc3Qoc2VnU29ydGVkVG9wMTAwLCAxMCk7XG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgaGlnaGxpZ2h0WycwNjA0NzQwJ10gPSAnQmVya2VsZXksIENBJztcbiAgaGlnaGxpZ2h0WycxNzE0NDYwJ10gPSAnRXZhbnN0b24sIElMJztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0gJiYgbmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIFBsb3QgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlWyd0ZXh0J10gPSAnQWNoaWV2ZW1lbnQgR2FwcyBhbmQgU2VncmVnYXRpb24nO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7XG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LCAvLyAnV2hpdGUtQmxhY2sgQWNoaWV2ZW1lbnQgR2FwcyBieSBEaWZmZXJlbmNlc1xcbmluIEF2ZXJhZ2UgRmFtaWx5IFNvY2lvZWNvbm9taWMgUmVzb3VyY2VzJyxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsIC8vICdNb3N0IGFuZCBMZWFzdCBTZWdyZWdhdGVkIE91dCBvZlxcbjEwMCBMYXJnZXN0IFVTIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICBsZWdlbmQ6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBvcmllbnQ6ICd2ZXJ0aWNhbCcsXG4gICAgICB0ZXh0U3R5bGU6IHtcbiAgICAgICAgY29sb3I6ICcjMTczQjc1JyxcbiAgICAgICAgZm9udEZhbWlseTogJ01haXNvbk5ldWUtQm9vaycsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICBmb250U2l6ZTogMTFcbiAgICAgIH0sXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuODUpJyxcbiAgICAgIGJvcmRlclJhZGl1czogMyxcbiAgICAgIHBhZGRpbmc6IDE0LFxuICAgICAgbGVmdDogNSxcbiAgICAgIHRvcDogNSxcbiAgICAgIGRhdGE6IFtcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdMZWFzdCBTZWdyZWdhdGVkJyxcbiAgICAgICAgICBpY29uOiAnY2lyY2xlJyxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIG5hbWU6ICdNb3N0IFNlZ3JlZ2F0ZWQnLFxuICAgICAgICAgIGljb246ICdjaXJjbGUnLFxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB0b3A6IDEwLFxuICAgICAgYm90dG9tOiAyNixcbiAgICAgIGxlZnQ6IDEwLFxuICAgICAgcmlnaHQ6IDI4LFxuICAgICAgemxldmVsOiAxMDAsXG4gICAgICBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgIHdpZHRoOiAnYXV0bycsXG4gICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICB9LFxuICAgIHlBeGlzOiBkZWVwbWVyZ2UoYmFzZVlBeGlzLCB7XG4gICAgICBtaW46IC0xLCAvLyAtNixcbiAgICAgIG1heDogNiwgLy8gMCxcbiAgICAgIG5hbWU6ICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXAgKGluIEdyYWRlIExldmVscyknLFxuICAgICAgbmFtZUdhcDogMjRcbiAgICB9KSxcbiAgICB4QXhpczogZGVlcG1lcmdlKGJhc2VYQXhpcywge1xuICAgICAgbWluOiAtMC4zLFxuICAgICAgbWF4OiAwLjcsXG4gICAgICBuYW1lOiAnV2hpdGUtQmxhY2sgU29jaW9lY29ub21pYyBTZWdyZWdhdGlvbicsXG4gICAgICBpbnRlcnZhbDogMC4xNSxcbiAgICAgIHNjYWxlOiBmYWxzZVxuICAgIH0pLFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnV2hpdGUtQmxhY2sgU29jaW9lY29ub21pYyBTZWdyZWdhdGlvbicsICdXaGl0ZS1CbGFjayBBY2hpZXZlbWVudCBHYXAnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgeyBpZDogJ2Jhc2UnfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgbWFya0xpbmU6IHNlZ05vR2FwTWFya2xpbmUsXG4gICAgICB9LFxuICAgICAgemVyb1NlZ0dhcE1hcmtsaW5lXG4gICAgXVxuICB9XG4gIHJldHVybiB7XG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgeFZhcjogJ3diX3NlZycsXG4gICAgeVZhcjogJ3diX2F2ZycsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgb25EYXRhTG9hZGVkOiBmdW5jdGlvbigpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdkYXRhIGxvYWRlZCcpO1xuICAgICAgY29uc29sZS5sb2coc2NhdHRlcnBsb3QuZGF0YSk7XG4gICAgfSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLy8gY3JlYXRlIHRoZSBjb21wb25lbnRcbnZhciByb290RWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhdHRlcnBsb3QnKTtcbnZhciBzY2F0dGVycGxvdCA9IG5ldyBTY2F0dGVycGxvdChyb290RWwpO1xuXG4vLyBzZXQgdGhlIHN0YXRlc1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlMScsIHN0YXRlMSk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGUyJywgc3RhdGUyKTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTMnLCBzdGF0ZTMpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlNCcsIHN0YXRlNCk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGU1Jywgc3RhdGU1KTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTYnLCBzdGF0ZTYpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlNycsIHN0YXRlNyk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGU4Jywgc3RhdGU4KTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTknLCBzdGF0ZTkpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlMTAnLCBzdGF0ZTEwKTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTExJywgc3RhdGUxMSk7XG4iXX0=