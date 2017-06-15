

const links = document.querySelectorAll('header li a');
const appName = document.querySelector('main > div:first-child > h1');
const alertButton = document.querySelector('main > div:nth-of-type(2) > button');
const alertDiv = document.querySelector('main > div:nth-of-type(2)');

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

alertButton.addEventListener('click', () => alertDiv.style.display = 'none');







