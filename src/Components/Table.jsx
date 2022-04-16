import axios from "axios";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import { addcity, deleteCity, getAllcity } from "../Redux/Cities/action";
import { getAllCountry } from "../Redux/Country/action";
import Skeleton from "@mui/material/Skeleton";
export const Table = () => {
  const { city, loading, error } = useSelector((store) => store.city);
  const { country } = useSelector((store) => store.country);
  const [editel, setedit] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllcity());
    dispatch(getAllCountry());
  }, []);

  const handleFilter = (value) => {
    let arr = city.sort((a, b) => value * (+a.population - +b.population));
    dispatch(addcity([...arr]));
  };

  const handleDelete = (id) => {
    dispatch(deleteCity(id));
  };
  const handleFilterCountry = (e) => {
    let arr = city.filter((el) => el.country === e.target.value);
    dispatch(addcity([...arr]));
  };
  const handleEdit = (obj) => {
    setedit({ ...obj });
  };
  if (loading) {
    return <Animations />;
    //  <CircularProgress className="spinner" />;
  }

  return (
    <>
      <button
        onClick={() => {
          handleFilter(1);
        }}
      >
        SortbyascPopulation
      </button>
      <button
        onClick={() => {
          handleFilter(-1);
        }}
      >
        SortbyDesPopulation
      </button>
      <select onChange={handleFilterCountry} name="country" id="">
        <option />
        {country.map((el) => (
          <option key={nanoid()} value={el.name}>
            {el.name}
          </option>
        ))}
      </select>
      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Country</th>
            <th>City</th>
            <th>Population</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        {loading ? (
          ""
        ) : (
          <tbody>
            {city.map(({ id, country, city, population }) => (
              <tr key={nanoid()}>
                <td>{id}</td>
                <td>{country}</td>
                <td>{city}</td>
                <td>{population}</td>
                <td
                  onClick={() => {
                    handleEdit({ id, country, city, population });
                  }}
                >
                  Edit
                </td>
                <td
                  onClick={() => {
                    handleDelete(id);
                  }}
                >
                  Delete
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
      <Edit el={editel} country={country} />
    </>
  );
};

export default function Animations() {
  return (
    <div>
      <CircularProgress className="spinner" />;
      <Skeleton style={{ padding: "0.7rem" }} animation="wave" />
      <Skeleton style={{ padding: "0.7rem" }} animation="wave" />
      <Skeleton style={{ padding: "0.7rem" }} animation="wave" />
      <Skeleton style={{ padding: "0.7rem" }} animation="wave" />
      <Skeleton style={{ padding: "0.7rem" }} animation="wave" />
      <Skeleton style={{ padding: "0.7rem" }} animation="wave" />
    </div>
  );
}
// npm install @mui/material @emotion/react @emotion/styled
// id	Country	City	Population	Edit	Delete
const Edit = ({ country, el }) => {
  const dispatch = useDispatch();
  const [city, setCity] = useState(el);
  console.log(city);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity({ ...city, [name]: value });
  };
  const editCountries = async (e) => {
    e.preventDefault();
    // dispatch(addCityToDb(city));
  };
  return (
    <form style={{ display: "flex", flexDirection: "column", gap: "0.8rem" }}>
      <label>New Cities</label>
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
        Add
      </button>
    </form>
  );
};
