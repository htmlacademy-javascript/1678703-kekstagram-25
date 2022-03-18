import { isEscEvent } from './util.js';

const LOAD_COMMENTS_STEP = 5;
const OPEN_COUNT = [0];

const bigPicture = document.querySelector('.big-picture');
const pictureCancel = document.querySelector('.big-picture__cancel');
const bodySelector = document.querySelector('body');
const socialComments = bigPicture.querySelector('.social__comments');
const socialComment = socialComments.querySelector('.social__comment');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCountText = bigPicture.querySelector('.comments-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentList = document.createDocumentFragment();
const socialCommentCount = document.querySelector('.social__comment-count');
const socialCommentsLoader = document.querySelector('.social__comments-loader');
const commentsLoader = bigPicture.querySelector('.comments-loader');


//загрузка порции комментариев
function loadNextComments() {

  let currentCount = LOAD_COMMENTS_STEP;

  //обходим всю коллекцию, сначала там открытые комменты, потом идут закрытые
  //как только доходим до закрытых - начинаем их открывать и потом вычисляем
  //сколько всего у нас получилось открытых комментов, далее перерисовываем строку состояния.
  for (const element of socialComments.children) {
    if (element.classList.contains('hidden') && currentCount > 0) {
      currentCount--;
      element.classList.remove('hidden');
    }
  }
  OPEN_COUNT[0] = OPEN_COUNT[0] + (LOAD_COMMENTS_STEP - currentCount);

  setStringCount(socialComments.children.length);
}

//создать строку для отображения счетчика
function setStringCount(count, start) {

  // для случаев когда комментов меньше или равно константе (по заданию 5), кнопку Загрузить прячем.
  if (count <= LOAD_COMMENTS_STEP && start) {
    socialCommentCount.innerHTML = `${count} из <span class="comments-count">${count}</span> комментариев`;
    commentsLoader.classList.add('hidden');
    return;
  }

  //это для случаев когда комментов больше чем в константе
  //на старте - первое число всегда константа
  OPEN_COUNT[0] = start ? LOAD_COMMENTS_STEP : OPEN_COUNT[0];
  socialCommentCount.innerHTML = `${OPEN_COUNT[0]} из <span class="comments-count">${count}</span> комментариев`;

  commentsLoader.classList.remove('hidden');
  if (OPEN_COUNT[0] === count) {
    commentsLoader.classList.add('hidden');
  }
}

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

  renderComments(photo.comments);
}

//при открытии показывает разрешенное кол-во комментариев,
//обходим всю коллекцию, ПОСЛЕДНИЕ элементы закрываем для просмотра
//выводим строку состояния комментов.
function showCommentsStart() {

  let count = 0;
  for (const elem of commentList.children) {
    count++;
    if (count > LOAD_COMMENTS_STEP) {
      elem.classList.add('hidden');
    }
  }
  setStringCount(count, true);
}

//удаляем комменты из разметки и добавляем свои (все), видимость комментов в showComments
function renderComments(comments) {

  deleteComments();

  comments.forEach((comment) => {
    addComment(comment);
  });

  showCommentsStart();

  socialComments.appendChild(commentList);
}

//добавляем коммент во фрагмент
function addComment(comment) {
  const currentComment = socialComment.cloneNode(true);
  const socialPicture = currentComment.querySelector('.social__picture');
  const socialText = currentComment.querySelector('.social__text');

  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  socialText.textContent = comment.message;
  commentList.appendChild(currentComment);
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
