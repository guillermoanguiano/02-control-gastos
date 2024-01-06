

export const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
}

export const formatDate = ( fecha ) => {
  const today    = new Date(fecha);
  const opciones = {
    year: 'numeric',
    month: 'long',
    day: '2-digit'
  } 

  return today.toLocaleDateString('es-ES', opciones)
}