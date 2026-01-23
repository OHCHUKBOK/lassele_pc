jQuery(function () {
// 처리소요시간
    var optionsProcessingTimeGraph = {
        series: [{data: [100, 99.9, 80.7, 92.1, 3.7, 8]}],
        chart: {
            type: 'bar',
            height: '100%',
            parentHeightOffset: 0,
            toolbar: { show: false },
            fontFamily: 'Pretendard, sans-serif'
        },
        colors: ['#F4B400', '#00C3A5', '#17A673', '#6C7BFF', '#C23BFF', '#00B7FF'],
        plotOptions: {
            bar: {
                horizontal: true,
                distributed: true,
                borderRadiusApplication: 'end',
                barHeight: '35%',
                dataLabels: { position: 'top', }
            }
        },
        legend: { show: false },
        // % 표시
        dataLabels: {
            enabled: true,
            formatter: (val) =>'          ' + val + '%',
            textAnchor: 'start',
            style: { fontSize: '14px',colors: ['#000'] }
        },
        tooltip: { enabled: false },
        xaxis: {
            min: 0,
            max: 100,
            tickAmount: 10,
            categories: ['2H 이내','4H 이내','8H 이내','당일','2일','3일'],
            axisBorder: { show: false },
            axisTicks: { show: false },
            labels: {style: {colors: '#C0C0C0'}}
        },
        yaxis: {
            labels: { style: { fontWeight: 800,fontSize: '14px',colors: '#000',} }
        },
        grid: {
            xaxis: { lines: { show: true } },
            yaxis: { lines: { show: false } },
            padding: { right: 72, top: -30, bottom: -16, left: 0 },
            borderColor: '#EDEDED'
        },
    };//var optionsProcessingTimeGraph
    var processingTimeChart = new ApexCharts(document.querySelector(".processingTimeGraph"), optionsProcessingTimeGraph);
    processingTimeChart.render();


    
    
//지역별 서비스 만족도 현황
    var regionSatisfactionGraph = {
        series: [{
            data: [99, 80.1, 29, 53, 59.8, 48.8, 74.5, 9.4]
        }],
        chart: {
            type: 'bar',
            height: '100%',
            toolbar: { show: false },
            fontFamily: 'Pretendard, sans-serif'
        },
        colors: ['#7FE5D8'],
        plotOptions: {
            bar: {
                columnWidth: '55%',
                dataLabels: {position: 'top' }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val) => (Number.isInteger(val) ? val : val.toFixed(1)) + '%',
            offsetY: -24,       
            style: {fontSize: '18px',fontWeight: 800,colors: ['#111']}
        },
        xaxis: {
            categories: ['서울', '경기', '인천', '강원', '충청', '호남', '영남', '제주'],
            labels: {style: {colors: '#000'}},
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount:10,
            labels: {
                formatter: function (val) {
                    return parseInt(val, 10);
                },
                style: { fontSize: '14px', colors: '#BDBDBD' },
                offsetX: -16,  
            }
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            strokeDashArray: 0,
            padding: { top: -16, right: 0, bottom: -12, left: 0 },  // ✅ 위 라벨 공간 확보
            borderColor: '#EDEDED'
        },
        legend: { show: false },
        tooltip: { enabled: false },
       
    };//regionSatisfactionGraph
    var regionChart = new ApexCharts(document.querySelector(".regionSatisfactionGraph"), regionSatisfactionGraph);
    regionChart.render();


    
    //서비스 만족도
    
    const overallSatisfactionGraph = {
        series: [{
            name: '만족도',
            data: [90, 95, 90.0,52.1]
        }],
        chart: {
            type: 'bar',
            height: '100%',
            toolbar: { show: false },
            fontFamily: 'Pretendard, sans-serif'
        },
        colors: ['#F7E27C'],
        plotOptions: {
            bar: {
                columnWidth: '55%',
                dataLabels: {position: 'top' }
            }
        },
        dataLabels: {
            enabled: true,
            formatter: (val, opts) => {
            const UNITS = ['점', '점', '%', '%'];
            const i = opts.dataPointIndex;
            const unit = UNITS[i] || '';

            const n = Number.isInteger(val) ? val : Number(val).toFixed(1);
            return `${n}${unit}`;
            },
            offsetY: -24,
            style: { fontSize: '18px', fontWeight: 800, colors: ['#111'] }
        },

        xaxis: {
            categories: ['상담원 만족', '서비스 만족', '제품 추천율','제품 추천율'],
            labels: {style: {colors: '#000'}},
            axisBorder: { show: false },
            axisTicks: { show: false }
        },
        yaxis: {
            min: 0,
            max: 100,
            tickAmount:10,
            labels: {
                formatter: function (val) {
                    return parseInt(val, 10);
                },
                style: { fontSize: '14px', colors: '#BDBDBD' },
                offsetX: -16,  
            }
        },
        grid: {
            xaxis: { lines: { show: false } },
            yaxis: { lines: { show: true } },
            strokeDashArray: 0,
            padding: { top: -16, right: 0, bottom: -12, left: 0 },  // ✅ 위 라벨 공간 확보
            borderColor: '#EDEDED'
        },
        legend: { show: false },
        tooltip: { enabled: false },
    };

    var overallChart = new ApexCharts(document.querySelector(".overallSatisfactionGraph"), overallSatisfactionGraph);
    overallChart.render();

});
