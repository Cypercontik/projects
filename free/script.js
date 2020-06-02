let rub = document.querySelector('#rub');
let usd = document.querySelector('#usd');



rub.addEventListener('input', ()=>{


let request = new XMLHttpRequest();

request.open('GET', 'current.json');
request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
request.send();

request.addEventListener('readystatechange', () => {
	if(request.readyState === 4 && request.status === 200){
		console.log(request.response);
		let data = JSON.parse(request.response);
		usd.value = (+rub.value / data.current.usd).toFixed(2);
	}else{
		usd.value = " что то не так";

		
	}
})


})