import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCountryToDb } from "../Redux/Country/action";

const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;
export const Country = () => {
  let { country: countryArr, loading, error } = useSelector(
    (store) => store.country
  );
  const [country, setcountry] = useState({ name: "" });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setcountry({ name: value });
  };
  const addCountries = async (e) => {
    e.preventDefault();
    dispatch(addCountryToDb(country));
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <Wrapper>
      <form>
        <label>New County</label>
        <input
          onChange={handleChange}
          type="text"
          placeholder="...add new country"
        />
        <button type="submit" onClick={addCountries}>
          Add
        </button>
      </form>
    </Wrapper>
  );
};
