const data = [
  { name: 'Commerce', y: 52 },
  { name: 'Engineering', y: 20 },
  { name: 'Financial Services', y: 15 },
  { name: 'Logistics, Aviation & Shipping', y: 5 },
  { name: 'Seafood & Marine', y: 7 },
  { name: 'Corporate Services & others', y: 1 }
];

Highcharts.Pointer.prototype.reset = function() {
    return undefined;
};

Highcharts.chart('container', {
    chart: {
        type: 'pie',
        events: {
            load: function() {
                const chart = this;
                const { series } = chart;
                const legendItems = chart.legend.allItems;

                chart.customTooltips = [ chart.tooltip ];
                series.slice(1).forEach(s => {
                    const tooltip = new Highcharts.Tooltip(chart, {
                        ...chart.options.tooltip,
                        animation: false
                    });
                    tooltip.pointer = chart.tooltip.pointer;
                    chart.customTooltips.push(tooltip);
                });

                legendItems?.forEach(legendItem => {
                    const legendGroup = legendItem.legendItem?.group;
                    if (!legendGroup?.element) return;
                    const legendItemElement = legendGroup.element;

                    legendItemElement.addEventListener('mouseover', (e) => {
                        if (!legendItem.visible) return;

                        const activePoints = series.flatMap(s => {
                            const point = s.points[legendItem.index];
                            point.onMouseOver();
                            return point;
                        });

                        activePoints.forEach((p, i) =>
                            chart.customTooltips[i].refresh(p));
                    });

                    legendItemElement.addEventListener('mouseout', () => {
                        series.forEach(s => {
                            s.points.forEach(point => {
                                if (legendItem.index !== point.index) {
                                    point.onMouseOut();
                                    point.setState('normal');
                                }
                            });
                        });

                        chart.customTooltips.forEach(t => t.hide(0));
                    });
                });
            }
        }
    },
    tooltip: {
        animation: false
    },
    plotOptions: {
        pie: {
            dataLabels: {
                enabled: false
            },
            showInLegend: true,
            point: {
                events: {
                    mouseOver: function() {
                        const point = this;
                        const { chart } = this.series;
                        const activePoints = [point];

                        chart.series.forEach(s => {
                            if (point.series.index !== s.index) {
                                s.points[point.index].setState('hover');
                                activePoints.push(s.points[point.index]);
                            }
                        });

                        activePoints.forEach((p, i) =>
                            chart.customTooltips[i].refresh(p));
                    },
                    mouseOut: function() {
                        const point = this;
                        const { chart } = this.series;

                        chart.customTooltips.forEach(t => t.hide(0));
                    }
                }
            }
        }
    },
    series: [
    {
        data,
        center: ['25%', '50%'],
        point: {
            events: {
                legendItemClick: function() {
                    const { point } = this;
                    const { chart } = this.series;

                    chart.series.forEach(s => {
                        if (point.series.index === s.index) return;
                        const nextPoint = s.points[point.index];
                        nextPoint.setVisible(point.visible, false);
                        if (!point.visible) nextPoint.setState('inactive');
                    });

                    chart.customTooltips.forEach(t => t.hide(0));
                    chart.redraw();
                }
            }
        }
    },
    {
        data,
        center: ['75%', '50%'],
        showInLegend: false
    },
  ]
});
