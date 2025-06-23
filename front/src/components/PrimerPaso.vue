<script setup>
import { ref, watch } from "vue"

const numeroDePersonas = ref(1)

const emits = defineEmits([
  "mostrarDiv",
  "cantidadDePersonas"
])

watch (numeroDePersonas, (value) => {
  emits('cantidadDePersonas', value)
})

</script>

<template>
  <div>
    <div>
      <h2 class="texto-pasos">PASO 1</h2>
      <h3>Ingresa el número de personas</h3>
    </div>
    <div class="numero-personas">
      <label
        ><span>Número de personas:</span>
        <input type="number" v-model="numeroDePersonas" min="1" />
      </label>
    </div>
    <div class="contenedor-botones">
      <button class="btn" @click="$emit('mostrarDiv', 2), $emit('cantidadDePersonas',numeroDePersonas)">SIGUIENTE</button>
    </div>
  </div>
</template>

<style scoped>

h2 {
  margin: 2px;
  text-align: center;
}

h3 {
  margin: 3px;
  text-align: center;
}

.numero-personas {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

label {
  font-size: 1.2rem;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}

input {
  width: 100px;
  height: 50px;
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  background-color: rgb(217, 243, 252);
  text-align: center;
  font-size: 2.5rem;
}

.contenedor-botones {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.btn {
  background-color:#2c3e50;
  color: white;
  padding: 10px;
  border-radius: 5px;
  border:none;
  margin: 10px;
}

.btn:hover {
  background-color: rgb(51, 102, 255);
  color: white;
}
</style>
