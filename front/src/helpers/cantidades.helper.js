

export function cantidadPrincipal(ingrediente, personas) {

  let cantidad = 0
  
  if (ingrediente.tipo === 'carne' || ingrediente.tipo === 'pescado' || ingrediente.tipo === 'pasta') {
     cantidad = (200 * personas ) 
  }
  
  if (ingrediente.tipo === 'verdura') {
     cantidad = (400 * personas ) 
  }

  if ( ingrediente.tipo === 'cereal' || ingrediente.tipo === 'legumbre') {
     cantidad = (100 * personas ) 
  }
  
  if ( ingrediente.nombre === 'patata') {
     cantidad = (225 * personas ) 
  }
  
  return { ...ingrediente, cantidad }
}

export function cantidadAcompañamiento (ingrediente, personas) {

  let cantidad = 0

  if (ingrediente.tipo === 'carne' || ingrediente.tipo === 'pescado' || ingrediente.tipo === 'pasta') {
   cantidad =  (100 * personas) 
  }
  
  if (ingrediente.tipo === 'verdura') {
    cantidad = (200 * personas) 
  }
  
  if ( ingrediente.tipo === 'cereal' || ingrediente.tipo === 'legumbre') {
    cantidad = (50 * personas)  
  }
  
  if ( ingrediente.nombre === 'patata' && ingrediente.tipo === 'verdura') {
    cantidad = (100 * personas) 
  }
  if ( ingrediente.tipo === 'fruta') {
    cantidad = (100 * personas) 
  }

  if( ingrediente.tipo === 'salsa') {
    cantidad = (50 * personas) 
  }

  return  { ...ingrediente, cantidad }
}

export function cantidadCondimento (ingrediente, personas) {

  let cantidad = 0

  if (ingrediente.tipo === 'carne' || ingrediente.tipo === 'pescado' || ingrediente.tipo === 'pasta') {
    cantidad = (20 * personas)   }
  
  if (ingrediente.tipo === 'verdura') {
    cantidad = (30 * personas) 
  }
  
  if ( ingrediente.tipo === 'cereal' || ingrediente.tipo === 'legumbre') {
    cantidad = (20 * personas)   }

  if ( ingrediente.tipo === 'verdura' && ingrediente.nombre === 'ajo') {
    cantidad = (15 * personas) 
  }
  
  if ( ingrediente.nombre === 'patata' && ingrediente.tipo === 'verdura') {
    cantidad = (30 * personas) 
  }

  if ( ingrediente.tipo === 'fruta') {
    cantidad = (20 * personas) 
  }

  if( ingrediente.tipo === 'frutos secos') {
    cantidad = (10 * personas) 
  }

  if ( ingrediente.nombre === 'queso' ) {
    cantidad = (20 * personas) 
  }

  if ( ingrediente.nombre === 'nata') {
    cantidad = (50 * personas) 
  }

  const nuevosIngredientes = { ...ingrediente, cantidad } 

  return nuevosIngredientes
}

export function dividirPorCantidadDeIngredientes(ingredientes) {
  return ingredientes.map(ingrediente => ({
    ...ingrediente,
    cantidad: Math.round(ingrediente.cantidad / ingredientes.length)
  }))
}