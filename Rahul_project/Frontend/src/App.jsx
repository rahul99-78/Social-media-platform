
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./service/Home";
import About from "./service/About";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/signup" element={<Signup />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
