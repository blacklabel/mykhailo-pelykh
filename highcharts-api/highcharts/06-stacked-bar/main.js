const buttonAttrs = {
    height: 6,
    zIndex: 10,
    stroke: 'blue',
};
const buttonCSS = { 'font-size': '13px' };
const labelCSS = { 'font-size': '10px' };

const chartEvents = {
    render: function() {
        const chart = this;

        if (chart.svgElements) {
            chart.svgElements.forEach(e => e.destroy());
        }
        chart.svgElements = [];

        const buttons = addButtons(chart);
        chart.svgElements.push(...buttons);

        const labels = addLabels(chart);
        chart.svgElements.push(...labels);
    }
}

Highcharts.chart('container', {
    dataTable: {
        columns: {
            Categories: ['Data', 'Emails', 'Duplicates', 'Support'],
            Orange: [100, 130, 35, 30],
            Green: [15, 0, 15, 10],
            Blue: [110, 110, 30],
            Red: [15, 0, 10, 5]
        }
    },
    chart: {
        type: 'bar',
        events: chartEvents,
        marginTop: 20
    },
    title: {
        text: null
    },
    legend: {
        enabled: false
    },
    xAxis: {
        type: 'category',
        lineWidth: 0,
        gridLineWidth: 1
    },
    yAxis: {
        title: { text: 'Amount' },
        softMax: 400,
        gridLineWidth: 0,
        stackLabels: {
            enabled: true,
            formatter: function() {
                return this.total + ' K';
            }
        }
    },
    plotOptions: {
        series: {
            dataMapping: {
                name: 'Categories'
            },
            stacking: 'normal'
        }
    },
    series: [{
        dataMapping: {
            y: 'Orange'
        }
    }, {
        dataMapping: {
            y: 'Green'
        }
    }, {
        dataMapping: {
            y: 'Blue'
        }
    }, {
        dataMapping: {
            y: 'Red'
        }
    }]
});

function addLabels(chart) {
    const labelY = -5;
    const label1X = 3,
          label2X = chart.plotLeft - 3,
          label3X = chart.plotWidth;

    const label1 = chart.renderer
        .label('Issue', label1X, labelY)
        .css(labelCSS)
        .add();

    const label2 = chart.renderer
        .label('Record Count', label2X, labelY)
        .css(labelCSS)
        .add();

    const label3 = chart.renderer
        .label('Action', label3X, labelY)
        .css(labelCSS)
        .add();

    return [label1, label2, label3];
}

function addButtons(chart) {
    const buttonX = chart.plotWidth;
    const buttons = [];

    chart.series[0].points.forEach((point, i) => {
        const pointX = chart.plotTop + point.shapeArgs.x;
        const pointWidth = point.shapeArgs.width;

        const button = chart.renderer
            .button(
                'How to fix',
                buttonX,
                pointX,
                function () {},
                buttonAttrs
            )
            .css(buttonCSS)
            .add();

        buttons.push(button);

        // You can only get correct button height after it was rendered.
        button.attr({
            y: pointX + pointWidth / 2 - button.height / 2
        });
    });

    return buttons;
}
