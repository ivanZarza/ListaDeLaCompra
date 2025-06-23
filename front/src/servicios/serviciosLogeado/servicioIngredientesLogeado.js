import { ref } from 'vue'

const {
  VITE_API_URL,
} = import.meta.env

class ServicioIngredientesLogeado {
  constructor() {
    this.ingredientesUsuario = ref([])
  }


  async cargarIngredientesLogeado({ nombre = null, tipo = null, pagina = null } = {}) {
    const url = new URL(`${VITE_API_URL}/api/listadelacompra/me/ingredientes`)

    if (nombre) {
      url.searchParams.append('nombre', nombre)
    }
    if (tipo) {
      url.searchParams.append('tipo', tipo)
    }
    if (pagina) {
      url.searchParams.append('pagina', pagina)
    }

    const response = await fetch(url, {
      credentials: 'include',
    })


    const data = await response.json()
    console.log('linea 11 servicio ingredientres pidiendo data', data);
    this.ingredientesUsuario.value = data.resultados
  }

  async agregarIngredienteUsuario(nuevoIngrediente) {
    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me/ingredientes`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: nuevoIngrediente.nombre,
        tipo: nuevoIngrediente.tipo,
        principal: nuevoIngrediente.principal,
        acompañamiento: nuevoIngrediente.acompañamiento,
        condimento: nuevoIngrediente.condimento,
      })
    })
    if (response.ok) {
      alert("Ingrediente agregado con éxito")
      return 'Ingrediente agregado con éxito'
    } else {
      alert("Error al agregar ingrediente")
      return 'Error al agregar ingrediente'
    }
  }

  async borrarIngredienteUsuario() {
    await fetch(`${VITE_API_URL}/api/listadelacompra/me/ingredientes`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(`${ingredienteId}`)
    })
    if (response.ok) {
      return "Ingrediente eliminado"
    } else {
      return "Error al eliminar ingrediente"
    }
  }
}

export const servicioIngredientesLogeado = new ServicioIngredientesLogeado()