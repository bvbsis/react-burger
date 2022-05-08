import {
  GET_ORDER_DETAILS_REQUEST,
  GET_ORDER_DETAILS_SUCCESS,
  GET_ORDER_DETAILS_FAILED,
} from "../actions/burger-constructor";

const initialState = {
  currentIngredients: [
    {
      _id: "60d3b41abdacab0026a733c7",
      name: "Флюоресцентная булка R2-D3",
      type: "bun",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733c8",
      name: "Филе Люминесцентного тетраодонтимформа",
      type: "main",
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: "https://code.s3.yandex.net/react/code/meat-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-03-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733cd",
      name: "Соус фирменный Space Sauce",
      type: "sauce",
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: "https://code.s3.yandex.net/react/code/sauce-04.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733ce",
      name: "Соус традиционный галактический",
      type: "sauce",
      proteins: 42,
      fat: 24,
      carbohydrates: 42,
      calories: 99,
      price: 15,
      image: "https://code.s3.yandex.net/react/code/sauce-03.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-03-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-03-large.png",
      __v: 0,
    },
    {
      _id: "60d3b41abdacab0026a733cf",
      name: "Соус с шипами Антарианского плоскоходца",
      type: "sauce",
      proteins: 101,
      fat: 99,
      carbohydrates: 100,
      calories: 100,
      price: 88,
      image: "https://code.s3.yandex.net/react/code/sauce-01.png",
      image_mobile: "https://code.s3.yandex.net/react/code/sauce-01-mobile.png",
      image_large: "https://code.s3.yandex.net/react/code/sauce-01-large.png",
      __v: 0,
    },
  ],
  isLoading: false,
  isError: false,
  orderNumber: null,
  error: null,
};

const burgerConstructorDispatcher = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDER_DETAILS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_ORDER_DETAILS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isError: false,
        orderNumber: action.orderNumber,
      };
    }
    case GET_ORDER_DETAILS_FAILED: {
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    }
    default:
      return state;
  }
};

export default burgerConstructorDispatcher;
