<script setup>
import { ref } from 'vue'
import ServicioIngredientes from '../../servicios/servicioIngredientes'
import { servicioIngredientesLogeado } from '../../servicios/serviciosLogeado/servicioIngredientesLogeado'


const service = new ServicioIngredientes()
const clasesDeIngredientes = service.tipos
service.cargarTipos()

const servicioIngredientes = servicioIngredientesLogeado




const nuevoIngrediente = ref({
  nombre: '',
  tipo: '',
  principal: '',
  acompañamiento: '',
  condimento: ''
})

const crearIngrediente = () => {
  servicioIngredientes.agregarIngredienteUsuario(nuevoIngrediente.value),
  nuevoIngrediente.value = {
    nombre: '',
    tipo: '',
    principal: '',
    acompañamiento: '',
    condimento: ''
  }
}
</script>

<template>

  <p> {{ nuevoIngrediente }}</p>
  <h1>Aqui podras crear,modificar o eliminar tus propios ingredientes</h1>
  <div class="contenedor2">
    <div class="rotulo">
      <h1>Crear ingrediente</h1>
    </div>
    <div class="form">
        <label for="nombre">Nombre</label>
        <input type="text" id="nombre" v-model="nuevoIngrediente.nombre" />

        <label for="tipo">Tipo</label>
        <select v-model="nuevoIngrediente.tipo">
          <option value="null">Selecciona un tipo</option>
          <option v-for="clase in clasesDeIngredientes" :key="clase.tipo" :value="clase.tipo">{{ clase.tipo }}
          </option>
        </select>

        <label for="principal">Principal</label>
        <select v-model="nuevoIngrediente.principal">
          <option value="si">SI</option>
          <option value="no">NO</option>
        </select>

        <label for="acompañamiento">Acompañamiento</label>
        <select v-model="nuevoIngrediente.acompañamiento">
          <option value="si">SI</option>
          <option value="no">NO</option>
        </select>

        <label for="condimento">Condimento</label>
        <select v-model="nuevoIngrediente.condimento">
          <option value="si">SI</option>
          <option value="no">NO</option>
        </select>
        <button @click="crearIngrediente">Crear</button>
    </div>
  </div>
</template>

<style scoped>
.contenedor2 {
  width: 255px;
  height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

.contenedor2 form {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
}

.contenedor2 label {
  font-size: 1.2em;
}

.contenedor2 input {
  width: 190%;
  padding: 2px;
  border: 2px solid cornflowerblue;
}

.contenedor2 select {
  width: 190%;
  padding: 2px;
  border: 2px solid cornflowerblue;
}

.contenedor2 button {
  width: 100%;
  font-size: large;
  padding: 10px;
  background-color: cornflowerblue;
  color: rgb(255, 255, 255);
  border: 2px solid rgb(255, 212, 42);
}

.contenedor2 button:hover {
  background-color: rgb(255, 255, 255);
  color: rgb(0, 89, 255);
}
</style>