import axios from "axios";

export const ADD_COUNTRY = "ADD_COUNTRY";
export const ADD_CITY = "ADD_CITY";
export const GET_ALL_COUNTRY = "GET_ALL_COUNTRY";
export const COUNTRY_LOADING = "COUNTRY_LOADING";
export const COUNTRY_ERROR = "COUNTRY_ERROR";

export const addCountry = (country) => ({
  type: ADD_COUNTRY,
  payload: country
});
export const countryLoading = (status) => ({
  type: COUNTRY_LOADING,
  payload: status
});
export const countryError = (status) => ({
  type: COUNTRY_ERROR,
  payload: status
});

export const getAllCountry = () => async (dispatch) => {
  try {
    let res = await axios.get("https://unit6-reactapp.herokuapp.com/countries");
    let { data } = res;
    dispatch(addCountry(data));
  } catch (err) {
    console.log(err.message);
  }
};

export const addCountryToDb = (country) => async (dispatch) => {
  try {
    dispatch(countryLoading(true));
    await axios.post("https://unit6-reactapp.herokuapp.com/countries", country);

    dispatch(countryLoading(false));
    dispatch(getAllCountry());
  } catch (err) {
    dispatch(countryLoading(false));
    console.log(err.message);
  }
};
