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

const newMembersDivs = document.querySelectorAll('.new-members > div');

const recActivityDivs = document.querySelectorAll('.rec-activity > div');

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

const timezoneSelect = document.querySelector('.timezone select');





let dir = 0;
let degs = [-71, -28, 28, 71];
let degCount = 0;


(function(){
	let tzd;
	let httpRequest;
	document.addEventListener('DOMContentLoaded', makeRequest);
	function makeRequest(){
		httpRequest = new XMLHttpRequest();
		
		if(!httpRequest){
			return false;
		}
		
		httpRequest.onreadystatechange = showContents;
		
		httpRequest.open('GET', 'https://en.wikipedia.org/w/api.php?action=parse&page=Time_zone&prop=text&section=11&format=json&origin=*');
		
		
		// https://en.wikipedia.org/w/api.php?action=query&titles=Time_zone&prop=extracts&explaintext&format=json&origin=*
		
		
		
		// httpRequest.setRequestHeader('Api-User-Agent', 'Example/1.0');
		httpRequest.send();
		
	}
	
	
	function showContents(){
		
		try{
			if(httpRequest.readyState === XMLHttpRequest.DONE){
				if(httpRequest.status === 200){
				
				tzd=(JSON.parse(httpRequest.responseText)).parse.text['*'];
				// console.log(tzd);
				let timeZones = callback(tzd);
				// listEventSetup();
				loadOptions(timeZones);
				
				
				} else {
					console.log('problem 2');
					// whenDoneError();
				}
			}
			
		}
		catch(e){
			console.log('caught exception: ' + e.description);
			// whenDoneError();
		}
		
	}
	
	function callback(str){
		
		let reg = new RegExp(/\n*<([^>]*)>\n*/g);
		
		let res = str.substring(str.indexOf('<tr>'), str.lastIndexOf('</tr>')+5);
		
		res = res.split('</tr>\n<tr>');
		let f = res.shift();
		
		for(let i = 0; i < res.length; i++){
			res[i] = res[i].split('</td>\n<td>');
			res[i].splice(1,1);
			[res[i][0], res[i][1], res[i][2]] = [res[i][0].replace(reg, ''), res[i][1].replace(reg, ''), res[i][2].replace(reg, '')]
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
				
				
				res[i][3] = res[i][2].slice(22).replace(/south/i, 'S');;
				res[i][2] = res[i][2].slice(0,13);
				
				
				// console.log(res[i]);
			}
			
			if(/british/i.test(res[i][3])){
				
				function abbrev(match){
					return match[0].toUpperCase();
				}
				
				
				res[i][3] = res[i][3].replace(/\w+ */gi, abbrev);
				
				// console.log(res[i]);
			}
			
			if(/demo/i.test(res[i][5])){
				
				function abbrev(match, p1, p2, p3, p4, p5, string){
					return p1[0].toUpperCase() + p2[0].toUpperCase() + ' ' + p5;
				}
				
				
				res[i][5] = res[i][5].replace(/(\w+)\s(\w+)\s(\w+)\s(\w+)\s(\w+)/gi, abbrev);
				
				// console.log(res[i]);
			}
			
			
			
			// console.log(res[i]);
			
			
		}
		
		
		
		// console.log(res);
		
		// let w = res.map(x => 
			// x.split('</td>\n<td>')
		// ).reduce((a,b) => {
			// return a.concat(b);
		// }).filter((x,i) => {
			// return i % 4 != 1;
		// }).map((b,i) => {
			
			// let reg = new RegExp(/\n*<([^>]*)>\n*/g);
			
			// return b.replace(reg, '');
		// });
		
		// let e = [], sz = 3;
		// while(w.length > 0){
			// e.push(w.splice(0,sz).filter(function(x){
				
				// return x !== '';
			// }).map(x => {
				
				
				// return (/\[\d+\]/.test(x)) ? x.match(/[a-zA-Z ]+/)[0] : x;
				
			// }));
		// }
		
		
		
		return res;
	}
	
	// let cnt = 0;
	function createOption(x){
		
		let nums = [];
		
		
		y = new Set(x);
		y = [...y];
		
		
		if(y.length > 6){
			nums = getRands(5, y.slice(1).length, true);
			
		} else {
			
			for(let j = 1; j < y.length; j++){
				nums.push(j);
			}
			
		}
		
		// console.log(nums, y);
		
		for(let i = 0; i < nums.length; i++){
			// let spaces;
			let opt = document.createElement('option');
			opt.value = y[0] + ' ' + y[nums[i]];
			
			
			// let spacesCount = 32 - (y[0].length + y[nums[i]].length);
			
			// if((y[0].length + y[nums[i]].length) < 32){
				// spaces = '\u00A0\u00A0';
			// } else {
				// spaces = '\u00A0';
			// }
			
			// spaces = '\u00A0'.repeat(spacesCount);
			
			let textAndValue = y[0] + '\u00A0\u00A0' + y[nums[i]];
			// console.log(textAndValue.length);
			opt.textContent = textAndValue;
			// opt.style.textAlign = 'right';
			timezoneSelect.appendChild(opt);
		
			// cnt++;
		}
	
	}
	
	
	
	function loadOptions(obj){
		
		// console.log(obj);
		
		obj.forEach(x => {
			
			createOption(x);
			
			
		});
		
		// console.log(cnt);
		
		timezoneSelect.addEventListener('change', function(e){
			this.style.background = 'none';
		});
		
		
	}
	


})();

