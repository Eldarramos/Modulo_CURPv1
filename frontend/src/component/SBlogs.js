import axios from 'axios'
import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

const URI = 'http://localhost:8000/forms/'

const CompBlogs = () => {

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

 return(
    <div className ='container'>
        <div className ='row'>
            <div className ='col'>
                <table className ='table'>
                   <thead className ='table-primary'>
                    <tr>
                    <th>Nombre</th>
                    <th>Apellido Paterno</th>
                    <th>Apellido Materno</th>
                    <th>Celular</th>
                    <th>Correo</th>
                    <th>Opciones</th>
                    </tr>
                    </thead>
                <tbody>
                    {blogs.map( (blog) => (
                        <tr key = {blog.id}>
                            <td>{blog.nombre}</td>
                            <td>{blog.apellidoP}</td>
                            <td>{blog.apellidoM}</td>
                            <td>{blog.celular}</td>
                            <td>{blog.correo}</td>
                            <td>
                            <Link to = {`/edit/${blog.id}`} className = 'btn btn-info'><i className="fa-solid fa-pen-to-square"></i></Link>
                            <button onClick ={() => deleteBlogs(blog.id)} className = 'btn btn-danger'><i className="fa-regular fa-trash-can"></i></button>
                            </td>

                        </tr>
                    )) }
                </tbody>
                </table>
            </div>
        </div>
    </div>
 )


}

export default CompBlogs

