import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Overview from "./Pages/Overview/Overview";
import AddNewNote from "./Pages/AddNewNote/AddNewNote";


export default function Routing() {
  const routes = [
    { Component: Overview, path: '/' },
    { Component: AddNewNote, path: '/create-note'}
  ];

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/overview' element={<Overview />} />
        <Route path='/create-note' element={<AddNewNote />} />
      </Routes>
    </Router>
  );
}
