import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";
import { Editcitytodb } from "../Redux/Cities/action";
import CircularProgress from "@mui/material/CircularProgress";

export const EditForm = () => {
  const { country } = useSelector((store) => store.country);
  const { city: cityArry, loading } = useSelector((store) => store.city);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [city, setCity] = useState({
    country: "",
    city: "",
    population: ""
  });

  useEffect(() => {
    let el = cityArry.filter((el) => el.id === +id);

    setCity({ ...el[0] });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
  };
  const editCountries = async (e) => {
    e.preventDefault();
    dispatch(Editcitytodb(city, id));
  };
  if (loading) {
    return <CircularProgress />;
  }
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      <label>Edit Cities</label>
      <input
        onChange={handleChange}
        value={city.city}
        type="text"
        name="city"
        placeholder="...add new Cities"
      />
      <input
        onChange={handleChange}
        value={city.population}
        type="number"
        name="population"
        placeholder="...add population"
      />
      <select onChange={handleChange} value={city.country} name="country" id="">
        {country.map((el) => (
          <option key={nanoid()} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      <button type="submit" onClick={editCountries}>
        Edit
      </button>
    </form>
  );
};
