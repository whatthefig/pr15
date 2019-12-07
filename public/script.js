class Api {
  getUser() {
    fetch('http://95.216.175.5/cohort4/users/me', {
      headers: {
        authorization: '369d404c-a749-4f02-b687-51fa39461b61'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((data) => {
      document.querySelector('.user-info__photo').style.backgroundImage = `url(${data.avatar})`;
      document.querySelector('.user-info__name').textContent = data.name;
      document.querySelector('.user-info__job').textContent = data.about;
    })
    .catch((err) => {
      console.log(err);
    });
  }

  getCardArr() {
    fetch('http://95.216.175.5/cohort4/cards', {
      headers: {
          authorization: '369d404c-a749-4f02-b687-51fa39461b61'
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .then((arr) => {
      new CardList(cardList, arr);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  edit (name, about) {
    fetch('http://95.216.175.5/cohort4/users/me', {
      method: 'PATCH',
      headers: {
        authorization: '369d404c-a749-4f02-b687-51fa39461b61',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  post (name, link) {
    fetch('http://95.216.175.5/cohort4/cards', {
      method: 'POST',
      headers: {
        authorization: '369d404c-a749-4f02-b687-51fa39461b61',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }
  remove(cardId) {
    fetch(`http://95.216.175.5/cohort4/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: '369d404c-a749-4f02-b687-51fa39461b61',
        'Content-Type': 'application/json'
      },
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    })
    .catch((err) => {
      console.log(err);
    });
  }
}

class Card {
  constructor(name, link, likes, owner, cardId) {
   this.card = this.create(name, link, likes, owner, cardId);
   this.card.addEventListener('click', this.like)
   this.card.addEventListener('click', this.remove);

  }
  like(event) {
    if (event.target.classList.contains('place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked')
    }
  }
  remove() {
    if (event.target.classList.contains('place-card__delete-icon')) {
      cardList.removeChild(event.target.parentElement.parentElement)
      api.remove(); //не работает 403...
    }
  }

  create(name, link, likes, owner) {
    const card = document.createElement('div');
    const cardImage = document.createElement('div');
    const deleteIcon = document.createElement('button');
    const cardDescription = document.createElement('div');
    const cardName = document.createElement('h3');
    const likeBlock = document.createElement('div');
    const likeCount = document.createElement('h4');
    const likeIcon = document.createElement('button');

    card.classList.add('place-card');
    cardImage.classList.add('place-card__image');
    cardImage.style.backgroundImage = `url(${link})`;
    deleteIcon.classList.add('place-card__delete-icon');
    cardDescription.classList.add('place-card__description');
    cardName.classList.add('place-card__name');
    cardName.textContent = name;
    likeBlock.classList.add('place-card__like-block');
    likeCount.classList.add('place-card__like-count');
    likeCount.textContent = likes;
    likeIcon.classList.add('place-card__like-icon');

    card.appendChild(cardImage);
    card.appendChild(cardDescription);
    cardImage.appendChild(deleteIcon);
    cardDescription.appendChild(cardName);
    cardDescription.appendChild(likeBlock);
    likeBlock.appendChild(likeIcon);
    likeBlock.appendChild(likeCount);

    if (owner !== 'cf687c2a74bfa663cda08b81') {
      deleteIcon.classList.add('place-card__delete-icon_hide');
    }

    cardImage.addEventListener('click', function(event){
      if (event.target.classList.contains('place-card__image')) {
        popupImage.classList.add('popup_is-opened');
        popupPicture.src = link;
      }
    });
    return card;
  }
}

class CardList{
  constructor(container, array) {
    this.container = container;
    this.array = array;
    this.render();
  }

  addCard(name, link, likes, owner, cardId) {
    const { card } = new Card(name, link, likes, owner, cardId);
    this.container.appendChild(card);
  }

  render() {
    this.array.forEach((item) => {
      const name = item.name;
      const link = item.link;
      const likes = item.likes.length;
      const owner = item.owner._id;
      const cardId = item._id;
      this.addCard(name, link, likes, owner, cardId);
    });
  }
}

class Popup {
  constructor(container, showPopup, hidePopup) {
    this.container = container;
    this.showPopup = showPopup;
    this.hidePopup = hidePopup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.showPopup.addEventListener('click', this.open);
    this.hidePopup.addEventListener('click', this.close);
  }

  open() {
    this.container.classList.add('popup_is-opened');
  }

  close() {
    this.container.classList.remove('popup_is-opened');
  }
}

const api = new Api;
const cardList = document.querySelector('.places-list');
const addButton = document.querySelector('.user-info__button');
const editButton = document.querySelector('.user-info__button_edit');
const addFormContainer = document.querySelector('.popup');
const editFormContainer = document.querySelector('.popup-edit');
const formNew = document.forms.new;
const formEdit = document.forms.edit;
const addFormButton = document.querySelector('.popup__button_new');
const editFormButton = document.querySelector('.popup__button_edit');
const closeAddForm = document.querySelector('.popup__close');
const closeEditForm = editFormContainer.querySelector('.popup__close');
const popupImage = document.querySelector('.popup__image');
const popupPicture = document.querySelector('.popup__picture');
const closeImageForm = popupImage.querySelector('.popup__close');
new Popup(popupImage, popupPicture, closeImageForm);
const popupAddForm = new Popup(addFormContainer, addButton, closeAddForm);
const popupEditForm = new Popup(editFormContainer, editButton, closeEditForm);

editButton.addEventListener('click', function () {
  let userName = formEdit.elements.username;
  let bio = formEdit.elements.bio;
  userName.value = document.querySelector('.user-info__name').textContent;
  bio.value = document.querySelector('.user-info__job').textContent;
})

editFormContainer.addEventListener('submit', function() {
  event.preventDefault();
  const userName = formEdit.elements.username;
  const bio = formEdit.elements.bio;
  document.querySelector('.user-info__name').textContent = userName.value;
  document.querySelector('.user-info__job').textContent = bio.value;
  api.edit(userName.value, bio.value);
  formEdit.reset();
  popupEditForm.close();
});

addFormContainer.addEventListener('submit', function(){
  const arr=[];
  const newCardList = new CardList(cardList, arr);
  event.preventDefault();
  newCardList.addCard(formNew.elements.name.value, formNew.elements.link.value, "0");
  api.post(formNew.elements.name.value, formNew.elements.link.value);
  formNew.reset();
  popupAddForm.close();
});

api.getUser();
api.getCardArr();

//ВАЛИДАЦИЯ:

// Переменные
const inputName = document.querySelector('#username');
const inputBio = document.querySelector('#bio');
const name = document.querySelector('#name');
const link = document.querySelector('#link');

// Слушатели
inputName.addEventListener('input', handleValidate);
inputBio.addEventListener('input', handleValidate);
name.addEventListener('input', handleValidate);
link.addEventListener('input', handleValidate);
//Функции

function validate(element) {
  const errorElement = document.querySelector(`#error-${element.id}`);
  if (!element.checkValidity()) {
    if (element.value.length == 0) {
      addFormButton.setAttribute('disabled',true);
      addFormButton.classList.remove('popup__button_active');
      editFormButton.setAttribute('disabled',true);
      editFormButton.classList.remove('popup__button_active');
      errorElement.textContent = 'Это обязательное поле';
    } else {
      addFormButton.setAttribute('disabled',true);
      addFormButton.classList.remove('popup__button_active');
      editFormButton.setAttribute('disabled',true);
      editFormButton.classList.remove('popup__button_active');
      errorElement.textContent = 'Должно быть от 2 до 30 символов';
    }
    return false;
  } else {
      errorElement.textContent = '';
      if (formEdit.username.value.length > 1 && formEdit.bio.value.length > 1) {
        editFormButton.removeAttribute('disabled');
        editFormButton.classList.add('popup__button_active');
      }
      if (formNew.name.value.length > 1 && formNew.link.value.length > 0) {
        addFormButton.removeAttribute('disabled');
        addFormButton.classList.add('popup__button_active');
      }
    }
  return true;
}

function handleValidate (event) {
  validate(event.target);
}

// var numbers = [1, -2, 3, -4]; // инициализируем переменную, содержащую массив числовых значений
// console.log(numbers.find( number => number < 0 ));
// console.log(if (number => number < 0 ){
//                 return
//             }
// );