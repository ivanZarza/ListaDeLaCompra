<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { servicioUsuario } from '../servicios/servicioUsuario'

const service = servicioUsuario
service.obtenerUsuario()
const usuario = service.usuario

</script>

<template>
  <div class="container">
    <div class="nav">
      <nav>
        <router-link :to="{ name: 'datosUsuario'}">MIS DATOS</router-link>
        <router-link :to="{ name: 'panelUsuario'}">INGREDIENTES</router-link>
        <router-link :to="{ name: 'recetasUsuario'}">CREAR RECETAS</router-link>
        <router-link :to="{ name: 'compraUsuario' }">LISTA DE LA COMPRA</router-link>
        <router-link :to="{ name: 'logout' }">CERRAR SESION</router-link>
      </nav>
    </div>

    <h1>Hola {{ usuario.nombre }} {{ usuario.apellidos }}</h1>
    <div class="funcional">
      <RouterView />
    </div>


  </div>


</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.container {
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.nav {
  min-width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  color: #fff6f6;
  background-color: #e62dff;
  margin: 10px;
  font-size: 1.3rem;
}

nav {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 50%;
  background-color: #e62dff;
  gap: 20px;
  /* Cambia el color de fondo de la barra de navegación */
}

nav a {
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #ffffff;
  font-weight: bold;
}

nav a:hover {
  text-decoration: underline;
}

nav a.router-link-exact-active {
  color: #ffffff;
  border: 3px solid #ffffff;
  padding: 5px;
  border-radius: 5px;
  font-style: oblique;
}

.funcional {
  min-width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 1rem;
  background-color: #f2f2f2;
}
</style>