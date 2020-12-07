document.getElementById('scatterplot').style="height: 100%"
var myChart = echarts.init(document.getElementById('scatterplot'));
const jQ = jQuery;

// specify chart configuration item and data
const mockData = [
    {district: 'Hawaii Dept of Ed', tenYrChg: -0.34, ses: 0.46, percentChg: -23.1, yrClose:'2052', yrDbl: null},
    {district: 'Prince William County', tenYrChg: 0, ses: 1.05, percentChg:-0.2, yrClose:'7273', yrDbl: null},
    {district: "Prince George's County", tenYrChg: -0.33, ses: 1.07, percentChg:-14.5, yrClose:'2078', yrDbl: null},
    {district: 'Northside ISD', tenYrChg: 0.45, ses: 1.11, percentChg: 30.4, yrClose: null, yrDbl:'2042'},
    {district: 'Alpine', tenYrChg: 0.04, ses: 1.15, percentChg: 1.7, yrClose: null, yrDbl:'2598'},
    {district: 'Baltimore County', tenYrChg: 0.46, ses: 1.36, percentChg: 23.2, yrClose: null, yrDbl:'2052'},
    {district: 'Gwinnett County', tenYrChg: 0, ses: 1.40, percentChg: 0, yrClose: '48437', yrDbl: null},
    {district: 'Cypress-Fairbanks', tenYrChg: 0.25, ses: 1.49, percentChg: 11.8, yrClose: null, yrDbl: '2094'},
    {district: 'Cobb County', tenYrChg: 0.34, ses: 1.61, percentChg: 13.9, yrClose: null, yrDbl: '2081'}
];
//const segCSV = '../../../../../data/mockData/40-largest-disctricts.csv';
/*var xhr = new XMLHttpRequest();
xhr.open("GET", segCSV, true);
xhr.onload = function (e) {
  if (xhr.readyState === 4) {
    if (xhr.status === 200) {
      // console.log(xhr.responseText);
      // console.log('Seg data request finished.');
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
xhr.send(null);*/
const districts = mockData.map(x => x.district);
jQ('.column-scatterplot .title').html('Test');
var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    grid: {
        top: 80,
        bottom: 30
    },
    xAxis: {
        axisLine: {show: false},
        type: 'value',
        position: 'bottom',
        name: '◀  POORER Socioeconomic Status RICHER  ▶',
    },
    yAxis: {
        type: 'category',
        axisLine: {show: false, onZero: false},
        axisTick: {show: true, alignWithLabel: true},
        splitLine: {show: false},
        nameGap: 26,
        nameTextStyle: {
            fontFamily: 'MaisonNeue-Medium',
            fontWeight: 'normal',
            fontSize: 13
        },
        zlevel: 101,
        name: '◀  POORER Socioeconomic Status RICHER  ▶',
        data: districts
    },
    series: [
        {
            name: 'Test1',
            type: 'bar',
            stack: 'Test2',
            barWidth: 1,
            data: [
                {value: -0.07},
                {value: -0.09},
                0.2, 0.44,
                {value: -0.23},
                0.08,
                {value: -0.17},
                0.47,
                {value: -0.36},
                0.18
            ]
        },
        {
            type: 'scatter',
            itemStyle:{
                opacity: 1,
                color: 'black'
            },
            data: [
                {value: -0.07},
                {value: -0.09},
                0.2, 0.44,
                {value: -0.23},
                0.08,
                {value: -0.17},
                0.47,
                {value: -0.36},
                0.18
            ]
        },
        {
            type: 'scatter',
            itemStyle:{
                opacity: 1,
                color: 'gray'
            },
            data: [
                0,0,0,0,0,0,0,0,0,0
            ]
        }
    ]
};

// use configuration item and data specified to show chart
myChart.setOption(option);

// add search bar
// var rootEl = document.getElementById('searchComponent');
// const searchProps = { // Props passed in to init the search input(s)
//     algoliaId: 'QPJ12WSVR4',
//     algoliaKey: 'bae9e4604dbd263cc47c48bfb30dd5dc',
//     onSuggestionSelected: function(hit) {
//       // console.log('hit');
//       // console.log(hit);
//       if (_plot && _plot.searchItemIDs) {
//         _plot.searchItemIDs[0] = hit;
//       }
//       // console.log(_plot.searchItemIDs);
//       scatterplot.loadState(plot.activeState);
//       // GA Event submission
//       const $highlightedDistrict = '';
//       if (!!dataLayer && (dataLayer.length >= 3)) {
//         dataLayer.push({
//           'event': 'districtHighlighted',
//           'highlightedDistrict': hit['name']
//         });
//       } else {
//         console.log('dataLayer not available. Skipping analytics reporting for highlighted item select.');
//       }
//     },
//     onSelectedClear: function(e) {
//       // console.log(e);
//       // Clear search item array
//       searchItemIDs = [];
//       // Reload state
//       scatterplot.loadState(plot.activeState);
//     },
//     indices: ['districts'],
//     inputProps: {
//       placeholder: 'Highlight a district...',
//       'aria-label': 'Enter a district name to search'
//     }
//   }

// var searchInit = function(props, container) {
//     var _self = this;

//     // add reference to the component to props
//     var refProps = Object.assign(props, {
//         ref: function(ref) { _self.component = ref; }
//     });

//     var render = function(props) {
//         ReactDOM.render(
//         React.createElement(SedaSearch, props, null),
//         container
//         );
//     }
//     render(refProps);
// }
// var searchBar = searchInit(searchProps, rootEl);