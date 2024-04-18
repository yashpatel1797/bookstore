import './App.css';
import { Navbar } from "components"
import { Routes, Route } from "react-router-dom";
import { Home, Login } from "pages";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
