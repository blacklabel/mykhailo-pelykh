const cityNames = ['Tokyo', 'New York', 'London'];

const maxY = 9;
const seriesDataLength = 3;

const series = cityNames.map(city => {
    const cityData = Array.from({ length: seriesDataLength }, () => {
        return Math.floor(Math.random() * (maxY + 1));
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
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                formatter: function () {
                    const { dataMax } = this.series.chart.yAxis[0];

                    if (this.y === dataMax) {
                        return 'max';
                    }
                }
            }
        }
    },
    series
}

const chart = Highcharts.chart('container', chartOptions);
const highestY = chart.yAxis[0].dataMax;

chart.update({
    yAxis: {
        max: highestY,
        softMax: highestY * 2,
        plotLines: [{
            color: 'green',
            dashStyle: 'Dash',
            width: 3,
            value: highestY * 1.5,
        }]
    },
});
