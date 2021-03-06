import { isEscEvent } from './util.js';

const LOAD_COMMENTS_STEP = 5;
const RememberComments = {
  COMMENTS: [],
  COUNT_OPEN: 0,
};

const bigPicture = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('.big-picture__cancel');
const bodySelector = document.querySelector('body');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountText = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentListFragment = document.createDocumentFragment();
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const commentsLoader = bigPicture.querySelector('.comments-loader');


//создать строку для отображения счетчика
const setStringCount = () => {

  commentsLoader.classList.remove('hidden');
  socialCommentCount.innerHTML = `${RememberComments.COUNT_OPEN} из <span class="comments-count">${RememberComments.COMMENTS.length}</span> комментариев`;
  if(RememberComments.COMMENTS.length <= LOAD_COMMENTS_STEP || RememberComments.COUNT_OPEN === RememberComments.COMMENTS.length){
    commentsLoader.classList.add('hidden');
  }
};

//добавляем коммент во фрагмент
const addComment = (comment) => {
  const currentComment = socialComment.cloneNode(true);
  const socialPicture = currentComment.querySelector('.social__picture');
  const socialText = currentComment.querySelector('.social__text');

  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialText.textContent = comment.message;
  commentListFragment.appendChild(currentComment);
};

//загрузка порции комментариев
const loadNextComments = () => {

  let count = 0;

  //скопируем массив комментов с тех комментариев которые еще не открыты
  const copyComments = RememberComments.COMMENTS.slice(RememberComments.COUNT_OPEN);
  for (const comment of copyComments) {
    count++;
    if (count <= LOAD_COMMENTS_STEP) {
      addComment(comment);
      RememberComments.COUNT_OPEN++;
      continue;
    }
    break;
  }
  socialComments.appendChild(commentListFragment);

  setStringCount();
};

//нажатие на кнопку Загрузить еще
const onLoaderClick = () => {
  loadNextComments();
};

//закрытие окна: добавляет/удаляет классы и удаляет обработчики
const hideBigPhoto = () => {
  bigPicture.classList.add('hidden');
  bodySelector.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupeEscPress);
  socialCommentsLoader.removeEventListener('click', onLoaderClick);
  pictureCancel.removeEventListener('click', onCancelClick);
};

//нажатие на кнопку закрытия большого фото
function onCancelClick () {
  hideBigPhoto();
}

//нажатие клавиши Esc на открытом окне
function onPopupeEscPress (evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideBigPhoto();
  }
}

//открытие окна: удаляет класс и добавляет обработчики на нажатие клавиши и на клик
const showPhoto = () => {

  //убираем прокрутку
  bodySelector.classList.add('modal-open');
  bigPicture.classList.remove('hidden');

  document.addEventListener('keydown', onPopupeEscPress);
  socialCommentsLoader.addEventListener('click', onLoaderClick);
  pictureCancel.addEventListener('click', onCancelClick);

};

//удаляем комменты из разметки
const deleteComments = () => {
  for (let i = socialComments.children.length - 1; i >= 0; i--) {
    const child = socialComments.children[i];
    child.parentElement.removeChild(child);
  }
};

//удаляем комменты из разметки и добавляем свои (все), видимость комментов в showComments
const renderComments = () => {

  deleteComments();

  let count = 0;
  for (const comment of RememberComments.COMMENTS) {
    count++;
    if (count <= LOAD_COMMENTS_STEP) {
      addComment(comment);
      RememberComments.COUNT_OPEN = count;
      continue;
    }
    break;
  }
  socialComments.appendChild(commentListFragment);

  setStringCount();
};

//заполнения полей фото
const fillBigPhoto = (photo) => {

  likesCount.textContent = photo.likes;
  bigPictureImg.querySelector('img').src = photo.url;
  commentsCountText.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  RememberComments.COMMENTS = photo.comments.slice();
  RememberComments.COUNT_OPEN = 0;

  renderComments();
};

//открыть окно
const showBigPhoto = (photo) => {

  fillBigPhoto(photo);

  showPhoto();

};

export { showBigPhoto };
