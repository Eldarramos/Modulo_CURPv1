import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";
import "./Form.css";
import { Modal, Button } from "react-bootstrap";
//29-Abril
import moment from "moment";
import Flecha from "../img/Flecha.png";
import { ArrowLeft } from "react-bootstrap-icons";

const URI = "http://localhost:8000/Inscripciones/";

const CompBlogs = () => {
  //Configuracion hooks
  const [blogs, setBlogs] = useState([]);
  //Se toma una variable local
  useEffect(() => {
    const correoColab = "erramos@uda.edu.mx";
    getBlogs(correoColab);
  }, []);

  //Mostrar informacion del prospecto
  const getBlogs = async (correoColab) => {
    //Se busca y se filtra en la DB el correo del colaborador
    try {
      const res = await axios.get(URI);
      const filteredBlogs = res.data.filter(
        (blog) => blog.correoColab === correoColab
      );
      setBlogs(filteredBlogs);
    } catch (error) {
      console.error("Error al obtener los prospectos:", error);
    }
  };

  //Borrar prospecto
  /*const deleteBlogs = async (id) => {
    await axios.delete(`${URI}${id}`);
    getBlogs();
  };*/

  //Incluir seguimiento NO ACTIVADO
  /*const getDaysElapsed = (date) => {
    const today = moment();
    const targetDate = moment(date);
    return today.diff(targetDate, "days");
  };

  const getStatus = (daysElapsed) => {
    return daysElapsed > 7 ? "Largo" : "normal";
  };

  const getStatusColor = (daysElapsed) => {
    return daysElapsed > 7 ? "red" : "green";
  };*/

  return (
    <div>
      <Navbar></Navbar>
      <div className="input-container">
        <Link to="/home">
          <ArrowLeft className="ml-4 regreso" />
          <span style={{ marginBottom: "100px" }} id="indicador">
            Menu Cambaceo
          </span>
        </Link>
        <div>
          <div className="row ">
            <div className="container">
              <div className="col-md-12">
                <h1 className="text-center">Inscripciones</h1>
              </div>

              <div className="col-md-12">
                <div className="container">
                  <table
                    className="table table-striped table-bordered"
                    cellspacing="0"
                    width="100%"
                  >
                    <thead>
                      <tr>
                        <th className="th-sm">Nombre</th>
                        <th className="th-sm">Fecha Incripcion</th>
                        <th className="th-sm">Celular</th>
                        <th className="th-sm">Correo</th>

                        <th className="padding">Opciones</th>
                      </tr>
                    </thead>
                    <tbody style={{ verticalAlign: "middle" }}>
                      {blogs.map((blog) => (
                        <tr key={blog.id}>
                          <td>
                            <div>{blog.nombre}</div>
                            <div>
                              {blog.apellidoP} {blog.apellidoM}
                            </div>
                          </td>
                          <td style={{ fontSize: "0.7em" }}>
                            {blog.createdAt}
                          </td>
                          <td style={{ fontSize: "0.7em" }}>{blog.celular}</td>
                          <td style={{ fontSize: "0.7em" }}>{blog.correo}</td>

                          <td>
                            <Link
                              to={`/edit/${blog.id}`}
                              className="btn  w-50 p-2 mt-1"
                            >
                              <i className="fa-solid fa-pen-to-square"></i>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompBlogs;
