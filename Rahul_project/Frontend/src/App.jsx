
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./service/Home";
import About from "./service/About";
import Navbar from "./components/Navbar";
const App = ()=>{
  return (
  <>
  <BrowserRouter>
  <Navbar/>
    <Routes>
      <Route path="/" element= {<Home/>} />
      <Route path="/about" element = {<About/>}/>
    </Routes>
  </BrowserRouter>
  </>
  )
}


export default App;
