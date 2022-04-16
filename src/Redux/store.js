import { applyMiddleware, combineReducers, createStore } from "redux";
import { cityReducer } from "./Cities/reducer";
import { countryReducer } from "./Country/reducer";

const rootReduce = combineReducers({
  country: countryReducer,
  city: cityReducer
});

const loggerMiddleware = (store) => (next) => (action) => {
  if (typeof action === "function") {
    return action(store.dispatch);
  }
  next(action);
};

export const store = createStore(rootReduce, applyMiddleware(loggerMiddleware));
