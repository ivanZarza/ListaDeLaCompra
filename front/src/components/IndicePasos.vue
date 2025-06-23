<script setup>

const props = defineProps({
  divsDisponibles: Number,
  divActivo: Number
})

const emit = defineEmits(['mostrarDiv'])

function mostrarDiv(numero) {
  emit('mostrarDiv', numero)
}
</script>

<template>
  <button v-for="i in divsDisponibles"
    @click="mostrarDiv(i)"
    :class="['button', { 'active': i === divActivo }]"
  >
    {{ `PASO ${i}` }}
  </button>

</template>

<style scoped>
.button {
  margin: none;
  height: 50px;
  padding: 10px;
  border: none;

  background-color: rgb(255, 255, 255);
  color: rgb(133, 133, 133);
  font-size: 1.5rem;
  cursor: pointer;
}

.button:hover {
  background-color: rgb(129, 129, 129);
  color: white;
  box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.2);
}

.button.active {
  background-color: rgb(107, 252, 107);
  color: var(--color-azul-oscuro);
}
</style>