
const {
  VITE_API_URL,
} = import.meta.env

export class ServicioLogout {

  async logoutUsuario(){
    try {
      const response = await fetch(`${VITE_API_URL}/api/listadelacompra/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      if (response.ok) {
        console.log('Sesión cerrada');
      } else {
        console.error('Error al cerrar sesión');
      }
    } catch (error) {
      console.error(error);
    }
  }}

export const servicioLogout = new ServicioLogout()