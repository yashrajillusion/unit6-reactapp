import { ADD_CITY, CITY_LOADING } from "./action";

const initState = {
  city: [],
  loading: false,
  error: false
};

export const cityReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_CITY:
      return { ...store, city: [...payload] };
    case CITY_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
