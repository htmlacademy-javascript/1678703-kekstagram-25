import { getData } from './data.js';
import { renderPhotos } from './render-photo.js';
import { uploadFile } from './upload.js';
// import { setListenersFilters } from './filter.js';

renderPhotos(getData()); //это загрузка локальных фото

// setListenersFilters();

uploadFile();

