const cityNames = ['Tokyo', 'New York', 'London'];

const maxY = 9;
let highestY = 0;

const seriesDataLength = 3;

const series = cityNames.map(city => {
    const cityData = Array.from({ length: seriesDataLength }, () => {
        const value = Math.floor(Math.random() * (maxY + 1));
        if (value > highestY) highestY = value;
        return value;
    });

    return {
        type: 'column',
        name: city,
        data: cityData
    }
});

const chartEvents = {
    render: function() {
        const chart = this;

        if (chart.customCircle) {
            chart.customCircle.destroy();
        }

        const ren = chart.renderer;
        const yAxis = chart.yAxis[0],
            yAxisStepSize = yAxis.len / yAxis.dataMax;
            centerX = chart.plotLeft + (chart.plotWidth / 2),
            centerY = chart.plotTop + (chart.plotHeight / 2);

        const circle = ren.circle(centerX, centerY, yAxisStepSize * maxY / 2)
            .attr({
                stroke: 'red',
                fill: 'none',
                'stroke-width': 2,
                zIndex: 3
            })
            .add();

        chart.customCircle = circle;
    }
}

const chartOptions = {
    chart: {
        polar: true,
        events: chartEvents
    },
    title: {
        text: 'Chart Title'
    },
    pane: {
        startAngle: 0,
        endAngle: 360
    },
    xAxis: {
        min: 0,
        max: 3,
        lineWidth: 2,
        lineColor: 'blue'
    },
    yAxis: {
        max: highestY,
        softMax: highestY * 2,
        plotLines: [{
            color: 'green',
            value: highestY * 2
        }],
        plotBands: [{
            from: 8,
            to: 8.3,
            color: 'orange'
        }]
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    if (this.y === highestY) {
                        return 'max';
                    }
                }
            }
        }
    },
    series
}

const chart = Highcharts.chart('container', chartOptions);