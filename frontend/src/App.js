import "./App.css";
import Login from "./Login";
import Header from "./Header";
import CompBlogs from "./component/SBlogs";
import CompEditBlog from "./component/EditBlogs";
import StepperExample from "./component/stepper";

import Home from "./component/Home";
import Formulario from "./component/Form";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Formulario" element={<Formulario />} />
          <Route path="/stepper" element={<StepperExample />} />
          <Route path="/CompBlogs" element={<CompBlogs />} />
          <Route path="/edit/:id" element={<CompEditBlog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
