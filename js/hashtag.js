const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const MIN_LENGTH_HASHTAG = 2;
const FIRST_SIMBOL_HASHTAG = '#';


const formUpload = document.querySelector('.img-upload__form');
const textComment = formUpload.querySelector('.text__description');
const textHashtags = formUpload.querySelector('.text__hashtags');
const imgUploadText = formUpload.querySelector('.img-upload__text');


let message = '';
let pristine = undefined;

//валидация коммента
const validateComment = (value) => {
  const validate = value.length <= MAX_COMMENT_LENGTH;
  imgUploadText.classList.add('error__description__comment');
  if(validate){
    imgUploadText.classList.remove('error__description__comment');
  }
  return validate;
};

//детальная валидация хештега
const validateHastag = (hashtags, regExp) => {

  //обход всех хештегов
  const repeatedHastags = [];
  for (const hashtag of hashtags) {
    //все валидные
    if (regExp.test(hashtag)) {
      //проверка повторяющихся хештегов без учета регистра
      if (repeatedHastags.indexOf(hashtag.toLowerCase()) >= 0) {
        message = `Хештег (${hashtag}) уже использовался.`;
        return false;
      }
      repeatedHastags.push(hashtag.toLowerCase());
      continue;
    }
    //все НЕ валидные -----------------------------
    //если первый символ не решетка
    if (hashtag !== FIRST_SIMBOL_HASHTAG && hashtag.length === 1) {
      message = `Первый символ хештега (${hashtag}) должен быть (${FIRST_SIMBOL_HASHTAG}).`;
      return false;
    }
    //если длина меньше
    if (hashtag.length < MIN_LENGTH_HASHTAG) {
      message = `Длина хештега (${hashtag}) меньше допустимой (${MIN_LENGTH_HASHTAG}).`;
      return false;
    }
    //если длина больше
    if (hashtag.length > MAX_LENGTH_HASHTAG) {
      message = `Длина хештега (${hashtag}) превышает допустимую (${MAX_LENGTH_HASHTAG}).`;
      return false;
    }
    //если несколько решеток, regExp не справляется
    if (hashtag.indexOf(FIRST_SIMBOL_HASHTAG, 1) !== -1) {
      message = `В хештеге (${hashtag}) несколько символов (${FIRST_SIMBOL_HASHTAG}).`;
      return false;
    }
    //все остальные случаи невалидности
    message = `В хештеге (${hashtag}) неверные символы.`;
    return false;
  }
  return true;
};

//валидация всех хештегов
const validateAllHastags = (value) => {

  let validate = '';
  textHashtags.classList.add('error__description');

  message = '';
  const regExp = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

  //убираем пробелы и формируем массив
  let hashtags = value.split(/\s+/g);
  hashtags = hashtags.filter((element) => element !== '');

  //проверка на кол-во хештегов
  if (hashtags.length > MAX_COUNT_HASHTAGS) {
    message = `Количество хештегов превышает допустимое: ${MAX_COUNT_HASHTAGS}`;
    return false;
  }

  validate = validateHastag(hashtags, regExp);
  if(validate){
    textHashtags.classList.remove('error__description');
  }
  return validate;
};

//2-е функции с текстом ошибки
const getHashtagErrorMessage = () => message;

const getCommentErrorMessage = () => `Максимум ${MAX_COMMENT_LENGTH} символов`;


//установка валидаторов
const setValidateHashtagComment = () => {

  pristine = window.Pristine(formUpload, {
    classTo: 'form__text__pristine',
    errorClass: 'has-danger',
    errorTextParent: 'form__text__pristine',
    errorTextTag: 'div',
  }, true);

  pristine.addValidator(textComment, validateComment, getCommentErrorMessage);

  pristine.addValidator(textHashtags, validateAllHastags, getHashtagErrorMessage);
};


export { setValidateHashtagComment, pristine };

