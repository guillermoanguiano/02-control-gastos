import React, { useMemo } from 'react'
import Gasto from './Gasto'

const ListadoGastos = ({ gastos, setGastoEditar, eliminarGasto, filtro, gastosFiltrados }) => {
  
  localStorage.setItem('gastos', JSON.stringify(gastos))
  
  return (
    <div className="listado-gastos contenedor">
{/* Aqui se pondra algo de ternario para poner esta lista o la otra */}
        { filtro ? (
          <>
            <h2>{ gastosFiltrados.length ? 'Gastos' : 'No hay gastos' }</h2>
            {gastosFiltrados.map( gasto => (
              <Gasto
                  key={ gasto.id }
                  gasto={ gasto }
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
              />
            ))}
          </>
        ) : ( 	
          <>
            <h2>{ gastos.length ? 'Gastos' : 'No hay gastos' }</h2>
            {gastos.map( gasto => (
              <Gasto
                  key={ gasto.id }
                  gasto={ gasto }
                  setGastoEditar={setGastoEditar}
                  eliminarGasto={eliminarGasto}
              />
            ))}
        </>
        )}
    </div>
  )
}

export default ListadoGastos