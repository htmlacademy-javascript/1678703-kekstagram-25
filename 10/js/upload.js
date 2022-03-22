import { isEscEvent } from './util.js';
import { setListenersScale, setScale, onSmallerScaleClick, onBiggerScaleClick } from './scale.js';
import { setValidateHashtagComment, pristine } from './hashtag.js';
import {createSlaider, changeEffectClick, changeFilter} from './effect.js';

const textComment = document.querySelector('.text__description');
const formUpload = document.querySelector('.img-upload__form');
const textHashtags = document.querySelector('.text__hashtags');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('#upload-cancel');
const bodySelector = document.querySelector('body');
const fileUpload = document.querySelector('#upload-file');
const effectNone = document.querySelector('#effect-none');
const effectChrome = document.querySelector('#effect-chrome');
const effectSepia = document.querySelector('#effect-sepia');
const effectMarvin = document.querySelector('#effect-marvin');
const effectPhobos = document.querySelector('#effect-phobos');
const effectHeat = document.querySelector('#effect-heat');
const sliderElement = document.querySelector('.effect-level__slider');


const onEffecNoneClick = () => {
  changeEffectClick('none', 100, 0, 1);
};
const onEffectChromeClick = () => {
  changeEffectClick('chrome', 1, 1, 0.1);
};
const onEffectSepiaClick = () => {
  changeEffectClick('sepia', 1, 1, 0.1);
};
const onEffectMarvinClick = () => {
  changeEffectClick('marvin', 100, 100, 1);
};
const onEffectPhobosClick = () => {
  changeEffectClick('phobos', 3, 3, 0.1);
};
const onEffectHeatClick = () => {
  changeEffectClick('heat', 3, 3, 0.1);
};

//функция подключения обработчиков переключения эффектов
const setListenersEffect = () => {
  effectNone.addEventListener('click', onEffecNoneClick);
  effectChrome.addEventListener('click', onEffectChromeClick);
  effectSepia.addEventListener('click', onEffectSepiaClick);
  effectMarvin.addEventListener('click', onEffectMarvinClick);
  effectPhobos.addEventListener('click', onEffectPhobosClick);
  effectHeat.addEventListener('click', onEffectHeatClick);
};

const onFormSubmit = (evt) => {
  pristine.validate();
  if(!pristine.validate()) {
    evt.preventDefault();
  }
};

const submitForm = () => {
  formUpload.addEventListener('submit', onFormSubmit);
};

//функция проверки нажата ли клавиша Esc, и вызова функции hideFormUpload
//не срабатывает если курсор в полях Хештег или Комментарий
const onPopupeEscPress = (evt) => {
  if (isEscEvent(evt) && evt.target !== textHashtags && evt.target !== textComment) {
    evt.preventDefault();
    hideFormUpload();
  }
};

//обработчики
const onUploadCancelClick = () => {
  hideFormUpload();
};

//удаление обработчиков
const removeListeners = () => {
  document.removeEventListener('keydown', onPopupeEscPress);
  document.removeEventListener('submit', onFormSubmit);
  document.removeEventListener('click', onUploadCancelClick);
  document.removeEventListener('click', onSmallerScaleClick);
  document.removeEventListener('click', onBiggerScaleClick);

  document.removeEventListener('click', onEffecNoneClick);
  document.removeEventListener('click', onEffectChromeClick);
  document.removeEventListener('click', onEffectSepiaClick);
  document.removeEventListener('click', onEffectMarvinClick);
  document.removeEventListener('click', onEffectPhobosClick);
  document.removeEventListener('click', onEffectHeatClick);
};

//убрать окно загрузки и убрать обработчики
function hideFormUpload () {

  setScale('reset');
  changeFilter('reset');

  imgUploadOverlay.classList.add('hidden');
  bodySelector.classList.add('.modal-open');
  textHashtags.value = '';
  textComment.value = '';
  effectNone.checked = true;
  sliderElement.noUiSlider.destroy();
  fileUpload.value = '';

  removeListeners();
}

//функция показа окна с загружаемым изображением
const showImgUpload = () => {

  setScale('reset');

  imgUploadOverlay.classList.remove('hidden');
  bodySelector.classList.remove('.modal-open');
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onPopupeEscPress);
};

//функция показа окна для редактирования с подключением обработчиков
const onUploadFileChange = () => {
  submitForm();
  showImgUpload();
  setValidateHashtagComment();
  setListenersScale();

  createSlaider();
  setListenersEffect();
};

//функция открытия окна редактирования
const uploadFile = () => {
  fileUpload.addEventListener('change', onUploadFileChange);
};


export { uploadFile };
