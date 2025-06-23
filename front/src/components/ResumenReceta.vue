<script setup>
import { ref, watch } from 'vue'

const nombreReceta = ref('')

defineProps({
  numeroDePersonas: Number,
  principal: Array,
  acompanamiento: Array,
  condimentos: Array,
  descripcion: String
})

const emit = defineEmits([
  'agregarReceta',
  'actualizarNombreReceta'
])

watch(nombreReceta, (value) => {
  emit('actualizarNombreReceta', value)
})

</script>

<template>
  <h2>Resumen de la Receta</h2>
  <h3>
    Para {{ numeroDePersonas }}
    {{ numeroDePersonas === 1 ? "persona" : "personas" }}
  </h3>
  <h3>Principal</h3>
  <div class="listaIngredientes">
    <ol>
      <li v-for="ingrediente in principal" :key="ingrediente.id">
        {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
      </li>
    </ol>
  </div>
  <h3>Acompañamiento</h3>
  <div class="listaIngredientes">
    <ol>
      <li v-for="ingrediente in acompanamiento" :key="ingrediente.id">
        {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
      </li>
    </ol>
  </div>
  <h3>Condimentos</h3>
  <div class="listaIngredientes">
    <ol>
      <li v-for="ingrediente in condimentos" :key="ingrediente.id">
        {{ ingrediente.nombre }} - {{ ingrediente.cantidad }} Grs
      </li>
    </ol>
  </div>
  <h3><strong>Descripción:</strong></h3>
  <pre class="descripcionFinal">{{ descripcion }}</pre>
  <div class="textoFinal">
    <h3>¿QUIERES PASAR TU RECETA A LA LISTA DE LA COMPRA?</h3>
    <h3>Agrega un nombre a tu receta</h3>
    <input type="text" v-model="nombreReceta" />
    <button class="btn" @click="$emit('agregarReceta')">AGREGAR A LA LISTA DE LA COMPRA</button>
  </div>
</template>

<style scoped>

*  {
  margin: 3px;
}

.descripcionFinal {
  font-size: 1rem;
  text-align: center;
  white-space: pre-wrap;
}

.active {
  border: #2c3e50 3px solid;
}

.textoFinal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.textoFinal input {
  width: 50%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: #ffffff;
  color: #63235f;
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
</style>