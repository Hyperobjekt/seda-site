/**
 * Helper class for easier scatterplot updates
 */
function Scatterplot(container, props) {

  var _self = this;
  var _ready = false;
  var _handlers = {};

  var colorPalette = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
  ];

  var theme = {
    color: colorPalette,
    title: {
      textStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontFamily: 'SharpGrotesk-Medium20',
        textAlign: 'center'
      },
      subtextStyle: {
        fontWeight: 'normal',
        color: '#fff',
        fontFamily: 'MaisonNeue-Medium',
        textAlign: 'center'
      },
      textAlign: 'center'
    },
    yAxis: {
      nameTextStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    xAxis: {
      nameTextStyle: {
        fontFamily: 'SharpGrotesk-Medium20',
        color: '#FF003E',
      }
    },
    visualMap: {
      itemWidth: 15,
      color: ['#5ab1ef', '#e0ffff']
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: colorPalette[0]
        }
      }
    },
    tooltip: {
      backgroundColor: '#042965',
      borderColor: 'rgba(255, 255, 255, 0.5)', // '#fff', // '#042965',
      padding: [6, 10],
      borderRadius: 4,
      borderWidth: 0.5,
      // extraCssText: 'box-shadow: 0px 0px 3px #2ec7c9;', // #ffb980
      textStyle: {
        color: '#fff', // '#dc69aa',
        fontWeight: '500',
        fontFamily: 'MaisonNeue-Medium'
      },
      axisPointer: {
        type: 'line',
        lineStyle: {
          color: '#008acd'
        },
        crossStyle: {
          color: '#008acd'
        },
        shadowStyle: {
          color: 'rgba(200,200,200,0.2)'
        }
      }
    },
    grid: {
      borderColor: '#fff'
    },
    valueAxis: {
      axisLine: {
        lineStyle: {
          color: '#fff' // '#008acd'
        }
      },
      splitArea: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      nameTextStyle: { // Styles for x and y axis labels
        color: '#fff',
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'SharpGrotesk-Medium20' // 'MaisonNeue-Medium'
      },
      nameLocation: 'middle',
      nameGap: 32,
      axisLabel: { // Styles for grid numbers
        inside: false,
        textVerticalAlign: 'middle',
        color: '#fff',
        fontFamily: 'MaisonNeue-Medium',
        fontSize: 12,
      }
    },
    line: {
      smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 3
    },
    scatter: {
      symbol: 'circle',
      itemStyle: {
        borderWidth: 0.7,
        borderColor: 'rgba(0,99,88,1)', // '#006358', // 'rgba(0,0,0,0.5)',
        borderOpacity: 0,
      }
    },
    graph: {
      color: colorPalette
    }
  };

  this.states = {
    // default state shared by all scatterplots
    // https://ecomfe.github.io/echarts-doc/public/en/option.html
    base: {
      options: {
        title: {
          show: false,
          textStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontFamily: 'SharpGrotesk-Medium20',
            textAlign: 'center'
          },
          subtextStyle: {
            fontWeight: 'normal',
            color: '#fff',
            fontFamily: 'MaisonNeue-Medium',
            textAlign: 'center'
          },
          textAlign: 'center'
        },
        grid: {
          top: 20,
          bottom: 20,
          left: 20,
          right: 36,
          zlevel: 100,
          height: 280
        },
        yAxis: {
          nameGap: 20,
          position: 'right',
          splitLine: {
            show: false,
          },
          nameTextStyle: {
            fontFamily: 'SharpGrotesk-Medium20',
            color: '#FFF',
            fontSize: 12,
          },
          axisLabel: {
            align: 'right',
          },
          zlevel: 101,
        },
        xAxis: {
          nameGap: 26, // 26,
          // bottom: 16,
          nameTextStyle: {
            fontFamily: 'SharpGrotesk-Medium20',
            color: '#FFF',
            fontSize: 12,
            // fontWeight: 'normal'
          },
          zlevel: 102,
        },
        tooltip: {
          trigger: 'item',
          // borderColor: '#fff',
          formatter: function(item) {
            const data = _self.data[_self.props.prefix];
            const itemName =
              data &&
              data.name &&
              data.name[item.value[3]] ?
              data.name[item.value[3]] : 'Unavailable'
            // console.log(data);
            return itemName + '<br />'
              + 'X: ' + item.value[0] + "\n"
              + '&nbsp;&nbsp;&nbsp;&nbsp;Y: ' + item.value[1]

          }
        },
      }
    }
  }

  // add a ref prop to get a reference to the react component instance
  this.props = Object.assign(
    (props || {}),
    {
      prefix: 'districts',
      options: this.states.base.options,
      endpoint: 'https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/',
      metaVars: {
        'counties': ['id', 'name', 'lat', 'lon', 'all_sz' ],
        'districts': ['id', 'name', 'lat', 'lon', 'all_sz' ],
        'schools': ['id', 'name', 'lat', 'lon', 'all_sz' ]
      },
      data: {},
      ref: function(ref) {
        _self.component = ref;
      },
      onReady: function(echartInstance) {
        _ready = true;
        _self.trigger('ready', [_self])
      },
      onData: function(data, region) {
        let currData = ((_self.data && _self.data[region]) || {})
        const newData = {}
        newData[region] = Object.assign(currData, data)
        _self.data = Object.assign((_self.data || {}), newData)
        _self.setProps({data:_self.data})
      },
      theme: theme
    }
  );

  /**
   * Triggers an event with `eventName` and runs all handlers
   */
  this.trigger = function(eventName, data) {
    _handlers[eventName] &&
    _handlers[eventName].forEach(function(h) {
      h.apply(null, data)
    })
  }

  /**
   * Registers an event handler with the associated eventName
   * If it's a ready handler and everything is ready, run immediately.
   */
  this.on = function(eventName, handler) {
    if (_handlers[eventName] )
      _handlers[eventName].push(handler)
    else
      _handlers[eventName] = [ handler ]
    if (eventName === 'ready' && _ready) {
      handler(_self.component, _self.component.echart)
    }
  }

  /**
   * Set a state generator for the scatterplot
   */
  this.addState = function(stateName, state) {
    this.states[stateName] = state;
  }

  /**
   * Load a state for the scatterplot
   */
  this.loadState = function(stateName, options = {}) {
    // this.component.echart.setOption(this.getState(stateName), options)
    const newState = this.getState(stateName);
    if (options.hasOwnProperty('notMerge')) {
      newState['notMerge'] = options.notMerge
    }
    this.setProps(newState)
  }

  /**
   * Get an existing state for the scatterplot
   */
  this.getState = function(stateName) {
    if (this.states.hasOwnProperty(stateName)) {
      if (typeof this.states[stateName] === 'function')
       return this.states[stateName](this)
      if (typeof this.states[stateName] === 'object')
        return this.states[stateName]
    } else {
      throw new Error('no state found for ' + stateName)
    }
  }

  this.getScatterplotSeries = function (xVar, yVar, zVar, ids) {

  }

  this.getDataSeries = function() {
    var options = this.component.getOption();
    if (options.series && options.series.length) {
      return options.series.find(s => s.id === 'base')
    }
    return null;
  }

  /**
   * Set an object of props for the react component
   */
  this.setProps = function(props) {
    this.props = {
      ...this.props,
      ...props
    }
    this.render();
  }

  /**
   * Render the component with props
   */
  this.render = function() {
    // render the component
    ReactDOM.render(
      React.createElement(sedaScatterplot, this.props, null),
      container
    );
  }

  this.render()

}

/**
 * Returns an array with the IDs that correspond to
 * the largest `num` values.
 */
Scatterplot.prototype.getSeriesDataBySize = function(values, num) {
  num = num || 100;
  var sorted = values
    .sort(function(a, b) {
      return b[2] - a[2];
    });
  return sorted.slice(0, num)
}

/**
 * Returns an array with the IDs that correspond to
 * the largest `num` values.
 */
Scatterplot.prototype.getSeriesDataForIds = function(values, ids) {
  return ids
    .map(function(id) {
      return values.find(v => v[3] === id);
    })
    .filter(v => v);
}

/** Returns an array of values that fall within the range on the provided axis */
Scatterplot.prototype.getSeriesDataInRange = function(values, axis, range) {
  var index = axis === 'x' ? 0 :
    axis === 'y' ? 1 : 2;
  return values.filter(function(v) {
    return v[index] > range.min && v[index] < range.max;
  })
}

