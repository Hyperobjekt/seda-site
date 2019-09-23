"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

/**
 * Helper class for easier scatterplot updates
 */
function Scatterplot(container, props) {
  var _self = this;

  var _ready = false;
  var _handlers = {};
  var colorPalette = ['#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80', '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa', '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050', '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'];
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
    aria: {
      show: true,
      description: 'Scatterplot of student test scores'
    },
    toolbox: {
      iconStyle: {
        normal: {
          borderColor: colorPalette[0]
        }
      }
    },
    tooltip: {
      backgroundColor: '#031232',
      // 'rgba(3, 18, 50, 80%)',
      extraCssText: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5)',
      padding: [6, 10],
      textStyle: {
        color: '#fff',
        // '#dc69aa',
        fontWeight: '500',
        fontFamily: 'SharpGrotesk-Medium20',
        rich: {
          span: {
            fontFamily: 'SharpGrotesk-Medium20'
          },
          small: {
            fontFamily: 'MaisonNeue-Medium',
            fontSize: 6
          }
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
        show: false
      },
      splitLine: {
        show: false
      },
      nameTextStyle: {
        // Styles for x and y axis labels
        color: '#fff',
        fontSize: 12,
        fontWeight: 'normal',
        fontFamily: 'SharpGrotesk-Medium20' // 'MaisonNeue-Medium'

      },
      nameLocation: 'middle',
      nameGap: 32,
      axisLabel: {
        // Styles for grid numbers
        inside: false,
        textVerticalAlign: 'middle',
        color: axisBlue,
        // '#fff',
        fontFamily: 'MaisonNeue-Medium',
        fontSize: 12
      }
    },
    line: {
      smooth: true,
      symbol: 'emptyCircle',
      symbolSize: 3
    },
    scatter: {
      symbol: 'circle',
      //color: 'rgba(148, 228, 254, 0.8)',
      //color: 'rgba(255, 255, 255, 0.8)',
      //color: 'rgba(171, 217, 233, 0.8)',
      color: 'rgba(202,235,190, 0.77)',
      itemStyle: {
        borderWidth: 0.25,
        borderColor: 'rgba(106, 145, 185, 0.8)',
        borderType: 'solid',
        opacity: 1 // borderOpacity: 0,

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
          height: 'auto',
          // 280,
          width: 'auto',
          // 'auto',
          containLabel: true
        },
        yAxis: {
          position: 'right',
          splitLine: {
            show: false
          },
          nameGap: 26,
          nameTextStyle: {
            fontFamily: 'MaisonNeue-Medium',
            color: axisBlue,
            fontWeight: 'normal',
            fontSize: 13
          },
          zlevel: 101
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
          zlevel: 102
        },
        tooltip: {
          trigger: 'item',
          transitionDuration: 0.6,
          showDelay: 50,
          hideDelay: 0,
          // borderColor: '#fff',
          formatter: function formatter(item) {
            // console.log(item);
            var data = _self.data[_self.props.prefix];
            var returnString = null;

            if (!!item && !!item.value && !!item.value[3]) {
              var itemName = data && data.name && data.name[item.value[3]] ? data.name[item.value[3]] : 'Unavailable'; // itemValue = item.value[3] ? item.value[3] : item.name;

              returnString = '<span>' + itemName + '</span><br>' + '<small>X: ' + item.value[0] + '&nbsp;&nbsp;&nbsp;&nbsp;Y: ' + item.value[1] + '</small>';
            } else {
              // console.log(item);
              // Send back a different string for the markarea tooltip.
              returnString = '<span>' + item.data.name + '</span><br>';
            }

            return returnString;
          }
        }
      }
    }
  }; // add a ref prop to get a reference to the react component instance

  this.props = _extends(props || {}, {
    prefix: 'districts',
    options: this.states.base.options,
    endpoint: 'https://d2fypeb6f974r1.cloudfront.net/dev/scatterplot/',
    metaVars: {
      'counties': ['id', 'name', 'lat', 'lon', 'all_sz'],
      'districts': ['id', 'name', 'lat', 'lon', 'all_sz'],
      'schools': ['id', 'name', 'lat', 'lon', 'all_sz']
    },
    data: {},
    ref: function ref(_ref) {
      _self.component = _ref;
    },
    onReady: function onReady(echartInstance) {
      _ready = true;

      _self.trigger('ready', [_self]);
    },
    onData: function onData(data, region) {
      var currData = _self.data && _self.data[region] || {};
      var newData = {};
      newData[region] = _extends(currData, data);
      _self.data = _extends(_self.data || {}, newData);

      _self.setProps({
        data: _self.data
      });
    },
    theme: theme
  });
  /**
   * Triggers an event with `eventName` and runs all handlers
   */

  this.trigger = function (eventName, data) {
    _handlers[eventName] && _handlers[eventName].forEach(function (h) {
      h.apply(null, data);
    });
  };
  /**
   * Registers an event handler with the associated eventName
   * If it's a ready handler and everything is ready, run immediately.
   */


  this.on = function (eventName, handler) {
    if (_handlers[eventName]) _handlers[eventName].push(handler);else _handlers[eventName] = [handler];

    if (eventName === 'ready' && _ready) {
      handler(_self.component, _self.component.echart);
    }
  };
  /**
   * Set a state generator for the scatterplot
   */


  this.addState = function (stateName, state) {
    this.states[stateName] = state;
  };
  /**
   * Load a state for the scatterplot
   */


  this.loadState = function (stateName) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    // this.component.echart.setOption(this.getState(stateName), options)
    var newState = this.getState(stateName);

    if (options.hasOwnProperty('notMerge')) {
      newState['notMerge'] = options.notMerge;
    }

    this.setProps(newState);
  };
  /**
   * Get an existing state for the scatterplot
   */


  this.getState = function (stateName) {
    if (this.states.hasOwnProperty(stateName)) {
      if (typeof this.states[stateName] === 'function') return this.states[stateName](this);
      if (_typeof(this.states[stateName]) === 'object') return this.states[stateName];
    } else {
      throw new Error('no state found for ' + stateName);
    }
  };

  this.getScatterplotSeries = function (xVar, yVar, zVar, ids) {};

  this.getDataSeries = function () {
    var options = this.component.getOption();

    if (options.series && options.series.length) {
      return options.series.find(function (s) {
        return s.id === 'base';
      });
    }

    return null;
  };
  /**
   * Set an object of props for the react component
   */


  this.setProps = function (props) {
    this.props = _objectSpread({}, this.props, {}, props);
    this.render();
  };
  /**
   * Render the component with props
   */


  this.render = function () {
    // render the component
    ReactDOM.render( // React.createElement(sedaScatterplot, this.props, null),
    // container
    React.createElement(sedaScatterplot, _extends({}, this.props), null), container);
  };

  this.render();
}
/**
 * Returns an array with the IDs that correspond to
 * the largest `num` values.
 */


