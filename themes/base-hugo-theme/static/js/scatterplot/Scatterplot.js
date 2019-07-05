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

  var axisBlue = '#547892';

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
      backgroundColor: 'rgba(3, 18, 50, 80%)',
      padding: [6, 10],
      textStyle: {
        color: '#fff', // '#dc69aa',
        fontWeight: '500',
        fontFamily: 'SharpGrotesk-Medium20',
        rich: {
          span: {
            fontFamily: 'SharpGrotesk-Medium20',
          },
          small: {
            fontFamily: 'MaisonNeue-Medium',
            fontSize: 6
          },
        }
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
      top: 10,
      bottom: 32,
      left: 10,
      right: 32,
      // width: 'auto',
      // height: 'auto',
      containLabel: true
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
        color: axisBlue, // '#fff',
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
      color: '#94E4FE',
      itemStyle: {
        borderWidth: 0.5,
        borderColor: '#81C2D7',
        borderType: 'solid',
        opacity: .5
        // borderOpacity: 0,
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
          position: 'right',
          splitLine: {
            show: false,
          },
          nameGap: 26,
          nameTextStyle: {
            fontFamily: 'MaisonNeue-Medium',
            color: axisBlue,
            fontWeight: 'normal',
            fontSize: 13
          },
          zlevel: 101,
        },
        xAxis: {
          nameGap: 26,
          nameTextStyle: {
            fontFamily: 'MaisonNeue-Medium',
            color: axisBlue,
            fontSize: 13,
            fontWeight: 'normal',
            verticalAlign: 'bottom'
          },
          zlevel: 102,
        },
        tooltip: {
          trigger: 'item',
          // borderColor: '#fff',
          formatter: function(item) {
            const data = _self.data[_self.props.prefix];
            let returnString = null;
            if (!!item && !!item.value && !!item.value[3]) {
              const itemName =
                data &&
                data.name &&
                data.name[item.value[3]] ?
                data.name[item.value[3]] : 'Unavailable'
              // itemValue = item.value[3] ? item.value[3] : item.name;
              returnString = '<span>' + itemName + '</span><br>'
                + '<small>X: ' + item.value[0]
                + '&nbsp;&nbsp;&nbsp;&nbsp;Y: ' + item.value[1] + '</small>';
            } else {
              // console.log(item);
              // Send back a different string for the markarea tooltip.
              returnString = '<span>' + item.data.name + '</span><br>'
            }
            return returnString;
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
