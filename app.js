if(window.performance.navigation.type === 2){
	window.location.reload();
};

const links = document.querySelectorAll('div > header li a');
const appName = document.querySelector('div > main > div:first-child > h1');
const alertButton = document.querySelector('.alert-div > button');
const alertDiv = document.querySelector('.alert-div');
const lineChartDiv = document.querySelector('.line-chart');
const lineChartCtx = document.querySelector('.line-chart > canvas:nth-of-type(1)').getContext('2d');

const lineLegendDiv = document.querySelector('.line-legend');
const donutLegendDiv = document.querySelector('.donut-legend');
const lineTypes = document.querySelectorAll('.line-buttons button');
let lineChart;

const barChartCtx = document.querySelector('.bar-chart > canvas').getContext('2d');
const dailyTraffic = document.querySelector('.bar_donut > p:first-of-type');
const dailyTrafficButton = document.querySelector('.bar_donut > button');

const donutChartCanvas = document.querySelector('.donut-chart > canvas');

const donutChartCtx = donutChartCanvas.getContext('2d');
const donutChartP = document.querySelector('.donut-chart > p');

const newMemberDates = document.querySelectorAll('.new-members .mem-out > p');

const recentActivityTimes = document.querySelectorAll('.rec-activity .act-out > p:nth-of-type(2)');

const slideButtons = document.querySelectorAll('.rec-activity .activity > button');

const alertBell = document.querySelector('body > header > div > button');

const triangle = document.querySelector('.triangle');
const dropdown = document.querySelector('.dropdown');



// const emailOnOffSwitch = document.querySelector('.email_notify div div');
const emailOnLabel = document.querySelector('.email_notify label:first-of-type');
const emailOffLabel = document.querySelector('.email_notify label:last-of-type');
const emailSwitchDiv = document.querySelector('.email_notify div');
const emailRadioOn = document.querySelector('.email_notify input[id="on"]');
const emailRadioOff = document.querySelector('.email_notify input[id="off"]');


// const profileOnOffSwitch = document.querySelector('.public_profile div div');
const profileOnLabel = document.querySelector('.public_profile label:first-of-type');
const profileOffLabel = document.querySelector('.public_profile label:last-of-type');
const profileSwitchDiv = document.querySelector('.public_profile div');
const profileRadioOn = document.querySelector('.public_profile input[id="on"]');
const profileRadioOff = document.querySelector('.public_profile input[id="off"]');



// const autoplayOnOffSwitch = document.querySelector('.barchart_autoplay div div');
const autoplayOnLabel = document.querySelector('.barchart_autoplay label:first-of-type');
const autoplayOffLabel = document.querySelector('.barchart_autoplay label:last-of-type');
const autoplaySwitchDiv = document.querySelector('.barchart_autoplay div');
const autoplayRadioOn = document.querySelector('.barchart_autoplay input[id="on"]');
const autoplayRadioOff = document.querySelector('.barchart_autoplay input[id="off"]');


const saveMessage = document.querySelector('.settings form > div > p');




const saveButton = document.querySelector('.settings form > div button:first-of-type');

const cancelButton = document.querySelector('.settings form > div button:last-of-type');


const settingsDiv = document.getElementsByClassName('settings')[0];

const switches = settingsDiv.querySelectorAll('[data-setting]');

const pointer = document.querySelector('.settings .linechart_default .pointer');

const lineChartDial = document.querySelector('.settings .linechart_default > div');

const lineChartDialRadios = lineChartDial.querySelectorAll('input');


const sendButton = document.querySelector('.messages button');

const userSearchBox = document.querySelector('.messages input');

const userMessageBox = document.querySelector('.messages textarea');

const errorMessageDiv = document.querySelector('.messages form > div');

const errorMessage = document.querySelector('.messages form > div p');

const errorCanvas = document.querySelector('.messages form > div canvas');

