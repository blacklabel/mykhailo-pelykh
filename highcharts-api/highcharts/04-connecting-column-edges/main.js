const seriesCount = 2;
const seriesDataLength = 6;
const maxDataValue = 20;

const series = Array.from({ length: seriesCount }, () => ({
    data: Array.from({ length: seriesDataLength }, () => {
        return Math.floor(Math.random() * (maxDataValue + 1));
    })
}));

const chartOptions = {
    chart: {
        type: 'column'
    },
    series
}

Highcharts.chart('container', chartOptions);