Scatterplot.prototype.getSeriesDataBySize = function (values, num) {
  num = num || 100;
  var sorted = values.sort(function (a, b) {
    return b[2] - a[2];
  });
  return sorted.slice(0, num);
};
/**
 * Returns an array with the IDs that correspond to
 * the largest `num` values.
 */


Scatterplot.prototype.getSeriesDataForIds = function (values, ids) {
  return ids.map(function (id) {
    return values.find(function (v) {
      return v[3] === id;
    });
  }).filter(function (v) {
    return v;
  });
};
/** Returns an array of values that fall within the range on the provided axis */


Scatterplot.prototype.getSeriesDataInRange = function (values, axis, range) {
  var index = axis === 'x' ? 0 : axis === 'y' ? 1 : 2;
  return values.filter(function (v) {
    return v[index] > range.min && v[index] < range.max;
  });
};

Scatterplot.prototype.formatTooltip = function (item, data, xLabel, yLabel) {
  var xPercent = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
  var yPercent = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
  // console.log(item);
  // console.log(data);
  var returnString = null;

  if (!!item && !!item.value && !!item.value[3]) {
    var itemName = data && data.districts && data.districts.name && data.districts.name[item.value[3]] ? data.districts.name[item.value[3]] : 'Unavailable';
    var testLength = (xLabel + yLabel + String(item.value[0]) + String(item.value[1])).length;

    var _x_val = xPercent ? this.getPercentDiffLabel(item.value[0]) : item.value[0];

    var _y_val = yPercent ? this.getPercentDiffLabel(item.value[1]) : item.value[1];

    var lineBreak = testLength > itemName.length ? '<br>' : '&nbsp;&nbsp;';
    returnString = '<span>' + itemName + '</span><br>' + '<small>' + xLabel + ': ' + _x_val + lineBreak + yLabel + ': ' + _y_val + '</small>';
  } else {
    // console.log(item);
    // Send back a different string for the markarea tooltip.
    returnString = '<span>' + item.data.name + '</span><br>';
  }

  return returnString;
};
/**
 * Returns the value rounded to the provided number of decimal
 * places.
 */


Scatterplot.prototype.formatNumber = function (val) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (!val && val !== 0) {
    return 'N/A';
  }

  var factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
};
/**
 * Returns a percent string from the provided value
 * @param {number} v
 */


Scatterplot.prototype.formatPercent = function (v) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  if (!v && v !== 0) {
    return 'N/A';
  }

  return this.formatNumber(v * 100, decimals);
};
/**
 * Returns a percent string of how far the provided value
 * is from the provided `from` value. (used for learning rates)
 * @param {number} v the value to format
 * @param {number} from the point of reference to determine what the % diff is
 */


Scatterplot.prototype.formatPercentDiff = function (v) {
  var from = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!v && v !== 0) {
    return 'N/A';
  }

  return this.formatPercent(v - from, decimals);
};

