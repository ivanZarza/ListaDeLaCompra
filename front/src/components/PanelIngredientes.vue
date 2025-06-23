<script setup>
import { ref, watch } from 'vue'
import ServicioIngredientes from '../servicios/servicioIngredientes'


const nombre = ref('')
const tipo = ref('')
const pagina = ref(1)

const service = new ServicioIngredientes()
const ingredientes = service.ingredientes

const clasesDeIngredientes = service.tipos
service.cargarTipos()

const emits = defineEmits(['ingredienteSeleccionado'])

defineExpose({
  limpiarPanel
})


function buscar() {
  service.cargarIngredientes({ nombre: nombre.value, tipo: tipo.value, pagina: pagina.value })
}

function lanzarBusqueda() {
  pagina.value = 1
  buscar()
}

const paginaSiguiente = () => {
  if (ingredientes.value.length >= 20) {
    pagina.value++;
    buscar();
  }
}

const paginaAnterior = () => {
  if (pagina.value > 1) {
    pagina.value--;
    buscar()
  }
}

function cambiarSeleccion(ingrediente) {
  if (!ingrediente.seleccionado) {
    ingrediente.seleccionado = true;
    emits('ingredienteSeleccionado', ingrediente);
    console.log(ingrediente);
  }
}

watch(tipo, () => {
  buscar()
})

function limpiarPanel() {
  ingredientes.value.forEach(ingrediente => {
    ingrediente.seleccionado = false
    nombre.value = ''
    tipo.value = ''
    pagina.value = 1
  })
  buscar()
}

</script>

<template>

  <div class="bus">
    <h1>Busca tus ingredientes</h1>
    <form>
      <div class="tipo">
        <span>Selecciona por tipo de ingrediente</span>
        <select v-model="tipo">
          <option value="null">Selecciona un tipo</option>
          <option v-for="clase in clasesDeIngredientes" :key="clase.tipo" :value="clase.tipo">{{ clase.tipo }}
          </option>
        </select>
      </div>
      <div class="buscador">
        <input type="search" v-model="nombre" placeholder="Busca por una palabra">
      </div>
      <button class="btn" @click.prevent="lanzarBusqueda">Buscar</button>
    </form>
  </div>
  <div class="paginacion">
    <button class="btn" @click="paginaAnterior" :disabled="pagina === 1">Anterior</button>
    <span>Página {{ pagina }}</span>
    <button class="btn" @click="paginaSiguiente">Siguiente</button>
  </div>
  <div class="prueba">
    <div class="card" v-for="ingrediente in ingredientes" :key="ingrediente.id" @click="cambiarSeleccion(ingrediente)"
      :class="{ seleccionado: ingrediente.seleccionado }">
      <p>{{ ingrediente.nombre }}</p>
    </div>
  </div>


</template>

<style scoped>
.bus {
  margin: none;
  padding: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.tipo {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
  padding: 5px;
  margin: 5px;
}

.buscador {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: start;
  justify-content: center;
  white-space: nowrap;
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 10px;
  border: 1px solid #eee;
}

.btn {
  background-color: #2c3e50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  margin: 10px;
}

.btn:hover {
  background-color: rgb(51, 102, 255);
  color: white;
}

.paginacion {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}



.prueba {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 3px;
}

.card {
  width: 8rem;
  align-items: center;
  justify-content: center;
  color: black;
  font-size: 1rem;
  text-align: center;
  background-color: var(--color-rojo);
  padding: 3px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}



.card.seleccionado {
  background-color: var(--color-verde);
  box-shadow: inset 0 0 2px #000000;
  ;
}

.card::first-letter {
  text-transform: uppercase;
}

.card:hover {
  background-color: #fa9aca;
}
</style>