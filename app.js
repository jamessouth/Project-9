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
		let cumuTotals = [];
		let totals = 0;
		
		for(let i = 0; i < duration; i++){
			let datum = Math.floor(Math.random() * 6000) + 50;
			// console.log(datum);
			lineLabels.push(moment('2017-01-01 00').add(i, timeUnits));
			datArray.push(datum);
			// console.log(datArray);
			totals += datum;
			console.log(totals/(i+1));
			cumuTotals.push(totals);
			// console.log(cumuTotals);
		}
		return [lineLabels, datArray, cumuTotals];
	}
	
	let info = labelAndDataFactory();
	
	let lineChart = new Chart(lineChartCtx, {
		type: 'line',
		data: {
			
			labels: info[0],
			datasets: [{
				label: '',
				data: info[1],
				backgroundColor: 'rgba(115,119,191,0.3)',
				lineTension: 0,
				borderColor: '#7377BF',
				borderWidth: 1,
				pointRadius: ptRadius,
				pointBorderWidth: 2,
				pointBorderColor: '#7377BF',
				pointBackgroundColor: '#fbfbfb',
				pointHoverRadius: ptRadius,
				yAxisID: 'left'
			},
			{
				label: '',
				data: info[2],
				fill: false,
				lineTension: 0,
				borderColor: '#ff0000',
				borderWidth: 1,
				pointRadius: 0,
				pointBorderWidth: 0,
				pointHoverRadius: 0,
				yAxisID: 'right'
			}]
		},
		options: {
			
			
			legendCallback: function(lineChart){
				let ul = document.createElement('ul');
				let selfConfig = lineChart.config.data.datasets;
				let pointDiv = document.createElement('div');
				let bgColor = selfConfig[0].pointBackgroundColor;
				pointDiv.style.width = '12px';
				pointDiv.style.height = '12px';
				pointDiv.style.border = '2px solid #7377BF';
				pointDiv.style.backgroundColor = bgColor;
				pointDiv.style.borderRadius = '6px';
				let li = document.createElement('li');
				let p = document.createElement('p');
				p.textContent = 'Users per ' + timeUnits.substring(0, timeUnits.length - 1);
				li.appendChild(pointDiv);
				li.appendChild(p);
				ul.appendChild(li);
					
					
					
				let redLine = document.createElement('hr');
				redLine.style.borderColor = '#ff0000';
				redLine.style.width = '16px';
				redLine.style.display = 'inline-block';
				let li2 = document.createElement('li');
				li2.style.display = 'flex';
				li2.style.alignItems = 'center';
				let p2 = document.createElement('p');
				p2.textContent = 'Total users (rhs)';
				p2.style.paddingLeft = '2px';
				li2.appendChild(redLine);
				li2.appendChild(p2);
				ul.appendChild(li2);
					
				
				return ul;
			},
			
			
			
			tooltips: {
				displayColors: false,
				callbacks: {
					
					label: function(tooltipItem, data){
						
						return 'Users: ' + data.datasets[0].data[tooltipItem.index];
					},
					
					footer: function(tooltipItem, data){
						let runningTotal = 0;
						
						for(let i = 0; i <= tooltipItem[0].index; i++){
							
							runningTotal += data.datasets[0].data[i];
							
						}
						// console.log(info[2]);
						return 'Running Total: ' + runningTotal;
					}
					
				}
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
						min: 0,
						
						callback: function(value){
							return value > 0 ? value / 1000 + 'k' : 0;
						}
					},
					position: 'left',
					id: 'left'
				},
				{
					ticks: {
						min: 0,
						callback: function(value){
							return value > 0 ? value / 1000 + 'k' : 0;
						}
					},
					position: 'right',
					id: 'right',
					gridLines:{
						drawOnChartArea: false
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
						max: info[0][duration - 1],
						unit: timeUnits.substring(0, timeUnits.length - 1)
					}
					
					
					
				}]
			}
		}
	});


	let lineChartLegend = lineChart.generateLegend();
	lineLegendDiv.appendChild(lineChartLegend);




	return lineChart;




}

// H:00  MMM D
chartFactory('days',31,`MMM D`);
















































































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







