import { renderPhotos } from './render-photo.js';


const QUANTITY_RANDOM = 10;
const RERENDER_DELAY = 500;
const FilterPhotos = {
  DEFAULT_PHOTOS: [],
  RANDOM_PHOTOS: [],
  DISCUSSED_PHOTOS: [],
};

const filterButtons = document.querySelectorAll('.img-filters__button');
const filterForm = document.querySelector('.img-filters__form');

//задержка отрисовки
const debounce = (callback, timeOut) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeOut);
  };
};

//рандомные первые n-фото
const sortRandomFirst = (photos) => photos.sort(() => Math.random() > 0.5 ? 1 : -1).slice(0, QUANTITY_RANDOM);

//включает фильтр, ищет отсортированный массив, и вызывает отрисовку с задержкой
const changeFilter = (cb) => (evt) => {
  filterButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
  const nameFilter = evt.target.id.replace('filter-', '');
  let photos = FilterPhotos[nameFilter.toUpperCase()];

  if (nameFilter === 'random') {
    photos = sortRandomFirst(FilterPhotos.DEFAULT_PHOTOS.slice());
  }

  cb(photos);
};

//смена фильтра и перерисовка фото на странице
const onFilterFormClick = changeFilter(debounce((photos) => renderPhotos(photos), RERENDER_DELAY));

//установка обработчиков на фильтры
const setListenersFilters = () => {
  filterForm.addEventListener('click', onFilterFormClick);
};


//сравнение кол-ва комментариев у фото
const compareComments = (elementA, elementB) => {
  const rankA = elementA.comments.length;
  const rankB = elementB.comments.length;
  return rankB - rankA;
};

//сортировка по убыванию комментариев
const sortDiscussed = (photos) => photos.slice().sort(compareComments);

//запоминаем сортировку, она меняться не будет с момента загрузки,
//т.к. нет действий пользователей.
const filterPhotos = (photos) => {
  FilterPhotos.DEFAULT_PHOTOS = photos;
  FilterPhotos.DISCUSSED_PHOTOS = sortDiscussed(photos);
};

export { setListenersFilters, filterPhotos};


