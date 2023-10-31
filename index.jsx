import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import Contact from "./pages/Contact"
import Menu from "./pages/Vans/Menu"
import Layout from "./components/Layout"
import Order from './pages/Order';

import "./server"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Contact />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/order" element={<Order />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);