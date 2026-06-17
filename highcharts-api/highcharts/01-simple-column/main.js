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
        max: yHighest,
        softMax: yHighest * 2,
        plotLines: [{
            color: 'green',
            dashStyle: 'Dash',
            value: yHighest * 1.5,
            width: 3
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