const errorCanvasCtx = errorCanvas.getContext('2d');




let dir = 0;
let degs = [-71, -28, 28, 71];
let degCount = 0;


function drawErrorMsg(){
	errorCanvasCtx.beginPath();
	// errorCanvasCtx.strokeStyle = 'black';
	errorCanvasCtx.moveTo(10,40);
	errorCanvasCtx.bezierCurveTo(30,40, 40,30, 40,10);
	errorCanvasCtx.bezierCurveTo(60,40, 80,30, 80,10);
	errorCanvasCtx.bezierCurveTo(85,30, 80,20, 90,10);
	errorCanvasCtx.bezierCurveTo(110,40, 140,30, 130,10);
	errorCanvasCtx.bezierCurveTo(150,30, 160,20, 190,8);
	errorCanvasCtx.bezierCurveTo(170,40, 170,70, 190,80);
	errorCanvasCtx.bezierCurveTo(170,80, 165,90, 185,100);
	errorCanvasCtx.bezierCurveTo(160,90, 150,100, 155,118);
	errorCanvasCtx.bezierCurveTo(150,100, 140,110, 135,120);
	errorCanvasCtx.bezierCurveTo(125,110, 120,125, 130,130);
	errorCanvasCtx.bezierCurveTo(110,120, 115,130, 120,140);
	errorCanvasCtx.bezierCurveTo(110,130, 100,110, 95,148);
	errorCanvasCtx.bezierCurveTo(80,120, 90,130, 75,143);
	errorCanvasCtx.bezierCurveTo(70,110, 50,130, 45,135);
	errorCanvasCtx.bezierCurveTo(40,120, 20,110, 25,140);
	errorCanvasCtx.bezierCurveTo(20,130, 18,120, 8,145);
	errorCanvasCtx.bezierCurveTo(15,120, 10,100, 5,110);
	errorCanvasCtx.bezierCurveTo(16,90, 15,80, 10,65);
	errorCanvasCtx.bezierCurveTo(22,40, 18,60, 10,40);
	
	
	errorCanvasCtx.fillStyle = 'red';
	
	errorCanvasCtx.fill();
	
	
	errorCanvasCtx.lineWidth = '4';
	errorCanvasCtx.stroke();
};

drawErrorMsg();


sendButton.addEventListener('click', function(e){
	
	// console.log(e);
	if(userSearchBox.value === ''){
		errorMessage.textContent = 'USER!';
		// errorMessage.style.color = 'red';
		// errorMessage.style.backgroundColor = 'transparent';
		// errorMessage.style.background = 'radial-gradient( #ff0000 15%, #ffffff 55%, #ff0000 85%)';
		userSearchBox.focus();
	} else if(userMessageBox.value === ''){
		errorMessage.textContent = 'Please type in a message';
		userMessageBox.focus();
	} else {
		errorMessage.textContent = 'Your message has been sent';
	};
	
	errorMessageDiv.style.opacity = '1';
	
	// window.setTimeout(function(){
		// errorMessage.style.opacity = '0';
	// }, 2500);
	
});




function dialSwitch(dial, ptr, radios){

	Array.from(radios).forEach(rb => {
		
		rb.addEventListener('focus', function(e){
			dial.style.outline = '2px solid rgb(229,151,0)';
		});
		
		rb.addEventListener('blur', function(e){
			dial.style.outline = 'none';
		});
	
	});


	dial.addEventListener('click', function(e){
		
		if(e.target.tagName === 'LABEL'){
			e.preventDefault();
		}
		
		
		if(e.isTrusted){
			
			cancelButton.disabled = false;
		
			cancelButton.style.backgroundColor = '#7377bf';
	
			

		};
		
		
		
		
		degCount += 1;
		dir = degCount % degs.length;
		
		ptr.style.transform = 'translateX(-50%) rotate(' + degs[dir] + 'deg)';
		
		radios[dir].checked = true;
		
		
	});

};


