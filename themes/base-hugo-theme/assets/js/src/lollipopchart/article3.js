document.getElementById('scatterplot').style="height: 400px"
var myChart = echarts.init(document.getElementById('scatterplot'));
// specify chart configuration item and data
var option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
            color: 'rgba(220, 220, 220, 0.8)'
        }
    }]
};

// use configuration item and data specified to show chart
myChart.setOption(option);