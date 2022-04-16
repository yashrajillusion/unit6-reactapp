import axios from "axios";

export const ADD_CITY = "ADD_CITY";
export const GET_ALL_CITY = "GET_ALL_CITY";
export const CITY_LOADING = "CITY_LOADING";
export const CITY_ERROR = "CITY_ERROR";

export const addcity = (city) => ({
  type: ADD_CITY,
  payload: city
});
export const cityLoading = (status) => ({
  type: CITY_LOADING,
  payload: status
});
export const cityError = (status) => ({
  type: CITY_ERROR,
  payload: status
});

export const getAllcity = () => async (dispatch) => {
  try {
    dispatch(cityLoading(true));
    let res = await axios.get("https://unit6-reactapp.herokuapp.com/cities");
    let { data } = res;
    dispatch(addcity(data));
    dispatch(cityLoading(false));
    cityError(false);
  } catch (err) {
    console.log(err.message);
    dispatch(cityLoading(false));
    cityError(true);
  }
};

export const deleteCity = (id) => async (dispatch) => {
  try {
    dispatch(cityLoading(true));
    let res = await axios.delete(
      `https://unit6-reactapp.herokuapp.com/cities/${id}`
    );
    dispatch(getAllcity());
  } catch (err) {
    console.log(err.message);
    dispatch(cityLoading(false));
  }
};

export const addCityToDb = (city) => async (dispatch) => {
  try {
    dispatch(cityLoading(true));
    await axios.post("https://unit6-reactapp.herokuapp.com/cities", city);
    dispatch(cityLoading(false));
    dispatch(getAllcity());
  } catch (err) {
    console.log(err.message);
    dispatch(cityLoading(false));
  }
};