dialSwitch(lineChartDial, pointer, lineChartDialRadios);




function makeClick(target){
	let clickEvent = new Event('click');
	target.dispatchEvent(clickEvent);
};


function restoreSettings(){
	
	
	// console.log('run');
	
	
	switches.forEach(switchDiv => {
		
		let settingValue = localStorage.getItem(switchDiv.dataset.setting);
		
		// if(!['on', 'off'].includes(settingValue)){
			// timeValue = settingValue;
		// }
		
		let isOnChecked = switchDiv.querySelectorAll('input')[0].checked === true;
		
		if(!isOnChecked){
			makeClick(switchDiv);
		}
		
		if(settingValue === 'off'){
			makeClick(switchDiv);
		}
		
	});
	
	pointer.style.transform = 'translateX(-50%) rotate(' + degs[0] + 'deg)';

	lineChartDialRadios[0].checked = true;
	
	degCount = 0;
	
	
	
	
	if(localStorage.length > 0){
		let timeIndex = parseInt(localStorage.getItem('dirIndex'), 10);
	
	
		for(let i = 1; i <= timeIndex; i++){
			makeClick(lineChartDial);
			
		}
	}
	
};



saveButton.addEventListener('click', function(e){
	
	
	switches.forEach(div => {
	
		// console.log();
	
		let locStoKey = div.dataset.setting;
	
		let locStoVal = div.querySelector('input:checked').value;
	
		localStorage.setItem(locStoKey, locStoVal);
		
		if(locStoKey === 'timeperiod'){
			localStorage.setItem('dirIndex', dir);
		}
		
	});
	
	cancelButton.style.backgroundColor = '#B2B2B2';
	cancelButton.disabled = true;
	saveMessage.style.opacity = '1';
	
	
	window.setTimeout(function(){
		saveMessage.style.opacity = '0';
	}, 2500);
	
	
	
});





cancelButton.addEventListener('click', function(e){
	
	
	
	
	
	restoreSettings();
	cancelButton.style.backgroundColor = '#B2B2B2';
	cancelButton.disabled = true;

});







function switchClick(div, onLabel, offLabel, radioOn, radioOff){
	
	
	[radioOff, radioOn].forEach(rb => {
		
		rb.addEventListener('focus', function(e){
			div.style.outline = '2px solid rgb(229,151,0)';
		});
		
		rb.addEventListener('blur', function(e){
			div.style.outline = 'none';
		});
	
	});
	
	
	// return function(){

		let switchFlag = true;

		div.addEventListener('click', function(e){
			
			if(e.target.tagName === 'LABEL'){
				e.preventDefault();
			}
			
			// safari?????????????
			
			if(e.isTrusted){
			
				cancelButton.disabled = false;
			
				cancelButton.style.backgroundColor = '#7377bf';
		
			};
			
			if(switchFlag){
				
				// console.log(' now off');
				
				
				onLabel.style.display = 'none';
				offLabel.style.display = 'block';
				offLabel.style.right = '10px';
				offLabel.style.left = 'inherit';
				// onOffSwitch.style.marginRight = '0';
				this.style.background = 'linear-gradient(to bottom right, #ea4e51, #840000)';
				radioOff.checked = true;
				switchFlag = false;
				
			} else {
				onLabel.style.display = 'block';
				// onOffSwitch.style.marginRight = '-10px';
				offLabel.style.display = 'none';
				
				this.style.background = 'linear-gradient(to bottom right, #a6aaf2, #40448c)';
				radioOn.checked = true;
				switchFlag = true;
				
			}
			
		});
	
	
	// }();
	

};


switchClick(emailSwitchDiv, emailOnLabel, emailOffLabel, emailRadioOn, emailRadioOff);

switchClick(profileSwitchDiv, profileOnLabel, profileOffLabel, profileRadioOn, profileRadioOff);

