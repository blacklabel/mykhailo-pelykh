const chartOptions = {
    title: {
        text: 'Highcharts chart',
        align: 'left'
    },
    subtitle: {
        text: 'With modified default elements',
        align: 'left'
    },
    legend: {
        align: 'left',
        verticalAlign: 'top'
    },
    credits: {
        text: 'Highcharts website',
        href: 'https://www.highcharts.com',
        position: {
            align: 'left',
            x: 15
        }
    },
    xAxis: {
        title: {
            text: 'xAxis title'
        }
    },
    yAxis: {
        title: {
            text: 'yAxis title'
        },
        labels: {
            style: {
                color: 'green'
            },
            formatter: function () {
                return (this.value / 1000) + ' k';
            }
        },
        tickInterval: 1000
    },
    series: [{
        name: 'Column series',
        type: 'column',
        color: 'blue',
        data: [1000, 6000, 0, 3000, 2000, 0]
    }, {
        name: 'Line series',
        type: 'line',
        color: 'green',
        data: [1500, 5000, 2000, 3000, 6000, 5000]
    }, {
        name: 'Spline series',
        type: 'spline',
        color: 'red',
        marker: {
            symbol: 'triangle-down',
        },
        data: [3000, 4000, 1000, 5000, 1000, 6000]
    }]
}

Highcharts.chart('container', chartOptions);