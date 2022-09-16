import { ActionCreator, Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { TBurgerConstructorActions } from "../../services/redux/actions/burger-constructor";
import { TBurgerIngredientsActions } from "../../services/redux/actions/burger-ingredients";
import { TUserActions } from "../../services/redux/actions/user";
import { TWsActions } from "../../services/redux/actions/ws";
import store from "../../services/redux/store";

type TIngredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

type TConstructorElement = TIngredient & {
  uuid: string;
};

type TOrder = {
  _id: string;
  ingredients: Array<string>;
  status: "done" | "pending" | "created";
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
};

type TOrdersData = {
  orders: ReadonlyArray<TOrder>;
  total: number;
  totalToday: number;
};

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type TApplicationActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TUserActions
  | TWsActions;
export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type { TIngredient, TOrder, TConstructorElement, TOrdersData };
