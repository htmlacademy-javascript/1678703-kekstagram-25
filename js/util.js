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
const onPopupeEscPress = (name) => (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    deleteBlockMessage(name);
  }
};

//обработчики нажатия Escape
const successEscHandler = onPopupeEscPress(NameBlock.SUCCESS);
const errorEscHandler = onPopupeEscPress(NameBlock.ERROR);

//клик на любом месте окна кроме таблички
const onDocumentClick = (name) => (evt) => {
  const currentElement = evt.target;
  if (currentElement.classList.contains(name)) {
    deleteBlockMessage(name);
  }
};

const successClickHandler = onDocumentClick(NameBlock.SUCCESS);
const errorClickHandler = onDocumentClick(NameBlock.ERROR);

//клик на кнопке закрытия, обработчики не удаляем, т.к. элемент будет удален
const successButtonHandler = () => {
  deleteBlockMessage(NameBlock.SUCCESS);
};
const errorButtonHandler = () => {
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
    document.addEventListener('keydown', successEscHandler);
    currentButton.addEventListener('click', successButtonHandler);
    document.addEventListener('click', successClickHandler);
    return;
  }
  document.addEventListener('keydown', errorEscHandler);
  currentButton.addEventListener('click', errorButtonHandler);
  document.addEventListener('click', errorClickHandler);
};

//удалить блок с сообщением и обработчики (поднятие)
function deleteBlockMessage(name) {
  if (name === NameBlock.SUCCESS) {
    document.removeEventListener('keydown', successEscHandler);
    document.removeEventListener('click', successClickHandler);
  } else {
    document.removeEventListener('keydown', errorEscHandler);
    document.removeEventListener('click', errorClickHandler);
  }
  deleteBlock(`.${name}`);
}

export { isEscEvent, showBlockMessage};
