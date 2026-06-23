const borderColor = 'black';

Highcharts.ganttChart('container', {
    xAxis: [{
        units: [['day']],
        min: '2019-06-19 00:00',
        max: '2019-06-24 23:59',
        breaks: [{
            from: '2019-06-19 23:59',
            to: '2019-06-24 00:00',
            breakSize: 0
        }],
        grid: { borderColor }
    }],
    yAxis: {
        uniqueNames: true,
        grid: { borderColor }
    },
    series: [{
        name: 'Project 1',
        data: [{
            name: 'Main',
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
