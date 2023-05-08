import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import Navbar from "./navbar";
import './Form.css';
import { Modal, Button } from 'react-bootstrap';
//29-Abril
import moment from 'moment';
import Flecha from "../img/Flecha.png";


const URI = 'http://localhost:8000/Inscripciones/'

const CompBlogs = () => {

    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    //Configuracion hooks
    const [blogs, setBlog] = useState([])
    useEffect(() =>{
        getBlogs()
    },[])

    //Mostrar blogs
    const getBlogs = async () => {
         const res =  await axios.get(URI)
         setBlog(res.data)

    }
   
    //Borrar blogs
    const deleteBlogs = async (id) => {
        await axios.delete(`${URI}${id}`)
        getBlogs()

    }

    //Incluir seguimiento 

    const getDaysElapsed = (date) => {
        const today = moment();
        const targetDate = moment(date);
        return today.diff(targetDate, 'days');
      }

    const getStatus = (daysElapsed) => {
        return daysElapsed > 7 ? 'Largo' : 'normal';
      }
    
      const getStatusColor = (daysElapsed) => {
        return daysElapsed > 7 ? 'red' : 'green';
      }
      
      

      


    return(
        <div>
           <Navbar></Navbar>
         <div className="input-container">
         
         <Link to="/home">
        <img className="Regreso" alt="Flecha" src={Flecha}></img>
        <p className="textoRegreso">Inicio</p>
      </Link>
         <div >
             <div className ='row '>
                 <div >
                     <table className ='table-responsive{-xl}'>
                        <thead className ='table-primary'>
                         <tr>
                         <th  className="padding">Nombre</th>
                         <th className="padding">Fecha Incripcion</th>
                         <th className="padding">Celular</th>
                         <th className="padding">Correo</th>
                         
                         <th className="padding">Opciones</th>
                         </tr>
                         </thead>
                     <tbody>
                         {blogs.map( (blog) => (
                             <tr key = {blog.id}>
                                 <td>
                                   <div style={{fontSize: '0.7em', display: 'flex', flexDirection: 'column'}}>
                                      <div>{blog.nombre}</div>
                                      <div>{blog.apellidoP} {blog.apellidoM}</div>
                                    </div>
                                </td>
                                <td style={{fontSize: '0.7em'}}>{blog.createdAt}</td>
                                 <td style={{fontSize: '0.7em'}}>{blog.celular}</td>
                                 <td style={{fontSize: '0.7em'}}>{blog.correo}</td>
                                 
                                 <td>
                                 <Link to = {`/edit/${blog.id}`}  className = 'btn btn-info w-50 p-2 mt-1'><i className="fa-solid fa-pen-to-square"></i></Link>
                                 
                              
                                
                                 </td>
     
                             </tr>
                         )) }
                     </tbody>
                     </table>
                 </div>
             </div>
             </div>
         </div>
         </div>
      )
     
                         

}

export default CompBlogs

