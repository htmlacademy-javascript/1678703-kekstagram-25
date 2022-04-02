import { showBigPhoto } from './big-photo.js';

const pictures = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');
const fragment = document.createDocumentFragment();
const imgFilters = document.querySelector('.img-filters');

// //копирование шаблона и его наполнение
const renderPhoto = (photo) => {

  const photoPreview = template.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = photo.url;
  photoPreview.querySelector('.picture__comments').textContent = photo.comments.length;
  photoPreview.querySelector('.picture__likes').textContent = photo.likes;

  photoPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPhoto(photo);
  });

  return photoPreview;
};

//удаление фото перед загрузкой новых
const removePhotos = () => {
  const picturesAll = document.querySelectorAll('.picture');
  picturesAll.forEach((element) => {
    element.remove();
  });
};

//обход массива с фото, вызов функции по наполнению шаблона и заполнение фрагмента
const renderPhotos = (photos) => {

  removePhotos();

  photos.forEach((photo) => {
    fragment.appendChild(renderPhoto(photo));
  });
  pictures.appendChild(fragment);
  imgFilters.classList.remove('img-filters--inactive');
};

export { renderPhotos };