function getRands(element, element2, plusOne){
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



(function(){
	let userListItems;
	let fff;
	// const myAppUsers = [];
	// let nameArray = [];
	let numUsers = 5;
	let httpRequest;
	let users;
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
				// console.log(users);
				whenDone(users);
				listEventSetup();
				
				} else {
					console.log('problem 2');
					whenDoneError();
				}
			}
			
		}
		catch(e){
			console.log('caught exception: ' + e.description);
			whenDoneError();
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
				
				firstName = firstName.replace(/([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$/gi, caps);
				
				lastName = lastName.replace(/([A-zÀ-ÿğŞı]+|\w+[A-zÀ-ÿğŞı]*)\w*$/gi, caps).replace(/cdonal/, 'cDonal').replace(/toole/, "'Toole").replace(/mahony/, "'Mahony").replace(/(\w)\1{2}/g, '$1$1');
				
				let userName = firstName + ' ' + lastName;
				
				// console.log(userName);
				
				if(new RegExp(/[A-zÀ-ÿğŞı]+/gim).test(userName)){
					flag = false;
				} else {
					flag = true;
				}
				
				return userName;
				
			}
		
		}
		
		
		for(let i = 0; i < newMembersDivs.length; i++){
			
			let nameForNewMembers = getName(userObs,false,i);
			let nameForRecActivity = getName(userObs,true,i);
			let recActNames = recActivityDivs[i].querySelector('div > div > p:first-child')
			
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
			
			newMembersDivs[i].querySelector('div > div > p:last-child').textContent = userObs[i].email;
			
		}
		
		
		
		userObs.forEach((u,i) => {
			
			let listItem = document.createElement('li');
			let listItemName = getName(userObs,false,i);
			
			// console.log(listItemName(), flag);
			
			listItem.textContent = listItemName();
			
			userList.appendChild(listItem);
			
			if(flag){
			
				listItem.style.fontFamily = 'Amiri, serif';
				listItem.style.letterSpacing = '2px';
				listItem.style.lineHeight = '24px';
				listItem.style.fontSize = '21px';
				
			
			}
			

			// Array.from(document.querySelectorAll('.rec-activity .act-out > p:nth-of-type(1)')).map(u => u.textContent).forEach(x => {let i = x.indexOf(' '); myAppUsers.push([x.slice(0,i), x.slice(i+1)]);});
			
			// myAppUsers.push(listItemName().split(' '));
			
			
			
		});
		
		userListItems = document.querySelectorAll('.messages fieldset ul li');
		
		fff = userListItems;
		// console.log(fff);
		
	}
	
	
	
	function whenDoneError(){
		let names = ['Jean-Baptiste Say', 'Ludwig von Mises', 'Frédéric Bastiat', 'John Cowperthwaite'];
		let emails = ['jbsay@example.com', 'lvmises@example.com', 'frederic.bastiat@example.com', 'jjcowperthwaite@example.com'];
		let pics = ['say-face.jpg', 'mises-face.jpg', 'bastiat-face.jpg', 'cowperthwaite-face.jpg'];
		
		for(let i = 0; i < newMembersDivs.length; i++){
			// console.log(userObs[i]);
			
			newMembersDivs[i].querySelector('img').src = pics[i];
			
			recActivityDivs[i].querySelector('img').src = pics[i];
			
			newMembersDivs[i].querySelector('div > div > p:first-child').textContent = names[i];
			
			recActivityDivs[i].querySelector('div > div > p:first-child').textContent = names[i];
			
			newMembersDivs[i].querySelector('div > div > p:last-child').textContent = emails[i];
			
		}
	}
	
