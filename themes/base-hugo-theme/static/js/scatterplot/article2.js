/**
 * scatterplot states for article one
 * - article storyboard: https://docs.google.com/document/d/1ShohEmEcoQoepsIBtQmzrUqAZ7pdFDL-i9dbfEaWtO0/edit
 */

// Placeholders for segregation series operations
// let segData = [];
let searchItemIDs = [];
let names = [];
let allGrdData = [];

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

//
// Fetch the additional segregation data for state 9.
//
const grdCSV = 'https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/districts-all_grd.csv';
var xhr = new XMLHttpRequest();
xhr.open("GET", grdCSV, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // console.log(xhr.responseText);
      console.log('Seg data request finished.');
      // console.log(this.responseText);
      var csvResponse = this.responseText;
      var json = Papa.parse(csvResponse);
      allGrdData = json.data;
      // console.log('logging segregation data');
      // console.log(segData);
      // Trim off column headings and any blank rows
      allGrdData = allGrdData.filter(function(e) { return e[0] !== 'id' });
      allGrdData = allGrdData.filter(function(e) { return e[0] !== '' });
      // console.log(allGrdData);
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
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 3',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    legend: {
      show: true,
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 1,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                name: '', // upper right markline
                coord: [3, 6],
                symbol: 'none',
                lineStyle: {
                  color: '#fff', // '#adadad'
                  type: 'solid'
                },
              },
              {
                coord: [-1.75, .75],
                symbol: 'none'
              },
            ],
          [
            {
              name: '', // lower left markline
              coord: [1, 2.5],
              symbol: 'none',
              lineStyle: {
                color: '#fff', // '#adadad'
                type: 'solid'
              },
            },
            {
              coord: [-3.75, 1],
              symbol: 'none'
            },
          ],
          [
            {
              name: '', // x axis
              coord: [-3.5, 3],
              symbol: 'none',
              lineStyle: {
                // color: '#fff', // 'rgba(0,0,0,0.6)'
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                      offset: 0, color: 'rgba(255, 255, 255, 0.18)' // color at 0% position
                  },
                  {
                    offset: 0.25, color: 'rgba(255, 255, 255, 0.78)' // color at 25% position
                  },
                  {
                    offset: 0.75, color: 'rgba(255, 255, 255, 0.78)' // color at 50% position
                  },
                  {
                      offset: 1, color: 'rgba(255, 255, 255, 0.18)' // color at 100% position
                  }],
                  global: false // false by default
                },
                type: 'solid'
              }
            },
            {
              coord: [3, 3],
              symbol: 'none'
            },
          ]
        ]
      }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg3',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides ])
  }
}

/** State 2: Highlight largest 25 districts  */
var state2 = function(scatterplot) {
  if (names.length <= 0 &&
    scatterplot && 
    scatterplot.data && 
    scatterplot.data.districts &&
    scatterplot.data.districts.name) {
    names = scatterplot.data.districts.name;
    // console.log(names);
  }
  // state 2 is based on state 1
  var base = scatterplot.getState('base');
  var highlight = {};
  // highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg3',
    zVar: 'all_sz',
    selected: [],
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      title: {
        text: 'Academic Achievement and Socioeconomic Status, Grade 3',
        subtext: 'U.S. School Districts 2009-2016',
        textAlign: 'center',
        left: '50%',
        top: '10px',
      },
      yAxis: {
        min: -0.5,
        max: 9,
        name: 'Average Achievement (in Grade Levels)',
        textStyle: {
          fontFamily: 'SharpGrotesk-Medium20',
          color: '#FF003E',
        }
      },
      xAxis: {
        min: -4,
        max: 3.5,
        name: 'Poor/Disadvantaged to Affluent/Advantaged',
      },
      series: [
        { id: 'base' },
        {
          id: 'highlighted',
          itemStyle: {
            borderWidth: 1,
            borderColor: '#042965', // 'rgba(0,0,0,1)',
            color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 3],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 3],
                  symbol: 'none'
                },
              ],
            ]
          }
        },
      ]
    })
  }
};

