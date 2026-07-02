(async () => {
    const data = await fetch(
        'https://demo-live-data.highcharts.com/aapl-c.json'
    ).then(response => response.json());

    const chart = Highcharts.stockChart('container', {
        chart: {
            events: {
                load() {
                    const chart = this;
                    const addBtn = document.getElementById('add-annotation');

                    addBtn.addEventListener('click', function() {
                        const x = chart.xAxis[0].toValue(chart.plotLeft + 10),
                              y = chart.yAxis[0].toValue(chart.plotTop + 10);

                        chart.addAnnotation({
                            shapes: [{
                                type: 'rect',
                                point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x,
                                    y
                                },
                                width: 360,
                                height: 60,
                                fill: 'red'
                            }],
                            labels: [{
                                point: {
                                    xAxis: 0,
                                    yAxis: 0,
                                    x,
                                    y
                                },
                                x: 180,
                                y: 30,
                                shape: 'rect',
                                text: Math.trunc(y),
                                verticalAlign: 'middle'
                            }],
                            events: {
                                drag: function() {
                                    const label = this.labels[0];
                                    const rectY = this.shapes[0].points[0].y;
                                    label.update({ text: Math.trunc(rectY) });
                                }
                            }
                        });
                    });
                }
            }
        },
        series: [{
            data: data
        }]
    });
})();