switchClick(autoplaySwitchDiv, autoplayOnLabel, autoplayOffLabel, autoplayRadioOn, autoplayRadioOff);











let donutCtrX;
let donutCtrY;
let donutInnerRadius;
let donutOuterRadius;
let gradientGreen;


window.setTimeout(function(){
	donutChartCanvas.style.opacity = '1';
}, 500);




alertBell.addEventListener('click', showAlerts);


function showAlerts(){
	triangle.style.display = 'block';
	dropdown.style.display = 'block';
	window.setTimeout(() => {
		document.addEventListener('click', hideAlerts);
		alertBell.removeEventListener('click', showAlerts);
	}, 1);
};


function hideAlerts(e){
	if(!dropdown.contains(e.target)){
		triangle.style.display = 'none';
		dropdown.style.display = 'none';
		alertBell.addEventListener('click', showAlerts);
		document.removeEventListener('click', hideAlerts);
	};
};


	
	


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
		makeLegend(lineChart, lineLegendDiv);
		
		
		
		
	});
});


function makeLegend(chart, div){
	
	let chartLegend = chart.generateLegend();
	div.appendChild(chartLegend);
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
					borderWidth: [0,0,0]
					
				}]
			},
			options: {
				responsive: false,
				
				layout: {
					padding: {
						
						left: 10,
						right: 20,
						top: 0,
						bottom: 0
						
					}
					
				},
				
				
				legendCallback: function(donutChart){
					let ul = document.createElement('ul');
					let selfConfig = donutChart.config.data.datasets;
					let colors = ['#73B1BF', '#81C98F', '#7377BF'];
					for(let i = 0; i < selfConfig[0].data.length; i++){
						let miniDiv = document.createElement('div');
						let color = colors[i];
						let li = document.createElement('li');
						let p = document.createElement('p');
						miniDiv.style.width = '26px';
						miniDiv.style.height = '26px';
						miniDiv.style.borderRadius = '4px';
						miniDiv.style.backgroundColor = color;
						p.textContent = donutChart.data.labels[i];
						li.appendChild(miniDiv);
						li.appendChild(p);
						ul.appendChild(li);
					}
					return ul;
				},
				
				
				rotation: Math.floor(Math.random() * 100)/10 * Math.PI,
				cutoutPercentage: 54,
				animation: {
					animateScale: true
					
				},
				
				legend: {
					display: false,
					labels: {
						boxWidth: 20
					}
				},
				
				tooltips: {
					displayColors: false,
					callbacks: {
						label: function(tooltipItem, data){
							
							
							let dataSet = data.datasets[0].data;
							
							let dataPoint = dataSet[tooltipItem.index].toLocaleString();
							
							let sum = dataSet.reduce((a,b) => {return a+b;},0);
							
							
							
							
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





barChart = new Chart(barChartCtx, dayBar);
donutChart = new Chart(donutChartCtx, donut);



donutCtrX = Math.round(donutChartCtx.canvas.clientWidth/2)-8;
donutCtrY = Math.round(donutChartCtx.canvas.clientHeight/2)-7;
donutInnerRadius = Math.round((donutChartCtx.canvas.clientWidth * 0.4879725)/2);
donutOuterRadius = Math.round((donutChartCtx.canvas.clientWidth * 0.8797251)/2)+5;


gradientBlue = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);

gradientBlue.addColorStop(0, '#286573');
gradientBlue.addColorStop(0.45, 'white');
gradientBlue.addColorStop(1, '#286573');


gradientGreen = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);

gradientGreen.addColorStop(0, '#357D43');
gradientGreen.addColorStop(0.45, 'white');
gradientGreen.addColorStop(1, '#357D43');


gradientPurple = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);

gradientPurple.addColorStop(0, '#272b73');
gradientPurple.addColorStop(0.45, 'white');
gradientPurple.addColorStop(1, '#272b73');

//-----------------------------------------------------------------------------

gradientBlue2 = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);