/** State 3: Highlight locations (Detroit, Gwinet, Washington) */
var state3 = function(scatterplot) {
  var base = scatterplot.getState('base');
  var highlight = {};
  // highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg4',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      title: {
        text: 'Academic Achievement and Socioeconomic Status, Grade 4',
        subtext: 'U.S. School Districts 2009-2016',
        textAlign: 'center',
        left: '50%',
        top: '10px',
      },
      yAxis: {
        min: -0.5,
        max: 9,
        name: 'Average Achievement (in Grade Levels)',
        textStyle: {
          fontFamily: 'SharpGrotesk-Medium20',
          color: '#FF003E',
        }
      },
      xAxis: {
        min: -4,
        max: 3.5,
        name: 'Poor/Disadvantaged to Affluent/Advantaged',
      },
      series: [
        { id: 'base' },
        {
          id: 'highlighted',
          itemStyle: {
            borderWidth: 2,
            borderColor: '#042965', // 'rgba(0,0,0,1)',
            color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 4],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 4],
                  symbol: 'none'
                },
              ],
            ]
          }
        },
      ]
    })
  }
};

/** State 4: Grade 5 Chicago */
var state4 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  // highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 5',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 5],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 5],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg5',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 5, Grade 6 Chicago */
var state5 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  // highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 6',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 6],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 6],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg6',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 6, Grade 7 Chicago */
var state6 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  // highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 7',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 7],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 7],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg7',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 7, Grade 8 Chicago */
var state7 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  // highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 8',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 8],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 8],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg8',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 8, Grade 3 Milwaukee */
var state8 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 3',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 3],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 3],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg3',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 9, Grade 4 Milwaukee */
var state9 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 4',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 4],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 4],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg4',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 10, Grade 5 Milwaukee */
var state10 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 5',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 5],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 5],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg5',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 11, Grade 6 Milwaukee */
var state11 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 6',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 6],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 6],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg6',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 12, Grade 7 Milwaukee */
var state12 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 7',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 7],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 7],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg7',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 13, Grade 8 Milwaukee */
var state13 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Academic Achievement and Socioeconomic Status, Grade 8',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: -0.5,
      max: 9,
      name: 'Average Achievement (in Grade Levels)',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                  name: '', // Grade level
                  coord: [-3.5, 8],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 8],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_ses',
    yVar: 'all_avg8',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 8, Avg achievement grade 3 vs years growth per grade */
var state14 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Third Grade Achievement vs. Achievement Growth (Grades per Year)',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Years of Growth per Grade',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -1,
      max: 7,
      name: 'Average Grade 3 Achievement',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
        type:'scatter',
          markLine: {
            animation: false,
            silent: true,
            label: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 2,
              padding: 5,
              color: '#052965',
              shadowColor: 'transparent',
              textShadowColor: 'transparent',
              textBorderColor: 'transparent'
            },
            data: [
              [
                {
                  name: 'About Average', // Grade level
                  coord: [3, 1.4],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [3, 0.55],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '3 Grades Below Average', // Grade level
                  coord: [0, 1.4],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [0, 0.55],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '3 Grades Above Average', // Grade level
                  coord: [6, 1.4],
                  symbol: 'none',
                  lineStyle: {
                    color: '#fff', // '#adadad'
                    type: 'solid',
                    width: 2
                  },
                },
                {
                  coord: [6, 0.55],
                  symbol: 'none'
                },
              ],
          ]
        }
      },
    ]
  }
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: [],
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

function getQuadrantSeries(quadrant, xAxis, yAxis, xData, yData) {
  // Quadrants clockwise from upper left:
  // 1 | 2
  // 4 | 3
  //
  // console.log('getQuadrantSeries');
  // An array of arrays.
  var xSorted = [];
  // An array of district IDs.
  var xySorted = [];
  if (quadrant === 1 || quadrant === 4) {
    // Filter for less than x
    for (let i = 0; i < xData.length; i++) {
      if (xData[i][1] < xAxis) {
        xSorted.push(xData[i]);
      }
    }
  } else {
    // Filter for greater than x
    for (let i = 0; i < xData.length; i++) {
      if (xData[i][1] > xAxis) {
        xSorted.push(xData[i]);
      }
    }
  }
  // console.log('xSorted');
  // console.log(xSorted);

  if (quadrant === 1 || quadrant === 2) {
    // Filter for greater than y
    for (let i = 0; i < xSorted.length; i++) {
      // var yItem = yData.filter(el => el[0] == xSorted[i][0]);
      var yItem = [];
      for (let a = 0; a < yData.length; a++) {
        if (yData[a][0] == xSorted[i][0]) {
          yItem.push(yData[a]);
          break;
        }
      }
      if (yItem.length > 0 && yItem[0][1] > yAxis) {
        // console.log('greater than y');
        xySorted.push(xSorted[i][0]);
      }
    }
  } else {
    // Filter for less than y
    for (let i = 0; i < xSorted.length; i++) {
      var yItem = [];
      for (let a = 0; a < yData.length; a++) {
        if (yData[a][0] == xSorted[i][0]) {
          yItem.push(yData[a]);
          break;
        }
      }
      if (yItem.length > 0 && yItem[0][1] < yAxis) {
        // console.log('greater than y');
        xySorted.push(xSorted[i][0]);
      }
    }
  }
  // console.log(xySorted);
  return xySorted;
}

