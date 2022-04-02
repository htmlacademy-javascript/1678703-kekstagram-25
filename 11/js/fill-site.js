import { renderPhotos } from './render-photo.js';
import { sendRequest } from './fetch.js';
import { showBlockMessage } from './util.js';
import {filterPhotos} from './filter.js';

const TEXT_ERROR = 'Ошибка загрузки изображений';
const TEXT_ERROR_BUTTON = 'Закрыть';

//здесь отрисовка
const onSuccess = (photos) => {

  filterPhotos(photos);

  renderPhotos(photos);

};

const onError = () => {
  showBlockMessage(TEXT_ERROR, TEXT_ERROR_BUTTON, 'error');
};

//получение фото с сервера и отрисовка их
const fillSite = () => {
  sendRequest('GET', { method: 'GET' }, onSuccess, onError);
};

export { fillSite };
