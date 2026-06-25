const data = [
    ['product', 'weight', 'price', 'metaData', 'icon'],
    ['Apples', 140, 1.5, 'a', 'Apples URL'],
    ['Pears', 120, 2.53, 'b', 'Pears URL'],
    ['Plums', 50, 5, 'c', 'Plums URL'],
    ['Bananas', 200, 4.5, 'd', 'Bananas URL'],
    ['Oranges', 150, 3, 'e', 'Oranges URL'],
    ['Grapes', 120, 2.8, 'f', 'Grapes URL'],
    ['Strawberries', 50, 6, 'g', 'Strawberries URL'],
    ['Blueberries', 30, 4.2, 'h', 'Blueberries URL'],
    ['Cherries', 25, 7, 'i', 'Cherries URL'],
    ['Mangoes', 200, 3.5, 'j', 'Mangoes URL']
];

Dashboards.board('container', {
    dataPool: {
        connectors: [{
            id: 'products',
            type: 'JSON',
            data,
            dataModifier: {
                type: 'Sort',
                direction: 'asc',
                orderByColumn: 'weight'
            }
        }]
    },
    gui: {
        layouts: [{
            id: 'main-layout',
            rows: [{
                cells: [{
                    id: 'left-cell'
                }, {
                    id: 'right-cell'
                }]
            }]
        }]
    },
    components: [{
        type: 'Highcharts',
        renderTo: 'left-cell',
        sync: {
            highlight: true
        },
        connector: {
            id: 'products',
            columnAssignment: [{
                seriesId: 'weight',
                data: {
                    name: 'product',
                    y: 'weight'
                }
            }, {
                seriesId: 'price',
                data: ['price']
            }]
        },
        chartOptions: {
            title: {
                text: null
            },
            xAxis: {
                type: 'category'
            },
            yAxis: [{
                title: { text: 'Weight (g)' }
            }, {
                title: { text: 'Price (EUR)' },
                opposite: true
            }],
            series: [{
                type: 'bar',
                name: 'Weight',
                id: 'weight',
            }, {
                type: 'spline',
                name: 'Price',
                id: 'price',
                yAxis: 1,
                color: 'red'
            }]
        }
    }, {
        type: 'Grid',
        renderTo: 'right-cell',
        sync: {
            highlight: true
        },
        connector: {
            id: 'products'
        }
    }]
});
