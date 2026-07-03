(async () => {
    const geojson = await fetch(
        'https://code.highcharts.com/mapdata/custom/world.geo.json'
    ).then(res => res.json());

    const data1 = [
        ['POL', 100],
        ['USA', 90],
        ['PER', 50],
        ['TZA', 40],
        ['AUS', 1]
    ];

    const data2 = [
        { code3: 'CAN', z: 100 },
        { code3: 'NZL', z: 80 },
        { code3: 'TZA', z: 40 },
        { code3: 'NOR', z: 15 }
    ];

    const chart = Highcharts.mapChart('container', {
        chart: {
            height: 500,
            map: geojson
        },
        mapNavigation: {
            enabled: true
        },
        series: [{
            joinBy: 'iso-a3',
            keys: ['iso-a3'],
            data: data1,
            color: '#3680d5',
        }, {
            type: 'mapbubble',
            joinBy: ['iso-a3', 'code3'],
            data: data2,
            color: '#7f18b7cd'
        }]
    });
})();
