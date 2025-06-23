import { ref } from "vue"

const {
  VITE_API_URL,
} = import.meta.env;

class ServicioUsuario {
  constructor() {
    this.usuario = ref([])
  }

  async obtenerUsuario() {

    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json()
      this.usuario.value = data
    } else {
      console.error('Error al obtener usuario:', response.status);
      console.log(response);
    }
  }

  async actualizarUsuario({nombre, apellidos, contraseña }) {

    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        'nombre': nombre,
        'apellidos': apellidos,
        'contraseña': contraseña,
      })
    });

    if (response.ok) {
      const responseData = await response.json();
      this.usuario.value = responseData;
    } else {
      console.error('Error al actualizar usuario:', response.statusText);
      console.log(response);
    }
  }

  async eliminarUsuario() {

    const response = await fetch(`${VITE_API_URL}/api/listadelacompra/me`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const responseData = await response.json();
      this.usuario.value = responseData;
    } else {
      console.error('Error al eliminar usuario:', response.statusText);
      console.log(response);
    }
  }
}

export const servicioUsuario = new ServicioUsuario()