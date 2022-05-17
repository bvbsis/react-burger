export const ApiUrl = (endpoint) => {
  return `https://norma.nomoreparties.space/api/${endpoint}`;
};

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};
