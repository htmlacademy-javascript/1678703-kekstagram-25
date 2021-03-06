const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const scaleControlValue = document.querySelector('.scale__control--value');


//функция изменения масштаба
const setScale = (scale) => {
  let scaleValue = Number(scaleControlValue.value.replace('%', ''));

  if (scale === 'smaller' && scaleValue > 25) {
    scaleValue = scaleValue - 25;
  } else if (scale === 'bigger' && scaleValue < 100) {
    scaleValue = scaleValue + 25;
  } else if (scale === 'reset') {
    scaleValue = 100;
  }
  scaleControlValue.setAttribute('value', `${scaleValue}%`);
  scaleValue = scaleValue === 100 ? '1' : `0.${scaleValue}`;
  imgUploadPreview.children[0].style.transform = `scale(${scaleValue})`;
};

const onSmallerScaleClick = () => {
  setScale('smaller');
};
const onBiggerScaleClick = () => {
  setScale('bigger');
};

//функция подключения обработчиков масштаба
const setListenersScale = () => {
  scaleControlSmaller.addEventListener('click', onSmallerScaleClick);
  scaleControlBigger.addEventListener('click', onBiggerScaleClick);
};


export { setListenersScale, setScale, onSmallerScaleClick, onBiggerScaleClick };
