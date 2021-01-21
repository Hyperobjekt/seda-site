/**
 * scatterplot states for article three,
 * Increasing school segregation leads to greater racial academic inequality
 * - article storyboard: https://docs.google.com/document/d/1LVE15Vd7_D8PsDYp_0BtPvJ8mf-IJ_WUQc0-R4TObZs/
 *
 * data lives in themes/base-hugo-theme/static/data/districts and /meta
 */

const jQ = jQuery;

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

const initialMarkline = {
  type: 'scatter',
  zlevel: 1,
  animation: false,
  markLine: {
      silent: true,
      label: {
          show: true,
          position: 'middle',
          fontFamily: 'SharpGrotesk-Medium20',
          fontWeight: '500',
          fontSize: 11.52,
          padding: 4,
          color: 'rgba(5, 41, 101, 100%)',
      },
      //xaxis markline
      data: [
          [
            {
              coord: [-.016, 0],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(5, 41, 101, 100%)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [.015, 0], symbol: 'none' },
          ],
          //xaxis label (necessary to add label at beginning of markline)
          [
            {
              name: 'no change',
              coord: [-.015, 0],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(0,0,0,0)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [-.009, 0], symbol: 'none' },
          ],
          //yaxis markline
          [
            {
              coord: [0, -.015],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(5, 41, 101, 100%)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [0, .015], symbol: 'none' },
          ],
          //yaxis label (necessary to add label at beginning of markline)
          [
            {
              name: 'no change',
              coord: [0, -.015],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(0,0,0,0)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [0, -.005], symbol: 'none' },
          ],
      ]
  }
};

// function for generating certain lines
const generateData = (trend) => {
  if(trend === 'bestfit') {
    let data = [];
    for (let i = -.01; i <= .008; i += .001) {
        data.push([i, (.755673484389962*i+.0021285827076154)]);
    }
    return data;
  }
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

  Title['text'] = 'Districts with Increasing Segregation Have Increasing White-Black Achievement Gaps (2009-2018)';
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
      left: '96%',
      bottom: '12%',
      itemHeight: '280px',
      itemWidth: '10px',
      inRange: {
        color: ['#174B80','rgba(255,255,255,1)', '#136E4A'],
      },
    }],
    yAxis: {
      min: -0.015,
      max:.015,
      position: 'left',
      name: '◀ Decreasing             Gap             Increasing ▶',
      nameTextStyle: {
        fontFamily: 'MaisonNeue-Medium',
      },
      splitLine:{show:true},
      axisTick: {
        show: false,
      },
      axisLabel: {
        rotate: 90,
        fontFamily: 'MaisonNeue-Medium',
        //showMinLabel: false,
        showMaxLabel: true,
        formatter: function(value) {
          // remove leading 0's
          if (value < 0) {
              return value.toString()[0] + value.toString().slice(2)
          } else if (value > 0) {
              return value.toString().slice(1)
          } else {
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
      zlevel: 103,
    },
    xAxis: {
      type: 'value',
      interval: .001,
      // start at .016 to allow .015 to show without the y and x axis min vals overlapping
      min: -0.016,
      max: 0.015,
      name: '◀ Decreasing              Segregation              Increasing ▶',
      nameTextStyle: {
        fontFamily: 'MaisonNeue-Medium',
      },
      splitLine:{
        show: false,
      },
      axisTick: {show: false},
      axisLine:{
        show: true,
        onZero: false,
        lineStyle:{
          color: '#757575',
        }
      },
      axisLabel:{
        showMaxLabel: true,
        fontFamily: 'MaisonNeue-Medium',
        //rotate: 90,
        //showMinLabel: false,
        formatter: function(value) {
          // remove leading 0's
          if (value === -0.015) {
              return value.toString()[0] + value.toString().slice(2)
          } else if (value === 0.015) {
              return value.toString().slice(1)
          } else if (value === 0) {
              return value
          }
        },
      },
      position: 'bottom',
    },
    tooltip: {
      trigger: 'item',
      formatter: function(item) {
        // console.log(item)
      }
    },
    series: [
      initialMarkline,
      {
        id: 'base',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#2173C3',
        },
        zlevel: 104
       },
      {
        id: 'bestfit',
        animation: false,
        type: 'line',
        showSymbol: false,
        clip: true,
        lineStyle: {
          color: '#3A7BBA',
        },
        data: generateData('bestfit'),
        zlevel: 104
      },
    ]
  }



  // Set title and subtitle
  jQ('.column-plot .title').text(Title.text);
  jQ('.column-plot .subtitle').text(Title.subtext);
  return {
    endpoint: '/data/',
    xVar: 'wb_seg',
    yVar: 'wb_gap',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ]), //  baseOverrides
  }
}

// create the component
var rootEl = document.getElementById('scatterplot');
var scatterplot = new Scatterplot(rootEl);

// set the states
scatterplot.addState('state1', state1);
