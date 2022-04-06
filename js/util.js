const NameBlock = {
  SUCCESS: 'success',
  ERROR: 'error',
};


//удаление блока c сообщением
const deleteBlock = (name) => {
  const currentBlock = document.querySelector(name);
  currentBlock.remove();
};

//проверить нажата ли клавиша Escape или Esc
const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

//нажатие Escape
const onEscPress = (name) => (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    deleteBlockMessage(name);
  }
};

//обработчики нажатия Escape
const onEscPressSuccess = onEscPress(NameBlock.SUCCESS);
const onEscPressError = onEscPress(NameBlock.ERROR);

//клик на любом месте окна кроме таблички
const onDocumentClick = (name) => (evt) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains(name)) {
    deleteBlockMessage(name);
  }
};

const onDocumentClickSuccess = onDocumentClick(NameBlock.SUCCESS);
const onDocumentClickError = onDocumentClick(NameBlock.ERROR);

//клик на кнопке закрытия, обработчики не удаляем, т.к. элемент будет удален
const onButtonPressSuccess = () => {
  deleteBlockMessage(NameBlock.SUCCESS);
};
const onButtonPressError = () => {
  deleteBlockMessage(NameBlock.ERROR);
};


//показать окно с ошибкой загрузки либо успешной загрузки
const showBlockMessage = (text, textButton, name) => {

  const currentTemplate = document.querySelector(`#${name}`).content.querySelector(`.${name}`);
  const body = document.querySelector('body');

  const currentBlock = currentTemplate.cloneNode(true);
  currentBlock.querySelector(`.${name}__title`).textContent = text;
  const currentButton = currentBlock.querySelector(`.${name}__button`);
  currentButton.textContent = textButton;

  body.appendChild(currentBlock);

  if (name === NameBlock.SUCCESS) {
    document.addEventListener('keydown', onEscPressSuccess);
    currentButton.addEventListener('click', onButtonPressSuccess);
    document.addEventListener('click', onDocumentClickSuccess);
    return;
  }
  document.addEventListener('keydown', onEscPressError);
  currentButton.addEventListener('click', onButtonPressError);
  document.addEventListener('click', onDocumentClickError);
};

//удалить блок с сообщением и обработчики (поднятие)
function deleteBlockMessage(name) {
  if (name === NameBlock.SUCCESS) {
    document.removeEventListener('keydown', onEscPressSuccess);
    document.removeEventListener('click', onDocumentClickSuccess);
  } else {
    document.removeEventListener('keydown', onEscPressError);
    document.removeEventListener('click', onDocumentClickError);
  }
  deleteBlock(`.${name}`);
}

export { isEscEvent, showBlockMessage};
