import { defineStore } from 'pinia'

export const useDatosUsuario = defineStore('datosUsuario', {// Define la store datosUsuario con la función defineStore de Pinia 
  state: () => ({
    usuario: {}, // Variable usuario vacía representará el usuario logeado
  }),
  actions: {
    establecerUsuario(usuario) {
      this.usuario = usuario; // Asigna el usuario a la variable usuario de la store
      // Guarda el usuario en localStorage
      localStorage.setItem('usuario', JSON.stringify(usuario))
    },
    obtenerDatosUsuario() {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      if (usuario) {
        this.usuario = usuario; // Asigna el usuario de localStorage a la variable usuario de la store
      }
    },
    limpiarUsuario() {
      this.usuario = {}; // Limpia la variable usuario de la store
      // Limpia el usuario de localStorage
      localStorage.removeItem('usuario');
      console.log('usuario eliminado de localStorage');
    }
  },
})
