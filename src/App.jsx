import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { MethodDelete, MethodGet, MethodPost, MethodPut } from './Slice/Slice2'
import axios from 'axios'
import './Components/style.css'
// import {  FunctionMethods } from './MethodsCrud'



function App() {
  const despachar = useDispatch();

  useEffect(() => {
    axios.get(api2)
      .then(e => {
        despachar(MethodGet(e.data))
      })
      .catch(err => console.error(err))
  }, [despachar])

  const Selector = useSelector(state => state.persons)
  // console.log(Selector)

  const [create, setCreate] = useState("")
  // const [edit, setEdit] = useState(null)

  const api2 = "http://localhost:3002/names"


  const CreateMethod = () => {
    if (create) {
      const newPost = { id: Date.now(), name: create }
      despachar(MethodPost(newPost))
      axios
        .post('http://localhost:3002/names/', newPost).then(() => setCreate(""))
        .catch((err) => console.error(err));
    }
  }

  const DeleteMethod = (id) => {
    despachar(MethodDelete(id));
    axios
      .delete(`http://localhost:3002/names/${id}`)
      .catch((err) => console.error(err));
  };





  return (
    <>
      <form id="dataForm">
        <input value={create}
          onChange={(e) => setCreate(e.target.value)}
          type="text" id="inputData" placeholder="Ingrese un dato" required />

        <button onClick={CreateMethod} type="submit">Submit</button>
      </form>

      <table>
        <caption>Ejemplo de Tabla Semánticamente Correcta</caption>
        <thead>
          <tr>
            <th>nombre</th>
            <th>Autor</th>
          </tr>
        </thead>
        <tbody>

          {
            Selector.data.map(e => (
                <tr key={e.id}>
                  <td>{e.name}</td>
                  <td>

                    <button onClick={() => DeleteMethod(e.id)}
                      className='btn-edit'>Eliminar</button>

                    <button className='btn-delete'>Editar</button>
                  </td>
                </tr>
            ))
          }
        </tbody>

      </table>

    </>
  )
}

export default App


/*

<table>
    <caption>Ejemplo de Tabla Semánticamente Correcta</caption>
    <thead>
        <tr>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Ocupación</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Juan Pérez</td>
            <td>30</td>
            <td>Ingeniero</td>
        </tr>
        <tr>
            <td>Ana García</td>
            <td>25</td>
            <td>Doctora</td>
        </tr>
        <tr>
            <td>María López</td>
            <td>28</td>
            <td>Abogada</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td colspan="3">Datos ficticios para ejemplo</td>
        </tr>
    </tfoot>
</table>







*/