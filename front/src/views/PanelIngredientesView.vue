<script setup>
import { ref } from 'vue'

const nombre = ref('')
const tipo = ref('')
const principal = ref('')
const acompañamiento = ref('')
const condimento = ref('')

</script>


<template>
  <div class="total">
  <div class="contenedor1">
    <div class="rotulo">
      <h1>Crear usuario</h1>
    </div>
    <div class="form">
      <form>
        <div class="nombre">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="nombre" />
        </div>
        <div class="apellidos">
        <label for="apellidos">Apellidos</label>
        <input type="text" id="apellido"s v-model="apellidos" />
      </div>
      <div class="contraseña">
        <label for="contraseña">Contraseña</label>
        <input type="text" id="contraseña" v-model="contraseña" />
      </div>
        <div class="contraseña2">
        <label for="id">Confirmar contraseña</label>
        <input type="id" id="id" v-model="id" />
      </div>
        <button type="submit">Crear</button>
      </form>
  </div>
  </div>
  <div class="contenedor2">
    <div class="rotulo">
      <h1>Crear ingrediente</h1>
    </div>
    <div class="form">
      <form>
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="nombre" />

        <label for="tipo">Tipo</label>
        <input type="text" id="tipo" v-model="tipo" />

        <label for="principal">Principal</label>
        <input type="text" id="principal" v-model="principal" />

        <label for="acompañamiento">Acompañamiento</label>
        <input type="text" id="acompañamiento" v-model="acompañamiento" />

        <label for="condimento">Condimento</label>
        <input type="text" id="condimento" v-model="condimento" />

        <button type="submit">Crear</button>
      </form>
    </div>
  </div>

  <div class="contenedor3">
    <div class="rotulo">
      <h1>Cambiar o Eliminar ingrediente</h1>
    </div>
    <div class="form">
      <form>
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="nombre" />

        <label for="tipo">Tipo</label>
        <input type="text" id="tipo" v-model="tipo" />

        <label for="principal">Principal</label>
        <input type="text" id="principal" v-model="principal" />

        <label for="acompañamiento">Acompañamiento</label>
        <input type="text" id="acompañamiento" v-model="acompañamiento" />

        <label for="condimento">Condimento</label>
        <input type="text" id="condimento" v-model="condimento" />

        <button class="btn1" type="submit">Cambiar</button>
        <button class="btn2" type="submit">Eliminar</button>
      </form>
    </div>
  </div>
</div>
</template>

<style scoped>

.total {
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  justify-content: space-around;
}

.contenedor1 {
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgb(255, 212, 42);
  text-align: center;
  border-radius: 250px;
}

.contenedor1 .rotulo {
width: 200px;
height: 200px;
  padding: 40px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 212, 42);
  border-radius: 100px;
align-items: center;
justify-content: center;
position: relative;
top: -10px;
right: -80px;

}

.contenedor1 .nombre,
.contenedor1 .apellidos,
.contenedor1 .contraseña2,
.contenedor1 .contraseña {
  width: 140px;
height: 140px;
  padding: 30px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 212, 42);
  border-radius: 70px;
align-items: center;
justify-content: center;
}

.contenedor1 .nombre {
  margin-left: -250px;
  margin-top: -30px;
}

.contenedor1 .apellidos {
  margin-left: 200px;
  margin-top: -120px;
}

.contenedor1 .contraseña {
  margin-left: -350px;
  padding: 30px;
}

.contenedor1 .contraseña2 {
  margin-left: 250px;
  margin-top: -120px;
}

.contenedor1 input {
  width: 250%;
  padding: 2px;
  border: 2px solid cornflowerblue;
  border-radius: 20px;
}


.contenedor1 button {
  width: 100px;
  height: 100px;
  font-size: large;
  padding: 10px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 2px solid rgb(255, 212, 42);
  border-radius: 50px;
}

.contenedor2 {
  width: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  gap: 20px;
  background-color: rgb(255, 212, 42);
  text-align: center;
}

.contenedor2 .rotulo {
  width: 140%;
  padding: 0px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 212, 42);
}

.contenedor2 .form {
  width: 60%;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  color: rgb(255, 255, 255);
  background-color: cornflowerblue;
}

form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}

label {
  font-size: 1.2em;
}

input {
  width: 190%;
  padding: 2px;
  border: 2px solid cornflowerblue;
}

button {
  width: 100%;
  font-size: large;
  padding: 10px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 2px solid rgb(255, 212, 42);
}

button:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 89, 255);
}

.contenedor3 {
  width: 255px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  gap: 20px;
  background-color: rgb(255, 212, 42);
  text-align: center;
}

.contenedor3 .rotulo {
  width: 140%;
  padding: 0px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 212, 42);
  transform: rotate(10deg);
  margin-bottom: 20px;
}


@keyframes rotar {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(10deg);
  }
}

@keyframes aparecer {
  from {
    opacity: 0;
    transform: rotate(-45deg);
  }
  to {
    opacity: 1;
    transform: rotate(0deg);
  }
}

@keyframes descolgarse {
  0% {
    transform: translateY(0%) rotate(0deg);
  }
  50% {
    transform: translateY(145%) rotate(-10deg);
  }
  75% {
    transform: translateY(160%) rotate(6deg);
  }
  100% {
    transform: translateY(180%) rotate(0deg);
  }
}

.contenedor3 .rotulo {
  animation: rotar 1s ease-in-out forwards;
}

.contenedor3 input {
  opacity: 0; /* Inicia los inputs como invisibles */
}

.contenedor3 #nombre {
  animation: aparecer 1s ease-in-out forwards 1s; /* Comienza después de la animación del rotulo */
}

.contenedor3 #tipo {
  animation: aparecer 1s ease-in-out forwards 2s;
}

.contenedor3 #principal {
  animation: aparecer 1s ease-in-out forwards 3s;
}

.contenedor3 #acompañamiento {
  animation: aparecer 1s ease-in-out forwards 4s;
}

.contenedor3 #condimento {
  animation: aparecer 1s ease-in-out forwards 5s;
}

.contenedor3 button {
  animation: rotar 1s ease-in-out forwards 6s; /* Ajusta según el número de inputs */
}

.contenedor3 .btn2 {
  animation: descolgarse 2s ease-in-out forwards 7s; /* Ajusta según el número de inputs */

}

.contenedor3 button:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 89, 255);
}
</style>


