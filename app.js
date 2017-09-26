if(window.performance.navigation.type === 2){  //navigation from the browser's back button, reload allows the settings saved in localStorage to load properly when loading from local files in chrome/opera, but not firefox. could be my settings.
	window.location.reload();
}
let ffx = false;
if(!window.InputEvent.prototype.hasOwnProperty('data')){  //this check along with the first if block in the keydown listener at line 1055 are a 'polyfill' i wrote to enable the data feature of the InputEvent in Firefox
	ffx = true;
	window.InputEvent.prototype.data = null;
}
const cancelButton = document.querySelector('.settings form > div button:last-of-type');
const settingsDiv = document.getElementsByClassName('settings')[0];
const switches = settingsDiv.querySelectorAll('[data-setting]');
const pointer = document.querySelector('.settings .linechart_default .pointer');
const lineChartDial = document.querySelector('.settings .linechart_default > div');
const lineChartDialRadios = lineChartDial.querySelectorAll('input');
let degs = [-71, -28, 28, 71];
let degCount = 0;

(function(){    //alert bell icon
	const alertBell = document.querySelector('body > header > div > button');
	const alertLight = document.querySelector('body > header > div > span');
	const triangle = document.querySelector('.triangle');
	const dropdown = document.querySelector('.dropdown');
	alertBell.addEventListener('click', showAlerts);

	function showAlerts(){
		triangle.style.display = 'block';
		dropdown.style.display = 'block';
		window.setTimeout(() => {
			document.addEventListener('click', hideAlerts);
			alertBell.removeEventListener('click', showAlerts);
		}, 1);
	}

	function hideAlerts(e){
		if(!dropdown.contains(e.target)){
			alertLight.style.display = 'none';
			triangle.style.display = 'none';
			dropdown.style.display = 'none';
			alertBell.addEventListener('click', showAlerts);
			document.removeEventListener('click', hideAlerts);
		}
	}
})();

(function(){   //nav links
	const links = document.querySelectorAll('div > header li a');
	const appName = document.querySelector('div > main > div:first-child > h1');
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
})();

(function(){   //alert box
	const alertButton = document.querySelector('.alert-div > button');
	const alertDiv = document.querySelector('.alert-div');
	alertButton.addEventListener('click', () => {
		alertDiv.style.opacity = '0';
		window.setTimeout(() => {
			alertDiv.style.lineHeight = '0px';
			alertButton.style.height = '0px';
		}, 1501);
		window.setTimeout(() => {
			alertDiv.children[0].style.display = 'none';
			alertButton.style.display = 'none';
		}, 3005);
	});
})();
	
