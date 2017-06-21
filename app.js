let ptRadius = 4;

const links = document.querySelectorAll('div > header li a');
const appName = document.querySelector('div > main > div:first-child > h1');
const alertButton = document.querySelector('.alert-div > button');
const alertDiv = document.querySelector('.alert-div');
// const alertDivKids = Array.from(alertDiv.children);
const lineChartCtx = document.querySelector('.line-chart > canvas:nth-of-type(1)').getContext('2d');

let lineLegendDiv = document.querySelector('.line-legend');


let lineLabels = [];
for(let i = 0; i < 13; i++){
	lineLabels.push(moment().startOf('year').add(22+i, 'weeks'));
	
}

let allData = function randData(x){
	let datArray = [];
	for(let i = 0; i < x; i++){
		datArray.push(Math.floor(Math.random() * 6000) + 50);
	}
	return datArray;
}(13);



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

let lineChart = new Chart(lineChartCtx, {
	type: 'line',
	
	data: {
		// labels: ['28-3','4-10','11-17','18-24','25-1','2-8','9-15','16-22', '23-29', '30-5', '6-12', '13-19','20-26'],
		months: ['June','July','August'],
		labels: lineLabels,
	
	// [1132,2952,1384,3548,3910,4810,4111,5102,3105,4791,4666,5342,5741]
	
	// [1132,2952,1384,3548,3910]
	
		
	
	
		datasets: [{
			
			label: '',
			data: allData.slice(0,5),
			backgroundColor: 'rgba(115,119,191,0.3)',
			lineTension: 0,
			borderColor: '#7377BF',
			borderWidth: 1,
			pointRadius: ptRadius,
			pointBorderWidth: 2,
			pointBorderColor: '#7377BF',
			pointBackgroundColor: '#fbfbfb',
			pointHoverRadius: ptRadius
	
		},
		
		{
			label: '',
			data: [,,,,].concat(allData.slice(4,9)),
			backgroundColor: 'rgba(119,191,115,0.3)',
			lineTension: 0,
			borderColor: '#7377BF',
			borderWidth: 1,
			pointRadius: ptRadius,
			pointBorderWidth: 2,
			pointBorderColor: '#7377BF',
			pointBackgroundColor: '#fbfbfb',
			pointHoverRadius: ptRadius
		
		
		
		
		},
		
		{
			label: '',
			data: [,,,,,,,,].concat(allData.slice(8)),
			backgroundColor: 'rgba(191,115,119,0.3)',
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
		
		legendCallback: function(lineChart){
			// let div = document.createElement('div');
			let ul = document.createElement('ul');
			let selfConfig = lineChart.config.data.datasets;
			
			
			for(let i = 0; i < selfConfig.length; i++){
				let miniDiv = document.createElement('div');
				let color = selfConfig[i].backgroundColor;
				let li = document.createElement('li');
				let p = document.createElement('p');
				miniDiv.style.width = '14px';
				miniDiv.style.height = '12px';
				miniDiv.style.backgroundColor = color;
				p.textContent = lineChart.data.months[i];
				li.appendChild(miniDiv);
				li.appendChild(p);
				ul.appendChild(li);
			}
			
			
			
			
			
			
			
			// li.textContent = 'yo';
			// ul.appendChild(li);
			// div.appendChild(ul);
			
			
			
			
			return ul;
			
			
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
						week: 'MMM-DD'
					}
					// min: '2017W221',
					// max: '2017W357'
			
			
				}
			
			}]
		
		}
	}
	
	
});

let lineChartLegend = lineChart.generateLegend();
lineLegendDiv.appendChild(lineChartLegend);










