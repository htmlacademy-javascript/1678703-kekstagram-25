import { getRandomInt } from './util.js';

const ARRAY_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const ARRAY_NAMES = [
  'Олег',
  'Маша',
  'Саша',
  'Вася',
  'Лена',
  'Леша',
];
const OBJECT_COUNT = 25;
const LikeCount = {
  MIN: 15,
  MAX: 200,
};
const AvatarCount = {
  MIN: 1,
  MAX: 6,
};
const MessageCount = {
  MIN: 1,
  MAX: 2,
};
const CommentCount = {
  MIN: 0,
  MAX: 16,
};
const MAX_ID = 200;


//получить сообщения
const getMessage = () => {
  const count = getRandomInt(MessageCount.MIN, MessageCount.MAX);
  let message = '';
  for (let i = count; i <= count; i++) {
    message = `${ARRAY_MESSAGES[getRandomInt(0, ARRAY_MESSAGES.length - 1)]}${' '}${message}`;
  }
  return message;
};

//получить массив комментариев
const getComments = (checkedCommentId) => {

  const commentUserCount = getRandomInt(CommentCount.MIN, CommentCount.MAX);

  const comments = [];
  for (let i = 1; i <= commentUserCount; i++) {
    comments.push({
      'id': getRandomInt(1, MAX_ID, checkedCommentId),
      'avatar': `img/avatar-${getRandomInt(AvatarCount.MIN, AvatarCount.MAX)}.svg`,
      'message': getMessage(),
      'name': ARRAY_NAMES[getRandomInt(0, ARRAY_NAMES.length - 1)],
    });
  }
  return comments;
};


//получить массив данных
const getData = () => {

  const checkedId = [];
  const checkedFotoId = [];

  const сheckedCommentId = [];
  const currentData = [];

  for (let i = 1; i <= OBJECT_COUNT; i++) {

    currentData.push({
      'id': getRandomInt(1, OBJECT_COUNT, checkedId),
      'url': `photos/${getRandomInt(1, OBJECT_COUNT, checkedFotoId)}.jpg`,
      'description': 'Описание фотографии',
      'likes': getRandomInt(LikeCount.MIN, LikeCount.MAX),
      'comments': getComments(сheckedCommentId),
    }, );
  }
  return currentData;
};


export { getData };
