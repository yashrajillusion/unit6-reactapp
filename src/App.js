import { Link } from "react-router-dom";
import { AllRoutes } from "./Components/Routes";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to={"/"}>Home</Link>
        <Link to={"/add-country"}>Add Country</Link>
        <Link to={"/add-city"}>Add Cities</Link>
      </div>
      <AllRoutes />
    </div>
  );
}
