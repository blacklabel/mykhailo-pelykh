const minY = 1;
const maxY = 20;
const connectorsWidth = 2;
const seriesCount = 2;
const seriesLength = 6;

const chartSeries = Array.from({ length: seriesCount }, () => ({
    borderWidth: 0,
    data: Array.from({ length: seriesLength }, () => {
        return Math.floor(Math.random() * (maxY - minY + 1) + minY);
    })
}));

const chartEvents = {
    render: function() {
        const chart = this;

        if (chart.connectors) {
            chart.connectors.forEach(c => c.destroy());
        }
        chart.connectors = [];

        chart.series.forEach((series) => {
            if (!series.visible) return;

            const { points } = series;
            
            for (let j = 0; j < points.length - 1; j++) {
                const p1 = points[j];
                const p2 = points[j + 1];

                const x1 = chart.plotLeft + p1.shapeArgs.x + p1.shapeArgs.width;
                const y1 = chart.plotTop + p1.shapeArgs.y + connectorsWidth;
                const x2 = chart.plotLeft + p2.shapeArgs.x;
                const y2 = chart.plotTop + p2.shapeArgs.y + connectorsWidth;

                const connector = chart.renderer.path(['M', x1, y1, 'L', x2, y2])
                    .attr({
                        stroke: series.color,
                        'stroke-width': connectorsWidth,
                        zIndex: 2
                    })
                    .add();

                chart.connectors.push(connector);
            }
        });
    }
}

const chartOptions = {
    chart: {
        type: 'column',
        events: chartEvents
    },
    series: chartSeries
};

Highcharts.chart('container', chartOptions);