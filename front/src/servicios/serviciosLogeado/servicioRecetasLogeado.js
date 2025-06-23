import { ref } from "vue"

const {
  VITE_API_URL,
} = import.meta.env;

class ServicioRecetasLogeado {
  constructor() {
    this.recetasUsuario = ref([])
    this.recetaGuardada = ref([])
  }

  async obtenerRecetasUsuario() {
    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me/recetas`,{
      credentials: 'include',
    })
    const data = await response.json()
    this.recetasUsuario.value = data
  }

  async guardarRecetaUsuario(recetaJson) {
    try {
      // Corrección de la URL para eliminar el doble slash
      const url = new URL(`${VITE_API_URL}/api/listadelacompra/me/recetas`);
  
      const response = await fetch(url, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(recetaJson)
      });
  
      // Verificar si la respuesta del servidor es exitosa
      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      // Opcional: Retornar la respuesta del servidor, por ejemplo, en formato JSON
      const data = await response.json()
      this.recetaGuardada.value = data
      console.log(this.recetaGuardada.value)
    } catch (error) {
      // Manejo de errores de la solicitud o de la red
      console.error("Error al guardar la receta del usuario:", error);
      throw error; // Re-lanzar el error para manejo externo si es necesario
    }
  }


  async borrarRecetaUsuario(recetaId) {
    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me/recetas/${recetaId}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if(response.ok){
      return "Receta eliminada"
    } else {
      return "Error al eliminar receta"
    } 
  }
}

export const servicioRecetasLogeado = new ServicioRecetasLogeado()