(function(){   //charts
	let lineChart;
	let lineTypesArray = [];
	const lineTypes = document.querySelectorAll('.line-buttons button');
	const lineChartCtx = document.querySelector('.line-chart > canvas:nth-of-type(1)').getContext('2d');
	const lineLegendDiv = document.querySelector('.line-legend');
	let hourLine = chartFactory('line', 'hours', 22, `H:00  MMM D`, 1);
	let dayLine = chartFactory('line', 'days', 21, `MMM D`, 24);
	let weekLine = chartFactory('line', 'weeks', 21, `MMM D`, 24*7);
	let monthLine = chartFactory('line', 'months', 21, `MMM YYYY`, 24*7*4.34);
	lineTypesArray.push(hourLine);
	lineTypesArray.push(dayLine);
	lineTypesArray.push(weekLine);
	lineTypesArray.push(monthLine);

	let barTypesArray = [];
	const barChartCtx = document.querySelector('.bar-chart > canvas').getContext('2d');
	const dailyTraffic = document.querySelector('.bar_donut > p:first-of-type');
	const dailyTrafficButton = document.querySelector('.bar_donut > button');
	let dayBar = chartFactory('bar', 'days', 7, `dddd`, 24);
	let weekBar = chartFactory('bar', 'weeks', 8, `MMM D`, 24*7);
	let monthBar = chartFactory('bar', 'months', 6, `MMM 'YY`, 24*7*4.34);
	barTypesArray.push(dayBar);
	barTypesArray.push(weekBar);
	barTypesArray.push(monthBar);
	let barChart = new Chart(barChartCtx, dayBar);
	
	let donutCtrX;
	let donutCtrY;
	let donutInnerRadius;
	let donutOuterRadius;	
	const donutChartCanvas = document.querySelector('.donut-chart > canvas');
	const donutChartCtx = donutChartCanvas.getContext('2d');
	const donutChartP = document.querySelector('.donut-chart > p');
	const donutLegendDiv = document.querySelector('.donut-legend');
	let donut = chartFactory('doughnut', 'days', 3, 'dddd', 24);
	let donutChart = new Chart(donutChartCtx, donut);
	
	window.setTimeout(function(){
		donutChartCanvas.style.opacity = '1';
	}, 500);

	donutCtrX = Math.round(donutChartCtx.canvas.clientWidth/2)-8;
	donutCtrY = Math.round(donutChartCtx.canvas.clientHeight/2)-7;
	donutInnerRadius = Math.round((donutChartCtx.canvas.clientWidth * 0.4879725)/2);
	donutOuterRadius = Math.round((donutChartCtx.canvas.clientWidth * 0.8797251)/2)+5;
	let gradientBlue = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);
	gradientBlue.addColorStop(0, '#286573');
	gradientBlue.addColorStop(0.45, 'white');
	gradientBlue.addColorStop(1, '#286573');
	let gradientGreen = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);
	gradientGreen.addColorStop(0, '#357D43');
	gradientGreen.addColorStop(0.45, 'white');
	gradientGreen.addColorStop(1, '#357D43');
	let gradientPurple = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);
	gradientPurple.addColorStop(0, '#272b73');
	gradientPurple.addColorStop(0.45, 'white');
	gradientPurple.addColorStop(1, '#272b73');
	//-----------------------------------------------------------------------------
	let gradientBlue2 = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);
	gradientBlue2.addColorStop(0, '#286573');
	gradientBlue2.addColorStop(0.45, '#e6e6e6');
	gradientBlue2.addColorStop(1, '#0f4c5a');
	let gradientGreen2 = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);
	gradientGreen2.addColorStop(0, '#357d43');
	gradientGreen2.addColorStop(0.45, '#e6e6e6');
	gradientGreen2.addColorStop(1, '#1c642a');
	let gradientPurple2 = donutChartCtx.createRadialGradient(donutCtrX,donutCtrY,donutOuterRadius,donutCtrX,donutCtrY,donutInnerRadius);
	gradientPurple2.addColorStop(0, '#272b73');
	gradientPurple2.addColorStop(0.45, '#e6e6e6');
	gradientPurple2.addColorStop(1, '#0e125a');
	donut.data.datasets[0].backgroundColor = [gradientBlue, gradientGreen, gradientPurple];
	donut.data.datasets[0].hoverBackgroundColor = [gradientBlue2, gradientGreen2, gradientPurple2];
	donutChart.update();
	makeLegend(donutChart, donutLegendDiv);
	
	let donutLightColors = [donut.data.datasets[0].backgroundColor[0], donut.data.datasets[0].backgroundColor[1], donut.data.datasets[0].backgroundColor[2]];
	
	let donutDarkColors = [donut.data.datasets[0].hoverBackgroundColor[0], donut.data.datasets[0].hoverBackgroundColor[1], donut.data.datasets[0].hoverBackgroundColor[2]];
	
	const legItems = donutLegendDiv.querySelectorAll('ul li');
	
	lineTypes.forEach(li => {
		li.addEventListener('click', function(){
			for(let i = 0; i < lineTypes.length; i++){
				lineTypes[i].classList.remove('line-selected');
			}
			this.className = 'line-selected';
			lineChart.destroy();
			lineLegendDiv.innerHTML = '';
			let lineObjectIndex = Array.from(lineTypes).indexOf(this);
			lineChart = new Chart(lineChartCtx, lineTypesArray[lineObjectIndex]);
			makeLegend(lineChart, lineLegendDiv);
		});
	});

	function makeLegend(chart, div){
		let chartLegend = chart.generateLegend();
		div.appendChild(chartLegend);
	}

	function chartFactory(chartType, timeUnits, duration, toolTipFormat, dataMultiplier){

		let ptRadius = 4;
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
						p.textContent = 'Users per ' + timeUnits.substring(0, timeUnits.length - 1) + ' (lhs)';
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
											return '   ' + value / 1000000 + 'm';
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
											return value / 1000000 + 'm';
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
					// responsive: false,
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
											return '   ' + value / 1000000 + 'm';
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
							li.setAttribute("tabindex", "0");
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

	legItems.forEach(li => {
		li.addEventListener('mouseenter', (e) => {
			let liIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
			donut.data.datasets[0].backgroundColor[liIndex] = donutDarkColors[liIndex];
			let dataSet = donut.data.datasets[0].data;
			let dataPoint = dataSet[liIndex].toLocaleString();
			let sum = dataSet.reduce((a,b) => {return a+b;},0);
			let toolTipText = donut.data.labels[liIndex] + ':\n' + dataPoint + '\n' + `(${(Math.round((dataSet[liIndex] / sum)*10000))/100}%)`;
			donutChartP.textContent = toolTipText;
			donutChart.update();
		});
		li.addEventListener('mouseleave', (e) => {
			let liIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
			donut.data.datasets[0].backgroundColor[liIndex] = donutLightColors[liIndex];
			donutChartP.textContent = '';
			donutChart.update();
		});
		li.addEventListener('focus', (e) => {
			let liIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
			donut.data.datasets[0].backgroundColor[liIndex] = donutDarkColors[liIndex];
			let dataSet = donut.data.datasets[0].data;
			let dataPoint = dataSet[liIndex].toLocaleString();
			let sum = dataSet.reduce((a,b) => {return a+b;},0);
			let toolTipText = donut.data.labels[liIndex] + ':\n' + dataPoint + '\n' + `(${(Math.round((dataSet[liIndex] / sum)*10000))/100}%)`;
			donutChartP.textContent = toolTipText;
			donutChart.update();
		});
		li.addEventListener('blur', (e) => {
			let liIndex = Array.from(e.target.parentNode.children).indexOf(e.target);
			donut.data.datasets[0].backgroundColor[liIndex] = donutLightColors[liIndex];
			donutChartP.textContent = '';
			donutChart.update();
		});
	});
	
	let lineChartDefault;
	if(localStorage.length > 0){
		lineChartDefault = parseInt(localStorage.dirIndex, 10);
	} else {
		lineChartDefault = 0;
	}
	lineChart = new Chart(lineChartCtx, lineTypesArray[lineChartDefault]);
	makeLegend(lineChart, lineLegendDiv);
	makeClick(lineTypes[lineChartDefault]);
	
	let barChartAutoplayTurnedOff = localStorage.autoplay === 'off';
	if(barChartAutoplayTurnedOff){
		dailyTrafficButton.innerHTML = 'play';
	} else {
		dailyTrafficButton.innerHTML = 'pause';
	}
	
	let timer = null;
	let cnt = 1;
	let times = ['daily', 'weekly', 'monthly'];
	
	function nextChart(){
		barChart.destroy();
		barChart = new Chart(barChartCtx, barTypesArray[cnt % 3]);
		dailyTraffic.textContent = times[cnt % 3] + ' traffic';
		cnt++;
		start();
	}
	
	function start(){
		timer = setTimeout(nextChart, 3000);
	}
	
	function stop(){
		clearTimeout(timer);
	}
	
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
	
	if(barChartAutoplayTurnedOff){
		stop();
	}
	
})();

