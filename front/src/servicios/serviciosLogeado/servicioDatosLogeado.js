import { ref } from 'vue';

const {
  VITE_API_URL,
} = import.meta.env;

export class ServicioDatosUsuario {
  constructor() {
    this.datosUsuario = ref([]);
    this.recetasUsuario = ref([]);
    this.ingredientesUsuario = ref([]);
  }

  async obtenerDatosUsuario() {
    try {
      const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me/datos`, {
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error al obtener los datos  ${response.status}`);
      }

      const data = await response.json();

      this.datosUsuario.value = data.usuario;
      this.recetasUsuario.value = data.recetas;
      this.ingredientesUsuario.value = data.ingredientes;

      return data; // Devuelve los datos para ser manejados por el componente
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      // Lanza el error para ser capturado y manejado por el componente
      throw error;
    }
  }
}

export const servicioDatosUsuario = new ServicioDatosUsuario();