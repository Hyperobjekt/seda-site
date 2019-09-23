"use strict";

var _selectedItemStyle;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * scatterplot states for article two, "Affluent Schools Are Not Always the Best Schools"
 * - article storyboard: https://docs.google.com/document/d/1ShohEmEcoQoepsIBtQmzrUqAZ7pdFDL-i9dbfEaWtO0/edit
 */
// Set local placeholder for jQuery
var jQ = jQuery;
var axisBlue = '#547892';
var activeHighlight = {};

var highlightedLabel = function highlightedLabel(highlight) {
  // console.log('highlightedLabel');
  activeHighlight = highlight;
  return {
    show: true,
    position: 'top',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    // '#0090FF', // '#FFFCCF',
    borderColor: '#7D38BB',
    borderWidth: 0,
    fontSize: 12,
    fontWeight: 500,
    fontFamily: 'SharpGrotesk-Medium20',
    // 'MaisonNeue-Medium',
    lineHeight: 12,
    padding: [8, 8],
    borderRadius: 3,
    opacity: 1,
    color: 'rgba(25, 25, 25, 0.91)',
    // '#fff', // '#052965',
    formatter: function formatter(item) {
      // console.log(item);
      // console.log(activeHighlight);
      return activeHighlight[item.value[3]];
    }
  };
}; //Orange bubbles


var highlightedItemStyle = {
  borderWidth: 0.4,
  borderColor: 'rgba(156,109,0,0.8)',
  // '#FFC02D',
  color: 'rgba(255, 178, 0, 0.77)',
  // '#FFFCDD',
  opacity: 1,
  shadowBlur: 2,
  shadowColor: 'rgba(0, 0, 0, 0.1)',
  shadowOffsetX: 0,
  shadowOffsetY: 1
};
var selectedItemStyle = (_selectedItemStyle = {
  borderWidth: 0.4,
  borderColor: 'rgba(89, 151, 203, 0.8)',
  // '#7D38BB',
  color: '#48CB95'
}, _defineProperty(_selectedItemStyle, "color", 'rgba(177, 222, 238, 0.8)'), _defineProperty(_selectedItemStyle, "opacity", 1), _selectedItemStyle);
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
}; // Placeholders for segregation series operations
// let segData = [];

var searchItemIDs = [];
var names = [];
var allGrdData = [];
var Title = {};
Title['text'] = '';
Title['subtext'] = '';

Title['setTitle'] = function () {
  // Set title and subtitle
  jQ('.column-scatterplot .title').html(Title.text);
  jQ('.column-scatterplot .subtitle').html(Title.subtext);
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
} //
// Fetch the additional segregation data for state 9.
//


var grdCSV = 'https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/districts-all_grd.csv';
var xhr = new XMLHttpRequest();
xhr.open("GET", grdCSV, true);

xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // console.log(xhr.responseText);
      // console.log('Seg data request finished.');
      // console.log(this.responseText);
      var csvResponse = this.responseText;
      var json = Papa.parse(csvResponse);
      allGrdData = json.data; // console.log('logging segregation data');
      // console.log(segData);
      // Trim off column headings and any blank rows

      allGrdData = allGrdData.filter(function (e) {
        return e[0] !== 'id';
      });
      allGrdData = allGrdData.filter(function (e) {
        return e[0] !== '';
      }); // console.log(allGrdData);
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

var state1 = function state1(scatterplot) {
  if (names.length <= 0 && scatterplot && scatterplot.data && scatterplot.data.districts && scatterplot.data.districts.name) {
    names = scatterplot.data.districts.name; // console.log(names);
  } // state 2 is based on state 1


  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


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
        top: '10px'
      },
      aria: {
        show: true,
        description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
      },
      yAxis: {
        min: -4,
        // -0.5,
        max: 4,
        // 9,
        name: 'Achievement (in Grade Levels)'
      },
      xAxis: {
        min: -4,
        max: 3,
        name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
      },
      tooltip: {
        // trigger: 'item',
        formatter: function formatter(item) {
          return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
        markLine: {
          animation: false,
          silent: true,
          data: [[{
            name: '',
            // Grade level
            coord: [-4, 0],
            symbol: 'none',
            lineStyle: {
              color: '#052965',
              // '#adadad'
              type: 'solid',
              width: 1
            }
          }, {
            coord: [3, 0],
            symbol: 'none'
          }]]
        }
      }]
    })
  };
};
/** State 3: Grade 4 Chicago + Anne Arundel */


var state3 = function state3(scatterplot) {
  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


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
        top: '10px'
      },
      aria: {
        show: true,
        description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
      },
      yAxis: {
        min: -4,
        max: 4,
        name: 'Achievement (in Grade Levels)'
      },
      xAxis: {
        min: -4,
        max: 3,
        name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
      },
      tooltip: {
        // trigger: 'item',
        formatter: function formatter(item) {
          return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
        markLine: {
          animation: false,
          silent: true,
          data: [[{
            name: '',
            // Grade level
            coord: [-4, 0],
            symbol: 'none',
            lineStyle: {
              color: '#052965',
              // '#adadad'
              type: 'solid',
              width: 1
            }
          }, {
            coord: [3, 0],
            symbol: 'none'
          }]]
        }
      }]
    })
  };
};
/** State 4: Grade 5 Chicago */