(function(){   //recent activity section slide panels and mock content

	const newMemberDates = document.querySelectorAll('.new-members .mem-out > div > p:last-of-type');
	const recentActivityTimes = document.querySelectorAll('.rec-activity .act-out > p:nth-of-type(2)');
	const slideButtons = document.querySelectorAll('.rec-activity .activity > button');
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
		let acts = [
			'commented', 
			'posted', 
			'liked a post', 
			'shared a post', 
			'tweeted a post', 
			'retweeted a post'
		];
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
			actTimes[i].textContent = acts[action] + ' ' + timeAgo;
			dateTime = '<p><span>' + newTi.format('M/D/YY') + ' at ' + newTi.format('HH:mm') + ' -> </span>';
			if(action == 1){
				remPost = post;
			}
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
		}
	}

	makeDatesAndTimes(newMemberDates, recentActivityTimes, hiddenText);

	slideButtons.forEach(sb => {
		let flag = false;
		let actout = sb.parentNode.querySelector('.act-out');
		let hidden = sb.parentNode.querySelector('.hidden');
		sb.addEventListener('click', function(){
			if(!flag){
				actout.style.transform = 'translateX(-150%)';
				actout.style.opacity = '0';
				hidden.style.transform = 'translateX(25%)';
				hidden.style.opacity = '1';
				window.setTimeout(function(){
					sb.classList.remove("rightside");
					sb.classList.add("leftside");
				}, 600);
				flag = true;
			} else if(flag){
				actout.style.transform = 'translateX(0%)';
				actout.style.opacity = '1';
				hidden.style.transform = 'translateX(500%)';
				hidden.style.opacity = '0';
				window.setTimeout(function(){
					sb.classList.remove("leftside");
					sb.classList.add("rightside");
					
				}, 1100);
				flag = false;
			}
		});
	});

})();

function getTimeZones() {   //get time zones via wikipedia api
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", 'https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*');
    xhr.onload = () => {
		if(xhr.status === 200){
			resolve(xhr.response);
		} else {
			reject(Error('error ' + xhr.statusText));
		}
	};
    xhr.onerror = () => {
		reject(Error('network error ' + xhr.statusText));
	};
    xhr.send();
  });
}

function callback(str){   //process time zone data
	function abbrev(match){
		return match[0].toUpperCase();
	}
	function abbrev2(match, p1, p2, p3, p4, p5, string){
		return p1[0].toUpperCase() + p2[0].toUpperCase() + ' ' + p5;
	}
	let reg = new RegExp(/\n*<([^>]*)>\n*/g);
	let res = str.substring(str.indexOf('<tr>'), str.lastIndexOf('</tr>')+5);
	res = res.split('</tr>\n<tr>');
	let f = res.shift();
	for(let i = 0; i < res.length; i++){
		res[i] = res[i].split('</td>\n<td>');
		res[i].splice(1,1);
		[res[i][0], res[i][1], res[i][2]] = [res[i][0].replace(reg, ''), res[i][1].replace(reg, ''), res[i][2].replace(reg, '')];
		if(res[i][1] === ''){
			res[i].splice(1,1);
		}
		if(res[i][2] === ''){
			res[i].splice(2);
		}
		res[i][1] = res[i][1].replace(/\[\d+\]/, '').replace(/ *\(([^\)]*)\)/g, '');
		res[i][1] = res[i][1].split(', ');
		if(res[i][2]){
			res[i][2] = res[i][2].replace(/\[\d+\]/, '').replace(/ *\(([^\)]*)\)/g, '');
			res[i][2] = res[i][2].split(', ');
			res[i] = [res[i][0], ...res[i][1], ...res[i][2]];
		} else {
			res[i] = [res[i][0], ...res[i][1]];
		}
		if(/(south )(?!(africa|korea|sudan))/gi.test(res[i][2])){
			res[i][3] = res[i][2].slice(22).replace(/south/i, 'S');
			res[i][2] = res[i][2].slice(0,13);
		}
		if(/british/i.test(res[i][3])){
			res[i][3] = res[i][3].replace(/\w+ */gi, abbrev);
		}
		if(/demo/i.test(res[i][5])){
			res[i][5] = res[i][5].replace(/(\w+)\s(\w+)\s(\w+)\s(\w+)\s(\w+)/gi, abbrev2);
		}
	}
	return res;
}
	
