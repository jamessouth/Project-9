

const links = document.querySelectorAll('div > header li a');
const appName = document.querySelector('div > main > div:first-child > h1');
const alertButton = document.querySelector('.alert-div > button');
const alertDiv = document.querySelector('.alert-div');
const lineChartDiv = document.querySelector('.line-chart');
const lineChartCtx = document.querySelector('.line-chart > canvas:nth-of-type(1)').getContext('2d');

const lineLegendDiv = document.querySelector('.line-legend');
const lineTypes = document.querySelectorAll('.line-buttons button');
let lineChart;

const barChartCtx = document.querySelector('.bar-chart > canvas').getContext('2d');
const dailyTraffic = document.querySelector('.bar_donut > p:first-of-type');
const dailyTrafficButton = document.querySelector('.bar_donut > button');

const donutChartCtx = document.querySelector('.donut-chart > canvas').getContext('2d');


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





lineTypes.forEach(li => {
	li.addEventListener('click', function(){
		for(let i = 0; i < lineTypes.length; i++){
			lineTypes[i].classList.remove('line-selected');
		}
		this.className = 'line-selected';
		lineChart.destroy();
		lineLegendDiv.innerHTML = '';
		let lineObjectIndex = Array.from(lineTypes).indexOf(this);
		// lineChartDiv.innerHTML = '<canvas></canvas>';
		
		
		lineChart = new Chart(lineChartCtx, lineTypesArray[lineObjectIndex]);
		makeLegend(lineChart);
		
		
		
		
	});
});


function makeLegend(lineChart){
	
	let lineChartLegend = lineChart.generateLegend();
	lineLegendDiv.appendChild(lineChartLegend);
};


function chartFactory(chartType, timeUnits, duration, toolTipFormat, dataMultiplier){
	
	let ptRadius = 3;
	let easingStyles = ['linear', 'easeOutBounce','easeOutBack', 'easeInOutElastic', 'easeOutCirc', 'easeOutSine', 'easeOutQuint', 'easeOutCubic', 'easeInOutQuart', 'easeInQuad', 'easeInOutExpo'];
	
	
	let info = function labelAndDataFactory(){
		let lineLabels = [];
		let datArray = [];
		let cumuTotals = [];
		let averages = [];
		let totals = 0;
		
		for(let i = 0; i < duration; i++){
			let datum = Math.floor(Math.random() * 6000) + 50;
			datum *= dataMultiplier;
			datum = Math.round(datum);
			lineLabels.push(moment('2017-01-01 00').add(i, timeUnits));
			
			datArray.push(datum);
			
			totals += datum;
			averages.push(Math.round(totals/(i+1)));
			cumuTotals.push(totals);
			
		}
		return [lineLabels, datArray, cumuTotals, averages];
	}();
	
	if(chartType === 'line'){
	
		return {

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
					borderWidth: 2,
					pointRadius: 0,
					pointBorderWidth: 0,
					pointHoverRadius: 0,
					yAxisID: 'right'
				},
				{
					label: '',
					data: info[3],
					fill: false,
					lineTension: 0,
					borderColor: '#00ff00',
					borderWidth: 2,
					pointRadius: 0,
					pointBorderWidth: 0,
					pointHoverRadius: 0,
					yAxisID: 'left'
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
					
					let greenLine = document.createElement('hr');
					greenLine.style.borderColor = '#00ff00';
					greenLine.style.width = '16px';
					greenLine.style.display = 'inline-block';
					let li3 = document.createElement('li');
					li3.style.display = 'flex';
					li3.style.alignItems = 'center';
					let p3 = document.createElement('p');
					p3.textContent = 'Average users (lhs)';
					p3.style.paddingLeft = '2px';
					li3.appendChild(greenLine);
					li3.appendChild(p3);
					ul.appendChild(li3);
						
					
					return ul;
				},
				
				
				
				tooltips: {
					backgroundColor: '#000',
					displayColors: false,
					titleFontColor: '#7377BF',
					titleFontSize: 13,
					bodyFontColor: '#ff0000',
					bodyFontStyle: 'bold',
					bodyFontSize: 13,
					titleMarginBottom: 2,
					footerMarginTop: 2,
					footerFontColor: '#00ff00',
					callbacks: {
						
						title: function(tooltipItem, data){
							
							return [tooltipItem[0].xLabel, 'Users: ' + data.datasets[0].data[tooltipItem[0].index].toLocaleString()];
						},
						
						
						label: function(tooltipItem, data){
							
							
							return 'Total: ' + data.datasets[1].data[tooltipItem.index].toLocaleString();
						},
						
						footer: function(tooltipItem, data){
							return 'Average: ' + data.datasets[2].data[tooltipItem[0].index].toLocaleString();
						}
						
					}
				},
				
				animation: {
					easing: easingStyles[Math.max(...info[1]) % easingStyles.length]
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
								
								if(value > 0){
									if(value >= 1000000){
										return value / 1000000 + 'MM';
									} else if(value >= 1000){
										return value / 1000 + 'k';
									} else{
										return value;
									}
									
								} else{
									return 0;
								}
								
								
							}
						},
						position: 'left',
						id: 'left'
					},
					{
						ticks: {
							min: 0,
							callback: function(value){
								
								if(value > 0){
									if(value >= 1000000){
										return value / 1000000 + 'MM';
									} else if(value >= 1000){
										return value / 1000 + 'k';
									} else{
										return value;
									}
									
								} else{
									return 0;
								}
								
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
								month: 'MMM YYYY'
							},
							tooltipFormat: toolTipFormat,
							max: info[0][duration - 1],
							unit: timeUnits.substring(0, timeUnits.length - 1)
						}
					}]
				}
			}
		
		};
	}
	
	if(chartType === 'bar'){
		
		return{
			
			type: 'bar',
			data: {
				labels: info[0],
				datasets: [{
					label: '',
					data: info[1],
					backgroundColor: '#7377BF'
					
				}]
				
				
				
			},
			options: {
				
				tooltips: {
					displayColors: false,
					callbacks: {
						title: function(tooltipItem, data){
							
							if(timeUnits === 'months'){
							
								return data.labels[tooltipItem[0].index].format('MMMM YYYY');
							} else if(timeUnits === 'weeks'){
								return `Week of: ${data.labels[tooltipItem[0].index].format('MMMM D')}`;
							} else {
								return data.labels[tooltipItem[0].index].format(toolTipFormat);
							}
						},
						
						
						label: function(tooltipItem, data){
							
							
							return 'Users: ' + data.datasets[0].data[tooltipItem.index].toLocaleString();
						}
					}
				},
				
				animation: {
					easing: easingStyles[Math.max(...info[1]) % easingStyles.length]
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
								
								if(value > 0){
									if(value >= 1000000){
										return value / 1000000 + 'MM';
									} else if(value >= 1000){
										return value / 1000 + 'k';
									} else{
										return value;
									}
									
								} else{
									return 0;
								}
								
								
							}
						},
						position: 'left'
						
					},
					{
						ticks: {
							callback: function(value){
								return '';
							}
						},
						position: 'right',
						gridLines:{
							drawOnChartArea: false,
							drawTicks: false
						}
					}],
					
					xAxes: [{
						barPercentage: 0.7,
						ticks: {
							callback: function(value){
								let tickName = value.format(toolTipFormat);
								
								if(timeUnits === 'days'){
									if(tickName[1] === 'h'){
										return tickName.substring(0,2);
									} else {
										return tickName[0];
									}
								} else {
									return tickName;
								}
							}
						}
					}]
					
					
					
					
				}
			}
		
		};
	}

	if(chartType === 'doughnut'){
		
		return {
			
			type: 'doughnut',
			data: {
				labels: ['Phones', 'Tablets', 'Desktop'],
				datasets: [{
					label: '',
					data: info[1],
					borderWidth: [0,0,0],
					backgroundColor: ['#74B1BF', '#81C98F', '#7377BF']
					
				}]
			},
			options: {
				
				rotation: Math.floor(Math.random() * 100)/10 * Math.PI,
				cutoutPercentage: 55,
				animation: {
					animateScale: true
				},
				
				legend: {
					labels: {
						boxWidth: 20
					}
				},
				
				tooltips: {
					displayColors: false,
					callbacks: {
						label: function(tooltipItem, data){
							
							let dataSet = data.datasets[0].data;
							// console.log(dataSet);
							let dataPoint = dataSet[tooltipItem.index].toLocaleString();
							// console.log(typeof dataPoint);
							let sum = dataSet.reduce((a,b) => {return a+b;},0);
							
							// console.log(typeof sum);
							
							
							return data.labels[tooltipItem.index] + ': ' + dataPoint + `  (${(Math.round((dataSet[tooltipItem.index] / sum)*10000))/100}%)`;
						}
					}
				}
			}
			
			
		};
	
	
	}
	
}
let lineTypesArray = [];
let barTypesArray = [];



	
	
