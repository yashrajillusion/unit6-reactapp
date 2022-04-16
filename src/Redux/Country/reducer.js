import { ADD_COUNTRY, COUNTRY_LOADING } from "./action";

const initState = {
  country: [],
  loading: false,
  error: false
};

export const countryReducer = (store = initState, { type, payload }) => {
  switch (type) {
    case ADD_COUNTRY:
      return { ...store, country: [...payload] };
    case COUNTRY_LOADING:
      return { ...store, loading: payload };
    default:
      return store;
  }
};
