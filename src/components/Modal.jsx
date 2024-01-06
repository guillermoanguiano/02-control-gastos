import { useEffect, useState } from 'react'
import CerrarModal from '../img/cerrar.svg'
import Mensaje from './Mensaje'

const Modal = ({
    setModal,
    setAnimarModal, 
    animarModal, 
    saveGasto, 
    gastoEditar,
    setGastoEditar
}) => {

    const [mensaje, setMensaje] = useState('')

    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState('')
    const [categoria, setCategoria] = useState('')
    const [id, setId] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect( () => {
        if ( Object.keys(gastoEditar).length > 0 ) {
            setNombre(gastoEditar.nombre)
            setCantidad(gastoEditar.cantidad)
            setCategoria(gastoEditar.categoria)
            setFecha(gastoEditar.fecha)
            setId(gastoEditar.id)
        }
    }, [])

    const ocultarModal = () => {
        setAnimarModal(false)
        setTimeout(() => {
            setModal(false)
            setGastoEditar({})
        }, 500);


    }

    const handleSubmitModal = (e) => {
        e.preventDefault()

        if ( cantidad <= 0 ) {
            setMensaje('La cantidad tiene que ser un valor valido')
            return
        }

        if ([nombre, cantidad, categoria].includes('')) {

            setMensaje('Todos los campos son obligatorios')

            setTimeout(() => {
                setMensaje('')
            }, 2500);
            return
        }

        saveGasto({
            nombre,
            cantidad,
            categoria,
            fecha,
            id,
        })

        ocultarModal()
    }

  


  return (
    <div className="modal nuevo-gasto">
        <div className="cerrar-modal">
            <img 
                src={CerrarModal} 
                alt="cerrar modal"
                onClick={ocultarModal}
            />
        </div>
        
        <form
            onSubmit={handleSubmitModal} 
            className={`formulario ${animarModal ? 'animar' : 'cerrar'}`}
        >
            
            <legend>{ gastoEditar.nombre ? 'Edita Tu Gasto' : 'Nuevo Gasto' }</legend>
            {mensaje && <Mensaje tipo="error" >{mensaje}</Mensaje>}

            <div className="campo" >
                <label htmlFor="gasto">Nombre Gasto</label>

                <input 
                    type="text" 
                    id="gasto" 
                    placeholder="Nombre del Gasto"
                    value={nombre}
                    onChange={ e => setNombre( e.target.value )}
                />
            </div>

            <div className="campo" >
                <label htmlFor="cantidad">Cantidad</label>

                <input 
                    type="number" 
                    id="cantidad"
                    placeholder="Cantidad" 
                    value={cantidad}
                    onChange={ e => setCantidad( Number(e.target.value) )}
                />
            </div>

            <div className="campo" >
                <label htmlFor="categoria">Cantidad</label>

                <select 
                    id="categoria"
                    value={categoria}
                    onChange={ e => setCategoria( e.target.value )}
                >
                    <option value="seleccione">-- Seleccione una opcion -- </option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input type="submit" value={ gastoEditar.nombre ? 'Editar Gasto' : 'Añadir Gasto' }/>

        </form>
    </div>
  )
}

export default Modal