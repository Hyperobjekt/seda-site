/*
lollipop chart for article4:
Places with Higher White-Black Socioeconomic Inequality Also Had Faster-Growing Academic Gaps (2009-2018, 40 Largest U.S. Districts)
article storyboard: https://docs.google.com/document/d/1LVE15Vd7_D8PsDYp_0BtPvJ8mf-IJ_WUQc0-R4TObZs/

data lives in themes/base-hugo-theme/static/data/discovery2Data.csv
*/

const jQ = jQuery;

jQ('.column-plot .title').html('Places with Higher White-Black Socioeconomic Inequality Also Had Faster-Growing Academic Gaps (2009-2018, 40 Largest U.S. Districts)');
jQ('.column-plot .directions').html('</br>Tap in the chart below to see district names and more data.')

jQ('.axis__y-label .axis__down').html('▲ LOWER');
jQ('.axis__y-label .axis__name').html('Socioeconomic Inequality');
jQ('.axis__y-label .axis__up').html('HIGHER ▼');

jQ('.axis__x-label .axis__down').html('◀ Gap Decreasing');
jQ('.axis__x-label .axis__name').html('9-Year Change in White-Black Achievement Gap in Grade-Level Units (2009-2018)');
jQ('.axis__x-label .axis__up').html('Gap Increasing ▶');

//init chart

var colorPalette = [
    '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
    '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
    '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
    '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
];

function modifyOption(option) {
    var newOption = deepmerge.all([ {}, option]);
    // remove plot labels if on mobile
    if ( window.innerWidth <= 768) {
        newOption.grid.left = 7
        newOption.yAxis.axisLabel.show = false;
        newOption.tooltip.textStyle.fontSize = 10
    }
    return newOption
}

function modifyOptionAndRender (chart, option) {
    var renderOption = modifyOption(option)
    chart.setOption(renderOption)
}

function roundToNearest(num, numOfDecPlaces) {
    return Math.round(num * (10 ** numOfDecPlaces)) / (10 ** numOfDecPlaces)
}

const getDataAndRender = async () => {
    d3.csv("/data/discovery2Data.csv").then(function(data) {
        const plotData = data.map(el => {
            return {id: el['Id'], district: el['District'], ses:el['SES Inequality (SD Units)'], nineYrGapChg: el['9-year Change in Gap'], percentGapChg: el['Percentage Change in Gap (2009-2018)'], yrGapClose: el['Year Gap Will Close Given Current Trend'], yrGapDbl: el['Year Gap Will Double Given Current Trend'], state: el['State'], ohNineGap: el['Estimated 2009 Gap']};
        })
        const zeroes = []
        // create array of zeroes of data length
        plotData.forEach(el => {
            zeroes.push(0);
        });
        const districts = plotData.map(x => `${x.district}, ${x.state}`);
        const nineYrGapNeg = plotData.map(x => x.nineYrGapChg < 0 ? x.nineYrGapChg : null);
        const nineYrGapPos = plotData.map(x => x.nineYrGapChg >= 0 ? x.nineYrGapChg : null);
        const eighteenGap = plotData.map(x => x.nineYrGapChg + x.ohNineGap);
        var baseOption = {
            aria: {
                show: true,
                description: 'Lollipop chart of the white-black achievement gap vs socieconomic inequality in the 40 largest school districts'
            },
            tooltip: {
                formatter: (params) => 
                `${plotData[params[0].dataIndex].district}, ${plotData[params[0].dataIndex].state}<br />
                <small>SES Inequality: ${plotData[params[0].dataIndex].ses}<br />
                Gap in 2009: ${plotData[params[0].dataIndex].ohNineGap}</br>
                Gap in 2018: ${roundToNearest(parseFloat(plotData[params[0].dataIndex].ohNineGap) + parseFloat(plotData[params[0].dataIndex].nineYrGapChg), 2)}</br>
                Change in Gap (2009-2018): ${plotData[params[0].dataIndex].nineYrGapChg}<br />
                ${plotData[params[0].dataIndex].percentGapChg <= 0 ? `At Current Trend, 2009 Gap Will Close in: ${plotData[params[0].dataIndex].yrGapClose}` : `At Current Trend, 2009 Gap Will Double in: ${plotData[params[0].dataIndex].yrGapDbl}`}</small>`,
                backgroundColor: '#031232', // 'rgba(3, 18, 50, 80%)',
                confine: true,
                extraCssText: 'box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5)',
                padding: [6, 10],
                textStyle: {
                    color: '#fff', // '#dc69aa',
                    fontWeight: '500',
                    fontFamily: 'SharpGrotesk-Medium20',
                },
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow',
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
                bottom: 0,
                left: 48,
                right: 32,
                containLabel: true,
            },
            xAxis: {
                interval: .25,
                min: -0.5,
                max: 1.5,
                axisLine: {show: false},
                splitLine: {show: false},
                axisTick: {show: false, alignWithLabel: true},
                type: 'value',
                position: 'bottom',
                axisLabel: {
                    inside: false,
                    textVerticalAlign: 'middle',
                    fontFamily: 'MaisonNeue-Medium',
                    fontSize: 12,
                    color: '#757575'
                },
            },
            yAxis: {
                type: 'category',
                axisLine: {show: false, onZero: false},
                axisTick: {show: false, alignWithLabel: true},
                splitLine: {show: false},
                splitNumber: 40,
                inverse: true,
                offset: 35,
                axisLabel: {
                    show: true,
                    interval: 0, 
                    fontSize: 8,
                    inside: false,
                    textVerticalAlign: 'middle',
                    fontFamily: 'MaisonNeue-Medium',
                    color: '#757575'
                },
                zlevel: 101,
                data: districts
            },
            series: [
                {
                    name: 'Test1',
                    type: 'bar',
                    stack: 'Test2',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            1, 0, 0, 0,
                            [
                                {offset: 0, color: '#fff'},
                                {offset: 1, color: '#2D9C6F'}
                            ]
                        )
                    },
                    barWidth: 4,
                    data: nineYrGapNeg,
                    cursor: 'default'
                },
                {
                    type: 'scatter',
                    itemStyle:{
                        opacity: 1,
                        color: '#1A6D4B'
                    },
                    data: nineYrGapNeg,
                    symbolSize: 6,
                    zlevel: 102,
                    silent: true
                },
                {
                    name: 'Test1',
                    type: 'bar',
                    stack: 'Test2',
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#fff'},
                                {offset: 1, color: '#4388CC'}
                            ]
                        )
                    },
                    barWidth: 4,
                    data: nineYrGapPos,
                    cursor: 'default'
                },
                {
                    type: 'scatter',
                    itemStyle:{
                        opacity: 1,
                        color: '#1A4C7E'
                    },
                    data: nineYrGapPos,
                    symbolSize: 6,
                    zlevel: 102,
                    silent: true
                },
                
                {
                    type: 'scatter',
                    itemStyle:{
                        opacity: 1,
                        color: '#93C5E2'
                    },
                    symbolSize: 6,
                    data: zeroes,
                    zlevel: 101,
                    silent: true
                }
            ]
        };

        var myChart = echarts.init(document.getElementById('lollipop'));

        modifyOptionAndRender(myChart, baseOption)

        window.onresize = function() {
            var renderOption = modifyOption(baseOption)
            myChart.setOption(renderOption)
            myChart.resize()
        }
    })
}

// use configuration item and data specified to show chart
getDataAndRender()