function createOption(x, element){   //create options for select menu
	let nums = [];
	let y = new Set(x);
	y = [...y];
	if(y.length > 6){
		nums = getRands(5, y.slice(1).length, true);
	} else {
		for(let j = 1; j < y.length; j++){
			nums.push(j);
		}
	}
	for(let i = 0; i < nums.length; i++){
		let opt = document.createElement('option');
		opt.value = y[0] + ' ' + y[nums[i]];
		let textAndValue = y[0] + '\u00A0\u00A0' + y[nums[i]];
		opt.textContent = textAndValue;
		element.appendChild(opt);
	}
}
	
function loadOptions(obj, timezoneSelect){  //load time zone options in select menu
	obj.forEach(x => {
		createOption(x, timezoneSelect);
	});
	timezoneSelect.addEventListener('change', function(e){
		cancelButton.disabled = false;
		cancelButton.style.backgroundColor = '#7377bf';
	});
}

function getRands(element, element2, plusOne){  //returns array of non-repeating random numbers
	let len = element.length || element;
	let nums = new Set();
	if(plusOne){
		while(nums.size < len){
			let n = Math.floor(Math.random() * element2) + 1;
			nums.add(n);
		}
	} else {
		while(nums.size < len){
			let n = Math.floor(Math.random() * element2);
			nums.add(n);
		}
	}
	return [...nums];
}

