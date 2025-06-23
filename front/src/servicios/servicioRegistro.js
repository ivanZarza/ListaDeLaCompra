import { ref } from 'vue'

const {
  VITE_API_URL,
} = import.meta.env

// const VITE_API_URL = import.meta.env.VITE_API_URL

export class ServicioRegistro {
  constructor() {
    this.registros = ref([])
  }

  async registrarUsuario({ nombre, apellidos, contraseña }) {
    try{

    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'nombre': nombre, 
        'apellidos': apellidos,
        'contraseña': contraseña,
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Error al registrar usuario: ' + response.status);
    }
    // Asegúrate de manejar la respuesta adecuadamente aquí
    if (response.ok) {
      const responseData = await response.json();
      this.registros.value.push(responseData);
    }
  } catch (error) {
      throw error;
    }
  }
}

export const servicioRegistro = new ServicioRegistro()