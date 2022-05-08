export const OPEN_INGREDIENT_MODAL = 'OPEN_INGREDIENT_MODAL';
export const OPEN_ORDER_MODAL = 'OPEN_ORDER_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openIngredientModal = (dispatch, ingredient, heading) => {
  dispatch({
    type: OPEN_INGREDIENT_MODAL,
    ingredient,
    heading
  })
}