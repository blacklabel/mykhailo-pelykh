const chart = Highcharts.ganttChart('container', {
    xAxis: [{
        units: [['day']],
        breaks: [{
            from: '2019-06-19 23:59',
            to: '2019-06-24 00:00'
        }],
        grid: { borderColor: 'black' }
    }],
    yAxis: {
        uniqueNames: true,
        grid: { borderColor: 'black' }
    },
    series: [{
        name: 'Project 1',
        data: [{
            name: 'Main',
            start: '2019-06-19 00:00',
            pointWidth: 0
        }, {
            name: 'First',
            start: '2019-06-19 00:00',
            end: '2019-06-19 11:00',
        }, {
            name: 'Second',
            start: '2019-06-19 00:00',
            end: '2019-06-19 11:00',
        }, {
            name: 'Second',
            start: '2019-06-24 13:00',
            end: '2019-06-24 23:59',
        }]
    }]
});
