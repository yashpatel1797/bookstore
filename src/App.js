import './App.css';
import { Navbar } from "components"
import { Routes, Route } from "react-router-dom";
import { Home, Login, Cart, Order } from "pages";
import { PrivateRoute } from "./PrivateRoute/PrivateRoute"

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
