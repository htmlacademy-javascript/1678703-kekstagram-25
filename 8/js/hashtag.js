const MAX_COMMENT_LENGTH = 140;
const MAX_COUNT_HASHTAGS = 5;
const MAX_LENGTH_HASHTAG = 20;
const MIN_LENGTH_HASHTAG = 2;
const FIRST_SIMBOL_HASHTAG = '#';


const formUpload = document.querySelector('.img-upload__form');
const textComment = formUpload.querySelector('.text__description');
const textHashtags = formUpload.querySelector('.text__hashtags');
const pristine = new Pristine(formUpload, {
  classTo: 'form__text__pristine',
  errorTextParent: 'form__text__pristine',
  errorTextTag: 'div',
}, true);


function validateComment(value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

let message = '';
function validateAllHastags(value) {

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

  return validateHastag(hashtags, regExp);
}


function validateHastag(hashtags, regExp) {

  //обход всех хештегов
  const repeatingHastags = [];
  for (const hashtag of hashtags) {
    //все валидные
    if (regExp.test(hashtag)) {
      //проверка повторяющихся хештегов без учета регистра
      if (repeatingHastags.indexOf(hashtag.toLowerCase()) >= 0) {
        message = `Хештег (${hashtag}) уже использовался.`;
        return false;
      }
      repeatingHastags.push(hashtag.toLowerCase());
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
}

//функция с текстом ошибки
function getHashtagErrorMessage() {
  return message;
}

function getCommentErrorMessage() {
  return `Максимум ${MAX_COMMENT_LENGTH} символов`;
}

function setValidateHashtagComment() {
  pristine.addValidator(textComment, validateComment, getCommentErrorMessage);

  pristine.addValidator(textHashtags, validateAllHastags, getHashtagErrorMessage);
}


export { setValidateHashtagComment, pristine };