// ----------------------------------------

	let i = numUsers;
	let listShowing = false;
	const userSearchBox = document.querySelector('.messages input');
	const userList = document.querySelector('.messages fieldset ul');
	// const userListItems = document.querySelectorAll('.messages fieldset ul li');
	const sendButton = document.querySelector('.messages button');
	const userMessageBox = document.querySelector('.messages textarea');
	const errorMessage = document.querySelector('.messages form > p');
	// let listLength = 24;
	
	
	
	function showUserList(e){
		
		listShowing = true;
		userList.style.display = 'block';
		window.setTimeout(() => {
			document.addEventListener('click', hideUserListOnClick);
		}, 1);
		// userList.scrollTop = 0;
	};
	
	
	function hideUserListOnClick(e){
		// console.log(e);
		if(!userList.contains(e.target)){
		
		
			listShowing = false;
			userList.style.display = 'none';
			i=numUsers;
			
			document.removeEventListener('click', hideUserListOnClick);
		};
	};
	
	
	function hideUserList(cF){
		
	
		return function(){
			// console.log(userList.scrollTop);
			listShowing = false;
			userList.style.display = 'none';
			i=numUsers;
			document.removeEventListener('click', hideUserListOnClick);
			// userListItems.forEach(li => {
				// li.removeAttribute('id');
			// });
			
			
			if(cF){
				userMessageBox.focus();
			}
			
			
		};
	};
	
	
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
				
				
			};
		});
	};
	
	let mmm = false;
	
	let letters = [];
	
	
	// styling for input box, scripted vs regular
	
	
	userSearchBox.addEventListener('keydown', function(e){
		if(e.keyCode == 27){
			mmm = true;
			letters = [];
			userList.scrollTop = 0;
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
			}; 
			
			if([13,32,38,40].includes(e.keyCode)){
				
				e.preventDefault();
			};
			
			
			if(userSearchBox.style.fontFamily === 'Amiri, serif'){
				userSearchBox.style.fontFamily = '"Alegreya Sans", sans-serif';
				userSearchBox.style.letterSpacing = '';
				userSearchBox.style.lineHeight = '';
				userSearchBox.style.fontSize = '18px';
			}
		
		
		} else {
		
		
		
			if(e.shiftKey || e.keyCode == 9 || e.keyCode == 27){
				selectUser();
				hideUserListNoFocus();
				letters = [];
				return;
			};
			
			if(e.keyCode == 13){
				
				e.preventDefault();
				
				selectUser();
				hideUserListChangeFocus();
				letters = [];
				return;
			
			};
			
			if([38,40].includes(e.keyCode)){
				
				e.preventDefault();
			};
		
		}
	
	});
	
	// let lastUsed;
	
	let rest, thisName;
	
	userSearchBox.addEventListener('input', function(e){
		
	
		// console.log(e);

		if(e.data){
			letters.push(e.data);
		}
		
		
		
		
		// if(![38,40].includes(e.keyCode)){
		
			userList.scrollTop = 0;
			
			
			
			
			
			userListItems.forEach(na => {
				
				na.removeAttribute('id');
			
				if(!na.textContent.toLowerCase().startsWith(letters.join('').toLowerCase())){
				
					na.style.display = 'none';
					na.classList.add('hid');
					
					
				} else {
					
					na.style.display = 'list-item';
					na.classList.remove('hid');
					// console.log(na.innerHTML);
					
					if(letters.length > 0){
						na.innerHTML = '<span>' + letters[0].toUpperCase() + letters.slice(1).join('') + '</span>' + na.textContent.substring(letters.length);
					} else {
						na.innerHTML = na.textContent;
					}
					
					
					// console.log(na.innerHTML);
					// let distFromTop = ((i % fff.length) * 28);
					// userList.scrollTop = distFromTop;
				}

				
			});
		
			fff = document.querySelectorAll('.messages fieldset ul li:not([class="hid"])');
			numUsers = fff.length;
			i = fff.length;
		
		
		
		// }
		
		
		let distFromTop = ((i % fff.length) * 28);
				userList.scrollTop = distFromTop;
		
		
		
		

	
		
	});
	
	userSearchBox.addEventListener('search', function(e){
		
		
		// console.log(e);
		letters = [];
		
	});
	
	
	userSearchBox.addEventListener('keyup', function(e){
		
		
		
		console.log(letters);
		
		
		// console.log(e.keyCode);
		// console.log(mmm);
		
		if(e.shiftKey || e.keyCode == 16 || e.keyCode == 9 || e.keyCode == 27){
			
			
			if(e.keyCode == 27){
				
				
				userListItems.forEach(na => {
					
					na.style.display = 'list-item';
					na.classList.remove('hid');
					// console.log(na.textContent);
					
					na.innerHTML = na.textContent;
					
					
					
				});
				
				fff = document.querySelectorAll('.messages fieldset ul li:not([class="hid"])');
				numUsers = fff.length;
				mmm = false;
				
			}
			
			return;
		}; 
		
		
		
		
		if(!mmm){
		
		
		
			// console.log(numUsers);
		
			if(!listShowing){
				
				// if(e.shiftKey || e.keyCode == 9 || e.keyCode == 27){
					// return;
				// }; 
				
				
				
				
				if([13,32,37,38,39,40].includes(e.keyCode)){
					e.preventDefault();
					
					// let picked=false;
					let theOne;
					for(let g = 0; g < fff.length; g++){
					
						if(fff[g].hasAttribute('id')){
							// picked=true;
							
							theOne = [...fff].indexOf(fff[g]);
							
							i=theOne;
							
							
							// console.log(fff[g], theOne, i);
						}
					}
					
					
					
					
					
				};
				
				// if(e.keyCode == 13){
				
					// e.preventDefault();
					
					
					
					
					
				// };
				
				
				
				
				if(window.scrollY + window.innerHeight/2 > userSearchBox.offsetParent.offsetParent.offsetTop + userSearchBox.offsetParent.offsetTop + userSearchBox.offsetTop + userSearchBox.offsetHeight){
					
					userList.style.top = '100px';
					userList.style.bottom = '';
					
				} else {
					
					userList.style.bottom = '213px';
					userList.style.top = '';
					
				}
				
				showUserList(e);
				console.log(i, fff.length);
				
				if(e.keyCode == 8 && this.value == ''){
					userList.scrollTop = 0;
				} else {
					let distFromTop = ((i % fff.length) * 28);
					userList.scrollTop = distFromTop;
				}
				
			} else {
				
				// userListItems.forEach({
					// if(){
					
					// }
				// });
				
				// console.log(listLength);
				
				// if(e.shiftKey || e.keyCode == 9 || e.keyCode == 27){
					// selectUser();
					// hideUserListNoFocus();
					// return;
				// };
				
				
				if([38,40].includes(e.keyCode)){
					e.preventDefault();
					
					if(e.keyCode == 38){
						
						i--;
						
					} else {
						
						i++;
						
					};
					
					// console.log(i,fff.length);
					// let distFromTop = ((i % fff.length) * 28);
					
					// let visible = (distFromTop >= userList.scrollTop && distFromTop < userList.offsetHeight + userList.scrollTop);
					
					// console.log(visible, distFromTop, userList.scrollTop, userList.scrollHeight, userList.offsetHeight);
					
					
				};
				
				
				
				
				
				if(e.keyCode == 13){
				
					e.preventDefault();
				
					selectUser();
					hideUserListChangeFocus();
					return;
				
				};
				
			};
			// console.log(i);
			
			
			
			
			
			// console.log(fff);
			
			if(i < 1 || i > (numUsers * 2) - 1){
				i=numUsers;
			};
			
			if(numUsers > 0){
				fff[(i-1) % numUsers].removeAttribute('id');
				fff[(i+1) % numUsers].removeAttribute('id');
			
				if(!(e.keyCode == 8 && letters.length == 0)){
					fff[i % numUsers].setAttribute('id', 'userselect');
				}
				
				
				// console.log(i);
			}
			
			// lastUsed = fff[i % numUsers];
			// console.log(lastUsed);
			
			// if(rest && (rest !== thisName)){
				// console.log('here');
			
			// }
			
			
			
			
			if(e.keyCode != 8){
			
			
				if(fff.length > 0){
					rest = fff[i % numUsers].textContent.substring(letters.length);
					
					if(letters.length > 0){
					
						thisName = letters[0].toUpperCase() + letters.slice(1).join('') + rest;
					
					} else {
					
						thisName = letters.join('') + rest;
					}
				
					// userSearchBox.value = thisName;
					
					// userSearchBox.style.color = 'red';
				
				
				
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
				// console.log(rest, thisName, 'keyup');
				
				
				if(letters.length == 0){
					i=numUsers;
					fff[i % numUsers].setAttribute('id', 'userselect');
					userList.scrollTop = 0;
					return;
				}
			
				if(fff.length > 0){
					rest = fff[i % numUsers].textContent.substring(letters.length);
					thisName = letters[0].toUpperCase() + letters.slice(1).join('') + rest;
				
					// userSearchBox.value = thisName;
				
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
				// console.log(rest, thisName, 'keyup');
			
			}
			
			
			
			
			
			
			
			if([38,40].includes(e.keyCode)){
				// console.log('here');
				
				let distFromTop = ((i % fff.length) * 28);
				userList.scrollTop = distFromTop;
					// let visible = (distFromTop >= userList.scrollTop && distFromTop < userList.offsetHeight + userList.scrollTop);
					
					// console.log(i, distFromTop, fff.length, userList.scrollTop);
					
					
					
					
				
				
			
			};
		
		}
		
		// console.log(fff[i % numUsers].textContent, this.value);
		
		// this.value += rest;
		
		
		if(e.keyCode === 8 && this.value === ''){
			// console.log('gogo');
			userList.scrollTop = 0;
			// console.log(userList.scrollTop);
		}
		
		
		
	});
	
	function listEventSetup(){
	
		userListItems.forEach(li => {
		
			// nameArray.push(li.textContent.split(' '));

			li.addEventListener('mouseenter', function(e){
				
				fff.forEach(li => {
					li.removeAttribute('id');
				});
				
				// console.log(this);
				i = Array.from(fff).indexOf(this) + numUsers;
				// console.log(i);
				
				li.setAttribute('id', 'userselect');
				
				// userSearchBox.value = li.textContent;
				
				
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
		errorMessage.style.display = 'block';

		if(userSearchBox.value === ''){
			errorMessage.textContent = 'Both fields required';
			userSearchBox.focus();
		} else if(userMessageBox.value === ''){
			errorMessage.textContent = 'Both fields required';
			userMessageBox.focus();
		} else {
			errorMessage.style.top = '35px';
			errorMessage.textContent = 'Your message has been sent!';
			userSearchBox.value = '';
			userMessageBox.value = '';
			userSearchBox.focus();
		};
		
		// errorMessage.style.opacity = '1';
		errorMessage.style.textShadow = '1px 1px #000, 2px 2px #000, 3px 2px 1px #0d0d0d, 5px 3px 1px #1a1a1a, 7px 4px 1px #262626, 9px 5px 1px #333333, 11px 6px 1px #404040, 13px 7px 1px #4d4d4d, 15px 8px 1px #595959, 17px 9px 1px #666666, 19px 10px 1px #737373, 21px 11px 1px #808080, 23px 12px 1px #8c8c8c, 25px 13px 1px #999999, 27px 14px 1px #a6a6a6, 29px 15px 1px #b3b3b3, 31px 16px 1px #bfbfbf, 33px 17px 1px #cccccc, 35px 18px 1px #d9d9d9, 37px 19px 1px #e6e6e6, 39px 20px 1px #f2f2f2';
		
		
		
		window.setTimeout(function(){
			// errorMessage.style.opacity = '0';
			errorMessage.style.textShadow = 'none';
		}, 3500);
		
		window.setTimeout(function(){
			errorMessage.style.display = 'none';
			errorMessage.style.top = '70px';
		}, 4453);
		
	});


})();





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
	console.log(e);
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





































// roy lichtenstein
// function drawErrorMsg(){
	// errorCanvasCtx.beginPath();
	// errorCanvasCtx.moveTo(10,40);
	// errorCanvasCtx.bezierCurveTo(30,40, 40,30, 40,10);
	// errorCanvasCtx.bezierCurveTo(60,40, 80,30, 80,10);
	// errorCanvasCtx.bezierCurveTo(85,30, 80,20, 90,10);
	// errorCanvasCtx.bezierCurveTo(110,40, 140,30, 130,10);
	// errorCanvasCtx.bezierCurveTo(150,30, 160,20, 190,8);
	// errorCanvasCtx.bezierCurveTo(170,40, 170,70, 190,80);
	// errorCanvasCtx.bezierCurveTo(170,80, 165,90, 185,100);
	// errorCanvasCtx.bezierCurveTo(160,90, 150,100, 155,118);
	// errorCanvasCtx.bezierCurveTo(150,100, 140,110, 135,120);
	// errorCanvasCtx.bezierCurveTo(125,110, 120,125, 130,130);
	// errorCanvasCtx.bezierCurveTo(110,120, 115,130, 120,140);
	// errorCanvasCtx.bezierCurveTo(110,130, 100,110, 95,148);
	// errorCanvasCtx.bezierCurveTo(80,120, 90,130, 75,143);
	// errorCanvasCtx.bezierCurveTo(70,110, 50,130, 45,135);
	// errorCanvasCtx.bezierCurveTo(40,120, 20,110, 25,140);
	// errorCanvasCtx.bezierCurveTo(20,130, 18,120, 8,145);
	// errorCanvasCtx.bezierCurveTo(15,120, 10,100, 5,110);
	// errorCanvasCtx.bezierCurveTo(16,90, 15,80, 10,65);
	// errorCanvasCtx.bezierCurveTo(22,40, 18,60, 10,40);
	// errorCanvasCtx.fillStyle = '#81C98F';
	// errorCanvasCtx.fill();
	// errorCanvasCtx.lineWidth = '3';
	// errorCanvasCtx.strokeStyle = '#28252E';
	// errorCanvasCtx.stroke();
	
	
	// errorCanvasCtx.beginPath();
	// errorCanvasCtx.moveTo(40,65);
	// errorCanvasCtx.bezierCurveTo(50,60, 60,50, -8,-30);
	// errorCanvasCtx.bezierCurveTo(70,40, 70,50, 98,50);
	// errorCanvasCtx.bezierCurveTo(140,60, 150,50, 178,-80);
	// errorCanvasCtx.bezierCurveTo(150,60, 150,75, 218,60);
	// errorCanvasCtx.bezierCurveTo(140,90, 130,110, 168,150);
	// errorCanvasCtx.bezierCurveTo(80,80, 100,70, 40,190);
	// errorCanvasCtx.bezierCurveTo(90,85, 60,75, -28,130);
	// errorCanvasCtx.bezierCurveTo(50,70, 60,70, -28,100);
	// errorCanvasCtx.bezierCurveTo(30,70, 30,80, 40,65);
	// errorCanvasCtx.fillStyle = '#cecece';
	// errorCanvasCtx.fill();
	// errorCanvasCtx.lineWidth = '2';
	// errorCanvasCtx.strokeStyle = '#2C2821';
	// errorCanvasCtx.stroke();
	
	
	// errorCanvasCtx.beginPath();
	// errorCanvasCtx.moveTo(35,45);
	// errorCanvasCtx.lineTo(42,25);
	// errorCanvasCtx.lineTo(50,30);
	// errorCanvasCtx.lineTo(48,10);
	// errorCanvasCtx.lineTo(71,45);
	// errorCanvasCtx.lineTo(73,10);
	// errorCanvasCtx.lineTo(98,43);
	// errorCanvasCtx.lineTo(120,8);
	// errorCanvasCtx.lineTo(125,40);
	// errorCanvasCtx.lineTo(148,2);
	// errorCanvasCtx.lineTo(155,32);
	// errorCanvasCtx.lineTo(190,40);
	// errorCanvasCtx.lineTo(158,90);
	// errorCanvasCtx.lineTo(170,120);
	// errorCanvasCtx.lineTo(158,110);
	// errorCanvasCtx.lineTo(153,147);
	// errorCanvasCtx.lineTo(143,100);
	// errorCanvasCtx.lineTo(128,160);
	// errorCanvasCtx.lineTo(130,115);
	// errorCanvasCtx.lineTo(118,110);
	// errorCanvasCtx.lineTo(105,150);
	// errorCanvasCtx.lineTo(90,110);
	// errorCanvasCtx.lineTo(80,150);
	// errorCanvasCtx.lineTo(70,106);
	// errorCanvasCtx.lineTo(50,140);
	// errorCanvasCtx.lineTo(43,110);
	// errorCanvasCtx.lineTo(38,146);
	// errorCanvasCtx.lineTo(28,120);
	// errorCanvasCtx.lineTo(16,140);
	// errorCanvasCtx.lineTo(17,120);
	// errorCanvasCtx.lineTo(8,124);
	// errorCanvasCtx.lineTo(24,80);
	// errorCanvasCtx.lineTo(4,72);
	// errorCanvasCtx.lineTo(26,60);
	// errorCanvasCtx.lineTo(20,30);
	// errorCanvasCtx.closePath();
	// errorCanvasCtx.fillStyle = '#7377bf';
	// errorCanvasCtx.fill();
	
	// errorCanvasCtx.lineWidth = '3';
	// errorCanvasCtx.strokeStyle = '#28252E';
	// errorCanvasCtx.stroke();
	
// };




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







