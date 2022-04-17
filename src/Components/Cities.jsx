import axios from "axios";
import { nanoid } from "nanoid";
import { useState } from "react";
import styled from "styled-components";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addCityToDb } from "../Redux/Cities/action";
const Wrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: center;
`;
export const Cities = () => {
  const { country } = useSelector((store) => store.country);
  const { city: cityarray, loading, error } = useSelector(
    (store) => store.city
  );
  const dispatch = useDispatch();
  const [city, setCity] = useState({
    country: "",
    city: "",
    population: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
  };
  const addCountries = async (e) => {
    e.preventDefault();
    dispatch(addCityToDb(city));
  };
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Wrapper>
      <form style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
        <label>New Cities</label>
        <input
          onChange={handleChange}
          type="text"
          name="city"
          placeholder="...add new Cities"
        />
        <input
          onChange={handleChange}
          type="number"
          name="population"
          placeholder="...add population"
        />
        <select
          onChange={handleChange}
          value={city.country}
          name="country"
          id=""
        >
             <option>choose country</option>
          {country.map((el) => (
            <option key={nanoid()} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>
        <button type="submit" onClick={addCountries}>
          Add
        </button>
      </form>
    </Wrapper>
  );
};
