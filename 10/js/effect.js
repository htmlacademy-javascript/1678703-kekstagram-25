const EFFECT_PREWIEW = 'effects__preview--';
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const previewImg = document.querySelector('.img-upload__preview__img');
// const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
const CurrentEffect = {
  MAX: 0,
  EFFECT: '',
};


//установка эффекта при создании/смене ноуслайдера и при изменении уровня эффекта
const changeLvlEffect = (lvlEffect) => {

  imgUploadEffectLevel.classList.remove('hidden');

  switch (CurrentEffect.EFFECT) {
    case 'chrome':
      previewImg.style.filter = `grayscale(${lvlEffect})`;
      break;
    case 'sepia':
      previewImg.style.filter = `sepia(${lvlEffect})`;
      break;
    case 'marvin':
      previewImg.style.filter = `invert(${lvlEffect}%)`;
      break;
    case 'phobos':
      previewImg.style.filter = `blur(${lvlEffect}px)`;
      break;
    case 'heat':
      previewImg.style.filter = `brightness(${lvlEffect})`;
      break;
    default:
      imgUploadEffectLevel.classList.add('hidden'); //здесь эффект - none
      previewImg.style.filter = '';
  }
};

//смена фильтра у эффекта,
//срабатывает при смене эффекта, уровень эффекта будет установлен колбэком ноуслайдера
const changeFilter = (mode = '') => {

  if(mode === 'reset') {
    CurrentEffect.EFFECT = '';
    previewImg.classList.remove('img-upload__preview__img'); //удаляем класс добавленный для удобства поиска
  }

  //получает массив из DomTokenList, потом возвращаем имя класса (с названием эффекта) по подстроке
  const classesAll = Array.prototype.slice.call(previewImg.classList,0);
  const nameEffect = classesAll.find((item) => item.includes(EFFECT_PREWIEW));

  previewImg.classList.remove(nameEffect);
  if(CurrentEffect.EFFECT !== '') {
    previewImg.classList.add(`.${EFFECT_PREWIEW}${CurrentEffect.EFFECT}`);
  }
};

//создание слайдера
const createSlaider = () => {

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    connect: 'lower',
    format: {
      to: function (value) {
        return value;
      },
      from: function (value) {
        return parseFloat(value);
      },
    },
  });

  //обработчик на изменение слайдера
  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];

    changeLvlEffect(effectLevelValue.value, '');
  });

  imgUploadEffectLevel.classList.add('hidden');
};

//изменение слайдера, при вызове сначала срабатываает она, потом update слайдера
const changeSlaider = (min, max, start, step) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
};

//срабатывает при смене эффекта пользователем
const changeEffectClick = (effect, max, start, step) => {
  CurrentEffect.EFFECT = effect;
  CurrentEffect.MAX = max;

  changeFilter();
  changeSlaider(0, max, start, step);
};

export { createSlaider, changeEffectClick, changeFilter };
