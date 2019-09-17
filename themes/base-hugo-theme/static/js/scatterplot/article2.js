/**
 * scatterplot states for article two, "Affluent Schools Are Not Always the Best Schools"
 * - article storyboard: https://docs.google.com/document/d/1ShohEmEcoQoepsIBtQmzrUqAZ7pdFDL-i9dbfEaWtO0/edit
 */

// Set local placeholder for jQuery
const jQ = jQuery;

const axisBlue = '#547892';
let activeHighlight = {};
const highlightedLabel = (highlight) => {
  // console.log('highlightedLabel');
  activeHighlight = highlight;
  return {
    show: true,
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // '#0090FF', // '#FFFCCF',
    borderColor: '#7D38BB',
    borderWidth: 0,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'SharpGrotesk-Medium20', // 'MaisonNeue-Medium',
    lineHeight: 12,
    padding: [8, 8],
    borderRadius: 3,
    opacity: 1,
    color: 'rgba(25, 25, 25, 0.91)', // '#fff', // '#052965',
    formatter: function(item) {
      // console.log(item);
      // console.log(activeHighlight);
      return activeHighlight[item.value[3]]
    },
  };
}
//Orange bubbles
const highlightedItemStyle =  {
  borderWidth: 0.4,
  borderColor: 'rgba(156,109,0,0.8)', // '#FFC02D',
  color: 'rgba(255, 178, 0, 0.77)', // '#FFFCDD',
  opacity: 1,
  shadowBlur: 2,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffsetX: 0,
  shadowOffsetY: 1
};
const selectedItemStyle = {
  borderWidth: 0.4,
  borderColor: 'rgba(89, 151, 203, 0.8)', // '#7D38BB',
  color: '#48CB95', // '#BC72FF',
  color: 'rgba(177, 222, 238, 0.8)',
  opacity: 1,
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

// Placeholders for segregation series operations
// let segData = [];
let searchItemIDs = [];
let names = [];
let allGrdData = [];
let Title = {};
Title['text'] = '';
Title['subtext'] = '';
Title['setTitle'] = function() {
  // Set title and subtitle
  jQ('.column-scatterplot .title').html(Title.text);
  jQ('.column-scatterplot .subtitle').html(Title.subtext);
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

/** State 1: Grade 3 Chicago + Anne Arundel  */
var state1 = function(scatterplot) {
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 3';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  return {
    xVar: 'all_ses',
    yVar: 'all_avg3',
    zVar: 'all_sz',
    selected: [],
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      title: {
        show: false,
        text: Title.text,
        subtext: Title.subtext,
        textAlign: 'center',
        left: '50%',
        top: '10px',
      },
      aria: {
        show: true,
        description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
      },
      yAxis: {
        min: -4, // -0.5,
        max: 4, // 9,
        name: 'Achievement (in Grade Levels)',
      },
      xAxis: {
        min: -4,
        max: 3,
        name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
      },
      tooltip: {
        // trigger: 'item',
        formatter: function(item) {
          return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
        }
      },
      series: [
        { id: 'base' },
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
              data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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

/** State 3: Grade 4 Chicago + Anne Arundel */
var state3 = function(scatterplot) {
  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 4';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  return {
    xVar: 'all_ses',
    yVar: 'all_avg4',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge(base.options, {
      title: {
        show: false,
        text: Title.text,
        subtext: Title.subtext,
        textAlign: 'center',
        left: '50%',
        top: '10px',
      },
      aria: {
        show: true,
        description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
      },
      yAxis: {
        min: -4,
        max: 4,
        name: 'Achievement (in Grade Levels)',
      },
      xAxis: {
        min: -4,
        max: 3,
        name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
      },
      tooltip: {
        // trigger: 'item',
        formatter: function(item) {
          return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
        }
      },
      series: [
        { id: 'base' },
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
              data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 5';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4, // -0.5,
      max: 4, // 9,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 6';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4, // -0.5,
      max: 4, // 9,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 7';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4, // -0.5,
      max: 4, // 9,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 8';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['1709930'] = 'Chicago Public School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 3';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4, // -0.5,
      max: 4, // 9,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['1709930'] = 'Chicago Public School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 4';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4, // -0.5,
      max: 4,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['1709930'] = 'Chicago Public School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 5';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['1709930'] = 'Chicago Public School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 6';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4, // -0.5,
      max: 4, // 9,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['1709930'] = 'Chicago Public School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 7';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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
  highlight['1709930'] = 'Chicago Public School District';
  // highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Average Test Scores, Grade 8';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px',
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '' ),
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)',
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: '', // Grade level
                  coord: [-4, 0],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [3, 0],
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

/** State 14, Avg achievement grade 3 vs years growth per grade */
var state14 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [
      { id: 'base' },
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
            data: [
              [
                {
                  name: 'Average', // Grade level
                  coord: [0, 1.6],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 1
                  },
                },
                {
                  coord: [0, 0.45],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: 'Average', // y axis markline
                  coord: [-4, 1],
                  symbol: 'none',
                  label: {
                    show: false,
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [3.75, 1],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: 'Average', // y axis markline
                  coord: [4, 0.4],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'middle',
                    padding: [0, 0, -5, 0]
                    // rotate: -90
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 0
                  }
                },
                {
                  coord: [4, 1.6],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '', // Grade level
                  coord: [-3, 1.6],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 0
                  },
                },
                {
                  coord: [-3, 0.45],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '', // Grade level
                  coord: [3, 1.6],
                  symbol: 'none',
                  lineStyle: {
                    color: '#052965', // '#adadad'
                    type: 'solid',
                    width: 0
                  },
                },
                {
                  coord: [3, 0.45],
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

/** State 15, 2nd quadrant, upper right */

var state15 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';
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
  // Update title and subtext placeholders
  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        // name: 'High early opportunity,\nhigh growth opportunity',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          zlevel: 50,
          z: 50,
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)',
          color: 'rgba(145, 115, 255, 1)',
        },
        label: {
          position: '6, 1.6',
          show: false,
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
            symbol: 'none',
            symbolSize: 0,
            data: [
              [
                {
                  name: 'Average', // Y axis
                  coord: [0, 1.6],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'end'
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [ 0, 0.45 ],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: 'Average', // y axis markline
                  coord: [4, 0.4],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'middle',
                    padding: [0, 0, -5, 0]
                    // rotate: -90
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 0
                  }
                },
                {
                  coord: [4, 1.6],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-4, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [3.75, 1],
                  symbol: 'none'
                },
              ]
            ]
          }
        },
      {
        id: 'markQuadrantLine',
        type: 'scatter',
        name: 'High early opportunity, high growth',
        markLine: {
          silent: true,
          animation: false,
          label: {
            show: true,
            position: 'insideTopRight',
            verticalAlign: 'top',
            padding: [5, 5, 0, 0],
            color: '#052965',
            fontWeight: 500,
            fontFamily: 'MaisonNeue-Medium',
          },
          data: [
            [{
              coord: [0, 1.3],
              symbol: 'none',
              symbolSize: 0,
              lineStyle: {
                color: '#73D8AE', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 140,
                type: 'solid',
                opacity: 0.65,

              },
            }, {
              coord: [4, 1.3],
              symbol: 'none',
              symbolSize: 0
            }],
            [{
              coord: [2.15, 1.56],
              symbol: 'none',
              name: 'High early opportunity, high growth',
              symbolSize: 0,
              lineStyle: {
                color: 'transparent', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 0,
                type: 'solid',
                opacity: 0,

              },
              label: {
                show: true,
                color: '#052965',
                fontWeight: 500,
                fontSize: 13,
                fontFamily: 'MaisonNeue-Medium',
                position: 'middle'
              }
            }, {
              coord: [2.16, 1.56],
              symbol: 'none',
              symbolSize: 0
            }]
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

/** State 16, 4th quadrant, lower left */
var state16 = function(scatterplot) {
  // get current echart options
  const options = scatterplot.component.getOption();
  // this state is created from the base
  const base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';
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
  // var quadrant = getQuadrantSeries(4, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);

  // Update title and subtext placeholders
  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [
      { id: 'base' },
      {
        id: 'markQuadrantLine',
        type: 'scatter',
        markLine: {
          silent: true,
          animate: true,
          data: [
            [{
              coord: [-4, 0.7],
              symbol: 'none',
              symbolSize: 0,
              lineStyle: {
                color: '#73D8AE', // 'rgba(253, 165, 2, 1)',
                width: 140,
                type: 'solid',
                opacity: 0.65,

              },
            }, {
              coord: [0, 0.7],
              symbol: 'none',
              symbolSize: 0
            }],
            [{
              coord: [-2.2, 0.44],
              symbol: 'none',
              name: 'Low early opportunity, low growth',
              symbolSize: 0,
              lineStyle: {
                color: 'transparent', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 0,
                type: 'solid',
                opacity: 0,

              },
              label: {
                show: true,
                position: 'middle',
                color: '#052965',
                fontWeight: 500,
                fontSize: 13,
                fontFamily: 'MaisonNeue-Medium',
              }
            }, {
              coord: [-2.21, 0.44],
              symbol: 'none',
              symbolSize: 0
            }]
          ]
        }
      }, // End markline
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)', // 'rgba(0,0,0,1)',
          color: 'rgba(145, 115, 255, 1)', // '#b6a2de' // 'rgba(255,0,0,0.25)'
        },
        z: 2,
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
              padding: 5,
              color: '#052965',
            },
            data: [
              [
                {
                  name: 'Average', // Y axis
                  coord: [0, 1.6],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'end',
                    padding: [0, 0, 0, 0]
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [ 0, 0.45 ],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: 'Average', // x axis markline
                  coord: [4, 0.4],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'middle',
                    padding: [0, 0, -5, 0]
                    // rotate: -90
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 0
                  }
                },
                {
                  coord: [4, 1.6],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: 'Average', // x axis
                  coord: [-4, 1],
                  symbol: 'none',
                  label: {
                    show: false,
                    position: 'end'
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [3.75, 1],
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
    selected: [],
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';
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
  // var quadrant = getQuadrantSeries(3, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);

  // Update title and subtext placeholders
  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
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
        z: 2,
      },
      {
        id: 'markQuadrantLine',
        type: 'scatter',
        markLine: {
          silent: true,
          animate: true,
          data: [
            [{
              coord: [0, 0.7],
              symbol: 'none',
              symbolSize: 0,
              lineStyle: {
                color: '#73D8AE', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 140,
                type: 'solid',
                opacity: 0.65,

              },
            }, {
              coord: [4, 0.7],
              symbol: 'none',
              symbolSize: 0
            }],
            [{
              coord: [2.15, 0.44],
              symbol: 'none',
              name: 'High early opportunity, low growth',
              symbolSize: 0,
              lineStyle: {
                color: 'transparent', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 0,
                type: 'solid',
                opacity: 0,

              },
              label: {
                show: true,
                position: 'middle',
                color: '#052965',
                fontWeight: 500,
                fontSize: 13,
                fontFamily: 'MaisonNeue-Medium',
              }
            }, {
              coord: [2.16, 0.44],
              symbol: 'none',
              symbolSize: 0
            }]
          ]
        }
      }, // End markline
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
            data: [
              [
                {
                  name: 'Average', // Y axis
                  coord: [0, 1.6],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'end',
                    padding: [0, 0, 0, 0]
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [0, 0.45],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: 'Average', // x axis markline
                  coord: [4, 0.4],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'middle',
                    padding: [0, 0, -5, 0]
                    // rotate: -90
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 0
                  }
                },
                {
                  coord: [4, 1.6],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-4, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [3.75, 1],
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
    selected: [],
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
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';
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
  // var quadrant = getQuadrantSeries(1, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);

  // Update title and subtext placeholders
  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [
      { id: 'base' },
      {
        id: 'selected',
        type: 'scatter',
        symbolSize: dataSeries.symbolSize,
        itemStyle: {
          borderWidth: 1,
          borderColor: 'rgba(20, 33, 156, 1)',
          color: 'rgba(145, 115, 255, 1)',
        },
        z: 2,
      },
      {
        id: 'markQuadrantLine',
        type: 'scatter',
        markLine: {
          silent: true,
          animate: true,
          data: [
            [{
              coord: [-4, 1.3],
              symbol: 'none',
              symbolSize: 0,
              lineStyle: {
                color: '#73D8AE', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 140,
                type: 'solid',
                opacity: 0.56,
              },
            }, {
              coord: [0, 1.3],
              symbol: 'none',
              symbolSize: 0
            }],
            [{
              coord: [-2.2, 1.48],
              symbol: 'none',
              name: 'Low early opportunity, high growth',
              symbolSize: 0,
              lineStyle: {
                color: 'transparent', // 'rgba(253, 165, 2, 1)', // 'red',
                width: 0,
                type: 'solid',
                opacity: 0,

              },
              label: {
                show: true,
                position: 'middle',
                color: '#052965',
                fontWeight: 500,
                fontSize: 13,
                fontFamily: 'MaisonNeue-Medium',
              }
            }, {
              coord: [-2.21, 1.48],
              symbol: 'none',
              symbolSize: 0
            }]
          ]
        }
      }, // End markline
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
            data: [
              [
                {
                  name: 'Average', // Y axis
                  coord: [0, 1.6],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'end',
                    padding: [0, 0, 0, 0]
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [0, 0.45],
                  symbol: 'none',
                },
              ],
              [
                {
                  name: 'Average', // x axis markline
                  coord: [4, 0.4],
                  symbol: 'none',
                  label: {
                    show: true,
                    position: 'middle',
                    padding: [0, 0, -5, 0]
                    // rotate: -90
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 0
                  }
                },
                {
                  coord: [4, 1.6],
                  symbol: 'none'
                },
              ],
              [
                {
                  name: '', // x axis
                  coord: [-4, 1],
                  symbol: 'none',
                  label: {
                    show: false
                  },
                  lineStyle: {
                    color: '#052965',
                    type: 'solid',
                    width: 1
                  }
                },
                {
                  coord: [3.75, 1],
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
    selected: [],
    options: deepmerge.all([ base.options, baseOverrides ])
  }
}

/** State 19: Achievement Growth vs. Family Socioeconomic Status, by District */
var state19 = function(scatterplot) {
  const base = scatterplot.getState('base');
  // var dataSeries = scatterplot.getDataSeries();
  var options = scatterplot.component.getOption();
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    }
    // console.log(highlight);
  }

  // Update title and subtext placeholders
  Title['text'] = 'Learning Rates';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle
  Title.setTitle();

  const baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textStyle: {
        fontSize: 18,
        lineHeight: 32
      },
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
      right: 26,
      zlevel: 100,
      height: 'auto',// 280,
      width: 'auto', // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶',
    },
    tooltip: {
      // trigger: 'item',
      formatter: function(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Learning Rate', 0, 1);
      }
    },
    series: [
      { id: 'base' },
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
            data: [
            [
              {
                name: '', // upper right markline
                coord: [3, 1.25],
                symbol: 'none',
                lineStyle: {
                  color: 'rgba(255, 192, 45, 1)',
                  type: 'solid',
                  width: 0 // removing this line
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
                color: 'rgba(255, 192, 45, 1)',
                type: 'solid',
                width: 0 //removing this line
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
                color: '#052965',
                type: 'solid',
                width: 1
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
// scatterplot.addState('state1_1', state1_1);
// scatterplot.addState('state2', state2);
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