Scatterplot.prototype.getPercentDiffLabel = function (item) {
  // console.log('Scatterplot.getPercentDiffLabel()');
  // console.log(item);
  return this.formatPercentDiff(item, 1, 0) + '%';
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NjYXR0ZXJwbG90L1NjYXR0ZXJwbG90LmpzIl0sIm5hbWVzIjpbIlNjYXR0ZXJwbG90IiwiY29udGFpbmVyIiwicHJvcHMiLCJfc2VsZiIsIl9yZWFkeSIsIl9oYW5kbGVycyIsImNvbG9yUGFsZXR0ZSIsImF4aXNCbHVlIiwidGhlbWUiLCJjb2xvciIsInRpdGxlIiwidGV4dFN0eWxlIiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJ0ZXh0QWxpZ24iLCJzdWJ0ZXh0U3R5bGUiLCJ2aXN1YWxNYXAiLCJpdGVtV2lkdGgiLCJhcmlhIiwic2hvdyIsImRlc2NyaXB0aW9uIiwidG9vbGJveCIsImljb25TdHlsZSIsIm5vcm1hbCIsImJvcmRlckNvbG9yIiwidG9vbHRpcCIsImJhY2tncm91bmRDb2xvciIsImV4dHJhQ3NzVGV4dCIsInBhZGRpbmciLCJyaWNoIiwic3BhbiIsInNtYWxsIiwiZm9udFNpemUiLCJheGlzUG9pbnRlciIsInR5cGUiLCJsaW5lU3R5bGUiLCJjcm9zc1N0eWxlIiwic2hhZG93U3R5bGUiLCJncmlkIiwidG9wIiwiYm90dG9tIiwibGVmdCIsInJpZ2h0IiwiY29udGFpbkxhYmVsIiwidmFsdWVBeGlzIiwiYXhpc0xpbmUiLCJzcGxpdEFyZWEiLCJzcGxpdExpbmUiLCJuYW1lVGV4dFN0eWxlIiwibmFtZUxvY2F0aW9uIiwibmFtZUdhcCIsImF4aXNMYWJlbCIsImluc2lkZSIsInRleHRWZXJ0aWNhbEFsaWduIiwibGluZSIsInNtb290aCIsInN5bWJvbCIsInN5bWJvbFNpemUiLCJzY2F0dGVyIiwiaXRlbVN0eWxlIiwiYm9yZGVyV2lkdGgiLCJib3JkZXJUeXBlIiwib3BhY2l0eSIsImdyYXBoIiwic3RhdGVzIiwiYmFzZSIsIm9wdGlvbnMiLCJ6bGV2ZWwiLCJoZWlnaHQiLCJ3aWR0aCIsInlBeGlzIiwicG9zaXRpb24iLCJ4QXhpcyIsInZlcnRpY2FsQWxpZ24iLCJ0cmlnZ2VyIiwidHJhbnNpdGlvbkR1cmF0aW9uIiwic2hvd0RlbGF5IiwiaGlkZURlbGF5IiwiZm9ybWF0dGVyIiwiaXRlbSIsImRhdGEiLCJwcmVmaXgiLCJyZXR1cm5TdHJpbmciLCJ2YWx1ZSIsIml0ZW1OYW1lIiwibmFtZSIsImVuZHBvaW50IiwibWV0YVZhcnMiLCJyZWYiLCJjb21wb25lbnQiLCJvblJlYWR5IiwiZWNoYXJ0SW5zdGFuY2UiLCJvbkRhdGEiLCJyZWdpb24iLCJjdXJyRGF0YSIsIm5ld0RhdGEiLCJzZXRQcm9wcyIsImV2ZW50TmFtZSIsImZvckVhY2giLCJoIiwiYXBwbHkiLCJvbiIsImhhbmRsZXIiLCJwdXNoIiwiZWNoYXJ0IiwiYWRkU3RhdGUiLCJzdGF0ZU5hbWUiLCJzdGF0ZSIsImxvYWRTdGF0ZSIsIm5ld1N0YXRlIiwiZ2V0U3RhdGUiLCJoYXNPd25Qcm9wZXJ0eSIsIm5vdE1lcmdlIiwiRXJyb3IiLCJnZXRTY2F0dGVycGxvdFNlcmllcyIsInhWYXIiLCJ5VmFyIiwielZhciIsImlkcyIsImdldERhdGFTZXJpZXMiLCJnZXRPcHRpb24iLCJzZXJpZXMiLCJsZW5ndGgiLCJmaW5kIiwicyIsImlkIiwicmVuZGVyIiwiUmVhY3RET00iLCJSZWFjdCIsImNyZWF0ZUVsZW1lbnQiLCJzZWRhU2NhdHRlcnBsb3QiLCJwcm90b3R5cGUiLCJnZXRTZXJpZXNEYXRhQnlTaXplIiwidmFsdWVzIiwibnVtIiwic29ydGVkIiwic29ydCIsImEiLCJiIiwic2xpY2UiLCJnZXRTZXJpZXNEYXRhRm9ySWRzIiwibWFwIiwidiIsImZpbHRlciIsImdldFNlcmllc0RhdGFJblJhbmdlIiwiYXhpcyIsInJhbmdlIiwiaW5kZXgiLCJtaW4iLCJtYXgiLCJmb3JtYXRUb29sdGlwIiwieExhYmVsIiwieUxhYmVsIiwieFBlcmNlbnQiLCJ5UGVyY2VudCIsImRpc3RyaWN0cyIsInRlc3RMZW5ndGgiLCJTdHJpbmciLCJfeF92YWwiLCJnZXRQZXJjZW50RGlmZkxhYmVsIiwiX3lfdmFsIiwibGluZUJyZWFrIiwiZm9ybWF0TnVtYmVyIiwidmFsIiwiZGVjaW1hbHMiLCJmYWN0b3IiLCJNYXRoIiwicG93Iiwicm91bmQiLCJmb3JtYXRQZXJjZW50IiwiZm9ybWF0UGVyY2VudERpZmYiLCJmcm9tIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQTs7O0FBR0EsU0FBU0EsV0FBVCxDQUFxQkMsU0FBckIsRUFBZ0NDLEtBQWhDLEVBQXVDO0FBRXJDLE1BQUlDLEtBQUssR0FBRyxJQUFaOztBQUNBLE1BQUlDLE1BQU0sR0FBRyxLQUFiO0FBQ0EsTUFBSUMsU0FBUyxHQUFHLEVBQWhCO0FBRUEsTUFBSUMsWUFBWSxHQUFHLENBQ2pCLFNBRGlCLEVBQ04sU0FETSxFQUNLLFNBREwsRUFDZ0IsU0FEaEIsRUFDMkIsU0FEM0IsRUFFakIsU0FGaUIsRUFFTixTQUZNLEVBRUssU0FGTCxFQUVnQixTQUZoQixFQUUyQixTQUYzQixFQUdqQixTQUhpQixFQUdOLFNBSE0sRUFHSyxTQUhMLEVBR2dCLFNBSGhCLEVBRzJCLFNBSDNCLEVBSWpCLFNBSmlCLEVBSU4sU0FKTSxFQUlLLFNBSkwsRUFJZ0IsU0FKaEIsRUFJMkIsU0FKM0IsQ0FBbkI7QUFPQSxNQUFJQyxRQUFRLEdBQUcsU0FBZjtBQUVBLE1BQUlDLEtBQUssR0FBRztBQUNWQyxJQUFBQSxLQUFLLEVBQUVILFlBREc7QUFFVkksSUFBQUEsS0FBSyxFQUFFO0FBQ0xDLE1BQUFBLFNBQVMsRUFBRTtBQUNUQyxRQUFBQSxVQUFVLEVBQUUsUUFESDtBQUVUSCxRQUFBQSxLQUFLLEVBQUUsTUFGRTtBQUdUSSxRQUFBQSxVQUFVLEVBQUUsdUJBSEg7QUFJVEMsUUFBQUEsU0FBUyxFQUFFO0FBSkYsT0FETjtBQU9MQyxNQUFBQSxZQUFZLEVBQUU7QUFDWkgsUUFBQUEsVUFBVSxFQUFFLFFBREE7QUFFWkgsUUFBQUEsS0FBSyxFQUFFLE1BRks7QUFHWkksUUFBQUEsVUFBVSxFQUFFLG1CQUhBO0FBSVpDLFFBQUFBLFNBQVMsRUFBRTtBQUpDLE9BUFQ7QUFhTEEsTUFBQUEsU0FBUyxFQUFFO0FBYk4sS0FGRztB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N0IsQ0FBUDtBQUNELENBSEQ7O0FBS0FwSyxXQUFXLENBQUNtSSxTQUFaLENBQXNCNEIsbUJBQXRCLEdBQTRDLFVBQVNoRixJQUFULEVBQWU7QUFDekQ7QUFDQTtBQUNBLFNBQU8sS0FBSzJGLGlCQUFMLENBQXVCM0YsSUFBdkIsRUFBNkIsQ0FBN0IsRUFBZ0MsQ0FBaEMsSUFBcUMsR0FBNUM7QUFDRCxDQUpEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBIZWxwZXIgY2xhc3MgZm9yIGVhc2llciBzY2F0dGVycGxvdCB1cGRhdGVzXG4gKi9cbmZ1bmN0aW9uIFNjYXR0ZXJwbG90KGNvbnRhaW5lciwgcHJvcHMpIHtcblxuICB2YXIgX3NlbGYgPSB0aGlzO1xuICB2YXIgX3JlYWR5ID0gZmFsc2U7XG4gIHZhciBfaGFuZGxlcnMgPSB7fTtcblxuICB2YXIgY29sb3JQYWxldHRlID0gW1xuICAgICcjMmVjN2M5JywgJyNiNmEyZGUnLCAnIzVhYjFlZicsICcjZmZiOTgwJywgJyNkODdhODAnLFxuICAgICcjOGQ5OGIzJywgJyNlNWNmMGQnLCAnIzk3YjU1MicsICcjOTU3MDZkJywgJyNkYzY5YWEnLFxuICAgICcjMDdhMmE0JywgJyM5YTdmZDEnLCAnIzU4OGRkNScsICcjZjU5OTRlJywgJyNjMDUwNTAnLFxuICAgICcjNTk2NzhjJywgJyNjOWFiMDAnLCAnIzdlYjAwYScsICcjNmY1NTUzJywgJyNjMTQwODknXG4gIF07XG5cbiAgdmFyIGF4aXNCbHVlID0gJyM1NDc4OTInO1xuXG4gIHZhciB0aGVtZSA9IHtcbiAgICBjb2xvcjogY29sb3JQYWxldHRlLFxuICAgIHRpdGxlOiB7XG4gICAgICB0ZXh0U3R5bGU6IHtcbiAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICB9LFxuICAgICAgc3VidGV4dFN0eWxlOiB7XG4gICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInXG4gICAgICB9LFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgIH0sXG4gICAgdmlzdWFsTWFwOiB7XG4gICAgICBpdGVtV2lkdGg6IDE1LFxuICAgICAgY29sb3I6IFsnIzVhYjFlZicsICcjZTBmZmZmJ11cbiAgICB9LFxuICAgIGFyaWE6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBkZXNjcmlwdGlvbjogJ1NjYXR0ZXJwbG90IG9mIHN0dWRlbnQgdGVzdCBzY29yZXMnXG4gICAgfSxcbiAgICB0b29sYm94OiB7XG4gICAgICBpY29uU3R5bGU6IHtcbiAgICAgICAgbm9ybWFsOiB7XG4gICAgICAgICAgYm9yZGVyQ29sb3I6IGNvbG9yUGFsZXR0ZVswXVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICB0b29sdGlwOiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMDMxMjMyJywgLy8gJ3JnYmEoMywgMTgsIDUwLCA4MCUpJyxcbiAgICAgIGV4dHJhQ3NzVGV4dDogJ2JveC1zaGFkb3c6IDAgMnB4IDRweCByZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgcGFkZGluZzogWzYsIDEwXSxcbiAgICAgIHRleHRTdHlsZToge1xuICAgICAgICBjb2xvcjogJyNmZmYnLCAvLyAnI2RjNjlhYScsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICc1MDAnLFxuICAgICAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyxcbiAgICAgICAgcmljaDoge1xuICAgICAgICAgIHNwYW46IHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc21hbGw6IHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdNYWlzb25OZXVlLU1lZGl1bScsXG4gICAgICAgICAgICBmb250U2l6ZTogNlxuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBheGlzUG9pbnRlcjoge1xuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIGxpbmVTdHlsZToge1xuICAgICAgICAgIGNvbG9yOiAnIzAwOGFjZCdcbiAgICAgICAgfSxcbiAgICAgICAgY3Jvc3NTdHlsZToge1xuICAgICAgICAgIGNvbG9yOiAnIzAwOGFjZCdcbiAgICAgICAgfSxcbiAgICAgICAgc2hhZG93U3R5bGU6IHtcbiAgICAgICAgICBjb2xvcjogJ3JnYmEoMjAwLDIwMCwyMDAsMC4yKSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgdG9wOiAxMCxcbiAgICAgIGJvdHRvbTogMzIsXG4gICAgICBsZWZ0OiAxMCxcbiAgICAgIHJpZ2h0OiAzMixcbiAgICAgIC8vIHdpZHRoOiAnYXV0bycsXG4gICAgICAvLyBoZWlnaHQ6ICdhdXRvJyxcbiAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgIH0sXG4gICAgdmFsdWVBeGlzOiB7XG4gICAgICBheGlzTGluZToge1xuICAgICAgICBsaW5lU3R5bGU6IHtcbiAgICAgICAgICBjb2xvcjogJyNmZmYnIC8vICcjMDA4YWNkJ1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc3BsaXRBcmVhOiB7XG4gICAgICAgIHNob3c6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHNwbGl0TGluZToge1xuICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgICBuYW1lVGV4dFN0eWxlOiB7IC8vIFN0eWxlcyBmb3IgeCBhbmQgeSBheGlzIGxhYmVsc1xuICAgICAgICBjb2xvcjogJyNmZmYnLFxuICAgICAgICBmb250U2l6ZTogMTIsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICBmb250RmFtaWx5OiAnU2hhcnBHcm90ZXNrLU1lZGl1bTIwJyAvLyAnTWFpc29uTmV1ZS1NZWRpdW0nXG4gICAgICB9LFxuICAgICAgbmFtZUxvY2F0aW9uOiAnbWlkZGxlJyxcbiAgICAgIG5hbWVHYXA6IDMyLFxuICAgICAgYXhpc0xhYmVsOiB7IC8vIFN0eWxlcyBmb3IgZ3JpZCBudW1iZXJzXG4gICAgICAgIGluc2lkZTogZmFsc2UsXG4gICAgICAgIHRleHRWZXJ0aWNhbEFsaWduOiAnbWlkZGxlJyxcbiAgICAgICAgY29sb3I6IGF4aXNCbHVlLCAvLyAnI2ZmZicsXG4gICAgICAgIGZvbnRGYW1pbHk6ICdNYWlzb25OZXVlLU1lZGl1bScsXG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbmU6IHtcbiAgICAgIHNtb290aDogdHJ1ZSxcbiAgICAgIHN5bWJvbDogJ2VtcHR5Q2lyY2xlJyxcbiAgICAgIHN5bWJvbFNpemU6IDNcbiAgICB9LFxuICAgIHNjYXR0ZXI6IHtcbiAgICAgIHN5bWJvbDogJ2NpcmNsZScsXG4gICAgICAvL2NvbG9yOiAncmdiYSgxNDgsIDIyOCwgMjU0LCAwLjgpJyxcbiAgICAgIC8vY29sb3I6ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuOCknLFxuICAgICAgLy9jb2xvcjogJ3JnYmEoMTcxLCAyMTcsIDIzMywgMC44KScsXG4gICAgICBjb2xvcjogJ3JnYmEoMjAyLDIzNSwxOTAsIDAuNzcpJyxcbiAgICAgIGl0ZW1TdHlsZToge1xuICAgICAgICBib3JkZXJXaWR0aDogMC4yNSxcbiAgICAgICAgYm9yZGVyQ29sb3I6ICdyZ2JhKDEwNiwgMTQ1LCAxODUsIDAuOCknLFxuICAgICAgICBib3JkZXJUeXBlOiAnc29saWQnLFxuICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIC8vIGJvcmRlck9wYWNpdHk6IDAsXG4gICAgICB9XG4gICAgfSxcbiAgICBncmFwaDoge1xuICAgICAgY29sb3I6IGNvbG9yUGFsZXR0ZVxuICAgIH1cbiAgfTtcblxuICB0aGlzLnN0YXRlcyA9IHtcbiAgICAvLyBkZWZhdWx0IHN0YXRlIHNoYXJlZCBieSBhbGwgc2NhdHRlcnBsb3RzXG4gICAgLy8gaHR0cHM6Ly9lY29tZmUuZ2l0aHViLmlvL2VjaGFydHMtZG9jL3B1YmxpYy9lbi9vcHRpb24uaHRtbFxuICAgIGJhc2U6IHtcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgdGl0bGU6IHtcbiAgICAgICAgICBzaG93OiBmYWxzZSxcbiAgICAgICAgICB0ZXh0U3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnRXZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZmJyxcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdTaGFycEdyb3Rlc2stTWVkaXVtMjAnLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgc3VidGV4dFN0eWxlOiB7XG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGNvbG9yOiAnI2ZmZicsXG4gICAgICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICAgIH0sXG4gICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJ1xuICAgICAgICB9LFxuICAgICAgICBncmlkOiB7XG4gICAgICAgICAgdG9wOiAxMCxcbiAgICAgICAgICBib3R0b206IDI2LFxuICAgICAgICAgIGxlZnQ6IDEwLFxuICAgICAgICAgIHJpZ2h0OiAyNixcbiAgICAgICAgICB6bGV2ZWw6IDEwMCxcbiAgICAgICAgICBoZWlnaHQ6ICdhdXRvJywvLyAyODAsXG4gICAgICAgICAgd2lkdGg6ICdhdXRvJywgLy8gJ2F1dG8nLFxuICAgICAgICAgIGNvbnRhaW5MYWJlbDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICB5QXhpczoge1xuICAgICAgICAgIHBvc2l0aW9uOiAncmlnaHQnLFxuICAgICAgICAgIHNwbGl0TGluZToge1xuICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuYW1lR2FwOiAyNixcbiAgICAgICAgICBuYW1lVGV4dFN0eWxlOiB7XG4gICAgICAgICAgICBmb250RmFtaWx5OiAnTWFpc29uTmV1ZS1NZWRpdW0nLFxuICAgICAgICAgICAgY29sb3I6IGF4aXNCbHVlLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ25vcm1hbCcsXG4gICAgICAgICAgICBmb250U2l6ZTogMTNcbiAgICAgICAgICB9LFxuICAgICAgICAgIHpsZXZlbDogMTAxLFxuICAgICAgICB9LFxuICAgICAgICB4QXhpczoge1xuICAgICAgICAgIG5hbWVHYXA6IDI2LFxuICAgICAgICAgIG5hbWVUZXh0U3R5bGU6IHtcbiAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdNYWlzb25OZXVlLU1lZGl1bScsXG4gICAgICAgICAgICBjb2xvcjogYXhpc0JsdWUsXG4gICAgICAgICAgICBmb250U2l6ZTogMTMsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnbm9ybWFsJyxcbiAgICAgICAgICAgIHZlcnRpY2FsQWxpZ246ICdib3R0b20nXG4gICAgICAgICAgfSxcbiAgICAgICAgICB6bGV2ZWw6IDEwMixcbiAgICAgICAgfSxcbiAgICAgICAgdG9vbHRpcDoge1xuICAgICAgICAgIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgICAgICB0cmFuc2l0aW9uRHVyYXRpb246IDAuNixcbiAgICAgICAgICBzaG93RGVsYXk6IDUwLFxuICAgICAgICAgIGhpZGVEZWxheTogMCxcbiAgICAgICAgICAvLyBib3JkZXJDb2xvcjogJyNmZmYnLFxuICAgICAgICAgIGZvcm1hdHRlcjogZnVuY3Rpb24oaXRlbSkge1xuICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gX3NlbGYuZGF0YVtfc2VsZi5wcm9wcy5wcmVmaXhdO1xuICAgICAgICAgICAgbGV0IHJldHVyblN0cmluZyA9IG51bGw7XG4gICAgICAgICAgICBpZiAoISFpdGVtICYmICEhaXRlbS52YWx1ZSAmJiAhIWl0ZW0udmFsdWVbM10pIHtcbiAgICAgICAgICAgICAgY29uc3QgaXRlbU5hbWUgPVxuICAgICAgICAgICAgICAgIGRhdGEgJiZcbiAgICAgICAgICAgICAgICBkYXRhLm5hbWUgJiZcbiAgICAgICAgICAgICAgICBkYXRhLm5hbWVbaXRlbS52YWx1ZVszXV0gP1xuICAgICAgICAgICAgICAgIGRhdGEubmFtZVtpdGVtLnZhbHVlWzNdXSA6ICdVbmF2YWlsYWJsZSdcbiAgICAgICAgICAgICAgLy8gaXRlbVZhbHVlID0gaXRlbS52YWx1ZVszXSA/IGl0ZW0udmFsdWVbM10gOiBpdGVtLm5hbWU7XG4gICAgICAgICAgICAgIHJldHVyblN0cmluZyA9ICc8c3Bhbj4nICsgaXRlbU5hbWUgKyAnPC9zcGFuPjxicj4nXG4gICAgICAgICAgICAgICAgKyAnPHNtYWxsPlg6ICcgKyBpdGVtLnZhbHVlWzBdXG4gICAgICAgICAgICAgICAgKyAnJm5ic3A7Jm5ic3A7Jm5ic3A7Jm5ic3A7WTogJyArIGl0ZW0udmFsdWVbMV0gKyAnPC9zbWFsbD4nO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXRlbSk7XG4gICAgICAgICAgICAgIC8vIFNlbmQgYmFjayBhIGRpZmZlcmVudCBzdHJpbmcgZm9yIHRoZSBtYXJrYXJlYSB0b29sdGlwLlxuICAgICAgICAgICAgICByZXR1cm5TdHJpbmcgPSAnPHNwYW4+JyArIGl0ZW0uZGF0YS5uYW1lICsgJzwvc3Bhbj48YnI+J1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJldHVyblN0cmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gYWRkIGEgcmVmIHByb3AgdG8gZ2V0IGEgcmVmZXJlbmNlIHRvIHRoZSByZWFjdCBjb21wb25lbnQgaW5zdGFuY2VcbiAgdGhpcy5wcm9wcyA9IE9iamVjdC5hc3NpZ24oXG4gICAgKHByb3BzIHx8IHt9KSxcbiAgICB7XG4gICAgICBwcmVmaXg6ICdkaXN0cmljdHMnLFxuICAgICAgb3B0aW9uczogdGhpcy5zdGF0ZXMuYmFzZS5vcHRpb25zLFxuICAgICAgZW5kcG9pbnQ6ICdodHRwczovL2QyZnlwZWI2Zjk3NHIxLmNsb3VkZnJvbnQubmV0L2Rldi9zY2F0dGVycGxvdC8nLFxuICAgICAgbWV0YVZhcnM6IHtcbiAgICAgICAgJ2NvdW50aWVzJzogWydpZCcsICduYW1lJywgJ2xhdCcsICdsb24nLCAnYWxsX3N6JyBdLFxuICAgICAgICAnZGlzdHJpY3RzJzogWydpZCcsICduYW1lJywgJ2xhdCcsICdsb24nLCAnYWxsX3N6JyBdLFxuICAgICAgICAnc2Nob29scyc6IFsnaWQnLCAnbmFtZScsICdsYXQnLCAnbG9uJywgJ2FsbF9zeicgXVxuICAgICAgfSxcbiAgICAgIGRhdGE6IHt9LFxuICAgICAgcmVmOiBmdW5jdGlvbihyZWYpIHtcbiAgICAgICAgX3NlbGYuY29tcG9uZW50ID0gcmVmO1xuICAgICAgfSxcbiAgICAgIG9uUmVhZHk6IGZ1bmN0aW9uKGVjaGFydEluc3RhbmNlKSB7XG4gICAgICAgIF9yZWFkeSA9IHRydWU7XG4gICAgICAgIF9zZWxmLnRyaWdnZXIoJ3JlYWR5JywgW19zZWxmXSlcbiAgICAgIH0sXG4gICAgICBvbkRhdGE6IGZ1bmN0aW9uKGRhdGEsIHJlZ2lvbikge1xuICAgICAgICBsZXQgY3VyckRhdGEgPSAoKF9zZWxmLmRhdGEgJiYgX3NlbGYuZGF0YVtyZWdpb25dKSB8fCB7fSlcbiAgICAgICAgY29uc3QgbmV3RGF0YSA9IHt9XG4gICAgICAgIG5ld0RhdGFbcmVnaW9uXSA9IE9iamVjdC5hc3NpZ24oY3VyckRhdGEsIGRhdGEpXG4gICAgICAgIF9zZWxmLmRhdGEgPSBPYmplY3QuYXNzaWduKChfc2VsZi5kYXRhIHx8IHt9KSwgbmV3RGF0YSlcbiAgICAgICAgX3NlbGYuc2V0UHJvcHMoe2RhdGE6X3NlbGYuZGF0YX0pXG4gICAgICB9LFxuICAgICAgdGhlbWU6IHRoZW1lXG4gICAgfVxuICApO1xuXG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhbiBldmVudCB3aXRoIGBldmVudE5hbWVgIGFuZCBydW5zIGFsbCBoYW5kbGVyc1xuICAgKi9cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnROYW1lLCBkYXRhKSB7XG4gICAgX2hhbmRsZXJzW2V2ZW50TmFtZV0gJiZcbiAgICBfaGFuZGxlcnNbZXZlbnROYW1lXS5mb3JFYWNoKGZ1bmN0aW9uKGgpIHtcbiAgICAgIGguYXBwbHkobnVsbCwgZGF0YSlcbiAgICB9KVxuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVycyBhbiBldmVudCBoYW5kbGVyIHdpdGggdGhlIGFzc29jaWF0ZWQgZXZlbnROYW1lXG4gICAqIElmIGl0J3MgYSByZWFkeSBoYW5kbGVyIGFuZCBldmVyeXRoaW5nIGlzIHJlYWR5LCBydW4gaW1tZWRpYXRlbHkuXG4gICAqL1xuICB0aGlzLm9uID0gZnVuY3Rpb24oZXZlbnROYW1lLCBoYW5kbGVyKSB7XG4gICAgaWYgKF9oYW5kbGVyc1tldmVudE5hbWVdIClcbiAgICAgIF9oYW5kbGVyc1tldmVudE5hbWVdLnB1c2goaGFuZGxlcilcbiAgICBlbHNlXG4gICAgICBfaGFuZGxlcnNbZXZlbnROYW1lXSA9IFsgaGFuZGxlciBdXG4gICAgaWYgKGV2ZW50TmFtZSA9PT0gJ3JlYWR5JyAmJiBfcmVhZHkpIHtcbiAgICAgIGhhbmRsZXIoX3NlbGYuY29tcG9uZW50LCBfc2VsZi5jb21wb25lbnQuZWNoYXJ0KVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgYSBzdGF0ZSBnZW5lcmF0b3IgZm9yIHRoZSBzY2F0dGVycGxvdFxuICAgKi9cbiAgdGhpcy5hZGRTdGF0ZSA9IGZ1bmN0aW9uKHN0YXRlTmFtZSwgc3RhdGUpIHtcbiAgICB0aGlzLnN0YXRlc1tzdGF0ZU5hbWVdID0gc3RhdGU7XG4gIH1cblxuICAvKipcbiAgICogTG9hZCBhIHN0YXRlIGZvciB0aGUgc2NhdHRlcnBsb3RcbiAgICovXG4gIHRoaXMubG9hZFN0YXRlID0gZnVuY3Rpb24oc3RhdGVOYW1lLCBvcHRpb25zID0ge30pIHtcbiAgICAvLyB0aGlzLmNvbXBvbmVudC5lY2hhcnQuc2V0T3B0aW9uKHRoaXMuZ2V0U3RhdGUoc3RhdGVOYW1lKSwgb3B0aW9ucylcbiAgICBjb25zdCBuZXdTdGF0ZSA9IHRoaXMuZ2V0U3RhdGUoc3RhdGVOYW1lKTtcbiAgICBpZiAob3B0aW9ucy5oYXNPd25Qcm9wZXJ0eSgnbm90TWVyZ2UnKSkge1xuICAgICAgbmV3U3RhdGVbJ25vdE1lcmdlJ10gPSBvcHRpb25zLm5vdE1lcmdlXG4gICAgfVxuICAgIHRoaXMuc2V0UHJvcHMobmV3U3RhdGUpXG4gIH1cblxuICAvKipcbiAgICogR2V0IGFuIGV4aXN0aW5nIHN0YXRlIGZvciB0aGUgc2NhdHRlcnBsb3RcbiAgICovXG4gIHRoaXMuZ2V0U3RhdGUgPSBmdW5jdGlvbihzdGF0ZU5hbWUpIHtcbiAgICBpZiAodGhpcy5zdGF0ZXMuaGFzT3duUHJvcGVydHkoc3RhdGVOYW1lKSkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnN0YXRlc1tzdGF0ZU5hbWVdID09PSAnZnVuY3Rpb24nKVxuICAgICAgIHJldHVybiB0aGlzLnN0YXRlc1tzdGF0ZU5hbWVdKHRoaXMpXG4gICAgICBpZiAodHlwZW9mIHRoaXMuc3RhdGVzW3N0YXRlTmFtZV0gPT09ICdvYmplY3QnKVxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZXNbc3RhdGVOYW1lXVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ25vIHN0YXRlIGZvdW5kIGZvciAnICsgc3RhdGVOYW1lKVxuICAgIH1cbiAgfVxuXG4gIHRoaXMuZ2V0U2NhdHRlcnBsb3RTZXJpZXMgPSBmdW5jdGlvbiAoeFZhciwgeVZhciwgelZhciwgaWRzKSB7XG5cbiAgfVxuXG4gIHRoaXMuZ2V0RGF0YVNlcmllcyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBvcHRpb25zID0gdGhpcy5jb21wb25lbnQuZ2V0T3B0aW9uKCk7XG4gICAgaWYgKG9wdGlvbnMuc2VyaWVzICYmIG9wdGlvbnMuc2VyaWVzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMuc2VyaWVzLmZpbmQocyA9PiBzLmlkID09PSAnYmFzZScpXG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBhbiBvYmplY3Qgb2YgcHJvcHMgZm9yIHRoZSByZWFjdCBjb21wb25lbnRcbiAgICovXG4gIHRoaXMuc2V0UHJvcHMgPSBmdW5jdGlvbihwcm9wcykge1xuICAgIHRoaXMucHJvcHMgPSB7XG4gICAgICAuLi50aGlzLnByb3BzLFxuICAgICAgLi4ucHJvcHNcbiAgICB9XG4gICAgdGhpcy5yZW5kZXIoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBSZW5kZXIgdGhlIGNvbXBvbmVudCB3aXRoIHByb3BzXG4gICAqL1xuICB0aGlzLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIC8vIHJlbmRlciB0aGUgY29tcG9uZW50XG4gICAgUmVhY3RET00ucmVuZGVyKFxuICAgICAgLy8gUmVhY3QuY3JlYXRlRWxlbWVudChzZWRhU2NhdHRlcnBsb3QsIHRoaXMucHJvcHMsIG51bGwpLFxuICAgICAgLy8gY29udGFpbmVyXG4gICAgICBSZWFjdC5jcmVhdGVFbGVtZW50KHNlZGFTY2F0dGVycGxvdCwgT2JqZWN0LmFzc2lnbih7fSwgdGhpcy5wcm9wcyksIG51bGwpLCBjb250YWluZXJcbiAgICApO1xuICB9XG5cbiAgdGhpcy5yZW5kZXIoKVxuXG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBJRHMgdGhhdCBjb3JyZXNwb25kIHRvXG4gKiB0aGUgbGFyZ2VzdCBgbnVtYCB2YWx1ZXMuXG4gKi9cblNjYXR0ZXJwbG90LnByb3RvdHlwZS5nZXRTZXJpZXNEYXRhQnlTaXplID0gZnVuY3Rpb24odmFsdWVzLCBudW0pIHtcbiAgbnVtID0gbnVtIHx8IDEwMDtcbiAgdmFyIHNvcnRlZCA9IHZhbHVlc1xuICAgIC5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBiWzJdIC0gYVsyXTtcbiAgICB9KTtcbiAgcmV0dXJuIHNvcnRlZC5zbGljZSgwLCBudW0pXG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSB3aXRoIHRoZSBJRHMgdGhhdCBjb3JyZXNwb25kIHRvXG4gKiB0aGUgbGFyZ2VzdCBgbnVtYCB2YWx1ZXMuXG4gKi9cblNjYXR0ZXJwbG90LnByb3RvdHlwZS5nZXRTZXJpZXNEYXRhRm9ySWRzID0gZnVuY3Rpb24odmFsdWVzLCBpZHMpIHtcbiAgcmV0dXJuIGlkc1xuICAgIC5tYXAoZnVuY3Rpb24oaWQpIHtcbiAgICAgIHJldHVybiB2YWx1ZXMuZmluZCh2ID0+IHZbM10gPT09IGlkKTtcbiAgICB9KVxuICAgIC5maWx0ZXIodiA9PiB2KTtcbn1cblxuLyoqIFJldHVybnMgYW4gYXJyYXkgb2YgdmFsdWVzIHRoYXQgZmFsbCB3aXRoaW4gdGhlIHJhbmdlIG9uIHRoZSBwcm92aWRlZCBheGlzICovXG5TY2F0dGVycGxvdC5wcm90b3R5cGUuZ2V0U2VyaWVzRGF0YUluUmFuZ2UgPSBmdW5jdGlvbih2YWx1ZXMsIGF4aXMsIHJhbmdlKSB7XG4gIHZhciBpbmRleCA9IGF4aXMgPT09ICd4JyA/IDAgOlxuICAgIGF4aXMgPT09ICd5JyA/IDEgOiAyO1xuICByZXR1cm4gdmFsdWVzLmZpbHRlcihmdW5jdGlvbih2KSB7XG4gICAgcmV0dXJuIHZbaW5kZXhdID4gcmFuZ2UubWluICYmIHZbaW5kZXhdIDwgcmFuZ2UubWF4O1xuICB9KVxufVxuXG5TY2F0dGVycGxvdC5wcm90b3R5cGUuZm9ybWF0VG9vbHRpcCA9IGZ1bmN0aW9uKGl0ZW0sIGRhdGEsIHhMYWJlbCwgeUxhYmVsLCB4UGVyY2VudCA9IDAsIHlQZXJjZW50ID0gMCkge1xuICAvLyBjb25zb2xlLmxvZyhpdGVtKTtcbiAgLy8gY29uc29sZS5sb2coZGF0YSk7XG4gIGxldCByZXR1cm5TdHJpbmcgPSBudWxsO1xuICBpZiAoISFpdGVtICYmICEhaXRlbS52YWx1ZSAmJiAhIWl0ZW0udmFsdWVbM10pIHtcbiAgICBjb25zdCBpdGVtTmFtZSA9XG4gICAgICBkYXRhICYmXG4gICAgICBkYXRhLmRpc3RyaWN0cyAmJlxuICAgICAgZGF0YS5kaXN0cmljdHMubmFtZSAmJlxuICAgICAgZGF0YS5kaXN0cmljdHMubmFtZVtpdGVtLnZhbHVlWzNdXSA/XG4gICAgICBkYXRhLmRpc3RyaWN0cy5uYW1lW2l0ZW0udmFsdWVbM11dIDogJ1VuYXZhaWxhYmxlJztcbiAgICBjb25zdCB0ZXN0TGVuZ3RoID0gKFxuICAgICAgeExhYmVsICtcbiAgICAgIHlMYWJlbCArXG4gICAgICBTdHJpbmcoaXRlbS52YWx1ZVswXSkgK1xuICAgICAgU3RyaW5nKGl0ZW0udmFsdWVbMV0pXG4gICAgKS5sZW5ndGg7XG4gICAgY29uc3QgX3hfdmFsID0geFBlcmNlbnQgPyB0aGlzLmdldFBlcmNlbnREaWZmTGFiZWwoaXRlbS52YWx1ZVswXSkgOiBpdGVtLnZhbHVlWzBdO1xuICAgIGNvbnN0IF95X3ZhbCA9IHlQZXJjZW50ID8gdGhpcy5nZXRQZXJjZW50RGlmZkxhYmVsKGl0ZW0udmFsdWVbMV0pIDogaXRlbS52YWx1ZVsxXTtcbiAgICBjb25zdCBsaW5lQnJlYWsgPSB0ZXN0TGVuZ3RoID4gaXRlbU5hbWUubGVuZ3RoID8gJzxicj4nIDogJyZuYnNwOyZuYnNwOyc7XG4gICAgcmV0dXJuU3RyaW5nID0gJzxzcGFuPicgKyBpdGVtTmFtZSArICc8L3NwYW4+PGJyPidcbiAgICAgICsgJzxzbWFsbD4nICsgeExhYmVsICsgJzogJyArIF94X3ZhbCArIGxpbmVCcmVha1xuICAgICAgKyB5TGFiZWwgKyAnOiAnICsgX3lfdmFsICsgJzwvc21hbGw+JztcbiAgfSBlbHNlIHtcbiAgICAvLyBjb25zb2xlLmxvZyhpdGVtKTtcbiAgICAvLyBTZW5kIGJhY2sgYSBkaWZmZXJlbnQgc3RyaW5nIGZvciB0aGUgbWFya2FyZWEgdG9vbHRpcC5cbiAgICByZXR1cm5TdHJpbmcgPSAnPHNwYW4+JyArIGl0ZW0uZGF0YS5uYW1lICsgJzwvc3Bhbj48YnI+J1xuICB9XG4gIHJldHVybiByZXR1cm5TdHJpbmc7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgdmFsdWUgcm91bmRlZCB0byB0aGUgcHJvdmlkZWQgbnVtYmVyIG9mIGRlY2ltYWxcbiAqIHBsYWNlcy5cbiAqL1xuU2NhdHRlcnBsb3QucHJvdG90eXBlLmZvcm1hdE51bWJlciA9IGZ1bmN0aW9uKHZhbCwgZGVjaW1hbHMgPSAyKSB7XG4gIGlmICghdmFsICYmIHZhbCAhPT0gMCkgeyByZXR1cm4gJ04vQScgfVxuICBjb25zdCBmYWN0b3IgPSBNYXRoLnBvdygxMCwgZGVjaW1hbHMpO1xuICByZXR1cm4gTWF0aC5yb3VuZCh2YWwqZmFjdG9yKS9mYWN0b3I7XG59XG4vKipcbiAqIFJldHVybnMgYSBwZXJjZW50IHN0cmluZyBmcm9tIHRoZSBwcm92aWRlZCB2YWx1ZVxuICogQHBhcmFtIHtudW1iZXJ9IHZcbiAqL1xuU2NhdHRlcnBsb3QucHJvdG90eXBlLmZvcm1hdFBlcmNlbnQgPSBmdW5jdGlvbih2LCBkZWNpbWFscyA9IDApIHtcbiAgaWYgKCF2ICYmIHYgIT09IDApIHsgcmV0dXJuICdOL0EnIH1cbiAgcmV0dXJuIHRoaXMuZm9ybWF0TnVtYmVyKHYgKiAxMDAsIGRlY2ltYWxzKVxufVxuLyoqXG4gKiBSZXR1cm5zIGEgcGVyY2VudCBzdHJpbmcgb2YgaG93IGZhciB0aGUgcHJvdmlkZWQgdmFsdWVcbiAqIGlzIGZyb20gdGhlIHByb3ZpZGVkIGBmcm9tYCB2YWx1ZS4gKHVzZWQgZm9yIGxlYXJuaW5nIHJhdGVzKVxuICogQHBhcmFtIHtudW1iZXJ9IHYgdGhlIHZhbHVlIHRvIGZvcm1hdFxuICogQHBhcmFtIHtudW1iZXJ9IGZyb20gdGhlIHBvaW50IG9mIHJlZmVyZW5jZSB0byBkZXRlcm1pbmUgd2hhdCB0aGUgJSBkaWZmIGlzXG4gKi9cblNjYXR0ZXJwbG90LnByb3RvdHlwZS5mb3JtYXRQZXJjZW50RGlmZiA9IGZ1bmN0aW9uKHYsIGZyb20gPSAxLCBkZWNpbWFscyA9IDApIHtcbiAgaWYgKCF2ICYmIHYgIT09IDApIHsgcmV0dXJuICdOL0EnIH1cbiAgcmV0dXJuIHRoaXMuZm9ybWF0UGVyY2VudCh2IC0gZnJvbSwgZGVjaW1hbHMpO1xufVxuXG5TY2F0dGVycGxvdC5wcm90b3R5cGUuZ2V0UGVyY2VudERpZmZMYWJlbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgLy8gY29uc29sZS5sb2coJ1NjYXR0ZXJwbG90LmdldFBlcmNlbnREaWZmTGFiZWwoKScpO1xuICAvLyBjb25zb2xlLmxvZyhpdGVtKTtcbiAgcmV0dXJuIHRoaXMuZm9ybWF0UGVyY2VudERpZmYoaXRlbSwgMSwgMCkgKyAnJSc7XG59XG4iXX0=