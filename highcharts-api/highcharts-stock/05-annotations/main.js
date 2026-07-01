(async () => {
    const data = await fetch(
        'https://demo-live-data.highcharts.com/aapl-c.json'
    ).then((response) => response.json());

    Highcharts.stockChart('container', {
        chart: {
            events: {
                load() {
                    const chart = this;
                    const extremesX = chart.xAxis[0].getExtremes();
                    const extremesY = chart.yAxis[0].getExtremes();

                    const controls = document.getElementById('controls'),
                          inputsX = controls.querySelectorAll('.x-input'),
                          inputsY = controls.querySelectorAll('.y-input'),
                          addLineBtn = controls.querySelector('.add-line');

                    addLineBtn.addEventListener('click', function() {
                        const x1 = dateStrToTimestamp(inputsX[0].value),
                              y1 = Number(inputsY[0].value),
                              x2 = dateStrToTimestamp(inputsX[1].value),
                              y2 = Number(inputsY[1].value);

                        chart.addAnnotation({
                            type: 'crookedLine',
                                typeOptions: {
                                    points: [
                                        { x: x1, y: y1 },
                                        { x: x2, y: y2 }
                                    ]
                                }
                        });
                    });

                    inputsX.forEach(inputX => {
                        inputX.min = timestampToDateStr(extremesX.min);
                        inputX.max = timestampToDateStr(extremesX.max);
                    });

                    inputsY.forEach(inputY => {
                        inputY.min = extremesY.min;
                        inputY.max = extremesY.max;

                        inputY.addEventListener('change', function() {
                            const value = this.value;
                            if (value < this.min) this.value = this.min;
                            if (value > this.max) this.value = this.max;
                        });
                    });
                }
            }
        },
        rangeSelector: {
            selected: 1
        },
        title: {
            text: ''
        },
        series: [
            {
            name: 'AAPL',
            data: data,
            type: 'spline'
            }
        ]
    });
})();

function timestampToDateStr(timestamp) {
    return new Date(timestamp).toISOString().split('T')[0];
}

function dateStrToTimestamp(value) {
    return new Date(value).getTime();
}