gradientBlue2.addColorStop(0, '#286573');
gradientBlue2.addColorStop(0.45, '#e6e6e6');
gradientBlue2.addColorStop(1, '#0f4c5a');

gradientGreen2 = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);

gradientGreen2.addColorStop(0, '#357d43');
gradientGreen2.addColorStop(0.45, '#e6e6e6');
gradientGreen2.addColorStop(1, '#1c642a');

gradientPurple2 = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);

gradientPurple2.addColorStop(0, '#272b73');
gradientPurple2.addColorStop(0.45, '#e6e6e6');
gradientPurple2.addColorStop(1, '#0e125a');



donut.data.datasets[0].backgroundColor = [gradientBlue, gradientGreen, gradientPurple];


donut.data.datasets[0].hoverBackgroundColor = [gradientBlue2, gradientGreen2, gradientPurple2];

donutChart.update();
makeLegend(donutChart, donutLegendDiv);









const legItems = donutLegendDiv.querySelectorAll('ul li');
let swappedColor;

legItems.forEach(li => {
	li.addEventListener('mouseenter', (e) => {
		
		let liIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
		swappedColor = donut.data.datasets[0].backgroundColor[liIndex];
		donut.data.datasets[0].backgroundColor[liIndex] = donut.data.datasets[0].hoverBackgroundColor[liIndex];
		
		
		
		
		
		
		let dataSet = donut.data.datasets[0].data;
							
		let dataPoint = dataSet[liIndex].toLocaleString();
							
		let sum = dataSet.reduce((a,b) => {return a+b;},0);
							
		let toolTipText = donut.data.labels[liIndex] + ':\n' + dataPoint + '\n' + `(${(Math.round((dataSet[liIndex] / sum)*10000))/100}%)`;
		
		
		
		
		
		donutChartP.textContent = toolTipText;
		
		
		
		
		
		donutChart.update();
	}),
	
	li.addEventListener('mouseleave', (e) => {
		
		let liIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
		donut.data.datasets[0].backgroundColor[liIndex] = swappedColor;

		
		
		donutChartP.textContent = '';
		
		
		
		donutChart.update();
	})
	
	
	
});





document.addEventListener('DOMContentLoaded', function(){
	
	// console.log('fired');
	
	
	
	let barChartAutoplayTurnedOn = localStorage.autoplay === 'on';
	
	let lineChartDefault;
	
	if(localStorage.length > 0){
	
		lineChartDefault = parseInt(localStorage.dirIndex, 10);
	} else {
		lineChartDefault = 0;
	}
	
	
	
	restoreSettings();
	
	lineChart = new Chart(lineChartCtx, lineTypesArray[lineChartDefault]);
	makeLegend(lineChart, lineLegendDiv);
	makeClick(lineTypes[lineChartDefault]);
	
	if(barChartAutoplayTurnedOn){
		dailyTrafficButton.innerHTML = 'pause';
	} else {
		dailyTrafficButton.innerHTML = 'play';
	};
	
	
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
		timer = setTimeout(nextChart, 1500);
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
	
	
	// if(!barChartAutoplayTurnedOn){
		// start();
	// }
});


const hiddenText = document.querySelectorAll('.hidden');

