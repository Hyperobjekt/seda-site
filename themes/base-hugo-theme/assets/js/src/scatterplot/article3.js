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
let yAxis = {};
let xAxis = {};

Title['text'] = '';
Title['subtext'] = '';
Title['setTitle'] = function() {
  // Set title and subtitle
  jQ('.column-plot .title').html(Title.text);
  jQ('.column-plot .subtitle').html(Title.subtext);
}
yAxis['up'] ='';
yAxis['down'] ='';
yAxis['name'] = '';
yAxis['setAxis'] = function() {
  // Set axis properties
  jQ('.axis__y-label .axis__up').html(yAxis.up);
  jQ('.axis__y-label .axis__name').html(yAxis.name);
  jQ('.axis__y-label .axis__down').html(yAxis.down);
}
xAxis['up'] ='';
xAxis['down'] ='';
xAxis['name'] = '';
xAxis['setAxis'] = function() {
  // Set axis properties
  jQ('.axis__x-label .axis__up').html(xAxis.up);
  jQ('.axis__x-label .axis__name').html(xAxis.name);
  jQ('.axis__x-label .axis__down').html(xAxis.down);
}

const axisBlue = '#547892';

const axisVals = {yaxis: [-.005, .015], xaxis: [-.015, .015]}
axisVals.mapRange = Math.abs(axisVals.yaxis[0]) > Math.abs(axisVals.yaxis[1]) ? [axisVals.yaxis[0], -axisVals.yaxis[0]] : [-axisVals.yaxis[1], axisVals.yaxis[1]]
// calculate scale of legend and set height
jQ('.axis__legend').css('height', `calc(100% / ${
  (axisVals.yaxis[1] - axisVals.yaxis[0]) / (axisVals.mapRange[1] - axisVals.mapRange[0])
})`);

const axisMarkline = {
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
          color: 'rgba(84, 120, 146, 60%)',
      },
      //horizontal markline
      data: [
          [
            {
              coord: [axisVals.xaxis[0], 0],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(5, 41, 101, 100%)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [axisVals.xaxis[1], 0], symbol: 'none' },
          ],
          //horizontal label (necessary to add label at beginning of markline)
          [
            {
              name: 'no change',
              coord: [axisVals.xaxis[0], 0],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(0,0,0,0)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [axisVals.xaxis[0] + .007, 0], symbol: 'none' },
          ],
          //vertical markline
          [
            {
              coord: [0, axisVals.yaxis[0]],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(5, 41, 101, 100%)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [0, axisVals.xaxis[1]], symbol: 'none' },
          ],
          //vertical label (necessary to add label at beginning of markline)
          [
            {
              name: 'no change',
              coord: [0, 0],
              symbol: 'none',
              lineStyle: {
                color: 'rgba(0,0,0,0)',
                type: 'solid',
                width: 1,
              },
            },
            { coord: [0, .005], symbol: 'none' },
          ],
      ]
  }
};

// function for generating best fit
const generateData = (trend) => {
  if(trend === 'bestfit') {
    let data = [];
    for (let i = -.01; i <= .008; i += .001) {
        data.push([i, (.8393335538672176*i+.0082388767046503)]);
    }
    return data;
  }
}

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

  Title['text'] = 'Ten Years of Data from Thousands of School Districts Reveal Clear Links Between Trends in Segregation and White-Black Achievement Gaps';
  Title['subtext'] = '';
  Title.setTitle();

  yAxis.up = 'Increasing ▼'
  yAxis.down = '▲ Decreasing'
  yAxis.name = 'Gap'
  yAxis.setAxis();

  xAxis.up = 'Increasing ▶'
  xAxis.down = '◀ Decreasing'
  xAxis.name = 'Segregation'
  xAxis.setAxis();

  const baseOverrides = {
    notMerge: false,
    prefix:'',
    metaVars:{},
    title: {
      text: 'Title.text', // 'districts with increasing segregation have increasing white-black achievement gaps (2009-2018)',
      subtext: Title.subtext, // 
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
        left: 42,
        bottom: 1,
    },
    visualMap: [{
      show: false,
      min: axisVals.mapRange[0],
      max: axisVals.mapRange[1],
      range: [axisVals.yaxis[0], axisVals.yaxis[1]],
      left: '96%',
      bottom: '12%',
      itemHeight: '280px',
      itemWidth: '10px',
      inRange: {
        color: ['#136E4A' , 'rgba(255,255,255,1)' , '#174B80'],
      },
    }],
    yAxis: {
      min: axisVals.yaxis[0],
      max: axisVals.xaxis[1],
      position: 'left',
      nameTextStyle: {
        fontFamily: 'MaisonNeue-Medium',
      },
      splitLine:{show:true},
      axisTick: {
        show: false,
      },
      axisLabel: {
        show: false,
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
      min: axisVals.xaxis[0],
      max: axisVals.xaxis[1],
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
      axisLabel: {show: false},
      position: 'bottom',
    },
    tooltip: {
      trigger: 'item',
      formatter: function(item) {
      }
    },
    series: [
      axisMarkline,
      {
        id: 'base',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#2173C3',
        },
        zlevel: 104,
        silent: true,
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
