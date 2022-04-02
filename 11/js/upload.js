import { isEscEvent, showBlockMessage } from './util.js';
import { setListenersScale, setScale, onSmallerScaleClick, onBiggerScaleClick } from './scale.js';
import { setValidateHashtagComment, pristine } from './hashtag.js';
import {createSlaider, changeEffectClick, changeFilter} from './effect.js';
import {sendRequest} from './fetch.js';

const TEXT_ERROR = 'Ошибка загрузки изображений';
const TEXT_ERROR_BUTTON = 'Закрыть';
const TEXT_SUCCESS = 'Изображение успешно загружено';
const TEXT_SUCCESS_BUTTON = 'Закрыть';
const FILE_TYPES = ['gif', 'jpeg', 'png', 'jpg'];


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
const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');

const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');
const submitButton = document.querySelector('#upload-submit');
const imgUploadText = formUpload.querySelector('.img-upload__text');


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

//обработка успешной отправки
const onSuccess = () => {
  showBlockMessage(TEXT_SUCCESS, TEXT_SUCCESS_BUTTON, 'success');
  hideFormUpload();
};

//обработка отправки с ошибкой
const onError = () => {
  showBlockMessage(TEXT_ERROR, TEXT_ERROR_BUTTON, 'error');
  hideFormUpload();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
};

const onFormSubmit = (evt) => {
  if(!pristine.validate()) {
    evt.preventDefault();
    return;
  }
  evt.preventDefault();
  blockSubmitButton();

  sendRequest('POST', { method: 'POST', body: new FormData(formUpload) }, onSuccess, onError);
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
  formUpload.removeEventListener('submit', onFormSubmit);
  uploadCancel.removeEventListener('click', onUploadCancelClick);
  scaleControlSmaller.removeEventListener('click', onSmallerScaleClick);
  scaleControlBigger.removeEventListener('click', onBiggerScaleClick);

  effectNone.removeEventListener('click', onEffecNoneClick);
  effectChrome.removeEventListener('click', onEffectChromeClick);
  effectSepia.removeEventListener('click', onEffectSepiaClick);
  effectMarvin.removeEventListener('click', onEffectMarvinClick);
  effectPhobos.removeEventListener('click', onEffectPhobosClick);
  effectHeat.removeEventListener('click', onEffectHeatClick);
};

const resetValuesClasses = () => {
  imgUploadOverlay.classList.add('hidden');
  bodySelector.classList.add('.modal-open');
  imgUploadText.classList.remove('error__description__comment');
  textHashtags.classList.remove('error__description');
  textHashtags.value = '';
  textComment.value = '';
  effectNone.checked = true;
  sliderElement.noUiSlider.destroy();
  fileUpload.value = '';
  pristine.destroy();
};

//убрать окно загрузки и убрать обработчики
function hideFormUpload () {

  setScale('reset');
  changeFilter('reset');
  resetValuesClasses();
  removeListeners();
  unblockSubmitButton();
}

//функция показа окна с загружаемым изображением
const showImgUpload = () => {

  setScale('reset');

  imgUploadOverlay.classList.remove('hidden');
  bodySelector.classList.remove('.modal-open');
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onPopupeEscPress);
};

const allНandlers = () => {

  submitForm();
  showImgUpload();
  setValidateHashtagComment();
  setListenersScale();
  createSlaider();
  setListenersEffect();

};

//загрузка файла и подключение обработчиков
const onUploadFile = () => {

  const file = fileUpload.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);

    for (const elem of effectsPreview) {
      elem.style.backgroundImage = `url(${imgUploadPreview.src})`;
    }
  }

  allНandlers();

};

//установка листнера на загрузку файла и подключение обработчиков
const uploadFile = () => {
  fileUpload.addEventListener('change', onUploadFile);
};


export { uploadFile };
