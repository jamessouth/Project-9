

const links = document.querySelectorAll('div > header li a');
const appName = document.querySelector('div > main > div:first-child > h1');
const alertButton = document.querySelector('div > main > div:nth-of-type(2) > button');
const alertDiv = document.querySelector('div > main > div:nth-of-type(2)');
const alertDivKids = Array.from(alertDiv.children);

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
	
	
	// console.log(alertDiv.children);
	alertDiv.style.opacity = '0';
	
	
	window.setTimeout(() => {
		// alertDivKids.forEach(k => k.style.fontSize = '0px');
		alertDiv.style.lineHeight = '0px';
		alertButton.style.height = '0px';
		// alertDiv.addEventListener('transitionend', () => alertDiv.style.display = 'none');
	}, 1501);
	
	
	
	
	
});







