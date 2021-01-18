const jQ = jQuery;

jQ('.column-plot .title').html('Places with Higher White-Black Socioeconomic Inequality Also Had Faster-Growing Academic Gaps (2009-2018, 40 Largest U.S. Districts)');
jQ('.column-plot .directions').html('</br>Tap in the chart below to see district names and more data.')

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
        newOption.yAxis.axisLabel.show = false;
        newOption.yAxis.nameGap = -20
        newOption.tooltip.textStyle.fontSize = 10
    }
    // reformat xaxis label for different sizes
    if ( document.getElementById('lollipop').clientWidth < 604 ) {
        newOption.xAxis.name = '◀ GAPS SHRINKING               GAPS WIDENING ▶\n10-Year Change in White-Black Achievement Gap\nin Grade-Level Units (2009-2018)'
        newOption.xAxis.nameGap = 23;
        newOption.grid.bottom = 43;
    }
    return newOption
}

function modifyOptionAndRender (chart, option) {
    var renderOption = modifyOption(option)
    chart.setOption(renderOption)
}

const getDataAndRender = async () => {
    d3.csv("/data/discovery2Data.csv").then(function(data) {
        const plotData = data.map(el => {
            return {id: el['Id'], district: el['District'], ses:el['SES Inequality (SD Units)'], tenYrGapChg: el['10-year Change in Gap'], percentGapChg: el['Percentage Change in Gap (2009-2018)'], yrGapClose: el['Year Gap Will Close Given Current Trend'], yrGapDbl: el['Year Gap Will Double Given Current Trend'], state: el['State']};
        })
        const zeroes = []
        // create array of zeroes of data length
        plotData.forEach(el => {
            zeroes.push(0);
        });
        const districts = plotData.map(x => x.district);
        const tenYrGapNeg = plotData.map(x => x.tenYrGapChg < 0 ? x.tenYrGapChg : null);
        const tenYrGapPos = plotData.map(x => x.tenYrGapChg >= 0 ? x.tenYrGapChg : null);
        var baseOption = {
            aria: {
                show: true,
                description: 'Lollipop chart of the white-black achievement gap vs socieconomic inequality in the 40 largest school districts'
            },
            tooltip: {
                formatter: (params) => 
                `${plotData[params[0].dataIndex].district}, ${plotData[params[0].dataIndex].state}<br />
                <small>SES Inequality: ${plotData[params[0].dataIndex].ses}<br />
                Change in Gap (2009-2018): ${plotData[params[0].dataIndex].tenYrGapChg}<br />
                ${plotData[params[0].dataIndex].yrGapClose ? `Year 2009 Gap Will Close, at Current Trend: ${plotData[params[0].dataIndex].yrGapClose}` : `Year 2009 Gap Will Double, at Current Trend: ${plotData[params[0].dataIndex].yrGapDbl}`}</small>`,
                // `<div style="padding-top:6px; padding-bottom:6px; font-size: 16px">${plotData[params[0].dataIndex].district}, ${plotData[params[0].dataIndex].state}</div>
                // <span style="font-family: MaisonNeue-Medium">SES Inequality:</span> <span style="font-size: 16px; font-family: SharpGrotesk-Medium15">${plotData[params[0].dataIndex].ses}</span><br />
                // <span style="font-family: MaisonNeue-Medium">Change in Gap (2009-2018):</span> <span style="font-size: 16px; font-family: SharpGrotesk-Medium15">${plotData[params[0].dataIndex].tenYrGapChg}</span><br />
                // ${plotData[params[0].dataIndex].yrGapClose ? `<span style="font-family: MaisonNeue-Medium">Year 2009 Gap Will Close, at Current Trend:</span> <span style="font-size: 16px; font-family: SharpGrotesk-Medium15">${plotData[params[0].dataIndex].yrGapClose}</span>` : `<span style="font-family: MaisonNeue-Medium">Year 2009 Gap Will Double, at Current Trend:</span> <span style="font-size: 16px; font-family: SharpGrotesk-Medium15">${plotData[params[0].dataIndex].yrGapDbl}</span>`}`,
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
                bottom: 32,
                left: 35,
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
                name: '◀ GAPS SHRINKING                    GAPS WIDENING ▶\n10-Year Change in White-Black Achievement Gap in Grade-Level Units (2009-2018)',
                nameTextStyle: {
                    fontFamily: 'MaisonNeue-Medium',
                    fontSize: 13,
                    color: '#757575'
                },
                nameLocation: 'middle',
                nameGap: 25,
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
                name: '◀ HIGHER          Socioeconomic Inequality          LOWER ▶',
                nameLocation: 'middle',
                nameRotate: 90,
                nameGap: -10,
                nameTextStyle: {
                    fontFamily: 'MaisonNeue-Medium',
                    color: '#757575',
                    fontSize: 13,
                },
                axisLabel: {
                    show: true,
                    interval: 0, 
                    fontSize: 9,
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
                    data: tenYrGapNeg,
                    cursor: 'default'
                },
                {
                    type: 'scatter',
                    itemStyle:{
                        opacity: 1,
                        color: '#1A6D4B'
                    },
                    data: tenYrGapNeg,
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
                    data: tenYrGapPos,
                    cursor: 'default'
                },
                {
                    type: 'scatter',
                    itemStyle:{
                        opacity: 1,
                        color: '#1A4C7E'
                    },
                    data: tenYrGapPos,
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
