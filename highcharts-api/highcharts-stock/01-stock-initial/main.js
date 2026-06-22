(async () => {
  const data = await fetch(
    'https://demo-live-data.highcharts.com/aapl-ohlcv.json'
  ).then((response) => response.json());

  const close = [];

  for (let i = 0; i < data.length; i++) {
    close.push([
      data[i][0], // date
      data[i][4]  // close price
    ]);
  }

  Highcharts.stockChart('container', {
    title: {
      text: 'AAPL Historical',
      align: 'left',
      x: 80
    },

    xAxis: {
      type: 'datetime'
    },

    yAxis: {
      title: {
        text: 'Value'
      }
    },

    rangeSelector: {
      selected: 1,
      buttonSpacing: 6,
      buttonTheme: {
        width: 60
      },
      buttonPosition: {
        align: 'right'
      },
      inputPosition: {
        align: 'left'
      },
      buttons: [{
        type: 'day',
        count: 15,
        text: '15 days',
        title: 'View 15 days'
      }, {
        type: 'month',
        count: 3,
        text: '3 months',
        title: 'View 3 months'
      }, {
        type: 'year',
        count: 1,
        text: '1 year',
        title: 'View 1 year'
      }, {
        type: 'all',
        text: 'All',
        title: 'View all'
      }]
    },

    scrollbar: {
      enabled: false
    },

    exporting: {
      buttons: {
        contextButton: {
          text: 'Menu',
          align: 'left'
        }
      }
    },

    series: [
      {
        type: 'line',
        data: close
      }
    ],

    navigator: {
      height: 40,
      handles: {
        height: 50
      },
      series: {
        type: 'column',
        data: close
      }
    }
  });
})();
