let ptRadius = 4;

const links = document.querySelectorAll('div > header li a');
const appName = document.querySelector('div > main > div:first-child > h1');
const alertButton = document.querySelector('.alert-div > button');
const alertDiv = document.querySelector('.alert-div');
// const alertDivKids = Array.from(alertDiv.children);
const lineChartCtx = document.querySelector('.line-chart > canvas:nth-of-type(1)').getContext('2d');

let lineLegendDiv = document.querySelector('.line-legend');







links.forEach(li => {
	li.addEventListener('click', function(){
		for(let i = 0; i < links.length; i++){
			links[i].classList.remove('selected');
		}
		this.className = 'selected';
		let app = this.childNodes[0].getAttribute('alt').split(' ')[0];
		app = app[0].toUpperCase() + app.substring(1);
		appName.textContent = app;
	});
});

alertButton.addEventListener('click', () => {
	alertDiv.style.opacity = '0';
	window.setTimeout(() => {
		alertDiv.style.lineHeight = '0px';
		alertButton.style.height = '0px';
		// alertDiv.addEventListener('transitionend', () => alertDiv.style.display = 'none');
	}, 1501);
});



let chartFactory = function(timeUnits, duration, toolTipFormat){
	
	function labelAndDataFactory(){
		let lineLabels = [];
		let datArray = [];
		for(let i = 0; i < duration; i++){
			lineLabels.push(moment('2017-01-01 00').add(i, timeUnits));
			datArray.push(Math.floor(Math.random() * 6000) + 50);
		}
		return [lineLabels, datArray];
	}
	
	

	let lineChart = new Chart(lineChartCtx, {
		type: 'line',
		data: {
			
			labels: labelAndDataFactory()[0],
			datasets: [{
				label: '',
				data: labelAndDataFactory()[1],
				backgroundColor: 'rgba(115,119,191,0.3)',
				lineTension: 0,
				borderColor: '#7377BF',
				borderWidth: 1,
				pointRadius: ptRadius,
				pointBorderWidth: 2,
				pointBorderColor: '#7377BF',
				pointBackgroundColor: '#fbfbfb',
				pointHoverRadius: ptRadius
			}]
		},
		options: {
			
			tooltips: {
				displayColors: false
			},
			
			legend: {
				display: false,
				position: 'bottom'
			},
			title: {
				display: false,
				position: 'top',
				padding: 0,
				text: 'Traffic'
			},
			layout: {
				padding: {
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			},
			scales: {
				yAxes: [{
					ticks: {
						min: 0
					}
				}],
				xAxes: [{
					type: 'time',
					time: {
						displayFormats: {
							hour: `H:00`,
							day: 'MMM D',
							week: 'MMM D',
							month: 'MMM YY'
						},
						tooltipFormat: toolTipFormat,
						max: labelAndDataFactory()[0][duration - 1],
						unit: timeUnits.substring(0, timeUnits.length - 1)
					},
					ticks: {
						// callback: function(){
							// console.log();
						// }
						
						
						
					}
					
					
				}]
			}
		}
	});


	// let lineChartLegend = lineChart.generateLegend();
	// lineLegendDiv.appendChild(lineChartLegend);




	return lineChart;




}


chartFactory('hours',31,`H:00  MMM D`);
















































































// ,
			// {
				// label: '',
				// data: [,,,,].concat(allData.slice(4,9)),
				// backgroundColor: 'rgba(119,191,115,0.3)',
				// lineTension: 0,
				// borderColor: '#7377BF',
				// borderWidth: 1,
				// pointRadius: ptRadius,
				// pointBorderWidth: 2,
				// pointBorderColor: '#7377BF',
				// pointBackgroundColor: '#fbfbfb',
				// pointHoverRadius: ptRadius
			// },
			// {
				// label: '',
				// data: [,,,,,,,,].concat(allData.slice(8)),
				// backgroundColor: 'rgba(191,115,119,0.3)',
				// lineTension: 0,
				// borderColor: '#7377BF',
				// borderWidth: 1,
				// pointRadius: ptRadius,
				// pointBorderWidth: 2,
				// pointBorderColor: '#7377BF',
				// pointBackgroundColor: '#fbfbfb',
				// pointHoverRadius: ptRadius
			// }

// months: ['June','July','August'],

// legendCallback: function(lineChart){
				// let ul = document.createElement('ul');
				// let selfConfig = lineChart.config.data.datasets;
				// for(let i = 0; i < selfConfig.length; i++){
					// let miniDiv = document.createElement('div');
					// let color = selfConfig[i].backgroundColor;
					// let li = document.createElement('li');
					// let p = document.createElement('p');
					// miniDiv.style.width = '14px';
					// miniDiv.style.height = '12px';
					// miniDiv.style.backgroundColor = color;
					// p.textContent = lineChart.data.months[i];
					// li.appendChild(miniDiv);
					// li.appendChild(p);
					// ul.appendChild(li);
				// }
				// return ul;
			// },







