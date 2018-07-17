if(window.performance.navigation.type === 2){  //navigation from the browser's back button, reload allows the settings saved in localStorage to load properly when loading from local files in chrome/opera, but not firefox. could be my settings.
	window.location.reload();
}
let ffx = false;
if(!window.InputEvent.prototype.hasOwnProperty('data')){  //this check along with the first if block in the keydown listener at line 1047 are a 'polyfill' i wrote to enable the data feature of the InputEvent in Firefox
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

const indicators = [
	'NY.GDP.PCAP.KD',
	'SP.POP.TOTL',
	'IC.REG.DURS',
	'FR.INR.RINR'
];
// NY.GDP.PCAP.KD, SP.POP.TOTL, IC.REG.DURS, FR.INR.RINR
// GDP per capita (constant 2010 US$), Population, total, Time required to start a business (days), Real interest rate (%)

(function(){//load country drop-down menu
	const countrySelect = document.querySelector('#country');
	for(let i = 0; i < countries.length; i++){
		let opt = document.createElement('option');
		opt.value = `${countries[i].code}`;
		opt.textContent = `${countries[i].country}`;
		countrySelect.appendChild(opt);
	}
}());

//from https://stackoverflow.com/questions/149055/how-can-i-format-numbers-as-dollars-currency-string-in-javascript
const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2
});

const largeNumberFormatter = new Intl.NumberFormat('en-US', {
  style: 'decimal',
  maximumFractionDigits: 0
});




