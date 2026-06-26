const categories = ['Data', 'Emails', 'Duplicates', 'Support'];

Highcharts.chart('container', {
    chart: {
        type: 'bar',
        marginTop: 20,
        events: {
            load: function() {
                const chart = this;

                chart.customLabels = [];
                chart.customButtons = [];
            },
            render: function() {
                const chart = this;
                const { renderer, series, xAxis, customLabels, customButtons } = chart;

                // Add buttons
                series[0].points.forEach((point, i) => {
                    if (!customButtons[i]) {
                        customButtons[i] = renderer
                            .button('How to fix', 0, 0, function () {}, {
                                height: 6,
                                zIndex: 10,
                                stroke: 'blue',
                            })
                            .css({ 'font-size': '13px' })
                            .add();
                    }

                    const pointWidth = point.shapeArgs.width;
                    const pointX = chart.plotTop + point.shapeArgs.x;

                    customButtons[i].attr({
                        x: chart.plotWidth,
                        y: pointX + pointWidth / 2 - customButtons[i].height / 2
                    });
                });

                // Add labels
                if (customLabels.length == 0) {
                    customLabels.push(
                        ...['Issue', 'Record Count', 'Action']
                        .map(title =>
                            renderer.label(title, 0, chart.plotTop - 25)
                                .css({ 'font-size': '10px' })
                                .add()
                        )
                    );
                }

                customLabels[0].attr({ x: 3 });
                customLabels[1].attr({ x: chart.plotLeft - 3 });
                customLabels[2].attr({ x: chart.plotWidth });
            }
        }
    },
    title: {
        text: null
    },
    legend: {
        enabled: false
    },
    xAxis: {
        lineWidth: 0,
        gridLineWidth: 1,
        categories
    },
    yAxis: {
        title: { text: 'Amount' },
        softMax: 400,
        gridLineWidth: 0,
        stackLabels: {
            enabled: true,
            format: '{total} K'
        }
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    series: [{
        data: [100, 130, 35, 30],
    }, {
        data: [15, 0, 15, 10],
    }, {
        data: [110, 110, 30, 40]
    }, {
       data: [15, 0, 10, 5]
    }]
});
