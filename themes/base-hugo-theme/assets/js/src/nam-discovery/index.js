"use strict";

var Seda = Seda || {};
var $ = jQuery;

Seda.Utils = (function (Seda) {})(Seda);

Seda.NamDiscovery = (function (Seda) {
  let chart;
  let chartData;
  let selectedLocations = [];

  const COLORS = {
    0: "#abd9e9", // top left
    1: "#2fb57f", // top right
    2: "#ddd", // bottom right
    3: "#174b80", // bottom left
    NA: "#f00",
  };
  const SELECTED_COLORS = [
    "#ff4040",
    "#e19608",
    "#96e108",
    "#40ff40",
    "#08e196",
    "#0896e1",
    "#4040ff",
    "#9608e1",
    "#e10896",
  ];

  const AVG_INDEX = 0;
  const GRD_INDEX = 1;
  const SIZE_INDEX = 2;
  const FIPS_INDEX = 3;
  const NAME_INDEX = 4;
  const STATE_INDEX = 5;
  const DATA_FILE = "/data/nam-discovery.csv";
  const X_VAR = "avg_eb_nam";
  const Y_VAR = "grd_eb_nam";
  const Z_VAR = "mn_asmts_nam";
  const DATA_INDEXES = [
    X_VAR,
    Y_VAR,
    Z_VAR,
    "sedacounty",
    "sedacountyname",
    "stateabb",
  ];
  const DATA_LABELS = {
    avg_eb_nam: "Native American Students’ Average Test Scores in 3rd Grade",
    grd_eb_nam: "Native American Students’ Learning Rates",
    mn_asmts_nam: "Subgroup Size",
    sedacounty: "County Fips",
    sedacountyname: "County Name",
    stateabb: "State Abbreviation",
  };
  const X_LABEL = DATA_LABELS[X_VAR];
  const Y_LABEL = DATA_LABELS[Y_VAR];
  const sizeScale = d3.scaleLinear().domain([0, 1000]).range([8, 64]);

  function addSelectedItem(item) {
    selectedLocations.push(item);
    render();
  }

  function removeSelectedItem(item) {
    selectedLocations = selectedLocations.filter((loc) => loc.id !== item.id);
    console.log(item, selectedLocations);
    render();
  }

  function initAutocomplete(data) {
    function handleSelectLocation(...props) {
      const item = $("#namAutocomplete").getSelectedItemData();
      addSelectedItem(item);
      $("#namAutocomplete").val("");
    }

    var options = {
      data: data.map((d) => ({
        name: d[NAME_INDEX],
        state: d[STATE_INDEX],
        fullname: `${d[NAME_INDEX]}, ${d[STATE_INDEX]}`,
        id: d[FIPS_INDEX],
      })),
      getValue: "fullname",
      list: {
        match: {
          enabled: true,
        },
        onClickEvent: handleSelectLocation,
      },
    };
    $("#namAutocomplete").easyAutocomplete(options);
  }

  function fadeColor(hex, opacity) {
    const c = d3.color(hex);
    c.opacity = opacity;
    return c + "";
  }

  function loadData(url) {
    return d3.csv(url, d3.autoType);
  }

  function shapeData(data) {
    return data
      .map((d) => DATA_INDEXES.map((name) => d[name]))
      .filter((d) => d[0] !== null && d[1] !== null)
      .sort((a, b) => b[SIZE_INDEX] - a[SIZE_INDEX]);
  }

  function getSeries(data) {
    const topLeft = data.filter((d) => d[0] < 3 && d[1] > 1);
    const topRight = data.filter((d) => d[0] > 3 && d[1] > 1);
    const bottomRight = data.filter((d) => d[0] > 3 && d[1] < 1);
    const bottomLeft = data.filter((d) => d[0] < 3 && d[1] < 1);
    return [
      {
        name: "Above Average Scores, Above Average Learning",
        color: COLORS[1],
        data: topRight,
      },
      {
        name: "Above Average Scores, Below Average Learning",
        color: COLORS[2],
        data: bottomRight,
      },
      {
        name: "Below Average Scores, Above Average Learning",
        color: COLORS[0],
        data: topLeft,
      },
      {
        name: "Below Average Scores, Below Average Learning",
        color: COLORS[3],
        data: bottomLeft,
      },
    ];
  }

  function createListItem(location, index) {
    const marker = $("<span />").css({
      display: "inline-block",
      width: "16px",
      height: "16px",
      borderRadius: "16px",
      backgroundColor: SELECTED_COLORS[index % SELECTED_COLORS.length],
      margin: "0 8px 0 0",
    });
    const label = $("<span />", {
      text: `${location[NAME_INDEX]}, ${location[STATE_INDEX]}`,
    });
    const button = $("<button/>", {
      text: "❌",
      click: () => removeSelectedItem({ id: location[FIPS_INDEX] }),
    }).css({
      border: "none",
      background: "none",
      padding: "0",
      margin: "0 0 0 auto",
    });
    return $("<li />")
      .css({
        margin: "16px 0",
        display: "flex",
        alignItems: "center",
        lineHeight: 1,
      })
      .append(marker)
      .append(label)
      .append(button);
  }

  function render() {
    const selectedData = chartData.filter((d) =>
      selectedLocations.find((loc) => loc.id === d[FIPS_INDEX])
    );

    const selectedContainer = $("#namSelected");
    selectedContainer.empty();
    selectedData.forEach((loc, i) => {
      selectedContainer.append(createListItem(loc, i));
    });

    // specify chart configuration item and data
    var option = {
      title: {
        text: "Learning Rates and Average 3rd Grade Test Scores of Native American Students in U.S. Counties",
        textStyle: {
          width: 450,
          overflow: 'break'
        },
        textAlign: 'center',
        left: "50%"
      },
      grid: {
        left: 100,
        top: 150,
        right: 240,
      },
      tooltip: {
        className: 'nam-tooltip',
        backgroundColor: 'rgba(4, 20, 60, 0.9)',
        textStyle: {
          color: "#ffffff"
        },
        formatter: (props) => {
          const formatNum = d3.format(".1f");
          const achievement = formatNum(Math.abs(props.data[AVG_INDEX] - 3));
          const diff = props.data[AVG_INDEX] > 3 ? "above" : "below";
          const learning = formatNum(props.data[GRD_INDEX]);
          return `<div style="max-width: 192px;">
                <strong style="display:block;white-space: normal; line-height: 1.1; margin-bottom: 0.5em">${props.data[NAME_INDEX]}, ${props.data[STATE_INDEX]}</strong>
                <span style="display: block; white-space: normal; font-size: 12px; line-height: 16px">Average achievement in grade 3 is
                <strong>${achievement} grade levels ${diff} average</strong>.  <br /><br />
                Students gain <strong>${learning} grade levels</strong> annually.</span>
              </div>`;
        },
      },
      legend: {
        orient: "horizontal",
        width: 800,
        left: 95,
        top: 64,
        show: true,
        itemGap: 16,
        textStyle: {
          lineHeight: 36,
        },
      },
      xAxis: {
        name: X_LABEL,
        nameLocation: "center",
        nameGap: 32,
        axisLine: {
          show: false,
        },
        axisLabel: {
          formatter: (value, index) => {
            if (value === 3) return "Average";
            if (value < 3) return `${Math.abs(value - 3)} Below`;
            if (value > 3) return `${Math.abs(value - 3)} Above`;
          },
        },
      },
      yAxis: {
        name: Y_LABEL,
        nameLocation: "center",
        nameGap: 80,
        min: 0.6,
        max: 1.6,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          formatter: (value, index) => {
            if (value === 1) return "Average";
            if (value < 1) return `${Math.round((1 - value) * 100)}% less`;
            if (value > 1) return `${Math.round((value - 1) * 100)}% more`;
          },
        },
      },
      series: [
        ...getSeries(chartData).map((series) => ({
          name: series.name,
          type: "scatter",
          data: series.data,
          symbolSize: function (data) {
            return sizeScale(data[SIZE_INDEX]);
          },
          itemStyle: {
            color: fadeColor(series.color, 0.8),
            borderColor: `rgba(7,55,148,0.4)`,
            borderWidth: 0.75,
          },
        })),
        {
          type: "scatter",
          data: selectedData,
          symbolSize: function (data) {
            return sizeScale(data[SIZE_INDEX]);
          },
          itemStyle: {
            color: ({ seriesIndex, dataIndex }) => {
              console.log(
                dataIndex,
                SELECTED_COLORS[dataIndex % SELECTED_COLORS.length]
              );
              return fadeColor(
                SELECTED_COLORS[dataIndex % SELECTED_COLORS.length],
                0.6
              );
            },

            borderColor: `#fff`,
            borderWidth: 2,
            opacity: 1,
          },
        },
        {
          type: "scatter",
          data: [],
          symbolSize: 1,
          silent: true,
          markLine: {
            label: { show: false },
            symbol: "none",
            lineStyle: {
              color: "rgba(0,0,0,0.34)",
            },

            data: [
              { name: "average", xAxis: 3, symbol: "none" },
              { name: "average", yAxis: 1, symbol: "none" },
            ],
          },
        },
      ],
    };

    // use configuration item and data specified to show chart
    chart.setOption(option);
  }

  function init() {
    loadData(DATA_FILE)
      .then(shapeData)
      .then((data) => {
        chartData = data;
        console.log(chartData);
        initAutocomplete(chartData);
        // based on prepared DOM, initialize echarts instance
        chart = echarts.init(document.getElementById("echart"));
        render();
        window.addEventListener("resize", function () {
          chart.resize();
        });

        chart.on("click", function(params){
          addSelectedItem({id: params.data[3]})
        })
      });
  }

  return { init: init };
})(Seda);
