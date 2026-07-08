const day = 1000 * 60 * 60 * 24;
const dateMin = Date.UTC(2024, 0, 1),
      dateMax = Date.UTC(2024, 0, 8);

Highcharts.ganttChart('container', {
    title: {
        text: 'Journeys (visualization)'
    },
    chart: {
        events: {
            load() {
                // Navigator doesn't display all data on start by default...
                this.series.forEach(s => s.update({}, false));
            }
        }
    },
    xAxis: {
        units: [['day']],
        dateTimeLabelFormats: {
            day: 'Day %e'
        }
    },
    navigator: {
        enabled: true
    },
    plotOptions: {
        series: {
            dataLabels: {
                enabled: true,
                format: `{point.options.label}`
            },
            dragDrop: {
                draggableX: true,
                liveRedraw: false,
                dragPrecisionX: day,
                dragMinX: dateMin,
                dragMaxX: dateMax,
            }
        }
    },
    series: [{
        name: 'Journeys',
        data: [{
            name: 'Cruises',
            id: 'cruises',
            start: Date.UTC(2024, 0, 1),
            end: Date.UTC(2024, 0, 4)
        }, {
            name: 'Norway - England',
            id: 'norway-england-cruise',
            parent: 'cruises',
            dependency: 'cruises',
            start: Date.UTC(2024, 0, 2),
            end: Date.UTC(2024, 0, 3)
        }, {
            name: 'Flights',
            id: 'flights',
            start: Date.UTC(2024, 0, 3),
            end: Date.UTC(2024, 0, 7)
        }, {
            name: 'Domestic flights',
            id: 'domestic-flights',
            parent: 'flights',
            start: Date.UTC(2024, 0, 4),
            end: Date.UTC(2024, 0, 6)
        }, {
            name: 'Beijing - Hong Kong',
            id: 'beijing-hongkong-flight',
            parent: 'domestic-flights',
            dependency: ['flights', 'domestic-flights'],
            start: Date.UTC(2024, 0, 4),
            end: Date.UTC(2024, 0, 5)
        }, {
            name: 'International flights',
            id: 'international-flights',
            parent: 'flights',
            start: Date.UTC(2024, 0, 4),
            end: Date.UTC(2024, 0, 7)
        }, {
            name: 'Norway - Brazil',
            id: 'norway-brazil-flight',
            label: 'Show full adventure',
            drilldown: 'norway-brazil-flight-full',
            parent: 'international-flights',
            dependency: ['flights', 'international-flights'],
            dragDrop: {
                draggableX: false
            },
            color: '#f5deb2',
            start: Date.UTC(2024, 0, 5),
            end: Date.UTC(2024, 0, 8)
        }]
    }],
    drilldown: {
        series: [{
            showInNavigator: true,
            name: 'Norway - Brazil full',
            id: 'norway-brazil-flight-full',
            data: [{
                name: 'Norway - Spain',
                id: 'norway-spain-flight',
                color: '#f5deb2',
                start: Date.UTC(2024, 0, 5),
                end: Date.UTC(2024, 0, 6)
            }, {
                name: 'Spain - Brazil',
                id: 'spain-brazil-flight',
                color: '#f5deb2',
                start: Date.UTC(2024, 0, 6),
                end: Date.UTC(2024, 0, 8)
            }]
        }]
    }
});
