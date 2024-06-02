import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import axios from 'axios'
import './Components/style.css'
import { FunctionsCrudMethods } from './MethodsCrud'
import { MethodGet } from './Slice/Slice2'



function App() {
  const despachar = useDispatch();
  const Selector = useSelector(state => state.persons)
  const api2 = "http://localhost:3002/names"

  useEffect(() => {
    axios.get(api2)
      .then(e => {
        despachar(MethodGet(e.data))
      })
      .catch(err => console.error(err))
  }, [despachar])

  const {
    CreateMethod,
    DeleteMethod,
    UpdateMethod,
    create,
    edit,
    setCreate,
    setEdit } = FunctionsCrudMethods()

  return (
    <>
      <form id="dataForm">
        <input value={create}
          onChange={(e) => setCreate(e.target.value)}
          type="text" id="inputData" placeholder="Ingrese un dato" required />

        <button onClick={CreateMethod} type="submit">Crear</button>
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
                {
                  edit?.id === e.id ? (
                    <td>
                      <input value={edit.name}
                        onChange={(e) => setEdit({ ...edit, name: e.target.value })}
                        type="text" id="inputData" placeholder="Ingrese un dato" required />
                      <button onClick={UpdateMethod}  className='btn-delete'>Actualizar</button>
                    </td>
                  ) : (
                    <td>
                      <button onClick={()=> setEdit(e)}
                        className='btn-edit '
                        type="submit">Editar</button>
                      <button onClick={() => DeleteMethod(e.id)}
                        className='btn-delete'>Eliminar</button>
                    </td>
                  )
                }
              </tr>
            ))
          }
        </tbody>

      </table>

    </>
  )
}

export default App