import { isEscEvent } from './util.js';

const LOAD_COMMENTS_STEP = 5;

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
const RememberComments = {
  COMMENTS: 0,
  COUNT_OPEN: 0,
};


//нажатие на кнопку Загрузить еще
function onLoaderClick() {
  loadNextComments();
}

//нажатие на кнопку закрытия большого фото
function onCancelClick() {
  bigPicture.classList.add('hidden');
}

//закрытие окна: добавляет класс и удаляет обработчик
function hideBigPhoto() {
  bigPicture.classList.add('hidden');
  bodySelector.classList.add('modal-open');

  document.removeEventListener('keydown', onPopupeEscPress);
  socialCommentsLoader.removeEventListener('click', onLoaderClick);
  pictureCancel.removeEventListener('click', onCancelClick);
}

//нажатие клавиши Esc на открытом окне
function onPopupeEscPress(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideBigPhoto();
  }
}


//открытие окна: удаляет класс и добавляет обработчики на нажатие клавиши и на клик
function showPhoto() {

  bigPicture.classList.remove('hidden');
  document.addEventListener('keydown', onPopupeEscPress);
  socialCommentsLoader.addEventListener('click', onLoaderClick);
  pictureCancel.addEventListener('click', onCancelClick);

  //показываем прокрутку
  bodySelector.classList.remove('.modal-open');
}


//заполнения полей фото
function fillBigPhoto(photo) {

  likesCount.textContent = photo.likes;
  bigPictureImg.querySelector('img').src = photo.url;
  commentsCountText.textContent = photo.comments.length;
  socialCaption.textContent = photo.description;
  RememberComments.COMMENTS = photo.comments.slice();

  renderComments();
}

//загрузка порции комментариев
function loadNextComments() {

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
}

//создать строку для отображения счетчика
function setStringCount() {

  commentsLoader.classList.remove('hidden');
  socialCommentCount.innerHTML = `${RememberComments.COUNT_OPEN} из <span class="comments-count">${RememberComments.COMMENTS.length}</span> комментариев`;
  if(RememberComments.COMMENTS.length <= LOAD_COMMENTS_STEP || RememberComments.COUNT_OPEN === RememberComments.COMMENTS.length){
    commentsLoader.classList.add('hidden');
  }
}

//удаляем комменты из разметки и добавляем свои (все), видимость комментов в showComments
function renderComments() {

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
}

//добавляем коммент во фрагмент
function addComment(comment) {
  const currentComment = socialComment.cloneNode(true);
  const socialPicture = currentComment.querySelector('.social__picture');
  const socialText = currentComment.querySelector('.social__text');

  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialText.textContent = comment.message;
  commentListFragment.appendChild(currentComment);
}

//удаляем комменты из разметки
function deleteComments() {
  for (let i = socialComments.children.length - 1; i >= 0; i--) {
    const child = socialComments.children[i];
    child.parentElement.removeChild(child);
  }
}

//открыть окно
function showBigPhoto(photo) {

  fillBigPhoto(photo);

  showPhoto();

}

export { showBigPhoto };
