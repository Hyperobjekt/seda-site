/**
 * scatterplot states for article one,
 * Patterns of Racial/Ethnic Opportunity Gaps
 * - article storyboard: https://docs.google.com/document/d/1adz0CwXI8WKok8ePVQEcSmlRQwRIjKaKvd8Am6OFfhY/edit
 */

const jQ = jQuery;
jQ('.search-component').css('display', 'none');

// Placeholders for segregation series operations
let segData = [];
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

const func = (x) => {
    return .755673484389962*x+.0021285827076154;
}

const generateData = () => {
    let data = [];
    for (let i = -200; i <= 200; i += 0.1) {
        data.push([i, func(i)]);
    }
    return data;
}
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

  Title['text'] = 'Districts with Increasing Segregation Have Increasing White-Black Gaps';
  //Title['subtext'] = 'U.S. School Districts 2009-2016';
  Title['subtext'] = '';
  Title.setTitle();

  const baseOverrides = {
    prefix:'',
    metaVars:{},
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
    grid :{
        top: 15,
        left: 20
    },
    yAxis: {
        min:-.015,
        max:.015,
        position: 'left',
        name: '◀  Decreasing Gap       Increasing Gap  ▶',
        splitLine:{show:true},
        axisLabel: {rotate: 90}
    },
    xAxis: {
      min: -.01,
      max: .01,
      name: '◀  Decreasing Segregation          Increasing Segregation  ▶',
      axisTick: {interval: 'auto'}
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
      },
      {
        type: 'line',
        showSymbol: false,
        clip: true,
        data: generateData()
        }
    ]
  }
  // Set title and subtitle
  jQ('.column-scatterplot .title').text(Title.text);
  jQ('.column-scatterplot .subtitle').text(Title.subtext);
  return {
    endpoint: '/data/',
    xVar: 'wb_seg',
    yVar: 'wb_ses',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ]) //  baseOverrides
  }
}

// create the component
var rootEl = document.getElementById('scatterplot');
var scatterplot = new Scatterplot(rootEl);

// set the states
scatterplot.addState('state1', state1);
