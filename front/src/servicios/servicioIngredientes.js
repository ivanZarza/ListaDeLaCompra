import { ref } from "vue"

const {
  VITE_API_URL,
} = import.meta.env;

export default class ServicioIngredientes {
  constructor() {
    this.ingredientes = ref([])
    this.tipos = ref([])
    this.porTipo = ref([])

  }
  async cargarIngredientes({ nombre = null, tipo = null, pagina = null } = {}) {
    const url = new URL(`${VITE_API_URL}/api/listadelacompra/ingredientes`)

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
    this.ingredientes.value = data.resultados
  }

  async cargarTipos() {
    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/ingredientes/tipo`, )
    const data = await response.json()
    this.tipos.value = data
  }

  async cargarPorTipo(tipo) {
    const response = await fetch(`${VITE_API_URL}/ingredientes/tipo/${tipo}`)
    const data = await response.json()
    this.porTipo.value = data
  }


  async agregarIngrediente(ingrediente) {
    const response = await fetch(`${VITE_API_URL}/ingredientes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingrediente)
    })
    this.ingredientes.value.push(await response.json())
  }

  async eliminarIngrediente(id) {
    await fetch(`${VITE_API_URL}/ingredientes/${id}`, {
      method: 'DELETE'
    })
    this.ingredientes.value = this.ingredientes.value.filter(ingrediente => ingrediente.id !== id)
  }

  async actualizarIngrediente(ingrediente) {
    await fetch(`${VITE_API_URL}/ingredientes/${ingrediente.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(ingrediente)
    })
    this.ingredientes.value = this.ingredientes.value.map(i => i.id === ingrediente.id ? ingrediente : i)
  }
}