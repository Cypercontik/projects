
//Табы


let div = document.querySelector('.tabheader__items'),
	tabs = document.querySelectorAll('.tabheader__item'),
	content = document.querySelectorAll('.tabcontent');


function hide(argument) {
	content.forEach(slide => {
		slide.style.display = 'none';
	});
	tabs.forEach(item =>{
		item.classList.remove('tabheader__item_active');
	});

	// body...
}

hide();

function show(i = 0) {
	content[i].style.display = 'block';
	tabs[i].classList.add('tabheader__item_active');
	// body...
}
show();

div.addEventListener('click', (e) => {

	let target = e.target;

	if (target && target.classList.contains('tabheader__item')) {
		tabs.forEach((item, i) =>{
			if (item == target) {
				hide();
				show(i);
			}
		});
	}

});

// Таймер

let deadLine = '2020-05-25';

function getTimeRemaining(endTime) {
	let t =new Date(endTime) - new Date();
	let days = Math.floor(t / (1000 * 60 * 60 * 24));
	let hours = Math.floor(t / (1000 * 60 * 60) % 24);
	let minuts = Math.floor(t / (1000 * 60) % 60);
	let second = Math.floor(t / (1000) % 60);
	 
	

	return{ 
		'total': t,
		"days": days, 
		"hours": hours, 
		"minuts": minuts, 
		"seconds": second, 
	};
}

function getZero(num) {
	if (num >= 0 && num < 10) {
		return `0${num}`;
	}else {
		return num;
	}
	// body...
}
	

function setCloack(selector, endTime) {
	let timer = document.querySelector(selector);
	let days = timer.querySelector('#days');
	let hours = timer.querySelector('#hours');
	let minutes = timer.querySelector('#minutes');
	let seconds = timer.querySelector('#seconds');
	let timeInterval = setInterval(updateClock, 1000);

		updateClock();

		function updateClock(argument) {
			let t = getTimeRemaining(endTime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minuts);
			seconds.innerHTML = getZero(t.seconds);
			if (t.total <= 0 ){
				clearInterval(timeInterval);
			}
		}
}

setCloack('.timer', deadLine);



// Модыльное окно


let modalTrigger = document.querySelectorAll('[data-modal]');
let modal = document.querySelector('.modal');



function openModal(argument) {
	modal.style.display = "block";
	document.body.style.overflow = 'hidden';
	clearInterval(modalTimerId);
}


modalTrigger.forEach(item =>{
		item.addEventListener("click", () => {
		openModal();
	});
});


function closeModal() {
	modal.style.display = "none";
	document.body.style.overflow = '';
	// body...
}



modal.addEventListener('click', (e) =>{
	if (e.target === modal || e.target.getAttribute('data-close') == '') {
		closeModal();
	
		};

});

document.addEventListener("keydown", (e) => {
	if(e.code === "Escape"){
		closeModal();
	}
});

let modalTimerId = setTimeout(openModal, 1000000);


function showModalByScroll(argument) {
	if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);

   }
}

window.addEventListener("scroll", showModalByScroll);

// Используем классы для карточек


class MenuClass {
	constructor ( src, alt, title, descr, price, parentSelector, ...classes) {
		this.src = src;
		this.alt = alt;
		this.title = title;
		this.descr = descr;
		this.price = price;
		this.classes = classes ;
		this.parent = document.querySelector(parentSelector);
		this.transfer = 27;
		this.changeToUAH();


	}


	changeToUAH() {
		this.price = this.price * this.transfer;
	}

	render() {

		let element = document.createElement('div');
		if(this.classes.length === 0) {
			this.element = 'menu__item';
			element.classList.add(this.element);
		}else{
			this.classes.forEach(className => element.classList.add(className));
		}

		
		element.innerHTML = `
                    <img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
					
                </div>`;
                this.parent.append(element);

	}
}


let piv = new MenuClass(
	"data:image/jpeg;base64,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", 
	"kakaha",
	 "Govno na 'palke'",
	  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, dolore.",
	   50,
	   ".menu .container"
	    );
piv.render();

new MenuClass(
	"data:image/jpeg;base64,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", 
	"kakaha",
	 "Govno na 'palke'",
	  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, dolore.",
	   50,
	   ".menu .container",
	   "menu__item"
	   ).render();

new MenuClass(
	"data:image/jpeg;base64,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", 
	"kakaha",
	 "Govno na 'palke'",
	  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Esse, dolore.",
	   50,
	   ".menu .container",
	   "menu__item" ).render();

console.log(piv);




// Формы

let forms = document.querySelectorAll('form');
forms.forEach( item =>{
	postData(item);
});

let formMessage = {
	loading: "img/form/original.svg",
	done: "Прошло успешно! Мы с вами свяжемся!",
	fail: "Что-то пошло не так!",
}

function postData(form) {
	 form.addEventListener('submit', (e) => {
		 
		 e.preventDefault();

		 let messageDiv = document.createElement('img');
		 messageDiv.src = formMessage.loading;
		 messageDiv.style.cssText = `
		 display: block;
		 margin:0 auto;
		 `;
		
		form.insertAdjacentElement('afterend', messageDiv );
		 


		 let request = new XMLHttpRequest();
		 request.open('POST', 'server.php');

		 let formData = new FormData(form);
		 request.send(formData);


		 request.addEventListener('load', () => {
			if(request.status === 200){
				console.log(request.response);
				showThanksModal(formMessage.done);
				form.reset();  // Cбрасывает все формы
				messageDiv.remove();
				

			   
			}else{
				showThanksModal(formMessage.fail);
		
			}
		});

	 });

}

function showThanksModal(message) {
	const prevModalDialog = document.querySelector('.modal__dialog');

	prevModalDialog.style.display = "none";
	openModal();

	const thanksModal = document.createElement('div');
	thanksModal.classList.add('modal__dialog');
	thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message}</div>
		</div>
	`;
	document.querySelector('.modal').append(thanksModal);
	setTimeout(() => {
		thanksModal.remove();
		prevModalDialog.style.display = "block";
		prevModalDialog.style.display = "none";
		closeModal();
	}, 4000);
}














