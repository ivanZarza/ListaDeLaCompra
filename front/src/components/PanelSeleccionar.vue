<script setup>

defineProps({
  'ingredientes': Array,
  'pagina': Number
})

defineEmits([
  'paginaAnterior', 
  'paginaSiguiente'
])


</script>

<template>

  <div class="paginacion">
    <button @click="$emit('paginaAnterior')">Anterior</button>
    <span>Página {{ pagina }}</span>
    <button @click="$emit('paginaSiguiente')">Siguiente</button>
  </div>
  <div class="prueba">
    <div class="card" v-for="ingrediente in ingredientes" :key="ingrediente.id" @click="cambiarSeleccion(ingrediente)"
      :class="{ seleccionado: ingrediente.seleccionado }">
      <p>{{ ingrediente.name }}</p>
    </div>
  </div>
</template>

<style scoped>
.paginacion {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px;
}

.paginacion button {
  background-color: #abffb2;
  border: none;
  color: black;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 10px;
}

.paginacion button:hover {
  background-color: #69ff69;
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
  background-color: #ffaed7;
  padding: 3px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}



.card.seleccionado {
  background-color: white;
  box-shadow: inset 0 0 10px #ff0180;
  ;
}

.card::first-letter {
  text-transform: uppercase;
}

.card:hover {
  background-color: #fa9aca;
}
</style>