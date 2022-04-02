import { renderPhotos } from './render-photo.js';
import { getRandomInt } from './util.js';


const QUANTITY_RANDOM = 10;
const RERENDER_DELAY = 500;
const FilterPhotos = {
  DEFAULT: [],
  RANDOM: [],
  DISCUSSED: [],
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

//включает фильтр, ищет отсортированный массив, и вызывает отрисовку с задержкой
const changeFilter = (cb) => (evt) => {
  filterButtons.forEach((element) => {
    element.classList.remove('img-filters__button--active');
  });
  evt.target.classList.add('img-filters__button--active');
  const photos = FilterPhotos[evt.target.id.replace('filter-', '').toUpperCase()];

  cb(photos);
};

//смена фильтра и перерисовка фото на странице
const onFilterFormClick = changeFilter(debounce((photos) => renderPhotos(photos), RERENDER_DELAY));

//установка обработчиков на фильтры
const setListenersFilters = () => {
  filterForm.addEventListener('click', onFilterFormClick);
};


//рандомные первые n-фото
const sortRandomFirst = (photos) => {

  const currentPhotos = [];
  const checkedValues = [];
  for (let i = 0; i < QUANTITY_RANDOM; i++) {
    const j = getRandomInt(0, photos.length - 1, checkedValues);
    currentPhotos.push(photos[j]);
  }
  for (const elem of photos) {
    if (currentPhotos.includes(elem)) {
      continue;
    }
    currentPhotos.push(elem);
  }
  return currentPhotos;
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
  FilterPhotos.DEFAULT = photos;
  FilterPhotos.RANDOM = sortRandomFirst(photos);
  FilterPhotos.DISCUSSED = sortDiscussed(photos);
};

export { setListenersFilters, filterPhotos};


