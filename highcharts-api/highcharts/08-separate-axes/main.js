const categories = [ 'Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5' ];
const yAxisMax = 100;
const axisWidth = 45;

const chartEvents = {
    load: function() {
        const chart = this;

        chart.customAxisLabels = [
            { text: 'Manegrial Position', axis: 0 },
            { text: 'Non Manegrial Position', axis: 1 },
        ];

        chart.customBarLabels = categories.map(c => ({ text: c }));
    },

    render: function() {
        const chart = this;
        const {
            renderer, customAxisLabels, customBarLabels, plotLeft, plotTop, plotWidth
        } = chart;

        // Create bar labels
        chart.series[0].points.forEach((point, i) => {
            const { shapeArgs } = point;
            const l = customBarLabels[i];
            const x = plotLeft + plotWidth / 2;
            const y = shapeArgs.x + plotTop + shapeArgs.width / 2;

            if (!l.element) {
                l.element = renderer.label(l.text, 0, 0)
                    .css({
                        color: 'gray',
                        'font-size': '12px'
                    })
                    .add();
            }

            l.element.attr({
                x: x - l.element.width / 2,
                y: y - l.element.height / 2
            });
        });

        // Create axis labels
        customAxisLabels.forEach(l => {
            if (!l.element) {
                l.element = renderer.label(l.text, 0, 0)
                    .css({
                        'font-size': '12px',
                        'font-weight': 'bold',
                    })
                    .add();
            }

            const rightOffsetX = l.axis ? (100 - axisWidth) : 0;
            const midX = plotLeft + (plotWidth * (rightOffsetX + axisWidth / 2) / 100);

            const x = midX - l.element.width / 2,
                  y = 3;

            l.element.attr({ x, y });
        });
    },

    destroy: function() {
        this.customAxisLabels?.forEach(l => l.element?.destroy());
        this.customBarLabels?.forEach(l => l.element?.destroy());
    }
};

Highcharts.chart('container', {
    chart: {
        type: 'bar',
        events: chartEvents,
        marginTop: 36
    },
    title: false,
    yAxis: [{
        width: `${axisWidth}%`,
        max: yAxisMax,
        reversed: true,
        title: { text: null }
    }, {
        width: `${axisWidth}%`,
        left: `${100 - axisWidth}%`,
        offset: 0,
        max: yAxisMax,
        title: { text: null }
    }],
    xAxis: {
        visible: false,
        reversed: false,
        categories
    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            borderRadius: 0,
            grouping: false,
        }
    },
    exporting: {
        buttons: {
            contextButton: {
                enabled: false
            }
        }
    },
    series: [{
        yAxis: 0,
        name: 'Manegrial Background',
        data: Array(categories.length).fill(yAxisMax),
        color: 'lightgray',
        enableMouseTracking: false,
        states: { hover: { enabled: false } }
    }, {
        yAxis: 0,
        name: 'Manegrial Position',
        data: [80, 16, 96, 60, 72],
        color: 'red',
        dataLabels: {
            enabled: true,
            inside: true,
            align: 'right',
            format: '{y} %',
            x: -4,
            style: {
                color: 'black'
            }
        }
    }, {
        yAxis: 1,
        name: 'Non Manegrial Background',
        data: Array(categories.length).fill(yAxisMax),
        color: 'lightgray',
        enableMouseTracking: false,
        states: { hover: { enabled: false } }
    }, {
        yAxis: 1,
        name: 'Non Manegrial Position',
        data: [21, 6, 9, 50, 81],
        color: 'red',
        dataLabels: {
            enabled: true,
            inside: true,
            align: 'left',
            format: '{y} %',
            x: 4,
            style: {
                color: 'black'
            }
        }
    }]
});
