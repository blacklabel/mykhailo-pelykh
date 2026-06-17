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
        max: highestY,
        softMax: highestY * 2,
        
        plotLines: [{
            color: 'green',
            value: highestY * 2
        }, {
            color: 'red',
            value: highestY * 1.5
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

Highcharts.chart('container', chartOptions);
