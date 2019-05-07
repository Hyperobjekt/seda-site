/**
 * scatterplot states for article one
 * - article storyboard: https://docs.google.com/document/d/1ShohEmEcoQoepsIBtQmzrUqAZ7pdFDL-i9dbfEaWtO0/edit
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
    return data
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
  highlight['5509600'] = 'Milwaukee School District';
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
  highlight['5509600'] = 'Milwaukee School District';
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

/** State 4: Grade 5 */
var state4 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
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

/** State 5, Grade 6 */
var state5 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
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

/** State 6, Grade 7 */
var state6 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
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

/** State 7, Grade 8 */
var state7 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
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

/** State 8, Avg achievement grade 3 vs years growth per grade */
var state8 = function(scatterplot) {
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
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 8, Avg achievement grade 3 vs years growth per grade */
var state9 = function(scatterplot) {
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
                  // lineStyle: {
                  //   color: '#fff', // 'rgba(0,0,0,0.6)'
                  //   type: 'dashed'
                  // }
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
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 10: Achievement vs. Gap in Exposure to School Poverty */
var state10 = function(scatterplot) {
  const base = scatterplot.getState('base');
  var dataSeries = scatterplot.getDataSeries();
  var options = scatterplot.component.getOption();
  // var top100 = scatterplot.getSeriesDataBySize(dataSeries.data, 100)
  // var highlight = {
  //   '1100030': 'District of Columbia',
  //   '2612000': 'Detroit, MI'
  // }
  var searchSeries = [];
  if (scatterplot && scatterplot.data) {
    searchSeries = scatterplot.getSeriesDataForIds(dataSeries.data, searchItemIDs);
  }
  // return options;
  const baseOverrides = {
    title: {
      text: '3rd Grade Achievement vs.\nAchievement Growth (Grades per Year), by District',
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
      min: -3,
      max: 3,
      name: 'Average Grade 3 Achievement',
    },
    series: [
      dataSeries,
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
      },
      {
        type:'scatter',
          markLine: {
          data: [
          [
            {
              name: '', // Y axis
              coord: [0, 0.4],
              symbol: 'none',
              lineStyle: {
                color: '#adadad'
              }
            },
            {
              coord: [ 0,  1.6],
              symbol: 'none'
            },
          ],
          [
            {
              name: 'x axis', // x axis
              coord: [-3, 0.95],
              symbol: 'none',
              lineStyle: {
                color: '#adadad'
              }
            },
            {
              coord: [3, 0.95],
              symbol: 'none'
            },
          ]
        ]}
      }
    ]
  }
  return {
    highlighted: [], // Object.keys(highlight),
    xVar: 'all_avg',
    yVar: 'all_grd',
    zVar: 'all_sz',
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 11: Achievement vs. Gap in Exposure to School Poverty */
// var state11 = function(scatterplot) {
//   var options = scatterplot.component.getOption();
//   return options;
// }

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
// scatterplot.addState('state11', state11);

// load the first state
// scatterplot.loadState('state1');

