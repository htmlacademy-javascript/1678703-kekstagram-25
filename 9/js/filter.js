/* eslint-disable no-unused-vars */
/* eslint-disable indent */

// import { getArrayPhotos } from './photos.js';
// import { getRandomInt } from './util.js';
// import _ from 'lodash';

const QUANTITY_RANDOM = 10;
const RERENDER_DELAY = 500;

const filterDefault = document.querySelector('#filter-default');
const filterRandom = document.querySelector('#filter-random');
const filterDiscussed = document.querySelector('#filter-discussed');
const imgFiltersButton = document.querySelectorAll('.img-filters__button');


// //обработчик клика фильтра
// const changeFilter = (cb) => {
//     console.log('11')
//     return (evt) => {
//         filterDefault.classList.remove('img-filters__button--active');
//         filterRandom.classList.remove('img-filters__button--active');
//         filterDiscussed.classList.remove('img-filters__button--active');

//         if (evt.target === filterDefault) {
//             filterDefault.classList.add('img-filters__button--active');
//             cb();
//             return;
//         } else if (evt.target === filterRandom) {
//             filterRandom.classList.add('img-filters__button--active');
//             cb();
//             return;
//         } else if (evt.target === filterDiscussed) {
//             filterDiscussed.classList.add('img-filters__button--active');
//             cb();
//             return;
//         }
//     }
// }

// //смена фильтра и перерисовка фото на странице
// const onFilterClick = changeFilter(_.debounce(() => getArrayPhotos(), RERENDER_DELAY));

// //установка обработчиков на фильтры
// const setListenersFilters = () => {
//     filterDefault.addEventListener('click', onFilterClick);
//     filterRandom.addEventListener('click', onFilterClick);
//     filterDiscussed.addEventListener('click', onFilterClick);
// }


// //рандомные первые n-фото
// const sortArrayRandomFirst = (array) => {

//     const currentArray = [];
//     const arrayCheck = [];
//     for (let i = 0; i < QUANTITY_RANDOM; i++) {
//         let j = getRandomInt(0, array.length - 1, arrayCheck);
//         currentArray.push(array[j]);
//     }

//     for (let elem of array) {
//         if (currentArray.includes(elem)) {
//             continue;
//         }
//         currentArray.push(elem);
//     }
//     return currentArray;
// }

// //сравнение кол-ва комментариев у фото
// const compareComments = (elementA, elementB) => {
//     const rankA = elementA.comments.length;
//     const rankB = elementB.comments.length;
//     return rankB - rankA;
// }

// //сортировка по убыванию комментариев
// const sortArrayDiscussed = (array) => {
//     return array.sort(compareComments);
// }

//сортировка массива при установке фильтров
const sortPhotos = (photos) => {
    for (const element of imgFiltersButton) {
        if (element.className.includes('img-filters__button--active')) {
            if (element === filterDefault) {
                //по умолчанию
                return photos;
            } else if (element === filterRandom) {
                return photos; //sortArrayRandomFirst(array);
            } else if (element === filterDiscussed) {
                return photos; //sortArrayDiscussed(array);
            }
        }
    }
    return photos;
};

export { sortPhotos }; //setListenersFilters
