import React from 'react'
import NewBudget from './NewBudget'
import ControlPresupuesto from './ControlPresupuesto'
import Swal from 'sweetalert2'
import 'sweetalert2/src/sweetalert2.scss'

const Header = ({
    gastos,
    setGastos,
    presupuesto, 
    setPresupuesto,
    isValidPresupuesto,
    setIsValidPresupuesto
}) => {

    const resetApp = () => {
        Swal.fire({
            title: "Estas seguro??",
            text: "No podras revertir esta accion!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Borrar"
          }).then((result) => {
            if (result.isConfirmed) {
                setGastos([])
                setPresupuesto(0)
                setIsValidPresupuesto(false)
                Swal.fire({
                    title: "Reiniciado con exito!",
                    text: "Ha sido reiniciado con exito",
                    icon: "success"
                });
            }
          });    
    }

  return (
    <header>
        <h1>Planificadora de Gastos</h1>

        {isValidPresupuesto ? ( 
            <ControlPresupuesto 
                gastos={gastos}
                presupuesto={presupuesto}
                resetApp={resetApp}
            />
        ) : ( 
            <NewBudget 
                presupuesto={presupuesto}
                setPresupuesto={setPresupuesto}
                setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )}
        
    </header>
  )
}

export default Header