(function(){   //get users via randomuser api, process and format, search, autocomplete and custom select menu functionality
	let userListItems;
	let fff;
	let numUsers = 500;   // 5000 max
	let httpRequest;
	let users;
	let i = numUsers;
	let listShowing = false;
	const newMembersDivs = document.querySelectorAll('.new-members > div');
	const recActivityDivs = document.querySelectorAll('.rec-activity > div');
	const userSearchBox = document.querySelector('.messages input');
	const userList = document.querySelector('.messages fieldset ul');
	const sendButton = document.querySelector('.messages button');
	const messagesSection = document.querySelector('.messages');
	const userMessageBox = document.querySelector('.messages textarea');
	const errorMessage = document.querySelector('.messages form > p');
	document.addEventListener('DOMContentLoaded', makeRequest);
	function makeRequest(){
		httpRequest = new XMLHttpRequest();
		if(!httpRequest){
			return false;
		}
		httpRequest.onreadystatechange = showContents;
		httpRequest.open('GET', 'https://randomuser.me/api/?results=' + numUsers + '&seed=sed&inc=name,email,picture&noinfo');
		httpRequest.send();
	}
	function showContents(){
		try{
			if(httpRequest.readyState === XMLHttpRequest.DONE){
				if(httpRequest.status === 200){
				users=(JSON.parse(httpRequest.responseText)).results;
				whenDone(users);
				listEventSetup();
				} else {
					console.log('network or api problem...??');
					whenDoneError();
					listEventSetup();
				}
			}
		}
		catch(e){
			console.log('caught exception: ' + e.description);
			whenDoneError();
			listEventSetup();
		}
	}
	function whenDone(userObs){
		let flag;
		let nums = getRands(newMembersDivs, numUsers, false);
		function getName(ob,randSelection,i){
			let index;
			if(randSelection){
				index = nums[i];
			} else {
				index = i;
			}
			return function(){
				let firstName = ob[index].name.first.trim();
				let lastName = ob[index].name.last.trim();
				function caps(match){
					return match[0].toUpperCase() + match.substring(1);
				}
				firstName = firstName.replace(/([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$/gi, caps).replace(/jean-/, 'Jean-').replace(/anne-/, 'Anne-');
				lastName = lastName.replace(/([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$/gi, caps).replace(/cdonal/, 'cDonal').replace(/toole/, "'Toole").replace(/brien/, "'Brien").replace(/donoghue/, "'Donoghue").replace(/mahony/, "'Mahony").replace(/(\w)\1{2}/g, '$1$1').replace(/jean-/, 'Jean-').replace(/^mccoy/i, 'McCoy').replace(/^mck\w+/i, 'McKinney');
				let userName = firstName + ' ' + lastName;
				if(new RegExp(/[A-zÀ-ÿğŞı]+/gim).test(userName)){
					flag = false;
				} else {
					flag = true;
				}
				return userName;
			};
		}
		for(let i = 0; i < newMembersDivs.length; i++){
			let nameForNewMembers = getName(userObs,false,i);
			let nameForRecActivity = getName(userObs,true,i);
			let recActNames = recActivityDivs[i].querySelector('div > div > p:first-child');
			newMembersDivs[i].querySelector('img').src = userObs[i].picture.thumbnail;
			recActivityDivs[i].querySelector('img').src = userObs[nums[i]].picture.thumbnail;
			newMembersDivs[i].querySelector('div > div > p:first-child').textContent = nameForNewMembers();
			recActNames.textContent = nameForRecActivity();
			if(flag){
				recActNames.style.fontFamily = 'Amiri, serif';
				recActNames.style.letterSpacing = '2px';
				recActNames.style.lineHeight = '21px';
				recActNames.style.fontSize = '21px';
			}
			newMembersDivs[i].querySelector('div.mem-out > p').textContent = userObs[i].email;
		}
		userObs.forEach((u,i) => {
			let listItem = document.createElement('li');
			let listItemName = getName(userObs,false,i);
			listItem.textContent = listItemName();
			userList.appendChild(listItem);
			if(flag){
				listItem.style.fontFamily = 'Amiri, serif';
				listItem.style.letterSpacing = '2px';
				listItem.style.lineHeight = '24px';
				listItem.style.fontSize = '21px';
			}
		});
		userListItems = document.querySelectorAll('.messages fieldset ul li');
		fff = userListItems;
	}
	function whenDoneError(){
		let names = ['Jean-Baptiste Say', 'Ludwig von Mises', 'Frédéric Bastiat', 'John Cowperthwaite'];
		let emails = ['jbsay@example.com', 'lvmises@example.com', 'frederic.bastiat@example.com', 'jjcowperthwaite@example.com'];
		let pics = ['say-face.jpg', 'mises-face.jpg', 'bastiat-face.jpg', 'cowperthwaite-face.jpg'];
		for(let i = 0; i < newMembersDivs.length; i++){
			newMembersDivs[i].querySelector('img').src = pics[i];
			recActivityDivs[i].querySelector('img').src = pics[i];
			newMembersDivs[i].querySelector('div > div > p:first-child').textContent = names[i];
			recActivityDivs[i].querySelector('div > div > p:first-child').textContent = names[i];
			let listItem = document.createElement('li');
			listItem.textContent = names[i];	
			userList.appendChild(listItem);
			newMembersDivs[i].querySelector('div.mem-out > p').textContent = emails[i];
		}
		userListItems = document.querySelectorAll('.messages fieldset ul li');
		fff = userListItems;
		numUsers = 4;
	}
	function showUserList(e){
		listShowing = true;
		userList.style.display = 'block';
		window.setTimeout(() => {
			document.addEventListener('click', hideUserListOnClick);
		}, 1);
	}
	function hideUserListOnClick(e){
		if(!userList.contains(e.target)){
			listShowing = false;
			userList.style.display = 'none';
			i=numUsers;
			document.removeEventListener('click', hideUserListOnClick);
		}
	}
	function hideUserList(cF){
		return function(){
			listShowing = false;
			userList.style.display = 'none';
			i=numUsers;
			document.removeEventListener('click', hideUserListOnClick);
			if(cF){
				userMessageBox.focus();
			}
		};
	}
	let hideUserListNoFocus = hideUserList(false);
	let hideUserListChangeFocus = hideUserList(true);
	function selectUser(){
		userListItems.forEach(li => {
			if(li.hasAttribute('id')){
				userSearchBox.value = li.textContent;
				if(new RegExp(/[A-zÀ-ÿğŞı]+/gim).test(li.textContent)){
					userSearchBox.style.fontFamily = '"Alegreya Sans", sans-serif';
					userSearchBox.style.letterSpacing = '';
					userSearchBox.style.lineHeight = '';
					userSearchBox.style.fontSize = '18px';
				} else {
					userSearchBox.style.fontFamily = 'Amiri, serif';
					userSearchBox.style.letterSpacing = '2px';
					userSearchBox.style.lineHeight = '24px';
					userSearchBox.style.fontSize = '21px';
				}
			}
		});
	}
	let mmm = false;
	let letters = [];
	userSearchBox.addEventListener('keydown', function(e){
		if(new RegExp(/^[A-Za-z ]$/).test(e.key)){
			window.InputEvent.prototype.data = e.key.toLowerCase();
		} else {
			window.InputEvent.prototype.data = null;
		}
		if(e.keyCode == 37 || e.keyCode == 39){
			e.preventDefault();
		}
		if(e.keyCode == 27){
			mmm = true;
			letters = [];
			userList.scrollTop = 0;
			this.value = '';
		}
		if(e.keyCode == 8){
			letters.pop();
			if(letters.length == 0){
				this.value = '';
				userListItems.forEach(na => {
					na.style.display = 'list-item';
					na.classList.remove('hid');
					na.removeAttribute('id');
					na.innerHTML = na.textContent;
				});
				fff = document.querySelectorAll('.messages fieldset ul li:not([class="hid"])');
				numUsers = fff.length;
			}
		}
		if(!listShowing){
			if(e.shiftKey || e.keyCode == 9 || e.keyCode == 27){
				return;
			}
			if([13,32,38,40].includes(e.keyCode)){
				e.preventDefault();
			}
			if(userSearchBox.style.fontFamily === 'Amiri, serif'){
				userSearchBox.style.fontFamily = '"Alegreya Sans", sans-serif';
				userSearchBox.style.letterSpacing = '';
				userSearchBox.style.lineHeight = '';
				userSearchBox.style.fontSize = '18px';
			}
		} else {
			if((e.shiftKey && e.keyCode == 9) || e.keyCode == 9 || e.keyCode == 27){
				selectUser();
				hideUserListNoFocus();
				letters = [];
				return;
			}
			if(e.keyCode == 13){
				e.preventDefault();
				selectUser();
				hideUserListChangeFocus();
				letters = [];
				return;
			}
			if([38,40].includes(e.keyCode)){
				e.preventDefault();
			}
		}
	});
	let rest, thisName;
	userSearchBox.addEventListener('input', function(e){
		if(e.data){
			letters.push(e.data.toLowerCase());
		}
		userList.scrollTop = 0;
		userListItems.forEach(na => {
			na.removeAttribute('id');
			if(!na.textContent.toLowerCase().startsWith(letters.join('').toLowerCase())){
				na.style.display = 'none';
				na.classList.add('hid');
			} else {
				na.style.display = 'list-item';
				na.classList.remove('hid');
			}
		});
		fff = document.querySelectorAll('.messages fieldset ul li:not([class="hid"])');
		numUsers = fff.length;
		i = fff.length;
		let distFromTop = ((i % fff.length) * 28);
		userList.scrollTop = distFromTop;
	});
	userSearchBox.addEventListener('click', function(e){
		if(this.value != ''){
			this.setSelectionRange(0, this.value.length);
			letters = [];
		}
	});
	userSearchBox.addEventListener('search', function(e){
		letters = [];
	});
	userSearchBox.addEventListener('keyup', function(e){
		function caps(match){
			return ' ' + match[1].toUpperCase();
		}
		if(e.keyCode == 16 || e.keyCode == 9 || e.keyCode == 27){
			if(e.keyCode == 27){
				userListItems.forEach(na => {
					na.style.display = 'list-item';
					na.classList.remove('hid');
					na.innerHTML = na.textContent;
				});
				fff = document.querySelectorAll('.messages fieldset ul li:not([class="hid"])');
				numUsers = fff.length;
				mmm = false;
				this.value = '';
			}
			return;
		}
		if(!mmm){
			if(!listShowing){
				if([13,32,37,38,39,40].includes(e.keyCode)){
					e.preventDefault();
					let theOne;
					for(let g = 0; g < fff.length; g++){
						if(fff[g].hasAttribute('id')){
							theOne = [...fff].indexOf(fff[g]);
							i=theOne;
						}
					}
				}
				if(window.scrollY + 39 + (window.innerHeight - 39)/2 > userSearchBox.offsetParent.offsetParent.offsetTop + userSearchBox.offsetParent.offsetTop + userSearchBox.offsetTop + userSearchBox.offsetHeight){
					userList.style.bottom = '';
				} else {
					userList.style.bottom = '213px';
					userList.style.top = '';
				}
				showUserList(e);
				if(e.keyCode == 8 && this.value == ''){
					userList.scrollTop = 0;
				} else {
					let distFromTop = ((i % fff.length) * 28);
					userList.scrollTop = distFromTop;
				}
			} else {
				if([38,40].includes(e.keyCode)){
					e.preventDefault();
					if(e.keyCode == 38){
						i--;
					} else {
						i++;
					}
				}
				if(e.keyCode == 13){
					e.preventDefault();
					selectUser();
					hideUserListChangeFocus();
					return;
				}
			}
			if(i < 1 || i > (numUsers * 2) - 1){
				i=numUsers;
			}
			if(numUsers > 0){
				fff[(i-1) % numUsers].removeAttribute('id');
				fff[(i+1) % numUsers].removeAttribute('id');
				if(!(e.keyCode == 8 && letters.length == 0)){
					fff[i % numUsers].setAttribute('id', 'userselect');
				}
			}
			if(e.keyCode != 8){
				if(fff.length > 0){
					rest = fff[i % numUsers].textContent.substring(letters.length);
					if(letters.length > 0){
						thisName = letters[0].toUpperCase() + letters.slice(1).join('') + rest;
					} else {
						thisName = letters.join('') + rest;
					}
					thisName = thisName.replace(/\s{1}\b[A-zÀ-ÿğŞı]{1}'?(?=([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$)/gim, caps).replace(/cdonal/, 'cDonal').replace(/toole/, "'Toole").replace(/brien/, "'Brien").replace(/donoghue/, "'Donoghue").replace(/mahony/, "'Mahony").replace(/(\w)\1{2}/g, '$1$1').replace(/jean-/, 'Jean-').replace(/^mccoy/i, 'McCoy').replace(/^mck\w+/i, 'McKinney');
					userSearchBox.value = thisName;
					this.setSelectionRange(letters.length, this.value.length);
					if(new RegExp(/[A-zÀ-ÿğŞı]+/gim).test(thisName)){
						userSearchBox.style.fontFamily = '"Alegreya Sans", sans-serif';
						userSearchBox.style.letterSpacing = '';
						userSearchBox.style.lineHeight = '';
						userSearchBox.style.fontSize = '18px';
					} else {
						userSearchBox.style.fontFamily = 'Amiri, serif';
						userSearchBox.style.letterSpacing = '2px';
						userSearchBox.style.lineHeight = '24px';
						userSearchBox.style.fontSize = '21px';
					}
				}
			} else {
				if(letters.length == 0){
					i=numUsers;
					fff[i % numUsers].setAttribute('id', 'userselect');
					userList.scrollTop = 0;
					return;
				}
				if(fff.length > 0){
					rest = fff[i % numUsers].textContent.substring(letters.length);
					thisName = letters[0].toUpperCase() + letters.slice(1).join('') + rest;
					thisName = thisName.replace(/\s{1}\b[A-zÀ-ÿğŞı]{1}'?(?=([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$)/gim, caps).replace(/cdonal/, 'cDonal').replace(/toole/, "'Toole").replace(/brien/, "'Brien").replace(/donoghue/, "'Donoghue").replace(/mahony/, "'Mahony").replace(/(\w)\1{2}/g, '$1$1').replace(/jean-/, 'Jean-').replace(/^mccoy/i, 'McCoy').replace(/^mck\w+/i, 'McKinney');
					userSearchBox.value = thisName;
					this.setSelectionRange(letters.length, this.value.length);
					if(new RegExp(/[A-zÀ-ÿğŞı]+/gim).test(thisName)){
						userSearchBox.style.fontFamily = '"Alegreya Sans", sans-serif';
						userSearchBox.style.letterSpacing = '';
						userSearchBox.style.lineHeight = '';
						userSearchBox.style.fontSize = '18px';
					} else {
						userSearchBox.style.fontFamily = 'Amiri, serif';
						userSearchBox.style.letterSpacing = '2px';
						userSearchBox.style.lineHeight = '24px';
						userSearchBox.style.fontSize = '21px';
					}
				}
			}
			if([38,40].includes(e.keyCode)){
				let distFromTop = ((i % fff.length) * 28);
				userList.scrollTop = distFromTop;
			}
		}
		if(e.keyCode === 8 && this.value === ''){
			userList.scrollTop = 0;
		}
	});
	function listEventSetup(){
		userListItems.forEach(li => {
			li.addEventListener('mouseenter', function(e){
				fff.forEach(li => {
					li.removeAttribute('id');
				});
				i = Array.from(fff).indexOf(this) + numUsers;
				li.setAttribute('id', 'userselect');
				userSearchBox.value = li.textContent;
				if(new RegExp(/[A-zÀ-ÿğŞı]+/gim).test(li.textContent)){
					userSearchBox.style.fontFamily = '"Alegreya Sans", sans-serif';
					userSearchBox.style.letterSpacing = '';
					userSearchBox.style.lineHeight = '';
					userSearchBox.style.fontSize = '18px';
				} else {
					userSearchBox.style.fontFamily = 'Amiri, serif';
					userSearchBox.style.letterSpacing = '2px';
					userSearchBox.style.lineHeight = '24px';
					userSearchBox.style.fontSize = '21px';
				}
			});
			li.addEventListener('click', function(e){
				selectUser();
				hideUserListChangeFocus();
				letters = [];
			});
		});
	}
	sendButton.addEventListener('click', function(e){
		messagesSection.scrollIntoView();
		if(window.innerWidth < 768){
			window.scrollBy(0,-39);
		}
		errorMessage.style.display = 'block';
		if(userSearchBox.value === '' || userMessageBox.value === ''){
			errorMessage.textContent = 'Both fields required';
		} else {
			errorMessage.style.top = '35px';
			errorMessage.textContent = 'Your message has been sent!';
			userSearchBox.value = '';
			userMessageBox.value = '';
		}
		messagesSection.focus();
		errorMessage.style.textShadow = '1px 1px #000, 2px 2px #000, 3px 2px 1px #0d0d0d, 5px 3px 1px #1a1a1a, 7px 4px 1px #262626, 9px 5px 1px #333333, 11px 6px 1px #404040, 13px 7px 1px #4d4d4d, 15px 8px 1px #595959, 17px 9px 1px #666666, 19px 10px 1px #737373, 21px 11px 1px #808080, 23px 12px 1px #8c8c8c, 25px 13px 1px #999999, 27px 14px 1px #a6a6a6, 29px 15px 1px #b3b3b3, 31px 16px 1px #bfbfbf, 33px 17px 1px #cccccc, 35px 18px 1px #d9d9d9, 37px 19px 1px #e6e6e6, 39px 20px 1px #f2f2f2';
		letters = [];
		userListItems.forEach(na => {
			na.style.display = 'list-item';
			na.classList.remove('hid');
			na.innerHTML = na.textContent;
		});
		fff = document.querySelectorAll('.messages fieldset ul li:not([class="hid"])');
		numUsers = fff.length;
		window.setTimeout(function(){
			errorMessage.style.textShadow = 'none';
		}, 3500);
		window.setTimeout(function(){
			errorMessage.style.display = 'none';
			errorMessage.style.top = '70px';
		}, 4453);
	});
})();

function restoreSettings(){   //restore settings from localStorage on load, reload or back button from another website

	switches.forEach(switchDiv => {
		let settingValue = localStorage.getItem(switchDiv.dataset.setting);
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
	let timezoneSelect = document.querySelector('.timezone select');
	if(timezoneSelect.children.length < 2){
		getTimeZones().then((response) => {
			let ppqq;
			ppqq = JSON.parse(response).parse.text['*'];
			let rfrf = callback(ppqq);
			loadOptions(rfrf, timezoneSelect);
			if(localStorage.length > 0 && localStorage.timezone){
				let tz = localStorage.getItem('timezone');
				let tzI = parseInt(localStorage.getItem('tzIndex'), 10);
				let tzs = timezoneSelect.children;
				let tzarr = [...tzs].map(x => {
					return x.textContent;
				});
				if(tzarr.includes(tz)){
					let thisInd = tzarr.indexOf(tz);
					tzs[thisInd].selected = true;
				} else {
					let opt = document.createElement('option');
					opt.value = tz.replace(/\s(?=\s)/g, '');
					let textAndValue = tz;
					opt.textContent = textAndValue;
					timezoneSelect.insertBefore(opt, tzs[tzI]);
					tzs[tzI].selected = true;
				}
			}
		}, (Error) => {
			console.log(Error);
		});
	} else {
		if(localStorage.length > 0 && localStorage.timezone){
			let tz = localStorage.getItem('timezone');
			let tzI = parseInt(localStorage.getItem('tzIndex'), 10);
			let tzs = timezoneSelect.children;
			for(let i = tzI - 5; i < tzI + 6; i++){
				if(i < 1){
					i = 1;
				}
				if(tzs[i].textContent === tz){
					tzs[i].selected = true;
					break;
				}
			}
		} else {
			let tzs = timezoneSelect.children;
			tzs[0].selected = true;
		}
	}
	if(localStorage.length > 0){
		let timeIndex = parseInt(localStorage.getItem('dirIndex'), 10);
		for(let i = 1; i <= timeIndex; i++){
			makeClick(lineChartDial);
		}
	}
}

function makeClick(target){  //simulate a click to restore saved settings, there is also HTMLElement.click()
	let clickEvent = new Event('click');
	target.dispatchEvent(clickEvent);
}

(function(){  //settings switches, save and cancel buttons
	const emailOnLabel = document.querySelector('.email_notify label:first-of-type');
	const emailOffLabel = document.querySelector('.email_notify label:last-of-type');
	const emailSwitchDiv = document.querySelector('.email_notify div');
	const emailRadioOn = document.querySelector('.email_notify input[id="on-email"]');
	const emailRadioOff = document.querySelector('.email_notify input[id="off-email"]');
	const profileOnLabel = document.querySelector('.public_profile label:first-of-type');
	const profileOffLabel = document.querySelector('.public_profile label:last-of-type');
	const profileSwitchDiv = document.querySelector('.public_profile div');
	const profileRadioOn = document.querySelector('.public_profile input[id="on-profile"]');
	const profileRadioOff = document.querySelector('.public_profile input[id="off-profile"]');
	const autoplayOnLabel = document.querySelector('.barchart_autoplay label:first-of-type');
	const autoplayOffLabel = document.querySelector('.barchart_autoplay label:last-of-type');
	const autoplaySwitchDiv = document.querySelector('.barchart_autoplay div');
	const autoplayRadioOn = document.querySelector('.barchart_autoplay input[id="on-autoplay"]');
	const autoplayRadioOff = document.querySelector('.barchart_autoplay input[id="off-autoplay"]');
	const saveMessage = document.querySelector('.settings form > div > p');
	const saveButton = document.querySelector('.settings form > div button:first-of-type');
	
	let dir = 0;
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
			}
			degCount += 1;
			dir = degCount % degs.length;
			ptr.style.transform = 'translateX(-50%) rotate(' + degs[dir] + 'deg)';
			radios[dir].checked = true;
		});
	}
	dialSwitch(lineChartDial, pointer, lineChartDialRadios);
	let timezoneSelect = document.querySelector('.timezone select');
	saveButton.addEventListener('click', function(e){
		switches.forEach(div => {
			let locStoKey = div.dataset.setting;
			let locStoVal = div.querySelector('input:checked').value;
			localStorage.setItem(locStoKey, locStoVal);
			if(locStoKey === 'timeperiod'){
				localStorage.setItem('dirIndex', dir);
			}
		});
		if(timezoneSelect.selectedIndex !== 0){
			localStorage.setItem('timezone', timezoneSelect.selectedOptions[0].textContent);
			localStorage.setItem('tzIndex', timezoneSelect.selectedIndex.toString(10));
		}
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
		let switchFlag = true;
		div.addEventListener('click', function(e){
			if(e.target.tagName === 'LABEL'){
				e.preventDefault();
			}
			if(e.isTrusted){
				cancelButton.disabled = false;
				cancelButton.style.backgroundColor = '#7377bf';
			}
			if(switchFlag){
				onLabel.style.display = 'none';
				offLabel.style.display = 'block';
				offLabel.style.right = '10px';
				offLabel.style.left = 'inherit';
				this.style.background = 'linear-gradient(to bottom right, #ea4e51, #840000)';
				radioOff.checked = true;
				switchFlag = false;
			} else {
				onLabel.style.display = 'block';
				offLabel.style.display = 'none';
				this.style.background = 'linear-gradient(to bottom right, #a6aaf2, #40448c)';
				radioOn.checked = true;
				switchFlag = true;
			}
		});
	}

	switchClick(emailSwitchDiv, emailOnLabel, emailOffLabel, emailRadioOn, emailRadioOff);
	switchClick(profileSwitchDiv, profileOnLabel, profileOffLabel, profileRadioOn, profileRadioOff);
	switchClick(autoplaySwitchDiv, autoplayOnLabel, autoplayOffLabel, autoplayRadioOn, autoplayRadioOff);

})();

restoreSettings();

if(ffx){  //for some reason in Firefox the on/off switches don't load properly in every other page load....???  so calling it again to make it consistent with chrome/opera
	restoreSettings();
}