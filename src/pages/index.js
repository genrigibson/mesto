import {Card} from '../components/Card.js';
import {FormValidator} from '../components/FormValidator.js';
import {validationConfig,
        popupZoom,
        popupAddButtonOpen,
        popupAddNewCard,
        cardsContainer,
        buttonOpenChangeName,
        popupChangeName,
        nameInput,
        jobInput,
        profileName,
        profileAbout,
        cardForm,
        profileForm,
        popupDeleteCard,
        buttonOpenChangeAvatar,
        avatarForm,
        popupChangeAvatar,
        profileAvatar
      } from '../utils/constants.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import './index.css';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-31',
  headers: {
    authorization: '535a969c-fed4-4e57-acde-437d42d8518d',
    'Content-Type': 'application/json'
  }
})


const popupPreview = new PopupWithImage(popupZoom);
popupPreview.setEventListeners();

const popupDeleteMyCard = new PopupWithConfirmation(popupDeleteCard);
popupDeleteMyCard.setEventListeners();

function createCard (itemCard) {
  const card = new Card(itemCard,'#template', () => {popupPreview.open(itemCard)},
  (cardId) => {
  popupDeleteMyCard.open();
  popupDeleteMyCard.setSubmitAction(() => {
  api.deleteCard(cardId)
    .then(() => {
      card.deleteCard();
    })
    .catch((err) => {
      console.error(err);
    })
  }
)},

(cardId, element) => {
  api.putLike(cardId)
  .then((res) => {
    element.querySelector('.element__likes-count').textContent = res.likes.length;
  })
  .catch((err) => {
    console.error(err);
  });
},

(cardId, element) => {
  api.deleteLike(cardId)
  .then((res) => {
    element.querySelector('.element__likes-count').textContent = res.likes.length;
  })
  .catch((err) => {
    console.error(err);
  });
},
userId
  )
  return card.generateCard();
}


  const cardList = new Section({
    renderer: (itemCard) => {
      cardList.addItem(createCard(itemCard));
    }
    }, cardsContainer);


let userId = null;
api.getUserData()
.then(res => {
  userId = res._id;
  userInfo.setUserInfo(res)
  userInfo.setUserAvatar(res)
  if(userId){
    api.getCards()
  .then(result => {
    cardList.renderItems(result);
  })
  .catch((err) => {
    console.error(err);
  });
  }
})
.catch((err) => {
  console.error(err);
})

const userInfo = new UserInfo({
  userName: profileName,
  userJob: profileAbout,
  userAvatar: profileAvatar
});

const popupAddCard = new PopupWithForm({
  popupElement: popupAddNewCard,
  handleFormSubmit: (data) => {
    popupAddCard.renderLoading(false);
    api.postCard(data)
    .then((res) => {
        popupAddCard.close();
        cardList.addItem(createCard(res), true);
      }
    )
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupAddCard.renderLoading(true);
    })
      }
      });

popupAddButtonOpen.addEventListener('click', () => {
  popupAddCard.open();
  cardValidator.cleanInputError();
});
popupAddCard.setEventListeners();

const popupFormProfile = new PopupWithForm({
  popupElement: popupChangeName,
  handleFormSubmit: (data) => {
    popupFormProfile.renderLoading(false);
    api.patchUserData(data)
    .then(res => {
      userInfo.setUserInfo(res);
      popupFormProfile.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      popupFormProfile.renderLoading(true);
    })
  }
})
popupFormProfile.setEventListeners();


buttonOpenChangeName.addEventListener('click', () => {
  nameInput.value = userInfo.getUserInfo().userName;
  jobInput.value = userInfo.getUserInfo().userJob;
  popupFormProfile.open();
  profileValidator.cleanInputError();
});

const changeAvatar = new PopupWithForm({
  popupElement: popupChangeAvatar,
  handleFormSubmit: (data) => {
    changeAvatar.renderLoading(false);
    api.patchUserAvatar(data)
    .then(res => {
      userInfo.setUserAvatar(res);
      changeAvatar.close();
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      changeAvatar.renderLoading(true);
    })
  }
});
changeAvatar.setEventListeners();

buttonOpenChangeAvatar.addEventListener('click', () => {
  changeAvatar.open();
  avatarValidator.cleanInputError();
});

const cardValidator= new FormValidator(validationConfig, cardForm);
cardValidator.enableValidation();

const profileValidator = new FormValidator(validationConfig, profileForm);
profileValidator.enableValidation();

const avatarValidator = new FormValidator(validationConfig, avatarForm);
avatarValidator.enableValidation();

