// burger
document.addEventListener('click', burgerClick);

function burgerClick(e) {
	const targetItem = e.target;
	if (targetItem.closest('.icon-menu')) {
		document.documentElement.classList.toggle('menu-open')
	}
}


// 

// modal window

const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		})
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.contactus__popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open')
		if (popupActive) {
			popupClose(popupActive, false);
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup-contactus__content')) {
				popupClose(e.target.closest('.contactus__popup'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {

		}
	}
}

//FORM
document.addEventListener('DOMContentLoaded', function () {//проверка документа про загрузку
	const form = document.getElementById('form'); //обьявляю переменную для отправки формы
	form.addEventListener('submit', formsend); // события вешаеться для того чтоб при отправке формы мы перешли в формсенд

	async function formsend(e) {
		e.preventDefault(); //запрещаем отправку формы(стандартную)

		let error = formValidate(form); //в валидацию забрасываем форму

		let formData = new FormData(form);

		if (error === 0) {
			let response = await fetch('sendmail.php', {
				method: 'POST',
				body: formData
			});
			if (response.ok) {
				let result = await response.json();
				alert(result.massage);
				formPrewiew.innerHTML = '';
				form.reset();
			} else {
				alert("Error")

			}
		}
	}

	function formValidate(form) {//обьявляем валидацию
		let error = 0;
		let formreq = document.querySelectorAll('._req')//обязатыльные поля

		for (let index = 0; index < formreq.length; index++) { //цикл
			const input = formreq[index];
			formRemoveError(input)

			if (input.classList.contains('_req')) {
				if (emailTest(input)) {
					formAddError(input);
					error++
				} else {
					if (input.value === '') {
						formAddError(input);
						error++;
					}
				}
			}
		}
	}

	function formAddError(input) {
		input.parentElement.classList.add('_error')
		input.classList.add('_error')
	}

	function formRemoveError(input) {
		input.parentElement.classList.remove('_error')
		input.classList.remove('_error')
	}

	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}

});


