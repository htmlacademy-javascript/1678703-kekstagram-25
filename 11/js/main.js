import { uploadFile } from './upload.js';
import {fillSite} from './fill-site.js';
import { setListenersFilters } from './filter.js';

//это загрузка локальных фото ПОКА ОСТАВИЛ, УБЕРУ В КОНЦЕ
// import { getData } from './data.js';
// import { renderPhotos } from './render-photo.js';
// renderPhotos(getData());


fillSite();

uploadFile();

setListenersFilters();

