const URL = {
  GET: 'https://25.javascript.pages.academy/kekstagram/data',
  POST: 'https://25.javascript.pages.academy/kekstagram',
};


//проверка результата fetch, вызываем ошибку со своим текстом,
//все что после ошибки исполняется, потому что в catch находится.
const checkStatus = (response) => {
  if (response.ok) {
    return response.json();
  }
  throw new Error(`${response.status} ${response.statusText}`);
};

//запрос на сервер
const sendRequest = (metod, bodyRequest, onSuccess, onError) => {

  fetch(URL[metod], bodyRequest)
    .then(checkStatus)
    .then((response) => {
      onSuccess(response);
    })
    .catch((error) => {
      onError(error);
    });
};

export { sendRequest };