let lineChartOptions = {

  ptRadius: 4,




  context: document.querySelector('.line-chart > canvas').getContext('2d'),
  type: 'line',
  data: {
    labels: null,
    datasets: [{
      label: '',
			ind: null,
      data: null,
      backgroundColor: 'rgba(115,119,191,0.3)',
      lineTension: 0,
      borderColor: '#7377BF',
      borderWidth: 1,
      pointRadius: this.ptRadius,
      pointBorderWidth: 2,
      pointBorderColor: '#7377BF',
      pointBackgroundColor: '#fbfbfb',
      pointHoverRadius: this.ptRadius,
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

      p.textContent = 'event';

      li.appendChild(pointDiv);
      li.appendChild(p);
      ul.appendChild(li);
      // let redLine = document.createElement('hr');
      // redLine.style.borderColor = '#ff0000';
      // redLine.style.width = '16px';
      // redLine.style.display = 'inline-block';
      // let li2 = document.createElement('li');
      // li2.style.display = 'flex';
      // li2.style.alignItems = 'center';
      // let p2 = document.createElement('p');
      // p2.textContent = 'Total users (rhs)';
      // p2.style.paddingLeft = '2px';
      // li2.appendChild(redLine);
      // li2.appendChild(p2);
      // ul.appendChild(li2);
      // let greenLine = document.createElement('hr');
      // greenLine.style.borderColor = '#00ff00';
      // greenLine.style.width = '16px';
      // greenLine.style.display = 'inline-block';
      // let li3 = document.createElement('li');
      // li3.style.display = 'flex';
      // li3.style.alignItems = 'center';
      // let p3 = document.createElement('p');
      // p3.textContent = 'Average users (lhs)';
      // p3.style.paddingLeft = '2px';
      // li3.appendChild(greenLine);
      // li3.appendChild(p3);
      // ul.appendChild(li3);
      return ul;
    },
    tooltips: {
      backgroundColor: '#000',
      displayColors: false,
      titleFontColor: '#d5d6ec',
      titleFontSize: 13,
      bodyFontColor: '#ecd5d5',
      bodyFontStyle: 'bold',
      bodyFontSize: 13,
      titleMarginBottom: 5,

      callbacks: {
        title: function(tooltipItem, data){
					// console.log(tooltipItem, data);
          return tooltipItem[0].xLabel;
        },
				label: function(tooltipItem, data){
					const ind = data.datasets[0].ind;
					let ttip;
					switch (ind){
						case 'NY.GDP.PCAP.KD':
							ttip = currencyFormatter.format(data.datasets[0].data[tooltipItem.index]);
							break;
						case 'SP.POP.TOTL':
							ttip = largeNumberFormatter.format(data.datasets[0].data[tooltipItem.index]);
							break;
						case 'IC.REG.DURS':
							ttip = data.datasets[0].data[tooltipItem.index] + ' days';
							break;
						case 'FR.INR.RINR':
							ttip = data.datasets[0].data[tooltipItem.index] + '%';
							break;
						default:


					}
					return ttip;

				}
      }
    },
    animation: {
      // easingStyles: ['linear', 'easeOutBounce', 'easeOutBack', 'easeInOutElastic', 'easeOutCirc', 'easeOutSine', 'easeOutQuint', 'easeOutCubic', 'easeInOutQuart', 'easeInQuad', 'easeInOutExpo'],
      easing: 'easeOutBounce'
    },
    legend: {
      display: false,
      // position: 'bottom'
    },
    title: {
      // display: false,
      // position: 'top',
      // padding: 0,
      // text: 'Traffic'
    },
    layout: {
      // padding: {
      //   left: 0,
      //   right: 0,
      //   top: 0,
      //   bottom: 0
      // }
    },
    scales: {
      yAxes: [{
        ticks: {
          // min: 0,
          callback: function(value){
            if(value > 0){
              // if(value >= 1000000){
              // 	return '   ' + value / 1000000 + 'm';
              // } else if(value >= 1000){
              // 	return value / 1000 + 'k';
              // } else{
                return value;
              // }
            } else{
              return 0;
            }
          }
        },
        position: 'left',
        id: 'left'
      }],
      xAxes: [{
				bounds: 'data',
        type: 'time',
        time: {
          // displayFormats: {
          //   year: 'YYYY'
          // },
          // tooltipFormat: 'YYYY',
          // min: null,
          max: null,
          unit: 'year'
        }
      }]
    }
  }
};

async function makeChart(options, countryCode, indicator){
	let slimData = [[], []];

	try{


		let data = await fetch(`http://api.worldbank.org/v2/countries/${countryCode}/indicators/${indicator}?MRV=5&format=json`);
		console.log('data fetch');

		if(data.ok){
			data = await data.json();
		} else {
			throw new Error('Network problem - response not ok');
		}

		// console.log(data);
		await data[1].forEach(x => {
			slimData[0].push(x.date);
			slimData[1].push(
				x.indicator.id.includes('POP') ? x.value : (Math.round(x.value * 100) / 100).toFixed(2)
			);
		});

		console.log(slimData);

		options.data.labels = slimData[0];
		options.data.datasets[0].data = slimData[1];
		options.data.datasets[0].ind = indicator;
		options.options.scales.xAxes[0].time.max = slimData[0][0] + '.01';

		return new Chart(options.context, options);


	} catch(err){
		alert(`There was a problem grabbing the data: ${err}.  Please try again.`);
	}

}


let lineChart = makeChart(lineChartOptions, 'us', indicators[0]);


// const lineTypes = document.querySelectorAll('.line-buttons button');
// lineTypes.forEach(li => {
// 	li.addEventListener('click', function(){

// 		lineLegendDiv.innerHTML = '';
// 		let lineObjectIndex = Array.from(lineTypes).indexOf(this);
//
// 		makeLegend(lineChart, lineLegendDiv);
// 	});
// });
const lineChartIndicators = document.querySelector('.line-buttons');
lineChartIndicators.addEventListener('click', e => {
		let index = [...e.target.parentNode.children].indexOf(e.target);
		for(let i = 0; i < lineChartIndicators.children.length; i++){
			lineChartIndicators.children[i].classList.remove('line-selected');
		}
		lineChartIndicators.children[index].className = 'line-selected';
		lineChart.destroy();
		lineChart = makeChart(lineChartOptions, 'us', indicators[index]);


});


















// l
