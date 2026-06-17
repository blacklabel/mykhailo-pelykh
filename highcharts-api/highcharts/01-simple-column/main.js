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
        name: city,
        data: cityData
    }
});

const chartOptions = {
    chart: {
        type: 'column'
    },
    xAxis: {
        categories: ['Jan', 'Feb', 'Mar']
    },
    yAxis: {
        max: highestY,
        softMax: highestY * 2,
        plotLines: [{
            color: 'green',
            dashStyle: 'Dash',
            value: highestY * 1.5,
            width: 3
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