import { Route, Routes } from "react-router-dom";
import { Cities } from "./Cities";
import { Country } from "./Country";
import { EditForm } from "./EditForm";
import { NoteFound } from "./NoteFound";
import { Table } from "./Table";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Table />}></Route>
        <Route path="/cities/:id" element={<EditForm />}></Route>
        <Route path="/add-country" element={<Country />}></Route>
        <Route path="/add-city" element={<Cities />}></Route>
        <Route path="*" element={<NoteFound />}></Route>
      </Routes>
    </>
  );
};
