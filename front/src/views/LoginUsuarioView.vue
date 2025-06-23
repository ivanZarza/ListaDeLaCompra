<script setup>
import { ref } from "vue";
import { servicioLogin } from "../servicios/servicioLogin";
import { useRouter, useRoute } from "vue-router";
import VentanaToast from "../components/VentanaToast.vue";

const router = useRouter();
const route = useRoute();

const nombre = ref("");
const apellidos = ref("");
const contraseña = ref("");
const mensajeToast = ref("");
const verToast = ref(false);

const datosDevueltos = ref({});

const entrar = async () => {
  try {
    // Almacenar la respuesta de la promesa
    const respuesta = await servicioLogin.loginUsuario({
      nombre: nombre.value,
      apellidos: apellidos.value,
      contraseña: contraseña.value,
    });

    datosDevueltos.value = respuesta;
    mensajeToast.value = "Usuario logueado correctamente";
    mostrarToast();
    setTimeout(() => {
      AccesoCorrecto(); // Llama a esta función para manejar el éxito del login
    }, 2100);
  } catch (error) {
    console.error(error);
    mensajeToast.value = error.message;
    mostrarToast();
  }
};

const AccesoCorrecto = () => {
  const redirectRoute = route.query.redirect || `/me/datos`;
  router.push(redirectRoute);
};

function mostrarToast() {
  verToast.value = true;
  setTimeout(() => {
    verToast.value = false;
  }, 2000);
}
</script>

<template>
<div class="container">
  <h2>Introduce tus credenciales para acceder a la aplicación.</h2>
  <h2>Si no tienes cuenta, puedes crear una <router-link to="/crearUsuario" class="enlace" >aquí</router-link></h2>
  <form class="form" @submit.prevent="entrar">
    <label class="input"
      ><span>Nombre</span><input type="text" v-model="nombre" required
    /></label>
    <label class="input"
      ><span>Apellidos</span><input type="text" v-model="apellidos" required
    /></label>
    <label class="input"
      ><span>Contraseña</span><input type="text" v-model="contraseña" required
    /></label>
    <button class="btn" type="submit">Entrar</button>
    <div>
      <VentanaToast :mensajeToast="mensajeToast" :verToast="verToast" />
    </div>
  </form>
</div>
</template>

<style scoped>

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  padding: 100px;
}

.form {
  justify-content: center;
  text-align: center;
  color: white;
}

h2 {
  overflow: visible;
  text-align: center;
  font-size: 1.5rem;
  white-space: nowrap;
  margin: 20px
}

input {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: 10px;
}

span {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  margin: 10px;
}

.enlace {
  text-transform: uppercase;
  text-decoration: underline;
  font-weight: bold;
}

.enlace:hover {
  color: var(--color-verde);
}

</style>
