<script setup>
import { ref } from 'vue'

const emit = defineEmits(['crearUsuario'])

const nombre = ref('')
const apellidos = ref('')
const contraseña = ref('')
const contraseña2 = ref('')

function enviarDatos() {
  emit('crearUsuario', { nombre: nombre.value, apellidos: apellidos.value, contraseña: contraseña.value, contraseña2: contraseña2.value })
  console.log('Datos enviados', nombre.value, apellidos.value, contraseña.value, contraseña2.value);
}
</script>

<template>
  <div class="total">
    <div class="contenedor1">
      <div class="rotulo">
        <h1>Crear usuario</h1>
      </div>
      <div class="form">
        <form >
          <div class="nombre">
            <label for="nombre">Nombre</label>
            <input type="text" id="nombre" v-model="nombre" />
          </div>
          <div class="apellidos">
            <label for="apellidos">Apellidos</label>
            <input type="text" id="apellidos" v-model="apellidos" />
          </div>
          <div class="contraseña">
            <label for="contraseña">Contraseña</label>
            <input type="password" id="contraseña" v-model="contraseña" />
          </div>
          <div class="contraseña2">
            <label for="contraseña2">Confirmar contraseña</label>
            <input type="password" id="contraseña2" v-model="contraseña2"/>
          </div>
          <button @click.prevent="enviarDatos">Crear</button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.total {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100vh;
  justify-content: center;
}

.contenedor1 {
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-verde);  
  text-align: center;
  border-radius: 250px;
  margin-top: -100px;
}

.contenedor1 .rotulo {
width: 200px;
height: 200px;
  padding: 40px;
  background-color:  var(--color-azul-oscuro);
  color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 212, 42);
  border-radius: 100px;
align-items: center;
justify-content: center;
position: relative;
top: -30px;
right: -10px;

}

.contenedor1 .nombre,
.contenedor1 .apellidos,
.contenedor1 .contraseña2,
.contenedor1 .contraseña {
  width: 140px;
height: 140px;
  padding: 30px;
  background-color:  var(--color-azul-oscuro);
  color: rgb(255, 255, 255);
  border: 3px solid rgb(255, 212, 42);
  border-radius: 70px;
align-items: center;
justify-content: center;
}

.contenedor1 .nombre {

  margin-top: -40px;
}

.contenedor1 .apellidos {
  margin-left: 250px;
  margin-top: -120px;
}

.contenedor1 .contraseña {
margin-left: -50px;
  padding: 30px;
}

.contenedor1 .contraseña2 {
  margin-left: 250px;
  margin-top: -120px;
}

.contenedor1 input {
  width: 250%;
  padding: 2px;
  border: 2px solid  var(--color-azul-oscuro);
  border-radius: 20px;
}


.contenedor1 button {
  width: 100px;
  height: 100px;
  font-size: large;
  padding: 10px;
  background-color:  var(--color-azul-oscuro);
  color:  var(--color-gris);
  border: 2px solid rgb(255, 212, 42);
  border-radius: 50px;
}

.contenedor1 button:hover {
  background-color: var(--color-azul-claro);
  color:var(--color-gris);
}
</style>