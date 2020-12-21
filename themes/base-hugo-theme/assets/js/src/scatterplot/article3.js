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
    notMerge: false,
    prefix:'',
    metaVars:{},
    title: {
      text: 'Title.text', // 'White and Black Students\' Average Performance',
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
    visualMap: [{
      show: false,
      min: -0.015,
      max: 0.015,
      inRange: {
        color: ['#1570CD', '#2173C3'],
        opacity:[.17, 1]
      }
    }],
    yAxis: {
        min:-.015,
        max:.015,
        position: 'left',
        name: '◀  Decreasing Gap       Increasing Gap  ▶',
        splitLine:{show:true},
        axisTick: {show: true},
        axisLabel: {
          rotate: 90,
          formatter: function(value, index) {
            if (value < 0) {
                return value.toString()[0] + value.toString().slice(2)
            } else if (value > 0) {
                return value.toString().slice(1)
            }else{
                return value
            }
          },
        },
        axisLine:{
          show: true,
          onZero: false,
          lineStyle:{
            color: '#757575',
          }
        },
    },
    xAxis: {
      min: -.015,
      max: .015,
      name: '◀  Decreasing Segregation          Increasing Segregation  ▶',
      axisLabel:{
        interval: 0,
        formatter: function(value, index) {
          if (value < 0) {
              return value.toString()[0] + value.toString().slice(2)
          } else if (value > 0) {
              return value.toString().slice(1)
          }else{
              return value
          }
        },
      },
      axisTick: {show: true, interval: 0},
      axisLine:{
        show: true,
        onZero: false,
        lineStyle:{
          color: '#757575',
        }
      },
      position: 'bottom'
    },
    tooltip: {
      trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'White Student Scores', 'Black Student Scores');
      }
    },
    series: [
      { 
        id: 'base',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#2173C3',
        },
       },
      {
        type: 'line',
        showSymbol: false,
        clip: true,
        data: generateData()
      },
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
    options: deepmerge.all([ base.options, baseOverrides ]), //  baseOverrides
  }
}

// create the component
var rootEl = document.getElementById('scatterplot');
var scatterplot = new Scatterplot(rootEl);

// set the states
scatterplot.addState('state1', state1);
