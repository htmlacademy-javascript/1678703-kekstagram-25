import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

const EFFECT_PREWIEW = 'effects__preview--';
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');


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

  sliderElement.noUiSlider.on('update', (values, handle) => {
    effectLevelValue.value = values[handle];

    changeFilter(effectLevelValue.value, '');
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

//смена фильтра у эффекта
function changeFilter (lvlEffect, effect) {

  //пустой эффект передается при обновлении слайдера,
  //нужно обновить уже установленный эффект
  if (effect !== '') {
    let addEffect = false;
    for (const elem of imgUploadPreview.children) {
      if (elem.className.includes(EFFECT_PREWIEW)) {
        if (!elem.className.includes(effect)) {
          imgUploadPreview.children[0].classList.remove(elem.className);
          addEffect = true;
          imgUploadPreview.children[0].classList.add(`.${EFFECT_PREWIEW}${effect}`);
        }
      }
    }
    //первое добавление при открытии
    if (!addEffect) {
      imgUploadPreview.children[0].classList.add(`.${EFFECT_PREWIEW}${effect}`);
    }
    imgUploadEffectLevel.classList.remove('hidden');
    changeEffect(lvlEffect, effect);

  } else {
    for (const elem of imgUploadPreview.children) {
      if (elem.className.includes(EFFECT_PREWIEW)) {
        effect = elem.className.slice(EFFECT_PREWIEW.length + 1);
        changeEffect(lvlEffect, effect);
      }
    }
  }
}


//установка эффекта
function changeEffect (lvlEffect, effect) {

  if (effect === 'none') {
    imgUploadEffectLevel.classList.add('hidden');
    imgUploadPreview.children[0].style.filter = '';

  } else if (effect === 'chrome') {
    imgUploadPreview.children[0].style.filter = `grayscale(${lvlEffect})`;

  } else if (effect === 'sepia') {
    imgUploadPreview.children[0].style.filter = `sepia(${lvlEffect})`;

  } else if (effect === 'marvin') {
    imgUploadPreview.children[0].style.filter = `invert(${lvlEffect}%)`;

  } else if (effect === 'phobos') {
    imgUploadPreview.children[0].style.filter = `blur(${lvlEffect}px)`;

  } else if (effect === 'heat') {
    imgUploadPreview.children[0].style.filter = `brightness(${lvlEffect})`;

  }
}

//срабатывает при смене эффекта пользователем
const changeEffectClick = (effect, max, start, step) => {
  changeFilter(max, effect);
  changeSlaider(0, max, start, step);
};

export { createSlaider, changeEffectClick, changeFilter };
