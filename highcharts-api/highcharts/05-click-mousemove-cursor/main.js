const config = {
    circle: {
        r: 5,
        attr: {
            fill: 'blue',
            stroke: 'black',
            zIndex: 5
        }
    },
    label: {
        attr: {
            zIndex: 5,
            paddingLeft: 3,
        },
        css: {
            fontSize: '14px',
        },
    }
}

const chartEvents = {
    load: function() {
        const chart = this;
        
        Highcharts.addEvent(chart.container, 'mousemove', e => {
            chart.hoverCircle?.destroy();

            chart.hoverCircle = chart.renderer
                .circle(e.chartX, e.chartY, config.circle.r)
                .attr(config.circle.attr)
                .add();
        });

        Highcharts.addEvent(chart.container, 'mouseleave', e => {
            chart.hoverCircle?.destroy();
        });

        Highcharts.addEvent(chart.container, 'mousedown', e => {
            const { chartX, chartY } = e;
            const valueX = chart.xAxis[0].toValue(chartX);
            const valueY = chart.yAxis[0].toValue(chartY);

            chart.markerCircles ||= [];
            chart.markerLabels ||= [];
            
            let circle = chart.renderer
                .circle(chartX, chartY, config.circle.r)
                .attr(config.circle.attr);

            circle.valueX = valueX;
            circle.valueY = valueY;

            let label = chart.renderer
                .label(`x: ${valueX.toFixed(2)}, y: ${valueY.toFixed(2)}`)
                .attr(config.label.attr)
                .css(config.label.css);

            label.valueX = valueX;
            label.valueY = valueY;

            chart.markerCircles.push(circle.add());
            chart.markerLabels.push(label.add());
            setMarkerLabelPosition(label, chartX, chartY);
        });
    },
    render: function() {
        const chart = this;

        chart.markerCircles?.forEach(circle => 
            setCirclePosition(
                circle,
                chart.xAxis[0].toPixels(circle.valueX),
                chart.yAxis[0].toPixels(circle.valueY)
            )
        );

        chart.markerLabels?.forEach(label => 
            setMarkerLabelPosition(
                label,
                chart.xAxis[0].toPixels(label.valueX),
                chart.yAxis[0].toPixels(label.valueY)
            )
        );
    }
}

const chartOptions = {
    chart: {
        type: 'line',
        events: chartEvents,
    },
    series: [{
        data: [3, 4, 6, 7, 4, 3, 5, 3, 2]
    }]
}

Highcharts.chart('container', chartOptions);   

function setMarkerLabelPosition(label, chartX, chartY) {
    return label.attr({
        x: chartX + config.circle.r,
        y: chartY - label.getBBox().height / 2
    });
}

function setCirclePosition(circle, chartX, chartY) {
    return circle.attr({
        cx: chartX, 
        cy: chartY
    });
}