var state4 = function state4(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 5';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      // -0.5,
      max: 4,
      // 9,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg5',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 5, Grade 6 Chicago */


var state5 = function state5(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 6';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      // -0.5,
      max: 4,
      // 9,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg6',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 6, Grade 7 Chicago */


var state6 = function state6(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 7';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      // -0.5,
      max: 4,
      // 9,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg7',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 7, Grade 8 Chicago */


var state7 = function state7(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 8';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg8',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 8, Grade 3 Milwaukee */


var state8 = function state8(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District'; // highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 3';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      // -0.5,
      max: 4,
      // 9,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg3',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 9, Grade 4 Milwaukee */


var state9 = function state9(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District'; // highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 4';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      // -0.5,
      max: 4,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg4',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 10, Grade 5 Milwaukee */


var state10 = function state10(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District'; // highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 5';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg5',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 11, Grade 6 Milwaukee */


var state11 = function state11(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District'; // highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 6';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      // -0.5,
      max: 4,
      // 9,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg6',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 12, Grade 7 Milwaukee */


var state12 = function state12(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District'; // highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 7';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg7',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 13, Grade 8 Milwaukee */


var state13 = function state13(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['5509600'] = 'Milwaukee School District';
  highlight['1709930'] = 'Chicago Public School District'; // highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Average Test Scores, Grade 8';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
      textAlign: 'center',
      left: '50%',
      top: '10px'
    },
    aria: {
      show: true,
      description: Title.text + (Title['subtext'].length >= 1 ? ', ' + Title['subtext'] : '')
    },
    yAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (in Grade Levels)'
    },
    xAxis: {
      min: -4,
      max: 3,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Achievement');
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // Grade level
          coord: [-4, 0],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 1
          }
        }, {
          coord: [3, 0],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_ses',
    yVar: 'all_avg8',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 14, Avg achievement grade 3 vs years growth per grade */


var state14 = function state14(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function formatter(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: 'Average',
          // Grade level
          coord: [0, 1.6],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 1
          }
        }, {
          coord: [0, 0.45],
          symbol: 'none'
        }], [{
          name: 'Average',
          // y axis markline
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
        }, {
          coord: [3.75, 1],
          symbol: 'none'
        }], [{
          name: 'Average',
          // y axis markline
          coord: [4, 0.4],
          symbol: 'none',
          label: {
            show: true,
            position: 'middle',
            padding: [0, 0, -5, 0] // rotate: -90

          },
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 0
          }
        }, {
          coord: [4, 1.6],
          symbol: 'none'
        }], [{
          name: '',
          // Grade level
          coord: [-3, 1.6],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 0
          }
        }, {
          coord: [-3, 0.45],
          symbol: 'none'
        }], [{
          name: '',
          // Grade level
          coord: [3, 1.6],
          symbol: 'none',
          lineStyle: {
            color: '#052965',
            // '#adadad'
            type: 'solid',
            width: 0
          }
        }, {
          coord: [3, 0.45],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: [],
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 15, 2nd quadrant, upper right */


var state15 = function state15(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Build the series of elements for quadrant highlight.


  var dataSeries = scatterplot.getDataSeries(); // Update title and subtext placeholders

  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function formatter(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'selected',
      type: 'scatter',
      // name: 'High early opportunity,\nhigh growth opportunity',
      symbolSize: dataSeries.symbolSize,
      itemStyle: {
        zlevel: 50,
        z: 50,
        borderWidth: 1,
        borderColor: 'rgba(20, 33, 156, 1)',
        color: 'rgba(145, 115, 255, 1)'
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
        formatter: function formatter(item) {
          return highlight[item.value[3]];
        }
      }
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
        symbol: 'none',
        symbolSize: 0,
        data: [[{
          name: 'Average',
          // Y axis
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
        }, {
          coord: [0, 0.45],
          symbol: 'none'
        }], [{
          name: 'Average',
          // y axis markline
          coord: [4, 0.4],
          symbol: 'none',
          label: {
            show: true,
            position: 'middle',
            padding: [0, 0, -5, 0] // rotate: -90

          },
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 0
          }
        }, {
          coord: [4, 1.6],
          symbol: 'none'
        }], [{
          name: '',
          // x axis
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
        }, {
          coord: [3.75, 1],
          symbol: 'none'
        }]]
      }
    }, {
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
          fontFamily: 'MaisonNeue-Medium'
        },
        data: [[{
          coord: [0, 1.3],
          symbol: 'none',
          symbolSize: 0,
          lineStyle: {
            color: '#73D8AE',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 140,
            type: 'solid',
            opacity: 0.65
          }
        }, {
          coord: [4, 1.3],
          symbol: 'none',
          symbolSize: 0
        }], [{
          coord: [2.15, 1.56],
          symbol: 'none',
          name: 'High early opportunity, high growth',
          symbolSize: 0,
          lineStyle: {
            color: 'transparent',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 0,
            type: 'solid',
            opacity: 0
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
        }]]
      }
    }]
  };
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: [],
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 16, 4th quadrant, lower left */


var state16 = function state16(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Build the series of elements for quadrant highlight.


  var dataSeries = scatterplot.getDataSeries(); // var quadrant = getQuadrantSeries(4, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  // Update title and subtext placeholders

  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function formatter(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'markQuadrantLine',
      type: 'scatter',
      markLine: {
        silent: true,
        animate: true,
        data: [[{
          coord: [-4, 0.7],
          symbol: 'none',
          symbolSize: 0,
          lineStyle: {
            color: '#73D8AE',
            // 'rgba(253, 165, 2, 1)',
            width: 140,
            type: 'solid',
            opacity: 0.65
          }
        }, {
          coord: [0, 0.7],
          symbol: 'none',
          symbolSize: 0
        }], [{
          coord: [-2.2, 0.44],
          symbol: 'none',
          name: 'Low early opportunity, low growth',
          symbolSize: 0,
          lineStyle: {
            color: 'transparent',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 0,
            type: 'solid',
            opacity: 0
          },
          label: {
            show: true,
            position: 'middle',
            color: '#052965',
            fontWeight: 500,
            fontSize: 13,
            fontFamily: 'MaisonNeue-Medium'
          }
        }, {
          coord: [-2.21, 0.44],
          symbol: 'none',
          symbolSize: 0
        }]]
      }
    }, // End markline
    {
      id: 'selected',
      type: 'scatter',
      symbolSize: dataSeries.symbolSize,
      itemStyle: {
        borderWidth: 1,
        borderColor: 'rgba(20, 33, 156, 1)',
        // 'rgba(0,0,0,1)',
        color: 'rgba(145, 115, 255, 1)' // '#b6a2de' // 'rgba(255,0,0,0.25)'

      },
      z: 2
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
          padding: 5,
          color: '#052965'
        },
        data: [[{
          name: 'Average',
          // Y axis
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
        }, {
          coord: [0, 0.45],
          symbol: 'none'
        }], [{
          name: 'Average',
          // x axis markline
          coord: [4, 0.4],
          symbol: 'none',
          label: {
            show: true,
            position: 'middle',
            padding: [0, 0, -5, 0] // rotate: -90

          },
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 0
          }
        }, {
          coord: [4, 1.6],
          symbol: 'none'
        }], [{
          name: 'Average',
          // x axis
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
        }, {
          coord: [3.75, 1],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: [],
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 17, 3rd quadrant, lower right */


var state17 = function state17(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Build the series of elements for quadrant highlight.


  var dataSeries = scatterplot.getDataSeries(); // var quadrant = getQuadrantSeries(3, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  // Update title and subtext placeholders

  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function formatter(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'selected',
      type: 'scatter',
      symbolSize: dataSeries.symbolSize,
      itemStyle: {
        borderWidth: 1,
        borderColor: 'rgba(20, 33, 156, 1)',
        // 'rgba(0,0,0,1)',
        color: 'rgba(145, 115, 255, 1)' // '#b6a2de' // 'rgba(255,0,0,0.25)'

      },
      z: 2
    }, {
      id: 'markQuadrantLine',
      type: 'scatter',
      markLine: {
        silent: true,
        animate: true,
        data: [[{
          coord: [0, 0.7],
          symbol: 'none',
          symbolSize: 0,
          lineStyle: {
            color: '#73D8AE',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 140,
            type: 'solid',
            opacity: 0.65
          }
        }, {
          coord: [4, 0.7],
          symbol: 'none',
          symbolSize: 0
        }], [{
          coord: [2.15, 0.44],
          symbol: 'none',
          name: 'High early opportunity, low growth',
          symbolSize: 0,
          lineStyle: {
            color: 'transparent',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 0,
            type: 'solid',
            opacity: 0
          },
          label: {
            show: true,
            position: 'middle',
            color: '#052965',
            fontWeight: 500,
            fontSize: 13,
            fontFamily: 'MaisonNeue-Medium'
          }
        }, {
          coord: [2.16, 0.44],
          symbol: 'none',
          symbolSize: 0
        }]]
      }
    }, // End markline
    {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }, {
      type: 'scatter',
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: 'Average',
          // Y axis
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
        }, {
          coord: [0, 0.45],
          symbol: 'none'
        }], [{
          name: 'Average',
          // x axis markline
          coord: [4, 0.4],
          symbol: 'none',
          label: {
            show: true,
            position: 'middle',
            padding: [0, 0, -5, 0] // rotate: -90

          },
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 0
          }
        }, {
          coord: [4, 1.6],
          symbol: 'none'
        }], [{
          name: '',
          // x axis
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
        }, {
          coord: [3.75, 1],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: [],
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 18, 1st quadrant, upper left */


var state18 = function state18(scatterplot) {
  // get current echart options
  var options = scatterplot.component.getOption(); // this state is created from the base

  var base = scatterplot.getState('base');
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';
  highlight['5509600'] = 'Milwaukee School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Build the series of elements for quadrant highlight.


  var dataSeries = scatterplot.getDataSeries(); // var quadrant = getQuadrantSeries(1, 3, 1, Object.entries(scatterplot.data['districts']['all_avg3']), allGrdData);
  // Update title and subtext placeholders

  Title['text'] = 'Learning Rates and 3rd Grade Achievement';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
    title: {
      show: false,
      text: Title.text,
      subtext: Title.subtext,
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
      right: 26,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function formatter(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 4,
      name: 'Achievement (In Grade Levels)'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Achievement', 'Learning Rate', 0, 1);
      }
    },
    series: [{
      id: 'base'
    }, {
      id: 'selected',
      type: 'scatter',
      symbolSize: dataSeries.symbolSize,
      itemStyle: {
        borderWidth: 1,
        borderColor: 'rgba(20, 33, 156, 1)',
        color: 'rgba(145, 115, 255, 1)'
      },
      z: 2
    }, {
      id: 'markQuadrantLine',
      type: 'scatter',
      markLine: {
        silent: true,
        animate: true,
        data: [[{
          coord: [-4, 1.3],
          symbol: 'none',
          symbolSize: 0,
          lineStyle: {
            color: '#73D8AE',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 140,
            type: 'solid',
            opacity: 0.56
          }
        }, {
          coord: [0, 1.3],
          symbol: 'none',
          symbolSize: 0
        }], [{
          coord: [-2.2, 1.48],
          symbol: 'none',
          name: 'Low early opportunity, high growth',
          symbolSize: 0,
          lineStyle: {
            color: 'transparent',
            // 'rgba(253, 165, 2, 1)', // 'red',
            width: 0,
            type: 'solid',
            opacity: 0
          },
          label: {
            show: true,
            position: 'middle',
            color: '#052965',
            fontWeight: 500,
            fontSize: 13,
            fontFamily: 'MaisonNeue-Medium'
          }
        }, {
          coord: [-2.21, 1.48],
          symbol: 'none',
          symbolSize: 0
        }]]
      }
    }, // End markline
    {
      id: 'highlighted',
      itemStyle: highlightedItemStyle,
      label: highlightedLabel(highlight),
      zlevel: 500
    }, {
      type: 'scatter',
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: 'Average',
          // Y axis
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
        }, {
          coord: [0, 0.45],
          symbol: 'none'
        }], [{
          name: 'Average',
          // x axis markline
          coord: [4, 0.4],
          symbol: 'none',
          label: {
            show: true,
            position: 'middle',
            padding: [0, 0, -5, 0] // rotate: -90

          },
          lineStyle: {
            color: '#052965',
            type: 'solid',
            width: 0
          }
        }, {
          coord: [4, 1.6],
          symbol: 'none'
        }], [{
          name: '',
          // x axis
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
        }, {
          coord: [3.75, 1],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    xVar: 'all_avg3',
    yVar: 'all_grd',
    zVar: 'all_sz',
    highlighted: Object.keys(highlight),
    selected: [],
    options: deepmerge.all([base.options, baseOverrides])
  };
};
/** State 19: Achievement Growth vs. Family Socioeconomic Status, by District */


var state19 = function state19(scatterplot) {
  var base = scatterplot.getState('base'); // var dataSeries = scatterplot.getDataSeries();

  var options = scatterplot.component.getOption();
  var highlight = {};
  highlight['2400060'] = 'Anne Arundel County Public Schools';
  highlight['1709930'] = 'Chicago Public School District';

  if (searchItemIDs.length >= 1 && Object.keys(names).length >= 0) {
    // There's a search item selected.
    // Add it to the highlight object.
    if (names[searchItemIDs[0]].length >= 1) {
      highlight[searchItemIDs[0]] = names[searchItemIDs[0]];
    } // console.log(highlight);

  } // Update title and subtext placeholders


  Title['text'] = 'Learning Rates';
  Title['subtext'] = ''; // U.S. School Districts 2009-2016
  // Set title and subtitle

  Title.setTitle();
  var baseOverrides = {
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
      right: 26,
      zlevel: 100,
      height: 'auto',
      // 280,
      width: 'auto',
      // 'auto',
      containLabel: true
    },
    yAxis: {
      min: 0.4,
      max: 1.6,
      name: 'Learning Rates',
      nameGap: 45,
      axisLabel: {
        formatter: function formatter(item) {
          return scatterplot.getPercentDiffLabel(item);
        }
      }
    },
    xAxis: {
      min: -4,
      max: 3.5,
      name: '◀  POORER                    Socioeconomic Status                    RICHER  ▶'
    },
    tooltip: {
      // trigger: 'item',
      formatter: function formatter(item) {
        return scatterplot.formatTooltip(item, scatterplot.data, 'Socioeconomic Status', 'Learning Rate', 0, 1);
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
      markLine: {
        animation: false,
        silent: true,
        data: [[{
          name: '',
          // upper right markline
          coord: [3, 1.25],
          symbol: 'none',
          lineStyle: {
            color: 'rgba(255, 192, 45, 1)',
            type: 'solid',
            width: 0 // removing this line

          }
        }, {
          coord: [-1, .75],
          symbol: 'none'
        }], [{
          name: '',
          // lower left markline
          coord: [1, 0.9],
          symbol: 'none',
          lineStyle: {
            color: 'rgba(255, 192, 45, 1)',
            type: 'solid',
            width: 0 //removing this line

          }
        }, {
          coord: [-4, 0.8],
          symbol: 'none'
        }], [{
          name: '',
          // x axis
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
        }, {
          coord: [3, 1],
          symbol: 'none'
        }]]
      }
    }]
  };
  return {
    highlighted: Object.keys(highlight),
    selected: [],
    xVar: 'all_ses',
    yVar: 'all_grd',
    zVar: 'all_sz',
    options: deepmerge.all([base.options, baseOverrides])
  };
}; // create the component


var rootEl = document.getElementById('scatterplot');
var scatterplot = new Scatterplot(rootEl); // set the states

scatterplot.addState('state1', state1); // scatterplot.addState('state1_1', state1_1);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NjYXR0ZXJwbG90L2FydGljbGUyLmpzIl0sIm5hbWVzIjpbImpRIiwialF1ZXJ5IiwiYXhpc0JsdWUiLCJhY3RpdmVIaWdobGlnaHQiLCJoaWdobGlnaHRlZExhYmVsIiwiaGlnaGxpZ2h0Iiwic2hvdyIsInBvc2l0aW9uIiwiYmFja2dyb3VuZENvbG9yIiwiYm9yZGVyQ29sb3IiLCJib3JkZXJXaWR0aCIsImZvbnRTaXplIiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJsaW5lSGVpZ2h0IiwicGFkZGluZyIsImJvcmRlclJhZGl1cyIsIm9wYWNpdHkiLCJjb2xvciIsImZvcm1hdHRlciIsIml0ZW0iLCJ2YWx1ZSIsImhpZ2hsaWdodGVkSXRlbVN0eWxlIiwic2hhZG93Qmx1ciIsInNoYWRvd0NvbG9yIiwic2hhZG93T2Zmc2V0WCIsInNoYWRvd09mZnNldFkiLCJzZWxlY3RlZEl0ZW1TdHlsZSIsImJhc2VHcmlkIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiemxldmVsIiwiaGVpZ2h0Iiwid2lkdGgiLCJjb250YWluTGFiZWwiLCJiYXNlWUF4aXMiLCJzcGxpdExpbmUiLCJuYW1lR2FwIiwibmFtZVRleHRTdHlsZSIsImJhc2VYQXhpcyIsInZlcnRpY2FsQWxpZ24iLCJzZWFyY2hJdGVtSURzIiwibmFtZXMiLCJhbGxHcmREYXRhIiwiVGl0bGUiLCJodG1sIiwidGV4dCIsInN1YnRleHQiLCJzbGljZUxlYXN0IiwiYXJyIiwic2l6ZSIsInNsaWNlIiwic2xpY2VNb3N0IiwibGVuZ3RoIiwiZ3JkQ1NWIiwieGhyIiwiWE1MSHR0cFJlcXVlc3QiLCJvcGVuIiwib25sb2FkIiwiZSIsInJlYWR5U3RhdGUiLCJzdGF0dXMiLCJjc3ZSZXNwb25zZSIsInJlc3BvbnNlVGV4dCIsImpzb24iLCJQYXBhIiwicGFyc2UiLCJkYXRhIiwiZmlsdGVyIiwiY29uc29sZSIsImVycm9yIiwic3RhdHVzVGV4dCIsIm9uZXJyb3IiLCJzZW5kIiwic3RhdGUxIiwic2NhdHRlcnBsb3QiLCJkaXN0cmljdHMiLCJuYW1lIiwiYmFzZSIsImdldFN0YXRlIiwiT2JqZWN0Iiwia2V5cyIsInNldFRpdGxlIiwieFZhciIsInlWYXIiLCJ6VmFyIiwic2VsZWN0ZWQiLCJoaWdobGlnaHRlZCIsIm9wdGlvbnMiLCJkZWVwbWVyZ2UiLCJ0aXRsZSIsInRleHRBbGlnbiIsImFyaWEiLCJkZXNjcmlwdGlvbiIsInlBeGlzIiwibWluIiwibWF4IiwieEF4aXMiLCJ0b29sdGlwIiwiZm9ybWF0VG9vbHRpcCIsInNlcmllcyIsImlkIiwiaXRlbVN0eWxlIiwibGFiZWwiLCJ0eXBlIiwibWFya0xpbmUiLCJhbmltYXRpb24iLCJzaWxlbnQiLCJjb29yZCIsInN5bWJvbCIsImxpbmVTdHlsZSIsInN0YXRlMyIsInN0YXRlNCIsImNvbXBvbmVudCIsImdldE9wdGlvbiIsImJhc2VPdmVycmlkZXMiLCJhbGwiLCJzdGF0ZTUiLCJzdGF0ZTYiLCJzdGF0ZTciLCJzdGF0ZTgiLCJzdGF0ZTkiLCJzdGF0ZTEwIiwic3RhdGUxMSIsInN0YXRlMTIiLCJzdGF0ZTEzIiwic3RhdGUxNCIsImdyaWQiLCJheGlzTGFiZWwiLCJnZXRQZXJjZW50RGlmZkxhYmVsIiwic3RhdGUxNSIsImRhdGFTZXJpZXMiLCJnZXREYXRhU2VyaWVzIiwic3ltYm9sU2l6ZSIsInoiLCJzdGF0ZTE2IiwiYW5pbWF0ZSIsInN0YXRlMTciLCJzdGF0ZTE4Iiwic3RhdGUxOSIsInRleHRTdHlsZSIsInJvb3RFbCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJTY2F0dGVycGxvdCIsImFkZFN0YXRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUtBO0FBQ0EsSUFBTUEsRUFBRSxHQUFHQyxNQUFYO0FBRUEsSUFBTUMsUUFBUSxHQUFHLFNBQWpCO0FBQ0EsSUFBSUMsZUFBZSxHQUFHLEVBQXRCOztBQUNBLElBQU1DLGdCQUFnQixHQUFHLFNBQW5CQSxnQkFBbUIsQ0FBQ0MsU0FBRCxFQUFlO0FB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QUNBNUQsV0FBVyxDQUFDc0UsUUFBWixDQUFxQixTQUFyQixFQUFnQ1IsT0FBaEM7QUFDQTlELFdBQVcsQ0FBQ3NFLFFBQVosQ0FBcUIsU0FBckIsRUFBZ0NQLE9BQWhDO0FBQ0EvRCxXQUFXLENBQUNzRSxRQUFaLENBQXFCLFNBQXJCLEVBQWdDTixPQUFoQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogc2NhdHRlcnBsb3Qgc3RhdGVzIGZvciBhcnRpY2xlIHR3bywgXCJBZmZsdWVudCBTY2hvb2xzIEFyZSBOb3QgQWx3YXlzIHRoZSBCZXN0IFNjaG9vbHNcIlxuICogLSBhcnRpY2xlIHN0b3J5Ym9hcmQ6IGh0dHBzOi8vZG9jcy5nb29nbGUuY29tL2RvY3VtZW50L2QvMVNob2hFbUVjb1FvZXBzSUJ0UW16clVxQVo3cGRGREwtaTlkYmZFYVd0TzAvZWRpdFxuICovXG5cbi8vIFNldCBsb2NhbCBwbGFjZWhvbGRlciBmb3IgalF1ZXJ5XG5jb25zdCBqUSA9IGpRdWVyeTtcblxuY29uc3QgYXhpc0JsdWUgPSAnIzU0Nzg5Mic7XG5sZXQgYWN0aXZlSGlnaGxpZ2h0ID0ge307XG5jb25zdCBoaWdobGlnaHRlZExhYmVsID0gKGhpZ2hsaWdodCkgPT4ge1xuICAvLyBjb25zb2xlLmxvZygnaGlnaGxpZ2h0ZWRMYWJlbCcpO1xuICBhY3RpdmVIaWdobGlnaHQgPSBoaWdobGlnaHQ7XG4gIHJldHVybiB7XG4gICAgc2hvdzogdHJ1ZSxcbiAgICBwb3NpdGlvbjogJ3RvcCcsXG4gICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjkpJywgLy8gJyMwMDkwRkYnLCAvLyAnI0ZGRkNDRicsXG4gICAgYm9yZGVyQ29sb3I6ICcjN0QzOEJCJyxcbiAgICBib3JkZXJXaWR0aDogMCxcbiAgICBmb250U2l6ZTogMTIsXG4gICAgZm9udFdlaWdodDogNTAwLFxuICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLCAvLyAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgIGxpbmVIZWlnaHQ6IDEyLFxuICAgIHBhZGRpbmc6IFs4LCA4XSxcbiAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgb3BhY2l0eTogMSxcbiAgICBjb2xvcjogJ3JnYmEoMjUsIDI1LCAyNSwgMC45MSknLCAvLyAnI2ZmZicsIC8vICcjMDUyOTY1JyxcbiAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKGl0ZW0pO1xuICAgICAgLy8gY29uc29sZS5sb2coYWN0aXZlSGlnaGxpZ2h0KTtcbiAgICAgIHJldHVybiBhY3RpdmVIaWdobGlnaHRbaXRlbS52YWx1ZVszXV1cbiAgICB9LFxuICB9O1xufVxuLy9PcmFuZ2UgYnViYmxlc1xuY29uc3QgaGlnaGxpZ2h0ZWRJdGVtU3R5bGUgPSAge1xuICBib3JkZXJXaWR0aDogMC40LFxuICBib3JkZXJDb2xvcjogJ3JnYmEoMTU2LDEwOSwwLDAuOCknLCAvLyAnI0ZGQzAyRCcsXG4gIGNvbG9yOiAncmdiYSgyNTUsIDE3OCwgMCwgMC43NyknLCAvLyAnI0ZGRkNERCcsXG4gIG9wYWNpdHk6IDEsXG4gIHNoYWRvd0JsdXI6IDIsXG4gIHNoYWRvd0NvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjEpJyxcbiAgc2hhZG93T2Zmc2V0WDogMCxcbiAgc2hhZG93T2Zmc2V0WTogMVxufTtcbmNvbnN0IHNlbGVjdGVkSXRlbVN0eWxlID0ge1xuICBib3JkZXJXaWR0aDogMC40LFxuICBib3JkZXJDb2xvcjogJ3JnYmEoODksIDE1MSwgMjAzLCAwLjgpJywgLy8gJyM3RDM4QkInLFxuICBjb2xvcjogJyM0OENCOTUnLCAvLyAnI0JDNzJGRicsXG4gIGNvbG9yOiAncmdiYSgxNzcsIDIyMiwgMjM4LCAwLjgpJyxcbiAgb3BhY2l0eTogMSxcbn07XG5jb25zdCBiYXNlR3JpZCA9IHtcbiAgdG9wOiAxMCxcbiAgYm90dG9tOiAyNixcbiAgbGVmdDogMTAsXG4gIHJpZ2h0OiAyNixcbiAgemxldmVsOiAxMDAsXG4gIGhlaWdodDogJ2F1dG8nLC8vIDI4MCxcbiAgd2lkdGg6ICdhdXRvJywgLy8gJ2F1dG8nLFxuICBjb250YWluTGFiZWw6IHRydWVcbn07XG5jb25zdCBiYXNlWUF4aXMgPSB7XG4gIHBvc2l0aW9uOiAncmlnaHQnLFxuICBzcGxpdExpbmU6IHtcbiAgICBzaG93OiBmYWxzZSxcbiAgfSxcbiAgbmFtZUdhcDogMjYsXG4gIG5hbWVUZXh0U3R5bGU6IHtcbiAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyxcbiAgICBjb2xvcjogYXhpc0JsdWUsXG4gICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgZm9udFNpemU6IDExXG4gIH0sXG4gIHpsZXZlbDogMTAxLFxufTtcbmNvbnN0IGJhc2VYQXhpcyA9IHtcbiAgbmFtZUdhcDogMjYsXG4gIG5hbWVUZXh0U3R5bGU6IHtcbiAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyxcbiAgICBjb2xvcjogYXhpc0JsdWUsXG4gICAgZm9udFNpemU6IDExLFxuICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nXG4gIH0sXG4gIHpsZXZlbDogMTAyLFxufTtcblxuLy8gUGxhY2Vob2xkZXJzIGZvciBzZWdyZWdhdGlvbiBzZXJpZXMgb3BlcmF0aW9uc1xuLy8gbGV0IHNlZ0RhdGEgPSBbXTtcbmxldCBzZWFyY2hJdGVtSURzID0gW107XG5sZXQgbmFtZXMgPSBbXTtcbmxldCBhbGxHcmREYXRhID0gW107XG5sZXQgVGl0bGUgPSB7fTtcblRpdGxlWyd0ZXh0J10gPSAnJztcblRpdGxlWydzdWJ0ZXh0J10gPSAnJztcblRpdGxlWydzZXRUaXRsZSddID0gZnVuY3Rpb24oKSB7XG4gIC8vIFNldCB0aXRsZSBhbmQgc3VidGl0bGVcbiAgalEoJy5jb2x1bW4tc2NhdHRlcnBsb3QgLnRpdGxlJykuaHRtbChUaXRsZS50ZXh0KTtcbiAgalEoJy5jb2x1bW4tc2NhdHRlcnBsb3QgLnN1YnRpdGxlJykuaHRtbChUaXRsZS5zdWJ0ZXh0KTtcbn1cblxuLyoqXG4gKiBTbGljZSBhcnJheSBhY2NvcmRpbmcgZnJvbSBiZWdpbm5pbmcgYWNjb3JkaW5nIHRvIHByb3ZpZGVkIHNpemUuXG4gKiBAcGFyYW0gQXJyYXkgYXJyXG4gKiBAcGFyYW0gTnVtYmVyIHNpemVcbiAqL1xuZnVuY3Rpb24gc2xpY2VMZWFzdChhcnIsIHNpemUpIHtcbiAgcmV0dXJuIGFyci5zbGljZSgwLCBzaXplIC0gMSlcbn1cblxuLyoqXG4gKiBTbGljZSBhcnJheSBmcm9tIGVuZCBhY2NvcmRpbmcgdG8gcHJvdmlkZWQgc2l6ZS5cbiAqIEBwYXJhbSBBcnJheSBhcnJcbiAqIEBwYXJhbSBOdW1iZXIgc2l6ZVxuICovXG5mdW5jdGlvbiBzbGljZU1vc3QoYXJyLCBzaXplKSB7XG4gIHJldHVybiBhcnIuc2xpY2UoKGFyci5sZW5ndGggLSAxKSAtIChzaXplLTEpLCAoYXJyLmxlbmd0aCAtIDEpKVxufVxuXG4vL1xuLy8gRmV0Y2ggdGhlIGFkZGl0aW9uYWwgc2VncmVnYXRpb24gZGF0YSBmb3Igc3RhdGUgOS5cbi8vXG5jb25zdCBncmRDU1YgPSAnaHR0cHM6Ly9kMmZ5cGViNmY5NzRyMS5jbG91ZGZyb250Lm5ldC9kZXYvc2NhdHRlcnBsb3QvZGlzdHJpY3RzLWFsbF9ncmQuY3N2JztcbnZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbnhoci5vcGVuKFwiR0VUXCIsIGdyZENTViwgdHJ1ZSk7XG54aHIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcbiAgaWYgKHhoci5yZWFkeVN0YXRlID09PSA0KSB7XG4gICAgaWYgKHhoci5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgLy8gY29uc29sZS5sb2coeGhyLnJlc3BvbnNlVGV4dCk7XG4gICAgICAvLyBjb25zb2xlLmxvZygnU2VnIGRhdGEgcmVxdWVzdCBmaW5pc2hlZC4nKTtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHRoaXMucmVzcG9uc2VUZXh0KTtcbiAgICAgIHZhciBjc3ZSZXNwb25zZSA9IHRoaXMucmVzcG9uc2VUZXh0O1xuICAgICAgdmFyIGpzb24gPSBQYXBhLnBhcnNlKGNzdlJlc3BvbnNlKTtcbiAgICAgIGFsbEdyZERhdGEgPSBqc29uLmRhdGE7XG4gICAgICAvLyBjb25zb2xlLmxvZygnbG9nZ2luZyBzZWdyZWdhdGlvbiBkYXRhJyk7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzZWdEYXRhKTtcbiAgICAgIC8vIFRyaW0gb2ZmIGNvbHVtbiBoZWFkaW5ncyBhbmQgYW55IGJsYW5rIHJvd3NcbiAgICAgIGFsbEdyZERhdGEgPSBhbGxHcmREYXRhLmZpbHRlcihmdW5jdGlvbihlKSB7IHJldHVybiBlWzBdICE9PSAnaWQnIH0pO1xuICAgICAgYWxsR3JkRGF0YSA9IGFsbEdyZERhdGEuZmlsdGVyKGZ1bmN0aW9uKGUpIHsgcmV0dXJuIGVbMF0gIT09ICcnIH0pO1xuICAgICAgLy8gY29uc29sZS5sb2coYWxsR3JkRGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoeGhyLnN0YXR1c1RleHQpO1xuICAgIH1cbiAgfVxufTtcbnhoci5vbmVycm9yID0gZnVuY3Rpb24gKGUpIHtcbiAgY29uc29sZS5lcnJvcih4aHIuc3RhdHVzVGV4dCk7XG59O1xueGhyLnNlbmQobnVsbCk7XG5cbi8qKiBTdGF0ZSAxOiBHcmFkZSAzIENoaWNhZ28gKyBBbm5lIEFydW5kZWwgICovXG52YXIgc3RhdGUxID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgaWYgKG5hbWVzLmxlbmd0aCA8PSAwICYmXG4gICAgc2NhdHRlcnBsb3QgJiZcbiAgICBzY2F0dGVycGxvdC5kYXRhICYmXG4gICAgc2NhdHRlcnBsb3QuZGF0YS5kaXN0cmljdHMgJiZcbiAgICBzY2F0dGVycGxvdC5kYXRhLmRpc3RyaWN0cy5uYW1lKSB7XG4gICAgbmFtZXMgPSBzY2F0dGVycGxvdC5kYXRhLmRpc3RyaWN0cy5uYW1lO1xuICAgIC8vIGNvbnNvbGUubG9nKG5hbWVzKTtcbiAgfVxuICAvLyBzdGF0ZSAyIGlzIGJhc2VkIG9uIHN0YXRlIDFcbiAgdmFyIGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnQXZlcmFnZSBUZXN0IFNjb3JlcywgR3JhZGUgMyc7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJzsgLy8gVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNlxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX3NlcycsXG4gICAgeVZhcjogJ2FsbF9hdmczJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBzZWxlY3RlZDogW10sXG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgb3B0aW9uczogZGVlcG1lcmdlKGJhc2Uub3B0aW9ucywge1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgIHRleHQ6IFRpdGxlLnRleHQsXG4gICAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICB0b3A6ICcxMHB4JyxcbiAgICAgIH0sXG4gICAgICBhcmlhOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgICB9LFxuICAgICAgeUF4aXM6IHtcbiAgICAgICAgbWluOiAtNCwgLy8gLTAuNSxcbiAgICAgICAgbWF4OiA0LCAvLyA5LFxuICAgICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKGluIEdyYWRlIExldmVscyknLFxuICAgICAgfSxcbiAgICAgIHhBeGlzOiB7XG4gICAgICAgIG1pbjogLTQsXG4gICAgICAgIG1heDogMyxcbiAgICAgICAgbmFtZTogJ+KXgCAgUE9PUkVSICAgICAgICAgICAgICAgICAgICBTb2Npb2Vjb25vbWljIFN0YXR1cyAgICAgICAgICAgICAgICAgICAgUklDSEVSICDilrYnLFxuICAgICAgfSxcbiAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnU29jaW9lY29ub21pYyBTdGF0dXMnLCAnQWNoaWV2ZW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcmllczogW1xuICAgICAgICB7IGlkOiAnYmFzZScgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnJywgLy8gR3JhZGUgbGV2ZWxcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTQsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JywgLy8gJyNhZGFkYWQnXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFszLCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgfSlcbiAgfVxufTtcblxuLyoqIFN0YXRlIDM6IEdyYWRlIDQgQ2hpY2FnbyArIEFubmUgQXJ1bmRlbCAqL1xudmFyIHN0YXRlMyA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIHZhciBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzI0MDAwNjAnXSA9ICdBbm5lIEFydW5kZWwgQ291bnR5IFB1YmxpYyBTY2hvb2xzJztcbiAgaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0F2ZXJhZ2UgVGVzdCBTY29yZXMsIEdyYWRlIDQnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIHJldHVybiB7XG4gICAgeFZhcjogJ2FsbF9zZXMnLFxuICAgIHlWYXI6ICdhbGxfYXZnNCcsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgb3B0aW9uczogZGVlcG1lcmdlKGJhc2Uub3B0aW9ucywge1xuICAgICAgdGl0bGU6IHtcbiAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgIHRleHQ6IFRpdGxlLnRleHQsXG4gICAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgICB0b3A6ICcxMHB4JyxcbiAgICAgIH0sXG4gICAgICBhcmlhOiB7XG4gICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgICB9LFxuICAgICAgeUF4aXM6IHtcbiAgICAgICAgbWluOiAtNCxcbiAgICAgICAgbWF4OiA0LFxuICAgICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKGluIEdyYWRlIExldmVscyknLFxuICAgICAgfSxcbiAgICAgIHhBeGlzOiB7XG4gICAgICAgIG1pbjogLTQsXG4gICAgICAgIG1heDogMyxcbiAgICAgICAgbmFtZTogJ+KXgCAgUE9PUkVSICAgICAgICAgICAgICAgICAgICBTb2Npb2Vjb25vbWljIFN0YXR1cyAgICAgICAgICAgICAgICAgICAgUklDSEVSICDilrYnLFxuICAgICAgfSxcbiAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnU29jaW9lY29ub21pYyBTdGF0dXMnLCAnQWNoaWV2ZW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIHNlcmllczogW1xuICAgICAgICB7IGlkOiAnYmFzZScgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnJywgLy8gR3JhZGUgbGV2ZWxcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTQsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JywgLy8gJyNhZGFkYWQnXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFszLCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBdXG4gICAgfSlcbiAgfVxufTtcblxuLyoqIFN0YXRlIDQ6IEdyYWRlIDUgQ2hpY2FnbyAqL1xudmFyIHN0YXRlNCA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnQXZlcmFnZSBUZXN0IFNjb3JlcywgR3JhZGUgNSc7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJzsgLy8gVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNlxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOiAtNCwgLy8gLTAuNSxcbiAgICAgIG1heDogNCwgLy8gOSxcbiAgICAgIG5hbWU6ICdBY2hpZXZlbWVudCAoaW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgfSxcbiAgICB4QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogMyxcbiAgICAgIG5hbWU6ICfil4AgIFBPT1JFUiAgICAgICAgICAgICAgICAgICAgU29jaW9lY29ub21pYyBTdGF0dXMgICAgICAgICAgICAgICAgICAgIFJJQ0hFUiAg4pa2JyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnU29jaW9lY29ub21pYyBTdGF0dXMnLCAnQWNoaWV2ZW1lbnQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgeyBpZDogJ2Jhc2UnIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIEdyYWRlIGxldmVsXG4gICAgICAgICAgICAgICAgICBjb29yZDogWy00LCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsIC8vICcjYWRhZGFkJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMywgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIHhWYXI6ICdhbGxfc2VzJyxcbiAgICB5VmFyOiAnYWxsX2F2ZzUnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgfVxufVxuXG4vKiogU3RhdGUgNSwgR3JhZGUgNiBDaGljYWdvICovXG52YXIgc3RhdGU1ID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgZWNoYXJ0IG9wdGlvbnNcbiAgY29uc3Qgb3B0aW9ucyA9IHNjYXR0ZXJwbG90LmNvbXBvbmVudC5nZXRPcHRpb24oKTtcbiAgLy8gdGhpcyBzdGF0ZSBpcyBjcmVhdGVkIGZyb20gdGhlIGJhc2VcbiAgY29uc3QgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdiYXNlJyk7XG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgaGlnaGxpZ2h0WycyNDAwMDYwJ10gPSAnQW5uZSBBcnVuZGVsIENvdW50eSBQdWJsaWMgU2Nob29scyc7XG4gIGhpZ2hsaWdodFsnMTcwOTkzMCddID0gJ0NoaWNhZ28gUHVibGljIFNjaG9vbCBEaXN0cmljdCc7XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aXRsZSBhbmQgc3VidGV4dCBwbGFjZWhvbGRlcnNcbiAgVGl0bGVbJ3RleHQnXSA9ICdBdmVyYWdlIFRlc3QgU2NvcmVzLCBHcmFkZSA2JztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnOyAvLyBVLlMuIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2XG4gIC8vIFNldCB0aXRsZSBhbmQgc3VidGl0bGVcbiAgVGl0bGUuc2V0VGl0bGUoKTtcblxuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsXG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgfSxcbiAgICBhcmlhOiB7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246IFRpdGxlLnRleHQgKyAoVGl0bGVbJ3N1YnRleHQnXS5sZW5ndGggPj0gMSA/ICcsICcgKyBUaXRsZVsnc3VidGV4dCddIDogJycgKSxcbiAgICB9LFxuICAgIHlBeGlzOiB7XG4gICAgICBtaW46IC00LCAvLyAtMC41LFxuICAgICAgbWF4OiA0LCAvLyA5LFxuICAgICAgbmFtZTogJ0FjaGlldmVtZW50IChpbiBHcmFkZSBMZXZlbHMpJyxcbiAgICB9LFxuICAgIHhBeGlzOiB7XG4gICAgICBtaW46IC00LFxuICAgICAgbWF4OiAzLFxuICAgICAgbmFtZTogJ+KXgCAgUE9PUkVSICAgICAgICAgICAgICAgICAgICBTb2Npb2Vjb25vbWljIFN0YXR1cyAgICAgICAgICAgICAgICAgICAgUklDSEVSICDilrYnLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdTb2Npb2Vjb25vbWljIFN0YXR1cycsICdBY2hpZXZlbWVudCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7IGlkOiAnYmFzZScgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnJywgLy8gR3JhZGUgbGV2ZWxcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTQsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX3NlcycsXG4gICAgeVZhcjogJ2FsbF9hdmc2JyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyoqIFN0YXRlIDYsIEdyYWRlIDcgQ2hpY2FnbyAqL1xudmFyIHN0YXRlNiA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnQXZlcmFnZSBUZXN0IFNjb3JlcywgR3JhZGUgNyc7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJzsgLy8gVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNlxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOiAtNCwgLy8gLTAuNSxcbiAgICAgIG1heDogNCwgLy8gOSxcbiAgICAgIG5hbWU6ICdBY2hpZXZlbWVudCAoaW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgfSxcbiAgICB4QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogMyxcbiAgICAgIG5hbWU6ICfil4AgIFBPT1JFUiAgICAgICAgICAgICAgICAgICAgU29jaW9lY29ub21pYyBTdGF0dXMgICAgICAgICAgICAgICAgICAgIFJJQ0hFUiAg4pa2JyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnU29jaW9lY29ub21pYyBTdGF0dXMnLCAnQWNoaWV2ZW1lbnQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgeyBpZDogJ2Jhc2UnIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIEdyYWRlIGxldmVsXG4gICAgICAgICAgICAgICAgICBjb29yZDogWy00LCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsIC8vICcjYWRhZGFkJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMywgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIHhWYXI6ICdhbGxfc2VzJyxcbiAgICB5VmFyOiAnYWxsX2F2ZzcnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgfVxufVxuXG4vKiogU3RhdGUgNywgR3JhZGUgOCBDaGljYWdvICovXG52YXIgc3RhdGU3ID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgZWNoYXJ0IG9wdGlvbnNcbiAgY29uc3Qgb3B0aW9ucyA9IHNjYXR0ZXJwbG90LmNvbXBvbmVudC5nZXRPcHRpb24oKTtcbiAgLy8gdGhpcyBzdGF0ZSBpcyBjcmVhdGVkIGZyb20gdGhlIGJhc2VcbiAgY29uc3QgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdiYXNlJyk7XG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgaGlnaGxpZ2h0WycyNDAwMDYwJ10gPSAnQW5uZSBBcnVuZGVsIENvdW50eSBQdWJsaWMgU2Nob29scyc7XG4gIGhpZ2hsaWdodFsnMTcwOTkzMCddID0gJ0NoaWNhZ28gUHVibGljIFNjaG9vbCBEaXN0cmljdCc7XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aXRsZSBhbmQgc3VidGV4dCBwbGFjZWhvbGRlcnNcbiAgVGl0bGVbJ3RleHQnXSA9ICdBdmVyYWdlIFRlc3QgU2NvcmVzLCBHcmFkZSA4JztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnOyAvLyBVLlMuIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2XG4gIC8vIFNldCB0aXRsZSBhbmQgc3VidGl0bGVcbiAgVGl0bGUuc2V0VGl0bGUoKTtcblxuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsXG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgfSxcbiAgICBhcmlhOiB7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246IFRpdGxlLnRleHQgKyAoVGl0bGVbJ3N1YnRleHQnXS5sZW5ndGggPj0gMSA/ICcsICcgKyBUaXRsZVsnc3VidGV4dCddIDogJycgKSxcbiAgICB9LFxuICAgIHlBeGlzOiB7XG4gICAgICBtaW46IC00LFxuICAgICAgbWF4OiA0LFxuICAgICAgbmFtZTogJ0FjaGlldmVtZW50IChpbiBHcmFkZSBMZXZlbHMpJyxcbiAgICB9LFxuICAgIHhBeGlzOiB7XG4gICAgICBtaW46IC00LFxuICAgICAgbWF4OiAzLFxuICAgICAgbmFtZTogJ+KXgCAgUE9PUkVSICAgICAgICAgICAgICAgICAgICBTb2Npb2Vjb25vbWljIFN0YXR1cyAgICAgICAgICAgICAgICAgICAgUklDSEVSICDilrYnLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdTb2Npb2Vjb25vbWljIFN0YXR1cycsICdBY2hpZXZlbWVudCcpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7IGlkOiAnYmFzZScgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnJywgLy8gR3JhZGUgbGV2ZWxcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTQsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JywgLy8gJyNhZGFkYWQnXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFszLCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXVxuICB9XG4gIHJldHVybiB7XG4gICAgeFZhcjogJ2FsbF9zZXMnLFxuICAgIHlWYXI6ICdhbGxfYXZnOCcsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICB9XG59XG5cbi8qKiBTdGF0ZSA4LCBHcmFkZSAzIE1pbHdhdWtlZSAqL1xudmFyIHN0YXRlOCA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnNTUwOTYwMCddID0gJ01pbHdhdWtlZSBTY2hvb2wgRGlzdHJpY3QnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICAvLyBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnQXZlcmFnZSBUZXN0IFNjb3JlcywgR3JhZGUgMyc7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJzsgLy8gVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNlxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOiAtNCwgLy8gLTAuNSxcbiAgICAgIG1heDogNCwgLy8gOSxcbiAgICAgIG5hbWU6ICdBY2hpZXZlbWVudCAoaW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgfSxcbiAgICB4QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogMyxcbiAgICAgIG5hbWU6ICfil4AgIFBPT1JFUiAgICAgICAgICAgICAgICAgICAgU29jaW9lY29ub21pYyBTdGF0dXMgICAgICAgICAgICAgICAgICAgIFJJQ0hFUiAg4pa2JyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnU29jaW9lY29ub21pYyBTdGF0dXMnLCAnQWNoaWV2ZW1lbnQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgeyBpZDogJ2Jhc2UnIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIEdyYWRlIGxldmVsXG4gICAgICAgICAgICAgICAgICBjb29yZDogWy00LCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsIC8vICcjYWRhZGFkJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMywgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIHhWYXI6ICdhbGxfc2VzJyxcbiAgICB5VmFyOiAnYWxsX2F2ZzMnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgfVxufVxuXG4vKiogU3RhdGUgOSwgR3JhZGUgNCBNaWx3YXVrZWUgKi9cbnZhciBzdGF0ZTkgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICAvLyBnZXQgY3VycmVudCBlY2hhcnQgb3B0aW9uc1xuICBjb25zdCBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgLy8gaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0F2ZXJhZ2UgVGVzdCBTY29yZXMsIEdyYWRlIDQnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjogLTQsIC8vIC0wLjUsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKGluIEdyYWRlIExldmVscyknLFxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDMsXG4gICAgICBuYW1lOiAn4peAICBQT09SRVIgICAgICAgICAgICAgICAgICAgIFNvY2lvZWNvbm9taWMgU3RhdHVzICAgICAgICAgICAgICAgICAgICBSSUNIRVIgIOKWticsXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICAvLyB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1NvY2lvZWNvbm9taWMgU3RhdHVzJywgJ0FjaGlldmVtZW50Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgICBtYXJrTGluZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyBHcmFkZSBsZXZlbFxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLCAvLyAnI2FkYWRhZCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX3NlcycsXG4gICAgeVZhcjogJ2FsbF9hdmc0JyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyoqIFN0YXRlIDEwLCBHcmFkZSA1IE1pbHdhdWtlZSAqL1xudmFyIHN0YXRlMTAgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICAvLyBnZXQgY3VycmVudCBlY2hhcnQgb3B0aW9uc1xuICBjb25zdCBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgLy8gaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0F2ZXJhZ2UgVGVzdCBTY29yZXMsIEdyYWRlIDUnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKGluIEdyYWRlIExldmVscyknLFxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDMsXG4gICAgICBuYW1lOiAn4peAICBQT09SRVIgICAgICAgICAgICAgICAgICAgIFNvY2lvZWNvbm9taWMgU3RhdHVzICAgICAgICAgICAgICAgICAgICBSSUNIRVIgIOKWticsXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICAvLyB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1NvY2lvZWNvbm9taWMgU3RhdHVzJywgJ0FjaGlldmVtZW50Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgICBtYXJrTGluZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyBHcmFkZSBsZXZlbFxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLCAvLyAnI2FkYWRhZCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX3NlcycsXG4gICAgeVZhcjogJ2FsbF9hdmc1JyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyoqIFN0YXRlIDExLCBHcmFkZSA2IE1pbHdhdWtlZSAqL1xudmFyIHN0YXRlMTEgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICAvLyBnZXQgY3VycmVudCBlY2hhcnQgb3B0aW9uc1xuICBjb25zdCBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgLy8gaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0F2ZXJhZ2UgVGVzdCBTY29yZXMsIEdyYWRlIDYnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjogLTQsIC8vIC0wLjUsXG4gICAgICBtYXg6IDQsIC8vIDksXG4gICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKGluIEdyYWRlIExldmVscyknLFxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDMsXG4gICAgICBuYW1lOiAn4peAICBQT09SRVIgICAgICAgICAgICAgICAgICAgIFNvY2lvZWNvbm9taWMgU3RhdHVzICAgICAgICAgICAgICAgICAgICBSSUNIRVIgIOKWticsXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICAvLyB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1NvY2lvZWNvbm9taWMgU3RhdHVzJywgJ0FjaGlldmVtZW50Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgICBtYXJrTGluZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyBHcmFkZSBsZXZlbFxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLCAvLyAnI2FkYWRhZCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMsIDBdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX3NlcycsXG4gICAgeVZhcjogJ2FsbF9hdmc2JyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyoqIFN0YXRlIDEyLCBHcmFkZSA3IE1pbHdhdWtlZSAqL1xudmFyIHN0YXRlMTIgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICAvLyBnZXQgY3VycmVudCBlY2hhcnQgb3B0aW9uc1xuICBjb25zdCBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgLy8gaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0F2ZXJhZ2UgVGVzdCBTY29yZXMsIEdyYWRlIDcnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKGluIEdyYWRlIExldmVscyknLFxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDMsXG4gICAgICBuYW1lOiAn4peAICBQT09SRVIgICAgICAgICAgICAgICAgICAgIFNvY2lvZWNvbm9taWMgU3RhdHVzICAgICAgICAgICAgICAgICAgICBSSUNIRVIgIOKWticsXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICAvLyB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ1NvY2lvZWNvbm9taWMgU3RhdHVzJywgJ0FjaGlldmVtZW50Jyk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgICBtYXJrTGluZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyBHcmFkZSBsZXZlbFxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMywgMF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LFxuICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIHhWYXI6ICdhbGxfc2VzJyxcbiAgICB5VmFyOiAnYWxsX2F2ZzcnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgfVxufVxuXG4vKiogU3RhdGUgMTMsIEdyYWRlIDggTWlsd2F1a2VlICovXG52YXIgc3RhdGUxMyA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnNTUwOTYwMCddID0gJ01pbHdhdWtlZSBTY2hvb2wgRGlzdHJpY3QnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICAvLyBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnQXZlcmFnZSBUZXN0IFNjb3JlcywgR3JhZGUgOCc7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJzsgLy8gVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNlxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogNCxcbiAgICAgIG5hbWU6ICdBY2hpZXZlbWVudCAoaW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgfSxcbiAgICB4QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogMyxcbiAgICAgIG5hbWU6ICfil4AgIFBPT1JFUiAgICAgICAgICAgICAgICAgICAgU29jaW9lY29ub21pYyBTdGF0dXMgICAgICAgICAgICAgICAgICAgIFJJQ0hFUiAg4pa2JyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnU29jaW9lY29ub21pYyBTdGF0dXMnLCAnQWNoaWV2ZW1lbnQnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgeyBpZDogJ2Jhc2UnIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIEdyYWRlIGxldmVsXG4gICAgICAgICAgICAgICAgICBjb29yZDogWy00LCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFszLCAwXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgXVxuICB9XG4gIHJldHVybiB7XG4gICAgeFZhcjogJ2FsbF9zZXMnLFxuICAgIHlWYXI6ICdhbGxfYXZnOCcsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICB9XG59XG5cbi8qKiBTdGF0ZSAxNCwgQXZnIGFjaGlldmVtZW50IGdyYWRlIDMgdnMgeWVhcnMgZ3Jvd3RoIHBlciBncmFkZSAqL1xudmFyIHN0YXRlMTQgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICAvLyBnZXQgY3VycmVudCBlY2hhcnQgb3B0aW9uc1xuICBjb25zdCBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICAvLyB0aGlzIHN0YXRlIGlzIGNyZWF0ZWQgZnJvbSB0aGUgYmFzZVxuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgdmFyIGhpZ2hsaWdodCA9IHt9O1xuICBoaWdobGlnaHRbJzI0MDAwNjAnXSA9ICdBbm5lIEFydW5kZWwgQ291bnR5IFB1YmxpYyBTY2hvb2xzJztcbiAgaGlnaGxpZ2h0WycxNzA5OTMwJ10gPSAnQ2hpY2FnbyBQdWJsaWMgU2Nob29sIERpc3RyaWN0JztcbiAgaGlnaGxpZ2h0Wyc1NTA5NjAwJ10gPSAnTWlsd2F1a2VlIFNjaG9vbCBEaXN0cmljdCc7XG4gIGlmIChzZWFyY2hJdGVtSURzLmxlbmd0aCA+PSAxICYmIE9iamVjdC5rZXlzKG5hbWVzKS5sZW5ndGggPj0gMCkge1xuICAgIC8vIFRoZXJlJ3MgYSBzZWFyY2ggaXRlbSBzZWxlY3RlZC5cbiAgICAvLyBBZGQgaXQgdG8gdGhlIGhpZ2hsaWdodCBvYmplY3QuXG4gICAgaWYgKG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dLmxlbmd0aCA+PSAxKSB7XG4gICAgICBoaWdobGlnaHRbc2VhcmNoSXRlbUlEc1swXV0gPSBuYW1lc1tzZWFyY2hJdGVtSURzWzBdXTtcbiAgICB9XG4gICAgLy8gY29uc29sZS5sb2coaGlnaGxpZ2h0KTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSB0aXRsZSBhbmQgc3VidGV4dCBwbGFjZWhvbGRlcnNcbiAgVGl0bGVbJ3RleHQnXSA9ICdMZWFybmluZyBSYXRlcyBhbmQgM3JkIEdyYWRlIEFjaGlldmVtZW50JztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnOyAvLyBVLlMuIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2XG4gIC8vIFNldCB0aXRsZSBhbmQgc3VidGl0bGVcbiAgVGl0bGUuc2V0VGl0bGUoKTtcblxuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsXG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgfSxcbiAgICBhcmlhOiB7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246IFRpdGxlLnRleHQgKyAoVGl0bGVbJ3N1YnRleHQnXS5sZW5ndGggPj0gMSA/ICcsICcgKyBUaXRsZVsnc3VidGV4dCddIDogJycgKSxcbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgIHRvcDogMTAsXG4gICAgICBib3R0b206IDI2LFxuICAgICAgbGVmdDogMTAsXG4gICAgICByaWdodDogMjYsXG4gICAgICB6bGV2ZWw6IDEwMCxcbiAgICAgIGhlaWdodDogJ2F1dG8nLC8vIDI4MCxcbiAgICAgIHdpZHRoOiAnYXV0bycsIC8vICdhdXRvJyxcbiAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjogMC40LFxuICAgICAgbWF4OiAxLjYsXG4gICAgICBuYW1lOiAnTGVhcm5pbmcgUmF0ZXMnLFxuICAgICAgbmFtZUdhcDogNDUsXG4gICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmdldFBlcmNlbnREaWZmTGFiZWwoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHhBeGlzOiB7XG4gICAgICBtaW46IC00LFxuICAgICAgbWF4OiA0LFxuICAgICAgbmFtZTogJ0FjaGlldmVtZW50IChJbiBHcmFkZSBMZXZlbHMpJyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnQWNoaWV2ZW1lbnQnLCAnTGVhcm5pbmcgUmF0ZScsIDAsIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7IGlkOiAnYmFzZScgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnQXZlcmFnZScsIC8vIEdyYWRlIGxldmVsXG4gICAgICAgICAgICAgICAgICBjb29yZDogWzAsIDEuNl0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLCAvLyAnI2FkYWRhZCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzAsIDAuNDVdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ0F2ZXJhZ2UnLCAvLyB5IGF4aXMgbWFya2xpbmVcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTQsIDFdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMy43NSwgMV0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnQXZlcmFnZScsIC8vIHkgYXhpcyBtYXJrbGluZVxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFs0LCAwLjRdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ21pZGRsZScsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFswLCAwLCAtNSwgMF1cbiAgICAgICAgICAgICAgICAgICAgLy8gcm90YXRlOiAtOTBcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbNCwgMS42XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyBHcmFkZSBsZXZlbFxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstMywgMS42XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsIC8vICcjYWRhZGFkJ1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTMsIDAuNDVdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIEdyYWRlIGxldmVsXG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMsIDEuNl0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLCAvLyAnI2FkYWRhZCdcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMsIDAuNDVdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX2F2ZzMnLFxuICAgIHlWYXI6ICdhbGxfZ3JkJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBzZWxlY3RlZDogW10sXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICB9XG59XG5cbi8qKiBTdGF0ZSAxNSwgMm5kIHF1YWRyYW50LCB1cHBlciByaWdodCAqL1xuXG52YXIgc3RhdGUxNSA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIEJ1aWxkIHRoZSBzZXJpZXMgb2YgZWxlbWVudHMgZm9yIHF1YWRyYW50IGhpZ2hsaWdodC5cbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIC8vIFVwZGF0ZSB0aXRsZSBhbmQgc3VidGV4dCBwbGFjZWhvbGRlcnNcbiAgVGl0bGVbJ3RleHQnXSA9ICdMZWFybmluZyBSYXRlcyBhbmQgM3JkIEdyYWRlIEFjaGlldmVtZW50JztcbiAgVGl0bGVbJ3N1YnRleHQnXSA9ICcnOyAvLyBVLlMuIFNjaG9vbCBEaXN0cmljdHMgMjAwOS0yMDE2XG4gIC8vIFNldCB0aXRsZSBhbmQgc3VidGl0bGVcbiAgVGl0bGUuc2V0VGl0bGUoKTtcblxuICBjb25zdCBiYXNlT3ZlcnJpZGVzID0ge1xuICAgIHRpdGxlOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICAgIHRleHQ6IFRpdGxlLnRleHQsXG4gICAgICBzdWJ0ZXh0OiBUaXRsZS5zdWJ0ZXh0LFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGxlZnQ6ICc1MCUnLFxuICAgICAgdG9wOiAnMTBweCcsXG4gICAgfSxcbiAgICBhcmlhOiB7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgZGVzY3JpcHRpb246IFRpdGxlLnRleHQgKyAoVGl0bGVbJ3N1YnRleHQnXS5sZW5ndGggPj0gMSA/ICcsICcgKyBUaXRsZVsnc3VidGV4dCddIDogJycgKSxcbiAgICB9LFxuICAgIGdyaWQ6IHtcbiAgICAgIHRvcDogMTAsXG4gICAgICBib3R0b206IDI2LFxuICAgICAgbGVmdDogMTAsXG4gICAgICByaWdodDogMjYsXG4gICAgICB6bGV2ZWw6IDEwMCxcbiAgICAgIGhlaWdodDogJ2F1dG8nLC8vIDI4MCxcbiAgICAgIHdpZHRoOiAnYXV0bycsIC8vICdhdXRvJyxcbiAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIG1pbjogMC40LFxuICAgICAgbWF4OiAxLjYsXG4gICAgICBuYW1lOiAnTGVhcm5pbmcgUmF0ZXMnLFxuICAgICAgbmFtZUdhcDogNDUsXG4gICAgICBheGlzTGFiZWw6IHtcbiAgICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmdldFBlcmNlbnREaWZmTGFiZWwoaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIHhBeGlzOiB7XG4gICAgICBtaW46IC00LFxuICAgICAgbWF4OiA0LFxuICAgICAgbmFtZTogJ0FjaGlldmVtZW50IChJbiBHcmFkZSBMZXZlbHMpJyxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIC8vIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZm9ybWF0VG9vbHRpcChpdGVtLCBzY2F0dGVycGxvdC5kYXRhLCAnQWNoaWV2ZW1lbnQnLCAnTGVhcm5pbmcgUmF0ZScsIDAsIDEpO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7IGlkOiAnYmFzZScgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdzZWxlY3RlZCcsXG4gICAgICAgIHR5cGU6ICdzY2F0dGVyJyxcbiAgICAgICAgLy8gbmFtZTogJ0hpZ2ggZWFybHkgb3Bwb3J0dW5pdHksXFxuaGlnaCBncm93dGggb3Bwb3J0dW5pdHknLFxuICAgICAgICBzeW1ib2xTaXplOiBkYXRhU2VyaWVzLnN5bWJvbFNpemUsXG4gICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgIHpsZXZlbDogNTAsXG4gICAgICAgICAgejogNTAsXG4gICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDIwLCAzMywgMTU2LCAxKScsXG4gICAgICAgICAgY29sb3I6ICdyZ2JhKDE0NSwgMTE1LCAyNTUsIDEpJyxcbiAgICAgICAgfSxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICBwb3NpdGlvbjogJzYsIDEuNicsXG4gICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgyNTUsMjU1LDAsMC45NyknLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiAnIzA0Mjk2NScsXG4gICAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDYwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IDI4LFxuICAgICAgICAgIHBhZGRpbmc6IFs2LCA4XSxcbiAgICAgICAgICBib3JkZXJSYWRpdXM6IDMsXG4gICAgICAgICAgY29sb3I6ICcjMDQyOTY1JyxcbiAgICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICAgIHJldHVybiBoaWdobGlnaHRbaXRlbS52YWx1ZVszXV1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaGlnaGxpZ2h0ZWQnLFxuICAgICAgICBpdGVtU3R5bGU6IGhpZ2hsaWdodGVkSXRlbVN0eWxlLFxuICAgICAgICBsYWJlbDogaGlnaGxpZ2h0ZWRMYWJlbChoaWdobGlnaHQpLFxuICAgICAgICB6bGV2ZWw6IDUwMCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6J3NjYXR0ZXInLFxuICAgICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgICBhbmltYXRpb246IGZhbHNlLFxuICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICBzeW1ib2xTaXplOiAwLFxuICAgICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ0F2ZXJhZ2UnLCAvLyBZIGF4aXNcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMCwgMS42XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdlbmQnXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWyAwLCAwLjQ1IF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ0F2ZXJhZ2UnLCAvLyB5IGF4aXMgbWFya2xpbmVcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbNCwgMC40XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBbMCwgMCwgLTUsIDBdXG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZTogLTkwXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzQsIDEuNl0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnJywgLy8geCBheGlzXG4gICAgICAgICAgICAgICAgICBjb29yZDogWy00LCAxXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2VcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMy43NSwgMV0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnbWFya1F1YWRyYW50TGluZScsXG4gICAgICAgIHR5cGU6ICdzY2F0dGVyJyxcbiAgICAgICAgbmFtZTogJ0hpZ2ggZWFybHkgb3Bwb3J0dW5pdHksIGhpZ2ggZ3Jvd3RoJyxcbiAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiAnaW5zaWRlVG9wUmlnaHQnLFxuICAgICAgICAgICAgdmVydGljYWxBbGlnbjogJ3RvcCcsXG4gICAgICAgICAgICBwYWRkaW5nOiBbNSwgNSwgMCwgMF0sXG4gICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgZm9udEZhbWlseTogJ01haXNvbk5ldWUtTWVkaXVtJyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIFt7XG4gICAgICAgICAgICAgIGNvb3JkOiBbMCwgMS4zXSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDAsXG4gICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzczRDhBRScsIC8vICdyZ2JhKDI1MywgMTY1LCAyLCAxKScsIC8vICdyZWQnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAxNDAsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLjY1LFxuXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbNCwgMS4zXSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDBcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgY29vcmQ6IFsyLjE1LCAxLjU2XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIG5hbWU6ICdIaWdoIGVhcmx5IG9wcG9ydHVuaXR5LCBoaWdoIGdyb3d0aCcsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDAsXG4gICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAndHJhbnNwYXJlbnQnLCAvLyAncmdiYSgyNTMsIDE2NSwgMiwgMSknLCAvLyAncmVkJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG5cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMyxcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbWlkZGxlJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbMi4xNiwgMS41Nl0sXG4gICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICBzeW1ib2xTaXplOiAwXG4gICAgICAgICAgICB9XVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX2F2ZzMnLFxuICAgIHlWYXI6ICdhbGxfZ3JkJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBzZWxlY3RlZDogW10sXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICB9XG59XG5cbi8qKiBTdGF0ZSAxNiwgNHRoIHF1YWRyYW50LCBsb3dlciBsZWZ0ICovXG52YXIgc3RhdGUxNiA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIEJ1aWxkIHRoZSBzZXJpZXMgb2YgZWxlbWVudHMgZm9yIHF1YWRyYW50IGhpZ2hsaWdodC5cbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIC8vIHZhciBxdWFkcmFudCA9IGdldFF1YWRyYW50U2VyaWVzKDQsIDMsIDEsIE9iamVjdC5lbnRyaWVzKHNjYXR0ZXJwbG90LmRhdGFbJ2Rpc3RyaWN0cyddWydhbGxfYXZnMyddKSwgYWxsR3JkRGF0YSk7XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0xlYXJuaW5nIFJhdGVzIGFuZCAzcmQgR3JhZGUgQWNoaWV2ZW1lbnQnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgdG9wOiAxMCxcbiAgICAgIGJvdHRvbTogMjYsXG4gICAgICBsZWZ0OiAxMCxcbiAgICAgIHJpZ2h0OiAyNixcbiAgICAgIHpsZXZlbDogMTAwLFxuICAgICAgaGVpZ2h0OiAnYXV0bycsLy8gMjgwLFxuICAgICAgd2lkdGg6ICdhdXRvJywgLy8gJ2F1dG8nLFxuICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOiAwLjQsXG4gICAgICBtYXg6IDEuNixcbiAgICAgIG5hbWU6ICdMZWFybmluZyBSYXRlcycsXG4gICAgICBuYW1lR2FwOiA0NSxcbiAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZ2V0UGVyY2VudERpZmZMYWJlbChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKEluIEdyYWRlIExldmVscyknLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdBY2hpZXZlbWVudCcsICdMZWFybmluZyBSYXRlJywgMCwgMSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ21hcmtRdWFkcmFudExpbmUnLFxuICAgICAgICB0eXBlOiAnc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMC43XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDAsXG4gICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzczRDhBRScsIC8vICdyZ2JhKDI1MywgMTY1LCAyLCAxKScsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNjUsXG5cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFswLCAwLjddLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgc3ltYm9sU2l6ZTogMFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbe1xuICAgICAgICAgICAgICBjb29yZDogWy0yLjIsIDAuNDRdLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgbmFtZTogJ0xvdyBlYXJseSBvcHBvcnR1bml0eSwgbG93IGdyb3d0aCcsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDAsXG4gICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgIGNvbG9yOiAndHJhbnNwYXJlbnQnLCAvLyAncmdiYSgyNTMsIDE2NSwgMiwgMSknLCAvLyAncmVkJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAsXG5cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgICAgIGZvbnRXZWlnaHQ6IDUwMCxcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogMTMsXG4gICAgICAgICAgICAgICAgZm9udEZhbWlseTogJ01haXNvbk5ldWUtTWVkaXVtJyxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBjb29yZDogWy0yLjIxLCAwLjQ0XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDBcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LCAvLyBFbmQgbWFya2xpbmVcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdzZWxlY3RlZCcsXG4gICAgICAgIHR5cGU6ICdzY2F0dGVyJyxcbiAgICAgICAgc3ltYm9sU2l6ZTogZGF0YVNlcmllcy5zeW1ib2xTaXplLFxuICAgICAgICBpdGVtU3R5bGU6IHtcbiAgICAgICAgICBib3JkZXJXaWR0aDogMSxcbiAgICAgICAgICBib3JkZXJDb2xvcjogJ3JnYmEoMjAsIDMzLCAxNTYsIDEpJywgLy8gJ3JnYmEoMCwwLDAsMSknLFxuICAgICAgICAgIGNvbG9yOiAncmdiYSgxNDUsIDExNSwgMjU1LCAxKScsIC8vICcjYjZhMmRlJyAvLyAncmdiYSgyNTUsMCwwLDAuMjUpJ1xuICAgICAgICB9LFxuICAgICAgICB6OiAyLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICBwYWRkaW5nOiA1LFxuICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdBdmVyYWdlJywgLy8gWSBheGlzXG4gICAgICAgICAgICAgICAgICBjb29yZDogWzAsIDEuNl0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogWzAsIDAsIDAsIDBdXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWyAwLCAwLjQ1IF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJ0F2ZXJhZ2UnLCAvLyB4IGF4aXMgbWFya2xpbmVcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbNCwgMC40XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgICAgICBwYWRkaW5nOiBbMCwgMCwgLTUsIDBdXG4gICAgICAgICAgICAgICAgICAgIC8vIHJvdGF0ZTogLTkwXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAwXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzQsIDEuNl0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnQXZlcmFnZScsIC8vIHggYXhpc1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMV0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2VuZCdcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbMy43NSwgMV0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICBdXG4gIH1cbiAgcmV0dXJuIHtcbiAgICB4VmFyOiAnYWxsX2F2ZzMnLFxuICAgIHlWYXI6ICdhbGxfZ3JkJyxcbiAgICB6VmFyOiAnYWxsX3N6JyxcbiAgICBoaWdobGlnaHRlZDogT2JqZWN0LmtleXMoaGlnaGxpZ2h0KSxcbiAgICBzZWxlY3RlZDogW10sXG4gICAgb3B0aW9uczogZGVlcG1lcmdlLmFsbChbIGJhc2Uub3B0aW9ucywgYmFzZU92ZXJyaWRlcyBdKVxuICB9XG59XG5cbi8qKiBTdGF0ZSAxNywgM3JkIHF1YWRyYW50LCBsb3dlciByaWdodCAqL1xuXG52YXIgc3RhdGUxNyA9IGZ1bmN0aW9uKHNjYXR0ZXJwbG90KSB7XG4gIC8vIGdldCBjdXJyZW50IGVjaGFydCBvcHRpb25zXG4gIGNvbnN0IG9wdGlvbnMgPSBzY2F0dGVycGxvdC5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gIC8vIHRoaXMgc3RhdGUgaXMgY3JlYXRlZCBmcm9tIHRoZSBiYXNlXG4gIGNvbnN0IGJhc2UgPSBzY2F0dGVycGxvdC5nZXRTdGF0ZSgnYmFzZScpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBoaWdobGlnaHRbJzU1MDk2MDAnXSA9ICdNaWx3YXVrZWUgU2Nob29sIERpc3RyaWN0JztcbiAgaWYgKHNlYXJjaEl0ZW1JRHMubGVuZ3RoID49IDEgJiYgT2JqZWN0LmtleXMobmFtZXMpLmxlbmd0aCA+PSAwKSB7XG4gICAgLy8gVGhlcmUncyBhIHNlYXJjaCBpdGVtIHNlbGVjdGVkLlxuICAgIC8vIEFkZCBpdCB0byB0aGUgaGlnaGxpZ2h0IG9iamVjdC5cbiAgICBpZiAobmFtZXNbc2VhcmNoSXRlbUlEc1swXV0ubGVuZ3RoID49IDEpIHtcbiAgICAgIGhpZ2hsaWdodFtzZWFyY2hJdGVtSURzWzBdXSA9IG5hbWVzW3NlYXJjaEl0ZW1JRHNbMF1dO1xuICAgIH1cbiAgICAvLyBjb25zb2xlLmxvZyhoaWdobGlnaHQpO1xuICB9XG4gIC8vIEJ1aWxkIHRoZSBzZXJpZXMgb2YgZWxlbWVudHMgZm9yIHF1YWRyYW50IGhpZ2hsaWdodC5cbiAgdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIC8vIHZhciBxdWFkcmFudCA9IGdldFF1YWRyYW50U2VyaWVzKDMsIDMsIDEsIE9iamVjdC5lbnRyaWVzKHNjYXR0ZXJwbG90LmRhdGFbJ2Rpc3RyaWN0cyddWydhbGxfYXZnMyddKSwgYWxsR3JkRGF0YSk7XG5cbiAgLy8gVXBkYXRlIHRpdGxlIGFuZCBzdWJ0ZXh0IHBsYWNlaG9sZGVyc1xuICBUaXRsZVsndGV4dCddID0gJ0xlYXJuaW5nIFJhdGVzIGFuZCAzcmQgR3JhZGUgQWNoaWV2ZW1lbnQnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0b3A6ICcxMHB4JyxcbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogVGl0bGUudGV4dCArIChUaXRsZVsnc3VidGV4dCddLmxlbmd0aCA+PSAxID8gJywgJyArIFRpdGxlWydzdWJ0ZXh0J10gOiAnJyApLFxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgdG9wOiAxMCxcbiAgICAgIGJvdHRvbTogMjYsXG4gICAgICBsZWZ0OiAxMCxcbiAgICAgIHJpZ2h0OiAyNixcbiAgICAgIHpsZXZlbDogMTAwLFxuICAgICAgaGVpZ2h0OiAnYXV0bycsLy8gMjgwLFxuICAgICAgd2lkdGg6ICdhdXRvJywgLy8gJ2F1dG8nLFxuICAgICAgY29udGFpbkxhYmVsOiB0cnVlXG4gICAgfSxcbiAgICB5QXhpczoge1xuICAgICAgbWluOiAwLjQsXG4gICAgICBtYXg6IDEuNixcbiAgICAgIG5hbWU6ICdMZWFybmluZyBSYXRlcycsXG4gICAgICBuYW1lR2FwOiA0NSxcbiAgICAgIGF4aXNMYWJlbDoge1xuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgICByZXR1cm4gc2NhdHRlcnBsb3QuZ2V0UGVyY2VudERpZmZMYWJlbChpdGVtKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIG1pbjogLTQsXG4gICAgICBtYXg6IDQsXG4gICAgICBuYW1lOiAnQWNoaWV2ZW1lbnQgKEluIEdyYWRlIExldmVscyknLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdBY2hpZXZlbWVudCcsICdMZWFybmluZyBSYXRlJywgMCwgMSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3NlbGVjdGVkJyxcbiAgICAgICAgdHlwZTogJ3NjYXR0ZXInLFxuICAgICAgICBzeW1ib2xTaXplOiBkYXRhU2VyaWVzLnN5bWJvbFNpemUsXG4gICAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICAgIGJvcmRlcldpZHRoOiAxLFxuICAgICAgICAgIGJvcmRlckNvbG9yOiAncmdiYSgyMCwgMzMsIDE1NiwgMSknLCAvLyAncmdiYSgwLDAsMCwxKScsXG4gICAgICAgICAgY29sb3I6ICdyZ2JhKDE0NSwgMTE1LCAyNTUsIDEpJywgLy8gJyNiNmEyZGUnIC8vICdyZ2JhKDI1NSwwLDAsMC4yNSknXG4gICAgICAgIH0sXG4gICAgICAgIHo6IDIsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ21hcmtRdWFkcmFudExpbmUnLFxuICAgICAgICB0eXBlOiAnc2NhdHRlcicsXG4gICAgICAgIG1hcmtMaW5lOiB7XG4gICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgIGFuaW1hdGU6IHRydWUsXG4gICAgICAgICAgZGF0YTogW1xuICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgY29vcmQ6IFswLCAwLjddLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgc3ltYm9sU2l6ZTogMCxcbiAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNzNEOEFFJywgLy8gJ3JnYmEoMjUzLCAxNjUsIDIsIDEpJywgLy8gJ3JlZCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNjUsXG5cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFs0LCAwLjddLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgc3ltYm9sU2l6ZTogMFxuICAgICAgICAgICAgfV0sXG4gICAgICAgICAgICBbe1xuICAgICAgICAgICAgICBjb29yZDogWzIuMTUsIDAuNDRdLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgbmFtZTogJ0hpZ2ggZWFybHkgb3Bwb3J0dW5pdHksIGxvdyBncm93dGgnLFxuICAgICAgICAgICAgICBzeW1ib2xTaXplOiAwLFxuICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3RyYW5zcGFyZW50JywgLy8gJ3JnYmEoMjUzLCAxNjUsIDIsIDEpJywgLy8gJ3JlZCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDAsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ21pZGRsZScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICBmb250V2VpZ2h0OiA1MDAsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDEzLFxuICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdNYWlzb25OZXVlLU1lZGl1bScsXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFsyLjE2LCAwLjQ0XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDBcbiAgICAgICAgICAgIH1dXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9LCAvLyBFbmQgbWFya2xpbmVcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdoaWdobGlnaHRlZCcsXG4gICAgICAgIGl0ZW1TdHlsZTogaGlnaGxpZ2h0ZWRJdGVtU3R5bGUsXG4gICAgICAgIGxhYmVsOiBoaWdobGlnaHRlZExhYmVsKGhpZ2hsaWdodCksXG4gICAgICAgIHpsZXZlbDogNTAwLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTonc2NhdHRlcicsXG4gICAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnQXZlcmFnZScsIC8vIFkgYXhpc1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFswLCAxLjZdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ2VuZCcsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFswLCAwLCAwLCAwXVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFswLCAwLjQ1XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBuYW1lOiAnQXZlcmFnZScsIC8vIHggYXhpcyBtYXJrbGluZVxuICAgICAgICAgICAgICAgICAgY29vcmQ6IFs0LCAwLjRdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbjogJ21pZGRsZScsXG4gICAgICAgICAgICAgICAgICAgIHBhZGRpbmc6IFswLCAwLCAtNSwgMF1cbiAgICAgICAgICAgICAgICAgICAgLy8gcm90YXRlOiAtOTBcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6ICcjMDUyOTY1JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IDBcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbNCwgMS42XSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyB4IGF4aXNcbiAgICAgICAgICAgICAgICAgIGNvb3JkOiBbLTQsIDFdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgICAgICBzaG93OiBmYWxzZVxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFszLjc1LCAxXSxcbiAgICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIHhWYXI6ICdhbGxfYXZnMycsXG4gICAgeVZhcjogJ2FsbF9ncmQnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIHNlbGVjdGVkOiBbXSxcbiAgICBvcHRpb25zOiBkZWVwbWVyZ2UuYWxsKFsgYmFzZS5vcHRpb25zLCBiYXNlT3ZlcnJpZGVzIF0pXG4gIH1cbn1cblxuLyoqIFN0YXRlIDE4LCAxc3QgcXVhZHJhbnQsIHVwcGVyIGxlZnQgKi9cbnZhciBzdGF0ZTE4ID0gZnVuY3Rpb24oc2NhdHRlcnBsb3QpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgZWNoYXJ0IG9wdGlvbnNcbiAgY29uc3Qgb3B0aW9ucyA9IHNjYXR0ZXJwbG90LmNvbXBvbmVudC5nZXRPcHRpb24oKTtcbiAgLy8gdGhpcyBzdGF0ZSBpcyBjcmVhdGVkIGZyb20gdGhlIGJhc2VcbiAgY29uc3QgYmFzZSA9IHNjYXR0ZXJwbG90LmdldFN0YXRlKCdiYXNlJyk7XG4gIHZhciBoaWdobGlnaHQgPSB7fTtcbiAgaGlnaGxpZ2h0WycyNDAwMDYwJ10gPSAnQW5uZSBBcnVuZGVsIENvdW50eSBQdWJsaWMgU2Nob29scyc7XG4gIGhpZ2hsaWdodFsnMTcwOTkzMCddID0gJ0NoaWNhZ28gUHVibGljIFNjaG9vbCBEaXN0cmljdCc7XG4gIGhpZ2hsaWdodFsnNTUwOTYwMCddID0gJ01pbHdhdWtlZSBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cbiAgLy8gQnVpbGQgdGhlIHNlcmllcyBvZiBlbGVtZW50cyBmb3IgcXVhZHJhbnQgaGlnaGxpZ2h0LlxuICB2YXIgZGF0YVNlcmllcyA9IHNjYXR0ZXJwbG90LmdldERhdGFTZXJpZXMoKTtcbiAgLy8gdmFyIHF1YWRyYW50ID0gZ2V0UXVhZHJhbnRTZXJpZXMoMSwgMywgMSwgT2JqZWN0LmVudHJpZXMoc2NhdHRlcnBsb3QuZGF0YVsnZGlzdHJpY3RzJ11bJ2FsbF9hdmczJ10pLCBhbGxHcmREYXRhKTtcblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnTGVhcm5pbmcgUmF0ZXMgYW5kIDNyZCBHcmFkZSBBY2hpZXZlbWVudCc7XG4gIFRpdGxlWydzdWJ0ZXh0J10gPSAnJzsgLy8gVS5TLiBTY2hvb2wgRGlzdHJpY3RzIDIwMDktMjAxNlxuICAvLyBTZXQgdGl0bGUgYW5kIHN1YnRpdGxlXG4gIFRpdGxlLnNldFRpdGxlKCk7XG5cbiAgY29uc3QgYmFzZU92ZXJyaWRlcyA9IHtcbiAgICB0aXRsZToge1xuICAgICAgc2hvdzogZmFsc2UsXG4gICAgICB0ZXh0OiBUaXRsZS50ZXh0LFxuICAgICAgc3VidGV4dDogVGl0bGUuc3VidGV4dCxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB0b3A6IDEwLFxuICAgICAgYm90dG9tOiAyNixcbiAgICAgIGxlZnQ6IDEwLFxuICAgICAgcmlnaHQ6IDI2LFxuICAgICAgemxldmVsOiAxMDAsXG4gICAgICBoZWlnaHQ6ICdhdXRvJywvLyAyODAsXG4gICAgICB3aWR0aDogJ2F1dG8nLCAvLyAnYXV0bycsXG4gICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICB9LFxuICAgIHlBeGlzOiB7XG4gICAgICBtaW46IDAuNCxcbiAgICAgIG1heDogMS42LFxuICAgICAgbmFtZTogJ0xlYXJuaW5nIFJhdGVzJyxcbiAgICAgIG5hbWVHYXA6IDQ1LFxuICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5nZXRQZXJjZW50RGlmZkxhYmVsKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB4QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogNCxcbiAgICAgIG5hbWU6ICdBY2hpZXZlbWVudCAoSW4gR3JhZGUgTGV2ZWxzKScsXG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICAvLyB0cmlnZ2VyOiAnaXRlbScsXG4gICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgICAgcmV0dXJuIHNjYXR0ZXJwbG90LmZvcm1hdFRvb2x0aXAoaXRlbSwgc2NhdHRlcnBsb3QuZGF0YSwgJ0FjaGlldmVtZW50JywgJ0xlYXJuaW5nIFJhdGUnLCAwLCAxKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIHNlcmllczogW1xuICAgICAgeyBpZDogJ2Jhc2UnIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnc2VsZWN0ZWQnLFxuICAgICAgICB0eXBlOiAnc2NhdHRlcicsXG4gICAgICAgIHN5bWJvbFNpemU6IGRhdGFTZXJpZXMuc3ltYm9sU2l6ZSxcbiAgICAgICAgaXRlbVN0eWxlOiB7XG4gICAgICAgICAgYm9yZGVyV2lkdGg6IDEsXG4gICAgICAgICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDIwLCAzMywgMTU2LCAxKScsXG4gICAgICAgICAgY29sb3I6ICdyZ2JhKDE0NSwgMTE1LCAyNTUsIDEpJyxcbiAgICAgICAgfSxcbiAgICAgICAgejogMixcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnbWFya1F1YWRyYW50TGluZScsXG4gICAgICAgIHR5cGU6ICdzY2F0dGVyJyxcbiAgICAgICAgbWFya0xpbmU6IHtcbiAgICAgICAgICBzaWxlbnQ6IHRydWUsXG4gICAgICAgICAgYW5pbWF0ZTogdHJ1ZSxcbiAgICAgICAgICBkYXRhOiBbXG4gICAgICAgICAgICBbe1xuICAgICAgICAgICAgICBjb29yZDogWy00LCAxLjNdLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgc3ltYm9sU2l6ZTogMCxcbiAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICcjNzNEOEFFJywgLy8gJ3JnYmEoMjUzLCAxNjUsIDIsIDEpJywgLy8gJ3JlZCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDE0MCxcbiAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDAuNTYsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbMCwgMS4zXSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIHN5bWJvbFNpemU6IDBcbiAgICAgICAgICAgIH1dLFxuICAgICAgICAgICAgW3tcbiAgICAgICAgICAgICAgY29vcmQ6IFstMi4yLCAxLjQ4XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgIG5hbWU6ICdMb3cgZWFybHkgb3Bwb3J0dW5pdHksIGhpZ2ggZ3Jvd3RoJyxcbiAgICAgICAgICAgICAgc3ltYm9sU2l6ZTogMCxcbiAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6ICd0cmFuc3BhcmVudCcsIC8vICdyZ2JhKDI1MywgMTY1LCAyLCAxKScsIC8vICdyZWQnLFxuICAgICAgICAgICAgICAgIHdpZHRoOiAwLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcblxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdtaWRkbGUnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgZm9udFdlaWdodDogNTAwLFxuICAgICAgICAgICAgICAgIGZvbnRTaXplOiAxMyxcbiAgICAgICAgICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgIGNvb3JkOiBbLTIuMjEsIDEuNDhdLFxuICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgc3ltYm9sU2l6ZTogMFxuICAgICAgICAgICAgfV1cbiAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICAgIH0sIC8vIEVuZCBtYXJrbGluZVxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgICBtYXJrTGluZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdBdmVyYWdlJywgLy8gWSBheGlzXG4gICAgICAgICAgICAgICAgICBjb29yZDogWzAsIDEuNl0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnZW5kJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogWzAsIDAsIDAsIDBdXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzAsIDAuNDVdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIG5hbWU6ICdBdmVyYWdlJywgLy8geCBheGlzIG1hcmtsaW5lXG4gICAgICAgICAgICAgICAgICBjb29yZDogWzQsIDAuNF0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnbWlkZGxlJyxcbiAgICAgICAgICAgICAgICAgICAgcGFkZGluZzogWzAsIDAsIC01LCAwXVxuICAgICAgICAgICAgICAgICAgICAvLyByb3RhdGU6IC05MFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogMFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFs0LCAxLjZdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgbmFtZTogJycsIC8vIHggYXhpc1xuICAgICAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMV0sXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICAgIHNob3c6IGZhbHNlXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9yOiAnIzA1Mjk2NScsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgICAgIHdpZHRoOiAxXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb29yZDogWzMuNzUsIDFdLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgXVxuICB9XG4gIHJldHVybiB7XG4gICAgeFZhcjogJ2FsbF9hdmczJyxcbiAgICB5VmFyOiAnYWxsX2dyZCcsXG4gICAgelZhcjogJ2FsbF9zeicsXG4gICAgaGlnaGxpZ2h0ZWQ6IE9iamVjdC5rZXlzKGhpZ2hsaWdodCksXG4gICAgc2VsZWN0ZWQ6IFtdLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgfVxufVxuXG4vKiogU3RhdGUgMTk6IEFjaGlldmVtZW50IEdyb3d0aCB2cy4gRmFtaWx5IFNvY2lvZWNvbm9taWMgU3RhdHVzLCBieSBEaXN0cmljdCAqL1xudmFyIHN0YXRlMTkgPSBmdW5jdGlvbihzY2F0dGVycGxvdCkge1xuICBjb25zdCBiYXNlID0gc2NhdHRlcnBsb3QuZ2V0U3RhdGUoJ2Jhc2UnKTtcbiAgLy8gdmFyIGRhdGFTZXJpZXMgPSBzY2F0dGVycGxvdC5nZXREYXRhU2VyaWVzKCk7XG4gIHZhciBvcHRpb25zID0gc2NhdHRlcnBsb3QuY29tcG9uZW50LmdldE9wdGlvbigpO1xuICB2YXIgaGlnaGxpZ2h0ID0ge307XG4gIGhpZ2hsaWdodFsnMjQwMDA2MCddID0gJ0FubmUgQXJ1bmRlbCBDb3VudHkgUHVibGljIFNjaG9vbHMnO1xuICBoaWdobGlnaHRbJzE3MDk5MzAnXSA9ICdDaGljYWdvIFB1YmxpYyBTY2hvb2wgRGlzdHJpY3QnO1xuICBpZiAoc2VhcmNoSXRlbUlEcy5sZW5ndGggPj0gMSAmJiBPYmplY3Qua2V5cyhuYW1lcykubGVuZ3RoID49IDApIHtcbiAgICAvLyBUaGVyZSdzIGEgc2VhcmNoIGl0ZW0gc2VsZWN0ZWQuXG4gICAgLy8gQWRkIGl0IHRvIHRoZSBoaWdobGlnaHQgb2JqZWN0LlxuICAgIGlmIChuYW1lc1tzZWFyY2hJdGVtSURzWzBdXS5sZW5ndGggPj0gMSkge1xuICAgICAgaGlnaGxpZ2h0W3NlYXJjaEl0ZW1JRHNbMF1dID0gbmFtZXNbc2VhcmNoSXRlbUlEc1swXV07XG4gICAgfVxuICAgIC8vIGNvbnNvbGUubG9nKGhpZ2hsaWdodCk7XG4gIH1cblxuICAvLyBVcGRhdGUgdGl0bGUgYW5kIHN1YnRleHQgcGxhY2Vob2xkZXJzXG4gIFRpdGxlWyd0ZXh0J10gPSAnTGVhcm5pbmcgUmF0ZXMnO1xuICBUaXRsZVsnc3VidGV4dCddID0gJyc7IC8vIFUuUy4gU2Nob29sIERpc3RyaWN0cyAyMDA5LTIwMTZcbiAgLy8gU2V0IHRpdGxlIGFuZCBzdWJ0aXRsZVxuICBUaXRsZS5zZXRUaXRsZSgpO1xuXG4gIGNvbnN0IGJhc2VPdmVycmlkZXMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgdGV4dDogVGl0bGUudGV4dCxcbiAgICAgIHN1YnRleHQ6IFRpdGxlLnN1YnRleHQsXG4gICAgICB0ZXh0U3R5bGU6IHtcbiAgICAgICAgZm9udFNpemU6IDE4LFxuICAgICAgICBsaW5lSGVpZ2h0OiAzMlxuICAgICAgfSxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBsZWZ0OiAnNTAlJyxcbiAgICAgIHRvcDogJzEwcHgnLFxuICAgIH0sXG4gICAgYXJpYToge1xuICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgIGRlc2NyaXB0aW9uOiBUaXRsZS50ZXh0ICsgKFRpdGxlWydzdWJ0ZXh0J10ubGVuZ3RoID49IDEgPyAnLCAnICsgVGl0bGVbJ3N1YnRleHQnXSA6ICcnICksXG4gICAgfSxcbiAgICBncmlkOiB7XG4gICAgICB0b3A6IDEwLFxuICAgICAgYm90dG9tOiAyNixcbiAgICAgIGxlZnQ6IDEwLFxuICAgICAgcmlnaHQ6IDI2LFxuICAgICAgemxldmVsOiAxMDAsXG4gICAgICBoZWlnaHQ6ICdhdXRvJywvLyAyODAsXG4gICAgICB3aWR0aDogJ2F1dG8nLCAvLyAnYXV0bycsXG4gICAgICBjb250YWluTGFiZWw6IHRydWVcbiAgICB9LFxuICAgIHlBeGlzOiB7XG4gICAgICBtaW46IDAuNCxcbiAgICAgIG1heDogMS42LFxuICAgICAgbmFtZTogJ0xlYXJuaW5nIFJhdGVzJyxcbiAgICAgIG5hbWVHYXA6IDQ1LFxuICAgICAgYXhpc0xhYmVsOiB7XG4gICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5nZXRQZXJjZW50RGlmZkxhYmVsKGl0ZW0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB4QXhpczoge1xuICAgICAgbWluOiAtNCxcbiAgICAgIG1heDogMy41LFxuICAgICAgbmFtZTogJ+KXgCAgUE9PUkVSICAgICAgICAgICAgICAgICAgICBTb2Npb2Vjb25vbWljIFN0YXR1cyAgICAgICAgICAgICAgICAgICAgUklDSEVSICDilrYnLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgLy8gdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgZm9ybWF0dGVyOiBmdW5jdGlvbihpdGVtKSB7XG4gICAgICAgIHJldHVybiBzY2F0dGVycGxvdC5mb3JtYXRUb29sdGlwKGl0ZW0sIHNjYXR0ZXJwbG90LmRhdGEsICdTb2Npb2Vjb25vbWljIFN0YXR1cycsICdMZWFybmluZyBSYXRlJywgMCwgMSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHsgaWQ6ICdiYXNlJyB9LFxuICAgICAge1xuICAgICAgICBpZDogJ2hpZ2hsaWdodGVkJyxcbiAgICAgICAgaXRlbVN0eWxlOiBoaWdobGlnaHRlZEl0ZW1TdHlsZSxcbiAgICAgICAgbGFiZWw6IGhpZ2hsaWdodGVkTGFiZWwoaGlnaGxpZ2h0KSxcbiAgICAgICAgemxldmVsOiA1MDAsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOidzY2F0dGVyJyxcbiAgICAgICAgICBtYXJrTGluZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiBmYWxzZSxcbiAgICAgICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgICAgIGRhdGE6IFtcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyB1cHBlciByaWdodCBtYXJrbGluZVxuICAgICAgICAgICAgICAgIGNvb3JkOiBbMywgMS4yNV0sXG4gICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LCAxOTIsIDQ1LCAxKScsXG4gICAgICAgICAgICAgICAgICB0eXBlOiAnc29saWQnLFxuICAgICAgICAgICAgICAgICAgd2lkdGg6IDAgLy8gcmVtb3ZpbmcgdGhpcyBsaW5lXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGNvb3JkOiBbLTEsIC43NV0sXG4gICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBuYW1lOiAnJywgLy8gbG93ZXIgbGVmdCBtYXJrbGluZVxuICAgICAgICAgICAgICBjb29yZDogWzEsIDAuOV0sXG4gICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgICBjb2xvcjogJ3JnYmEoMjU1LCAxOTIsIDQ1LCAxKScsXG4gICAgICAgICAgICAgICAgdHlwZTogJ3NvbGlkJyxcbiAgICAgICAgICAgICAgICB3aWR0aDogMCAvL3JlbW92aW5nIHRoaXMgbGluZVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMC44XSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICcnLCAvLyB4IGF4aXNcbiAgICAgICAgICAgICAgY29vcmQ6IFstNCwgMV0sXG4gICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAvLyBsaW5lU3R5bGU6IHtcbiAgICAgICAgICAgICAgLy8gICBjb2xvcjogJyNhZGFkYWQnIC8vICdyZ2JhKDAsMCwwLDAuMiknXG4gICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgbGluZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgLy8gY29sb3I6ICcjZmZmJywgLy8gJ3JnYmEoMCwwLDAsMC42KSdcbiAgICAgICAgICAgICAgICBjb2xvcjogJyMwNTI5NjUnLFxuICAgICAgICAgICAgICAgIHR5cGU6ICdzb2xpZCcsXG4gICAgICAgICAgICAgICAgd2lkdGg6IDFcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29vcmQ6IFszLCAxXSxcbiAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXVxuICAgICAgICBdXG4gICAgICB9XG4gICAgICB9LFxuICAgIF1cbiAgfVxuICByZXR1cm4ge1xuICAgIGhpZ2hsaWdodGVkOiBPYmplY3Qua2V5cyhoaWdobGlnaHQpLFxuICAgIHNlbGVjdGVkOiBbXSxcbiAgICB4VmFyOiAnYWxsX3NlcycsXG4gICAgeVZhcjogJ2FsbF9ncmQnLFxuICAgIHpWYXI6ICdhbGxfc3onLFxuICAgIG9wdGlvbnM6IGRlZXBtZXJnZS5hbGwoWyBiYXNlLm9wdGlvbnMsIGJhc2VPdmVycmlkZXMgXSlcbiAgfVxufVxuXG4vLyBjcmVhdGUgdGhlIGNvbXBvbmVudFxudmFyIHJvb3RFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2F0dGVycGxvdCcpO1xudmFyIHNjYXR0ZXJwbG90ID0gbmV3IFNjYXR0ZXJwbG90KHJvb3RFbCk7XG5cbi8vIHNldCB0aGUgc3RhdGVzXG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGUxJywgc3RhdGUxKTtcbi8vIHNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTFfMScsIHN0YXRlMV8xKTtcbi8vIHNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTInLCBzdGF0ZTIpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlMycsIHN0YXRlMyk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGU0Jywgc3RhdGU0KTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTUnLCBzdGF0ZTUpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlNicsIHN0YXRlNik7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGU3Jywgc3RhdGU3KTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTgnLCBzdGF0ZTgpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlOScsIHN0YXRlOSk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGUxMCcsIHN0YXRlMTApO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlMTEnLCBzdGF0ZTExKTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTEyJywgc3RhdGUxMik7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGUxMycsIHN0YXRlMTMpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlMTQnLCBzdGF0ZTE0KTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTE1Jywgc3RhdGUxNSk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGUxNicsIHN0YXRlMTYpO1xuc2NhdHRlcnBsb3QuYWRkU3RhdGUoJ3N0YXRlMTcnLCBzdGF0ZTE3KTtcbnNjYXR0ZXJwbG90LmFkZFN0YXRlKCdzdGF0ZTE4Jywgc3RhdGUxOCk7XG5zY2F0dGVycGxvdC5hZGRTdGF0ZSgnc3RhdGUxOScsIHN0YXRlMTkpO1xuIl19