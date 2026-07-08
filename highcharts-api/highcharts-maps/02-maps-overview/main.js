(async () => {
	const topojson = await fetch(
        'https://code.highcharts.com/mapdata/custom/world-continents.topo.json'
    ).then(res => res.json());

    Highcharts.mapChart('container', {
        chart: {
            height: 600,
            map: topojson,
            events: {
                load() {
                    const chart = this;

                    // Reset View & Selection button
                    const resetViewBtn = document.getElementById('reset-view');
                    resetViewBtn.addEventListener('click', function() {
                        chart.selectedContinent?.update({ color: '#3651d5' }, false);
                        chart.selectedContinent = null;

                        const { zoom, center } = chart.options.mapView;
                        chart.mapView.update({ zoom, center });
                    });

                    // Line around South America
                    const x1 = -83, y1 = -55, x2 = -33, y2 = 13;
                    chart.addSeries({
                        type: 'mapline',
                        enableMouseTracking: false,
                        color: '#e27800',
                        lineWidth: 2,
                        data: [{
                            geometry: {
                                type: 'LineString',
                                coordinates: [
                                    [x1, y1],
                                    [x2, y1],
                                    [x2, y2],
                                    [x1, y2],
                                    [x1, y1]
                                ]
                            }
                        }]
                    });

                    // Custom SVG label
                    chart.customLabel = chart.renderer
                        .label('SVG', 0, 0)
                        .attr({ zIndex: 3 })
                        .css({ color: 'red' })
                        .add();

                    chart.customLabel.coords = { x: -64, y: -20 };

                    // Custom SVG circle
                    const r = 6;
                    chart.customCircle = chart.renderer
                        .circle(0, 0, r)
                        .attr({
                            stroke: '#424242',
                            fill: '#ffffff92',
                            zIndex: 3
                        })
                        .css({
                            pointerEvents: 'none'
                        })
                        .add();

                    chart.customCircle.baseR = r;
                    chart.customCircle.lonLat = {
                        lat: -6.18953,
                        lon: 35.76462
                    }
                },
                render() {
                    const { mapView, customLabel, customCircle, plotLeft, plotTop } = this;

                    // Update custom label.
                    if (customLabel) {
                        const { x, y } = mapView.projectedUnitsToPixels(customLabel.coords);

                        customLabel.attr({
                            x: x + plotLeft - customLabel.width / 2,
                            y: y + plotTop - customLabel.height / 2
                        });
                    }

                    // Update custom circle.
                    if (customCircle) {
                        const projected = mapView.lonLatToProjectedUnits(customCircle.lonLat);
                        const { x, y } = mapView.projectedUnitsToPixels(projected);

                        customCircle.attr({
                            x: x + plotLeft,
                            y: y + plotTop,
                            r: customCircle.baseR * mapView.zoom
                        });
                    }
                }
            }
        },
        title: {
            text: 'Highcharts maps overview'
        },
        mapView: {
            zoom: 1.6,
            center: [0, 40]
        },
        mapNavigation: {
            enabled: true,
            enableButtons: false
        },
        legend: {
            enabled: false
        },
        plotOptions: {
            series: {
                states: {
                    inactive: {
                        enabled: false
                    }
                },
            }
        },
        series: [
            {
                name: 'OSM TWM',
                type: 'tiledwebmap',
                provider: {
                    type: 'OpenStreetMap',
                    theme: 'OpenTopoMap',
                    subdomain: 'a'
                }
            },
            {
                data: [
                    ['af', 10],
                    ['eu', 10],
                    ['sa', 10]
                ],
                color: '#3651d5',
                borderColor: 'blue',
                nullColor: 'transparent',
                events: {
                    click(e) {
                        const chart = this.chart;
                        const currentPoint = e.point;

                        if (chart.selectedContinent) {
                            chart.selectedContinent.update({ color: '#3651d5' }, false);
                        }
                        chart.selectedContinent = currentPoint;
                        currentPoint.update({ color: 'transparent' }, false);
                        chart.mapView.fitToBounds(currentPoint.bounds);
                    }
                }
            },
            {
                type: 'mappoint',
                name: 'Mappoints',
                enableMouseTracking: false,
                color: '#0ced5e',
                data: [{
                    name: 'Accra',
                    id: 'accra',
                    lat: 5.55124,
                    lon: -0.18402
                }, {
                    name: 'Dodoma',
                    id: 'dodoma',
                    lat: -6.18953,
                    lon: 35.76462
                }]
            },
            {
                type: 'flowmap',
                linkedTo: ':previous',
                minWidth: 4,
                maxWidth: 10,
                growTowards: true,
                enableMouseTracking: false,
                fillColor: '#0ced5e',
                color: '#0ced5e',
                weight: 10,
                markerEnd: {
                    width: '60%',
                    height: '60%'
                },
                data: [{
                    from: 'accra',
                    to: 'dodoma'
                }]
            }
        ]
    });

})();
