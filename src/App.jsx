import { useState, useEffect } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import { generarId } from './helpers/index'
import IconoNuevoGasto from './img/nuevo-gasto.svg'
import ListadoGastos from './components/ListadoGastos'
import Filtros from './components/Filtros'

function App() {

  const [gastos, setGastos] = useState([])

  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem('presupuesto')) ?? 0
  )
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false)

  const [modal, setModal] = useState(false)
  const [animarModal, setAnimarModal] = useState(false)

  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState('')
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(() => {
    if (Object.keys(gastoEditar).length > 0 ) {
      setModal(true)

      setTimeout(() => {
        setAnimarModal(true)
      }, 325);
    }
  }, [gastoEditar])
  
  useEffect( () => {
    const presupuestoLS = Number(localStorage.getItem('presupuesto'))
    if (presupuestoLS > 0 ) {
      setIsValidPresupuesto(true)
      setGastos( JSON.parse( localStorage.getItem('gastos') ) )
    }
  }, [])


  useEffect(() => {
    localStorage.setItem('presupuesto', presupuesto ?? 0)
  }, [presupuesto])

  useEffect( () => {
    if ( filtro ) { 
      const gastosFilter = gastos.filter( gasto => gasto.categoria === filtro )
      setGastosFiltrados(gastosFilter)
    }
  }, [filtro])

  const handleNuevoGasto = () => {
    setModal(true)
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true)
    }, 325);
  }

  const saveGasto = gasto => {
    if ( gasto.id ) {
      const gastosFiltrados = gastos.map(thisGasto => thisGasto.id !== gasto.id ? thisGasto : gasto);

      setGastos(gastosFiltrados)
      setGastoEditar({})
      return
    }

    gasto.id    = generarId()
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])
  }

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter( thisGasto => thisGasto.id !== id)
    setGastos(gastosActualizados)
  }
  


  return (
    <div className={ modal ? 'fijar' : '' }>
        <Header
          gastos={ gastos }
          setGastos={setGastos}
          presupuesto={presupuesto}
          setPresupuesto={setPresupuesto}
          isValidPresupuesto={isValidPresupuesto}
          setIsValidPresupuesto={setIsValidPresupuesto}
        />

        {isValidPresupuesto && (
          <>
              <main>
                  <Filtros 
                    filtro={filtro}
                    setFiltro={setFiltro}
                  />

                  <ListadoGastos 
                    gastos={gastos}
                    setGastoEditar={setGastoEditar}
                    eliminarGasto={eliminarGasto}
                    filtro={filtro}
                    gastosFiltrados={gastosFiltrados}
                  />
              </main>
              <div className="nuevo-gasto">
                  <img
                    src={IconoNuevoGasto}
                    onClick={handleNuevoGasto}
                  />
              </div> 
          </>
        )
        }

        {modal && <Modal 
                    setModal={setModal}
                    animarModal={animarModal} 
                    setAnimarModal={setAnimarModal}
                    saveGasto={saveGasto}
                    gastoEditar={gastoEditar}
                    setGastoEditar={setGastoEditar}
                  />}

    </div>
  )
}

export default App