function makeDatesAndTimes(memberDates, actTimes, hidText){
	let rand;
	let rand2;
	let newDt;
	let action;
	let post;
	let newTi;
	let timeAgo;
	
	let remPost;
	
	let dateTime = '';
	let postText = '';
	let acts = ['commented', 'posted', 'liked a post', 'shared a post', 'tweeted a post', 'retweeted a post'];
	
	let posts = [
		'SEO Tips',
		'Facebook\'s Changes for 2017',
		'Moving to AWS',
		'Mobile Web Update'
	];
	
	let comments = [
		'Awesome!',
		'Excellent!',
		'Wow! This is great!',
		'Nice work!',
		'Sweet!'	
	];
	
	
	let dt = moment();
	let ti = moment();
	
	for(let i = 0; i < memberDates.length; i++){
		rand = Math.round(Math.random()*5) + 1;
		newDt = dt.subtract(rand, 'days');
		memberDates[i].textContent = newDt.format('M/D/YY');
		rand2 = Math.round(Math.random()*1139);
		newTi = ti.subtract(rand2, 'minutes');
		action = rand2 % acts.length;
		post = rand2 % posts.length;
		
		timeAgo = newTi.from(moment());
		// console.log(newTi);
		actTimes[i].textContent = acts[action] + ' ' + timeAgo;
		
		// postText = posts[post];
		// postText.style.textDecoration = 'underline';
		// console.log(action);
		dateTime = '<p><span>' + newTi.format('M/D/YY') + ' at ' + newTi.format('HH:mm') + ' -> </span>';
		
		if(action == 1){
			remPost = post;
		};
		
		// console.log(remPost);
		// console.log(posts);
		
		switch(action){
			
			case 0: postText =  dateTime + 'commented on the post <span>' + posts[post] + '</span>: ' + comments[Math.round(rand * rand2 / 7) % comments.length] + '</p>';
			break;
			
			case 1: postText = dateTime + 'posted an article: <span>' + posts[post] + '</span></p>';
			break;
		
			case 2: postText = dateTime + 'liked the post <span>' + posts[post] + '</span></p>';
			break;
		
			case 3: postText = dateTime + 'shared the post <span>' + posts[post] + '</span></p>';
			break;
		
			case 4: postText = dateTime + 'tweeted a link to the post <span>' + posts[post] + '</span></p>';
			break;
		
			case 5: postText = dateTime + 'retweeted the post <span>' + posts[post] + '</span></p>';
			break;
		}
		
		if(remPost){
			posts.splice(remPost, 1);
			remPost = null;
		}
		
		
		
		
		hidText[i].innerHTML = postText;
		
		hidText[i].lastChild.children[0].style.fontWeight = '600';
		hidText[i].lastChild.children[0].style.fontSize = '14px';
		hidText[i].lastChild.children[0].style.letterSpacing = '1px';
		
		hidText[i].lastChild.children[1].style.textDecoration = 'underline';
		hidText[i].lastChild.children[1].style.fontSize = '15px';
		
		
	};
	
};

makeDatesAndTimes(newMemberDates, recentActivityTimes, hiddenText);











slideButtons.forEach(sb => {

	let flag = false;
	
	
	let actout = sb.parentNode.querySelector('.act-out');

	let hidden = sb.parentNode.querySelector('.hidden');
	
	
	// console.log(flag, sb, actout, hidden);
	
	
	sb.addEventListener('click', function(){
		
		if(!flag){
			
			
			
			actout.children[0].style.marginLeft = '0.5em';
			actout.children[1].style.marginLeft = '0.5em';
			
			
			actout.style.transform = 'translateX(-150%)';
			actout.style.opacity = '0';
			hidden.style.transform = 'translateX(25%)';
			hidden.style.opacity = '1';
			
			
			window.setTimeout(function(){
				sb.style.position = 'absolute';
				sb.style.color = '#ff0000';
				sb.style.left = '45px';
			}, 600);
			
			
			flag = true;
		
		} else if(flag){
			
			
			// console.log(actout.offsetWidth);
			
			actout.style.transform = 'translateX(0%)';
			actout.style.opacity = '1';
			hidden.style.transform = 'translateX(500%)';
			hidden.style.opacity = '0';
			window.setTimeout(function(){
				actout.children[0].style.marginLeft = '0';
				actout.children[1].style.marginLeft = '0';
				sb.style.position = 'static';
				sb.style.color = '#7377bf';
				sb.style.left = 'auto';
			}, 1100);
			flag = false;
		
		};
	
	});

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







