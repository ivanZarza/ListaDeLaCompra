<script setup>
import { servicioLogout } from '../../servicios/servicioLogout'
import { useRouter } from 'vue-router'
import { useDatosUsuario } from '@/stores/usuarioLogeado'

const datosUsuario = useDatosUsuario()

const router = useRouter()

const cerrarSesion = async () => {
  // Muestra un cuadro de diálogo de confirmación
  const confirmacion = window.confirm("¿Estás seguro de que quieres cerrar sesión?");

  // Procede solo si el usuario confirma
  if (confirmacion) {
    await servicioLogout.logoutUsuario();
    router.push('/login');
    datosUsuario.limpiarUsuario();
    localStorage.removeItem('recetasUsuario');
  }
}
</script>

<template>
  <div>
    <h1>Aqui para cerrar sesión</h1>
    <h3>Se borraran todos los datos, excepto los que esten guardados en la base de datos</h3>
    <button @click="cerrarSesion">Cerrar Sesión</button>
  </div>
</template>

<style scoped>

  .bienvenida {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 10%;
  }

  h1 {
    font-size: 2rem;
    color: #4CAF50;
  }

  h3 {
    font-size: 1.5rem;
    color: #4CAF50;
  }

  button {
    margin-top: 2%;
    padding: 1%;
    font-size: 1.5rem;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #45a049;
  }

</style>