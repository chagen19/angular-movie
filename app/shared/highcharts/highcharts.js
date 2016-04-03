function loadChart() {
$scope.chartConfig = {
        options: {
            chart: {
                type: 'solidgauge',
                height: 200
            },
            pane: {
                center: ['50%', '50%'],
                size: '100%',
                startAngle: -90,
                endAngle: 90,
                background: {
                    backgroundColor:'#EEE',
                    innerRadius: '60%',
                    outerRadius: '100%',
                    shape: 'arc'
                }
            },
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        },
        series: [{
            data: [$scope.movie.vote_average],
            dataLabels: {
	        	format: '<div style="text-align:center"><span style="font-size:12px;color:black">{y}/10</span></div>'
	        }
        }],
        title: {
            text: 'Average Rating'
        },
        yAxis: {
            currentMin: 0,
            currentMax: 10,    
			stops: [
                [0.1, '#DF5353'], // red
	        	[0.5, '#DDDF0D'], // yellow
	        	[0.9, '#55BF3B'] // green
			],
			lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            labels: {
                y: 16
            }
        },
        loading: false
    }
}