let hourLine = chartFactory('line', 'hours', 2, `H:00  MMM D`, 1);
let dayLine = chartFactory('line', 'days', 20, `MMM D`, 24);
let weekLine = chartFactory('line', 'weeks', 2, `MMM D`, 24*7);
let monthLine = chartFactory('line', 'months', 2, `MMM YYYY`, 24*7*4.34);
let dayBar = chartFactory('bar', 'days', 7, `dddd`, 24);
let weekBar = chartFactory('bar', 'weeks', 8, `MMM D`, 24*7);
let monthBar = chartFactory('bar', 'months', 6, `MMM 'YY`, 24*7*4.34);

let donut = chartFactory('doughnut', 'days', 3, 'dddd', 24);

lineTypesArray.push(hourLine);
lineTypesArray.push(dayLine);
lineTypesArray.push(weekLine);
lineTypesArray.push(monthLine);
barTypesArray.push(dayBar);
barTypesArray.push(weekBar);
barTypesArray.push(monthBar);

lineChart = new Chart(lineChartCtx, hourLine);

makeLegend(lineChart);

barChart = new Chart(barChartCtx, dayBar);
donutChart = new Chart(donutChartCtx, donut);



document.addEventListener('DOMContentLoaded', function(){
	let timer = null;
	let cnt = 1;
	let times = ['daily', 'weekly', 'monthly'];
	
	function nextChart(){
		barChart.destroy();
		
		barChart = new Chart(barChartCtx, barTypesArray[cnt % 3]);
		dailyTraffic.textContent = times[cnt % 3] + ' traffic';
		cnt++;
		start();
	};
	
	function start(){
		timer = setTimeout(nextChart, 5000);
	};
	
	function stop(){
		clearTimeout(timer);
	};
	
	dailyTrafficButton.addEventListener('click', function(){
		
		
		
		if(this.innerHTML === 'pause'){
			this.innerHTML = 'play';
			stop();
		} else {
			this.innerHTML = 'pause';
			start();
		}
		
		
		
	});
	
	start();
	
});

































































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







