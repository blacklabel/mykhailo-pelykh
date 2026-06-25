const categories = [ 'Dep1', 'Dep2', 'Dep3', 'Dep4', 'Dep5' ];
const yMaxValue = 100;
const halfWidth = 45; // Width(%) of one chart half.


class SvgElement {
    constructor(chart) {
        if (new.target === SvgElement) {
            throw new Error('"SvgElement" is abstract.');
        }
        this.svg = null;
        this.chart = chart;
    }
    create() { throw new Error('"SvgElement.create" must be implemented.'); }
    update() { throw new Error('"SvgElement.update" must be implemented.'); }
    destroy() { this.svg?.destroy(); }
}

class SvgAxisTitle extends SvgElement {
    static css = {
        'font-size': '12px',
        'font-weight': 'bold',
    }

    constructor(chart, title) {
        super(chart);
        this.title = title;
        this.y = 3;
    }

    getXY() {
        const { chart } = this;
        const x = chart.plotLeft + (chart.plotWidth * halfWidth / 2 / 100);

        return { x, y: this.y }
    }

    create() {
        const { chart } = this;
        const { x, y } = this.getXY();

        this.svg = chart.renderer
            .label(this.title, x, y)
            .css(SvgAxisTitle.css)
            .add();

        this.update();
        return this;
    }

    update() {
        const { x, y } = this.getXY();

        this.svg.attr({
            x: x - this.svg.width / 2,
            y
        });

        return this;
    }
}

class SvgAxisTitleRight extends SvgAxisTitle {
    getXY() {
        const { chart } = this;
        const rightHalfOffset = 100 - halfWidth;
        const x = chart.plotLeft +
                  (chart.plotWidth * (rightHalfOffset + halfWidth / 2) / 100);

        return { x, y: this.y }
    }
}

class SvgBarLabel extends SvgElement {
    static css = {
        color: 'gray',
        'font-size': '12px'
    }

    constructor(chart, point) {
        super(chart);
        this.point = point;
    }

    getXY() {
        const { chart, point } = this;
        const { shapeArgs } = point;

        const x = chart.plotLeft + chart.plotWidth / 2,
            y = shapeArgs.x + chart.plotTop + shapeArgs.width / 2;

        return { x, y };
    }

    create() {
        const { x, y } = this.getXY();

        this.svg = this.chart.renderer
            .label(this.point.category, x, y)
            .css(SvgBarLabel.css)
            .add();

        this.update();
        return this;
    }

    update() {
        const { svg } = this;
        const { x, y } = this.getXY();

        svg.attr({
            x: x - svg.width / 2,
            y: y - svg.height / 2
        });

        return this;
    }
}


const chartEvents = {
    render: function() {
        const chart = this;

        if (chart.svgElements) {
            chart.svgElements.forEach(e => e.update());
            return;
        }

        chart.svgElements = [];

        chart.series[0].points.forEach(point => {
            const label = new SvgBarLabel(chart, point);
            label.create();
            chart.svgElements.push(label);
        });

        const leftAxisTitle = new SvgAxisTitle(
            chart,
            'Manegrial Position'
        ).create();

        chart.svgElements.push(leftAxisTitle);

        const rightAxisTitle = new SvgAxisTitleRight(
            chart,
            'Non Manegrial Position'
        ).create();

        chart.svgElements.push(rightAxisTitle);
    },

    destroy: function() {
        this.svgElements?.forEach(e => e.destroy());
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
        width: `${halfWidth}%`,
        max: yMaxValue,
        reversed: true,
        title: { text: null }
    }, {
        width: `${halfWidth}%`,
        left: `${100 - halfWidth}%`,
        offset: 0,
        max: yMaxValue,
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
        data: Array(5).fill(yMaxValue),
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
        data: Array(5).fill(yMaxValue),
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
