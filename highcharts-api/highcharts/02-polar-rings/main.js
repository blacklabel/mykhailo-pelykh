const cityNames = ['Tokyo', 'New York', 'London'];

const yRangeMin = 0;
const yRangeMax = 9;
let yHighest = 0;

const seriesData = cityNames.map(city => {
    const cityData = Array.from({ length: 3 }, () => {
        const value = Math.floor(Math.random() * (yRangeMax - yRangeMin + 1)) + yRangeMin;
        if (value > yHighest) yHighest = value;
        return value;
    });

    return {
        type: 'column',
        name: city,
        data: cityData
    }
});

const chartOptions = {
    chart: {
        polar: true
    },
    title: {
        text: 'Chart Title'
    },
    pane: {
        startAngle: 0,
        endAngle: 360
    },
    xAxis: {
        tickInterval: 1,
        min: 0,
        max: 3,
        lineWidth: 2,
        lineColor: 'blue'
    },
    yAxis: {
        max: yHighest,
        softMax: yHighest * 2,
        
        plotLines: [{
            color: 'green',
            value: yHighest * 2
        }, {
            color: 'red',
            value: yHighest * 1.5
        }]
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    if (this.y === yHighest) {
                        return 'max';
                    }
                }
            }
        }
    },
    series: seriesData
}

Highcharts.chart('container', chartOptions);
