import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./components/login";
import UserProvider from "./userProvider";



//Modulo CURP
import CompBlogs from './components/SBlogs'
import CompEditBlog from './components/EditBlogs'
import Home from './components/Home';
import Formulario from './components/Form';






function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route index path="/" exact element={<Login />} /> 
          <Route path="/Home" element={<Home/>} />
          <Route path='/Formulario' element={<Formulario/>}/>
          <Route path='/CompBlogs' element={<CompBlogs/>}/>
          <Route path='/edit/:id' element={<CompEditBlog/>}/>  

        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
