const data = document.getElementById('csv').innerHTML;
const T_UNITS = [ 'C', 'F' ];
let currentTUnit = 1;

const toMinutes = value => {
    const [h, m] = value.split(':').map(Number);
    return h * 60 + m;
};

const toTimeStr = minutes => {
    const h = Math.floor(minutes / 60),
          m = minutes % 60;
    const toStr = v => String(v).padStart(2, '0');
    return `${toStr(h)}:${toStr(m)}`;
};

const chart = Highcharts.chart('container', {
    chart: {
        events: {
            load() {
                const chart = this;

                chart.tUnitSwitchBtn = chart.renderer
                    .button(T_UNITS[currentTUnit], 0, 0, function() {
                        const temperatureSeries = [];
                        chart.series.forEach(s => {
                            if (s.name === 'tempC') temperatureSeries[0] = s;
                            if (s.name === 'tempF') temperatureSeries[1] = s;
                        });

                        temperatureSeries[currentTUnit].hide();

                        currentTUnit ^= 1;

                        this.attr({
                            text: T_UNITS[currentTUnit]
                        });
                        chart.yAxis[0].axisTitle.attr({
                            text: T_UNITS[currentTUnit]
                        });

                        temperatureSeries[currentTUnit].show();
                    })
                    .add();
            }
        }
    },
    title: {
        text: 'Temperature'
    },
    yAxis: [{
        title: { text: T_UNITS[currentTUnit] },
        height: '45%',
        lineWidth: 2,
        labels: {
            formatter() {
                return this.value + '°' + T_UNITS[currentTUnit];
            }
        }
    }, {
        title: { text: 'Rainfall' },
        height: '45%',
        top: '55%',
        offset: 0,
        lineWidth: 2,
        labels: {
            formatter() {
                return toTimeStr(this.value);
            }
        }
    }],
    legend: {
        enabled: false
    },
    data: {
        csv: data,
        firstRowAsNames: true,
        itemDelimiter: ',',
        parsed(columns) {
            columns.forEach(col => {
                const colName = col[0];
                if (colName === 'rainStart' || colName === 'rainEnd') {
                    for (let i = 1; i < col.length; i++) {
                        col[i] = toMinutes(col[i]);
                    }
                }
            });
        },
        complete(options) {
            let tempF = {
                visible: T_UNITS[currentTUnit] === 'F'
            };
            let tempC = {
                visible: T_UNITS[currentTUnit] === 'C'
            };
            let rainfall = {
                yAxis: 1,
                type: 'columnrange',
                name: 'rainfall',
                pointStart: 0,
                data: [],
                tooltip: {
                    pointFormatter() {
                        return `
                            <span style="color:${this.color}">●</span>
                            ${this.series.name}: <b>${toTimeStr(this.low)} – ${toTimeStr(this.high)}</b><br/>
                        `;
                    }
                }
            };

            options.series.forEach(s => {
                switch (s.name) {
                    case 'tempC':
                        tempC = { ...tempC, ...s };
                        break;

                    case 'tempF':
                        tempF = { ...tempF, ...s };
                        break;

                    case 'rainStart':
                        rainfall.pointStart = s.pointStart;
                        s.data.forEach((data, i) => {
                            rainfall.data[i] ||= [];
                            rainfall.data[i][0] = data[0];
                            rainfall.data[i][1] = data[1];
                        });
                        break;

                    case 'rainEnd':
                        s.data.forEach((data, i) => {
                            rainfall.data[i] ||= [];
                            rainfall.data[i][2] = data[1];
                        });
                        break;
                }
            });

            options.series = [ tempC, tempF, rainfall ];
        }
    }
});