/** State 15, 2nd quadrant, upper right */
var state15 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Build the series of elements for quadrant highlight.
  var dataSeries = scatterplot.getDataSeries();
  var quadrant = getQuadrantSeries(2, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  const baseOverrides = {
    title: {
      text: 'Third Grade Achievement vs. Achievement Growth (Grades per Year)',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Years of Growth per Grade',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -1,
      max: 7,
      name: 'Average Grade 3 Achievement',
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)', // 'rgba(0,0,0,1)',
          color: 'rgba(145, 115, 255, 1)', // '#b6a2de' // 'rgba(255,0,0,0.25)'
        },
        z: 2
      },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
        type:'scatter',
          markLine: {
            animation: false,
            silent: true,
            label: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 2,
              padding: 5,
              color: '#052965',
              shadowColor: 'transparent',
              textShadowColor: 'transparent',
              textBorderColor: 'transparent'
            },
            data: [
              [
                {
                  name: '', // Y axis
                  coord: [3, 1.6],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [ 3, 0.4 ],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-0.5, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    // color: '#fff', // 'rgba(0,0,0,0.6)'
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // 'red' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // 'blue' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [6.5, 1],
                  symbol: 'none'
                },
              ]
            ]
          }
        },
      ]
  }
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: quadrant,
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 16, 4th quadrant, lower left */
var state16 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Build the series of elements for quadrant highlight.
  var dataSeries = scatterplot.getDataSeries();
  var quadrant = getQuadrantSeries(4, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  const baseOverrides = {
    title: {
      text: 'Third Grade Achievement vs. Achievement Growth (Grades per Year)',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Years of Growth per Grade',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -1,
      max: 7,
      name: 'Average Grade 3 Achievement',
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)', // 'rgba(0,0,0,1)',
          color: 'rgba(145, 115, 255, 1)', // '#b6a2de' // 'rgba(255,0,0,0.25)'
        },
        z: 2
      },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
        type:'scatter',
          markLine: {
            animation: false,
            silent: true,
            label: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 2,
              padding: 5,
              color: '#052965',
              shadowColor: 'transparent',
              textShadowColor: 'transparent',
              textBorderColor: 'transparent'
            },
            data: [
              [
                {
                  name: '', // Y axis
                  coord: [3, 1.6],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [ 3, 0.4 ],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-0.5, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    // color: '#fff', // 'rgba(0,0,0,0.6)'
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // 'red' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // 'blue' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [6.5, 1],
                  symbol: 'none'
                },
              ]
            ]
          }
        },
      ]
  }
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: quadrant,
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 17, 3rd quadrant, lower right */
var state17 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Build the series of elements for quadrant highlight.
  var dataSeries = scatterplot.getDataSeries();
  var quadrant = getQuadrantSeries(3, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  const baseOverrides = {
    title: {
      text: 'Third Grade Achievement vs. Achievement Growth (Grades per Year)',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Years of Growth per Grade',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -1,
      max: 7,
      name: 'Average Grade 3 Achievement',
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)', // 'rgba(0,0,0,1)',
          color: 'rgba(145, 115, 255, 1)', // '#b6a2de' // 'rgba(255,0,0,0.25)'
        },
        z: 2
      },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
        type:'scatter',
          markLine: {
            animation: false,
            silent: true,
            label: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 2,
              padding: 5,
              color: '#052965',
              shadowColor: 'transparent',
              textShadowColor: 'transparent',
              textBorderColor: 'transparent'
            },
            data: [
              [
                {
                  name: '', // Y axis
                  coord: [3, 1.6],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [ 3, 0.4 ],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-0.5, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    // color: '#fff', // 'rgba(0,0,0,0.6)'
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // 'red' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // 'blue' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [6.5, 1],
                  symbol: 'none'
                },
              ]
            ]
          }
        },
      ]
  }
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: quadrant,
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 18, 1st quadrant, upper left */
var state18 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  // Build the series of elements for quadrant highlight.
  var dataSeries = scatterplot.getDataSeries();
  var quadrant = getQuadrantSeries(1, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  const baseOverrides = {
    title: {
      text: 'Third Grade Achievement vs. Achievement Growth (Grades per Year)',
      subtext: 'U.S. School Districts 2009-2016',
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Years of Growth per Grade',
      textStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      min: -1,
      max: 7,
      name: 'Average Grade 3 Achievement',
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)', // 'rgba(0,0,0,1)',
          color: 'rgba(145, 115, 255, 1)', // '#b6a2de' // 'rgba(255,0,0,0.25)'
        },
        z: 2
      },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
        type:'scatter',
          markLine: {
            animation: false,
            silent: true,
            label: {
              backgroundColor: 'rgba(255, 255, 255, 0.75)',
              borderRadius: 2,
              padding: 5,
              color: '#052965',
              shadowColor: 'transparent',
              textShadowColor: 'transparent',
              textBorderColor: 'transparent'
            },
            data: [
              [
                {
                  name: '', // Y axis
                  coord: [3, 1.6],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 0,
                      y2: 1,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)'
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [ 3, 0.4 ],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-0.5, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    // color: '#fff', // 'rgba(0,0,0,0.6)'
                    color: {
                      type: 'linear',
                      x: 0,
                      y: 0,
                      x2: 1,
                      y2: 0,
                      colorStops: [{
                          offset: 0, color: 'rgba(255, 255, 255, 0.18)' // 'red' // color at 0% position
                      },
                      {
                        offset: 0.25, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                        offset: 0.75, color: 'rgba(255, 255, 255, 0.78)' // 'blue' // color at 100% position
                      },
                      {
                          offset: 1, color: 'rgba(255, 255, 255, 0.18)' // 'blue' // color at 100% position
                      }],
                      global: false // false by default
                    },
                    type: 'solid'
                  }
                },
                {
                  coord: [6.5, 1],
                  symbol: 'none'
                },
              ]
            ]
          }
        },
      ]
  }
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: quadrant,
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 19: Achievement Growth vs. Family Socioeconomic Status, by District */
var state19 = function(scatterplot) {
  const base = scatterplot.getState('base');
  // var dataSeries = scatterplot.getDataSeries();
  var options = scatterplot.component.getOption();
  var highlight = {};
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }
  const baseOverrides = {
    title: {
      text: 'Achievement Growth vs. Family Socioeconomic Status, by District',
      subtext: 'US School Districts 2009-2016',
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      },
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    grid: {
      right: 42,
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Years of Growth per Grade',
      nameTextStyle: { // Styles for x and y axis labels
        fontSize: 12,
        lineHeight: 14
      },
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: 'Poor/Disadvantaged to Affluent/Advantaged',
    },
    series: [
      { id: 'base' },
      {
        id: 'highlighted',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#042965', // 'rgba(0,0,0,1)',
          color: 'rgba(255,255,0,0.95)'
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
                name: '', // upper right markline
                coord: [3, 1.25],
                symbol: 'none',
                lineStyle: {
                  color: '#fff', // '#adadad'
                  type: 'solid'
                },
              },
              {
                coord: [-1, .75],
                symbol: 'none'
              },
            ],
          [
            {
              name: '', // lower left markline
              coord: [1, 0.9],
              symbol: 'none',
              lineStyle: {
                color: '#fff', // '#adadad'
                type: 'solid'
              },
            },
            {
              coord: [-4, 0.8],
              symbol: 'none'
            },
          ],
          [
            {
              name: '', // x axis
              coord: [-4, 1],
              symbol: 'none',
              // lineStyle: {
              //   color: '#adadad' // 'rgba(0,0,0,0.2)'
              // }
              lineStyle: {
                // color: '#fff', // 'rgba(0,0,0,0.6)'
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                      offset: 0, color: 'rgba(255, 255, 255, 0.18)' // color at 0% position
                  },
                  {
                    offset: 0.25, color: 'rgba(255, 255, 255, 0.78)' // color at 25% position
                  },
                  {
                    offset: 0.75, color: 'rgba(255, 255, 255, 0.78)' // color at 50% position
                  },
                  {
                      offset: 1, color: 'rgba(255, 255, 255, 0.18)' // color at 100% position
                  }],
                  global: false // false by default
                },
                type: 'solid'
              }
            },
            {
              coord: [3, 1],
              symbol: 'none'
            },
          ]
        ]
      }
      },
    ]
  }
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'all_ses',
    yVar: 'all_grd',
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
scatterplot.addState('state11', state11);
scatterplot.addState('state12', state12);
scatterplot.addState('state13', state13);
scatterplot.addState('state14', state14);
scatterplot.addState('state15', state15);
scatterplot.addState('state16', state16);
scatterplot.addState('state17', state17);
scatterplot.addState('state18', state18);
scatterplot.addState('state19', state19);

// load the first state
// scatterplot.loadState('state1');

