import { useEffect, useState } from 'react'
import { CircularProgressbar, CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar'

import "react-circular-progressbar/dist/styles.css"

const ControlPresupuesto = ({gastos, presupuesto, resetApp}) => {

    const [porcentaje, setPorcentaje] = useState(0)
    const [disponible, setDisponible] = useState(0)
    const [gastado, setGastado]       = useState(0)

    useEffect(() => {
        const totalGastado = gastos.reduce( (total, gasto) => gasto.cantidad + total, 0)

        const totalDisp  = presupuesto - totalGastado
        const porcentaje = ((totalGastado / presupuesto) * 100).toFixed(2)

        setGastado(totalGastado)
        setDisponible( totalDisp )
        
        setTimeout(() => {
            setPorcentaje( porcentaje )
        }, 475);
        
    }, [gastos])
    

    const formatearCurrency = ( cantidad ) => {
        return cantidad.toLocaleString('es-MX', {
            style: 'currency',
            currency: 'MXN'
        })
    }

    // const resetApp = () => {
    //      pondre setPresupuestos, gastos y isValid en false y con eso se reincia y lo vinculo al boton de reset 
    // }

  return (
    <div className="contenedor-presupuesto contenedor sombra dos-columnas">
        <div>
            <CircularProgressbar 
                styles={ buildStyles({
                    pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                    trailColor: '#F5F5F5',
                    textColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
                })}
                value={porcentaje}
                text={`${porcentaje}%`}
            />
        </div>

        <div className="contenido-presupuesto">
            <button
                type="button" 
                className="reset-app"
                onClick={() => resetApp()}
            >
                Reset App
            </button>

            <p>
                <span>Presupuesto:</span>{' '}{formatearCurrency(presupuesto)}
            </p>

            <p className={ disponible < 0 ? 'negativo' : ''}>
                <span>Disponible:</span>{' '}{formatearCurrency(disponible)}
            </p>

            <p>
                <span>Gastado:</span>{' '}{formatearCurrency(gastado)}
            </p>
        </div>
    </div>
  )
}

export default ControlPresupuesto