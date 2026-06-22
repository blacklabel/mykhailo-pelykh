const data = generateData({ start: Date.now() - 120000 });  // Historical data 2min back
const live = LiveDataProvider(1000);                        // Live data every 1s

const defaultButtons = 
    Highcharts.getOptions().stockTools?.gui?.buttons || [];

const chartEvents = {
    load: function() {
        const chart = this;
        const liveButton = document.querySelector('.highcharts-live-btn button');

        liveButton?.addEventListener('click', () => {
            !live.isSubscribed() ? 
                live.subscribe() : 
                live.unsubscribe();
        });

        live.onData(data => {
            const p = data.at(-1);
            const series = chart.get('price-data');
            series?.addPoint(p, true, false);
        });

        live.subscribe();
    }
}

Highcharts.setOptions({
    time: {
        useUTC: false
    }
});

const chart = Highcharts.stockChart('container', {
    chart: {
        height: 500,
        events: chartEvents
    },
    xAxis: {
        type: 'datetime'
    },
    rangeSelector: {
        selected: 5,
        buttons: [{
            type: 'minute',
            count: 1,
            text: '1m'
        }, {
            type: 'minute',
            count: 3,
            text: '3m'
        }, {
            type: 'minute',
            count: 6,
            text: '6m'
        },  {
            type: 'ytd'
        }, {
            type: 'all'
        }]
    },
    stockTools: {
        gui: {
            buttons: [
                'liveButton',
                ...defaultButtons
            ],
            definitions: {
                liveButton: {
                    className: 'highcharts-live-btn',
                    symbol: '/live.svg',
                }
            }
        }
    },
    series: [{
        id: 'price-data',
        data
    }]
});

function generateData(options = {}) {
    const defaults = { 
        start: Date.now(), 
        end: Date.now(), 
        step: 1000 
    }
    const { start, end, step } = { ...defaults, ...options };

    const { floor, random } = Math;
    const startR = floor(start / step);
    const endR = floor(end / step);

    const data = [];
    for (let d = startR; d <= endR; d++) {
        data.push([
            d * step,             // datetime
            floor(random() * 100) // int 0...100
        ]);
    }

    return data;
}

function LiveDataProvider(unit = 1000) {
    let _unit = unit,
        _onDataCb = null,
        _intervalId = null,
        _lastDataTimestamp;

    return {
        subscribe(unit = _unit) {
            this.setUnit(unit);
            _lastDataTimestamp = Math.floor(Date.now() / _unit) * _unit;

            _intervalId = setInterval(() => {
                if (_lastDataTimestamp + _unit > Date.now()) return;
                const data = generateData({ step: _unit });
                _lastDataTimestamp = data.at(-1)[0];
                _onDataCb?.(data);
            }, 100);
        },
        onData(fn) {
            _onDataCb = fn;
        },
        unsubscribe() {
            clearInterval(_intervalId);
            _intervalId = null;
        },
        isSubscribed() {
            return _intervalId != null;
        },
        setUnit(u) { _unit = u; },
        get unit() { return _unit; }
    };
}
