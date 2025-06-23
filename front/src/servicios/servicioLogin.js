
import { ref } from 'vue'

const {
  VITE_API_URL,
} = import.meta.env

class ServicioLogin {
  constructor() {
    this.datosLogin = ref({})
  }

  async loginUsuario({ nombre,apellidos, contraseña }) {
    try {
      console.log('loginUsuario', { nombre,apellidos, contraseña })

      const response = await fetch(`${VITE_API_URL}/api/listadelacompra/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'nombre': nombre,
          'apellidos': apellidos,
          'contraseña': contraseña,
        }),
        credentials: 'include',
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error ||'Error al loguear usuario: ' + response.status);
      }

      const data = await response.json();
      this.datosLogin.value = data

    } catch (error) {
      // Maneja tanto errores de red como errores lanzados manualmente
      console.error(error);
      throw error;
    }
  }
}

export const servicioLogin = new ServicioLogin()