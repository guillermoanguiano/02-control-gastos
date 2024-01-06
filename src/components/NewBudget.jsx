import React, { useState } from 'react'
import Mensaje from './Mensaje'


const NewBudget = ({presupuesto, setPresupuesto, setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!presupuesto || presupuesto < 0) {
            setMensaje('No es un presupuesto valido')
            return
        } 

        setMensaje('')
        setIsValidPresupuesto(true)
        
    }

  return (
    <div className="contenedor-presupuesto contenedor sombra">
        <form onSubmit={handleSubmit} className="formulario">
            <div className="campo">
                <label htmlFor="presupuesto">Definir Presupuesto</label>

                <input
                    id="presupuesto"
                    className="nuevo-presupuesto"
                    type="number"
                    placeholder="Añade tu presupuesto"
                    value={presupuesto}
                    onChange={e => setPresupuesto(Number(e.target.value))}
                />
            </div>

            <input type="submit" value="Añadir" />

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>} {/* Se utiliza de esta forma por que originalmente esta vacio el mensaje, entonces es false y como ya sabemos en el operador AND si el primero es falso no retorna nada, pero si el primero es true retorna el segundo valor. Dicho esto, si el mensaje de error de arriba pasa y se asigna un string a mensaje entonces este pasa a ser true y por ende se retorna el segundo valor que es Mensaje que da la clase de error mediante props y el mensaje mediante props en childre tambien.   */}

        </form>
    </div>
  )
}

export default NewBudget