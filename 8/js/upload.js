import { isEscEvent } from './util.js';
import { scaleControlValue } from './scale.js';
import { setValidateHashtagComment, pristine } from './hashtag.js';

const textComment = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');

const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const bodySelector = document.querySelector('body');
const fileUpload = document.querySelector('#upload-file');
const effectNone = document.querySelector('#effect-none');


//функция открытия окна редактирования
function uploadFile() {
  fileUpload.addEventListener('change', onUploadFileChange);
}

//удаление обработчиков
const removeListeners = () => {
  document.removeEventListener('keydown', onPopupeEscPress);
  document.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('click', onUploadCancelClick);
};

//убрать окно загрузки и убрать обработчики
const hideFormUpload = () => {
  imgUploadOverlay.classList.add('hidden');
  bodySelector.classList.add('.modal-open');
  textHashtags.value = '';
  textComment.value = '';
  effectNone.checked = true;
  fileUpload.value = '';
  removeListeners();
};


//функция показа окна для редактирования с подключением обработчиков
function onUploadFileChange () {
  submitForm();
  showImgUpload();
  setValidateHashtagComment();
}


//функция показа окна с загружаемым изображением
function showImgUpload () {
  scaleControlValue.value = '100%';
  imgUploadOverlay.classList.remove('hidden');
  bodySelector.classList.remove('.modal-open');
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onPopupeEscPress);
}

// //обработчики
function onUploadCancelClick () {
  hideFormUpload();
}

//функция проверки нажата ли клавиша Esc, и вызова функции hideFormUpload
//не срабатывает если курсор в полях Хештег или Комментарий
function onPopupeEscPress (evt) {
  if (isEscEvent(evt) && evt.target !== textHashtags && evt.target !== textComment) {
    evt.preventDefault();
    hideFormUpload();
  }
}


function onFormSubmit (evt) {
  pristine.validate();
  if(!pristine.validate()) {
    evt.preventDefault();
  }
}

function submitForm () {
  formUpload.addEventListener('submit', onFormSubmit);
}

export { uploadFile };
